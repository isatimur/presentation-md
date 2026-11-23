import type { ResolvedTheme } from "@presentation-md/core/theme-types";
import { PptxGenJS, type Pptx } from "./pptx.js";
import { buildContext } from "./context.js";
import { renderSlide } from "./layouts.js";
import { withDeckLanguage } from "./lang.js";
import { applyScriptFonts, scriptFontSlots } from "./script-fonts.js";
import { deckLangDir, normalizeDeckLang } from "@presentation-md/core/deck-lang";
import {
  fontFidelity,
  officeSafeFamily,
  officeSafeTheme,
  type FidelityItem,
  type FidelityKind,
  type FontMode,
} from "./fidelity.js";
import type { DeckJson } from "./deck-types.js";
import {
  prefetchDeckImages,
  type PrefetchImagesOptions,
  type PrefetchImagesResult,
} from "./prefetch-images.js";

export type {
  DeckJson,
  DeckMeta,
  Slide,
  LayoutType,
  Card,
  Stat,
  RankedItem,
  Step,
  Cta,
  ChartSeries,
} from "./deck-types.js";

export { scriptFontSlots };
export { prefetchDeckImages, fontFidelity, officeSafeFamily, officeSafeTheme };
export type { FontMode };
export type { FidelityItem, FidelityKind };
export type { PrefetchImagesOptions, PrefetchImagesResult };

const ATTRIBUTION_TEXT = "Made with presentation-md";
const ATTRIBUTION_URL = "https://presentation-md.vercel.app/?ref=pptx";

export interface PptxOptions {
  /** Called for any content that couldn't be mapped exactly (e.g. remote images). */
  onWarn?: (msg: string) => void;
  /**
   * Called once per fidelity item: every warning (with its kind) plus theme fonts
   * that PowerPoint or Google Slides will probably replace.
   */
  onFidelity?: (item: FidelityItem) => void;
  /** Append a small attribution note to the final slide. Defaults to `true`. */
  attribution?: boolean;
  /**
   * Prefetch remote http(s) and local `file:` / filesystem images to data URIs
   * before embed. Defaults to `false` so `buildPptx` stays I/O-free; CLI/MCP
   * enable this via {@link renderDeckPptx} / Studio's download path.
   */
  prefetchImages?: boolean;
  /** Options forwarded to {@link prefetchDeckImages} when prefetch is enabled. */
  prefetch?: PrefetchImagesOptions;
  /**
   * `"theme"` (default) keeps the theme's fonts; PowerPoint substitutes any the
   * viewer lacks. `"office-safe"` swaps them for Office fonts of the same style
   * (Arial, Georgia, Consolas) so the deck looks the same on every machine.
   */
  fontMode?: FontMode;
}

export interface BuildResult {
  pptx: Pptx;
  slideCount: number;
  warnings: string[];
  /** Structured report of what differs from the HTML deck. See {@link FidelityItem}. */
  fidelity: FidelityItem[];
}

const LAYOUT_NAME = "PMD_16x9";

/**
 * Build a PptxGenJS presentation from a (validated) deck and a resolved theme.
 * Pure and runtime-agnostic — callers serialize via the `deckToPptx*` helpers
 * or `result.pptx.write(...)` directly.
 *
 * Optional image prefetch (`prefetchImages: true`) matches Studio so CLI/MCP
 * PPTX embeds work for http(s) and local paths without a separate step.
 */
