# Scoring Rubric

Ten weighted dimensions, each scored **0–5**. Weighted score = `Σ(weight × score/5)` → 0–100.
Score against **evidence** (a slide number, a measured value, a quoted headline), not vibes.
Default to the **lower** anchor when a dimension is merely "fine" — 5 is reserved for genuinely
exemplary work, and a deck of all-4s is a very good deck.

| key | dimension | weight |
|---|---|---:|
| `narrative` | Narrative & tension | 12 |
| `clarity` | Message clarity / 3-second rule | 12 |
| `typography` | Typography system | 11 |
| `color` | Colour discipline | 11 |
| `layout_flat` | Layout, whitespace & flat-system fidelity | 11 |
| `brand` | Brand fidelity | 10 |
| `craft` | Craft & polish | 10 |
| `proof` | Data & proof integrity | 9 |
| `variety` | Layout variety | 8 |
| `close` | The close / CTA | 6 |
| | **total** | **100** |

---

## Dimension anchors

### `narrative` — Narrative & tension  (12)
Does the deck tell a story with an arc, where each slide sets up a question the next one answers,
and the strongest statement lands last?
- **5** — Clear arc (problem→insight→proof→ask, or equivalent). Every slide creates or resolves
  tension. The setup slide before each reveal does its job. Last slide is the most memorable.
- **3** — Recognisable arc but some slides are inert (answer a question no one asked) or the order
  could be resequenced without loss. Reveals land but setups are thin.
- **1** — A pile of slides, not a story. No tension; sections don't build.
- **0** — Random order / contradicts itself.

