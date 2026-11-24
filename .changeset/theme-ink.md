---
"@presentation-md/core": minor
"@presentation-md/render": patch
---

Keep figures and eyebrows readable in themes with pastel accents.

- New `accentInk` in core: the accent with its lightness moved away from the background until it reaches a contrast floor, hue kept. Renderers expose `--accent-ink` (3:1, for stat numbers, chart bars, streak cells and timeline dots) and `--accent-2-ink` (4.5:1, for eyebrows). Pastel accents stay pastel as fills.
- vaporwave: the horizon line shows on title, section and closing slides only, so it no longer cuts through centred content.
- risograph-zine: the blobs fade to 40% on content slides.
- capsule: stat pills inset their text past the curved edge.
