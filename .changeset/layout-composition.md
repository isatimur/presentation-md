---
"@presentation-md/core": minor
"@presentation-md/render": patch
---

Fix layouts that left most of the slide empty, and a set of rendering bugs found by reviewing all 75 themes.

- Comparison, timeline, code, stat-row, ranked-list, logo-wall, streak-grid and metric-ring content now centres in the space under the heading instead of hugging the top. Feature-grid cards pin the icon to the top and the copy to the bottom. Body type is larger.
- `--accent2` and `--bg2` were used 88 times but never defined. An undefined `var()` voids the whole declaration, so theme effects in about 37 surfaces never rendered, and ranked-list bars 2 and 3 had no fill. Both names are now aliases of `--accent-2` and `--bg-2`, and a test fails on any undefined variable.
- New `--on-accent` colour, picked by contrast from the theme (`readableOn` in core, exported from `@presentation-md/core/color`). Buttons and the primary ranked bar use it, so text on light accents stays readable.
- Metric-ring numbers scale to the ring and stay inside the stroke. Short ranked bars grow to fit their label and value.
- The image-hero headline column was about 330px wide and set one word per line. It is now up to 920px.
- Data-table slides show `lead`. Code windows are always a dark panel. Chart series 2 no longer paints black, and series 3+ no longer repeat series 1.
