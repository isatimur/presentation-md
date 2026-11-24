import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

// An undefined var() voids the whole CSS declaration, so a misspelt name
// (--accent2 for --accent-2) silently drops theme effects with no error.
const shared = join(__dirname, "..", "..", "shared");
const sources = [
  readFileSync(join(shared, "base.css"), "utf-8"),
  readFileSync(join(shared, "surfaces.css"), "utf-8"),
  ...readdirSync(join(shared, "layouts")).map((f) => readFileSync(join(shared, "layouts", f), "utf-8")),
];
const all = sources.join("\n");

// Set at runtime by the renderer or by inline styles, not in the stylesheets.
const RUNTIME = new Set(["--reveal-delay", "--streak-cols", "--radius"]);

describe("shared CSS variables", () => {
  it("defines every custom property it uses", () => {
    const defined = new Set([...all.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
    const used = new Set([...all.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]));
    const missing = [...used].filter((v) => !defined.has(v) && !RUNTIME.has(v));
    expect(missing).toEqual([]);
  });
});
