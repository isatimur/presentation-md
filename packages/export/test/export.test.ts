import { describe, it, expect } from "vitest";
import type { ResolvedTheme } from "@presentation-md/core";
import {
  buildPptx,
  deckToPptxArrayBuffer,
  deckToPptxBuffer,
  type DeckJson,
} from "../src/index.js";

const theme: ResolvedTheme = {
  name: "test",
  version: "1.0.0",
  manifest: { name: "test", version: "1.0.0" },
  palette: {
    bg: "#0e0e12",
    bg2: "#16161d",
    text: "#f4f4f5",
    muted: "#a1a1aa",
    accent: "#7c3aed",
    accent2: "#22d3ee",
    cardBg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.08)",
  },
  typography: {
    headingFont: "'Montserrat', system-ui, sans-serif",
    bodyFont: "'Open Sans', system-ui, sans-serif",
    headingWeight: 800,
    googleFonts: [],
  },
  geometry: { radius: "18px", slideWidth: "1280px" },
};

const fullDeck: DeckJson = {
  type: "deck",
  meta: { title: "Test Deck", company: "Acme", theme: "test" },
  slides: [
    { layout: "title", eyebrow: "Q3 2026", heading: "All-hands", lead: "Where we are." },
    { layout: "section", number: "01", eyebrow: "Part one", heading: "Context" },
    { layout: "two-column", heading: "Split", body: "Left text.", image: "https://x/y.png", imageAlt: "Diagram" },
    { layout: "image-hero", eyebrow: "Moment", heading: "Hero beat", lead: "Caption.", image: "https://x/y.png", imageAlt: "Photo" },
    {
      layout: "comparison",
      heading: "Old vs new",
      leftLabel: "Before",
      left: "Manual process.",
      rightLabel: "After",
      right: "Automated flow.",
      emphasis: "right",
    },
    {
      layout: "feature-grid",
      heading: "Pillars",
      columns: 3,
      cards: [
        { icon: "fa-bolt", title: "Fast", body: "Speed." },
        { title: "Safe", body: "Secure." },
        { title: "Simple", body: "Easy." },
      ],
    },
    {
      layout: "feature-grid",
      heading: "Bento craft",
      columns: "bento",
      cards: [
        { title: "Hero", body: "Lead claim." },
        { title: "A", body: "One." },
        { title: "B", body: "Two." },
        { title: "C", body: "Three." },
        { title: "D", body: "Four." },
      ],
    },
    {
      layout: "code",
      heading: "Snippet",
      filename: "ship.ts",
      language: "ts",
      code: "console.log('ship');",
    },
    { layout: "data-table", heading: "Numbers", columns: ["Metric", "Value"], rows: [["MRR", "$10k"], ["Users", "1,200"]] },
    { layout: "stat-row", heading: "KPIs", stats: [{ value: "98%", label: "Uptime" }, { value: "3x", label: "Growth" }] },
    {
      layout: "chart",
      heading: "Growth",
      chartType: "bar",
      categories: ["Q1", "Q2", "Q3"],
      series: [{ name: "ARR", values: [1, 2, 3.5] }],
      showLegend: false,
    },
    {
      layout: "custom-html",
      heading: "Art",
      html: "<div style='padding:24px'>Custom panel</div>",
    },
    { layout: "timeline", heading: "Roadmap", steps: [{ title: "Now", body: "Build." }, { title: "Next", body: "Ship." }] },
    { layout: "quote", quote: "Make it work.", by: "Kent Beck" },
    { layout: "closing", heading: "Thanks", lead: "Questions?", cta: { label: "Get started", href: "https://acme.com" } },
  ],
};

function isZip(bytes: Uint8Array): boolean {
  return bytes[0] === 0x50 && bytes[1] === 0x4b; // "PK"
}

