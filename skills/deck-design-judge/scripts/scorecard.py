#!/usr/bin/env python3
"""
scorecard.py — merge deck_metrics.py output + the judge's rubric scores into one scorecard.

Applies gates (deterministic G1-G5 from metrics.flags + judgment G6-G9 from judge.gates),
computes the weighted 0-100 score and letter grade, and writes scorecard.md (+ optional json).

Usage:
  python3 scorecard.py metrics.json judge.json -o scorecard.md [--json scorecard.json] [--target 85]

judge.json schema: see references/rubric.md § Output.
"""
import argparse, datetime, hashlib, json, os

SKILL_VERSION = "0.2.0"
SKILL_REPO = "https://github.com/isatimur/presentation-skill-pack"

# A deck scored over too few dimensions cannot be called "ready": renormalising the
# weighted score over a handful of survivors (e.g. one 5/5 dimension -> 100/100) is
# not evidence of a shippable deck. Require most of the rubric to be covered.
MIN_DIMS_FOR_READY = 7  # of 10

WEIGHTS = {
    "narrative": 12, "clarity": 12, "typography": 11, "color": 11, "layout_flat": 11,
    "brand": 10, "craft": 10, "proof": 9, "variety": 8, "close": 6,
}
LABELS = {
    "narrative": "Narrative & tension", "clarity": "Message clarity / 3-second rule",
    "typography": "Typography system", "color": "Colour discipline",
    "layout_flat": "Layout, whitespace & flat-system", "brand": "Brand fidelity",
    "craft": "Craft & polish", "proof": "Data & proof integrity",
    "variety": "Layout variety", "close": "The close / CTA",
}
GATE_LABEL = {
    "G1": "Wall of text (>40 words on a slide)",
    "G2": "Flat-system violation (drop shadow)",
    "G3": "Contrast below WCAG AA on body text",
    "G4": "Missing craft essential (print / keyboard / reduced-motion / viewport)",
    "G5": "External framework import",
    "G6": "Orphan hero stat (no context, not labelled directional)",
    "G7": "Overflow / clipping in rendered slides",
    "G8": "Identical-grid (every slide same layout)",
    "G9": "Graveyard outro (ends on 'Questions?' / contact only)",
}
JUDGE_GATE_MAP = {  # judge.gates key -> gate id
    "orphan_stat": "G6", "layout_overflow": "G7",
    "identical_grid": "G8", "graveyard_outro": "G9",
}

