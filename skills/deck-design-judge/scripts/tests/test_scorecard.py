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
