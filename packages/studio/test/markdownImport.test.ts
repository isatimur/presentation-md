import { describe, expect, it } from "vitest";
import {
  assertStudioImportFileSize,
  importMarkdownFile,
  MAX_STUDIO_DECK_JSON_BYTES,
  MAX_STUDIO_PPTX_FILE_BYTES,
  MAX_STUDIO_TEXT_FILE_BYTES,
  parseDeckFile,
} from "../src/export/downloads.js";
import {
  MAX_STUDIO_DECK_COLLECTION_ITEMS,
  MAX_STUDIO_DECK_SLIDES,
} from "../src/deckGuard.js";

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

  it("rejects malformed slide entries before they replace the current deck", () => {
    expect(() =>
      parseDeckFile("broken.json", '{"type":"deck","slides":[null]}')
    ).toThrow(/slide 1/i);
  });

  it.each([
    [
      "chart values that would crash the renderer",
      { layout: "chart", series: [{ name: "Revenue", values: "1,2" }] },
      /series\[1\]\.values must be an array of numbers/i,
    ],
    [
      "non-string table cells",
      { layout: "data-table", rows: [["Safe", { nested: true }]] },
      /rows cells must be strings/i,
    ],
    [
      "non-string card fields",
      { layout: "feature-grid", cards: [{ title: 42 }] },
      /cards\[1\]\.title must be a string/i,
    ],
  ])("rejects %s", (_name, slide, expected) => {
    expect(() =>
      parseDeckFile("broken.json", JSON.stringify({ type: "deck", slides: [slide] }))
    ).toThrow(expected);
  });

  it("rejects Deck JSON that exceeds the Studio memory budget", () => {
    const json = JSON.stringify({
      type: "deck",
      slides: [{ layout: "title", heading: "x".repeat(MAX_STUDIO_DECK_JSON_BYTES) }],
    });
    expect(() => parseDeckFile("oversized.json", json)).toThrow(/Deck JSON.*too large/i);
  });

  it("rejects excessive slide and nested collection counts", () => {
    const slides = Array.from({ length: MAX_STUDIO_DECK_SLIDES + 1 }, () => ({
      layout: "title",
    }));
    expect(() => parseDeckFile("too-many-slides.json", JSON.stringify({ type: "deck", slides })))
      .toThrow(/too many slides/i);

    const categories = Array.from(
      { length: MAX_STUDIO_DECK_COLLECTION_ITEMS + 1 },
      (_, index) => `C${index}`
    );
    expect(() =>
      parseDeckFile(
        "too-complex.json",
        JSON.stringify({ type: "deck", slides: [{ layout: "chart", categories }] })
      )
    ).toThrow(/too many nested items/i);
  });
});

describe("assertStudioImportFileSize", () => {
  it("rejects oversized text and PPTX files before reading them", () => {
    expect(() =>
      assertStudioImportFileSize({ name: "huge.json", size: MAX_STUDIO_TEXT_FILE_BYTES + 1 })
    ).toThrow(/huge\.json.*too large.*10 MiB/i);
    expect(() =>
      assertStudioImportFileSize({ name: "huge.pptx", size: MAX_STUDIO_PPTX_FILE_BYTES + 1 })
    ).toThrow(/huge\.pptx.*too large.*50 MiB/i);
  });

  it("accepts files exactly at their byte limit", () => {
    expect(() =>
      assertStudioImportFileSize({ name: "deck.html", size: MAX_STUDIO_TEXT_FILE_BYTES })
    ).not.toThrow();
    expect(() =>
      assertStudioImportFileSize({ name: "deck.pptx", size: MAX_STUDIO_PPTX_FILE_BYTES })
    ).not.toThrow();
  });
});
