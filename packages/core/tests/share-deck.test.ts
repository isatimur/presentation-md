import { describe, expect, it } from "vitest";
import {
  decodeShareDeck,
  encodeShareDeck,
  MAX_SHARE_JSON_BYTES,
  MAX_SHARE_TOKEN_CHARS,
  studioShareLink,
  readShareTokenFromLocation,
} from "../src/share-deck.js";

async function deflateToken(json: string): Promise<string> {
  const stream = new Blob([json]).stream().pipeThrough(new CompressionStream("deflate-raw"));
  const bytes = new Uint8Array(await new Response(stream).arrayBuffer());
  return `d1.${Buffer.from(bytes).toString("base64url")}`;
}

const DECK = {
  type: "deck",
  meta: { title: "Share Core", theme: "signal" },
  slides: [
    { layout: "title", heading: "Hello share" },
    { layout: "closing", heading: "Bye" },
  ],
};

describe("share-deck", () => {
  it("round-trips encode → decode", async () => {
    const token = await encodeShareDeck(DECK);
    expect(token.startsWith("d1.")).toBe(true);
    const decoded = await decodeShareDeck(token);
    expect(decoded?.meta?.title).toBe("Share Core");
    expect(decoded?.slides).toHaveLength(2);
  });

  it("builds a Studio URL with ?d= and fresh=1", async () => {
    const url = await studioShareLink(DECK);
    expect(url).toMatch(/^https:\/\/presentation-md\.vercel\.app\/studio\/\?/);
    expect(url).toMatch(/d=d1\./);
    expect(url).toMatch(/fresh=1/);
  });

  it("reads tokens from query and hash", () => {
    expect(readShareTokenFromLocation("?d=d1.abc", "")).toBe("d1.abc");
    expect(readShareTokenFromLocation("", "#d=d1.xyz")).toBe("d1.xyz");
  });

  it("refuses to create a share token whose inflated JSON exceeds the receiver limit", async () => {
    const oversized = {
      type: "deck",
      slides: [{ layout: "title", heading: "x".repeat(MAX_SHARE_JSON_BYTES) }],
    };
    await expect(encodeShareDeck(oversized)).rejects.toThrow(/too large.*share/i);
  });

  it("stops decoding a compressed token once inflated JSON exceeds the limit", async () => {
    const json = JSON.stringify({
      type: "deck",
      slides: [{ layout: "title", heading: "x".repeat(MAX_SHARE_JSON_BYTES) }],
    });
    const token = await deflateToken(json);
    expect(token.length).toBeLessThan(MAX_SHARE_TOKEN_CHARS);
    await expect(decodeShareDeck(token)).resolves.toBeNull();
  });

  it("rejects an oversized token before base64 decode or inflation", async () => {
    const oversized = `d1.${"A".repeat(MAX_SHARE_TOKEN_CHARS)}`;
    await expect(decodeShareDeck(oversized)).resolves.toBeNull();
    await expect(decodeShareDeck(undefined as unknown as string)).resolves.toBeNull();
  });
});
