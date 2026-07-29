# presentation-md — Gemini CLI adapter

Installs the `presentation-generator` skill as a Gemini CLI extension so the agent can turn rough notes into polished HTML slide decks on demand.

## What gets installed

| Mode | What happens |
|------|-------------|
| **full** (default) | Writes `SKILL.md` + `extension.json` to `~/.gemini/extensions/presentation-generator/` **and** registers the MCP server in `~/.gemini/settings.json`. |
| **lite** | Writes the extension files only — no MCP server. |

The `extension.json` tells Gemini CLI to load `SKILL.md` as a skill definition. With full mode, MCP tools such as `render_deck`, `export_deck`, `audit_deck`, `list_themes`, `apply_theme`, `import_pptx`, and `import_brand_theme` are also available.

## Install

### Via the install CLI (recommended)

```bash
# full (MCP tools enabled)
npx @presentation-md/install gemini-cli

# lite (extension only, no MCP)
npx @presentation-md/install gemini-cli lite
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

## Where the extension lands

```
~/.gemini/
  extensions/
    presentation-generator/
      SKILL.md          ← skill definition
      extension.json    ← Gemini CLI extension manifest
  settings.json         ← MCP server entry (full mode only)
```

## After installing

Restart Gemini CLI. Ask:

> "Create a 10-slide deck about our Q3 product roadmap. Use the luxury-minimalist theme."

## Uninstall

```bash
rm -rf ~/.gemini/extensions/presentation-generator
# edit ~/.gemini/settings.json to remove the presentation-md entry if needed
```