export async function buildPptx(
  deck: DeckJson,
  theme: ResolvedTheme,
  opts: PptxOptions = {}
): Promise<BuildResult> {
  const warnings: string[] = [];
  const fidelity: FidelityItem[] = [];
  const report = (item: FidelityItem): void => {
    fidelity.push(item);
    opts.onFidelity?.(item);
  };
  let currentSlide = 0;
  const warn = (msg: string, kind: FidelityKind = "other"): void => {
    const prefixed =
      currentSlide > 0 && !/^Slide\s+\d+/i.test(msg) ? `Slide ${currentSlide}: ${msg}` : msg;
    warnings.push(prefixed);
    opts.onWarn?.(prefixed);
    report(currentSlide > 0 ? { kind, slide: currentSlide, message: prefixed } : { kind, message: prefixed });
  };
  if (opts.fontMode === "office-safe") {
    const safe = officeSafeTheme(theme);
    theme = safe.theme;
    for (const item of safe.items) report(item);
  }
  for (const item of fontFidelity(theme)) report(item);

  let working = deck;
  if (opts.prefetchImages) {
    const prepared = await prefetchDeckImages(deck, opts.prefetch);
    working = prepared.deck;
    for (const msg of prepared.warnings) warn(msg, "image");
  }

  const pptx = new PptxGenJS();
  const ctx = buildContext(
    theme,
    { roundRect: pptx.ShapeType.roundRect, oval: pptx.ShapeType.ellipse, blockArc: pptx.ShapeType.blockArc },
    warn,
    {
      company: working.meta?.company,
      title: working.meta?.title,
      marquee: working.meta?.marquee,
    }
  );

  pptx.defineLayout({ name: LAYOUT_NAME, width: ctx.width, height: ctx.height });
  pptx.layout = LAYOUT_NAME;

  if (working.meta?.title) pptx.title = working.meta.title;
  if (working.meta?.company) pptx.company = working.meta.company;
  if (working.meta?.description) pptx.subject = working.meta.description;
  pptx.author = "presentation-md";

  const lang = normalizeDeckLang(working.meta?.lang);
  const rtl = deckLangDir(lang) === "rtl";
  if (rtl) pptx.rtlMode = true;

  const slides = Array.isArray(working.slides) ? working.slides : [];
  slides.forEach((slideData, i) => {
    currentSlide = i + 1;
    const slide = withDeckLanguage(pptx.addSlide(), lang, rtl);
    renderSlide(slide, ctx, slideData);

    const notes = typeof slideData.notes === "string" ? slideData.notes.trim() : "";
    if (notes) {
      slide.addNotes(notes);
    }

    const isLast = i === slides.length - 1;
    if (isLast && opts.attribution !== false) {
      slide.addText(ATTRIBUTION_TEXT, {
        x: ctx.margin,
        y: ctx.height - 0.4,
        w: ctx.width - ctx.margin * 2,
        h: 0.3,
        fontFace: ctx.fonts.body,
        color: ctx.colors.muted,
        fontSize: 9,
        align: "center",
        valign: "middle",
        hyperlink: { url: ATTRIBUTION_URL },
      });
    }
  });
  currentSlide = 0;

  return { pptx, slideCount: slides.length, warnings, fidelity };
}

/** Serialize the deck to a PPTX ArrayBuffer (works in Node and the browser). */
export async function deckToPptxArrayBuffer(
  deck: DeckJson,
  theme: ResolvedTheme,
  opts?: PptxOptions
): Promise<ArrayBuffer> {
  const { pptx } = await buildPptx(deck, theme, opts);
  const buf = (await pptx.write({ outputType: "arraybuffer" })) as ArrayBuffer;
  return applyScriptFonts(buf, normalizeDeckLang(deck.meta?.lang), "arraybuffer");
}

/** Serialize to a Node Buffer (server/CLI). */
export async function deckToPptxBuffer(
  deck: DeckJson,
  theme: ResolvedTheme,
  opts?: PptxOptions
): Promise<Buffer> {
  const { pptx } = await buildPptx(deck, theme, opts);
  const buf = (await pptx.write({ outputType: "nodebuffer" })) as Buffer;
  return applyScriptFonts(buf, normalizeDeckLang(deck.meta?.lang), "nodebuffer");
}

/** Serialize to a Blob (browser/studio download). */
export async function deckToPptxBlob(
  deck: DeckJson,
  theme: ResolvedTheme,
  opts?: PptxOptions
): Promise<Blob> {
  const { pptx } = await buildPptx(deck, theme, opts);
  const blob = (await pptx.write({ outputType: "blob" })) as Blob;
  return applyScriptFonts(blob, normalizeDeckLang(deck.meta?.lang), "blob");
}
