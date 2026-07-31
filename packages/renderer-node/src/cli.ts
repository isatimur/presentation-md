#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, extname, join, resolve } from "node:path";
import { Command } from "commander";
import { renderDeck, renderDeckPptx, getBundledThemesDir } from "./index.js";
import { discoverInstalledThemes, markdownToDeck } from "@presentation-md/core";
import { pptxToDeck } from "@presentation-md/export/import";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk as Buffer);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

function readVersion(): string {
  const pkgPath = join(__dirname, "..", "package.json");
  try {
    const pkg = JSON.parse(require("fs").readFileSync(pkgPath, "utf-8")) as { version: string };
    return pkg.version;
  } catch {
    return "0.1.0";
  }
}

export function buildProgram(): Command {
  const program = new Command();

  program
    .name("presentation-md-render")
    .description("Render a deck JSON spec to a self-contained HTML slide deck.")
    .version(readVersion())
    .argument("[deck.json]", "path to deck JSON file (reads stdin if omitted)")
    .option("-o, --output <path>", "output file (default: deck.html, deck.pptx, or deck.json)")
    .option("-f, --format <fmt>", "output format: html | pptx", "html")
    .option("-t, --theme <name>", "theme name (overrides deck meta.theme)")
    .option("--from-pptx <path>", "import a .pptx file to deck JSON instead of rendering")
    .option("--from-md <path>", "import Marp/md-slides Markdown to deck JSON instead of rendering")
    .option("--assets-dir <dir>", "with --from-pptx, write images to this directory instead of data URIs")
    .option("--list-themes", "list available themes and exit")
    .option("--validate", "validate only, do not render")
    .action(async (inputPath: string | undefined, options: {
      output?: string;
      format: string;
      theme?: string;
      fromPptx?: string;
      fromMd?: string;
      assetsDir?: string;
      listThemes?: boolean;
      validate?: boolean;
    }) => {
      if (options.listThemes) {
        const themesDir = getBundledThemesDir();
        const themes = await discoverInstalledThemes({
          bundledThemesDir: themesDir,
          nodeModulesRoot: process.cwd(),
        });
        if (themes.length === 0) {
          process.stdout.write("No themes found.\n");
        } else {
          for (const t of themes) {
            process.stdout.write(`${t.name}@${t.version} [${t.source}]\n`);
          }
        }
        return;
      }

      if (options.fromPptx) {
        const pptxPath = resolve(process.cwd(), options.fromPptx);
        if (extname(pptxPath).toLowerCase() !== ".pptx") {
          process.stderr.write("Error: --from-pptx requires a .pptx file\n");
          process.exit(1);
        }
        try {
          const buf = await readFile(pptxPath);
          const { deck, warnings } = await pptxToDeck(buf, {
            theme: options.theme,
            assetsDir: options.assetsDir ? resolve(process.cwd(), options.assetsDir) : undefined,
          });
          const outputPath = resolve(process.cwd(), options.output ?? "deck.json");
          await writeFile(outputPath, JSON.stringify(deck, null, 2), "utf-8");
          for (const w of warnings) process.stderr.write(`  warning: ${w}\n`);
          const warnNote = warnings.length ? ` (${warnings.length} warnings)` : "";
          process.stdout.write(`Imported ${deck.slides.length} slides${warnNote} → ${outputPath}\n`);
        } catch (err) {
          process.stderr.write(`Error: ${(err as Error).message}\n`);
          process.exit(1);
        }
        return;
      }

      if (options.fromMd) {
        const mdPath = resolve(process.cwd(), options.fromMd);
        try {
          const markdown = await readFile(mdPath, "utf-8");
          const deck = markdownToDeck(markdown, { theme: options.theme });
          const outputPath = resolve(process.cwd(), options.output ?? "deck.json");
          await writeFile(outputPath, JSON.stringify(deck, null, 2), "utf-8");
          process.stdout.write(`Imported ${deck.slides.length} slides from Markdown → ${outputPath}\n`);
        } catch (err) {
          process.stderr.write(`Error: ${(err as Error).message}\n`);
          process.exit(1);
        }
        return;
      }

      let deckJson: string;
      if (inputPath) {
        const resolved = resolve(process.cwd(), inputPath);
        deckJson = await readFile(resolved, "utf-8");
      } else {
        deckJson = await readStdin();
      }

      if (options.validate) {
        const { validateDeckJson } = await import("./index.js");
        const result = validateDeckJson(deckJson);
        if (result.valid) {
          process.stdout.write("Valid deck JSON.\n");
          process.exit(0);
        } else {
          process.stderr.write(`Invalid deck JSON:\n${result.errors.map((e) => `  - ${e}`).join("\n")}\n`);
          process.exit(1);
        }
      }

      if (options.theme) {
        const parsed = JSON.parse(deckJson) as { meta?: { theme?: string } };
        parsed.meta = { ...parsed.meta, theme: options.theme };
        deckJson = JSON.stringify(parsed);
      }

      const format = options.format.toLowerCase();
      if (format !== "html" && format !== "pptx") {
        process.stderr.write(`Error: unknown format "${options.format}" (expected html | pptx)\n`);
        process.exit(1);
      }

      const defaultOutput = format === "pptx" ? "deck.pptx" : "deck.html";
      const outputPath = resolve(process.cwd(), options.output ?? defaultOutput);

      try {
        if (format === "pptx") {
          const buffer = await renderDeckPptx(deckJson, {
            onWarn: (msg) => process.stderr.write(`  warning: ${msg}\n`),
          });
          await writeFile(outputPath, buffer);
        } else {
          const html = await renderDeck(deckJson, {});
          await writeFile(outputPath, html, "utf-8");
        }
      } catch (err) {
        process.stderr.write(`Error: ${(err as Error).message}\n`);
        process.exit(1);
      }

      process.stdout.write(`Rendered → ${outputPath}\n`);
    });

  return program;
}

// Only run the CLI when this file is the direct entry point.
// Guarded so vitest can import buildProgram without triggering commander.
if (process.argv[1] && realpathSync(process.argv[1]) === __filename) {
  buildProgram()
    .parseAsync(process.argv)
    .catch((err: unknown) => {
      process.stderr.write(`Fatal: ${(err as Error).message}\n`);
      process.exit(1);
    });
}
