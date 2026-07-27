import { contrastRatio, hexToRgb, rgbToHex, rgbToHsl, withLightness } from "./color.js";
import type { Palette } from "./theme-loader.js";

export interface BrandColorCandidates {
  bg?: string;
  text?: string;
  accent?: string;
}

export interface BrandFontCandidates {
  heading?: string;
  body?: string;
}

// Best-effort heuristic, not a full CSS parser — matches the lightweight-regex
// philosophy already used in skills/deck-design-judge/scripts/deck_metrics.py.
// Only scans top-level :root {} blocks for hex-valued custom properties whose
// name looks like a brand/background/text/accent token.
const ROOT_BLOCK_RE = /:root\s*\{([^}]*)\}/gi;
const VAR_RE = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;

function isHexColor(value: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());
}

export function parseCssVariables(css: string): BrandColorCandidates {
  const vars: Record<string, string> = {};
  ROOT_BLOCK_RE.lastIndex = 0;
  let rootMatch: RegExpExecArray | null;
  while ((rootMatch = ROOT_BLOCK_RE.exec(css))) {
    const body = rootMatch[1] ?? "";
    VAR_RE.lastIndex = 0;
    let varMatch: RegExpExecArray | null;
    while ((varMatch = VAR_RE.exec(body))) {
      const rawName = varMatch[1];
      const rawValue = varMatch[2];
      if (rawName && rawValue) {
        const value = rawValue.trim();
        if (isHexColor(value)) {
          vars[rawName.toLowerCase()] = value;
        }
      }
    }
  }

  const pick = (patterns: RegExp[]): string | undefined => {
    for (const pattern of patterns) {
      const key = Object.keys(vars).find((k) => pattern.test(k));
      if (key) return vars[key];
    }
    return undefined;
  };

  return {
    bg: pick([/^bg$/, /^background$/, /^bg-primary$/, /^background-primary$/, /^bg-base$/]),
    text: pick([/^text$/, /^text-primary$/, /^color-text$/, /^foreground$/]),
    accent: pick([/^accent$/, /^primary$/, /^brand$/, /^color-primary$/, /^brand-primary$/]),
  };
}

// Same best-effort philosophy: scans selector blocks for font-family, tagging
// results as "heading" or "body" based on whether the selector looks like one.
const SELECTOR_BLOCK_RE = /([^{}]+)\{([^}]*)\}/g;
const FONT_FAMILY_RE = /font-family\s*:\s*([^;]+);/i;

function firstFamily(value: string): string {
  const first = value.split(",")[0];
  return first ? first.replace(/["']/g, "").trim() : "";
}

export function parseFontDeclarations(css: string): BrandFontCandidates {
  let heading: string | undefined;
  let body: string | undefined;
  SELECTOR_BLOCK_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = SELECTOR_BLOCK_RE.exec(css))) {
    const selector = (match[1] ?? "").trim().toLowerCase();
    const block = match[2] ?? "";
    const fontMatch = FONT_FAMILY_RE.exec(block);
    if (!fontMatch) continue;
    const fontValue = fontMatch[1] ?? "";
    const family = firstFamily(fontValue);
    if (!family) continue;
    if (!heading && /(^|,)\s*(h1|h2|\.heading|\.title)/.test(selector)) {
      heading = family;
    }
    if (!body && /(^|,)\s*(body|html|\.body-text)/.test(selector)) {
      body = family;
    }
  }
  return { heading, body };
}

const BASE_PALETTE: Palette = {
  bg: "#ffffff",
  bg2: "#f5f5f5",
  text: "#1a1a1a",
  muted: "#6b6b6b",
  accent: "#2563eb",
  accent2: "#7c3aed",
  cardBg: "#f5f5f5",
  border: "#e0e0e0",
};

// Normalize hex color to lowercase 6-digit format
function normalizeHex(hex: string): string {
  return rgbToHex(hexToRgb(hex));
}

export function mapPaletteToRoles(colors: BrandColorCandidates): Palette {
  const bg = normalizeHex(colors.bg ?? BASE_PALETTE.bg);
  const text = normalizeHex(colors.text ?? BASE_PALETTE.text);
  const accent = normalizeHex(colors.accent ?? BASE_PALETTE.accent);

  const bgRgb = hexToRgb(bg);
  const textRgb = hexToRgb(text);
  const bgL = rgbToHsl(bgRgb)[2];
  const textL = rgbToHsl(textRgb)[2];
  const isDarkBg = bgL < 50;
  const clampDelta = (l: number, delta: number): number => Math.max(0, Math.min(100, l + delta));

  return {
    bg,
    bg2: withLightness(bg, clampDelta(bgL, isDarkBg ? 6 : -4)),
    text,
    muted: withLightness(text, clampDelta(textL, isDarkBg ? -25 : 25)),
    accent,
    // No independent second-accent signal from CSS variables alone — reuse accent.
    accent2: accent,
    cardBg: withLightness(bg, clampDelta(bgL, isDarkBg ? 8 : -3)),
    border: withLightness(bg, clampDelta(bgL, isDarkBg ? 16 : -10)),
  };
}

