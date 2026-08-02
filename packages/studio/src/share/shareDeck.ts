import type { DeckJson } from "@presentation-md/export";
import {
  decodeShareDeck as coreDecodeShareDeck,
  encodeShareDeck as coreEncodeShareDeck,
  readShareTokenFromLocation,
  studioShareLink as coreStudioShareLink,
  MAX_SHARE_TOKEN_CHARS,
} from "@presentation-md/core";
import { studioDeckError } from "../deckGuard.js";

export { MAX_SHARE_TOKEN_CHARS, readShareTokenFromLocation };

/**
 * Compress Deck JSON into a URL-safe token (`d1.<base64url-deflate>`).
 * Beats frontend-slides file-drop sharing for Studio — one link restores the editable deck.
 */
export async function encodeShareDeck(deck: DeckJson): Promise<string> {
  return coreEncodeShareDeck(deck);
}

/** Decode a `d1.` share token back to Deck JSON, or null if invalid. */
export async function decodeShareDeck(token: string): Promise<DeckJson | null> {
  const deck = await coreDecodeShareDeck(token);
  return deck && !studioDeckError(deck) ? (deck as DeckJson) : null;
}

/** Build a Studio path that hydrates `deck` via `?d=` share token (relative; Toolbar adds origin). */
export async function studioShareLink(deck: DeckJson): Promise<string> {
  let pathname = "/studio/";
  let origin = "https://presentation-md.vercel.app";
  if (typeof window !== "undefined") {
    origin = window.location.origin;
    const { pathname: p } = window.location;
    // Hosted `/studio`, local Vite root `/`, or any studio subpath.
    if (p.startsWith("/studio")) pathname = p;
    else if (p === "/" || p === "") pathname = "/";
  }
  return coreStudioShareLink(deck, { origin, pathname, relative: true });
}