describe("deckToPptx", () => {
  it("builds one slide per deck slide across craft layouts (incl. bento/code/emphasis)", async () => {
    const result = await buildPptx(fullDeck, theme);
    expect(result.slideCount).toBe(fullDeck.slides.length);
  });

  it("exports asymmetric comparison + bento without warnings beyond remote images", async () => {
    const deck: DeckJson = {
      type: "deck",
      slides: [
        {
          layout: "comparison",
          heading: "Win",
          leftLabel: "Before",
          left: "Slow.",
          rightLabel: "After",
          right: "Fast.",
          emphasis: "right",
        },
        {
          layout: "feature-grid",
          heading: "Bento",
          columns: "bento",
          cards: [
            { title: "Hero", body: "Lead." },
            { title: "A", body: "One." },
            { title: "B", body: "Two." },
          ],
        },
        {
          layout: "image-hero",
          heading: "Moment",
          lead: "Caption.",
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
          imageAlt: "pixel",
        },
        {
          layout: "code",
          heading: "Run",
          filename: "a.ts",
          code: "export const ok = true;",
        },
      ],
    };
    const result = await buildPptx(deck, theme);
    expect(result.slideCount).toBe(4);
    expect(result.warnings.filter((w) => w.includes("Unknown layout"))).toHaveLength(0);
  });

  it("produces a valid (zip-signed) PPTX ArrayBuffer", async () => {
    const buf = await deckToPptxArrayBuffer(fullDeck, theme);
    const bytes = new Uint8Array(buf);
    expect(bytes.byteLength).toBeGreaterThan(1000);
    expect(isZip(bytes)).toBe(true);
  });

  it("produces a Node Buffer too", async () => {
    const buf = await deckToPptxBuffer(fullDeck, theme);
    expect(Buffer.isBuffer(buf)).toBe(true);
    expect(isZip(buf)).toBe(true);
  });

  it("warns (no silent drop) when a remote image can't be embedded", async () => {
    const result = await buildPptx(fullDeck, theme);
    expect(result.warnings.some((w) => w.includes("Image not embedded"))).toBe(true);
  });

  it("writes speaker notes into the PPTX notes pane", async () => {
    const deck: DeckJson = {
      type: "deck",
      slides: [
        {
          layout: "title",
          heading: "Hello",
          notes: "Say this out loud — pause for effect.",
        },
        { layout: "closing", heading: "Thanks" },
      ],
    };
    const buf = await deckToPptxBuffer(deck, theme);
    const { pptxToDeck } = await import("../src/import/index.js");
    const { deck: imported } = await pptxToDeck(buf, { theme: "test" });
    const withNotes = imported.slides.find((s) => s.notes?.includes("Say this out loud"));
    expect(withNotes).toBeTruthy();
    expect(withNotes!.notes).toContain("pause for effect");
  });

  it("prefetches remote http(s) images into data URIs before embed", async () => {
    const png = Uint8Array.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
      0xde, 0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41, 0x54, 0x08, 0xd7, 0x63, 0xf8, 0xcf, 0xc0, 0x00,
      0x00, 0x00, 0x03, 0x00, 0x01, 0x00, 0x05, 0xfe, 0xd4, 0xef, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45,
      0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
    ]);
    const deck: DeckJson = {
      type: "deck",
      slides: [
        {
          layout: "image-hero",
          heading: "Remote",
          image: "https://cdn.example/photo.png",
          imageAlt: "Photo",
        },
      ],
    };
    const result = await buildPptx(deck, theme, {
      prefetchImages: true,
      prefetch: {
        fetch: async () =>
          new Response(png, { status: 200, headers: { "content-type": "image/png" } }),
      },
    });
    expect(result.warnings.some((w) => w.includes("Image not embedded"))).toBe(false);
    expect(result.warnings.some((w) => w.includes("Could not prefetch"))).toBe(false);
  });

  it("prefetches local file paths and file: URLs into data URIs", async () => {
    const { pathToFileURL } = await import("node:url");
    const png = Uint8Array.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
      0xde, 0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41, 0x54, 0x08, 0xd7, 0x63, 0xf8, 0xcf, 0xc0, 0x00,
      0x00, 0x00, 0x03, 0x00, 0x01, 0x00, 0x05, 0xfe, 0xd4, 0xef, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45,
      0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
    ]);
    const root = "/tmp/pmd-prefetch-root";
    const abs = `${root}/photo.png`;
    const deck: DeckJson = {
      type: "deck",
      slides: [
        {
          layout: "image-hero",
          heading: "Local",
          image: abs,
          imageAlt: "Photo",
        },
        {
          layout: "two-column",
          heading: "File URL",
          body: "Copy.",
          image: pathToFileURL(abs).href,
        },
      ],
    };
    const result = await buildPptx(deck, theme, {
      prefetchImages: true,
      prefetch: {
        allowedRoots: [root],
        readFile: async (p) => {
          expect(p === abs || p.endsWith(`${root}/photo.png`.replace(/\//g, p.includes("\\") ? "\\" : "/")) || p.endsWith("photo.png")).toBe(true);
          return png;
        },
      },
    });
    expect(result.warnings.some((w) => w.includes("Image not embedded"))).toBe(false);
    expect(result.warnings.some((w) => w.includes("Could not prefetch"))).toBe(false);
  });

  it("rejects local paths outside allowedRoots", async () => {
    const deck: DeckJson = {
      type: "deck",
      slides: [
        {
          layout: "image-hero",
          heading: "Escape",
          image: "/etc/passwd.png",
          imageAlt: "Nope",
        },
      ],
    };
    const result = await buildPptx(deck, theme, {
      prefetchImages: true,
      prefetch: {
        allowedRoots: ["/tmp/pmd-safe-only"],
        readFile: async () => {
          throw new Error("should not read");
        },
      },
    });
    expect(result.warnings.some((w) => w.includes("outside allowedRoots"))).toBe(true);
    expect(result.warnings.some((w) => w.includes("Image not embedded"))).toBe(true);
  });

  it("surfaces prefetch failures then still warns on unembedded remotes", async () => {
    const deck: DeckJson = {
      type: "deck",
      slides: [
        {
          layout: "two-column",
          heading: "Split",
          body: "Copy.",
          image: "https://cdn.example/missing.png",
        },
      ],
    };
    const result = await buildPptx(deck, theme, {
      prefetchImages: true,
      prefetch: {
        fetch: async () => new Response(null, { status: 404, statusText: "Not Found" }),
      },
    });
    expect(result.warnings.some((w) => w.includes("Could not prefetch"))).toBe(true);
    expect(result.warnings.some((w) => w.includes("Image not embedded"))).toBe(true);
  });

  it("warns on an unknown layout but still renders", async () => {
    const deck: DeckJson = {
      type: "deck",
      slides: [{ layout: "mystery", heading: "Hi" }],
    };
    const result = await buildPptx(deck, theme);
    expect(result.slideCount).toBe(1);
    expect(result.warnings.some((w) => w.includes("Unknown layout"))).toBe(true);
  });

  it("approximates custom-html bars into PPTX without failing", async () => {
    const deck: DeckJson = {
      type: "deck",
      meta: { title: "Custom HTML", theme: "kinetic-wrapped" },
      slides: [
        {
          layout: "custom-html",
          tone: "magenta",
          heading: "RUNNING IS YOUR THING.",
          html: `<div class="pulse-bar-stack">
            <div style="width:88%;background:#ffffff;color:#cc00ff">Running · 142</div>
            <div style="width:58%;background:#aaaaaa;color:#ffffff">Strength · 94</div>
          </div>
          <p>You ran far.</p>`,
        },
      ],
    };
    const result = await buildPptx(deck, theme);
    expect(result.slideCount).toBe(1);
    expect(result.warnings.some((w) => w.includes("custom-html"))).toBe(true);
  });

  it("exports ranked-list and hero stat-row without warnings about unknown layout", async () => {
    const deck: DeckJson = {
      type: "deck",
      meta: { title: "Pulse", theme: "kinetic-wrapped" },
      slides: [
        {
          layout: "ranked-list",
          tone: "magenta",
          heading: "Top activity",
          items: [
            { label: "Running", value: "142 sessions", widthPct: 88 },
            { label: "Strength", value: "94 sessions", widthPct: 58 },
          ],
        },
        {
          layout: "stat-row",
          variant: "hero",
          tone: "orange",
          heading: "Minutes",
          stats: [
            { value: "14,892", label: "Minutes moved" },
            { value: "52 min", label: "avg" },
          ],
        },
      ],
    };
    const result = await buildPptx(deck, theme);
    expect(result.slideCount).toBe(2);
    expect(result.warnings.some((w) => w.includes("Unknown layout"))).toBe(false);
  });

  it("exports logo-wall without failing", async () => {
    const deck: DeckJson = {
      type: "deck",
      meta: { title: "Logos", theme: "default-tech" },
      slides: [
        {
          layout: "logo-wall",
          heading: "Customers",
          columns: 3,
          cards: [{ title: "Acme" }, { title: "Globex", body: "Enterprise" }, { title: "Initech" }],
        },
      ],
    };
    const result = await buildPptx(deck, theme);
    expect(result.slideCount).toBe(1);
    expect(result.warnings.some((w) => w.includes("Unknown layout"))).toBe(false);
  });

  it("exports streak-grid, metric-ring, and dual closing actions", async () => {
    const deck: DeckJson = {
      type: "deck",
      meta: { title: "Pulse", theme: "kinetic-wrapped" },
      slides: [
        {
          layout: "streak-grid",
          tone: "violet",
          heading: "No excuses.",
          filled: 47,
          total: 60,
          cols: 10,
        },
        {
          layout: "metric-ring",
          tone: "cyan",
          heading: "TOP 3%.",
          value: "3%",
          label: "globally",
          pct: 100,
          lead: "Outworked 97%.",
        },
        {
          layout: "metric-ring",
          heading: "Progress",
          value: "72%",
          label: "complete",
          pct: 72,
          lead: "Almost there.",
        },
        {
          layout: "closing",
          tone: "lime",
          heading: "Share it.",
          actions: [
            { label: "Instagram", href: "https://instagram.com", style: "solid" },
            { label: "Post to X", href: "https://x.com", style: "outline" },
          ],
        },
      ],
    };
    const result = await buildPptx(deck, theme);
    expect(result.slideCount).toBe(4);
    expect(result.warnings.some((w) => w.includes("Unknown layout"))).toBe(false);
    expect(result.warnings.some((w) => w.includes("approximates as a full oval"))).toBe(false);
  });
});
