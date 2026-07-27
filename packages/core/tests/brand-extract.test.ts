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

  it("normalizes hex values to lowercase 6-digit format", () => {
    const palette = mapPaletteToRoles({ bg: "#FFFFFF", text: "#000000", accent: "#f80" });
    expect(palette.bg).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette.text).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette.accent).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette.accent2).toMatch(/^#[0-9a-f]{6}$/);
    // Verify all derived colors are also normalized
    expect(palette.bg2).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette.muted).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette.cardBg).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette.border).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe("ensureContrastSafe", () => {
  it("leaves an already-safe palette unchanged", () => {
    const palette = mapPaletteToRoles({ bg: "#0a0a0a", text: "#fafafa", accent: "#22c55e" });
    const result = ensureContrastSafe(palette);
    expect(result.adjustments).toEqual([]);
    expect(result.palette).toEqual(palette);
    expect(result.stillFailing).toEqual([]);
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

  it("does not sequentially mutate text when adjusting opposite-lightness backgrounds", () => {
    // When bg and cardBg are on opposite sides of the L=50 midpoint, the sequential
    // mutation bug would cause the second adjustment to undo the first. This test
    // ensures that does not happen and the final text satisfies at least the primary
    // bg pair's contrast requirement. We construct the palette directly to control
    // all fields, including cardBg explicitly (not derived from bg).
    const palette = {
      bg: "#ffffff",
      bg2: "#f5f5f5",
      text: "#999999",
      muted: "#6b6b6b",
      accent: "#2563eb",
      accent2: "#7c3aed",
      cardBg: "#1a1a1a",
      border: "#e0e0e0",
    };
    const result = ensureContrastSafe(palette);

    // Primary requirement: text on bg must meet WCAG AA (4.5)
    expect(contrastRatio(result.palette.text, result.palette.bg)).toBeGreaterThanOrEqual(4.5);

    // Adjustments array must accurately reflect the final palette
    for (const adjustment of result.adjustments) {
      let bgColor: string;
      if (adjustment.pair === "text on bg") {
        bgColor = result.palette.bg;
      } else if (adjustment.pair === "text on cardBg") {
        bgColor = result.palette.cardBg;
      } else {
        continue;
      }
      const actualRatio = contrastRatio(result.palette.text, bgColor);
      // The reported ratio in adjustments must match what's actually in the final palette
      expect(Math.abs(actualRatio - adjustment.ratio)).toBeLessThan(0.01);
    }
  });

  // Regression: `muted` is derived in mapPaletteToRoles from text's ORIGINAL
  // lightness and, on light backgrounds, is pushed toward the background — so
  // this palette used to ship muted: #ffffff on bg: #ffffff (ratio 1.0,
  // completely invisible) even though text was correctly fixed.
  it("keeps muted legible against bg when the derived value collapses into the background", () => {
    const palette = mapPaletteToRoles({ bg: "#ffffff", text: "#e0e0e0" });
    expect(palette.muted).toBe("#ffffff"); // the raw derivation really is invisible
    const result = ensureContrastSafe(palette);
    expect(contrastRatio(result.palette.muted, result.palette.bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("also guards muted against cardBg and reports the adjusted pair", () => {
    const palette = mapPaletteToRoles({ bg: "#ffffff", text: "#e0e0e0" });
    const result = ensureContrastSafe(palette);
    expect(contrastRatio(result.palette.muted, result.palette.cardBg)).toBeGreaterThanOrEqual(4.5);
    expect(result.adjustments.map((a) => a.pair)).toContain("muted on bg");
    expect(result.adjustments.map((a) => a.pair)).toContain("muted on cardBg");
    expect(result.stillFailing).toEqual([]);
  });

  // Regression for the fallback branch: when the 40pp lightness-shift cap is
  // exhausted against a mid-gray background, the old hardcoded #1a1a1a only
  // reached 4.41:1 while #000000 reaches 5.32:1.
  it("picks the higher-contrast extreme when the lightness-shift cap is exhausted", () => {
    const palette = mapPaletteToRoles({ bg: "#808080", text: "#8a8a8a" });
    const result = ensureContrastSafe(palette);
    for (const [fg, bg] of [
      ["text", "bg"],
      ["text", "cardBg"],
      ["muted", "bg"],
      ["muted", "cardBg"],
    ] as const) {
      const ratio = contrastRatio(result.palette[fg], result.palette[bg]);
      const label = `${fg} on ${bg}`;
      // Either the pair clears AA, or it is honestly reported in stillFailing.
      if (ratio < 4.5) {
        expect(result.stillFailing).toContain(label);
      } else {
        expect(result.stillFailing).not.toContain(label);
      }
    }
    // The improved fallback makes this palette fully reachable.
    expect(result.stillFailing).toEqual([]);
    expect(contrastRatio(result.palette.text, result.palette.bg)).toBeGreaterThanOrEqual(4.5);
  });

  it("reports a pair that remains below the threshold after every fix attempt", () => {
    // bg and cardBg sit on opposite sides of the lightness midpoint, so a single
    // foreground value cannot satisfy both. bg wins; cardBg is disclosed.
    const palette = {
      bg: "#ffffff",
      bg2: "#f5f5f5",
      text: "#999999",
      muted: "#6b6b6b",
      accent: "#2563eb",
      accent2: "#7c3aed",
      cardBg: "#1a1a1a",
      border: "#e0e0e0",
    };
    const result = ensureContrastSafe(palette);
    expect(result.stillFailing).toContain("text on cardBg");
    expect(result.stillFailing).not.toContain("text on bg");
    for (const label of result.stillFailing) {
      const [fg, , bg] = label.split(" ") as ["text" | "muted", string, "bg" | "cardBg"];
      expect(contrastRatio(result.palette[fg], result.palette[bg])).toBeLessThan(4.5);
    }
  });
});
