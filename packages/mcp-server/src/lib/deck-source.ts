import { randomUUID } from "node:crypto";
import { lstat, open, readFile, rename, stat, unlink } from "node:fs/promises";
import { basename, dirname, extname, join } from "node:path";
import { assertExistingPathInCwd, assertWritablePathInCwd } from "./cwd-path.js";

/** Same bound as MAX_MCP_TOOL_INPUT_BYTES in server.ts (not imported, to avoid a cycle). */
const MAX_DECK_FILE_BYTES = 10 * 1024 * 1024;

/** A deck read from the `json` argument or from a `deck_path` file inside cwd. */
export interface DeckSource {
  deck: Record<string, unknown>;
  /** Absolute path when the deck came from `deck_path`. */
  path?: string;
}

function isDeckObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v) && Array.isArray((v as Record<string, unknown>)["slides"]);
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
    const info = await stat(path);
    // Directories, FIFOs and devices would fail or block readFile.
    if (!info.isFile()) throw new Error(`'deck_path' must be a regular file: ${deckPath}`);
    if (info.size > MAX_DECK_FILE_BYTES) {
      throw new Error(`'deck_path' is ${info.size} bytes; the limit is ${MAX_DECK_FILE_BYTES}.`);
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

/**
 * Write deck JSON inside cwd atomically: a random, exclusively created temp
 * file next to the target, then rename. Refuses targets that are directories,
 * non-.json files, or existing files that are not decks, so a prompt-injected
 * call cannot clobber package.json, settings or source files.
 */
export async function writeDeckFile(
  relPath: string,
  deck: Record<string, unknown>,
  opts: { inPlace?: boolean } = {}
): Promise<string> {
  const target = await assertWritablePathInCwd(relPath, "output_path");
  const existing = await lstat(target).catch(() => null);
  if (existing?.isDirectory()) throw new Error(`'output_path' is a directory: ${relPath}`);
  // In-place writes go back to the deck_path we just read as a deck, whatever its extension.
  if (!opts.inPlace && extname(target).toLowerCase() !== ".json") {
    throw new Error(`'output_path' must be a .json file: ${relPath}`);
  }
  if (existing) {
    if (!existing.isFile()) throw new Error(`'output_path' is not a regular file: ${relPath}`);
    if (existing.size > MAX_DECK_FILE_BYTES) throw new Error(`'output_path' is too large to be a deck: ${relPath}`);
    let current: unknown;
    try {
      current = JSON.parse(await readFile(target, "utf-8"));
    } catch {
      current = null;
    }
    if (!isDeckObject(current)) {
      throw new Error(`'output_path' exists and is not a deck; refusing to overwrite it: ${relPath}`);
    }
  }

  const tmp = join(dirname(target), `.${basename(target)}.${randomUUID()}.tmp`);
  // "wx": fail if anything (file or symlink) already sits at the temp name.
  const handle = await open(tmp, "wx", 0o644);
  try {
    await handle.writeFile(JSON.stringify(deck, null, 2) + "\n", "utf-8");
  } finally {
    await handle.close();
  }
  try {
    await rename(tmp, target);
  } catch (err) {
    await unlink(tmp).catch(() => undefined);
    throw err;
  }
  return target;
}
