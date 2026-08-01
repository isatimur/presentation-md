/**
 * Shareable Studio deck links (`?d=d1.<base64url-deflate-raw>`).
 * Uses CompressionStream (Node 22+ / modern browsers) so MCP agents and Studio
 * produce the same token — hand users an editable deck URL after scaffold/audit.
 */

export const MAX_SHARE_TOKEN_CHARS = 28_000;
export const SHARE_PREFIX = "d1.";
export const DEFAULT_STUDIO_ORIGIN = "https://presentation-md.vercel.app";

export type ShareDeckLike = {
  type: string;
  slides: unknown[];
  meta?: object;
};

function bytesToBase64Url(bytes: Uint8Array): string {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  const b64 =
    typeof btoa === "function"
      ? btoa(bin)
      : Buffer.from(bytes).toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(token: string): Uint8Array {
  const pad = token.length % 4 === 0 ? "" : "=".repeat(4 - (token.length % 4));
  const b64 = token.replace(/-/g, "+").replace(/_/g, "/") + pad;
  if (typeof atob === "function") {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  return new Uint8Array(Buffer.from(b64, "base64"));
}

async function deflateRaw(bytes: Uint8Array): Promise<Uint8Array> {
  if (typeof CompressionStream === "undefined") {
    throw new Error("CompressionStream unavailable — Node 22+ or a modern browser required");
  }
  const part = new Uint8Array(bytes);
  const stream = new Blob([part]).stream().pipeThrough(new CompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function inflateRaw(bytes: Uint8Array): Promise<Uint8Array> {
  if (typeof DecompressionStream === "undefined") {
    throw new Error("DecompressionStream unavailable — Node 22+ or a modern browser required");
  }
  const part = new Uint8Array(bytes);
  const stream = new Blob([part]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function utf8Encode(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function utf8Decode(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

export function isShareDeck(value: unknown): value is ShareDeckLike {
  if (!value || typeof value !== "object") return false;
  const deck = value as Record<string, unknown>;
  return deck["type"] === "deck" && Array.isArray(deck["slides"]) && deck["slides"].length > 0;
}

/** Compress Deck JSON into a URL-safe token (`d1.<base64url-deflate>`). */
export async function encodeShareDeck(deck: ShareDeckLike): Promise<string> {
  if (!isShareDeck(deck)) throw new Error("Invalid deck — nothing to share");
  const json = JSON.stringify(deck);
  const compressed = await deflateRaw(utf8Encode(json));
  const token = `${SHARE_PREFIX}${bytesToBase64Url(compressed)}`;
  if (token.length > MAX_SHARE_TOKEN_CHARS) {
    throw new Error(
      `Deck too large to share in a URL (${token.length} chars) — write JSON / use export_deck instead`
    );
  }
  return token;
}

/** Decode a `d1.` share token back to Deck JSON, or null if invalid. */
export async function decodeShareDeck(token: string): Promise<ShareDeckLike | null> {
  const raw = token.trim();
  if (!raw.startsWith(SHARE_PREFIX)) return null;
  try {
    const bytes = base64UrlToBytes(raw.slice(SHARE_PREFIX.length));
    const json = utf8Decode(await inflateRaw(bytes));
    const parsed: unknown = JSON.parse(json);
    return isShareDeck(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export type StudioShareLinkOptions = {
  /** Origin for absolute URLs (default: hosted Studio). */
  origin?: string;
  /** Pathname under the origin (default `/studio/`). */
  pathname?: string;
  /** When true, return pathname+query only. */
  relative?: boolean;
};

/** Build a Studio URL that hydrates `deck` via `?d=` share token. */
export async function studioShareLink(
  deck: ShareDeckLike,
  options: StudioShareLinkOptions = {}
): Promise<string> {
  const token = await encodeShareDeck(deck);
  const origin = (options.origin ?? DEFAULT_STUDIO_ORIGIN).replace(/\/$/, "");
  const pathname = options.pathname ?? "/studio/";
  const url = new URL(pathname, `${origin}/`);
  url.searchParams.set("d", token);
  url.searchParams.set("fresh", "1");
  url.searchParams.delete("example");
  if (options.relative) {
    return `${url.pathname}?${url.searchParams.toString()}`;
  }
  return url.toString();
}

export function readShareTokenFromLocation(search = "", hash = ""): string | null {
  try {
    const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
    const fromQuery = params.get("d")?.trim();
    if (fromQuery) return fromQuery;
    const hashBody = hash.startsWith("#") ? hash.slice(1) : hash;
    if (hashBody.startsWith("d=")) return decodeURIComponent(hashBody.slice(2));
    const hashParams = new URLSearchParams(hashBody);
    return hashParams.get("d")?.trim() || null;
  } catch {
    return null;
  }
}
