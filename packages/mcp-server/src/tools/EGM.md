# mcp-server tools

## Overview

Each file defines one MCP tool as a `ToolDefinition` (`name`, `description`, `inputSchema`, `handler`). `../server.ts` registers all fourteen in `TOOLS`. The tools are thin adapters: they check input, call `@presentation-md/core`, `@presentation-md/render`, `@presentation-md/export/import`, or `@presentation-md/create-theme`, and return JSON or a rich result with inline images.

## Interface

| Tool name | Symbol | Main inputs |
|-----------|--------|-------------|
| `render_deck` | [render-deck.ts:renderDeckTool] | `json` (required), `theme`, `output_path` |
| `export_deck` | [export-deck.ts:exportDeckTool] | `json` (required), `format` (`pptx` default, `html`, `pdf`, `md`, `markdown`, `notes_txt`, `notes_vtt`, `txt`, `vtt`), `theme`, `output_path` |
| `list_themes` | [list-themes.ts:listThemesTool] | `shortlist`, `browse`, `mood`, `query`, `include_shortlists`, `include_browse_filters` |
| `apply_theme` | [apply-theme.ts:applyThemeTool] | `json`, `target_theme` (both required), `apply_safe_fixes` |
| `audit_deck` | [audit-deck.ts:auditDeckTool] | `json` (required), `apply_safe_fixes`, `remorph_density` |
| `judge_deck` | [judge-deck.ts:judgeDeckTool] | `json` or `html`, `tier` (`t0`..`t3`), `theme`, `shots_dir`, `skip_screenshots`, `include_inline_images`, `max_inline_images`, `max_slides` |
| `generate_deck_prompt` | [generate-deck-prompt.ts:generateDeckPromptTool] | `theme`, `intent`, `density` |
| `scaffold_deck` | [scaffold-deck.ts:scaffoldDeckTool] | `purpose`, `theme`, `title`, `company`, `output_path`, `list_purposes`, `include_share_url`, `origin` |
| `share_deck_link` | [share-deck-link.ts:shareDeckLinkTool] | `json` (required), `origin`, `pathname`, `relative`, `include_token` |
| `deploy_deck` | [deploy-deck.ts:deployDeckTool] | `path` (required), `confirm`, `prod`, `confirm_prod` |
| `import_brand_theme` | [import-brand-theme.ts:importBrandThemeTool] | `url`, `cssPath` or `pptxPath`, `allowOfficeDefault`, `name`, `write`, `output_dir` |
| `import_pptx` | [import-pptx.ts:importPptxTool] | `pptx_path` or `pptx_base64`, `theme`, `output_path`, `assets_dir` |
| `import_markdown` | [import-markdown.ts:importMarkdownTool] | `markdown` (required), `theme`, `title`, `output_path` |
| `preview_themes` | [preview-themes.ts:previewThemesTool] | `themes` (1-3), `shortlist`, `title`, `company`, `mode` (`title`, `layouts`, `deck`), `json`, `slide_index`, `include_screenshots`, `output_dir` |

- [judge-deck.ts:MAX_JUDGE_PANEL_JSON_BYTES] is 1 MiB. [judge-deck.ts:readBoundedJudgePanelJson] reads a panel result file under that cap.

## Invariants

