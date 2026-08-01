import { describe, expect, it } from "vitest";
import {
  decodeShareDeck,
  encodeShareDeck,
  studioShareLink,
  readShareTokenFromLocation,
} from "../src/share-deck.js";

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
});
