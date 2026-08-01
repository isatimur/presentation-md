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

export interface DiscoveryPreviewCandidate {
  name: string;
  scheme?: string;
  mood?: string[];
  formality?: string;
  popular?: boolean;
}

export interface DiscoveryPreviewTrio {
  /** Ordered theme names for preview_themes / Studio pick-3 (≤3). */
  themes: string[];
  roles: {
    safe?: string;
    bold?: string;
    wildcard?: string;
  };
  /** Agent/Studio hint — mirrors frontend-slides safe + bold + wildcard discovery. */
  hint: string;
}

function moodHay(c: DiscoveryPreviewCandidate): string {
  return ((c.mood ?? []).join(" ") + " " + (c.formality ?? "")).toLowerCase();
}

function isBoldCandidate(c: DiscoveryPreviewCandidate): boolean {
  return /neon|cyber|arcade|voltage|kinetic|edgy|brutal|poster|zine|acid|loud|graphic|rebel/.test(
    moodHay(c)
  );
}

function isSafeCandidate(c: DiscoveryPreviewCandidate): boolean {
  if (isBoldCandidate(c)) return false;
  const hay = moodHay(c);
  if (/editorial|literary|quiet|warm|human|professional|corporate|clean/.test(hay)) return true;
  if ((c.scheme ?? "light") === "light" && isThemeBrowsePopular(c.name, c)) return true;
  return isThemeBrowsePopular(c.name, c);
}

/**
 * Curate a safe / bold / wildcard preview trio from a filtered theme pool —
 * same discovery mix frontend-slides forces in style selection, but from
 * schema-validated themes (site browse chips, Studio mood row, MCP list_themes).
 */
export function pickDiscoveryPreviewTrio(
  candidates: DiscoveryPreviewCandidate[],
  limit = 3
): DiscoveryPreviewTrio | null {
  const cap = Math.max(1, Math.min(3, limit));
  const seen = new Set<string>();
  const pool: DiscoveryPreviewCandidate[] = [];
  for (const c of candidates) {
    const name = c.name?.trim();
    if (!name || seen.has(name)) continue;
    seen.add(name);
    pool.push({ ...c, name });
  }
  if (pool.length === 0) return null;

  const unused = [...pool];
  const take = (pred: (c: DiscoveryPreviewCandidate) => boolean): DiscoveryPreviewCandidate | undefined => {
    const i = unused.findIndex(pred);
    if (i < 0) return undefined;
    return unused.splice(i, 1)[0];
  };

  const roles: DiscoveryPreviewTrio["roles"] = {};
  const themes: string[] = [];

  const safe =
    take((c) => isSafeCandidate(c)) ??
    take((c) => (c.scheme ?? "light") === "light") ??
    unused.shift();
  if (safe) {
    roles.safe = safe.name;
    themes.push(safe.name);
  }

  if (themes.length < cap) {
    const bold =
      take((c) => isBoldCandidate(c)) ??
      take((c) => (c.scheme ?? "light") === "dark") ??
      unused.shift();
    if (bold) {
      roles.bold = bold.name;
      themes.push(bold.name);
    }
  }

  if (themes.length < cap) {
    const safeScheme = pool.find((c) => c.name === roles.safe)?.scheme;
    const wildcard =
      take((c) => Boolean(safeScheme) && (c.scheme ?? "light") !== safeScheme) ??
      take((c) => isThemeBrowsePopular(c.name, c)) ??
      unused.shift();
    if (wildcard) {
      roles.wildcard = wildcard.name;
      themes.push(wildcard.name);
    }
  }

  while (themes.length < Math.min(cap, pool.length) && unused.length) {
    const next = unused.shift()!;
    themes.push(next.name);
    if (!roles.wildcard) roles.wildcard = next.name;
  }

  return {
    themes,
    roles,
    hint: "Call preview_themes with these themes (≥2 auto-defaults to mode=\"layouts\"). Offer safe + bold + wildcard; lock meta.theme after the user picks.",
  };
}
