#!/usr/bin/env node
/**
 * Deprecated redirect: @presentation-skill-pack/mcp-server → @presentation-md/mcp-server.
 * Keeps old npx / MCP configs alive while agents migrate to the 11-tool package.
 */
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";

const require = createRequire(import.meta.url);

process.stderr.write(
  "[deprecated] @presentation-skill-pack/mcp-server → use @presentation-md/mcp-server (13 tools). Restart your MCP client after switching.\n"
);

let pkgJsonPath;
try {
  pkgJsonPath = require.resolve("@presentation-md/mcp-server/package.json");
} catch {
  process.stderr.write(
    "[deprecated] @presentation-md/mcp-server is not installed. Run: npm i -g @presentation-md/mcp-server\n"
  );
  process.exit(1);
}

const pkgDir = dirname(pkgJsonPath);
const pkg = require(pkgJsonPath);
const binRel =
  typeof pkg.bin === "string"
    ? pkg.bin
    : (pkg.bin && pkg.bin["presentation-md-mcp"]) || "./dist/server.js";
const serverPath = join(pkgDir, binRel);

const child = spawn(process.execPath, [serverPath, ...process.argv.slice(2)], {
  stdio: "inherit",
  env: process.env,
});
child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
