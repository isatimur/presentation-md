import type { ResolvedTheme } from "@presentation-md/core";
import type { PptxShapeArg } from "./pptx.js";
import { resolveColor } from "./color.js";
import { parseFontFamily, isBoldWeight } from "./font.js";

/**
 * Derived, PPTX-ready values for a theme: dimensions in inches, opaque hex
 * colors, and font faces. Built once per deck and shared by every layout mapper.
 */
export interface ExportContext {
  /** Resolved theme name — drives optional craft chrome in PPTX. */
  themeName: string;
  /** Deck company / brand — candy marquee and chrome copy. */
  company?: string;
  /** Deck title — marquee fallback when company is absent. */
  title?: string;
  /** Optional custom candy ticker unit. */
  marquee?: string;
  /** Slide width in inches (from theme geometry.slideWidth, default 13.333"). */
  width: number;
  /** Slide height in inches (16:9 of width). */
  height: number;
  /** Outer content margin in inches. */
  margin: number;
  colors: {
    bg: string;
    bg2: string;
    text: string;
    muted: string;
    accent: string;
    accent2: string;
    cardBg: string;
    border: string;
    /** Body copy on card fills when dual-surface polarity flips muted. */
    cardMuted: string;
    /** Heading/icon ink on card fills (defaults to text). */
    cardText: string;
    /** Fill for accent-emphasized comparison / bento hero panels. */
    emphasisFill: string;
    /** Text on emphasisFill panels. */
    emphasisText: string;
  };
  fonts: {
    heading: string;
    body: string;
    headingBold: boolean;
  };
  /** pptxgenjs ShapeType handles, supplied from the presentation instance. */
  shapeRoundRect: PptxShapeArg;
  shapeOval: PptxShapeArg;
  shapeBlockArc: PptxShapeArg;
  warn: (msg: string) => void;
}

/**
 * Dual-surface themes where HTML craft flips card polarity vs roles.muted.
 * Keeps PPTX card body/emphasis fills readable without needing CSS.
 */
const DUAL_SURFACE: Record<
  string,
  Partial<{
    cardMuted: string;
    cardText: string;
    /** "accent" | "bg2" | explicit hex matching HTML comparison/bento fills. */
    emphasisFill: "accent" | "bg2" | `#${string}`;
    emphasisText: string;
  }>
> = {
  mat: { cardMuted: "#454038", cardText: "#1E2820", emphasisFill: "accent", emphasisText: "#1a1208" },
  "bold-signal": {
    cardMuted: "#e8e5e4",
    cardText: "#ffffff",
    // HTML: color-mix(accent 55%, #1a1a1a) — full #FF5722 fails white AA
    emphasisFill: "#983c1e",
    emphasisText: "#ffffff",
  },
  "creative-voltage": { cardMuted: "#ebebf0", cardText: "#ffffff" },
  "soft-editorial": { cardMuted: "#4A4338", cardText: "#2A241B" },
  studio: { emphasisFill: "accent", emphasisText: "#1c1c1c" },
  "brutalist-acid": { emphasisFill: "accent", emphasisText: "#1c1c1c" },
  "electric-studio": { cardMuted: "#5a5a5a", cardText: "#0a0a0a" },
  "daisy-days": { emphasisFill: "#b8f0e8", emphasisText: "#2d2d2d" },
  "raw-grid": { emphasisFill: "accent", emphasisText: "#0a0a0a" },
  "broadside": { emphasisFill: "accent", emphasisText: "#111111" },
  "neo-grid-bold": { emphasisFill: "accent", emphasisText: "#0a0a0a" },
  "block-frame": { emphasisFill: "accent", emphasisText: "#0a0a0a" },
  // HTML uses accent2 amber + ink (cobalt accent fails dark text)
  "peoples-platform": { emphasisFill: "#F2A03A", emphasisText: "#1a1a1a" },
  // HTML uses accent2 magenta + white (sienna accent fails dark text)
  "stencil-tablet": { emphasisFill: "#C73B7A", emphasisText: "#ffffff" },
  "retro-zine": { cardMuted: "#3a342c", cardText: "#1A1A1A" },
  "emerald-editorial": { cardMuted: "#2a3a28", cardText: "#1a1a17" },
  // Loud craft: HTML uses color-mix / accent2 — explicit hex mirrors AA fills.
  "candy-pop": { emphasisFill: "#2566ad", emphasisText: "#ffffff" },
  vaporwave: { emphasisFill: "#ff85dd", emphasisText: "#1a0533" },
  "neon-noir": { emphasisFill: "#b9236f", emphasisText: "#ffffff" },
  "retro-arcade": { emphasisFill: "#b900ba", emphasisText: "#ffffff" },
  "genz-bento": { emphasisFill: "#b6f542", emphasisText: "#0f0f1a" },
  "y2k-aero": { emphasisFill: "#dff6b8", emphasisText: "#0c4a6e" },
  bauhaus: { emphasisFill: "accent", emphasisText: "#0d0d0d" },
  "creative-mode": { emphasisFill: "accent", emphasisText: "#111111" },
  "bold-poster": { emphasisFill: "accent", emphasisText: "#ffffff" },
  // Coral mix(accent 88%, white) + ink; mint accent + ink
  coral: { emphasisFill: "#eb7070", emphasisText: "#1a1a1a" },
  "split-pastel": { emphasisFill: "accent", emphasisText: "#1a1a1a" },
  // Ultra-luxury nocturnal — gold panels need near-black ink for AA
  "luxury-minimalist": {
    cardMuted: "#c4bfb6",
    cardText: "#f9f6ef",
    emphasisFill: "accent",
    emphasisText: "#0f0d0c",
  },
  "kinetic-wrapped": {
    cardMuted: "#c8c8c8",
    cardText: "#ffffff",
    emphasisFill: "accent",
    emphasisText: "#0a0a0a",
  },
};

