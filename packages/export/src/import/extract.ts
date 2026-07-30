import { assertZipEntrySafe } from "./zip-limits.js";
import { bytesToUtf8 } from "./bytes.js";
import type {
  ExtractedImage,
  ExtractedPresentation,
  ExtractedSlide,
  ExtractOptions,
} from "./types.js";
import JSZip from "jszip";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  removeNSPrefix: true,
  isArray: (name) =>
    [
      "sldId",
      "Relationship",
      "sp",
      "graphicFrame",
      "pic",
      "tr",
      "tc",
      "p",
      "r",
      "Override",
      "Default",
    ].includes(name),
});

function asArray<T>(v: T | T[] | undefined | null): T[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function textOfNode(node: unknown): string {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (typeof node !== "object") return "";
  const obj = node as Record<string, unknown>;
  if ("#text" in obj && Object.keys(obj).every((k) => k === "#text" || k.startsWith("@_"))) {
    return String(obj["#text"] ?? "");
  }
  let out = "";
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("@_")) continue;
    if (k === "t") {
      for (const t of asArray(v)) out += textOfNode(t);
    } else {
      out += textOfNode(v);
    }
  }
  return out;
}

function collectShapeText(txBody: unknown): string {
  if (!txBody || typeof txBody !== "object") return "";
  const paras = asArray((txBody as Record<string, unknown>)["p"]);
  const lines: string[] = [];
  for (const p of paras) {
    const line = textOfNode(p).replace(/\s+/g, " ").trim();
    if (line) lines.push(line);
  }
  return lines.join("\n");
}

function isTitlePlaceholder(sp: Record<string, unknown>): boolean {
  const nvSpPr = sp["nvSpPr"] as Record<string, unknown> | undefined;
  const nvPr = nvSpPr?.["nvPr"] as Record<string, unknown> | undefined;
  const ph = nvPr?.["ph"] as Record<string, unknown> | undefined;
  if (!ph) return false;
  const type = String(ph["@_type"] ?? "").toLowerCase();
  return type === "title" || type === "ctrtitle";
}

function parseTable(tbl: Record<string, unknown>): string[][] {
  const rows: string[][] = [];
  for (const tr of asArray(tbl["tr"])) {
    const trObj = tr as Record<string, unknown>;
    const cells: string[] = [];
    for (const tc of asArray(trObj["tc"])) {
      const tcObj = tc as Record<string, unknown>;
      cells.push(collectShapeText(tcObj["txBody"]).trim());
    }
    if (cells.some((c) => c.length > 0)) rows.push(cells);
  }
  return rows;
}

function contentTypeForPath(
  path: string,
  defaults: Map<string, string>,
  overrides: Map<string, string>
): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (overrides.has(normalized)) return overrides.get(normalized)!;
  const ext = path.includes(".") ? path.slice(path.lastIndexOf(".") + 1).toLowerCase() : "";
  return defaults.get(ext) ?? "application/octet-stream";
}

function extForContentType(ct: string): string {
  if (ct.includes("png")) return "png";
  if (ct.includes("jpeg") || ct.includes("jpg")) return "jpg";
  if (ct.includes("gif")) return "gif";
  if (ct.includes("svg")) return "svg";
  if (ct.includes("emf")) return "emf";
  if (ct.includes("wmf")) return "wmf";
  return "bin";
}

function declaredUncompressedSize(entry: JSZip.JSZipObject): number {
  const data = (entry as unknown as { _data?: { uncompressedSize?: number } })._data;
  const n = data?.uncompressedSize;
  return typeof n === "number" && n > 0 ? n : 0;
}

function resolveRelTarget(baseDir: string, target: string): string {
  const joined = `${baseDir}/${target}`.replace(/\\/g, "/");
  const parts: string[] = [];
  for (const seg of joined.split("/")) {
    if (!seg || seg === ".") continue;
    if (seg === "..") parts.pop();
    else parts.push(seg);
  }
  return parts.join("/");
}

