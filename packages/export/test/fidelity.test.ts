import { describe, expect, it } from "vitest";
import type { ResolvedTheme } from "@presentation-md/core";
import { buildPptx, fontFidelity, type DeckJson, type FidelityItem } from "../src/index.js";

function themeWith(headingFont: string, bodyFont: string, googleFonts: string[] = []): ResolvedTheme {
  return {
    name: "test",
    version: "1.0.0",
    manifest: { name: "test", version: "1.0.0" },
    palette: {
      bg: "#ffffff",
      bg2: "#f4f4f5",
      text: "#111111",
      muted: "#555555",
      accent: "#7c3aed",
      accent2: "#22d3ee",
      cardBg: "#ffffff",
      border: "#dddddd",
    },
    typography: { headingFont, bodyFont, headingWeight: 700, googleFonts },
    geometry: { radius: "12px", slideWidth: "1280px" },
  };
}

describe("fontFidelity", () => {
  it("reports web fonts PowerPoint will substitute and says whether Google Slides has them", () => {
    const items = fontFidelity(themeWith("'Syne', sans-serif", "'Inter', sans-serif", ["Syne:wght@700", "Inter:wght@400"]));
    expect(items.map((i) => i.kind)).toEqual(["font", "font"]);
    expect(items[0]!.message).toContain('Heading font "Syne"');
    expect(items[0]!.message).toContain("Google Slides has it");
    expect(items[1]!.message).toContain('Body font "Inter"');
    expect(items.every((i) => i.slide === undefined)).toBe(true);
  });

  it("is quiet for Office fonts and reports a shared family once", () => {
    expect(fontFidelity(themeWith("Georgia, serif", "'Segoe UI', sans-serif"))).toEqual([]);
    const shared = fontFidelity(themeWith("'Space Grotesk', sans-serif", "'Space Grotesk', sans-serif"));
    expect(shared).toHaveLength(1);
    expect(shared[0]!.message).toContain("Google Slides will also substitute it");
  });

  it("treats a generic-only stack as Arial (Office font)", () => {
    expect(fontFidelity(themeWith("system-ui, sans-serif", "sans-serif"))).toEqual([]);
  });
});

describe("buildPptx fidelity report", () => {
  it("tags each warning with a kind and slide, keeps warnings unchanged, and calls onFidelity", async () => {
    const deck: DeckJson = {
      type: "deck",
      meta: { title: "Fidelity", theme: "test" },
      slides: [
        { layout: "title", heading: "Hi" },
        { layout: "chart", heading: "Empty", chartType: "bar", categories: [], series: [] },
        { layout: "custom-html", heading: "Art", html: "<div><p>Hello</p></div>" },
        { layout: "two-column", heading: "Img", body: "x", image: "https://example.invalid/a.png", imageAlt: "a" },
      ],
    } as DeckJson;
    const seen: FidelityItem[] = [];
    const result = await buildPptx(deck, themeWith("'Syne', sans-serif", "Arial"), {
      onFidelity: (item) => seen.push(item),
    });
    expect(seen).toEqual(result.fidelity);

    const fonts = result.fidelity.filter((i) => i.kind === "font");
    expect(fonts).toHaveLength(1);

    const perSlide = result.fidelity.filter((i) => i.kind !== "font");
    expect(perSlide.map((i) => i.message)).toEqual(result.warnings);
    expect(perSlide).toContainEqual(expect.objectContaining({ kind: "skipped", slide: 2 }));
    expect(perSlide).toContainEqual(expect.objectContaining({ kind: "approximated", slide: 3 }));
    expect(perSlide).toContainEqual(expect.objectContaining({ kind: "image", slide: 4 }));
    for (const item of perSlide) expect(item.message.startsWith(`Slide ${item.slide}:`)).toBe(true);
  });
});
