# kinetic-wrapped

**Kinetic Wrapped — acid lime on black, Archivo Black, year-in-review energy.**

```bash
npm i @presentation-md/theme-kinetic-wrapped
```

Use: `"meta": { "theme": "kinetic-wrapped" }` · Surface: `wrapped-block`.

## Craft (match gallery Pulse)

| Beat | Layout | Notes |
|------|--------|-------|
| Cold open | `title` + `tone: "lime"` | Yell the year. |
| Mega number | `stat-row` + `variant: "hero"` | First stat dominates; optional secondary chips. |
| Top-N bars | `ranked-list` + `tone: "magenta"` | Prefer over `custom-html` pulse-bar stacks. |
| Percentile | `metric-ring` + `tone: "cyan"` | Full badge ring (`pct: 100`) or arc (`1–99`). |
| Streak | `streak-grid` + `tone: "violet"` | `filled` / `total` / `cols` — schema cells, not HTML. |
| Hue chapters | set `tone` on ≥3 slides | `lime` · `magenta` · `cyan` · `orange` · `violet` |
| Share close | `closing` + `actions[]` + `tone: "lime"` | Solid + outline share pills (max 3). |

Proofs: `examples/decks/pulse-wrapped.json` · Studio `?example=pulse-wrapped` · gallery `web/examples/pulse-wrapped.html`.

### Honest leftovers vs handcrafted gallery

- True CSS `mix-blend-mode` / blur soft blobs stay HTML-only.
- PPTX approximates Pulse with hard frames + offset shadows, multi-oval soft blobs,
  tone-matched secondary/tertiary washes, a hard corner square on body slides,
  ranked bars, streak cells, dual pills, and metric-ring via oval / native `blockArc`.
