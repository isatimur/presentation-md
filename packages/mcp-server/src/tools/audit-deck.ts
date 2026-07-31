import { validateDeckJson } from "@presentation-md/core";
import type { ToolDefinition } from "../server.js";

interface Issue {
  severity: "error" | "warning";
  message: string;
}

const HEADING_LAYOUTS = new Set(["title", "section", "closing"]);
const VALID_LAYOUTS = new Set([
  "title", "two-column", "feature-grid", "quote",
  "data-table", "stat-row", "timeline", "section", "closing",
  "image-hero", "comparison", "code", "chart", "custom-html",
  "ranked-list", "logo-wall", "streak-grid", "metric-ring",
]);

function manualValidate(deck: Record<string, unknown>): { valid: boolean; issues: Issue[] } {
  const issues: Issue[] = [];

  if (deck["type"] !== "deck") {
    issues.push({ severity: "error", message: `/ must have "type": "deck"` });
  }

  const slides = deck["slides"];
  if (!Array.isArray(slides)) {
    issues.push({ severity: "error", message: `/ must have a "slides" array` });
    return { valid: issues.length === 0, issues };
  }

  if (slides.length === 0) {
    issues.push({ severity: "error", message: `"slides" array must not be empty` });
  }

  return { valid: issues.filter((i) => i.severity === "error").length === 0, issues };
}

function lightStructuralChecks(deck: Record<string, unknown>): Issue[] {
  const issues: Issue[] = [];

  const slides = deck["slides"];
  if (!Array.isArray(slides)) return issues;

  if (slides.length < 2) {
    issues.push({ severity: "warning", message: "Deck has fewer than 2 slides — consider adding more content" });
  }

  const layouts = slides.map((s) => (s as Record<string, unknown>)["layout"] as string | undefined);
  const hasImageHero = layouts.includes("image-hero");
  const hasComparison = layouts.includes("comparison");
  const hasCode = layouts.includes("code");
  const hasTwoCol = layouts.includes("two-column");
  const hasBento = slides.some((s) => {
    const slide = s as Record<string, unknown>;
    return slide["layout"] === "feature-grid" && slide["columns"] === "bento";
  });
  const hasAsymmetry = hasComparison || hasCode || hasTwoCol || hasBento;

  if (slides.length >= 5 && !hasImageHero) {
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
        "Weak asymmetry — add comparison+emphasis, two-column (non-1-1 ratio), code, or feature-grid columns:\"bento\".",
    });
  }

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i] as Record<string, unknown>;
    const layout = slide["layout"] as string | undefined;

    if (layout && !VALID_LAYOUTS.has(layout)) {
      issues.push({
        severity: "error",
        message: `Slide ${i + 1}: unknown layout "${layout}"`
      });
    }

    if (layout && HEADING_LAYOUTS.has(layout) && !slide["heading"]) {
      issues.push({
        severity: "warning",
        message: `Slide ${i + 1} (layout "${layout}") is missing a "heading" field`
      });
    }

    if (layout === "comparison" && slide["emphasis"] !== "left" && slide["emphasis"] !== "right") {
      issues.push({
        severity: "warning",
        message: `Slide ${i + 1} (comparison): set "emphasis" to "left" or "right" — equal columns read as filler.`,
      });
    }

    if (layout === "two-column") {
      const ratio = slide["ratio"];
      if (ratio === undefined || ratio === "1-1") {
        issues.push({
          severity: "warning",
          message: `Slide ${i + 1} (two-column): prefer a non-1-1 ratio unless weight is truly equal.`,
        });
      }
    }

    if (layout === "feature-grid") {
      const columns = slide["columns"];
      const cards = slide["cards"];
      if (Array.isArray(cards) && cards.length === 5 && columns !== "bento") {
        issues.push({
          severity: "warning",
          message: `Slide ${i + 1} (feature-grid): 5 cards should use columns: "bento" for asymmetric craft.`,
        });
      }
      if (typeof columns === "number" && Array.isArray(cards)) {
        if (cards.length % columns !== 0) {
          issues.push({
            severity: "warning",
            message: `Slide ${i + 1} (feature-grid): "cards" count (${cards.length}) is not a multiple of "columns" (${columns})`
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
              message: `Slide ${i + 1} (feature-grid): fewer than half the cards have icons — add FA icons for scannability.`,
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
          message: `Slide ${i + 1} (closing): missing CTA — set actions[] (or cta) so the ask is unmissable.`,
        });
      }
    }
  }

  const last = slides[slides.length - 1] as Record<string, unknown> | undefined;
  if (last && last["layout"] === "closing") {
    const blob = JSON.stringify(last).toLowerCase();
    if ((/share|instagram|tiktok|wrapped/.test(blob)) && !Array.isArray(last["actions"])) {
      issues.push({
        severity: "warning",
        message:
          "Closing mentions share/social — prefer actions[] with solid + outline pills (not a single cta).",
      });
    }
  }

  const withNotes = slides.filter((s) => typeof (s as Record<string, unknown>)["notes"] === "string").length;
  if (slides.length >= 6 && withNotes === 0) {
    issues.push({
      severity: "warning",
      message: "No speaker notes — add brief notes on 2–4 key slides for present mode / PPTX.",
    });
  }

  const meta = deck["meta"] as Record<string, unknown> | undefined;
  const theme = typeof meta?.["theme"] === "string" ? meta["theme"] : "";
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
  if (theme === "kinetic-wrapped") {
    const toned = slides.filter((s) => {
      const t = (s as Record<string, unknown>)["tone"];
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
      slides.some((s) => {
        const slide = s as Record<string, unknown>;
        return slide["layout"] === "stat-row" && slide["variant"] === "hero";
      });
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

export const auditDeckTool: ToolDefinition = {
  name: "audit_deck",
  description:
    "Validate a deck JSON against the schema and return structured issues.",
  inputSchema: {
    type: "object",
    properties: {
      json: { type: "string", description: "Deck JSON string to validate" }
    },
    required: ["json"]
  },
  handler: async (input: Record<string, unknown>) => {
    const json = input["json"] as string;

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(json) as Record<string, unknown>;
    } catch (err) {
      return {
        valid: false,
        issues: [{ severity: "error", message: `Invalid JSON: ${(err as Error).message}` }],
        slide_count: 0
      };
    }

    // Attempt full schema validation via core. If AJV can't load the meta-schema
    // (e.g. draft/2020-12 not registered), fall back to manual structural validation.
    let valid = false;
    let issues: Issue[] = [];

    try {
      const result = validateDeckJson(json);
      valid = result.valid;
      issues = result.errors.map((msg) => ({ severity: "error" as const, message: msg }));
    } catch {
      // Core validator unavailable (e.g. AJV meta-schema not registered) — fall back
      const fallback = manualValidate(parsed);
      valid = fallback.valid;
      issues = fallback.issues;
    }

    // Always run light structural checks regardless of schema validity
    const structural = lightStructuralChecks(parsed);
    issues.push(...structural);

    const slides = parsed["slides"];
    const slideCount = Array.isArray(slides) ? slides.length : 0;

    return { valid, issues, slide_count: slideCount };
  }
};
