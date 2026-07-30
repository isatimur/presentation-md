#!/usr/bin/env python3
"""Upgrade image-hero slides with richer photographic/composed SVG craft.

License-safe: generated SVG only (gradients, grain, soft light planes, product frames).
"""
from __future__ import annotations

import glob
import json
import os
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DECKS = ROOT / "examples" / "decks"


def load_theme_roles(theme: str) -> dict[str, str]:
    candidates = [
        ROOT / "packages" / "core" / "themes" / theme / "theme.json",
        ROOT / "packages" / "themes" / theme / "theme.json",
    ]
    for path in candidates:
        if path.exists():
            data = json.loads(path.read_text())
            roles = data.get("roles") or {}
            return {
                "bg": roles.get("bg", "#0b1020"),
                "bg2": roles.get("bg2", "#121826"),
                "accent": roles.get("accent", "#60a5fa"),
                "accent2": roles.get("accent2", "#34d399"),
                "text": roles.get("text", "#ffffff"),
            }
    return {
        "bg": "#0b1020",
        "bg2": "#121826",
        "accent": "#60a5fa",
        "accent2": "#34d399",
        "text": "#ffffff",
    }


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.strip()
    if h.startswith("rgba") or h.startswith("rgb"):
        # fallback for rgba muted values — treat as mid gray
        return (120, 120, 130)
    h = h.lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if len(h) != 6:
        return (20, 24, 36)
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def rgba(hex_color: str, a: float) -> str:
    r, g, b = hex_to_rgb(hex_color)
    return f"rgba({r},{g},{b},{a:.3f})"


def svg_data_uri(svg: str) -> str:
    compact = "\n".join(line.rstrip() for line in svg.strip().splitlines())
    return "data:image/svg+xml," + urllib.parse.quote(compact, safe="")


def family_for(name: str, theme: str) -> str:
    families = [
        "aurora",
        "product",
        "darkroom",
        "poster",
        "glass",
        "botanical",
        "neon",
        "editorial",
    ]
    key = sum(ord(c) for c in (name + theme)) % len(families)
    # Prefer neon/product for tech flagships
    if theme in {"default-tech", "developer-dark", "neon-noir", "crt-terminal"}:
        return "neon" if key % 2 == 0 else "product"
    if theme in {"aurora-glass", "glassmorphism", "vaporwave"}:
        return "aurora"
    if theme in {"grove", "botanical-luxe", "editorial-forest", "dark-botanical"}:
        return "botanical"
    if theme in {"bold-poster", "studio", "brutalist-acid", "brutalist-mono"}:
        return "poster"
    if theme in {"ft-editorial", "broadsheet", "vellum", "soft-editorial", "paper-ink"}:
        return "editorial"
    return families[key]


