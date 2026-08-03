import { describe, expect, it } from "vitest";
import { analyzeHtmlDeck } from "../src/html-metrics.js";

describe("analyzeHtmlDeck", () => {
  it("counts slides and does not flag sparse copy as wall-of-text", () => {
    const html = `<!doctype html><html><head>
<meta name="viewport" content="width=device-width" />
<style>@media print{} @media (prefers-reduced-motion:reduce){} html{scroll-snap-type:y mandatory}</style>
</head><body><main class="deck">
<section class="slide"><h1>One</h1><p>Short.</p></section>
<section class="slide"><h1>Two</h1><p>Also short.</p></section>
</main>
<script>window.addEventListener("keydown",function(){})</script>
</body></html>`;
    const { metrics, flags } = analyzeHtmlDeck(html);
    expect(metrics.slide_count).toBe(2);
    expect(flags.filter((f) => f.id === "words" || /wall|word/i.test(f.detail))).toHaveLength(0);
    expect(flags.filter((f) => f.severity === "gate")).toHaveLength(0);
  });

  it("flags wall-of-text slides as gates", () => {
    const wall = Array.from({ length: 50 }, () => "word").join(" ");
    const html = `<!doctype html><html><body><main class="deck">
<section class="slide"><h1>One</h1></section>
<section class="slide"><h1>Dense</h1><p>${wall}</p></section>
</main></body></html>`;
    const { flags } = analyzeHtmlDeck(html);
    expect(flags.some((f) => f.severity === "gate" && /word/i.test(f.detail))).toBe(true);
  });
});
