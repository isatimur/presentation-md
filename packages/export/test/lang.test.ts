import { describe, expect, it } from "vitest";
import type { ResolvedTheme } from "@presentation-md/core";
import { deckToPptxBuffer, type DeckJson } from "../src/index.js";

const theme: ResolvedTheme = {
  name: "test",
  version: "1.0.0",
  manifest: { name: "test", version: "1.0.0" },
  palette: {
    bg: "#0e0e12",
    bg2: "#16161d",
    text: "#f4f4f5",
    muted: "#a1a1aa",
    accent: "#7c3aed",
    accent2: "#22d3ee",
    cardBg: "#1a1a22",
    border: "#2a2a33",
  },
  typography: {
    headingFont: "'Montserrat', system-ui, sans-serif",
    bodyFont: "'Open Sans', system-ui, sans-serif",
    headingWeight: 800,
    googleFonts: [],
  },
  geometry: { radius: "18px", slideWidth: "1280px" },
};

function deck(lang?: string): DeckJson {
  return {
    type: "deck",
    meta: { title: "Lang", theme: "test", ...(lang ? { lang } : {}) },
    slides: [
      { layout: "title", heading: "عنوان العرض", lead: "سطر فرعي" },
      { layout: "closing", heading: "شكرا" },
    ],
  } as DeckJson;
}

async function slideXml(d: DeckJson, n = 1): Promise<string> {
  const JSZip = (await import("jszip")).default;
  const buf = await deckToPptxBuffer(d, theme, { attribution: false });
  const zip = await JSZip.loadAsync(buf);
  return (await zip.file(`ppt/slides/slide${n}.xml`)?.async("string")) ?? "";
}

describe("PPTX deck language", () => {
  it("tags Arabic runs with lang=ar and right-to-left paragraphs", async () => {
    const xml = await slideXml(deck("ar"));
    expect(xml).toMatch(/lang="ar"/);
    expect(xml).toMatch(/rtl="1"/);
  });

  it("tags Japanese runs with lang=ja and keeps left-to-right", async () => {
    const xml = await slideXml(deck("ja"));
    expect(xml).toMatch(/lang="ja"/);
    expect(xml).not.toMatch(/rtl="1"/);
  });

  it("tags data-table cells and chart XML with the deck language", async () => {
    const d = {
      type: "deck",
      meta: { title: "Lang", theme: "test", lang: "ar" },
      slides: [
        {
          layout: "data-table",
          heading: "جدول",
          columns: ["الربع", "الإيرادات"],
          rows: [["الأول", "١٠"], ["الثاني", "١٢"]],
        },
        {
          layout: "chart",
          heading: "نمو",
          chartType: "bar",
          categories: ["أ", "ب"],
          series: [{ name: "الإيرادات", values: [10, 12] }],
        },
      ],
    } as DeckJson;
    const JSZip = (await import("jszip")).default;
    const buf = await deckToPptxBuffer(d, theme, { attribution: false });
    const zip = await JSZip.loadAsync(buf);
    const table = (await zip.file("ppt/slides/slide1.xml")?.async("string")) ?? "";
    expect(table).toContain("<a:tbl>");
    expect(table).not.toMatch(/<a:tbl>[\s\S]*lang="en-US"[\s\S]*<\/a:tbl>/);
    expect(table).toMatch(/<a:tbl>[\s\S]*lang="ar"[\s\S]*<\/a:tbl>/);
    const chartFile = Object.keys(zip.files).find((f) => /^ppt\/charts\/chart\d+\.xml$/.test(f));
    expect(chartFile).toBeTruthy();
    const chart = (await zip.file(chartFile!)?.async("string")) ?? "";
    // pptxgenjs writes the chart language as lang="…" on the chart's text properties.
    expect(chart).toMatch(/lang="ar"/);
    expect(chart).not.toMatch(/lang="en-US"/);
  });

  it("keeps the en-US default when no lang is set", async () => {
    const xml = await slideXml(deck());
    expect(xml).toMatch(/lang="en-US"/);
    expect(xml).not.toMatch(/rtl="1"/);
  });
});
