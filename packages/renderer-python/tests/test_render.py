"""Smoke tests for the Python renderer.

Run from packages/renderer-python: `uv run --with pytest pytest`.
"""

from __future__ import annotations

import pytest

from presentation_md_render import render_deck

DECK = {
    "type": "deck",
    "meta": {"theme": "claude", "title": "Smoke"},
    "slides": [
        {"layout": "title", "heading": "Hello <world>"},
        {"layout": "stat-row", "heading": "Proof", "stats": [{"value": "87%", "label": "retention"}]},
    ],
}


def test_renders_a_self_contained_document() -> None:
    html = render_deck(DECK)
    assert html.lstrip().lower().startswith("<!doctype html")
    assert "87%" in html
    # Theme tokens are substituted, none left as raw placeholders.
    assert "{{accent}}" not in html


def test_presenter_chrome_is_filled_and_embedded() -> None:
    import json
    import re

    html = render_deck(DECK)
    assert "{{chrome." not in html
    assert "{{{chromeJson}}}" not in html
    m = re.search(r'<script type="application/json" id="pmd-chrome">(.*?)</script>', html, re.S)
    assert m is not None
    strings = json.loads(m.group(1))
    assert strings["editButtonTitle"] == "Edit mode (E)"
    assert 'title="Edit mode (E)"' in html
    assert "Speaker · O" in html


def test_escapes_heading_text() -> None:
    html = render_deck(DECK)
    assert "Hello &lt;world&gt;" in html
    assert "Hello <world>" not in html


def test_rejects_unknown_layout() -> None:
    with pytest.raises(ValueError, match="Unknown layout"):
        render_deck({**DECK, "slides": [{"layout": "nope"}]})


def test_rejects_empty_slides() -> None:
    with pytest.raises(ValueError):
        render_deck({**DECK, "slides": []})


def _with_lang(lang: str) -> dict:
    return {**DECK, "meta": {**DECK["meta"], "lang": lang}}


def test_arabic_deck_is_rtl_with_arabic_font_fallback() -> None:
    html = render_deck(_with_lang("ar"))
    assert '<html lang="ar" dir="rtl">' in html
    assert "Noto+Sans+Arabic" in html
    assert "'Noto Sans Arabic'" in html


def test_japanese_deck_gets_cjk_fallback_before_generic_family() -> None:
    html = render_deck(_with_lang("ja"))
    assert '<html lang="ja" dir="ltr">' in html
    assert "Noto+Sans+JP" in html
    # Fallback sits before the generic family, so theme fonts keep priority.
    assert "'Noto Sans JP', serif" in html or "'Noto Sans JP', sans-serif" in html or "'Noto Sans JP', system-ui" in html


def test_english_deck_has_no_noto_fallback() -> None:
    html = render_deck(DECK)
    assert "Noto" not in html


def test_on_accent_token_is_filled_and_matches_core() -> None:
    from presentation_md_render.renderer import _readable_on

    html = render_deck(DECK)
    assert "--on-accent: #" in html
    assert "{{onAccent}}" not in html
    # Same cases as core tests/color.test.ts readableOn.
    assert _readable_on("#00e5ff", ["#0a1f3d", "#e8f4ff"]) == "#0a1f3d"
    assert _readable_on("#b8f0d8", ["#fdfcf8", "#f4f4f4"]) == "#111111"
    assert _readable_on("rgba(0,0,0,0.5)", ["#fff"]) == "#fff"


@pytest.mark.parametrize(
    ("accent", "bg", "expected"),
    [
        # Same cases as core tests/color.test.ts accentInk.
        ("#c8f0d8", "#f5e6dc", "#289152"),
        ("#e8d4c0", "#f5f3ee", "#b87d43"),
        ("#F2D4CF", "#FFFFFF", "#d67767"),
        ("#B7C7A8", "#F2EEDF", "#748f5c"),
        ("#E6FF3D", "#ECECE8", "#7c8f00"),
        ("#FFE066", "#FAF8F3", "#ad8a00"),
        ("#00e5ff", "#0a1f3d", "#00e5ff"),
    ],
)
def test_accent_ink_matches_core(accent: str, bg: str, expected: str) -> None:
    from presentation_md_render.renderer import _accent_ink

    assert _accent_ink(accent, bg) == expected
