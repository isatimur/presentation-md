import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { renderDeck, getBundledThemesDir } from "@presentation-md/render";
import type { ToolDefinition } from "../server.js";

const DEFAULT_PREVIEW_DIR = ".presentation-md/theme-previews";

type PreviewMode = "title" | "layouts";

function titlePreviewDeck(title: string, theme: string, company?: string): string {
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

/** Canonical multi-layout bake so agents can judge comparison/stats/quote craft — not title alone. */
function layoutsPreviewDeck(title: string, theme: string, company?: string): string {
  return JSON.stringify({
    type: "deck",
    meta: { title, company: company ?? title, theme },
    slides: [
      {
        layout: "title",
        eyebrow: theme.replace(/-/g, " "),
        heading: title,
        lead: "Multi-layout craft preview — title, grid, comparison, stats, quote, code, closing.",
      },
      {
        layout: "feature-grid",
        eyebrow: "Capabilities",
        heading: "Three moves that matter",
        columns: 3,
        cards: [
          { icon: "fa-solid fa-bolt", title: "Fast path", body: "Ship the decisive slide without redesigning chrome." },
          { icon: "fa-solid fa-layer-group", title: "Layered craft", body: "Surfaces stay out of the way of body layouts." },
          { icon: "fa-solid fa-eye", title: "Show, don't tell", body: "Judge the vibe across layouts before you lock a theme." },
        ],
      },
      {
        layout: "comparison",
        eyebrow: "Before / After",
        heading: "Discovery that survives the second slide.",
        leftLabel: "Title only",
        left: "Pretty cover.\nUnknown body craft.\nGuess and regenerate.",
        rightLabel: "Multi-layout",
        right: "See cards, stats, code.\nCatch contrast bugs early.\nLock the theme with evidence.",
        emphasis: "right",
      },
      {
        layout: "stat-row",
        eyebrow: "Proof",
        heading: "Numbers that read at billboard scale",
        stats: [
          { value: "14", label: "Schema layouts" },
          { value: "75", label: "Theme surfaces" },
          { value: "1", label: "JSON field to swap vibe" },
        ],
      },
      {
        layout: "chart",
        eyebrow: "Data viz",
        heading: "Charts stay on-palette.",
        chartType: "bar",
        categories: ["Q1", "Q2", "Q3", "Q4"],
        series: [{ name: "Signal", values: [12, 19, 28, 41] }],
        showLegend: false,
        showValues: true,
      },
      {
        layout: "quote",
        quote: "If the second slide looks generic, the theme isn't ready.",
        by: "presentation-md craft bar",
      },
      {
        layout: "code",
        eyebrow: "Snippet",
        heading: "Dev decks get a real code surface",
        filename: "preview.ts",
        language: "ts",
        code: `const deck = {\n  type: "deck",\n  meta: { theme: "${theme}", title: "${title.replace(/"/g, '\\"')}" },\n  slides: [{ layout: "code", code: "…" }],\n};`,
      },
      {
        layout: "closing",
        eyebrow: "Next",
        heading: "Pick this vibe — or preview another.",
        lead: "Set meta.theme and generate the full deck.",
        cta: { label: "Lock theme", href: "#" },
      },
    ],
  });
}

export const previewThemesTool: ToolDefinition = {
  name: "preview_themes",
  description:
    "Render 1–3 theme preview HTML files for visual discovery (show-don't-tell). Default mode is a title slide; pass mode=\"layouts\" for a multi-slide craft preview (title, feature-grid, comparison, stat-row, quote, code, closing).",
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
      mode: {
        type: "string",
        enum: ["title", "layouts"],
        description:
          'Preview depth. "title" (default) = one cover slide. "layouts" = multi-slide craft bake (comparison, stats, quote, code, closing).',
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
    const mode: PreviewMode =
      input["mode"] === "layouts" ? "layouts" : "title";
    const outputDir = resolve(
      process.cwd(),
      (input["output_dir"] as string | undefined) ?? DEFAULT_PREVIEW_DIR
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
          ? layoutsPreviewDeck(title, theme, company)
          : titlePreviewDeck(title, theme, company);
      const html = await renderDeck(deckJson, { themesDir: getBundledThemesDir() });
      const filename =
        mode === "layouts" ? `${theme}-layouts-preview.html` : `${theme}-preview.html`;
      const path = join(outputDir, filename);
      await writeFile(path, html, "utf-8");
      previews.push({
        theme,
        path,
        filename,
        mode,
        slides: mode === "layouts" ? 8 : 1,
      });
    }

    return {
      previews,
      mode,
      output_dir: outputDir,
      instruction:
        mode === "layouts"
          ? "Open each multi-layout preview and scroll past the title — judge cards, comparison, stats, quote, and code. After they pick a theme, set meta.theme and generate the full deck."
          : "Open each preview HTML in a browser (or show the user the file paths). For deeper craft judgment, re-run with mode=\"layouts\". After they pick a theme, set meta.theme and generate the full deck.",
    };
  },
};
