#!/usr/bin/env bash
# Copy bundled presentation-generator scripts (PDF / deploy) into the skill target.
# Requires PMD_CORE_DIR (set by @presentation-md/install).
set -euo pipefail

TARGET="${1:?Usage: install-skill-scripts.sh <target-skill-dir>}"
: "${PMD_CORE_DIR:?PMD_CORE_DIR must be set to the @presentation-md/core directory}"

SCRIPTS_SRC="$PMD_CORE_DIR/scripts"
if [ ! -d "$SCRIPTS_SRC" ]; then
  echo "  ⚠  no scripts/ in @presentation-md/core — skipping PDF/deploy helpers"
  exit 0
fi

mkdir -p "$TARGET/scripts"
# Copy every source helper (*.sh, *.mjs, package.json), not a fixed list:
# export-pdf.mjs imports pdf-security.mjs and deploy.sh runs
# check-local-assets.mjs, so a partial copy breaks PDF export and the deploy
# guard. Playwright installs on first export-pdf run.
shopt -s nullglob
for src in "$SCRIPTS_SRC"/*.sh "$SCRIPTS_SRC"/*.mjs "$SCRIPTS_SRC"/package.json; do
  cp "$src" "$TARGET/scripts/$(basename "$src")"
done
shopt -u nullglob
chmod +x "$TARGET/scripts/"*.sh 2>/dev/null || true
echo "  ✓  scripts/ copied (export-pdf + deploy)"
