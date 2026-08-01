import { describe, expect, it } from "vitest";
import { importMarkdownFile, parseDeckFile } from "../src/export/downloads.js";

const SAMPLE_MD = `---
title: Share Wave
theme: aurora-glass
---

# Hello markdown

Lead for the title slide.

---

## Why it matters

- Structured Deck JSON
- PPTX round-trip
- Craft gates
`;

describe("importMarkdownFile", () => {
  it("maps Marp-style markdown into Deck JSON", () => {
    const deck = importMarkdownFile(SAMPLE_MD);
    expect(deck.type).toBe("deck");
    expect(deck.meta?.title).toBe("Share Wave");
    expect(deck.meta?.theme).toBe("aurora-glass");
    expect(deck.slides.length).toBeGreaterThanOrEqual(2);
    expect(deck.slides[0]?.layout).toBe("title");
  });

  it("rejects empty markdown", () => {
    expect(() => importMarkdownFile("   ")).toThrow(/empty/i);
  });
});

describe("parseDeckFile markdown", () => {
  it("routes .md through markdownToDeck", () => {
    const deck = parseDeckFile("brief.md", SAMPLE_MD, "default-tech");
    expect(deck.meta?.theme).toBe("aurora-glass");
    expect(deck.slides[0]?.heading).toMatch(/Hello markdown/i);
  });

  it("still parses JSON decks", () => {
    const json = JSON.stringify({
      type: "deck",
      meta: { title: "J", theme: "claude" },
      slides: [{ layout: "title", heading: "Hi" }],
    });
    const deck = parseDeckFile("deck.json", json);
    expect(deck.meta?.title).toBe("J");
  });
});
