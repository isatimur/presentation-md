import { describe, expect, it } from "vitest";
import { EXAMPLE_DECK } from "../src/deck.js";
import {
  decodeShareDeck,
  encodeShareDeck,
  MAX_SHARE_TOKEN_CHARS,
  readShareTokenFromLocation,
  studioShareLink,
} from "../src/share/shareDeck.js";

describe("shareDeck", () => {
  it("round-trips EXAMPLE_DECK through deflate share tokens", async () => {
    const token = await encodeShareDeck(EXAMPLE_DECK);
    expect(token.startsWith("d1.")).toBe(true);
    expect(token.length).toBeLessThan(MAX_SHARE_TOKEN_CHARS);
    const restored = await decodeShareDeck(token);
    expect(restored?.type).toBe("deck");
    expect(restored?.meta?.title).toBe(EXAMPLE_DECK.meta?.title);
    expect(restored?.slides).toHaveLength(EXAMPLE_DECK.slides.length);
    expect(restored?.slides[0]?.layout).toBe(EXAMPLE_DECK.slides[0]?.layout);
  });

  it("rejects garbage tokens", async () => {
    expect(await decodeShareDeck("not-a-token")).toBeNull();
    expect(await decodeShareDeck("d1.!!!!")).toBeNull();
  });

  it("reads share tokens from query or hash", () => {
    expect(readShareTokenFromLocation("?d=d1.abc&fresh=1", "")).toBe("d1.abc");
    expect(readShareTokenFromLocation("", "#d=d1.xyz")).toBe("d1.xyz");
  });

  it("builds a Studio ?d= share path", async () => {
    const link = await studioShareLink(EXAMPLE_DECK);
    expect(link).toMatch(/[?&]d=d1\./);
    expect(link).toMatch(/fresh=1/);
    expect(link).not.toMatch(/example=/);
  });
});
