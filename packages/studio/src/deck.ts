import type { DeckJson, Slide, LayoutType } from "@presentation-md/export";

export type { DeckJson, Slide, LayoutType };

export const LAYOUTS: LayoutType[] = [
  "title",
  "section",
  "two-column",
  "feature-grid",
  "data-table",
  "stat-row",
  "chart",
  "timeline",
  "quote",
  "closing",
  "image-hero",
  "comparison",
  "code",
  "custom-html",
  "ranked-list",
  "logo-wall",
  "streak-grid",
  "metric-ring",
];

export const LAYOUT_LABELS: Record<LayoutType, string> = {
  title: "Title",
  section: "Section divider",
  "two-column": "Two column",
  "feature-grid": "Feature grid",
  "data-table": "Data table",
  "stat-row": "Stat row",
  chart: "Chart",
  timeline: "Timeline",
  quote: "Quote",
  closing: "Closing",
  "image-hero": "Image hero",
  comparison: "Comparison",
  code: "Code",
  "custom-html": "Custom HTML",
  "ranked-list": "Ranked list",
  "logo-wall": "Logo wall",
  "streak-grid": "Streak grid",
  "metric-ring": "Metric ring",
};

/** A reasonable starter slide for each layout, so new slides aren't blank. */
export function blankSlide(layout: LayoutType): Slide {
  switch (layout) {
    case "title":
      return { layout, eyebrow: "Eyebrow", heading: "Title slide", lead: "Supporting line." };
    case "section":
      return { layout, number: "01", eyebrow: "Part", heading: "Section title", lead: "" };
    case "two-column":
      return { layout, heading: "Heading", body: "Left column body text.", image: "", imageAlt: "Image" };
    case "image-hero":
      return { layout, eyebrow: "Story", heading: "Hero moment", lead: "Caption over a full-bleed image.", image: "", imageAlt: "Hero image" };
    case "comparison":
      return {
        layout,
        heading: "Before vs after",
        leftLabel: "Before",
        left: "The old way — slow, manual, error-prone.",
        rightLabel: "After",
        right: "The new way — automated, fast, reliable.",
        emphasis: "right",
      };
    case "code":
      return {
        layout,
        eyebrow: "API",
        heading: "Ship in five lines",
        filename: "example.ts",
        language: "ts",
        code: `const client = createClient({ apiKey });\nconst res = await client.run({ prompt });\nconsole.log(res.ok);`,
      };
    case "feature-grid":
      return {
        layout,
        heading: "Feature grid",
        columns: 3,
        cards: [
          { title: "One", body: "First point." },
          { title: "Two", body: "Second point." },
          { title: "Three", body: "Third point." },
        ],
      };
    case "data-table":
      return { layout, heading: "Table", columns: ["Column A", "Column B"], rows: [["a1", "b1"], ["a2", "b2"]] };
    case "stat-row":
      return { layout, heading: "Stats", stats: [{ value: "100%", label: "Metric" }, { value: "2x", label: "Metric" }] };
    case "chart":
      return {
        layout,
        eyebrow: "Traction",
        heading: "Revenue by quarter",
        chartType: "bar",
        categories: ["Q1", "Q2", "Q3", "Q4"],
        series: [{ name: "ARR ($M)", values: [2.1, 2.8, 3.6, 4.9] }],
        showLegend: true,
        showValues: false,
      };
    case "custom-html":
      return {
        layout,
        eyebrow: "Art direction",
        heading: "One-off craft",
        html: `<div style="display:flex;gap:16px;align-items:stretch;height:100%"><div style="flex:1;background:var(--accent);border-radius:16px;padding:24px;color:var(--bg)"><div style="font:800 48px/1 var(--heading-font)">01</div><p style="margin-top:12px;opacity:.85">Accent panel</p></div><div style="flex:1.4;border:2px solid var(--border);border-radius:16px;padding:24px"><p style="font:700 28px/1.15 var(--heading-font);color:var(--text)">Schema-safe HTML for frontend-slides energy.</p></div></div>`,
      };
    case "ranked-list":
      return {
        layout,
        eyebrow: "Top 3",
        heading: "Your ranking",
        lead: "Bars that export cleanly to PPTX.",
        items: [
          { label: "Running", value: "142 sessions", widthPct: 88 },
          { label: "Strength", value: "94 sessions", widthPct: 58 },
          { label: "HIIT", value: "51 sessions", widthPct: 34 },
        ],
      };
    case "logo-wall":
      return {
        layout,
        eyebrow: "Customers",
        heading: "Trusted by teams who ship",
        lead: "Logo marks stay editable in PPTX.",
        columns: 4,
        cards: [
          { title: "Nova", body: "Series A" },
          { title: "Meridian", body: "Enterprise" },
          { title: "Forge", body: "Platform" },
          { title: "Pulse", body: "Consumer" },
        ],
      };
    case "streak-grid":
      return {
        layout,
        eyebrow: "Best streak",
        heading: "No excuses.",
        lead: "47 days straight. March 3 → April 18.",
        filled: 47,
        total: 60,
        cols: 10,
      };
    case "metric-ring":
      return {
        layout,
        eyebrow: "Global ranking",
        heading: "TOP 3%.",
        value: "3%",
        label: "globally",
        pct: 100,
        lead: "Out of millions of users, you outworked nearly everyone.",
      };
    case "timeline":
      return { layout, heading: "Timeline", steps: [{ title: "Step one", body: "Detail." }, { title: "Step two", body: "Detail." }] };
    case "quote":
      return { layout, quote: "A memorable quote.", by: "Attribution" };
    case "closing":
      return {
        layout,
        eyebrow: "Thanks",
        heading: "Closing",
        lead: "Call to action.",
        actions: [
          { label: "Get started", href: "https://example.com", style: "solid" },
          { label: "Learn more", href: "https://example.com", style: "outline" },
        ],
      };
    default:
      return { layout, heading: "Slide" };
  }
}

