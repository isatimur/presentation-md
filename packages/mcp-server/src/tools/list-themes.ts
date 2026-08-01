import {
  discoverInstalledThemes,
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
  type ThemeBrowseFilterId,
} from "@presentation-md/core";
import { getBundledThemesDir } from "@presentation-md/render";
import type { ToolDefinition } from "../server.js";

export const listThemesTool: ToolDefinition = {
  name: "list_themes",
  description:
    "List available presentation-md themes (name, version, vibe, description, proof deep-links). Optional filters: shortlist id, browse chip id (site/Studio mood bar: popular/dark/editorial/neon/…), mood/query from the selection index — use for Theme Discovery before locking meta.theme. Each theme may include preview_url, studio_url, gallery_url. Set include_shortlists / include_browse_filters for catalogs.",
  inputSchema: {
    type: "object",
    properties: {
      shortlist: {
        type: "string",
        description:
          "Optional shortlist id from theme-shortlists.json (e.g. series-a-pitch, developer-demo, core-defaults).",
      },
      browse: {
        type: "string",
        description:
          'Optional site/Studio mood-browse chip id: "all" | "popular" | "dark" | "light" | "editorial" | "neon" | "playful" | "brutal" | "luxury" | "tech". Same rules as the gallery toolbar — prefer over free-text mood when the user picks a chip.',
      },
      mood: {
        type: "string",
        description:
          "Optional mood keyword from theme-selection-index.json (e.g. neon, editorial, playful). Substring match; use browse for chip parity.",
      },
      query: {
        type: "string",
        description:
          "Optional free-text filter against theme name, vibe, description, aliases, and best_for.",
      },
      include_shortlists: {
        type: "boolean",
        description:
          "When true, also return the shortlists catalog for Theme Discovery / intelligent defaults.",
      },
      include_browse_filters: {
        type: "boolean",
        description:
          "When true, also return browse_filters (site/Studio mood chip ids + labels) so agents can offer the same chips.",
      },
    },
  },
  handler: async (input: Record<string, unknown>) => {
    const shortlistId =
      typeof input["shortlist"] === "string" ? input["shortlist"].trim() : "";
    const browseRaw =
      typeof input["browse"] === "string" ? input["browse"].trim().toLowerCase() : "";
    const mood =
      typeof input["mood"] === "string" ? input["mood"].trim().toLowerCase() : "";
    const query =
      typeof input["query"] === "string" ? input["query"].trim().toLowerCase() : "";
    const includeShortlists = input["include_shortlists"] === true;
    const includeBrowseFilters = input["include_browse_filters"] === true;

    const browse: ThemeBrowseFilterId | "" =
      browseRaw && isThemeBrowseFilterId(browseRaw) ? browseRaw : "";
    const browseInvalid = Boolean(browseRaw) && !browse;

    const [discovered, shortlistsDoc, selectionIndex] = await Promise.all([
      discoverInstalledThemes({
        bundledThemesDir: getBundledThemesDir(),
        nodeModulesRoot: process.cwd(),
      }),
      loadThemeShortlists(),
      loadThemeSelectionIndex(),
    ]);

    const shortlists = sortShortlistsForDiscovery(shortlistsDoc.shortlists);
    const selectionByName = new Map(
      selectionIndex.themes.map((t) => [t.name, t] as const)
    );

    const matchedShortlist = shortlistId ? findShortlist(shortlistsDoc, shortlistId) : undefined;
    let allowNames: Set<string> | null = null;
    if (matchedShortlist) {
      allowNames = new Set(matchedShortlist.themes);
    }

    let themes = discovered.map((d) => {
      const sel = selectionByName.get(d.name);
      const links = themeDiscoveryLinks(d.name, sel?.gallery);
      return {
        name: d.name,
        version: d.version,
        description: d.manifest.description,
        vibe: d.manifest.vibe,
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
      themes = themes.filter((t) => themeMatchesMood({ name: t.name, mood: t.mood }, mood));
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

    const result: Record<string, unknown> = {
      themes,
      discovery_hint:
        "Theme Discovery: offer browse chips (list_themes include_browse_filters) or a shortlist (prefer popular:true), open studio_url / preview_url (show-don't-tell), then preview_themes with 3 names and mode=\"layouts\" (safe + bold + wildcard). Lock meta.theme before generating the full deck.",
    };
    if (browse) {
      result.browse = browse;
    } else if (browseInvalid) {
      result.browse_error = `Unknown browse chip "${browseRaw}". Call list_themes with include_browse_filters:true for ids (popular/dark/editorial/neon/…).`;
    }
    if (matchedShortlist) {
      result.shortlist = matchedShortlist;
    } else if (shortlistId) {
      result.shortlist_error = `Unknown shortlist id "${shortlistId}". Call list_themes with include_shortlists:true to see ids.`;
    }
    if (includeShortlists) {
      result.shortlists = shortlists;
    }
    if (includeBrowseFilters || browseInvalid) {
      result.browse_filters = THEME_BROWSE_FILTERS;
    }
    return result;
  },
};
