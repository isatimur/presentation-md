import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { ResolvedTheme } from "@presentation-md/core";
import { deckToPptxBuffer, type DeckJson } from "../src/index.js";
import { FLAT_FIELD_SURFACES } from "../src/flat-surfaces.js";
import { withShapeDefaults } from "../src/shape-defaults.js";
import type { PptxSlide } from "../src/pptx.js";

function theme(name: string): ResolvedTheme {
  return {
    name,
    version: "1.0.0",
    manifest: { name, version: "1.0.0" },
    palette: {
      bg: "#ffffff",
      bg2: "#f5f5f5",
      text: "#1a1a1a",
      muted: "#616161",
      accent: "#2b6cb0",
      accent2: "#e63946",
      cardBg: "#fafafa",
      border: "#e4e4e4",
    },
    typography: {
      headingFont: "'Source Serif 4', Georgia, serif",
      bodyFont: "'Inter', system-ui, sans-serif",
      headingWeight: 700,
      googleFonts: [],
    },
    geometry: { radius: "4px", slideWidth: "1280px" },
  };
}

function deck(themeName: string, slides: DeckJson["slides"]): DeckJson {
  return { type: "deck", meta: { title: "Shapes", theme: themeName }, slides } as DeckJson;
}

async function slideXml(d: DeckJson, themeName: string, n = 1): Promise<string> {
  const JSZip = (await import("jszip")).default;
  const buf = await deckToPptxBuffer(d, theme(themeName), { attribution: false });
  const zip = await JSZip.loadAsync(buf);
  return (await zip.file(`ppt/slides/slide${n}.xml`)?.async("string")) ?? "";
}

async function chartXml(d: DeckJson, themeName: string): Promise<string> {
  const JSZip = (await import("jszip")).default;
  const buf = await deckToPptxBuffer(d, theme(themeName), { attribution: false });
  const zip = await JSZip.loadAsync(buf);
  const name = Object.keys(zip.files).find((f) => /^ppt\/charts\/chart\d+\.xml$/.test(f));
  return name ? ((await zip.file(name)?.async("string")) ?? "") : "";
}

describe("withShapeDefaults", () => {
  function fakeSlide() {
    const calls: { kind: string; shape?: unknown; opts?: Record<string, unknown> }[] = [];
    const slide = {
      addShape: (shape: unknown, opts?: Record<string, unknown>) => {
        calls.push({ kind: "shape", shape, opts });
        return slide;
      },
      addText: (_text: unknown, opts?: Record<string, unknown>) => {
        calls.push({ kind: "text", shape: opts?.shape, opts });
        return slide;
      },
    };
    const wrapped = withShapeDefaults(slide as unknown as PptxSlide, {
      roundRect: "roundRect" as never,
      rect: "rect" as never,
    }) as unknown as typeof slide;
    return { wrapped, calls };
  }

  it("draws a roundRect with rectRadius 0 as a plain rect", () => {
    const { wrapped, calls } = fakeSlide();
    wrapped.addShape("roundRect", { x: 0, y: 0, w: 1, h: 1, rectRadius: 0 });
    wrapped.addShape("roundRect", { x: 0, y: 0, w: 1, h: 1, rectRadius: 0.2 });
    wrapped.addShape("roundRect", { x: 0, y: 0, w: 1, h: 1 });
    expect(calls.map((c) => c.shape)).toEqual(["rect", "roundRect", "roundRect"]);
  });

  it("turns a zero-width line into no line and keeps other lines", () => {
    const { wrapped, calls } = fakeSlide();
    wrapped.addShape("rect", { line: { color: "FF0000", width: 0 } });
    wrapped.addShape("rect", { line: { color: "FF0000", width: 2 } });
    expect(calls[0]?.opts?.line).toEqual({ type: "none" });
    expect(calls[1]?.opts?.line).toEqual({ color: "FF0000", width: 2 });
  });

  it("applies both rules to text boxes that carry a shape", () => {
    const { wrapped, calls } = fakeSlide();
    wrapped.addText("Card", { shape: "roundRect", rectRadius: 0, line: { color: "000000", width: 0 } });
    wrapped.addText("Plain", { x: 1 });
    expect(calls[0]?.shape).toBe("rect");
    expect(calls[0]?.opts?.line).toEqual({ type: "none" });
    expect(calls[1]?.opts).toEqual({ x: 1 });
  });
});

describe("PPTX square chrome", () => {
  it("writes no default-rounded roundRect and no 1 pt line for width 0", async () => {
    const xml = await slideXml(deck("data-editorial", [{ layout: "title", heading: "Revenue grew" }]), "data-editorial");
    expect(xml).not.toMatch(/prst="roundRect"><a:avLst><\/a:avLst>/);
    expect(xml).toMatch(/prst="rect"/);
  });

  it("skips the bg2 wash on a flat-field theme and keeps it on a gradient theme", async () => {
    const slides = [{ layout: "title", heading: "Revenue grew" }] as DeckJson["slides"];
    const flat = await slideXml(deck("data-editorial", slides), "data-editorial");
    const gradient = await slideXml(deck("corporate", slides), "corporate");
    const wash = /<a:srgbClr val="F5F5F5"><a:alpha val="45000"\/>/;
    expect(flat).not.toMatch(wash);
    expect(gradient).toMatch(wash);
  });
});

describe("PPTX chart value labels", () => {
  it("prints decimals as given instead of rounding to whole numbers", async () => {
    const xml = await chartXml(
      deck("data-editorial", [
        {
          layout: "chart",
          heading: "Revenue",
          chartType: "bar",
          categories: ["Q1", "Q2"],
          series: [{ name: "Actual", values: [1.8, 2.3] }],
          showValues: true,
        },
      ] as DeckJson["slides"]),
      "data-editorial"
    );
    expect(xml).toContain('formatCode="General"');
    expect(xml).not.toContain('formatCode="#,##0"');
  });
});

describe("FLAT_FIELD_SURFACES", () => {
  it("matches the surfaces whose .slide rule sets --slide-bg: var(--bg)", () => {
    const css = readFileSync(new URL("../../shared/surfaces.css", import.meta.url), "utf8").replace(
      /\/\*[\s\S]*?\*\//g,
      ""
    );
    const flat = new Set<string>();
    for (const [, selectors = "", body = ""] of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
      const bg = body.match(/--slide-bg:\s*([^;]+);/)?.[1]?.trim();
      if (bg !== "var(--bg)") continue;
      for (const sel of selectors.split(",")) {
        const m = sel.trim().match(/^\.deck\[data-surface="([^"]+)"\] \.slide$/);
        if (m?.[1]) flat.add(m[1]);
      }
    }
    expect([...FLAT_FIELD_SURFACES].sort()).toEqual([...flat].sort());
  });
});
