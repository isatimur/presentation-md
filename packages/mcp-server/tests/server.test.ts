import { describe, it, expect } from "vitest";
import { auditDeckTool } from "../src/tools/audit-deck.js";
import { applyThemeTool } from "../src/tools/apply-theme.js";
import { listThemesTool } from "../src/tools/list-themes.js";
import { generateDeckPromptTool } from "../src/tools/generate-deck-prompt.js";
import { judgeDeckTool } from "../src/tools/judge-deck.js";
import { importMarkdownTool } from "../src/tools/import-markdown.js";
import { listToolDefinitions, TOOL_NAMES } from "../src/server.js";

const MINIMAL_VALID_DECK = {
  type: "deck",
  meta: { title: "Test Deck", theme: "default-tech" },
  slides: [
    { layout: "title", heading: "Hello World", lead: "A minimal deck for testing." },
    { layout: "closing", heading: "Thank you" }
  ]
};

describe("tool registry", () => {
  it("registers all 11 MCP tools for client discovery", () => {
    const tools = listToolDefinitions();
    expect(tools).toHaveLength(11);
    expect(TOOL_NAMES).toEqual([
      "render_deck",
      "export_deck",
      "list_themes",
      "apply_theme",
      "audit_deck",
      "judge_deck",
      "generate_deck_prompt",
      "import_brand_theme",
      "import_pptx",
      "import_markdown",
      "preview_themes",
    ]);
    for (const t of tools) {
      expect(t.name).toBeTruthy();
      expect(t.description.length).toBeGreaterThan(20);
      expect(t.inputSchema).toBeTruthy();
      expect(typeof t.handler).toBe("function");
    }
  });
});

describe("audit_deck", () => {
  it("returns valid=true for a minimal valid deck", async () => {
    const result = (await auditDeckTool.handler({
      json: JSON.stringify(MINIMAL_VALID_DECK)
    })) as { valid: boolean; issues: unknown[]; slide_count: number };

    expect(result.valid).toBe(true);
    expect(result.slide_count).toBe(2);
  });

  it("returns valid=false for empty object {}", async () => {
    const result = (await auditDeckTool.handler({
      json: JSON.stringify({})
    })) as { valid: boolean; issues: Array<{ severity: string; message: string }> };

    expect(result.valid).toBe(false);
    const errors = result.issues.filter((i) => i.severity === "error");
    expect(errors.length).toBeGreaterThan(0);
  });

  it("warns when deck has fewer than 2 slides", async () => {
    const deck = {
      type: "deck",
      slides: [{ layout: "title", heading: "Only slide" }]
    };
    const result = (await auditDeckTool.handler({
      json: JSON.stringify(deck)
    })) as { issues: Array<{ severity: string; message: string }> };

    const warnings = result.issues.filter((i) => i.severity === "warning");
    expect(warnings.some((w) => w.message.toLowerCase().includes("fewer than 2"))).toBe(true);
  });
});

describe("apply_theme", () => {
  it("correctly swaps meta.theme", async () => {
    const original = JSON.stringify(MINIMAL_VALID_DECK);
    const result = (await applyThemeTool.handler({
      json: original,
      target_theme: "corporate"
    })) as { json: string };

    const parsed = JSON.parse(result.json) as { meta: { theme: string }; slides: unknown[] };
    expect(parsed.meta.theme).toBe("corporate");
    expect(parsed.slides).toHaveLength(2);
  });

  it("adds meta if not present", async () => {
    const deck = { type: "deck", slides: [{ layout: "title", heading: "Hi" }] };
    const result = (await applyThemeTool.handler({
      json: JSON.stringify(deck),
      target_theme: "playful"
    })) as { json: string };

    const parsed = JSON.parse(result.json) as { meta: { theme: string } };
    expect(parsed.meta.theme).toBe("playful");
  });
});

describe("list_themes", () => {
  it("returns an array with at least one theme", async () => {
    const result = (await listThemesTool.handler({})) as {
      themes: Array<{ name: string; version: string }>;
    };
    expect(result.themes.length).toBeGreaterThan(0);
  });

  it("includes default-tech theme", async () => {
    const result = (await listThemesTool.handler({})) as {
      themes: Array<{ name: string }>;
    };
    const names = result.themes.map((t) => t.name);
    expect(names).toContain("default-tech");
  });

  it("filters by shortlist id and can return the shortlists catalog", async () => {
    const result = (await listThemesTool.handler({
      shortlist: "core-defaults",
      include_shortlists: true,
    })) as {
      themes: Array<{ name: string }>;
      shortlist?: { id: string; themes: string[] };
      shortlists?: Array<{ id: string }>;
    };
    expect(result.shortlist?.id).toBe("core-defaults");
    expect(result.themes.map((t) => t.name).sort()).toEqual(
      [...(result.shortlist?.themes ?? [])].sort().filter((n) =>
        result.themes.some((t) => t.name === n)
      )
    );
    expect(result.themes.length).toBeGreaterThan(0);
    expect(result.themes.length).toBeLessThanOrEqual(3);
    expect(result.shortlists?.some((s) => s.id === "series-a-pitch")).toBe(true);
  });

  it("filters by mood keyword when selection index is available", async () => {
    const result = (await listThemesTool.handler({ mood: "editorial" })) as {
      themes: Array<{ name: string; mood?: string[] }>;
    };
    expect(result.themes.length).toBeGreaterThan(0);
    expect(
      result.themes.every((t) =>
        (t.mood ?? []).some((m) => m.toLowerCase().includes("editorial"))
      )
    ).toBe(true);
  });
});

