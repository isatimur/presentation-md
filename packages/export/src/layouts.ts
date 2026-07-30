import type { ExportContext } from "./context.js";
import type { Slide } from "./deck-types.js";
import type { PptxSlide, PptxTextOpts, PptxTableRow } from "./pptx.js";

/**
 * Per-layout mappers: each turns a structured slide into native PPTX shapes
 * (text boxes, tables, rounded rectangles) positioned in inches on the slide.
 */

type PSlide = PptxSlide;
type TextOpts = PptxTextOpts;

function eyebrow(slide: PSlide, ctx: ExportContext, text: string, x: number, y: number, w: number): void {
  slide.addText(text.toUpperCase(), {
    x,
    y,
    w,
    h: 0.35,
    fontFace: ctx.fonts.body,
    fontSize: 13,
    bold: true,
    color: ctx.colors.accent2,
    charSpacing: 2,
    align: "left",
    valign: "middle",
  });
}

function heading(slide: PSlide, ctx: ExportContext, text: string, opts: TextOpts): void {
  slide.addText(text, {
    fontFace: ctx.fonts.heading,
    bold: ctx.fonts.headingBold,
    color: ctx.colors.text,
    fit: "shrink",
    valign: "top",
    align: "left",
    ...opts,
  });
}

function body(slide: PSlide, ctx: ExportContext, text: string, opts: TextOpts): void {
  slide.addText(text, {
    fontFace: ctx.fonts.body,
    color: ctx.colors.muted,
    fontSize: 16,
    fit: "shrink",
    valign: "top",
    align: "left",
    lineSpacingMultiple: 1.15,
    ...opts,
  });
}

/** title / closing share a centered hero block. */
function renderHero(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const x = ctx.margin;
  const w = ctx.width - ctx.margin * 2;
  let y = ctx.height * 0.32;

  if (data.eyebrow) {
    eyebrow(slide, ctx, data.eyebrow, x, y, w);
    y += 0.5;
  }
  if (data.heading) {
    heading(slide, ctx, data.heading, { x, y, w, h: 1.8, fontSize: 44 });
    y += 1.9;
  }
  if (data.lead) {
    body(slide, ctx, data.lead, { x, y, w, h: 1.2, fontSize: 20 });
    y += 1.2;
  }
  if (data.cta?.label) {
    const btnW = Math.min(3.2, w);
    slide.addText(data.cta.label, {
      shape: ctx.shapeRoundRect,
      x,
      y: y + 0.1,
      w: btnW,
      h: 0.6,
      fill: { color: ctx.colors.accent },
      color: ctx.colors.bg,
      fontFace: ctx.fonts.body,
      fontSize: 16,
      bold: true,
      align: "center",
      valign: "middle",
      rectRadius: 0.08,
      ...(data.cta.href ? { hyperlink: { url: data.cta.href } } : {}),
    });
  }
}

function renderSection(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const x = ctx.margin;
  const w = ctx.width - ctx.margin * 2;
  if (data.number) {
    slide.addText(data.number, {
      x,
      y: ctx.margin,
      w,
      h: 2,
      fontFace: ctx.fonts.heading,
      bold: true,
      color: ctx.colors.accent,
      fontSize: 96,
      align: "left",
      valign: "top",
    });
  }
  let y = ctx.height * 0.42;
  if (data.eyebrow) {
    eyebrow(slide, ctx, data.eyebrow, x, y, w);
    y += 0.5;
  }
  if (data.heading) {
    heading(slide, ctx, data.heading, { x, y, w, h: 1.6, fontSize: 40 });
    y += 1.7;
  }
  if (data.lead) {
    body(slide, ctx, data.lead, { x, y, w, h: 1.0, fontSize: 18 });
  }
}

