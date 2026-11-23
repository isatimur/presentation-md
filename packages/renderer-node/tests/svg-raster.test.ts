import { describe, expect, it } from "vitest";
import { renderDeckPptx } from "../src/index.js";
import { rasterizeSvgImages } from "../src/svg-raster.js";

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="20"><rect width="40" height="20" fill="#ff3b1f"/></svg>`;
const URL_ENCODED = `data:image/svg+xml,${encodeURIComponent(SVG)}`;
const BASE64 = `data:image/svg+xml;base64,${Buffer.from(SVG).toString("base64")}`;

describe("rasterizeSvgImages", () => {
  it("replaces URL-encoded and base64 SVG images at any depth with PNG, leaving the input untouched", async () => {
    const deck = {
      slides: [
        { layout: "image-hero", image: URL_ENCODED },
        { layout: "logo-wall", cards: [{ title: "A", image: BASE64 }, { title: "B", image: "https://x/y.png" }] },
      ],
    };
    const out = await rasterizeSvgImages(deck);
    expect(out.rasterized).toBe(2);
    expect(out.leftAsSvg).toBe(0);
    expect(out.deck.slides[0]!.image).toMatch(/^data:image\/png;base64,iVBORw0KGgo/);
    expect(out.deck.slides[1]!.cards![0]!.image).toMatch(/^data:image\/png;base64,/);
    expect(out.deck.slides[1]!.cards![1]!.image).toBe("https://x/y.png");
    expect(deck.slides[0]!.image).toBe(URL_ENCODED);
  });

  it("counts an SVG it cannot render as left as SVG", async () => {
    const out = await rasterizeSvgImages({ slides: [{ image: "data:image/svg+xml,%3Cnot-svg" }] });
    expect(out.rasterized).toBe(0);
    expect(out.leftAsSvg).toBe(1);
  });
});

describe("renderDeckPptx with SVG images", () => {
  it("embeds a real PNG (no SVG, no broken-icon fallback) and reports no image fidelity items", async () => {
    const deck = JSON.stringify({
      type: "deck",
      meta: { title: "SVG", theme: "default-tech" },
      slides: [{ layout: "image-hero", heading: "Hero", image: URL_ENCODED, imageAlt: "red" }],
    });
    const kinds: string[] = [];
    const buf = await renderDeckPptx(deck, { onFidelity: (i) => kinds.push(i.kind) });
    // Zip entry names are stored as plain text in the archive's directory.
    const media = [...buf.toString("latin1").matchAll(/ppt\/media\/[\w.-]+/g)].map((m) => m[0]);
    expect(media.some((n) => n.endsWith(".png"))).toBe(true);
    expect(media.some((n) => n.endsWith(".svg"))).toBe(false);
    expect(kinds).not.toContain("image");
  });
});