def hero_svg(roles: dict[str, str], family: str) -> str:
    bg, bg2, a1, a2 = roles["bg"], roles["bg2"], roles["accent"], roles["accent2"]
    grain = f"""
  <filter id="grain" x="-20%" y="-20%" width="140%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" result="n"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.18 0" in="n" result="g"/>
    <feBlend in="SourceGraphic" in2="g" mode="soft-light"/>
  </filter>
  <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur stdDeviation="28"/>
  </filter>
  <filter id="soft2" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur stdDeviation="48"/>
  </filter>
  <radialGradient id="vig" cx="50%" cy="45%" r="70%">
    <stop offset="0%" stop-color="{bg2}" stop-opacity="0"/>
    <stop offset="70%" stop-color="{bg}" stop-opacity="0.15"/>
    <stop offset="100%" stop-color="#000" stop-opacity="0.55"/>
  </radialGradient>
  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="{rgba(a1, 0)}" />
    <stop offset="100%" stop-color="{rgba(a1, 0.28)}" />
  </linearGradient>
  <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="{rgba(a2, 0.55)}" />
    <stop offset="45%" stop-color="{rgba(a1, 0.18)}" />
    <stop offset="100%" stop-color="{rgba(bg2, 0)}" />
  </linearGradient>
  <radialGradient id="orb1" cx="35%" cy="30%" r="45%">
    <stop offset="0%" stop-color="{rgba(a1, 0.75)}" />
    <stop offset="55%" stop-color="{rgba(a1, 0.18)}" />
    <stop offset="100%" stop-color="{rgba(a1, 0)}" />
  </radialGradient>
  <radialGradient id="orb2" cx="72%" cy="58%" r="40%">
    <stop offset="0%" stop-color="{rgba(a2, 0.65)}" />
    <stop offset="60%" stop-color="{rgba(a2, 0.16)}" />
    <stop offset="100%" stop-color="{rgba(a2, 0)}" />
  </radialGradient>
  <radialGradient id="bokeh" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#fff" stop-opacity="0.55"/>
    <stop offset="40%" stop-color="#fff" stop-opacity="0.12"/>
    <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
  </radialGradient>
"""

    if family == "aurora":
        body = f"""
  <rect width="1600" height="900" fill="{bg}"/>
  <rect width="1600" height="900" fill="url(#beam)" opacity="0.9"/>
  <ellipse cx="420" cy="280" rx="520" ry="340" fill="url(#orb1)" filter="url(#soft2)"/>
  <ellipse cx="1180" cy="620" rx="480" ry="300" fill="url(#orb2)" filter="url(#soft2)"/>
  <ellipse cx="880" cy="220" rx="220" ry="140" fill="{rgba(a2, 0.22)}" filter="url(#soft)"/>
  <path d="M0 640 C320 520 640 780 960 600 S1400 480 1600 560 L1600 900 L0 900 Z" fill="{rgba(a1, 0.12)}"/>
  <g opacity="0.55">
    <circle cx="260" cy="180" r="18" fill="url(#bokeh)"/>
    <circle cx="520" cy="140" r="10" fill="url(#bokeh)"/>
    <circle cx="980" cy="210" r="14" fill="url(#bokeh)"/>
    <circle cx="1320" cy="320" r="22" fill="url(#bokeh)"/>
    <circle cx="1100" cy="120" r="8" fill="url(#bokeh)"/>
  </g>
  <rect width="1600" height="900" fill="url(#vig)"/>
"""
    elif family == "product":
        body = f"""
  <rect width="1600" height="900" fill="{bg}"/>
  <ellipse cx="800" cy="820" rx="700" ry="120" fill="{rgba('#000000', 0.35)}" filter="url(#soft)"/>
  <rect x="0" y="0" width="1600" height="900" fill="url(#floor)"/>
  <ellipse cx="520" cy="260" rx="360" ry="260" fill="url(#orb1)" filter="url(#soft2)"/>
  <ellipse cx="1180" cy="220" rx="300" ry="220" fill="url(#orb2)" filter="url(#soft2)"/>
  <!-- desk product frame -->
  <g transform="translate(430,170)">
    <rect x="18" y="28" width="720" height="460" rx="28" fill="{rgba('#000000', 0.35)}" filter="url(#soft)"/>
    <rect width="720" height="450" rx="26" fill="{bg2}" stroke="{rgba(a1, 0.35)}" stroke-width="2"/>
    <rect x="22" y="22" width="676" height="360" rx="16" fill="{bg}"/>
    <rect x="22" y="22" width="676" height="360" rx="16" fill="url(#beam)" opacity="0.55"/>
    <rect x="70" y="90" width="220" height="18" rx="6" fill="{rgba(a1, 0.85)}"/>
    <rect x="70" y="130" width="380" height="12" rx="4" fill="{rgba('#ffffff', 0.35)}"/>
    <rect x="70" y="158" width="320" height="12" rx="4" fill="{rgba('#ffffff', 0.22)}"/>
    <rect x="70" y="210" width="200" height="110" rx="14" fill="{rgba(a2, 0.28)}"/>
    <rect x="290" y="210" width="200" height="110" rx="14" fill="{rgba(a1, 0.22)}"/>
    <rect x="510" y="210" width="140" height="110" rx="14" fill="{rgba('#ffffff', 0.08)}"/>
    <rect x="280" y="400" width="160" height="10" rx="5" fill="{rgba('#ffffff', 0.18)}"/>
  </g>
  <rect width="1600" height="900" fill="url(#vig)"/>
"""
    elif family == "darkroom":
        body = f"""
  <rect width="1600" height="900" fill="{bg}"/>
  <rect width="1600" height="900" fill="url(#beam)" opacity="0.5"/>
  <ellipse cx="200" cy="100" rx="420" ry="280" fill="{rgba(a1, 0.35)}" filter="url(#soft2)"/>
  <ellipse cx="1400" cy="780" rx="500" ry="320" fill="{rgba(a2, 0.28)}" filter="url(#soft2)"/>
  <g opacity="0.9">
    <rect x="180" y="160" width="520" height="340" rx="8" fill="{bg2}" stroke="{rgba(a1, 0.4)}" stroke-width="2"/>
    <rect x="200" y="180" width="480" height="260" fill="{bg}"/>
    <rect x="200" y="180" width="480" height="260" fill="url(#orb1)" opacity="0.7"/>
    <rect x="240" y="470" width="180" height="10" rx="4" fill="{rgba('#ffffff', 0.28)}"/>
    <rect x="780" y="220" width="420" height="280" rx="8" fill="{bg2}" stroke="{rgba(a2, 0.35)}" stroke-width="2" transform="rotate(4 990 360)"/>
    <rect x="800" y="240" width="380" height="220" fill="{rgba(a2, 0.2)}" transform="rotate(4 990 360)"/>
  </g>
  <g opacity="0.4">
    <circle cx="1260" cy="180" r="26" fill="url(#bokeh)"/>
    <circle cx="1360" cy="260" r="14" fill="url(#bokeh)"/>
    <circle cx="1180" cy="300" r="10" fill="url(#bokeh)"/>
  </g>
  <rect width="1600" height="900" fill="url(#vig)"/>
"""
    elif family == "poster":
        body = f"""
  <rect width="1600" height="900" fill="{bg}"/>
  <polygon points="0,0 980,0 640,900 0,900" fill="{rgba(a1, 0.28)}"/>
  <polygon points="980,0 1600,0 1600,900 640,900" fill="{rgba(a2, 0.18)}"/>
  <ellipse cx="1180" cy="280" rx="260" ry="200" fill="{rgba(a1, 0.35)}" filter="url(#soft)"/>
  <rect x="120" y="220" width="620" height="72" fill="{a1}"/>
  <rect x="120" y="320" width="460" height="28" fill="{rgba('#ffffff', 0.55)}"/>
  <rect x="120" y="370" width="380" height="22" fill="{rgba('#ffffff', 0.28)}"/>
  <rect x="980" y="520" width="420" height="220" fill="{rgba('#000000', 0.22)}"/>
  <rect x="1000" y="540" width="380" height="180" fill="{rgba(a2, 0.45)}"/>
  <circle cx="1320" cy="630" r="54" fill="{rgba(bg, 0.55)}"/>
  <rect width="1600" height="900" fill="url(#vig)" opacity="0.7"/>
"""
    elif family == "glass":
        body = f"""
  <rect width="1600" height="900" fill="{bg}"/>
  <ellipse cx="480" cy="300" rx="420" ry="300" fill="url(#orb1)" filter="url(#soft2)"/>
  <ellipse cx="1200" cy="560" rx="460" ry="320" fill="url(#orb2)" filter="url(#soft2)"/>
  <g opacity="0.92">
    <rect x="220" y="180" width="460" height="300" rx="28" fill="{rgba('#ffffff', 0.06)}" stroke="{rgba('#ffffff', 0.16)}" stroke-width="1.5"/>
    <rect x="250" y="220" width="180" height="16" rx="6" fill="{rgba(a1, 0.7)}"/>
    <rect x="250" y="260" width="280" height="10" rx="4" fill="{rgba('#ffffff', 0.28)}"/>
    <rect x="250" y="290" width="240" height="10" rx="4" fill="{rgba('#ffffff', 0.16)}"/>
    <rect x="560" y="260" width="360" height="320" rx="28" fill="{rgba('#ffffff', 0.08)}" stroke="{rgba(a2, 0.3)}" stroke-width="1.5"/>
    <rect x="600" y="320" width="120" height="120" rx="18" fill="{rgba(a1, 0.35)}"/>
    <rect x="740" y="320" width="120" height="120" rx="18" fill="{rgba(a2, 0.28)}"/>
    <rect x="980" y="210" width="300" height="220" rx="28" fill="{rgba('#ffffff', 0.05)}" stroke="{rgba('#ffffff', 0.14)}" stroke-width="1.5"/>
  </g>
  <rect width="1600" height="900" fill="url(#vig)"/>
"""
    elif family == "botanical":
        body = f"""
  <rect width="1600" height="900" fill="{bg}"/>
  <ellipse cx="300" cy="700" rx="520" ry="360" fill="{rgba(a1, 0.22)}" filter="url(#soft2)"/>
  <ellipse cx="1300" cy="160" rx="420" ry="300" fill="{rgba(a2, 0.28)}" filter="url(#soft2)"/>
  <path d="M180 780 C260 520 420 420 520 280 C560 360 620 460 640 620 C480 640 300 700 180 780 Z" fill="{rgba(a1, 0.45)}"/>
  <path d="M1180 120 C1280 180 1380 260 1460 380 C1340 360 1240 300 1180 120 Z" fill="{rgba(a2, 0.4)}"/>
  <path d="M980 700 C1080 560 1220 500 1360 420 C1380 540 1320 660 1220 760 Z" fill="{rgba(a1, 0.25)}"/>
  <circle cx="860" cy="240" r="90" fill="{rgba(a2, 0.2)}" filter="url(#soft)"/>
  <rect x="640" y="360" width="360" height="220" rx="18" fill="{rgba('#ffffff', 0.08)}" stroke="{rgba(a1, 0.25)}" stroke-width="1.5"/>
  <rect x="680" y="420" width="200" height="14" rx="5" fill="{rgba(a1, 0.7)}"/>
  <rect x="680" y="455" width="260" height="10" rx="4" fill="{rgba('#ffffff', 0.28)}"/>
  <rect width="1600" height="900" fill="url(#vig)"/>
"""
    elif family == "neon":
        body = f"""
  <rect width="1600" height="900" fill="{bg}"/>
  <rect width="1600" height="900" fill="url(#beam)" opacity="0.65"/>
  <ellipse cx="800" cy="420" rx="640" ry="220" fill="{rgba(a1, 0.18)}" filter="url(#soft2)"/>
  <!-- neon tunnel rings -->
  <g fill="none" stroke-linecap="round">
    <ellipse cx="800" cy="450" rx="520" ry="210" stroke="{rgba(a1, 0.35)}" stroke-width="3"/>
    <ellipse cx="800" cy="450" rx="400" ry="160" stroke="{rgba(a2, 0.45)}" stroke-width="2.5"/>
    <ellipse cx="800" cy="450" rx="280" ry="110" stroke="{rgba(a1, 0.55)}" stroke-width="2"/>
    <ellipse cx="800" cy="450" rx="160" ry="62" stroke="{rgba(a2, 0.7)}" stroke-width="2"/>
  </g>
  <rect x="470" y="300" width="660" height="300" rx="22" fill="{rgba(bg2, 0.72)}" stroke="{rgba(a1, 0.4)}" stroke-width="1.5"/>
  <rect x="510" y="350" width="240" height="16" rx="6" fill="{rgba(a1, 0.9)}"/>
  <rect x="510" y="390" width="420" height="11" rx="4" fill="{rgba('#ffffff', 0.32)}"/>
  <rect x="510" y="420" width="360" height="11" rx="4" fill="{rgba('#ffffff', 0.18)}"/>
  <rect x="510" y="470" width="140" height="70" rx="12" fill="{rgba(a2, 0.35)}"/>
  <rect x="670" y="470" width="140" height="70" rx="12" fill="{rgba(a1, 0.28)}"/>
  <rect x="830" y="470" width="140" height="70" rx="12" fill="{rgba('#ffffff', 0.08)}"/>
  <g opacity="0.5">
    <circle cx="240" cy="180" r="16" fill="url(#bokeh)"/>
    <circle cx="1360" cy="220" r="22" fill="url(#bokeh)"/>
    <circle cx="1480" cy="680" r="12" fill="url(#bokeh)"/>
  </g>
  <rect width="1600" height="900" fill="url(#vig)"/>
"""
    else:  # editorial
        body = f"""
  <rect width="1600" height="900" fill="{bg}"/>
  <rect x="0" y="0" width="1600" height="900" fill="{rgba(a1, 0.08)}"/>
  <rect x="120" y="110" width="880" height="680" fill="{bg2}" stroke="{rgba(a1, 0.25)}" stroke-width="1.5"/>
  <rect x="160" y="150" width="800" height="420" fill="{rgba(a2, 0.18)}"/>
  <rect x="160" y="150" width="800" height="420" fill="url(#orb1)" opacity="0.55"/>
  <rect x="200" y="600" width="280" height="22" fill="{a1}"/>
  <rect x="200" y="640" width="520" height="12" fill="{rgba('#000000' if hex_to_rgb(bg)[0] > 180 else '#ffffff', 0.35)}"/>
  <rect x="200" y="670" width="440" height="12" fill="{rgba('#000000' if hex_to_rgb(bg)[0] > 180 else '#ffffff', 0.2)}"/>
  <rect x="1080" y="160" width="380" height="520" fill="{rgba(a1, 0.15)}" stroke="{rgba(a2, 0.3)}" stroke-width="1.5"/>
  <rect x="1120" y="210" width="300" height="14" fill="{rgba(a2, 0.7)}"/>
  <rect x="1120" y="250" width="260" height="10" fill="{rgba('#000000' if hex_to_rgb(bg)[0] > 180 else '#ffffff', 0.28)}"/>
  <rect x="1120" y="280" width="220" height="10" fill="{rgba('#000000' if hex_to_rgb(bg)[0] > 180 else '#ffffff', 0.18)}"/>
  <circle cx="1270" cy="460" r="90" fill="{rgba(a2, 0.25)}" filter="url(#soft)"/>
  <rect width="1600" height="900" fill="url(#vig)" opacity="0.55"/>
"""

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
  <defs>{grain}
  </defs>
  <g filter="url(#grain)">
{body}
  </g>
