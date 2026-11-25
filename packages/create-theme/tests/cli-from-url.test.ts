import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateThemeJson } from "@presentation-md/core";

const lookupMock = vi.fn();
vi.mock("node:dns/promises", () => ({
  lookup: (...args: unknown[]) => lookupMock(...args),
}));

import { buildProgram } from "../src/index.js";
import { buildTemplate } from "../../export/test/fixtures/build-template.js";

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
    lookupMock.mockReset();
    lookupMock.mockResolvedValue([{ address: "93.184.216.34", family: 4 }]);
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
      ["node", "create-presentation-md-theme", "--from-url", "https://acme.com", "--output-dir", outDir],
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

const OFFICE_2023_ACCENTS = {
  accent1: "156082",
  accent2: "E97132",
  accent3: "196B24",
  accent4: "0F9ED5",
  accent5: "A02B93",
  accent6: "4EA72E",
};

describe("create-theme CLI --from-pptx", () => {
  let dir: string;
  let exitSpy: ReturnType<typeof vi.spyOn>;
  let stderr: string;
  let stdout: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), "create-theme-pptx-"));
    stderr = "";
    stdout = "";
    exitSpy = vi.spyOn(process, "exit").mockImplementation((() => undefined) as never);
    vi.spyOn(process.stderr, "write").mockImplementation((chunk: unknown) => {
      stderr += String(chunk);
      return true;
    });
    vi.spyOn(process.stdout, "write").mockImplementation((chunk: unknown) => {
      stdout += String(chunk);
      return true;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    rmSync(dir, { recursive: true, force: true });
  });

  async function run(...args: string[]): Promise<void> {
    await buildProgram().parseAsync(["node", "create-presentation-md-theme", ...args], { from: "node" });
  }

  it("writes a package whose theme.json passes validate-theme, named from the file", async () => {
    const file = join(dir, "Acme Brand.potx");
    writeFileSync(file, await buildTemplate());
    const out = join(dir, "out");
    await run("--from-pptx", file, "--output-dir", out);

    expect(exitSpy).not.toHaveBeenCalled();
    const raw = readFileSync(join(out, "theme.json"), "utf-8");
    const theme = JSON.parse(raw) as {
      name: string;
      description: string;
      roles: { accent: string };
      typography: { headingFont: string; googleFonts: string[] };
    };
    expect(theme.name).toBe("acme-brand");
    expect(theme.description).toBe("A theme generated from a PowerPoint template.");
    expect(theme.roles.accent).toBe("#e4572e");
    expect(theme.typography.headingFont).toBe("'Source Sans 3', 'Space Grotesk', system-ui, sans-serif");
    expect(theme.typography.googleFonts).toEqual(["Source+Sans+3:wght@400;700", "Lora:wght@400;500;600"]);
    expect(validateThemeJson(raw).valid).toBe(true);
    expect(stdout).toContain("source: template-scheme");
    expect(stdout).toContain("font: body Calibri (office; browsers without it use Lora)");
    expect(stdout).toContain("logo: none found on the slide master");
  });

  it("refuses an Office default without --allow-office-default and writes with it", async () => {
    const file = join(dir, "office.pptx");
    writeFileSync(file, await buildTemplate({ kind: "pptx", scheme: OFFICE_2023_ACCENTS }));
    const out = join(dir, "out");

    await run("--from-pptx", file, "--output-dir", out);
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(stderr).toContain(
      "office-default: The template uses Office 2023+ colours, not brand colours. Ask for the brand colours, try the company URL, or pass allowOfficeDefault."
    );
    expect(existsSync(join(out, "theme.json"))).toBe(false);

    exitSpy.mockClear();
    await run("--from-pptx", file, "--output-dir", out, "--allow-office-default");
    expect(exitSpy).not.toHaveBeenCalled();
    expect(existsSync(join(out, "theme.json"))).toBe(true);
  });

  it("refuses a file that is not .pptx or .potx", async () => {
    await run("--from-pptx", join(dir, "brand.docx"), "--output-dir", join(dir, "out"));
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(stderr).toContain("Error: --from-pptx must point to a .pptx or .potx file.");
  });

  it("allows only one source flag", async () => {
    await run("--from-pptx", join(dir, "a.potx"), "--from-css", join(dir, "a.css"));
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(stderr).toContain("Error: pass only one of --from-url, --from-css or --from-pptx.");
  });

  it("fails when no valid name comes from the file name", async () => {
    const file = join(dir, "2024 Brand.potx");
    writeFileSync(file, await buildTemplate());
    await run("--from-pptx", file, "--output-dir", join(dir, "out"));
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(stderr).toContain(
      "Could not derive a valid theme name from '2024 Brand.potx'. Pass 'name' explicitly."
    );
  });
});
