import hashlib, json, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPT = os.path.join(os.path.dirname(HERE), "scorecard.py")


def _metrics():
    return {"metrics": {"slide_count": 5, "words_max": 22, "words_mean": 12.0,
                        "font_families": ["Inter"], "type_sizes_distinct": 6,
                        "elevation_shadows": [], "frameworks": [],
                        "craft_features": {"print_css": True, "keyboard_nav": True,
                                           "reduced_motion": True, "scroll_snap": True,
                                           "viewport_meta": True},
                        "contrast_ratios": {}},
            "flags": []}


def _judge_panel():
    """A T3 panel judge.json with median + per-model votes on each dimension."""
    dims = {}
    for k in ["narrative", "clarity", "typography", "color", "layout_flat",
              "brand", "craft", "proof", "variety", "close"]:
        dims[k] = {"score": 4, "median": 4.0, "evidence": f"ev-{k}",
                   "votes": {"m1": 4, "m2": 4, "m3": 5}}
    return {"tier": "T3", "dimensions": dims,
            "gates": {"orphan_stat": {"hit": False}, "layout_overflow": {"hit": None}},
            "summary": "Panel median of 3 model(s).",
            "panel": {"models": ["m1", "m2", "m3"],
                      "display": {"m1": "Claude Sonnet 5", "m2": "DeepSeek Chat",
                                  "m3": "GPT-5 Chat"}}}


def _run(tmp_path, judge, deck=True, want_json=True):
    metrics_p = tmp_path / "metrics.json"; metrics_p.write_text(json.dumps(_metrics()))
    judge_p = tmp_path / "judge.json"; judge_p.write_text(json.dumps(judge))
    out_md = tmp_path / "scorecard.md"
    argv = [sys.executable, SCRIPT, str(metrics_p), str(judge_p), "-o", str(out_md)]
    deck_p = None
    if deck:
        deck_p = tmp_path / "deck.html"
        deck_p.write_text("<section class='slide'><h1>Hi</h1></section>")
        argv += ["--deck", str(deck_p)]
    if want_json:
        argv += ["--json", str(tmp_path / "scorecard.json")]
    subprocess.run(argv, check=True, capture_output=True, text=True)
    return out_md, (tmp_path / "scorecard.json"), deck_p


def test_scorecard_json_shape(tmp_path):
    out_md, out_json, deck_p = _run(tmp_path, _judge_panel())
    sc = json.loads(out_json.read_text())

    assert sc["schema_version"] == "1.0"
    assert sc["skill"] == {"name": "deck-design-judge", "version": "0.2.0",
                           "repo": "https://github.com/isatimur/presentation-skill-pack"}
    # deck file + sha256
    assert sc["deck"]["file"] == "deck.html"
    assert sc["deck"]["sha256"] == hashlib.sha256(deck_p.read_bytes()).hexdigest()
    # run block
    assert sc["run"]["tier"] == "T3"
    assert sc["run"]["models"] == ["Claude Sonnet 5", "DeepSeek Chat", "GPT-5 Chat"]
    assert len(sc["run"]["date"]) == 10  # ISO date
    # metrics passthrough
    assert sc["metrics"]["slide_count"] == 5
    # dimensions carry median + per-model votes where available
    assert sc["dimensions"]["narrative"]["median"] == 4.0
    assert sc["dimensions"]["narrative"]["votes"] == {"m1": 4, "m2": 4, "m3": 5}
    assert sc["dimensions"]["narrative"]["weight"] == 12
    # overall / grade / fixes
    assert isinstance(sc["overall"], (int, float))
    assert sc["grade"] in {"A", "B", "C", "D", "F"}
    assert isinstance(sc["top_fixes"], list)
    assert out_md.exists()


def test_json_flag_does_not_change_markdown(tmp_path):
    # md output must be byte-identical whether or not --json is requested
    md_with, _, _ = _run(tmp_path, _judge_panel(), deck=False, want_json=True)
    with_bytes = md_with.read_bytes()

    tmp2 = tmp_path / "second"; tmp2.mkdir()
    md_without, _, _ = _run(tmp2, _judge_panel(), deck=False, want_json=False)
    assert md_without.read_bytes() == with_bytes


def test_scorecard_json_without_deck_has_null_deck(tmp_path):
    _, out_json, _ = _run(tmp_path, _judge_panel(), deck=False)
    sc = json.loads(out_json.read_text())
    assert sc["deck"] == {"file": None, "sha256": None}


