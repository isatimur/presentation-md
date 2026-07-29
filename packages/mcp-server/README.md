# @presentation-md/mcp-server

MCP server that exposes presentation-md tools to any MCP-compatible AI agent (Claude Code, Cursor, etc.).

## Install

```bash
npx @presentation-md/mcp-server
```

## Add to Claude Code

Add to your project's `.claude/mcp.json` (or `~/.claude/mcp.json` for global):

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

## Tools

| Tool | Description |
|------|-------------|
| `render_deck` | Render a deck JSON spec to a self-contained HTML slide deck; optionally write to a file. |
| `export_deck` | Export deck JSON to native, editable PowerPoint (`.pptx`) or HTML. |
| `list_themes` | List all installed themes with name, version, vibe, and description. |
| `apply_theme` | Swap the theme in `meta.theme` while keeping all slide content unchanged. |
| `audit_deck` | Validate deck JSON against the schema and return structured issues with severity. |
| `generate_deck_prompt` | Build a system prompt with the active theme's palette and deck schema reference for an agent. |
| `preview_themes` | Render 3 one-slide HTML previews for visual theme discovery (show-don't-tell). |
| `import_pptx` | Import a `.pptx` file into deck JSON (text, tables, images, notes → layouts). |
| `import_brand_theme` | Generate a theme from a brand's URL or CSS file, with a contrast-safety pass. |

Note: when using `import_brand_theme` with a local CSS file, the `cssPath` parameter must be a `.css` file that resolves within the MCP server's working directory. Likewise, `import_pptx`'s `pptx_path` must be a `.pptx` within the working directory.
