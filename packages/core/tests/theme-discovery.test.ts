import { describe, it, expect } from "vitest";
import { readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadThemeShortlists,
  loadThemeSelectionIndex,
  loadLayoutRecipesMarkdown,
  findShortlist,
  sortShortlistsForDiscovery,
  shortlistCoveredThemes,
  resolveThemeAlias,
  themeMatchesMood,
  themeMatchesQuery,
  parseLayoutRecipeHeadings,
  getReferencesDir,
} from "../src/theme-discovery.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..", "..");
const THEMES_PKG = join(REPO_ROOT, "packages", "themes");
const CORE_THEMES = join(REPO_ROOT, "packages", "core", "themes");

function installedThemeDirs(): string[] {
  const fromPkg = readdirSync(THEMES_PKG).filter((d) =>
    existsSync(join(THEMES_PKG, d, "theme.json"))
  );
  const fromCore = readdirSync(CORE_THEMES).filter((d) =>
    existsSync(join(CORE_THEMES, d, "theme.json"))
  );
  return [...new Set([...fromPkg, ...fromCore])].sort();
}

describe("theme-discovery references", () => {
  it("resolves the references directory next to the package root", () => {
    expect(existsSync(join(getReferencesDir(), "theme-shortlists.json"))).toBe(true);
    expect(existsSync(join(getReferencesDir(), "theme-selection-index.json"))).toBe(true);
    expect(existsSync(join(getReferencesDir(), "layout-recipes.md"))).toBe(true);
  });

  it("loads shortlists with stable core-defaults", async () => {
    const doc = await loadThemeShortlists();
    expect(doc.shortlists.length).toBeGreaterThanOrEqual(13);
    const core = findShortlist(doc, "core-defaults");
    expect(core?.themes).toEqual(
      expect.arrayContaining(["default-tech", "claude", "developer-dark"])
    );
    expect(core?.popular).toBe(true);
  });

  it("sorts popular shortlists first for discovery UX", async () => {
    const doc = await loadThemeShortlists();
    const sorted = sortShortlistsForDiscovery(doc.shortlists);
    expect(sorted[0]?.popular).toBe(true);
    expect(sorted.filter((s) => s.popular).length).toBeGreaterThanOrEqual(8);
    const firstNonPopular = sorted.findIndex((s) => !s.popular);
    if (firstNonPopular >= 0) {
      expect(sorted.slice(0, firstNonPopular).every((s) => s.popular)).toBe(true);
    }
  });

  it("every shortlist theme exists as an installed theme package", async () => {
    const doc = await loadThemeShortlists();
    const installed = new Set(installedThemeDirs());
    const missing: string[] = [];
    for (const s of doc.shortlists) {
      for (const t of s.themes) {
        if (!installed.has(t)) missing.push(`${s.id}:${t}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it("selection index covers every installed theme", async () => {
    const index = await loadThemeSelectionIndex();
    const indexed = new Set(index.themes.map((t) => t.name));
    const missing = installedThemeDirs().filter((n) => !indexed.has(n));
    expect(missing).toEqual([]);
  });

  it("shortlists cover nearly the full catalog (agents get real defaults)", async () => {
    const doc = await loadThemeShortlists();
    const covered = shortlistCoveredThemes(doc);
    const total = installedThemeDirs().length;
    // Floor: curated use-case shortlists should cover almost every installable theme.
    // Intentional exceptions (if any) belong in theme-shortlists.json comments / docs — not silent orphans.
    expect(covered.size).toBeGreaterThanOrEqual(Math.min(70, Math.floor(total * 0.9)));
    expect(covered.size).toBeLessThanOrEqual(total);
    const orphans = installedThemeDirs().filter((n) => !covered.has(n));
    expect(orphans).toEqual([]);
  });

  it("loads at least 28 use-case shortlists after catalog expansion", async () => {
    const doc = await loadThemeShortlists();
    expect(doc.shortlists.length).toBeGreaterThanOrEqual(28);
    expect(findShortlist(doc, "loud-manifesto")?.themes).toEqual(
      expect.arrayContaining(["bold-poster", "coral", "peoples-platform"])
    );
    expect(findShortlist(doc, "desktop-nostalgia")?.themes).toContain("retro-windows");
  });
});

describe("theme-discovery helpers", () => {
  it("resolves alias_hints and selection aliases", async () => {
    const [shortlists, selection] = await Promise.all([
      loadThemeShortlists(),
      loadThemeSelectionIndex(),
    ]);
    expect(resolveThemeAlias("Neon Cyber", { shortlists, selection })).toBe("neon-noir");
    expect(resolveThemeAlias("Terminal Green", { shortlists, selection })).toBe(
      "crt-terminal"
    );
    expect(resolveThemeAlias("neon-noir", { shortlists, selection })).toBe("neon-noir");
  });

  it("filters by mood and free-text query", () => {
    const entry = {
      name: "neon-noir",
      mood: ["neon", "nightlife"],
      best_for: ["product launches"],
      aliases: ["Neon Cyber"],
    };
    expect(themeMatchesMood(entry, "neon")).toBe(true);
    expect(themeMatchesMood(entry, "editorial")).toBe(false);
    expect(themeMatchesQuery(entry, "cyber")).toBe(true);
    expect(themeMatchesQuery(entry, "boardroom")).toBe(false);
  });

  it("matches site mood-browse chips (popular / dark / editorial / neon)", async () => {
    const { themeMatchesBrowseFilter, THEME_BROWSE_FILTERS, THEME_BROWSE_POPULAR } =
      await import("../src/theme-browse.js");
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
    expect(THEME_BROWSE_POPULAR.has("aurora-glass")).toBe(true);
    expect(
      themeMatchesBrowseFilter(
        { scheme: "dark", mood: ["neon", "cinematic"], popular: true },
        "popular",
        "aurora-glass"
      )
    ).toBe(true);
    expect(
      themeMatchesBrowseFilter({ scheme: "dark", mood: ["neon", "edgy"] }, "neon", "default-tech")
    ).toBe(true);
    expect(
      themeMatchesBrowseFilter(
        { scheme: "light", mood: ["magazine", "ink", "literary"] },
        "editorial",
        "editorial-serif"
      )
    ).toBe(true);
    expect(
      themeMatchesBrowseFilter({ scheme: "light", mood: ["playful"] }, "dark", "playful")
    ).toBe(false);
  });

  it("parses layout recipe headings from the recipes markdown", async () => {
    const md = await loadLayoutRecipesMarkdown();
    const headings = parseLayoutRecipeHeadings(md);
    expect(headings.some((h) => /Pitch Deck/i.test(h))).toBe(true);
    expect(headings.some((h) => /Product Launch/i.test(h))).toBe(true);
    expect(headings.some((h) => /Neon|Atmosphere/i.test(h))).toBe(true);
    expect(headings.length).toBeGreaterThanOrEqual(12);
  });
});
