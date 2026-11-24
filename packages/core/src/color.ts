export type RGB = [number, number, number];
export type HSL = [number, number, number];

export function hexToRgb(hex: string): RGB {
  const normalized = hex.trim().replace(/^#/, "");
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  if (!/^[0-9a-f]{6}$/i.test(full)) {
    throw new Error(`Invalid hex color: "${hex}"`);
  }
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function rgbToHex([r, g, b]: RGB): string {
  const toHex = (c: number): string =>
    Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl([r, g, b]: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case rn:
      h = (gn - bn) / d + (gn < bn ? 6 : 0);
      break;
    case gn:
      h = (bn - rn) / d + 2;
      break;
    default:
      h = (rn - gn) / d + 4;
      break;
  }
  h *= 60;
  return [h, s * 100, l * 100];
}

export function hslToRgb([h, s, l]: HSL): RGB {
  const sn = s / 100;
  const ln = l / 100;
  if (sn === 0) {
    const v = Math.round(ln * 255);
    return [v, v, v];
  }
  const hue2rgb = (p: number, q: number, t: number): number => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hn = h / 360;
  const r = hue2rgb(p, q, hn + 1 / 3);
  const g = hue2rgb(p, q, hn);
  const b = hue2rgb(p, q, hn - 1 / 3);
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  const ch = (c: number): number => {
    const cn = c / 255;
    return cn <= 0.03928 ? cn / 12.92 : Math.pow((cn + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
}

export function contrastRatio(hexA: string, hexB: string): number {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

/**
 * Text colour for content drawn on a `fill` (for example a button on the accent).
 * Returns the first theme candidate that reaches WCAG AA (4.5:1), so the theme
 * keeps its look; otherwise the colour with the best contrast, white and
 * near-black included. Non-hex fills (rgba, var) return the first candidate,
 * because their contrast can't be measured here.
 */
export function readableOn(fill: string, candidates: string[]): string {
  const hex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
  if (!hex.test(fill.trim())) return candidates[0] ?? "#ffffff";
  const themed = candidates.filter((c) => hex.test(c.trim()));
  const passing = themed.find((c) => contrastRatio(fill, c) >= 4.5);
  if (passing) return passing;
  const pool = [...themed, "#ffffff", "#111111"];
  return pool.reduce((best, c) => (contrastRatio(fill, c) > contrastRatio(fill, best) ? c : best));
}

/**
 * The accent as an ink for figures (stat numbers, chart bars, streak cells) on `bg`.
 * Keeps the accent when it already reaches `min` contrast; otherwise moves its
 * lightness away from the background, keeping hue and saturation, until it does.
 * Pastel accents stay pastel as fills; figures drawn in them stay visible.
 */
export function accentInk(accent: string, bg: string, min = 3): string {
  const hex = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;
  if (!hex.test(accent.trim()) || !hex.test(bg.trim())) return accent;
  if (contrastRatio(accent, bg) >= min) return accent;
  const darken = relativeLuminance(bg) > 0.18;
  const [, , l0] = rgbToHsl(hexToRgb(accent));
  for (let step = 2; step <= 100; step += 2) {
    const l = darken ? l0 - step : l0 + step;
    if (l < 0 || l > 100) break;
    const candidate = withLightness(accent, l);
    if (contrastRatio(candidate, bg) >= min) return candidate;
  }
  return darken ? "#111111" : "#ffffff";
}

export function withLightness(hex: string, lightness: number): string {
  const [h, s] = rgbToHsl(hexToRgb(hex));
  const clamped = Math.max(0, Math.min(100, lightness));
  return rgbToHex(hslToRgb([h, s, clamped]));
}
