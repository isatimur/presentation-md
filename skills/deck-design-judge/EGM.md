# skills/deck-design-judge

## Overview
The design quality gate for presentation-md decks. The skill instructions live
in [SKILL.md](./SKILL.md). The rubric, metric notes, and judge-model config
live in `references/` (`rubric.md`, `metrics.md`, `judge-models.json`,
`judge-panel.md`, `calibration.md`). `judge_panel.py` reads `rubric.md` and
`judge-models.json` by default. The adapters copy this whole folder to each
host through `adapters/_common/install-judge-skill.*`.

## Subdirectories & Boundaries
- scripts: [EGM.md](./scripts/EGM.md) - stdlib Python pipeline: `deck_metrics.py` (gates G1-G5), `judge_panel.py` (multi-model median), `scorecard.py` (0-100 score, grade, ready verdict), plus slide rendering and brand-token helpers. Tests run with `python3 -m pytest skills/deck-design-judge/scripts/tests`.