function renderHeaderBlock(slide: PSlide, ctx: ExportContext, data: Slide): number {
  const x = ctx.margin;
  const w = ctx.width - ctx.margin * 2;
  let y = ctx.margin;
  if (data.eyebrow) {
    eyebrow(slide, ctx, data.eyebrow, x, y, w);
    y += 0.45;
  }
  if (data.heading) {
    heading(slide, ctx, data.heading, { x, y, w, h: 1.0, fontSize: 30 });
    y += 1.1;
  }
  return y;
}

function renderTwoColumn(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const colGap = 0.5;
  const areaW = ctx.width - ctx.margin * 2 - colGap;
  const ratio = typeof data.ratio === "string" ? data.ratio : "1-1";
  const parts = ratio.split("-").map((n) => Number(n) || 1);
  const leftShare = parts[0] ?? 1;
  const rightShare = parts[1] ?? 1;
  const total = leftShare + rightShare;
  const textW = (areaW * leftShare) / total;
  const mediaW = (areaW * rightShare) / total;
  let textX = ctx.margin;
  let mediaX = ctx.margin + textW + colGap;
  if (data.reverse) {
    mediaX = ctx.margin;
    textX = ctx.margin + mediaW + colGap;
  }

  let y = ctx.margin;
  if (data.eyebrow) {
    eyebrow(slide, ctx, data.eyebrow, textX, y, textW);
    y += 0.45;
  }
  if (data.heading) {
    heading(slide, ctx, data.heading, { x: textX, y, w: textW, h: 1.4, fontSize: 30 });
    y += 1.5;
  }
  if (data.body) {
    body(slide, ctx, data.body, { x: textX, y, w: textW, h: ctx.height - y - ctx.margin, fontSize: 16 });
  }

  const imgY = ctx.margin;
  const imgH = ctx.height - ctx.margin * 2;
  if (data.image) {
    addImageOrPlaceholder(slide, ctx, data, mediaX, imgY, mediaW, imgH);
  } else if (data.aside) {
    slide.addShape(ctx.shapeRoundRect, {
      x: mediaX,
      y: imgY,
      w: mediaW,
      h: imgH,
      fill: { color: ctx.colors.cardBg },
      line: { color: ctx.colors.accent, width: 1.5 },
      rectRadius: 0.08,
    });
    slide.addText(data.aside, {
      x: mediaX + 0.3,
      y: imgY + 0.4,
      w: mediaW - 0.6,
      h: imgH - 0.8,
      fontFace: ctx.fonts.heading,
      bold: true,
      color: ctx.colors.text,
      fontSize: 22,
      fit: "shrink",
      valign: "middle",
    });
  }
}

function addImageOrPlaceholder(
  slide: PSlide,
  ctx: ExportContext,
  data: Slide,
  x: number,
  y: number,
  w: number,
  h: number
): void {
  const src = data.image;
  if (src && src.startsWith("data:")) {
    try {
      slide.addImage({ data: src, x, y, w, h, sizing: { type: "contain", w, h } });
      return;
    } catch {
      ctx.warn(`Failed to embed inline image; showed placeholder instead.`);
    }
  } else if (src) {
    // Remote/local URLs that weren't prefetched — placeholder + warning.
    ctx.warn(
      `Image not embedded (prefetch http(s) or local file paths before export): ${src}`
    );
  }
  slide.addShape(ctx.shapeRoundRect, {
    x,
    y,
    w,
    h,
    fill: { color: ctx.colors.cardBg },
    line: { color: ctx.colors.border, width: 1 },
    rectRadius: 0.08,
  });
  slide.addText(data.imageAlt || "Image", {
    x,
    y,
    w,
    h,
    fontFace: ctx.fonts.body,
    color: ctx.colors.muted,
    fontSize: 14,
    align: "center",
    valign: "middle",
    italic: true,
  });
}