def letter(score):
    return ("A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70
            else "D" if score >= 60 else "F")

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("metrics"); ap.add_argument("judge")
    ap.add_argument("-o", "--out", required=True)
    ap.add_argument("--json", help="write a shareable scorecard.json (schema_version 1.0)")
    ap.add_argument("--deck", help="deck source file, for deck.file/sha256 in scorecard.json")
    ap.add_argument("--target", type=float, default=85.0)
    a = ap.parse_args()

    metrics = json.load(open(a.metrics))
    judge = json.load(open(a.judge))
    dims = judge.get("dimensions", {})

    # weighted score over present dimensions
    tw = sum(WEIGHTS[k] for k in WEIGHTS if k in dims) or 1
    weighted = sum(WEIGHTS[k] * (dims[k]["score"] / 5.0) for k in WEIGHTS if k in dims)
    weighted = round(weighted * (100.0 / tw), 1)  # normalise if some dims missing

    # coverage floor — how much of the 10-dimension rubric was actually scored
    covered = [k for k in WEIGHTS if k in dims]
    missing = [k for k in WEIGHTS if k not in dims]
    dims_covered = len(covered)

    # gates
    gates = []
    for f in metrics.get("flags", []):
        if f.get("severity") == "gate":
            gates.append({"id": f["id"], "detail": f["detail"], "slide": f.get("slide")})
    for jk, gid in JUDGE_GATE_MAP.items():
        g = judge.get("gates", {}).get(jk)
        if g and g.get("hit") is True:
            gates.append({"id": gid, "detail": g.get("evidence", ""), "slide": None})

    gated = len(gates) > 0
    grade = letter(weighted)
    if gated and grade in ("A", "B"):
        grade = "C"  # cap
    # ready requires: no gate failures, weighted at/above target, AND enough of the
    # rubric actually scored — a thin panel can hit 100/100 on renormalisation alone.
    ready = (not gated) and weighted >= a.target and dims_covered >= MIN_DIMS_FOR_READY

    # ranked fixes: gates first, then lowest weighted-contribution dimensions
    fixes = []
    for g in gates:
        fixes.append({"kind": "gate", "label": GATE_LABEL.get(g["id"], g["id"]),
                      "detail": g["detail"], "gain": "unblocks shipping"})
    dim_gaps = []
    for k in WEIGHTS:
        if k in dims and dims[k]["score"] < 5:  # any dimension below max has headroom worth naming
            gap = WEIGHTS[k] * (5 - dims[k]["score"]) / 5.0
            dim_gaps.append((gap, k))
    for gap, k in sorted(dim_gaps, reverse=True)[:4]:
        fixes.append({"kind": "dimension", "label": LABELS[k],
                      "detail": dims[k].get("evidence", ""), "gain": f"+{gap:.1f} pts at 5/5"})

    # ---- markdown ----
    L = []
    if dims_covered < MIN_DIMS_FOR_READY:
        # The caveat must live in the headline itself: a cropped screenshot of a
        # thin-panel run must not read as a clean full-coverage grade.
        L.append(f"# Design Scorecard — {weighted}/100 · Grade {grade} "
                 f"(INCOMPLETE: {dims_covered}/{len(WEIGHTS)} dimensions)")
    else:
        L.append(f"# Design Scorecard — {weighted}/100 · Grade {grade}")
    L.append("")
    if ready:
        verdict = "✅ **Ready**"
    elif gated:
        verdict = "⛔ **Not ready** — gate failure(s)"
    elif dims_covered < MIN_DIMS_FOR_READY:
        verdict = (f"⚠️ **Not ready** — scored over only {dims_covered}/{len(WEIGHTS)} "
                   f"dimensions (need ≥{MIN_DIMS_FOR_READY})")
    else:
        verdict = f"⚠️ **Below target** ({a.target:.0f})"
    # When coverage is partial, the verdict line itself carries the caveat (not a footnote).
    cov_note = (f"  ·  scored over {dims_covered}/{len(WEIGHTS)} dimensions"
                if dims_covered < len(WEIGHTS) else "")
    L.append(f"{verdict}  ·  {judge.get('summary','').strip()}{cov_note}")
    L.append(f"\n*Tier {judge.get('tier','?')} · weighted over {len(dims)}/10 dimensions*")

    # Integrity findings surface in the shareable card, not only in raw judge.json.
    injection_matches = judge.get("panel", {}).get("injection_matches", [])
    anomalies = judge.get("anomalies", [])
    if judge.get("injection_suspect"):
        L.append("\n## ⚠️ Integrity")
        L.append("**Injection suspect** — the deck embeds delimiter-like text "
                 "(a possible attempt to game the judge):")
        for frag in injection_matches[:5]:
            L.append(f"- `{frag}`")
    if anomalies:
        if not judge.get("injection_suspect"):
            L.append("\n## ⚠️ Integrity")
        L.append(f"**{len(anomalies)} score anomaly(ies)** from the panel "
                 "(invalid or clamped votes — see scorecard.json `anomalies`):")
        for an in anomalies[:5]:
            L.append(f"- {an.get('model','?')} · {an.get('dimension','?')} · "
                     f"{an.get('issue','?')} (raw: {an.get('raw','?')!r})")

    L.append("\n## Gates")
    if not gates:
        L.append("All gates pass — no correctness-level design bugs found.")
    else:
        L.append(f"**{len(gates)} gate failure(s)** — these cap the grade at C and block shipping:\n")
        for g in gates:
            where = f" (slide {g['slide']})" if g.get("slide") else ""
            L.append(f"- **{g['id']} — {GATE_LABEL.get(g['id'], g['id'])}**{where}: {g['detail']}")

    L.append("\n## Dimensions")
    L.append("| Dimension | Score | Weight | Contribution | Evidence |")
    L.append("|---|:--:|:--:|:--:|---|")
    for k in WEIGHTS:
        if k in dims:
            sc = dims[k]["score"]
            contrib = WEIGHTS[k] * sc / 5.0
            ev = dims[k].get("evidence", "").replace("|", "/")
            L.append(f"| {LABELS[k]} | {sc}/5 | {WEIGHTS[k]} | {contrib:.1f} | {ev} |")

    L.append("\n## Top fixes (ranked by impact)")
    if not fixes:
        L.append("Nothing material — the deck is in good shape.")
    else:
        for i, fx in enumerate(fixes, 1):
            L.append(f"{i}. **{fx['label']}** — {fx['detail']}  _( {fx['gain']} )_")

    m = metrics.get("metrics", {})
    L.append("\n## Metrics appendix")
    L.append(f"- Slides: **{m.get('slide_count','?')}**  ·  words/slide max **{m.get('words_max','?')}**, mean **{m.get('words_mean','?')}**")
    L.append(f"- Type families: {', '.join(m.get('font_families', [])) or '—'}  ·  distinct sizes: {m.get('type_sizes_distinct','?')}")
    L.append(f"- Elevation shadows: {len(m.get('elevation_shadows', []))}  ·  frameworks: {', '.join(m.get('frameworks', [])) or 'none'}")
    cf = m.get("craft_features", {})
    L.append(f"- Craft: print {tick(cf.get('print_css'))} · keyboard {tick(cf.get('keyboard_nav'))} · reduced-motion {tick(cf.get('reduced_motion'))} · scroll-snap {tick(cf.get('scroll_snap'))} · viewport {tick(cf.get('viewport_meta'))}")
    if m.get("contrast_ratios"):
        cr = ", ".join(f"{k.replace('--','')} {v}:1" for k, v in m["contrast_ratios"].items())
        L.append(f"- Contrast (tokens): {cr}")

    md = "\n".join(L) + "\n"
    open(a.out, "w").write(md)
    print(f"Wrote {a.out} — {weighted}/100, grade {grade}, {'READY' if ready else 'NOT READY'}, {len(gates)} gate(s).")

    if a.json:
        json.dump(build_scorecard_json(a, judge, metrics, dims, gates, fixes,
                                       weighted, grade, ready, gated),
                  open(a.json, "w"), indent=2)

