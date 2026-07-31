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
