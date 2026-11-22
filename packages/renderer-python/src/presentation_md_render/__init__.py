"""presentation-md-render — Python binding.

Renders a deck JSON spec (dict or JSON string) to a self-contained HTML slide deck.
Mirrors the Node renderer API; reads theme JSON and shared templates from the
installed package data.
"""

from .renderer import render_deck, get_bundled_themes_dir, RenderOptions

from importlib.metadata import PackageNotFoundError, version as _version

__all__ = ["render_deck", "get_bundled_themes_dir", "RenderOptions"]

# Single source of truth: pyproject.toml (kept in sync by tools/sync-versions.ts).
try:
    __version__ = _version("presentation-md-render")
except PackageNotFoundError:  # running from a source checkout without install
    __version__ = "0.0.0+source"
