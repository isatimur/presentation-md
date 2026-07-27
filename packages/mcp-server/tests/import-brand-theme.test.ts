import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";

const lookupMock = vi.fn();
vi.mock("node:dns/promises", () => ({
  lookup: (...args: unknown[]) => lookupMock(...args),
}));

const { importBrandThemeTool } = await import("../src/tools/import-brand-theme.js");

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

  it("rejects when neither url nor cssPath is given", async () => {
    await expect(importBrandThemeTool.handler({})).rejects.toThrow(/provide either/i);
  });

  it("rejects when both url and cssPath are given", async () => {
    await expect(
      importBrandThemeTool.handler({ url: "https://acme.com", cssPath: "/tmp/brand.css" })
    ).rejects.toThrow(/only one of/i);
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
      writtenTo?: string;
    };

    expect(result.theme.name).toBe("acme-com");
    expect(result.theme.roles.bg.toLowerCase()).toBe("#010101");
    expect(result.source).toBe("static");
    expect(result.writtenTo).toBeUndefined();
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
