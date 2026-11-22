# presentation_md_render

## Overview

Python binding of the deck renderer. It turns a deck JSON spec (dict or string) into a self-contained HTML deck. It reads theme JSON and HTML/CSS templates, and fills them with a small mustache renderer.

## Interface

- [__init__.py:render_deck], [__init__.py:get_bundled_themes_dir], [__init__.py:RenderOptions] (re-exported from `renderer.py`).
- [renderer.py:render_deck] `(deck_json: str | dict, opts: RenderOptions | None = None) -> str`.
- [renderer.py:RenderOptions] dataclass: `themes_dir`, `extra_css`, `attribution` (default `True`).
- [renderer.py:get_bundled_themes_dir] returns `themes/` beside the module when `templates/` exists there, else monorepo `packages/core/themes`.
- [renderer.py:VALID_LAYOUTS] the 12 accepted layouts.
- [cli.py:main] the `presentation-md-render` script. Flags: positional `deck`, `-o/--output` (default `deck.html`), `-t/--theme`, `--list-themes`, `--validate`.

## Invariants

- [renderer.py:render_deck] raises `ValueError` when `type` is not `"deck"`, when `slides` is empty, or when a layout is not in [renderer.py:VALID_LAYOUTS].
- [renderer.py:render_deck] uses theme `default-tech` when `meta.theme` is missing.
- [renderer.py:_load_theme] follows `extends` and stops on a cycle through `seen`. Theme `roles`, `typography`, and `geometry` override [renderer.py:DEFAULT_PALETTE], [renderer.py:DEFAULT_TYPOGRAPHY], [renderer.py:DEFAULT_GEOMETRY].
- [renderer.py:_render_mustache] uses `chevron` when installed, else a regex fallback that HTML-escapes `{{var}}` and leaves `{{{var}}}` raw.
- [cli.py:main] `--validate` exits 1 on bad JSON, a wrong `type`, or empty `slides`, and exits 0 on success. A render error exits 1.

## Side Effects

- [renderer.py:_load_theme] reads `<themes_dir>/<name>/theme.json`.
- [renderer.py:render_deck] reads `base.css`, `document.html`, and `layouts/<layout>.html` from the shared dir ([renderer.py:_get_shared_dir]). The output CSS holds a Google Fonts `@import`, which the browser fetches.
- [cli.py:main] reads the deck from a file or stdin, writes `--output`, and prints to stdout/stderr.

## Verification

- Run: `pytest` (no tests exist in this package yet)
