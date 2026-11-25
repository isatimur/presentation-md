/**
 * Bounded reader for OOXML packages (.pptx / .potx). Slide import
 * (`extract.ts`) and template import (`template-brand.ts`) share it, so both
 * get the same byte caps, entry cap, CRC check and DOCTYPE refusal.
 */
import JSZip from "jszip";
import { XMLParser } from "fast-xml-parser";
import { assertZipArchiveSafe, assertZipEntrySafe } from "./zip-limits.js";
import { bytesToUtf8 } from "./bytes.js";

export interface OoxmlRelationship {
  /** Package-absolute part name (no leading "/"), or the raw target when external. */
  target: string;
  type: string;
  external: boolean;
}

export interface OoxmlPackage {
  /** Non-directory entries, in ZIP order. */
  partNames(): string[];
  /** Parse an XML part. Returns null when the part is missing. Refuses a DOCTYPE. */
  readXml(path: string, opts?: { isArray?: string[] }): Promise<Record<string, unknown> | null>;
  /** Decoded text of a part (DOCTYPE refused). Returns null when the part is missing. */
  readText(path: string): Promise<string | null>;
  /** Raw part bytes. The media cap applies to `ppt/media/*` (or when `isMedia` is set). */
  readBytes(path: string, opts?: { isMedia?: boolean }): Promise<Uint8Array | null>;
  /** Declared uncompressed size from the central directory, or null when the part is missing. */
  partSize(path: string): number | null;
  /** Relationships of a part, keyed by id. Internal targets are package-absolute. */
  rels(partPath: string): Promise<Map<string, OoxmlRelationship>>;
  /** Content type from `[Content_Types].xml` (override, then extension default), or null. */
  contentType(path: string): string | null;
  warnings: string[];
}

const CRC32_TABLE = Uint32Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  return value >>> 0;
});

function updateCrc32(crc: number, bytes: Uint8Array): number {
  let next = crc;
  for (const byte of bytes) {
    next = (next >>> 8) ^ CRC32_TABLE[(next ^ byte) & 0xff]!;
  }
  return next >>> 0;
}

interface ZipEntryStream {
  on(event: "data", callback: (chunk: Uint8Array) => void): ZipEntryStream;
  on(event: "end", callback: () => void): ZipEntryStream;
  on(event: "error", callback: (error: Error) => void): ZipEntryStream;
  pause(): ZipEntryStream;
  resume(): ZipEntryStream;
}

export function asArray<T>(v: T | T[] | undefined | null): T[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

/** Resolve a relationship target against the source part's folder. */
export function resolveRelTarget(baseDir: string, target: string): string {
  const joined = `${baseDir}/${target}`.replace(/\\/g, "/");
  const parts: string[] = [];
  for (const seg of joined.split("/")) {
    if (!seg || seg === ".") continue;
    if (seg === "..") parts.pop();
    else parts.push(seg);
  }
  return parts.join("/");
}

/** The `r:id` attribute of a `p:sldId` / `p:sldMasterId` element. */
export function relIdFromSldId(sldId: Record<string, unknown>): string {
  for (const [k, v] of Object.entries(sldId)) {
    if (!k.startsWith("@_")) continue;
    const val = String(v);
    if (/^rId\d+$/i.test(val)) return val;
  }
  return "";
}

function declaredUncompressedSize(entry: JSZip.JSZipObject): number {
  const data = (entry as unknown as { _data?: { uncompressedSize?: number } })._data;
  const n = data?.uncompressedSize;
  return typeof n === "number" && n > 0 ? n : 0;
}

function declaredCrc32(entry: JSZip.JSZipObject): number | undefined {
  const data = (entry as unknown as { _data?: { crc32?: number } })._data;
  return typeof data?.crc32 === "number" ? data.crc32 >>> 0 : undefined;
}

function dirOf(path: string): string {
  return path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
}

function relsPathFor(partPath: string): string {
  const dir = dirOf(partPath);
  const base = partPath.slice(partPath.lastIndexOf("/") + 1);
  return dir ? `${dir}/_rels/${base}.rels` : `_rels/${base}.rels`;
}

const parserCache = new Map<string, XMLParser>();

function parserFor(isArray: readonly string[]): XMLParser {
  const key = [...isArray].sort().join("|");
  let parser = parserCache.get(key);
  if (!parser) {
    const names = new Set(isArray);
    parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      removeNSPrefix: true,
      isArray: (name) => names.has(name),
    });
    parserCache.set(key, parser);
  }
  return parser;
}

