import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
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

  it("never reads local files referenced by an SVG (no sandbox bypass)", async () => {
    // 1x1 red PNG on disk, outside any allowed root.
    const dir = mkdtempSync(join(tmpdir(), "pmd-svg-"));
    const png = join(dir, "secret.png");
    writeFileSync(
      png,
      Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==", "base64")
    );
    for (const href of [png, `href-rel:${png}`]) {
      const attr = href.startsWith("href-rel:") ? `xlink:href="${href.slice(9)}"` : `href="${href}"`;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10"><image ${attr} width="10" height="10"/></svg>`;
      const out = await rasterizeSvgImages({ slides: [{ image: `data:image/svg+xml,${encodeURIComponent(svg)}` }] });
      expect(out.rasterized, attr).toBe(0);
      expect(out.leftAsSvg, attr).toBe(1);
    }
  });

  it("still rasterizes SVGs whose hrefs are fragments or data URIs", async () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><defs><rect id="r" width="10" height="10" fill="red"/></defs><use href="#r"/><image href="data:image/png;base64,iVBORw0KGgo=" width="1" height="1"/></svg>`;
    const out = await rasterizeSvgImages({ slides: [{ image: `data:image/svg+xml,${encodeURIComponent(svg)}` }] });
    expect(out.rasterized).toBe(1);
  });

  it("decodes hand-written data URIs that contain a bare %", async () => {
    const raw = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="10"><rect width="100%" height="10" fill="%23ff0000"/></svg>`;
    const out = await rasterizeSvgImages({ slides: [{ image: raw }] });
    expect(out.rasterized).toBe(1);
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

  it("rasterizes SVG files fetched by prefetch (local path inside cwd), not only inline ones", async () => {
    const dir = mkdtempSync(join(process.cwd(), "svg-prefetch-test-"));
    const file = join(dir, "art.svg");
    writeFileSync(file, SVG);
    try {
      const deck = JSON.stringify({
        type: "deck",
        meta: { title: "SVG file", theme: "default-tech" },
        slides: [{ layout: "image-hero", heading: "Hero", image: file, imageAlt: "red" }],
      });
      const buf = await renderDeckPptx(deck);
      const media = [...buf.toString("latin1").matchAll(/ppt\/media\/[\w.-]+/g)].map((m) => m[0]);
      expect(media.some((n) => n.endsWith(".png"))).toBe(true);
      expect(media.some((n) => n.endsWith(".svg"))).toBe(false);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
