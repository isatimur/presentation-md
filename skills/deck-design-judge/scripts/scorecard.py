#!/usr/bin/env python3
"""
scorecard.py — merge deck_metrics.py output + the judge's rubric scores into one scorecard.

Applies gates (deterministic G1-G5 from metrics.flags + judgment G6-G9 from judge.gates),
computes the weighted 0-100 score and letter grade, and writes scorecard.md (+ optional json).

Usage:
  python3 scorecard.py metrics.json judge.json -o scorecard.md [--json scorecard.json] [--target 85]

judge.json schema: see references/rubric.md § Output.
"""
import argparse, datetime, hashlib, json, math, os, re

SKILL_VERSION = "0.2.0"

MD_MAX_LEN = 300  # cap on any model-derived string interpolated into scorecard.md


def md_safe(s, max_len=MD_MAX_LEN):
    """Sanitize a model-/deck-derived string before it is written into scorecard.md.

    Model output and deck copy are untrusted: embedded newlines could forge a fake
    heading or a second verdict line, a leading '#' could become a heading, and
    backticks could open/close code spans and smuggle markdown. We collapse all
    whitespace to single spaces, neutralize a leading '#', replace backticks (so a
    value placed inside a code span cannot break out), and cap the length. The md is
    a shareable artifact; the raw values still live verbatim in scorecard.json."""
    s = re.sub(r"\s+", " ", str(s)).strip()
    if len(s) > max_len:
        s = s[:max_len - 1].rstrip() + "…"
    s = s.replace("`", "'")          # backticks can't close/open a code span anymore
    s = s.replace("<", "&lt;").replace(">", "&gt;")  # raw HTML tags are inert
    s = s.replace("[", "\\[").replace("]", "\\]")    # no live links / ![images]
    if s.startswith("#"):
        s = "\\" + s                 # leading '#' can't become a heading
    return s


def md_safe_raw(raw):
    """md-safe rendering of an anomaly's raw value (repr, then sanitized). repr keeps
    strings quoted and escapes control chars; md_safe then caps and de-fangs it."""
    return md_safe(repr(raw))


def _coerce_score(raw):
    """Coerce a judge.json dimension score to a finite float in spirit of judge_panel:
    accept ints/floats and numeric strings, reject bools, nan/inf, and non-numeric.
    Returns the float or None (unusable)."""
    if isinstance(raw, bool):
        return None
    if isinstance(raw, (int, float)):
        try:
            val = float(raw)  # int over float-max raises OverflowError
        except OverflowError:
            return None
        return val if math.isfinite(val) else None
    if isinstance(raw, str):
        try:
            val = float(raw.strip())
        except (ValueError, OverflowError):
            return None
        return val if math.isfinite(val) else None
    return None


def _coerce_gate_hit(raw):
    """Strict gate-verdict parsing (mirrors judge_panel._coerce_gate). Returns
    (verdict, issue): real bool -> (bool, None); null/missing -> (None, None);
    "true"/"false" strings -> (bool, "coerced_gate_string"); else (None,
    "invalid_gate_type"). Stops a JSON-stringified "false" from being truthy."""
    if raw is None:
        return None, None
    if isinstance(raw, bool):
        return raw, None
    if isinstance(raw, str):
        s = raw.strip().lower()
        if s == "true":
            return True, "coerced_gate_string"
        if s == "false":
            return False, "coerced_gate_string"
    return None, "invalid_gate_type"


