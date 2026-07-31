# @presentation-skill-pack/mcp-server (deprecated)

**This package is a redirect stub.** Use [`@presentation-md/mcp-server`](https://www.npmjs.com/package/@presentation-md/mcp-server) instead — it ships all **11** presentation-md MCP tools (`export_deck`, `judge_deck`, `import_*`, `preview_themes`, …).

```bash
npx -y @presentation-md/mcp-server
```

If an old MCP config still points here, the bin prints a deprecation warning on stderr and starts the new server (as long as `@presentation-md/mcp-server` resolves).

```json
{
  "mcpServers": {
    "presentation-md": {
      "command": "npx",
      "args": ["-y", "@presentation-md/mcp-server"]
    }
  }
}
```

Or re-run `npx @presentation-md/install cursor` / `claude-code`.
