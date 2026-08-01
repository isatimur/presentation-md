#!/usr/bin/env bash
# install.sh — Cursor adapter for presentation-md
# Usage:  PMD_CORE_DIR=<path> bash install.sh [full|lite]
set -euo pipefail

MODE="${1:-full}"
: "${PMD_CORE_DIR:?PMD_CORE_DIR must be set to the @presentation-md/core directory}"

TARGET_DIR="$HOME/.cursor/rules"
TARGET_FILE="$TARGET_DIR/presentation-generator.mdc"

echo "presentation-md › cursor adapter"
echo "  mode:   $MODE"
echo "  target: $TARGET_FILE"
echo ""

mkdir -p "$TARGET_DIR"

# ── read SKILL.md content ─────────────────────────────────────────────────────
SKILL_CONTENT=$(cat "$PMD_CORE_DIR/SKILL.md")

# Strip the YAML front-matter from SKILL.md (lines between the two `---` fences)
# so we don't embed it twice — Cursor's .mdc has its own frontmatter.
SKILL_BODY=$(printf '%s' "$SKILL_CONTENT" | awk '
  /^---$/ && !seen { seen=1; in_front=1; next }
  in_front && /^---$/ { in_front=0; next }
  !in_front { print }
')

# ── write .mdc rules file ─────────────────────────────────────────────────────
cat > "$TARGET_FILE" <<EOF
---
description: Generate a complete polished HTML slide deck from rough notes or structured content.
globs: []
alwaysApply: false
---

$SKILL_BODY
EOF

echo "  ✓  presentation-generator.mdc written"

# ── full mode: deck-design-judge quality gate ────────────────────────────────
if [ "$MODE" = "full" ] && [ -n "${PMD_JUDGE_SKILL_DIR:-}" ]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  bash "$SCRIPT_DIR/../_common/install-judge-skill.sh" "$HOME/.cursor/skills/deck-design-judge"
fi

# ── full mode: register MCP server ───────────────────────────────────────────
if [ "$MODE" = "full" ]; then
  MCP_CONFIG="$HOME/.cursor/mcp.json"

  if [ -f "$MCP_CONFIG" ]; then
    EXISTING=$(cat "$MCP_CONFIG")
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
    printf '%s\n' "$UPDATED" > "$MCP_CONFIG"
  else
    mkdir -p "$(dirname "$MCP_CONFIG")"
    cat > "$MCP_CONFIG" <<'JSON'
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
  echo "  ✓  MCP server registered in ~/.cursor/mcp.json"
fi

echo ""
echo "Done. Restart Cursor to pick up the rule and MCP changes."
if [ "$MODE" = "lite" ]; then
  echo "  (lite mode — MCP server not registered)"
fi
