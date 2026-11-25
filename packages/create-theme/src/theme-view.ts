import type { BrandExtractionResult } from "./extract-brand.js";
import type { ThemeView } from "./index.js";
import { toUnderscored } from "./index.js";

function describeSource(source: BrandExtractionResult["source"]): string {
  switch (source) {
    case "static":
      return "A theme generated from extracted brand CSS.";
    case "computed-fallback":
      return "A theme generated from computed page styles.";
    case "template-scheme":
    case "office-default":
      return "A theme generated from a PowerPoint template.";
  }
}

export function buildThemeViewFromBrand(name: string, extraction: BrandExtractionResult): ThemeView {
  const { fontPlan } = extraction;
  return {
    name,
    underscored: toUnderscored(name),
    description: describeSource(extraction.source),
    vibe: "brand-import",
    author: "",
    license: "MIT",
    extends: extraction.extends,
    bg: extraction.palette.bg,
    bg2: extraction.palette.bg2,
    text: extraction.palette.text,
    muted: extraction.palette.muted,
    accent: extraction.palette.accent,
    accent2: extraction.palette.accent2,
    cardBg: extraction.palette.cardBg,
    border: extraction.palette.border,
    headingFont: extraction.headingFont,
    bodyFont: extraction.bodyFont,
    headingWeight: 700,
    headingFontSpec: fontPlan.googleFonts[0] ?? "",
    bodyFontSpec: fontPlan.googleFonts[1] ?? fontPlan.googleFonts[0] ?? "",
    headingStack: fontPlan.headingStack,
    bodyStack: fontPlan.bodyStack,
    googleFonts: fontPlan.googleFonts,
    radius: "12px",
  };
}
