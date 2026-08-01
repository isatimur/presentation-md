import { describe, it, expect } from "vitest";
import {
  extractSlideChunks,
  isolateSlideHtml,
} from "../src/screenshot-slides.js";

const TWO_SLIDE = `<!doctype html><html><head><meta charset="utf-8"/><title>T</title></head>
<body><main class="deck">
<section class="slide"><h1>One</h1></section>
<section class="slide"><h1>Two</h1></section>
</main></body></html>`;

describe("screenshot isolate helpers", () => {
  it("extracts top-level .slide chunks", () => {
    const chunks = extractSlideChunks(TWO_SLIDE);
    expect(chunks).toHaveLength(2);
    expect(chunks[0]).toContain("One");
    expect(chunks[1]).toContain("Two");
  });

  it("builds a one-slide HTML that forces reveals visible", () => {
    const chunks = extractSlideChunks(TWO_SLIDE);
    const isolated = isolateSlideHtml(TWO_SLIDE, chunks[1]!);
    expect(isolated).toContain("Two");
    expect(isolated).not.toContain("One");
    expect(isolated).toContain("in-view");
    expect(isolated).toMatch(/<head/i);
  });
});
