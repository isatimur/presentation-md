/**
 * PPTX fidelity scorecard.
 *
 * Exports decks to PPTX and measures what a person opening the file gets:
 *  - text: every piece of slide text that the HTML deck shows must appear as
 *    editable text (<a:t>) on that PPTX slide, not flattened into an image or
 *    dropped (text the HTML does not show either is out of scope);
 *  - notes: speaker notes land in the slide's notes page;
 *  - native: charts are native charts, data tables are native tables;
 *  - fidelity report items (image / approximated / skipped / fallback).
 *
 * Inputs: the all-layouts fixture in every theme, plus every gallery example deck.
 * Output: docs/pptx-scorecard.json and docs/pptx-scorecard.md.
 *
 * Usage: pnpm scorecard            (writes the report)
 *        pnpm scorecard --check    (exit 1 if text coverage drops below 100%)
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { loadTheme } from "../../packages/core/src/theme-loader.ts";
import { buildPptx, type DeckJson, type FidelityItem } from "../../packages/export/src/index.ts";
import { renderDeck } from "../../packages/renderer-node/src/index.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
// jszip is a dependency of the export package, not of the repo root.
const JSZip = createRequire(join(root, "packages/export/package.json"))("jszip") as typeof import("jszip");
const themesDir = join(root, "packages/themes");
/** claude and default-tech ship inside core. */
const coreThemesDir = join(root, "packages/core/themes");

/** Keys whose values are not visible slide text (or are checked another way). */
const NON_TEXT_KEYS = new Set([
  "layout", "icon", "image", "imageAlt", "href", "style", "tone", "notes", "ratio", "emphasis",
  "columns", "chartType", "showValues", "showLegend", "stacked", "categories", "series", "language",
  "widthPct", "filled", "total", "cols", "pct", "reverse", "variant", "kind", "status", "logo",
]);

function decodeXml(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&");
}

const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase();

/** Visible text lines of one slide, from its JSON. */
function expectedLines(slide: Record<string, unknown>): string[] {
  const out: string[] = [];
  const walk = (v: unknown, key?: string): void => {
    if (key && NON_TEXT_KEYS.has(key)) return;
    if (typeof v === "string") {
      const text = key === "html" ? v.replace(/<[^>]+>/g, "\n") : v;
      for (const line of text.split("\n")) if (norm(line)) out.push(line.trim());
    } else if (Array.isArray(v)) {
      for (const x of v) walk(x);
    } else if (v && typeof v === "object") {
      for (const [k, x] of Object.entries(v)) walk(x, k);
    }
  };
  walk(slide);
  return out;
}

function slideText(xml: string): { spaced: string; joined: string } {
  const parts = [...xml.matchAll(/<a:t>([^<]*)<\/a:t>/g)].map((m) => decodeXml(m[1]!));
  return { spaced: norm(parts.join(" ")), joined: norm(parts.join("")) };
}

export interface SlideScore {
  n: number;
  layout: string;
  textFound: number;
  textTotal: number;
  missing: string[];
  notesOk: boolean | null;
  nativeChart: boolean | null;
  nativeTable: boolean | null;
  pictures: number;
  fidelity: string[];
}

/** Visible text of each slide in the rendered HTML deck, in slide order. */
async function htmlSlideTexts(deck: DeckJson): Promise<string[]> {
  const html = (await renderDeck(JSON.stringify(deck), { themesDir } as never))
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
  const sections = html.split(/<section class="slide[\s"]/).slice(1);
  return sections.map((sec) =>
    norm(
      decodeXml(
        sec
          .split(/<\/section>/)[0]!
          .replace(/<[^>]+>/g, " ")
          .replace(/&nbsp;/g, " ")
          .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
      )
    )
  );
}

