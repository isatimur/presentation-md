import { describe, it, expect } from "vitest";
import { pickExtendsFromBg } from "../src/index.js";
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
  stillFailing: [],
};

describe("pickExtendsFromBg", () => {
  it("maps light paper to claude and dark neon to default-tech", () => {
    expect(pickExtendsFromBg("#faf9f5")).toBe("claude");
    expect(pickExtendsFromBg("#ffffff")).toBe("claude");
    expect(pickExtendsFromBg("#0e0e12")).toBe("default-tech");
    expect(pickExtendsFromBg("#0a1628")).toBe("default-tech");
  });
});

describe("buildThemeViewFromBrand", () => {
  it("maps a brand extraction result onto a valid ThemeView", () => {
    const view = buildThemeViewFromBrand("acme-com", EXTRACTION);
    expect(view.name).toBe("acme-com");
    expect(view.underscored).toBe("acme_com");
    expect(view.bg).toBe("#0a0a0a");
    expect(view.accent).toBe("#22c55e");
    expect(view.extends).toBe("default-tech");
    expect(view.headingFont).toBe("Poppins");
    expect(view.bodyFont).toBe("Inter");
    expect(view.headingFontSpec).toContain("Poppins");
    expect(view.bodyFontSpec).toContain("Inter");
    expect(typeof view.headingWeight).toBe("number");
  });

  it("extends claude for light brand imports", () => {
    const view = buildThemeViewFromBrand("paper-brand", {
      ...EXTRACTION,
      palette: {
        ...EXTRACTION.palette,
        bg: "#f7f2ea",
        bg2: "#efe6d8",
        text: "#1c1814",
      },
    });
    expect(view.extends).toBe("claude");
  });

  it("mentions the extraction source in the generated description", () => {
    const view = buildThemeViewFromBrand("acme-com", EXTRACTION);
    expect(view.description.toLowerCase()).toContain("brand");
  });
});
