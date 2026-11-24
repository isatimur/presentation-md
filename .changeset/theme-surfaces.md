---
"@presentation-md/core": patch
"@presentation-md/render": patch
---

Fix theme decoration that covered slide content, and panels that pill themes clipped.

- Decoration over content: coral's diagonal is a tint on content slides; cobalt-grid's corner triangle, cartesian's compass circles and scatterbrain's stickers stay off content slides; cartesian's axes and emerald-editorial's masthead rules sit in the slide padding; daisy-days' dots sit at the edges; block-frame's and bold-poster's title marks no longer touch copy.
- Split covers: electric-studio, creative-voltage and split-pastel keep title and closing copy inside one panel. electric-studio's closing button has a pill.
- Code windows, chart frames and two-column asides cap their corner radius, so pill themes (capsule, long-table) no longer clip axis labels and code.
- Contrast: mat's logo tiles, aside, stat labels and chart; kinetic-wrapped's closing buttons, quote attribution and ring on toned slides; glassmorphism's bento hero; raw-grid's eyebrows; editorial-tri-tone's stat rules; vaporwave's ranked-bar labels.
- neon-noir, vaporwave and kinetic-wrapped draw the metric ring in the accent.
