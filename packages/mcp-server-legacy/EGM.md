# @presentation-skill-pack/mcp-server (deprecated)

## Overview

A redirect stub for the old package name. `bin.js` warns on stderr, finds the installed `@presentation-md/mcp-server`, and runs its server as a child process. Migration notes live in [./README.md](./README.md).

## Interface

- [package.json:bin] `presentation-skill-pack-mcp` and `presentation-md-mcp-legacy`, both pointing at `bin.js`.
- [bin.js] has no exports. It forwards all CLI arguments (`process.argv.slice(2)`) to the new server.

## Invariants

- [bin.js] exits with code 1 and prints an install hint when `require.resolve("@presentation-md/mcp-server/package.json")` fails.
- [bin.js] takes the server path from the `presentation-md-mcp` bin entry (or a string `bin`), and falls back to `./dist/server.js`.
- [bin.js] mirrors the child exit: it re-raises the child signal, or exits with the child code (default 1).

## Side Effects

- [bin.js] writes a `[deprecated]` warning to stderr on every start.
- [bin.js] spawns `process.execPath` on the resolved server with `stdio: "inherit"` and the parent environment.

## Verification

- Run: `pnpm --filter @presentation-skill-pack/mcp-server test`
