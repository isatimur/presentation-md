import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { importBrandThemeTool } from "../src/tools/import-brand-theme.js";

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
});
