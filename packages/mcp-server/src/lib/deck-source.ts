import { readFile, rename, stat, writeFile } from "node:fs/promises";
import { assertExistingPathInCwd, assertWritablePathInCwd } from "./cwd-path.js";

/** Same bound as MAX_MCP_TOOL_INPUT_BYTES in server.ts (not imported, to avoid a cycle). */
const MAX_DECK_FILE_BYTES = 10 * 1024 * 1024;

/** A deck read from the `json` argument or from a `deck_path` file inside cwd. */
export interface DeckSource {
  deck: Record<string, unknown>;
  /** Absolute path when the deck came from `deck_path`. */
  path?: string;
}

/** Read the deck from `json` or `deck_path` (exactly one must be given). */
export async function readDeckSource(input: Record<string, unknown>): Promise<DeckSource> {
  const json = input["json"];
  const deckPath = input["deck_path"];
  if ((json === undefined) === (deckPath === undefined)) {
    throw new Error("Pass exactly one of `json` or `deck_path`.");
  }
  let text: string;
  let path: string | undefined;
  if (typeof deckPath === "string") {
    path = await assertExistingPathInCwd(deckPath, "deck_path");
    const size = (await stat(path)).size;
    if (size > MAX_DECK_FILE_BYTES) {
      throw new Error(`'deck_path' is ${size} bytes; the limit is ${MAX_DECK_FILE_BYTES}.`);
    }
    text = await readFile(path, "utf-8");
  } else if (typeof json === "string") {
    text = json;
  } else {
    throw new Error("`json` must be a string and `deck_path` a path string.");
  }
  let deck: unknown;
  try {
    deck = JSON.parse(text);
  } catch (err) {
    throw new Error(`Invalid JSON: ${(err as Error).message}`);
  }
  if (!deck || typeof deck !== "object" || Array.isArray(deck)) {
    throw new Error("Deck JSON must be an object.");
  }
  return { deck: deck as Record<string, unknown>, ...(path ? { path } : {}) };
}

/** Write deck JSON inside cwd atomically (temp file + rename), 2-space indented. */
export async function writeDeckFile(relPath: string, deck: Record<string, unknown>): Promise<string> {
  const target = await assertWritablePathInCwd(relPath, "output_path");
  const tmp = `${target}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(tmp, JSON.stringify(deck, null, 2) + "\n", "utf-8");
  await rename(tmp, target);
  return target;
}
