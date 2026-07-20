---
name: deck-design-judge
version: 0.2.0
description: >-
  Scorecard a slide deck: gates, 10-dimension rubric, ranked fixes. Use after
  generation, for bake --judge, or when presentation-generator needs a quality
  gate before ship.
license: MIT
metadata:
  author: isatimur
---

# Deck design judge

**Scorecard** process: tier → locate → metrics → (shots) → rubric → merge.
Leading words: **scorecard**, **gate**, **evidence**, **self-critique**.

## Steps

### 1. Pick the tier

| Tier | Runs | When |
|---|---|---|
| **T0** | `deck_metrics.py` only | Fast sanity / CI |
| **T1** *(default)* | Metrics + one LLM rubric judge | Almost always |
| **T2** | T1 + screenshots the judge opens | Final visual QA |
| **T3** | T2 + multi-model panel (median), via `scripts/judge_panel.py` | Highest stakes — [judge-panel.md](references/judge-panel.md) |

**Done when:** tier is stated (default T1 if unsure).

### 2. Locate deck + brand tokens

Find the `.html` (or shots dir). Read nearby `colors_and_type.css` / token files /
logo SVGs. Note typeface, accent, radii, **flat** vs elevated.

Swiirl / Untitled-UI lineage is **flat** — elevation shadows are a **gate**.

Workspace: `<deck-dir>/.design-eval/<timestamp>/`.

**Done when:** deck path and flat/elevated rule are recorded.

### 3. Metrics (every tier)

```bash
python3 <skill>/scripts/deck_metrics.py <deck.html> \
  [--tokens <colors_and_type.css>] -o <workspace>/metrics.json
```

Swiirl HTML (optional — `swiirl-design` is internal brand-token tooling; skip this step if you
don't have it):

```bash
python3 <swiirl-design>/scripts/check_brand_html.py <deck.html> \
  -o <workspace>/brand_check.json
```

Interpret flags with [metrics.md](references/metrics.md).

**Done when:** `metrics.json` exists and every gate id is listed.

### 4. Screenshots (T2 / T3 only)

```bash
bash <skill>/scripts/render_slides.sh <deck.html> <workspace>/shots/
```

Open each PNG — overflow, clipping, accent area, **3-second rule**. No Chrome →
fall back to T1 and note it.

**Done when:** every shot reviewed, or T1 fallback noted.

### 5. Rubric judge

Read [rubric.md](references/rubric.md). Score all 10 dimensions **0–5** with
**evidence** (slide #, metric, quoted headline). Prefer the lower anchor when
merely “fine.” **T3:** run the real panel — `scripts/judge_panel.py <deck.html>
--metrics <workspace>/metrics.json --out <workspace>/judge.json` (median per
model; errored models excluded, not zeroed) — see [judge-panel.md](references/judge-panel.md).

Emit `<workspace>/judge.json`.

**Done when:** every dimension has score + evidence.

### 6. Scorecard

```bash
python3 <skill>/scripts/scorecard.py <workspace>/metrics.json <workspace>/judge.json \
  -o <workspace>/scorecard.md --json <workspace>/scorecard.json --deck <deck.html>
```

Any **gate** → grade capped at **C**, label **Not ready**. Show `scorecard.md`
in order: Verdict → Gates → Dimensions → Top fixes → Metrics appendix.

**Share your scorecard:** `--json` emits a portable `scorecard.json`
(`schema_version` 1.0 — deck sha256, tier, panel models, per-model votes, gates,
dimensions, grade, top fixes). It's the shareable artifact for the public benchmark;
provenance and the wider ecosystem are in [ATTRIBUTION.md](ATTRIBUTION.md).

**Done when:** user has the scorecard path.

## Self-critique loop

After generating a deck (before handoff):

```
score → if gates clear AND overall ≥ TARGET → ship
      → else apply top 1–3 fixes (gates first), re-measure, re-score
      → ≤3 rounds; report before/after delta
```

Default **TARGET = 85**, **zero gates**. Re-run metrics (and shots in T2) every
round — never assume a fix worked.

**Done when:** target met, rounds exhausted, or progress stalled — ship best + delta.

## In-skill reference

- **Gates** = objective walls (text density, shadows in flat systems, contrast, craft, frameworks).
- **Rubric** = weighted subjective half; the number is a compass, the **fixes** are the point.
- Prefer the brand bundle’s fonts/accent/radii/flat rule over generic defaults when present.
- Anchors: [calibration.md](references/calibration.md).

## Scripts

| Script | Role |
|---|---|
| `scripts/deck_metrics.py` | Deterministic metrics + G1–G5 |
| `scripts/scorecard.py` | Merge → scorecard |
| `scripts/render_slides.sh` | T2/T3 screenshots |
| `scripts/brand_tokens.py` | Token projection helper |
