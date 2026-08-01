import { describe, it, expect, beforeAll, afterEach } from "vitest";
import { spawn } from "node:child_process";
import { access, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTheme } from "@presentation-md/core";
import { deckToPptxBuffer } from "@presentation-md/export";
import { buildProgram } from "../src/cli.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(__dirname, "..");
const cliPath = join(pkgRoot, "dist", "cli.js");

const MINIMAL_DECK = {
  type: "deck",
  meta: { title: "CLI Test", theme: "default-tech" },
  slides: [
    { layout: "title", heading: "Hello CLI" },
    { layout: "closing", heading: "Bye" },
  ],
};

async function runCli(
  args: string[],
  opts: { cwd?: string; stdin?: string } = {}
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolvePromise) => {
    const child = spawn(process.execPath, [cliPath, ...args], {
      cwd: opts.cwd ?? pkgRoot,
      env: process.env,
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d: Buffer) => {
      stdout += d.toString("utf-8");
    });
    child.stderr.on("data", (d: Buffer) => {
      stderr += d.toString("utf-8");
    });
    if (opts.stdin != null) {
      child.stdin.write(opts.stdin);
    }
    child.stdin.end();
    child.on("close", (code) => {
      resolvePromise({ code: code ?? 1, stdout, stderr });
    });
  });
}

describe("buildProgram", () => {
  it("registers the full CLI flag surface", () => {
    const longs = buildProgram().options.map((o) => o.long);
    expect(longs).toEqual(
      expect.arrayContaining([
        "--output",
        "--format",
        "--theme",
        "--from-pptx",
        "--from-md",
        "--assets-dir",
        "--list-themes",
        "--preview-compare",
        "--preview-dir",
        "--preview-mode",
        "--validate",
      ])
    );
  });
});

