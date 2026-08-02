/**
 * T0/T1 structural judge on Deck JSON — ports deck-design-judge density/craft gates.
 * Shared by MCP `judge_deck` and CLI `--judge` (no Chrome / no HTML metrics).
 */

export interface JudgeFlag {
  id: string;
  severity: "gate" | "warn" | "error";
  detail: string;
  slide?: number;
}

export interface JudgeDeckJsonResult {
  metrics: Record<string, unknown>;
  flags: JudgeFlag[];
}

const WORD_GATE = 40;
const IGNORE_KEYS = new Set([
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

function countWords(text: string): number {
  return text.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

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
  const layouts: string[] = [];
  const wps: number[] = [];
  const mbs: number[] = [];

  if (slides.length < 2) {
    flags.push({
      id: "slides",
      severity: "warn",
      detail: "Deck has <2 slides — inspect manually.",
    });
  }

  slides.forEach((s, idx) => {
    const i = idx + 1;
    const layout = typeof s["layout"] === "string" ? s["layout"] : "?";
    layouts.push(layout);
    const blocks = iterTextBlocks(s);
    const total = blocks.reduce((a, b) => a + countWords(b), 0);
    const mb = blocks.reduce((a, b) => Math.max(a, countWords(b)), 0);
    wps.push(total);
    mbs.push(mb);
    if (mb > WORD_GATE) {
      flags.push({
        id: "G1",
        severity: "gate",
        slide: i,
        detail: `Slide ${i}: one block has ${mb} words (>${WORD_GATE}) — wall of text.`,
      });
    } else if (total > 70) {
      flags.push({
        id: "words",
        severity: "warn",
        slide: i,
        detail: `Slide ${i}: ${total} words total (dense) — verify it isn't over-stuffed.`,
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
          id: "cadence",
          severity: "warn",
          detail: `Slides ${runStart + 1}-${j}: '${layouts[runStart]}' repeats ${run}x in a row — vary the layout cadence.`,
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
      id: "visual_beat",
      severity: "warn",
      detail: "No image-hero — investor/launch/brand decks need a cinematic visual beat.",
    });
  }
  if (slides.length >= 5 && !hasAsymmetry) {
    flags.push({
      id: "asymmetry",
      severity: "warn",
      detail:
        "Weak asymmetry — add comparison+emphasis, two-column, code, bento, ranked-list, streak-grid, metric-ring, or logo-wall.",
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
      id: "data_viz",
      severity: "warn",
      detail:
        "Long deck with no chart/stat-row/data-table/ranked-list/metric-ring — consider a data beat.",
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
        id: "close",
        severity: "warn",
        detail: "Closing slide has no actions[]/cta — the ask is missing.",
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
