/**
 * Shared Theme Discovery list payload — MCP `list_themes` + CLI `--list-themes`
 * stay in lockstep (browse chips, studio/preview URLs, suggested_preview trio).
 */
import {
  loadThemeShortlists,
  loadThemeSelectionIndex,
  findShortlist,
  sortShortlistsForDiscovery,
  themeMatchesMood,
  themeMatchesQuery,
  themeDiscoveryLinks,
  THEME_BROWSE_FILTERS,
  isThemeBrowseFilterId,
  themeMatchesBrowseFilter,
  pickDiscoveryPreviewTrio,
  type ThemeBrowseFilterId,
  type ThemeShortlist,
  type DiscoveryPreviewTrio,
} from "./theme-discovery.js";

export interface ThemesDiscoveryThemeProps {
  name: string;
  version: string;
  source: string;
  description?: string;
  vibe?: string;
}

export interface ThemesDiscoveryListOptions {
  discovered: ThemesDiscoveryThemeProps[];
  shortlist?: string;
  browse?: string;
  mood?: string;
  query?: string;
  includeShortlists?: boolean;
  includeBrowseFilters?: boolean;
}

export interface ThemesDiscoveryListedTheme {
  name: string;
  version: string;
  description?: string;
  vibe?: string;
  source: string;
  mood?: string[];
  best_for?: string[];
  aliases?: string[];
  scheme?: string;
  formality?: string;
  gallery?: string;
  preview_url: string;
  studio_url: string;
  gallery_url?: string;
  studio_example?: string;
}

export interface ThemesDiscoveryListResult {
  themes: ThemesDiscoveryListedTheme[];
  discovery_hint: string;
  suggested_preview?: DiscoveryPreviewTrio;
  browse?: ThemeBrowseFilterId;
  browse_error?: string;
  browse_filters?: typeof THEME_BROWSE_FILTERS;
  shortlist?: ThemeShortlist;
  shortlist_error?: string;
  shortlists?: ThemeShortlist[];
}

const DISCOVERY_HINT =
  "Theme Discovery: offer browse chips (list_themes include_browse_filters / CLI --browse / --list-browse-filters) or a shortlist (prefer popular:true), use suggested_preview (safe/bold/wildcard) or open studio_url / preview_url, then preview_themes / --preview-compare with those 3 names (layouts auto; inline PNGs + studio_share_url for the exact bake — vision show-don't-tell). Lock meta.theme before generating the full deck.";

export async function buildThemesDiscoveryList(
  options: ThemesDiscoveryListOptions
): Promise<ThemesDiscoveryListResult> {
  const shortlistId = options.shortlist?.trim() ?? "";
  const browseRaw = options.browse?.trim().toLowerCase() ?? "";
  const mood = options.mood?.trim().toLowerCase() ?? "";
  const query = options.query?.trim().toLowerCase() ?? "";
  const includeShortlists = options.includeShortlists === true;
  const includeBrowseFilters = options.includeBrowseFilters === true;

  const browse: ThemeBrowseFilterId | "" =
    browseRaw && isThemeBrowseFilterId(browseRaw) ? browseRaw : "";
  const browseInvalid = Boolean(browseRaw) && !browse;

  const [shortlistsDoc, selectionIndex] = await Promise.all([
    loadThemeShortlists(),
    loadThemeSelectionIndex(),
  ]);

  const shortlists = sortShortlistsForDiscovery(shortlistsDoc.shortlists);
  const selectionByName = new Map(
    selectionIndex.themes.map((t) => [t.name, t] as const)
  );

  const matchedShortlist = shortlistId
    ? findShortlist(shortlistsDoc, shortlistId)
    : undefined;
  let allowNames: Set<string> | null = null;
  if (matchedShortlist) {
    allowNames = new Set(matchedShortlist.themes);
  }

  let themes: ThemesDiscoveryListedTheme[] = options.discovered.map((d) => {
    const sel = selectionByName.get(d.name);
    const links = themeDiscoveryLinks(d.name, sel?.gallery);
    return {
      name: d.name,
      version: d.version,
      description: d.description,
      vibe: d.vibe,
      source: d.source,
      mood: sel?.mood,
      best_for: sel?.best_for,
      aliases: sel?.aliases,
      scheme: sel?.scheme,
      formality: sel?.formality,
      gallery: sel?.gallery,
      ...links,
    };
  });

  if (allowNames) {
    themes = themes.filter((t) => allowNames!.has(t.name));
  }

  if (browse && browse !== "all") {
    themes = themes.filter((t) =>
      themeMatchesBrowseFilter(
        {
          scheme: t.scheme,
          mood: t.mood,
          formality: t.formality,
        },
        browse,
        t.name
      )
    );
  }

  if (mood) {
    themes = themes.filter((t) =>
      themeMatchesMood({ name: t.name, mood: t.mood }, mood)
    );
  }

  if (query) {
    themes = themes.filter((t) =>
      themeMatchesQuery(
        {
          name: t.name,
          vibe: t.vibe,
          description: t.description,
          aliases: t.aliases,
          best_for: t.best_for,
          mood: t.mood,
        },
        query
      )
    );
  }

  const suggested_preview = pickDiscoveryPreviewTrio(
    themes.map((t) => ({
      name: t.name,
      scheme: t.scheme,
      mood: t.mood,
      formality: t.formality,
    }))
  );

  const result: ThemesDiscoveryListResult = {
    themes,
    discovery_hint: DISCOVERY_HINT,
  };
  if (suggested_preview) {
    result.suggested_preview = suggested_preview;
  }
  if (browse) {
    result.browse = browse;
  } else if (browseInvalid) {
    result.browse_error = `Unknown browse chip "${browseRaw}". Call list_themes with include_browse_filters:true (or CLI --list-browse-filters) for ids (popular/dark/editorial/neon/…).`;
  }
  if (matchedShortlist) {
    result.shortlist = matchedShortlist;
  } else if (shortlistId) {
    result.shortlist_error = `Unknown shortlist id "${shortlistId}". Call list_themes with include_shortlists:true (or CLI --list-shortlists) to see ids.`;
  }
  if (includeShortlists) {
    result.shortlists = shortlists;
  }
  if (includeBrowseFilters || browseInvalid) {
    result.browse_filters = THEME_BROWSE_FILTERS;
  }
  return result;
}
