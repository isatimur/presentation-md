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


  it("paints soft blob chrome for Pulse, risograph, and candy-pop", async () => {
    const palettes: Record<string, ResolvedTheme["palette"]> = {
      "kinetic-wrapped": {
        bg: "#0a0a0a",
        bg2: "#0d0d0d",
        text: "#ffffff",
        muted: "#c8c8c8",
        accent: "#c8ff00",
        accent2: "#ff00cc",
        cardBg: "rgba(200,255,0,0.12)",
        border: "rgba(200,255,0,0.55)",
      },
      "risograph-zine": {
        bg: "#f3ecdd",
        bg2: "#e8dfc8",
        text: "#1a1209",
        muted: "#685a46",
        accent: "#ff4f4f",
        accent2: "#2b3aff",
        cardBg: "rgba(255,79,79,0.06)",
        border: "rgba(26,18,9,0.18)",
      },
      "candy-pop": {
        bg: "#fdf3e7",
        bg2: "#f7e8d4",
        text: "#1a1a2e",
        muted: "#6a5c6f",
        accent: "#ff5d8f",
        accent2: "#2d7dd2",
        cardBg: "rgba(255,93,143,0.08)",
        border: "rgba(26,26,46,0.14)",
      },
      "neon-noir": {
        bg: "#050510",
        bg2: "#0a0a1e",
        text: "#e8e4f0",
        muted: "#8884a8",
        accent: "#ff2e97",
        accent2: "#00e5ff",
        cardBg: "rgba(255,46,151,0.07)",
        border: "rgba(0,229,255,0.22)",
      },
      vaporwave: {
        bg: "#1a0533",
        bg2: "#2d1060",
        text: "#fff0f9",
        muted: "#c4a8ff",
        accent: "#ff6ad5",
        accent2: "#5ce1ff",
        cardBg: "rgba(255,106,213,0.08)",
        border: "rgba(92,225,255,0.28)",
      },
      "aurora-glass": {
        bg: "#000000",
        bg2: "#0a0612",
        text: "#ffffff",
        muted: "#a5a0b8",
        accent: "#a78bfa",
        accent2: "#67e8f9",
        cardBg: "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.12)",
      },
      glassmorphism: {
        bg: "#f8f9ff",
        bg2: "#f0f3fd",
        text: "#0f1333",
        muted: "#5a6285",
        accent: "#5b6af5",
        accent2: "#22d3ee",
        cardBg: "rgba(255,255,255,0.72)",
        border: "rgba(91,106,245,0.22)",
      },
      "luxury-minimalist": {
        bg: "#0f0d0c",
        bg2: "#1c1917",
        text: "#f9f6ef",
        muted: "#a8a29e",
        accent: "#c9a84c",
        accent2: "#e8d5a3",
        cardBg: "rgba(249,246,239,0.04)",
        border: "rgba(249,246,239,0.12)",
      },
      "y2k-aero": {
        bg: "#e0f7ff",
        bg2: "#bae6fd",
        text: "#0c4a6e",
        muted: "#0369a1",
        accent: "#38bdf8",
        accent2: "#a3e635",
        cardBg: "rgba(255,255,255,0.72)",
        border: "rgba(14,165,233,0.28)",
      },
      "swiss-typographic": {
        bg: "#ffffff",
        bg2: "#f5f5f5",
        text: "#111111",
        muted: "#666666",
        accent: "#e30613",
        accent2: "#111111",
        cardBg: "#ffffff",
        border: "#e0e0e0",
      },
      "ft-editorial": {
        bg: "#fff1e5",
        bg2: "#f6e6d7",
        text: "#1a1a1a",
        muted: "#595959",
        accent: "#0d5cab",
        accent2: "#cc0000",
        cardBg: "#fff8f0",
        border: "#d9cbb8",
      },
      bauhaus: {
        bg: "#f4f1ea",
        bg2: "#ebe6db",
        text: "#0d0d0d",
        muted: "#5a5a5a",
        accent: "#e63946",
        accent2: "#1f4ae0",
        cardBg: "#ffffff",
        border: "#0d0d0d",
      },
      "fintech-clean": {
        bg: "#ffffff",
        bg2: "#f8fafc",
        text: "#0f172a",
        muted: "#64748b",
        accent: "#7c3aed",
        accent2: "#34d399",
        cardBg: "#ffffff",
        border: "#e2e8f0",
      },
      scandinavian: {
        bg: "#f5f0e8",
        bg2: "#ebe4d8",
        text: "#2b2926",
        muted: "#6b6560",
        accent: "#7d8f6e",
        accent2: "#c4785a",
        cardBg: "#fffcf7",
        border: "#ddd4c6",
      },
      "art-deco": {
        bg: "#0b3d2e",
        bg2: "#0f4a38",
        text: "#f5e6c8",
        muted: "#c4b08a",
        accent: "#d4af37",
        accent2: "#f5e6c8",
        cardBg: "rgba(245,230,200,0.06)",
        border: "rgba(212,175,55,0.35)",
      },
      "botanical-luxe": {
        bg: "#1d3a2f",
        bg2: "#244a3c",
        text: "#f4efe4",
        muted: "#b8c4b0",
        accent: "#bfa55a",
        accent2: "#6b8f71",
        cardBg: "rgba(244,239,228,0.06)",
        border: "rgba(191,165,90,0.3)",
      },
      "genz-bento": {
        bg: "#f7f4ff",
        bg2: "#efe9ff",
        text: "#0f0f1a",
        muted: "#5a5670",
        accent: "#ff4ecd",
        accent2: "#b6f542",
        cardBg: "#ffffff",
        border: "#0f0f1a",
      },
      "heritage-editorial": {
        bg: "#f7f2ea",
        bg2: "#efe6d8",
        text: "#1c1814",
        muted: "#6a5f52",
        accent: "#8b5a2b",
        accent2: "#c4a574",
        cardBg: "#fffcf7",
        border: "#ddd0bc",
      },
      "developer-dark": {
        bg: "#0d1117",
        bg2: "#161b22",
        text: "#e6edf3",
        muted: "#8b949e",
        accent: "#3fb950",
        accent2: "#58a6ff",
        cardBg: "rgba(22,27,34,0.9)",
        border: "#30363d",
      },
      "data-editorial": {
        bg: "#ffffff",
        bg2: "#f6f7f9",
        text: "#111827",
        muted: "#6b7280",
        accent: "#2563eb",
        accent2: "#f59e0b",
        cardBg: "#ffffff",
        border: "#e5e7eb",
      },
      "dark-botanical": {
        bg: "#12160f",
        bg2: "#1a2116",
        text: "#e8e4df",
        muted: "#9aa392",
        accent: "#c4a35a",
        accent2: "#4a7c59",
        cardBg: "rgba(232,228,223,0.06)",
        border: "rgba(232,228,223,0.12)",
      },
      "pastel-geometry": {
        bg: "#c8d9e6",
        bg2: "#b8cddd",
        text: "#1a1a1a",
        muted: "#455e51",
        accent: "#f0b4d4",
        accent2: "#9b8dc4",
        cardBg: "#faf9f7",
        border: "rgba(26,26,26,0.1)",
      },
      "8-bit-orbit": {
        bg: "#0A0E27",
        bg2: "#0F1B3D",
        text: "#FFFFFF",
        muted: "#E2D5F2",
        accent: "#5EDCF4",
        accent2: "#F0A6CA",
        cardBg: "rgba(15,27,61,0.85)",
        border: "rgba(94,220,244,0.35)",
      },
      "neo-grid-bold": {
        bg: "#ECECE8",
        bg2: "#F5F4EF",
        text: "#0A0A0A",
        muted: "#6b6b67",
        accent: "#E6FF3D",
        accent2: "#0A0A0A",
        cardBg: "#F5F4EF",
        border: "rgba(10,10,10,0.85)",
      },
      "bold-poster": {
        bg: "#FFFFFF",
        bg2: "#F5F2EF",
        text: "#1C1410",
        muted: "#655950",
        accent: "#D8000F",
        accent2: "#1C1410",
        cardBg: "#F5F2EF",
        border: "rgba(28,20,16,0.85)",
      },
      capsule: {
        bg: "#F5F5F0",
        bg2: "#FFFFFF",
        text: "#1A1A1A",
        muted: "#5A5A5A",
        accent: "#E85D4E",
        accent2: "#C4D94E",
        cardBg: "#FFFFFF",
        border: "#1E1E1E",
      },
      "cobalt-grid": {
        bg: "#F0EBDE",
        bg2: "#E6E0CE",
        text: "#1F2BE0",
        muted: "#2937df",
        accent: "#1F2BE0",
        accent2: "#1F2BE0",
        cardBg: "rgba(255,255,255,0.55)",
        border: "rgba(31,43,224,0.18)",
      },
      "retro-arcade": {
        bg: "#0d0015",
        bg2: "#150025",
        text: "#e0e0ff",
        muted: "#9090cc",
        accent: "#ff00ff",
        accent2: "#00ffff",
        cardBg: "rgba(255,0,255,0.08)",
        border: "rgba(0,255,255,0.20)",
      },
      "brutalist-mono": {
        bg: "#f0efe9",
        bg2: "#e3e1d8",
        text: "#0a0a0a",
        muted: "#57554c",
        accent: "#ff3600",
        accent2: "#0a0a0a",
        cardBg: "#ffffff",
        border: "rgba(10,10,10,0.85)",
      },
      "creative-mode": {
        bg: "#EFE9D9",
        bg2: "#E4DCC4",
        text: "#0F0F0F",
        muted: "#2A2A2A",
        accent: "#E85A1F",
        accent2: "#F06CA8",
        cardBg: "#F5C518",
        border: "rgba(15,15,15,0.95)",
      },
      "biennale-yellow": {
        bg: "#E9E5DB",
        bg2: "#DCD6C4",
        text: "#1B2566",
        muted: "#4A5480",
        accent: "#F1EE2E",
        accent2: "#E26B4A",
        cardBg: "rgba(255,255,255,0.35)",
        border: "rgba(27,37,102,0.22)",
      },
      scatterbrain: {
        bg: "#FAF8F3",
        bg2: "#F7F5F0",
        text: "#2D2A26",
        muted: "#5C5750",
        accent: "#FFE066",
        accent2: "#FFC9C9",
        cardBg: "#FFE066",
        border: "rgba(45,42,38,0.18)",
      },
      "split-pastel": {
        bg: "#f5e6dc",
        bg2: "#e4dff0",
        text: "#1a1a1a",
        muted: "#6a6570",
        accent: "#c8f0d8",
        accent2: "#f0d4e0",
        cardBg: "rgba(255,255,255,0.65)",
        border: "rgba(26,26,26,0.1)",
      },
    };
    for (const themeName of Object.keys(palettes) as Array<keyof typeof palettes>) {
      const t: ResolvedTheme = {
        ...theme,
        name: themeName,
        palette: palettes[themeName]!,
      };
      const deck: DeckJson = {
        type: "deck",
        meta: {
          title: "Chrome",
          company: themeName === "candy-pop" ? "Sourbean" : "Acme",
          theme: themeName,
        },
        slides: [
          { layout: "title", heading: "Cover", lead: "Hero chrome" },
          {
            layout: "section",
            heading: "Body",
            lead: "Tone or overprint",
            ...(themeName === "kinetic-wrapped" ? { tone: "magenta" } : {}),
          },
          {
            layout: "closing",
            heading: "Close",
            actions: [
              { label: "Primary", href: "#", style: "solid" },
              { label: "Secondary", href: "#", style: "outline" },
            ],
          },
        ],
      };
      const result = await buildPptx(deck, t);
      expect(result.slideCount).toBe(3);
      expect(result.warnings.some((w) => w.includes("Unknown layout"))).toBe(false);
    }
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
