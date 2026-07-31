#!/usr/bin/env python3
"""Isolate each .slide into a one-slide HTML for headless Chrome screenshots.

Mirrors packages/mcp-server/src/lib/screenshot-slides.ts
(extractSlideChunks + isolateSlideHtml). Prints the slide count to stdout.
"""
from __future__ import annotations

import pathlib
import re
import sys


def has_slide_class(quoted: str) -> bool:
    return "slide" in quoted[1:-1].split()


def extract_slide_chunks(html: str) -> list[str]:
    open_re = re.compile(
        r"""<(section|div)\b[^>]*class\s*=\s*("[^"]*"|'[^']*')[^>]*>""",
        re.I,
    )
    opens: list[tuple[int, int, str]] = []
    for m in open_re.finditer(html):
        if has_slide_class(m.group(2)):
            opens.append((m.start(), m.end(), m.group(1).lower()))

    chunks: list[str] = []
    for i, (start, _end, tag) in enumerate(opens):
        end = opens[i + 1][0] if i + 1 < len(opens) else len(html)
        slice_ = html[start:end]
        close = re.search(rf"</{tag}\s*>", slice_, re.I)
        if close:
            slice_ = slice_[: close.end()]
        chunks.append(slice_)
    return chunks


def isolate_slide_html(full_html: str, slide_outer_html: str) -> str:
    head_m = re.search(r"<head\b[^>]*>[\s\S]*?</head>", full_html, re.I)
    head = head_m.group(0) if head_m else '<head><meta charset="utf-8"/></head>'
    deck_m = re.search(
        r"""<main\b[^>]*class\s*=\s*["'][^"']*deck[^"']*["'][^>]*>""",
        full_html,
        re.I,
    ) or re.search(
        r"""<(?:main|div)\b[^>]*data-surface\s*=\s*["'][^"']+["'][^>]*>""",
        full_html,
        re.I,
    )
    open_deck = deck_m.group(0) if deck_m else '<main class="deck">'
    force_css = """<style>
html,body{margin:0;padding:0;overflow:hidden;height:100%;}
html{scroll-snap-type:none !important;}
.slide{min-height:100vh !important;height:100vh !important;}
.reveal{opacity:1 !important;transform:none !important;animation:none !important;}
.slide .reveal,.slide.in-view .reveal{opacity:1 !important;}
.nav-hint,.pmd-attribution{display:none !important;}
</style>"""
    return (
        f"<!doctype html><html>{head}{force_css}<body>{open_deck}{slide_outer_html}</main>"
        '<script>document.querySelectorAll(".slide,.reveal").forEach(function(el){el.classList.add("in-view");});</script>'
        "</body></html>"
    )


def main() -> int:
    if len(sys.argv) < 3:
        print("usage: _isolate_slides.py deck.html out_dir/", file=sys.stderr)
        return 2

    deck_path = pathlib.Path(sys.argv[1])
    out_dir = pathlib.Path(sys.argv[2])
    iso_dir = out_dir / "_iso"
    iso_dir.mkdir(parents=True, exist_ok=True)

    html = deck_path.read_text(encoding="utf-8", errors="ignore")
    chunks = extract_slide_chunks(html)
    if not chunks:
        chunks = ['<section class="slide"><p>missing slide</p></section>']

    for i, chunk in enumerate(chunks, start=1):
        idx = f"{i:02d}"
        isolated = isolate_slide_html(html, chunk)
        (iso_dir / f"slide-{idx}.html").write_text(isolated, encoding="utf-8")

    print(len(chunks))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