</svg>"""


# Flagships / launches that benefit from a cinematic beat after title
ADD_HERO = {
    "neonforge-pitch",
    "forge-api",
    "sakura-launch",
    "coralwave-launch",
    "pillbox-launch",
    "stickerlab-agency",
    "voltcraft-agency",
    "canopy-impact",
    "posterforge-campaign",
    "fieldnotes-pitch",
    "concrete-spec",
    "draftline-studio",
}


def upgrade_deck(path: Path) -> str | None:
    data = json.loads(path.read_text())
    name = path.stem
    theme = (data.get("meta") or {}).get("theme") or "default-tech"
    roles = load_theme_roles(theme)
    family = family_for(name, theme)
    image = svg_data_uri(hero_svg(roles, family))

    slides = data.get("slides") or []
    existing = next((s for s in slides if s.get("layout") == "image-hero"), None)
    title = next((s for s in slides if s.get("layout") == "title"), None)

    if existing:
        existing["image"] = image
        existing["imageAlt"] = existing.get("imageAlt") or f"{(data.get('meta') or {}).get('company') or name} cinematic surface"
        if not existing.get("heading") and title:
            existing["heading"] = title.get("heading")
        if not existing.get("lead") and title:
            existing["lead"] = title.get("lead")
        if not existing.get("eyebrow") and title:
            existing["eyebrow"] = title.get("eyebrow")
        path.write_text(json.dumps(data, indent=2) + "\n")
        return f"upgraded:{family}"

    if name in ADD_HERO and title:
        hero = {
            "layout": "image-hero",
            "eyebrow": title.get("eyebrow") or "Moment",
            "heading": title.get("heading") or "Craft that holds.",
            "lead": title.get("lead") or "A full-bleed beat from the same Deck JSON.",
            "image": image,
            "imageAlt": f"{(data.get('meta') or {}).get('company') or name} cinematic surface",
        }
        # Insert after title
        idx = slides.index(title) + 1
        slides.insert(idx, hero)
        data["slides"] = slides
        path.write_text(json.dumps(data, indent=2) + "\n")
        return f"added:{family}"

    return None


def main() -> None:
    results: dict[str, int] = {}
    for path in sorted(DECKS.glob("*.json")):
        result = upgrade_deck(path)
        if result:
            kind = result.split(":")[0]
            results[kind] = results.get(kind, 0) + 1
            print(f"{path.name}: {result}")
    print("summary", results)


if __name__ == "__main__":
    main()
