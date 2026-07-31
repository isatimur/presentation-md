import {
  discoverInstalledThemes,
  loadThemeShortlists,
  loadThemeSelectionIndex,
  findShortlist,
  sortShortlistsForDiscovery,
  themeMatchesMood,
  themeMatchesQuery,
} from "@presentation-md/core";
import { getBundledThemesDir } from "@presentation-md/render";
import type { ToolDefinition } from "../server.js";

export const listThemesTool: ToolDefinition = {
  name: "list_themes",
  description:
    "List available presentation-md themes (name, version, vibe, description). Optional filters: shortlist id (theme-shortlists.json), mood/query from the selection index — use for Theme Discovery before locking meta.theme. Set include_shortlists to get the full shortlist catalog for intelligent defaults.",
  inputSchema: {
    type: "object",
    properties: {
      shortlist: {
        type: "string",
        description:
          "Optional shortlist id from theme-shortlists.json (e.g. series-a-pitch, developer-demo, core-defaults).",
      },
      mood: {
        type: "string",
        description:
          "Optional mood keyword from theme-selection-index.json (e.g. neon, editorial, playful).",
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
    },
  },
  handler: async (input: Record<string, unknown>) => {
    const shortlistId =
      typeof input["shortlist"] === "string" ? input["shortlist"].trim() : "";
    const mood =
      typeof input["mood"] === "string" ? input["mood"].trim().toLowerCase() : "";
    const query =
      typeof input["query"] === "string" ? input["query"].trim().toLowerCase() : "";
    const includeShortlists = input["include_shortlists"] === true;

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
      };
    });

    if (allowNames) {
      themes = themes.filter((t) => allowNames!.has(t.name));
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

    const result: Record<string, unknown> = { themes };
    if (matchedShortlist) {
      result.shortlist = matchedShortlist;
    } else if (shortlistId) {
      result.shortlist_error = `Unknown shortlist id "${shortlistId}". Call list_themes with include_shortlists:true to see ids.`;
    }
    if (includeShortlists) {
      result.shortlists = shortlists;
    }
    return result;
  },
};
