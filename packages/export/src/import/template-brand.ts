/**
 * Read brand colours, fonts and logo metadata from a PowerPoint template
 * (.pptx / .potx). See "Reading the template" in
 * docs/superpowers/specs/2026-11-23-template-theme-import-design.md
 */
import { MAX_TEMPLATE_ZIP_ENTRIES } from "./zip-limits.js";
import { asArray, openOoxmlPackage, relIdFromSldId, type OoxmlPackage } from "./package-reader.js";
import type {
  ClrMapTarget,
  LogoCorner,
  OfficeDefaultLabel,
  SchemeColorKey,
  TemplateBrand,
} from "./types.js";

const SCHEME_KEYS: readonly SchemeColorKey[] = [
  "dk1",
  "lt1",
  "dk2",
  "lt2",
  "accent1",
  "accent2",
  "accent3",
  "accent4",
  "accent5",
  "accent6",
  "hlink",
  "folHlink",
];

const ACCENT_KEYS = ["accent1", "accent2", "accent3", "accent4", "accent5", "accent6"] as const;

/**
 * Office default accent tables (accent1–accent6).
 *
 * Checked on 2026-11-24 against the files that PowerPoint for Mac 16.114.1
 * (Microsoft 365) ships in `Microsoft PowerPoint.app/Contents/Resources/Office Themes/`:
 * - Office 2023+: `Office Theme.thmx` (the blank-presentation theme), scheme "Office Theme".
 * - Office 2013–2022: `Office 2013 - 2022 Theme.thmx` and `Theme Colors/Office2013-2022.xml`.
 * - Office 2007–2010: `Theme Colors/Office2007-2010.xml`.
 * All 18 values matched. No blank .potx saved by PowerPoint for Windows was checked.
 */
export const OFFICE_ACCENT_TABLES: ReadonlyArray<{ label: OfficeDefaultLabel; accents: readonly string[] }> = [
  {
    label: "Office 2007–2010",
    accents: ["#4f81bd", "#c0504d", "#9bbb59", "#8064a2", "#4bacc6", "#f79646"],
  },
  {
    label: "Office 2013–2022",
    accents: ["#4472c4", "#ed7d31", "#a5a5a5", "#ffc000", "#5b9bd5", "#70ad47"],
  },
  {
    label: "Office 2023+",
    accents: ["#156082", "#e97132", "#196b24", "#0f9ed5", "#a02b93", "#4ea72e"],
  },
];

/**
 * PowerPoint's built-in colour scheme names. The first 22 come from the spec;
 * the last four are the names the same PowerPoint build writes into its own
 * Office themes (checked in `Office Themes/Theme Colors/` and the `.thmx` files).
 */
export const BUILT_IN_SCHEME_NAMES: readonly string[] = [
  "Office",
  "Grayscale",
  "Blue Warm",
  "Blue",
  "Blue II",
  "Blue Green",
  "Green",
  "Green Yellow",
  "Yellow",
  "Yellow Orange",
  "Orange",
  "Orange Red",
  "Red Orange",
  "Red",
  "Red Violet",
  "Violet",
  "Violet II",
  "Median",
  "Paper",
  "Marquee",
  "Slipstream",
  "Aspect",
  "Office Theme",
  "Office 2007-2010",
  "Office 2013 - 2022",
  "Office 2013 - 2022 Theme",
];

export const BUILT_IN_SCHEME_WARNING = (name: string): string =>
  `The template uses PowerPoint's built-in colour scheme '${name}'. These may not be the brand colours.`;
export const SCRIPT_FONT_WARNING = (name: string): string =>
  `The template sets its own East Asian or complex-script font (${name}). PPTX export uses Office's default for the deck language.`;
export const GROUPED_PICTURE_WARNING = "The master has a grouped picture; logo detection skips groups.";

const DEFAULT_CLR_MAP: TemplateBrand["clrMap"] = { bg1: "lt1", tx1: "dk1", bg2: "lt2", tx2: "dk2" };
/** ST_ColorSchemeIndex: a clrMap role may point at any of the 12 scheme slots. */
const CLR_MAP_TARGETS = new Set<string>(SCHEME_KEYS);
/** 13.333 in × 7.5 in, PowerPoint's 16:9 default, used when `p:sldSz` is absent. */
const DEFAULT_SLIDE_SIZE = { cx: 12192000, cy: 6858000 };

const REL_TYPE_THEME = /\/theme$/;

type Node = Record<string, unknown>;

