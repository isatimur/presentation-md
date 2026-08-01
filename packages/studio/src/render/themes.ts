import type {
  ResolvedTheme,
  ThemeManifest,
  Palette,
  Typography,
  Geometry,
} from "@presentation-md/core/theme-types";
import {
  THEME_BROWSE_FILTERS,
  isThemeBrowsePopular,
  themeMatchesBrowseFilter,
  type ThemeBrowseFilterId,
  type ThemeBrowseMeta,
} from "@presentation-md/core/theme-browse";
import shortlistsDoc from "../../../core/references/theme-shortlists.json";
import selectionIndexDoc from "../../../core/references/theme-selection-index.json";

/**
 * Browser theme registry. Bundles every `theme.json` in the monorepo (core +
 * themes packages) at build time and resolves the `extends` chain in-memory —
 * a fs-free port of core's `loadTheme`, so the studio stays a static SPA.
 */

const DEFAULT_PALETTE: Palette = {
  bg: "#0e0e12",
  bg2: "#16161d",
  text: "#f4f4f5",
  muted: "#a1a1aa",
  accent: "#7c3aed",
  accent2: "#22d3ee",
  cardBg: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.08)",
};

const DEFAULT_TYPOGRAPHY: Typography = {
  headingFont: "'Montserrat', system-ui, sans-serif",
  bodyFont: "'Open Sans', system-ui, sans-serif",
  headingWeight: 800,
  googleFonts: ["Montserrat:wght@700;800", "Open+Sans:wght@400;600"],
};

const DEFAULT_GEOMETRY: Geometry = {
  radius: "18px",
  slideWidth: "1280px",
};

const manifestModules = {
  ...import.meta.glob("../../../core/themes/*/theme.json", { eager: true }),
  ...import.meta.glob("../../../themes/*/theme.json", { eager: true }),
} as Record<string, { default: ThemeManifest } | ThemeManifest>;

const REGISTRY = new Map<string, ThemeManifest>();
for (const mod of Object.values(manifestModules)) {
  const manifest = ("default" in mod ? mod.default : mod) as ThemeManifest;
  if (manifest?.name) REGISTRY.set(manifest.name, manifest);
}

const SELECTION_BY_NAME = new Map(
  (selectionIndexDoc.themes ?? []).map((t) => [
    t.name,
    {
      scheme: t.scheme,
      mood: t.mood,
      formality: t.formality,
      popular: isThemeBrowsePopular(t.name),
    } satisfies ThemeBrowseMeta,
  ])
);

export interface ThemeSummary {
  name: string;
  vibe: string;
  bg: string;
  accent: string;
  scheme?: string;
  mood?: string[];
  formality?: string;
  popular?: boolean;
}

export interface ThemeShortlistSummary {
  id: string;
  label: string;
  themes: string[];
  why?: string;
  popular?: boolean;
}

export { THEME_BROWSE_FILTERS };
export type { ThemeBrowseFilterId };

export function listThemeNames(): string[] {
  return [...REGISTRY.keys()].sort();
}

/** Browseable theme cards — name + vibe + palette cues + mood meta for Studio filters. */
export function listThemeSummaries(): ThemeSummary[] {
  return listThemeNames().map((name) => {
    const theme = resolveTheme(name);
    const vibe =
      (theme.manifest as ThemeManifest & { vibe?: string }).vibe ??
      theme.manifest.description ??
      name;
    const sel = SELECTION_BY_NAME.get(name);
    return {
      name,
      vibe,
      bg: theme.palette.bg,
      accent: theme.palette.accent,
      scheme: sel?.scheme,
      mood: sel?.mood,
      formality: sel?.formality,
      popular: sel?.popular ?? isThemeBrowsePopular(name),
    };
  });
}

/** Theme Discovery shortlists (same catalog MCP list_themes / preview_themes use). Popular first. */
export function listThemeShortlists(): ThemeShortlistSummary[] {
  const list = (shortlistsDoc.shortlists ?? []).map((s) => ({
    id: s.id,
    label: s.label,
    themes: s.themes,
    why: s.why,
    popular: Boolean((s as { popular?: boolean }).popular),
  }));
  return list.sort((a, b) => Number(b.popular) - Number(a.popular));
}

export function findThemeShortlist(id: string): ThemeShortlistSummary | undefined {
  return listThemeShortlists().find((s) => s.id === id);
}

export function themePassesBrowseFilter(
  theme: ThemeSummary,
  filter: ThemeBrowseFilterId
): boolean {
  return themeMatchesBrowseFilter(
    {
      scheme: theme.scheme,
      mood: theme.mood,
      formality: theme.formality,
      popular: theme.popular,
    },
    filter,
    theme.name
  );
}

export function resolveTheme(name: string): ResolvedTheme {
  const chain: ThemeManifest[] = [];
  let current: string | undefined = REGISTRY.has(name) ? name : "default-tech";
  const seen = new Set<string>();
  while (current && !seen.has(current)) {
    seen.add(current);
    const manifest = REGISTRY.get(current);
    if (!manifest) break;
    chain.unshift(manifest);
    current = manifest.extends;
  }

  const palette = { ...DEFAULT_PALETTE };
  const typography = { ...DEFAULT_TYPOGRAPHY };
  const geometry = { ...DEFAULT_GEOMETRY };
  for (const m of chain) {
    Object.assign(palette, m.roles ?? {});
    Object.assign(typography, m.typography ?? {});
    Object.assign(geometry, m.geometry ?? {});
  }

  const top = chain[chain.length - 1] ?? {
    name: "default-tech",
    version: "0.0.0",
  };
  return { name: top.name, version: top.version, manifest: top, palette, typography, geometry };
}
