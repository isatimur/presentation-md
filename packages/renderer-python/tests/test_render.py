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
