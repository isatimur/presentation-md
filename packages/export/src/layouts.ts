import { candyMarqueeText } from "@presentation-md/core";
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
  const actions =
    Array.isArray(data.actions) && data.actions.length
      ? data.actions.slice(0, 3)
      : data.cta?.label
        ? [data.cta]
        : [];
  if (actions.length) {
    let bx = x;
    const btnH = 0.55;
    const gap = 0.18;
    actions.forEach((action, i) => {
      if (!action.label) return;
      const style =
        typeof action.style === "string"
          ? action.style
          : i === 0
            ? "solid"
            : "outline";
      const glyph = action.icon ? iconMarkerGlyph(action.icon) : "";
      const label = glyph ? `${glyph}  ${action.label}` : action.label;
      const btnW = Math.min(3.8, Math.max(2.2, label.length * 0.13 + 1.2));
      if (bx + btnW > x + w && i > 0) {
        bx = x;
        y += btnH + gap;
      }
      const isOutline = style === "outline" || style === "ghost";
      slide.addText(label, {
        shape: ctx.shapeRoundRect,
        x: bx,
        y: y + 0.1,
        w: btnW,
        h: btnH,
        fill: {
          color: isOutline
            ? inverted
              ? "C8FF00"
              : ctx.colors.bg
            : inverted
              ? "0A0A0A"
              : ctx.colors.accent,
        },
        color: isOutline
          ? inverted
            ? "0A0A0A"
            : ctx.colors.text
          : inverted
            ? "C8FF00"
            : ctx.colors.bg,
        fontFace: ctx.fonts.body,
        fontSize: 15,
        bold: true,
        align: "center",
        valign: "middle",
        rectRadius: 0.25,
        line: isOutline
          ? { color: inverted ? "0A0A0A" : ctx.colors.text, width: 1.5 }
          : undefined,
        ...(action.href ? { hyperlink: { url: action.href } } : {}),
      });
      bx += btnW + gap;
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

function iconMarkerGlyph(icon?: string): string {
  if (!icon) return "";
  const raw = icon.toLowerCase();
  const map: Array<[RegExp, string]> = [
    [/bolt|zap|flash|lightning/, "⚡"],
    [/chart|line|trend|analytics/, "📈"],
    [/users|user|people|team/, "👥"],
    [/share|node|network/, "↗"],
    [/rocket|launch/, "🚀"],
    [/check|ok|success/, "✓"],
    [/lock|shield|secure/, "🔒"],
    [/code|terminal|laptop/, "</>"],
    [/star|sparkle/, "★"],
    [/heart|love/, "♥"],
    [/clock|time|hour/, "⏱"],
    [/globe|world|earth/, "🌐"],
    [/coin|dollar|money|wallet/, "$"],
    [/fire|flame/, "🔥"],
    [/forward|arrow-right|chevron-right/, "→"],
    [/layer|stack/, "▣"],
    [/eye|vision/, "◉"],
    [/instagram/, "◉"],
    [/tiktok/, "♪"],
    [/twitter|x-twitter|\bfa-x\b/, "𝕏"],
    [/github/, "⌥"],
    [/discord/, "💬"],
    [/linkedin/, "in"],
    [/play|demo/, "▶"],
    [/download|arrow-down/, "↓"],
  ];
  for (const [re, glyph] of map) {
    if (re.test(raw)) return glyph;
  }
  return iconMarkerLetter(icon);
}

function drawIconMarker(
  slide: PSlide,
  ctx: ExportContext,
  icon: string | undefined,
  x: number,
  y: number,
  size: number
): void {
  const glyph = iconMarkerGlyph(icon);
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
  if (glyph) {
    slide.addText(glyph, {
      x,
      y,
      w: size,
      h: size,
      fontFace: ctx.fonts.body,
      bold: true,
      color: ctx.colors.bg,
      fontSize: Math.max(9, Math.round(size * (glyph.length > 1 ? 12 : 16))),
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
  const top = renderHeaderBlock(slide, ctx, data);
  const stats = data.stats ?? [];
  if (stats.length === 0) return;

  const isHero = data.variant === "hero";
  const tone = typeof data.tone === "string" ? data.tone : "";
  const onHue =
    ctx.themeName === "kinetic-wrapped" &&
    ["magenta", "violet", "orange", "cyan", "lime"].includes(tone);
  const valueColor = onHue ? (tone === "cyan" || tone === "lime" ? ctx.colors.text : "FFFFFF") : ctx.colors.accent;
  const labelColor = onHue ? "F0F0F0" : ctx.colors.muted;

  if (isHero) {
    const mega = stats[0]!;
    const contentW = ctx.width - ctx.margin * 2;
    let y = Math.max(top + 0.1, ctx.height * 0.28);
    slide.addText(mega.value, {
      x: ctx.margin,
      y,
      w: contentW,
      h: 1.8,
      fontFace: ctx.fonts.heading,
      bold: true,
      color: valueColor,
      fontSize: 96,
      align: "left",
      valign: "middle",
      fit: "shrink",
    });
    y += 1.85;
    slide.addText(mega.label, {
      x: ctx.margin,
      y,
      w: contentW * 0.7,
      h: 0.55,
      fontFace: ctx.fonts.body,
      color: labelColor,
      fontSize: 18,
      align: "left",
      valign: "top",
      fit: "shrink",
    });
    y += 0.7;
    const rest = stats.slice(1);
    if (rest.length) {
      const gap = 0.3;
      const cellW = (contentW - gap * (rest.length - 1)) / rest.length;
      rest.forEach((stat, i) => {
        const x = ctx.margin + i * (cellW + gap);
        slide.addText(stat.value, {
          x,
          y,
          w: cellW,
          h: 0.55,
          fontFace: ctx.fonts.heading,
          bold: true,
          color: valueColor,
          fontSize: 28,
          align: "left",
          fit: "shrink",
        });
        slide.addText(stat.label, {
          x,
          y: y + 0.55,
          w: cellW,
          h: 0.45,
          fontFace: ctx.fonts.body,
          color: labelColor,
          fontSize: 12,
          align: "left",
          fit: "shrink",
        });
      });
    }
    return;
  }

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
      color: valueColor,
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
      color: labelColor,
      fontSize: 14,
      align: "center",
      valign: "top",
      fit: "shrink",
    });
  });
}

function renderRankedList(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const top = renderHeaderBlock(slide, ctx, data);
  const items = data.items ?? [];
  if (!items.length) {
    ctx.warn("ranked-list layout has no items.");
    return;
  }

  const contentW = ctx.width - ctx.margin * 2;
  const y = top + 0.2;
  const bottom = ctx.height - ctx.margin - 0.1;
  const tone = typeof data.tone === "string" ? data.tone : "";
  const onHue =
    ctx.themeName === "kinetic-wrapped" &&
    ["magenta", "violet"].includes(tone);
  const defaultText = onHue ? "FFFFFF" : ctx.colors.text;
  const barH = Math.min(0.55, (bottom - y - 0.1) / items.length - 0.1);

  items.forEach((item, i) => {
    const by = y + i * (barH + 0.12);
    if (by + barH > bottom) return;
    const rank = (item.rank ?? String(i + 1).padStart(2, "0")).trim();
    const widthPct =
      typeof item.widthPct === "number" && item.widthPct > 0
        ? Math.min(100, item.widthPct)
        : Math.max(18, Math.round(100 - (i * 70) / Math.max(items.length - 1, 1)));
    slide.addText(rank, {
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
    const fillW = Math.max(0.4, trackW * (widthPct / 100));
    const fill = i === 0 ? "FFFFFF" : ctx.colors.accent;
    const ink = i === 0 ? (onHue ? "CC00FF" : ctx.colors.bg) : defaultText;
    const label = item.value ? `${item.label} · ${item.value}` : item.label;
    slide.addShape(ctx.shapeRoundRect, {
      x: trackX,
      y: by,
      w: fillW,
      h: barH,
      fill: { color: fill },
      line: { color: fill, width: 0 },
      rectRadius: 0.02,
    });
    slide.addText(label, {
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

function renderTimeline(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const top = renderHeaderBlock(slide, ctx, data);
  const steps = data.steps ?? [];
  if (steps.length === 0) return;

  const vertical = data.orientation === "vertical";
  const areaY = top + 0.2;
  const areaH = ctx.height - areaY - ctx.margin;
  const badge = 0.36;

  if (vertical) {
    const stepH = areaH / steps.length;
    const x = ctx.margin;
    const lineX = x + badge / 2 - 0.015;
    if (steps.length > 1) {
      const lineTop = areaY + badge / 2;
      const lineBot = areaY + (steps.length - 1) * stepH + badge / 2;
      slide.addShape(ctx.shapeRoundRect, {
        x: lineX,
        y: lineTop,
        w: 0.03,
        h: Math.max(0.1, lineBot - lineTop),
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0.01,
      });
    }
    steps.forEach((step, i) => {
      const y = areaY + i * stepH;
      slide.addShape(ctx.shapeOval, {
        x,
        y: y + 0.05,
        w: badge,
        h: badge,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.bg, width: 1.5 },
      });
      slide.addText(String(i + 1), {
        x,
        y: y + 0.05,
        w: badge,
        h: badge,
        fontFace: ctx.fonts.heading,
        bold: true,
        color: ctx.colors.bg,
        fontSize: 13,
        align: "center",
        valign: "middle",
      });
      const textX = x + badge + 0.28;
      const textW = ctx.width - textX - ctx.margin;
      slide.addText(step.title, {
        x: textX,
        y,
        w: textW,
        h: 0.4,
        fontFace: ctx.fonts.heading,
        bold: true,
        color: ctx.colors.text,
        fontSize: 17,
        valign: "middle",
        fit: "shrink",
      });
      if (step.body) {
        slide.addText(step.body, {
          x: textX,
          y: y + 0.4,
          w: textW,
          h: stepH - 0.55,
          fontFace: ctx.fonts.body,
          color: ctx.colors.muted,
          fontSize: 13,
          valign: "top",
          fit: "shrink",
        });
      }
    });
    return;
  }

  // Default: horizontal rail matching HTML .timeline flex
  const areaW = ctx.width - ctx.margin * 2;
  const cellW = areaW / steps.length;
  const railY = areaY + 0.18;
  if (steps.length > 1) {
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin + cellW * 0.15,
      y: railY + badge / 2 - 0.015,
      w: areaW - cellW * 0.3,
      h: 0.03,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0.01,
    });
  }
  steps.forEach((step, i) => {
    const x = ctx.margin + i * cellW;
    slide.addShape(ctx.shapeOval, {
      x: x + 0.05,
      y: railY,
      w: badge,
      h: badge,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.bg, width: 1.5 },
    });
    slide.addText(String(i + 1), {
      x: x + 0.05,
      y: railY,
      w: badge,
      h: badge,
      fontFace: ctx.fonts.heading,
      bold: true,
      color: ctx.colors.bg,
      fontSize: 12,
      align: "center",
      valign: "middle",
    });
    slide.addText(step.title, {
      x,
      y: railY + badge + 0.18,
      w: cellW - 0.15,
      h: 0.45,
      fontFace: ctx.fonts.heading,
      bold: true,
      color: ctx.colors.text,
      fontSize: 15,
      valign: "top",
      fit: "shrink",
    });
    if (step.body) {
      slide.addText(step.body, {
        x,
        y: railY + badge + 0.65,
        w: cellW - 0.15,
        h: Math.max(0.6, areaH - badge - 0.9),
        fontFace: ctx.fonts.body,
        color: ctx.colors.muted,
        fontSize: 12,
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

function renderLogoWall(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const top = renderHeaderBlock(slide, ctx, data);
  const cards = data.cards ?? [];
  if (!cards.length) {
    ctx.warn("logo-wall layout has no cards.");
    return;
  }
  const cols =
    typeof data.columns === "number" && data.columns >= 2 && data.columns <= 6
      ? data.columns
      : Math.min(Math.max(cards.length, 2), 4);
  const gap = 0.2;
  const areaW = ctx.width - ctx.margin * 2;
  const cellW = (areaW - gap * (cols - 1)) / cols;
  const rows = Math.ceil(cards.length / cols);
  const availH = ctx.height - top - ctx.margin - 0.1;
  const cellH = Math.min(1.35, (availH - gap * (rows - 1)) / rows);

  cards.forEach((card, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = ctx.margin + col * (cellW + gap);
    const y = top + 0.1 + row * (cellH + gap);
    slide.addShape(ctx.shapeRoundRect, {
      x,
      y,
      w: cellW,
      h: cellH,
      fill: { color: ctx.colors.cardBg },
      line: { color: ctx.colors.border, width: 1 },
      rectRadius: 0.06,
    });
    const img = typeof card.image === "string" ? card.image.trim() : "";
    if (img && (/^data:image\//i.test(img) || /^https?:\/\//i.test(img))) {
      try {
        slide.addImage({
          data: img,
          x: x + 0.15,
          y: y + 0.2,
          w: cellW - 0.3,
          h: cellH - (card.body ? 0.55 : 0.4),
          sizing: { type: "contain", w: cellW - 0.3, h: cellH - (card.body ? 0.55 : 0.4) },
        });
      } catch {
        slide.addText(card.title, {
          x: x + 0.1,
          y: y + cellH * 0.28,
          w: cellW - 0.2,
          h: 0.4,
          fontFace: ctx.fonts.heading,
          bold: true,
          color: ctx.colors.cardText,
          fontSize: 16,
          align: "center",
          fit: "shrink",
        });
      }
    } else {
      slide.addText(card.title, {
        x: x + 0.1,
        y: y + cellH * 0.28,
        w: cellW - 0.2,
        h: 0.4,
        fontFace: ctx.fonts.heading,
        bold: true,
        color: ctx.colors.cardText,
        fontSize: 16,
        align: "center",
        fit: "shrink",
      });
    }
    if (card.body) {
      slide.addText(card.body, {
        x: x + 0.1,
        y: y + cellH - 0.42,
        w: cellW - 0.2,
        h: 0.35,
        fontFace: ctx.fonts.body,
        color: ctx.colors.cardMuted,
        fontSize: 11,
        align: "center",
        fit: "shrink",
      });
    }
  });
}

function renderStreakGrid(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const top = renderHeaderBlock(slide, ctx, data);
  const filledRaw = typeof data.filled === "number" ? data.filled : 0;
  const filled = Math.max(0, Math.min(120, Math.round(filledRaw)));
  const totalRaw = typeof data.total === "number" ? data.total : filled || 1;
  const total = Math.max(filled, Math.min(120, Math.round(totalRaw)));
  const colsRaw = typeof data.cols === "number" ? data.cols : 10;
  const cols = Math.max(4, Math.min(16, Math.round(colsRaw)));
  const rows = Math.ceil(total / cols);
  const gap = 0.08;
  const areaW = Math.min(6.2, ctx.width - ctx.margin * 2);
  const cell = Math.min(0.42, (areaW - gap * (cols - 1)) / cols);
  const availH = ctx.height - top - ctx.margin - (data.body ? 0.7 : 0.2);
  const maxCell = Math.min(cell, (availH - gap * (rows - 1)) / rows);
  const tone = typeof data.tone === "string" ? data.tone : "";
  const onHue =
    ctx.themeName === "kinetic-wrapped" &&
    ["magenta", "violet", "lime", "cyan", "orange"].includes(tone);
  const fill = onHue ? (tone === "lime" || tone === "cyan" || tone === "orange" ? "0A0A0A" : "FFFFFF") : ctx.colors.accent;

  for (let i = 0; i < total; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = ctx.margin + col * (maxCell + gap);
    const y = top + 0.15 + row * (maxCell + gap);
    const dim = i >= filled;
    slide.addShape(ctx.shapeRoundRect, {
      x,
      y,
      w: maxCell,
      h: maxCell,
      fill: { color: fill, transparency: dim ? 85 : 10 },
      line: { color: fill, width: 0 },
      rectRadius: 0.04,
    });
  }
  if (data.body) {
    slide.addText(data.body, {
      x: ctx.margin,
      y: top + 0.2 + rows * (maxCell + gap) + 0.1,
      w: ctx.width - ctx.margin * 2,
      h: 0.55,
      fontFace: ctx.fonts.body,
      color: ctx.colors.muted,
      fontSize: 14,
      fit: "shrink",
    });
  }
}

function renderMetricRing(slide: PSlide, ctx: ExportContext, data: Slide): void {
  const top = renderHeaderBlock(slide, ctx, data);
  const pctRaw = typeof data.pct === "number" ? data.pct : 100;
  const pct = Math.max(0, Math.min(100, pctRaw));
  const value = typeof data.value === "string" ? data.value : `${Math.round(pct)}%`;
  const label = typeof data.label === "string" ? data.label : "";
  const ringSize = 2.4;
  const x = ctx.margin;
  const y = top + 0.15;
  const tone = typeof data.tone === "string" ? data.tone : "";
  const onHueLight =
    ctx.themeName === "kinetic-wrapped" &&
    ["magenta", "violet"].includes(tone);
  const inverted =
    ctx.themeName === "kinetic-wrapped" &&
    ["lime", "cyan", "orange"].includes(tone);
  const ink = inverted ? "0A0A0A" : onHueLight ? "FFFFFF" : ctx.colors.text;
  const ring = inverted ? "0A0A0A" : onHueLight ? "FFFFFF" : ctx.colors.accent;
  const field =
    inverted ? "C8FF00" : onHueLight ? (tone === "magenta" ? "CC00FF" : "7B2FFF") : ctx.colors.bg;

  if (pct > 0 && pct < 100) {
    // Soft track ring
    slide.addShape(ctx.shapeOval, {
      x,
      y,
      w: ringSize,
      h: ringSize,
      fill: { color: field },
      line: { color: ring, width: 2, transparency: 70 },
    });
    // Native blockArc for the filled portion (0° = 3 o'clock; start at top = 270°).
    const sweep = pct * 3.6;
    const endAngle = (270 + sweep) % 360;
    slide.addShape(ctx.shapeBlockArc, {
      x,
      y,
      w: ringSize,
      h: ringSize,
      fill: { color: ring },
      line: { color: ring, width: 0 },
      angleRange: [270, endAngle] as [number, number],
      arcThicknessRatio: 0.22,
    });
  } else {
    // Full badge ring — outer + inner hole.
    slide.addShape(ctx.shapeOval, {
      x,
      y,
      w: ringSize,
      h: ringSize,
      fill: { color: field },
      line: { color: ring, width: 14 },
    });
    const inset = 0.22;
    slide.addShape(ctx.shapeOval, {
      x: x + inset,
      y: y + inset,
      w: ringSize - inset * 2,
      h: ringSize - inset * 2,
      fill: { color: field },
      line: { color: field, width: 0 },
    });
  }
  slide.addText(value, {
    x,
    y: y + ringSize * 0.28,
    w: ringSize,
    h: 0.7,
    fontFace: ctx.fonts.heading,
    bold: true,
    color: ink,
    fontSize: 36,
    align: "center",
    valign: "middle",
    fit: "shrink",
  });
  if (label) {
    slide.addText(label.toUpperCase(), {
      x,
      y: y + ringSize * 0.55,
      w: ringSize,
      h: 0.35,
      fontFace: ctx.fonts.body,
      color: ink,
      fontSize: 11,
      bold: true,
      align: "center",
      charSpacing: 2,
    });
  }
  const textX = x + ringSize + 0.35;
  const textW = ctx.width - textX - ctx.margin;
  let ty = y + 0.2;
  if (data.lead) {
    slide.addText(data.lead, {
      x: textX,
      y: ty,
      w: textW,
      h: 1.4,
      fontFace: ctx.fonts.body,
      color: ink,
      fontSize: 18,
      fit: "shrink",
      valign: "top",
    });
    ty += 1.5;
  }
  if (data.body) {
    slide.addText(data.body, {
      x: textX,
      y: ty,
      w: textW,
      h: 1.0,
      fontFace: ctx.fonts.body,
      color: inverted || onHueLight ? ink : ctx.colors.muted,
      fontSize: 14,
      fit: "shrink",
    });
  }
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
  "ranked-list": renderRankedList,
  "logo-wall": renderLogoWall,
  "streak-grid": renderStreakGrid,
  "metric-ring": renderMetricRing,
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
    // Secondary blob hue per tone (HTML soft-blob / mix-blend stand-in).
    const secondaryBlob: Record<string, string> = {
      lime: "FF00CC",
      magenta: "00E5FF",
      cyan: "C8FF00",
      orange: "7A00FF",
      violet: "FF4D00",
    };
    if (isHero) {
      // Lime-field cover/closing + cyan/yellow soft blobs (wrapped-block ::before/::after).
      slide.background = { color: "C8FF00" };
      slide.addShape(ctx.shapeOval, {
        x: ctx.width * 0.55,
        y: -ctx.height * 0.18,
        w: ctx.width * 0.52,
        h: ctx.height * 0.58,
        fill: { color: "00E5FF", transparency: 55 },
        line: { color: "00E5FF", width: 0 },
      });
      slide.addShape(ctx.shapeOval, {
        x: -ctx.width * 0.1,
        y: ctx.height * 0.52,
        w: ctx.width * 0.42,
        h: ctx.height * 0.55,
        fill: { color: "FFEA00", transparency: 40 },
        line: { color: "FFEA00", width: 0 },
      });
      return;
    }
    if (tone && hueMap[tone]) {
      slide.background = { color: hueMap[tone]! };
      const blob = secondaryBlob[tone] ?? "FFFFFF";
      slide.addShape(ctx.shapeOval, {
        x: ctx.width * 0.58,
        y: -ctx.height * 0.2,
        w: ctx.width * 0.5,
        h: ctx.height * 0.55,
        fill: { color: blob, transparency: 62 },
        line: { color: blob, width: 0 },
      });
      slide.addShape(ctx.shapeOval, {
        x: -ctx.width * 0.08,
        y: ctx.height * 0.58,
        w: ctx.width * 0.36,
        h: ctx.height * 0.48,
        fill: { color: "0A0A0A", transparency: 70 },
        line: { color: "0A0A0A", width: 0 },
      });
      return;
    }
    // Body: lime wash + magenta blot + cyan secondary (multi-hue energy).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.2,
      y: -0.4,
      w: 2.8,
      h: 2.8,
      fill: { color: ctx.colors.accent2, transparency: 35 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -0.8,
      y: ctx.height - 2.0,
      w: 2.4,
      h: 2.4,
      fill: { color: "00E5FF", transparency: 55 },
      line: { color: "00E5FF", width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.35,
      y: ctx.height * 0.7,
      w: 1.6,
      h: 1.6,
      fill: { color: ctx.colors.accent, transparency: 72 },
      line: { color: ctx.colors.accent, width: 0 },
    });
  }

  if (theme === "risograph-zine") {
    // Overprint multiply stand-ins — translucent coral + blue washes (mix-blend ≈ layered ovals).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.48,
      y: -ctx.height * 0.12,
      w: ctx.width * 0.58,
      h: ctx.height * 0.58,
      fill: { color: ctx.colors.accent, transparency: 78 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.08,
      y: ctx.height * 0.48,
      w: ctx.width * 0.48,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent2, transparency: 76 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    if (isHero) {
      // Extra misregistration blot on cover/closing.
      slide.addShape(ctx.shapeOval, {
        x: ctx.width * 0.72,
        y: ctx.height * 0.62,
        w: 1.8,
        h: 1.8,
        fill: { color: ctx.colors.accent, transparency: 70 },
        line: { color: ctx.colors.accent, width: 0 },
      });
    }
  }

  if (theme === "candy-pop") {
    // Soft pink + blue blobs (candy-blob radial washes).
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.08,
      y: -ctx.height * 0.15,
      w: ctx.width * 0.48,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent, transparency: 72 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: ctx.height * 0.45,
      w: ctx.width * 0.5,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent2, transparency: 68 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    if (isHero) {
      // Yellow ticker-strip stand-in (gallery marquee bar + static ticker text).
      const ticker = candyMarqueeText({
        company: ctx.company,
        title: ctx.title,
        marquee: ctx.marquee,
      });
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: ctx.height - 0.55,
        w: ctx.width,
        h: 0.55,
        fill: { color: "FFE566" },
        line: { color: ctx.colors.text, width: 1.5 },
        rectRadius: 0,
      });
      slide.addText(ticker, {
        x: 0.15,
        y: ctx.height - 0.5,
        w: ctx.width - 0.3,
        h: 0.45,
        fontFace: ctx.fonts.heading,
        fontSize: 12,
        bold: true,
        color: ctx.colors.text,
        align: "left",
        valign: "middle",
      });
    }
  }

  if (theme === "aurora-glass") {
    // Dual aurora washes (accent + accent2 translucent ovals).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: -ctx.height * 0.25,
      w: ctx.width * 0.55,
      h: ctx.height * 0.65,
      fill: { color: ctx.colors.accent, transparency: 58 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.15,
      y: ctx.height * 0.5,
      w: ctx.width * 0.5,
      h: ctx.height * 0.6,
      fill: { color: ctx.colors.accent2, transparency: 65 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "glassmorphism") {
    // Soft mist blob top-left + cyan orb top-right.
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.1,
      y: -ctx.height * 0.2,
      w: ctx.width * 0.55,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent, transparency: 78 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.6,
      y: -ctx.height * 0.15,
      w: ctx.width * 0.45,
      h: ctx.height * 0.5,
      fill: { color: ctx.colors.accent2, transparency: 70 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "luxury-minimalist" && isHero) {
    // Gold hairline accent (quiet-luxe title/closing ::before).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height * 0.48,
      w: 0.55,
      h: 0.02,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "crt-terminal") {
    // Phosphor scanline stand-ins + cyan corner blot.
    for (let i = 0; i < 8; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: 0.35 + i * 0.85,
        w: ctx.width,
        h: 0.03,
        fill: { color: ctx.colors.accent, transparency: 82 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 1.8,
      y: -0.3,
      w: 2.0,
      h: 2.0,
      fill: { color: ctx.colors.accent2, transparency: 70 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "blueprint") {
    // Grid ticks + corner reticle.
    for (let i = 1; i < 12; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: (ctx.width / 12) * i,
        y: 0,
        w: 0.015,
        h: ctx.height,
        fill: { color: ctx.colors.accent, transparency: 78 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    for (let i = 1; i < 8; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: (ctx.height / 8) * i,
        w: ctx.width,
        h: 0.015,
        fill: { color: ctx.colors.accent, transparency: 78 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.2,
      y: 0.45,
      w: 0.7,
      h: 0.7,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.25 },
      rectRadius: 0,
    });
  }

  if (theme === "brutalist-acid" && isHero) {
    // Acid offset shadow block.
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.62,
      y: ctx.height * 0.28,
      w: ctx.width * 0.28,
      h: ctx.height * 0.42,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.6,
      y: ctx.height * 0.26,
      w: ctx.width * 0.28,
      h: ctx.height * 0.42,
      fill: { color: ctx.colors.bg },
      line: { color: ctx.colors.text, width: 2 },
      rectRadius: 0,
    });
  }

  if (theme === "aerospace-hud") {
    // HUD grid + orange reticle corner.
    for (let i = 1; i < 10; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: (ctx.width / 10) * i,
        y: 0,
        w: 0.012,
        h: ctx.height,
        fill: { color: ctx.colors.accent, transparency: 80 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    for (let i = 1; i < 6; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: (ctx.height / 6) * i,
        w: ctx.width,
        h: 0.012,
        fill: { color: ctx.colors.accent, transparency: 80 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.margin,
      w: 0.55,
      h: 0.55,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent2, width: 1.5 },
      rectRadius: 0,
    });
    if (isHero) {
      slide.addShape(ctx.shapeOval, {
        x: ctx.width - 1.6,
        y: ctx.height - 1.6,
        w: 1.1,
        h: 1.1,
        fill: { color: ctx.colors.bg, transparency: 100 },
        line: { color: ctx.colors.accent, width: 1.5 },
      });
    }
  }

  if (theme === "neon-noir") {
    // Magenta glow blob + cyan rim (neon-rain stand-in).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: -ctx.height * 0.2,
      w: ctx.width * 0.55,
      h: ctx.height * 0.6,
      fill: { color: ctx.colors.accent, transparency: 62 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.15,
      y: ctx.height * 0.55,
      w: ctx.width * 0.5,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent2, transparency: 70 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    if (isHero) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: ctx.height - 0.08,
        w: ctx.width,
        h: 0.08,
        fill: { color: ctx.colors.accent2, transparency: 30 },
        line: { color: ctx.colors.accent2, width: 0 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "vaporwave") {
    // Horizon grid stand-in — bottom cyan wash + pink sun oval.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: ctx.height * 0.55,
      w: ctx.width,
      h: ctx.height * 0.45,
      fill: { color: ctx.colors.bg2, transparency: 35 },
      line: { color: ctx.colors.bg2, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.35,
      y: ctx.height * 0.28,
      w: ctx.width * 0.3,
      h: ctx.height * 0.35,
      fill: { color: ctx.colors.accent, transparency: 45 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    // Perspective grid lines (horizontal).
    for (let i = 0; i < 5; i++) {
      const y = ctx.height * 0.58 + i * 0.22;
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y,
        w: ctx.width,
        h: 0.02,
        fill: { color: ctx.colors.accent2, transparency: 55 + i * 5 },
        line: { color: ctx.colors.accent2, width: 0 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "y2k-aero") {
    // Glossy bubble ovals (aero-bubble).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.65,
      y: -ctx.height * 0.1,
      w: ctx.width * 0.4,
      h: ctx.height * 0.45,
      fill: { color: ctx.colors.accent, transparency: 55 },
      line: { color: "FFFFFF", width: 1.5 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.05,
      y: ctx.height * 0.55,
      w: ctx.width * 0.35,
      h: ctx.height * 0.4,
      fill: { color: ctx.colors.accent2, transparency: 50 },
      line: { color: "FFFFFF", width: 1.5 },
    });
    if (isHero) {
      slide.addShape(ctx.shapeOval, {
        x: ctx.width * 0.42,
        y: ctx.height * 0.35,
        w: 1.4,
        h: 1.4,
        fill: { color: "FFFFFF", transparency: 40 },
        line: { color: "FFFFFF", width: 0 },
      });
    }
  }

  if (theme === "swiss-typographic") {
    // Light modular grid + signal-red left rail (swiss-grid).
    for (let i = 1; i < 12; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: (ctx.width / 12) * i,
        y: 0,
        w: 0.012,
        h: ctx.height,
        fill: { color: ctx.colors.border, transparency: 55 },
        line: { color: ctx.colors.border, width: 0 },
        rectRadius: 0,
      });
    }
    for (let i = 1; i < 8; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: (ctx.height / 8) * i,
        w: ctx.width,
        h: 0.012,
        fill: { color: ctx.colors.border, transparency: 55 },
        line: { color: ctx.colors.border, width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: 0.08,
      h: ctx.height,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "ft-editorial") {
    // Broadsheet masthead bar + bottom rule (broadsheet-rule).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width,
      h: 0.32,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height - 0.7,
      w: ctx.width - ctx.margin * 2,
      h: 0.025,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "bauhaus" && isHero) {
    // Primary red square + blue circle (bauhaus-blocks hero ornaments).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 2.3,
      y: 0.7,
      w: 1.05,
      h: 1.05,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.9,
      y: 1.35,
      w: 1.05,
      h: 1.05,
      fill: { color: ctx.colors.accent2, transparency: 12 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "fintech-clean") {
    // Soft mint radial wash (fintech-soft top-right).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: -ctx.height * 0.25,
      w: ctx.width * 0.55,
      h: ctx.height * 0.6,
      fill: { color: ctx.colors.accent, transparency: 88 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.7,
      y: -ctx.height * 0.15,
      w: ctx.width * 0.4,
      h: ctx.height * 0.45,
      fill: { color: ctx.colors.accent2, transparency: 78 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "scandinavian") {
    // Sage corner wash + clay soft circle (hygge-soft).
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.12,
      y: -ctx.height * 0.2,
      w: ctx.width * 0.5,
      h: ctx.height * 0.5,
      fill: { color: ctx.colors.accent, transparency: 82 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.4,
      y: ctx.height - 2.2,
      w: 1.9,
      h: 1.9,
      fill: { color: ctx.colors.accent2, transparency: 78 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "art-deco" && isHero) {
    // Gold hairline + centered deco ring (deco-fan).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.55,
      w: ctx.width - ctx.margin * 2,
      h: 0.02,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width / 2 - 0.35,
      y: 0.38,
      w: 0.7,
      h: 0.7,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.75 },
    });
  }

  if (theme === "botanical-luxe") {
    // Gold hairline + leaf-tilted ring (botanical-leaf).
    if (isHero) {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.margin,
        y: 0.55,
        w: ctx.width - ctx.margin * 2,
        h: 0.015,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.0,
      y: ctx.height - 2.0,
      w: 1.35,
      h: 1.35,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.25 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.72,
      y: -ctx.height * 0.12,
      w: ctx.width * 0.35,
      h: ctx.height * 0.4,
      fill: { color: ctx.colors.accent2, transparency: 82 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "genz-bento") {
    // Hard border shadow + accent2 corner blot (hard-bento).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.12,
      y: 0.12,
      w: ctx.width - 0.12,
      h: ctx.height - 0.12,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2.5 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 1.6,
      y: -0.5,
      w: 1.8,
      h: 1.8,
      fill: { color: ctx.colors.accent2, transparency: 45 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "heritage-editorial") {
    // Quiet hairlines (heritage-wash).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.6,
      w: ctx.width - ctx.margin * 2,
      h: 0.012,
      fill: { color: ctx.colors.accent, transparency: 45 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - ctx.margin - 0.85,
      y: ctx.height - 0.65,
      w: 0.85,
      h: 0.012,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "developer-dark") {
    // Title-bar chrome + traffic-light dots (dev-terminal).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width,
      h: 0.32,
      fill: { color: ctx.colors.bg2 },
      line: { color: ctx.colors.border, width: 1 },
      rectRadius: 0,
    });
    const dots = [
      { x: 0.2, color: ctx.colors.accent },
      { x: 0.38, color: "D29922" },
      { x: 0.56, color: "F85149" },
    ];
    for (const d of dots) {
      slide.addShape(ctx.shapeOval, {
        x: d.x,
        y: 0.11,
        w: 0.1,
        h: 0.1,
        fill: { color: d.color },
        line: { color: d.color, width: 0 },
      });
    }
  }

  if (theme === "data-editorial") {
    // Accent rule + stub (data-rule).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.55,
      w: ctx.width - ctx.margin * 2,
      h: 0.035,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.55,
      w: 0.035,
      h: 0.55,
      fill: { color: ctx.colors.accent2 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "dark-botanical") {
    // Bloom wash + left accent rail (dark-botanical-bloom).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.62,
      y: -ctx.height * 0.15,
      w: ctx.width * 0.45,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent2, transparency: 72 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.7,
      y: ctx.height * 0.05,
      w: ctx.width * 0.28,
      h: ctx.height * 0.35,
      fill: { color: ctx.colors.accent, transparency: 78 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.55,
      y: 0.7,
      w: 0.015,
      h: ctx.height - 1.4,
      fill: { color: ctx.colors.accent, transparency: 45 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "pastel-geometry") {
    // Vertical pastel edge pills (pastel-geometry-pills ::after).
    const pills = [
      { color: "F0B4D4" },
      { color: "A8D4C4" },
      { color: "5A7C6A" },
      { color: "9B8DC4" },
      { color: "7C6AAD" },
    ];
    const pillH = (ctx.height * 0.72) / pills.length;
    const pillX = ctx.width - 0.42;
    const pillY = ctx.height * 0.14;
    for (let i = 0; i < pills.length; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: pillX,
        y: pillY + i * pillH,
        w: 0.22,
        h: pillH - 0.04,
        fill: { color: pills[i]!.color },
        line: { color: pills[i]!.color, width: 0 },
        rectRadius: 0.11,
      });
    }
    // Soft card-field wash so the sky matte reads behind content.
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin * 0.45,
      y: ctx.margin * 0.45,
      w: ctx.width - ctx.margin * 0.9,
      h: ctx.height - ctx.margin * 0.9,
      fill: { color: ctx.colors.cardBg, transparency: 35 },
      line: { color: ctx.colors.border, width: 0.75 },
      rectRadius: 0.28,
    });
  }

  if (theme === "8-bit-orbit") {
    // Arcade scanlines + neon cyan/pink orbs + pixel HUD chip (bit-orbit-arcade).
    for (let i = 0; i < 10; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: 0.25 + i * 0.7,
        w: ctx.width,
        h: 0.035,
        fill: { color: "000000", transparency: 82 },
        line: { color: "000000", width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: -ctx.height * 0.12,
      w: ctx.width * 0.45,
      h: ctx.height * 0.45,
      fill: { color: ctx.colors.accent, transparency: 78 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.1,
      y: ctx.height * 0.55,
      w: ctx.width * 0.4,
      h: ctx.height * 0.45,
      fill: { color: ctx.colors.accent2, transparency: 78 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    // Pixel HUD dots (top-left).
    const pixels = [
      { x: 0.45, color: "F4D03F" },
      { x: 0.7, color: ctx.colors.accent },
      { x: 0.95, color: ctx.colors.accent2 },
      { x: 1.2, color: "FFFFFF" },
    ];
    for (const p of pixels) {
      slide.addShape(ctx.shapeRoundRect, {
        x: p.x,
        y: 0.45,
        w: 0.14,
        h: 0.14,
        fill: { color: p.color },
        line: { color: p.color, width: 0 },
        rectRadius: 0,
      });
    }
    if (isHero) {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width - 1.55,
        y: ctx.height - 0.85,
        w: 0.95,
        h: 0.28,
        fill: { color: ctx.colors.accent },
        line: { color: "FFFFFF", width: 1.5 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "neo-grid-bold") {
    // Modular grid + lemon corner panel + hard border (neo-grid-panels).
    for (let i = 1; i < 10; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: (ctx.width / 10) * i,
        y: 0,
        w: 0.012,
        h: ctx.height,
        fill: { color: ctx.colors.text, transparency: 85 },
        line: { color: ctx.colors.text, width: 0 },
        rectRadius: 0,
      });
    }
    for (let i = 1; i < 6; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: (ctx.height / 6) * i,
        w: ctx.width,
        h: 0.012,
        fill: { color: ctx.colors.text, transparency: 85 },
        line: { color: ctx.colors.text, width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2.5 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.55,
      y: 0.55,
      w: 0.95,
      h: 0.95,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "bold-poster") {
    // Ink top bar + offset poster block (bold-poster-ink).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width,
      h: 0.14,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    if (isHero) {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width * 0.62,
        y: ctx.height * 0.55,
        w: ctx.width * 0.28,
        h: ctx.height * 0.28,
        fill: { color: ctx.colors.bg2 },
        line: { color: ctx.colors.text, width: 2 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "capsule") {
    // Soft pill ornaments (capsule-pills).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 2.1,
      y: 0.55,
      w: 1.45,
      h: 0.42,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.border, width: 1.5 },
      rectRadius: 0.21,
    });
    slide.addShape(ctx.shapeOval, {
      x: 0.55,
      y: ctx.height - 1.55,
      w: 0.95,
      h: 0.95,
      fill: { color: ctx.colors.accent2 },
      line: { color: ctx.colors.border, width: 1.5 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.78,
      y: ctx.height * 0.72,
      w: 0.55,
      h: 0.55,
      fill: { color: "C4D94E", transparency: 25 },
      line: { color: ctx.colors.border, width: 1 },
    });
  }

  if (theme === "cobalt-grid") {
    // Blueprint-ish cobalt grid + corner hatch (cobalt-grid-paper).
    for (let i = 1; i < 14; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: (ctx.width / 14) * i,
        y: 0,
        w: 0.01,
        h: ctx.height,
        fill: { color: ctx.colors.accent, transparency: 82 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    for (let i = 1; i < 9; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: (ctx.height / 9) * i,
        w: ctx.width,
        h: 0.01,
        fill: { color: ctx.colors.accent, transparency: 82 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.58,
      y: ctx.height * 0.55,
      w: ctx.width * 0.42,
      h: ctx.height * 0.45,
      fill: { color: ctx.colors.accent, transparency: 90 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "retro-arcade") {
    // Scanlines + neon top rail (scanline-neon).
    for (let i = 0; i < 9; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: 0.3 + i * 0.75,
        w: ctx.width,
        h: 0.03,
        fill: { color: "000000", transparency: 78 },
        line: { color: "000000", width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width,
      h: 0.06,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.0,
      y: -0.4,
      w: 2.2,
      h: 2.2,
      fill: { color: ctx.colors.accent2, transparency: 70 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "brutalist-mono") {
    // Dense mono grid + hard outer frame (brutalist-grid).
    for (let i = 1; i < 16; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: (ctx.width / 16) * i,
        y: 0,
        w: 0.01,
        h: ctx.height,
        fill: { color: ctx.colors.border, transparency: 55 },
        line: { color: ctx.colors.border, width: 0 },
        rectRadius: 0,
      });
    }
    for (let i = 1; i < 10; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: (ctx.height / 10) * i,
        w: ctx.width,
        h: 0.01,
        fill: { color: ctx.colors.border, transparency: 55 },
        line: { color: ctx.colors.border, width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2.5 },
      rectRadius: 0,
    });
  }

  if (theme === "creative-mode") {
    // Hard shadow frame + stacked accent blocks (creative-mode-blocks).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.12,
      y: 0.12,
      w: ctx.width - 0.12,
      h: ctx.height - 0.12,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 3 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 2.0,
      y: 0.55,
      w: 1.2,
      h: 1.2,
      fill: { color: ctx.colors.accent2 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 2.85,
      y: 1.35,
      w: 0.75,
      h: 0.75,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "biennale-yellow") {
    // Sun orb + top hairline (biennale-yellow-sun).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.62,
      y: -ctx.height * 0.18,
      w: ctx.width * 0.5,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent, transparency: 35 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.7,
      y: ctx.height * 0.08,
      w: ctx.width * 0.28,
      h: ctx.height * 0.32,
      fill: { color: "F8F39B", transparency: 45 },
      line: { color: "F8F39B", width: 0 },
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.55,
      w: ctx.width - ctx.margin * 2,
      h: 0.015,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "scatterbrain") {
    // Cork sticky notes + pin dots (scatterbrain-cork).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.68,
      y: 0.55,
      w: 1.7,
      h: 1.25,
      fill: { color: "FFE066" },
      line: { color: ctx.colors.text, width: 0.75 },
      rectRadius: 0.06,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.78,
      y: ctx.height * 0.48,
      w: 1.4,
      h: 1.1,
      fill: { color: "74C0FC" },
      line: { color: ctx.colors.text, width: 0.75 },
      rectRadius: 0.06,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.55,
      y: ctx.height * 0.58,
      w: 1.25,
      h: 1.0,
      fill: { color: "FF9F9F" },
      line: { color: ctx.colors.text, width: 0.75 },
      rectRadius: 0.06,
    });
    for (const pin of [
      { x: ctx.width * 0.72, y: 0.48 },
      { x: ctx.width * 0.82, y: ctx.height * 0.42 },
      { x: 0.72, y: ctx.height * 0.52 },
    ]) {
      slide.addShape(ctx.shapeOval, {
        x: pin.x,
        y: pin.y,
        w: 0.18,
        h: 0.18,
        fill: { color: "C92A2A" },
        line: { color: "C92A2A", width: 0 },
      });
    }
  }

  if (theme === "split-pastel" && isHero) {
    // Split field + stacked pastel pills (split-pastel-panels).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.5,
      y: 0,
      w: ctx.width * 0.5,
      h: ctx.height,
      fill: { color: ctx.colors.bg2 },
      line: { color: ctx.colors.bg2, width: 0 },
      rectRadius: 0,
    });
    const stack = [ctx.colors.accent, ctx.colors.accent2, "F0F0C8"];
    for (let i = 0; i < stack.length; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width - 1.55,
        y: ctx.height - 1.35 + i * 0.32,
        w: 0.95,
        h: 0.26,
        fill: { color: stack[i]! },
        line: { color: stack[i]!, width: 0 },
        rectRadius: 0.13,
      });
    }
  }

  if (theme === "coral") {
    // Hatch frame + coral left wash (coral-hatch).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2.5 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width * 0.42,
      h: ctx.height,
      fill: { color: ctx.colors.accent, transparency: 82 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    // Diagonal hatch stand-ins (thin ink stripes).
    for (let i = 0; i < 14; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: -0.4 + i * 1.05,
        y: 0,
        w: 0.05,
        h: ctx.height,
        fill: { color: ctx.colors.text, transparency: 88 },
        line: { color: ctx.colors.text, width: 0 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "peoples-platform") {
    // Cobalt top bar + amber footer stub + hard frame (peoples-platform-poster).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 3.5 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width,
      h: 0.18,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.72,
      y: ctx.height - 0.16,
      w: ctx.width * 0.28,
      h: 0.16,
      fill: { color: ctx.colors.accent2 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "raw-grid") {
    // Blush/sage bands + cross rules + hard frame (raw-grid-brutal).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width,
      h: ctx.height * 0.28,
      fill: { color: "F2D4CF" },
      line: { color: "F2D4CF", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width * 0.22,
      h: ctx.height,
      fill: { color: "E5EDD6" },
      line: { color: "E5EDD6", width: 0 },
      rectRadius: 0,
    });
    // Re-cover the intersection so blush stays on top-left square.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width * 0.22,
      h: ctx.height * 0.28,
      fill: { color: "F2D4CF" },
      line: { color: "F2D4CF", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: ctx.height * 0.28,
      w: ctx.width,
      h: 0.035,
      fill: { color: "0A0A0A" },
      line: { color: "0A0A0A", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.22,
      y: 0,
      w: 0.035,
      h: ctx.height,
      fill: { color: "0A0A0A" },
      line: { color: "0A0A0A", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "0A0A0A", width: 2.5 },
      rectRadius: 0,
    });
  }

  if (theme === "retro-zine" && isHero) {
    // Offset green plate + cream card (retro-zine-riso).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.68,
      y: ctx.height * 0.18,
      w: ctx.width * 0.26,
      h: ctx.height * 0.34,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.66,
      y: ctx.height * 0.16,
      w: ctx.width * 0.26,
      h: ctx.height * 0.34,
      fill: { color: ctx.colors.cardBg },
      line: { color: ctx.colors.text, width: 1.5 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2.5 },
      rectRadius: 0,
    });
  }

  if (theme === "sakura-chroma") {
    // Hard frame always; chroma strip + stamp orbs on heroes (sakura-chroma-cassette).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2 },
      rectRadius: 0.06,
    });
    if (isHero) {
      const chroma = ["E5392A", "E54489", "F09131", "3D9F47", "3F8BC4", "F0BC2A"];
      const stripW = ctx.width * 0.48;
      const band = stripW / chroma.length;
      for (let i = 0; i < chroma.length; i++) {
        slide.addShape(ctx.shapeRoundRect, {
          x: i * band,
          y: 0,
          w: band,
          h: ctx.height * 0.12,
          fill: { color: chroma[i]! },
          line: { color: chroma[i]!, width: 0 },
          rectRadius: 0,
        });
      }
      const stamps = [
        { x: ctx.width - 1.85, y: 0.55, color: "E54489" },
        { x: ctx.width - 1.35, y: 0.72, color: "F09131" },
        { x: ctx.width - 1.6, y: 1.15, color: "3F8BC4" },
        { x: ctx.width - 1.95, y: 1.05, color: "3D9F47" },
      ];
      for (const s of stamps) {
        slide.addShape(ctx.shapeOval, {
          x: s.x,
          y: s.y,
          w: 0.42,
          h: 0.42,
          fill: { color: s.color },
          line: { color: s.color, width: 0 },
        });
      }
      slide.addShape(ctx.shapeRoundRect, {
        x: 0.55,
        y: ctx.height - 0.85,
        w: 0.7,
        h: 0.28,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.text, width: 1.5 },
        rectRadius: 0.02,
      });
    }
  }

  if (theme === "daisy-days") {
    // Soft pastel dots + hard frame; daisy + pill on heroes (daisy-days-pastel).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "2D2D2D", width: 2.5 },
      rectRadius: 0.28,
    });
    const dots = [
      { x: ctx.width * 0.1, y: ctx.height * 0.14, color: "FDE68A", s: 0.28 },
      { x: ctx.width * 0.86, y: ctx.height * 0.18, color: "F7C8D4", s: 0.36 },
      { x: ctx.width * 0.76, y: ctx.height * 0.78, color: "7ECDC0", s: 0.32 },
      { x: ctx.width * 0.14, y: ctx.height * 0.74, color: "D4A5E8", s: 0.24 },
    ];
    for (const d of dots) {
      slide.addShape(ctx.shapeOval, {
        x: d.x,
        y: d.y,
        w: d.s,
        h: d.s,
        fill: { color: d.color },
        line: { color: d.color, width: 0 },
      });
    }
    if (isHero) {
      slide.addShape(ctx.shapeOval, {
        x: ctx.width - 1.55,
        y: 0.55,
        w: 0.7,
        h: 0.7,
        fill: { color: "FDE68A" },
        line: { color: "2D2D2D", width: 2 },
      });
      slide.addShape(ctx.shapeRoundRect, {
        x: 0.55,
        y: ctx.height - 0.95,
        w: 0.95,
        h: 0.36,
        fill: { color: "A8D8F0" },
        line: { color: "2D2D2D", width: 2 },
        rectRadius: 0.18,
      });
    }
  }

  if (theme === "block-frame") {
    // Hard neobrutalist frame; pastel offset blocks on heroes (block-frame-brutal).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "000000", width: 3.5 },
      rectRadius: 0,
    });
    if (isHero) {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width * 0.72,
        y: ctx.height * 0.12,
        w: ctx.width * 0.28,
        h: ctx.height * 0.18,
        fill: { color: ctx.colors.accent },
        line: { color: "000000", width: 2.5 },
        rectRadius: 0,
      });
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width * 0.06,
        y: ctx.height * 0.68,
        w: ctx.width * 0.16,
        h: ctx.height * 0.22,
        fill: { color: "C0F7FE" },
        line: { color: "000000", width: 2.5 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "editorial-tri-tone") {
    // Butter split field + burgundy wash + hard frame (tri-tone-blocks).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.55,
      y: 0,
      w: ctx.width * 0.45,
      h: ctx.height,
      fill: { color: ctx.colors.bg2 },
      line: { color: ctx.colors.bg2, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.72,
      y: 0,
      w: ctx.width * 0.28,
      h: ctx.height,
      fill: { color: ctx.colors.text, transparency: 88 },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2.5 },
      rectRadius: 0,
    });
  }

  if (theme === "broadside") {
    // Fire-orange left rail + corner block (broadside-fire).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: 0.12,
      h: ctx.height,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.55,
      y: ctx.height - 1.55,
      w: 1.7,
      h: 1.7,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "pink-script") {
    // Soft pink wash + inset frame + accent hairline (pink-script-afterhours).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: -ctx.height * 0.2,
      w: ctx.width * 0.55,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent, transparency: 78 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.35,
      y: 0.35,
      w: ctx.width - 0.7,
      h: ctx.height - 0.7,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "F5EDF1", width: 1 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 2.0,
      y: ctx.height - 0.85,
      w: 1.35,
      h: 0.04,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "retro-windows") {
    // Win95 title bar + window buttons + beveled frame (retro-windows-chrome).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "000000", width: 2 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.12,
      y: 0.12,
      w: ctx.width - 0.24,
      h: 0.32,
      fill: { color: "000080" },
      line: { color: "000080", width: 0 },
      rectRadius: 0,
    });
    const winBtns = [ctx.width - 1.15, ctx.width - 0.85, ctx.width - 0.55];
    for (const x of winBtns) {
      slide.addShape(ctx.shapeRoundRect, {
        x,
        y: 0.18,
        w: 0.22,
        h: 0.18,
        fill: { color: "C0C0C0" },
        line: { color: "FFFFFF", width: 1 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "pin-and-paper") {
    // Legal-pad rules + red margin + pin (pin-paper-pad).
    for (let i = 1; i < 14; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: (ctx.height / 14) * i,
        w: ctx.width,
        h: 0.012,
        fill: { color: "1F3A8A", transparency: 82 },
        line: { color: "1F3A8A", width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.95,
      y: 0,
      w: 0.03,
      h: ctx.height,
      fill: { color: ctx.colors.accent, transparency: 35 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 1.15,
      y: 0.55,
      w: 0.28,
      h: 0.28,
      fill: { color: "666666" },
      line: { color: "222222", width: 1 },
    });
  }

  if (theme === "emerald-editorial") {
    // Double inset frame + top/bottom masthead rules (emerald-editorial-masthead).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.22,
      y: 0.22,
      w: ctx.width - 0.44,
      h: ctx.height - 0.44,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 1.5 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.12,
      y: ctx.height * 0.14,
      w: ctx.width * 0.76,
      h: 0.035,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.12,
      y: ctx.height * 0.86,
      w: ctx.width * 0.76,
      h: 0.035,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "notebook-tabs") {
    // Pastel side tabs + binder holes (notebook-tabs-page).
    const tabs = ["98D4BB", "C7B8EA", "F4B8C5", "A8D8EA", "FFE6A7"];
    const tabH = (ctx.height * 0.72) / tabs.length;
    for (let i = 0; i < tabs.length; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width - 0.22,
        y: ctx.height * 0.14 + i * tabH,
        w: 0.22,
        h: tabH - 0.06,
        fill: { color: tabs[i]! },
        line: { color: tabs[i]!, width: 0 },
        rectRadius: 0.06,
      });
    }
    for (let i = 0; i < 4; i++) {
      slide.addShape(ctx.shapeOval, {
        x: 0.35,
        y: 0.45 + i * 0.7,
        w: 0.14,
        h: 0.14,
        fill: { color: "D0CCC4" },
        line: { color: "D0CCC4", width: 0 },
      });
    }
  }

  if (theme === "long-table") {
    // Speckled supper club + outline pill + hairline (long-table-supper).
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 5; j++) {
        slide.addShape(ctx.shapeOval, {
          x: 0.4 + i * 1.55,
          y: 0.5 + j * 1.15,
          w: 0.06,
          h: 0.06,
          fill: { color: ctx.colors.accent, transparency: 78 },
          line: { color: ctx.colors.accent, width: 0 },
        });
      }
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.85,
      y: 0.55,
      w: 1.15,
      h: 0.4,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.5 },
      rectRadius: 0.2,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.55,
      y: ctx.height - 0.75,
      w: 0.7,
      h: 0.025,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "paper-ink") {
    // Crimson top rule + quiet bottom hairline (paper-ink-literary).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.65,
      w: ctx.width - ctx.margin * 2,
      h: 0.03,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height - 0.7,
      w: ctx.width - ctx.margin * 2,
      h: 0.015,
      fill: { color: ctx.colors.text, transparency: 55 },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "vintage-editorial" && isHero) {
    // Geometric ring + ink/accent dots (vintage-editorial-geo).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.35,
      y: 0.55,
      w: 1.55,
      h: 1.55,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 1.5 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 1.7,
      y: 1.2,
      w: 0.18,
      h: 0.18,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 1.15,
      y: 1.7,
      w: 0.18,
      h: 0.18,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
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
