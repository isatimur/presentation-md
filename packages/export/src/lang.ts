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

type TableArgs = Parameters<PptxSlide["addTable"]>;
type ChartArgs = Parameters<PptxSlide["addChart"]>;
type CellOpts = { lang?: string; align?: Align };

/** Table cells: language on every cell, mirrored alignment for RTL (cells have no rtlMode). */
function applyCell(cell: unknown, lang: string, rtl: boolean): unknown {
  if (typeof cell === "string" || typeof cell === "number") {
    return { text: String(cell), options: { lang } };
  }
  if (cell && typeof cell === "object") {
    const c = cell as { options?: CellOpts };
    const options: CellOpts = { ...(c.options ?? {}) };
    if (options.lang === undefined) options.lang = lang;
    if (rtl) options.align = mirror(options.align);
    return { ...c, options };
  }
  return cell;
}

/**
 * Wrap a slide so every addText, addTable, and addChart call carries the deck
 * language. Right-to-left decks also get paragraph RTL on text and mirrored
 * left/right alignment on text and table cells. Layout renderers stay
 * language-agnostic.
 */
export function withDeckLanguage(slide: PptxSlide, lang: string, rtl: boolean): PptxSlide {
  if (lang === "en" && !rtl) return slide; // pptxgenjs default lang is en-US
  const addText = slide.addText.bind(slide);
  slide.addText = ((text: TextArg, options?: PptxTextOpts) => {
    const runs = Array.isArray(text)
      ? text.map((run) => ({ ...run, options: applyRun(run.options, lang, rtl) }))
      : text;
    return addText(runs as TextArg, applyRun(options, lang, rtl));
  }) as PptxSlide["addText"];

  const addTable = slide.addTable.bind(slide);
  slide.addTable = ((rows: TableArgs[0], options?: TableArgs[1]) => {
    const tagged = rows.map((row) => row.map((cell) => applyCell(cell, lang, rtl)));
    const opts = { ...(options ?? {}) } as NonNullable<TableArgs[1]> & CellOpts;
    if (opts.lang === undefined) opts.lang = lang;
    if (rtl) opts.align = mirror(opts.align);
    return addTable(tagged as TableArgs[0], opts);
  }) as PptxSlide["addTable"];

  const addChart = slide.addChart.bind(slide);
  slide.addChart = ((type: ChartArgs[0], data: ChartArgs[1], options?: ChartArgs[2]) => {
    const opts = { ...(options ?? {}) } as NonNullable<ChartArgs[2]> & { lang?: string };
    if (opts.lang === undefined) opts.lang = lang;
    return addChart(type, data, opts);
  }) as PptxSlide["addChart"];

  return slide;
}