export async function openOoxmlPackage(
  input: Uint8Array | Buffer,
  opts: { maxEntries: number }
): Promise<OoxmlPackage> {
  const { maxEntries } = opts;
  const warnings: string[] = [];

  assertZipArchiveSafe(input.byteLength);
  // JSZip's checkCRC32 option eagerly inflates every entry before returning,
  // which defeats all central-directory and streaming zip-bomb limits below.
  // CRC is instead verified per entry while bounded chunks are consumed.
  const zip = await JSZip.loadAsync(input, { checkCRC32: false });
  const entries = Object.values(zip.files).filter((f) => !f.dir);
  const entryCount = entries.length;
  let declaredTotal = 0;
  entries.forEach((entry, index) => {
    const declared = declaredUncompressedSize(entry);
    declaredTotal += declared;
    assertZipEntrySafe({
      entryCount: index + 1,
      uncompressedSize: declared,
      totalUncompressed: declaredTotal,
      isMedia: /^ppt\/media\//i.test(entry.name),
      maxEntries,
    });
  });

  /** Actual decompressed bytes read so far (authoritative vs declared sizes). */
  let bytesRead = 0;
  const textCache = new Map<string, string>();

  function inflate(path: string, file: JSZip.JSZipObject, isMedia: boolean): Promise<Uint8Array> {
    const stream = (
      file as unknown as { internalStream(type: "uint8array"): ZipEntryStream }
    ).internalStream("uint8array");
    const chunks: Uint8Array[] = [];
    let entryBytes = 0;
    let crc = 0xffffffff;

    return new Promise<Uint8Array>((resolve, reject) => {
      let settled = false;
      const fail = (error: unknown): void => {
        if (settled) return;
        settled = true;
        try {
          stream.pause();
        } catch {
          // The worker may already have stopped after a decompression error.
        }
        reject(error instanceof Error ? error : new Error(String(error)));
      };

      stream
        .on("data", (chunk) => {
          if (settled) return;
          try {
            const nextEntryBytes = entryBytes + chunk.byteLength;
            assertZipEntrySafe({
              entryCount,
              uncompressedSize: nextEntryBytes,
              totalUncompressed: bytesRead + nextEntryBytes,
              isMedia,
              maxEntries,
            });
            entryBytes = nextEntryBytes;
            crc = updateCrc32(crc, chunk);
            chunks.push(chunk);
          } catch (error) {
            fail(error);
          }
        })
        .on("error", fail)
        .on("end", () => {
          if (settled) return;
          const expectedCrc = declaredCrc32(file);
          const actualCrc = (crc ^ 0xffffffff) >>> 0;
          if (expectedCrc !== undefined && actualCrc !== expectedCrc) {
            fail(new Error(`Corrupted zip entry '${path}': CRC32 mismatch`));
            return;
          }
          settled = true;
          bytesRead += entryBytes;
          const bytes = new Uint8Array(entryBytes);
          let offset = 0;
          for (const chunk of chunks) {
            bytes.set(chunk, offset);
            offset += chunk.byteLength;
          }
          resolve(bytes);
        })
        .resume();
    });
  }

  async function readBytes(path: string, options: { isMedia?: boolean } = {}): Promise<Uint8Array | null> {
    const file = zip.file(path);
    if (!file) return null;
    const isMedia = options.isMedia ?? /^ppt\/media\//i.test(path);
    return inflate(path, file, isMedia);
  }

  async function readText(path: string): Promise<string | null> {
    const cached = textCache.get(path);
    if (cached !== undefined) return cached;
    const bytes = await readBytes(path, { isMedia: false });
    if (bytes == null) return null;
    const text = bytesToUtf8(bytes);
    if (/<!DOCTYPE/i.test(text)) {
      throw new Error(`${path} contains a DOCTYPE; PowerPoint files never need one.`);
    }
    textCache.set(path, text);
    return text;
  }

  async function readXml(
    path: string,
    options: { isArray?: string[] } = {}
  ): Promise<Record<string, unknown> | null> {
    const text = await readText(path);
    if (text == null) return null;
    return parserFor(options.isArray ?? []).parse(text) as Record<string, unknown>;
  }

  const defaults = new Map<string, string>();
  const overrides = new Map<string, string>();
  const ctDoc = await readXml("[Content_Types].xml", { isArray: ["Default", "Override"] });
  if (!ctDoc) {
    warnings.push("Missing [Content_Types].xml — continuing with filename heuristics.");
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

  function contentType(path: string): string | null {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    const override = overrides.get(normalized);
    if (override) return override;
    const ext = path.includes(".") ? path.slice(path.lastIndexOf(".") + 1).toLowerCase() : "";
    return defaults.get(ext) || null;
  }

  function partSize(path: string): number | null {
    const file = zip.file(path);
    if (!file || file.dir) return null;
    return declaredUncompressedSize(file);
  }

  async function rels(partPath: string): Promise<Map<string, OoxmlRelationship>> {
    const out = new Map<string, OoxmlRelationship>();
    const doc = await readXml(relsPathFor(partPath), { isArray: ["Relationship"] });
    const root = (doc?.["Relationships"] ?? {}) as Record<string, unknown>;
    for (const rel of asArray(root["Relationship"])) {
      const r = rel as Record<string, unknown>;
      const rawTarget = String(r["@_Target"] ?? "");
      const external = String(r["@_TargetMode"] ?? "") === "External";
      const target = external
        ? rawTarget
        : rawTarget.startsWith("/")
          ? resolveRelTarget("", rawTarget)
          : resolveRelTarget(dirOf(partPath), rawTarget);
      out.set(String(r["@_Id"] ?? ""), { target, type: String(r["@_Type"] ?? ""), external });
    }
    return out;
  }

  return {
    partNames: () => entries.map((e) => e.name),
    readXml,
    readText,
    readBytes,
    partSize,
    rels,
    contentType,
    warnings,
  };
}
