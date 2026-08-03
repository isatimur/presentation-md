import { resolve } from "node:path";
import { deployDeck } from "@presentation-md/render";
import type { ToolDefinition } from "../server.js";
import { assertExistingPathInCwd } from "../lib/cwd-path.js";

export const deployDeckTool: ToolDefinition = {
  name: "deploy_deck",
  description:
    "Opt-in wrapper around core deploy.sh — publish a rendered deck.html (or deck directory) to a Vercel preview URL. Defaults to dry-run unless confirm=true after the human approves an externally-visible share. prod=true requires confirm_prod=true (permanent publish). Does not thrash remote deploys without explicit confirmation.",
  inputSchema: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "Path within the current working directory to deck.html or a deck directory",
      },
      confirm: {
        type: "boolean",
        description:
          "Required true to invoke deploy.sh. Without it, returns a dry-run plan only. Confirm with the human first — decks are often confidential drafts.",
      },
      prod: {
        type: "boolean",
        description: "Pass --prod for a permanent production deploy (default: preview).",
      },
      confirm_prod: {
        type: "boolean",
        description: "Required true together with confirm when prod=true.",
      },
    },
    required: ["path"],
  },
  handler: async (input: Record<string, unknown>) => {
    const rel = input["path"];
    if (typeof rel !== "string" || !rel.trim()) {
      throw new Error("path must be a non-empty string (deck.html or deck directory)");
    }
    const absolute = await assertExistingPathInCwd(rel.trim(), "path");
    const confirm = input["confirm"] === true;
    const prod = input["prod"] === true;
    const confirmProd = input["confirm_prod"] === true;

    const result = await deployDeck({
      path: absolute,
      confirm,
      prod,
      confirmProd,
    });

    return {
      ...result,
      // Absolute path is fine for the agent; also echo the cwd-relative input.
      requested_path: resolve(rel.trim()) === absolute ? rel.trim() : absolute,
    };
  },
};
