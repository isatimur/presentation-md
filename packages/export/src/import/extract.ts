import { MAX_ZIP_ENTRIES } from "./zip-limits.js";
import { asArray, openOoxmlPackage, relIdFromSldId, resolveRelTarget } from "./package-reader.js";
import type {
  ExtractedImage,
  ExtractedPresentation,
  ExtractedSlide,
  ExtractOptions,
} from "./types.js";

/** Elements slide import always reads as arrays. Passed on every readXml call. */
const SLIDE_IS_ARRAY = [
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
];

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

function extForContentType(ct: string): string {
  if (ct.includes("png")) return "png";
  if (ct.includes("jpeg") || ct.includes("jpg")) return "jpg";
  if (ct.includes("gif")) return "gif";
  if (ct.includes("svg")) return "svg";
  if (ct.includes("emf")) return "emf";
  if (ct.includes("wmf")) return "wmf";
  return "bin";
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

  const pkg = await openOoxmlPackage(input, { maxEntries: MAX_ZIP_ENTRIES });
  for (const msg of pkg.warnings) warn(msg);
  const readXml = (path: string): Promise<Record<string, unknown> | null> =>
    pkg.readXml(path, { isArray: SLIDE_IS_ARRAY });
  const readText = (path: string): Promise<string | null> => pkg.readText(path);

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
    const numbered = pkg
      .partNames()
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
      const bytes = await pkg.readBytes(mediaPath, { isMedia: true });
      if (!bytes) {
        warn(`Missing media part: ${mediaPath}`);
        continue;
      }
      imgIndex += 1;
      const ct = pkg.contentType(mediaPath) ?? "application/octet-stream";
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
