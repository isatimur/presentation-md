import { describe, expect, it } from "vitest";
import { buildThemesDiscoveryList, THEME_BROWSE_POPULAR } from "../src/index.js";

describe("buildThemesDiscoveryList", () => {
  const discovered = [
    {
      name: "default-tech",
      version: "1.0.0",
      source: "bundled",
      description: "Default tech",
      vibe: "confident tech",
    },
    {
      name: "claude",
      version: "1.0.0",
      source: "bundled",
      description: "Claude paper",
      vibe: "warm editorial",
    },
    {
      name: "neon-noir",
      version: "1.0.0",
      source: "package",
      description: "Neon night",
      vibe: "cyber neon",
    },
  ];

  it("attaches studio_url + preview_url and suggested_preview", async () => {
    const result = await buildThemesDiscoveryList({ discovered });
    expect(result.themes.length).toBe(3);
    for (const t of result.themes) {
      expect(t.studio_url).toMatch(/\/studio\//);
      expect(t.preview_url).toContain(`/previews/${encodeURIComponent(t.name)}.html`);
    }
    expect(result.suggested_preview?.themes.length).toBeGreaterThan(0);
    expect(result.discovery_hint).toMatch(/suggested_preview|preview_themes/i);
  });

  it("filters by browse popular chip", async () => {
    const result = await buildThemesDiscoveryList({
      discovered,
      browse: "popular",
      includeBrowseFilters: true,
    });
    expect(result.browse).toBe("popular");
    expect(result.themes.every((t) => THEME_BROWSE_POPULAR.has(t.name))).toBe(true);
    expect(result.browse_filters?.some((f) => f.id === "neon")).toBe(true);
  });

  it("returns browse_error for unknown chips", async () => {
    const result = await buildThemesDiscoveryList({
      discovered,
      browse: "not-a-chip",
    });
    expect(result.browse_error).toMatch(/Unknown browse chip/i);
    expect(result.browse_filters?.length).toBeGreaterThan(0);
  });
});
