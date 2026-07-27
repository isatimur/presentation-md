import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateThemeJson } from "@presentation-skill-pack/core";
import { buildProgram } from "../src/index.js";

function mockResponse(text: string): Response {
  return {
    ok: true,
    status: 200,
    headers: new Headers(),
    arrayBuffer: async () => new TextEncoder().encode(text).buffer,
  } as unknown as Response;
}

describe("create-theme CLI --from-url", () => {
  let outDir: string;

  beforeEach(() => {
    outDir = mkdtempSync(join(tmpdir(), "create-theme-test-"));
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    rmSync(outDir, { recursive: true, force: true });
    vi.unstubAllGlobals();
  });

  it("scaffolds a valid theme package from a brand URL, deriving the name from the hostname", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(mockResponse(`<link rel="stylesheet" href="/style.css">`))
      .mockResolvedValueOnce(
        mockResponse(
          ":root { --bg: #050505; --text: #f0f0f0; --accent: #ff8800; } body { font-family: Inter, sans-serif; } h1 { font-family: Poppins, sans-serif; }"
        )
      );

    const program = buildProgram();
    await program.parseAsync(
      ["node", "create-presentation-theme", "--from-url", "https://acme.com", "--output-dir", outDir],
      { from: "node" }
    );

    const themeJson = JSON.parse(readFileSync(join(outDir, "theme.json"), "utf-8")) as {
      name: string;
      roles: { bg: string };
    };
    expect(themeJson.name).toBe("acme-com");
    expect(themeJson.roles.bg.toLowerCase()).toBe("#050505");
    const validation = validateThemeJson(JSON.stringify(themeJson));
    expect(validation.valid).toBe(true);
  });
});
