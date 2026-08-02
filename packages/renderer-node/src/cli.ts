#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, extname, join, resolve } from "node:path";
import { Command } from "commander";
import { renderDeck, renderDeckPptx, renderDeckPdf, getBundledThemesDir } from "./index.js";
import { discoverInstalledThemes, markdownToDeck, deckToMarkdown, notesHandoutTxt, notesHandoutVtt, scaffoldDeck, listScaffoldPurposes, resolveScaffoldPurpose, auditCraft, repairCraft, remorphDensity, studioShareLink, isShareDeck, buildGenerateDeckPrompt, judgeDeckJson, validateDeckJson, type ScaffoldPurpose, type DensityMode } from "@presentation-md/core";
import { pptxToDeck } from "@presentation-md/export/import";
import {
  buildLayoutsPreviewDeck,
  buildTitlePreviewDeck,
  discoverySlideIndices,
  layoutsPreviewLayoutNames,
  layoutsPreviewSlideCount,
  parsePreviewCompareThemes,
  DISCOVERY_SHOT_H,
  DISCOVERY_SHOT_W,
  type PreviewMode,
} from "./theme-preview-deck.js";
import { screenshotSlides } from "./screenshot-slides.js";

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
    .option("-f, --format <fmt>", "output format: html | pptx | pdf | md | notes_txt | notes_vtt", "html")
    .option("-t, --theme <name>", "theme name (overrides deck meta.theme)")
    .option("--from-pptx <path>", "import a .pptx file to deck JSON instead of rendering")
    .option("--from-md <path>", "import Marp/md-slides Markdown to deck JSON instead of rendering")
    .option("--assets-dir <dir>", "with --from-pptx, write images to this directory instead of data URIs")
    .option("--list-themes", "list available themes and exit")
    .option(
      "--scaffold <purpose>",
      "scaffold Deck JSON from a layout recipe (pitch / launch / wrap / …) and write JSON (MCP scaffold_deck parity)"
    )
    .option("--list-scaffold-purposes", "list scaffold recipe ids and exit")
    .option(
      "--audit",
      "run craft gates on deck JSON (schema-valid ≠ shippable); exit 1 on craft errors"
    )
    .option(
      "--fix",
      "with --audit, apply repairCraft (safe fixes + beat inserts) and write repaired JSON"
    )
    .option(
      "--apply-theme <name>",
      "swap meta.theme and write JSON (default: also repairCraft — MCP apply_theme / Studio Use parity)"
    )
    .option(
      "--no-repair",
      "with --apply-theme, only swap meta.theme (skip repairCraft)"
    )
    .option(
      "--remorph-density <mode>",
      "structural density remorph (speaker|reading) and write JSON — non-LLM; MCP audit_deck remorph_density parity"
    )
    .option(
      "--share-link",
      "print a Studio ?d= share URL for the deck (MCP share_deck_link parity) and exit"
    )
    .option(
      "--generate-prompt",
      "write a one-shot craft system prompt JSON (MCP generate_deck_prompt parity) and exit"
    )
    .option(
      "--prompt-intent <text>",
      "with --generate-prompt, what the deck should argue or show"
    )
    .option(
      "--prompt-density <mode>",
      "with --generate-prompt, speaker|reading density lock (default speaker)"
    )
    .option(
      "--preview-compare <themes>",
      "comma-separated themes (1–3); write craft preview HTML and exit (pick-3 discovery)"
    )
    .option(
      "--preview-dir <dir>",
      "output directory for --preview-compare (default: .presentation-md/theme-previews)"
    )
    .option(
      "--preview-mode <mode>",
      "title | layouts | deck for --preview-compare (default: layouts; deck requires --preview-deck)",
      "layouts"
    )
    .option(
      "--preview-deck <path>",
      "Deck JSON to restyle across --preview-compare themes (Studio/MCP My deck parity; implies mode=deck)"
    )
    .option(
      "--preview-slide <n>",
      "1-based slide to PNG in deck restyle mode (default: 1)",
      "1"
    )
    .option(
      "--no-preview-shots",
      "skip PNG screenshots for --preview-compare (HTML only; default captures title + bento + comparison)"
    )
    .option(
      "--judge",
      "structural design judge on deck JSON (MCP judge_deck t0/t1 parity); exit 1 on gate hits / schema errors"
    )
    .option(
      "--judge-tier <tier>",
      "with --judge, t0|t1 (default t1). t2/t3 HTML+screenshots stay on MCP judge_deck"
    )
    .option("--validate", "validate only, do not render")
    .action(async (inputPath: string | undefined, options: {
      output?: string;
      format: string;
      theme?: string;
      fromPptx?: string;
      fromMd?: string;
      assetsDir?: string;
      listThemes?: boolean;
      scaffold?: string;
      listScaffoldPurposes?: boolean;
      audit?: boolean;
      fix?: boolean;
      applyTheme?: string;
      repair?: boolean;
      remorphDensity?: string;
      shareLink?: boolean;
      generatePrompt?: boolean;
      promptIntent?: string;
      promptDensity?: string;
      judge?: boolean;
      judgeTier?: string;
      previewCompare?: string;
      previewDir?: string;
      previewMode?: string;
      previewDeck?: string;
      previewSlide?: string;
      previewShots?: boolean;
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

      if (options.listScaffoldPurposes) {
        for (const p of listScaffoldPurposes()) {
          process.stdout.write(`${p.id}\t${p.label ?? p.id}\n`);
        }
        return;
      }

      if (options.generatePrompt) {
        const densityRaw = (options.promptDensity ?? "speaker").toLowerCase();
        if (densityRaw !== "speaker" && densityRaw !== "reading") {
          process.stderr.write(
            `Error: --prompt-density must be "speaker" or "reading" (got "${options.promptDensity}")\n`
          );
          process.exit(1);
        }
        try {
          const result = await buildGenerateDeckPrompt({
            theme: options.theme,
            intent: options.promptIntent,
            density: densityRaw as DensityMode,
            themesDir: getBundledThemesDir(),
            fallbackThemesDirs: [process.cwd()],
          });
          const outputPath = resolve(process.cwd(), options.output ?? "craft-prompt.json");
          await writeFile(outputPath, JSON.stringify(result, null, 2), "utf-8");
          process.stdout.write(
            `Wrote craft prompt (${result.theme}, density=${result.density}) → ${outputPath}\n`
          );
        } catch (err) {
          process.stderr.write(`Error: ${(err as Error).message}\n`);
          process.exit(1);
        }
        return;
      }

      if (options.scaffold) {
        const purposes = listScaffoldPurposes().map((p) => p.id);
        const resolved =
          (purposes.includes(options.scaffold as ScaffoldPurpose)
            ? (options.scaffold as ScaffoldPurpose)
            : resolveScaffoldPurpose(options.scaffold)) ?? null;
        if (!resolved) {
          process.stderr.write(
            `Error: unknown --scaffold purpose "${options.scaffold}". Try --list-scaffold-purposes.\n`
          );
          process.exit(1);
        }
        try {
          const result = scaffoldDeck({
            purpose: resolved,
            theme: options.theme,
          });
          const outputPath = resolve(process.cwd(), options.output ?? "scaffold.json");
          await writeFile(outputPath, JSON.stringify(result.deck, null, 2), "utf-8");
          process.stdout.write(
            `Scaffolded ${resolved} (${result.deck.slides.length} slides, ${result.recipe_label}) → ${outputPath}\n`
          );
        } catch (err) {
          process.stderr.write(`Error: ${(err as Error).message}\n`);
          process.exit(1);
        }
        return;
      }

      if (options.previewCompare) {
        const themes = parsePreviewCompareThemes(options.previewCompare);
        if (themes.length === 0) {
          process.stderr.write(
            "Error: --preview-compare requires 1–3 theme names (comma-separated)\n"
          );
          process.exit(1);
        }

        let userDeck: { type?: string; meta?: Record<string, unknown>; slides?: unknown[] } | undefined;
        if (options.previewDeck) {
          const deckPath = resolve(process.cwd(), options.previewDeck);
          try {
            userDeck = JSON.parse(await readFile(deckPath, "utf-8")) as typeof userDeck;
          } catch (err) {
            process.stderr.write(`Error: cannot read --preview-deck: ${(err as Error).message}\n`);
            process.exit(1);
          }
          if (
            userDeck?.type !== "deck" ||
            !Array.isArray(userDeck.slides) ||
            userDeck.slides.length === 0
          ) {
            process.stderr.write("Error: --preview-deck must be Deck JSON with slides\n");
            process.exit(1);
          }
        }

        const modeRaw = (
          userDeck ? "deck" : (options.previewMode ?? "layouts")
        ).toLowerCase();
        if (!userDeck && modeRaw !== "title" && modeRaw !== "layouts") {
          process.stderr.write(
            `Error: unknown --preview-mode "${options.previewMode}" (expected title | layouts | deck)\n`
          );
          process.exit(1);
        }
        if (modeRaw === "deck" && !userDeck) {
          process.stderr.write("Error: --preview-mode deck requires --preview-deck <path>\n");
          process.exit(1);
        }
        const mode = modeRaw as PreviewMode | "deck";
        const slideCountUser = userDeck?.slides?.length ?? 0;
        const slideIndex1 = Math.max(
          1,
          Math.min(slideCountUser || 1, Math.floor(Number(options.previewSlide) || 1))
        );
        const outDir = resolve(
          process.cwd(),
          options.previewDir ?? ".presentation-md/theme-previews"
        );
        await mkdir(outDir, { recursive: true });
        const wantShots = options.previewShots !== false;
        let shotsOk = 0;
        let chromeMissing = false;
        try {
          for (const theme of themes) {
            const deckJson =
              mode === "deck" && userDeck
                ? JSON.stringify({
                    ...userDeck,
                    meta: { ...(userDeck.meta ?? {}), theme },
                  })
                : mode === "layouts"
                  ? buildLayoutsPreviewDeck(theme)
                  : buildTitlePreviewDeck(theme);
            const html = await renderDeck(deckJson, {});
            const filename =
              mode === "deck"
                ? `${theme}-deck-restyle.html`
                : mode === "layouts"
                  ? `${theme}-layouts-preview.html`
                  : `${theme}-preview.html`;
            const outPath = join(outDir, filename);
            await writeFile(outPath, html, "utf-8");
            process.stdout.write(`${theme} → ${outPath}\n`);

            if (wantShots) {
              const slideCount =
                mode === "deck"
                  ? slideCountUser
                  : mode === "layouts"
                    ? layoutsPreviewSlideCount(theme)
                    : 1;
              const layouts =
                mode === "deck"
                  ? ((userDeck?.slides ?? []) as Array<{ layout?: string }>).map(
                      (s, i) => s.layout ?? `slide-${i + 1}`
                    )
                  : layoutsPreviewLayoutNames(theme, mode);
              const shotResult = await screenshotSlides(html, {
                shotsDir: join(outDir, `${theme}-shots`),
                width: DISCOVERY_SHOT_W,
                height: DISCOVERY_SHOT_H,
                slideIndices:
                  mode === "deck" ? [slideIndex1] : discoverySlideIndices(mode, slideCount),
              });
              if (shotResult.chrome_missing) {
                chromeMissing = true;
              } else {
                for (const shot of shotResult.shots) {
                  if (shot.bytes <= 0) continue;
                  shotsOk += 1;
                  const layoutName = layouts[shot.slide - 1] ?? `slide-${shot.slide}`;
                  process.stdout.write(
                    `  ${layoutName} → ${shot.path}\n`
                  );
                }
              }
            }
          }
          process.stdout.write(
            mode === "deck"
              ? `Preview deck restyle (slide ${slideIndex1}): ${themes.length} theme(s) in ${outDir}\n`
              : `Preview compare (${mode}): ${themes.length} theme(s) in ${outDir}\n`
          );
          if (wantShots) {
            if (chromeMissing) {
              process.stdout.write(
                "PNG screenshots skipped — Chrome/Chromium not found (HTML only).\n"
              );
            } else if (shotsOk > 0) {
              process.stdout.write(
                mode === "deck"
                  ? `PNG screenshots: ${shotsOk} restyle shot(s) of your slide ${slideIndex1}.\n`
                  : `PNG screenshots: ${shotsOk} discovery shot(s) (title${mode === "layouts" ? " + bento + comparison" : ""}).\n`
              );
            }
          }
        } catch (err) {
          process.stderr.write(`Error: ${(err as Error).message}\n`);
          process.exit(1);
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

      if (options.shareLink) {
        let deck: unknown;
        try {
          deck = JSON.parse(deckJson);
        } catch (err) {
          process.stderr.write(`Error: invalid JSON: ${(err as Error).message}\n`);
          process.exit(1);
        }
        if (!isShareDeck(deck)) {
          process.stderr.write(
            'Error: --share-link requires a Deck with type:"deck" and a non-empty slides array\n'
          );
          process.exit(1);
        }
        try {
          const url = await studioShareLink(deck);
          process.stdout.write(`${url}\n`);
        } catch (err) {
          process.stderr.write(`Error: ${(err as Error).message}\n`);
          process.exit(1);
        }
        return;
      }

      if (options.remorphDensity) {
        const mode = options.remorphDensity.toLowerCase();
        if (mode !== "speaker" && mode !== "reading") {
          process.stderr.write(
            `Error: --remorph-density must be "speaker" or "reading" (got "${options.remorphDensity}")\n`
          );
          process.exit(1);
        }
        let deck: Record<string, unknown>;
        try {
          deck = JSON.parse(deckJson) as Record<string, unknown>;
        } catch (err) {
          process.stderr.write(`Error: invalid JSON: ${(err as Error).message}\n`);
          process.exit(1);
        }
        const { deck: remorphed, changes } = remorphDensity(deck, mode as DensityMode);
        const outputPath = resolve(
          process.cwd(),
          options.output ?? (inputPath ? inputPath : "deck.json")
        );
        await writeFile(outputPath, JSON.stringify(remorphed, null, 2), "utf-8");
        for (const c of changes) process.stdout.write(`  ${c}\n`);
        const slideCount = Array.isArray(remorphed.slides) ? remorphed.slides.length : 0;
        process.stdout.write(
          `Remorphed density=${mode} (${changes.length} change(s), ${slideCount} slides) → ${outputPath}\n`
        );
        return;
      }

      if (options.applyTheme) {
        let deck: Record<string, unknown>;
        try {
          deck = JSON.parse(deckJson) as Record<string, unknown>;
        } catch (err) {
          process.stderr.write(`Error: invalid JSON: ${(err as Error).message}\n`);
          process.exit(1);
        }
        const meta = (deck["meta"] ?? {}) as Record<string, unknown>;
        meta["theme"] = options.applyTheme;
        deck["meta"] = meta;
        const wantRepair = options.repair !== false;
        let fixes: string[] = [];
        if (wantRepair) {
          const repaired = repairCraft(deck);
          deck = repaired.deck as Record<string, unknown>;
          fixes = repaired.fixes;
        }
        const outputPath = resolve(
          process.cwd(),
          options.output ?? (inputPath ? inputPath : "deck.json")
        );
        await writeFile(outputPath, JSON.stringify(deck, null, 2), "utf-8");
        process.stdout.write(
          `Applied theme ${options.applyTheme}${wantRepair ? ` (+ ${fixes.length} craft fix(es))` : ""} → ${outputPath}\n`
        );
        return;
      }

      if (options.audit) {
        let deck: Record<string, unknown>;
        try {
          deck = JSON.parse(deckJson) as Record<string, unknown>;
        } catch (err) {
          process.stderr.write(`Error: invalid JSON: ${(err as Error).message}\n`);
          process.exit(1);
        }
        let fixes: string[] = [];
        if (options.fix) {
          const repaired = repairCraft(deck);
          deck = repaired.deck as Record<string, unknown>;
          fixes = repaired.fixes;
          const outputPath = resolve(
            process.cwd(),
            options.output ?? (inputPath ? inputPath : "deck.json")
          );
          await writeFile(outputPath, JSON.stringify(deck, null, 2), "utf-8");
          process.stdout.write(
            `Applied ${fixes.length} craft fix(es) → ${outputPath}\n`
          );
        }
        const issues = auditCraft(deck);
        const errors = issues.filter((i) => i.severity === "error");
        const warns = issues.filter((i) => i.severity !== "error");
        for (const issue of issues) {
          const slide = issue.slide != null ? ` (slide ${issue.slide})` : "";
          const line = `${issue.severity}${slide}: ${issue.message}\n`;
          if (issue.severity === "error") process.stderr.write(line);
          else process.stdout.write(line);
        }
        process.stdout.write(
          `Craft audit: ${errors.length} error(s), ${warns.length} warning(s)${fixes.length ? `, ${fixes.length} fix(es) applied` : ""}\n`
        );
        process.exit(errors.length > 0 ? 1 : 0);
      }

      if (options.judge) {
        const tierRaw = (options.judgeTier ?? "t1").toLowerCase().replace(/^tier[-_]?/, "");
        if (tierRaw !== "t0" && tierRaw !== "0" && tierRaw !== "t1" && tierRaw !== "1") {
          process.stderr.write(
            `Error: --judge-tier must be t0|t1 (got "${options.judgeTier}"). Use MCP judge_deck for t2/t3 HTML+screenshots.\n`
          );
          process.exit(1);
        }
        const tier = tierRaw === "t0" || tierRaw === "0" ? "t0" : "t1";
        const schema = validateDeckJson(deckJson);
        let deck: Record<string, unknown>;
        try {
          deck = JSON.parse(deckJson) as Record<string, unknown>;
        } catch (err) {
          process.stderr.write(`Error: invalid JSON: ${(err as Error).message}\n`);
          process.exit(1);
        }
        const structural = judgeDeckJson(deck);
        const gateHits = structural.flags.filter((f) => f.severity === "gate").length;
        const pass = schema.valid && gateHits === 0;
        for (const flag of structural.flags) {
          const slide = flag.slide != null ? ` (slide ${flag.slide})` : "";
          const line = `${flag.severity}${slide}: ${flag.detail}\n`;
          if (flag.severity === "gate" || flag.severity === "error") process.stderr.write(line);
          else process.stdout.write(line);
        }
        if (!schema.valid) {
          for (const err of schema.errors) process.stderr.write(`schema: ${err}\n`);
        }
        process.stdout.write(
          `Judge ${tier}: ${pass ? "pass" : "fail"} · ${gateHits} gate(s) · ${structural.flags.filter((f) => f.severity === "warn").length} warn(s) · ${structural.metrics.slide_count ?? 0} slides\n`
        );
        process.exit(pass ? 0 : 1);
      }

      if (options.theme) {
        const parsed = JSON.parse(deckJson) as { meta?: { theme?: string } };
        parsed.meta = { ...parsed.meta, theme: options.theme };
        deckJson = JSON.stringify(parsed);
      }

      const format = options.format.toLowerCase();
      if (
        format !== "html" &&
        format !== "pptx" &&
        format !== "pdf" &&
        format !== "md" &&
        format !== "markdown" &&
        format !== "notes_txt" &&
        format !== "notes_vtt" &&
        format !== "txt" &&
        format !== "vtt"
      ) {
        process.stderr.write(
          `Error: unknown format "${options.format}" (expected html | pptx | pdf | md | notes_txt | notes_vtt)\n`
        );
        process.exit(1);
      }

      const defaultOutput =
        format === "pptx"
          ? "deck.pptx"
          : format === "pdf"
            ? "deck.pdf"
            : format === "md" || format === "markdown"
              ? "deck.md"
              : format === "notes_vtt" || format === "vtt"
                ? "notes.vtt"
                : format === "notes_txt" || format === "txt"
                  ? "notes.txt"
                  : "deck.html";
      const outputPath = resolve(process.cwd(), options.output ?? defaultOutput);

      try {
        if (format === "pptx") {
          const buffer = await renderDeckPptx(deckJson, {
            onWarn: (msg) => process.stderr.write(`  warning: ${msg}\n`),
          });
          await writeFile(outputPath, buffer);
        } else if (format === "pdf") {
          const buffer = await renderDeckPdf(deckJson, {});
          await writeFile(outputPath, buffer);
        } else if (format === "md" || format === "markdown") {
          const deck = JSON.parse(deckJson) as Parameters<typeof deckToMarkdown>[0];
          await writeFile(outputPath, deckToMarkdown(deck), "utf-8");
        } else if (
          format === "notes_txt" ||
          format === "txt" ||
          format === "notes_vtt" ||
          format === "vtt"
        ) {
          const deck = JSON.parse(deckJson) as Parameters<typeof notesHandoutTxt>[0];
          const text =
            format === "notes_vtt" || format === "vtt"
              ? notesHandoutVtt(deck)
              : notesHandoutTxt(deck);
          await writeFile(outputPath, text, "utf-8");
        } else {
          const html = await renderDeck(deckJson, {});
          await writeFile(outputPath, html, "utf-8");
        }
      } catch (err) {
        process.stderr.write(`Error: ${(err as Error).message}\n`);
        process.exit(1);
      }

      const isNotes = format === "notes_txt" || format === "txt" || format === "notes_vtt" || format === "vtt";
      process.stdout.write(
        format === "md" || format === "markdown"
          ? `Exported Markdown → ${outputPath}\n`
          : isNotes
            ? `Exported notes → ${outputPath}\n`
            : `Rendered → ${outputPath}\n`
      );
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