function drawFeatureCard(
  slide: PSlide,
  ctx: ExportContext,
  card: { title: string; body?: string },
  x: number,
  y: number,
  w: number,
  h: number,
  opts: { hero?: boolean } = {}
): void {
  const hero = Boolean(opts.hero);
  slide.addShape(ctx.shapeRoundRect, {
    x,
    y,
    w,
    h,
    fill: { color: hero ? ctx.colors.bg2 : ctx.colors.cardBg },
    line: { color: hero ? ctx.colors.accent : ctx.colors.border, width: hero ? 1.5 : 1 },
    rectRadius: 0.06,
  });
  // Accent marker (stands in for the icon glyph).
  slide.addShape(ctx.shapeRoundRect, {
    x: x + 0.2,
    y: y + 0.2,
    w: hero ? 0.4 : 0.32,
    h: hero ? 0.4 : 0.32,
    fill: { color: ctx.colors.accent },
    rectRadius: 0.05,
  });
  const pad = 0.2;
  const titleY = y + (hero ? 0.75 : 0.6);
  const titleH = hero ? 0.7 : 0.5;
  slide.addText(card.title, {
    x: x + pad,
    y: titleY,
    w: w - pad * 2,
    h: titleH,
    fontFace: ctx.fonts.heading,
    bold: true,
    color: ctx.colors.text,
    fontSize: hero ? 22 : 16,
    fit: "shrink",
    valign: "top",
  });
  if (card.body) {
    slide.addText(card.body, {
      x: x + pad,
      y: titleY + titleH + 0.05,
      w: w - pad * 2,
      h: Math.max(0.4, h - (titleY - y) - titleH - 0.3),
      fontFace: ctx.fonts.body,
      color: ctx.colors.muted,
      fontSize: hero ? 14 : 12,
      fit: "shrink",
      valign: "top",
      lineSpacingMultiple: 1.1,
    });
  }
}

/** Asymmetric 5-up: hero card spans left column, remaining cards fill a 2×2 on the right. */
function renderBentoGrid(
  slide: PSlide,
  ctx: ExportContext,
  cards: Array<{ title: string; body?: string }>,
  areaX: number,
  areaY: number,
  areaW: number,
  areaH: number
): void {
  const gap = 0.28;
  const heroW = areaW * 0.42;
  const rightW = areaW - heroW - gap;
  const [hero, ...rest] = cards;
  if (hero) {
    drawFeatureCard(slide, ctx, hero, areaX, areaY, heroW, areaH, { hero: true });
  }
  const stack = rest.slice(0, 4);
  if (stack.length === 0) return;
  const cols = Math.min(2, stack.length);
  const rows = Math.ceil(stack.length / cols);
  const cardW = (rightW - gap * (cols - 1)) / cols;
  const cardH = (areaH - gap * (rows - 1)) / rows;
  stack.forEach((card, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const x = areaX + heroW + gap + c * (cardW + gap);
    const y = areaY + r * (cardH + gap);
    drawFeatureCard(slide, ctx, card, x, y, cardW, cardH);
  });
}

function renderFeatureGrid(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const top = renderHeaderBlock(slide, ctx, data);
  const cards = data.cards ?? [];
  if (cards.length === 0) return;

  const gap = 0.35;
  const areaX = ctx.margin;
  const areaW = ctx.width - ctx.margin * 2;
  const areaY = top + 0.1;
  const areaH = ctx.height - areaY - ctx.margin;

  if (data.columns === "bento" && cards.length >= 2) {
    renderBentoGrid(slide, ctx, cards, areaX, areaY, areaW, areaH);
    return;
  }

  let cols = typeof data.columns === "number" ? data.columns : 3;
  cols = Math.max(1, Math.min(4, cols, cards.length));
  const rows = Math.ceil(cards.length / cols);
  const cardW = (areaW - gap * (cols - 1)) / cols;
  const cardH = (areaH - gap * (rows - 1)) / rows;

  cards.forEach((card, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const x = areaX + c * (cardW + gap);
    const y = areaY + r * (cardH + gap);
    drawFeatureCard(slide, ctx, card, x, y, cardW, cardH);
  });
}

