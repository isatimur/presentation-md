import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { mkdtemp, rm, truncate, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extractBrand, MAX_LOCAL_CSS_BYTES } from "../src/extract-brand.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSS_FIXTURE = join(__dirname, "..", "fixtures", "brand.css");
const LOW_CONTRAST_FIXTURE = join(__dirname, "..", "fixtures", "brand-low-contrast.css");
const EMPTY_FIXTURE = join(__dirname, "..", "fixtures", "brand-empty.css");

describe("extractBrand", () => {
  it("throws when neither url nor cssPath is given", async () => {
    await expect(extractBrand({})).rejects.toThrow(/requires either/i);
  });

  it("throws when both url and cssPath are given", async () => {
    await expect(
      extractBrand({ url: "https://example.com", cssPath: CSS_FIXTURE })
    ).rejects.toThrow(/only one of/i);
  });

  it("extracts from a local CSS file via the static pass", async () => {
    const result = await extractBrand({ cssPath: CSS_FIXTURE });
    expect(result.source).toBe("static");
    expect(result.palette.bg.toLowerCase()).toBe("#0a0a0a");
    expect(result.headingFont).toBe("Poppins");
    expect(result.bodyFont).toBe("Inter");
  });

  it("reports no contrast adjustments when the source palette is already safe", async () => {
    const result = await extractBrand({ cssPath: CSS_FIXTURE });
    expect(result.adjustments).toEqual([]);
  });

  it("adjusts low-contrast text against a light background and reports it", async () => {
    const result = await extractBrand({ cssPath: LOW_CONTRAST_FIXTURE });
    expect(result.adjustments.length).toBeGreaterThan(0);
    expect(result.palette.text).not.toBe("#e0e0e0");
  });

  it("throws a clear error when a CSS file has no usable colors or fonts", async () => {
    await expect(extractBrand({ cssPath: EMPTY_FIXTURE })).rejects.toThrow(/could not extract/i);
  });

  it("rejects an oversized local CSS file before reading it", async () => {
    const dir = await mkdtemp(join(tmpdir(), "pmd-brand-css-limit-"));
    const path = join(dir, "oversized.css");
    try {
      await writeFile(path, "");
      await truncate(path, MAX_LOCAL_CSS_BYTES + 1);
      await expect(extractBrand({ cssPath: path })).rejects.toThrow(/local css exceeds/i);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});
