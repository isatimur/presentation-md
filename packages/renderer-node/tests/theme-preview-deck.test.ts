import { describe, expect, it } from "vitest";
import {
  buildLayoutsPreviewDeck,
  buildTitlePreviewDeck,
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
  });
});
