import { readFile, stat } from "node:fs/promises";
import { basename } from "node:path";
import {
  parseCssVariables,
  parseFontDeclarations,
  mapPaletteToRoles,
  ensureContrastSafe,
  type BrandColorCandidates,
  type BrandFontCandidates,
  type ContrastAdjustment,
  type Palette,
} from "@presentation-md/core";
import {
  assertZipArchiveSafe,
  extractTemplateBrand,
  type TemplateBrand,
} from "@presentation-md/export/import";
import { fetchStylesheetsFromUrl } from "./fetch-css.js";
import { extractComputedStyles } from "./playwright-fallback.js";
import { pickExtendsFromBg } from "./pick-extends.js";
import { templateToCandidates } from "./template-candidates.js";
import { buildFontPlan, type FontPlan } from "./fonts.js";

export interface BrandExtractionInput {
  url?: string;
  cssPath?: string;
  /** A PowerPoint template (.pptx or .potx). */
  pptxPath?: string;
}

export type BrandSource = "static" | "computed-fallback" | "template-scheme" | "office-default";

/** What was read from a template's colour scheme, so an agent can show it or re-map a role. */
export interface TemplateSchemeReport {
  name: string;
  /** The 12 scheme colours, lower-case "#rrggbb". */
  colors: TemplateBrand["scheme"];
  clrMap: TemplateBrand["clrMap"];
  officeDefault: TemplateBrand["officeDefault"];
  builtInName: string | null;
}

export interface BrandExtractionResult {
  palette: Palette;
  /** Sanitized brand heading family (the base theme's family when the source had none). */
  headingFont: string;
  /** Sanitized brand body family (the base theme's family when the source had none). */
  bodyFont: string;
  source: BrandSource;
  adjustments: ContrastAdjustment[];
  /**
   * Guarded contrast pairs (e.g. "muted on cardBg") that are still below WCAG
   * AA in the returned palette even after the contrast-safety pass. Empty when
   * the palette is fully safe. Surfaced to callers so they can disclose it.
   */
  stillFailing: string[];
  /** Base theme, picked from the final `palette.bg`. */
  extends: "claude" | "default-tech";
  fontPlan: FontPlan;
  warnings: string[];
  /** Template only; null for URL and CSS sources. */
  logo: TemplateBrand["logo"] | null;
  /** Template only; null for URL and CSS sources. */
  scheme: TemplateSchemeReport | null;
}

const FALLBACK_HEADING_FONT = "Inter";
const FALLBACK_BODY_FONT = "Inter";
export const MAX_LOCAL_CSS_BYTES = 20 * 1024 * 1024;

async function readLocalCssBounded(cssPath: string): Promise<string> {
  const info = await stat(cssPath);
  if (info.size > MAX_LOCAL_CSS_BYTES) {
    throw new Error(
      `Local CSS exceeds ${MAX_LOCAL_CSS_BYTES} bytes (received ${info.size} bytes)`
    );
  }
  const css = await readFile(cssPath, "utf-8");
  const actualBytes = Buffer.byteLength(css, "utf8");
  if (actualBytes > MAX_LOCAL_CSS_BYTES) {
    throw new Error(
      `Local CSS exceeds ${MAX_LOCAL_CSS_BYTES} bytes (received ${actualBytes} bytes)`
    );
  }
  return css;
}

async function readTemplateBounded(pptxPath: string): Promise<Buffer> {
  const info = await stat(pptxPath);
  assertZipArchiveSafe(info.size);
  return readFile(pptxPath);
}

function finish(
  colors: BrandColorCandidates,
  fonts: BrandFontCandidates,
  source: BrandSource,
  extra: { warnings: string[]; logo: TemplateBrand["logo"] | null; scheme: TemplateSchemeReport | null }
): BrandExtractionResult {
  const rawPalette = mapPaletteToRoles(colors);
  const { palette, adjustments, stillFailing } = ensureContrastSafe(rawPalette);
  const base = pickExtendsFromBg(palette.bg);
  const fontPlan = buildFontPlan(fonts.heading, fonts.body, base);
  return {
    palette,
    headingFont: fontPlan.rows[0]!.family,
    bodyFont: fontPlan.rows[1]!.family,
    source,
    adjustments,
    stillFailing,
    extends: base,
    fontPlan,
    warnings: [...extra.warnings, ...fontPlan.warnings],
    logo: extra.logo,
    scheme: extra.scheme,
  };
}

async function extractFromTemplate(pptxPath: string): Promise<BrandExtractionResult> {
  const bytes = await readTemplateBounded(pptxPath);
  const brand = await extractTemplateBrand(bytes, { fileName: basename(pptxPath) });
  const { candidates, warnings } = templateToCandidates(brand);
  return finish(
    candidates,
    { heading: brand.fonts.heading, body: brand.fonts.body },
    brand.officeDefault ? "office-default" : "template-scheme",
    {
      warnings: [...brand.warnings, ...warnings],
      logo: brand.logo,
      scheme: {
        name: brand.schemeName,
        colors: brand.scheme,
        clrMap: brand.clrMap,
        officeDefault: brand.officeDefault,
        builtInName: brand.builtInName,
      },
    }
  );
}

export async function extractBrand(input: BrandExtractionInput): Promise<BrandExtractionResult> {
  const { url, cssPath, pptxPath } = input;
  const given = [url, cssPath, pptxPath].filter(Boolean).length;
  if (given === 0) {
    throw new Error("extractBrand requires one of 'url', 'cssPath' or 'pptxPath'.");
  }
  if (given > 1) {
    throw new Error("extractBrand accepts only one of 'url', 'cssPath' or 'pptxPath'.");
  }

  if (pptxPath) return extractFromTemplate(pptxPath);

  const css = cssPath
    ? await readLocalCssBounded(cssPath)
    : await fetchStylesheetsFromUrl(url as string);

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

  return finish(
    colors,
    { heading: fonts.heading ?? FALLBACK_HEADING_FONT, body: fonts.body ?? FALLBACK_BODY_FONT },
    source,
    { warnings: [], logo: null, scheme: null }
  );
}
