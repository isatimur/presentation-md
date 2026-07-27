#!/usr/bin/env python3
"""
deck_metrics.py — deterministic design metrics + gate flags for an HTML slide deck.

Pure stdlib. Emits JSON: {"metrics": {...}, "flags": [{id, severity, detail, slide?}]}.
severity "gate" => deterministic gate hit (G1-G5); "warn" => soft signal for the judge.

Usage:
  python3 deck_metrics.py deck.html [--tokens colors_and_type.css] [-o metrics.json]

See references/metrics.md for what each metric means and its blind spots.
"""
import argparse, json, re, sys

GENERIC_FONTS = {
    "-apple-system", "blinkmacsystemfont", "system-ui", "segoe ui", "sans-serif",
    "serif", "ui-monospace", "monospace", "sf mono", "menlo", "consolas", "roboto",
    "helvetica", "arial", "ui-sans-serif", "ui-serif", "'sf mono'",
}
WORD_GATE = 40
TYPE_SIZE_WARN = 6

# ---------- helpers ----------
def strip_blocks(html, tags):
    for t in tags:
        html = re.sub(r"<%s\b.*?</%s>" % (t, t), " ", html, flags=re.S | re.I)
    return html

def visible_text(chunk):
    chunk = strip_blocks(chunk, ["script", "style", "svg"])
    chunk = re.sub(r"<[^>]+>", " ", chunk)
    chunk = re.sub(r"&[a-z]+;|&#\d+;", " ", chunk)
    return re.sub(r"\s+", " ", chunk).strip()

def count_words(text):
    return len([w for w in text.split() if any(c.isalnum() for c in w)])

# block boundaries — used to measure the LARGEST single text block, the real "wall of text"
# signal (total words overcounts legitimately structured multi-column / multi-step slides).
BLOCK_SPLIT = re.compile(r"</(?:p|li|h[1-6]|div|section|a|blockquote|figcaption|td|th)>|<br\s*/?>", re.I)
def max_block_words(chunk):
    return max((count_words(visible_text(p)) for p in BLOCK_SPLIT.split(chunk)), default=0)

# \s* around '=' matters: formatter-produced HTML sometimes writes
# `class = "slide"` with spaces, and a literal `class=` misses it entirely.
_OPEN_TAG_RE = re.compile(r"""<(section|div)\b[^>]*class\s*=\s*("[^"]*"|'[^']*')[^>]*>""", re.I)


def _has_slide_class(quoted_class_attr):
    """True iff 'slide' appears as its own space-separated class token — not as
    a substring of a hyphenated class like 'title-slide' or 'slide-inner'. A
    naive \\bslide\\b regex treats '-' as a word-boundary character, so it
    wrongly matches those compounds too."""
    classes = quoted_class_attr[1:-1].split()  # strip the surrounding quote char
    return "slide" in classes


# ---------- slide detection ----------
def find_slides(html):
    """Return list of slide inner-HTML chunks. Matches top-level <section|div class=...slide...>."""
    slides = []
    # find each opening tag with a class attribute (either quote style — a
    # double-quote-only pattern silently finds zero slides on third-party/
    # self-authored decks that use class='slide'), then check the class LIST
    # for an exact 'slide' token, not merely a 'slide' substring: hyphenated
    # classes like 'title-slide' or 'slide-inner' must not count as a slide.
    opens = [m for m in _OPEN_TAG_RE.finditer(html) if _has_slide_class(m.group(2))]
    for i, m in enumerate(opens):
        start = m.end()
        end = opens[i + 1].start() if i + 1 < len(opens) else len(html)
        slides.append(html[start:end])
    return slides

# ---------- deck JSON (pre-render / structural pre-flight) ----------
# Keys that carry structure/metadata, not reader-facing prose. Skipped when
# counting words so JSON-mode density matches what HTML-mode would measure.
IGNORE_KEYS = {"layout", "icon", "href", "image", "imageAlt", "kind", "status",
               "number", "columns", "max", "unit", "logo", "theme", "format",
               "brand", "type", "notes"}


