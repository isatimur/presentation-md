/**
 * Site + Studio mood-browse chips (web/index.html `#theme-filters`).
 * Pure helpers — safe for browser Studio (no node:fs).
 * Keep labels/ids in lockstep with the marketing gallery toolbar.
 */

export const THEME_BROWSE_FILTERS = [
  { id: "all", label: "All" },
  { id: "popular", label: "Popular" },
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
  { id: "editorial", label: "Editorial" },
  { id: "neon", label: "Neon" },
  { id: "playful", label: "Playful" },
  { id: "brutal", label: "Brutal / poster" },
  { id: "luxury", label: "Luxury" },
  { id: "tech", label: "Tech" },
] as const;

export type ThemeBrowseFilterId = (typeof THEME_BROWSE_FILTERS)[number]["id"];

export interface ThemeBrowseMeta {
  scheme?: string;
  mood?: string[];
  formality?: string;
  /** Gallery "Popular" chip — same set as web/index.html mood index. */
  popular?: boolean;
}

/**
 * Flagship / discovery-popular themes (matches site mood-index `popular:true`).
 * Used when selection-index entries omit an explicit popular flag.
 */
export const THEME_BROWSE_POPULAR: ReadonlySet<string> = new Set([
  "claude",
  "default-tech",
  "corporate",
  "playful",
  "luxury-minimalist",
  "aurora-glass",
  "ft-editorial",
  "genz-bento",
  "crt-terminal",
  "swiss-typographic",
  "candy-pop",
  "bauhaus",
  "neon-noir",
  "vaporwave",
  "developer-dark",
  "kinetic-wrapped",
  "glassmorphism",
  "soft-editorial",
  "bold-signal",
  "electric-studio",
]);

export function isThemeBrowsePopular(themeName: string, meta?: ThemeBrowseMeta): boolean {
  if (meta?.popular === true) return true;
  if (meta?.popular === false) return false;
  return THEME_BROWSE_POPULAR.has(themeName);
}

/** Same matching rules as the site theme-filter-bar (mood regex buckets). */
export function themeMatchesBrowseFilter(
  meta: ThemeBrowseMeta,
  filter: ThemeBrowseFilterId,
  themeName?: string
): boolean {
  if (filter === "all") return true;
  if (filter === "popular") {
    return isThemeBrowsePopular(themeName ?? "", meta);
  }
  if (filter === "dark" || filter === "light") {
    return (meta.scheme ?? "light") === filter;
  }
  const hay = ((meta.mood ?? []).join(" ") + " " + (meta.formality ?? "")).toLowerCase();
  if (filter === "editorial") {
    return /editorial|literary|magazine|paper|serif|human|warm|quiet/.test(hay);
  }
  if (filter === "neon") {
    return /neon|cyber|arcade|voltage|kinetic|edgy/.test(hay);
  }
  if (filter === "playful") {
    return /playful|pastel|candy|friendly|fun|soft|consumer/.test(hay);
  }
  if (filter === "brutal") {
    return /brutal|poster|zine|acid|neo|loud|graphic|rebel/.test(hay);
  }
  if (filter === "luxury") {
    return /luxury|luxe|heritage|deco|quiet|gallery|nocturnal/.test(hay);
  }
  if (filter === "tech") {
    return /tech|developer|startup|saas|hud|terminal|forge|confident/.test(hay);
  }
  return true;
}

export function isThemeBrowseFilterId(value: string): value is ThemeBrowseFilterId {
  return (THEME_BROWSE_FILTERS as readonly { id: string }[]).some((f) => f.id === value);
}
