import {
  validateDeckJson,
  auditCraft,
  repairCraft,
  remorphDensity,
  type DensityMode,
} from "@presentation-md/core";
import type { ToolDefinition } from "../server.js";

interface Issue {
  severity: "error" | "warning";
  message: string;
  slide?: number;
}

function manualValidate(deck: Record<string, unknown>): { valid: boolean; issues: Issue[] } {
  const issues: Issue[] = [];

  if (deck["type"] !== "deck") {
    issues.push({ severity: "error", message: `/ must have "type": "deck"` });
  }

  const slides = deck["slides"];
  if (!Array.isArray(slides)) {
    issues.push({ severity: "error", message: `/ must have a "slides" array` });
    return { valid: issues.filter((i) => i.severity === "error").length === 0, issues };
  }

  if (slides.length === 0) {
    issues.push({ severity: "error", message: `"slides" array must not be empty` });
  }

  return { valid: issues.filter((i) => i.severity === "error").length === 0, issues };
}

export const auditDeckTool: ToolDefinition = {
  name: "audit_deck",
  description:
    "Validate Deck JSON against the schema AND run craft gates (asymmetry, loud/atmosphere/paper honesty, dual CTA, data beats, custom-html vs ranked-list misuse). Returns structured issues — call before the user sees a first draft; schema-valid ≠ shippable. Pass apply_safe_fixes:true to auto-apply safe structural repairs (emphasis, ratio, bento, CTA/icons, speaker notes, candy-pop brand) PLUS beat inserts (image-hero, comparison, stat-row, logo-wall, wrap tones/ranked/streak, cadence swaps) and get back repaired json + fixes_applied — agents clear craft warnings in one hop vs frontend-slides vibe drafts. Pass remorph_density speaker|reading for a non-LLM structural density remorph (split crowded lists / promote notes) before audit.",
  inputSchema: {
    type: "object",
    properties: {
      json: { type: "string", description: "Deck JSON string to validate" },
      apply_safe_fixes: {
        type: "boolean",
        description:
          "When true, apply safe structural craft repairs + beat inserts before re-auditing. Returns repaired `json` string plus `fixes_applied[]`. Does not invent themes or long body copy; placeholder stats are flagged in fixes_applied.",
      },
      remorph_density: {
        type: "string",
        enum: ["speaker", "reading"],
        description:
          'Non-LLM structural density remorph before audit. "speaker" splits crowded feature-grid/ranked/timeline/logo/table slides and moves overflow body into notes. "reading" merges thin continuation list slides and promotes notes onto thin bodies. Sets meta.density. Returns remorph_changes[] + json when any remorph/repair ran.',
      },
    },
    required: ["json"],
  },
  handler: async (input: Record<string, unknown>) => {
    const json = input["json"] as string;
    const applyFixes = input["apply_safe_fixes"] === true;
    const remorphRaw = input["remorph_density"];
    const remorphMode: DensityMode | null =
      remorphRaw === "speaker" || remorphRaw === "reading" ? remorphRaw : null;

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(json) as Record<string, unknown>;
    } catch (err) {
      return {
        valid: false,
        issues: [{ severity: "error", message: `Invalid JSON: ${(err as Error).message}` }],
        slide_count: 0,
      };
    }

    let fixesApplied: string[] = [];
    let remorphChanges: string[] = [];
    if (remorphMode) {
      const remorphed = remorphDensity(parsed, remorphMode);
      parsed = remorphed.deck as Record<string, unknown>;
      remorphChanges = remorphed.changes;
    }
    if (applyFixes) {
      const repaired = repairCraft(parsed);
      parsed = repaired.deck as Record<string, unknown>;
      fixesApplied = repaired.fixes;
    }

    // Attempt full schema validation via core. If AJV can't load the meta-schema
    // (e.g. draft/2020-12 not registered), fall back to manual structural validation.
    let valid = false;
    let issues: Issue[] = [];

    try {
      const result = validateDeckJson(JSON.stringify(parsed));
      valid = result.valid;
      issues = result.errors.map((msg) => ({ severity: "error" as const, message: msg }));
    } catch {
      // Core validator unavailable (e.g. AJV meta-schema not registered) — fall back
      const fallback = manualValidate(parsed);
      valid = fallback.valid;
      issues = fallback.issues;
    }

    // Shared craft gates (Studio Audit + MCP) live in @presentation-md/core.
    issues.push(...auditCraft(parsed));

    const slides = parsed["slides"];
    const slideCount = Array.isArray(slides) ? slides.length : 0;

    const result: Record<string, unknown> = {
      valid,
      issues,
      slide_count: slideCount,
    };
    const wroteJson = applyFixes || remorphMode != null;
    if (remorphMode) {
      result.remorph_density = remorphMode;
      result.remorph_changes = remorphChanges;
    }
    if (applyFixes) {
      result.fixes_applied = fixesApplied;
      result.fixed = fixesApplied.length > 0;
    }
    if (wroteJson) {
      result.json = JSON.stringify(parsed, null, 2);
    }
    return result;
  },
};