def iter_text_blocks(obj):
    """Yield reader-facing string blocks from a slide/deck object, skipping
    structural keys. Each leaf string is one 'block' (parallels an HTML block)."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in IGNORE_KEYS:
                continue
            yield from iter_text_blocks(v)
    elif isinstance(obj, list):
        for v in obj:
            yield from iter_text_blocks(v)
    elif isinstance(obj, str):
        s = obj.strip()
        if s:
            yield s


def analyze_deck_json(deck):
    """Structural metrics from deck JSON BEFORE render — the pre-flight subset.
    Covers density (G1 / words), slide count, layout cadence and orphan stats.
    HTML-only checks (contrast, shadows, frameworks, craft) are deferred to the
    rendered pass. Output shape matches analyze() so scorecard.py consumes either."""
    metrics, flags = {}, []
    slides = deck.get("slides", [])
    metrics["slide_count"] = len(slides)
    if len(slides) < 2:
        flags.append({"id": "slides", "severity": "warn",
                      "detail": "Deck JSON has <2 slides — inspect manually."})

    wps, mbs, layouts = [], [], []
    for i, s in enumerate(slides, 1):
        layouts.append(s.get("layout", "?"))
        blocks = list(iter_text_blocks(s))
        total = sum(count_words(b) for b in blocks)
        mb = max((count_words(b) for b in blocks), default=0)
        wps.append(total)
        mbs.append(mb)
        if mb > WORD_GATE:
            flags.append({"id": "G1", "severity": "gate", "slide": i,
                          "detail": f"Slide {i}: one block has {mb} words (>{WORD_GATE}) — wall of text."})
        elif total > 70:
            flags.append({"id": "words", "severity": "warn", "slide": i,
                          "detail": f"Slide {i}: {total} words total (dense) — verify it isn't over-stuffed."})
    metrics["words_per_slide"] = wps
    metrics["max_block_per_slide"] = mbs
    metrics["words_max"] = max(wps) if wps else 0
    metrics["words_mean"] = round(sum(wps) / len(wps), 1) if wps else 0
    metrics["max_block_words"] = max(mbs) if mbs else 0
    metrics["layouts"] = layouts

    # Deadly Sin #2 — the identical grid: 3+ of the same layout in a row.
    run, run_start = 1, 0
    for j in range(1, len(layouts) + 1):
        if j < len(layouts) and layouts[j] == layouts[j - 1]:
            run += 1
        else:
            if run >= 3:
                flags.append({"id": "cadence", "severity": "warn",
                              "detail": f"Slides {run_start + 1}-{j}: '{layouts[run_start]}' "
                                        f"repeats {run}x in a row — vary the layout cadence."})
            run, run_start = 1, j

    # Deadly Sin #7 — orphan stat: stat-row / metric-hero with no context.
    for i, s in enumerate(slides, 1):
        lay = s.get("layout")
        if lay == "stat-row":
            for st in s.get("stats", []):
                if isinstance(st, dict) and not (st.get("note") or st.get("context")):
                    flags.append({"id": "orphan_stat", "severity": "warn", "slide": i,
                                  "detail": f"Slide {i}: stat '{st.get('value', '?')}' has no "
                                            f"context/comparison — an orphan stat."})
                    break
        elif lay == "metric-hero" and not (s.get("context") or s.get("delta")):
            flags.append({"id": "orphan_stat", "severity": "warn", "slide": i,
                          "detail": f"Slide {i}: metric-hero '{s.get('value', '?')}' "
                                    f"has no context/delta."})

    metrics["mode"] = "json"
    return {"metrics": metrics, "flags": flags}

# ---------- color / contrast ----------
def parse_root_vars(css):
    vars = {}
    for block in re.finditer(r":root\s*\{(.*?)\}", css, flags=re.S):
        for name, val in re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", block.group(1)):
            vars[name.strip()] = val.strip()
    return vars

def resolve(val, vars, depth=0):
    if depth > 5 or not val:
        return val
    m = re.search(r"var\(\s*(--[\w-]+)\s*(?:,(.*))?\)", val)
    if m:
        if m.group(1) in vars:
            return resolve(vars[m.group(1)], vars, depth + 1)
        if m.group(2) is not None:
            # The referenced variable is undefined — a real browser falls back
            # to the second var() argument, not to leaving "var(...)" as the
            # literal value. Without this, --text: var(--brand-text, #eee)
            # with no --brand-text defined never resolved to a color at all,
            # so contrast silently went unassessed instead of using #eee.
            return resolve(m.group(2).strip(), vars, depth + 1)
    return val.strip()

def to_rgb(val, bg=None):
    """Parse #hex / rgb()/rgba() to (r,g,b); blend rgba over bg if alpha<1."""
    val = val.strip()
    m = re.match(r"#([0-9a-fA-F]{3,8})$", val)
    if m:
        h = m.group(1)
        if len(h) in (3, 4):  # #RGB / #RGBA short forms — expand each nibble
            h = "".join(c * 2 for c in h)
        if len(h) in (6, 8):
            r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
            if len(h) == 8:
                # #RRGGBBAA carries an alpha byte too — dropping it silently
                # treated a translucent color (e.g. --text: #00000040) as
                # fully opaque black, so G3 never fired on text that actually
                # renders as light, low-contrast gray.
                a = int(h[6:8], 16) / 255.0
                if a < 1 and bg:
                    return tuple(round(c * a + bc * (1 - a)) for c, bc in zip((r, g, b), bg))
            return (r, g, b)
    m = re.match(r"rgba?\(([^)]+)\)", val)
    if m:
        # Modern CSS Color 4 syntax is space-separated with an optional '/ alpha'
        # (e.g. `rgb(255 255 255 / 0.5)`), not just the legacy comma form. A
        # comma-only split leaves "255 255 255" as one element on that syntax,
        # so contrast silently stopped being checked for decks using it.
        parts = [p for p in re.split(r"[\s,/]+", m.group(1).strip()) if p]
        try:
            r, g, b = (float(parts[0]), float(parts[1]), float(parts[2]))
            a = float(parts[3]) if len(parts) > 3 else 1.0
        except (ValueError, IndexError):
            return None
        if a < 1 and bg:
            return tuple(round(c * a + bc * (1 - a)) for c, bc in zip((r, g, b), bg))
        return (round(r), round(g), round(b))
    return None

