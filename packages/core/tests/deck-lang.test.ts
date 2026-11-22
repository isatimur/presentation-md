import { describe, expect, it } from "vitest";
import {
  countWords,
  deckLangDir,
  normalizeDeckLang,
  scriptFallbackFonts,
  withFontFallback,
} from "../src/deck-lang.js";
import { judgeDeckJson } from "../src/judge-deck-json.js";

describe("normalizeDeckLang", () => {
  it("defaults to en for missing or invalid values", () => {
    expect(normalizeDeckLang(undefined)).toBe("en");
    expect(normalizeDeckLang("")).toBe("en");
    expect(normalizeDeckLang("not a tag")).toBe("en");
    expect(normalizeDeckLang('en" onload="x')).toBe("en");
    expect(normalizeDeckLang(42)).toBe("en");
  });

  it("keeps valid BCP 47 tags with canonical casing", () => {
    expect(normalizeDeckLang("ja")).toBe("ja");
    expect(normalizeDeckLang("PT-br")).toBe("pt-BR");
    expect(normalizeDeckLang("zh-hans")).toBe("zh-Hans");
  });
});

describe("deckLangDir", () => {
  it("is rtl for right-to-left scripts only", () => {
    expect(deckLangDir("ar")).toBe("rtl");
    expect(deckLangDir("ar-EG")).toBe("rtl");
    expect(deckLangDir("he")).toBe("rtl");
    expect(deckLangDir("fa")).toBe("rtl");
    expect(deckLangDir("en")).toBe("ltr");
    expect(deckLangDir("zh")).toBe("ltr");
  });
});

describe("script font fallbacks", () => {
  it("adds a Noto family for CJK, Arabic, and Cyrillic", () => {
    expect(scriptFallbackFonts("zh").families).toContain("Noto Sans SC");
    expect(scriptFallbackFonts("zh-TW").families).toContain("Noto Sans TC");
    expect(scriptFallbackFonts("ja").families).toContain("Noto Sans JP");
    expect(scriptFallbackFonts("ar").families).toContain("Noto Sans Arabic");
    expect(scriptFallbackFonts("ru").families).toContain("Noto Sans");
    expect(scriptFallbackFonts("en").families).toEqual([]);
    expect(scriptFallbackFonts("zh").googleFonts[0]).toMatch(/^Noto\+Sans\+SC:wght@/);
  });

  it("inserts fallbacks before the generic family", () => {
    expect(withFontFallback("'Space Grotesk', system-ui, sans-serif", ["Noto Sans JP"])).toBe(
      "'Space Grotesk', 'Noto Sans JP', system-ui, sans-serif"
    );
    expect(withFontFallback("'Lora', Georgia, serif", ["Noto Sans SC"])).toBe(
      "'Lora', Georgia, 'Noto Sans SC', serif"
    );
    expect(withFontFallback("Inter", ["Noto Sans"])).toBe("Inter, 'Noto Sans'");
    expect(withFontFallback("Inter, sans-serif", [])).toBe("Inter, sans-serif");
  });
});

describe("countWords", () => {
  it("counts Latin words exactly like the old whitespace rule", () => {
    expect(countWords("Ship the deck today")).toBe(4);
    expect(countWords("  ")).toBe(0);
    // Hyphens, URLs, and slashes stay one token each (Segmenter would split them).
    expect(countWords("co-founder https://acme.dev/x t1/t2 — done")).toBe(4);
  });

  it("counts Cyrillic and Arabic words (whitespace regex counted zero)", () => {
    expect(countWords("Мы выросли на сорок процентов за квартал")).toBe(7);
    expect(countWords("نمونا بنسبة أربعين بالمئة")).toBe(4);
  });

  it("counts CJK text that has no spaces", () => {
    expect(countWords("我们的收入在本季度增长了百分之四十", "zh")).toBeGreaterThan(5);
    expect(countWords("今四半期の売上は四十パーセント増加しました", "ja")).toBeGreaterThan(5);
  });
});

describe("judgeDeckJson word gate across scripts", () => {
  const wall = (text: string, lang: string) => ({
    type: "deck",
    meta: { lang },
    slides: [
      { layout: "title", heading: "x" },
      { layout: "two-column", heading: "x", body: text },
    ],
  });

  it("flags a long Chinese paragraph as a wall of text", () => {
    const zh = "我们的团队在过去一年里完成了产品的全面重构，并且在多个市场取得了显著增长。".repeat(4);
    const result = judgeDeckJson(wall(zh, "zh"));
    expect(result.flags.some((f) => f.id === "G1")).toBe(true);
  });

  it("flags a long Russian paragraph as a wall of text", () => {
    const ru = "Наша команда полностью переписала продукт и вышла на новые рынки за год. ".repeat(5);
    const result = judgeDeckJson(wall(ru, "ru"));
    expect(result.flags.some((f) => f.id === "G1")).toBe(true);
  });
});
