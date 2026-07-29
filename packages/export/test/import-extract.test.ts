import { describe, it, expect } from "vitest";
import { resolve } from "node:path";
import { loadTheme } from "@presentation-md/core";
import { deckToPptxBuffer, type DeckJson } from "../src/index.js";
import { extractPptx } from "../src/import/index.js";

const themesDir = resolve(__dirname, "../../core/themes");

describe("extractPptx", () => {
  it("extracts titles and tables from an exported deck", async () => {
    const theme = await loadTheme("default-tech", { themesDir });
    const deck: DeckJson = {
      type: "deck",
      meta: { title: "Round Trip", company: "Acme", theme: "default-tech" },
      slides: [
        { layout: "title", heading: "Hello Title", lead: "Welcome lead" },
        {
          layout: "data-table",
          heading: "KPIs",
          columns: ["Metric", "Value"],
          rows: [
            ["ARR", "$1M"],
            ["NPS", "72"],
          ],
        },
      ],
    };
    const buf = await deckToPptxBuffer(deck, theme);
    const { extracted, warnings } = await extractPptx(buf);
    expect(extracted.meta.title).toBe("Round Trip");
    expect(extracted.slides).toHaveLength(2);
    expect(extracted.slides[0]!.title).toBe("Hello Title");
    expect(extracted.slides[0]!.texts.join(" ")).toContain("Welcome lead");
    expect(extracted.slides[1]!.title).toBe("KPIs");
    expect(extracted.slides[1]!.tables[0]).toEqual(["Metric", "Value"]);
    expect(extracted.slides[1]!.tables).toContainEqual(["ARR", "$1M"]);
    expect(Array.isArray(warnings)).toBe(true);
  });

  it("throws on invalid buffer", async () => {
    await expect(extractPptx(Buffer.from("not-a-pptx"))).rejects.toThrow();
  });
});