def luminance(rgb):
    def ch(c):
        c /= 255.0
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(x) for x in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast(c1, c2):
    l1, l2 = luminance(c1), luminance(c2)
    hi, lo = max(l1, l2), min(l1, l2)
    return round((hi + 0.05) / (lo + 0.05), 2)

# ---------- main ----------
def analyze(html, tokens_css=None):
    metrics, flags = {}, []
    # contrast must reflect what the DECK actually renders — the deck's own :root
    # wins on any variable it defines. But a deck can have an inline :root for one
    # unrelated variable while still relying on an external --tokens file for
    # --bg/--text: picking only one source (rather than merging) used to discard
    # the external file entirely in that case, silently disabling G3 contrast.
    inline_vars = parse_root_vars(html) if re.search(r":root\s*\{", html or "") else {}
    tokens_vars = parse_root_vars(tokens_css) if tokens_css else {}
    merged_vars = {**tokens_vars, **inline_vars}

    # slides + words
    slides = find_slides(html)
    metrics["slide_count"] = len(slides)
    if len(slides) < 2:
        flags.append({"id": "slides", "severity": "warn",
                      "detail": "Found <2 slides — slide detection may have missed this deck's structure; inspect manually."})
    # When NO .slide-classed container exists at all (a single-scroller deck, or
    # one using a different structural convention), measuring zero slides must
    # not silently skip G1: fall back to measuring the whole document as one
    # block so a genuine wall of text still gates, instead of reporting
    # words_max=0 with no warning.
    measure_units = slides if slides else [html]
    unit_label = "Slide" if slides else "Document (no .slide containers found)"
    wps, mbs = [], []
    for i, s in enumerate(measure_units, 1):
        total = count_words(visible_text(s)); wps.append(total)
        mb = max_block_words(s); mbs.append(mb)
        if mb > WORD_GATE:  # a single block over the limit is a genuine wall of text
            flags.append({"id": "G1", "severity": "gate", "slide": i,
                          "detail": f"{unit_label} {i}: one text block has {mb} words (>{WORD_GATE}) — wall of text."})
        elif total > 70:    # distributed but dense — judge decides via `clarity`
            flags.append({"id": "words", "severity": "warn", "slide": i,
                          "detail": f"{unit_label} {i}: {total} words total (dense, but structured) — verify it isn't over-stuffed."})
    metrics["words_per_slide"] = wps
    metrics["max_block_per_slide"] = mbs
    metrics["words_max"] = max(wps) if wps else 0
    metrics["words_mean"] = round(sum(wps) / len(wps), 1) if wps else 0
    metrics["max_block_words"] = max(mbs) if mbs else 0

    # fonts
    fams = set()
    for decl in re.findall(r"font-family\s*:\s*([^;}{]+)", html, flags=re.I):
        first = decl.split(",")[0].strip().strip("\"'").lower()
        if first and "var(" not in first:
            fams.add(first)
    for fam in re.findall(r"family=([^&:\"']+)", html):
        fams.add(fam.replace("+", " ").split(":")[0].strip().lower())
    real = sorted(f for f in fams if f not in GENERIC_FONTS)
    metrics["font_families"] = real
    if len(real) > 2:
        flags.append({"id": "fonts", "severity": "warn",
                      "detail": f"{len(real)} real type families ({', '.join(real)}); a tight system uses 1–2."})

    # type sizes (clamp = 1)
    sizes = set()
    for v in re.findall(r"font-size\s*:\s*([^;}{]+)", html, flags=re.I):
        v = v.strip().lower()
        sizes.add("clamp" if v.startswith("clamp") else v)
    metrics["type_sizes_distinct"] = len(sizes)
    if len(sizes) > TYPE_SIZE_WARN:
        flags.append({"id": "type_sizes", "severity": "warn",
                      "detail": f"{len(sizes)} distinct font-size declarations; great decks use ~4."})

    # drop shadows (exclude focus rings: 0 0 0 spread)
    elevation = []
    for v in re.findall(r"box-shadow\s*:\s*([^;}{]+)", html, flags=re.I):
        val = v.strip().lower()
        if val in ("none", "0", "inherit", "initial"):
            continue
        # not elevation if x AND y offsets are both 0 (focus rings AND glows: '0 0 0 4px', '0 0 10px ...')
        if re.match(r"(inset\s+)?0(px|rem|em)?\s+0(px|rem|em)?(\s|$)", val):
            continue
        elevation.append(val)
    metrics["elevation_shadows"] = elevation
    flat = False
    if tokens_css:
        flat = bool(re.search(r"shadow[^:]*:\s*none", tokens_css, flags=re.I)) or \
               bool(re.search(r"FLAT", tokens_css))
    if elevation:
        if flat:
            flags.append({"id": "G2", "severity": "gate",
                          "detail": f"{len(elevation)} elevation shadow(s) in a FLAT brand system — e.g. '{elevation[0][:60]}'."})
        else:
            flags.append({"id": "shadows", "severity": "warn",
                          "detail": f"{len(elevation)} elevation shadow(s); confirm the brand system permits depth."})

    # contrast
    vars = merged_vars
    resolved = {k: resolve(v, vars) for k, v in vars.items()}
    # primary background
    bg = None
    for cand in ("--void", "--bg-primary", "--background", "--bg", "--surface"):
        if cand in resolved:
            rgb = to_rgb(resolved[cand])
            if rgb:
                bg = rgb
                metrics["bg_token"] = f"{cand}={resolved[cand]}"
                break
    if bg is None:
        m = re.search(r"body\s*\{[^}]*background\s*:\s*([^;}{]+)", html, flags=re.I)
        if m:
            bg = to_rgb(resolve(m.group(1), vars))
    contrasts = {}
    if bg:
        for name, val in resolved.items():
            low = name.lower()
            if not any(k in low for k in ("text", "ink", "fg")):
                continue
            if any(k in low for k in ("bg", "border", "button", "nav", "brand-solid", "section", "overlay", "white")):
                continue
            rgb = to_rgb(val, bg)
            if not rgb:
                continue
            ratio = contrast(rgb, bg)
            contrasts[name] = ratio
            is_minor = any(k in low for k in ("tertiary", "quaternary", "placeholder", "disabled",
                                              "ink-3", "ink-4", "muted", "subtle", "caption", "hint"))
            # Body text isn't always named with a primary/secondary qualifier — a token
            # simply called --text/--fg/--foreground/--ink is a base text color and must
            # gate on low contrast too (a deck using --text: #eee on --bg: #fff should not
            # silently pass at 1.16:1).
            is_body = (not is_minor) and (
                any(k in low for k in ("primary", "secondary", "body", "copy"))
                or low in ("--ink", "--ink-2", "--text", "--fg", "--foreground")
            )
            if is_body and not is_minor and ratio < 4.5:
                flags.append({"id": "G3", "severity": "gate",
                              "detail": f"Body text token {name} ({val}) = {ratio}:1 on bg (<4.5). "
                                        f"If only used at display size, downgrade in writeup."})
            elif is_minor and ratio < 3.0:
                flags.append({"id": "contrast", "severity": "warn",
                              "detail": f"Minor text token {name} = {ratio}:1 (<3.0)."})
    metrics["contrast_ratios"] = contrasts

    # frameworks — search only the code surface (script/link/style tags), never
    # visible slide text. Searching the whole HTML trips this gate on a slide
    # that simply *talks about* React or Tailwind, incorrectly marking an
    # ordinary deck about these topics as not-ready. A <script type="application/
    # json"> block is data, not code, even though it's inside a <script> tag —
    # this pack's own renderer embeds the deck's full source JSON that way for
    # round-tripping, which duplicates every slide's visible text verbatim. If
    # that JSON-data content were included, a slide merely titled "Why We Chose
    # React" would trip the gate again through its own embedded copy.
    html_without_json_scripts = re.sub(
        r"""<script\b[^>]*type\s*=\s*["']application/(?:ld\+)?json["'][^>]*>.*?</script>""",
        " ", html, flags=re.I | re.S)
    code_surface = " ".join(
        m.group(0) for m in re.finditer(
            r"<script\b[^>]*>.*?</script>|<script\b[^>]*/?>|<link\b[^>]*/?>|<style\b[^>]*>.*?</style>",
            html_without_json_scripts, flags=re.I | re.S))
    fw = []
    for pat, label in [(r"tailwind", "Tailwind"), (r"bootstrap", "Bootstrap"),
                       (r"\breact\b|react-dom", "React"), (r"vue(\.js|@)", "Vue"),
                       (r"@angular|ng-version", "Angular"), (r"cdn\.jsdelivr.*(tailwind|bootstrap)", "CDN-framework")]:
        if re.search(pat, code_surface, flags=re.I):
            fw.append(label)
    metrics["frameworks"] = fw
    if fw:
        flags.append({"id": "G5", "severity": "gate",
                      "detail": f"External framework(s) present: {', '.join(fw)} — decks must be self-contained."})

    # craft features
    is_html = "<html" in html.lower() or "<!doctype" in html.lower()
    feats = {
        "print_css": bool(re.search(r"@media\s+print", html, flags=re.I)),
        "keyboard_nav": bool(re.search(r"addEventListener\(\s*['\"]key(down|up)", html) or re.search(r"ArrowDown|ArrowRight|key(Code|)\s*===?\s*['\"]Arrow", html)),
        "reduced_motion": bool(re.search(r"prefers-reduced-motion", html, flags=re.I)),
        "scroll_snap": bool(re.search(r"scroll-snap", html, flags=re.I)),
        "viewport_meta": bool(re.search(r"<meta[^>]+viewport", html, flags=re.I)),
    }
    metrics["craft_features"] = feats
    if is_html:
        missing = [k for k in ("print_css", "keyboard_nav", "reduced_motion", "viewport_meta") if not feats[k]]
        if missing:
            flags.append({"id": "G4", "severity": "gate",
                          "detail": "Missing craft essential(s): " + ", ".join(missing) + "."})
        if not feats["scroll_snap"]:
            flags.append({"id": "scroll_snap", "severity": "warn", "detail": "No scroll-snap (not required, but typical for full-viewport decks)."})

    # anim safety
    hides = re.search(r"\.(anim|fade|reveal)[^{]*\{[^}]*opacity\s*:\s*0", html, flags=re.I)
    gated = re.search(r"\.no-js|\.js\s|classList\.(add|remove)\(\s*['\"](no-)?js", html) or feats["reduced_motion"]
    if hides and not gated:
        flags.append({"id": "anim_safety", "severity": "warn",
                      "detail": "Reveal elements set opacity:0 without a JS-gated/reduced-motion fallback — risk of permanently-invisible text if JS fails."})

    return {"metrics": metrics, "flags": flags}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("deck")
    ap.add_argument("--tokens", help="brand token CSS (e.g. `brand_tokens.py x.json --css`) for flat/brand checks")
    ap.add_argument("--format", choices=["auto", "html", "json"], default="auto",
                    help="input kind; auto = JSON when path ends .json or content starts with '{'")
    ap.add_argument("-o", "--out")
    a = ap.parse_args()
    with open(a.deck, encoding="utf-8", errors="ignore") as f:
        raw = f.read()

    fmt = a.format
    if fmt == "auto":
        fmt = "json" if a.deck.endswith(".json") or raw.lstrip().startswith("{") else "html"

    if fmt == "json":
        result = analyze_deck_json(json.loads(raw))
    else:
        tokens = None
        if a.tokens:
            with open(a.tokens, encoding="utf-8", errors="ignore") as f:
                tokens = f.read()
        result = analyze(raw, tokens)

    out = json.dumps(result, indent=2)
    if a.out:
        with open(a.out, "w") as f:
            f.write(out)
        gates = [x for x in result["flags"] if x["severity"] == "gate"]
        print(f"Wrote {a.out} — {result['metrics']['slide_count']} slides, "
              f"{len(gates)} gate hit(s), {len(result['flags']) - len(gates)} warn(s).")
    else:
        print(out)

if __name__ == "__main__":
    main()