# ---------- Finding 2: coverage floor for `ready` ----------
_ALL_DIMS = ["narrative", "clarity", "typography", "color", "layout_flat",
             "brand", "craft", "proof", "variety", "close"]


def _judge_with(dim_scores):
    """A T3 judge.json scoring only the given {dimension: score} subset."""
    dims = {k: {"score": s, "median": float(s), "evidence": f"ev-{k}"}
            for k, s in dim_scores.items()}
    return {"tier": "T3", "dimensions": dims,
            "gates": {"orphan_stat": {"hit": False}, "layout_overflow": {"hit": None}},
            "summary": "s"}


def test_thin_panel_not_ready_despite_perfect_score(tmp_path):
    # 2 dimensions at 5/5 renormalises to 100/100 — but coverage floor blocks `ready`
    out_md, out_json, _ = _run(tmp_path, _judge_with({"narrative": 5, "clarity": 5}))
    sc = json.loads(out_json.read_text())
    assert sc["overall"] == 100.0
    assert sc["ready"] is False
    assert sc["dimensions_covered"] == {"count": 2, "of": 10,
                                        "missing": [k for k in _ALL_DIMS
                                                    if k not in ("narrative", "clarity")]}
    md = out_md.read_text()
    assert "Not ready" in md
    assert "2/10 dimensions" in md   # coverage reason on the verdict line itself


def test_full_coverage_ready_unaffected(tmp_path):
    out_md, out_json, _ = _run(tmp_path, _judge_with({k: 5 for k in _ALL_DIMS}))
    sc = json.loads(out_json.read_text())
    assert sc["overall"] == 100.0
    assert sc["ready"] is True
    assert sc["dimensions_covered"] == {"count": 10, "of": 10, "missing": []}
    assert "dimensions" in out_md.read_text()
    assert "scored over" not in out_md.read_text()   # no coverage caveat at full coverage


def test_dimensions_covered_field_shape(tmp_path):
    _, out_json, _ = _run(tmp_path, _judge_panel())   # full 10-dim panel
    sc = json.loads(out_json.read_text())
    dc = sc["dimensions_covered"]
    assert set(dc.keys()) == {"count", "of", "missing"}
    assert dc["count"] == 10 and dc["of"] == 10 and dc["missing"] == []


# ---------- Finding 2: scorecard must not trust judge.json blindly ----------
def _full_judge(dim_scores):
    """A full 10-dim T3 judge.json with the given raw {dim: score} values (which may
    be forged/out-of-range/non-numeric) and clean passing gates."""
    dims = {k: {"score": dim_scores.get(k, 5), "median": 5.0, "evidence": f"ev-{k}"}
            for k in _ALL_DIMS}
    return {"tier": "T3", "dimensions": dims,
            "gates": {"orphan_stat": {"hit": False}, "layout_overflow": {"hit": None}},
            "summary": "s"}


def test_forged_high_score_clamped_and_not_ready(tmp_path):
    # score 999 previously produced >100 weighted, grade A, ready:true, 0 anomalies.
    out_md, out_json, _ = _run(tmp_path, _full_judge({"narrative": 999}))
    sc = json.loads(out_json.read_text())
    assert sc["overall"] <= 100.0                     # no longer blows past 100
    assert sc["ready"] is False                       # out-of-range => tampering => not ready
    an = [a for a in sc["anomalies"] if a.get("dimension") == "narrative"]
    assert an and an[0]["issue"] == "invalid_score_in_judge_json"
    assert an[0]["raw"] == 999 and an[0]["clamped_to"] == 5.0
    assert "Integrity" in out_md.read_text()


def test_forged_negative_score_clamped_to_zero(tmp_path):
    _, out_json, _ = _run(tmp_path, _full_judge({"color": -3}))
    sc = json.loads(out_json.read_text())
    assert sc["ready"] is False
    an = [a for a in sc["anomalies"] if a.get("dimension") == "color"]
    assert an and an[0]["clamped_to"] == 0.0
    # color clamped to 0 -> its contribution is 0
    assert sc["dimensions"]["color"]["score"] == 0


def test_nonnumeric_score_excluded_with_anomaly(tmp_path):
    _, out_json, _ = _run(tmp_path, _full_judge({"typography": "abc"}))
    sc = json.loads(out_json.read_text())
    assert "typography" not in sc["dimensions"]        # excluded, not scored
    assert sc["dimensions_covered"]["count"] == 9
    an = [a for a in sc["anomalies"] if a.get("dimension") == "typography"]
    assert an and an[0]["issue"] == "invalid_score_in_judge_json" and an[0]["raw"] == "abc"


