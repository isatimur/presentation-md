/**
 * Builds .potx / .pptx template bytes in memory with JSZip, so tests need no
 * binary fixtures in git. Other packages import this file by relative path
 * (`../../export/test/fixtures/build-template.ts`); `jszip` resolves from here.
 */
import JSZip from "jszip";

export type SchemeKey =
  | "dk1"
  | "lt1"
  | "dk2"
  | "lt2"
  | "accent1"
  | "accent2"
  | "accent3"
  | "accent4"
  | "accent5"
  | "accent6"
  | "hlink"
  | "folHlink";

export interface TemplatePicture {
  /** Content type of the image part. Default "image/png". */
  mime?: string;
  /** Position and size in EMU. */
  x: number;
  y: number;
  cx: number;
  cy: number;
  /** Add an `asvg:svgBlip` extension to the blip. */
  svgBlip?: boolean;
  /** Image part size in bytes. Default 64. */
  bytes?: number;
}

export interface TemplateMasterOptions {
  scheme?: Partial<Record<SchemeKey, string>>;
  schemeName?: string;
  /** Scheme keys written as `a:sysClr lastClr=…` instead of `a:srgbClr`. */
  sysClr?: SchemeKey[];
  clrMap?: Partial<Record<"bg1" | "tx1" | "bg2" | "tx2", string>>;
  fonts?: { latin?: { heading?: string; body?: string }; ea?: string; cs?: string };
  pictures?: TemplatePicture[];
  /** Pictures placed inside a `p:grpSp` on the master. */
  groupedPictures?: TemplatePicture[];
}

export interface TemplateOptions extends TemplateMasterOptions {
  kind?: "potx" | "pptx";
  /** A second master (listed after the first) with its own theme. */
  secondMaster?: TemplateMasterOptions;
  /** Slide size in EMU. Default 12192000 × 6858000. */
  sldSz?: { cx: number; cy: number };
  /** Number of sample slides. Default 0. */
  slides?: number;
  /** Total padding media bytes, split into parts of at most 5 MB, stored uncompressed. */
  paddingBytes?: number;
  /** Zero-filled media parts (deflated), each of this many bytes. */
  zeroMedia?: { count: number; bytes: number };
  /** Number of extra tiny entries. */
  extraEntries?: number;
  /** Put a DOCTYPE into this part. */
  doctypeIn?: "theme" | "master" | "presentation";
  omitMaster?: boolean;
  omitTheme?: boolean;
  /** Relationship ID of the first master in presentation.xml. Default `rId<n>`. */
  masterRelId?: string;
}

export const BRAND_SCHEME: Record<SchemeKey, string> = {
  dk1: "1B1B1F",
  lt1: "FFFFFF",
  dk2: "0B2545",
  lt2: "EEF2F7",
  accent1: "E4572E",
  accent2: "17BEBB",
  accent3: "FFC914",
  accent4: "2E282A",
  accent5: "76B041",
  accent6: "8D6A9F",
  hlink: "0563C1",
  folHlink: "954F72",
};

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";
const NS_R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const NS_REL = "http://schemas.openxmlformats.org/package/2006/relationships";
const REL = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const DOCTYPE = `<!DOCTYPE x [<!ENTITY a "aaaaaaaaaa">]>`;

const EXT_FOR_MIME: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/svg+xml": "svg",
  "image/gif": "gif",
};

