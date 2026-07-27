#!/usr/bin/env bash
# render_slides.sh — render each slide of a self-contained HTML deck to a PNG (headless Chrome).
# Usage: bash render_slides.sh <deck.html> <out_dir/> [width] [height]
# Defaults to 1600x900 (16:9). One image per slide (slide-01.png ...). Requires Google Chrome.
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

# Count slides the same way deck_metrics.py's find_slides() does: accept
# either quote style, and require an exact 'slide' class token (not a
# substring match — a plain grep -E '\bslide\b' also counts 'title-slide'
# and 'slide-inner' as slides, and misses single-quoted class='slide').
N="$(python3 -c "
import re, sys
html = open(sys.argv[1], encoding='utf-8', errors='ignore').read()
n = 0
for m in re.finditer(r'''<(section|div)\b[^>]*class\s*=\s*(\"[^\"]*\"|'[^']*')[^>]*>''', html, re.I):
    if 'slide' in m.group(2)[1:-1].split():
        n += 1
print(n)
" "$ABS_DECK")"
if [ "$N" -lt 1 ]; then N=1; fi
echo "Rendering $N slide(s) at ${W}x${H} -> $OUT"

# Full-page screenshot first (some decks aren't snap-paginated)
"$CHROME" --headless=new --disable-gpu --hide-scrollbars \
  --window-size="${W},${H}" --virtual-time-budget=5000 \
  --screenshot="$OUT/full.png" "file://$ABS_DECK" >/dev/null 2>&1 || true

# Per-slide via fragment scroll: inject a tiny harness that scrolls slide i into view.
i=1
while [ "$i" -le "$N" ]; do
  idx=$(printf "%02d" "$i")
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size="${W},${H}" --virtual-time-budget=4000 \
    --screenshot="$OUT/slide-$idx.png" \
    "file://$ABS_DECK#__shot=$i" >/dev/null 2>&1 || true
  # If the deck doesn't honour the hash, the JS snippet below (added by the judge if needed) helps;
  # otherwise full.png + manual scroll positions remain available.
  i=$((i + 1))
done

echo "Done. If per-slide shots look identical (deck ignores the #__shot hash), use full.png, or"
echo "add this one-liner near the deck's </body> for hash-driven capture:"
echo "  <script>var m=location.hash.match(/__shot=(\\d+)/);if(m){var s=document.querySelectorAll('.slide')[+m[1]-1];if(s)s.scrollIntoView()}</script>"
