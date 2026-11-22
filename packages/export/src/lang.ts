import type { PptxSlide, PptxTextOpts } from "./pptx.js";

type TextArg = Parameters<PptxSlide["addText"]>[0];
type Align = PptxTextOpts["align"];

/** In a right-to-left deck, the layouts' "left" means "start", so mirror it. */
function mirror(align: Align): Align {
  if (align === "left") return "right";
  if (align === "right") return "left";
  return align;
}

function applyRun<T extends Partial<PptxTextOpts>>(opts: T | undefined, lang: string, rtl: boolean): T {
  const out = { ...(opts ?? {}) } as T & Partial<PptxTextOpts>;
  if (out.lang === undefined) out.lang = lang;
  if (rtl) {
    if (out.rtlMode === undefined) out.rtlMode = true;
    out.align = mirror(out.align);
  }
  return out as T;
}

/**
 * Wrap a slide so every addText call carries the deck language (run `lang`)
 * and, for right-to-left decks, paragraph RTL plus mirrored left/right alignment.
 * Layout renderers stay language-agnostic.
 */
export function withDeckLanguage(slide: PptxSlide, lang: string, rtl: boolean): PptxSlide {
  if (lang === "en" && !rtl) return slide; // pptxgenjs default run lang is en-US
  const addText = slide.addText.bind(slide);
  slide.addText = ((text: TextArg, options?: PptxTextOpts) => {
    const runs = Array.isArray(text)
      ? text.map((run) => ({ ...run, options: applyRun(run.options, lang, rtl) }))
      : text;
    return addText(runs as TextArg, applyRun(options, lang, rtl));
  }) as PptxSlide["addText"];
  return slide;
}
