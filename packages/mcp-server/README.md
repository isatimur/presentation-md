# @presentation-md/mcp-server

MCP server that exposes **14** presentation-md tools to any MCP-compatible AI agent (Claude Code, Cursor, etc.).

## Install

```bash
npx -y @presentation-md/mcp-server
```

> **Migration:** `@presentation-skill-pack/mcp-server` is deprecated. `0.1.0` only shipped 5 tools;
> `0.2.0+` is a thin redirect stub that warns and starts this package. Point clients at
> `@presentation-md/mcp-server` for the full 14-tool set (`export_deck`, `judge_deck`, `scaffold_deck`, `share_deck_link`, `deploy_deck`, `import_*`,
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
| `export_deck` | Export deck JSON to native, editable PowerPoint (`.pptx`), vector PDF, HTML, Marp Markdown, or speaker-notes handouts (`notes_txt` / `notes_vtt`). |
| `list_themes` | List installed themes (name, version, vibe, description). Optional `shortlist` / `browse` (site/Studio mood chips) / `mood` / `query` filters + `include_shortlists` / `include_browse_filters`. Every theme includes `preview_url` + `studio_url` (`?example=` for stunning-25, `?theme=` otherwise). Returns `suggested_preview` (safe/bold/wildcard trio) for one-shot Theme Discovery. |
| `apply_theme` | Swap `meta.theme` (default: also `repairCraft` for theme-honesty / craft floors; Studio My deck Use parity). |
| `audit_deck` | Schema validate **plus** craft gates (asymmetry, loud/atmosphere/paper honesty, dual CTA, data beats). Optional `apply_safe_fixes` auto-repairs structural craft **and inserts missing beats** (image-hero / comparison / data / logo-wall / wrap tones) — returns `json` + `fixes_applied[]`. Optional `remorph_density` (`speaker`/`reading`) runs a non-LLM structural density remorph (split crowded lists / promote notes) before audit. Schema-valid ≠ shippable — call before the user sees a first draft. |
| `judge_deck` | Craft QA tiers: `t1` schema gates, `t2` HTML metrics + screenshots (**inline PNGs** by default), `t3` agent rubric / panel when keys exist. |
| `generate_deck_prompt` | Build a one-shot craft system prompt (theme palette, anti-slop, layout recipes, custom-html recipes, shortlists) + optional `density` (`speaker` / `reading`) lock. |
| `scaffold_deck` | Scaffold a schema-native Deck JSON skeleton from a layout recipe (`purpose`: pitch / launch / wrap / paper / …). Pre-wires layouts, asymmetry, dual CTA, notes — agents fill copy, then `audit_deck`. Pass `list_purposes: true` for the catalog. |
| `share_deck_link` | Encode Deck JSON into a Studio `?d=` share URL (same codec as Copy link) for editable handoff after scaffold / audit / apply_theme. |
| `deploy_deck` | Opt-in Vercel preview via core `deploy.sh` — dry-run unless `confirm:true` after human approval; `prod` needs `confirm_prod`. |
| `preview_themes` | Render 1–3 theme HTML previews for visual discovery. Pass `themes[]` and/or `shortlist` id (fills themes from theme-shortlists.json). **Pick-3 (≥2 themes) auto-defaults to `mode: "layouts"`** (multi-slide craft bake); pass `mode: "title"` only for a cover skim. Pass **`json`** (Deck JSON) for Studio **My deck** restyle across the pick (optional `slide_index`). Title-mode trios return `layouts_recommended`. **Inline PNG screenshots** return as MCP image content by default — set `include_screenshots:false` to skip. Each preview also includes `file_url`, `studio_share_url` (`?d=` for the exact bake), `compare_summary` (mood/swatches/vibe), proof deep-links, and layout bake list. |
| `import_pptx` | Import a `.pptx` file into deck JSON (text, tables, images, notes → layouts). |
| `import_markdown` | Convert Markdown outline → Deck JSON (`chart` / `html` fences supported). |
| `import_brand_theme` | Generate a theme from a brand's URL or CSS file, with a contrast-safety pass. |

Note: filesystem inputs/outputs are confined to the MCP server's working directory (`cssPath`, `pptx_path`, `output_path`, `output_dir`, `assets_dir`). For `judge_deck` t3 live panel scoring, set `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` (or `PRESENTATION_MD_JUDGE_SCRIPTS` pointing at `skills/deck-design-judge/scripts`).