describe("generate_deck_prompt", () => {
  it("returns a non-empty skill string", async () => {
    const result = (await generateDeckPromptTool.handler({})) as {
      skill: string;
      deck_schema_reference: string;
      palette: Record<string, string>;
      typography: object;
    };

    expect(typeof result.skill).toBe("string");
    expect(result.skill.length).toBeGreaterThan(0);
  });

  it("returns palette and typography for default-tech", async () => {
    const result = (await generateDeckPromptTool.handler({
      theme: "default-tech",
      intent: "Show quarterly results"
    })) as {
      theme: string;
      intent: string;
      craft_mandate: string;
      palette: Record<string, string>;
      typography: object;
    };

    expect(result.theme).toBe("default-tech");
    expect(result.intent).toBe("Show quarterly results");
    expect(result.craft_mandate).toMatch(/image-hero/i);
    expect(result.craft_mandate).toMatch(/Gamma|Beautiful\.ai|anti_slop/i);
    expect(result.palette).toHaveProperty("bg");
    expect(result.palette).toHaveProperty("accent");
    expect(result.typography).toHaveProperty("headingFont");
  });

  it("includes anti_slop_reference when available", async () => {
    const result = (await generateDeckPromptTool.handler({
      theme: "signal",
      intent: "Series A",
    })) as {
      anti_slop_reference?: string;
      layout_recipes_reference?: string;
      theme_shortlists_reference?: string;
      craft_mandate: string;
    };
    expect(result.craft_mandate).toMatch(/ONE-SHOT|one-shot|first draft/i);
    expect(result.craft_mandate).toMatch(/mode.?=.?layouts|layouts.*pick-3|pick-3.*layouts/i);
    expect(result.craft_mandate).toMatch(/stunning-25/i);
    expect(result.craft_mandate).toMatch(/layout_recipes|Atmosphere honesty|Poster honesty/i);
    if (result.anti_slop_reference) {
      expect(result.anti_slop_reference).toMatch(/Inter|purple/i);
    }
    if (result.layout_recipes_reference) {
      expect(result.layout_recipes_reference).toMatch(/Pitch Deck|Product Launch/i);
      expect(result.layout_recipes_reference).toMatch(/Neon-tech short|Data-editorial short|Scatterbrain workshop/i);
    }
    expect(result.craft_mandate).toMatch(/neon-tech|data-editorial|scatterbrain/i);
    expect(result.craft_mandate).toMatch(/theme_shortlists|core-defaults/i);
    expect(result.craft_mandate).toMatch(/preview_themes.*shortlist|shortlist:<id>/i);
    expect(result.craft_mandate).toMatch(/top-rule|ft-editorial/i);
    expect(result.craft_mandate).toMatch(/Long decks|data beat/i);
    expect(result.craft_mandate).toMatch(/launch\/investor/i);
    expect(result.theme_shortlists_reference).toMatch(/series-a-pitch|core-defaults/i);
  });
});

describe("audit_deck craft warnings", () => {
  it("warns when comparison lacks emphasis", async () => {
    const deck = {
      type: "deck",
      meta: { title: "Craft", theme: "default-tech" },
      slides: [
        { layout: "title", heading: "A" },
        {
          layout: "comparison",
          heading: "Vs",
          left: "Old",
          right: "New",
        },
        { layout: "closing", heading: "Bye" },
      ],
    };
    const result = (await auditDeckTool.handler({
      json: JSON.stringify(deck),
    })) as { issues: Array<{ severity: string; message: string }> };
    expect(
      result.issues.some((i) => i.severity === "warning" && i.message.includes("emphasis")),
    ).toBe(true);
  });
});

