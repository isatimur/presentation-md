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

/** Recipe heading titles from layout-recipes.md (## Name). */
export function parseLayoutRecipeHeadings(md: string): string[] {
  const headings: string[] = [];
  for (const line of md.split("\n")) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m?.[1]) headings.push(m[1].trim());
  }
  return headings;
}
