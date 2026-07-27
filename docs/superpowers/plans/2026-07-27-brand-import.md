# Brand-Aware Style Generation from URL/CSS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate a presentation-skill-pack theme package from a brand's URL or a local CSS file — extracting colors and fonts, mapping them to the theme system's 8 semantic roles, and applying a WCAG contrast-safety pass — exposed as both a `create-theme` CLI flag and an MCP tool.

**Architecture:** Pure extraction/mapping/contrast math lives in `packages/core` (browser-bundled via Studio, so it must stay dependency-free). Node-only orchestration — bounded HTTP fetch, the Playwright computed-style fallback, and template scaffolding — lives in `packages/create-theme` (already Node-only, zero other-package dependents). `packages/mcp-server` adds a thin tool wrapper around `create-theme`'s exports.

**Tech Stack:** TypeScript, vitest, Commander (existing `create-theme` CLI), native `fetch`, Playwright (on-demand runtime install, devDependency only — same pattern as `skills/presentation-generator/scripts/export-pdf.sh`), Mustache (existing template pipeline).

## Global Constraints

- `packages/core` must not gain new runtime dependencies or Node-only APIs — it's imported by `packages/studio` (`packages/studio/src/render/renderDeck.ts`, `themes.ts`), which Vite-bundles for the browser.
- Playwright is a `devDependency` of `packages/create-theme` only (needed for `tsc` type-checking), never a runtime `dependency` — it's installed on demand into `packages/create-theme/node_modules` at first use, matching `skills/presentation-generator/scripts/export-pdf.sh`'s existing pattern. This keeps `npm install` light for consumers who never touch brand import.
- Contrast-safety pass targets WCAG AA (ratio ≥ 4.5) and caps adjustment at 40 percentage points of HSL lightness shift before falling back to a safe neutral ink/paper value — per `docs/superpowers/specs/2026-07-27-brand-import-design.md`.
- Every extraction failure (nothing found, fetch error, oversized response, too many redirects) throws a clear error — never writes a partial or garbage theme.
- All new hex color output is lowercase 6-digit (`#rrggbb`), matching `isHexColor`'s validation format.
- Palette type (8 roles: `bg`, `bg2`, `text`, `muted`, `accent`, `accent2`, `cardBg`, `border`) is `packages/core/src/theme-loader.ts`'s existing `Palette` interface — reuse it, don't redefine it.

---

### Task 1: Color math primitives

**Files:**
- Create: `packages/core/src/color.ts`
- Test: `packages/core/tests/color.test.ts`

**Interfaces:**
- Consumes: nothing (pure, no imports from this codebase).
- Produces (consumed by Task 2):
  - `export type RGB = [number, number, number]`
  - `export type HSL = [number, number, number]`
  - `export function hexToRgb(hex: string): RGB` — throws on invalid input
  - `export function rgbToHex(rgb: RGB): string` — always lowercase 6-digit
  - `export function rgbToHsl(rgb: RGB): HSL` — h: 0-360, s/l: 0-100
  - `export function hslToRgb(hsl: HSL): RGB`
  - `export function relativeLuminance(hex: string): number`
  - `export function contrastRatio(hexA: string, hexB: string): number` — rounded to 2 decimals
  - `export function withLightness(hex: string, lightness: number): string` — clamps 0-100, preserves hue/saturation

- [ ] **Step 1: Write the failing test**

Create `packages/core/tests/color.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  relativeLuminance,
  contrastRatio,
  withLightness,
} from "../src/color.js";

describe("hexToRgb / rgbToHex", () => {
  it("parses 6-digit hex", () => {
    expect(hexToRgb("#ff8800")).toEqual([255, 136, 0]);
  });

  it("parses 3-digit shorthand hex", () => {
    expect(hexToRgb("#fff")).toEqual([255, 255, 255]);
  });

  it("throws on invalid input", () => {
    expect(() => hexToRgb("not-a-color")).toThrow(/invalid hex color/i);
  });

  it("round-trips rgb -> hex as lowercase 6-digit", () => {
    expect(rgbToHex([255, 136, 0])).toBe("#ff8800");
    expect(rgbToHex([0, 0, 0])).toBe("#000000");
  });
});

describe("rgbToHsl / hslToRgb", () => {
  it("converts pure red correctly", () => {
    const [h, s, l] = rgbToHsl([255, 0, 0]);
    expect(h).toBeCloseTo(0, 0);
    expect(s).toBeCloseTo(100, 0);
    expect(l).toBeCloseTo(50, 0);
  });

  it("round-trips rgb -> hsl -> rgb within rounding tolerance", () => {
    const original: [number, number, number] = [34, 139, 230];
    const [r, g, b] = hslToRgb(rgbToHsl(original));
    expect(r).toBeCloseTo(original[0], -1);
    expect(g).toBeCloseTo(original[1], -1);
    expect(b).toBeCloseTo(original[2], -1);
  });
});

describe("relativeLuminance / contrastRatio", () => {
  it("gives white the maximum luminance and black the minimum", () => {
    expect(relativeLuminance("#ffffff")).toBeCloseTo(1, 2);
    expect(relativeLuminance("#000000")).toBeCloseTo(0, 2);
  });

  it("computes the maximum WCAG contrast ratio for black on white", () => {
    expect(contrastRatio("#ffffff", "#000000")).toBe(21);
  });

  it("computes a ratio of 1 for identical colors", () => {
    expect(contrastRatio("#336699", "#336699")).toBe(1);
  });

  it("is symmetric", () => {
    expect(contrastRatio("#ffffff", "#333333")).toBe(contrastRatio("#333333", "#ffffff"));
  });
});

describe("withLightness", () => {
  it("produces a lighter color at higher lightness", () => {
    const lightened = withLightness("#cc0000", 90);
    expect(relativeLuminance(lightened)).toBeGreaterThan(relativeLuminance("#cc0000"));
  });

  it("clamps lightness to [0, 100]", () => {
    expect(withLightness("#336699", 150)).toBe("#ffffff");
    expect(withLightness("#336699", -50)).toBe("#000000");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/core && npx vitest run tests/color.test.ts`
