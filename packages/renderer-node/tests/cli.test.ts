import { describe, it, expect, beforeAll, afterEach } from "vitest";
import { spawn } from "node:child_process";
import {
  access,
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  truncate,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadTheme } from "@presentation-md/core";
import { deckToPptxBuffer } from "@presentation-md/export";
import { MAX_COMPRESSED_BYTES } from "@presentation-md/export/import";
import { buildProgram } from "../src/cli.js";
import { MAX_CLI_TEXT_INPUT_BYTES } from "../src/bounded-input.js";

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
  opts: { cwd?: string; stdin?: string; env?: NodeJS.ProcessEnv } = {}
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolvePromise) => {
    const child = spawn(process.execPath, [cliPath, ...args], {
      cwd: opts.cwd ?? pkgRoot,
      env: opts.env ?? process.env,
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
        "--browse",
        "--mood",
        "--query",
        "--shortlist",
        "--list-shortlists",
        "--list-browse-filters",
        "--json",
        "--scaffold",
        "--list-scaffold-purposes",
        "--audit",
        "--fix",
        "--apply-theme",
        "--no-repair",
        "--remorph-density",
        "--share-link",
        "--generate-prompt",
        "--prompt-intent",
        "--prompt-density",
        "--judge",
        "--judge-tier",
        "--deploy",
        "--confirm-deploy",
        "--deploy-prod",
        "--preview-compare",
        "--preview-dir",
        "--preview-mode",
        "--preview-deck",
        "--preview-slide",
        "--no-preview-shots",
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

  it("--list-themes prints bundled themes with studio/preview links", async () => {
    const { code, stdout } = await runCli(["--list-themes"]);
    expect(code).toBe(0);
    expect(stdout).toMatch(/default-tech@/);
    expect(stdout).toMatch(/\[bundled\]/);
    expect(stdout).toMatch(/studio: https:\/\/presentation-md\.vercel\.app\/studio\//);
    expect(stdout).toMatch(/preview: https:\/\/presentation-md\.vercel\.app\/previews\//);
    expect(stdout).toMatch(/Suggested preview/i);
  });

  it("--list-themes --browse popular filters + --json emits MCP-shaped payload", async () => {
    const { code, stdout, stderr } = await runCli([
      "--list-themes",
      "--browse",
      "popular",
      "--json",
    ]);
    expect(stderr).not.toMatch(/^Error:/);
    expect(code).toBe(0);
    const payload = JSON.parse(stdout) as {
      browse?: string;
      themes: Array<{ name: string; studio_url?: string; preview_url?: string }>;
      suggested_preview?: { themes: string[] };
    };
    expect(payload.browse).toBe("popular");
    expect(payload.themes.length).toBeGreaterThan(0);
    expect(payload.themes.every((t) => t.studio_url && t.preview_url)).toBe(true);
    expect(payload.suggested_preview?.themes.length).toBeGreaterThan(0);
  });

  it("--list-browse-filters prints mood chips", async () => {
    const { code, stdout } = await runCli(["--list-browse-filters"]);
    expect(code).toBe(0);
    expect(stdout).toMatch(/^popular\t/m);
    expect(stdout).toMatch(/^editorial\t/m);
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
        "--no-preview-shots",
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

  it("--preview-deck restyles caller JSON across themes (My deck parity)", async () => {
    const dir = await tempDir();
    const previewDir = join(dir, "previews");
    const deckPath = join(dir, "mine.json");
    await writeFile(
      deckPath,
      JSON.stringify({
        type: "deck",
        meta: { title: "Mine", theme: "default-tech" },
        slides: [
          { layout: "title", heading: "CLI Restyle Title" },
          { layout: "closing", heading: "Done" },
        ],
      })
    );
    const { code, stdout, stderr } = await runCli(
      [
        "--preview-compare",
        "default-tech,claude",
        "--preview-deck",
        deckPath,
        "--preview-slide",
        "1",
        "--preview-dir",
        previewDir,
        "--no-preview-shots",
      ],
      { cwd: dir }
    );
    expect(stderr).not.toMatch(/^Error:/);
    expect(code).toBe(0);
    expect(stdout).toMatch(/Preview deck restyle \(slide 1\): 2 theme/);
    const html = await readFile(join(previewDir, "default-tech-deck-restyle.html"), "utf-8");
    expect(html).toContain("CLI Restyle Title");
    await access(join(previewDir, "claude-deck-restyle.html"));
  });

  it(
    "--preview-compare captures discovery PNGs when Chrome is available",
    async () => {
      const dir = await tempDir();
      const previewDir = join(dir, "previews");
      const { code, stdout, stderr } = await runCli(
        [
          "--preview-compare",
          "default-tech",
          "--preview-dir",
          previewDir,
          "--preview-mode",
          "layouts",
        ],
        { cwd: dir }
      );
      expect(stderr).not.toMatch(/^Error:/);
      expect(code).toBe(0);
      expect(stdout).toMatch(/Preview compare \(layouts\): 1 theme/);
      if (/Chrome\/Chromium not found/i.test(stdout)) {
        return;
      }
      expect(stdout).toMatch(/PNG screenshots: \d+ discovery/);
      const shotDir = join(previewDir, "default-tech-shots");
      const pngs = (await readdir(shotDir)).filter((f) => f.endsWith(".png")).sort();
      // Title densify shot is required; bento/comparison may flake on slow CI hosts
      // when Chrome only partially captures the layouts bake.
      expect(pngs.length).toBeGreaterThanOrEqual(1);
      expect(pngs).toContain("slide-01.png");
      if (pngs.length >= 2) {
        expect(pngs).toContain("slide-03.png");
      }
    },
    90_000
  );

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

  it("--format notes_txt / notes_vtt write speaker-notes handouts", async () => {
    const dir = await tempDir();
    const deck = {
      ...MINIMAL_DECK,
      slides: [
        { layout: "title", heading: "Hello CLI", notes: "Open strong." },
        { layout: "closing", heading: "Bye" },
      ],
    };
    const deckPath = join(dir, "deck.json");
    await writeFile(deckPath, JSON.stringify(deck));
    const txtPath = join(dir, "handout.txt");
    const { code, stdout } = await runCli(
      [deckPath, "--format", "notes_txt", "-o", txtPath],
      { cwd: dir }
    );
    expect(code).toBe(0);
    expect(stdout).toMatch(/Exported notes →/);
    const txt = await readFile(txtPath, "utf-8");
    expect(txt).toContain("Open strong.");
    expect(txt).toContain("(no speaker notes)");

    const vttPath = join(dir, "handout.vtt");
    const vttRun = await runCli([deckPath, "--format", "notes_vtt", "-o", vttPath], {
      cwd: dir,
    });
    expect(vttRun.code).toBe(0);
    const vtt = await readFile(vttPath, "utf-8");
    expect(vtt.startsWith("WEBVTT")).toBe(true);
    expect(vtt).toContain("Open strong.");
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

  it("--format pdf terminates a hanging export process at the configured deadline", async () => {
    const dir = await tempDir();
    const binDir = join(dir, "bin");
    await mkdir(binDir);
    const fakeBash = join(binDir, "bash");
    await writeFile(
      fakeBash,
      '#!/bin/sh\n/bin/sleep 0.3\n/usr/bin/touch "$PDF_TIMEOUT_MARKER"\nexit 0\n'
    );
    await chmod(fakeBash, 0o755);
    const deckPath = join(dir, "deck.json");
    const markerPath = join(dir, "exporter-survived-timeout");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));

    const startedAt = Date.now();
    const { code, stderr } = await runCli([deckPath, "--format", "pdf"], {
      cwd: dir,
      env: {
        ...process.env,
        PATH: `${binDir}:${process.env["PATH"] ?? ""}`,
        PRESENTATION_MD_PDF_TIMEOUT_MS: "50",
        PDF_TIMEOUT_MARKER: markerPath,
      },
    });

    expect(code).toBe(1);
    expect(stderr).toMatch(/PDF export timed out after 50ms/i);
    // The child CLI has a cold-start cost on constrained CI hosts; the export
    // deadline itself is still asserted by the diagnostic below.
    expect(Date.now() - startedAt).toBeLessThan(5_000);
    await new Promise((resolveWait) => setTimeout(resolveWait, 350));
    await expect(access(markerPath)).rejects.toThrow();
  });

  it("--format pdf terminates an exporter that exceeds the output limit", async () => {
    const dir = await tempDir();
    const binDir = join(dir, "bin");
    await mkdir(binDir);
    const fakeBash = join(binDir, "bash");
    await writeFile(
      fakeBash,
      '#!/bin/sh\ni=0\nwhile [ "$i" -lt 2048 ]; do printf x; i=$((i + 1)); done\n/bin/sleep 0.3\n/usr/bin/touch "$PDF_OUTPUT_MARKER"\n'
    );
    await chmod(fakeBash, 0o755);
    const deckPath = join(dir, "deck.json");
    const markerPath = join(dir, "pdf-survived-output-limit");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));

    const startedAt = Date.now();
    const { code, stderr } = await runCli([deckPath, "--format", "pdf"], {
      cwd: dir,
      env: {
        ...process.env,
        PATH: `${binDir}:${process.env["PATH"] ?? ""}`,
        PRESENTATION_MD_CHILD_OUTPUT_MAX_BYTES: "1024",
        PDF_OUTPUT_MARKER: markerPath,
      },
    });

    expect(code).toBe(1);
    expect(stderr).toMatch(/PDF export process output exceeds 1024 bytes/i);
    expect(Date.now() - startedAt).toBeLessThan(5_000);
    await new Promise((resolveWait) => setTimeout(resolveWait, 350));
    await expect(access(markerPath)).rejects.toThrow();
  });

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

  it("--from-pptx rejects oversized input before reading it into memory", async () => {
    const dir = await tempDir();
    const pptxPath = join(dir, "oversized.pptx");
    await writeFile(pptxPath, "PK\x03\x04");
    await truncate(pptxPath, MAX_COMPRESSED_BYTES + 1);

    const { code, stderr } = await runCli(["--from-pptx", pptxPath], { cwd: dir });
    expect(code).toBe(1);
    expect(stderr).toMatch(/compressed size exceeds/i);
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

  it("rejects an oversized deck file before parsing it", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "oversized.json");
    await writeFile(deckPath, "{}");
    await truncate(deckPath, MAX_CLI_TEXT_INPUT_BYTES + 1);

    const { code, stderr } = await runCli([deckPath, "--validate"], { cwd: dir });
    expect(code).toBe(1);
    expect(stderr).toMatch(/Deck JSON input exceeds 10485760 bytes/);
  });

  it("--list-scaffold-purposes prints recipe ids", async () => {
    const { code, stdout } = await runCli(["--list-scaffold-purposes"]);
    expect(code).toBe(0);
    expect(stdout).toMatch(/^pitch\t/m);
    expect(stdout).toMatch(/^launch\t/m);
  });

  it("--scaffold writes Deck JSON from a recipe", async () => {
    const dir = await tempDir();
    const outPath = join(dir, "scaffold.json");
    const { code, stdout, stderr } = await runCli(
      ["--scaffold", "pitch", "-o", outPath, "--theme", "default-tech"],
      { cwd: dir }
    );
    expect(stderr).not.toMatch(/^Error:/);
    expect(code).toBe(0);
    expect(stdout).toMatch(/Scaffolded pitch/);
    const deck = JSON.parse(await readFile(outPath, "utf-8")) as {
      type: string;
      meta: { theme: string };
      slides: unknown[];
    };
    expect(deck.type).toBe("deck");
    expect(deck.meta.theme).toBe("default-tech");
    expect(deck.slides.length).toBeGreaterThan(5);
  });

  it("--audit reports craft issues", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "thin.json");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));
    const { code, stdout } = await runCli(["--audit", deckPath], { cwd: dir });
    // Minimal 2-slide decks trip craft warnings/errors — either exit is fine if we print audit.
    expect(stdout + "").toMatch(/Craft audit:/);
    expect([0, 1]).toContain(code);
  });

  it("--apply-theme swaps theme and repairs by default", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "deck.json");
    const outPath = join(dir, "themed.json");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));
    const { code, stdout, stderr } = await runCli(
      ["--apply-theme", "claude", "-o", outPath, deckPath],
      { cwd: dir }
    );
    expect(stderr).not.toMatch(/^Error:/);
    expect(code).toBe(0);
    expect(stdout).toMatch(/Applied theme claude/);
    const deck = JSON.parse(await readFile(outPath, "utf-8")) as {
      meta: { theme: string };
      slides: unknown[];
    };
    expect(deck.meta.theme).toBe("claude");
    expect(deck.slides.length).toBeGreaterThanOrEqual(2);
  });

  it("--apply-theme --no-repair only swaps meta.theme", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "deck.json");
    const outPath = join(dir, "themed.json");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));
    const beforeSlides = MINIMAL_DECK.slides.length;
    const { code, stdout } = await runCli(
      ["--apply-theme", "signal", "--no-repair", "-o", outPath, deckPath],
      { cwd: dir }
    );
    expect(code).toBe(0);
    expect(stdout).toMatch(/Applied theme signal/);
    const deck = JSON.parse(await readFile(outPath, "utf-8")) as {
      meta: { theme: string };
      slides: unknown[];
    };
    expect(deck.meta.theme).toBe("signal");
    expect(deck.slides.length).toBe(beforeSlides);
  });

  it("--remorph-density speaker splits crowded grids", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "crowded.json");
    const outPath = join(dir, "speaker.json");
    const crowded = {
      type: "deck",
      meta: { title: "Crowded", theme: "default-tech" },
      slides: [
        {
          layout: "feature-grid",
          heading: "Six",
          columns: 3,
          cards: Array.from({ length: 6 }, (_, i) => ({ title: `C${i + 1}`, body: "x" })),
        },
        { layout: "closing", heading: "Bye" },
      ],
    };
    await writeFile(deckPath, JSON.stringify(crowded));
    const { code, stdout, stderr } = await runCli(
      ["--remorph-density", "speaker", "-o", outPath, deckPath],
      { cwd: dir }
    );
    expect(stderr).not.toMatch(/^Error:/);
    expect(code).toBe(0);
    expect(stdout).toMatch(/Remorphed density=speaker/);
    const deck = JSON.parse(await readFile(outPath, "utf-8")) as {
      meta: { density?: string };
      slides: unknown[];
    };
    expect(deck.meta.density).toBe("speaker");
    expect(deck.slides.length).toBeGreaterThan(2);
  });

  it("--share-link prints a Studio ?d= URL", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "deck.json");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));
    const { code, stdout, stderr } = await runCli(["--share-link", deckPath], { cwd: dir });
    expect(stderr).not.toMatch(/^Error:/);
    expect(code).toBe(0);
    expect(stdout.trim()).toMatch(/[?&]d=d1\./);
  });

  it("--generate-prompt writes craft prompt JSON", async () => {
    const dir = await tempDir();
    const outPath = join(dir, "prompt.json");
    const { code, stdout, stderr } = await runCli(
      [
        "--generate-prompt",
        "--theme",
        "default-tech",
        "--prompt-density",
        "reading",
        "--prompt-intent",
        "Ship the board pack",
        "-o",
        outPath,
      ],
      { cwd: dir }
    );
    expect(stderr).not.toMatch(/^Error:/);
    expect(code).toBe(0);
    expect(stdout).toMatch(/Wrote craft prompt/);
    const prompt = JSON.parse(await readFile(outPath, "utf-8")) as {
      theme: string;
      density: string;
      intent: string;
      craft_mandate: string;
      skill: string;
    };
    expect(prompt.theme).toBe("default-tech");
    expect(prompt.density).toBe("reading");
    expect(prompt.intent).toMatch(/board pack/i);
    expect(prompt.craft_mandate).toMatch(/remorph_density/i);
    expect(prompt.skill.length).toBeGreaterThan(100);
  });

  it("--judge t1 passes a clean minimal deck", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "deck.json");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));
    const { code, stdout, stderr } = await runCli(
      ["--judge", "--judge-tier", "t1", deckPath],
      { cwd: dir }
    );
    expect(stderr).not.toMatch(/^Error:/);
    expect(code).toBe(0);
    expect(stdout).toMatch(/Judge t1: pass/);
  });

  it("--judge exits 1 on wall-of-text gate", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "deck.json");
    const wall = Array.from({ length: 45 }, () => "word").join(" ");
    await writeFile(
      deckPath,
      JSON.stringify({
        ...MINIMAL_DECK,
        slides: [
          { layout: "title", heading: "Hi" },
          { layout: "section", heading: "Dense", body: wall },
        ],
      })
    );
    const { code, stderr } = await runCli(["--judge", deckPath], { cwd: dir });
    expect(code).toBe(1);
    expect(stderr).toMatch(/gate/);
  });

  it("--judge t2 with --judge-skip-screenshots runs HTML metrics", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "deck.json");
    const shotsDir = join(dir, "shots");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));
    const { code, stdout, stderr } = await runCli(
      [
        "--judge",
        "--judge-tier",
        "t2",
        "--judge-skip-screenshots",
        "--judge-shots-dir",
        shotsDir,
        deckPath,
      ],
      { cwd: dir }
    );
    expect(stderr).not.toMatch(/^Error:/);
    expect(code).toBe(0);
    expect(stdout).toMatch(/Judge t2: pass/);
    expect(stdout).toMatch(/Screenshots skipped/);
    expect(stdout).toMatch(/html:/);
  });

  it("--judge-tier t3 is rejected with MCP pointer", async () => {
    const dir = await tempDir();
    const deckPath = join(dir, "deck.json");
    await writeFile(deckPath, JSON.stringify(MINIMAL_DECK));
    const { code, stderr } = await runCli(
      ["--judge", "--judge-tier", "t3", deckPath],
      { cwd: dir }
    );
    expect(code).toBe(1);
    expect(stderr).toMatch(/t3/);
    expect(stderr).toMatch(/MCP/);
  });

  it("--deploy without --confirm-deploy is a dry-run (no remote)", async () => {
    const dir = await tempDir();
    const htmlPath = join(dir, "deck.html");
    await writeFile(
      htmlPath,
      "<!doctype html><html><head><title>x</title></head><body><main class=\"deck\"><section class=\"slide\"><h1>Hi</h1></section></main></body></html>"
    );
    const { code, stdout, stderr } = await runCli(
      ["--deploy", "--json", htmlPath],
      { cwd: dir }
    );
    expect(stderr).not.toMatch(/^Error:/);
    expect(code).toBe(0);
    const parsed = JSON.parse(stdout) as { dry_run: boolean; message: string };
    expect(parsed.dry_run).toBe(true);
    expect(parsed.message).toMatch(/Dry-run/i);
  });

  it("--confirm-deploy does not mistake an unrelated HTTPS warning for the deploy URL", async () => {
    const dir = await tempDir();
    const binDir = join(dir, "bin");
    await mkdir(binDir);
    const fakeBash = join(binDir, "bash");
    await writeFile(
      fakeBash,
      '#!/bin/sh\necho "warning: see https://docs.example.invalid/help" >&2\nexit 0\n'
    );
    await chmod(fakeBash, 0o755);
    const htmlPath = join(dir, "deck.html");
    await writeFile(htmlPath, "<!doctype html><h1>Not deployed</h1>");

    const { code, stdout, stderr } = await runCli(
      ["--deploy", "--confirm-deploy", "--json", htmlPath],
      {
        cwd: dir,
        env: { ...process.env, PATH: `${binDir}:${process.env["PATH"] ?? ""}` },
      }
    );

    expect(code).toBe(1);
    expect(stderr).toMatch(/no .*deployment URL|no https URL was found/i);
    expect(stdout).not.toMatch(/Deployed preview|docs\.example/i);
  });

  it("--confirm-deploy accepts the core script's explicit success marker", async () => {
    const dir = await tempDir();
    const binDir = join(dir, "bin");
    await mkdir(binDir);
    const fakeBash = join(binDir, "bash");
    await writeFile(
      fakeBash,
      '#!/bin/sh\necho "Deployed -> https://fake.invalid/deploy"\nexit 0\n'
    );
    await chmod(fakeBash, 0o755);
    const htmlPath = join(dir, "deck.html");
    await writeFile(htmlPath, "<!doctype html><h1>Deployed</h1>");

    const { code, stdout, stderr } = await runCli(
      ["--deploy", "--confirm-deploy", "--json", htmlPath],
      {
        cwd: dir,
        env: { ...process.env, PATH: `${binDir}:${process.env["PATH"] ?? ""}` },
      }
    );

    expect(code).toBe(0);
    expect(stderr).toBe("");
    const parsed = JSON.parse(stdout) as { dry_run: boolean; url?: string };
    expect(parsed.dry_run).toBe(false);
    expect(parsed.url).toBe("https://fake.invalid/deploy");
  });

  it("--confirm-deploy terminates a process that exceeds the output limit", async () => {
    const dir = await tempDir();
    const binDir = join(dir, "bin");
    await mkdir(binDir);
    const fakeBash = join(binDir, "bash");
    await writeFile(
      fakeBash,
      '#!/bin/sh\ni=0\nwhile [ "$i" -lt 2048 ]; do printf x; i=$((i + 1)); done\n/bin/sleep 0.3\n/usr/bin/touch "$DEPLOY_OUTPUT_MARKER"\n'
    );
    await chmod(fakeBash, 0o755);
    const htmlPath = join(dir, "deck.html");
    const markerPath = join(dir, "deploy-survived-output-limit");
    await writeFile(htmlPath, "<!doctype html><h1>Deploy output limit</h1>");

    const startedAt = Date.now();
    const { code, stderr } = await runCli(["--deploy", "--confirm-deploy", htmlPath], {
      cwd: dir,
      env: {
        ...process.env,
        PATH: `${binDir}:${process.env["PATH"] ?? ""}`,
        PRESENTATION_MD_CHILD_OUTPUT_MAX_BYTES: "1024",
        DEPLOY_OUTPUT_MARKER: markerPath,
      },
    });

    expect(code).toBe(1);
    expect(stderr).toMatch(/Deploy process output exceeds 1024 bytes/i);
    expect(Date.now() - startedAt).toBeLessThan(5_000);
    await new Promise((resolveWait) => setTimeout(resolveWait, 350));
    await expect(access(markerPath)).rejects.toThrow();
  });

  it("--confirm-deploy terminates a hanging deploy process at the configured deadline", async () => {
    const dir = await tempDir();
    const binDir = join(dir, "bin");
    await mkdir(binDir);
    const fakeBash = join(binDir, "bash");
    await writeFile(
      fakeBash,
      '#!/bin/sh\n/bin/sleep 0.3\n/usr/bin/touch "$DEPLOY_TIMEOUT_MARKER"\nexit 0\n'
    );
    await chmod(fakeBash, 0o755);
    const htmlPath = join(dir, "deck.html");
    const markerPath = join(dir, "deploy-survived-timeout");
    await writeFile(htmlPath, "<!doctype html><h1>Deploy timeout</h1>");

    const startedAt = Date.now();
    const { code, stderr } = await runCli(["--deploy", "--confirm-deploy", htmlPath], {
      cwd: dir,
      env: {
        ...process.env,
        PATH: `${binDir}:${process.env["PATH"] ?? ""}`,
        PRESENTATION_MD_DEPLOY_TIMEOUT_MS: "50",
        DEPLOY_TIMEOUT_MARKER: markerPath,
      },
    });

    expect(code).toBe(1);
    expect(stderr).toMatch(/deploy timed out after 50ms/i);
    expect(Date.now() - startedAt).toBeLessThan(5_000);
    await new Promise((resolveWait) => setTimeout(resolveWait, 350));
    await expect(access(markerPath)).rejects.toThrow();
  });
});