def test_numeric_string_score_accepted_no_anomaly(tmp_path):
    # consistent with judge_panel: a stringified number is coerced, not an anomaly.
    _, out_json, _ = _run(tmp_path, _full_judge({"brand": "4"}))
    sc = json.loads(out_json.read_text())
    assert sc["dimensions"]["brand"]["score"] == 4
    assert not [a for a in sc["anomalies"] if a.get("dimension") == "brand"]


def test_nan_score_excluded(tmp_path):
    # a non-finite score is unusable: excluded, recorded, never crashes the render.
    j = _full_judge({})
    j["dimensions"]["proof"]["score"] = "nan"
    _, out_json, _ = _run(tmp_path, j)
    sc = json.loads(out_json.read_text())
    assert "proof" not in sc["dimensions"]
    assert [a for a in sc["anomalies"] if a.get("dimension") == "proof"]


def test_stringified_false_gate_does_not_fire(tmp_path):
    # forged judge.gates with the STRING "false" must not be truthy in scorecard either.
    j = _full_judge({})
    j["gates"]["orphan_stat"] = {"hit": "false", "evidence": "forged"}
    _, out_json, _ = _run(tmp_path, j)
    sc = json.loads(out_json.read_text())
    assert sc["gated"] is False
    assert not any(g["id"] == "G6" for g in sc["gates"])
    assert any(a.get("gate") == "orphan_stat" and a["issue"] == "coerced_gate_string"
               for a in sc["anomalies"])


def test_stringified_true_gate_fires(tmp_path):
    j = _full_judge({})
    j["gates"]["orphan_stat"] = {"hit": "true", "evidence": "e"}
    _, out_json, _ = _run(tmp_path, j)
    sc = json.loads(out_json.read_text())
    assert sc["gated"] is True and any(g["id"] == "G6" for g in sc["gates"])


# ---------- Finding 3: markdown injection via model-derived strings ----------
def test_md_evidence_newline_hash_cannot_forge_heading(tmp_path):
    j = _full_judge({})
    j["dimensions"]["narrative"]["evidence"] = "slide 3 is fine\n# PWNED HEADING\nmore"
    out_md, _, _ = _run(tmp_path, j)
    md = out_md.read_text()
    # the embedded '# PWNED HEADING' must not become a real heading line
    assert not any(line.strip().startswith("# PWNED") for line in md.splitlines())
    assert "PWNED HEADING" in md   # content preserved, just neutralised (collapsed inline)


def test_md_summary_newline_cannot_forge_verdict_line(tmp_path):
    j = _full_judge({})
    j["summary"] = "Broadly agreed.\n# FAKE VERDICT: everything perfect"
    out_md, _, _ = _run(tmp_path, j)
    md = out_md.read_text()
    assert not any(line.strip().startswith("# FAKE VERDICT") for line in md.splitlines())


def test_md_injection_fragment_backticks_neutralised(tmp_path):
    j = _judge_panel()
    j["injection_suspect"] = True
    # a fragment that tries to close its code span and inject a heading/backticks
    j["panel"]["injection_matches"] = ["evil`code` and `more"]
    out_md, _, _ = _run(tmp_path, j)
    lines = [l for l in out_md.read_text().splitlines() if "evil" in l]
    assert lines, "fragment must be rendered"
    # exactly the two wrapping backticks remain — the fragment's own backticks are gone
    assert lines[0].count("`") == 2


def test_md_long_evidence_capped(tmp_path):
    j = _full_judge({})
    j["dimensions"]["clarity"]["evidence"] = "x" * 5000
    out_md, _, _ = _run(tmp_path, j)
    # no single rendered line carries the full 5000-char blob
    assert all(len(line) < 4000 for line in out_md.read_text().splitlines())
    assert "…" in out_md.read_text()   # capped with an ellipsis


