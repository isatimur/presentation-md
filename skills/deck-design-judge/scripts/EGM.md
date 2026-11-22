# skills/deck-design-judge/scripts

## Overview
The scoring pipeline behind the `deck-design-judge` skill. `deck_metrics.py`
computes deterministic metrics and gates G1-G5. `judge_panel.py` asks several
LLMs to score the rubric and takes the median. `scorecard.py` merges both into
a 0-100 score, a letter grade, and a ready verdict. `render_slides.sh` and
`_isolate_slides.py` make one PNG per slide. `brand_tokens.py` projects one
brand-token file into CSS or deck-JSON form. All Python is stdlib only.

## Interface
- `deck_metrics.py <deck> [--tokens css] [--format auto|html|json] [-o metrics.json]`. Output: `{"metrics": {...}, "flags": [{id, severity, detail, slide?}]}`. [deck_metrics.py:main], [deck_metrics.py:analyze], [deck_metrics.py:analyze_deck_json]
- Library helpers: `find_slides`, `iter_text_blocks`, `contrast`, `luminance`, `parse_root_vars`. [deck_metrics.py:find_slides], [deck_metrics.py:iter_text_blocks], [deck_metrics.py:contrast]
- `judge_panel.py <deck> [--models id,id | --all-enabled] [--out judge.json] [--metrics m.json] [--config path] [--rubric path]`. [judge_panel.py:main]
- Library helpers: `build_prompt`, `call_model`, `parse_judge_json`, `aggregate`, `scan_for_delimiter_spoofing`, `load_config`, `select_models`, `ModelError`. [judge_panel.py:aggregate], [judge_panel.py:build_prompt], [judge_panel.py:ModelError]
- `scorecard.py metrics.json judge.json -o scorecard.md [--json scorecard.json] [--deck path] [--target 85]`. [scorecard.py:main], [scorecard.py:build_scorecard_json]
- `brand_tokens.py <tokens.json> --css | --meta`; library `load`, `to_root_css`, `to_meta_brand`. [brand_tokens.py:to_root_css], [brand_tokens.py:to_meta_brand]
- `render_slides.sh <deck.html> <out_dir/> [width] [height]` (default 1600x900). [render_slides.sh:W]
- `_isolate_slides.py <deck.html> <out_dir/>`: prints the slide count. Library `extract_slide_chunks`, `isolate_slide_html`. [_isolate_slides.py:main]
- Defaults read from the skill: `references/judge-models.json` and `references/rubric.md`. [judge_panel.py:DEFAULT_CONFIG], [judge_panel.py:DEFAULT_RUBRIC]

## Invariants
- A slide is a `<section>` or `<div>` whose `class` has the exact token `slide`. Both files use the same rule. [deck_metrics.py:_has_slide_class], [_isolate_slides.py:has_slide_class]
- `_isolate_slides.py` mirrors `extractSlideChunks` and `isolateSlideHtml` in `packages/mcp-server/src/lib/screenshot-slides.ts`. Change both together. [_isolate_slides.py:screenshot-slides.ts]
- G1 fires above 40 words on a slide. [deck_metrics.py:WORD_GATE]
- The panel scores 10 dimensions and 4 judgment gates. The keys must match `scorecard.py`. [judge_panel.py:DIMENSION_KEYS], [judge_panel.py:GATE_KEYS], [scorecard.py:WEIGHTS], [scorecard.py:JUDGE_GATE_MAP]
- A dimension needs at least 2 valid votes. A run needs at least 2 valid models, or it writes an error `judge.json` and exits 1. [judge_panel.py:MIN_VOTES]
- An errored model is excluded, never scored as zero. A model with an unset `key_env` is skipped. [judge_panel.py:main]
- A vote spread above 2 flags disagreement. [judge_panel.py:DISAGREE_SPREAD]
- Every coercion problem is recorded in `anomalies`, not hidden. [judge_panel.py:aggregate]
- Each run puts a fresh nonce (`secrets.token_hex(8)`) on the deck-source delimiters. The spoofing scan only flags; it never refuses. [judge_panel.py:build_prompt], [judge_panel.py:scan_for_delimiter_spoofing]
- HTTP 402 is terminal for a model. 429, 5xx, and network errors retry twice with backoff. [judge_panel.py:RETRIES], [judge_panel.py:_post_with_retries]
- `scorecard.py` treats `judge.json` as untrusted. Out-of-range scores are clamped and set `tampered`. Invalid scores are dropped. [scorecard.py:validate_dims]
- `ready` needs no gate hits, `weighted >= target`, at least 7 of 10 dimensions, and `tampered == False`. [scorecard.py:MIN_DIMS_FOR_READY], [scorecard.py:main]
- Model-derived strings in `scorecard.md` are escaped and capped at 300 characters. [scorecard.py:md_safe], [scorecard.py:MD_MAX_LEN]
- `render_slides.sh` exits 3 with `NO_CHROME` when no Chrome or Chromium is found. [render_slides.sh:CHROME]

## Side Effects
- `judge_panel.py` sends the deck source and rubric over HTTPS POST to Anthropic, OpenRouter, or an OpenAI-compatible URL. API keys come from the env var named by each model's `key_env`. [judge_panel.py:_request], [judge_panel.py:_post_with_retries]
- `deck_metrics.py -o`, `judge_panel.py --out`, and `scorecard.py -o/--json` write files. Without them, the first two print to stdout. [deck_metrics.py:main], [judge_panel.py:_emit], [scorecard.py:main]
- `scorecard.py --deck` reads the deck to hash it with SHA-256. [scorecard.py:sha256_file]
- `render_slides.sh` runs headless Chrome. It writes `full.png`, `slide-NN.png`, and `_iso/slide-NN.html` under the output folder. [render_slides.sh:ISO_HELPER], [_isolate_slides.py:main]

## Verification
- Run: `python3 -m pytest skills/deck-design-judge/scripts/tests` (from the repo root)
- There is no pytest config (`pytest.ini`, `pyproject.toml`, `setup.cfg`, `conftest.py`). The tests follow pytest naming and add `scripts/` to `sys.path` themselves. Root `pnpm test` and CI do not run them.