function renderDataTable(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const top = renderHeaderBlock(slide, ctx, data);
  const headers = Array.isArray(data.columns) ? data.columns : [];
  const rows = data.rows ?? [];

  const tableRows: PptxTableRow[] = [];
  if (headers.length > 0) {
    tableRows.push(
      headers.map((label) => ({
        text: label,
        options: {
          bold: true,
          color: ctx.colors.bg,
          fill: { color: ctx.colors.accent },
          fontFace: ctx.fonts.heading,
          fontSize: 14,
        },
      }))
    );
  }
  for (const row of rows) {
    tableRows.push(
      row.map((cell) => ({
        text: cell,
        options: { color: ctx.colors.text, fontFace: ctx.fonts.body, fontSize: 13 },
      }))
    );
  }
  if (tableRows.length === 0) return;

  slide.addTable(tableRows, {
    x: ctx.margin,
    y: top + 0.1,
    w: ctx.width - ctx.margin * 2,
    border: { type: "solid", color: ctx.colors.border, pt: 1 },
    align: "left",
    valign: "middle",
    autoPage: false,
    rowH: 0.4,
  });
}

function renderStatRow(slide: PSlide, ctx: ExportContext, data: Slide): void {
  renderHeaderBlock(slide, ctx, data);
  const stats = data.stats ?? [];
  if (stats.length === 0) return;

  const gap = 0.4;
  const areaW = ctx.width - ctx.margin * 2;
  const cellW = (areaW - gap * (stats.length - 1)) / stats.length;
  const y = ctx.height * 0.42;

  stats.forEach((stat, i) => {
    const x = ctx.margin + i * (cellW + gap);
    slide.addText(stat.value, {
      x,
      y,
      w: cellW,
      h: 1.0,
      fontFace: ctx.fonts.heading,
      bold: true,
      color: ctx.colors.accent,
      fontSize: 40,
      align: "center",
      valign: "middle",
      fit: "shrink",
    });
    slide.addText(stat.label, {
      x,
      y: y + 1.05,
      w: cellW,
      h: 0.7,
      fontFace: ctx.fonts.body,
      color: ctx.colors.muted,
      fontSize: 14,
      align: "center",
      valign: "top",
      fit: "shrink",
    });
  });
}

function renderTimeline(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const top = renderHeaderBlock(slide, ctx, data);
  const steps = data.steps ?? [];
  if (steps.length === 0) return;

  const areaY = top + 0.1;
  const areaH = ctx.height - areaY - ctx.margin;
  const stepH = areaH / steps.length;
  const badge = 0.4;
  const x = ctx.margin;

  steps.forEach((step, i) => {
    const y = areaY + i * stepH;
    slide.addShape(ctx.shapeOval, {
      x,
      y: y + 0.05,
      w: badge,
      h: badge,
      fill: { color: ctx.colors.accent },
    });
    slide.addText(String(i + 1), {
      x,
      y: y + 0.05,
      w: badge,
      h: badge,
      fontFace: ctx.fonts.heading,
      bold: true,
      color: ctx.colors.bg,
      fontSize: 14,
      align: "center",
      valign: "middle",
    });
    const textX = x + badge + 0.25;
    const textW = ctx.width - textX - ctx.margin;
    slide.addText(step.title, {
      x: textX,
      y,
      w: textW,
      h: 0.4,
      fontFace: ctx.fonts.heading,
      bold: true,
      color: ctx.colors.text,
      fontSize: 16,
      valign: "middle",
      fit: "shrink",
    });
    if (step.body) {
      slide.addText(step.body, {
        x: textX,
        y: y + 0.4,
        w: textW,
        h: stepH - 0.5,
        fontFace: ctx.fonts.body,
        color: ctx.colors.muted,
        fontSize: 13,
        valign: "top",
        fit: "shrink",
      });
    }
  });
}

