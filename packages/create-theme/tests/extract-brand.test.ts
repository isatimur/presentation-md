import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { mkdtemp, rm, truncate, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extractBrand, MAX_LOCAL_CSS_BYTES } from "../src/extract-brand.js";
import { buildTemplate } from "../../export/test/fixtures/build-template.js";

const OFFICE_2013_ACCENTS = {
  accent1: "4472C4",
  accent2: "ED7D31",
  accent3: "A5A5A5",
  accent4: "FFC000",
  accent5: "5B9BD5",
  accent6: "70AD47",
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSS_FIXTURE = join(__dirname, "..", "fixtures", "brand.css");
const LOW_CONTRAST_FIXTURE = join(__dirname, "..", "fixtures", "brand-low-contrast.css");
const EMPTY_FIXTURE = join(__dirname, "..", "fixtures", "brand-empty.css");

describe("extractBrand", () => {
  it("throws when no source is given", async () => {
    await expect(extractBrand({})).rejects.toThrow(
      "extractBrand requires one of 'url', 'cssPath' or 'pptxPath'."
    );
  });

  it("throws when two sources are given", async () => {
    await expect(
      extractBrand({ url: "https://example.com", cssPath: CSS_FIXTURE })
    ).rejects.toThrow("extractBrand accepts only one of 'url', 'cssPath' or 'pptxPath'.");
    await expect(extractBrand({ cssPath: CSS_FIXTURE, pptxPath: "a.potx" })).rejects.toThrow(
      /only one of/
    );
  });

  it("returns null logo and scheme, a font plan and the base theme for CSS", async () => {
    const result = await extractBrand({ cssPath: CSS_FIXTURE });
    expect(result.logo).toBeNull();
    expect(result.scheme).toBeNull();
    expect(result.extends).toBe("default-tech");
    expect(result.fontPlan.rows.map((r) => r.status)).toEqual(["google", "google"]);
    expect(result.warnings).toEqual([]);
  });

  it("leaves a non-Google family out of googleFonts for CSS sources", async () => {
    const dir = await mkdtemp(join(tmpdir(), "pmd-brand-css-fonts-"));
    const path = join(dir, "brand.css");
    try {
      await writeFile(
        path,
        ":root { --bg: #ffffff; --text: #111111; --accent: #e4572e; } h1 { font-family: 'Acme Sans'; } body { font-family: Calibri; }"
      );
      const result = await extractBrand({ cssPath: path });
      expect(result.extends).toBe("claude");
      expect(result.fontPlan.googleFonts).toEqual([
        "Space+Grotesk:wght@500;600;700",
        "Lora:wght@400;500;600",
      ]);
      expect(result.fontPlan.googleFonts.join(" ")).not.toMatch(/Acme|Calibri/);
      expect(result.fontPlan.headingStack).toBe("'Acme Sans', 'Space Grotesk', system-ui, sans-serif");
      expect(result.fontPlan.rows.map((r) => r.status)).toEqual(["unavailable", "office"]);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  describe("pptxPath", () => {
    it("reads a template end to end", async () => {
      const dir = await mkdtemp(join(tmpdir(), "pmd-brand-pptx-"));
      const path = join(dir, "Acme Brand.potx");
      try {
        await writeFile(
          path,
          await buildTemplate({
            pictures: [{ mime: "image/png", x: 10_500_000, y: 150_000, cx: 1_200_000, cy: 400_000 }],
          })
        );
        const result = await extractBrand({ pptxPath: path });
        expect(result.source).toBe("template-scheme");
        expect(result.palette.bg).toBe("#ffffff");
        expect(result.palette.text).toBe("#1b1b1f");
        expect(result.palette.accent).toBe("#e4572e");
        expect(result.palette.bg2).toBe("#eef2f7");
        expect(result.palette.accent2).toBe("#17bebb");
        expect(result.extends).toBe("claude");
        expect(result.headingFont).toBe("Source Sans 3");
        expect(result.bodyFont).toBe("Calibri");
        expect(result.fontPlan.rows.map((r) => r.status)).toEqual(["google", "office"]);
        expect(result.logo).toMatchObject({ found: true, mime: "image/png", corner: "top-right" });
        expect(result.scheme?.colors.accent1).toBe("#e4572e");
        expect(result.scheme?.clrMap.bg1).toBe("lt1");
      } finally {
        await rm(dir, { recursive: true, force: true });
      }
    });

    it("marks an Office default scheme", async () => {
      const dir = await mkdtemp(join(tmpdir(), "pmd-brand-pptx-"));
      const path = join(dir, "office.pptx");
      try {
        await writeFile(path, await buildTemplate({ kind: "pptx", scheme: OFFICE_2013_ACCENTS }));
        const result = await extractBrand({ pptxPath: path });
        expect(result.source).toBe("office-default");
        expect(result.scheme?.officeDefault).toBe("Office 2013–2022");
      } finally {
        await rm(dir, { recursive: true, force: true });
      }
    });

    it("names the file in a reader error", async () => {
      const dir = await mkdtemp(join(tmpdir(), "pmd-brand-pptx-"));
      const path = join(dir, "broken.potx");
      try {
        await writeFile(path, await buildTemplate({ omitTheme: true }));
        await expect(extractBrand({ pptxPath: path })).rejects.toThrow(
          "No theme part for the first slide master in broken.potx"
        );
      } finally {
        await rm(dir, { recursive: true, force: true });
      }
    });
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
