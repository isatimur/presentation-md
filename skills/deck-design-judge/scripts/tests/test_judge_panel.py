import json, os, sys
import urllib.error, urllib.request
import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import judge_panel as jp


# ---------- helpers ----------
def vote_text(scores=None, gates=None, fenced=False):
    """Build a model's raw judge.json content string. `scores` overrides per-dimension."""
    scores = scores or {}
    dims = {k: {"score": scores.get(k, 4), "evidence": f"ev-{k}"} for k in jp.DIMENSION_KEYS}
    g = gates or {k: {"hit": (None if k == "layout_overflow" else False), "evidence": "x"}
                  for k in jp.GATE_KEYS}
    body = json.dumps({"tier": "T1", "dimensions": dims, "gates": g, "summary": "s"})
    return f"```json\n{body}\n```" if fenced else body


class FakeResp:
    def __init__(self, text):
        self._t = text.encode()
    def read(self):
        return self._t
    def __enter__(self):
        return self
    def __exit__(self, *a):
        return False


def make_urlopen(responses, errors=None):
    """responses: {model_id: content-string}. errors: {model_id: http_status}."""
    errors = errors or {}

    def _urlopen(req, timeout=None):
        model = json.loads(req.data.decode())["model"]
        if model in errors:
            raise urllib.error.HTTPError(req.full_url, errors[model], "err", {}, None)
        content = responses[model]
        if "anthropic" in req.full_url:
            env = {"content": [{"type": "text", "text": content}]}
        else:
            env = {"choices": [{"message": {"content": content}}]}
        return FakeResp(json.dumps(env))

    return _urlopen


def run_panel(tmp_path, monkeypatch, models, responses, errors=None):
    monkeypatch.setattr(jp.urllib.request, "urlopen", make_urlopen(responses, errors))
    monkeypatch.setattr(jp, "RETRY_BASE_SLEEP", 0)
    monkeypatch.setenv("TESTKEY", "x")
    cfg = tmp_path / "models.json"
    cfg.write_text(json.dumps({"models": models}))
    deck = tmp_path / "deck.html"
    deck.write_text("<section class='slide'><h1>Hi</h1></section>")
    out = tmp_path / "judge.json"
    monkeypatch.setattr(sys, "argv",
                        ["judge_panel.py", str(deck), "--config", str(cfg), "--out", str(out)])
    return out


def three_openrouter():
    return [{"id": f"m{i}", "display": f"M{i}", "provider": "openrouter",
             "key_env": "TESTKEY", "enabled": True} for i in range(1, 4)]


# ---------- unit: parsing ----------
def test_parse_fence_wrapped_json():
    obj = jp.parse_judge_json("```json\n{\"dimensions\": {\"narrative\": {\"score\": 3}}}\n```")
    assert obj["dimensions"]["narrative"]["score"] == 3


def test_parse_prose_wrapped_json():
    obj = jp.parse_judge_json("Sure, here it is:\n{\"a\": 1}\nHope that helps.")
    assert obj["a"] == 1


# ---------- unit: aggregation ----------
def test_aggregate_medians():
    votes = {
        "a": json.loads(vote_text({"narrative": 5})),
        "b": json.loads(vote_text({"narrative": 4})),
        "c": json.loads(vote_text({"narrative": 3})),
    }
    dims, gates, dis = jp.aggregate(votes)
    assert dims["narrative"]["score"] == 4          # median of 5,4,3
    assert dims["narrative"]["votes"] == {"a": 5, "b": 4, "c": 3}
    assert dis == []


def test_aggregate_disagreement_flag():
    votes = {
        "a": json.loads(vote_text({"clarity": 5})),
        "b": json.loads(vote_text({"clarity": 4})),
        "c": json.loads(vote_text({"clarity": 1})),   # spread 4 > 2
    }
    dims, _, dis = jp.aggregate(votes)
    assert dims["clarity"].get("disagreement") is True
    assert any(d["dimension"] == "clarity" and d["spread"] == 4 for d in dis)


def test_aggregate_dimension_skipped_below_min_votes():
    # only one model provides a numeric 'close' score -> that dimension is skipped
    v1 = json.loads(vote_text())
    v2 = json.loads(vote_text())
    del v2["dimensions"]["close"]
    dims, _, _ = jp.aggregate({"a": v1, "b": v2})
    assert "close" not in dims
    assert "narrative" in dims


def test_aggregate_gate_fires_on_two_hits():
    hit = {k: {"hit": (True if k == "orphan_stat"
                       else None if k == "layout_overflow" else False), "evidence": "e"}
           for k in jp.GATE_KEYS}
    votes = {
        "a": json.loads(vote_text(gates=hit)),
        "b": json.loads(vote_text(gates=hit)),
        "c": json.loads(vote_text()),
    }
    _, gates, _ = jp.aggregate(votes)
    assert gates["orphan_stat"]["hit"] is True
    assert gates["layout_overflow"]["hit"] is None   # all null -> not assessed


