import { candyMarqueeText } from "@presentation-md/core/candy-marquee";
import type { ExportContext } from "./context.js";
import type { Slide } from "./deck-types.js";
import type { PptxSlide, PptxTextOpts, PptxTableRow } from "./pptx.js";

/**
 * Per-layout mappers: each turns a structured slide into native PPTX shapes
 * (text boxes, tables, rounded rectangles) positioned in inches on the slide.
 */

type PSlide = PptxSlide;
type TextOpts = PptxTextOpts;

/** Candy-pop cards use hard ink strokes + plump radius (candy-blob `.card`). */
function cardStroke(
  ctx: ExportContext,
  opts: { hero?: boolean; highlighted?: boolean } = {}
): { color: string; width: number } {
  if (ctx.themeName === "candy-pop") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2.75 : 2.5 };
  }
  // daisy-days-pastel cards: 3px charcoal
  if (ctx.themeName === "daisy-days") {
    return { color: "2D2D2D", width: opts.hero || opts.highlighted ? 2.75 : 2.5 };
  }
  // capsule-pills cards: 2px ink
  if (ctx.themeName === "capsule") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2.25 : 2 };
  }
  // bit-orbit-arcade cards: 2px accent
  if (ctx.themeName === "8-bit-orbit") {
    return { color: ctx.colors.accent, width: opts.hero || opts.highlighted ? 2.25 : 2 };
  }
  // retro-windows-chrome cards: 2px ink
  if (ctx.themeName === "retro-windows") {
    return { color: "000000", width: opts.hero || opts.highlighted ? 2.25 : 2 };
  }
  // block-frame-brutal cards: 4px ink
  if (ctx.themeName === "block-frame") {
    return { color: "000000", width: opts.hero || opts.highlighted ? 3.25 : 3 };
  }
  // creative-mode-blocks cards: 3px ink
  if (ctx.themeName === "creative-mode") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2.75 : 2.5 };
  }
  // sakura-chroma-cassette cards: 2px ink
  if (ctx.themeName === "sakura-chroma") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2 : 1.75 };
  }
  // stencil-tablet-earth / retro-zine-riso cards: 2px hard ink
  if (ctx.themeName === "stencil-tablet" || ctx.themeName === "retro-zine") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2.25 : 2 };
  }
  // coral-hatch cards: 2px hard ink, square
  if (ctx.themeName === "coral") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2.5 : 2.25 };
  }
  // peoples-platform-poster cards: 4px hard ink
  if (ctx.themeName === "peoples-platform") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 3.5 : 3.25 };
  }
  // neon-rain cards: cyan rim
  if (ctx.themeName === "neon-noir") {
    return { color: ctx.colors.accent2, width: opts.hero || opts.highlighted ? 1.75 : 1.5 };
  }
  // vapor-horizon / aero-bubble cards: soft accent rim
  if (ctx.themeName === "vaporwave" || ctx.themeName === "y2k-aero") {
    return { color: ctx.colors.accent, width: opts.hero || opts.highlighted ? 1.5 : 1.25 };
  }
  // broadside-fire cards: hard ink
  if (ctx.themeName === "broadside") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2.25 : 2 };
  }
  // cobalt-grid-paper cards: cobalt hairline, square
  if (ctx.themeName === "cobalt-grid") {
    return { color: ctx.colors.accent, width: opts.hero || opts.highlighted ? 1.5 : 1.25 };
  }
  // scanline-neon cards: cyan rim
  if (ctx.themeName === "retro-arcade") {
    return { color: ctx.colors.accent2, width: opts.hero || opts.highlighted ? 1.75 : 1.5 };
  }
  // mat-woodglow cards: dark ink on cream
  if (ctx.themeName === "mat") {
    return { color: "1E2820", width: opts.hero || opts.highlighted ? 1.5 : 1.25 };
  }
  // biennale-yellow-sun cards: indigo hairline
  if (ctx.themeName === "biennale-yellow") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 1.35 : 1.1 };
  }
  // hard-bento (genz-bento) cards: 2.5px ink
  if (ctx.themeName === "genz-bento") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2.75 : 2.5 };
  }
  // acid-block (brutalist-acid) cards: 2px accent, square
  if (ctx.themeName === "brutalist-acid") {
    return { color: ctx.colors.accent, width: opts.hero || opts.highlighted ? 2.25 : 2 };
  }
  // bauhaus-blocks cards: 2px ink, square
  if (ctx.themeName === "bauhaus") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2.25 : 2 };
  }
  // neo-grid-panels / bold-poster-ink / tri-tone-blocks cards: 2px ink, square
  if (
    ctx.themeName === "neo-grid-bold" ||
    ctx.themeName === "bold-poster" ||
    ctx.themeName === "editorial-tri-tone"
  ) {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2.25 : 2 };
  }
  // raw-grid-brutal cards: 3px ink, square
  if (ctx.themeName === "raw-grid") {
    return { color: "0A0A0A", width: opts.hero || opts.highlighted ? 3.25 : 3 };
  }
  // creative-voltage-split cards: 1px neon accent, square
  if (ctx.themeName === "creative-voltage") {
    return { color: ctx.colors.accent, width: opts.hero || opts.highlighted ? 1.5 : 1.25 };
  }
  // wrapped-block (kinetic-wrapped) cards: 3px accent, square
  if (ctx.themeName === "kinetic-wrapped") {
    return { color: ctx.colors.accent, width: opts.hero || opts.highlighted ? 3.25 : 3 };
  }
  // hud-grid / blueprint-grid cards: accent hairline, square
  if (ctx.themeName === "aerospace-hud" || ctx.themeName === "blueprint") {
    return { color: ctx.colors.accent, width: opts.hero || opts.highlighted ? 1.35 : 1.15 };
  }
  // swiss-grid cards: quiet border, square
  if (ctx.themeName === "swiss-typographic") {
    return { color: ctx.colors.border, width: opts.hero || opts.highlighted ? 1.25 : 1 };
  }
  // bold-signal-card: accent rim (plump radius stays in cardRadius)
  if (ctx.themeName === "bold-signal") {
    return { color: ctx.colors.accent, width: opts.hero || opts.highlighted ? 1.5 : 1.25 };
  }
  // vintage-editorial-geo cards: 2px ink, near-square
  if (ctx.themeName === "vintage-editorial") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2.25 : 2 };
  }
  // electric-studio-split / studio-acid / grove-monograph / cartesian-draft / botanical /
  // dark-botanical / editorial-serif: square hairline cards
  if (
    ctx.themeName === "electric-studio" ||
    ctx.themeName === "studio" ||
    ctx.themeName === "grove" ||
    ctx.themeName === "cartesian" ||
    ctx.themeName === "botanical-luxe" ||
    ctx.themeName === "dark-botanical" ||
    ctx.themeName === "editorial-serif"
  ) {
    const color =
      ctx.themeName === "studio"
        ? "2E2E2C"
        : ctx.themeName === "botanical-luxe"
          ? ctx.colors.accent
          : ctx.themeName === "electric-studio" || ctx.themeName === "dark-botanical"
            ? ctx.colors.text
            : ctx.colors.border;
    return { color, width: opts.hero || opts.highlighted ? 1.35 : 1.15 };
  }
  // aurora-glass / glass-mist: frosted white/glass rim
  if (ctx.themeName === "aurora-glass" || ctx.themeName === "glassmorphism") {
    return { color: "FFFFFF", width: opts.hero || opts.highlighted ? 1.35 : 1.15 };
  }
  // crt-phosphor cards: accent hairline, square
  if (ctx.themeName === "crt-terminal") {
    return { color: ctx.colors.accent, width: opts.hero || opts.highlighted ? 1.5 : 1.25 };
  }
  // brutalist-grid (brutalist-mono): hard ink, square
  if (ctx.themeName === "brutalist-mono") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2.25 : 2 };
  }
  // deco-fan (art-deco): gold hairline, square
  if (ctx.themeName === "art-deco") {
    return { color: ctx.colors.accent, width: opts.hero || opts.highlighted ? 1.5 : 1.25 };
  }
  // emerald-editorial / pink-script / vellum / broadsheet / editorial-forest /
  // soft-editorial / paper-ink / pin-and-paper / monochrome / notebook-tabs
  if (ctx.themeName === "emerald-editorial") {
    return { color: ctx.colors.text, width: opts.hero || opts.highlighted ? 2.25 : 2 };
  }
  if (ctx.themeName === "pink-script") {
    return { color: "ED3D8C", width: opts.hero || opts.highlighted ? 1.35 : 1.15 };
  }
  if (ctx.themeName === "vellum") {
    return { color: ctx.colors.accent, width: opts.hero || opts.highlighted ? 1.35 : 1.15 };
  }
  if (
    ctx.themeName === "broadsheet" ||
    ctx.themeName === "editorial-forest" ||
    ctx.themeName === "monochrome" ||
    ctx.themeName === "soft-editorial" ||
    ctx.themeName === "pin-and-paper" ||
    ctx.themeName === "paper-ink" ||
    ctx.themeName === "notebook-tabs" ||
    ctx.themeName === "heritage-editorial"
  ) {
    const color =
      ctx.themeName === "heritage-editorial"
        ? ctx.colors.accent
        : ctx.themeName === "paper-ink"
          ? ctx.colors.accent
          : ctx.colors.text;
    return { color, width: opts.hero || opts.highlighted ? 1.35 : 1.15 };
  }
  if (opts.hero || opts.highlighted) {
    return { color: ctx.colors.accent, width: opts.highlighted ? 1.75 : 1.5 };
  }
  return { color: ctx.colors.border, width: 1 };
}

