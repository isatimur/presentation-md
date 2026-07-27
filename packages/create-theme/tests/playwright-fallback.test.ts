import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { extractComputedStyles } from "../src/playwright-fallback.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURE = "file://" + join(__dirname, "..", "fixtures", "brand-site.html");

// Skipped in CI: this test installs Playwright + Chromium on first run
// (matches skills/presentation-generator/scripts/export-pdf.sh's on-demand
// pattern), which is slow and adds flakiness risk to the CI matrix. Run
// locally with `npx vitest run tests/playwright-fallback.test.ts` before
// releases that touch this file.
describe.skipIf(!!process.env.CI)("extractComputedStyles", () => {
  it("reads computed background, text, accent, and font from a rendered page", async () => {
    const result = await extractComputedStyles(FIXTURE);
    expect(result.bg?.toLowerCase()).toBe("#101820");
    expect(result.text?.toLowerCase()).toBe("#f2f2f2");
    expect(result.accent?.toLowerCase()).toBe("#ff5a36");
    expect(result.headingFont).toBe("Helvetica Neue");
    expect(result.bodyFont).toBe("Georgia");
  }, 60_000);
});