def validate_dims(raw_dims):
    """Validate/repair judge.json dimensions before they are trusted for scoring.

    A forged or corrupt judge.json (score 999, -3, "abc", nan) must not silently
    yield a >100 grade-A ready deck. For each dimension:
      - non-numeric / non-finite  -> the dimension is EXCLUDED, anomaly recorded
      - out of [0,5]              -> CLAMPED into range, still counted, anomaly recorded
    Returns (clean_dims, anomalies, tampered). `tampered` is True if any score
    arrived out of range — a tampering signal that must force ready=False."""
    dims, anomalies, tampered = {}, [], False
    for k, d in raw_dims.items():
        raw = d.get("score") if isinstance(d, dict) else d
        val = _coerce_score(raw) if isinstance(d, dict) else None
        if not isinstance(d, dict) or "score" not in d or val is None:
            anomalies.append({"model": "scorecard", "dimension": k,
                              "issue": "invalid_score_in_judge_json", "raw": raw})
            continue
        if val < 0.0 or val > 5.0:
            clamped = max(0.0, min(5.0, val))
            anomalies.append({"model": "scorecard", "dimension": k,
                              "issue": "invalid_score_in_judge_json",
                              "raw": raw, "clamped_to": clamped})
            tampered, val = True, clamped
        nd = dict(d)
        nd["score"] = int(val) if val == int(val) else round(val, 1)
        dims[k] = nd
    return dims, anomalies, tampered
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

    # judge.json is untrusted (may be forged/corrupt): validate every dimension score
    # before it touches the weighted total. Invalid scores are excluded, out-of-range
    # scores clamped; both are recorded as anomalies, and out-of-range trips `tampered`.
    dims, score_anomalies, tampered = validate_dims(judge.get("dimensions", {}))

    # weighted score over present (validated) dimensions
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
        if not isinstance(g, dict) or "hit" not in g:
            continue
        hit, gerr = _coerce_gate_hit(g["hit"])
        if gerr is not None:
            score_anomalies.append({"model": "scorecard", "gate": jk,
                                    "issue": gerr, "raw": g["hit"]})
        if gerr == "invalid_gate_type":
            continue   # unparseable verdict — excluded, never silently truthy
        if hit is True:
            gates.append({"id": gid, "detail": g.get("evidence", ""), "slide": None})

    # Anomalies the panel already recorded, plus the ones scorecard just found.
    anomalies = list(judge.get("anomalies", [])) + score_anomalies

    gated = len(gates) > 0
    grade = letter(weighted)
    if gated and grade in ("A", "B"):
        grade = "C"  # cap
    # ready requires: no gate failures, weighted at/above target, enough of the rubric
    # actually scored (a thin panel can hit 100/100 on renormalisation alone), AND no
    # tampering signal — an out-of-range score in judge.json means the input was
    # forged/corrupt, so the deck cannot be called ready on it.
    ready = ((not gated) and weighted >= a.target
             and dims_covered >= MIN_DIMS_FOR_READY and not tampered)

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
    # Caveats must live in the headline itself: a cropped screenshot of a
    # thin-panel or tampered run must not read as a clean full-coverage grade.
    h1_flags = []
    if tampered:
        h1_flags.append("TAMPERED judge.json")
    if dims_covered < MIN_DIMS_FOR_READY:
        h1_flags.append(f"INCOMPLETE: {dims_covered}/{len(WEIGHTS)} dimensions")
    suffix = f" ({'; '.join(h1_flags)})" if h1_flags else ""
    L.append(f"# Design Scorecard — {weighted}/100 · Grade {grade}{suffix}")
    L.append("")
    if tampered:
        verdict = ("⛔ **Not ready** — judge.json contained out-of-range scores "
                   "(possible tampering); values were clamped and the result "
                   "cannot be trusted as-is")
    elif ready:
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
    L.append(f"{verdict}  ·  {md_safe(judge.get('summary',''))}{cov_note}")
    L.append(f"\n*Tier {md_safe(judge.get('tier','?'))} · weighted over {len(dims)}/10 dimensions*")

    # Integrity findings surface in the shareable card, not only in raw judge.json.
    # `anomalies` was merged above (panel anomalies + scorecard's own validation).
    injection_matches = judge.get("panel", {}).get("injection_matches", [])
    if judge.get("injection_suspect"):
        L.append("\n## ⚠️ Integrity")
        L.append("**Injection suspect** — the deck embeds delimiter-like text "
                 "(a possible attempt to game the judge):")
        for frag in injection_matches[:5]:
            L.append(f"- `{md_safe(frag)}`")
    if anomalies:
        if not judge.get("injection_suspect"):
            L.append("\n## ⚠️ Integrity")
        L.append(f"**{len(anomalies)} score anomaly(ies)** "
                 "(invalid, clamped, or coerced votes — see scorecard.json `anomalies`):")
        for an in anomalies[:5]:
            where = an.get("dimension") or an.get("gate") or "?"
            L.append(f"- {md_safe(an.get('model','?'))} · {md_safe(where)} · "
                     f"{md_safe(an.get('issue','?'))} (raw: {md_safe_raw(an.get('raw','?'))})")

    L.append("\n## Gates")
    if not gates:
        L.append("All gates pass — no correctness-level design bugs found.")
    else:
        L.append(f"**{len(gates)} gate failure(s)** — these cap the grade at C and block shipping:\n")
        for g in gates:
            where = f" (slide {g['slide']})" if g.get("slide") else ""
            L.append(f"- **{g['id']} — {GATE_LABEL.get(g['id'], g['id'])}**{where}: "
                     f"{md_safe(g['detail'])}")

    L.append("\n## Dimensions")
    L.append("| Dimension | Score | Weight | Contribution | Evidence |")
    L.append("|---|:--:|:--:|:--:|---|")
    for k in WEIGHTS:
        if k in dims:
            sc = dims[k]["score"]
            contrib = WEIGHTS[k] * sc / 5.0
            ev = md_safe(str(dims[k].get("evidence", "")).replace("|", "/"))
            L.append(f"| {LABELS[k]} | {sc}/5 | {WEIGHTS[k]} | {contrib:.1f} | {ev} |")

    L.append("\n## Top fixes (ranked by impact)")
    if not fixes:
        L.append("Nothing material — the deck is in good shape.")
    else:
        for i, fx in enumerate(fixes, 1):
            L.append(f"{i}. **{fx['label']}** — {md_safe(fx['detail'])}  _( {fx['gain']} )_")

    m = metrics.get("metrics", {})
    L.append("\n## Metrics appendix")
    L.append(f"- Slides: **{m.get('slide_count','?')}**  ·  words/slide max **{m.get('words_max','?')}**, mean **{m.get('words_mean','?')}**")
    # font_families is extracted from the deck's own CSS (untrusted, same as
    # judge-derived strings) — it must go through md_safe before joining, or a
    # quoted font-family value can smuggle live HTML into the shareable card.
    families = ", ".join(md_safe(f) for f in m.get("font_families", [])) or "—"
    L.append(f"- Type families: {families}  ·  distinct sizes: {m.get('type_sizes_distinct','?')}")
    L.append(f"- Elevation shadows: {len(m.get('elevation_shadows', []))}  ·  frameworks: {', '.join(m.get('frameworks', [])) or 'none'}")
    cf = m.get("craft_features", {})
    L.append(f"- Craft: print {tick(cf.get('print_css'))} · keyboard {tick(cf.get('keyboard_nav'))} · reduced-motion {tick(cf.get('reduced_motion'))} · scroll-snap {tick(cf.get('scroll_snap'))} · viewport {tick(cf.get('viewport_meta'))}")
    if m.get("contrast_ratios"):
        # token names are also deck-derived CSS variable names — same untrusted
        # class as font_families, so the same md_safe treatment applies.
        cr = ", ".join(f"{md_safe(k.replace('--',''))} {v}:1" for k, v in m["contrast_ratios"].items())
        L.append(f"- Contrast (tokens): {cr}")

    md = "\n".join(L) + "\n"
    open(a.out, "w").write(md)
    print(f"Wrote {a.out} — {weighted}/100, grade {grade}, {'READY' if ready else 'NOT READY'}, {len(gates)} gate(s).")

    if a.json:
        json.dump(build_scorecard_json(a, judge, metrics, dims, gates, fixes,
                                       weighted, grade, ready, gated, anomalies),
                  open(a.json, "w"), indent=2)

def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()

def build_scorecard_json(a, judge, metrics, dims, gates, fixes,
                         weighted, grade, ready, gated, anomalies):
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
        # merged: panel-recorded anomalies + scorecard's own judge.json validation
        "anomalies": list(anomalies),
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
