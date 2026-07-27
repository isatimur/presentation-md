#!/usr/bin/env node
// Renders a deck HTML file to PDF via headless Chromium's native print pipeline
// (vector output, selectable text) rather than screenshotting each slide.
// Relies on the deck's own `@media print { page-break-after: always }` rule
// (see SKILL.md "Rendering Guidelines") to paginate one slide per page.
import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error("usage: export-pdf.mjs <input.html> <output.pdf>");
  process.exit(1);
}

const html = await readFile(inputPath, "utf-8");
// Count "slide" as an exact space-separated class token — a naive \bslide\b
// regex treats '-' as a word boundary and wrongly matches hyphenated
// compounds like "title-slide" or "slide-inner" too.
const expectedSlides = [...html.matchAll(/class\s*=\s*("[^"]*"|'[^']*')/g)].filter((m) =>
  m[1].slice(1, -1).split(/\s+/).includes("slide")
).length;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(pathToFileURL(inputPath).href, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: outputPath,
    printBackground: true,
    width: "1920px",
    height: "1080px",
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
} finally {
  await browser.close();
}

// Best-effort page count check — counts top-level /Type /Page objects in the
// raw PDF bytes. Not a full PDF parse, just enough to catch the classic
// failure mode (everything collapsed onto one giant page).
const pdfBytes = await readFile(outputPath, "latin1");
const actualPages = (pdfBytes.match(/\/Type\s*\/Page[^s]/g) ?? []).length;

console.log(`slides in source: ${expectedSlides}, pages in PDF: ${actualPages}`);
if (expectedSlides > 0 && actualPages !== expectedSlides) {
  console.error(
    `warning: page count doesn't match slide count — check the deck's @media print rules (page-break-after: always on each .slide)`
  );
}
