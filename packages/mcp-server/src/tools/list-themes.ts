import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";
import { discoverInstalledThemes } from "@presentation-md/core";
import { getBundledThemesDir } from "@presentation-md/render";
import type { ToolDefinition } from "../server.js";

function getCoreRoot(): string {
  const require = createRequire(import.meta.url);
  const coreMain = require.resolve("@presentation-md/core");
  return dirname(dirname(coreMain));
}

interface ShortlistEntry {
  id: string;
  label: string;
  themes: string[];
  why?: string;
}

interface ShortlistsDoc {
  shortlists?: ShortlistEntry[];
}

interface SelectionTheme {
  name: string;
  mood?: string[];
  best_for?: string[];
  aliases?: string[];
  formality?: string;
  scheme?: string;
}

interface SelectionIndex {
  themes?: SelectionTheme[];
}

async function loadJson<T>(rel: string): Promise<T | null> {
  try {
    const raw = await readFile(join(getCoreRoot(), "references", rel), "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

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
      loadJson<ShortlistsDoc>("theme-shortlists.json"),
      loadJson<SelectionIndex>("theme-selection-index.json"),
    ]);

    const shortlists = shortlistsDoc?.shortlists ?? [];
    const selectionByName = new Map(
      (selectionIndex?.themes ?? []).map((t) => [t.name, t] as const)
    );

    let matchedShortlist: ShortlistEntry | undefined;
    let allowNames: Set<string> | null = null;
    if (shortlistId) {
      matchedShortlist = shortlists.find((s) => s.id === shortlistId);
      if (matchedShortlist) {
        allowNames = new Set(matchedShortlist.themes);
      }
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
      themes = themes.filter((t) =>
        (t.mood ?? []).some((m) => m.toLowerCase().includes(mood))
      );
    }

    if (query) {
      themes = themes.filter((t) => {
        const hay = [
          t.name,
          t.vibe ?? "",
          t.description ?? "",
          ...(t.aliases ?? []),
          ...(t.best_for ?? []),
          ...(t.mood ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(query);
      });
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
