/**
 * T0/T1 structural judge on Deck JSON — ports deck-design-judge density/craft gates.
 * Shared by MCP `judge_deck` and CLI `--judge` (no Chrome / no HTML metrics).
 */

import { countWords, normalizeDeckLang } from "./deck-lang.js";
import { fillCraftTemplate } from "./craft-audit.js";

/**
 * English template for each judge flag, keyed by flag id. `{name}` is filled
 * from `JudgeFlag.params`. Studio translates by id (`judge.<id>`); agents and
 * the CLI read the filled English `detail`.
 */
export const JUDGE_FLAG_MESSAGES = {
  slides: "Deck has <2 slides — inspect manually.",
  G1: "Slide {n}: one block has {words} words (>{limit}) — wall of text.",
  words: "Slide {n}: {words} words total (dense) — verify it isn't over-stuffed.",
  cadence: "Slides {from}-{to}: '{layout}' repeats {run}x in a row — vary the layout cadence.",
  visual_beat: "No image-hero — investor/launch/brand decks need a cinematic visual beat.",
  asymmetry:
    "Weak asymmetry — add comparison+emphasis, two-column, code, bento, ranked-list, streak-grid, metric-ring, or logo-wall.",
  data_viz: "Long deck with no chart/stat-row/data-table/ranked-list/metric-ring — consider a data beat.",
  close: "Closing slide has no actions[]/cta — the ask is missing.",
} as const satisfies Record<string, string>;

/** Stable judge flag id. Never rename one: Studio catalogs key on it. */
export type JudgeFlagId = keyof typeof JUDGE_FLAG_MESSAGES;

export const JUDGE_FLAG_IDS = Object.keys(JUDGE_FLAG_MESSAGES) as JudgeFlagId[];

export interface JudgeFlag {
  id: JudgeFlagId;
  severity: "gate" | "warn" | "error";
  /** English text, filled from the template for `id`. */
  detail: string;
  /** Values for the `{name}` placeholders in the template for `id`. */
  params?: Record<string, string | number>;
  slide?: number;
}

function judgeDetail(
  id: JudgeFlagId,
  params?: Record<string, string | number>
): Pick<JudgeFlag, "id" | "detail" | "params"> {
  return { id, ...(params ? { params } : {}), detail: fillCraftTemplate(JUDGE_FLAG_MESSAGES[id], params) };
}

export interface JudgeDeckJsonResult {
  metrics: Record<string, unknown>;
  flags: JudgeFlag[];
}

const WORD_GATE = 40;
const IGNORE_KEYS = new Set([
  "lang",
  "layout",
  "icon",
  "href",
  "image",
  "imageAlt",
  "kind",
  "status",
  "number",
  "columns",
  "max",
  "unit",
  "logo",
  "theme",
  "format",
  "brand",
  "type",
  "notes",
  "chartType",
  "categories",
  "series",
  "showLegend",
  "showValues",
  "stacked",
  "html",
  "tone",
]);

function iterTextBlocks(obj: unknown): string[] {
  const out: string[] = [];
  if (obj && typeof obj === "object") {
    if (Array.isArray(obj)) {
      for (const v of obj) out.push(...iterTextBlocks(v));
    } else {
      for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
        if (IGNORE_KEYS.has(k)) continue;
        out.push(...iterTextBlocks(v));
      }
    }
  } else if (typeof obj === "string" && obj.trim()) {
    out.push(obj.trim());
  }
  return out;
}

