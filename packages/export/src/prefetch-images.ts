import { isAbsolute, resolve, sep } from "node:path";
import { realpath, readFile as fsReadFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { DeckJson, Slide } from "./deck-types.js";

export interface PrefetchImagesOptions {
  /** Override fetch (tests / custom agents). Defaults to global `fetch`. */
  fetch?: typeof globalThis.fetch;
  /** Max bytes per image (default 8 MiB). Oversized sources are skipped with a warning. */
  maxBytes?: number;
  /**
   * Directories under which local / `file:` paths may be read.
   * Defaults to `[process.cwd()]` when running in Node. Paths (and their
   * realpath targets) must stay inside one of these roots.
   */
  allowedRoots?: string[];
  /**
   * Override local file reads (tests). Defaults to `fs.promises.readFile`.
   * When unset and `fs` is unavailable (browser), local sources are skipped.
   */
  readFile?: (absolutePath: string) => Promise<Uint8Array>;
}

export interface PrefetchImagesResult {
  deck: DeckJson;
  warnings: string[];
}

const DEFAULT_MAX_BYTES = 8 * 1024 * 1024;
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|bmp|svg)$/i;

function bytesToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function sniffMime(bytes: Uint8Array, fallback: string): string {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    bytes.length >= 6 &&
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x38
  ) {
    return "image/gif";
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  if (fallback.startsWith("image/")) return fallback;
  if (fallback === "image/svg+xml" || fallback.endsWith("+xml")) return "image/svg+xml";
  return "image/png";
}

function mimeFromPath(filePath: string): string {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".bmp")) return "image/bmp";
  if (lower.endsWith(".avif")) return "image/avif";
  return "image/png";
}

function isHttpUrl(src: string): boolean {
  return /^https?:\/\//i.test(src);
}

function isFileUrl(src: string): boolean {
  return /^file:/i.test(src);
}

/**
 * True for absolute/relative filesystem paths (and `file:` URLs).
 * Rejects other schemes (`http:`, `data:`, `blob:`, …).
 */
function isLocalImageSource(src: string): boolean {
  if (!src || src.startsWith("data:") || isHttpUrl(src)) return false;
  if (isFileUrl(src)) return true;
  if (/^[a-z][a-z0-9+.-]*:/i.test(src)) return false; // other scheme
  if (isAbsolute(src)) return true;
  // Relative path — require an image extension so bare tokens aren't treated as files
  return IMAGE_EXT.test(src) || src.startsWith("./") || src.startsWith(".\\") || src.startsWith("../");
}

function defaultAllowedRoots(): string[] {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return [process.cwd()];
  }
  return [];
}

function normalizeRoot(root: string): string {
  const resolved = resolve(root);
  // Ensure trailing sep so `/tmp/foo` does not authorize `/tmp/foobar`
  return resolved.endsWith(sep) ? resolved : resolved + sep;
}

async function assertPathAllowed(
  absolutePath: string,
  allowedRoots: string[]
): Promise<string> {
  if (!allowedRoots.length) {
    throw new Error("local image prefetch requires allowedRoots (or process.cwd())");
  }
  if (absolutePath.includes("\0")) {
    throw new Error("path contains null byte");
  }

  let realTarget: string;
  try {
    realTarget = await realpath(absolutePath);
  } catch {
    // File may not exist yet / dangling — still constrain the resolved path
    realTarget = resolve(absolutePath);
  }

  const roots = allowedRoots.map(normalizeRoot);
  const ok = roots.some((root) => {
    const rootDir = root.slice(0, -1); // without trailing sep
    return realTarget === rootDir || realTarget.startsWith(root);
  });
  if (!ok) {
    throw new Error(`path outside allowedRoots: ${absolutePath}`);
  }
  return realTarget;
}

function resolveLocalPath(src: string): string {
  if (isFileUrl(src)) {
    // file:///path or file://localhost/path — fileURLToPath handles both
    return fileURLToPath(src);
  }
  return resolve(src);
}

async function readLocalBytes(
  src: string,
  opts: PrefetchImagesOptions
): Promise<{ bytes: Uint8Array; mimeHint: string }> {
  const allowedRoots = opts.allowedRoots ?? defaultAllowedRoots();
  const absolute = resolveLocalPath(src);
  const safePath = await assertPathAllowed(absolute, allowedRoots);

  const reader =
    opts.readFile ??
    (async (p: string) => {
      const buf = await fsReadFile(p);
      return new Uint8Array(buf);
    });

  const bytes = await reader(safePath);
  return { bytes, mimeHint: mimeFromPath(safePath) };
}

function toDataUri(bytes: Uint8Array, mimeHint: string): string {
  if (bytes.byteLength === 0) throw new Error("empty image");
  const mime = sniffMime(bytes, mimeHint || "image/png");
  return `data:${mime};base64,${bytesToBase64(bytes)}`;
}

/**
 * Prefetch slide images to `data:` URIs so PPTX export can embed them.
 * Supports remote `http(s)` URLs and local `file:` / filesystem paths (Node),
 * with path confinement to `allowedRoots`. Data URIs are left untouched.
 */
export async function prefetchDeckImages(
  deck: DeckJson,
  opts: PrefetchImagesOptions = {}
): Promise<PrefetchImagesResult> {
  const warnings: string[] = [];
  const fetchImpl = opts.fetch ?? globalThis.fetch;
  const maxBytes = opts.maxBytes ?? DEFAULT_MAX_BYTES;

  const slides: Slide[] = [];
  for (const slide of deck.slides ?? []) {
    const src = slide.image;
    if (!src || src.startsWith("data:")) {
      slides.push(slide);
      continue;
    }

    try {
      if (isHttpUrl(src)) {
        if (typeof fetchImpl !== "function") {
          warnings.push(
            `Remote image prefetch unavailable (no fetch); remote URL will not embed in PPTX: ${src}`
          );
          slides.push(slide);
          continue;
        }
        const res = await fetchImpl(src);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = new Uint8Array(await res.arrayBuffer());
        if (buffer.byteLength > maxBytes) {
          throw new Error(`image exceeds ${maxBytes} byte limit (${buffer.byteLength} bytes)`);
        }
        const headerType = (res.headers?.get?.("content-type") ?? "").split(";")[0]?.trim() ?? "";
        const dataUri = toDataUri(buffer, headerType || "image/png");
        slides.push({ ...slide, image: dataUri });
        continue;
      }

      if (isLocalImageSource(src)) {
        const { bytes, mimeHint } = await readLocalBytes(src, opts);
        if (bytes.byteLength > maxBytes) {
          throw new Error(`image exceeds ${maxBytes} byte limit (${bytes.byteLength} bytes)`);
        }
        const dataUri = toDataUri(bytes, mimeHint);
        slides.push({ ...slide, image: dataUri });
        continue;
      }

      // Unknown scheme / non-image relative token — leave as-is
      slides.push(slide);
    } catch (err) {
      warnings.push(`Could not prefetch image (${(err as Error).message}): ${src}`);
      slides.push(slide);
    }
  }

  return { deck: { ...deck, slides }, warnings };
}

/** @internal Exported for unit tests. */
export const __prefetchTestUtils = {
  isLocalImageSource,
  resolveLocalPath,
  assertPathAllowed,
};