# ---------- integration: full run through main() ----------
def test_happy_path_medians(tmp_path, monkeypatch):
    responses = {"m1": vote_text({"narrative": 5}),
                 "m2": vote_text({"narrative": 4}),
                 "m3": vote_text({"narrative": 3})}
    out = run_panel(tmp_path, monkeypatch, three_openrouter(), responses)
    jp.main()
    data = json.loads(out.read_text())
    assert data["dimensions"]["narrative"]["score"] == 4
    assert set(data["panel"]["models"]) == {"m1", "m2", "m3"}
    assert data["panel"]["errors"] == []


def test_fence_wrapped_response_parsed(tmp_path, monkeypatch):
    responses = {"m1": vote_text({"narrative": 4}, fenced=True),
                 "m2": vote_text({"narrative": 4}, fenced=True),
                 "m3": vote_text({"narrative": 4}, fenced=True)}
    out = run_panel(tmp_path, monkeypatch, three_openrouter(), responses)
    jp.main()
    data = json.loads(out.read_text())
    assert data["dimensions"]["narrative"]["score"] == 4
    assert len(data["panel"]["models"]) == 3


def test_errored_model_excluded_not_zeroed(tmp_path, monkeypatch):
    # m3 hard-fails (402); the median must come from m1,m2 only — not counting m3 as 0
    responses = {"m1": vote_text({"narrative": 4}),
                 "m2": vote_text({"narrative": 4})}
    out = run_panel(tmp_path, monkeypatch, three_openrouter(), responses, errors={"m3": 402})
    jp.main()
    data = json.loads(out.read_text())
    assert data["dimensions"]["narrative"]["score"] == 4     # not dragged toward 0
    assert data["dimensions"]["narrative"]["votes"] == {"m1": 4, "m2": 4}
    assert [e["model"] for e in data["panel"]["errors"]] == ["m3"]
    assert "m3" not in data["panel"]["models"]


def test_min_votes_failure_exits_nonzero(tmp_path, monkeypatch):
    # two of three error -> only one valid vote -> run fails
    responses = {"m1": vote_text()}
    out = run_panel(tmp_path, monkeypatch, three_openrouter(), responses,
                    errors={"m2": 402, "m3": 500})
    with pytest.raises(SystemExit) as ei:
        jp.main()
    assert ei.value.code == 1
    data = json.loads(out.read_text())
    assert "error" in data
    assert data["panel"]["models"] == ["m1"]


def test_missing_key_env_skips_model(tmp_path, monkeypatch):
    models = three_openrouter()
    models[2]["key_env"] = "UNSET_KEY_ENV_XYZ"   # m3 has no key -> skipped, not errored
    responses = {"m1": vote_text(), "m2": vote_text()}
    out = run_panel(tmp_path, monkeypatch, models, responses)
    monkeypatch.delenv("UNSET_KEY_ENV_XYZ", raising=False)
    jp.main()
    data = json.loads(out.read_text())
    assert [s["model"] for s in data["panel"]["skipped"]] == ["m3"]
    assert set(data["panel"]["models"]) == {"m1", "m2"}


def test_retry_then_success_on_500(tmp_path, monkeypatch):
    # first call 500s, retry succeeds — exercises the backoff path
    calls = {"m1": 0}
    good = vote_text()

    def _urlopen(req, timeout=None):
        model = json.loads(req.data.decode())["model"]
        if model == "m1":
            calls["m1"] += 1
            if calls["m1"] == 1:
                raise urllib.error.HTTPError(req.full_url, 500, "err", {}, None)
        env = {"choices": [{"message": {"content": good}}]}
        return FakeResp(json.dumps(env))

    monkeypatch.setattr(jp.urllib.request, "urlopen", _urlopen)
    monkeypatch.setattr(jp, "RETRY_BASE_SLEEP", 0)
    monkeypatch.setenv("TESTKEY", "x")
    cfg = tmp_path / "m.json"; cfg.write_text(json.dumps({"models": three_openrouter()}))
    deck = tmp_path / "d.html"; deck.write_text("<section class='slide'>x</section>")
    out = tmp_path / "j.json"
    monkeypatch.setattr(sys, "argv",
                        ["judge_panel.py", str(deck), "--config", str(cfg), "--out", str(out)])
    jp.main()
    assert calls["m1"] == 2                       # failed once, retried once
    assert json.loads(out.read_text())["dimensions"]["narrative"]["score"] == 4