function renderQuote(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const x = ctx.margin * 1.5;
  const w = ctx.width - x * 2;
  if (data.quote) {
    slide.addText(`“${data.quote}”`, {
      x,
      y: ctx.height * 0.28,
      w,
      h: 2.4,
      fontFace: ctx.fonts.heading,
      color: ctx.colors.text,
      fontSize: 30,
      italic: true,
      align: "center",
      valign: "middle",
      fit: "shrink",
    });
  }
  if (data.by) {
    slide.addText(`— ${data.by}`, {
      x,
      y: ctx.height * 0.7,
      w,
      h: 0.6,
      fontFace: ctx.fonts.body,
      color: ctx.colors.accent2,
      fontSize: 16,
      bold: true,
      align: "center",
      valign: "top",
    });
  }
}

function renderImageHero(slide: PSlide, ctx: ExportContext, data: Slide): void {
  addImageOrPlaceholder(slide, ctx, data, 0, 0, ctx.width, ctx.height);

  // Bottom + side scrim so caption copy stays readable over any photo
  // (mirrors HTML `.image-hero-scrim` — translucent PPTX fills stand in for gradients).
  slide.addShape(ctx.shapeRoundRect, {
    x: 0,
    y: ctx.height * 0.42,
    w: ctx.width,
    h: ctx.height * 0.58,
    fill: { color: ctx.colors.bg, transparency: 28 },
    line: { color: ctx.colors.bg, width: 0 },
    rectRadius: 0,
  });
  slide.addShape(ctx.shapeRoundRect, {
    x: 0,
    y: 0,
    w: ctx.width * 0.42,
    h: ctx.height,
    fill: { color: ctx.colors.bg, transparency: 55 },
    line: { color: ctx.colors.bg, width: 0 },
    rectRadius: 0,
  });

  const x = ctx.margin;
  const w = Math.min(ctx.width * 0.62, ctx.width - ctx.margin * 2);
  let y = ctx.height * 0.58;

  if (data.eyebrow) {
    eyebrow(slide, ctx, data.eyebrow, x, y, w);
    y += 0.45;
  }
  if (data.heading) {
    heading(slide, ctx, data.heading, { x, y, w, h: 1.35, fontSize: 34 });
    y += 1.4;
  }
  if (data.lead) {
    body(slide, ctx, data.lead, { x, y, w, h: 0.95, fontSize: 17 });
  }
}

function renderComparison(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const colGap = 0.35;
  const vsW = 0.45;
  const innerW = ctx.width - ctx.margin * 2;
  const emphasis = data.emphasis === "left" || data.emphasis === "right" ? data.emphasis : undefined;
  // Grow the winning column (~1.35 : 1) to match HTML `.emphasis-*` craft.
  const grow = 1.35;
  const shrink = 1;
  const leftShare = emphasis === "left" ? grow : emphasis === "right" ? shrink : 1;
  const rightShare = emphasis === "right" ? grow : emphasis === "left" ? shrink : 1;
  const usable = innerW - colGap * 2 - vsW;
  const leftW = (usable * leftShare) / (leftShare + rightShare);
  const rightW = usable - leftW;
  const leftX = ctx.margin;
  const rightX = ctx.margin + leftW + colGap + vsW + colGap;
  const y = renderHeaderBlock(slide, ctx, data);
  const boxY = y + 0.15;
  const boxH = ctx.height - boxY - ctx.margin;

  const drawCol = (
    x: number,
    colW: number,
    label: string | undefined,
    text: string | undefined,
    highlighted: boolean
  ) => {
    slide.addShape(ctx.shapeRoundRect, {
      x,
      y: boxY,
      w: colW,
      h: boxH,
      fill: { color: highlighted ? ctx.colors.bg2 : ctx.colors.cardBg },
      line: { color: highlighted ? ctx.colors.accent : ctx.colors.border, width: highlighted ? 1.75 : 1 },
      rectRadius: 0.06,
    });
    let innerY = boxY + 0.25;
    if (label) {
      eyebrow(slide, ctx, label, x + 0.2, innerY, colW - 0.4);
      innerY += 0.45;
    }
    if (text) {
      body(slide, ctx, text, {
        x: x + 0.2,
        y: innerY,
        w: colW - 0.4,
        h: boxH - (innerY - boxY) - 0.25,
        fontSize: highlighted ? 16 : 15,
      });
    }
  };

  drawCol(leftX, leftW, data.leftLabel, data.left, emphasis === "left");
  slide.addText("vs", {
    x: leftX + leftW + colGap,
    y: boxY + boxH * 0.42,
    w: vsW,
    h: 0.5,
    fontFace: ctx.fonts.heading,
    bold: true,
    color: ctx.colors.accent,
    fontSize: 14,
    align: "center",
    valign: "middle",
  });
  drawCol(rightX, rightW, data.rightLabel, data.right, emphasis === "right");
}

