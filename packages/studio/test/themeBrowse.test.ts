import { describe, expect, it } from "vitest";
import {
  THEME_BROWSE_FILTERS,
  listThemeSummaries,
  themePassesBrowseFilter,
} from "../src/render/themes.js";

describe("Studio mood browse parity", () => {
  it("exposes the same browse chip ids as the site gallery", () => {
    expect(THEME_BROWSE_FILTERS.map((f) => f.id)).toEqual([
      "all",
      "popular",
      "dark",
      "light",
      "editorial",
      "neon",
      "playful",
      "brutal",
      "luxury",
      "tech",
    ]);
  });

  it("filters summaries by popular / dark / neon moods", () => {
    const themes = listThemeSummaries();
    expect(themes.length).toBeGreaterThanOrEqual(70);

    const popular = themes.filter((t) => themePassesBrowseFilter(t, "popular"));
    expect(popular.length).toBe(20);
    expect(popular.some((t) => t.name === "aurora-glass")).toBe(true);

    const dark = themes.filter((t) => themePassesBrowseFilter(t, "dark"));
    expect(dark.every((t) => t.scheme === "dark")).toBe(true);
    expect(dark.length).toBeGreaterThan(10);

    const neon = themes.filter((t) => themePassesBrowseFilter(t, "neon"));
    expect(neon.some((t) => t.name === "neon-noir" || t.name === "default-tech")).toBe(true);
  });
});
