# presentation-md — Cursor adapter

Installs the `presentation-generator` rule into Cursor so the agent can turn rough notes into polished HTML slide decks on demand.

## What gets installed

| Mode | What happens |
|------|-------------|
| **full** (default) | Writes `~/.cursor/rules/presentation-generator.mdc` (Cursor rule) **and** registers the MCP server in `~/.cursor/mcp.json`, enabling all **13** MCP tools: `render_deck`, `export_deck`, `audit_deck`, `judge_deck`, `list_themes`, `apply_theme`, `generate_deck_prompt`, `scaffold_deck`, `share_deck_link`, `preview_themes`, `import_pptx`, `import_markdown`, `import_brand_theme`. |
| **lite** | Writes the `.mdc` rule only — no MCP server. Cursor uses the deck-spec CLI path or direct-HTML fallback. |

The `.mdc` file contains the full skill definition (trigger description + instructions). Cursor picks it up as an agent rule that can be toggled per chat session.

## Install

### Via the install CLI (recommended)

```bash
# full (MCP tools enabled)
npx @presentation-md/install cursor

# lite (rule only, no MCP)
npx @presentation-md/install cursor lite
```

### Manual — bash (macOS / Linux)

```bash
PMD_CORE_DIR=/path/to/node_modules/@presentation-md/core bash install.sh full
```

### Manual — PowerShell (Windows)

```powershell
$env:PMD_CORE_DIR = "C:\path\to\node_modules\@presentation-md\core"
.\install.ps1 full
```

## Where the rule lands

```
~/.cursor/
  rules/
    presentation-generator.mdc   ← Cursor agent rule
  mcp.json                        ← MCP server entry (full mode only)
```

## After installing

Restart Cursor. In a chat, enable the `presentation-generator` rule (or leave it off for on-demand use). Then ask:

> "Build me a 12-slide product demo deck in the retro-arcade theme."

## Uninstall

```bash
rm ~/.cursor/rules/presentation-generator.mdc
# edit ~/.cursor/mcp.json to remove the presentation-md entry if needed
```