function xmlHead(doctype: boolean): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${doctype ? DOCTYPE : ""}`;
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function themeXml(opts: TemplateMasterOptions, doctype: boolean): string {
  const scheme = { ...BRAND_SCHEME, ...(opts.scheme ?? {}) };
  const sys = new Set(opts.sysClr ?? []);
  const entries = (Object.keys(BRAND_SCHEME) as SchemeKey[])
    .map((k) => {
      const hex = scheme[k];
      const inner = sys.has(k)
        ? `<a:sysClr val="${k.startsWith("dk") ? "windowText" : "window"}" lastClr="${hex}"/>`
        : `<a:srgbClr val="${hex}"><a:lumMod val="75000"/></a:srgbClr>`;
      return `<a:${k}>${inner}</a:${k}>`;
    })
    .join("");
  const latin = opts.fonts?.latin ?? { heading: "Source Sans 3", body: "Calibri" };
  const ea = opts.fonts?.ea ?? "";
  const cs = opts.fonts?.cs ?? "";
  const fontBlock = (face: string | undefined): string =>
    `<a:latin typeface="${escapeAttr(face ?? "")}"/><a:ea typeface="${escapeAttr(ea)}"/><a:cs typeface="${escapeAttr(cs)}"/>`;
  return (
    `${xmlHead(doctype)}<a:theme xmlns:a="${NS_A}" name="Test Theme"><a:themeElements>` +
    `<a:clrScheme name="${escapeAttr(opts.schemeName ?? "Acme Brand")}">${entries}</a:clrScheme>` +
    `<a:fontScheme name="Acme"><a:majorFont>${fontBlock(latin.heading)}</a:majorFont>` +
    `<a:minorFont>${fontBlock(latin.body)}</a:minorFont></a:fontScheme>` +
    `<a:fmtScheme name="Office"/></a:themeElements></a:theme>`
  );
}

function picXml(pic: TemplatePicture, id: number, rid: string): string {
  const ext = pic.svgBlip
    ? `<a:extLst><a:ext uri="{96DAC541-7B7A-43D3-8B79-37D633B846F1}"><asvg:svgBlip xmlns:asvg="http://schemas.microsoft.com/office/drawing/2016/SVG/main" r:embed="${rid}"/></a:ext></a:extLst>`
    : "";
  return (
    `<p:pic><p:nvPicPr><p:cNvPr id="${id}" name="Picture ${id}"/><p:cNvPicPr/><p:nvPr/></p:nvPicPr>` +
    `<p:blipFill><a:blip r:embed="${rid}">${ext}</a:blip><a:stretch><a:fillRect/></a:stretch></p:blipFill>` +
    `<p:spPr><a:xfrm><a:off x="${pic.x}" y="${pic.y}"/><a:ext cx="${pic.cx}" cy="${pic.cy}"/></a:xfrm>` +
    `<a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr></p:pic>`
  );
}

interface MediaPart {
  path: string;
  mime: string;
  bytes: number;
}

function masterParts(
  opts: TemplateMasterOptions,
  index: number,
  mediaStart: number,
  doctype: boolean
): { masterXml: string; relsXml: string; media: MediaPart[] } {
  const rels: string[] = [
    `<Relationship Id="rId1" Type="${REL}/slideLayout" Target="../slideLayouts/slideLayout${index}.xml"/>`,
    `<Relationship Id="rId2" Type="${REL}/theme" Target="../theme/theme${index}.xml"/>`,
  ];
  const media: MediaPart[] = [];
  let shapes = "";
  let nextRid = 3;
  let nextId = 2;
  const addPic = (pic: TemplatePicture): string => {
    const mime = pic.mime ?? "image/png";
    const path = `ppt/media/image${mediaStart + media.length + 1}.${EXT_FOR_MIME[mime] ?? "bin"}`;
    media.push({ path, mime, bytes: pic.bytes ?? 64 });
    const rid = `rId${nextRid++}`;
    rels.push(`<Relationship Id="${rid}" Type="${REL}/image" Target="../media/${path.slice("ppt/media/".length)}"/>`);
    return picXml(pic, nextId++, rid);
  };
  for (const pic of opts.pictures ?? []) shapes += addPic(pic);
  if (opts.groupedPictures?.length) {
    shapes +=
      `<p:grpSp><p:nvGrpSpPr><p:cNvPr id="${nextId++}" name="Group"/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/>` +
      opts.groupedPictures.map(addPic).join("") +
      `</p:grpSp>`;
  }
  const map = { bg1: "lt1", tx1: "dk1", bg2: "lt2", tx2: "dk2", ...(opts.clrMap ?? {}) };
  const masterXml =
    `${xmlHead(doctype)}<p:sldMaster xmlns:a="${NS_A}" xmlns:r="${NS_R}" xmlns:p="${NS_P}">` +
    `<p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/>` +
    `${shapes}</p:spTree></p:cSld>` +
    `<p:clrMap bg1="${map.bg1}" tx1="${map.tx1}" bg2="${map.bg2}" tx2="${map.tx2}" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>` +
    `<p:sldLayoutIdLst><p:sldLayoutId id="${2147483649 + index}" r:id="rId1"/></p:sldLayoutIdLst></p:sldMaster>`;
  const relsXml = `${xmlHead(false)}<Relationships xmlns="${NS_REL}">${rels.join("")}</Relationships>`;
  return { masterXml, relsXml, media };
}

/** Build a template package. Returns the ZIP bytes. */
export async function buildTemplate(opts: TemplateOptions = {}): Promise<Buffer> {
  const zip = new JSZip();
  const kind = opts.kind ?? "potx";
  const mainType =
    kind === "potx"
      ? "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml"
      : "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml";
  const overrides: string[] = [`<Override PartName="/ppt/presentation.xml" ContentType="${mainType}"/>`];
  const defaults = new Map<string, string>([
    ["xml", "application/xml"],
    ["rels", "application/vnd.openxmlformats-package.relationships+xml"],
  ]);

  const masters: TemplateMasterOptions[] = opts.omitMaster ? [] : [opts];
  if (opts.secondMaster && !opts.omitMaster) masters.push(opts.secondMaster);

  const presRels: string[] = [];
  const masterIds: string[] = [];
  let rid = 1;
  let mediaCount = 0;
  masters.forEach((m, i) => {
    const index = i + 1;
    const { masterXml, relsXml, media } = masterParts(m, index, mediaCount, opts.doctypeIn === "master" && i === 0);
    mediaCount += media.length;
    zip.file(`ppt/slideMasters/slideMaster${index}.xml`, masterXml);
    zip.file(`ppt/slideMasters/_rels/slideMaster${index}.xml.rels`, relsXml);
    zip.file(
      `ppt/slideLayouts/slideLayout${index}.xml`,
      `${xmlHead(false)}<p:sldLayout xmlns:a="${NS_A}" xmlns:r="${NS_R}" xmlns:p="${NS_P}"><p:cSld><p:spTree/></p:cSld></p:sldLayout>`
    );
    zip.file(
      `ppt/slideLayouts/_rels/slideLayout${index}.xml.rels`,
      `${xmlHead(false)}<Relationships xmlns="${NS_REL}"><Relationship Id="rId1" Type="${REL}/slideMaster" Target="../slideMasters/slideMaster${index}.xml"/></Relationships>`
    );
    if (!opts.omitTheme) {
      zip.file(`ppt/theme/theme${index}.xml`, themeXml(m, opts.doctypeIn === "theme" && i === 0));
      overrides.push(
        `<Override PartName="/ppt/theme/theme${index}.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>`
      );
    }
    overrides.push(
      `<Override PartName="/ppt/slideMasters/slideMaster${index}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>`
    );
    for (const part of media) {
      const ext = part.path.slice(part.path.lastIndexOf(".") + 1);
      defaults.set(ext, part.mime);
      zip.file(part.path, Buffer.alloc(part.bytes, 7));
    }
    const masterRid = i === 0 && opts.masterRelId ? opts.masterRelId : `rId${rid++}`;
    presRels.push(
      `<Relationship Id="${masterRid}" Type="${REL}/slideMaster" Target="slideMasters/slideMaster${index}.xml"/>`
    );
    masterIds.push(`<p:sldMasterId id="${2147483648 + i * 12}" r:id="${masterRid}"/>`);
  });

  const slideIds: string[] = [];
  for (let s = 1; s <= (opts.slides ?? 0); s++) {
    const slideRid = `rId${rid++}`;
    presRels.push(`<Relationship Id="${slideRid}" Type="${REL}/slide" Target="slides/slide${s}.xml"/>`);
    slideIds.push(`<p:sldId id="${255 + s}" r:id="${slideRid}"/>`);
    zip.file(
      `ppt/slides/slide${s}.xml`,
      `${xmlHead(false)}<p:sld xmlns:a="${NS_A}" xmlns:r="${NS_R}" xmlns:p="${NS_P}"><p:cSld><p:spTree/></p:cSld></p:sld>`
    );
    overrides.push(
      `<Override PartName="/ppt/slides/slide${s}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`
    );
  }

  const sz = opts.sldSz ?? { cx: 12192000, cy: 6858000 };
  zip.file(
    "ppt/presentation.xml",
    `${xmlHead(opts.doctypeIn === "presentation")}<p:presentation xmlns:a="${NS_A}" xmlns:r="${NS_R}" xmlns:p="${NS_P}">` +
      `<p:sldMasterIdLst>${masterIds.join("")}</p:sldMasterIdLst>` +
      (slideIds.length ? `<p:sldIdLst>${slideIds.join("")}</p:sldIdLst>` : "") +
      `<p:sldSz cx="${sz.cx}" cy="${sz.cy}"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>`
  );
  zip.file(
    "ppt/_rels/presentation.xml.rels",
    `${xmlHead(false)}<Relationships xmlns="${NS_REL}">${presRels.join("")}</Relationships>`
  );
  zip.file(
    "_rels/.rels",
    `${xmlHead(false)}<Relationships xmlns="${NS_REL}"><Relationship Id="rId1" Type="${REL}/officeDocument" Target="ppt/presentation.xml"/></Relationships>`
  );

  if (opts.paddingBytes) {
    defaults.set("bin", "application/octet-stream");
    const partSize = 5 * 1024 * 1024;
    let left = opts.paddingBytes;
    let n = 1;
    while (left > 0) {
      const size = Math.min(partSize, left);
      // Pseudo-random bytes so the padding really takes space in the ZIP.
      const buf = Buffer.alloc(size);
      let seed = n * 2654435761;
      for (let i = 0; i < size; i++) {
        seed = (seed * 1103515245 + 12345) >>> 0;
        buf[i] = seed >>> 24;
      }
      zip.file(`ppt/media/padding${n}.bin`, buf, { compression: "STORE" });
      left -= size;
      n += 1;
    }
  }
  if (opts.zeroMedia) {
    defaults.set("bin", "application/octet-stream");
    for (let n = 1; n <= opts.zeroMedia.count; n++) {
      zip.file(`ppt/media/zero${n}.bin`, Buffer.alloc(opts.zeroMedia.bytes), { compression: "DEFLATE" });
    }
  }
  for (let n = 1; n <= (opts.extraEntries ?? 0); n++) {
    zip.file(`docProps/extra/extra${n}.xml`, `<x/>`);
  }

  const defaultXml = [...defaults]
    .map(([ext, type]) => `<Default Extension="${ext}" ContentType="${type}"/>`)
    .join("");
  zip.file(
    "[Content_Types].xml",
    `${xmlHead(false)}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">${defaultXml}${overrides.join("")}</Types>`
  );

  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}

/** Count of non-directory entries in a ZIP. */
export async function entryCount(bytes: Buffer): Promise<number> {
  const zip = await JSZip.loadAsync(bytes);
  return Object.values(zip.files).filter((f) => !f.dir).length;
}
