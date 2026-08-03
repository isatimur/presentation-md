import { mkdir, writeFile, readFile, stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { randomBytes } from "node:crypto";
import { validateDeckJson, judgeDeckJson } from "@presentation-md/core";
import {
  BoundedProcessOutput,
  killProcessTree,
  renderDeck,
  analyzeHtmlDeck,
  type MetricFlag,
} from "@presentation-md/render";
import type { ToolDefinition } from "../server.js";
import { screenshotSlides } from "../lib/screenshot-slides.js";
import { resolveThemesDir } from "../lib/resolve-themes.js";
import {
  encodeMcpInlineImage,
  isMcpInlineImageSizeAllowed,
  richToolResult,
  type McpImagePayload,
} from "../lib/rich-result.js";

type Tier = "t0" | "t1" | "t2" | "t3";

const RUBRIC_DIMENSIONS = [
  { key: "narrative", weight: 12, label: "Narrative & tension" },
  { key: "clarity", weight: 12, label: "Message clarity / 3-second rule" },
  { key: "typography", weight: 11, label: "Typography system" },
  { key: "color", weight: 11, label: "Colour discipline" },
  { key: "layout_flat", weight: 11, label: "Layout, whitespace & flat-system fidelity" },
  { key: "brand", weight: 10, label: "Brand fidelity" },
  { key: "craft", weight: 10, label: "Craft & polish" },
  { key: "proof", weight: 9, label: "Data & proof integrity" },
  { key: "variety", weight: 8, label: "Layout variety" },
  { key: "close", weight: 6, label: "The close / CTA" },
] as const;

function parseTier(raw: unknown): Tier {
  const s = String(raw ?? "t1").toLowerCase().replace(/^tier[-_]?/, "");
  if (s === "t0" || s === "0") return "t0";
  if (s === "t2" || s === "2") return "t2";
  if (s === "t3" || s === "3") return "t3";
  return "t1";
}

function resolveJudgeScriptsDir(): string | undefined {
  if (process.env.PRESENTATION_MD_JUDGE_SCRIPTS) {
    return process.env.PRESENTATION_MD_JUDGE_SCRIPTS;
  }
  // monorepo: packages/mcp-server/dist/tools → ../../../skills/deck-design-judge/scripts
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const candidate = join(here, "..", "..", "..", "..", "skills", "deck-design-judge", "scripts");
    return candidate;
  } catch {
    return undefined;
  }
}

const DEFAULT_JUDGE_PANEL_TIMEOUT_MS = 180_000;
export const MAX_JUDGE_PANEL_JSON_BYTES = 1024 * 1024;

export async function readBoundedJudgePanelJson(path: string): Promise<string> {
  const info = await stat(path);
  if (info.size > MAX_JUDGE_PANEL_JSON_BYTES) {
    throw new Error(
      `Judge panel JSON exceeds ${MAX_JUDGE_PANEL_JSON_BYTES} bytes (received ${info.size} bytes)`
    );
  }
  const text = await readFile(path, "utf-8");
  const actualBytes = Buffer.byteLength(text, "utf8");
  if (actualBytes > MAX_JUDGE_PANEL_JSON_BYTES) {
    throw new Error(
      `Judge panel JSON exceeds ${MAX_JUDGE_PANEL_JSON_BYTES} bytes (received ${actualBytes} bytes)`
    );
  }
  return text;
}

function judgePanelTimeoutMs(): number {
  const raw = process.env.PRESENTATION_MD_JUDGE_TIMEOUT_MS;
  if (raw == null || raw === "") return DEFAULT_JUDGE_PANEL_TIMEOUT_MS;
  const timeoutMs = Number(raw);
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0) {
    throw new Error("PRESENTATION_MD_JUDGE_TIMEOUT_MS must be a positive integer");
  }
  return timeoutMs;
}

