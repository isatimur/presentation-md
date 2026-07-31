import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import Mustache from "mustache";
import {
  validateDeckJson as coreValidateDeckJson,
  loadTheme,
  surfaceForTheme,
  renderChartSvg,
  sanitizeCustomHtml,
} from "@presentation-md/core";
import type { ValidationResult, ChartSeries } from "@presentation-md/core";
import { deckToPptxBuffer, type DeckJson as ExportDeckJson } from "@presentation-md/export";

export { validateDeckJson } from "@presentation-md/core";

const VALID_LAYOUTS = new Set([
  "title",
  "two-column",
  "feature-grid",
  "quote",
  "data-table",
  "stat-row",
  "timeline",
  "section",
  "closing",
  "image-hero",
  "comparison",
  "code",
  "chart",
  "custom-html",
]);

function structuralValidateDeckJson(json: string): ValidationResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch (err) {
    return { valid: false, errors: [`Invalid JSON: ${(err as Error).message}`] };
  }
  const errors: string[] = [];
  if (typeof parsed !== "object" || parsed === null) {
    errors.push("/ must be an object");
    return { valid: false, errors };
  }
  const obj = parsed as Record<string, unknown>;
  if (obj["type"] !== "deck") errors.push('/type must be "deck"');
  if (!Array.isArray(obj["slides"]) || (obj["slides"] as unknown[]).length === 0) {
    errors.push("/slides must be a non-empty array");
    return { valid: errors.length === 0, errors };
  }
  for (let i = 0; i < (obj["slides"] as unknown[]).length; i++) {
    const slide = (obj["slides"] as unknown[])[i] as Record<string, unknown>;
    if (typeof slide !== "object" || slide === null) {
      errors.push(`/slides/${i} must be an object`);
      continue;
    }
    if (typeof slide["layout"] !== "string") {
      errors.push(`/slides/${i}/layout must be a string`);
    } else if (!VALID_LAYOUTS.has(slide["layout"])) {
      errors.push(
        `/slides/${i}/layout "${slide["layout"]}" is not one of: ${[...VALID_LAYOUTS].join(", ")}`
      );
    }
  }
  return { valid: errors.length === 0, errors };
}

function safeValidateDeckJson(json: string): ValidationResult {
  try {
    return coreValidateDeckJson(json);
  } catch {
    return structuralValidateDeckJson(json);
  }
}

export interface RenderOptions {
  themesDir?: string;
  extraCss?: string;
  /**
   * Append a small, theme-aware "Made with presentation-md" footer to
   * the rendered deck. Defaults to `true`. Set to `false` to omit it.
   */
  attribution?: boolean;
  /**
   * Embed the source Deck JSON in the output as
   * `<script type="application/json" id="pmd-deck">` so the deck can be reopened
   * and edited (e.g. in the studio). Defaults to `true`.
   */
  embedSource?: boolean;
}

const ATTRIBUTION_URL = "https://presentation-md.vercel.app/?ref=deck";

const ATTRIBUTION_HTML =
  `<footer class="pmd-attribution">Made with ` +
  `<a href="${ATTRIBUTION_URL}" target="_blank" rel="noopener">presentation-md</a>` +
  `</footer>`;

const ATTRIBUTION_CSS = `
/* presentation-md attribution footer */
.pmd-attribution {
  font-family: var(--body-font);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--muted);
  opacity: 0.6;
  text-align: center;
  padding: 4px 0 16px;
}
.pmd-attribution a {
  color: var(--muted);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--muted) 40%, transparent);
  transition: color 0.15s ease, border-color 0.15s ease;
}
.pmd-attribution a:hover { color: var(--accent); border-color: var(--accent); }
@media print { .pmd-attribution { opacity: 0.5; } }`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);

export function getBundledThemesDir(): string {
  const coreMain = require.resolve("@presentation-md/core");
  return join(dirname(coreMain), "..", "themes");
}

function getSharedDir(): string {
  // Prefer the packaged copy shipped with @presentation-md/render (npm + local
  // after build). Fall back to the monorepo packages/shared during development
  // before the first sync.
  const packaged = resolve(__dirname, "..", "shared");
  const monorepo = resolve(__dirname, "..", "..", "shared");
  return existsSync(join(packaged, "base.css")) ? packaged : monorepo;
}

function buildGoogleFontsUrl(families: string[]): string {
  if (families.length === 0) return "";
  const joined = families.join("&family=");
  return `https://fonts.googleapis.com/css2?family=${joined}&display=swap`;
}

