import { afterEach, describe, expect, it, vi } from "vitest";
import type { ResolvedTheme } from "@presentation-md/core";
import { buildPptx, deckToPptxBuffer, type DeckJson } from "../src/index.js";
import { toBase64DataUri } from "../src/data-uri.js";

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><text>é ✓</text></svg>`;
const SVG_URI = `data:image/svg+xml,${encodeURIComponent(SVG)}`;

const theme: ResolvedTheme = {
  name: "test",
  version: "1.0.0",
  manifest: { name: "test", version: "1.0.0" },
  palette: {
    bg: "#ffffff",
    bg2: "#f4f4f5",
    text: "#111111",
    muted: "#555555",
    accent: "#7c3aed",
    accent2: "#22d3ee",
    cardBg: "#ffffff",
    border: "#dddddd",
  },
  typography: { headingFont: "Arial", bodyFont: "Arial", headingWeight: 700, googleFonts: [] },
  geometry: { radius: "12px", slideWidth: "1280px" },
};

describe("toBase64DataUri", () => {
  it("re-encodes URL-encoded SVG as base64 and keeps UTF-8 text", () => {
    const out = toBase64DataUri(SVG_URI)!;
    expect(out.startsWith("data:image/svg+xml;base64,")).toBe(true);
    const bytes = Uint8Array.from(atob(out.split(",")[1]!), (c) => c.charCodeAt(0));
    expect(new TextDecoder().decode(bytes)).toBe(SVG);
  });

  it("keeps bare % in hand-written URIs instead of failing", () => {
    const raw = `data:image/svg+xml;utf8,<svg width="100%"><rect fill="%23f00"/></svg>`;
    const out = toBase64DataUri(raw)!;
    const bytes = Uint8Array.from(atob(out.split(",")[1]!), (c) => c.charCodeAt(0));
    expect(new TextDecoder().decode(bytes)).toBe(`<svg width="100%"><rect fill="#f00"/></svg>`);
  });

  it("passes base64 URIs through and rejects malformed ones", () => {
    expect(toBase64DataUri("data:image/png;base64,iVBORw0KGgo=")).toBe("data:image/png;base64,iVBORw0KGgo=");
    expect(toBase64DataUri("data:image/svg+xml,")).toBeNull();
    expect(toBase64DataUri("data:image/png;base64,")).toBeNull();
    expect(toBase64DataUri("not-a-data-uri")).toBeNull();
  });
});

describe("PPTX embeds URL-encoded SVG images", () => {
  afterEach(() => vi.restoreAllMocks());

  it("embeds the image instead of silently dropping it", async () => {
    const pptxErrors = vi.spyOn(console, "error");
    const deck: DeckJson = {
      type: "deck",
      meta: { title: "Images", theme: "test" },
      slides: [
        { layout: "image-hero", heading: "Hero", image: SVG_URI, imageAlt: "hero" },
        { layout: "logo-wall", heading: "Logos", cards: [{ title: "Acme", image: SVG_URI }] },
      ],
    } as DeckJson;

    const { fidelity } = await buildPptx(deck, theme);
    expect(fidelity.filter((i) => i.kind === "image")).toEqual([]);

    const buf = await deckToPptxBuffer(deck, theme);
    expect(pptxErrors).not.toHaveBeenCalled();
    const JSZip = (await import("jszip")).default;
    const zip = await JSZip.loadAsync(buf);
    const svgMedia = Object.keys(zip.files).filter((n) => /^ppt\/media\/.+\.svg$/i.test(n));
    expect(svgMedia.length).toBeGreaterThanOrEqual(2);
  });

  it("reports an unreadable data URI as an image fidelity item", async () => {
    const deck: DeckJson = {
      type: "deck",
      meta: { title: "Bad", theme: "test" },
      slides: [{ layout: "image-hero", heading: "Hero", image: "data:image/png;base64," }],
    } as DeckJson;
    const { fidelity } = await buildPptx(deck, theme);
    expect(fidelity).toContainEqual(expect.objectContaining({ kind: "image", slide: 1 }));
  });
});
