import { describe, it, expect } from "vitest";
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  relativeLuminance,
  contrastRatio,
  withLightness,
  readableOn,
} from "../src/color.js";

describe("readableOn", () => {
  it("keeps the theme colour when it reads well", () => {
    // Dark navy bg on cyan accent (blueprint): bg already reads.
    expect(readableOn("#00e5ff", ["#0a1f3d", "#e8f4ff"])).toBe("#0a1f3d");
  });

  it("avoids light text on a light accent", () => {
    // Pale mint accent, light bg, light text: falls back to near-black.
    const on = readableOn("#b8f0d8", ["#fdfcf8", "#f4f4f4"]);
    expect(on).toBe("#111111");
    expect(contrastRatio("#b8f0d8", on)).toBeGreaterThan(4.5);
  });

  it("returns the first candidate when the fill is not hex", () => {
    expect(readableOn("rgba(0,0,0,0.5)", ["#fff"])).toBe("#fff");
  });
});

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