function cardRadius(ctx: ExportContext): number {
  // candy-blob cards: border-radius 22px ≈ 0.23"
  if (ctx.themeName === "candy-pop") return 0.23;
  // soft-editorial-paper cards: border-radius 24px ≈ 0.25"
  if (ctx.themeName === "soft-editorial") return 0.25;
  // capsule-pills cards: border-radius 2rem ≈ 0.29"
  if (ctx.themeName === "capsule") return 0.29;
  // long-table-supper cards: border-radius 1.25rem ≈ 0.21"
  if (ctx.themeName === "long-table") return 0.21;
  // daisy-days-pastel cards: border-radius 20px ≈ 0.21"
  if (ctx.themeName === "daisy-days") return 0.21;
  // stencil-tablet-earth cards: border-radius 24px ≈ 0.25"
  if (ctx.themeName === "stencil-tablet") return 0.25;
  // retro-zine-riso / block-frame-brutal / creative-mode-blocks / 8-bit / Win95 / coral / peoples / broadside / cobalt / mat / biennale / arcade / acid / bauhaus / neo-grid / bold-poster / tri-tone / raw-grid / voltage / Pulse / hud / blueprint / swiss: square
  if (
    ctx.themeName === "retro-zine" ||
    ctx.themeName === "block-frame" ||
    ctx.themeName === "creative-mode" ||
    ctx.themeName === "8-bit-orbit" ||
    ctx.themeName === "retro-windows" ||
    ctx.themeName === "coral" ||
    ctx.themeName === "peoples-platform" ||
    ctx.themeName === "broadside" ||
    ctx.themeName === "cobalt-grid" ||
    ctx.themeName === "mat" ||
    ctx.themeName === "biennale-yellow" ||
    ctx.themeName === "retro-arcade" ||
    ctx.themeName === "brutalist-acid" ||
    ctx.themeName === "bauhaus" ||
    ctx.themeName === "neo-grid-bold" ||
    ctx.themeName === "bold-poster" ||
    ctx.themeName === "editorial-tri-tone" ||
    ctx.themeName === "raw-grid" ||
    ctx.themeName === "creative-voltage" ||
    ctx.themeName === "kinetic-wrapped" ||
    ctx.themeName === "aerospace-hud" ||
    ctx.themeName === "blueprint" ||
    ctx.themeName === "swiss-typographic" ||
    ctx.themeName === "electric-studio" ||
    ctx.themeName === "studio" ||
    ctx.themeName === "grove" ||
    ctx.themeName === "cartesian" ||
    ctx.themeName === "botanical-luxe" ||
    ctx.themeName === "dark-botanical" ||
    ctx.themeName === "editorial-serif" ||
    ctx.themeName === "crt-terminal" ||
    ctx.themeName === "brutalist-mono" ||
    ctx.themeName === "art-deco" ||
    ctx.themeName === "emerald-editorial" ||
    ctx.themeName === "pink-script" ||
    ctx.themeName === "vellum" ||
    ctx.themeName === "broadsheet" ||
    ctx.themeName === "editorial-forest" ||
    ctx.themeName === "monochrome" ||
    ctx.themeName === "paper-ink"
  ) {
    return 0;
  }
  // hard-bento (genz-bento) cards: border-radius 14px ≈ 0.15"
  if (ctx.themeName === "genz-bento") return 0.15;
  // bold-signal-card / aero-bubble / pastel-geometry / pastel-dreamy / glass: plump
  if (ctx.themeName === "bold-signal") return 0.16;
  if (ctx.themeName === "y2k-aero") return 0.18;
  if (ctx.themeName === "pastel-geometry") return 0.18;
  if (ctx.themeName === "pastel-dreamy") return 0.22;
  if (ctx.themeName === "aurora-glass" || ctx.themeName === "glassmorphism") return 0.14;
  // pin-and-paper / notebook-tabs / heritage: soft paper radii (soft-editorial already above)
  if (ctx.themeName === "pin-and-paper") return 0.08;
  if (ctx.themeName === "notebook-tabs") return 0.1;
  if (ctx.themeName === "heritage-editorial") return 0.06;
  // vintage-editorial-geo cards: border-radius 4px ≈ 0.04"
  if (ctx.themeName === "vintage-editorial") return 0.04;
  // scatterbrain-cork cards: border-radius 2px ≈ 0.02"
  if (ctx.themeName === "scatterbrain") return 0.02;
  // sakura-chroma-cassette cards: border-radius 4px ≈ 0.04"
  if (ctx.themeName === "sakura-chroma") return 0.04;
  return 0.06;
}

/**
 * Pulse (kinetic-wrapped) eyebrows render as hard chips in HTML —
 * filled accent pill with tight tracking (wrapped-block `.eyebrow`).
 */
