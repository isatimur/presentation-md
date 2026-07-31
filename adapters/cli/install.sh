#!/usr/bin/env bash
# install.sh — CLI adapter for presentation-md
# Prints render CLI usage and (full mode) installs deck-design-judge scripts locally.
# Usage:  PMD_CORE_DIR=<path> bash install.sh [full|lite]
set -euo pipefail

MODE="${1:-full}"
: "${PMD_CORE_DIR:?PMD_CORE_DIR must be set to the @presentation-md/core directory}"

echo "presentation-md › cli adapter"
echo "  mode:   $MODE"
echo ""

echo "  Render CLI (no install step required):"
echo "    npx @presentation-md/render deck.json -o deck.html"
echo "    npx @presentation-md/render --list-themes"
echo "    npx @presentation-md/render --validate deck.json"
echo ""

# ── full mode: deck-design-judge quality gate ────────────────────────────────
if [ "$MODE" = "full" ] && [ -n "${PMD_JUDGE_SKILL_DIR:-}" ]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  JUDGE_TARGET="${PMD_CLI_JUDGE_DIR:-$HOME/.presentation-md/skills/deck-design-judge}"
  bash "$SCRIPT_DIR/../_common/install-judge-skill.sh" "$JUDGE_TARGET"
  echo "  Judge scripts:"
  echo "    bash $JUDGE_TARGET/scripts/render_slides.sh deck.html shots/"
  echo "    python3 $JUDGE_TARGET/scripts/deck_metrics.py deck.html"
  echo "  Or use MCP judge_deck via: npx -y @presentation-md/mcp-server"
fi

if [ "$MODE" = "lite" ]; then
  echo "  (lite mode — judge skill not installed)"
fi

echo ""
echo "Done."
