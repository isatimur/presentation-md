import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("package is marked deprecated and depends on @presentation-md/mcp-server", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  assert.equal(pkg.name, "@presentation-skill-pack/mcp-server");
  assert.match(String(pkg.deprecated ?? ""), /presentation-md\/mcp-server/);
  assert.ok(pkg.dependencies["@presentation-md/mcp-server"]);
});

test("bin redirects with a deprecation warning", () => {
  const bin = readFileSync(join(root, "bin.js"), "utf8");
  assert.match(bin, /deprecated/);
  assert.match(bin, /@presentation-md\/mcp-server/);
  assert.match(bin, /spawn/);
});
