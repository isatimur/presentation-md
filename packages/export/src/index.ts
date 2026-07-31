import type { ResolvedTheme } from "@presentation-md/core";
import { PptxGenJS, type Pptx } from "./pptx.js";
import { buildContext } from "./context.js";
import { renderSlide } from "./layouts.js";
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

export { prefetchDeckImages };
export type { PrefetchImagesOptions, PrefetchImagesResult };

const ATTRIBUTION_TEXT = "Made with presentation-md";
const ATTRIBUTION_URL = "https://presentation-md.vercel.app/?ref=pptx";

export interface PptxOptions {
  /** Called for any content that couldn't be mapped exactly (e.g. remote images). */
  onWarn?: (msg: string) => void;
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
}

export interface BuildResult {
  pptx: Pptx;
  slideCount: number;
  warnings: string[];
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
  const warn = (msg: string): void => {
    warnings.push(msg);
    opts.onWarn?.(msg);
  };

  let working = deck;
  if (opts.prefetchImages) {
    const prepared = await prefetchDeckImages(deck, opts.prefetch);
    working = prepared.deck;
    for (const msg of prepared.warnings) warn(msg);
  }

  const pptx = new PptxGenJS();
  const ctx = buildContext(
    theme,
    { roundRect: pptx.ShapeType.roundRect, oval: pptx.ShapeType.ellipse },
    warn
  );

  pptx.defineLayout({ name: LAYOUT_NAME, width: ctx.width, height: ctx.height });
  pptx.layout = LAYOUT_NAME;

  if (working.meta?.title) pptx.title = working.meta.title;
  if (working.meta?.company) pptx.company = working.meta.company;
  if (working.meta?.description) pptx.subject = working.meta.description;
  pptx.author = "presentation-md";

  const slides = Array.isArray(working.slides) ? working.slides : [];
  slides.forEach((slideData, i) => {
    const slide = pptx.addSlide();
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

  return { pptx, slideCount: slides.length, warnings };
}

/** Serialize the deck to a PPTX ArrayBuffer (works in Node and the browser). */
export async function deckToPptxArrayBuffer(
  deck: DeckJson,
  theme: ResolvedTheme,
  opts?: PptxOptions
): Promise<ArrayBuffer> {
  const { pptx } = await buildPptx(deck, theme, opts);
  return (await pptx.write({ outputType: "arraybuffer" })) as ArrayBuffer;
}

/** Serialize to a Node Buffer (server/CLI). */
export async function deckToPptxBuffer(
  deck: DeckJson,
  theme: ResolvedTheme,
  opts?: PptxOptions
): Promise<Buffer> {
  const { pptx } = await buildPptx(deck, theme, opts);
  return (await pptx.write({ outputType: "nodebuffer" })) as Buffer;
}

/** Serialize to a Blob (browser/studio download). */
export async function deckToPptxBlob(
  deck: DeckJson,
  theme: ResolvedTheme,
  opts?: PptxOptions
): Promise<Blob> {
  const { pptx } = await buildPptx(deck, theme, opts);
  return (await pptx.write({ outputType: "blob" })) as Blob;
}