### `clarity` — Message clarity / 3-second rule  (12)
Could a stranger glance at any slide for 3 seconds and get its single point? One job per slide.
- **5** — Every slide passes the 3-second rule. One idea each. Headlines are claims ("Our best
  quarter — here's why"), not labels ("Q1 Update"). No slide needs a second read.
- **3** — Most slides are clear; one or two carry two ideas or a timid label-headline.
- **1** — Several slides require study to extract the point; headlines are labels.
- **0** — Walls of text / no discernible point per slide. *(>40 words on a slide is also gate G1.)*

### `typography` — Typography system  (11)
A tight scale, real hierarchy, on-brand faces.
- **5** — ~4 sizes, not more. Adjacent text blocks differ clearly (size/weight/colour). Headlines
  ≤8 words, body lines reasonable. Faces match the brand system (e.g. Inter / the bundle's faces).
- **3** — Mostly disciplined but a muddy hierarchy step or a slightly sprawling size set.
- **1** — Many sizes, weak contrast between levels, or off-brand faces.
- **0** — No hierarchy / default browser type.

### `color` — Colour discipline  (11)
60-30-10, one warm + one cool, accent earned (≤~15% of any slide), ≤3 colours/slide.
- **5** — Disciplined neutral/surface/accent ratio; a warm+cool pairing creates motion; the accent
  is rare enough to *mean* something; brand tokens used faithfully.
- **3** — Generally controlled but the accent creeps past "highlight" on a slide or two.
- **1** — Accent everywhere (so it means nothing) or a rainbow with no system.
- **0** — Colour chaos / unreadable combinations.

### `layout_flat` — Layout, whitespace & flat-system fidelity  (11)
Breathing room (~≥40px air), and depth done the system's way.
- **5** — Generous, consistent air; nothing crowds the edges. Depth is hairlines + background steps
  (the flat Untitled-UI/Claude-Design way); radii match the system; alignment is tight.
- **3** — Decent spacing but some crowding or an inconsistent inset; depth mostly flat.
- **1** — Cramped, edges crowded, or shadows fighting the flat system.
- **0** — No spacing system; chaotic. *(Drop shadows in a flat brand are also gate G2.)*

### `brand` — Brand fidelity  (10)
Does it use the project's *actual* tokens, faces, logo, and rules — not generic defaults?
- **5** — Fonts, accent, radii, and flat/elevated choice all match the declared system. Logo is the
  real asset, placed per brand (e.g. left-aligned, correct lockup). Co-brand handled correctly.
- **3** — On-brand in spirit but a token off (an approximate accent, a near-miss radius) or a logo
  placement quibble.
- **1** — Generic "AI deck" look that ignores the supplied system.
- **0** — Wrong brand / clashing identity.
- *No bundle present?* Judge against stated intent and internal consistency; note the limitation.

### `craft` — Craft & polish  (10)
Alignment, no overflow/clipping, 8px-grid spacing rhythm, motion choreography, and the
non-negotiables: keyboard nav, `prefers-reduced-motion`, print-safe, no clipped content.
- **5** — Pixel-tight; spacing on a consistent grid; reveals are choreographed (stagger, ease) and
  never leave text stuck invisible; reduced-motion + print + keyboard all handled.
- **3** — Solid but a misaligned element, an off-grid gap, or one missing a11y/print nicety.
- **1** — Visible sloppiness: overflow, ragged alignment, janky or broken motion.
- **0** — Broken layout. *(Missing print/keyboard/reduced-motion is also gate G4; overflow is G7.)*

### `proof` — Data & proof integrity  (9)
Numbers earn their place with context; invented figures are labelled.
- **5** — Every stat has a comparison, source, or context ("87% — vs 34% industry"). Directional/
  illustrative figures are explicitly flagged. The hero metric is the right one.
- **3** — Most stats have context; one or two float without it.
- **1** — Several orphan numbers presented as fact.
- **0** — Decorative numbers / fabricated stats stated as truth. *(An unlabelled orphan hero stat is also gate G6.)*

### `variety` — Layout variety  (8)
Layout matched to the job; not the same template every slide.
- **5** — A range of layouts (cover, manifesto, stat-row, comparison, process, quote…), each chosen
  because it fits that slide's job. Rhythm of dense/sparse.
- **3** — Some variety but leans on one or two layouts.
- **1** — Nearly every slide is the same shape.
- **0** — Identical-grid funeral. *(All-identical is also gate G8.)*

### `close` — The close / CTA  (6)
Ends on the strongest statement with one unmistakable next action.
- **5** — Final slide is a strong statement + exactly one primary CTA (a second, subdued option is
  fine). Feels inevitable, not pushy.
- **3** — Has a CTA but it competes with others, or the close is functional not memorable.
- **1** — Weak/absent CTA, or ends on contact info.
- **0** — Ends on "Questions?" / bare LinkedIn. *(That ending is also gate G9.)*

---

## Gates (auto-fail → grade capped at **C**, deck marked **Not ready**)

A gate is a correctness bug, not a style nit — one is enough to block shipping. Deterministic gates
come from `metrics.json.flags`; judgment gates come from `judge.json.gates`.

| id | gate | source | trigger |
|---|---|---|---|
| G1 | Wall of text | metrics | any slide > 40 words |
| G2 | Flat-system violation | metrics | drop-shadow / elevation present while brand system is flat |
| G3 | Contrast failure | metrics | a primary/secondary **body** text token < 4.5:1 on its background (large/display exempt) |
| G4 | Missing craft essential | metrics | HTML deck lacking `@media print`, keyboard nav, `prefers-reduced-motion`, or viewport meta |
| G5 | Framework import | metrics | Tailwind / Bootstrap / React / external CSS framework present |
| G6 | Orphan hero stat | judge | a headline metric with no context/comparison/source, not labelled directional |
| G7 | Overflow / clipping | judge (T2) | content clipped or overflowing a slide in the rendered shots |
| G8 | Identical-grid | judge | effectively every slide is the same layout |
| G9 | Graveyard outro | judge | deck ends on "Questions?" / contact-only, no statement + CTA |

If the brand system is explicitly **elevated** (uses shadows by design), skip G2 — note it.

---

## Output — `judge.json` schema

```json
{
  "tier": "T1",
  "dimensions": {
    "narrative":   {"score": 4, "evidence": "Problem→proof→ask arc; slide 9 metric is the reveal slide 8 sets up."},
    "clarity":     {"score": 4, "evidence": "All slides pass 3s; headlines are claims. Slide 7 carries 2 ideas."},
    "typography":  {"score": 5, "evidence": "Inter+Jakarta, 4 sizes, clean steps."},
    "color":       {"score": 4, "evidence": "60-30-10 held; accent ~10%. Slide 4 accent creeps to ~18%."},
    "layout_flat": {"score": 5, "evidence": "Hairlines+bg steps, no shadows, ~64px air."},
    "brand":       {"score": 5, "evidence": "Real Swiirl wordmark, tokens match colors_and_type.css, logo left-aligned."},
    "craft":       {"score": 4, "evidence": "Reveal gating present; reduced-motion+print+keyboard ok; slide 10 table tight."},
    "proof":       {"score": 4, "evidence": "Stats sourced; directional figures labelled; hero metric is right one."},
    "variety":     {"score": 4, "evidence": "9 distinct layouts across 13 slides."},
    "close":       {"score": 5, "evidence": "Strong statement + single primary CTA."}
  },
  "gates": {
    "orphan_stat":     {"hit": false, "evidence": "All stats carry context."},
    "identical_grid":  {"hit": false, "evidence": "Varied layouts."},
    "graveyard_outro": {"hit": false, "evidence": "Closes on statement + CTA."},
    "layout_overflow": {"hit": null,  "evidence": "Not assessed (no screenshots / T1)."}
  },
  "summary": "Strong, on-brand co-brand deck; minor accent-creep and one dense slide."
}
```

`layout_overflow.hit` is `null` when screenshots weren't rendered (T0/T1). The scorecard treats
`null` as "not assessed", not as a pass.
