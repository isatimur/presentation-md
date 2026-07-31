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
  const inverted =
    ctx.themeName === "kinetic-wrapped" &&
    (data.layout === "title" ||
      data.layout === "closing" ||
      ["lime", "cyan", "orange"].includes(String(data.tone ?? "")));
  const onHueLight =
    ctx.themeName === "kinetic-wrapped" &&
    ["magenta", "violet"].includes(String(data.tone ?? ""));
  const text = inverted ? "0A0A0A" : onHueLight ? "FFFFFF" : ctx.colors.text;
  const muted = inverted ? "1A1A1A" : onHueLight ? "F0F0F0" : ctx.colors.muted;
  const accent = inverted ? "0A0A0A" : onHueLight ? "FFFFFF" : ctx.colors.accent2;

  if (data.eyebrow) {
    slide.addText(data.eyebrow.toUpperCase(), {
      x,
      y,
      w,
      h: 0.35,
      fontFace: ctx.fonts.body,
      fontSize: 13,
      bold: true,
      color: accent,
      charSpacing: 2,
      align: "left",
      valign: "middle",
    });
    y += 0.5;
  }
  if (data.heading) {
    slide.addText(data.heading, {
      x,
      y,
      w,
      h: 1.8,
      fontFace: ctx.fonts.heading,
      bold: ctx.fonts.headingBold,
      color: text,
      fontSize: 44,
      fit: "shrink",
      valign: "top",
      align: "left",
    });
    y += 1.9;
  }
  if (data.lead) {
    slide.addText(data.lead, {
      x,
      y,
      w,
      h: 1.2,
      fontFace: ctx.fonts.body,
      color: muted,
      fontSize: 20,
      fit: "shrink",
      valign: "top",
      align: "left",
      lineSpacingMultiple: 1.15,
    });
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
      fill: { color: inverted ? "0A0A0A" : ctx.colors.accent },
      color: inverted ? "C8FF00" : ctx.colors.bg,
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

/** First meaningful letter from a Font Awesome class (e.g. `fa-solid fa-bolt` → `B`). */
function iconMarkerLetter(icon?: string): string {
  if (!icon) return "";
  const token = icon
    .split(/\s+/)
    .map((p) => p.replace(/^fa[a-z-]*-/i, ""))
    .find((p) => p && !/^(solid|regular|brands|sharp|light|thin)$/i.test(p));
  const letter = (token ?? "").replace(/[^a-z0-9]/gi, "").charAt(0);
  return letter ? letter.toUpperCase() : "";
}

function drawIconMarker(
  slide: PSlide,
  ctx: ExportContext,
  icon: string | undefined,
  x: number,
  y: number,
  size: number
): void {
  const letter = iconMarkerLetter(icon);
  // Geometric stand-in: circle for "circle/dot/bullseye", rounded chip otherwise.
  const circular = Boolean(icon && /circle|dot|bullseye|radio|record/i.test(icon));
  if (circular) {
    slide.addShape(ctx.shapeOval, {
      x,
      y,
      w: size,
      h: size,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
    });
  } else {
    slide.addShape(ctx.shapeRoundRect, {
      x,
      y,
      w: size,
      h: size,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0.06,
    });
  }
  if (letter) {
    slide.addText(letter, {
      x,
      y,
      w: size,
      h: size,
      fontFace: ctx.fonts.body,
      bold: true,
      color: ctx.colors.bg,
      fontSize: Math.max(9, Math.round(size * 18)),
      align: "center",
      valign: "middle",
    });
  } else {
    // Bare accent bar tick when no icon was provided.
    slide.addShape(ctx.shapeRoundRect, {
      x: x + size * 0.28,
      y: y + size * 0.42,
      w: size * 0.44,
      h: size * 0.16,
      fill: { color: ctx.colors.bg },
      line: { color: ctx.colors.bg, width: 0 },
      rectRadius: 0.02,
    });
  }
}

function drawFeatureCard(
  slide: PSlide,
  ctx: ExportContext,
  card: { icon?: string; title: string; body?: string },
  x: number,
  y: number,
  w: number,
  h: number,
  opts: { hero?: boolean } = {}
): void {
  const hero = Boolean(opts.hero);
  const fill = hero ? ctx.colors.emphasisFill : ctx.colors.cardBg;
  const ink = hero ? ctx.colors.emphasisText : ctx.colors.cardText;
  const bodyInk = hero ? ctx.colors.emphasisText : ctx.colors.cardMuted;
  slide.addShape(ctx.shapeRoundRect, {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    line: { color: hero ? ctx.colors.accent : ctx.colors.border, width: hero ? 1.5 : 1 },
    rectRadius: 0.06,
  });
  drawIconMarker(slide, ctx, card.icon, x + 0.2, y + 0.2, hero ? 0.42 : 0.34);
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
    color: ink,
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
      color: bodyInk,
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
  cards: Array<{ icon?: string; title: string; body?: string }>,
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
    const fill = highlighted ? ctx.colors.emphasisFill : ctx.colors.cardBg;
    const ink = highlighted ? ctx.colors.emphasisText : ctx.colors.cardText;
    const bodyInk = highlighted ? ctx.colors.emphasisText : ctx.colors.cardMuted;
    slide.addShape(ctx.shapeRoundRect, {
      x,
      y: boxY,
      w: colW,
      h: boxH,
      fill: { color: fill },
      line: { color: highlighted ? ctx.colors.accent : ctx.colors.border, width: highlighted ? 1.75 : 1 },
      rectRadius: 0.06,
    });
    let innerY = boxY + 0.25;
    if (label) {
      slide.addText(label.toUpperCase(), {
        x: x + 0.2,
        y: innerY,
        w: colW - 0.4,
        h: 0.35,
        fontFace: ctx.fonts.body,
        fontSize: 13,
        bold: true,
        color: highlighted ? ink : ctx.colors.accent2,
        charSpacing: 2,
        align: "left",
        valign: "middle",
      });
      innerY += 0.45;
    }
    if (text) {
      slide.addText(text, {
        x: x + 0.2,
        y: innerY,
        w: colW - 0.4,
        h: boxH - (innerY - boxY) - 0.25,
        fontFace: ctx.fonts.body,
        color: bodyInk,
        fontSize: highlighted ? 16 : 15,
        fit: "shrink",
        valign: "top",
        align: "left",
        lineSpacingMultiple: 1.15,
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

function chartTypeToPptx(chartType: string | undefined): "bar" | "line" | "area" | "pie" | "doughnut" {
  switch (chartType) {
    case "line":
      return "line";
    case "area":
      return "area";
    case "pie":
      return "pie";
    case "donut":
      return "doughnut";
    case "horizontal-bar":
    case "bar":
    default:
      return "bar";
  }
}

function renderChart(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const top = renderHeaderBlock(slide, ctx, data);
  const series = data.series ?? [];
  if (series.length === 0) {
    ctx.warn("chart slide has no series — skipped chart.");
    return;
  }

  const categories =
    data.categories && data.categories.length > 0
      ? data.categories
      : Array.from(
          { length: Math.max(...series.map((s) => s.values?.length ?? 0), 1) },
          (_, i) => String(i + 1)
        );

  const chartData = series.map((s) => ({
    name: s.name || "Series",
    labels: categories,
    values: (s.values ?? []).map((v) => Number(v) || 0),
  }));

  const type = chartTypeToPptx(data.chartType);
  const colors = [
    ctx.colors.accent,
    ctx.colors.accent2,
    ctx.colors.muted,
    ctx.colors.text,
  ];

  const opts: Record<string, unknown> = {
    x: ctx.margin,
    y: top + 0.15,
    w: ctx.width - ctx.margin * 2,
    h: ctx.height - top - ctx.margin - 0.2,
    showTitle: false,
    showLegend: data.showLegend !== false && (series.length > 1 || type === "pie" || type === "doughnut"),
    showValue: data.showValues === true,
    chartColors: colors,
    chartColorsOpacity: 100,
    border: { pt: 0, color: ctx.colors.bg },
    chartArea: { fill: { color: ctx.colors.cardBg } },
  };

  if (type === "bar") {
    opts["barGrouping"] = data.stacked ? "stacked" : "clustered";
    opts["barDir"] = data.chartType === "horizontal-bar" ? "bar" : "col";
  }

  try {
    slide.addChart(type, chartData, opts);
  } catch (err) {
    ctx.warn(`chart export failed (${(err as Error).message}) — falling back to table.`);
    // Fallback: dump as a simple table so data is not lost.
    const headers = ["Category", ...series.map((s) => s.name || "Series")];
    const rows = categories.map((cat, i) => [
      cat,
      ...series.map((s) => String(s.values?.[i] ?? "")),
    ]);
    renderDataTable(slide, ctx, {
      ...data,
      layout: "data-table",
      columns: headers,
      rows,
    });
  }
}

/** Extract #RRGGBB from a CSS color fragment (best-effort). */
function cssColorToHex(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const v = raw.trim();
  const hex = v.match(/#([0-9a-fA-F]{3,8})\b/);
  if (hex) {
    let h = hex[1]!;
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
    return h.slice(0, 6).toUpperCase();
  }
  const rgb = v.match(/rgba?\(\s*(\d+)\s*[, ]\s*(\d+)\s*[, ]\s*(\d+)/i);
  if (rgb) {
    const to = (n: string) => Number(n).toString(16).padStart(2, "0");
    return `${to(rgb[1]!)}${to(rgb[2]!)}${to(rgb[3]!)}`.toUpperCase();
  }
  return undefined;
}

interface HtmlBlock {
  kind: "heading" | "body" | "bar" | "panel";
  text: string;
  fill?: string;
  color?: string;
  widthPct?: number;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

function stripTags(s: string): string {
  return decodeEntities(s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

/** Approximate custom-html craft into PPTX shapes + ranked bars + text stack. */
function parseCustomHtmlBlocks(html: string): HtmlBlock[] {
  const blocks: HtmlBlock[] = [];
  const src = html;

  // Ranked / progress bars: elements with style width:NN%
  const barRe =
    /<([a-z0-9]+)([^>]*style\s*=\s*["'][^"']*width\s*:\s*(\d+(?:\.\d+)?)%[^"']*["'][^>]*)>([\s\S]*?)<\/\1>/gi;
  let m: RegExpExecArray | null;
  const consumed: string[] = [];
  while ((m = barRe.exec(src))) {
    const styleAttr = m[2] ?? "";
    const pct = Number(m[3]);
    const inner = stripTags(m[4] ?? "");
    const fillMatch = styleAttr.match(/background(?:-color)?\s*:\s*([^;"']+)/i);
    const colorMatch = styleAttr.match(/(?:^|[^-])color\s*:\s*([^;"']+)/i);
    if (inner && pct > 0) {
      blocks.push({
        kind: "bar",
        text: inner,
        widthPct: Math.min(100, pct),
        fill: cssColorToHex(fillMatch?.[1]) ?? undefined,
        color: cssColorToHex(colorMatch?.[1]) ?? undefined,
      });
      consumed.push(m[0]);
    }
  }

  let remainder = src;
  for (const c of consumed) remainder = remainder.replace(c, " ");

  // Colored panels (div/span with background, no width%)
  const panelRe =
    /<(div|section|aside|article)([^>]*style\s*=\s*["'][^"']*background(?:-color)?\s*:\s*([^;"']+)[^"']*["'][^>]*)>([\s\S]*?)<\/\1>/gi;
  while ((m = panelRe.exec(remainder))) {
    const fill = cssColorToHex(m[3]);
    const text = stripTags(m[4] ?? "");
    if (fill && text && text.length < 200) {
      blocks.push({ kind: "panel", text, fill });
      remainder = remainder.replace(m[0], " ");
    }
  }

  for (const hm of remainder.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)) {
    const t = stripTags(hm[1] ?? "");
    if (t) blocks.push({ kind: "heading", text: t });
  }
  for (const pm of remainder.matchAll(/<(p|li|blockquote)[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const t = stripTags(pm[2] ?? "");
    if (t) blocks.push({ kind: "body", text: t });
  }

  if (!blocks.length) {
    const plain = stripTags(src);
    if (plain) blocks.push({ kind: "body", text: plain });
  }
  return blocks;
}

function renderCustomHtml(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const top = renderHeaderBlock(slide, ctx, data);
  const html = typeof data.html === "string" ? data.html : "";
  const blocks = parseCustomHtmlBlocks(html);

  const contentW = ctx.width - ctx.margin * 2;
  let y = top + 0.15;
  const bottom = ctx.height - ctx.margin - 0.15;
  const tone = typeof data.tone === "string" ? data.tone : "";
  const onHue =
    ctx.themeName === "kinetic-wrapped" &&
    ["magenta", "violet"].includes(tone);
  const defaultText = onHue ? "FFFFFF" : ctx.colors.text;
  const defaultMuted = onHue ? "F0F0F0" : ctx.colors.muted;

  if (!blocks.length) {
    const note =
      "This slide used custom-html in the HTML deck. Re-create the art in PowerPoint or keep the HTML export for fidelity.";
    slide.addText(data.body || data.lead || note, {
      x: ctx.margin,
      y,
      w: contentW,
      h: Math.max(0.8, bottom - y),
      fontFace: ctx.fonts.body,
      color: defaultMuted,
      fontSize: 16,
      valign: "top",
      fit: "shrink",
    });
    ctx.warn("custom-html layout had no parseable content — text fallback.");
    return;
  }

  const bars = blocks.filter((b) => b.kind === "bar");
  const others = blocks.filter((b) => b.kind !== "bar");

  for (const b of others) {
    if (y >= bottom - 0.4) break;
    if (b.kind === "panel" && b.fill) {
      const h = Math.min(1.1, bottom - y);
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.margin,
        y,
        w: contentW * 0.72,
        h,
        fill: { color: b.fill },
        line: { color: b.fill, width: 0 },
        rectRadius: 0.04,
      });
      slide.addText(b.text, {
        x: ctx.margin + 0.15,
        y: y + 0.12,
        w: contentW * 0.72 - 0.3,
        h: h - 0.2,
        fontFace: ctx.fonts.heading,
        color: defaultText,
        fontSize: 18,
        bold: true,
        valign: "middle",
        fit: "shrink",
      });
      y += h + 0.12;
      continue;
    }
    const isHead = b.kind === "heading";
    const h = isHead ? 0.55 : Math.min(1.2, 0.28 + b.text.length * 0.012);
    slide.addText(b.text, {
      x: ctx.margin,
      y,
      w: contentW,
      h,
      fontFace: isHead ? ctx.fonts.heading : ctx.fonts.body,
      color: isHead ? defaultText : defaultMuted,
      fontSize: isHead ? 28 : 15,
      bold: isHead,
      valign: "top",
      fit: "shrink",
    });
    y += h + 0.08;
  }

  if (bars.length) {
    y += 0.08;
    const barH = Math.min(0.55, (bottom - y - 0.1) / bars.length - 0.1);
    bars.forEach((bar, i) => {
      const by = y + i * (barH + 0.12);
      if (by + barH > bottom) return;
      // rank gutter
      slide.addText(String(i + 1).padStart(2, "0"), {
        x: ctx.margin,
        y: by,
        w: 0.55,
        h: barH,
        fontFace: ctx.fonts.heading,
        color: defaultText,
        fontSize: 22,
        bold: true,
        valign: "middle",
      });
      const trackX = ctx.margin + 0.65;
      const trackW = contentW - 0.65;
      const fillW = Math.max(0.4, trackW * ((bar.widthPct ?? 50) / 100));
      const fill = bar.fill ?? (i === 0 ? "FFFFFF" : ctx.colors.accent);
      const ink = bar.color ?? (fill.toUpperCase() === "FFFFFF" ? "0A0A0A" : defaultText);
      slide.addShape(ctx.shapeRoundRect, {
        x: trackX,
        y: by,
        w: fillW,
        h: barH,
        fill: { color: fill },
        line: { color: fill, width: 0 },
        rectRadius: 0.02,
      });
      slide.addText(bar.text, {
        x: trackX + 0.12,
        y: by,
        w: Math.max(0.5, fillW - 0.2),
        h: barH,
        fontFace: ctx.fonts.heading,
        color: ink,
        fontSize: 14,
        bold: true,
        valign: "middle",
        fit: "shrink",
      });
    });
  }

  ctx.warn(
    "custom-html layout approximates structure (bars/panels/text) in PPTX — HTML export keeps full craft."
  );
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
  chart: renderChart,
  "custom-html": renderCustomHtml,
};

/**
 * Approximate HTML surface craft that PPTX cannot express as CSS gradients:
 * dual-tone washes, title accent panels, and neon split fields.
 */
function paintSlideChrome(slide: PSlide, ctx: ExportContext, data: Slide): void {
  slide.background = { color: ctx.colors.bg };
  const theme = ctx.themeName;
  const isHero = data.layout === "title" || data.layout === "closing";

  // Generic bg→bg2 wash (stands in for linear/radial HTML gradients).
  if (ctx.colors.bg2.toLowerCase() !== ctx.colors.bg.toLowerCase()) {
    if (theme === "creative-voltage" && isHero) {
      // Left electric blue / right dark — mirrors creative-voltage-split.
      slide.background = { color: ctx.colors.bg };
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width * 0.48,
        y: 0,
        w: ctx.width * 0.52,
        h: ctx.height,
        fill: { color: ctx.colors.bg2 },
        line: { color: ctx.colors.bg2, width: 0 },
        rectRadius: 0,
      });
      slide.addShape(ctx.shapeOval, {
        x: ctx.width - 1.6,
        y: 0.55,
        w: 0.95,
        h: 0.95,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.accent, width: 0 },
      });
      return;
    }

    // Bottom-right wash of bg2 over flat bg (≈ diagonal gradient).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.35,
      y: ctx.height * 0.35,
      w: ctx.width * 0.65,
      h: ctx.height * 0.65,
      fill: { color: ctx.colors.bg2, transparency: 55 },
      line: { color: ctx.colors.bg2, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "bold-signal" && isHero) {
    // Orange focal panel — title/closing only (matches bold-signal-card surface).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.55,
      y: ctx.height * 0.2,
      w: ctx.width * 0.38,
      h: ctx.height * 0.58,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0.18,
    });
  }

  if (theme === "mat" && isHero) {
    // Soft woodglow corner — translucent accent2 stand-in for the radial wash.
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.62,
      y: ctx.height * 0.55,
      w: ctx.width * 0.5,
      h: ctx.height * 0.6,
      fill: { color: ctx.colors.accent2, transparency: 72 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "electric-studio" && isHero) {
    // White → blue horizontal split (mirrors electric-studio-split).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: ctx.height * 0.52,
      w: ctx.width,
      h: ctx.height * 0.48,
      fill: { color: ctx.colors.bg2 },
      line: { color: ctx.colors.bg2, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: ctx.height * 0.52,
      w: 0.1,
      h: ctx.height * 0.48,
      fill: { color: "#0a0a0a" },
      line: { color: "#0a0a0a", width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "soft-editorial") {
    // Soft sage radial stand-in (top-right wash).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: -ctx.height * 0.15,
      w: ctx.width * 0.55,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent, transparency: 78 },
      line: { color: ctx.colors.accent, width: 0 },
    });
  }

  if (theme === "kinetic-wrapped") {
    const tone = typeof data.tone === "string" ? data.tone : undefined;
    const hueMap: Record<string, string> = {
      lime: "C8FF00",
      magenta: "CC00FF",
      cyan: "00E5FF",
      orange: "FF4D00",
      violet: "7A00FF",
    };
    if (isHero) {
      // Lime-field cover/closing — matches wrapped-block HTML flip.
      slide.background = { color: "C8FF00" };
      return;
    }
    if (tone && hueMap[tone]) {
      slide.background = { color: hueMap[tone]! };
      return;
    }
    // Magenta accent blot — stand-in for multi-hue body energy.
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.2,
      y: -0.4,
      w: 2.8,
      h: 2.8,
      fill: { color: ctx.colors.accent2, transparency: 35 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }
}

export function renderSlide(slide: PSlide, ctx: ExportContext, data: Slide): void {
  paintSlideChrome(slide, ctx, data);
  const renderer = RENDERERS[data.layout];
  if (!renderer) {
    ctx.warn(`Unknown layout "${data.layout}" — rendered heading/lead only.`);
    renderHero(slide, ctx, data);
    return;
  }
  renderer(slide, ctx, data);
}
