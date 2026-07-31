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
# Copy source helpers only (Playwright installs on first export-pdf run).
for f in export-pdf.sh export-pdf.mjs deploy.sh package.json; do
  if [ -f "$SCRIPTS_SRC/$f" ]; then
    cp "$SCRIPTS_SRC/$f" "$TARGET/scripts/$f"
  fi
done
chmod +x "$TARGET/scripts/"*.sh 2>/dev/null || true
echo "  ✓  scripts/ copied (export-pdf + deploy)"
