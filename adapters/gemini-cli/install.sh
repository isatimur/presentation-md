#!/usr/bin/env bash
# install.sh — Gemini CLI adapter for presentation-md
# Usage:  PMD_CORE_DIR=<path> bash install.sh [full|lite]
set -euo pipefail

MODE="${1:-full}"
: "${PMD_CORE_DIR:?PMD_CORE_DIR must be set to the @presentation-md/core directory}"

TARGET="$HOME/.gemini/extensions/presentation-generator"
GEMINI_SETTINGS="$HOME/.gemini/settings.json"

echo "presentation-md › gemini-cli adapter"
echo "  mode:   $MODE"
echo "  target: $TARGET"
echo ""

# ── copy skill file ───────────────────────────────────────────────────────────
mkdir -p "$TARGET"

cp "$PMD_CORE_DIR/SKILL.md" "$TARGET/SKILL.md"
echo "  ✓  SKILL.md copied"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
bash "$SCRIPT_DIR/../_common/install-skill-scripts.sh" "$TARGET"

# ── write extension.json ──────────────────────────────────────────────────────
cat > "$TARGET/extension.json" <<'JSON'
{
  "name": "presentation-generator",
  "version": "0.1.0",
  "description": "Generate polished HTML slide decks from notes.",
  "skills": [
    { "path": "./SKILL.md" }
  ]
}
JSON
echo "  ✓  extension.json written"

# ── full mode: deck-design-judge quality gate ────────────────────────────────
if [ "$MODE" = "full" ] && [ -n "${PMD_JUDGE_SKILL_DIR:-}" ]; then
  JUDGE_TARGET="$HOME/.gemini/extensions/deck-design-judge"
  bash "$SCRIPT_DIR/../_common/install-judge-skill.sh" "$JUDGE_TARGET"
  cat > "$JUDGE_TARGET/extension.json" <<'JSON'
{
  "name": "deck-design-judge",
  "version": "0.1.0",
  "description": "Design quality gate for presentation-md decks (contrast, overflow, rubric).",
  "skills": [
    { "path": "./SKILL.md" }
  ]
}
JSON
  echo "  ✓  deck-design-judge extension.json written"
fi

# ── full mode: register MCP server in settings.json ──────────────────────────
if [ "$MODE" = "full" ]; then
  if [ -f "$GEMINI_SETTINGS" ]; then
    EXISTING=$(cat "$GEMINI_SETTINGS")
    UPDATED=$(node -e "
      const cfg = JSON.parse(process.argv[1]);
      cfg.mcpServers = cfg.mcpServers || {};
      // Migrate legacy 5-tool package name → full @presentation-md/mcp-server (13 tools).
      delete cfg.mcpServers['presentation-skill-pack'];
      cfg.mcpServers['presentation-md'] = {
        command: 'npx',
        args: ['-y', '@presentation-md/mcp-server']
      };
      process.stdout.write(JSON.stringify(cfg, null, 2));
    " "$EXISTING")
    printf '%s\n' "$UPDATED" > "$GEMINI_SETTINGS"
  else
    mkdir -p "$(dirname "$GEMINI_SETTINGS")"
    cat > "$GEMINI_SETTINGS" <<'JSON'
{
  "mcpServers": {
    "presentation-md": {
      "command": "npx",
      "args": ["-y", "@presentation-md/mcp-server"]
    }
  }
}
JSON
  fi
  echo "  ✓  MCP server registered in ~/.gemini/settings.json"
fi

echo ""
echo "Done. Restart Gemini CLI to pick up the changes."
if [ "$MODE" = "lite" ]; then
  echo "  (lite mode — MCP server not registered)"
fi