interface SlideData {
  layout: string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  body?: string;
  aside?: string;
  ratio?: string;
  reverse?: boolean;
  image?: string;
  imageAlt?: string;
  quote?: string;
  by?: string;
  number?: string;
  code?: string;
  language?: string;
  filename?: string;
  emphasis?: string;
  columns?: number | string | string[];
  cards?: Array<{ icon?: string; title: string; body?: string }>;
  rows?: Array<string[]>;
  stats?: Array<{ value: string; label: string }>;
  steps?: Array<{ title: string; body?: string }>;
  cta?: { label?: string; href?: string };
  [key: string]: unknown;
}

interface DeckJson {
  type: "deck";
  meta?: {
    title?: string;
    company?: string;
    description?: string;
    theme?: string;
  };
  slides: SlideData[];
}

const SAFE_LINK_SCHEMES = new Set(["http", "https", "mailto", "tel"]);

/** Drop C0/C1 control characters (used to obfuscate schemes like `java\tscript:`). */
function stripControls(s: string): string {
  let out = "";
  for (const ch of s) {
    const c = ch.charCodeAt(0);
    if (c > 0x1f && c !== 0x7f) out += ch;
  }
  return out;
}

function schemeOf(url: string): string | undefined {
  return url.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/)?.[1]?.toLowerCase();
}

/** Strip dangerous URL schemes (javascript:, vbscript:, data:…) from link hrefs. */
function sanitizeLink(url: unknown): string | undefined {
  if (typeof url !== "string") return undefined;
  const cleaned = stripControls(url).trim();
  const s = schemeOf(cleaned);
  return s && !SAFE_LINK_SCHEMES.has(s) ? "#" : cleaned;
}