export async function scoreDeck(input: DeckJson, themeName: string): Promise<SlideScore[]> {
  const deck = { ...input, meta: { ...input.meta, theme: themeName } } as DeckJson;
  const theme = await loadTheme(themeName, { themesDir, fallbackThemesDirs: [coreThemesDir] });
  const shown = await htmlSlideTexts(deck);
  const { pptx, fidelity } = await buildPptx(deck, theme, {
    attribution: false,
  });
  const zip = await JSZip.loadAsync((await pptx.write({ outputType: "nodebuffer" })) as Buffer);
  const slides = deck.slides as Array<Record<string, unknown>>;
  const scores: SlideScore[] = [];
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i]!;
    const n = i + 1;
    const xml = (await zip.file(`ppt/slides/slide${n}.xml`)?.async("string")) ?? "";
    const rels = (await zip.file(`ppt/slides/_rels/slide${n}.xml.rels`)?.async("string")) ?? "";
    const text = slideText(xml);
    const lines = expectedLines(s).filter((l) => (shown[i] ?? "").includes(norm(l)));
    const missing = lines.filter((l) => !text.spaced.includes(norm(l)) && !text.joined.includes(norm(l).replace(/ /g, "")));
    const notes = typeof s["notes"] === "string" ? s["notes"].trim() : "";
    let notesOk: boolean | null = null;
    if (notes) {
      const notesRel = rels.match(/Target="\.\.\/notesSlides\/(notesSlide\d+\.xml)"/)?.[1];
      const notesXml = notesRel ? ((await zip.file(`ppt/notesSlides/${notesRel}`)?.async("string")) ?? "") : "";
      notesOk = slideText(notesXml).spaced.includes(norm(notes));
    }
    scores.push({
      n,
      layout: String(s["layout"]),
      textFound: lines.length - missing.length,
      textTotal: lines.length,
      missing,
      notesOk,
      nativeChart: s["layout"] === "chart" ? /relationships\/chart"/.test(rels) : null,
      nativeTable: s["layout"] === "data-table" ? xml.includes("<a:tbl>") : null,
      pictures: (xml.match(/<p:pic>/g) ?? []).length,
      fidelity: fidelity
        .filter((f: FidelityItem) => f.slide === n)
        .map((f: FidelityItem) => f.kind),
    });
  }
  return scores;
}

interface Row {
  source: string;
  theme: string;
  slides: SlideScore[];
}

function pct(a: number, b: number): string {
  return b === 0 ? "—" : `${((100 * a) / b).toFixed(1)}%`;
}

