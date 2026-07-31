# candy-pop

**Candy pop — cream canvas, hot pink + butter yellow, soft blobs, rounded type.**

Install (npm):

```bash
npm i @presentation-md/theme-candy-pop
```

Use in deck JSON: `"meta": { "theme": "candy-pop" }`

Surface profile: `candy-blob`.

Gallery-parity: yellow marquee ticker on title/closing brands from `meta.company`
(or `meta.marquee` / `meta.title`); soft pink/blue blobs + outlined blue ornament
in HTML + PPTX. **Cards** get hard ink borders (~2.5pt) + plump radius in PPTX
(matching candy-blob `.card`). Animated marquee scroll is HTML-only — PPTX uses
a static ticker strip.
