/**
 * Turn a template's colour scheme into brand colour candidates. See "Role
 * choice" in docs/superpowers/specs/2026-11-23-template-theme-import-design.md
 */
import { contrastRatio, hexToRgb, rgbToHsl, type BrandColorCandidates } from "@presentation-md/core";
import type { TemplateBrand } from "@presentation-md/export/import";

/** HSL saturation (0–100) below which a colour counts as neutral. */
export const NEUTRAL_SATURATION = 12;
/** `bg2` is kept when its contrast against `bg` is within this range. */
export const BG2_MIN_RATIO = 1.03;
export const BG2_MAX_RATIO = 1.6;
/** An accent needs at least this contrast against `bg`. */
export const ACCENT_MIN_RATIO = 1.5;
/** `accent2` needs at least this contrast against `accent`. */
export const ACCENT2_MIN_RATIO = 1.2;

export const NO_SATURATED_ACCENT_WARNING = "No saturated accent in the template; using accent1.";

const ACCENTS = ["accent1", "accent2", "accent3", "accent4", "accent5", "accent6"] as const;

export function isNeutral(hex: string): boolean {
  return rgbToHsl(hexToRgb(hex))[1] < NEUTRAL_SATURATION;
}

export function templateToCandidates(brand: TemplateBrand): {
  candidates: BrandColorCandidates;
  warnings: string[];
} {
  const warnings: string[] = [];
  const resolve = (role: "bg1" | "tx1" | "bg2"): string => brand.scheme[brand.clrMap[role]];

  const bg = resolve("bg1");
  const text = resolve("tx1");
  const candidates: BrandColorCandidates = { bg, text };

  const bg2 = resolve("bg2");
  const bg2Ratio = contrastRatio(bg2, bg);
  if (bg2Ratio >= BG2_MIN_RATIO && bg2Ratio <= BG2_MAX_RATIO) candidates.bg2 = bg2;

  const passes = (hex: string): boolean => !isNeutral(hex) && contrastRatio(hex, bg) >= ACCENT_MIN_RATIO;
  const accentIndex = ACCENTS.findIndex((k) => passes(brand.scheme[k]));
  if (accentIndex < 0) {
    candidates.accent = brand.scheme.accent1;
    warnings.push(NO_SATURATED_ACCENT_WARNING);
    return { candidates, warnings };
  }
  const accent = brand.scheme[ACCENTS[accentIndex]!];
  candidates.accent = accent;

  for (const key of ACCENTS.slice(accentIndex + 1)) {
    const hex = brand.scheme[key];
    if (passes(hex) && contrastRatio(hex, accent) >= ACCENT2_MIN_RATIO) {
      candidates.accent2 = hex;
      break;
    }
  }
  return { candidates, warnings };
}
