import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import { loadTheme, validateDeckJson } from "@presentation-md/core";
import { deckToPptxBuffer, type DeckJson } from "../src/index.js";
import { pptxToDeck } from "../src/import/index.js";

const themesDir = resolve(__dirname, "../../core/themes");

describe("pptxToDeck round-trip", () => {
  it("preserves key content across export → import", async () => {
    const theme = await loadTheme("default-tech", { themesDir });
    const original: DeckJson = {
      type: "deck",
      meta: { title: "RT Deck", company: "Acme", theme: "default-tech" },
      slides: [
        { layout: "title", heading: "Hello Title", lead: "Welcome" },
        {
          layout: "feature-grid",
          heading: "Features",
          cards: [
            { title: "One", body: "First" },
            { title: "Two", body: "Second" },
            { title: "Three", body: "Third" },
          ],
        },
        {
          layout: "data-table",
          heading: "KPIs",
          columns: ["Metric", "Value"],
          rows: [
            ["ARR", "$1M"],
            ["NPS", "72"],
          ],
        },
        { layout: "quote", quote: "Ship daily", by: "Ada" },
        { layout: "closing", heading: "Thank you", lead: "Questions welcome" },
      ],
    };

    const buf = await deckToPptxBuffer(original, theme);
    const { deck, warnings } = await pptxToDeck(buf, { theme: "default-tech" });

    expect(validateDeckJson(JSON.stringify(deck)).valid).toBe(true);
    expect(deck.slides.length).toBeGreaterThanOrEqual(5);

    const headings = deck.slides.map((s) => (s.heading ?? s.quote ?? "").toLowerCase());
    expect(headings.some((h) => h.includes("hello title"))).toBe(true);
    expect(headings.some((h) => h.includes("features"))).toBe(true);
    expect(headings.some((h) => h.includes("kpis"))).toBe(true);
    expect(headings.some((h) => h.includes("thank"))).toBe(true);

    const table = deck.slides.find((s) => s.layout === "data-table");
    expect(table?.columns).toEqual(["Metric", "Value"]);
    expect(table?.rows).toContainEqual(["ARR", "$1M"]);

    expect(Array.isArray(warnings)).toBe(true);
  });
});