function relIdFromSldId(sldId: Record<string, unknown>): string {
  for (const [k, v] of Object.entries(sldId)) {
    if (!k.startsWith("@_")) continue;
    const val = String(v);
    if (/^rId\d+$/i.test(val)) return val;
  }
  return "";
}

function embedIdsFromXml(xml: string): string[] {
  const ids: string[] = [];
  for (const re of [/r:embed="(rId\d+)"/g, /(?:^|[\s])embed="(rId\d+)"/g]) {
    for (const m of xml.matchAll(re)) {
      if (!ids.includes(m[1]!)) ids.push(m[1]!);
    }
  }
  return ids;
}

export async function extractPptx(
  input: Uint8Array | Buffer,
  opts: ExtractOptions = {}
): Promise<{ extracted: ExtractedPresentation; warnings: string[] }> {
  const warnings: string[] = [];
  const warn = (msg: string): void => {
    warnings.push(msg);
    opts.onWarn?.(msg);
  };

  const zip = await JSZip.loadAsync(input, { checkCRC32: true });
  const entries = Object.values(zip.files).filter((f) => !f.dir);
  let entryCount = 0;
  let declaredTotal = 0;
  for (const entry of entries) {
    entryCount += 1;
    const declared = declaredUncompressedSize(entry);
    declaredTotal += declared;
    assertZipEntrySafe({
      entryCount,
      uncompressedSize: declared,
      totalUncompressed: declaredTotal,
    });
  }

  /** Actual decompressed bytes read so far (authoritative vs declared sizes). */
  let bytesRead = 0;
  const textCache = new Map<string, string>();

  async function readBytes(
    path: string,
    file: JSZip.JSZipObject,
    options: { isMedia?: boolean } = {}
  ): Promise<Uint8Array> {
    const bytes = new Uint8Array(await file.async("uint8array"));
    bytesRead += bytes.byteLength;
    assertZipEntrySafe({
      entryCount,
      uncompressedSize: bytes.byteLength,
      totalUncompressed: bytesRead,
      isMedia: options.isMedia,
    });
    return bytes;
  }

  async function readText(path: string): Promise<string | null> {
    const cached = textCache.get(path);
    if (cached !== undefined) return cached;
    const file = zip.file(path);
    if (!file) return null;
    const bytes = await readBytes(path, file);
    const text = bytesToUtf8(bytes);
    textCache.set(path, text);
    return text;
  }

  async function readXml(path: string): Promise<Record<string, unknown> | null> {
    const text = await readText(path);
    if (text == null) return null;
    return parser.parse(text) as Record<string, unknown>;
  }

  const defaults = new Map<string, string>();
  const overrides = new Map<string, string>();
  const ctDoc = await readXml("[Content_Types].xml");
  if (!ctDoc) {
    warn("Missing [Content_Types].xml — continuing with filename heuristics.");
  } else {
    const types = ctDoc["Types"] as Record<string, unknown> | undefined;
    for (const d of asArray(types?.["Default"])) {
      const o = d as Record<string, unknown>;
      defaults.set(String(o["@_Extension"] ?? "").toLowerCase(), String(o["@_ContentType"] ?? ""));
    }
    for (const o of asArray(types?.["Override"])) {
      const ov = o as Record<string, unknown>;
      overrides.set(String(ov["@_PartName"] ?? ""), String(ov["@_ContentType"] ?? ""));
    }
  }

  const pres = await readXml("ppt/presentation.xml");
  if (!pres) {
    warn("Missing ppt/presentation.xml — falling back to slide filename order.");
  }
  const presRels = await readXml("ppt/_rels/presentation.xml.rels");
  const relById = new Map<string, { target: string; external: boolean }>();
  const relRoot = (presRels?.["Relationships"] ?? {}) as Record<string, unknown>;
  for (const rel of asArray(relRoot["Relationship"])) {
    const r = rel as Record<string, unknown>;
    relById.set(String(r["@_Id"]), {
      target: String(r["@_Target"] ?? ""),
      external: String(r["@_TargetMode"] ?? "") === "External",
    });
  }

  const sldIdLst =
    ((pres?.["presentation"] as Record<string, unknown> | undefined)?.["sldIdLst"] as
      | Record<string, unknown>
      | undefined) ?? {};
  const slidePaths: string[] = [];
  for (const sldId of asArray(sldIdLst["sldId"])) {
    const relId = relIdFromSldId(sldId as Record<string, unknown>);
    const rel = relById.get(relId);
    if (!rel) {
      warn(`Missing relationship for slide id ${relId || "(unknown)"}`);
      continue;
    }
    if (rel.external) {
      warn(`Skipped external slide relationship: ${rel.target}`);
      continue;
    }
    slidePaths.push(resolveRelTarget("ppt", rel.target));
  }

  if (slidePaths.length === 0) {
    const numbered = entries
      .map((e) => e.name)
      .filter((n) => /^ppt\/slides\/slide\d+\.xml$/i.test(n))
      .sort((a, b) => {
        const na = Number(a.match(/slide(\d+)/i)?.[1] ?? 0);
        const nb = Number(b.match(/slide(\d+)/i)?.[1] ?? 0);
        return na - nb;
      });
    slidePaths.push(...numbered);
    if (numbered.length) warn("Fell back to filename slide order (presentation sldIdLst empty).");
  }

  const slides: ExtractedSlide[] = [];

  for (let i = 0; i < slidePaths.length; i++) {
    const slidePath = slidePaths[i]!;
    const slideDoc = await readXml(slidePath);
    if (!slideDoc) {
      warn(`Missing slide part: ${slidePath}`);
      continue;
    }
    if (!slideDoc["sld"]) {
      warn(`Unrecognized or empty slide XML root in ${slidePath}`);
      continue;
    }

    const sld = slideDoc["sld"] as Record<string, unknown>;
    const cSld = sld["cSld"] as Record<string, unknown> | undefined;
    const spTree = cSld?.["spTree"] as Record<string, unknown> | undefined;

    let title: string | undefined;
    const titleFromPh: string[] = [];
    const bodyTexts: string[] = [];

    for (const sp of asArray(spTree?.["sp"])) {
      const spObj = sp as Record<string, unknown>;
      const text = collectShapeText(spObj["txBody"]).trim();
      if (!text) continue;
      if (isTitlePlaceholder(spObj)) titleFromPh.push(text);
      else bodyTexts.push(text);
    }

    if (titleFromPh.length) {
      title = titleFromPh[0];
      bodyTexts.unshift(...titleFromPh.slice(1));
    } else if (bodyTexts.length) {
      title = bodyTexts.shift();
    }

    let bestTable: string[][] = [];
    let tableCount = 0;
    for (const gf of asArray(spTree?.["graphicFrame"])) {
      const gfObj = gf as Record<string, unknown>;
      const graphic = gfObj["graphic"] as Record<string, unknown> | undefined;
      const graphicData = graphic?.["graphicData"] as Record<string, unknown> | undefined;
      const tbl = graphicData?.["tbl"] as Record<string, unknown> | undefined;
      if (tbl) {
        tableCount += 1;
        const parsed = parseTable(tbl);
        if (parsed.length > bestTable.length) bestTable = parsed;
      }
    }
    if (tableCount > 1) {
      warn(`Slide ${i + 1}: ${tableCount - 1} extra table(s) ignored (using largest only)`);
    }

    const slideDir = slidePath.includes("/") ? slidePath.slice(0, slidePath.lastIndexOf("/")) : "";
    const relsPath = `${slideDir}/_rels/${slidePath.slice(slidePath.lastIndexOf("/") + 1)}.rels`;
    const slideRelsDoc = await readXml(relsPath);
    const slideRelById = new Map<string, { target: string; external: boolean; type: string }>();
    const slideRelRoot = (slideRelsDoc?.["Relationships"] ?? {}) as Record<string, unknown>;
    for (const rel of asArray(slideRelRoot["Relationship"])) {
      const r = rel as Record<string, unknown>;
      slideRelById.set(String(r["@_Id"]), {
        target: String(r["@_Target"] ?? ""),
        external: String(r["@_TargetMode"] ?? "") === "External",
        type: String(r["@_Type"] ?? ""),
      });
    }

    const slideXml = (await readText(slidePath)) ?? "";
    const blipIds = embedIdsFromXml(slideXml);
    const images: ExtractedImage[] = [];
    let imgIndex = 0;
    for (const rid of blipIds) {
      const rel = slideRelById.get(rid);
      if (!rel) {
        warn(`Missing image relationship ${rid} on slide ${i + 1}`);
        continue;
      }
      if (rel.external) {
        warn(`Skipped external image relationship on slide ${i + 1}: ${rel.target}`);
        continue;
      }
      if (!rel.type.includes("image") && !rel.target.includes("media/")) {
        warn(`Skipped non-image relationship ${rid} on slide ${i + 1}: ${rel.target}`);
        continue;
      }
      const mediaPath = resolveRelTarget(slideDir, rel.target);
      const mediaFile = zip.file(mediaPath);
      if (!mediaFile) {
        warn(`Missing media part: ${mediaPath}`);
        continue;
      }
      const bytes = await readBytes(mediaPath, mediaFile, { isMedia: true });
      imgIndex += 1;
      const ct = contentTypeForPath(mediaPath, defaults, overrides);
      images.push({
        name: `slide${i + 1}_img${imgIndex}.${extForContentType(ct)}`,
        contentType: ct,
        bytes,
      });
    }

    let notes: string | undefined;
    let notesRelSeen = false;
    for (const rel of slideRelById.values()) {
      if (!rel.type.includes("notesSlide") && !/notesSlide/i.test(rel.target)) continue;
      notesRelSeen = true;
      if (rel.external) {
        warn(`Skipped external notes relationship on slide ${i + 1}`);
        continue;
      }
      const notesPath = resolveRelTarget(slideDir, rel.target);
      const notesDoc = await readXml(notesPath);
      if (!notesDoc) {
        warn(`Missing notes part on slide ${i + 1}: ${notesPath}`);
        continue;
      }
      const notesSld = (notesDoc["notes"] ?? notesDoc) as Record<string, unknown>;
      const nCSld = notesSld["cSld"] as Record<string, unknown> | undefined;
      const nTree = nCSld?.["spTree"] as Record<string, unknown> | undefined;
      const noteParts: string[] = [];
      for (const sp of asArray(nTree?.["sp"])) {
        const spObj = sp as Record<string, unknown>;
        const nvSpPr = spObj["nvSpPr"] as Record<string, unknown> | undefined;
        const nvPr = nvSpPr?.["nvPr"] as Record<string, unknown> | undefined;
        const ph = nvPr?.["ph"] as Record<string, unknown> | undefined;
        const phType = String(ph?.["@_type"] ?? "");
        if (phType === "sldImg" || phType === "sldNum") continue;
        const t = collectShapeText(spObj["txBody"]).trim();
        if (t) noteParts.push(t);
      }
      if (noteParts.length) notes = noteParts.join("\n");
      else if (notesRelSeen) warn(`Empty notes part on slide ${i + 1}`);
    }

    slides.push({
      number: i + 1,
      title,
      texts: bodyTexts,
      tables: bestTable,
      images,
      notes,
    });
  }

  if (slides.length === 0) {
    throw new Error("No slides found in PPTX");
  }

  const core = await readXml("docProps/core.xml");
  const coreProps = (core?.["coreProperties"] ?? {}) as Record<string, unknown>;
  const meta = {
    title: textOfNode(coreProps["title"]).trim() || undefined,
    author: textOfNode(coreProps["creator"]).trim() || undefined,
    subject: textOfNode(coreProps["subject"]).trim() || undefined,
  };

  return { extracted: { meta, slides }, warnings };
}
