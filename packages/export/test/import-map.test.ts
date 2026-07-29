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
});
