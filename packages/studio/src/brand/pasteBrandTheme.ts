/**
 * Browser-side brand CSS → ephemeral Studio theme (MCP import_brand_theme parity
 * without scaffolding a package — paste tokens, preview immediately).
 */

import {
  parseCssVariables,
  parseFontDeclarations,
  mapPaletteToRoles,
  ensureContrastSafe,
  relativeLuminance,
  type ContrastAdjustment,
} from "@presentation-md/core";
import type { ThemeManifest } from "@presentation-md/core/theme-types";

export interface BrandPasteResult {
  manifest: ThemeManifest;
  name: string;
  adjustments: ContrastAdjustment[];
  stillFailing: string[];
}

function pickExtendsFromBg(bg: string): "claude" | "default-tech" {
  try {
    return relativeLuminance(bg) > 0.45 ? "claude" : "default-tech";
  } catch {
    return "default-tech";
  }
}

function sanitizeThemeName(raw: string): string {
  const slug = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || "brand-paste";
}

/** Extract a ThemeManifest from pasted CSS (:root vars + font-family). */
export function themeFromBrandCss(
  css: string,
  nameInput = "brand-paste"
): BrandPasteResult {
  const trimmed = css.trim();
  if (!trimmed) throw new Error("Paste brand CSS with :root color variables first.");

  const colors = parseCssVariables(trimmed);
  const fonts = parseFontDeclarations(trimmed);
  if (!colors.bg && !colors.text && !colors.accent && !fonts.heading && !fonts.body) {
    throw new Error(
      "Could not extract colors or fonts — include :root { --bg / --text / --accent } hex vars."
    );
  }

  const rawPalette = mapPaletteToRoles(colors);
  const { palette, adjustments, stillFailing } = ensureContrastSafe(rawPalette);
  const name = sanitizeThemeName(nameInput);
  const headingFont = fonts.heading ?? "Inter";
  const bodyFont = fonts.body ?? "Inter";
  const headingQuoted = `'${headingFont.replace(/'/g, "")}', system-ui, sans-serif`;
  const bodyQuoted = `'${bodyFont.replace(/'/g, "")}', system-ui, sans-serif`;

  const manifest: ThemeManifest = {
    name,
    version: "0.0.0-paste",
    extends: pickExtendsFromBg(palette.bg),
    description: "Ephemeral theme from pasted brand CSS (Studio).",
    vibe: "brand-paste",
    roles: { ...palette },
    typography: {
      headingFont: headingQuoted,
      bodyFont: bodyQuoted,
      headingWeight: 700,
      googleFonts: [
        `${headingFont.replace(/\s+/g, "+")}:wght@400;700`,
        `${bodyFont.replace(/\s+/g, "+")}:wght@400;500`,
      ],
    },
  };

  return { manifest, name, adjustments, stillFailing };
}
