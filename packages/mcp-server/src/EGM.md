# mcp-server src

## Overview

`server.ts` is the MCP stdio server. It holds the tool registry and routes `tools/list` and `tools/call` requests to the tool handlers.

## Interface

- [server.ts:ToolDefinition] interface `{ name, description, inputSchema, handler(input) }`.
- [server.ts:TOOLS] the registry of 14 tools. [server.ts:TOOL_NAMES] maps it to names. [server.ts:listToolDefinitions] returns it.
- [server.ts:MAX_MCP_TOOL_INPUT_BYTES] is 10 MiB. [server.ts:assertMcpToolInputSize] enforces it.
- [server.ts:main] creates the `Server` (`name: "presentation-md"`) with `ListToolsRequestSchema` and `CallToolRequestSchema` handlers on a `StdioServerTransport`.
- Tools: [./tools/EGM.md](./tools/EGM.md).
- Helpers: [./lib/EGM.md](./lib/EGM.md).

## Invariants

- [server.ts:assertMcpToolInputSize] throws when the serialized tool arguments exceed 10 MiB.
- The `CallToolRequestSchema` handler in [server.ts:main] returns `isError` text `Unknown tool: <name>` for an unknown name, and returns any thrown error as `isError` text, not as a protocol error.
- For a rich result ([./lib/rich-result.ts:isRichToolResult]), [server.ts:main] emits image blocks first, then the JSON text.
- [server.ts:isDirectRun] starts the server only when `process.argv[1]` ends in `server.js`/`server.ts` or contains `presentation-md-mcp`. A start failure exits with code 1.

## Side Effects

- [server.ts:main] reads MCP requests on stdin and writes responses on stdout.
- [server.ts:isDirectRun] writes a fatal start error to stderr.
- Tool side effects: see [./tools/EGM.md](./tools/EGM.md).

## Verification

- Run: `pnpm --filter @presentation-md/mcp-server test`
