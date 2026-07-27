import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import deck_metrics as dm

SCRIPT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "deck_metrics.py")
SAMPLE = os.path.join(os.path.dirname(__file__), "fixtures", "sample.deck.json")

def _deck(slides, meta=None):
    return {"type": "deck", "meta": meta or {"theme": "default-tech"}, "slides": slides}

def test_iter_text_blocks_skips_structural_keys():
    blocks = list(dm.iter_text_blocks(
        {"layout": "title", "heading": "Hello world", "icon": "fa-bolt", "href": "#"}))
    assert blocks == ["Hello world"]

def test_iter_text_blocks_walks_cards():
    blocks = list(dm.iter_text_blocks(
        {"layout": "feature-grid", "cards": [{"title": "A", "body": "B", "icon": "x"}]}))
    assert blocks == ["A", "B"]

def test_output_shape_matches_html_analyze():
    r = dm.analyze_deck_json(_deck([{"layout": "title", "heading": "Hi"}]))
    assert set(r.keys()) == {"metrics", "flags"}
    assert r["metrics"]["slide_count"] == 1
    assert r["metrics"]["mode"] == "json"

def test_wall_of_text_gates():
    big = " ".join(["word"] * 45)
    r = dm.analyze_deck_json(_deck([{"layout": "two-column", "heading": "H", "body": big}]))
    assert sum(1 for f in r["flags"] if f["id"] == "G1" and f["severity"] == "gate") == 1

def test_dense_total_warns_without_gating():
    slide = {"layout": "two-column",
             "heading": " ".join(["a"] * 35), "body": " ".join(["b"] * 38)}  # 73 total, max block 38
    r = dm.analyze_deck_json(_deck([slide]))
    assert any(f["id"] == "words" for f in r["flags"])
    assert not any(f["id"] == "G1" for f in r["flags"])

def test_cadence_warns_on_three_in_a_row():
    slides = [{"layout": "stat-row", "heading": f"s{i}"} for i in range(3)]
    r = dm.analyze_deck_json(_deck(slides))
    assert any(f["id"] == "cadence" for f in r["flags"])

def test_cadence_quiet_on_two_in_a_row():
    slides = [{"layout": "stat-row", "heading": "a"},
              {"layout": "stat-row", "heading": "b"},
              {"layout": "quote", "quote": "c"}]
    r = dm.analyze_deck_json(_deck(slides))
    assert not any(f["id"] == "cadence" for f in r["flags"])

def test_orphan_stat_warns():
    r = dm.analyze_deck_json(_deck([{"layout": "stat-row",
                                     "stats": [{"value": "87%", "label": "retention"}]}]))
    assert any(f["id"] == "orphan_stat" for f in r["flags"])

def test_stat_with_note_is_clean():
    r = dm.analyze_deck_json(_deck([{"layout": "stat-row",
        "stats": [{"value": "87%", "label": "retention", "note": "vs 34% industry"}]}]))
    assert not any(f["id"] == "orphan_stat" for f in r["flags"])

def test_metric_hero_without_context_warns():
    r = dm.analyze_deck_json(_deck([{"layout": "metric-hero", "value": "$4M", "label": "ARR"}]))
    assert any(f["id"] == "orphan_stat" for f in r["flags"])

def test_cli_auto_detects_json():
    out = subprocess.run([sys.executable, SCRIPT, SAMPLE],
                         capture_output=True, text=True, check=True).stdout
    result = json.loads(out)
    assert result["metrics"]["mode"] == "json"
    assert result["metrics"]["slide_count"] == 4
    # sample is clean: no gates
    assert not any(f["severity"] == "gate" for f in result["flags"])
