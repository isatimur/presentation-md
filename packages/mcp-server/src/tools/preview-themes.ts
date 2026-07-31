import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { findShortlist, loadThemeShortlists, type ThemeShortlist } from "@presentation-md/core";
import { renderDeck } from "@presentation-md/render";
import { resolveThemesDir } from "../lib/resolve-themes.js";
import { assertWritablePathInCwd } from "../lib/cwd-path.js";
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
  const isWrap = theme === "kinetic-wrapped";
  const slides: Record<string, unknown>[] = [
      {
        layout: "title",
        eyebrow: theme.replace(/-/g, " "),
        heading: title,
        lead: "Multi-layout craft preview — title, hero, bento, comparison, ranked bars, stats, quote, code, closing.",
        ...(isWrap ? { tone: "lime" } : {}),
      },
      {
        layout: "image-hero",
        eyebrow: "Visual beat",
        heading: "Show the product, place, or atmosphere.",
        lead: "Full-bleed craft that still exports to PPTX.",
        image:
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0B1220"/><stop offset="1" stop-color="#FF3B1F"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><circle cx="1180" cy="280" r="180" fill="#0D9488" opacity=".35"/></svg>`
          ),
        imageAlt: "Abstract craft field",
      },
      {
        layout: "feature-grid",
        eyebrow: "Capabilities",
        heading: "Five moves that matter",
        columns: "bento",
        cards: [
          { icon: "fa-solid fa-bolt", title: "Fast path", body: "Ship the decisive slide without redesigning chrome." },
          { icon: "fa-solid fa-layer-group", title: "Layered craft", body: "Surfaces stay out of the way of body layouts." },
          { icon: "fa-solid fa-eye", title: "Show, don't tell", body: "Judge the vibe across layouts before you lock a theme." },
          { icon: "fa-solid fa-chart-simple", title: "Native charts", body: "SVG in HTML, editable in PPTX." },
          { icon: "fa-solid fa-share-nodes", title: "Share frame", body: "Designed to leave the deck." },
        ],
      },
      {
        layout: "two-column",
        eyebrow: "Asymmetry",
        heading: "Weight the copy when the story needs it.",
        body: "Ratio and reverse keep media and copy in tension — not a default 50/50 split.",
        aside: "2:1 craft proof",
        ratio: "2-1",
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
        layout: "ranked-list",
        eyebrow: "Ranking",
        heading: "Bars that stay editable",
        lead: "Prefer ranked-list over custom-html for top-N craft.",
        items: [
          { label: "Primary beat", value: "88%", widthPct: 88 },
          { label: "Secondary", value: "58%", widthPct: 58 },
          { label: "Tertiary", value: "34%", widthPct: 34 },
        ],
        ...(isWrap ? { tone: "magenta" } : {}),
      },
      {
        layout: "stat-row",
        eyebrow: "Proof",
        heading: isWrap ? "Mega number energy" : "Numbers that read at billboard scale",
        ...(isWrap
          ? {
              variant: "hero",
              tone: "orange",
              lead: "One claim per frame. Built to screenshot.",
              stats: [
                { value: "287", label: "Sessions this year" },
                { value: "5.5×", label: "per week" },
                { value: "+34%", label: "vs last year" },
              ],
            }
          : {
              stats: [
                { value: "18", label: "Schema layouts" },
                { value: "75", label: "Theme surfaces" },
                { value: "1", label: "JSON field to swap vibe" },
              ],
            }),
      },
      ...(isWrap
        ? [
            {
              layout: "streak-grid",
              tone: "violet",
              eyebrow: "Streak",
              heading: "No excuses.",
              lead: "Schema cells — not custom-html squares.",
              filled: 47,
              total: 60,
              cols: 10,
            },
            {
              layout: "metric-ring",
              tone: "cyan",
              eyebrow: "Percentile",
              heading: "TOP 3%.",
              value: "3%",
              label: "globally",
              pct: 100,
              lead: "Circular KPI without inventing HTML.",
            },
          ]
        : []),
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
        ...(isWrap ? { tone: "cyan" } : {}),
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
        actions: isWrap
          ? [
              { label: "Share Wrapped", href: "#", style: "solid" },
              { label: "Post to X", href: "#", style: "outline" },
            ]
          : [{ label: "Lock theme", href: "#", style: "solid" }],
        ...(isWrap ? { tone: "lime" } : {}),
      },
  ];

  return JSON.stringify({
    type: "deck",
    meta: { title, company: company ?? title, theme },
    slides,
  });
}

export const previewThemesTool: ToolDefinition = {
  name: "preview_themes",
  description:
    "Render 1–3 theme preview HTML files for visual discovery (show-don't-tell). Pass themes[] and/or a shortlist id from theme-shortlists.json (shortlist themes fill when themes is omitted; otherwise themes wins, capped at 3). Default mode is a title slide; pass mode=\"layouts\" for a multi-slide craft preview (title, image-hero, bento, comparison, ranked-list, streak/metric on wrap, stats, quote, code, closing). kinetic-wrapped previews inject tone + hero mega-stat + share pills.",
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
          ? layoutsPreviewDeck(title, theme, company)
          : titlePreviewDeck(title, theme, company);
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
        slides: mode === "layouts" ? 8 : 1,
      });
    }

    return {
      previews,
      mode,
      output_dir: outputDir,
      ...(matchedShortlist ? { shortlist: matchedShortlist } : {}),
      ...(shortlistError ? { shortlist_error: shortlistError } : {}),
      instruction:
        mode === "layouts"
          ? "Open each multi-layout preview and scroll past the title — judge cards, comparison, stats, quote, and code. After they pick a theme, set meta.theme and generate the full deck."
          : "Open each preview HTML in a browser (or show the user the file paths). For deeper craft judgment, re-run with mode=\"layouts\". After they pick a theme, set meta.theme and generate the full deck.",
    };
  },
};
