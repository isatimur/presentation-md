import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import {
  listScaffoldPurposes,
  resolveScaffoldPurpose,
  scaffoldDeck,
  studioShareLink,
  type ScaffoldPurpose,
} from "@presentation-md/core";
import type { ToolDefinition } from "../server.js";
import { assertWritablePathInCwd } from "../lib/cwd-path.js";

const PURPOSE_ENUM = listScaffoldPurposes().map((p) => p.id);
const DEFAULT_ORIGIN = "https://presentation-md.vercel.app";

export const scaffoldDeckTool: ToolDefinition = {
  name: "scaffold_deck",
  description:
    "Scaffold a schema-native Deck JSON skeleton from a layout recipe (pitch / launch / wrap / paper / hud / …). Pre-wires layouts, asymmetry, image-hero, data beats, dual closing CTAs, and speaker notes — agents fill theme-native copy, then audit_deck. Returns studio_share_url (?d=) by default so one call lands an editable Studio link (Hallmark-style one-prompt → shareable artifact, for decks). Beats freeform vibe drafts with a craft floor on slide one.",
  inputSchema: {
    type: "object",
    properties: {
      purpose: {
        type: "string",
        enum: PURPOSE_ENUM,
        description:
          "Recipe id: pitch, sales, keynote, investor, launch, wrap, neon, poster, paper, hud, modernist, hard-bento, glass, electric, briefing, quiet-luxe, soft-product, playful, neon-tech, data, scatterbrain. Aliases like 'demo'→sales also accepted.",
      },
      theme: {
        type: "string",
        description: "Theme name (defaults per recipe; wrap defaults to kinetic-wrapped)",
      },
      title: {
        type: "string",
        description: "Deck title used in headings / placeholders",
      },
      company: {
        type: "string",
        description: "Company / brand for candy-pop marquee and quote attribution",
      },
      output_path: {
        type: "string",
        description:
          "Optional path within the current working directory to write the scaffolded deck JSON",
      },
      list_purposes: {
        type: "boolean",
        description: "When true, return the recipe catalog only (no scaffold).",
      },
      include_share_url: {
        type: "boolean",
        description:
          "When true (default), also return studio_share_url — Studio ?d= link that hydrates the scaffold for editable handoff. Pass false to skip.",
      },
      origin: {
        type: "string",
        description: `Studio origin for studio_share_url (default ${DEFAULT_ORIGIN}).`,
      },
    },
  },
  handler: async (input: Record<string, unknown>) => {
    if (input["list_purposes"] === true) {
      return {
        purposes: listScaffoldPurposes(),
        hint: "Pick a purpose + theme, call scaffold_deck again, rewrite placeholder copy, then audit_deck → judge_deck. studio_share_url ships with the scaffold by default.",
      };
    }

    const rawPurpose =
      typeof input["purpose"] === "string" ? input["purpose"] : "pitch";
    const resolved =
      (PURPOSE_ENUM.includes(rawPurpose as ScaffoldPurpose)
        ? (rawPurpose as ScaffoldPurpose)
        : resolveScaffoldPurpose(rawPurpose)) ?? null;
    if (!resolved) {
      throw new Error(
        `Unknown purpose "${rawPurpose}". Pass list_purposes:true or one of: ${PURPOSE_ENUM.join(", ")}`
      );
    }

    const result = scaffoldDeck({
      purpose: resolved,
      theme: typeof input["theme"] === "string" ? input["theme"] : undefined,
      title: typeof input["title"] === "string" ? input["title"] : undefined,
      company: typeof input["company"] === "string" ? input["company"] : undefined,
    });

    const json = JSON.stringify(result.deck, null, 2);
    const outputPathInput =
      typeof input["output_path"] === "string" ? input["output_path"] : undefined;
    let outputPath: string | undefined;
    if (outputPathInput) {
      outputPath = await assertWritablePathInCwd(outputPathInput, "output_path");
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, json, "utf-8");
    }

    const includeShare = input["include_share_url"] !== false;
    let studio_share_url: string | undefined;
    if (includeShare) {
      const origin =
        typeof input["origin"] === "string" && input["origin"].trim()
          ? input["origin"].trim()
          : DEFAULT_ORIGIN;
      try {
        studio_share_url = await studioShareLink(result.deck, { origin });
      } catch {
        // Oversized / CompressionStream edge — still return the scaffold JSON.
        studio_share_url = undefined;
      }
    }

    return {
      purpose: result.purpose,
      recipe_label: result.recipe_label,
      theme: result.deck.meta.theme,
      slide_count: result.slide_count,
      json,
      output_path: outputPath,
      ...(studio_share_url ? { studio_share_url } : {}),
      hint: studio_share_url
        ? `${result.hint} Open studio_share_url for editable Studio handoff (same ?d= as Copy link).`
        : result.hint,
    };
  },
};
