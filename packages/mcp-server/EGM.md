# @presentation-md/mcp-server

## Overview

MCP server that exposes 14 presentation-md tools over stdio. The `presentation-md-mcp` bin runs `dist/server.js`. It depends on `@presentation-md/core`, `@presentation-md/render`, `@presentation-md/export`, `@presentation-md/create-theme`, and `@modelcontextprotocol/sdk`. Usage notes live in [./README.md](./README.md).

## Subdirectories & Boundaries

- src: [./src/EGM.md](./src/EGM.md) - stdio server (`server.ts`), tool registry `TOOLS`, and the 10 MiB input cap.
- src/tools: [./src/tools/EGM.md](./src/tools/EGM.md) - one `ToolDefinition` per tool (`render_deck`, `export_deck`, `judge_deck`, `preview_themes`, `deploy_deck`, the `import_*` tools, and more). All writes stay inside the cwd.
- src/lib: [./src/lib/EGM.md](./src/lib/EGM.md) - cwd path checks, theme dir lookup, rich results with an 8 MiB inline image cap.
- tests (unlinked): vitest suites.

## Verification

- Run: `pnpm --filter @presentation-md/mcp-server test`
