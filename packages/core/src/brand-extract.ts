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
  /**
   * Labels of guarded pairs (same vocabulary as `ContrastAdjustment.pair`) that
   * are STILL below `minRatio` in the returned palette after every fix attempt.
   * Empty when the palette is fully contrast-safe. Callers should disclose this
   * rather than claim success.
   */
  stillFailing: string[];
}

/**
 * Foreground/background pairs the contrast pass guarantees. Both `text` and
 * `muted` carry real body copy in the rendered decks (`.card p`, `.quote-by`,
 * `.stat .label`, timeline captions, subtitles, the attribution footer), so
 * both get the same treatment against both surfaces.
 */
const GUARDED_PAIRS: Array<{ fg: "text" | "muted"; bg: "bg" | "cardBg"; label: string }> = [
  { fg: "text", bg: "bg", label: "text on bg" },
  { fg: "text", bg: "cardBg", label: "text on cardBg" },
  { fg: "muted", bg: "bg", label: "muted on bg" },
  { fg: "muted", bg: "cardBg", label: "muted on cardBg" },
];

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
  // Cap reached without clearing the bar — fall back to whichever extreme
  // actually maximizes contrast against this background. A hardcoded neutral
  // (#1a1a1a / #f5f5f5) is not always the best reachable option: against a
  // mid-gray bg (#808080) #1a1a1a only reaches 4.41:1 while #000000 reaches
  // 5.32:1.
  const blackRatio = contrastRatio("#000000", bgHex);
  const whiteRatio = contrastRatio("#ffffff", bgHex);
  return { color: blackRatio >= whiteRatio ? "#000000" : "#ffffff", adjusted: true };
}

/**
 * Resolve a single foreground role to one final value that satisfies both the
 * `bg` and `cardBg` pairs where possible. Fixes for the two pairs are computed
 * independently from the original color (never sequentially, which would let
 * the second fix undo the first); when they conflict, the `bg` pair wins
 * because it is the dominant surface.
 */
function resolveForeground(original: string, bgHex: string, cardBgHex: string, minRatio: number): string {
  const onBg = fixPair(original, bgHex, minRatio);
  const onCardBg = fixPair(original, cardBgHex, minRatio);
  if (!onBg.adjusted && !onCardBg.adjusted) return original;

  let final: string;
  if (onBg.adjusted && onCardBg.adjusted) {
    const startL = rgbToHsl(hexToRgb(original))[2];
    const bgShift = rgbToHsl(hexToRgb(onBg.color))[2] - startL;
    const cardBgShift = rgbToHsl(hexToRgb(onCardBg.color))[2] - startL;
    const sameDirection = (bgShift >= 0 && cardBgShift >= 0) || (bgShift <= 0 && cardBgShift <= 0);
    if (sameDirection) {
      // Both push the same way — the larger shift satisfies both.
      final = Math.abs(bgShift) >= Math.abs(cardBgShift) ? onBg.color : onCardBg.color;
    } else {
      // Opposite directions; prioritize bg.
      final = onBg.color;
    }
  } else if (onBg.adjusted) {
    final = onBg.color;
  } else {
    final = onCardBg.color;
  }

  // Same "bg wins" priority, applied to the remaining case: never let a fix
  // chosen for cardBg regress a bg pair that was already clearing the bar.
  if (contrastRatio(final, bgHex) < minRatio && contrastRatio(onBg.color, bgHex) >= minRatio) {
    final = onBg.color;
  }
  return final;
}

export function ensureContrastSafe(palette: Palette, minRatio = 4.5): ContrastSafeResult {
  const next: Palette = { ...palette };
  const adjustments: ContrastAdjustment[] = [];

  // `bg` and `cardBg` are never modified, so each foreground role can be
  // resolved independently against the original surfaces.
  for (const role of ["text", "muted"] as const) {
    const original = palette[role];
    const final = resolveForeground(original, palette.bg, palette.cardBg, minRatio);
    if (final === original) continue;
    next[role] = final;
    for (const pair of GUARDED_PAIRS) {
      if (pair.fg !== role) continue;
      adjustments.push({
        pair: pair.label,
        from: original,
        to: final,
        ratio: contrastRatio(final, next[pair.bg]),
      });
    }
  }

  // Final verification against the fully-fixed palette: anything still below
  // the bar is reported rather than silently shipped as "safe".
  const stillFailing = GUARDED_PAIRS.filter(
    (pair) => contrastRatio(next[pair.fg], next[pair.bg]) < minRatio
  ).map((pair) => pair.label);

  return { palette: next, adjustments, stillFailing };
}