- Every `output_path`, `output_dir`, and `assets_dir` passes [../lib/cwd-path.ts:assertWritablePathInCwd] before a write ([render-deck.ts:renderDeckTool], [export-deck.ts:exportDeckTool], [preview-themes.ts:previewThemesTool], [import-pptx.ts:importPptxTool], [import-brand-theme.ts:importBrandThemeTool]).
- Input paths pass [../lib/cwd-path.ts:assertExistingPathInCwd] ([deploy-deck.ts:deployDeckTool] `path`, [import-brand-theme.ts:importBrandThemeTool] `cssPath`). OOXML paths pass [../lib/cwd-path.ts:assertOoxmlPathInCwd], which checks the extension first ([import-pptx.ts:importPptxTool] `pptx_path` `.pptx`; [import-brand-theme.ts:importBrandThemeTool] `pptxPath` `.pptx`/`.potx`).
- [export-deck.ts:exportDeckTool] lowercases `format` and throws `Unknown format` for any value outside the nine allowed.
- [deploy-deck.ts:deployDeckTool] passes `confirm`, `prod`, and `confirm_prod` as `true` only when the input is the boolean `true`.
- [import-pptx.ts:importPptxTool] takes exactly one of `pptx_path` or `pptx_base64`. A path must end in `.pptx`. Sizes pass `assertZipArchiveSafe`. Decoded base64 must start with `PK`.
- [import-brand-theme.ts:importBrandThemeTool] takes exactly one of `url`, `cssPath` or `pptxPath` (`Provide one of …` / `Provide only one of …`). `cssPath` must end in `.css` and needs `name`. Without `name`, a `pptxPath` name comes from the file name (`deriveNameFromPath`). `name` passes `validateThemeName`. With `write: true`, an `office-default` result throws `office-default: …` unless `allowOfficeDefault` is `true`. The response always has `fonts` and `warnings`; `logo` and `scheme` are `null` except for templates, and `logo` never holds image bytes.
- [audit-deck.ts:auditDeckTool] returns `{valid:false, issues}` on bad JSON and does not throw.
- [share-deck-link.ts:shareDeckLinkTool] throws unless `isShareDeck` accepts `json`.
- [scaffold-deck.ts:scaffoldDeckTool] throws `Unknown purpose` for a purpose that does not resolve.
- [judge-deck.ts:parseTier] defaults to `t1`. A `t0`/`t1` pass needs a valid schema and zero `gate` flags.
- [judge-deck.ts:judgeDeckTool] runs the `t3` panel only when the panel script resolves, one of `ANTHROPIC_API_KEY`, `OPENROUTER_API_KEY`, `OPENAI_API_KEY` is set, and the rendered HTML exists. Otherwise it returns a local draft from [judge-deck.ts:draftLocalPanel].
- [judge-deck.ts:judgePanelTimeoutMs] defaults to 180000 ms and throws if `PRESENTATION_MD_JUDGE_TIMEOUT_MS` is not a positive integer.
- [preview-themes.ts:previewThemesTool] uses at most 3 themes, clamps `slide_index` to the slide range, and needs `json` for `deck` mode.

## Side Effects

- Writes files only when an output path is given: [render-deck.ts:renderDeckTool], [export-deck.ts:exportDeckTool], [import-markdown.ts:importMarkdownTool], [import-pptx.ts:importPptxTool], [scaffold-deck.ts:scaffoldDeckTool].
- [preview-themes.ts:previewThemesTool] creates `output_dir` (default `.presentation-md/theme-previews`), writes one HTML file per theme, and calls `screenshotSlides` into `<output_dir>/<theme>-shots`.
- [judge-deck.ts:judgeDeckTool] writes `deck.html` to `shots_dir` or a `pmd-judge-<hex>` temp dir, calls `screenshotSlides`, and for `t3` spawns `python3` with `judge_panel.py` ([judge-deck.ts:runPythonJson]). The child inherits the parent environment.
- [judge-deck.ts:resolveJudgeScriptsDir] reads `PRESENTATION_MD_JUDGE_SCRIPTS`.
- [deploy-deck.ts:deployDeckTool] calls `deployDeck` from `@presentation-md/render`, which spawns `deploy.sh`.
- [import-brand-theme.ts:importBrandThemeTool] calls `extractBrand` (`@presentation-md/create-theme`) on a URL, CSS file or PowerPoint template, and `scaffoldTheme` writes a theme when `write` is true.
- [list-themes.ts:listThemesTool] reads theme metadata from the bundled themes dir and `process.cwd()`.

## Verification

- Run: `pnpm --filter @presentation-md/mcp-server test`
