import type { BrandExtractionResult } from "./extract-brand.js";
import type { ThemeView } from "./index.js";
import { pickExtendsFromBg, toUnderscored } from "./index.js";

export function buildThemeViewFromBrand(name: string, extraction: BrandExtractionResult): ThemeView {
  const sourceLabel =
    extraction.source === "static" ? "extracted brand CSS" : "computed page styles";
  return {
    name,
    underscored: toUnderscored(name),
    description: `A theme generated from ${sourceLabel}.`,
    vibe: "brand-import",
    author: "",
    license: "MIT",
    extends: pickExtendsFromBg(extraction.palette.bg),
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
    headingFontSpec: `${extraction.headingFont}:wght@400;700`,
    bodyFontSpec: `${extraction.bodyFont}:wght@400;500`,
    radius: "12px",
  };
}
