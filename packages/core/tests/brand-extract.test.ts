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