/** T0/T1 structural judge (deck JSON) — ports deck-design-judge metrics gates. */
export function judgeDeckJson(deck: Record<string, unknown>): JudgeDeckJsonResult {
  const flags: JudgeFlag[] = [];
  const slides = Array.isArray(deck["slides"]) ? (deck["slides"] as Record<string, unknown>[]) : [];
  const meta = deck["meta"] as Record<string, unknown> | undefined;
  const lang = normalizeDeckLang(meta?.["lang"]);
  const layouts: string[] = [];
  const wps: number[] = [];
  const mbs: number[] = [];

  if (slides.length < 2) {
    flags.push({
      severity: "warn",
      ...judgeDetail("slides"),
    });
  }

  slides.forEach((s, idx) => {
    const i = idx + 1;
    const layout = typeof s["layout"] === "string" ? s["layout"] : "?";
    layouts.push(layout);
    const blocks = iterTextBlocks(s);
    const total = blocks.reduce((a, b) => a + countWords(b, lang), 0);
    const mb = blocks.reduce((a, b) => Math.max(a, countWords(b, lang)), 0);
    wps.push(total);
    mbs.push(mb);
    if (mb > WORD_GATE) {
      flags.push({
        severity: "gate",
        slide: i,
        ...judgeDetail("G1", { n: i, words: mb, limit: WORD_GATE }),
      });
    } else if (total > 70) {
      flags.push({
        severity: "warn",
        slide: i,
        ...judgeDetail("words", { n: i, words: total }),
      });
    }
  });

  let run = 1;
  let runStart = 0;
  for (let j = 1; j <= layouts.length; j++) {
    if (j < layouts.length && layouts[j] === layouts[j - 1]) {
      run += 1;
    } else {
      if (run >= 3) {
        flags.push({
          severity: "warn",
          ...judgeDetail("cadence", { from: runStart + 1, to: j, layout: String(layouts[runStart]), run }),
        });
      }
      run = 1;
      runStart = j;
    }
  }

  const hasImageHero = layouts.includes("image-hero");
  const hasChart = layouts.includes("chart");
  const theme =
    typeof (deck["meta"] as Record<string, unknown> | undefined)?.["theme"] === "string"
      ? String((deck["meta"] as Record<string, unknown>)["theme"])
      : "";
  const isWrap = theme === "kinetic-wrapped";
  const hasAsymmetry =
    layouts.includes("comparison") ||
    layouts.includes("code") ||
    layouts.includes("two-column") ||
    layouts.includes("custom-html") ||
    layouts.includes("ranked-list") ||
    layouts.includes("streak-grid") ||
    layouts.includes("metric-ring") ||
    layouts.includes("logo-wall") ||
    slides.some((s) => s["layout"] === "feature-grid" && s["columns"] === "bento");

  if (slides.length >= 5 && !hasImageHero && !isWrap) {
    flags.push({
      severity: "warn",
      ...judgeDetail("visual_beat"),
    });
  }
  if (slides.length >= 5 && !hasAsymmetry) {
    flags.push({
      severity: "warn",
      ...judgeDetail("asymmetry"),
    });
  }
  if (
    slides.length >= 6 &&
    !hasChart &&
    !layouts.includes("stat-row") &&
    !layouts.includes("data-table") &&
    !layouts.includes("ranked-list") &&
    !layouts.includes("metric-ring")
  ) {
    flags.push({
      severity: "warn",
      ...judgeDetail("data_viz"),
    });
  }

  const last = slides[slides.length - 1];
  if (last?.["layout"] === "closing") {
    const actions = last["actions"];
    const cta = last["cta"] as Record<string, unknown> | undefined;
    const hasAction =
      (Array.isArray(actions) && actions.length > 0) ||
      (cta && typeof cta["label"] === "string" && String(cta["label"]).trim() !== "");
    if (!hasAction) {
      flags.push({
        severity: "warn",
        ...judgeDetail("close"),
      });
    }
  }

  return {
    metrics: {
      mode: "json",
      slide_count: slides.length,
      layouts,
      words_per_slide: wps,
      max_block_per_slide: mbs,
      words_max: wps.length ? Math.max(...wps) : 0,
      words_mean: wps.length
        ? Math.round((wps.reduce((a, b) => a + b, 0) / wps.length) * 10) / 10
        : 0,
      max_block_words: mbs.length ? Math.max(...mbs) : 0,
      gate_hits: flags.filter((f) => f.severity === "gate").length,
    },
    flags,
  };
}
