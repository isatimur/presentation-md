#!/usr/bin/env bash
# render_slides.sh — render each slide of a self-contained HTML deck to a PNG (headless Chrome).
# Usage: bash render_slides.sh <deck.html> <out_dir/> [width] [height]
# Defaults to 1600x900 (16:9). One image per slide (slide-01.png ...). Requires Google Chrome.
#
# Strategy: isolate each .slide into a mini one-slide HTML (same approach as
# packages/mcp-server screenshot-slides.ts) so capture does not depend on the
# deck honouring #__shot=N hash-scroll.
set -euo pipefail

DECK="${1:?usage: render_slides.sh deck.html out_dir/ [w] [h]}"
OUT="${2:?usage: render_slides.sh deck.html out_dir/ [w] [h]}"
W="${3:-1600}"; H="${4:-900}"
mkdir -p "$OUT"

CHROME=""
for c in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "$(command -v google-chrome || true)" \
  "$(command -v chromium || true)" \
  "$(command -v chromium-browser || true)"; do
  if [ -n "$c" ] && [ -x "$c" ]; then CHROME="$c"; break; fi
done
if [ -z "$CHROME" ]; then
  echo "NO_CHROME: install Google Chrome/Chromium, or fall back to T1 (no screenshots)." >&2
  exit 3
fi

ABS_DECK="$(cd "$(dirname "$DECK")" && pwd)/$(basename "$DECK")"

# Isolate each .slide into its own mini-HTML under $OUT/_iso/, then screenshot.
# Python mirrors mcp-server extractSlideChunks + isolateSlideHtml.
# (Keep the isolate helper as a sibling .py so bash quoting stays simple.)
ISO_HELPER="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/_isolate_slides.py"
N=$(python3 "$ISO_HELPER" "$ABS_DECK" "$OUT")

if [ "$N" -lt 1 ]; then N=1; fi
echo "Rendering $N slide(s) at ${W}x${H} -> $OUT (isolated)"

# Full-page screenshot first (some decks aren't snap-paginated)
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --window-size="${W},${H}" --virtual-time-budget=5000 \
  --screenshot="$OUT/full.png" "file://$ABS_DECK" >/dev/null 2>&1 || true

i=1
while [ "$i" -le "$N" ]; do
  idx=$(printf "%02d" "$i")
  ISO="$OUT/_iso/slide-$idx.html"
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --no-first-run --no-default-browser-check \
    --window-size="${W},${H}" --virtual-time-budget=5000 \
    --run-all-compositor-stages-before-draw \
    --screenshot="$OUT/slide-$idx.png" \
    "file://$ISO" >/dev/null 2>&1 || true
  i=$((i + 1))
done

echo "Done. Isolated $N slide shot(s) under $OUT (plus full.png)."
