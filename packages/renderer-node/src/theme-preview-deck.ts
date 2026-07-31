/** Minimal craft decks for CLI / agent theme discovery (show-don't-tell). */

export type PreviewMode = "title" | "layouts";

export function buildTitlePreviewDeck(
  theme: string,
  title = "Theme preview"
): string {
  return JSON.stringify({
    type: "deck",
    meta: { title, company: title, theme },
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

/** Multi-layout bake so agents judge body craft — not title alone. */
export function buildLayoutsPreviewDeck(
  theme: string,
  title = "Theme craft preview"
): string {
  return JSON.stringify({
    type: "deck",
    meta: { title, company: title, theme },
    slides: [
      {
        layout: "title",
        eyebrow: theme.replace(/-/g, " "),
        heading: title,
        lead: "Multi-layout craft preview — title, bento, comparison, stats, quote, code, closing.",
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
          { value: "18", label: "Schema layouts" },
          { value: "75", label: "Theme surfaces" },
          { value: "1", label: "JSON field to swap vibe" },
        ],
      },
      {
        layout: "quote",
        quote: "Pick the theme after you have seen the body craft — not before.",
        attribution: "presentation-md",
      },
      {
        layout: "code",
        eyebrow: "Lock",
        heading: "One field. Seventy-five surfaces.",
        code: `{\n  "meta": { "theme": "${theme}" }\n}`,
        language: "json",
      },
      {
        layout: "closing",
        eyebrow: "Next",
        heading: "Lock the vibe. Ship the ask.",
        lead: "npx @presentation-md/install · preview --compare · render",
        actions: [
          {
            label: "Install presentation-md",
            href: "https://presentation-md.vercel.app/#install",
            style: "solid",
            icon: "fa-solid fa-download",
          },
          {
            label: "Open Studio",
            href: "https://presentation-md.vercel.app/studio",
            style: "outline",
            icon: "fa-solid fa-play",
          },
        ],
      },
    ],
  });
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
