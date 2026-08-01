/** Canonical craft decks for CLI / MCP theme discovery (show-don't-tell). */

export type PreviewMode = "title" | "layouts";

export function buildTitlePreviewDeck(
  theme: string,
  title = "Theme preview",
  company?: string
): string {
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

/**
 * Multi-layout bake so agents judge body craft — not title alone.
 * kinetic-wrapped injects tone + hero mega-stat + share pills.
 */
export function buildLayoutsPreviewDeck(
  theme: string,
  title = "Theme craft preview",
  company?: string
): string {
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
        {
          icon: "fa-solid fa-bolt",
          title: "Fast path",
          body: "Ship the decisive slide without redesigning chrome.",
        },
        {
          icon: "fa-solid fa-layer-group",
          title: "Layered craft",
          body: "Surfaces stay out of the way of body layouts.",
        },
        {
          icon: "fa-solid fa-eye",
          title: "Show, don't tell",
          body: "Judge the vibe across layouts before you lock a theme.",
        },
        {
          icon: "fa-solid fa-chart-simple",
          title: "Native charts",
          body: "SVG in HTML, editable in PPTX.",
        },
        {
          icon: "fa-solid fa-share-nodes",
          title: "Share frame",
          body: "Designed to leave the deck.",
        },
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

/** Layout sequence baked into layouts-mode previews (CLI / MCP narrate without opening HTML). */
export const LAYOUTS_PREVIEW_LAYOUTS = [
  "title",
  "image-hero",
  "feature-grid",
  "two-column",
  "comparison",
  "ranked-list",
  "stat-row",
  "chart",
  "quote",
  "code",
  "closing",
] as const;

/** Discovery-size shots — small enough for MCP image content, still readable. */
export const DISCOVERY_SHOT_W = 960;
export const DISCOVERY_SHOT_H = 540;

/**
 * Layout names for a layouts-mode bake (kinetic-wrapped inserts streak + ring after stats).
 * Title mode returns `["title"]`.
 */
export function layoutsPreviewLayoutNames(theme: string, mode: PreviewMode = "layouts"): string[] {
  if (mode === "title") return ["title"];
  const base: string[] = [...LAYOUTS_PREVIEW_LAYOUTS];
  if (theme !== "kinetic-wrapped") return base;
  const statIdx = base.indexOf("stat-row");
  const insertAt = statIdx >= 0 ? statIdx + 1 : base.length - 1;
  base.splice(insertAt, 0, "streak-grid", "metric-ring");
  return base;
}

/** Count slides in a layouts bake (kinetic-wrapped adds streak + ring). */
export function layoutsPreviewSlideCount(theme: string): number {
  return theme === "kinetic-wrapped" ? 13 : 11;
}

/**
 * 1-based slide indices for discovery PNGs (CLI `--preview-compare` + MCP `preview_themes`).
 * Title cover always; layouts mode also grabs bento (feature-grid) + comparison —
 * Studio Title/Bento/Compare crop parity (layouts bake: 1=title, 3=feature-grid, 5=comparison).
 */
export function discoverySlideIndices(mode: PreviewMode, slideCount: number): number[] {
  if (mode === "title" || slideCount <= 1) return [1];
  const indices = [1];
  if (slideCount >= 3) indices.push(3);
  if (slideCount >= 5) indices.push(Math.min(5, slideCount));
  return [...new Set(indices)].filter((n) => n >= 1 && n <= slideCount).sort((a, b) => a - b);
}

export function parsePreviewCompareThemes(raw: string): string[] {
  const names = raw
    .split(/[,|\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const unique: string[] = [];
  for (const n of names) {
    if (!unique.includes(n)) unique.push(n);
  }
  return unique.slice(0, 3);
}