describe("preview_themes", () => {
  it("defaults to title mode with one slide filenames", async () => {
    const { previewThemesTool } = await import("../src/tools/preview-themes.js");
    const { mkdtemp, rm } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const dir = await mkdtemp(join(process.cwd(), "pmd-preview-"));
    try {
      const result = (await previewThemesTool.handler({
        themes: ["default-tech"],
        title: "Preview Test",
        output_dir: dir,
      })) as {
        mode: string;
        previews: Array<{ filename: string; slides: number; mode: string }>;
      };
      expect(result.mode).toBe("title");
      expect(result.previews[0]!.filename).toBe("default-tech-preview.html");
      expect(result.previews[0]!.slides).toBe(1);
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("layouts mode writes multi-slide craft previews", async () => {
    const { previewThemesTool } = await import("../src/tools/preview-themes.js");
    const { mkdtemp, readFile, rm } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const dir = await mkdtemp(join(process.cwd(), "pmd-preview-layouts-"));
    try {
      const result = (await previewThemesTool.handler({
        themes: ["default-tech"],
        title: "Craft Preview",
        mode: "layouts",
        output_dir: dir,
      })) as {
        mode: string;
        previews: Array<{ filename: string; slides: number; path: string }>;
      };
      expect(result.mode).toBe("layouts");
      expect(result.previews[0]!.filename).toBe("default-tech-layouts-preview.html");
      expect(result.previews[0]!.slides).toBe(8);
      const html = await readFile(result.previews[0]!.path, "utf-8");
      expect(html).toContain('data-layout="comparison"');
      expect(html).toContain('data-layout="code"');
      expect(html).toContain('data-layout="stat-row"');
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("resolves themes from a shortlist id when themes is omitted", async () => {
    const { previewThemesTool } = await import("../src/tools/preview-themes.js");
    const { mkdtemp, rm } = await import("node:fs/promises");
    const { join } = await import("node:path");
    const dir = await mkdtemp(join(process.cwd(), "pmd-preview-shortlist-"));
    try {
      const result = (await previewThemesTool.handler({
        shortlist: "core-defaults",
        title: "Shortlist Preview",
        output_dir: dir,
      })) as {
        previews: Array<{ theme: string }>;
        shortlist?: { id: string; themes: string[] };
        error?: string;
      };
      expect(result.error).toBeUndefined();
      expect(result.shortlist?.id).toBe("core-defaults");
      expect(result.previews.map((p) => p.theme).sort()).toEqual(
        [...(result.shortlist?.themes ?? [])].slice(0, 3).sort()
      );
    } finally {
      await rm(dir, { recursive: true, force: true });
    }
  });
});


describe("judge_deck", () => {
  it("passes a tight two-slide deck (t1 default)", async () => {
    const result = (await judgeDeckTool.handler({
      json: JSON.stringify({
        type: "deck",
        slides: [
          { layout: "title", heading: "Hello" },
          { layout: "closing", heading: "Bye" },
        ],
      }),
    })) as { pass: boolean; valid: boolean; tier: string };
    expect(result.valid).toBe(true);
    expect(result.pass).toBe(true);
    expect(result.tier).toBe("t1");
  });

  it("t2 runs HTML metrics without screenshots when skip_screenshots", async () => {
    const result = (await judgeDeckTool.handler({
      tier: "t2",
      skip_screenshots: true,
      json: JSON.stringify({
        type: "deck",
        meta: { title: "Judge T2", theme: "default-tech" },
        slides: [
          { layout: "title", heading: "Hello World", lead: "Short lead." },
          { layout: "closing", heading: "Thank you", lead: "Done." },
        ],
      }),
    })) as {
      pass: boolean;
      tier: string;
      metrics: { mode: string; craft_features?: Record<string, boolean> };
      screenshots: { chrome_missing?: boolean; shots: unknown[] };
      html_path?: string;
    };
    expect(result.tier).toBe("t2");
    expect(result.metrics.mode).toBe("html");
    expect(result.metrics.craft_features?.keyboard_nav).toBe(true);
    expect(result.screenshots.shots).toEqual([]);
    expect(result.html_path).toBeTruthy();
    expect(result.pass).toBe(true);
  });

  it("t3 returns local_draft grade when panel keys missing", async () => {
    const result = (await judgeDeckTool.handler({
      tier: "t3",
      skip_screenshots: true,
      json: JSON.stringify({
        type: "deck",
        meta: { title: "Judge T3", theme: "default-tech" },
        slides: [
          { layout: "title", heading: "Hello" },
          { layout: "closing", heading: "Bye" },
        ],
      }),
    })) as {
      tier: string;
      panel: {
        status: string;
        grade: string;
        dimensions: Record<string, { score: number; evidence: string }>;
        rubric: unknown[];
      };
    };
    expect(result.tier).toBe("t3");
    expect(result.panel.status).toBe("local_draft");
    expect(result.panel.grade).toMatch(/^[A-D]$/);
    expect(Object.keys(result.panel.dimensions).length).toBe(10);
    expect(result.panel.rubric.length).toBe(10);
  });
});

describe("import_markdown", () => {
  it("converts markdown into deck json", async () => {
    const result = (await importMarkdownTool.handler({
      markdown: "---\ntheme: signal\n---\n\n# Hello\n\nLead.\n\n---\n\n## Thanks\n\nDone.\n",
    })) as { slide_count: number; theme: string };
    expect(result.slide_count).toBeGreaterThanOrEqual(2);
    expect(result.theme).toBe("signal");
  });
});