function runPythonJson(
  script: string,
  args: string[],
  timeoutMs = judgePanelTimeoutMs()
): Promise<{ ok: boolean; stdout: string; stderr: string; code: number | null }> {
  return new Promise((resolve) => {
    const child = spawn("python3", [script, ...args], {
      stdio: ["ignore", "pipe", "pipe"],
      detached: process.platform !== "win32",
    });
    const output = new BoundedProcessOutput("Judge panel process");
    let outputError: Error | undefined;
    let settled = false;
    let timedOut = false;
    const t = setTimeout(() => {
      if (child.exitCode != null || child.signalCode != null) return;
      timedOut = true;
      killProcessTree(child);
    }, timeoutMs);
    child.stdout.on("data", (d: Buffer) => {
      if (outputError) return;
      try {
        output.append("stdout", d);
      } catch (error) {
        outputError = error as Error;
        killProcessTree(child);
      }
    });
    child.stderr.on("data", (d: Buffer) => {
      if (outputError) return;
      try {
        output.append("stderr", d);
      } catch (error) {
        outputError = error as Error;
        killProcessTree(child);
      }
    });
    child.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(t);
      if (outputError) {
        resolve({ ok: false, stdout: "", stderr: outputError.message, code });
        return;
      }
      const stdout = output.text("stdout");
      const stderr = output.text("stderr");
      if (timedOut) {
        resolve({
          ok: false,
          stdout,
          stderr: `Judge panel process timed out after ${timeoutMs}ms${stderr ? `:\n${stderr}` : ""}`,
          code: null,
        });
        return;
      }
      resolve({ ok: code === 0, stdout, stderr, code });
    });
    child.on("error", (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(t);
      resolve({
        ok: false,
        stdout: output.text("stdout"),
        stderr: String(err),
        code: null,
      });
    });
  });
}

/**
 * Vision-free T3 draft when API keys / judge_panel.py are unavailable.
 * Maps T2 HTML metrics + craft flags into provisional 0–5 dimension scores so
 * agents still get a partial grade instead of a rubric dump alone.
 */
function draftLocalPanel(opts: {
  metrics: Record<string, unknown>;
  flags: Array<{ id: string; severity: string; detail: string }>;
  shots: { slide: number; path: string; warn?: string }[];
  skippedReason: string;
}) {
  const gates = opts.flags.filter((f) => f.severity === "gate");
  const warns = opts.flags.filter((f) => f.severity === "warn" || f.severity === "error");
  const base = gates.length ? 2 : warns.length >= 4 ? 3 : warns.length >= 1 ? 4 : 5;

  const has = (id: string) => opts.flags.some((f) => f.id === id);
  const score = (key: string, delta = 0, evidence: string) => {
    const s = Math.max(0, Math.min(5, base + delta - (gates.length ? 1 : 0)));
    return { score: s, evidence };
  };

  const dimensions: Record<string, { score: number; evidence: string }> = {
    narrative: score(
      "narrative",
      has("cadence") ? -1 : 0,
      has("cadence") ? "Layout cadence warn — narrative rhythm may feel repetitive." : "No cadence gate; narrative inferred from structure only."
    ),
    clarity: score(
      "clarity",
      has("wall_of_text") || has("G1") ? -2 : 0,
      `max_block_words=${String(opts.metrics["max_block_words"] ?? "?")}; wall-of-text flags=${opts.flags.filter((f) => /wall|G1|words/i.test(f.id + f.detail)).length}`
    ),
    typography: score(
      "typography",
      has("type_sizes") || has("G2") ? -1 : 0,
      `type_size_count=${String(opts.metrics["type_size_count"] ?? "?")}`
    ),
    color: score(
      "color",
      has("contrast") || has("G3") ? -2 : 0,
      "Colour discipline from HTML metrics only (no vision)."
    ),
    layout_flat: score(
      "layout_flat",
      has("shadow") || has("G4") ? -1 : 0,
      "Flat-system / shadow gates from HTML metrics."
    ),
    brand: score("brand", 0, "Brand fidelity needs visual review — draft assumes theme tokens held."),
    craft: score(
      "craft",
      has("shot_qa") ? -1 : 0,
      `${opts.shots.filter((s) => s.warn).length} screenshot QA warn(s); ${warns.length} total warn/error flags.`
    ),
    proof: score(
      "proof",
      has("data_viz") ? -1 : 0,
      has("data_viz") ? "Missing data beat flag." : "No data_viz warn."
    ),
    variety: score(
      "variety",
      has("asymmetry") || has("visual_beat") ? -1 : 0,
      `layouts=${JSON.stringify(opts.metrics["structural_layouts"] ?? opts.metrics["layouts"] ?? [])}`
    ),
    close: score("close", 0, "Close/CTA scored structurally only — confirm final slide has a clear ask."),
  };

  const weighted =
    RUBRIC_DIMENSIONS.reduce((acc, d) => acc + dimensions[d.key]!.score * d.weight, 0) /
    RUBRIC_DIMENSIONS.reduce((acc, d) => acc + d.weight, 0);
  const letter =
    gates.length > 0 ? "C" : weighted >= 4.5 ? "A" : weighted >= 3.5 ? "B" : weighted >= 2.5 ? "C" : "D";

  return {
    status: "local_draft" as const,
    tier: "t3",
    note:
      "Vision-free draft from T2 metrics + flags — not a substitute for judge_panel.py or human visual scoring. " +
      opts.skippedReason,
    grade: letter,
    weighted_avg: Math.round(weighted * 100) / 100,
    dimensions,
    shots: opts.shots.map((s) => ({ slide: s.slide, path: s.path, warn: s.warn })),
    rubric: RUBRIC_DIMENSIONS,
    instruction:
      "Treat local_draft as a floor. Open shots, raise/lower scores with visual evidence, then re-run with API keys for a live panel.",
  };
}

