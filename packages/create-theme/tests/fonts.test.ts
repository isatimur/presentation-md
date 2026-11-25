import { describe, it, expect } from "vitest";
import { buildFontPlan, classifyFont, sanitizeFamily } from "../src/fonts.js";
import { GOOGLE_FONT_FAMILIES } from "../src/google-font-families.js";

describe("classifyFont", () => {
  it("classifies google, office and unavailable families", () => {
    expect(GOOGLE_FONT_FAMILIES.has("inter")).toBe(true);
    expect(classifyFont("Inter")).toBe("google");
    expect(classifyFont("Calibri")).toBe("office");
    expect(classifyFont("Acme Sans")).toBe("unavailable");
  });
});

describe("sanitizeFamily", () => {
  it("strips quotes and other characters outside the allowed set", () => {
    expect(sanitizeFamily(`Acme "Sans'`)).toBe("Acme Sans");
    expect(sanitizeFamily(`Evil', serif; } body { color: red`)).toBe("Evil serif body color red");
    expect(sanitizeFamily("Noto_Sans-JP 2.0")).toBe("Noto_Sans-JP 2.0");
    expect(sanitizeFamily(`"';{}`)).toBe("");
  });
});

describe("buildFontPlan", () => {
  it("puts the brand family first, then the base family and tail (claude)", () => {
    const plan = buildFontPlan("Acme Sans", "Calibri", "claude");
    expect(plan.headingStack).toBe("'Acme Sans', 'Space Grotesk', system-ui, sans-serif");
    expect(plan.bodyStack).toBe("'Calibri', 'Lora', Georgia, 'Times New Roman', serif");
    expect(plan.rows).toEqual([
      { role: "heading", family: "Acme Sans", status: "unavailable", fallback: "Space Grotesk" },
      { role: "body", family: "Calibri", status: "office", fallback: "Lora" },
    ]);
    // Neither brand font is on Google Fonts, so both base specs are copied verbatim.
    expect(plan.googleFonts).toEqual(["Space+Grotesk:wght@500;600;700", "Lora:wght@400;500;600"]);
    expect(plan.warnings).toEqual([]);
  });

  it("writes a brand spec with + for spaces when the family is on Google Fonts (default-tech)", () => {
    const plan = buildFontPlan("Source Sans 3", "Inter", "default-tech");
    expect(plan.headingStack).toBe("'Source Sans 3', 'Montserrat', system-ui, sans-serif");
    expect(plan.bodyStack).toBe("'Inter', 'Open Sans', system-ui, sans-serif");
    expect(plan.googleFonts).toEqual(["Source+Sans+3:wght@400;700", "Inter:wght@400;500"]);
  });

  it("keeps heading-then-body order and one spec per role", () => {
    const plan = buildFontPlan("Acme Sans", "Acme Sans", "default-tech");
    expect(plan.googleFonts).toEqual(["Montserrat:wght@700;800", "Open+Sans:wght@400;600"]);
    const same = buildFontPlan("Inter", "Inter", "claude");
    // Same family, different weights per role: both specs stay.
    expect(same.googleFonts).toEqual(["Inter:wght@400;700", "Inter:wght@400;500"]);
    const fallback = buildFontPlan(undefined, undefined, "default-tech");
    expect(fallback.googleFonts).toEqual(["Montserrat:wght@700;800", "Open+Sans:wght@400;600"]);
  });

  it("keeps the base stack when the brand family is the base family", () => {
    const plan = buildFontPlan("montserrat", "Open Sans", "default-tech");
    expect(plan.headingStack).toBe("'Montserrat', system-ui, sans-serif");
    expect(plan.bodyStack).toBe("'Open Sans', system-ui, sans-serif");
    expect(plan.googleFonts).toEqual(["Montserrat:wght@700;800", "Open+Sans:wght@400;600"]);
  });

  it("falls back to the base family with a warning when a family is missing or empty after sanitizing", () => {
    const plan = buildFontPlan(`"';`, undefined, "claude");
    expect(plan.rows[0]).toEqual({
      role: "heading",
      family: "Space Grotesk",
      status: "google",
      fallback: "Space Grotesk",
    });
    expect(plan.rows[1]!.family).toBe("Lora");
    expect(plan.headingStack).toBe("'Space Grotesk', system-ui, sans-serif");
    expect(plan.warnings).toEqual([
      "No usable heading font in the source; using the base theme's 'Space Grotesk'.",
      "No usable body font in the source; using the base theme's 'Lora'.",
    ]);
  });

  it("never lets a quote from the source reach the stack", () => {
    const plan = buildFontPlan(`Acme', evil`, `Body"Font`, "claude");
    expect(plan.headingStack.startsWith("'Acme evil', ")).toBe(true);
    expect(plan.bodyStack.startsWith("'BodyFont', ")).toBe(true);
  });
});
