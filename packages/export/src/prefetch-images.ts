import type { DeckJson, Slide } from "./deck-types.js";

export interface PrefetchImagesOptions {
  /** Override fetch (tests / custom agents). Defaults to global `fetch`. */
  fetch?: typeof globalThis.fetch;
  /** Max bytes per image (default 8 MiB). Oversized remotes are skipped with a warning. */
  maxBytes?: number;
}

export interface PrefetchImagesResult {
  deck: DeckJson;
  warnings: string[];
}

const DEFAULT_MAX_BYTES = 8 * 1024 * 1024;

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
  return "image/png";
}

/**
 * Prefetch remote `http(s)` slide images to `data:` URIs so PPTX export can
 * embed them. Mirrors Studio's pre-export step for CLI / MCP / Node callers.
 * Data URIs and non-http sources are left untouched.
 */
export async function prefetchDeckImages(
  deck: DeckJson,
  opts: PrefetchImagesOptions = {}
): Promise<PrefetchImagesResult> {
  const warnings: string[] = [];
  const fetchImpl = opts.fetch ?? globalThis.fetch;
  const maxBytes = opts.maxBytes ?? DEFAULT_MAX_BYTES;

  if (typeof fetchImpl !== "function") {
    warnings.push(
      "Remote image prefetch unavailable (no fetch); remote URLs will not embed in PPTX."
    );
    return { deck, warnings };
  }

  const slides: Slide[] = [];
  for (const slide of deck.slides ?? []) {
    const src = slide.image;
    if (!src || src.startsWith("data:") || !/^https?:\/\//i.test(src)) {
      slides.push(slide);
      continue;
    }
    try {
      const res = await fetchImpl(src);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = new Uint8Array(await res.arrayBuffer());
      if (buffer.byteLength === 0) throw new Error("empty response");
      if (buffer.byteLength > maxBytes) {
        throw new Error(`image exceeds ${maxBytes} byte limit (${buffer.byteLength} bytes)`);
      }
      const headerType = (res.headers?.get?.("content-type") ?? "").split(";")[0]?.trim() ?? "";
      const mime = sniffMime(buffer, headerType || "image/png");
      const dataUri = `data:${mime};base64,${bytesToBase64(buffer)}`;
      slides.push({ ...slide, image: dataUri });
    } catch (err) {
      warnings.push(`Could not prefetch image (${(err as Error).message}): ${src}`);
      slides.push(slide);
    }
  }

  return { deck: { ...deck, slides }, warnings };
}
