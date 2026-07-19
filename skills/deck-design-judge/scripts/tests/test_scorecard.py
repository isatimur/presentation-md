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