/** Allow http(s) and inline images; drop anything else (e.g. javascript:). */
function sanitizeImage(url: unknown): string | undefined {
  if (typeof url !== "string") return undefined;
  const cleaned = stripControls(url).trim();
  if (/^data:image\//i.test(cleaned)) return cleaned;
  const s = schemeOf(cleaned);
  return s && s !== "http" && s !== "https" ? "" : cleaned;
}

function normalizeSlideData(slide: SlideData): Record<string, unknown> {
  const out: Record<string, unknown> = { ...slide };

  if (slide.layout === "data-table" && Array.isArray(slide.rows)) {
    out["rows"] = slide.rows.map((row) => ({ cells: row }));
  }

  if (slide.layout === "feature-grid") {
    if (slide.columns === "bento") {
      out["columns"] = "bento";
    } else if (typeof slide.columns === "number") {
      out["columns"] = slide.columns;
    } else if (!slide.columns) {
      out["columns"] = 3;
    }
  }

  if (slide.layout === "chart") {
    const series = (Array.isArray(slide.series) ? slide.series : []) as ChartSeries[];
    out["chartSvg"] = renderChartSvg({
      chartType: typeof slide.chartType === "string" ? slide.chartType : "bar",
      categories: Array.isArray(slide.categories) ? (slide.categories as string[]) : [],
      series,
      showLegend: slide.showLegend !== false,
      showValues: slide.showValues === true,
      stacked: slide.stacked === true,
    });
  }

  if (slide.layout === "custom-html") {
    out["html"] = sanitizeCustomHtml(slide.html);
  }

  if (slide.cta?.href !== undefined) {
    out["cta"] = { ...slide.cta, href: sanitizeLink(slide.cta.href) };
  }
  if (slide.image !== undefined) {
    out["image"] = sanitizeImage(slide.image);
  }

  return out;
}

async function renderSlide(slide: SlideData, layoutsDir: string): Promise<string> {
  const layoutName = slide.layout;
  const templatePath = join(layoutsDir, `${layoutName}.html`);
  const template = await readFile(templatePath, "utf-8");
  const data = normalizeSlideData(slide);
  let html = Mustache.render(template, data);
  const tone = typeof slide.tone === "string" ? slide.tone.trim() : "";
  if (tone && /^[a-z0-9-]+$/i.test(tone)) {
    html = html.replace(/<section(\s+class="slide)/i, `<section data-tone="${tone}"$1`);
  }
  return html;
}

/**
 * Embed the source deck as a JSON script tag so the rendered HTML is
 * self-describing and can be reopened for editing. `<` is escaped to prevent a
 * `</script>` breakout; `JSON.parse` reads `<` transparently.
 */
function embedDeckScript(deck: DeckJson): string {
  const json = JSON.stringify(deck).replace(/</g, "\\u003c");
  return `<script type="application/json" id="pmd-deck">${json}</script>`;
}

export async function renderDeck(deckJson: string, opts?: RenderOptions): Promise<string> {
  const validation = safeValidateDeckJson(deckJson);
  if (!validation.valid) {
    throw new Error(
      `Deck JSON is invalid:\n${validation.errors.map((e) => `  - ${e}`).join("\n")}`
    );
  }

  const deck = JSON.parse(deckJson) as DeckJson;
  for (const slide of deck.slides) {
    if (slide.layout === "custom-html" && typeof slide.html === "string") {
      slide.html = sanitizeCustomHtml(slide.html);
    }
  }
  const themeName = deck.meta?.theme ?? "default-tech";
  const themesDir = opts?.themesDir ?? getBundledThemesDir();
  const bundled = getBundledThemesDir();
  const theme = await loadTheme(themeName, {
    themesDir,
    fallbackThemesDirs: themesDir !== bundled ? [bundled] : undefined,
  });

  const googleFontsUrl = buildGoogleFontsUrl(theme.typography.googleFonts);

  const sharedDir = getSharedDir();
  const baseCssTemplate = await readFile(join(sharedDir, "base.css"), "utf-8");
  const surfacesCss = await readFile(join(sharedDir, "surfaces.css"), "utf-8");
  const surface = surfaceForTheme(theme.name);

  const tokenView: Record<string, string> = {
    bg: theme.palette.bg,
    bg2: theme.palette.bg2,
    text: theme.palette.text,
    muted: theme.palette.muted,
    accent: theme.palette.accent,
    accent2: theme.palette.accent2,
    cardBg: theme.palette.cardBg,
    border: theme.palette.border,
    radius: theme.geometry.radius,
    slideW: theme.geometry.slideWidth,
    headingFont: theme.typography.headingFont,
    bodyFont: theme.typography.bodyFont,
    headingWeight: String(theme.typography.headingWeight),
  };

  const renderedCss = Mustache.render(baseCssTemplate, tokenView);

  let fullCss = googleFontsUrl
    ? `@import url('${googleFontsUrl}');\n\n${renderedCss}\n\n${surfacesCss}`
    : `${renderedCss}\n\n${surfacesCss}`;

  const attributionEnabled = opts?.attribution !== false;
  if (attributionEnabled) {
    fullCss += `\n\n${ATTRIBUTION_CSS}`;
  }

  if (opts?.extraCss) {
    fullCss += `\n\n${opts.extraCss}`;
  }

  const layoutsDir = join(sharedDir, "layouts");
  const slideParts = await Promise.all(
    deck.slides.map((slide) => renderSlide(slide, layoutsDir))
  );
  const slidesHtml = slideParts.join("\n");

  const documentTemplate = await readFile(join(sharedDir, "document.html"), "utf-8");

  const title = deck.meta?.title ?? deck.meta?.company ?? "Presentation";
  const description = deck.meta?.description ?? "";

  const deckData = opts?.embedSource === false ? "" : embedDeckScript(deck);

  const html = Mustache.render(documentTemplate, {
    title,
    description,
    styles: fullCss,
    slides: slidesHtml,
    surface,
    attribution: attributionEnabled ? ATTRIBUTION_HTML : "",
    deckData,
  });

  return html;
}

export interface PptxRenderOptions {
  themesDir?: string;
  /** Append the attribution note to the final slide. Defaults to `true`. */
  attribution?: boolean;
  /** Called for content that couldn't be mapped exactly (e.g. remote images). */
  onWarn?: (msg: string) => void;
}

/**
 * Render a deck JSON spec to a native, editable PowerPoint (.pptx) Buffer.
 * Shares validation and theme resolution with {@link renderDeck}. The resulting
 * file opens directly in PowerPoint and Keynote, and imports into Google Slides.
 * Remote http(s) slide images are prefetched to data URIs (Studio parity) before embed.
 */
export async function renderDeckPptx(
  deckJson: string,
  opts?: PptxRenderOptions
): Promise<Buffer> {
  const validation = safeValidateDeckJson(deckJson);
  if (!validation.valid) {
    throw new Error(
      `Deck JSON is invalid:\n${validation.errors.map((e) => `  - ${e}`).join("\n")}`
    );
  }

  const deck = JSON.parse(deckJson) as DeckJson;
  const themeName = deck.meta?.theme ?? "default-tech";
  const themesDir = opts?.themesDir ?? getBundledThemesDir();
  const bundled = getBundledThemesDir();
  const theme = await loadTheme(themeName, {
    themesDir,
    fallbackThemesDirs: themesDir !== bundled ? [bundled] : undefined,
  });

  return deckToPptxBuffer(deck as unknown as ExportDeckJson, theme, {
    attribution: opts?.attribution,
    onWarn: opts?.onWarn,
    // Prefetch remote http(s) images so PPTX embeds match Studio outside the browser.
    prefetchImages: true,
  });
}