export interface ContextShapes {
  roundRect: PptxShapeArg;
  oval: PptxShapeArg;
  blockArc: PptxShapeArg;
}

const PX_PER_INCH = 96;

function parsePxToInches(value: string, fallback: number): number {
  const m = value.match(/([\d.]+)\s*px/i);
  if (m) {
    const px = parseFloat(m[1]!);
    if (Number.isFinite(px) && px > 0) return px / PX_PER_INCH;
  }
  const n = parseFloat(value);
  return Number.isFinite(n) && n > 0 ? n / PX_PER_INCH : fallback;
}

export interface BuildContextMeta {
  company?: string;
  title?: string;
  marquee?: string;
}

export function buildContext(
  theme: ResolvedTheme,
  shapes: ContextShapes,
  warn: (msg: string) => void,
  meta: BuildContextMeta = {}
): ExportContext {
  const width = parsePxToInches(theme.geometry.slideWidth, 13.333);
  const height = (width * 9) / 16;
  const bg = resolveColor(theme.palette.bg);

  const dual = DUAL_SURFACE[theme.name] ?? {};
  const accent = resolveColor(theme.palette.accent, theme.palette.bg);
  const bg2 = resolveColor(theme.palette.bg2, theme.palette.bg);
  const text = resolveColor(theme.palette.text, theme.palette.bg);
  const muted = resolveColor(theme.palette.muted, theme.palette.bg);
  const emphasisFillToken = dual.emphasisFill;
  const emphasisFill =
    emphasisFillToken == null
      ? bg2
      : emphasisFillToken === "accent"
        ? accent
        : emphasisFillToken === "bg2"
          ? bg2
          : resolveColor(emphasisFillToken, theme.palette.bg);

  return {
    themeName: theme.name,
    company: typeof meta.company === "string" ? meta.company.trim() || undefined : undefined,
    title: typeof meta.title === "string" ? meta.title.trim() || undefined : undefined,
    marquee: typeof meta.marquee === "string" ? meta.marquee.trim() || undefined : undefined,
    width,
    height,
    margin: Math.min(0.6, width * 0.05),
    colors: {
      bg,
      bg2,
      text,
      muted,
      accent,
      accent2: resolveColor(theme.palette.accent2, theme.palette.bg),
      cardBg: resolveColor(theme.palette.cardBg, theme.palette.bg),
      border: resolveColor(theme.palette.border, theme.palette.bg),
      cardMuted: dual.cardMuted ?? muted,
      cardText: dual.cardText ?? text,
      emphasisFill,
      emphasisText: dual.emphasisText ?? text,
    },
    fonts: {
      heading: parseFontFamily(theme.typography.headingFont),
      body: parseFontFamily(theme.typography.bodyFont),
      headingBold: isBoldWeight(theme.typography.headingWeight),
    },
    shapeRoundRect: shapes.roundRect,
    shapeOval: shapes.oval,
    shapeBlockArc: shapes.blockArc,
    warn,
  };
}
