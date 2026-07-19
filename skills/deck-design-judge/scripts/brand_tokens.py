#!/usr/bin/env python3
"""brand_tokens.py — one brand-token source projected into the studio's tools.

A brand.tokens.json holds the 9 canonical tokens (the same keys as deck-JSON
meta.brand). This emits:
  --css   a :root{} block — feeds `deck_metrics.py --tokens` and the direct-HTML path
  --meta  a deck-JSON meta.brand object — feeds the deck-spec render path
so the generator and the judge read ONE source instead of three.

Usage:
  python3 brand_tokens.py brand.tokens.json --css
  python3 brand_tokens.py brand.tokens.json --meta
"""
import argparse, json, sys

# token key -> :root CSS variable. `primary` is the headline accent; `accent` the secondary.
CSS_MAP = {
    "primary": "--accent",
    "accent": "--accent-2",
    "bg": "--bg",
    "bg2": "--bg-2",
    "text": "--text",
    "muted": "--muted",
    "radius": "--radius",
    "fontHeading": "--font-heading",
    "fontBody": "--font-body",
}
META_KEYS = ["primary", "accent", "bg", "bg2", "text", "muted",
             "radius", "fontHeading", "fontBody", "logo"]


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def _present(tokens, key):
    return key in tokens and tokens[key] not in (None, "")


def to_root_css(tokens):
    lines = []
    for key, var in CSS_MAP.items():
        if _present(tokens, key):
            val = tokens[key]
            if key in ("fontHeading", "fontBody"):
                val = f"'{val}', sans-serif"
            lines.append(f"  {var}: {val};")
    return ":root {\n" + "\n".join(lines) + "\n}\n"


def to_meta_brand(tokens):
    return {k: tokens[k] for k in META_KEYS if _present(tokens, k)}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("tokens")
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--css", action="store_true", help="emit a :root{} CSS block")
    g.add_argument("--meta", action="store_true", help="emit a deck-JSON meta.brand object")
    a = ap.parse_args()
    tokens = load(a.tokens)
    if a.css:
        sys.stdout.write(to_root_css(tokens))
    else:
        sys.stdout.write(json.dumps(to_meta_brand(tokens), indent=2) + "\n")


if __name__ == "__main__":
    main()