export const judgeDeckTool: ToolDefinition = {
  name: "judge_deck",
  description:
    "Design judge for Deck JSON / rendered HTML (deck-design-judge tiers). " +
    "t0/t1: structural JSON gates. t2: render + HTML metrics (G1–G5) + Chrome screenshots when available. " +
    "t3: t2 + multi-model panel when judge_panel.py + API keys exist; otherwise returns a vision-free local_draft grade from metrics/flags plus shot paths for agent refinement. " +
    "t2/t3 attach the first N slide PNGs as MCP image content by default (parity with preview_themes) so vision agents can QA in-chat — set include_inline_images:false for paths-only.",
  inputSchema: {
    type: "object",
    properties: {
      json: {
        type: "string",
        description: "Deck JSON string to judge (required unless html is provided for t2/t3)",
      },
      html: {
        type: "string",
        description: "Optional pre-rendered HTML. When omitted for t2/t3, the tool renders from json.",
      },
      tier: {
        type: "string",
        enum: ["t0", "t1", "t2", "t3"],
        description: "Judge tier (default t1). t2/t3 need Chrome for screenshots; t3 prefers judge_panel.py.",
      },
      theme: {
        type: "string",
        description: "Theme override when rendering for t2/t3",
      },
      shots_dir: {
        type: "string",
        description: "Directory to write T2/T3 PNG screenshots (default: temp dir)",
      },
      skip_screenshots: {
        type: "boolean",
        description: "If true, t2/t3 skip Chrome shots and only run HTML metrics",
      },
      include_inline_images: {
        type: "boolean",
        description:
          "When true (default), attach captured slide PNGs as MCP image content (capped) so vision agents can judge in-chat. Set false for path-only payloads.",
      },
      max_inline_images: {
        type: "number",
        description: "Cap inline MCP images (default 8). Paths still list all shots.",
      },
      max_slides: {
        type: "number",
        description: "Cap screenshots to first N slides (default 40)",
      },
    },
    required: [],
  },
  handler: async (input: Record<string, unknown>) => {
    const tier = parseTier(input["tier"]);
    const json = input["json"] != null ? String(input["json"]) : "";
    const htmlIn = input["html"] != null ? String(input["html"]) : "";
    const skipShots = Boolean(input["skip_screenshots"]);
    const includeInline =
      input["include_inline_images"] === undefined
        ? true
        : Boolean(input["include_inline_images"]);
    const maxInline =
      typeof input["max_inline_images"] === "number"
        ? Math.max(1, Math.floor(input["max_inline_images"]))
        : 8;
    const shotsDir = input["shots_dir"] != null ? String(input["shots_dir"]) : undefined;
    const maxSlides =
      typeof input["max_slides"] === "number" ? Math.max(1, Math.floor(input["max_slides"])) : 40;
    const theme = input["theme"] != null ? String(input["theme"]) : undefined;

    if (!json && !htmlIn) {
      return {
        valid: false,
        pass: false,
        tier,
        schema_errors: ["Provide json and/or html"],
        metrics: {},
        flags: [{ id: "input", severity: "error", detail: "json or html required" }],
        next: "Pass deck JSON (and optionally pre-rendered html).",
      };
    }

    let deck: Record<string, unknown> | undefined;
    let schema = { valid: true, errors: [] as string[] };
    if (json) {
      schema = validateDeckJson(json);
      try {
        deck = JSON.parse(json) as Record<string, unknown>;
      } catch (err) {
        return {
          valid: false,
          pass: false,
          tier,
          schema_errors: [`Invalid JSON: ${(err as Error).message}`],
          metrics: {},
          flags: [{ id: "parse", severity: "error", detail: "Could not parse deck JSON" }],
          next: "Fix JSON, then re-run judge_deck.",
        };
      }
    }

    const structural = deck ? judgeDeckJson(deck) : { metrics: { mode: "none" }, flags: [] as MetricFlag[] };

    // T0 = metrics-only JSON (no visual-beat craft heuristics beyond density) — keep same structural for simplicity
    if (tier === "t0" || tier === "t1") {
      const gateHits = structural.flags.filter((f) => f.severity === "gate").length;
      const pass = schema.valid && gateHits === 0;
      return {
        valid: schema.valid,
        pass,
        tier,
        schema_errors: schema.valid ? [] : schema.errors,
        metrics: structural.metrics,
        flags: structural.flags,
        next: pass
          ? tier === "t0"
            ? "T0 density gates clear. Escalate to judge_deck tier=t1/t2 before ship."
            : "Structural gates clear. Escalate to judge_deck tier=t2 for HTML metrics + screenshots before final ship."
          : "Fix gate/warn flags (and schema errors), then re-run judge_deck before shipping.",
      };
    }

    // ── T2 / T3: render + HTML metrics + optional screenshots ──
    let html = htmlIn;
    let rendered_path: string | undefined;
    if (!html) {
      if (!json) {
        return {
          valid: false,
          pass: false,
          tier,
          schema_errors: ["html or json required for t2/t3"],
          metrics: {},
          flags: [{ id: "input", severity: "error", detail: "Need json to render or html to analyze" }],
          next: "Pass json (to render) or html (pre-rendered).",
        };
      }
      let deckJson = json;
      if (theme && deck) {
        const meta = { ...((deck["meta"] as Record<string, unknown>) ?? {}), theme };
        deckJson = JSON.stringify({ ...deck, meta });
      }
      html = await renderDeck(deckJson, resolveThemesDir());
      const work =
        shotsDir ?? join(tmpdir(), `pmd-judge-${randomBytes(6).toString("hex")}`);
      await mkdir(work, { recursive: true });
      rendered_path = join(work, "deck.html");
      await writeFile(rendered_path, html, "utf-8");
    }

    const htmlJudged = analyzeHtmlDeck(html);
    // Merge structural craft warnings (cadence etc.) that HTML mode lacks
    const mergedFlags = [...htmlJudged.flags];
    for (const f of structural.flags) {
      if (["cadence", "visual_beat", "asymmetry", "data_viz"].includes(f.id)) {
        if (!mergedFlags.some((x) => x.id === f.id && x.detail === f.detail)) {
          mergedFlags.push(f);
        }
      }
    }

    let screenshots: Awaited<ReturnType<typeof screenshotSlides>> | undefined;
    if (!skipShots) {
      screenshots = await screenshotSlides(html, {
        shotsDir: shotsDir ?? (rendered_path ? dirname(rendered_path) : undefined),
        maxSlides,
      });
      for (const shot of screenshots.shots) {
        if (shot.warn) {
          mergedFlags.push({
            id: "shot_qa",
            severity: "warn",
            slide: shot.slide,
            detail: `Slide ${shot.slide}: ${shot.warn}`,
          });
        }
      }
    } else {
      screenshots = {
        ok: false,
        shots: [],
        detail: "Screenshots skipped (skip_screenshots=true).",
      };
    }

    let panel: unknown = undefined;
    if (tier === "t3") {
      const scriptsDir = resolveJudgeScriptsDir();
      const panelScript = scriptsDir ? join(scriptsDir, "judge_panel.py") : undefined;
      const hasKey =
        Boolean(process.env.ANTHROPIC_API_KEY) ||
        Boolean(process.env.OPENROUTER_API_KEY) ||
        Boolean(process.env.OPENAI_API_KEY);

      if (panelScript && hasKey && rendered_path) {
        const outJudge = join(dirname(rendered_path), "judge.json");
        const metricsPath = join(dirname(rendered_path), "metrics.json");
        await writeFile(
          metricsPath,
          JSON.stringify({ metrics: htmlJudged.metrics, flags: mergedFlags }, null, 2),
          "utf-8"
        );
        const run = await runPythonJson(panelScript, [
          rendered_path,
          "--metrics",
          metricsPath,
          "--out",
          outJudge,
        ]);
        if (run.ok) {
          try {
            panel = JSON.parse(await readBoundedJudgePanelJson(outJudge));
          } catch {
            panel = { status: "panel_wrote_unreadable", stderr: run.stderr };
          }
        } else {
          panel = {
            ...draftLocalPanel({
              metrics: htmlJudged.metrics as Record<string, unknown>,
              flags: mergedFlags,
              shots: screenshots.shots,
              skippedReason: run.stderr || run.stdout || "judge_panel.py failed",
            }),
            panel_error: run.stderr || run.stdout || "judge_panel.py failed",
          };
        }
      } else {
        const skippedReason = !panelScript
          ? "judge_panel.py not found (set PRESENTATION_MD_JUDGE_SCRIPTS)"
          : !hasKey
            ? "No ANTHROPIC_API_KEY / OPENROUTER_API_KEY / OPENAI_API_KEY"
            : "Need rendered_path for panel";
        panel = draftLocalPanel({
          metrics: { ...htmlJudged.metrics, structural_layouts: structural.metrics["layouts"] } as Record<
            string,
            unknown
          >,
          flags: mergedFlags,
          shots: screenshots.shots,
          skippedReason,
        });
      }
    }

    const gateHits = mergedFlags.filter((f) => f.severity === "gate").length;
    const pass = schema.valid && gateHits === 0 && (screenshots.chrome_missing ? true : screenshots.ok !== false || skipShots);

    const mcpImages: McpImagePayload[] = [];
    if (includeInline && !skipShots && screenshots.shots?.length) {
      for (const shot of screenshots.shots) {
        if (mcpImages.length >= maxInline) break;
        if (!shot.path || !isMcpInlineImageSizeAllowed(shot.bytes)) continue;
        try {
          const buf = await readFile(shot.path);
          const data = encodeMcpInlineImage(buf);
          if (!data) continue;
          mcpImages.push({
            data,
            mimeType: "image/png",
            label: `Slide ${shot.slide}${shot.warn ? ` · warn: ${shot.warn}` : ""}`,
          });
        } catch {
          /* path listed even if read fails */
        }
      }
    }

    const payload = {
      valid: schema.valid,
      pass: schema.valid && gateHits === 0,
      tier,
      schema_errors: schema.valid ? [] : schema.errors,
      metrics: {
        ...htmlJudged.metrics,
        structural_layouts: structural.metrics["layouts"],
        screenshots_ok: screenshots.ok,
        chrome_missing: screenshots.chrome_missing ?? false,
        inline_images: mcpImages.length,
      },
      flags: mergedFlags,
      html_path: rendered_path,
      screenshots: {
        ok: screenshots.ok,
        chrome_missing: screenshots.chrome_missing ?? false,
        shots_dir: screenshots.shots_dir,
        shots: screenshots.shots,
        detail: screenshots.detail,
        inline_images: mcpImages.length,
      },
      panel,
      next: !schema.valid || gateHits > 0
        ? "Fix gate/schema issues, then re-run judge_deck at the same tier."
        : screenshots.chrome_missing
          ? "HTML metrics clear but Chrome missing — install Chrome for real T2 shots, or open html_path and review visually."
          : mcpImages.length > 0
            ? tier === "t3" && panel && typeof panel === "object" && ["agent_rubric", "local_draft"].includes(String((panel as { status?: string }).status))
              ? "Review attached slide PNGs + local_draft / open each shot, refine rubric scores, apply top fixes, re-judge (add API keys for live panel)."
              : "T2/T3 visual QA ready — review attached slide PNGs (and shot paths), apply top fixes if warns remain, then ship."
            : tier === "t3" && panel && typeof panel === "object" && ["agent_rubric", "local_draft"].includes(String((panel as { status?: string }).status))
              ? "Review local_draft / open each shot, refine rubric scores, apply top fixes, re-judge (add API keys for live panel)."
              : "T2/T3 visual QA artifacts ready — review shots, apply top fixes if any warns remain, then ship.",
      screenshots_pass: pass,
      dx_hint:
        mcpImages.length > 0
          ? `Attached ${mcpImages.length} slide PNG(s) as MCP image content (capped at ${maxInline}). Full shot paths remain in screenshots.shots.`
          : skipShots
            ? "Screenshots skipped — HTML metrics only."
            : screenshots.chrome_missing
              ? "Chrome missing — open html_path / shot paths when available."
              : includeInline
                ? "No inline images attached — open screenshots.shots paths."
                : "Inline images disabled (include_inline_images:false) — open screenshots.shots paths.",
    };

    return mcpImages.length > 0 ? richToolResult(payload, mcpImages) : payload;
  },
};