function renderCode(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const top = renderHeaderBlock(slide, ctx, data);
  const x = ctx.margin;
  const w = ctx.width - ctx.margin * 2;
  const y = top + 0.15;
  const h = Math.max(1.8, ctx.height - y - ctx.margin);
  const chromeH = 0.42;

  slide.addShape(ctx.shapeRoundRect, {
    x,
    y,
    w,
    h,
    fill: { color: "1e1e24" },
    line: { color: ctx.colors.border, width: 1 },
    rectRadius: 0.08,
  });
  slide.addShape(ctx.shapeRoundRect, {
    x,
    y,
    w,
    h: chromeH,
    fill: { color: "2a2a32" },
    rectRadius: 0.08,
  });

  // Traffic-light chrome dots (window chrome cue from HTML code layout).
  const dots = [
    { color: "FF5F56", dx: 0.22 },
    { color: "FFBD2E", dx: 0.42 },
    { color: "27C93F", dx: 0.62 },
  ];
  for (const dot of dots) {
    slide.addShape(ctx.shapeOval, {
      x: x + dot.dx,
      y: y + 0.14,
      w: 0.14,
      h: 0.14,
      fill: { color: dot.color },
      line: { color: dot.color, width: 0 },
    });
  }

  const label = data.filename ?? data.language ?? "snippet";
  slide.addText(label, {
    x: x + 0.9,
    y: y + 0.05,
    w: w - 1.2,
    h: 0.32,
    fontFace: "Courier New",
    fontSize: 11,
    color: "a1a1aa",
    valign: "middle",
  });

  const code = data.code ?? "";
  slide.addText(code, {
    x: x + 0.35,
    y: y + chromeH + 0.15,
    w: w - 0.7,
    h: h - chromeH - 0.35,
    fontFace: "Courier New",
    fontSize: 12,
    color: "e8eaed",
    valign: "top",
    fit: "shrink",
  });
}

const RENDERERS: Record<string, (s: PSlide, ctx: ExportContext, d: Slide) => void> = {
  title: renderHero,
  closing: renderHero,
  section: renderSection,
  "two-column": renderTwoColumn,
  "feature-grid": renderFeatureGrid,
  "data-table": renderDataTable,
  "stat-row": renderStatRow,
  timeline: renderTimeline,
  quote: renderQuote,
  "image-hero": renderImageHero,
  comparison: renderComparison,
  code: renderCode,
};

export function renderSlide(slide: PSlide, ctx: ExportContext, data: Slide): void {
  slide.background = { color: ctx.colors.bg };
  const renderer = RENDERERS[data.layout];
  if (!renderer) {
    ctx.warn(`Unknown layout "${data.layout}" — rendered heading/lead only.`);
    renderHero(slide, ctx, data);
    return;
  }
  renderer(slide, ctx, data);
}