def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()

def build_scorecard_json(a, judge, metrics, dims, gates, fixes,
                         weighted, grade, ready, gated):
    """Shareable scorecard.json — schema_version 1.0."""
    panel = judge.get("panel", {})
    models = list(panel.get("display", {}).values()) or list(panel.get("models", []))

    deck = {"file": None, "sha256": None}
    if a.deck:
        deck["file"] = os.path.basename(a.deck)
        try:
            deck["sha256"] = sha256_file(a.deck)
        except OSError:
            deck["sha256"] = None

    # dimensions: score/weight/contribution/evidence, plus median + per-model votes where present
    dimensions = {}
    for k in WEIGHTS:
        if k not in dims:
            continue
        d = dims[k]
        entry = {"label": LABELS[k], "score": d["score"], "weight": WEIGHTS[k],
                 "contribution": round(WEIGHTS[k] * d["score"] / 5.0, 1),
                 "evidence": d.get("evidence", "")}
        if "median" in d:
            entry["median"] = d["median"]
        if "votes" in d:
            entry["votes"] = d["votes"]
        if d.get("disagreement"):
            entry["disagreement"] = True
        dimensions[k] = entry

    missing = [k for k in WEIGHTS if k not in dims]
    return {
        "schema_version": "1.0",
        "skill": {"name": "deck-design-judge", "version": SKILL_VERSION, "repo": SKILL_REPO},
        "deck": deck,
        "run": {"date": datetime.date.today().isoformat(),
                "tier": judge.get("tier", "?"), "models": models},
        "metrics": metrics.get("metrics", {}),
        "gates": gates,
        "dimensions": dimensions,
        "dimensions_covered": {"count": len(dimensions), "of": len(WEIGHTS),
                               "missing": missing},
        # Integrity fields — the judge-panel docs promise these are "never
        # silently absorbed", so the shareable artifact must carry them too.
        "injection_suspect": bool(judge.get("injection_suspect", False)),
        "injection_matches": list(panel.get("injection_matches", [])),
        "anomalies": list(judge.get("anomalies", [])),
        "overall": weighted,
        "grade": grade,
        "ready": ready,
        "gated": gated,
        "top_fixes": fixes,
    }

def tick(b):
    return "✓" if b else "✗"

if __name__ == "__main__":
    main()
