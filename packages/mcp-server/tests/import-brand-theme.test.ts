import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";

const lookupMock = vi.fn();
vi.mock("node:dns/promises", () => ({
  lookup: (...args: unknown[]) => lookupMock(...args),
}));

const { importBrandThemeTool } = await import("../src/tools/import-brand-theme.js");
const { buildTemplate } = await import("../../export/test/fixtures/build-template.js");

function mockResponse(text: string): Response {
  return {
    ok: true,
    status: 200,
    headers: new Headers(),
    arrayBuffer: async () => new TextEncoder().encode(text).buffer,
  } as unknown as Response;
}

describe("import_brand_theme tool", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    lookupMock.mockReset();
    lookupMock.mockResolvedValue([{ address: "93.184.216.34", family: 4 }]);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects when no source is given", async () => {
    await expect(importBrandThemeTool.handler({})).rejects.toThrow(
      "Provide one of 'url', 'cssPath' or 'pptxPath'."
    );
  });

  it("rejects when two sources are given", async () => {
    await expect(
      importBrandThemeTool.handler({ url: "https://acme.com", cssPath: "/tmp/brand.css" })
    ).rejects.toThrow("Provide only one of 'url', 'cssPath' or 'pptxPath'.");
    await expect(
      importBrandThemeTool.handler({ cssPath: "brand.css", pptxPath: "brand.potx" })
    ).rejects.toThrow("Provide only one of 'url', 'cssPath' or 'pptxPath'.");
  });

  it("returns fonts and warnings, with null logo and scheme, for a URL", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(mockResponse(`<link rel="stylesheet" href="/s.css">`))
      .mockResolvedValueOnce(
        mockResponse(":root { --bg: #010101; --text: #fefefe; --accent: #00aaff; } body { font-family: Inter; }")
      );
    const result = (await importBrandThemeTool.handler({ url: "https://acme.com" })) as Record<string, unknown>;
    expect(result.fonts).toEqual([
      { role: "heading", family: "Inter", status: "google", fallback: "Montserrat" },
      { role: "body", family: "Inter", status: "google", fallback: "Open Sans" },
    ]);
    expect(result.warnings).toEqual([]);
    expect(result.logo).toBeNull();
    expect(result.scheme).toBeNull();
  });

  describe("pptxPath", () => {
    let dir: string;
    beforeEach(async () => {
      dir = await mkdtemp(join(process.cwd(), "import-brand-theme-pptx-"));
    });
    afterEach(async () => {
      await rm(dir, { recursive: true, force: true });
    });

    async function writeTemplate(fileName: string, opts: Parameters<typeof buildTemplate>[0] = {}): Promise<string> {
      const file = join(dir, fileName);
      await writeFile(file, await buildTemplate(opts));
      return relative(process.cwd(), file);
    }

    it("rejects a pptxPath outside the current working directory", async () => {
      const outsideDir = await mkdtemp(join(tmpdir(), "import-brand-theme-outside-"));
      const outsideFile = join(outsideDir, "brand.potx");
      await writeFile(outsideFile, await buildTemplate());
      try {
        await expect(importBrandThemeTool.handler({ pptxPath: outsideFile })).rejects.toThrow(
          /'pptxPath' must be within the current working directory/
        );
      } finally {
        await rm(outsideDir, { recursive: true, force: true });
      }
    });

    it("rejects a .docx", async () => {
      await expect(importBrandThemeTool.handler({ pptxPath: "brand.docx" })).rejects.toThrow(
        "'pptxPath' must point to a .pptx or .potx file."
      );
    });

    it("reads a template, names the theme from the file, and reports fonts, logo and scheme", async () => {
      const pptxPath = await writeTemplate("Acme Brand.potx", {
        pictures: [{ mime: "image/png", x: 10_500_000, y: 150_000, cx: 1_200_000, cy: 400_000, bytes: 2048 }],
      });
      const result = (await importBrandThemeTool.handler({ pptxPath })) as {
        theme: { name: string; roles: Record<string, string> };
        source: string;
        fonts: Array<{ role: string; family: string; status: string }>;
        warnings: string[];
        logo: Record<string, unknown>;
        scheme: { colors: Record<string, string>; clrMap: Record<string, string> };
        writtenTo?: string;
      };
      expect(result.theme.name).toBe("acme-brand");
      expect(result.source).toBe("template-scheme");
      expect(result.theme.roles.accent).toBe("#e4572e");
      expect(result.fonts.map((f) => `${f.family}:${f.status}`)).toEqual([
        "Source Sans 3:google",
        "Calibri:office",
      ]);
      expect(result.warnings).toEqual([]);
      expect(result.logo).toEqual({
        found: true,
        mime: "image/png",
        hasSvg: false,
        corner: "top-right",
        widthPct: 9.8,
        sizeBytes: 2048,
      });
      // Metadata only: no image data of any kind in the logo.
      expect(JSON.stringify(result.logo)).not.toMatch(/base64|data:|bytes"/);
      expect(Object.keys(result.scheme.colors)).toHaveLength(12);
      expect(result.scheme.clrMap).toEqual({ bg1: "lt1", tx1: "dk1", bg2: "lt2", tx2: "dk2" });
      expect(result.writtenTo).toBeUndefined();
    });

    it("refuses to write an Office default and writes it with allowOfficeDefault", async () => {
      const pptxPath = await writeTemplate("office.pptx", {
        kind: "pptx",
        scheme: { accent1: "4472C4", accent2: "ED7D31", accent3: "A5A5A5", accent4: "FFC000", accent5: "5B9BD5", accent6: "70AD47" },
      });
      const outputDir = relative(process.cwd(), join(dir, "theme-out"));

      const preview = (await importBrandThemeTool.handler({ pptxPath })) as { source: string };
      expect(preview.source).toBe("office-default");

      await expect(
        importBrandThemeTool.handler({ pptxPath, write: true, output_dir: outputDir })
      ).rejects.toThrow(/^office-default: The template uses Office 2013–2022 colours, not brand colours\./);

      const written = (await importBrandThemeTool.handler({
        pptxPath,
        write: true,
        output_dir: outputDir,
        allowOfficeDefault: true,
      })) as { writtenTo?: string };
      expect(written.writtenTo).toBeDefined();
    });
  });

  it("returns a valid theme manifest without writing to disk by default", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(mockResponse(`<link rel="stylesheet" href="/s.css">`))
      .mockResolvedValueOnce(
        mockResponse(
          ":root { --bg: #010101; --text: #fefefe; --accent: #00aaff; } body { font-family: Inter; } h1 { font-family: Poppins; }"
        )
      );

    const result = (await importBrandThemeTool.handler({ url: "https://acme.com" })) as {
      theme: { name: string; roles: { bg: string } };
      source: string;
      contrastStillFailing: string[];
      writtenTo?: string;
    };

    expect(result.theme.name).toBe("acme-com");
    expect(result.theme.roles.bg.toLowerCase()).toBe("#010101");
    expect(result.source).toBe("static");
    expect(result.writtenTo).toBeUndefined();
    // Disclosed on every response so callers can't mistake silence for safety.
    expect(result.contrastStillFailing).toEqual([]);
  });

  it("reports a fully-safe palette for a mid-gray brand that used to fail the AA floor", async () => {
    // bg #808080 is the case where the old hardcoded #1a1a1a fallback reached
    // only 4.41:1. With the improved fallback every guarded pair clears AA, so
    // nothing is disclosed — and the response says so explicitly.
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(mockResponse(`<link rel="stylesheet" href="/s.css">`))
      .mockResolvedValueOnce(mockResponse(":root { --bg: #808080; --text: #8a8a8a; }"));

    const result = (await importBrandThemeTool.handler({ url: "https://acme.com" })) as {
      contrastStillFailing: string[];
      contrastAdjustments: Array<{ pair: string; ratio: number }>;
    };
    expect(result.contrastStillFailing).toEqual([]);
    // Every reported adjustment actually clears the bar it was made for.
    for (const adjustment of result.contrastAdjustments) {
      expect(adjustment.ratio).toBeGreaterThanOrEqual(4.5);
    }
  });

  describe("cssPath validation", () => {
    it("rejects an absolute cssPath outside the current working directory", async () => {
      // Use a real file that exists but sits outside process.cwd() (vitest's
      // worker can't process.chdir(), so we can't relocate cwd for this case —
      // instead we point outside it via the OS temp dir, which is never under
      // the package's cwd).
      const outsideDir = await mkdtemp(join(tmpdir(), "import-brand-theme-outside-"));
      const outsideFile = join(outsideDir, "evil.css");
      await writeFile(outsideFile, "body { color: red; }", "utf-8");
      try {
        await expect(
          importBrandThemeTool.handler({ cssPath: outsideFile, name: "acme" })
        ).rejects.toThrow(/must be within the current working directory/i);
      } finally {
        await rm(outsideDir, { recursive: true, force: true });
      }
    });

    it("rejects a relative cssPath that escapes the current working directory", async () => {
      await expect(
        importBrandThemeTool.handler({ cssPath: "../../../etc/evil.css", name: "acme" })
      ).rejects.toThrow(/not found|must be within the current working directory/i);
    });

    it("rejects a cssPath with a non-.css extension", async () => {
      await expect(
        importBrandThemeTool.handler({ cssPath: "package.json", name: "acme" })
      ).rejects.toThrow(/must point to a \.css file/i);
    });

    it("accepts a valid .css file within the current working directory", async () => {
      // Create the fixture under the real process.cwd() (vitest's worker can't
      // process.chdir(), so this test relies on the actual cwd rather than a
      // relocated one) and clean it up afterward.
      const dir = await mkdtemp(join(process.cwd(), "import-brand-theme-test-"));
      try {
        const cssFile = join(dir, "brand.css");
        await writeFile(
          cssFile,
          ":root { --bg: #010101; --text: #fefefe; --accent: #00aaff; } body { font-family: Inter; }",
          "utf-8"
        );
        const relativeCssPath = relative(process.cwd(), cssFile);

        const result = (await importBrandThemeTool.handler({ cssPath: relativeCssPath, name: "acme" })) as {
          theme: { name: string; roles: { bg: string } };
          source: string;
        };

        expect(result.theme.name).toBe("acme");
        expect(result.theme.roles.bg.toLowerCase()).toBe("#010101");
      } finally {
        await rm(dir, { recursive: true, force: true });
      }
    });
  });
});
