import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { markdownToDeck } from "@presentation-md/core";
import type { ToolDefinition } from "../server.js";
import { assertWritablePathInCwd } from "../lib/cwd-path.js";

export const importMarkdownTool: ToolDefinition = {
  name: "import_markdown",
  description:
    "Convert Marp / md-slides flavored Markdown into presentation-md Deck JSON. Splits on --- slide separators, reads YAML front matter (theme/title/company), and maps headings, lists, tables, quotes, code fences, ```chart, and ```html blocks onto schema layouts. Also detects wrap craft: streak-grid, metric-ring, ranked-list, logo-wall, and dual closing actions[].",
  inputSchema: {
    type: "object",
    properties: {
      markdown: {
        type: "string",
        description: "Markdown source (Marp/md-slides style with --- separators)",
      },
      theme: {
        type: "string",
        description: "Fallback theme when front matter omits theme (default: default-tech)",
      },
      title: {
        type: "string",
        description: "Fallback title when front matter omits title",
      },
      output_path: {
        type: "string",
        description:
          "Optional path within the current working directory to write the resulting deck JSON",
      },
    },
    required: ["markdown"],
  },
  handler: async (input: Record<string, unknown>) => {
    const markdown = String(input["markdown"] ?? "");
    if (!markdown.trim()) {
      throw new Error("'markdown' must be a non-empty string");
    }
    const deck = markdownToDeck(markdown, {
      theme: typeof input["theme"] === "string" ? input["theme"] : undefined,
      title: typeof input["title"] === "string" ? input["title"] : undefined,
    });
    const json = JSON.stringify(deck, null, 2);
    const outputPathInput =
      typeof input["output_path"] === "string" ? input["output_path"] : undefined;
    let outputPath: string | undefined;
    if (outputPathInput) {
      outputPath = await assertWritablePathInCwd(outputPathInput, "output_path");
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, json, "utf-8");
    }
    return {
      json,
      slide_count: deck.slides.length,
      theme: deck.meta.theme,
      output_path: outputPath,
      hint:
        "Review layout mapping (incl. streak/metric/ranked/logo/closing duals), then audit_deck → render_deck. See references/markdown-import.md craft heuristics.",
    };
  },
};
