import { describe, it, expect } from "vitest";
import { renderChartSvg, sanitizeCustomHtml } from "../src/index.js";

describe("renderChartSvg", () => {
  it("renders a bar chart with categories and series", () => {
    const svg = renderChartSvg({
      chartType: "bar",
      categories: ["Q1", "Q2", "Q3"],
      series: [{ name: "Revenue", values: [10, 20, 30] }],
      showValues: true,
    });
    expect(svg).toContain("<svg");
    expect(svg).toContain("Q1");
    expect(svg).toContain("chart-marks");
    expect(svg).toContain("<rect");
  });

  it("renders multi-series line charts", () => {
    const svg = renderChartSvg({
      chartType: "line",
      categories: ["A", "B", "C"],
      series: [
        { name: "One", values: [1, 3, 2] },
        { name: "Two", values: [2, 2, 5] },
      ],
    });
    expect(svg).toContain("polyline");
    expect(svg).toContain("One");
    expect(svg).toContain("Two");
  });

  it("renders pie slices from a single series", () => {
    const svg = renderChartSvg({
      chartType: "pie",
      categories: ["Alpha", "Beta"],
      series: [{ name: "Share", values: [60, 40] }],
    });
    expect(svg).toContain("chart-slices");
    expect(svg).toContain("Alpha");
  });

  it("returns an empty-state SVG when there is no data", () => {
    const svg = renderChartSvg({ chartType: "bar", series: [] });
    expect(svg).toContain("No chart data");
  });
});

describe("sanitizeCustomHtml reserved ids (DOM clobbering)", () => {
  it("drops pmd-*/psp-* ids so slides cannot shadow pmd-chrome or pmd-deck", () => {
    const out = sanitizeCustomHtml(
      `<div id="pmd-chrome">{"upNext":"<img src=x>"}</div><p id='psp-deck'>x</p><span id=pmd-dots>y</span><b id="ok">z</b>`
    );
    expect(out).not.toMatch(/id\s*=\s*["']?(pmd|psp)-/i);
    expect(out).toContain('id="ok"');
  });

  it("drops entity-encoded reserved ids too", () => {
    for (const html of [
      `<div id="&#112;md-chrome">x</div>`,
      `<div id="&#x70;md-deck">x</div>`,
      `<div id='p&#109;d-blackout'>x</div>`,
      `<div ID = "PMD-chrome">x</div>`,
    ]) {
      expect(sanitizeCustomHtml(html), html).not.toMatch(/\sid\s*=/i);
    }
  });

  it("fails closed when deep nesting never stabilizes", () => {
    let payload = "alert(1)";
    for (let i = 0; i < 12; i++) payload = `<scr${payload.startsWith("<") ? "" : ""}<script>ipt>${payload}</scr</script>ipt>`;
    const nested = "<scr".repeat(12) + "<script>" + "ipt>".repeat(12) + "x";
    for (const input of [payload, nested]) {
      const out = sanitizeCustomHtml(input);
      expect(out).not.toMatch(/<\s*script/i);
      expect(sanitizeCustomHtml(out)).toBe(out);
    }
  });

  it("is stable: running it again changes nothing", () => {
    const tricky = `<scr<script>ipt>alert(1)</scr</script>ipt><div id="pmd-x" onclick="x()">ok</div>`;
    const once = sanitizeCustomHtml(tricky);
    expect(sanitizeCustomHtml(once)).toBe(once);
    expect(once).not.toMatch(/<\s*script/i);
  });
});

describe("sanitizeCustomHtml", () => {
  it("strips script tags and event handlers", () => {
    const dirty =
      `<div onclick="alert(1)">Hi</div><script>alert(2)</script><a href="javascript:alert(3)">x</a>`;
    const clean = sanitizeCustomHtml(dirty);
    expect(clean).not.toContain("<script");
    expect(clean).not.toContain("onclick");
    expect(clean).not.toContain("javascript:");
    expect(clean).toContain("Hi");
  });

  it("allows structural markup and theme-friendly inline style", () => {
    const html = `<div style="color:var(--accent)"><h3>Art</h3><p>Ok</p></div>`;
    expect(sanitizeCustomHtml(html)).toContain("var(--accent)");
    expect(sanitizeCustomHtml(html)).toContain("<h3>Art</h3>");
  });
});
