import { describe, it, expect } from "vitest";
import { contrastRatio, hexToRgb, rgbToHex, rgbToHsl } from "@presentation-md/core";
import type { TemplateBrand } from "@presentation-md/export/import";
import {
  templateToCandidates,
  NO_SATURATED_ACCENT_WARNING,
} from "../src/template-candidates.js";

const WHITE = "#ffffff";

function brand(scheme: Partial<TemplateBrand["scheme"]> = {}, clrMap?: TemplateBrand["clrMap"]): TemplateBrand {
  return {
    scheme: {
      dk1: "#1b1b1f",
      lt1: WHITE,
      dk2: "#0b2545",
      lt2: "#eef2f7",
      accent1: "#e4572e",
      accent2: "#17bebb",
      accent3: "#ffc914",
      accent4: "#2e282a",
      accent5: "#76b041",
      accent6: "#8d6a9f",
      hlink: "#0563c1",
      folHlink: "#954f72",
      ...scheme,
    },
    schemeName: "Acme",
    clrMap: clrMap ?? { bg1: "lt1", tx1: "dk1", bg2: "lt2", tx2: "dk2" },
    officeDefault: null,
    builtInName: null,
    fonts: {},
    logo: { found: false },
    warnings: [],
  };
}

const sat = (hex: string): number => rgbToHsl(hexToRgb(hex))[1];

/** First colour on a 4-step RGB grid that meets the predicate. */
function find(pred: (hex: string) => boolean): string {
  for (let r = 0; r <= 255; r += 4)
    for (let g = 0; g <= 255; g += 4)
      for (let b = 0; b <= 255; b += 4) {
        const hex = rgbToHex([r, g, b]);
        if (pred(hex)) return hex;
      }
  throw new Error("no colour found on the grid");
}

/** A near-grey with an exact (rounded) contrast ratio against `against`. */
function greyWithRatio(target: number, against = WHITE): string {
  for (let v = 255; v >= 0; v--)
    for (let d = 0; d <= 12; d++) {
      const hex = rgbToHex([v, v, Math.max(0, v - d)]);
      if (contrastRatio(hex, against) === target) return hex;
    }
  throw new Error(`no grey with ratio ${target}`);
}

const saturatedWithRatio = (target: number, against = WHITE): string =>
  find((h) => sat(h) >= 50 && contrastRatio(h, against) === target);

describe("templateToCandidates — bg, text, bg2", () => {
  it("resolves bg and text through the clrMap", () => {
    expect(templateToCandidates(brand()).candidates).toMatchObject({ bg: WHITE, text: "#1b1b1f" });
    const dark = templateToCandidates(brand({}, { bg1: "dk1", tx1: "lt1", bg2: "dk2", tx2: "lt2" }));
    expect(dark.candidates).toMatchObject({ bg: "#1b1b1f", text: WHITE });
  });

  it.each([
    [1.02, false],
    [1.03, true],
    [1.6, true],
    [1.61, false],
  ])("bg2 with ratio %s against bg kept: %s", (ratio, kept) => {
    const lt2 = greyWithRatio(ratio);
    expect(contrastRatio(lt2, WHITE)).toBe(ratio);
    const { candidates } = templateToCandidates(brand({ lt2 }));
    expect(candidates.bg2).toBe(kept ? lt2 : undefined);
  });
});

describe("templateToCandidates — accent", () => {
  it("takes accent1 when it passes", () => {
    const { candidates, warnings } = templateToCandidates(brand());
    expect(candidates.accent).toBe("#e4572e");
    expect(warnings).toEqual([]);
  });

  it("skips a neutral accent1", () => {
    const { candidates } = templateToCandidates(brand({ accent1: "#595959" }));
    expect(candidates.accent).toBe("#17bebb");
  });

  it("skips an accent1 equal to bg", () => {
    const { candidates } = templateToCandidates(brand({ accent1: "#ff0000", lt1: "#ff0000" }));
    expect(candidates.accent).not.toBe("#ff0000");
  });

  it("uses accent1 and warns when every accent is neutral", () => {
    const greys = ["#404040", "#595959", "#7f7f7f", "#262626", "#a5a5a5", "#0d0d0d"];
    const { candidates, warnings } = templateToCandidates(
      brand(Object.fromEntries(greys.map((g, i) => [`accent${i + 1}`, g])))
    );
    expect(candidates.accent).toBe("#404040");
    expect(candidates.accent2).toBeUndefined();
    expect(warnings).toEqual([NO_SATURATED_ACCENT_WARNING]);
  });

  it("treats saturation 11 as neutral and 12 as not", () => {
    const s11 = find((h) => sat(h) >= 11 && sat(h) < 12 && contrastRatio(h, WHITE) >= 3);
    const s12 = find((h) => sat(h) >= 12 && sat(h) < 13 && contrastRatio(h, WHITE) >= 3);
    expect(templateToCandidates(brand({ accent1: s11 })).candidates.accent).toBe("#17bebb");
    expect(templateToCandidates(brand({ accent1: s12 })).candidates.accent).toBe(s12);
  });

  it("needs a ratio of at least 1.5 against bg (1.49 fails, 1.5 passes)", () => {
    const a149 = saturatedWithRatio(1.49);
    const a150 = saturatedWithRatio(1.5);
    expect(templateToCandidates(brand({ accent1: a149 })).candidates.accent).toBe("#17bebb");
    expect(templateToCandidates(brand({ accent1: a150 })).candidates.accent).toBe(a150);
  });
});

describe("templateToCandidates — accent2", () => {
  it("takes the next passing accent", () => {
    expect(templateToCandidates(brand()).candidates.accent2).toBe("#17bebb");
  });

  it("needs a ratio of at least 1.2 against accent (1.19 fails, 1.2 passes)", () => {
    const accent = "#e4572e";
    const pass = (h: string): boolean => sat(h) >= 50 && contrastRatio(h, WHITE) >= 1.5;
    const a119 = find((h) => pass(h) && contrastRatio(h, accent) === 1.19);
    const a120 = find((h) => pass(h) && contrastRatio(h, accent) === 1.2);
    const neutral = { accent3: "#7f7f7f", accent4: "#7f7f7f", accent5: "#7f7f7f", accent6: "#7f7f7f" };
    expect(templateToCandidates(brand({ accent2: a119, ...neutral })).candidates.accent2).toBeUndefined();
    expect(templateToCandidates(brand({ accent2: a120, ...neutral })).candidates.accent2).toBe(a120);
  });

  it("is left out when no later accent passes", () => {
    const neutral = { accent2: "#7f7f7f", accent3: "#7f7f7f", accent4: "#7f7f7f", accent5: "#7f7f7f", accent6: "#7f7f7f" };
    expect(templateToCandidates(brand(neutral)).candidates.accent2).toBeUndefined();
  });
});