function child(node: unknown, key: string): Node | undefined {
  if (!node || typeof node !== "object") return undefined;
  const v = (node as Node)[key];
  if (Array.isArray(v)) return v[0] as Node | undefined;
  return v && typeof v === "object" ? (v as Node) : undefined;
}

function attr(node: unknown, key: string): string | undefined {
  if (!node || typeof node !== "object") return undefined;
  const v = (node as Node)[`@_${key}`];
  return v == null ? undefined : String(v);
}

function num(value: string | undefined): number | undefined {
  if (value == null) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function schemeHex(entry: Node | undefined): string | undefined {
  const raw = attr(child(entry, "srgbClr"), "val") ?? attr(child(entry, "sysClr"), "lastClr");
  if (!raw || !/^[0-9a-f]{6}$/i.test(raw.trim())) return undefined;
  return `#${raw.trim().toLowerCase()}`;
}

/**
 * Template strings reach warnings, the CLI's stdout and the MCP response, so
 * drop control and format characters (terminal escapes, bidi overrides) and
 * cap the length.
 */
function plainText(value: string | null | undefined, max = 100): string | undefined {
  const clean = value?.replace(/[\p{Cc}\p{Cf}]/gu, "").trim().slice(0, max);
  return clean ? clean : undefined;
}

function typeface(node: Node | undefined): string | undefined {
  return plainText(attr(node, "typeface"));
}

function officeDefaultFor(scheme: Record<SchemeColorKey, string>): OfficeDefaultLabel | null {
  for (const table of OFFICE_ACCENT_TABLES) {
    if (scheme.accent1 !== table.accents[0]) continue;
    const matches = ACCENT_KEYS.filter((k, i) => scheme[k] === table.accents[i]).length;
    if (matches >= 5) return table.label;
  }
  return null;
}

function containsPicture(node: unknown): boolean {
  if (!node || typeof node !== "object") return false;
  for (const [k, v] of Object.entries(node as Node)) {
    if (k.startsWith("@_")) continue;
    if (k === "pic") return true;
    for (const item of asArray(v)) if (containsPicture(item)) return true;
  }
  return false;
}

function embedId(blip: Node | undefined): string | undefined {
  if (!blip) return undefined;
  const direct = attr(blip, "embed");
  if (direct) return direct;
  return relIdFromSldId(blip) || undefined;
}

function hasSvgBlip(blip: Node | undefined): boolean {
  const extLst = child(blip, "extLst");
  for (const ext of asArray(extLst?.["ext"])) {
    if (ext && typeof ext === "object" && "svgBlip" in (ext as Node)) return true;
  }
  return false;
}

async function readLogo(
  pkg: OoxmlPackage,
  masterPath: string,
  spTree: Node | undefined,
  slide: { cx: number; cy: number },
  warnings: string[]
): Promise<TemplateBrand["logo"]> {
  if (asArray(spTree?.["grpSp"]).some((g) => containsPicture(g))) {
    warnings.push(GROUPED_PICTURE_WARNING);
  }

  const corners: Array<{ corner: LogoCorner; x: number; y: number }> = [
    { corner: "top-left", x: 0, y: 0 },
    { corner: "top-right", x: slide.cx, y: 0 },
    { corner: "bottom-left", x: 0, y: slide.cy },
    { corner: "bottom-right", x: slide.cx, y: slide.cy },
  ];

  let best: { pic: Node; corner: LogoCorner; distance: number; cx: number } | undefined;
  for (const pic of asArray(spTree?.["pic"]) as Node[]) {
    const xfrm = child(child(pic, "spPr"), "xfrm");
    const off = child(xfrm, "off");
    const ext = child(xfrm, "ext");
    const x = num(attr(off, "x"));
    const y = num(attr(off, "y"));
    const cx = num(attr(ext, "cx"));
    const cy = num(attr(ext, "cy"));
    if (x == null || y == null || cx == null || cy == null) continue;
    if (cx > slide.cx / 4) continue;
    const centreX = x + cx / 2;
    const centreY = y + cy / 2;
    for (const c of corners) {
      const distance = Math.hypot(centreX - c.x, centreY - c.y);
      if (!best || distance < best.distance) best = { pic, corner: c.corner, distance, cx };
    }
  }
  if (!best) return { found: false };

  const blip = child(child(best.pic, "blipFill"), "blip");
  const rid = embedId(blip);
  const rel = rid ? (await pkg.rels(masterPath)).get(rid) : undefined;
  const imagePath = rel && !rel.external ? rel.target : undefined;
  const logo: TemplateBrand["logo"] = {
    found: true,
    hasSvg: hasSvgBlip(blip),
    corner: best.corner,
    widthPct: Math.round((best.cx / slide.cx) * 1000) / 10,
  };
  if (imagePath) {
    const mime = plainText(pkg.contentType(imagePath));
    if (mime) logo.mime = mime;
    const size = pkg.partSize(imagePath);
    if (size != null) logo.sizeBytes = size;
  }
  return logo;
}

export async function extractTemplateBrand(
  bytes: Uint8Array | Buffer,
  opts: { fileName?: string } = {}
): Promise<TemplateBrand> {
  const label = opts.fileName ?? "the template";
  const noMaster = (): Error => new Error(`No slide master in ${label}`);
  const noTheme = (): Error => new Error(`No theme part for the first slide master in ${label}`);

  const pkg = await openOoxmlPackage(bytes, { maxEntries: MAX_TEMPLATE_ZIP_ENTRIES });
  const warnings: string[] = [...pkg.warnings];

  const presPath = "ppt/presentation.xml";
  const presDoc = await pkg.readXml(presPath, { isArray: ["sldMasterId"] });
  const pres = child(presDoc, "presentation");
  if (!pres) throw noMaster();
  const firstMasterId = asArray(child(pres, "sldMasterIdLst")?.["sldMasterId"])[0] as Node | undefined;
  if (!firstMasterId) throw noMaster();
  const masterRel = (await pkg.rels(presPath)).get(relIdFromSldId(firstMasterId));
  if (!masterRel || masterRel.external) throw noMaster();
  const masterPath = masterRel.target;
  const masterDoc = await pkg.readXml(masterPath, { isArray: ["pic", "grpSp", "ext"] });
  const master = child(masterDoc, "sldMaster");
  if (!master) throw noMaster();

  const themeRel = [...(await pkg.rels(masterPath)).values()].find(
    (r) => !r.external && REL_TYPE_THEME.test(r.type)
  );
  if (!themeRel) throw noTheme();
  const themeDoc = await pkg.readXml(themeRel.target);
  const themeElements = child(child(themeDoc, "theme"), "themeElements");
  if (!themeElements) throw noTheme();

  const clrScheme = child(themeElements, "clrScheme");
  const scheme = {} as Record<SchemeColorKey, string>;
  for (const key of SCHEME_KEYS) {
    const hex = schemeHex(child(clrScheme, key));
    if (!hex) throw new Error(`The colour scheme in ${label} has no usable '${key}' colour.`);
    scheme[key] = hex;
  }
  const schemeName = plainText(attr(clrScheme, "name")) ?? "";

  const clrMapNode = child(master, "clrMap");
  const clrMap = { ...DEFAULT_CLR_MAP };
  for (const role of ["bg1", "tx1", "bg2", "tx2"] as const) {
    const v = attr(clrMapNode, role);
    if (v && CLR_MAP_TARGETS.has(v)) clrMap[role] = v as ClrMapTarget;
  }

  const officeDefault = officeDefaultFor(scheme);
  const builtInName =
    BUILT_IN_SCHEME_NAMES.find((n) => n.toLowerCase() === schemeName.trim().toLowerCase()) ?? null;
  if (builtInName) warnings.push(BUILT_IN_SCHEME_WARNING(builtInName));

  const fontScheme = child(themeElements, "fontScheme");
  const major = child(fontScheme, "majorFont");
  const minor = child(fontScheme, "minorFont");
  const fonts: TemplateBrand["fonts"] = {};
  const heading = typeface(child(major, "latin"));
  const body = typeface(child(minor, "latin"));
  const ea = typeface(child(minor, "ea"));
  const cs = typeface(child(minor, "cs"));
  if (heading) fonts.heading = heading;
  if (body) fonts.body = body;
  if (ea) fonts.ea = ea;
  if (cs) fonts.cs = cs;
  const scriptFonts = [ea, cs].filter((f): f is string => Boolean(f));
  if (scriptFonts.length) warnings.push(SCRIPT_FONT_WARNING([...new Set(scriptFonts)].join(", ")));

  const sldSz = child(pres, "sldSz");
  const slide = {
    cx: num(attr(sldSz, "cx")) || DEFAULT_SLIDE_SIZE.cx,
    cy: num(attr(sldSz, "cy")) || DEFAULT_SLIDE_SIZE.cy,
  };
  const spTree = child(child(master, "cSld"), "spTree");
  const logo = await readLogo(pkg, masterPath, spTree, slide, warnings);

  return { scheme, schemeName, clrMap, officeDefault, builtInName, fonts, logo, warnings };
}
