# Design Scorecard — {SCORE}/100 · Grade {GRADE}

<!-- This is the shape scripts/scorecard.py emits. Kept here as a human-readable reference. -->

{✅ Ready | ⛔ Not ready — gate failure(s) | ⚠️ Below target}  ·  {one-line verdict}

*Tier {T1|T2|T3} · weighted over {n}/10 dimensions*

## Gates
All gates pass — no correctness-level design bugs found.
<!-- or, on failure: -->
**{k} gate failure(s)** — these cap the grade at C and block shipping:
- **G1 — Wall of text (slide 7)**: Slide 7 has 58 words (>40).
- **G3 — Contrast below WCAG AA on body text**: --ink-2 = 3.9:1 on bg.

## Dimensions
| Dimension | Score | Weight | Contribution | Evidence |
|---|:--:|:--:|:--:|---|
| Narrative & tension | 4/5 | 12 | 9.6 | Problem→proof→ask; slide 9 is the reveal slide 8 sets up. |
| … | … | … | … | … |

## Top fixes (ranked by impact)
1. **G3 — Contrast** — bump --ink-2 to ≥4.5:1  _( unblocks shipping )_
2. **Colour discipline** — accent creeps to ~18% on slide 4; pull it back  _( +2.2 pts at 5/5 )_

## Metrics appendix
- Slides: **13** · words/slide max **38**, mean **22.4**
- Type families: inter, plus jakarta sans · distinct sizes: 5
- Elevation shadows: 0 · frameworks: none
- Craft: print ✓ · keyboard ✓ · reduced-motion ✓ · scroll-snap ✓ · viewport ✓
- Contrast (tokens): ink 18.1:1, ink-2 8.9:1, ink-3 4.6:1