export interface ContrastAdjustment {
  pair: string;
  from: string;
  to: string;
  ratio: number;
}

export interface ContrastSafeResult {
  palette: Palette;
  adjustments: ContrastAdjustment[];
}

const MAX_LIGHTNESS_SHIFT = 40; // percentage points
const STEP = 2;

function fixPair(fgHex: string, bgHex: string, minRatio: number): { color: string; adjusted: boolean } {
  const startRatio = contrastRatio(fgHex, bgHex);
  if (startRatio >= minRatio) {
    return { color: fgHex, adjusted: false };
  }
  const fgRgb = hexToRgb(fgHex);
  const bgRgb = hexToRgb(bgHex);
  const startL = rgbToHsl(fgRgb)[2];
  const bgL = rgbToHsl(bgRgb)[2];
  // Push the foreground away from the background's lightness: if bg is light,
  // darken the fg; if bg is dark, lighten it.
  const direction = bgL >= 50 ? -1 : 1;
  for (let shift = STEP; shift <= MAX_LIGHTNESS_SHIFT; shift += STEP) {
    const l = Math.max(0, Math.min(100, startL + direction * shift));
    const candidate = withLightness(fgHex, l);
    if (contrastRatio(candidate, bgHex) >= minRatio) {
      return { color: candidate, adjusted: true };
    }
  }
  // Cap reached without clearing the bar — fall back to a safe neutral value
  // rather than ship an illegible pairing.
  return { color: bgL >= 50 ? "#1a1a1a" : "#f5f5f5", adjusted: true };
}

export function ensureContrastSafe(palette: Palette, minRatio = 4.5): ContrastSafeResult {
  const next: Palette = { ...palette };
  const originalText = palette.text;

  // Compute fixes for both pairs independently from the original text
  const textOnBgFix = fixPair(originalText, palette.bg, minRatio);
  const textOnCardBgFix = fixPair(originalText, palette.cardBg, minRatio);

  // Decide which adjustment to apply: if both need adjustment, choose based on direction
  let finalText = originalText;
  if (textOnBgFix.adjusted || textOnCardBgFix.adjusted) {
    if (textOnBgFix.adjusted && textOnCardBgFix.adjusted) {
      // Both need adjustment; determine if they're in the same direction
      const textL = rgbToHsl(hexToRgb(originalText))[2];

      // Extract lightness of the two fixes
      const bgFixL = rgbToHsl(hexToRgb(textOnBgFix.color))[2];
      const cardBgFixL = rgbToHsl(hexToRgb(textOnCardBgFix.color))[2];

      // Check if fixes push in the same direction
      const bgShift = bgFixL - textL;
      const cardBgShift = cardBgFixL - textL;
      const sameDirection = (bgShift >= 0 && cardBgShift >= 0) || (bgShift <= 0 && cardBgShift <= 0);

      if (sameDirection) {
        // Both push in same direction; use the one with larger shift
        finalText = Math.abs(bgShift) >= Math.abs(cardBgShift) ? textOnBgFix.color : textOnCardBgFix.color;
      } else {
        // Opposite directions; prioritize bg
        finalText = textOnBgFix.color;
      }
    } else if (textOnBgFix.adjusted) {
      finalText = textOnBgFix.color;
    } else {
      finalText = textOnCardBgFix.color;
    }

    next.text = finalText;
  }

  // Recompute adjustments from the final palette
  const pairs: Array<[keyof Palette, keyof Palette, string]> = [
    ["text", "bg", "text on bg"],
    ["text", "cardBg", "text on cardBg"],
  ];

  const adjustments: ContrastAdjustment[] = [];
  // Record adjustments only if text was actually changed from the original
  if (finalText !== originalText) {
    for (const [, bgKey, label] of pairs) {
      const bgColor = next[bgKey];
      const ratio = contrastRatio(finalText, bgColor);
      adjustments.push({
        pair: label,
        from: originalText,
        to: finalText,
        ratio,
      });
    }
  }

  return { palette: next, adjustments };
}