Expected: FAIL with "Cannot find module '../src/color.js'" (file doesn't exist yet).

- [ ] **Step 3: Write minimal implementation**

Create `packages/core/src/color.ts`:

```ts
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

export function withLightness(hex: string, lightness: number): string {
  const [h, s] = rgbToHsl(hexToRgb(hex));
  const clamped = Math.max(0, Math.min(100, lightness));
  return rgbToHex(hslToRgb([h, s, clamped]));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/core && npx vitest run tests/color.test.ts`
Expected: PASS, all 10 tests green.

- [ ] **Step 5: Commit**

```bash
git add packages/core/src/color.ts packages/core/tests/color.test.ts
git commit -m "feat(core): add color math primitives for brand-import contrast pass"
```

---

### Task 2: Brand CSS parsing, role mapping, and contrast-safety pass

**Files:**
- Create: `packages/core/src/brand-extract.ts`
- Modify: `packages/core/src/index.ts`
- Test: `packages/core/tests/brand-extract.test.ts`

**Interfaces:**
- Consumes: `Palette` from `./theme-loader.js` (existing); `contrastRatio`, `rgbToHsl`, `hexToRgb`, `withLightness`, `relativeLuminance` from `./color.js` (Task 1).
- Produces (consumed by Task 5):
  - `export interface BrandColorCandidates { bg?: string; text?: string; accent?: string; }`
  - `export interface BrandFontCandidates { heading?: string; body?: string; }`
  - `export function parseCssVariables(css: string): BrandColorCandidates`
  - `export function parseFontDeclarations(css: string): BrandFontCandidates`
  - `export function mapPaletteToRoles(colors: BrandColorCandidates): Palette`
  - `export interface ContrastAdjustment { pair: string; from: string; to: string; ratio: number; }`
  - `export interface ContrastSafeResult { palette: Palette; adjustments: ContrastAdjustment[]; }`
  - `export function ensureContrastSafe(palette: Palette, minRatio?: number): ContrastSafeResult`
  - All re-exported from `packages/core/src/index.ts`.

- [ ] **Step 1: Write the failing test**

Create `packages/core/tests/brand-extract.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  parseCssVariables,
  parseFontDeclarations,
  mapPaletteToRoles,
  ensureContrastSafe,
} from "../src/brand-extract.js";
import { contrastRatio } from "../src/color.js";

describe("parseCssVariables", () => {
  it("extracts bg/text/accent from common :root variable names", () => {
    const css = `:root {
      --bg: #0a0a0a;
      --text-primary: #f5f5f5;
      --brand-primary: #ff6600;
    }`;
    expect(parseCssVariables(css)).toEqual({
      bg: "#0a0a0a",
      text: "#f5f5f5",
      accent: "#ff6600",
    });
  });

  it("ignores non-color variable values", () => {
    const css = `:root { --bg: #111111; --spacing-unit: 8px; }`;
    expect(parseCssVariables(css)).toEqual({ bg: "#111111" });
  });

  it("returns an empty object when there is no :root block", () => {
    expect(parseCssVariables("body { color: red; }")).toEqual({});
  });

  it("supports 3-digit hex shorthand", () => {
    const css = `:root { --accent: #f80; }`;
    expect(parseCssVariables(css)).toEqual({ accent: "#f80" });
  });
});

describe("parseFontDeclarations", () => {
  it("extracts heading and body fonts from their selectors", () => {
    const css = `
      h1, h2 { font-family: 'Poppins', sans-serif; }
      body { font-family: 'Inter', sans-serif; }
    `;
    expect(parseFontDeclarations(css)).toEqual({ heading: "Poppins", body: "Inter" });
  });

  it("returns an empty object when no font-family declarations exist", () => {
    expect(parseFontDeclarations("body { margin: 0; }")).toEqual({});
  });
});