describe("presentation-md-render CLI flags", () => {
  const dirs: string[] = [];

  beforeAll(async () => {
    try {
      await access(cliPath);
    } catch {
      throw new Error(
        `Missing ${cliPath}. Run \`pnpm --filter @presentation-md/render build\` before tests.`
      );
    }
  });

  afterEach(async () => {
    for (const dir of dirs.splice(0)) {
      await rm(dir, { recursive: true, force: true });
    }
  });

  async function tempDir(): Promise<string> {
    const dir = await mkdtemp(join(tmpdir(), "pmd-render-cli-"));
    dirs.push(dir);
    return dir;
  }

  it("--list-themes prints bundled themes", async () => {
    const { code, stdout } = await runCli(["--list-themes"]);
    expect(code).toBe(0);
    expect(stdout).toMatch(/default-tech@/);
    expect(stdout).toMatch(/\[bundled\]/);
  });

  it("--preview-compare writes multi-layout craft previews for up to 3 themes", async () => {
    const dir = await tempDir();
    const previewDir = join(dir, "previews");
    const { code, stdout, stderr } = await runCli(
      [
        "--preview-compare",
        "default-tech,claude",
        "--preview-dir",
        previewDir,
        "--preview-mode",
        "layouts",
      ],
      { cwd: dir }
    );
    expect(stderr).not.toMatch(/^Error:/);
    expect(code).toBe(0);
    expect(stdout).toMatch(/Preview compare \(layouts\): 2 theme/);
    const html = await readFile(join(previewDir, "default-tech-layouts-preview.html"), "utf-8");
    expect(html).toContain("<!doctype html>");
    expect(html).toMatch(/feature-grid|comparison/i);
    await access(join(previewDir, "claude-layouts-preview.html"));
  });

  it("--validate accepts valid deck JSON", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "deck.json");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));
    const { code, stdout } = await runCli(["--validate", deckPath], { cwd: dir });
    expect(code).toBe(0);
    expect(stdout).toMatch(/Valid deck JSON/i);
  });

  it("--validate rejects invalid deck JSON", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "bad.json");
    await writeFile(
      deckPath,
      JSON.stringify({ type: "deck", slides: [{ layout: "unknown-layout" }] })
    );
    const { code, stderr } = await runCli(["--validate", deckPath], { cwd: dir });
    expect(code).toBe(1);
    expect(stderr).toMatch(/Invalid deck JSON/i);
  });

  it("renders HTML with -o and --theme override", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "deck.json");
    const outPath = join(dir, "out.html");
    await writeFile(
      deckPath,
      JSON.stringify({
        ...MINIMAL_DECK,
        meta: { title: "CLI Test", theme: "default-tech" },
      })
    );
    const { code, stdout, stderr } = await runCli(
      [deckPath, "-o", outPath, "--theme", "claude"],
      { cwd: dir }
    );
    expect(stderr).toBe("");
    expect(code).toBe(0);
    expect(stdout).toMatch(/Rendered →/);
    const html = await readFile(outPath, "utf-8");
    expect(html).toMatch(/<!doctype html>/i);
    expect(html).toContain("Hello CLI");
    expect(html).toContain('"theme":"claude"');
  });

  it("rejects unknown --format", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "deck.json");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));
    const { code, stderr } = await runCli([deckPath, "--format", "docx"], { cwd: dir });
    expect(code).toBe(1);
    expect(stderr).toMatch(/unknown format/i);
  });

  it("--format pdf writes a PDF file", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "deck.json");
    const outPath = join(dir, "deck.pdf");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));
    const { code, stdout, stderr } = await runCli(
      [deckPath, "--format", "pdf", "-o", outPath],
      { cwd: dir }
    );
    expect(stderr).not.toMatch(/unknown format/i);
    expect(code).toBe(0);
    expect(stdout).toMatch(/Rendered →/);
    const buf = await readFile(outPath);
    expect(buf.byteLength).toBeGreaterThan(500);
    expect(buf.subarray(0, 4).toString("utf-8")).toBe("%PDF");
  }, 120_000);

  it("--format pptx writes a PowerPoint file", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "deck.json");
    const outPath = join(dir, "deck.pptx");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));
    const { code, stdout } = await runCli(
      [deckPath, "--format", "pptx", "-o", outPath],
      { cwd: dir }
    );
    expect(code).toBe(0);
    expect(stdout).toMatch(/Rendered →/);
    const buf = await readFile(outPath);
    expect(buf.byteLength).toBeGreaterThan(1000);
    // ZIP/OOXML magic
    expect(buf.subarray(0, 2).toString("utf-8")).toBe("PK");
  });

  it("--from-md imports Markdown to deck JSON", async () => {
    const dir = await tempDir();
    const mdPath = join(dir, "deck.md");
    const outPath = join(dir, "from-md.json");
    await writeFile(
      mdPath,
      `---\ntitle: MD Import\n---\n\n# Hello MD\n\nLead copy.\n\n---\n\n## Closing\n\nThanks\n`
    );
    const { code, stdout } = await runCli(
      ["--from-md", mdPath, "-o", outPath, "--theme", "claude"],
      { cwd: dir }
    );
    expect(code).toBe(0);
    expect(stdout).toMatch(/Imported \d+ slides from Markdown/);
    const deck = JSON.parse(await readFile(outPath, "utf-8")) as {
      meta?: { theme?: string };
      slides: unknown[];
    };
    expect(deck.slides.length).toBeGreaterThanOrEqual(1);
    expect(deck.meta?.theme).toBe("claude");
  });

  it("--from-pptx rejects non-pptx paths", async () => {
    const dir = await tempDir();
    const txt = join(dir, "notes.txt");
    await writeFile(txt, "not a pptx");
    const { code, stderr } = await runCli(["--from-pptx", txt], { cwd: dir });
    expect(code).toBe(1);
    expect(stderr).toMatch(/requires a \.pptx file/i);
  });

  it("--from-pptx imports PowerPoint to deck JSON", async () => {
    const dir = await tempDir();
    const themesDir = resolve(pkgRoot, "../core/themes");
    const theme = await loadTheme("default-tech", { themesDir });
    const buf = await deckToPptxBuffer(
      {
        type: "deck",
        meta: { title: "Imported", theme: "default-tech" },
        slides: [
          { layout: "title", heading: "From PPTX CLI", lead: "Round-trip" },
          { layout: "closing", heading: "Done" },
        ],
      },
      theme
    );
    const pptxPath = join(dir, "in.pptx");
    const outPath = join(dir, "from-pptx.json");
    await writeFile(pptxPath, buf);

    const { code, stdout } = await runCli(
      ["--from-pptx", pptxPath, "-o", outPath, "--theme", "claude"],
      { cwd: dir }
    );
    expect(code).toBe(0);
    expect(stdout).toMatch(/Imported 2 slides/);
    const deck = JSON.parse(await readFile(outPath, "utf-8")) as {
      meta?: { theme?: string };
      slides: Array<{ heading?: string }>;
    };
    expect(deck.meta?.theme).toBe("claude");
    expect(deck.slides[0]?.heading).toBe("From PPTX CLI");
  });

  it("--from-pptx --assets-dir writes images to disk instead of data URIs", async () => {
    const dir = await tempDir();
    const themesDir = resolve(pkgRoot, "../core/themes");
    const theme = await loadTheme("default-tech", { themesDir });
    const tinyPng =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    const buf = await deckToPptxBuffer(
      {
        type: "deck",
        meta: { title: "Assets CLI", theme: "default-tech" },
        slides: [
          {
            layout: "image-hero",
            heading: "Hero with asset",
            lead: "Extract me",
            image: tinyPng,
            imageAlt: "pixel",
          },
        ],
      },
      theme
    );
    const pptxPath = join(dir, "with-image.pptx");
    const outPath = join(dir, "from-pptx-assets.json");
    const assetsDir = join(dir, "assets");
    await writeFile(pptxPath, buf);

    const { code, stdout, stderr } = await runCli(
      ["--from-pptx", pptxPath, "-o", outPath, "--assets-dir", assetsDir],
      { cwd: dir }
    );
    expect(stderr).not.toMatch(/^Error:/);
    expect(code).toBe(0);
    expect(stdout).toMatch(/Imported 1 slides/);

    const deck = JSON.parse(await readFile(outPath, "utf-8")) as {
      slides: Array<{ image?: string }>;
    };
    const image = deck.slides[0]?.image;
    expect(typeof image).toBe("string");
    expect(image!.startsWith("data:")).toBe(false);
    expect(image).toMatch(/\.png$/i);

    const written = await readFile(resolve(dir, image!));
    expect(written.byteLength).toBeGreaterThan(0);
  });

  it("reads deck JSON from stdin when no input path is given", async () => {
    const dir = await tempDir();
    const outPath = join(dir, "stdin.html");
    const { code, stdout } = await runCli(["-o", outPath], {
      cwd: dir,
      stdin: JSON.stringify(MINIMAL_DECK),
    });
    expect(code).toBe(0);
    expect(stdout).toMatch(/Rendered →/);
    const html = await readFile(outPath, "utf-8");
    expect(html).toContain("Hello CLI");
  });
});
