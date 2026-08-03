import { describe, it, expect } from "vitest";
import {
  extractSlideChunks,
  isolateSlideHtml,
  screenshotSlides,
  which,
} from "../src/screenshot-slides.js";

const TWO_SLIDE = `<!doctype html><html><head><meta charset="utf-8"/><title>T</title></head>
<body><main class="deck">
<section class="slide"><h1>One</h1></section>
<section class="slide"><h1>Two</h1></section>
</main></body></html>`;

describe("screenshot isolate helpers", () => {
  it("times out a hung which lookup", async () => {
    const { mkdtemp, rm, writeFile } = await import("node:fs/promises");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    const root = await mkdtemp(join(tmpdir(), "pmd-which-timeout-"));
    const fakeWhich = join(root, "which");
    await writeFile(fakeWhich, "#!/bin/sh\nsleep 2\n", { encoding: "utf8", mode: 0o755 });
    const previousPath = process.env.PATH;
    process.env.PATH = `${root}:${previousPath ?? ""}`;
    try {
      await expect(which("google-chrome", 50)).resolves.toBeUndefined();
    } finally {
      if (previousPath === undefined) delete process.env.PATH;
      else process.env.PATH = previousPath;
      await rm(root, { recursive: true, force: true });
    }
  });

  it("extracts top-level .slide chunks", () => {
    const chunks = extractSlideChunks(TWO_SLIDE);
    expect(chunks).toHaveLength(2);
    expect(chunks[0]).toContain("One");
    expect(chunks[1]).toContain("Two");
  });

  it("keeps content after a nested section inside the same slide", () => {
    const html = `<main class="deck">
<section class="slide"><h1>One</h1><section><p>Nested</p></section><p>After nested</p></section>
<section class="slide"><h1>Two</h1></section>
</main>`;
    const chunks = extractSlideChunks(html);

    expect(chunks).toHaveLength(2);
    expect(chunks[0]).toContain("Nested");
    expect(chunks[0]).toContain("After nested");
    expect(chunks[0]).not.toContain("Two");
  });

  it("does not count a nested .slide element as another top-level slide", () => {
    const html = `<main class="deck">
<div class="slide"><div class="slide"><p>Nested decoration</p></div><p>Outer tail</p></div>
<div class="slide"><p>Second top-level</p></div>
</main>`;
    const chunks = extractSlideChunks(html);

    expect(chunks).toHaveLength(2);
    expect(chunks[0]).toContain("Nested decoration");
    expect(chunks[0]).toContain("Outer tail");
    expect(chunks[1]).toContain("Second top-level");
  });

  it("builds a one-slide HTML that forces reveals visible", () => {
    const chunks = extractSlideChunks(TWO_SLIDE);
    const isolated = isolateSlideHtml(TWO_SLIDE, chunks[1]!);
    expect(isolated).toContain("Two");
    expect(isolated).not.toContain("One");
    expect(isolated).toContain("in-view");
    expect(isolated).toMatch(/<head/i);
  });

  it("closes a div data-surface container with the matching tag", () => {
    const slide = '<section class="slide"><h1>Surface slide</h1></section>';
    const fullHtml = `<!doctype html><html><head><title>Surface</title></head>
<body><div data-surface="custom">${slide}</div></body></html>`;
    const isolated = isolateSlideHtml(fullHtml, slide);

    expect(isolated).toContain(`<div data-surface="custom">${slide}</div>`);
    expect(isolated).not.toContain(`${slide}</main>`);
  });

  it("terminates timed-out Chrome descendants", async () => {
    const { mkdtemp, rm, stat, writeFile } = await import("node:fs/promises");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    const root = await mkdtemp(join(tmpdir(), "pmd-chrome-timeout-"));
    const fakeChrome = join(root, "fake-chrome.sh");
    const marker = join(root, "descendant-finished");
    await writeFile(
      fakeChrome,
      [
        "#!/bin/sh",
        "(sleep 0.4; touch \"$PRESENTATION_MD_TEST_SCREENSHOT_MARKER\") &",
        "sleep 2",
      ].join("\n"),
      { encoding: "utf8", mode: 0o755 }
    );

    const envKeys = [
      "PRESENTATION_MD_CHROME_PATH",
      "PRESENTATION_MD_SCREENSHOT_TIMEOUT_MS",
      "PRESENTATION_MD_TEST_SCREENSHOT_MARKER",
    ] as const;
    const previous = new Map(envKeys.map((key) => [key, process.env[key]]));
    process.env.PRESENTATION_MD_CHROME_PATH = fakeChrome;
    process.env.PRESENTATION_MD_SCREENSHOT_TIMEOUT_MS = "100";
    process.env.PRESENTATION_MD_TEST_SCREENSHOT_MARKER = marker;

    try {
      const result = await screenshotSlides(TWO_SLIDE, {
        shotsDir: join(root, "shots"),
        slideIndices: [1],
      });
      await new Promise((resolve) => setTimeout(resolve, 500));
      const descendantFinished = await stat(marker).then(
        () => true,
        () => false
      );

      expect(result.ok).toBe(false);
      expect(result.shots).toHaveLength(1);
      expect(result.shots[0]?.bytes).toBe(0);
      expect(result.detail).toMatch(/partial capture/i);
      expect(descendantFinished).toBe(false);
    } finally {
      for (const key of envKeys) {
        const value = previous.get(key);
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
      await rm(root, { recursive: true, force: true });
    }
  });
});
