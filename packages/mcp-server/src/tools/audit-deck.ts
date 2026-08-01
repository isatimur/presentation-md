import { validateDeckJson, auditCraft } from "@presentation-md/core";
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
    return { valid: issues.length === 0, issues };
  }

  if (slides.length === 0) {
    issues.push({ severity: "error", message: `"slides" array must not be empty` });
  }

  return { valid: issues.filter((i) => i.severity === "error").length === 0, issues };
}

export const auditDeckTool: ToolDefinition = {
  name: "audit_deck",
  description:
    "Validate Deck JSON against the schema AND run craft gates (asymmetry, loud/atmosphere/paper honesty, dual CTA, data beats, custom-html vs ranked-list misuse). Returns structured issues — call before the user sees a first draft; schema-valid ≠ shippable.",
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

    // Shared craft gates (Studio Audit + MCP) live in @presentation-md/core.
    issues.push(...auditCraft(parsed));

    const slides = parsed["slides"];
    const slideCount = Array.isArray(slides) ? slides.length : 0;

    return { valid, issues, slide_count: slideCount };
  }
};