function eyebrow(
  slide: PSlide,
  ctx: ExportContext,
  text: string,
  x: number,
  y: number,
  w: number,
  opts: { hero?: boolean; tone?: string } = {}
): void {
  const label = text.toUpperCase();
  if (ctx.themeName === "kinetic-wrapped") {
    const tone = opts.tone ?? "";
    const hueMap: Record<string, string> = {
      lime: "C8FF00",
      magenta: "CC00FF",
      cyan: "00E5FF",
      orange: "FF4D00",
      violet: "7A00FF",
    };
    const chipH = 0.32;
    const chipW = Math.min(w, Math.max(1.15, label.length * 0.105 + 0.4));
    // Title/closing: black chip + lime ink. Tone slides: tone fill + contrasting ink.
    // Body default: accent lime chip + black ink.
    let fill = ctx.colors.accent;
    let ink = "0A0A0A";
    if (opts.hero) {
      fill = "0A0A0A";
      ink = "C8FF00";
    } else if (tone && hueMap[tone]) {
      fill = hueMap[tone];
      ink = ["magenta", "violet"].includes(tone) ? "FFFFFF" : "0A0A0A";
    }
    slide.addShape(ctx.shapeRoundRect, {
      x,
      y: y + 0.02,
      w: chipW,
      h: chipH,
      fill: { color: fill },
      line: { color: fill, width: 0 },
      rectRadius: 0,
    });
    slide.addText(label, {
      x,
      y: y + 0.02,
      w: chipW,
      h: chipH,
      fontFace: ctx.fonts.body,
      fontSize: 11,
      bold: true,
      color: ink,
      charSpacing: 3,
      align: "center",
      valign: "middle",
    });
    return;
  }
  slide.addText(label, {
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
    if (ctx.themeName === "kinetic-wrapped") {
      eyebrow(slide, ctx, data.eyebrow, x, y, w, {
        hero: true,
        tone: typeof data.tone === "string" ? data.tone : undefined,
      });
    } else {
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
    }
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
    eyebrow(slide, ctx, data.eyebrow, x, y, w, {
      tone: typeof data.tone === "string" ? data.tone : undefined,
    });
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
    eyebrow(slide, ctx, data.eyebrow, x, y, w, {
      tone: typeof data.tone === "string" ? data.tone : undefined,
    });
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
    eyebrow(slide, ctx, data.eyebrow, textX, y, textW, {
      tone: typeof data.tone === "string" ? data.tone : undefined,
    });
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
      line: cardStroke(ctx, { hero: true }),
      rectRadius: cardRadius(ctx),
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
  const stroke = cardStroke(ctx, { hero });
  slide.addShape(ctx.shapeRoundRect, {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    line: stroke,
    rectRadius: cardRadius(ctx),
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
    eyebrow(slide, ctx, data.eyebrow, x, y, w, {
      tone: typeof data.tone === "string" ? data.tone : undefined,
    });
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
      line: cardStroke(ctx, { highlighted }),
      rectRadius: cardRadius(ctx),
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
      line: cardStroke(ctx),
      rectRadius: cardRadius(ctx),
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
    if (theme === "creative-voltage") {
      // Split field + frame + offset shadow live in the dedicated block below.
    } else {
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
  }

  if (theme === "bold-signal") {
    // Soft shadow stub + rounded card frame (bold-signal-card 0 24px 60px);
    // orange corner blot every slide; hero gets the focal panel.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.22,
      y: 0.22,
      w: ctx.width - 0.28,
      h: ctx.height - 0.28,
      fill: { color: "000000", transparency: 72 },
      line: { color: "000000", width: 0 },
      rectRadius: 0.16,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.28,
      h: ctx.height - 0.28,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.border, width: 1 },
      rectRadius: 0.16,
    });
    slide.addShape(ctx.shapeOval, {
      x: -0.6,
      y: ctx.height - 1.8,
      w: 2.2,
      h: 2.2,
      fill: { color: ctx.colors.accent, transparency: 78 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height - 0.72,
      w: 0.55,
      h: 0.035,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    if (isHero) {
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
  }

  if (theme === "mat") {
    // Woodglow radials + cream inset rim + hairline stubs (mat-woodglow).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: ctx.height * 0.48,
      w: ctx.width * 0.58,
      h: ctx.height * 0.68,
      fill: { color: ctx.colors.accent2, transparency: 68 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.68,
      y: ctx.height * 0.62,
      w: ctx.width * 0.4,
      h: ctx.height * 0.48,
      fill: { color: ctx.colors.accent, transparency: 82 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.1,
      y: -ctx.height * 0.14,
      w: ctx.width * 0.4,
      h: ctx.height * 0.45,
      fill: { color: ctx.colors.accent, transparency: 86 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    // Cream inset rim (HTML inset box-shadow 0 0 0 1px cream@8%).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "F0E8D2", width: 1 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height * 0.12,
      w: 0.42,
      h: 0.025,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - ctx.margin - 1.55,
      y: ctx.height - 0.85,
      w: 1.55,
      h: 0.045,
      fill: { color: ctx.colors.accent, transparency: 12 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    if (isHero) {
      // Mid-century accent block stub on heroes.
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width - ctx.margin - 0.95,
        y: ctx.margin * 0.9,
        w: 0.95,
        h: 0.95,
        fill: { color: ctx.colors.accent, transparency: 78 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "electric-studio") {
    // Hard slide frame (electric-studio-split border + shadow stand-in).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.04,
      y: 0.04,
      w: ctx.width - 0.08,
      h: ctx.height - 0.08,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 1.25 },
      rectRadius: 0,
    });
    if (isHero) {
      // White → blue horizontal split + black rail on the blue panel.
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
        fill: { color: "0a0a0a" },
        line: { color: "0a0a0a", width: 0 },
        rectRadius: 0,
      });
      // Top-panel accent stub so the white half isn't empty chrome.
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.margin,
        y: ctx.margin * 0.85,
        w: 0.55,
        h: 0.045,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    } else {
      // Content slides: full-height accent left rail (HTML ::before).
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: 0,
        w: 0.1,
        h: ctx.height,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "soft-editorial") {
    // Soft sage wash + hero blush/lemon candy + plump inset frame + soft shadow stub.
    // Matches soft-editorial-paper: blush ::after is hero-gated in HTML.
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: -ctx.height * 0.15,
      w: ctx.width * 0.55,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent, transparency: 78 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    // Soft paper shadow stand-in (HTML box-shadow 0 18px 48px).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.42,
      y: 0.4,
      w: ctx.width - 0.56,
      h: ctx.height - 0.56,
      fill: { color: ctx.colors.text, transparency: 94 },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0.29,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.28,
      y: 0.28,
      w: ctx.width - 0.56,
      h: ctx.height - 0.56,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.border, width: 1 },
      rectRadius: 0.29,
    });
    if (isHero) {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width - 2.35,
        y: 0.45,
        w: 1.7,
        h: 1.7,
        fill: { color: ctx.colors.accent2, transparency: 42 },
        line: { color: ctx.colors.accent2, width: 0 },
        rectRadius: 0.29,
      });
      // Lemon candy secondary (theme description; capsule-style pastel).
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width - 3.05,
        y: 1.85,
        w: 0.72,
        h: 0.72,
        fill: { color: "E8D5A3", transparency: 28 },
        line: { color: "E8D5A3", width: 0 },
        rectRadius: 0.16,
      });
      // Lilac accent chip.
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width - 1.55,
        y: 2.35,
        w: 0.48,
        h: 0.48,
        fill: { color: "C5B5E0", transparency: 35 },
        line: { color: "C5B5E0", width: 0 },
        rectRadius: 0.12,
      });
    } else {
      // Quiet magazine hairline when blush candy is off.
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.margin,
        y: 0.55,
        w: 0.95,
        h: 0.02,
        fill: { color: ctx.colors.accent, transparency: 30 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height - 0.55,
      w: 0.85,
      h: 0.03,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "claude") {
    // Warm-paper coral corner wash + soft accent2 mist + quiet inset frame (grain stays HTML-only).
    slide.addShape(ctx.shapeOval, {
      x: -1.1,
      y: ctx.height - 2.4,
      w: 3.0,
      h: 3.0,
      fill: { color: ctx.colors.accent, transparency: 82 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.8,
      y: -1.2,
      w: 3.4,
      h: 3.4,
      fill: { color: ctx.colors.accent2, transparency: 86 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.32,
      y: 0.32,
      w: ctx.width - 0.64,
      h: ctx.height - 0.64,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.border, width: 1 },
      rectRadius: 0.1,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.58,
      w: 0.72,
      h: 0.02,
      fill: { color: ctx.colors.accent, transparency: 25 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "default-tech") {
    // Neon-glow corner bloom + secondary cyan wash (HTML blur → soft ovals).
    const glowT = isHero ? 55 : 72;
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 4.2,
      y: -2.2,
      w: 6.5,
      h: 6.5,
      fill: { color: ctx.colors.accent, transparency: glowT },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -1.8,
      y: ctx.height - 3.2,
      w: 4.2,
      h: 4.2,
      fill: { color: ctx.colors.accent2, transparency: isHero ? 68 : 80 },
      line: { color: ctx.colors.accent2, width: 0 },
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
    // Secondary + tertiary blob hues (HTML soft-blob / mix-blend stand-ins).
    const secondaryBlob: Record<string, string> = {
      lime: "FF00CC",
      magenta: "FF00CC",
      cyan: "00AAFF",
      orange: "7A00FF",
      violet: "FF4D00",
    };
    const tertiaryBlob: Record<string, string> = {
      lime: "00E5FF",
      magenta: "5500FF",
      cyan: "0055CC",
      orange: "FFEA00",
      violet: "CC00FF",
    };
    // Hard frame + offset shadow (wrapped-block border / 12px box-shadow).
    const frameInk = isHero || (tone && hueMap[tone]) ? "0A0A0A" : ctx.colors.accent;
    const shadow = 0.14;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: frameInk },
      line: { color: frameInk, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: frameInk },
      line: { color: frameInk, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.08 - shadow,
      h: ctx.height - 0.08 - shadow,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: frameInk, width: 3.25 },
      rectRadius: 0,
    });
    if (isHero) {
      // Lime-field cover/closing + cyan/yellow soft blobs (wrapped-block ::before/::after).
      slide.background = { color: "C8FF00" };
      slide.addShape(ctx.shapeOval, {
        x: ctx.width * 0.55,
        y: -ctx.height * 0.18,
        w: ctx.width * 0.52,
        h: ctx.height * 0.58,
        fill: { color: "00E5FF", transparency: 50 },
        line: { color: "00E5FF", width: 0 },
      });
      slide.addShape(ctx.shapeOval, {
        x: -ctx.width * 0.1,
        y: ctx.height * 0.52,
        w: ctx.width * 0.42,
        h: ctx.height * 0.55,
        fill: { color: "FFEA00", transparency: 35 },
        line: { color: "FFEA00", width: 0 },
      });
      // Mid-field accent blot (extra soft-blob density).
      slide.addShape(ctx.shapeOval, {
        x: ctx.width * 0.28,
        y: ctx.height * 0.08,
        w: ctx.width * 0.22,
        h: ctx.height * 0.28,
        fill: { color: "FFFFFF", transparency: 72 },
        line: { color: "FFFFFF", width: 0 },
      });
      return;
    }
    if (tone && hueMap[tone]) {
      slide.background = { color: hueMap[tone]! };
      const blob = secondaryBlob[tone] ?? "FFFFFF";
      const tert = tertiaryBlob[tone] ?? "0A0A0A";
      slide.addShape(ctx.shapeOval, {
        x: ctx.width * 0.52,
        y: -ctx.height * 0.22,
        w: ctx.width * 0.55,
        h: ctx.height * 0.58,
        fill: { color: blob, transparency: 55 },
        line: { color: blob, width: 0 },
      });
      slide.addShape(ctx.shapeOval, {
        x: tone === "cyan" || tone === "orange" ? -ctx.width * 0.05 : ctx.width * 0.58,
        y: ctx.height * 0.55,
        w: ctx.width * 0.4,
        h: ctx.height * 0.5,
        fill: { color: tert, transparency: 58 },
        line: { color: tert, width: 0 },
      });
      return;
    }
    // Body: soft accent wash (::before) + hard corner square (::after) + cyan/magenta energy.
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: -ctx.height * 0.2,
      w: ctx.width * 0.55,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent, transparency: 82 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.2,
      y: -0.4,
      w: 2.8,
      h: 2.8,
      fill: { color: ctx.colors.accent2, transparency: 38 },
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
    // Hard corner accent (wrapped-block ::after square).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.35,
      y: -0.15,
      w: 1.25,
      h: 1.25,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "risograph-zine") {
    // Hard kraft frame + coral offset shadow (riso-print border/box-shadow).
    const shadow = 0.1;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: ctx.colors.accent, transparency: 40 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: ctx.colors.accent, transparency: 40 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.08 - shadow,
      h: ctx.height - 0.08 - shadow,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2 },
      rectRadius: 0,
    });
    // Overprint multiply stand-ins — layered coral + blue washes (mix-blend ≈ ovals).
    const coralT = isHero ? 70 : 76;
    const blueT = isHero ? 68 : 74;
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.48,
      y: -ctx.height * 0.12,
      w: ctx.width * 0.58,
      h: ctx.height * 0.58,
      fill: { color: ctx.colors.accent, transparency: coralT },
      line: { color: ctx.colors.accent, width: 0 },
    });
    // Misregistration duplicate — slightly offset coral plate.
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.52,
      y: -ctx.height * 0.08,
      w: ctx.width * 0.52,
      h: ctx.height * 0.52,
      fill: { color: ctx.colors.accent, transparency: isHero ? 78 : 85 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.08,
      y: ctx.height * 0.48,
      w: ctx.width * 0.48,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent2, transparency: blueT },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    // Blue misregistration offset.
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.12,
      y: ctx.height * 0.52,
      w: ctx.width * 0.44,
      h: ctx.height * 0.5,
      fill: { color: ctx.colors.accent2, transparency: isHero ? 80 : 88 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    if (isHero) {
      // Extra misregistration blot + ink speckles on cover/closing.
      slide.addShape(ctx.shapeOval, {
        x: ctx.width * 0.72,
        y: ctx.height * 0.62,
        w: 1.8,
        h: 1.8,
        fill: { color: ctx.colors.accent, transparency: 68 },
        line: { color: ctx.colors.accent, width: 0 },
      });
      const speckles = [
        { x: 0.35, y: 0.45 },
        { x: 1.1, y: 1.2 },
        { x: ctx.width * 0.4, y: 0.9 },
        { x: ctx.width * 0.65, y: ctx.height * 0.35 },
        { x: ctx.width * 0.85, y: ctx.height * 0.55 },
        { x: ctx.width * 0.3, y: ctx.height * 0.7 },
      ];
      for (const s of speckles) {
        slide.addShape(ctx.shapeOval, {
          x: s.x,
          y: s.y,
          w: 0.08,
          h: 0.08,
          fill: { color: ctx.colors.text, transparency: 55 },
          line: { color: ctx.colors.text, width: 0 },
        });
      }
    }
  }

  if (theme === "candy-pop") {
    // Hard candy frame (candy-blob 3px border).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2.75 },
      rectRadius: 0.08,
    });
    // Soft pink + blue radial washes.
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.08,
      y: -ctx.height * 0.15,
      w: ctx.width * 0.48,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent, transparency: 70 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: ctx.height * 0.45,
      w: ctx.width * 0.5,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent2, transparency: 65 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    // Outlined blue ornament circle (candy-blob ::after).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.35,
      y: 0.35,
      w: 1.7,
      h: 1.7,
      fill: { color: ctx.colors.accent2, transparency: 45 },
      line: { color: ctx.colors.text, width: 2.5 },
    });
    // Butter accent blot.
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.42,
      y: ctx.height * 0.62,
      w: 1.1,
      h: 1.1,
      fill: { color: "FFE566", transparency: 55 },
      line: { color: "FFE566", width: 0 },
    });
    if (!isHero) {
      // Pink drop-shadow stand-in (0 18px box-shadow) on body slides.
      slide.addShape(ctx.shapeRoundRect, {
        x: 0.15,
        y: ctx.height - 0.22,
        w: ctx.width - 0.3,
        h: 0.14,
        fill: { color: ctx.colors.accent, transparency: 55 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
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
        line: { color: ctx.colors.text, width: 2 },
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
    // Dual aurora washes + glass frame (aurora-glass).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "FFFFFF", width: 0.9 },
      rectRadius: 0.14,
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: -ctx.height * 0.25,
      w: ctx.width * 0.55,
      h: ctx.height * 0.65,
      fill: { color: ctx.colors.accent, transparency: 52 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.15,
      y: ctx.height * 0.5,
      w: ctx.width * 0.5,
      h: ctx.height * 0.6,
      fill: { color: ctx.colors.accent2, transparency: 60 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.72,
      y: -0.9,
      w: 3.2,
      h: 3.2,
      fill: { color: ctx.colors.accent, transparency: 72 },
      line: { color: ctx.colors.accent, width: 0 },
    });
  }

  if (theme === "glassmorphism") {
    // Soft mist blob + cyan orb + glass frame (glass-mist).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1 },
      rectRadius: 0.16,
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.1,
      y: -ctx.height * 0.2,
      w: ctx.width * 0.55,
      h: ctx.height * 0.55,
      fill: { color: ctx.colors.accent, transparency: 74 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.6,
      y: -ctx.height * 0.15,
      w: ctx.width * 0.45,
      h: ctx.height * 0.5,
      fill: { color: ctx.colors.accent2, transparency: 64 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "luxury-minimalist") {
    // Quiet luxe border on content; gold hairline on heroes (quiet-luxe).
    if (!isHero) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0.12,
        y: 0.12,
        w: ctx.width - 0.24,
        h: ctx.height - 0.24,
        fill: { color: ctx.colors.bg, transparency: 100 },
        line: { color: ctx.colors.border, width: 0.9 },
        rectRadius: 0,
      });
    }
    if (isHero) {
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
  }

  if (theme === "crt-terminal") {
    // Phosphor radial wash + denser scanlines + cyan blot + inset bezel.
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.15,
      y: -ctx.height * 0.1,
      w: ctx.width * 0.7,
      h: ctx.height * 0.75,
      fill: { color: ctx.colors.accent, transparency: 90 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    for (let i = 0; i < 12; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: 0.28 + i * 0.55,
        w: ctx.width,
        h: 0.028,
        fill: { color: ctx.colors.accent, transparency: 84 },
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
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.12,
      y: 0.12,
      w: ctx.width - 0.24,
      h: ctx.height - 0.24,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.25 },
      rectRadius: 0,
    });
  }

  if (theme === "blueprint") {
    // Grid ticks + dual reticles + outer frame (blueprint-grid).
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
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.1 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.2,
      y: 0.45,
      w: 0.7,
      h: 0.7,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.25 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.45,
      y: ctx.height - 1.15,
      w: 0.55,
      h: 0.55,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent2, width: 1.1 },
      rectRadius: 0,
    });
  }

  if (theme === "brutalist-acid") {
    // Hard acid frame + 10px accent offset shadow every slide (acid-block);
    // hero also gets the offset lime plate (::after is hero-gated in HTML).
    const shadow = 0.12;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.1 - shadow,
      h: ctx.height - 0.1 - shadow,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 2.5 },
      rectRadius: 0,
    });
    if (isHero) {
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
  }

  if (theme === "aerospace-hud") {
    // Denser HUD grid + border + dual reticles + crosshair ticks + orange
    // telemetry stub (hud-grid). Cards get accent hairline via cardStroke.
    for (let i = 1; i < 12; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: (ctx.width / 12) * i,
        y: 0,
        w: 0.012,
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
        h: 0.012,
        fill: { color: ctx.colors.accent, transparency: 78 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.35 },
      rectRadius: 0,
    });
    // Bottom-left instrument square (warning orange).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height - ctx.margin - 0.55,
      w: 0.55,
      h: 0.55,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent2, width: 1.5 },
      rectRadius: 0,
    });
    // Top-right reticle (hud-grid ::after) + crosshair ticks.
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 1.45,
      y: 0.45,
      w: 0.85,
      h: 0.85,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.5 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 1.28,
      y: 0.62,
      w: 0.5,
      h: 0.5,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 0.75 },
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.08,
      y: 0.82,
      w: 0.12,
      h: 0.02,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.05,
      y: 0.7,
      w: 0.02,
      h: 0.28,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 2.1,
      y: ctx.height - 0.72,
      w: 1.35,
      h: 0.08,
      fill: { color: ctx.colors.accent2, transparency: 20 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "neon-noir") {
    // Magenta/cyan glow + cyan rim + rain scanlines + floor inset (neon-rain).
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
    // Rain scanlines (HTML repeating-linear-gradient).
    for (let i = 0; i < 18; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0.08 + i * 0.72,
        y: 0,
        w: 0.035,
        h: ctx.height,
        fill: { color: "FFFFFF", transparency: 94 },
        line: { color: "FFFFFF", width: 0 },
        rectRadius: 0,
      });
    }
    // Cyan rim frame (HTML border accent2).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent2, width: 1.25 },
      rectRadius: 0,
    });
    // Floor inset cyan glow (HTML inset box-shadow) — always-on.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: ctx.height - 0.55,
      w: ctx.width,
      h: 0.55,
      fill: { color: ctx.colors.accent2, transparency: 88 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: ctx.height - 0.1,
      w: ctx.width,
      h: 0.1,
      fill: { color: ctx.colors.accent2, transparency: isHero ? 28 : 42 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "vaporwave") {
    // Horizon grid + pink sun + accent rim + horizon glow (vapor-horizon).
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
    // Vertical grid stubs in the horizon band.
    for (let i = 1; i < 10; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: (ctx.width / 10) * i,
        y: ctx.height * 0.55,
        w: 0.015,
        h: ctx.height * 0.45,
        fill: { color: ctx.colors.accent2, transparency: 62 },
        line: { color: ctx.colors.accent2, width: 0 },
        rectRadius: 0,
      });
    }
    // Horizon glow line (HTML ::after at ~48%).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.08,
      y: ctx.height * 0.48,
      w: ctx.width * 0.84,
      h: 0.04,
      fill: { color: ctx.colors.accent, transparency: 25 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.22,
      y: ctx.height * 0.485,
      w: ctx.width * 0.56,
      h: 0.025,
      fill: { color: ctx.colors.accent2, transparency: 20 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
    // Accent rim (HTML border).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.1 },
      rectRadius: 0,
    });
  }

  if (theme === "y2k-aero") {
    // Soft accent rim + soft shadow stub + glossy bubble ovals (aero-bubble).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.28,
      y: 0.28,
      w: ctx.width - 0.4,
      h: ctx.height - 0.4,
      fill: { color: ctx.colors.accent, transparency: 92 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0.12,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.12,
      y: 0.12,
      w: ctx.width - 0.4,
      h: ctx.height - 0.4,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.1 },
      rectRadius: 0.12,
    });
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
    // Broadsheet masthead + double rule + quiet outer frame + accent mid stub.
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
      x: 0.14,
      y: 0.14,
      w: ctx.width - 0.28,
      h: ctx.height - 0.28,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 0.75 },
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
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height - 0.62,
      w: ctx.width - ctx.margin * 2,
      h: 0.012,
      fill: { color: ctx.colors.accent, transparency: 35 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.55,
      w: 0.55,
      h: 0.03,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "bauhaus") {
    // Hard frame + red square + blue circle on every slide (bauhaus-blocks
    // ::before/::after are not hero-gated). Heroes get larger primary blocks.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2 },
      rectRadius: 0,
    });
    const sq = isHero ? 1.05 : 0.72;
    const circ = isHero ? 1.05 : 0.72;
    const sqX = isHero ? ctx.width - 2.3 : ctx.width - 1.55;
    const sqY = isHero ? 0.7 : 0.55;
    const circX = isHero ? ctx.width - 2.9 : ctx.width - 2.05;
    const circY = isHero ? 1.35 : 1.0;
    slide.addShape(ctx.shapeRoundRect, {
      x: sqX,
      y: sqY,
      w: sq,
      h: sq,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeOval, {
      x: circX,
      y: circY,
      w: circ,
      h: circ,
      fill: { color: ctx.colors.accent2, transparency: isHero ? 12 : 22 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "fintech-clean") {
    // Soft mint radial wash + clean frame (fintech-soft).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.border, width: 1 },
      rectRadius: 0.1,
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: -ctx.height * 0.25,
      w: ctx.width * 0.55,
      h: ctx.height * 0.6,
      fill: { color: ctx.colors.accent, transparency: 86 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.7,
      y: -ctx.height * 0.15,
      w: ctx.width * 0.4,
      h: ctx.height * 0.45,
      fill: { color: ctx.colors.accent2, transparency: 74 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "scandinavian") {
    // Sage corner wash + clay soft circle + hygge frame (hygge-soft).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.12,
      y: 0.12,
      w: ctx.width - 0.24,
      h: ctx.height - 0.24,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.border, width: 0.9 },
      rectRadius: 0.14,
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.12,
      y: -ctx.height * 0.2,
      w: ctx.width * 0.5,
      h: ctx.height * 0.5,
      fill: { color: ctx.colors.accent, transparency: 78 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.4,
      y: ctx.height - 2.2,
      w: 1.9,
      h: 1.9,
      fill: { color: ctx.colors.accent2, transparency: 72 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "art-deco") {
    // Gold frame + always-on top hairline (deco-fan ::before); centered deco
    // ring on heroes (::after is hero-gated). Cards get gold hairlines via cardStroke.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.35 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin + 0.15,
      y: 0.52,
      w: ctx.width - ctx.margin * 2 - 0.3,
      h: 0.025,
      fill: { color: ctx.colors.accent, transparency: isHero ? 0 : 20 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    if (isHero) {
      slide.addShape(ctx.shapeOval, {
        x: ctx.width / 2 - 0.38,
        y: 0.35,
        w: 0.76,
        h: 0.76,
        fill: { color: ctx.colors.bg, transparency: 100 },
        line: { color: ctx.colors.accent, width: 1.85 },
      });
      slide.addShape(ctx.shapeOval, {
        x: ctx.width / 2 - 0.22,
        y: 0.51,
        w: 0.44,
        h: 0.44,
        fill: { color: ctx.colors.bg, transparency: 100 },
        line: { color: ctx.colors.accent, width: 0.9 },
      });
    }
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
    // Hard border + 10px offset shadow strips + accent2 corner blot (hard-bento).
    const shadow = 0.12;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.12,
      y: 0.12,
      w: ctx.width - 0.24,
      h: ctx.height - 0.24,
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
    // Parchment wash + quiet hairlines + mid stub (heritage-wash).
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.15,
      y: -ctx.height * 0.25,
      w: ctx.width * 0.85,
      h: ctx.height * 0.7,
      fill: { color: ctx.colors.bg2, transparency: 35 },
      line: { color: ctx.colors.bg2, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.45,
      y: ctx.height * 0.35,
      w: ctx.width * 0.7,
      h: ctx.height * 0.85,
      fill: { color: ctx.colors.accent2, transparency: 88 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.6,
      w: ctx.width - ctx.margin * 2,
      h: 0.015,
      fill: { color: ctx.colors.accent, transparency: 40 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.72,
      w: 0.48,
      h: 0.012,
      fill: { color: ctx.colors.accent, transparency: 55 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - ctx.margin - 0.95,
      y: ctx.height - 0.65,
      w: 0.95,
      h: 0.015,
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
    // Accent rule + stub + hard frame (data-rule).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.border, width: 1.1 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.55,
      w: ctx.width - ctx.margin * 2,
      h: 0.04,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.55,
      w: 0.04,
      h: 0.6,
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
    // Outer sky matte ring + soft shadow + vertical pastel edge pills
    // (pastel-geometry-pills box-shadow 0 0 0 22px var(--bg)).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width,
      h: ctx.height,
      fill: { color: ctx.colors.bg },
      line: { color: ctx.colors.bg, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.32,
      y: 0.32,
      w: ctx.width - 0.48,
      h: ctx.height - 0.48,
      fill: { color: ctx.colors.text, transparency: 94 },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0.24,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.22,
      y: 0.22,
      w: ctx.width - 0.52,
      h: ctx.height - 0.52,
      fill: { color: ctx.colors.cardBg },
      line: { color: ctx.colors.border, width: 0.75 },
      rectRadius: 0.24,
    });
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
  }

  if (theme === "8-bit-orbit") {
    // Arcade scanlines + neon orbs + dual offset shadows (4px yellow + 8px pink)
    // + accent frame + always-on pixel HUD (bit-orbit-arcade).
    const outer = 0.1; // ~8px accent2
    const inner = 0.05; // ~4px yellow
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - outer,
      y: outer,
      w: outer,
      h: ctx.height - outer,
      fill: { color: ctx.colors.accent2 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: outer,
      y: ctx.height - outer,
      w: ctx.width - outer,
      h: outer,
      fill: { color: ctx.colors.accent2 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - outer - inner,
      y: outer + inner,
      w: inner,
      h: ctx.height - outer - inner,
      fill: { color: "F4D03F" },
      line: { color: "F4D03F", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: outer + inner,
      y: ctx.height - outer - inner,
      w: ctx.width - outer - inner,
      h: inner,
      fill: { color: "F4D03F" },
      line: { color: "F4D03F", width: 0 },
      rectRadius: 0,
    });
    for (let i = 0; i < 10; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: 0.25 + i * 0.7,
        w: ctx.width - outer,
        h: 0.035,
        fill: { color: "000000", transparency: 82 },
        line: { color: "000000", width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: -ctx.height * 0.12,
      w: ctx.width * 0.45 - outer,
      h: ctx.height * 0.45,
      fill: { color: ctx.colors.accent, transparency: 78 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.1,
      y: ctx.height * 0.55,
      w: ctx.width * 0.4,
      h: ctx.height * 0.45 - outer,
      fill: { color: ctx.colors.accent2, transparency: 78 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.08 - outer,
      h: ctx.height - 0.08 - outer,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 2.5 },
      rectRadius: 0,
    });
    // Pixel HUD dots (top-left) — always-on like HTML ::before.
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
    // Bottom-right HUD chip + yellow offset plate — always-on like HTML ::after.
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.5 - outer,
      y: ctx.height - 0.8 - outer,
      w: 0.95,
      h: 0.28,
      fill: { color: "F4D03F" },
      line: { color: "F4D03F", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.55 - outer,
      y: ctx.height - 0.85 - outer,
      w: 0.95,
      h: 0.28,
      fill: { color: ctx.colors.accent },
      line: { color: "FFFFFF", width: 1.5 },
      rectRadius: 0,
    });
  }

  if (theme === "neo-grid-bold") {
    // Modular grid + lemon corner panel + hard border + 8px accent offset
    // shadow (neo-grid-panels).
    const shadow = 0.1;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    for (let i = 1; i < 10; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: (ctx.width / 10) * i,
        y: 0,
        w: 0.012,
        h: ctx.height - shadow,
        fill: { color: ctx.colors.text, transparency: 85 },
        line: { color: ctx.colors.text, width: 0 },
        rectRadius: 0,
      });
    }
    for (let i = 1; i < 6; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: (ctx.height / 6) * i,
        w: ctx.width - shadow,
        h: 0.012,
        fill: { color: ctx.colors.text, transparency: 85 },
        line: { color: ctx.colors.text, width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.08 - shadow,
      h: ctx.height - 0.08 - shadow,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2.5 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.55 - shadow,
      y: 0.55,
      w: 0.95,
      h: 0.95,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "bold-poster") {
    // Hard frame + offset shadow every slide; ink top bar; poster block on heroes.
    const shadow = 0.11;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2.25 },
      rectRadius: 0,
    });
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
    // Plump frame + hard ink offset shadow (HTML 8px/10px 0-blur) + pastel blots;
    // hero-gated coral pill + lime circles (capsule-pills ::before/::after).
    const shadowX = 0.1;
    const shadowY = 0.12;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadowX,
      y: shadowY,
      w: shadowX,
      h: ctx.height - shadowY,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadowX,
      y: ctx.height - shadowY,
      w: ctx.width - shadowX,
      h: shadowY,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.18,
      y: 0.18,
      w: ctx.width - 0.36 - shadowX,
      h: ctx.height - 0.36 - shadowY,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.border, width: 2 },
      rectRadius: 0.29,
    });
    // Quiet lavender / sky radial blots (HTML --slide-bg candy).
    slide.addShape(ctx.shapeOval, {
      x: 0.35,
      y: ctx.height - 1.85 - shadowY,
      w: 0.72,
      h: 0.72,
      fill: { color: "C5B5E0", transparency: 42 },
      line: { color: "C5B5E0", width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 1.55 - shadowX,
      y: 0.55,
      w: 0.58,
      h: 0.58,
      fill: { color: "8BB4F7", transparency: 38 },
      line: { color: "8BB4F7", width: 0 },
    });
    if (isHero) {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width - 2.15 - shadowX,
        y: 0.5,
        w: 1.45,
        h: 0.42,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.border, width: 2 },
        rectRadius: 0.21,
      });
      slide.addShape(ctx.shapeOval, {
        x: 0.5,
        y: ctx.height - 1.6 - shadowY,
        w: 0.95,
        h: 0.95,
        fill: { color: ctx.colors.accent2 },
        line: { color: ctx.colors.border, width: 2 },
      });
      slide.addShape(ctx.shapeOval, {
        x: ctx.width * 0.78 - shadowX,
        y: ctx.height * 0.72 - shadowY,
        w: 0.55,
        h: 0.55,
        fill: { color: "C4D94E", transparency: 18 },
        line: { color: ctx.colors.border, width: 1.5 },
      });
    } else {
      // Quiet accent stub when loud pills are off.
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.margin,
        y: ctx.height - 0.58 - shadowY,
        w: 0.7,
        h: 0.03,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0.015,
      });
    }
  }

  if (theme === "cobalt-grid") {
    // Blueprint-ish cobalt grid + outer frame + diagonal corner hatch (cobalt-grid-paper).
    for (let i = 1; i < 18; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: (ctx.width / 18) * i,
        y: 0,
        w: 0.012,
        h: ctx.height,
        fill: { color: ctx.colors.accent, transparency: 78 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    for (let i = 1; i < 11; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: (ctx.height / 11) * i,
        w: ctx.width,
        h: 0.012,
        fill: { color: ctx.colors.accent, transparency: 78 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    // Corner hatch wash + diagonal stubs (HTML ::before top-left gradients).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.55,
      y: ctx.height * 0.52,
      w: ctx.width * 0.45,
      h: ctx.height * 0.48,
      fill: { color: ctx.colors.accent, transparency: 88 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width * (0.58 + t * 0.38),
        y: ctx.height * (0.95 - t * 0.42),
        w: 0.9,
        h: 0.018,
        fill: { color: ctx.colors.accent, transparency: 48 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
    // Quiet cobalt outer frame (HTML border accent@18%).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.1 },
      rectRadius: 0,
    });
  }

  if (theme === "retro-arcade") {
    // Dense scanlines + dual neon rail + rim + floor glow + neon orbs (scanline-neon).
    for (let i = 0; i < 14; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: 0.18 + i * 0.52,
        w: ctx.width,
        h: 0.028,
        fill: { color: "000000", transparency: 74 },
        line: { color: "000000", width: 0 },
        rectRadius: 0,
      });
    }
    // Magenta → cyan top rail (HTML linear-gradient accent/accent2/accent).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width * 0.5,
      h: 0.07,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.5,
      y: 0,
      w: ctx.width * 0.5,
      h: 0.07,
      fill: { color: ctx.colors.accent2 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.15,
      y: -0.45,
      w: 2.4,
      h: 2.4,
      fill: { color: ctx.colors.accent2, transparency: 66 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -0.7,
      y: ctx.height - 1.9,
      w: 2.1,
      h: 2.1,
      fill: { color: ctx.colors.accent, transparency: 72 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    // Cyan rim (HTML neon border feel).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent2, width: 1.35 },
      rectRadius: 0,
    });
    // Floor neon inset glow.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: ctx.height - 0.42,
      w: ctx.width,
      h: 0.42,
      fill: { color: ctx.colors.accent, transparency: isHero ? 82 : 88 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: ctx.height - 0.08,
      w: ctx.width,
      h: 0.08,
      fill: { color: ctx.colors.accent2, transparency: isHero ? 35 : 48 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "brutalist-mono") {
    // Dense mono grid + hard outer frame + 8px ink offset shadow (brutalist-grid).
    const shadow = 0.1;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    for (let i = 1; i < 16; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: (ctx.width / 16) * i,
        y: 0,
        w: 0.01,
        h: ctx.height - shadow,
        fill: { color: ctx.colors.border, transparency: 55 },
        line: { color: ctx.colors.border, width: 0 },
        rectRadius: 0,
      });
    }
    for (let i = 1; i < 10; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0,
        y: (ctx.height / 10) * i,
        w: ctx.width - shadow,
        h: 0.01,
        fill: { color: ctx.colors.border, transparency: 55 },
        line: { color: ctx.colors.border, width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.1 - shadow,
      h: ctx.height - 0.1 - shadow,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2.5 },
      rectRadius: 0,
    });
  }

  if (theme === "creative-mode") {
    // Hard frame + 10px ink offset shadow every slide; stacked accent blocks
    // only on heroes (creative-mode-blocks ::before/::after are body-softened).
    const shadow = 0.12;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.12,
      y: 0.12,
      w: ctx.width - 0.12 - shadow,
      h: ctx.height - 0.12 - shadow,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 3 },
      rectRadius: 0,
    });
    if (isHero) {
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
  }

  if (theme === "creative-voltage") {
    // Hard accent frame + 8px neon offset shadow every slide; hero split field
    // + voltage orb (creative-voltage-split). Body slides stay dark (#1a1a2e).
    const shadow = 0.1;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    if (isHero) {
      slide.background = { color: ctx.colors.bg };
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width * 0.48,
        y: 0,
        w: ctx.width * 0.52 - shadow,
        h: ctx.height - shadow,
        fill: { color: ctx.colors.bg2 },
        line: { color: ctx.colors.bg2, width: 0 },
        rectRadius: 0,
      });
      slide.addShape(ctx.shapeOval, {
        x: ctx.width - 1.6 - shadow,
        y: 0.55,
        w: 0.95,
        h: 0.95,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.accent, width: 0 },
      });
    } else {
      slide.background = { color: ctx.colors.bg2 };
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.1 - shadow,
      h: ctx.height - 0.1 - shadow,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 2 },
      rectRadius: 0,
    });
  }

  if (theme === "biennale-yellow") {
    // Dense sun orbs + quiet indigo frame + top hairline + coral stub (biennale-yellow-sun).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.55,
      y: -ctx.height * 0.22,
      w: ctx.width * 0.58,
      h: ctx.height * 0.62,
      fill: { color: ctx.colors.accent, transparency: 28 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.66,
      y: ctx.height * 0.04,
      w: ctx.width * 0.34,
      h: ctx.height * 0.38,
      fill: { color: "F8F39B", transparency: 40 },
      line: { color: "F8F39B", width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.78,
      y: -0.2,
      w: ctx.width * 0.28,
      h: ctx.height * 0.28,
      fill: { color: ctx.colors.accent, transparency: 55 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    // Quiet indigo outer frame (HTML border text@18%).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 1.1 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.55,
      w: ctx.width - ctx.margin * 2,
      h: 0.018,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    // Coral accent stub (accent2) — gallery counterweight to the sun.
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - ctx.margin - 1.15,
      y: ctx.height - 0.72,
      w: 1.15,
      h: 0.035,
      fill: { color: ctx.colors.accent2, transparency: 15 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
    if (isHero) {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.margin,
        y: ctx.height - 0.72,
        w: 0.85,
        h: 0.035,
        fill: { color: ctx.colors.text, transparency: 35 },
        line: { color: ctx.colors.text, width: 0 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "scatterbrain") {
    // Cork wash + soft ink offset shadow + quiet frame + sticky notes + pins;
    // hero-gated tape strip (scatterbrain-cork ::after).
    const shadow = 0.09;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: "2D2A26" },
      line: { color: "2D2A26", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: "2D2A26" },
      line: { color: "2D2A26", width: 0 },
      rectRadius: 0,
    });
    // Soft cork yellow wash (HTML radial at 20%/30%).
    slide.addShape(ctx.shapeOval, {
      x: -0.8,
      y: -0.6,
      w: ctx.width * 0.55,
      h: ctx.height * 0.55,
      fill: { color: "FFE066", transparency: 88 },
      line: { color: "FFE066", width: 0 },
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.1 - shadow,
      h: ctx.height - 0.1 - shadow,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "2D2A26", width: 1 },
      rectRadius: 0.08,
    });
    // Quiet cork rules (HTML repeating 40px lines).
    for (let i = 1; i < 10; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: 0.12,
        y: (ctx.height / 10) * i,
        w: ctx.width - 0.12 - shadow,
        h: 0.01,
        fill: { color: "2D2A26", transparency: 92 },
        line: { color: "2D2A26", width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.68 - shadow,
      y: 0.55,
      w: 1.7,
      h: 1.25,
      fill: { color: "FFE066" },
      line: { color: ctx.colors.text, width: 0.75 },
      rectRadius: 0.02,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.78 - shadow,
      y: ctx.height * 0.48,
      w: 1.4,
      h: 1.1,
      fill: { color: "74C0FC" },
      line: { color: ctx.colors.text, width: 0.75 },
      rectRadius: 0.02,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.55,
      y: ctx.height * 0.58 - shadow,
      w: 1.25,
      h: 1.0,
      fill: { color: "FF9F9F" },
      line: { color: ctx.colors.text, width: 0.75 },
      rectRadius: 0.02,
    });
    for (const pin of [
      { x: ctx.width * 0.72 - shadow, y: 0.48 },
      { x: ctx.width * 0.82 - shadow, y: ctx.height * 0.42 },
      { x: 0.72, y: ctx.height * 0.52 - shadow },
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
    if (isHero) {
      // Tape strip stand-in (HTML ::after).
      slide.addShape(ctx.shapeRoundRect, {
        x: 0.55,
        y: ctx.height - 0.95 - shadow,
        w: 1.05,
        h: 0.26,
        fill: { color: "FFEC99", transparency: 25 },
        line: { color: "2D2A26", width: 0.75 },
        rectRadius: 0.02,
      });
    }
  }

  if (theme === "split-pastel") {
    // Soft dual pastel corner washes on every slide; full split + pills on heroes.
    slide.addShape(ctx.shapeOval, {
      x: -1.4,
      y: ctx.height - 2.6,
      w: 3.2,
      h: 3.2,
      fill: { color: ctx.colors.accent, transparency: 84 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.4,
      y: -1.4,
      w: 3.0,
      h: 3.0,
      fill: { color: ctx.colors.accent2, transparency: 84 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    if (isHero) {
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
    } else {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.margin,
        y: 0.55,
        w: 0.9,
        h: 0.02,
        fill: { color: ctx.colors.accent, transparency: 30 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
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
    // Cobalt top bar + amber footer stub + hard frame + speckled wash
    // (peoples-platform-poster). Cards get 4px hard ink via cardStroke.
    // Quiet ink speckles (HTML radial-gradient tooth).
    for (let i = 0; i < 28; i++) {
      const col = i % 7;
      const row = Math.floor(i / 7);
      slide.addShape(ctx.shapeOval, {
        x: 0.45 + col * 1.75,
        y: 0.55 + row * 1.35,
        w: 0.06,
        h: 0.06,
        fill: { color: ctx.colors.text, transparency: 92 },
        line: { color: ctx.colors.text, width: 0 },
      });
    }
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
    // Blush/sage bands + cross rules + hard frame + 6px ink offset shadow
    // (raw-grid-brutal box-shadow is always-on).
    const shadow = 0.08;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: "0A0A0A" },
      line: { color: "0A0A0A", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: "0A0A0A" },
      line: { color: "0A0A0A", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width - shadow,
      h: ctx.height * 0.28,
      fill: { color: "F2D4CF" },
      line: { color: "F2D4CF", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width * 0.22,
      h: ctx.height - shadow,
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
      w: ctx.width - shadow,
      h: 0.035,
      fill: { color: "0A0A0A" },
      line: { color: "0A0A0A", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.22,
      y: 0,
      w: 0.035,
      h: ctx.height - shadow,
      fill: { color: "0A0A0A" },
      line: { color: "0A0A0A", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.08 - shadow,
      h: ctx.height - 0.08 - shadow,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "0A0A0A", width: 2.5 },
      rectRadius: 0,
    });
  }

  if (theme === "retro-zine") {
    // Hard frame + offset green plate + cream card on every slide (retro-zine-riso).
    // HTML ::before/::after are not hero-gated.
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
      line: { color: ctx.colors.text, width: 2 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2.75 },
      rectRadius: 0,
    });
  }

  if (theme === "sakura-chroma") {
    // Hard frame + accent-tinted offset shadow every slide; chroma strip +
    // stamp orbs stay hero-gated (sakura-chroma-cassette).
    const shadow = 0.12;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: ctx.colors.accent, transparency: 65 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: ctx.colors.accent, transparency: 65 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.08 - shadow,
      h: ctx.height - 0.08 - shadow,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 2 },
      rectRadius: 0.06,
    });
    if (isHero) {
      const chroma = ["E5392A", "E54489", "F09131", "3D9F47", "3F8BC4", "F0BC2A"];
      const stripW = (ctx.width - shadow) * 0.48;
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
        { x: ctx.width - 1.85 - shadow, y: 0.55, color: "E54489" },
        { x: ctx.width - 1.35 - shadow, y: 0.72, color: "F09131" },
        { x: ctx.width - 1.6 - shadow, y: 1.15, color: "3F8BC4" },
        { x: ctx.width - 1.95 - shadow, y: 1.05, color: "3D9F47" },
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
        y: ctx.height - 0.85 - shadow,
        w: 0.7,
        h: 0.28,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.text, width: 1.5 },
        rectRadius: 0.02,
      });
    }
  }

  if (theme === "daisy-days") {
    // Hard frame + charcoal offset shadow + pastel dots + daisy/pill on every
    // slide (daisy-days-pastel ::before/::after are not hero-gated).
    const shadow = 0.08;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: "2D2D2D" },
      line: { color: "2D2D2D", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: "2D2D2D" },
      line: { color: "2D2D2D", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "2D2D2D", width: 2.75 },
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

  if (theme === "block-frame") {
    // Hard neobrutalist frame + 8px ink offset shadow every slide; pastel
    // offset blocks stay hero-gated (block-frame-brutal).
    const shadow = 0.1;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - shadow,
      y: shadow,
      w: shadow,
      h: ctx.height - shadow,
      fill: { color: "000000" },
      line: { color: "000000", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: shadow,
      y: ctx.height - shadow,
      w: ctx.width - shadow,
      h: shadow,
      fill: { color: "000000" },
      line: { color: "000000", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.1 - shadow,
      h: ctx.height - 0.1 - shadow,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "000000", width: 3.5 },
      rectRadius: 0,
    });
    if (isHero) {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width * 0.72 - shadow,
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
    // Fire-orange left rail + corner blast + hard ink frame + always-on top stub
    // (broadside-fire). Cards get hard ink strokes via cardStroke.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 1.75 },
      rectRadius: 0,
    });
    // HTML ::before is 10px ≈ 0.14".
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: 0.14,
      h: ctx.height,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.7,
      y: ctx.height - 1.7,
      w: 1.85,
      h: 1.85,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    // Always-on top stub (poster energy on body slides too).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin + 0.08,
      y: 0.42,
      w: isHero ? 1.35 : 0.95,
      h: 0.065,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    if (isHero) {
      // Second fire bar for manifesto covers.
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.margin + 0.08,
        y: 0.55,
        w: 0.55,
        h: 0.04,
        fill: { color: ctx.colors.text },
        line: { color: ctx.colors.text, width: 0 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "pink-script") {
    // Dual inset frames + always-on accent hairline; soft wash on heroes
    // (pink-script-afterhours — HTML ::after hairline is not hero-gated).
    if (isHero) {
      slide.addShape(ctx.shapeOval, {
        x: ctx.width * 0.55,
        y: -ctx.height * 0.2,
        w: ctx.width * 0.55,
        h: ctx.height * 0.55,
        fill: { color: ctx.colors.accent, transparency: 78 },
        line: { color: ctx.colors.accent, width: 0 },
      });
    }
    // Outer accent inset (HTML box-shadow inset accent).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.22,
      y: 0.22,
      w: ctx.width - 0.44,
      h: ctx.height - 0.44,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.1 },
      rectRadius: 0,
    });
    // Inner light inset ring.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.42,
      y: 0.42,
      w: ctx.width - 0.84,
      h: ctx.height - 0.84,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "F5EDF1", width: 1 },
      rectRadius: 0,
    });
    // Always-on accent hairline (HTML ::after).
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
    // Win95 beveled chrome: white top/left + black right/bottom outer bevel,
    // inset hilite/shade strips, CRT scanlines, title bar + window buttons.
    const bevel = 0.035;
    // Outer dark bottom/right.
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - bevel,
      y: 0,
      w: bevel,
      h: ctx.height,
      fill: { color: "000000" },
      line: { color: "000000", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: ctx.height - bevel,
      w: ctx.width,
      h: bevel,
      fill: { color: "000000" },
      line: { color: "000000", width: 0 },
      rectRadius: 0,
    });
    // Outer light top/left.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width - bevel,
      h: bevel,
      fill: { color: "FFFFFF" },
      line: { color: "FFFFFF", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: bevel,
      h: ctx.height - bevel,
      fill: { color: "FFFFFF" },
      line: { color: "FFFFFF", width: 0 },
      rectRadius: 0,
    });
    // Inset shade (bottom/right #404040) + hilite (top/left white).
    const inset = 0.02;
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - bevel - inset,
      y: bevel,
      w: inset,
      h: ctx.height - bevel * 2,
      fill: { color: "404040" },
      line: { color: "404040", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: bevel,
      y: ctx.height - bevel - inset,
      w: ctx.width - bevel * 2,
      h: inset,
      fill: { color: "404040" },
      line: { color: "404040", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: bevel,
      y: bevel,
      w: ctx.width - bevel * 2 - inset,
      h: inset,
      fill: { color: "FFFFFF" },
      line: { color: "FFFFFF", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: bevel,
      y: bevel,
      w: inset,
      h: ctx.height - bevel * 2 - inset,
      fill: { color: "FFFFFF" },
      line: { color: "FFFFFF", width: 0 },
      rectRadius: 0,
    });
    // Quiet CRT scanlines.
    for (let i = 0; i < 14; i++) {
      slide.addShape(ctx.shapeRoundRect, {
        x: bevel + inset,
        y: 0.5 + i * 0.45,
        w: ctx.width - (bevel + inset) * 2,
        h: 0.012,
        fill: { color: "000000", transparency: 94 },
        line: { color: "000000", width: 0 },
        rectRadius: 0,
      });
    }
    slide.addShape(ctx.shapeRoundRect, {
      x: bevel + inset + 0.02,
      y: bevel + inset + 0.02,
      w: ctx.width - (bevel + inset + 0.02) * 2,
      h: 0.32,
      fill: { color: "000080" },
      line: { color: "000080", width: 0 },
      rectRadius: 0,
    });
    const winBtns = [
      ctx.width - 1.2 - bevel,
      ctx.width - 0.9 - bevel,
      ctx.width - 0.6 - bevel,
    ];
    for (const x of winBtns) {
      slide.addShape(ctx.shapeRoundRect, {
        x,
        y: bevel + inset + 0.08,
        w: 0.22,
        h: 0.18,
        fill: { color: "C0C0C0" },
        line: { color: "FFFFFF", width: 1 },
        rectRadius: 0,
      });
      // Button shade stub (Win95 raised control).
      slide.addShape(ctx.shapeRoundRect, {
        x: x + 0.18,
        y: bevel + inset + 0.1,
        w: 0.03,
        h: 0.14,
        fill: { color: "000000" },
        line: { color: "000000", width: 0 },
        rectRadius: 0,
      });
      slide.addShape(ctx.shapeRoundRect, {
        x: x + 0.02,
        y: bevel + inset + 0.22,
        w: 0.16,
        h: 0.03,
        fill: { color: "000000" },
        line: { color: "000000", width: 0 },
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
    // True double masthead rules + dual inset frame (emerald-editorial-masthead).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.18,
      y: 0.18,
      w: ctx.width - 0.36,
      h: ctx.height - 0.36,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 1.25 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.32,
      y: 0.32,
      w: ctx.width - 0.64,
      h: ctx.height - 0.64,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 0.75 },
      rectRadius: 0,
    });
    // Top double rule (1px / gap / 1px).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.12,
      y: ctx.height * 0.14,
      w: ctx.width * 0.76,
      h: 0.012,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.12,
      y: ctx.height * 0.14 + 0.028,
      w: ctx.width * 0.76,
      h: 0.012,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    // Bottom double rule.
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.12,
      y: ctx.height * 0.86,
      w: ctx.width * 0.76,
      h: 0.012,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.12,
      y: ctx.height * 0.86 + 0.028,
      w: ctx.width * 0.76,
      h: 0.012,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "notebook-tabs") {
    // Dark mat frame + pastel side tabs + binder holes + left margin rule.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.06,
      y: 0.06,
      w: ctx.width - 0.12,
      h: ctx.height - 0.12,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "2D2D2D", width: 2.5 },
      rectRadius: 0.04,
    });
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
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.72,
      y: 0.4,
      w: 0.018,
      h: ctx.height - 0.8,
      fill: { color: ctx.colors.accent, transparency: 55 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "long-table") {
    // Dense speckles + rust border on all; hero-gated outline pill + hairline
    // (long-table-supper HTML ::before/::after are title/closing only).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.12,
      y: 0.12,
      w: ctx.width - 0.24,
      h: ctx.height - 0.24,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.6 },
      rectRadius: 0,
    });
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 6; j++) {
        slide.addShape(ctx.shapeOval, {
          x: 0.35 + i * 1.28,
          y: 0.42 + j * 0.95,
          w: 0.055,
          h: 0.055,
          fill: { color: ctx.colors.accent, transparency: 74 },
          line: { color: ctx.colors.accent, width: 0 },
        });
      }
    }
    if (isHero) {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width - 1.9,
        y: 0.5,
        w: 1.2,
        h: 0.42,
        fill: { color: ctx.colors.bg, transparency: 100 },
        line: { color: ctx.colors.accent, width: 1.75 },
        rectRadius: 0.21,
      });
      slide.addShape(ctx.shapeRoundRect, {
        x: 0.5,
        y: ctx.height - 0.72,
        w: 0.85,
        h: 0.03,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    } else {
      // Quiet supper-club stub when pill ornament is off.
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.margin,
        y: ctx.height - 0.58,
        w: 0.55,
        h: 0.02,
        fill: { color: ctx.colors.accent, transparency: 25 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "paper-ink") {
    // Quiet outer border + crimson top/bottom rules on all; hero-gated
    // corner blot + drop-cap stub (paper-ink-literary).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.16,
      y: 0.16,
      w: ctx.width - 0.32,
      h: ctx.height - 0.32,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 1 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.62,
      w: ctx.width - ctx.margin * 2,
      h: 0.035,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height - 0.68,
      w: ctx.width - ctx.margin * 2,
      h: 0.018,
      fill: { color: ctx.colors.text, transparency: 48 },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    if (isHero) {
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width - ctx.margin - 0.62,
        y: 0.88,
        w: 0.62,
        h: 0.62,
        fill: { color: ctx.colors.accent, transparency: 78 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
      // Drop-cap first-letter stand-in (HTML h1::first-letter crimson).
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.margin,
        y: 1.05,
        w: 0.045,
        h: 0.72,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    } else {
      // Quiet literary accent hairline when hero blot is off.
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.margin,
        y: 0.9,
        w: 0.55,
        h: 0.015,
        fill: { color: ctx.colors.accent, transparency: 35 },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "vintage-editorial") {
    // Quiet outer border on all slides; geometric ring + dots on heroes.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.18,
      y: 0.18,
      w: ctx.width - 0.36,
      h: ctx.height - 0.36,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 1.25 },
      rectRadius: 0.04,
    });
    if (isHero) {
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

  if (theme === "studio") {
    // Acid hairline rails + hard frame (studio-acid).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.06,
      y: 0.06,
      w: ctx.width - 0.12,
      h: ctx.height - 0.12,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.border, width: 1.5 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width,
      h: 0.025,
      fill: { color: ctx.colors.border },
      line: { color: ctx.colors.border, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: ctx.height - 0.025,
      w: ctx.width,
      h: 0.025,
      fill: { color: ctx.colors.border },
      line: { color: ctx.colors.border, width: 0 },
      rectRadius: 0,
    });
    if (isHero) {
      // Acid accent block — title/closing only (matches loud studio-acid type).
      slide.addShape(ctx.shapeRoundRect, {
        x: ctx.width - ctx.margin - 1.35,
        y: ctx.margin * 0.9,
        w: 1.35,
        h: 0.55,
        fill: { color: ctx.colors.accent },
        line: { color: ctx.colors.accent, width: 0 },
        rectRadius: 0,
      });
    }
  }

  if (theme === "grove") {
    // Quiet monograph frame + top hairline + coral stub (grove-monograph).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.12,
      y: 0.12,
      w: ctx.width - 0.24,
      h: ctx.height - 0.24,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "D4CFBF", width: 0.75 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.05,
      y: ctx.height * 0.06,
      w: ctx.width * 0.9,
      h: 0.018,
      fill: { color: "D4CFBF", transparency: 55 },
      line: { color: "D4CFBF", width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.05,
      y: ctx.height * 0.9,
      w: 0.55,
      h: 0.035,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    // Accent2 quote hairline stub (HTML .quote::before stand-in on every slide).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.05,
      y: ctx.height * 0.12,
      w: 0.42,
      h: 0.015,
      fill: { color: ctx.colors.accent2, transparency: 20 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "stencil-tablet") {
    // Hard frame + earth tablet blocks on every slide (stencil-tablet-earth).
    // HTML ::before/::after are not hero-gated.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "000000", width: 2.25 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.77,
      y: ctx.height * 0.1,
      w: ctx.width * 0.18,
      h: ctx.height * 0.22,
      fill: { color: ctx.colors.accent },
      line: { color: "000000", width: 1.75 },
      rectRadius: 0.22,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.05,
      y: ctx.height * 0.72,
      w: ctx.width * 0.14,
      h: ctx.height * 0.18,
      fill: { color: ctx.colors.accent2 },
      line: { color: "000000", width: 1.75 },
      rectRadius: 0.2,
    });
  }

  if (theme === "cartesian") {
    // Draft axes + concentric rings (cartesian-draft).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.06,
      y: ctx.height * 0.1,
      w: ctx.width * 0.88,
      h: 0.015,
      fill: { color: ctx.colors.border, transparency: 35 },
      line: { color: ctx.colors.border, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.06,
      y: ctx.height * 0.1,
      w: 0.015,
      h: ctx.height * 0.8,
      fill: { color: ctx.colors.border, transparency: 35 },
      line: { color: ctx.colors.border, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.78,
      y: ctx.height * 0.08,
      w: 1.4,
      h: 1.4,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "B8B0A4", width: 1 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.74,
      y: ctx.height * 0.04,
      w: 2.0,
      h: 2.0,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: "B8B0A4", width: 0.75 },
    });
  }

  if (theme === "monochrome") {
    // Ledger frame + hairlines (monochrome-ledger).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.08,
      y: 0.08,
      w: ctx.width - 0.16,
      h: ctx.height - 0.16,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 0.85 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.06,
      y: ctx.height * 0.08,
      w: ctx.width * 0.88,
      h: 0.015,
      fill: { color: ctx.colors.text, transparency: 70 },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.06,
      y: ctx.height * 0.9,
      w: 0.42,
      h: 0.015,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    // Mid ledger rule — denser journal feel without fighting body copy.
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width * 0.06,
      y: ctx.height * 0.14,
      w: ctx.width * 0.28,
      h: 0.012,
      fill: { color: ctx.colors.text, transparency: 78 },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "blue-professional") {
    // Soft blue wash band + accent stub + clean frame (blue-professional-clean).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.1,
      y: 0.1,
      w: ctx.width - 0.2,
      h: ctx.height - 0.2,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1 },
      rectRadius: 0.12,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width,
      h: ctx.height * 0.18,
      fill: { color: ctx.colors.accent, transparency: 90 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.55,
      y: 0.48,
      w: 0.65,
      h: 0.055,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0.025,
    });
  }

  if (theme === "broadsheet") {
    // Newsprint masthead + quiet frame + double bottom rules + accent stub.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width,
      h: 0.42,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.14,
      y: 0.14,
      w: ctx.width - 0.28,
      h: ctx.height - 0.28,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 0.85 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height - 0.7,
      w: ctx.width - ctx.margin * 2,
      h: 0.03,
      fill: { color: ctx.colors.text },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height - 0.62,
      w: ctx.width - ctx.margin * 2,
      h: 0.012,
      fill: { color: ctx.colors.accent, transparency: 40 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.58,
      w: 0.6,
      h: 0.035,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "editorial-forest") {
    // Forest inset frame + dual hairlines + larger blush orb.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.26,
      y: 0.26,
      w: ctx.width - 0.52,
      h: ctx.height - 0.52,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.15 },
      rectRadius: 0.06,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.55,
      w: ctx.width - ctx.margin * 2,
      h: 0.025,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.68,
      w: 0.55,
      h: 0.015,
      fill: { color: ctx.colors.accent2, transparency: 25 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 1.85,
      y: ctx.height - 1.75,
      w: 1.2,
      h: 1.2,
      fill: { color: ctx.colors.accent2, transparency: 32 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
  }

  if (theme === "signal") {
    // Quiet briefing border + hairline + outline square + bottom gold stub.
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.22,
      y: 0.22,
      w: ctx.width - 0.44,
      h: ctx.height - 0.44,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.text, width: 1.1 },
      rectRadius: 0.04,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.55,
      w: ctx.width - ctx.margin * 2,
      h: 0.015,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 1.35,
      y: ctx.height - 1.35,
      w: 0.65,
      h: 0.65,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent2, width: 1.25 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height - 0.55,
      w: 0.95,
      h: 0.03,
      fill: { color: ctx.colors.accent2 },
      line: { color: ctx.colors.accent2, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "pastel-dreamy") {
    // Soft cloud ovals + plump inset frame + soft shadow stub (pastel-cloud).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.38,
      y: 0.36,
      w: ctx.width - 0.5,
      h: ctx.height - 0.5,
      fill: { color: ctx.colors.text, transparency: 94 },
      line: { color: ctx.colors.text, width: 0 },
      rectRadius: 0.24,
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.08,
      y: -ctx.height * 0.12,
      w: ctx.width * 0.5,
      h: ctx.height * 0.5,
      fill: { color: ctx.colors.accent2, transparency: 70 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.52,
      y: -ctx.height * 0.02,
      w: ctx.width * 0.48,
      h: ctx.height * 0.45,
      fill: { color: ctx.colors.accent, transparency: 74 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.3,
      y: ctx.height * 0.58,
      w: ctx.width * 0.48,
      h: ctx.height * 0.48,
      fill: { color: ctx.colors.accent2, transparency: 84 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.72,
      y: ctx.height * 0.7,
      w: ctx.width * 0.32,
      h: ctx.height * 0.35,
      fill: { color: ctx.colors.accent, transparency: 86 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.22,
      y: 0.22,
      w: ctx.width - 0.44,
      h: ctx.height - 0.44,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.border, width: 1 },
      rectRadius: 0.22,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height - 0.58,
      w: 0.9,
      h: 0.03,
      fill: { color: ctx.colors.accent, transparency: 25 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0.015,
    });
  }

  if (theme === "vellum") {
    // Soft colorfield wash + teal accent orb (vellum-colorfield).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.15,
      y: ctx.height * 0.05,
      w: ctx.width * 0.7,
      h: ctx.height * 0.7,
      fill: { color: ctx.colors.bg2, transparency: 45 },
      line: { color: ctx.colors.bg2, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 2.4,
      y: ctx.height - 2.2,
      w: 2.0,
      h: 2.0,
      fill: { color: ctx.colors.accent2, transparency: 55 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    if (isHero) {
      slide.addShape(ctx.shapeOval, {
        x: ctx.width * 0.55,
        y: 0.4,
        w: 1.1,
        h: 1.1,
        fill: { color: ctx.colors.accent, transparency: 70 },
        line: { color: ctx.colors.accent, width: 0 },
      });
    }
  }

  if (theme === "editorial-serif") {
    // Accent rule + deco ring + bottom stub (editorial-rule).
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: 0.55,
      w: ctx.width - ctx.margin * 2,
      h: 0.05,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeOval, {
      x: ctx.width - 1.45,
      y: 0.75,
      w: 0.7,
      h: 0.7,
      fill: { color: ctx.colors.bg, transparency: 100 },
      line: { color: ctx.colors.accent, width: 1.5 },
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.margin,
      y: ctx.height - 0.7,
      w: 0.55,
      h: 0.03,
      fill: { color: ctx.colors.accent, transparency: 25 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0,
    });
  }

  if (theme === "playful") {
    // Soft accent blot + rounded candy square + second cloud (soft-bento).
    slide.addShape(ctx.shapeOval, {
      x: ctx.width * 0.75,
      y: -ctx.height * 0.05,
      w: ctx.width * 0.35,
      h: ctx.height * 0.35,
      fill: { color: ctx.colors.accent2, transparency: 68 },
      line: { color: ctx.colors.accent2, width: 0 },
    });
    slide.addShape(ctx.shapeOval, {
      x: -ctx.width * 0.08,
      y: ctx.height * 0.55,
      w: ctx.width * 0.32,
      h: ctx.height * 0.4,
      fill: { color: ctx.colors.accent, transparency: 86 },
      line: { color: ctx.colors.accent, width: 0 },
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: ctx.width - 2.0,
      y: ctx.height - 2.0,
      w: 1.4,
      h: 1.4,
      fill: { color: ctx.colors.accent, transparency: 78 },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0.28,
    });
  }

  if (theme === "corporate") {
    // Clean accent stub + soft top wash (clean-light).
    slide.addShape(ctx.shapeRoundRect, {
      x: 0,
      y: 0,
      w: ctx.width,
      h: ctx.height * 0.22,
      fill: { color: ctx.colors.bg2, transparency: 55 },
      line: { color: ctx.colors.bg2, width: 0 },
      rectRadius: 0,
    });
    slide.addShape(ctx.shapeRoundRect, {
      x: 0.55,
      y: 0.55,
      w: 0.09,
      h: 1.05,
      fill: { color: ctx.colors.accent },
      line: { color: ctx.colors.accent, width: 0 },
      rectRadius: 0.045,
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
