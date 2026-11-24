"""Core renderer: deck JSON → self-contained HTML."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

_HERE = Path(__file__).parent
_SHARED = _HERE.parent.parent.parent / "shared"  # monorepo layout (packages/shared)
_BUNDLED_THEMES = _HERE.parent.parent.parent / "core" / "themes"  # monorepo layout

# Installed layout: package data lives alongside this file
_TEMPLATES_DIR = _HERE / "templates"


def get_bundled_themes_dir() -> Path:
    """Return the path to the bundled themes directory."""
    if _TEMPLATES_DIR.exists():
        return _HERE / "themes"
    return _BUNDLED_THEMES


def _get_shared_dir() -> Path:
    if _TEMPLATES_DIR.exists():
        return _TEMPLATES_DIR
    return _SHARED


VALID_LAYOUTS = {
    "title", "two-column", "feature-grid", "quote",
    "data-table", "stat-row", "timeline", "section", "closing",
    "image-hero", "comparison", "code",
}

DEFAULT_PALETTE: dict[str, str] = {
    "bg": "#0e0e12", "bg2": "#16161d", "text": "#f4f4f5",
    "muted": "#a1a1aa", "accent": "#7c3aed", "accent2": "#22d3ee",
    "cardBg": "rgba(255,255,255,0.04)", "border": "rgba(255,255,255,0.08)",
}
DEFAULT_TYPOGRAPHY: dict[str, Any] = {
    "headingFont": "'Montserrat', system-ui, sans-serif",
    "bodyFont": "'Open Sans', system-ui, sans-serif",
    "headingWeight": 800,
    "googleFonts": ["Montserrat:wght@700;800", "Open+Sans:wght@400;600"],
}
DEFAULT_GEOMETRY: dict[str, str] = {"radius": "18px", "slideWidth": "1280px"}


@dataclass
class RenderOptions:
    themes_dir: Path | None = None
    extra_css: str = ""
    attribution: bool = True
    """Append a theme-aware "Made with presentation-md" footer. Default True."""


_ATTRIBUTION_URL = "https://presentation-md.vercel.app/?ref=deck"

_ATTRIBUTION_HTML = (
    '<footer class="pmd-attribution">Made with '
    f'<a href="{_ATTRIBUTION_URL}" target="_blank" rel="noopener">presentation-md</a>'
    "</footer>"
)

_ATTRIBUTION_CSS = """
/* presentation-md attribution footer */
.pmd-attribution {
  font-family: var(--body-font);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--muted);
  opacity: 0.6;
  text-align: center;
  padding: 4px 0 16px;
}
.pmd-attribution a {
  color: var(--muted);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--muted) 40%, transparent);
  transition: color 0.15s ease, border-color 0.15s ease;
}
.pmd-attribution a:hover { color: var(--accent); border-color: var(--accent); }
@media print { .pmd-attribution { opacity: 0.5; } }"""


def _load_theme(name: str, themes_dir: Path) -> dict[str, Any]:
    chain: list[dict[str, Any]] = []
    current: str | None = name
    seen: set[str] = set()
    while current and current not in seen:
        seen.add(current)
        manifest = json.loads((themes_dir / current / "theme.json").read_text())
        chain.insert(0, manifest)
        current = manifest.get("extends")

    palette = dict(DEFAULT_PALETTE)
    typography: dict[str, Any] = dict(DEFAULT_TYPOGRAPHY)
    geometry = dict(DEFAULT_GEOMETRY)
    for m in chain:
        palette.update(m.get("roles", {}))
        typography.update(m.get("typography", {}))
        geometry.update(m.get("geometry", {}))
    return {"palette": palette, "typography": typography, "geometry": geometry}


_HEX = re.compile(r"^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$")


def _luminance(hex_color: str) -> float:
    h = hex_color.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    rgb = [int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb]
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]


def _contrast(a: str, b: str) -> float:
    hi, lo = sorted((_luminance(a), _luminance(b)), reverse=True)
    return round((hi + 0.05) / (lo + 0.05), 2)


def _readable_on(fill: str, candidates: list[str]) -> str:
    """Port of core readableOn: first theme colour at 4.5:1, else the best contrast."""
    if not _HEX.match(fill.strip()):
        return candidates[0] if candidates else "#ffffff"
    themed = [c for c in candidates if _HEX.match(c.strip())]
    for c in themed:
        if _contrast(fill, c) >= 4.5:
            return c
    best = None
    for c in [*themed, "#ffffff", "#111111"]:
        if best is None or _contrast(fill, c) > _contrast(fill, best):
            best = c
    return best


def _js_round(x: float) -> int:
    # Math.round semantics (half up), not Python's banker's rounding.
    return int(x + 0.5)


def _hex_full(hex_color: str) -> str:
    h = hex_color.strip().lstrip("#")
    return "".join(c * 2 for c in h) if len(h) == 3 else h


def _with_lightness(hex_color: str, lightness: float) -> str:
    """Port of core withLightness (HSL, lightness 0-100)."""
    import colorsys

    h = _hex_full(hex_color)
    r, g, b = (int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))
    hue, _, sat = colorsys.rgb_to_hls(r, g, b)
    light = max(0.0, min(100.0, lightness)) / 100
    rr, gg, bb = colorsys.hls_to_rgb(hue, light, sat)
    return "#" + "".join(f"{max(0, min(255, _js_round(c * 255))):02x}" for c in (rr, gg, bb))


def _accent_ink(accent: str, bg: str, minimum: float = 3) -> str:
    """Port of core accentInk: the accent moved away from bg until it reaches `minimum`."""
    import colorsys

    if not _HEX.match(accent.strip()) or not _HEX.match(bg.strip()):
        return accent
    if _contrast(accent, bg) >= minimum:
        return accent
    darken = _luminance(bg) > 0.18
    h = _hex_full(accent)
    l0 = colorsys.rgb_to_hls(*(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)))[1] * 100
    for step in range(2, 101, 2):
        light = l0 - step if darken else l0 + step
        if light < 0 or light > 100:
            break
        candidate = _with_lightness(accent, light)
        if _contrast(candidate, bg) >= minimum:
            return candidate
    return "#111111" if darken else "#ffffff"


def _google_fonts_url(families: list[str]) -> str:
    if not families:
        return ""
    joined = "&family=".join(families)
    return f"https://fonts.googleapis.com/css2?family={joined}&display=swap"


def _normalize_slide(slide: dict[str, Any]) -> dict[str, Any]:
    out = dict(slide)
    if slide.get("layout") == "data-table" and isinstance(slide.get("rows"), list):
        out["rows"] = [{"cells": row} for row in slide["rows"]]
    if slide.get("layout") == "feature-grid" and not slide.get("columns"):
        out["columns"] = 3
    return out


def render_deck(deck_json: str | dict[str, Any], opts: RenderOptions | None = None) -> str:
    """Render a deck JSON spec to a self-contained HTML string."""
    if opts is None:
        opts = RenderOptions()

    if isinstance(deck_json, str):
        deck = json.loads(deck_json)
    else:
        deck = deck_json

    if deck.get("type") != "deck":
        raise ValueError('deck.type must be "deck"')
    if not deck.get("slides"):
        raise ValueError("deck.slides must be a non-empty array")

    theme_name = (deck.get("meta") or {}).get("theme", "default-tech")
    themes_dir = opts.themes_dir or get_bundled_themes_dir()
    theme = _load_theme(theme_name, themes_dir)

    meta = deck.get("meta") or {}
    lang = _normalize_lang(meta.get("lang"))
    script_families, script_specs = _script_fonts(lang)
    fonts_url = _google_fonts_url(theme["typography"].get("googleFonts", []) + script_specs)
    shared_dir = _get_shared_dir()

    token_map = {
        "bg": theme["palette"]["bg"],
        "bg2": theme["palette"]["bg2"],
        "text": theme["palette"]["text"],
        "muted": theme["palette"]["muted"],
        "accent": theme["palette"]["accent"],
        "accent2": theme["palette"]["accent2"],
        "onAccent": _readable_on(
            theme["palette"]["accent"], [theme["palette"]["bg"], theme["palette"]["text"]]
        ),
        "accentInk": _accent_ink(theme["palette"]["accent"], theme["palette"]["bg"]),
        "accent2Ink": _accent_ink(theme["palette"]["accent2"], theme["palette"]["bg"], 4.5),
        "cardBg": theme["palette"]["cardBg"],
        "border": theme["palette"]["border"],
        "radius": theme["geometry"]["radius"],
        "slideW": theme["geometry"]["slideWidth"],
        "headingFont": _with_font_fallback(theme["typography"]["headingFont"], script_families),
        "bodyFont": _with_font_fallback(theme["typography"]["bodyFont"], script_families),
        "headingWeight": str(theme["typography"]["headingWeight"]),
    }

    # base.css uses {{token}} placeholders; tokens are simple identifiers,
    # so plain string replacement is enough.
    base_css = (shared_dir / "base.css").read_text()
    for k, v in token_map.items():
        base_css = base_css.replace("{{" + k + "}}", v)

    full_css = (f"@import url('{fonts_url}');\n\n" if fonts_url else "") + base_css
    if opts.attribution:
        full_css += f"\n\n{_ATTRIBUTION_CSS}"
    if opts.extra_css:
        full_css += f"\n\n{opts.extra_css}"

    slides_html_parts: list[str] = []
    for slide in deck["slides"]:
        layout = slide.get("layout", "title")
        if layout not in VALID_LAYOUTS:
            raise ValueError(f"Unknown layout: {layout!r}")
        # Read layout HTML and do mustache-style substitution via simple replacement
        layout_template = (shared_dir / "layouts" / f"{layout}.html").read_text()
        normalized = _normalize_slide(slide)
        # Use a simple mustache-compatible renderer for the layout fragments
        rendered = _render_mustache(layout_template, normalized)
        slides_html_parts.append(rendered)

    slides_html = "\n".join(slides_html_parts)
    doc_template = (shared_dir / "document.html").read_text()
    chrome_catalog = json.loads((shared_dir / "deck-chrome.json").read_text(encoding="utf-8"))
    chrome = _resolve_deck_chrome(chrome_catalog, lang)
    html = _render_mustache(doc_template, {
        "lang": lang,
        "dir": "rtl" if lang.split("-")[0].lower() in _RTL_LANGS else "ltr",
        "title": meta.get("title") or meta.get("company") or "Presentation",
        "description": meta.get("description") or "",
        "styles": full_css,
        "slides": slides_html,
        "attribution": _ATTRIBUTION_HTML if opts.attribution else "",
        "chrome": chrome,
        "chromeJson": json.dumps(chrome, ensure_ascii=False).replace("<", "\\u003c"),
    })
    return html


def _resolve_deck_chrome(catalog: dict[str, dict[str, str]], lang: str) -> dict[str, str]:
    """Mirror resolveDeckChrome in packages/core/src/deck-chrome.ts."""
    en = catalog.get("en", {})
    primary = lang.split("-")[0].lower()
    local = {} if primary == "en" else catalog.get(primary, {})
    out = dict(en)
    for key, value in local.items():
        if key in en and isinstance(value, str) and value.strip():
            out[key] = value
    return out


# Mirrors packages/core/src/deck-lang.ts (normalizeDeckLang / deckLangDir).
_RTL_LANGS = {"ar", "he", "fa", "ur", "ps", "sd", "ug", "yi", "dv", "ckb"}
_LANG_TAG = re.compile(r"^[A-Za-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$")


def _normalize_lang(raw: Any) -> str:
    """Return a safe BCP 47 tag for meta.lang, or "en" when missing or malformed."""
    if not isinstance(raw, str) or not _LANG_TAG.match(raw.strip()):
        return "en"
    parts = raw.strip().split("-")
    out = [parts[0].lower()]
    for p in parts[1:]:
        out.append(p.upper() if len(p) == 2 else p.title() if len(p) == 4 else p.lower())
    return "-".join(out)


# Mirrors scriptFallbackFonts / withFontFallback in packages/core/src/deck-lang.ts.
_NOTO = {
    "sc": "Noto Sans SC",
    "tc": "Noto Sans TC",
    "jp": "Noto Sans JP",
    "kr": "Noto Sans KR",
    "arabic": "Noto Sans Arabic",
    "hebrew": "Noto Sans Hebrew",
    "devanagari": "Noto Sans Devanagari",
    "bengali": "Noto Sans Bengali",
    "thai": "Noto Sans Thai",
    "sans": "Noto Sans",
}
_NOTO_BY_LANG = {
    "ja": "jp", "ko": "kr",
    "ar": "arabic", "fa": "arabic", "ur": "arabic",
    "he": "hebrew", "yi": "hebrew",
    "hi": "devanagari", "mr": "devanagari", "ne": "devanagari",
    "bn": "bengali", "th": "thai",
    **{p: "sans" for p in ("ru", "uk", "bg", "sr", "mk", "be", "kk", "el", "vi")},
}
_GENERIC_FAMILIES = {
    "serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui",
    "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "math", "emoji", "fangsong",
}


def _script_fonts(lang: str) -> tuple[list[str], list[str]]:
    """Noto fallback families and Google Fonts specs for scripts theme fonts rarely cover."""
    primary = lang.split("-")[0].lower()
    if primary == "zh":
        key = "tc" if re.search(r"-(hant|tw|hk|mo)\b", lang.lower()) else "sc"
    else:
        key = _NOTO_BY_LANG.get(primary)
    if not key:
        return [], []
    family = _NOTO[key]
    return [family], [family.replace(" ", "+") + ":wght@400;700"]


def _with_font_fallback(stack: str, families: list[str]) -> str:
    """Insert fallback families just before the first generic family in a CSS font stack."""
    if not families:
        return stack
    parts = [p.strip() for p in stack.split(",") if p.strip()]
    at = next(
        (i for i, p in enumerate(parts) if p.strip("'\"").lower() in _GENERIC_FAMILIES),
        len(parts),
    )
    return ", ".join(parts[:at] + [f"'{f}'" for f in families] + parts[at:])


def _render_mustache(template: str, data: dict[str, Any]) -> str:
    """Minimal mustache renderer supporting {{var}}, {{{var}}}, {{#list}}...{{/list}}, {{^}}."""
    try:
        import chevron  # type: ignore[import]
        return chevron.render(template, data)
    except ImportError:
        pass
    # Fallback: use the pystache-compatible approach via regex
    import re

    def replace_sections(tmpl: str, ctx: dict[str, Any]) -> str:
        # Handle {{#list}}...{{/list}}
        def section_repl(m: re.Match[str]) -> str:
            key, body = m.group(1), m.group(2)
            val = ctx.get(key)
            if not val:
                return ""
            if isinstance(val, list):
                return "".join(replace_sections(body, {**ctx, **item} if isinstance(item, dict) else ctx) for item in val)
            return replace_sections(body, ctx)

        tmpl = re.sub(r"\{\{#(\w+)\}\}(.*?)\{\{/\1\}\}", section_repl, tmpl, flags=re.DOTALL)
        # Handle {{^key}}...{{/key}} (inverted)
        def inv_repl(m: re.Match[str]) -> str:
            key, body = m.group(1), m.group(2)
            return body if not ctx.get(key) else ""
        tmpl = re.sub(r"\{\{\^(\w+)\}\}(.*?)\{\{/\1\}\}", inv_repl, tmpl, flags=re.DOTALL)
        def lookup(name: str) -> Any:
            val: Any = ctx
            for part in name.split("."):
                if not isinstance(val, dict):
                    return ""
                val = val.get(part, "")
            return val

        # Triple mustache (unescaped)
        tmpl = re.sub(r"\{\{\{([\w.]+)\}\}\}", lambda m: str(lookup(m.group(1))), tmpl)
        # Double mustache (escaped)
        import html as html_mod
        tmpl = re.sub(r"\{\{([\w.]+)\}\}", lambda m: html_mod.escape(str(lookup(m.group(1)))), tmpl)
        return tmpl

    return replace_sections(template, data)
