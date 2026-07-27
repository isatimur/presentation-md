import { readFile } from "node:fs/promises";
import {
  parseCssVariables,
  parseFontDeclarations,
  mapPaletteToRoles,
  ensureContrastSafe,
  type ContrastAdjustment,
  type Palette,
} from "@presentation-skill-pack/core";
import { fetchStylesheetsFromUrl } from "./fetch-css.js";
import { extractComputedStyles } from "./playwright-fallback.js";

export interface BrandExtractionInput {
  url?: string;
  cssPath?: string;
}

export interface BrandExtractionResult {
  palette: Palette;
  headingFont: string;
  bodyFont: string;
  source: "static" | "computed-fallback";
  adjustments: ContrastAdjustment[];
}

const FALLBACK_HEADING_FONT = "Inter";
const FALLBACK_BODY_FONT = "Inter";

export async function extractBrand(input: BrandExtractionInput): Promise<BrandExtractionResult> {
  const { url, cssPath } = input;
  if (!url && !cssPath) {
    throw new Error("extractBrand requires either 'url' or 'cssPath'.");
  }
  if (url && cssPath) {
    throw new Error("extractBrand accepts only one of 'url' or 'cssPath', not both.");
  }

  const css = cssPath ? await readFile(cssPath, "utf-8") : await fetchStylesheetsFromUrl(url as string);

  let colors = parseCssVariables(css);
  let fonts = parseFontDeclarations(css);
  let source: "static" | "computed-fallback" = "static";

  const staticFoundNothing =
    !colors.bg && !colors.text && !colors.accent && !fonts.heading && !fonts.body;
  if (staticFoundNothing && url) {
    const computed = await extractComputedStyles(url);
    colors = { bg: computed.bg, text: computed.text, accent: computed.accent };
    fonts = { heading: computed.headingFont, body: computed.bodyFont };
    source = "computed-fallback";
  }

  const stillNothing = !colors.bg && !colors.text && !colors.accent && !fonts.heading && !fonts.body;
  if (stillNothing) {
    throw new Error(`Could not extract any brand colors or fonts from ${url ?? cssPath}.`);
  }

  const rawPalette = mapPaletteToRoles(colors);
  const { palette, adjustments } = ensureContrastSafe(rawPalette);

  return {
    palette,
    headingFont: fonts.heading ?? FALLBACK_HEADING_FONT,
    bodyFont: fonts.body ?? FALLBACK_BODY_FONT,
    source,
    adjustments,
  };
}
