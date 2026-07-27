import { describe, it, expect } from "vitest";
import { buildThemeViewFromBrand } from "../src/theme-view.js";
import type { BrandExtractionResult } from "../src/extract-brand.js";

const EXTRACTION: BrandExtractionResult = {
  palette: {
    bg: "#0a0a0a",
    bg2: "#111111",
    text: "#fafafa",
    muted: "#999999",
    accent: "#22c55e",
    accent2: "#22c55e",
    cardBg: "#111111",
    border: "#1a1a1a",
  },
  headingFont: "Poppins",
  bodyFont: "Inter",
  source: "static",
  adjustments: [],
};

describe("buildThemeViewFromBrand", () => {
  it("maps a brand extraction result onto a valid ThemeView", () => {
    const view = buildThemeViewFromBrand("acme-com", EXTRACTION);
    expect(view.name).toBe("acme-com");
    expect(view.underscored).toBe("acme_com");
    expect(view.bg).toBe("#0a0a0a");
    expect(view.accent).toBe("#22c55e");
    expect(view.headingFont).toBe("Poppins");
    expect(view.bodyFont).toBe("Inter");
    expect(view.headingFontSpec).toContain("Poppins");
    expect(view.bodyFontSpec).toContain("Inter");
    expect(typeof view.headingWeight).toBe("number");
  });

  it("mentions the extraction source in the generated description", () => {
    const view = buildThemeViewFromBrand("acme-com", EXTRACTION);
    expect(view.description.toLowerCase()).toContain("brand");
  });
});
