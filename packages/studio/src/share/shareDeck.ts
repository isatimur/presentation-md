import type { DeckJson } from "@presentation-md/export";

/** Practical share-URL budget (Slack/email clients truncate long links). */
export const MAX_SHARE_TOKEN_CHARS = 28_000;

const SHARE_PREFIX = "d1.";

function bytesToBase64Url(bytes: Uint8Array): string {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(token: string): Uint8Array {
  const pad = token.length % 4 === 0 ? "" : "=".repeat(4 - (token.length % 4));
  const b64 = token.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function deflateRaw(bytes: Uint8Array): Promise<Uint8Array> {
  if (typeof CompressionStream === "undefined") {
    throw new Error("CompressionStream unavailable — use a modern browser");
  }
  const part = new Uint8Array(bytes);
  const stream = new Blob([part]).stream().pipeThrough(new CompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function inflateRaw(bytes: Uint8Array): Promise<Uint8Array> {
  if (typeof DecompressionStream === "undefined") {
    throw new Error("DecompressionStream unavailable — use a modern browser");
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

function isDeckJson(value: unknown): value is DeckJson {
  if (!value || typeof value !== "object") return false;
  const deck = value as Record<string, unknown>;
  return deck["type"] === "deck" && Array.isArray(deck["slides"]) && deck["slides"].length > 0;
}

/**
 * Compress Deck JSON into a URL-safe token (`d1.<base64url-deflate>`).
 * Beats frontend-slides file-drop sharing for Studio — one link restores the editable deck.
 */
export async function encodeShareDeck(deck: DeckJson): Promise<string> {
  if (!isDeckJson(deck)) throw new Error("Invalid deck — nothing to share");
  const json = JSON.stringify(deck);
  const compressed = await deflateRaw(utf8Encode(json));
  const token = `${SHARE_PREFIX}${bytesToBase64Url(compressed)}`;
  if (token.length > MAX_SHARE_TOKEN_CHARS) {
    throw new Error(
      `Deck too large to share in a URL (${token.length} chars) — Download JSON instead`
    );
  }
  return token;
}

/** Decode a `d1.` share token back to Deck JSON, or null if invalid. */
export async function decodeShareDeck(token: string): Promise<DeckJson | null> {
  const raw = token.trim();
  if (!raw.startsWith(SHARE_PREFIX)) return null;
  try {
    const bytes = base64UrlToBytes(raw.slice(SHARE_PREFIX.length));
    const json = utf8Decode(await inflateRaw(bytes));
    const parsed: unknown = JSON.parse(json);
    return isDeckJson(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Build a Studio path that hydrates `deck` via `?d=` share token. */
export async function studioShareLink(deck: DeckJson): Promise<string> {
  const token = await encodeShareDeck(deck);
  let path = "/studio/";
  if (typeof window !== "undefined") {
    const { pathname } = window.location;
    // Hosted `/studio`, local Vite root `/`, or any studio subpath.
    if (pathname.startsWith("/studio")) path = pathname;
    else if (pathname === "/" || pathname === "") path = "/";
  }
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://presentation-md.vercel.app";
  const url = new URL(path, origin);
  url.searchParams.set("d", token);
  url.searchParams.set("fresh", "1");
  url.searchParams.delete("example");
  return `${url.pathname}?${url.searchParams.toString()}`;
}

export function readShareTokenFromLocation(
  search = typeof window !== "undefined" ? window.location.search : "",
  hash = typeof window !== "undefined" ? window.location.hash : ""
): string | null {
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
