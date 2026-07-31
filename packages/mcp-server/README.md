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
| `audit_deck` | Validate deck JSON against the schema and return structured issues with severity (incl. kinetic-wrap tone / visual-beat warnings). |
| `judge_deck` | Craft QA tiers: `t1` schema gates, `t2` HTML metrics + screenshots, `t3` agent rubric / panel when keys exist. |
| `generate_deck_prompt` | Build a system prompt with the active theme's palette and deck schema reference for an agent. |
| `preview_themes` | Render 1–3 theme HTML previews for visual discovery. Default = title slide; `mode: "layouts"` = multi-slide craft bake (image-hero, bento, ranked-list, stats, quote, code, closing; kinetic-wrapped injects tone). |
| `import_pptx` | Import a `.pptx` file into deck JSON (text, tables, images, notes → layouts). |
| `import_markdown` | Convert Markdown outline → Deck JSON (`chart` / `html` fences supported). |
| `import_brand_theme` | Generate a theme from a brand's URL or CSS file, with a contrast-safety pass. |

Note: when using `import_brand_theme` with a local CSS file, the `cssPath` parameter must be a `.css` file that resolves within the MCP server's working directory. Likewise, `import_pptx`'s `pptx_path` must be a `.pptx` within the working directory. For `judge_deck` t3 live panel scoring, set `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` (or `PRESENTATION_MD_JUDGE_SCRIPTS` pointing at `skills/deck-design-judge/scripts`).
