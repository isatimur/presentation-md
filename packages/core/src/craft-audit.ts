/**
 * Shared craft gates for Studio Audit + MCP `audit_deck`.
 * Schema AJV validation stays separate; this is the agent-facing craft bar.
 */

export interface CraftIssue {
  severity: "error" | "warning";
  message: string;
}

/** Minimal deck shape — avoids coupling core to export DeckJson. */
export interface CraftAuditDeck {
  meta?: { theme?: string };
  slides?: unknown;
}

const HEADING_LAYOUTS = new Set(["title", "section", "closing"]);

export const CRAFT_VALID_LAYOUTS = new Set([
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

function asSlides(deck: CraftAuditDeck): Array<Record<string, unknown>> {
  return Array.isArray(deck.slides)
    ? (deck.slides as Array<Record<string, unknown>>)
    : [];
}

/**
 * Structural craft checks (asymmetry, cadence, closing CTA, wrap tones, etc.).
 * Call after schema validation; safe on partially invalid decks.
 */
export function auditCraft(deck: CraftAuditDeck): CraftIssue[] {
  const issues: CraftIssue[] = [];
  const slides = asSlides(deck);

  if (!slides.length) {
    issues.push({ severity: "error", message: "Deck has no slides." });
    return issues;
  }

  if (slides.length < 2) {
    issues.push({
      severity: "warning",
      message: "Deck has fewer than 2 slides — consider adding more content",
    });
  }

  const layouts = slides.map((s) => s["layout"] as string | undefined);
  const theme = typeof deck.meta?.theme === "string" ? deck.meta.theme : "";
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
    slides.some((s) => s["layout"] === "feature-grid" && s["columns"] === "bento");

  // Wrap decks use hue/ranked/streak/ring beats — image-hero is optional.
  if (slides.length >= 5 && !hasImageHero && !isWrap) {
    issues.push({
      severity: "warning",
      message:
        "No image-hero slide — investor/launch/brand decks need a cinematic visual beat (see references/stunning-25.md).",
    });
  }

  if (slides.length >= 5 && !hasAsymmetry) {
    issues.push({
      severity: "warning",
      message:
        "Weak asymmetry — add comparison+emphasis, two-column (non-1-1 ratio), code, bento, ranked-list, streak-grid, metric-ring, or logo-wall.",
    });
  }

  // Cadence: ≥3 identical layouts in a row.
  let run = 1;
  let runStart = 0;
  for (let j = 1; j <= layouts.length; j++) {
    if (j < layouts.length && layouts[j] === layouts[j - 1]) {
      run++;
    } else {
      if (run >= 3) {
        issues.push({
          severity: "warning",
          message: `Slides ${runStart + 1}-${j}: '${layouts[runStart]}' repeats ${run}x in a row — vary the layout cadence.`,
        });
      }
      run = 1;
      runStart = j;
    }
  }

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i]!;
    const layout = slide["layout"] as string | undefined;
    const n = i + 1;

    if (layout && !CRAFT_VALID_LAYOUTS.has(layout)) {
      issues.push({
        severity: "error",
        message: `Slide ${n}: unknown layout "${layout}"`,
      });
    }

    if (layout && HEADING_LAYOUTS.has(layout) && !slide["heading"]) {
      issues.push({
        severity: "warning",
        message: `Slide ${n} (layout "${layout}") is missing a "heading" field`,
      });
    }

    if (layout === "comparison" && slide["emphasis"] !== "left" && slide["emphasis"] !== "right") {
      issues.push({
        severity: "warning",
        message: `Slide ${n} (comparison): set "emphasis" to "left" or "right" — equal columns read as filler.`,
      });
    }

    if (layout === "two-column") {
      const ratio = slide["ratio"];
      if (ratio === undefined || ratio === "1-1") {
        issues.push({
          severity: "warning",
          message: `Slide ${n} (two-column): prefer a non-1-1 ratio unless weight is truly equal.`,
        });
      }
    }

    if (layout === "feature-grid") {
      const columns = slide["columns"];
      const cards = slide["cards"];
      if (Array.isArray(cards) && cards.length === 5 && columns !== "bento") {
        issues.push({
          severity: "warning",
          message: `Slide ${n} (feature-grid): 5 cards should use columns: "bento" for asymmetric craft.`,
        });
      }
      if (typeof columns === "number" && Array.isArray(cards)) {
        if (cards.length % columns !== 0) {
          issues.push({
            severity: "warning",
            message: `Slide ${n} (feature-grid): "cards" count (${cards.length}) is not a multiple of "columns" (${columns})`,
          });
        }
      }
      if (Array.isArray(cards) && cards.length >= 3) {
        const featureLike = cards.filter((c) => {
          const card = c as Record<string, unknown>;
          const title = typeof card["title"] === "string" ? card["title"].trim() : "";
          // Skip mega-number tiles (community proof) — icons aren't the craft.
          if (/^[\d.,]+[%KkMmBx×+]*$/.test(title)) return false;
          return true;
        });
        if (featureLike.length >= 3) {
          const withIcon = featureLike.filter((c) => {
            const card = c as Record<string, unknown>;
            return typeof card["icon"] === "string" && card["icon"].trim() !== "";
          }).length;
          if (withIcon / featureLike.length < 0.5) {
            issues.push({
              severity: "warning",
              message: `Slide ${n} (feature-grid): fewer than half the cards have icons — add FA icons for scannability.`,
            });
          }
        }
      }
    }

    if (layout === "closing") {
      const actions = slide["actions"];
      const cta = slide["cta"] as Record<string, unknown> | undefined;
      const hasAction =
        (Array.isArray(actions) && actions.length > 0) ||
        (cta && typeof cta["label"] === "string" && cta["label"].trim() !== "");
      if (!hasAction) {
        issues.push({
          severity: "warning",
          message: `Slide ${n} (closing): missing CTA — set actions[] (or cta) so the ask is unmissable.`,
        });
      }
    }
  }

  const last = slides[slides.length - 1];
  if (last && last["layout"] === "closing") {
    const blob = JSON.stringify(last).toLowerCase();
    if (/share|instagram|tiktok|wrapped/.test(blob) && !Array.isArray(last["actions"])) {
      issues.push({
        severity: "warning",
        message:
          "Closing mentions share/social — prefer actions[] with solid + outline pills (not a single cta).",
      });
    }
  }

  const withNotes = slides.filter((s) => typeof s["notes"] === "string" && String(s["notes"]).trim()).length;
  if (slides.length >= 6 && withNotes === 0) {
    issues.push({
      severity: "warning",
      message: "No speaker notes — add brief notes on 2–4 key slides for present mode / PPTX.",
    });
  }

  const copyBlob = JSON.stringify(slides).toLowerCase();
  if (
    /partner|customer|trusted by|logo wall|backers/.test(copyBlob) &&
    !layouts.includes("logo-wall")
  ) {
    issues.push({
      severity: "warning",
      message: 'Social-proof / customer marks copy without logo-wall — prefer layout "logo-wall".',
    });
  }

  if (isWrap) {
    const toned = slides.filter((s) => {
      const t = s["tone"];
      return typeof t === "string" && t !== "default" && t.trim() !== "";
    }).length;
    if (toned < 3) {
      issues.push({
        severity: "warning",
        message:
          "kinetic-wrapped deck has fewer than 3 toned slides — set tone (lime/magenta/cyan/orange/violet) for wrap hue beats.",
      });
    }
    const hasVisual =
      layouts.includes("image-hero") ||
      layouts.includes("ranked-list") ||
      layouts.includes("streak-grid") ||
      layouts.includes("metric-ring") ||
      layouts.includes("custom-html") ||
      slides.some((s) => s["layout"] === "stat-row" && s["variant"] === "hero");
    if (!hasVisual) {
      issues.push({
        severity: "warning",
        message:
          'kinetic-wrapped wrap needs a visual beat — use ranked-list, streak-grid, metric-ring, stat-row variant:"hero", or image-hero.',
      });
    }
    if (/streak/.test(copyBlob) && !layouts.includes("streak-grid")) {
      issues.push({
        severity: "warning",
        message: 'kinetic-wrapped mentions streak without streak-grid — prefer layout "streak-grid".',
      });
    }
  }

  return issues;
}
