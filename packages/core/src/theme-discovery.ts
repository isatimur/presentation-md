/**
 * Theme Discovery helpers — shortlists, selection index, and layout recipes
 * shared by MCP, Studio, and create-theme. Keeps JSON references as the
 * single source of truth under packages/core/references/.
 */
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export interface ThemeShortlist {
  id: string;
  label: string;
  themes: string[];
  why?: string;
  /** Discovery UX: surface these shortlists first (popularity / flagship use-cases). */
  popular?: boolean;
}

export interface ThemeShortlistsDoc {
  version?: number;
  description?: string;
  shortlists: ThemeShortlist[];
  alias_hints?: Record<string, string>;
}

export interface ThemeSelectionEntry {
  name: string;
  scheme?: string;
  formality?: string;
  mood?: string[];
  best_for?: string[];
  avoid_for?: string[];
  aliases?: string[];
  swatches?: string[];
  gallery?: string;
}

export interface ThemeSelectionIndex {
  version?: number;
  description?: string;
  themes: ThemeSelectionEntry[];
}

/** Package root for @presentation-md/core (dist/ → ..). */
export function getCorePackageRoot(): string {
  return join(dirname(fileURLToPath(import.meta.url)), "..");
}

export function getReferencesDir(): string {
  return join(getCorePackageRoot(), "references");
}

export async function loadThemeShortlists(): Promise<ThemeShortlistsDoc> {
  const raw = await readFile(join(getReferencesDir(), "theme-shortlists.json"), "utf-8");
  const doc = JSON.parse(raw) as ThemeShortlistsDoc;
  return {
    ...doc,
    shortlists: doc.shortlists ?? [],
    alias_hints: doc.alias_hints ?? {},
  };
}

export async function loadThemeSelectionIndex(): Promise<ThemeSelectionIndex> {
  const raw = await readFile(
    join(getReferencesDir(), "theme-selection-index.json"),
    "utf-8"
  );
  const doc = JSON.parse(raw) as ThemeSelectionIndex;
  return { ...doc, themes: doc.themes ?? [] };
}

export async function loadLayoutRecipesMarkdown(): Promise<string> {
  return readFile(join(getReferencesDir(), "layout-recipes.md"), "utf-8");
}

export function findShortlist(
  doc: ThemeShortlistsDoc,
  id: string
): ThemeShortlist | undefined {
  const needle = id.trim();
  if (!needle) return undefined;
  return doc.shortlists.find((s) => s.id === needle);
}

/**
 * Sort shortlists for discovery UX — popular / flagship sets first, then the rest
 * in catalog order. Mirrors frontend-slides "popularity" browsing without inventing ranks.
 */
export function sortShortlistsForDiscovery(shortlists: ThemeShortlist[]): ThemeShortlist[] {
  return [...shortlists].sort((a, b) => Number(!!b.popular) - Number(!!a.popular));
}

/** Themes that appear in at least one shortlist. */
export function shortlistCoveredThemes(doc: ThemeShortlistsDoc): Set<string> {
  const names = new Set<string>();
  for (const s of doc.shortlists) {
    for (const t of s.themes) names.add(t);
  }
  return names;
}

/** Resolve a display alias (shortlist hints or selection-index aliases) → package id. */
export function resolveThemeAlias(
  alias: string,
  opts: {
    shortlists?: ThemeShortlistsDoc | null;
    selection?: ThemeSelectionIndex | null;
  } = {}
): string | undefined {
  const needle = alias.trim().toLowerCase();
  if (!needle) return undefined;

  const hints = opts.shortlists?.alias_hints ?? {};
  for (const [label, id] of Object.entries(hints)) {
    if (label.toLowerCase() === needle || id.toLowerCase() === needle) return id;
  }

  for (const t of opts.selection?.themes ?? []) {
    if (t.name.toLowerCase() === needle) return t.name;
    if ((t.aliases ?? []).some((a) => a.toLowerCase() === needle)) return t.name;
  }
  return undefined;
}

export function themeMatchesMood(entry: ThemeSelectionEntry, mood: string): boolean {
  const m = mood.trim().toLowerCase();
  if (!m) return true;
  return (entry.mood ?? []).some((x) => x.toLowerCase().includes(m));
}

export function themeMatchesQuery(
  fields: {
    name: string;
    vibe?: string;
    description?: string;
    aliases?: string[];
    best_for?: string[];
    mood?: string[];
  },
  query: string
): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = [
    fields.name,
    fields.vibe ?? "",
    fields.description ?? "",
    ...(fields.aliases ?? []),
    ...(fields.best_for ?? []),
    ...(fields.mood ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return hay.includes(q);
}

/** Public site origin for agent deep-links (gallery / Studio / previews). */
export const PRESENTATION_MD_SITE = "https://presentation-md.vercel.app";

/**
 * Stunning-25 theme → Studio `?example=` slug (canonical craft ceiling).
 * Keep in sync with packages/core/references/stunning-25.md.
 */
export const STUNNING_25_STUDIO_EXAMPLES: Readonly<Record<string, string>> = {
  "aurora-glass": "novaspark-pitch",
  "ft-editorial": "meridian-sales",
  "genz-bento": "bounce-launch",
  "luxury-minimalist": "solstice-update",
  "crt-terminal": "retronet-demo",
  "swiss-typographic": "gridsystems-studio",
  "brutalist-acid": "monolith-seriesa",
  "candy-pop": "jellybean-launch",
  "aerospace-hud": "axiom-robotics",
  "heritage-editorial": "atelier-brand",
  "fintech-clean": "ledgerline-payout",
  "developer-dark": "forge-api",
  "data-editorial": "signalbox-report",
  bauhaus: "primary-keynote",
  "y2k-aero": "bubbleflow-launch",
  "risograph-zine": "inkwell-pitch",
  "neon-noir": "neondistrict-platform",
  scandinavian: "hygge-brand",
  "art-deco": "meridianclub-investor",
  vaporwave: "mallsoft-launch",
  broadsheet: "dailyledger-mediakit",
  glassmorphism: "cloudpeak-pricing",
  "kinetic-wrapped": "pulse-wrapped",
  "botanical-luxe": "verdant-impact",
  blueprint: "apsis-mission",
};

/** Absolute URLs for Theme Discovery — open proofs before authoring. */
export function themeDiscoveryLinks(themeName: string, galleryPath?: string): {
  preview_url: string;
  studio_url?: string;
  gallery_url?: string;
  studio_example?: string;
} {
  const preview_url = `${PRESENTATION_MD_SITE}/previews/${encodeURIComponent(themeName)}.html`;
  const studio_example = STUNNING_25_STUDIO_EXAMPLES[themeName];
  const studio_url = studio_example
    ? `${PRESENTATION_MD_SITE}/studio/?example=${encodeURIComponent(studio_example)}&fresh=1`
    : undefined;
  let gallery_url: string | undefined;
  if (galleryPath?.trim()) {
    const rel = galleryPath.trim().replace(/^\//, "");
    gallery_url = rel.startsWith("http")
      ? rel
      : `${PRESENTATION_MD_SITE}/${rel.replace(/^examples\//, "examples/")}`;
  }
  return { preview_url, studio_url, gallery_url, studio_example };
}

/** Recipe heading titles from layout-recipes.md (## Name). */
export function parseLayoutRecipeHeadings(md: string): string[] {
  const headings: string[] = [];
  for (const line of md.split("\n")) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m?.[1]) headings.push(m[1].trim());
  }
  return headings;
}