export const EXAMPLE_DECK: DeckJson = {
  type: "deck",
  meta: { title: "Acme Q3", company: "Acme", theme: "signal", description: "Studio craft preview" },
  slides: [
    { layout: "title", eyebrow: "Q3 2026", heading: "Acme All-Hands", lead: "Momentum, metrics, and what's next." },
    {
      layout: "image-hero",
      eyebrow: "Moment",
      heading: "Ship the story, not the slide.",
      lead: "Full-bleed craft that still exports to editable PPTX.",
      image:
        "data:image/svg+xml," +
        encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0B1220"/><stop offset="1" stop-color="#FF3B1F"/></linearGradient></defs><rect width="1600" height="900" fill="url(#g)"/><circle cx="1180" cy="280" r="180" fill="#0D9488" opacity=".35"/></svg>`
        ),
      imageAlt: "Signal gradient field",
    },
    { layout: "section", number: "01", eyebrow: "Part one", heading: "Where we are" },
    {
      layout: "feature-grid",
      heading: "Three pillars",
      columns: "bento",
      cards: [
        { icon: "fa-solid fa-bolt", title: "Speed", body: "Ship 3x faster with schema craft." },
        { title: "Safety", body: "SOC2 in progress." },
        { title: "Simplicity", body: "One command install." },
        { title: "Export", body: "Native editable PPTX." },
        { title: "Themes", body: "75 swappable looks." },
      ],
    },
    {
      layout: "comparison",
      heading: "Before vs after",
      leftLabel: "Prompt-only packs",
      left: "Opaque HTML. Hard to edit one slide. No native PowerPoint.",
      rightLabel: "presentation-md",
      right: "Schema-validated Deck JSON. Diff one slide. MCP + editable PPTX.",
      emphasis: "right",
    },
    {
      layout: "two-column",
      eyebrow: "Craft",
      heading: "Asymmetric layouts stay intentional.",
      body: "Ratio and reverse controls keep media and copy in tension — not a default 50/50 split.",
      aside: "2:1 copy · reverse media",
      ratio: "2-1",
    },
    {
      layout: "code",
      eyebrow: "Agent skill",
      heading: "One install. Any agent.",
      filename: "install.sh",
      language: "bash",
      code: "npx @presentation-md/install claude-code\n# then: create a presentation about…",
    },
    { layout: "stat-row", heading: "By the numbers", stats: [
      { value: "75", label: "Themes" }, { value: "18", label: "Layouts" }, { value: "1", label: "Install" },
    ] },
    {
      layout: "chart",
      eyebrow: "Proof",
      heading: "Agents ship charts, not screenshot jpegs.",
      chartType: "bar",
      categories: ["Jan", "Feb", "Mar", "Apr"],
      series: [
        { name: "HTML decks", values: [12, 19, 28, 41] },
        { name: "PPTX exports", values: [8, 14, 22, 33] },
      ],
      showLegend: true,
      notes: "Native editable charts in PPTX via pptxgenjs.",
    },
    { layout: "quote", quote: "Make it work, make it right, make it fast.", by: "Kent Beck" },
    { layout: "closing", heading: "Thank you", lead: "Questions?", cta: { label: "Get started", href: "https://presentation-md.vercel.app" } },
  ],
};