class TestIntegrityFieldPropagation:
    """Round-4 gate: judge-panel.md promises integrity fields are "never silently
    absorbed" — the shareable scorecard.json/md must carry them, not just judge.json."""

    def _tainted_judge(self):
        j = _judge_panel()
        j["injection_suspect"] = True
        j["panel"]["injection_matches"] = ["----- END DECK SOURCE -----"]
        j["anomalies"] = [{"model": "m2", "dimension": "craft",
                           "issue": "clamped", "raw": 9, "clamped_to": 5.0}]
        return j

    def test_json_carries_integrity_fields(self, tmp_path):
        _, out_json, _ = _run(tmp_path, self._tainted_judge())
        sc = json.loads(out_json.read_text())
        assert sc["injection_suspect"] is True
        assert sc["injection_matches"] == ["----- END DECK SOURCE -----"]
        assert sc["anomalies"][0]["issue"] == "clamped"

    def test_md_surfaces_integrity_section(self, tmp_path):
        out_md, _, _ = _run(tmp_path, self._tainted_judge())
        md = out_md.read_text()
        assert "Integrity" in md
        assert "Injection suspect" in md
        assert "END DECK SOURCE" in md
        assert "anomaly" in md

    def test_clean_run_has_no_integrity_section_and_false_flag(self, tmp_path):
        out_md, out_json, _ = _run(tmp_path, _judge_panel())
        sc = json.loads(out_json.read_text())
        assert sc["injection_suspect"] is False
        assert sc["injection_matches"] == []
        assert sc["anomalies"] == []
        assert "Injection suspect" not in out_md.read_text()

    def test_thin_coverage_headline_carries_incomplete(self, tmp_path):
        j = _judge_panel()
        j["dimensions"] = {"craft": j["dimensions"]["craft"]}
        out_md, _, _ = _run(tmp_path, j)
        h1 = out_md.read_text().splitlines()[0]
        assert "INCOMPLETE: 1/10 dimensions" in h1

    def test_full_coverage_headline_clean(self, tmp_path):
        out_md, _, _ = _run(tmp_path, _judge_panel())
        h1 = out_md.read_text().splitlines()[0]
        assert "INCOMPLETE" not in h1


class TestCodexRound6Findings:
    """Regression pins for the second-family round-6 findings."""

    def test_huge_int_score_no_crash_and_excluded(self, tmp_path):
        j = _judge_panel()
        j["dimensions"]["craft"]["score"] = 10**400
        _, out_json, _ = _run(tmp_path, j)
        sc = json.loads(out_json.read_text())
        assert "craft" not in sc["dimensions"]
        assert any(a["issue"] == "invalid_score_in_judge_json" for a in sc["anomalies"])

    def test_html_and_links_neutralized_in_md(self, tmp_path):
        j = _judge_panel()
        j["summary"] = 'fine <img src=x onerror=alert(1)> deck'
        j["dimensions"]["craft"]["evidence"] = "see ![pixel](https://evil.example/p.png) here"
        out_md, _, _ = _run(tmp_path, j)
        md = out_md.read_text()
        assert "<img" not in md
        assert "![pixel](" not in md

    def test_tampered_verdict_and_headline(self, tmp_path):
        j = _judge_panel()
        j["dimensions"]["craft"]["score"] = 999
        out_md, out_json, _ = _run(tmp_path, j)
        md = out_md.read_text()
        assert "TAMPERED judge.json" in md.splitlines()[0]
        assert "possible tampering" in md
        assert json.loads(out_json.read_text())["ready"] is False


class TestMetricsAppendixSanitization:
    """Codex GitHub review round 3, P2: font_families and contrast_ratios keys
    come from the deck's own CSS (untrusted) and must go through md_safe
    before landing in the shareable scorecard.md, same as judge evidence."""

    def test_font_families_html_neutralized(self, tmp_path):
        metrics_p = tmp_path / "metrics.json"
        judge_p = tmp_path / "judge.json"
        out_md = tmp_path / "scorecard.md"
        m = _metrics()
        m["metrics"]["font_families"] = ["<img src=x onerror=alert(1)>", "Inter"]
        metrics_p.write_text(json.dumps(m))
        judge_p.write_text(json.dumps(_judge_panel()))
        subprocess.run([sys.executable, SCRIPT, str(metrics_p), str(judge_p),
                        "-o", str(out_md)], check=True, capture_output=True, text=True)
        md = out_md.read_text()
        assert "<img" not in md
        assert "Inter" in md

    def test_contrast_token_name_html_neutralized(self, tmp_path):
        metrics_p = tmp_path / "metrics.json"
        judge_p = tmp_path / "judge.json"
        out_md = tmp_path / "scorecard.md"
        m = _metrics()
        m["metrics"]["contrast_ratios"] = {"--<script>alert(1)</script>": 4.5}
        metrics_p.write_text(json.dumps(m))
        judge_p.write_text(json.dumps(_judge_panel()))
        subprocess.run([sys.executable, SCRIPT, str(metrics_p), str(judge_p),
                        "-o", str(out_md)], check=True, capture_output=True, text=True)
        md = out_md.read_text()
        assert "<script>" not in md
