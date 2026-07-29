import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { renderDeck, getBundledThemesDir } from "@presentation-md/render";
import type { ToolDefinition } from "../server.js";

const DEFAULT_PREVIEW_DIR = ".presentation-md/theme-previews";

function previewDeckJson(title: string, theme: string, company?: string): string {
  return JSON.stringify({
    type: "deck",
    meta: { title, company: company ?? title, theme },
    slides: [
      {
        layout: "title",
        eyebrow: theme.replace(/-/g, " "),
        heading: title,
        lead: "A preview of this theme's typography, palette, and surface treatment.",
      },
    ],
  });
}

export const previewThemesTool: ToolDefinition = {
  name: "preview_themes",
  description:
    "Render 3 one-slide title previews for visual theme discovery (show-don't-tell). Use after shortlisting themes from theme-selection-index.json — the user picks a style before you generate the full deck.",
  inputSchema: {
    type: "object",
    properties: {
      themes: {
        type: "array",
        items: { type: "string" },
        minItems: 1,
        maxItems: 3,
        description: "1–3 theme names to preview (e.g. corporate, editorial-serif, default-tech)",
      },
      title: {
        type: "string",
        description: "Deck title shown on the preview slide (defaults to 'Your Deck Title')",
      },
      company: {
        type: "string",
        description: "Optional company/brand name for the preview slide",
      },
      output_dir: {
        type: "string",
        description: `Directory to write preview HTML files (default: ${DEFAULT_PREVIEW_DIR})`,
      },
    },
    required: ["themes"],
  },
  handler: async (input: Record<string, unknown>) => {
    const themes = (input["themes"] as string[]).slice(0, 3);
    const title = (input["title"] as string | undefined) ?? "Your Deck Title";
    const company = input["company"] as string | undefined;
    const outputDir = resolve(
      process.cwd(),
      (input["output_dir"] as string | undefined) ?? DEFAULT_PREVIEW_DIR
    );

    await mkdir(outputDir, { recursive: true });

    const previews: Array<{ theme: string; path: string; filename: string }> = [];

    for (const theme of themes) {
      const deckJson = previewDeckJson(title, theme, company);
      const html = await renderDeck(deckJson, { themesDir: getBundledThemesDir() });
      const filename = `${theme}-preview.html`;
      const path = join(outputDir, filename);
      await writeFile(path, html, "utf-8");
      previews.push({ theme, path, filename });
    }

    return {
      previews,
      output_dir: outputDir,
      instruction:
        "Open each preview HTML in a browser (or show the user the file paths). After they pick a theme, set meta.theme and generate the full deck.",
    };
  },
};
