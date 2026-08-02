import { buildThemesDiscoveryList, discoverInstalledThemes } from "@presentation-md/core";
import { getBundledThemesDir } from "@presentation-md/render";
import type { ToolDefinition } from "../server.js";

export const listThemesTool: ToolDefinition = {
  name: "list_themes",
  description:
    "List available presentation-md themes (name, version, vibe, description, proof deep-links). Optional filters: shortlist id, browse chip id (site/Studio mood bar: popular/dark/editorial/neon/…), mood/query from the selection index — use for Theme Discovery before locking meta.theme. Every theme includes preview_url + studio_url (stunning-25 → ?example= craft; others → ?theme= blank slate). Returns suggested_preview (safe/bold/wildcard trio) when ≥1 themes match. Set include_shortlists / include_browse_filters for catalogs.",
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
    const discovered = await discoverInstalledThemes({
      bundledThemesDir: getBundledThemesDir(),
      nodeModulesRoot: process.cwd(),
    });

    return buildThemesDiscoveryList({
      discovered: discovered.map((d) => ({
        name: d.name,
        version: d.version,
        source: d.source,
        description: d.manifest.description,
        vibe: d.manifest.vibe,
      })),
      shortlist: typeof input["shortlist"] === "string" ? input["shortlist"] : undefined,
      browse: typeof input["browse"] === "string" ? input["browse"] : undefined,
      mood: typeof input["mood"] === "string" ? input["mood"] : undefined,
      query: typeof input["query"] === "string" ? input["query"] : undefined,
      includeShortlists: input["include_shortlists"] === true,
      includeBrowseFilters: input["include_browse_filters"] === true,
    });
  },
};
