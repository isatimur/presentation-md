#!/usr/bin/env bash
# Export a presentation-md HTML deck to a vector PDF (one page per
# slide, selectable text) using headless Chromium's native print pipeline.
#
# Usage:
#   bash scripts/export-pdf.sh ./deck.html
#   bash scripts/export-pdf.sh ./deck.html ./output.pdf
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

usage() {
  cat <<'EOF'
Usage: export-pdf.sh <deck.html> [output.pdf]

Renders a presentation-md HTML deck to PDF via headless Chromium's
native print pipeline (vector output, selectable text — not a screenshot).
Installs Playwright + Chromium on first run if not already available.
EOF
}

if [[ $# -lt 1 || "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ ! -f "$1" ]]; then
  echo "error: input file not found: $1" >&2
  exit 1
fi
INPUT="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"

if [[ $# -ge 2 ]]; then
  mkdir -p "$(dirname "$2")"
  OUTPUT="$(cd "$(dirname "$2")" && pwd)/$(basename "$2")"
else
  OUTPUT="${INPUT%.html}.pdf"
fi

command -v npm >/dev/null 2>&1 || {
  echo "error: npm not found — install Node.js first" >&2
  exit 1
}

# First-run install. npm creates node_modules/playwright before the install
# finishes, so a parallel run must not take that folder as "installed". Only a
# marker written after a successful install counts, and an atomic mkdir lock
# lets one process install while the others wait.
INSTALLED="$SCRIPT_DIR/node_modules/.pmd-playwright-installed"
LOCK="$SCRIPT_DIR/.pmd-install.lock"
if [[ ! -f "$INSTALLED" ]]; then
  waited=0
  until mkdir "$LOCK" 2>/dev/null; do
    [[ -f "$INSTALLED" ]] && break
    # A lock older than the wait limit belongs to a killed run: take it over.
    if (( waited >= 300 )); then
      rm -rf "$LOCK"
      continue
    fi
    sleep 1
    waited=$((waited + 1))
  done
  if [[ ! -f "$INSTALLED" ]]; then
    trap 'rm -rf "$LOCK"' EXIT
    echo "installing playwright (first run only)..." >&2
    npm install --prefix "$SCRIPT_DIR" --silent >&2
    touch "$INSTALLED"
  fi
  rm -rf "$LOCK"
fi
"$SCRIPT_DIR/node_modules/.bin/playwright" install chromium >&2

NODE_PATH="$SCRIPT_DIR/node_modules" node "$SCRIPT_DIR/export-pdf.mjs" "$INPUT" "$OUTPUT"

if [[ ! -s "$OUTPUT" ]]; then
  echo "error: export failed — no PDF written to $OUTPUT" >&2
  exit 1
fi

echo "PDF written to $OUTPUT"
