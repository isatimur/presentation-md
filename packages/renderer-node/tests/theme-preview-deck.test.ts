import { describe, expect, it } from "vitest";
import {
  buildLayoutsPreviewDeck,
  buildTitlePreviewDeck,
  discoverySlideIndices,
  layoutsPreviewLayoutNames,
  layoutsPreviewSlideCount,
  parsePreviewCompareThemes,
} from "../src/theme-preview-deck.js";

describe("theme-preview-deck", () => {
  it("parses and caps compare themes at 3 unique names", () => {
    expect(parsePreviewCompareThemes("a, b | c  d")).toEqual(["a", "b", "c"]);
    expect(parsePreviewCompareThemes("a,a,b")).toEqual(["a", "b"]);
    expect(parsePreviewCompareThemes("")).toEqual([]);
  });

  it("builds title and layouts preview decks with the locked theme", () => {
    const title = JSON.parse(buildTitlePreviewDeck("aurora-glass", "Aurora"));
    expect(title.meta.theme).toBe("aurora-glass");
    expect(title.slides).toHaveLength(1);
    expect(title.slides[0].layout).toBe("title");

    const layouts = JSON.parse(buildLayoutsPreviewDeck("signal"));
    expect(layouts.meta.theme).toBe("signal");
    expect(layouts.slides.length).toBeGreaterThanOrEqual(5);
    expect(layouts.slides.map((s: { layout: string }) => s.layout)).toEqual(
      expect.arrayContaining(["title", "feature-grid", "comparison", "closing"])
    );

    const wrap = JSON.parse(buildLayoutsPreviewDeck("kinetic-wrapped", "Wrapped"));
    expect(wrap.slides.map((s: { layout: string }) => s.layout)).toEqual(
      expect.arrayContaining(["streak-grid", "metric-ring"])
    );
  });

  it("discoverySlideIndices densifies title + bento + comparison for layouts", () => {
    expect(discoverySlideIndices("title", 1)).toEqual([1]);
    expect(discoverySlideIndices("layouts", 11)).toEqual([1, 3, 5]);
    expect(discoverySlideIndices("layouts", 2)).toEqual([1]);
    expect(layoutsPreviewSlideCount("default-tech")).toBe(11);
    expect(layoutsPreviewLayoutNames("default-tech")).toContain("chart");
    expect(layoutsPreviewLayoutNames("default-tech")[2]).toBe("feature-grid");
    expect(layoutsPreviewLayoutNames("default-tech")[4]).toBe("comparison");
    const wrapLayouts = layoutsPreviewLayoutNames("kinetic-wrapped");
    expect(wrapLayouts).toHaveLength(13);
    expect(wrapLayouts.indexOf("streak-grid")).toBe(wrapLayouts.indexOf("stat-row") + 1);
    expect(wrapLayouts.indexOf("metric-ring")).toBe(wrapLayouts.indexOf("stat-row") + 2);
  });
});