describe("mapPaletteToRoles", () => {
  it("fills in all 8 roles from a partial color candidate set", () => {
    const palette = mapPaletteToRoles({ bg: "#0a0a0a", text: "#fafafa", accent: "#22c55e" });
    expect(palette.bg).toBe("#0a0a0a");
    expect(palette.text).toBe("#fafafa");
    expect(palette.accent).toBe("#22c55e");
    expect(palette.bg2).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette.cardBg).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette.border).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette.muted).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette.accent2).toBe("#22c55e");
  });

  it("falls back to a sensible base palette when nothing is found", () => {
    const palette = mapPaletteToRoles({});
    expect(palette.bg).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette.text).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe("ensureContrastSafe", () => {
  it("leaves an already-safe palette unchanged", () => {
    const palette = mapPaletteToRoles({ bg: "#0a0a0a", text: "#fafafa", accent: "#22c55e" });
    const result = ensureContrastSafe(palette);
    expect(result.adjustments).toEqual([]);
    expect(result.palette).toEqual(palette);
  });

  it("adjusts low-contrast text against the background and reports it", () => {
    const palette = mapPaletteToRoles({ bg: "#ffffff", text: "#e0e0e0" });
    const result = ensureContrastSafe(palette);
    expect(result.adjustments.length).toBeGreaterThan(0);
    expect(contrastRatio(result.palette.text, result.palette.bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("names the adjusted pair and preserves a valid hex color", () => {
    const palette = mapPaletteToRoles({ bg: "#ffffff", text: "#e0e0e0" });
    const result = ensureContrastSafe(palette);
    const bgAdjustment = result.adjustments.find((a) => a.pair === "text on bg");
    expect(bgAdjustment).toBeDefined();
    expect(bgAdjustment!.to).toMatch(/^#[0-9a-f]{6}$/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/core && npx vitest run tests/brand-extract.test.ts`
Expected: FAIL with "Cannot find module '../src/brand-extract.js'".

- [ ] **Step 3: Write minimal implementation**

Create `packages/core/src/brand-extract.ts`:

```ts
import { contrastRatio, hexToRgb, rgbToHsl, withLightness } from "./color.js";
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
    const body = rootMatch[1];
    VAR_RE.lastIndex = 0;
    let varMatch: RegExpExecArray | null;
    while ((varMatch = VAR_RE.exec(body))) {
      const [, rawName, rawValue] = varMatch;
      const value = rawValue.trim();
      if (isHexColor(value)) {
        vars[rawName.toLowerCase()] = value;
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
const SELECTOR_BLOCK_RE = /(^|\})\s*([^{}]+)\{([^}]*)\}/g;
const FONT_FAMILY_RE = /font-family\s*:\s*([^;]+);/i;

function firstFamily(value: string): string {
  return value.split(",")[0]?.replace(/["']/g, "").trim() ?? "";
}

export function parseFontDeclarations(css: string): BrandFontCandidates {
  let heading: string | undefined;
  let body: string | undefined;
  SELECTOR_BLOCK_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = SELECTOR_BLOCK_RE.exec(css))) {
    const selector = match[2].trim().toLowerCase();
    const block = match[3];
    const fontMatch = FONT_FAMILY_RE.exec(block);
    if (!fontMatch) continue;
    const family = firstFamily(fontMatch[1]);
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

export function mapPaletteToRoles(colors: BrandColorCandidates): Palette {
  const bg = colors.bg ?? BASE_PALETTE.bg;
  const text = colors.text ?? BASE_PALETTE.text;
  const accent = colors.accent ?? BASE_PALETTE.accent;

  const bgL = rgbToHsl(hexToRgb(bg))[2];
  const textL = rgbToHsl(hexToRgb(text))[2];
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
  const startL = rgbToHsl(hexToRgb(fgHex))[2];
  const bgL = rgbToHsl(hexToRgb(bgHex))[2];
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
  const adjustments: ContrastAdjustment[] = [];
  const next: Palette = { ...palette };

  const pairs: Array<[keyof Palette, keyof Palette, string]> = [
    ["text", "bg", "text on bg"],
    ["text", "cardBg", "text on cardBg"],
  ];

  for (const [fgKey, bgKey, label] of pairs) {
    const from = next[fgKey];
    const result = fixPair(from, next[bgKey], minRatio);
    if (result.adjusted) {
      next[fgKey] = result.color;
      adjustments.push({
        pair: label,
        from,
        to: result.color,
        ratio: contrastRatio(result.color, next[bgKey]),
      });
    }
  }

  return { palette: next, adjustments };
}
```

- [ ] **Step 4: Export the new functions from `packages/core/src/index.ts`**

Modify `packages/core/src/index.ts` — add after the existing `theme-loader` export block:

```ts
export {
  parseCssVariables,
  parseFontDeclarations,
  mapPaletteToRoles,
  ensureContrastSafe,
} from "./brand-extract.js";
export type {
  BrandColorCandidates,
  BrandFontCandidates,
  ContrastAdjustment,
  ContrastSafeResult,
} from "./brand-extract.js";
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd packages/core && npx vitest run tests/brand-extract.test.ts && npx tsc -p tsconfig.json --noEmit`
Expected: all tests PASS, typecheck clean.

- [ ] **Step 6: Commit**

```bash
git add packages/core/src/brand-extract.ts packages/core/src/index.ts packages/core/tests/brand-extract.test.ts
git commit -m "feat(core): add brand CSS parsing, role mapping, and contrast-safety pass"
```

---

### Task 3: URL fetch and hostname-slug utilities

**Files:**
- Create: `packages/create-theme/src/fetch-css.ts`
- Create: `packages/create-theme/src/name-from-url.ts`
- Test: `packages/create-theme/tests/fetch-css.test.ts`
- Test: `packages/create-theme/tests/name-from-url.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks (Node-only, no `@presentation-skill-pack/core` dependency here).
- Produces (consumed by Task 5 and Task 7):
  - `export async function fetchText(url: string, redirectsLeft?: number): Promise<string>`
  - `export async function fetchStylesheetsFromUrl(url: string): Promise<string>`
  - `export function deriveNameFromUrl(url: string): string` — throws if the derived slug is invalid

- [ ] **Step 1: Write the failing tests**

Create `packages/create-theme/tests/fetch-css.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchText, fetchStylesheetsFromUrl } from "../src/fetch-css.js";

function mockResponse(opts: {
  ok?: boolean;
  status?: number;
  text: string;
  headers?: Record<string, string>;
}): Response {
  return {
    ok: opts.ok ?? true,
    status: opts.status ?? 200,
    headers: new Headers(opts.headers ?? {}),
    arrayBuffer: async () => new TextEncoder().encode(opts.text).buffer,
  } as unknown as Response;
}

describe("fetchText", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the response body as text", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse({ text: "body { color: red; }" })
    );
    const result = await fetchText("https://example.com/style.css");
    expect(result).toBe("body { color: red; }");
  });

  it("rejects non-http(s) schemes without calling fetch", async () => {
    await expect(fetchText("file:///etc/passwd")).rejects.toThrow(/unsupported url scheme/i);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("follows a redirect via the Location header", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(
        mockResponse({ ok: false, status: 302, text: "", headers: { location: "https://example.com/final.css" } })
      )
      .mockResolvedValueOnce(mockResponse({ text: "h1 { font-family: Georgia; }" }));
    const result = await fetchText("https://example.com/style.css");
    expect(result).toBe("h1 { font-family: Georgia; }");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("throws after exceeding the redirect limit", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    for (let i = 0; i < 10; i++) {
      fetchMock.mockResolvedValueOnce(
        mockResponse({ ok: false, status: 302, text: "", headers: { location: "https://example.com/next.css" } })
      );
    }
    await expect(fetchText("https://example.com/style.css")).rejects.toThrow(/too many redirects/i);
  });

  it("throws on a non-ok response", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse({ ok: false, status: 404, text: "" })
    );
    await expect(fetchText("https://example.com/missing.css")).rejects.toThrow(/404/);
  });

  it("throws when the response exceeds the byte cap", async () => {
    const huge = "a".repeat(6 * 1024 * 1024);
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse({ text: huge }));
    await expect(fetchText("https://example.com/big.css")).rejects.toThrow(/too large/i);
  });
});

describe("fetchStylesheetsFromUrl", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches every linked stylesheet and concatenates their CSS", async () => {
    const html = `<html><head>
      <link rel="stylesheet" href="/a.css">
      <link rel="stylesheet" href="https://cdn.example.com/b.css">
    </head></html>`;
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(mockResponse({ text: html }))
      .mockResolvedValueOnce(mockResponse({ text: ":root { --bg: #111111; }" }))
      .mockResolvedValueOnce(mockResponse({ text: ":root { --accent: #ff0000; }" }));

    const css = await fetchStylesheetsFromUrl("https://example.com/");
    expect(css).toContain("--bg: #111111");
    expect(css).toContain("--accent: #ff0000");
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("skips a stylesheet that fails to fetch instead of aborting", async () => {
    const html = `<link rel="stylesheet" href="/broken.css"><link rel="stylesheet" href="/ok.css">`;
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(mockResponse({ text: html }))
      .mockResolvedValueOnce(mockResponse({ ok: false, status: 500, text: "" }))
      .mockResolvedValueOnce(mockResponse({ text: "body { font-family: Georgia; }" }));

    const css = await fetchStylesheetsFromUrl("https://example.com/");
    expect(css).toContain("Georgia");
  });

  it("returns an empty string when there are no linked stylesheets", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse({ text: "<html></html>" }));
    const css = await fetchStylesheetsFromUrl("https://example.com/");
    expect(css).toBe("");
  });
});
```

Create `packages/create-theme/tests/name-from-url.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { deriveNameFromUrl } from "../src/name-from-url.js";

describe("deriveNameFromUrl", () => {
  it("converts a hostname to a kebab-case slug", () => {
    expect(deriveNameFromUrl("https://acme.com")).toBe("acme-com");
  });

  it("strips a leading www.", () => {
    expect(deriveNameFromUrl("https://www.acme.io/pricing")).toBe("acme-io");
  });

  it("throws when the resulting slug is invalid (e.g. starts with a digit)", () => {
    expect(() => deriveNameFromUrl("https://123.com")).toThrow(/could not derive/i);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd packages/create-theme && npx vitest run tests/fetch-css.test.ts tests/name-from-url.test.ts`
Expected: FAIL — modules don't exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `packages/create-theme/src/fetch-css.ts`:

```ts
const MAX_BYTES = 5 * 1024 * 1024;
const MAX_REDIRECTS = 5;
const TIMEOUT_MS = 10_000;

export async function fetchText(url: string, redirectsLeft = MAX_REDIRECTS): Promise<string> {
  if (!/^https?:\/\//i.test(url)) {
    throw new Error(`Unsupported URL scheme: ${url}`);
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res: Response;
  try {
    res = await fetch(url, { redirect: "manual", signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
  if (res.status >= 300 && res.status < 400) {
    const location = res.headers.get("location");
    if (!location) throw new Error(`Redirect with no Location header: ${url}`);
    if (redirectsLeft <= 0) throw new Error(`Too many redirects fetching ${url}`);
    return fetchText(new URL(location, url).toString(), redirectsLeft - 1);
  }
  if (!res.ok) {
    throw new Error(`Fetch failed (${res.status}): ${url}`);
  }
  const buf = await res.arrayBuffer();
  if (buf.byteLength > MAX_BYTES) {
    throw new Error(`Response too large (${buf.byteLength} bytes) fetching ${url}`);
  }
  return new TextDecoder("utf-8").decode(buf);
}

export async function fetchStylesheetsFromUrl(url: string): Promise<string> {
  const html = await fetchText(url);
  const hrefs = [...html.matchAll(/<link\b[^>]*rel=["']?stylesheet["']?[^>]*>/gi)]
    .map((m) => m[0].match(/href=["']([^"']+)["']/i)?.[1])
    .filter((h): h is string => !!h)
    .map((h) => new URL(h, url).toString());

  const cssParts: string[] = [];
  for (const href of hrefs) {
    try {
      cssParts.push(await fetchText(href));
    } catch {
      // One bad stylesheet shouldn't abort the whole extraction.
    }
  }
  return cssParts.join("\n");
}
```

Create `packages/create-theme/src/name-from-url.ts`:

```ts
const NAME_RE = /^[a-z][a-z0-9-]*$/;

export function deriveNameFromUrl(url: string): string {
  const hostname = new URL(url).hostname.replace(/^www\./, "");
  const slug = hostname.replace(/\./g, "-").toLowerCase();
  if (!NAME_RE.test(slug)) {
    throw new Error(
      `Could not derive a valid theme name from "${url}" (got "${slug}"). Pass a name explicitly.`
    );
  }
  return slug;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd packages/create-theme && npx vitest run tests/fetch-css.test.ts tests/name-from-url.test.ts`
Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/create-theme/src/fetch-css.ts packages/create-theme/src/name-from-url.ts \
        packages/create-theme/tests/fetch-css.test.ts packages/create-theme/tests/name-from-url.test.ts
git commit -m "feat(create-theme): add bounded URL fetch and hostname-slug utilities"
```

---

### Task 4: Playwright computed-style fallback

**Files:**
- Create: `packages/create-theme/src/playwright-fallback.ts`
- Create: `packages/create-theme/fixtures/brand-site.html`
- Modify: `packages/create-theme/package.json`
- Test: `packages/create-theme/tests/playwright-fallback.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces (consumed by Task 5):
  - `export interface ComputedStyleResult { bg?: string; text?: string; accent?: string; headingFont?: string; bodyFont?: string; }`
  - `export async function extractComputedStyles(url: string): Promise<ComputedStyleResult>`

- [ ] **Step 1: Add the fixture and the failing test**

Create `packages/create-theme/fixtures/brand-site.html`:

```html
<!doctype html>
<html>
<head>
<style>
  body { background-color: #101820; color: #f2f2f2; font-family: Georgia, serif; margin: 0; }
  h1 { font-family: 'Helvetica Neue', Arial, sans-serif; }
  .btn { background-color: #ff5a36; color: #ffffff; display: inline-block; padding: 8px 16px; }
</style>
</head>
<body>
  <h1>Acme Corp</h1>
  <button class="btn">Get started</button>
</body>
</html>
```

Create `packages/create-theme/tests/playwright-fallback.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { extractComputedStyles } from "../src/playwright-fallback.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURE = "file://" + join(__dirname, "..", "fixtures", "brand-site.html");

// Skipped in CI: this test installs Playwright + Chromium on first run
// (matches skills/presentation-generator/scripts/export-pdf.sh's on-demand
// pattern), which is slow and adds flakiness risk to the CI matrix. Run
// locally with `npx vitest run tests/playwright-fallback.test.ts` before
// releases that touch this file.
describe.skipIf(!!process.env.CI)("extractComputedStyles", () => {
  it("reads computed background, text, accent, and font from a rendered page", async () => {
    const result = await extractComputedStyles(FIXTURE);
    expect(result.bg?.toLowerCase()).toBe("#101820");
    expect(result.text?.toLowerCase()).toBe("#f2f2f2");
    expect(result.accent?.toLowerCase()).toBe("#ff5a36");
    expect(result.headingFont).toBe("Helvetica Neue");
    expect(result.bodyFont).toBe("Georgia");
  }, 60_000);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/create-theme && npx vitest run tests/playwright-fallback.test.ts`
Expected: FAIL — module doesn't exist yet. (If run with `CI=true` set, it will report 0 tests run/skipped instead — that's fine, re-run without `CI` set to actually exercise it locally.)

- [ ] **Step 3: Add the devDependency and write the implementation**

Modify `packages/create-theme/package.json` — add to `devDependencies`:

```json
"playwright": "^1.46.0"
```

(Types-only at build time; the actual runtime install happens on demand at first use, exactly like `skills/presentation-generator/scripts/export-pdf.sh`.)

Create `packages/create-theme/src/playwright-fallback.ts`:

```ts
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");

function ensurePlaywrightInstalled(): void {
  const marker = join(PACKAGE_ROOT, "node_modules", "playwright");
  if (existsSync(marker)) return;
  const install = spawnSync(
    "npm",
    ["install", "--prefix", PACKAGE_ROOT, "--no-save", "playwright@^1.46.0"],
    { stdio: "inherit" }
  );
  if (install.status !== 0) {
    throw new Error("Failed to install Playwright for the brand-import computed-style fallback.");
  }
  const chromium = spawnSync(
    join(PACKAGE_ROOT, "node_modules", ".bin", "playwright"),
    ["install", "chromium"],
    { stdio: "inherit" }
  );
  if (chromium.status !== 0) {
    throw new Error("Failed to install Chromium for the brand-import computed-style fallback.");
  }
}

export interface ComputedStyleResult {
  bg?: string;
  text?: string;
  accent?: string;
  headingFont?: string;
  bodyFont?: string;
}

export async function extractComputedStyles(url: string): Promise<ComputedStyleResult> {
  ensurePlaywrightInstalled();
  // Dynamic import so `playwright` is only required at runtime, after the
  // on-demand install above — never at module load time, keeping it out of
  // create-theme's static dependency graph for users who never use this.
  const playwrightModule = (await import("playwright")) as typeof import("playwright");
  const browser = await playwrightModule.chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(url, { waitUntil: "networkidle", timeout: 15_000 });
    return await page.evaluate(() => {
      function rgbToHex(rgb: string): string | undefined {
        const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!m) return undefined;
        return "#" + [m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, "0")).join("");
      }
      const bodyStyle = getComputedStyle(document.body);
      const heading = document.querySelector("h1, h2");
      const headingStyle = heading ? getComputedStyle(heading) : undefined;
      const button = document.querySelector('button, .btn, [class*="button"], a.cta');
      const buttonStyle = button ? getComputedStyle(button) : undefined;
      return {
        bg: rgbToHex(bodyStyle.backgroundColor),
        text: rgbToHex(bodyStyle.color),
        accent: buttonStyle ? rgbToHex(buttonStyle.backgroundColor) : undefined,
        headingFont: headingStyle?.fontFamily.split(",")[0]?.replace(/["']/g, "").trim(),
        bodyFont: bodyStyle.fontFamily.split(",")[0]?.replace(/["']/g, "").trim(),
      };
    });
  } finally {
    await browser.close();
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/create-theme && npx vitest run tests/playwright-fallback.test.ts` (locally, without `CI` set)
Expected: PASS. First run takes longer (installs Playwright + Chromium); subsequent runs are fast.

- [ ] **Step 5: Commit**

```bash
git add packages/create-theme/src/playwright-fallback.ts packages/create-theme/fixtures/brand-site.html \
        packages/create-theme/package.json packages/create-theme/tests/playwright-fallback.test.ts
git commit -m "feat(create-theme): add Playwright computed-style fallback for brand import"
```

---

### Task 5: Extraction orchestrator

**Files:**
- Create: `packages/create-theme/src/extract-brand.ts`
- Create: `packages/create-theme/fixtures/brand.css`
- Create: `packages/create-theme/fixtures/brand-low-contrast.css`
- Test: `packages/create-theme/tests/extract-brand.test.ts`

**Interfaces:**
- Consumes:
  - `parseCssVariables`, `parseFontDeclarations`, `mapPaletteToRoles`, `ensureContrastSafe`, `ContrastAdjustment` from `@presentation-skill-pack/core` (Task 2)
  - `Palette` from `@presentation-skill-pack/core`
  - `fetchStylesheetsFromUrl` from `./fetch-css.js` (Task 3)
  - `extractComputedStyles` from `./playwright-fallback.js` (Task 4)
- Produces (consumed by Task 6 and Task 7):
  - `export interface BrandExtractionInput { url?: string; cssPath?: string; }`
  - `export interface BrandExtractionResult { palette: Palette; headingFont: string; bodyFont: string; source: "static" | "computed-fallback"; adjustments: ContrastAdjustment[]; }`
  - `export async function extractBrand(input: BrandExtractionInput): Promise<BrandExtractionResult>`

- [ ] **Step 1: Add fixtures and write the failing tests**

Create `packages/create-theme/fixtures/brand.css`:

```css
:root {
  --bg: #0a0a0a;
  --text: #fafafa;
  --accent: #22c55e;
}
h1, h2 { font-family: 'Poppins', sans-serif; }
body { font-family: 'Inter', sans-serif; }
```

Create `packages/create-theme/fixtures/brand-low-contrast.css`:

```css
:root {
  --bg: #ffffff;
  --text: #e0e0e0;
  --accent: #f0f0f0;
}
body { font-family: 'Arial', sans-serif; }
```

Create `packages/create-theme/tests/extract-brand.test.ts`:

```ts
import { describe, it, expect, vi } from "vitest";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { extractBrand } from "../src/extract-brand.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSS_FIXTURE = join(__dirname, "..", "fixtures", "brand.css");
const LOW_CONTRAST_FIXTURE = join(__dirname, "..", "fixtures", "brand-low-contrast.css");

describe("extractBrand", () => {
  it("throws when neither url nor cssPath is given", async () => {
    await expect(extractBrand({})).rejects.toThrow(/requires either/i);
  });

  it("throws when both url and cssPath are given", async () => {
    await expect(
      extractBrand({ url: "https://example.com", cssPath: CSS_FIXTURE })
    ).rejects.toThrow(/only one of/i);
  });

  it("extracts from a local CSS file via the static pass", async () => {
    const result = await extractBrand({ cssPath: CSS_FIXTURE });
    expect(result.source).toBe("static");
    expect(result.palette.bg.toLowerCase()).toBe("#0a0a0a");
    expect(result.headingFont).toBe("Poppins");
    expect(result.bodyFont).toBe("Inter");
  });

  it("reports no contrast adjustments when the source palette is already safe", async () => {
    const result = await extractBrand({ cssPath: CSS_FIXTURE });
    expect(result.adjustments).toEqual([]);
  });

  it("adjusts low-contrast text against a light background and reports it", async () => {
    const result = await extractBrand({ cssPath: LOW_CONTRAST_FIXTURE });
    expect(result.adjustments.length).toBeGreaterThan(0);
    expect(result.palette.text).not.toBe("#e0e0e0");
  });

  it("throws a clear error when a CSS file has no usable colors or fonts", async () => {
    const readFileSpy = vi
      .spyOn(await import("node:fs/promises"), "readFile")
      .mockResolvedValueOnce("body { margin: 0; }");
    await expect(extractBrand({ cssPath: "/fake/empty.css" })).rejects.toThrow(/could not extract/i);
    readFileSpy.mockRestore();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/create-theme && npx vitest run tests/extract-brand.test.ts`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `packages/create-theme/src/extract-brand.ts`:

```ts
import { readFile } from "node:fs/promises";
import {
  parseCssVariables,
  parseFontDeclarations,
  mapPaletteToRoles,
  ensureContrastSafe,
  type ContrastAdjustment,
  type Palette,
} from "@presentation-skill-pack/core";
import { fetchStylesheetsFromUrl } from "./fetch-css.js";
import { extractComputedStyles } from "./playwright-fallback.js";

export interface BrandExtractionInput {
  url?: string;
  cssPath?: string;
}

export interface BrandExtractionResult {
  palette: Palette;
  headingFont: string;
  bodyFont: string;
  source: "static" | "computed-fallback";
  adjustments: ContrastAdjustment[];
}

const FALLBACK_HEADING_FONT = "Inter";
const FALLBACK_BODY_FONT = "Inter";

export async function extractBrand(input: BrandExtractionInput): Promise<BrandExtractionResult> {
  if (!input.url && !input.cssPath) {
    throw new Error("extractBrand requires either 'url' or 'cssPath'.");
  }
  if (input.url && input.cssPath) {
    throw new Error("extractBrand accepts only one of 'url' or 'cssPath', not both.");
  }

  const css = input.cssPath
    ? await readFile(input.cssPath, "utf-8")
    : await fetchStylesheetsFromUrl(input.url!);

  let colors = parseCssVariables(css);
  let fonts = parseFontDeclarations(css);
  let source: "static" | "computed-fallback" = "static";

  const staticFoundNothing =
    !colors.bg && !colors.text && !colors.accent && !fonts.heading && !fonts.body;
  if (staticFoundNothing && input.url) {
    const computed = await extractComputedStyles(input.url);
    colors = { bg: computed.bg, text: computed.text, accent: computed.accent };
    fonts = { heading: computed.headingFont, body: computed.bodyFont };
    source = "computed-fallback";
  }

  const stillNothing = !colors.bg && !colors.text && !colors.accent && !fonts.heading && !fonts.body;
  if (stillNothing) {
    throw new Error(`Could not extract any brand colors or fonts from ${input.url ?? input.cssPath}.`);
  }

  const rawPalette = mapPaletteToRoles(colors);
  const { palette, adjustments } = ensureContrastSafe(rawPalette);

  return {
    palette,
    headingFont: fonts.heading ?? FALLBACK_HEADING_FONT,
    bodyFont: fonts.body ?? FALLBACK_BODY_FONT,
    source,
    adjustments,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/create-theme && npx vitest run tests/extract-brand.test.ts`
Expected: all 6 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/create-theme/src/extract-brand.ts packages/create-theme/fixtures/brand.css \
        packages/create-theme/fixtures/brand-low-contrast.css packages/create-theme/tests/extract-brand.test.ts
git commit -m "feat(create-theme): add brand extraction orchestrator (static pass + fallback + contrast pass)"
```

---

### Task 6: ThemeView builder and scaffoldTheme refactor

**Files:**
- Create: `packages/create-theme/src/theme-view.ts`
- Modify: `packages/create-theme/src/index.ts`
- Test: `packages/create-theme/tests/theme-view.test.ts`

**Interfaces:**
- Consumes: `BrandExtractionResult` from `./extract-brand.js` (Task 5); existing `ThemeView` interface, `toUnderscored`, `renderTemplate`, `getTemplateDir` from `./index.js` (currently internal to `index.ts` — this task exports `ThemeView` and adds `getTemplateDir` as an internal import for the new file).
- Produces (consumed by Task 7 and Task 8):
  - `export function buildThemeViewFromBrand(name: string, extraction: BrandExtractionResult): ThemeView`
  - `packages/create-theme/src/index.ts` additionally exports:
    - `export interface ThemeView { ... }` (was previously unexported)
    - `export async function scaffoldTheme(view: ThemeView, outputDir: string): Promise<string[]>`
    - `export function buildThemeManifestJson(view: ThemeView): string`

- [ ] **Step 1: Write the failing test**

Create `packages/create-theme/tests/theme-view.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { buildThemeViewFromBrand } from "../src/theme-view.js";
import type { BrandExtractionResult } from "../src/extract-brand.js";

const EXTRACTION: BrandExtractionResult = {
  palette: {
    bg: "#0a0a0a",
    bg2: "#111111",
    text: "#fafafa",
    muted: "#999999",
    accent: "#22c55e",
    accent2: "#22c55e",
    cardBg: "#111111",
    border: "#1a1a1a",
  },
  headingFont: "Poppins",
  bodyFont: "Inter",
  source: "static",
  adjustments: [],
};

describe("buildThemeViewFromBrand", () => {
  it("maps a brand extraction result onto a valid ThemeView", () => {
    const view = buildThemeViewFromBrand("acme-com", EXTRACTION);
    expect(view.name).toBe("acme-com");
    expect(view.underscored).toBe("acme_com");
    expect(view.bg).toBe("#0a0a0a");
    expect(view.accent).toBe("#22c55e");
    expect(view.headingFont).toBe("Poppins");
    expect(view.bodyFont).toBe("Inter");
    expect(view.headingFontSpec).toContain("Poppins");
    expect(view.bodyFontSpec).toContain("Inter");
    expect(typeof view.headingWeight).toBe("number");
  });

  it("mentions the extraction source in the generated description", () => {
    const view = buildThemeViewFromBrand("acme-com", EXTRACTION);
    expect(view.description.toLowerCase()).toContain("brand");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/create-theme && npx vitest run tests/theme-view.test.ts`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 3: Export `ThemeView` and add `scaffoldTheme`/`buildThemeManifestJson` in `index.ts`**

Modify `packages/create-theme/src/index.ts`:

Change the interface declaration from:

```ts
interface ThemeView {
```

to:

```ts
export interface ThemeView {
```

Change `function getTemplateDir()` to `export function getTemplateDir()` (it stays internal-use-primarily but is needed by the new `theme-view.ts`-adjacent helpers added right below, and by tests if needed later).

Immediately after the existing `renderTemplate` function, add:

```ts
const THEME_TEMPLATE_FILES: Array<{ template: string; output: string }> = [
  { template: "theme.json.mustache", output: "theme.json" },
  { template: "package.json.mustache", output: "package.json" },
  { template: "pyproject.toml.mustache", output: "pyproject.toml" },
  { template: "README.md.mustache", output: "README.md" },
];

export async function scaffoldTheme(view: ThemeView, outputDir: string): Promise<string[]> {
  const templateDir = getTemplateDir();
  mkdirSync(outputDir, { recursive: true });
  const created: string[] = [];
  for (const { template, output } of THEME_TEMPLATE_FILES) {
    const rendered = renderTemplate(templateDir, template, view as unknown as Record<string, unknown>);
    writeFileSync(join(outputDir, output), rendered, "utf-8");
    created.push(output);
  }
  return created;
}

export function buildThemeManifestJson(view: ThemeView): string {
  return renderTemplate(getTemplateDir(), "theme.json.mustache", view as unknown as Record<string, unknown>);
}
```

Then simplify the existing `.action()` callback's scaffolding loop (inside `buildProgram()`) to reuse it — replace:

```ts
      const templateDir = getTemplateDir();

      mkdirSync(outputDir, { recursive: true });

      const files: Array<{ template: string; output: string }> = [
        { template: "theme.json.mustache", output: "theme.json" },
        { template: "package.json.mustache", output: "package.json" },
        { template: "pyproject.toml.mustache", output: "pyproject.toml" },
        { template: "README.md.mustache", output: "README.md" },
      ];

      for (const { template, output } of files) {
        const rendered = renderTemplate(templateDir, template, view as unknown as Record<string, unknown>);
        const outPath = join(outputDir, output);
        writeFileSync(outPath, rendered, "utf-8");
        process.stdout.write(`  created  ${output}\n`);
      }
```

with:

```ts
      const created = await scaffoldTheme(view, outputDir);
      for (const file of created) {
        process.stdout.write(`  created  ${file}\n`);
      }
```

- [ ] **Step 4: Create `theme-view.ts`**

Create `packages/create-theme/src/theme-view.ts`:

```ts
import type { BrandExtractionResult } from "./extract-brand.js";
import type { ThemeView } from "./index.js";
import { toUnderscored } from "./index.js";

export function buildThemeViewFromBrand(name: string, extraction: BrandExtractionResult): ThemeView {
  const sourceLabel =
    extraction.source === "static" ? "extracted brand CSS" : "computed page styles";
  return {
    name,
    underscored: toUnderscored(name),
    description: `A theme generated from ${sourceLabel}.`,
    vibe: "brand-import",
    author: "",
    license: "MIT",
    bg: extraction.palette.bg,
    bg2: extraction.palette.bg2,
    text: extraction.palette.text,
    muted: extraction.palette.muted,
    accent: extraction.palette.accent,
    accent2: extraction.palette.accent2,
    cardBg: extraction.palette.cardBg,
    border: extraction.palette.border,
    headingFont: extraction.headingFont,
    bodyFont: extraction.bodyFont,
    headingWeight: 700,
    headingFontSpec: `${extraction.headingFont}:wght@400;700`,
    bodyFontSpec: `${extraction.bodyFont}:wght@400;500`,
    radius: "12px",
  };
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd packages/create-theme && npx vitest run && npx tsc --noEmit`
Expected: all tests PASS (including the pre-existing `create-theme.test.ts`, unaffected by this refactor), typecheck clean.

- [ ] **Step 6: Commit**

```bash
git add packages/create-theme/src/index.ts packages/create-theme/src/theme-view.ts \
        packages/create-theme/tests/theme-view.test.ts
git commit -m "refactor(create-theme): extract scaffoldTheme, export ThemeView, add brand ThemeView builder"
```

---

### Task 7: Wire `--from-url`/`--from-css` into the CLI

**Files:**
- Modify: `packages/create-theme/src/index.ts`
- Test: `packages/create-theme/tests/cli-from-url.test.ts`

**Interfaces:**
- Consumes: `extractBrand` (Task 5), `buildThemeViewFromBrand` (Task 6), `deriveNameFromUrl` (Task 3), `scaffoldTheme`/`validateThemeName` (existing/Task 6).
- Produces: no new exports — this task changes CLI *behavior* (new flags on the existing `buildProgram()` command).

- [ ] **Step 1: Write the failing test**

Create `packages/create-theme/tests/cli-from-url.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateThemeJson } from "@presentation-skill-pack/core";
import { buildProgram } from "../src/index.js";

function mockResponse(text: string): Response {
  return {
    ok: true,
    status: 200,
    headers: new Headers(),
    arrayBuffer: async () => new TextEncoder().encode(text).buffer,
  } as unknown as Response;
}

describe("create-theme CLI --from-url", () => {
  let outDir: string;

  beforeEach(() => {
    outDir = mkdtempSync(join(tmpdir(), "create-theme-test-"));
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    rmSync(outDir, { recursive: true, force: true });
    vi.unstubAllGlobals();
  });

  it("scaffolds a valid theme package from a brand URL, deriving the name from the hostname", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(mockResponse(`<link rel="stylesheet" href="/style.css">`))
      .mockResolvedValueOnce(
        mockResponse(
          ":root { --bg: #050505; --text: #f0f0f0; --accent: #ff8800; } body { font-family: Inter, sans-serif; } h1 { font-family: Poppins, sans-serif; }"
        )
      );

    const program = buildProgram();
    await program.parseAsync(
      ["node", "create-presentation-theme", "--from-url", "https://acme.com", "--output-dir", outDir],
      { from: "node" }
    );

    const themeJson = JSON.parse(readFileSync(join(outDir, "theme.json"), "utf-8")) as {
      name: string;
      roles: { bg: string };
    };
    expect(themeJson.name).toBe("acme-com");
    expect(themeJson.roles.bg.toLowerCase()).toBe("#050505");
    const validation = validateThemeJson(JSON.stringify(themeJson));
    expect(validation.valid).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/create-theme && npx vitest run tests/cli-from-url.test.ts`
Expected: FAIL — the CLI doesn't recognize `--from-url` yet (no `theme.json` gets written, or commander errors on the unknown option).

- [ ] **Step 3: Write the implementation**

Modify `packages/create-theme/src/index.ts` — add these imports near the top, alongside the existing ones:

```ts
import { extractBrand } from "./extract-brand.js";
import { buildThemeViewFromBrand } from "./theme-view.js";
import { deriveNameFromUrl } from "./name-from-url.js";
```

Replace the `buildProgram()` command definition and `.action()` callback with:

```ts
export function buildProgram(): Command {
  const program = new Command();

  program
    .name("create-presentation-theme")
    .description("Scaffold a new presentation-skill-pack theme package.")
    .argument(
      "[name]",
      "Theme name in kebab-case (e.g. my-brand-dark). Optional with --from-url (derived from the hostname)."
    )
    .option("--output-dir <path>", "Output directory for the scaffolded theme package")
    .option("--from-url <url>", "Generate the theme from a brand's live URL instead of interactive prompts")
    .option("--from-css <path>", "Generate the theme from a local CSS file instead of interactive prompts")
    .action(
      async (
        nameArg: string | undefined,
        options: { outputDir?: string; fromUrl?: string; fromCss?: string }
      ) => {
        if (options.fromUrl && options.fromCss) {
          process.stderr.write("Error: pass only one of --from-url or --from-css, not both.\n");
          process.exit(1);
          return;
        }

        let name = nameArg;
        let view: ThemeView;

        if (options.fromUrl || options.fromCss) {
          if (!name) {
            if (options.fromUrl) {
              try {
                name = deriveNameFromUrl(options.fromUrl);
              } catch (err) {
                process.stderr.write(`Error: ${(err as Error).message}\n`);
                process.exit(1);
                return;
              }
            } else {
              process.stderr.write("Error: a theme name is required when using --from-css.\n");
              process.exit(1);
              return;
            }
          }
          try {
            validateThemeName(name);
          } catch (err) {
            process.stderr.write(`Error: ${(err as Error).message}\n`);
            process.exit(1);
            return;
          }

          process.stdout.write(`\nExtracting brand from ${options.fromUrl ?? options.fromCss}...\n`);
          let extraction;
          try {
            extraction = await extractBrand({ url: options.fromUrl, cssPath: options.fromCss });
          } catch (err) {
            process.stderr.write(`Error: ${(err as Error).message}\n`);
            process.exit(1);
            return;
          }
          process.stdout.write(`  source: ${extraction.source}\n`);
          for (const adj of extraction.adjustments) {
            process.stdout.write(
              `  contrast: ${adj.pair} adjusted from ${adj.from} to ${adj.to} (ratio ${adj.ratio})\n`
            );
          }
          view = buildThemeViewFromBrand(name, extraction);
        } else {
          if (!name) {
            process.stderr.write("Error: a theme name is required.\n");
            process.exit(1);
            return;
          }
          try {
            validateThemeName(name);
          } catch (err) {
            process.stderr.write(`Error: ${(err as Error).message}\n`);
            process.exit(1);
            return;
          }
          const rl = createInterface({ input: process.stdin, output: process.stdout });
          try {
            view = await collectView(rl, name);
          } finally {
            rl.close();
          }
        }

        const outputDir = resolve(process.cwd(), options.outputDir ?? join("packages", "themes", name));

        process.stdout.write(`\nScaffolding theme: ${name}\n`);
        process.stdout.write(`Output:            ${outputDir}\n`);

        const created = await scaffoldTheme(view, outputDir);
        for (const file of created) {
          process.stdout.write(`  created  ${file}\n`);
        }

        process.stdout.write(`\nTheme "${name}" scaffolded successfully!\n`);
        process.stdout.write(`\nNext steps:\n`);
        process.stdout.write(`  cd ${outputDir}\n`);
        process.stdout.write(`  npm publish --access public\n`);
      }
    );

  return program;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/create-theme && npx vitest run && npx tsc --noEmit`
Expected: all tests PASS (new `cli-from-url.test.ts` and every pre-existing test), typecheck clean.

- [ ] **Step 5: Commit**

```bash
git add packages/create-theme/src/index.ts packages/create-theme/tests/cli-from-url.test.ts
git commit -m "feat(create-theme): add --from-url/--from-css flags to the create-theme CLI"
```

---

### Task 8: `import_brand_theme` MCP tool

**Files:**
- Create: `packages/mcp-server/src/tools/import-brand-theme.ts`
- Modify: `packages/mcp-server/src/server.ts`
- Modify: `packages/mcp-server/package.json`
- Test: `packages/mcp-server/tests/import-brand-theme.test.ts`

**Interfaces:**
- Consumes: `extractBrand`, `buildThemeViewFromBrand`, `buildThemeManifestJson`, `scaffoldTheme`, `validateThemeName`, `deriveNameFromUrl` — all from `@presentation-skill-pack/create-theme` (Tasks 3, 5, 6). `ToolDefinition` from `../server.js` (existing).
- Produces: `export const importBrandThemeTool: ToolDefinition`, registered in `TOOLS` in `server.ts`.

- [ ] **Step 1: Add the workspace dependency**

Modify `packages/mcp-server/package.json` — add to `dependencies`:

```json
"@presentation-skill-pack/create-theme": "workspace:*"
```

Also export the needed symbols from `packages/create-theme`'s public surface — modify `packages/create-theme/src/theme-view.ts` is already exported via its own file; confirm `packages/create-theme/package.json`'s `exports`/`main` point at `./dist/index.js` (already true) and that `dist/theme-view.js`, `dist/extract-brand.js`, `dist/name-from-url.js` get built alongside `dist/index.js` — `tsc -p tsconfig.json` already compiles every `.ts` file under `src/`, so no config change is needed. `mcp-server` will import `buildThemeViewFromBrand` via `@presentation-skill-pack/create-theme/dist/theme-view.js`... instead, to keep the import surface clean, add re-exports to `packages/create-theme/src/index.ts`:

```ts
export { extractBrand } from "./extract-brand.js";
export type { BrandExtractionInput, BrandExtractionResult } from "./extract-brand.js";
export { buildThemeViewFromBrand } from "./theme-view.js";
export { deriveNameFromUrl } from "./name-from-url.js";
```

- [ ] **Step 2: Write the failing test**

Create `packages/mcp-server/tests/import-brand-theme.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { importBrandThemeTool } from "../src/tools/import-brand-theme.js";

function mockResponse(text: string): Response {
  return {
    ok: true,
    status: 200,
    headers: new Headers(),
    arrayBuffer: async () => new TextEncoder().encode(text).buffer,
  } as unknown as Response;
}

describe("import_brand_theme tool", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects when neither url nor cssPath is given", async () => {
    await expect(importBrandThemeTool.handler({})).rejects.toThrow(/provide either/i);
  });

  it("rejects when both url and cssPath are given", async () => {
    await expect(
      importBrandThemeTool.handler({ url: "https://acme.com", cssPath: "/tmp/brand.css" })
    ).rejects.toThrow(/only one of/i);
  });

  it("returns a valid theme manifest without writing to disk by default", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(mockResponse(`<link rel="stylesheet" href="/s.css">`))
      .mockResolvedValueOnce(
        mockResponse(
          ":root { --bg: #010101; --text: #fefefe; --accent: #00aaff; } body { font-family: Inter; } h1 { font-family: Poppins; }"
        )
      );

    const result = (await importBrandThemeTool.handler({ url: "https://acme.com" })) as {
      theme: { name: string; roles: { bg: string } };
      source: string;
      writtenTo?: string;
    };

    expect(result.theme.name).toBe("acme-com");
    expect(result.theme.roles.bg.toLowerCase()).toBe("#010101");
    expect(result.source).toBe("static");
    expect(result.writtenTo).toBeUndefined();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `cd packages/mcp-server && npx vitest run tests/import-brand-theme.test.ts`
Expected: FAIL — module doesn't exist yet.

- [ ] **Step 4: Write the implementation**

Create `packages/mcp-server/src/tools/import-brand-theme.ts`:

```ts
import { join } from "node:path";
import {
  extractBrand,
  buildThemeViewFromBrand,
  buildThemeManifestJson,
  scaffoldTheme,
  validateThemeName,
  deriveNameFromUrl,
} from "@presentation-skill-pack/create-theme";
import type { ToolDefinition } from "../server.js";

export const importBrandThemeTool: ToolDefinition = {
  name: "import_brand_theme",
  description:
    "Generate a presentation-skill-pack theme from a brand's website URL or a local CSS file. Extracts colors and fonts, maps them to the theme's 8 semantic roles, and applies a WCAG contrast-safety pass so the result stays legible. Use whenever the user wants a deck theme that matches an existing brand or product.",
  inputSchema: {
    type: "object",
    properties: {
      url: { type: "string", description: "Brand website URL to extract colors and fonts from" },
      cssPath: { type: "string", description: "Local path to a CSS file to extract from, as an alternative to url" },
      name: {
        type: "string",
        description: "Theme name in kebab-case; derived from the URL's hostname if omitted (required when using cssPath)",
      },
      write: {
        type: "boolean",
        description:
          "Also scaffold the full installable theme package to disk under packages/themes/<name>. Defaults to false.",
      },
    },
  },
  handler: async (input: Record<string, unknown>) => {
    const url = input.url as string | undefined;
    const cssPath = input.cssPath as string | undefined;
    if (!url && !cssPath) throw new Error("Provide either 'url' or 'cssPath'.");
    if (url && cssPath) throw new Error("Provide only one of 'url' or 'cssPath', not both.");

    let name = input.name as string | undefined;
    if (!name) {
      if (!url) throw new Error("'name' is required when using 'cssPath'.");
      name = deriveNameFromUrl(url);
    }
    validateThemeName(name);

    const extraction = await extractBrand({ url, cssPath });
    const view = buildThemeViewFromBrand(name, extraction);
    const theme = JSON.parse(buildThemeManifestJson(view)) as Record<string, unknown>;

    let writtenTo: string | undefined;
    if (input.write === true) {
      const outputDir = join(process.cwd(), "packages", "themes", name);
      await scaffoldTheme(view, outputDir);
      writtenTo = outputDir;
    }

    return {
      theme,
      source: extraction.source,
      contrastAdjustments: extraction.adjustments,
      writtenTo,
    };
  },
};
```

Modify `packages/mcp-server/src/server.ts` — add the import near the other tool imports:

```ts
import { importBrandThemeTool } from "./tools/import-brand-theme.js";
```

Add it to the `TOOLS` array:

```ts
const TOOLS: ToolDefinition[] = [
  renderDeckTool,
  exportDeckTool,
  listThemesTool,
  applyThemeTool,
  auditDeckTool,
  generateDeckPromptTool,
  importBrandThemeTool
];
```

- [ ] **Step 5: Run test to verify it passes**

Run: `cd packages/mcp-server && npx vitest run && npx tsc --noEmit`
Expected: all tests PASS, typecheck clean.

- [ ] **Step 6: Run the full monorepo build to confirm the new workspace dependency resolves**

Run: `cd /Users/timur_isachenko/Dev/presentation-skill-pack && pnpm install && pnpm build && pnpm test`
Expected: clean build across all packages, all tests pass.

- [ ] **Step 7: Commit**

```bash
git add packages/mcp-server/src/tools/import-brand-theme.ts packages/mcp-server/src/server.ts \
        packages/mcp-server/package.json packages/mcp-server/tests/import-brand-theme.test.ts \
        packages/create-theme/src/index.ts pnpm-lock.yaml
git commit -m "feat(mcp-server): add import_brand_theme tool"
```

---

### Task 9: Documentation

**Files:**
- Modify: `skills/presentation-generator/references/themes.md`
- Modify: `packages/core/SKILL.md`
- Modify: `README.md`

**Interfaces:** none (docs only).

- [ ] **Step 1: Update the themes reference**

Modify `skills/presentation-generator/references/themes.md` — add after the existing "Install more... Scaffold your own" line:

```markdown

## Brand import

Generate a theme from an existing brand instead of hand-picking colors:

```
npx @presentation-skill-pack/create-theme --from-url https://acme.com
npx @presentation-skill-pack/create-theme my-theme-name --from-css ./brand.css
```

Extracts `:root` CSS variables and font declarations (falling back to a headless-browser
computed-style read when a site has no CSS custom properties — most real marketing sites don't).
Maps whatever's found onto the theme's 8 semantic roles and runs a WCAG contrast-safety pass, so
the result stays legible even when the raw brand colors wouldn't be. The CLI reports its
extraction source and any contrast adjustments it made. Also available as the `import_brand_theme`
MCP tool for agent-driven workflows.
```

- [ ] **Step 2: Add the MCP tool to the tools table**

Modify `packages/core/SKILL.md` — in the MCP Tools table (around the `list_themes`/`get_theme` rows), add a row:

```markdown
| `import_brand_theme` | Generate a theme from a brand's URL or CSS file, with a contrast-safety pass |
```

- [ ] **Step 3: Update the root README**

Modify `README.md` — extend the existing `create-theme` table row:

Find:
```markdown
| [`@presentation-skill-pack/create-theme`](packages/create-theme) | Scaffold a new publishable theme package (`create-presentation-theme`) |
```

Replace with:
```markdown
| [`@presentation-skill-pack/create-theme`](packages/create-theme) | Scaffold a new publishable theme package (`create-presentation-theme`), interactively or from a brand's URL/CSS (`--from-url`/`--from-css`) |
```

- [ ] **Step 4: Commit**

```bash
git add skills/presentation-generator/references/themes.md packages/core/SKILL.md README.md
git commit -m "docs: document brand-aware theme generation (--from-url/--from-css, import_brand_theme)"
```

---

## Self-Review

**Spec coverage:** every architectural piece in `docs/superpowers/specs/2026-07-27-brand-import-design.md` has a task — `packages/core` pure functions (Tasks 1-2), `packages/create-theme` orchestration including the Playwright fallback (Tasks 3-7), `packages/mcp-server` tool (Task 8), and the disclosed-adjustments reporting requirement (surfaced in the CLI output in Task 7 and the MCP tool's `contrastAdjustments` field in Task 8). Documentation (Task 9) makes the feature discoverable, closing the loop.

**Placeholder scan:** no TBD/TODO; every step has runnable code.

**Type consistency:** `Palette` (8 roles) flows unchanged from `theme-loader.ts` through `brand-extract.ts`, `extract-brand.ts`, and `theme-view.ts`. `ThemeView` (defined in `create-theme/src/index.ts`, exported in Task 6) is the single shape fed to the Mustache pipeline in both the interactive and brand-import paths. `BrandExtractionResult` (Task 5) is consumed identically by `theme-view.ts` (Task 6), the CLI (Task 7), and the MCP tool (Task 8) — same field names throughout (`palette`, `headingFont`, `bodyFont`, `source`, `adjustments`).
