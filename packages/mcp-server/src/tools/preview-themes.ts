import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { findShortlist, loadThemeShortlists, type ThemeShortlist } from "@presentation-md/core";
import {
  buildLayoutsPreviewDeck,
  buildTitlePreviewDeck,
  layoutsPreviewSlideCount,
  renderDeck,
  type PreviewMode,
} from "@presentation-md/render";
import { resolveThemesDir } from "../lib/resolve-themes.js";
import { assertWritablePathInCwd } from "../lib/cwd-path.js";
import type { ToolDefinition } from "../server.js";

const DEFAULT_PREVIEW_DIR = ".presentation-md/theme-previews";

export const previewThemesTool: ToolDefinition = {
  name: "preview_themes",
  description:
    "Render 1–3 theme preview HTML files for visual discovery (show-don't-tell). Pass themes[] and/or a shortlist id from theme-shortlists.json (shortlist themes fill when themes is omitted; otherwise themes wins, capped at 3). For pick-3 compares, prefer mode=\"layouts\" so agents judge body craft (cards/comparison/stats/quote/code) — title mode is a fast skim only. Default mode is a title slide; pass mode=\"layouts\" for a multi-slide craft preview. kinetic-wrapped previews inject tone + hero mega-stat + share pills.",
  inputSchema: {
    type: "object",
    properties: {
      themes: {
        type: "array",
        items: { type: "string" },
        minItems: 1,
        maxItems: 3,
        description:
          "1–3 theme names to preview (e.g. corporate, editorial-serif, default-tech). Optional when shortlist is set.",
      },
      shortlist: {
        type: "string",
        description:
          "Optional shortlist id from theme-shortlists.json (e.g. editorial-report, core-defaults). Used when themes is omitted; ignored when themes is provided.",
      },
      title: {
        type: "string",
        description: "Deck title shown on the preview slide (defaults to 'Your Deck Title')",
      },
      company: {
        type: "string",
        description: "Optional company/brand name for the preview slide",
      },
      mode: {
        type: "string",
        enum: ["title", "layouts"],
        description:
          'Preview depth. "title" (default) = one cover slide. "layouts" = multi-slide craft bake (comparison, stats, quote, code, closing).',
      },
      output_dir: {
        type: "string",
        description: `Directory within the current working directory to write preview HTML files (default: ${DEFAULT_PREVIEW_DIR})`,
      },
    },
  },
  handler: async (input: Record<string, unknown>) => {
    const shortlistId =
      typeof input["shortlist"] === "string" ? input["shortlist"].trim() : "";
    const themesInput = Array.isArray(input["themes"])
      ? (input["themes"] as unknown[]).filter((t): t is string => typeof t === "string")
      : [];

    let matchedShortlist: ThemeShortlist | undefined;
    let shortlistError: string | undefined;
    let themes = themesInput.slice(0, 3);

    if (themes.length === 0 && shortlistId) {
      const shortlistsDoc = await loadThemeShortlists();
      matchedShortlist = findShortlist(shortlistsDoc, shortlistId);
      if (!matchedShortlist) {
        shortlistError = `Unknown shortlist id "${shortlistId}". Call list_themes with include_shortlists:true to see ids.`;
      } else {
        themes = matchedShortlist.themes.slice(0, 3);
      }
    } else if (themes.length === 0) {
      return {
        error:
          "Provide themes (1–3 names) or a shortlist id from theme-shortlists.json (e.g. core-defaults, editorial-report).",
      };
    }

    if (themes.length === 0) {
      return {
        error: shortlistError ?? "No themes to preview.",
        shortlist_error: shortlistError,
      };
    }

    const title = (input["title"] as string | undefined) ?? "Your Deck Title";
    const company = input["company"] as string | undefined;
    const mode: PreviewMode =
      input["mode"] === "layouts" ? "layouts" : "title";
    const outputDir = await assertWritablePathInCwd(
      (input["output_dir"] as string | undefined) ?? DEFAULT_PREVIEW_DIR,
      "output_dir"
    );

    await mkdir(outputDir, { recursive: true });

    const previews: Array<{
      theme: string;
      path: string;
      filename: string;
      mode: PreviewMode;
      slides: number;
    }> = [];

    for (const theme of themes) {
      const deckJson =
        mode === "layouts"
          ? buildLayoutsPreviewDeck(theme, title, company)
          : buildTitlePreviewDeck(theme, title, company);
      const html = await renderDeck(deckJson, resolveThemesDir());
      const filename =
        mode === "layouts" ? `${theme}-layouts-preview.html` : `${theme}-preview.html`;
      const path = join(outputDir, filename);
      await writeFile(path, html, "utf-8");
      previews.push({
        theme,
        path,
        filename,
        mode,
        slides: mode === "layouts" ? layoutsPreviewSlideCount(theme) : 1,
      });
    }

    return {
      previews,
      mode,
      output_dir: outputDir,
      ...(matchedShortlist ? { shortlist: matchedShortlist } : {}),
      ...(shortlistError ? { shortlist_error: shortlistError } : {}),
      ...(mode === "title" && themes.length >= 2
        ? {
            layouts_recommended: true,
            layouts_hint:
              "Pick-3 compares: re-run preview_themes with mode=\"layouts\" so body craft (cards, comparison, stats, quote, code) is visible before locking meta.theme.",
          }
        : {}),
      instruction:
        mode === "layouts"
          ? "Open each multi-layout preview and scroll past the title — judge cards, comparison, stats, quote, and code. After they pick a theme, set meta.theme and generate the full deck."
          : themes.length >= 2
            ? "Open each title preview. For pick-3 craft judgment, re-run with mode=\"layouts\" (recommended). After they pick a theme, set meta.theme and generate the full deck."
            : "Open each preview HTML in a browser (or show the user the file paths). For deeper craft judgment, re-run with mode=\"layouts\". After they pick a theme, set meta.theme and generate the full deck.",
    };
  },
};
