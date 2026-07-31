import type { DeckJson, Slide } from "@presentation-md/export";

export interface CraftIssue {
  severity: "error" | "warning";
  message: string;
}

const VALID_LAYOUTS = new Set([
  "title",
  "two-column",
  "feature-grid",
  "quote",
  "data-table",
  "stat-row",
  "timeline",
  "section",
  "closing",
  "image-hero",
  "comparison",
  "code",
  "chart",
  "custom-html",
  "ranked-list",
  "logo-wall",
  "streak-grid",
  "metric-ring",
]);

/**
 * Browser-side craft gates mirroring MCP `audit_deck` structural checks.
 * Schema AJV validation still lives server-side; this catches the agent-facing craft bar.
 */
export function auditCraft(deck: DeckJson): CraftIssue[] {
  const issues: CraftIssue[] = [];
  const slides = Array.isArray(deck.slides) ? deck.slides : [];
  if (!slides.length) {
    issues.push({ severity: "error", message: "Deck has no slides." });
    return issues;
  }

  const layouts = slides.map((s) => s.layout);
  const theme = deck.meta?.theme ?? "";
  const isWrap = theme === "kinetic-wrapped";
  const hasImageHero = layouts.includes("image-hero");
  const hasAsymmetry =
    layouts.includes("comparison") ||
    layouts.includes("code") ||
    layouts.includes("two-column") ||
    layouts.includes("custom-html") ||
    layouts.includes("ranked-list") ||
    layouts.includes("streak-grid") ||
    layouts.includes("metric-ring") ||
    layouts.includes("logo-wall") ||
    slides.some((s) => s.layout === "feature-grid" && s.columns === "bento");

  if (slides.length >= 5 && !hasImageHero && !isWrap) {
    issues.push({
      severity: "warning",
      message: "No image-hero — investor/launch/brand decks need a cinematic visual beat.",
    });
  }
  if (slides.length >= 5 && !hasAsymmetry) {
    issues.push({
      severity: "warning",
      message:
        "Weak asymmetry — add comparison+emphasis, two-column, code, bento, ranked-list, streak-grid, metric-ring, or logo-wall.",
    });
  }

  let run = 1;
  let runStart = 0;
  for (let j = 1; j <= layouts.length; j++) {
    if (j < layouts.length && layouts[j] === layouts[j - 1]) run++;
    else {
      if (run >= 3) {
        issues.push({
          severity: "warning",
          message: `Slides ${runStart + 1}-${j}: '${layouts[runStart]}' repeats ${run}x — vary cadence.`,
        });
      }
      run = 1;
      runStart = j;
    }
  }

  slides.forEach((slide: Slide, i) => {
    const n = i + 1;
    if (!VALID_LAYOUTS.has(String(slide.layout))) {
      issues.push({ severity: "error", message: `Slide ${n}: unknown layout "${slide.layout}"` });
    }
    if (slide.layout === "comparison" && slide.emphasis !== "left" && slide.emphasis !== "right") {
      issues.push({
        severity: "warning",
        message: `Slide ${n} (comparison): set emphasis left|right.`,
      });
    }
    if (slide.layout === "two-column" && (slide.ratio === undefined || slide.ratio === "1-1")) {
      issues.push({
        severity: "warning",
        message: `Slide ${n} (two-column): prefer a non-1-1 ratio.`,
      });
    }
    if (slide.layout === "closing") {
      const hasAction =
        (Array.isArray(slide.actions) && slide.actions.length > 0) ||
        Boolean(slide.cta?.label?.trim());
      if (!hasAction) {
        issues.push({
          severity: "warning",
          message: `Slide ${n} (closing): missing actions[]/cta.`,
        });
      }
    }
  });

  const withNotes = slides.filter((s) => typeof s.notes === "string" && s.notes.trim()).length;
  if (slides.length >= 6 && withNotes === 0) {
    issues.push({
      severity: "warning",
      message: "No speaker notes — add brief notes on 2–4 key slides.",
    });
  }

  if (isWrap) {
    const toned = slides.filter(
      (s) => typeof s.tone === "string" && s.tone !== "default" && s.tone.trim() !== ""
    ).length;
    if (toned < 3) {
      issues.push({
        severity: "warning",
        message: "kinetic-wrapped needs tone on ≥3 slides.",
      });
    }
  }

  return issues;
}
