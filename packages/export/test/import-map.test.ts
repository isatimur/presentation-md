import { describe, it, expect } from "vitest";
import { validateDeckJson } from "@presentation-md/core";
import { mapExtractedToDeck } from "../src/import/index.js";
import type { ExtractedPresentation } from "../src/import/index.js";

function base(slides: ExtractedPresentation["slides"]): ExtractedPresentation {
  return { meta: { title: "T", author: "A" }, slides };
}

describe("mapExtractedToDeck", () => {
  it("maps first short slide to title", async () => {
    const { deck } = await mapExtractedToDeck(
      base([{ number: 1, title: "Hello", texts: ["Lead"], tables: [], images: [] }])
    );
    expect(deck.slides[0]!.layout).toBe("title");
    expect(validateDeckJson(JSON.stringify(deck)).valid).toBe(true);
  });

  it("maps tables to data-table", async () => {
    const { deck } = await mapExtractedToDeck(
      base([
        {
          number: 1,
          title: "KPIs",
          texts: [],
          tables: [
            ["A", "B"],
            ["1", "2"],
          ],
          images: [],
        },
      ])
    );
    expect(deck.slides[0]!.layout).toBe("data-table");
    expect(deck.slides[0]!.columns).toEqual(["A", "B"]);
  });

  it("maps quote-like content", async () => {
    const { deck } = await mapExtractedToDeck(
      base([
        {
          number: 1,
          title: "“Ship it” — Ada",
          texts: [],
          tables: [],
          images: [],
        },
      ])
    );
    expect(deck.slides[0]!.layout).toBe("quote");
  });

  it("maps paired texts to feature-grid", async () => {
    const { deck } = await mapExtractedToDeck(
      base([
        {
          number: 1,
          title: "Features",
          texts: ["One", "First", "Two", "Second", "Three", "Third"],
          tables: [],
          images: [],
        },
      ])
    );
    expect(deck.slides[0]!.layout).toBe("feature-grid");
    expect(deck.slides[0]!.cards).toHaveLength(3);
  });

  it("maps thank-you last slide to closing", async () => {
    const { deck } = await mapExtractedToDeck(
      base([
        { number: 1, title: "Intro", texts: ["x"], tables: [], images: [] },
        { number: 2, title: "Thank you", texts: ["https://example.com"], tables: [], images: [] },
      ])
    );
    expect(deck.slides[1]!.layout).toBe("closing");
  });

  it("defaults theme to claude", async () => {
    const { deck } = await mapExtractedToDeck(
      base([{ number: 1, title: "Hi", texts: [], tables: [], images: [] }])
    );
    expect(deck.meta?.theme).toBe("claude");
  });

  it("preserves speaker notes on mapped slides", async () => {
    const { deck } = await mapExtractedToDeck(
      base([
        {
          number: 1,
          title: "Hello",
          texts: ["Lead"],
          tables: [],
          images: [],
          notes: "Say this out loud",
        },
      ])
    );
    expect(deck.slides[0]!.notes).toBe("Say this out loud");
    expect(validateDeckJson(JSON.stringify(deck)).valid).toBe(true);
  });

  it("writes assetsDir image refs matching the write location", async () => {
    const { mkdtemp, readFile, rm } = await import("node:fs/promises");
    const { join, resolve } = await import("node:path");
    const assetsDir = await mkdtemp(join(process.cwd(), "import-assets-"));
    try {
      const png = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
      const { deck } = await mapExtractedToDeck(
        base([
          {
            number: 1,
            title: "With Image",
            texts: ["Body"],
            tables: [],
            images: [{ name: "slide1_img1.png", contentType: "image/png", bytes: png }],
          },
        ]),
        { assetsDir }
      );
      const image = deck.slides[0]!.image as string;
      expect(image.startsWith("data:")).toBe(false);
      expect(image).toContain("slide1_img1.png");
      expect(image).not.toBe("assets/slide1_img1.png");
      const written = await readFile(join(assetsDir, "slide1_img1.png"));
      expect(written.byteLength).toBe(png.byteLength);
      expect(resolve(process.cwd(), image)).toBe(join(assetsDir, "slide1_img1.png"));
    } finally {
      await rm(assetsDir, { recursive: true, force: true });
    }
  });
});
