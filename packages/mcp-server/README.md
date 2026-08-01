# @presentation-md/mcp-server

MCP server that exposes **11** presentation-md tools to any MCP-compatible AI agent (Claude Code, Cursor, etc.).

## Install

```bash
npx -y @presentation-md/mcp-server
```

> **Migration:** `@presentation-skill-pack/mcp-server` is deprecated. `0.1.0` only shipped 5 tools;
> `0.2.0+` is a thin redirect stub that warns and starts this package. Point clients at
> `@presentation-md/mcp-server` for the full 11-tool set (`export_deck`, `judge_deck`, `import_*`,
> `preview_themes`, …) without the redirect hop.

## Add to Claude Code / Cursor

Add to the project's MCP config (or `~/.claude/mcp.json` / `~/.cursor/mcp.json` for global):

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

If you still have a `presentation-skill-pack` entry pointing at `@presentation-skill-pack/mcp-server`,
replace it with the block above (or re-run `npx @presentation-md/install cursor` / `claude-code`).

## Tools

| Tool | Description |
|------|-------------|
| `render_deck` | Render a deck JSON spec to a self-contained HTML slide deck; optionally write to a file. |
| `export_deck` | Export deck JSON to native, editable PowerPoint (`.pptx`), vector PDF, or HTML. |
| `list_themes` | List installed themes (name, version, vibe, description). Optional `shortlist` / `browse` (site/Studio mood chips) / `mood` / `query` filters + `include_shortlists` / `include_browse_filters`. Returns `suggested_preview` (safe/bold/wildcard trio) for one-shot Theme Discovery. |
| `apply_theme` | Swap the theme in `meta.theme` while keeping all slide content unchanged. |
| `audit_deck` | Schema validate **plus** craft gates (asymmetry, loud/atmosphere/paper honesty, dual CTA, data beats). Schema-valid ≠ shippable — call before the user sees a first draft. |
| `judge_deck` | Craft QA tiers: `t1` schema gates, `t2` HTML metrics + screenshots, `t3` agent rubric / panel when keys exist. |
| `generate_deck_prompt` | Build a one-shot craft system prompt (theme palette, anti-slop, layout recipes, custom-html recipes, shortlists) + optional `density` (`speaker` / `reading`) lock. |
| `preview_themes` | Render 1–3 theme HTML previews for visual discovery. Pass `themes[]` and/or `shortlist` id (fills themes from theme-shortlists.json). **Pick-3 (≥2 themes) auto-defaults to `mode: "layouts"`** (multi-slide craft bake); pass `mode: "title"` only for a cover skim. Title-mode trios return `layouts_recommended`. Each preview includes `file_url`, `compare_summary` (mood/swatches/vibe), proof deep-links, and layout bake list — agent DX without inline PNGs. |
| `import_pptx` | Import a `.pptx` file into deck JSON (text, tables, images, notes → layouts). |
| `import_markdown` | Convert Markdown outline → Deck JSON (`chart` / `html` fences supported). |
| `import_brand_theme` | Generate a theme from a brand's URL or CSS file, with a contrast-safety pass. |

Note: filesystem inputs/outputs are confined to the MCP server's working directory (`cssPath`, `pptx_path`, `output_path`, `output_dir`, `assets_dir`). For `judge_deck` t3 live panel scoring, set `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` (or `PRESENTATION_MD_JUDGE_SCRIPTS` pointing at `skills/deck-design-judge/scripts`).