async function main(): Promise<void> {
  const check = process.argv.includes("--check");
  const fixture = JSON.parse(readFileSync(join(root, "tools/scorecard/all-layouts.json"), "utf-8")) as DeckJson;
  const hasTheme = (dir: string) => (d: string) => {
    try {
      readFileSync(join(dir, d, "theme.json"));
      return true;
    } catch {
      return false;
    }
  };
  const themes = [
    ...readdirSync(themesDir).filter(hasTheme(themesDir)),
    ...readdirSync(coreThemesDir).filter(hasTheme(coreThemesDir)),
  ];
  const rows: Row[] = [];
  for (const theme of themes.sort()) {
    rows.push({ source: "all-layouts", theme, slides: await scoreDeck(fixture, theme) });
  }
  const exDir = join(root, "examples/decks");
  for (const f of readdirSync(exDir).filter((x) => x.endsWith(".json")).sort()) {
    const deck = JSON.parse(readFileSync(join(exDir, f), "utf-8")) as DeckJson;
    const theme = String(deck.meta?.theme ?? "default-tech");
    if (!themes.includes(theme)) continue;
    rows.push({ source: f.replace(/\.json$/, ""), theme, slides: await scoreDeck(deck, theme) });
  }

  const all = rows.flatMap((r) => r.slides.map((s) => ({ ...s, source: r.source, theme: r.theme })));
  const textFound = all.reduce((a, s) => a + s.textFound, 0);
  const textTotal = all.reduce((a, s) => a + s.textTotal, 0);
  const notes = all.filter((s) => s.notesOk !== null);
  const charts = all.filter((s) => s.nativeChart !== null);
  const tables = all.filter((s) => s.nativeTable !== null);

  // Per-layout summary.
  const byLayout = new Map<string, typeof all>();
  for (const s of all) byLayout.set(s.layout, [...(byLayout.get(s.layout) ?? []), s]);
  const layoutRows = [...byLayout.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([layout, ss]) => {
      const f = ss.reduce((a, s) => a + s.textFound, 0);
      const t = ss.reduce((a, s) => a + s.textTotal, 0);
      const kinds = new Map<string, number>();
      for (const s of ss) for (const k of s.fidelity) kinds.set(k, (kinds.get(k) ?? 0) + 1);
      const flags = [...kinds].map(([k, c]) => `${k} ×${c}`).join(", ") || "none";
      return { layout, slides: ss.length, text: pct(f, t), found: f, total: t, flags };
    });

  const missingExamples = all.filter((s) => s.missing.length).slice(0, 25);
  const summary = {
    generated: new Date().toISOString().slice(0, 10),
    decks: rows.length,
    slides: all.length,
    themes: themes.length,
    editableText: { found: textFound, total: textTotal, pct: pct(textFound, textTotal) },
    speakerNotes: { ok: notes.filter((s) => s.notesOk).length, total: notes.length },
    nativeCharts: { ok: charts.filter((s) => s.nativeChart).length, total: charts.length },
    nativeTables: { ok: tables.filter((s) => s.nativeTable).length, total: tables.length },
    layouts: layoutRows,
    missing: missingExamples.map((s) => ({ source: s.source, theme: s.theme, slide: s.n, layout: s.layout, missing: s.missing })),
  };
  writeFileSync(join(root, "docs/pptx-scorecard.json"), JSON.stringify(summary, null, 2) + "\n");

  const md = [
    "# PowerPoint export scorecard",
    "",
    `Generated ${summary.generated} by \`pnpm scorecard\` (\`tools/scorecard/pptx-scorecard.ts\`). It exports ${summary.decks} decks — a fixture with all ${byLayout.size} layouts in each of the ${summary.themes} themes, plus every gallery example — and opens the PPTX files to check what a person gets.`,
    "",
    "| Check | Result |",
    "|---|---|",
    `| Slide text that is editable text in PowerPoint | **${summary.editableText.pct}** (${textFound} of ${textTotal} text items) |`,
    `| Speaker notes in the notes page | ${summary.speakerNotes.ok} of ${summary.speakerNotes.total} slides |`,
    `| Charts exported as native, editable charts | ${summary.nativeCharts.ok} of ${summary.nativeCharts.total} |`,
    `| Data tables exported as native tables | ${summary.nativeTables.ok} of ${summary.nativeTables.total} |`,
    `| Slides exported | ${summary.slides} |`,
    "",
    "## By layout",
    "",
    "Fidelity notes come from the export's own report: `approximated` means the layout is rebuilt from simpler shapes; `image` means an image could not be embedded; `skipped` / `fallback` mean content was left out or simplified.",
    "",
    "| Layout | Slides | Editable text | Fidelity notes |",
    "|---|---|---|---|",
    ...layoutRows.map((r) => `| \`${r.layout}\` | ${r.slides} | ${r.text} | ${r.flags} |`),
    "",
    "## What this does not check",
    "",
    "- Visual likeness to the HTML deck (no renderer diff yet).",
    "- Fonts: themes use web fonts that PowerPoint substitutes unless installed; use `font_mode: office-safe` for identical rendering on every machine.",
    "",
  ];
  if (missingExamples.length) {
    md.push("## Text not found as editable text", "");
    for (const m of summary.missing) md.push(`- ${m.source} · ${m.theme} · slide ${m.slide} (\`${m.layout}\`): ${m.missing.map((x) => `"${x}"`).join(", ")}`);
    md.push("");
  }
  writeFileSync(join(root, "docs/pptx-scorecard.md"), md.join("\n"));

  console.log(
    `${summary.decks} decks, ${summary.slides} slides: text ${summary.editableText.pct}, notes ${summary.speakerNotes.ok}/${summary.speakerNotes.total}, charts ${summary.nativeCharts.ok}/${summary.nativeCharts.total}, tables ${summary.nativeTables.ok}/${summary.nativeTables.total}`
  );
  if (check && textFound < textTotal) {
    console.error(`Text coverage below 100%: ${textTotal - textFound} item(s) missing. See docs/pptx-scorecard.md.`);
    process.exit(1);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
