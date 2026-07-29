#!/usr/bin/env bash
# install.sh — Claude Code adapter for presentation-md
# Usage:  PMD_CORE_DIR=<path> bash install.sh [full|lite]
set -euo pipefail

MODE="${1:-full}"
: "${PMD_CORE_DIR:?PMD_CORE_DIR must be set to the @presentation-md/core directory}"

TARGET="$HOME/.claude/skills/presentation-generator"

echo "presentation-md › claude-code adapter"
echo "  mode:   $MODE"
echo "  target: $TARGET"
echo ""

# ── copy skill files ──────────────────────────────────────────────────────────
mkdir -p "$TARGET/references"

cp "$PMD_CORE_DIR/SKILL.md" "$TARGET/SKILL.md"
echo "  ✓  SKILL.md copied"

if [ -d "$PMD_CORE_DIR/references" ]; then
  cp -r "$PMD_CORE_DIR/references/." "$TARGET/references/"
  echo "  ✓  references/ copied"
fi

# ── full mode: register MCP server ───────────────────────────────────────────
if [ "$MODE" = "full" ]; then
  MCP_CONFIG="$HOME/.claude/mcp.json"

  if [ -f "$MCP_CONFIG" ]; then
    # merge — add or overwrite the presentation-md key
    EXISTING=$(cat "$MCP_CONFIG")
    UPDATED=$(node -e "
      const cfg = JSON.parse(process.argv[1]);
      cfg.mcpServers = cfg.mcpServers || {};
      cfg.mcpServers['presentation-md'] = {
        command: 'npx',
        args: ['@presentation-md/mcp-server']
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
      "args": ["@presentation-md/mcp-server"]
    }
  }
}
JSON
  fi
  echo "  ✓  MCP server registered in ~/.claude/mcp.json"
fi

echo ""
echo "Done. Restart Claude Code to pick up the changes."
if [ "$MODE" = "lite" ]; then
  echo "  (lite mode — MCP server not registered; use the deck-spec CLI path or"
  echo "   re-run with 'full' to enable MCP tools)"
fi
