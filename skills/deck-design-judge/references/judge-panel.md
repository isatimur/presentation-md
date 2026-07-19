# The Judge — single (T1/T2) and consensus panel (T3)

## The judge prompt (use for T1/T2, and for each panellist in T3)

Score one deck against the rubric. Be a **skeptic**, not a hype man. The goal is a calibrated,
defensible number plus the fixes that raise it — not encouragement.

```
You are a senior presentation designer reviewing a slide deck against an explicit rubric.

CONTEXT
- Brand system (if provided): <faces, accent tokens, radii, flat-vs-elevated, from colors_and_type.css>
- Deterministic metrics already computed: <paste metrics.json>
- Rendered slides (T2/T3): <attach slide PNGs>  |  Source HTML (T1): <attach or summarize>

TASK
Read references/rubric.md. Score all 10 dimensions 0–5 using the anchors. For EACH dimension give
one line of concrete evidence — a slide number, a measured value, a quoted headline. Default to the
lower anchor when a dimension is only "fine"; reserve 5 for genuinely exemplary work.

Then assess the four judgment gates (orphan_stat, identical_grid, graveyard_outro, layout_overflow).
layout_overflow: only assess if you have screenshots; otherwise hit=null.

Cross-check the metrics, don't just restate them: if a G3 contrast flag is on a token used ONLY at
display size, say so and don't double-count it against `color`. If metrics say 9 layouts but they're
visually samey, trust your eyes for `variety`.

OUTPUT
Return ONLY the judge.json object from references/rubric.md § Output. No prose outside the JSON.
```

Attach the brand tokens and the metrics every time — a judge that can't see the system will
hallucinate brand-fidelity and contrast calls.

## T3 — multi-model consensus panel

Single judges have biases — in our internal calibration runs one model family consistently sat
several points below the others on the same decks. A panel cancels that: **N independent judges,
take the median per dimension.**

### Option A *(default — no external keys)* — diverse Claude subagents
Spawn 3 subagents with the **same** judge prompt + inputs but **different lenses** so they don't
fail the same way. Then median each dimension; a gate fires if **≥2** panellists flag it.
- Panellist 1 — *correctness lens*: "hunt for rule violations and overstated claims."
- Panellist 2 — *audience lens*: "you're a tired exec seeing each slide for 3 seconds."
- Panellist 3 — *brand lens*: "you wrote the design system; where does this deviate?"

### Option B — cross-vendor panel via `scripts/judge_panel.py`
Cheaper, genuinely independent architectures. `judge_panel.py` (pure stdlib) sends the judge
prompt — `rubric.md` + the deck source (+ optional `metrics.json`) — to every configured model at
**temperature 0** with an **explicit `max_tokens`**, parses each model's `judge.json` (tolerating
```json fences), and **medians every dimension** across the panel.

**Config** — [`references/judge-models.json`](judge-models.json): a list of
`{id, display, provider, key_env, max_tokens?, base_url?, enabled}`. Providers:
`anthropic` (→ `/v1/messages`), `openrouter` (→ OpenRouter chat/completions), and
`openai-compatible` (any `/chat/completions` gateway given a `base_url`).

**Keys** — each model names the env var that holds its key; a model whose key is unset is
**skipped with a reason**, never errored:
- `ANTHROPIC_API_KEY` — the `anthropic` models (Sonnet, Haiku)
- `OPENROUTER_API_KEY` — the OpenRouter models (DeepSeek, Qwen, GLM, Kimi)
- `OPENAI_API_KEY` — the `openai-compatible` GPT model

**Invocation:**
```bash
python3 <skill>/scripts/judge_panel.py <deck.html> \
  --metrics <workspace>/metrics.json \
  --out <workspace>/judge.json
# subset / one vendor:  --models claude-sonnet-5,deepseek/deepseek-chat
# default (no --models) runs every enabled model in the config (== --all-enabled)
```

**Output** — a scorecard.py-compatible `judge.json`: `tier` ("T3"), `dimensions` (each with the
integer `score`, the `median`, the closest-to-median `evidence`, and per-model `votes`), `gates`,
`summary`, two top-level integrity fields — `injection_suspect` and `anomalies` (see below) — plus a
`panel` block (models, per-model votes, `disagreements`, `errors`, `skipped`, `injection_matches`).
A dimension is flagged `disagreement` when its vote spread (max−min) exceeds 2. Feed it straight to
`scorecard.py` — the per-model votes flow through into `scorecard.json`.

**Gate rule (fail-closed on thin panels).** A gate `hit` is `null` (`"not assessed by panel"`) when
no panellist returned a verdict for it. Otherwise it fires when **≥2** panellists flag it — OR, when
the panel is too thin to reach that 2-vote quorum (fewer than 2 valid verdicts for the gate) and **at
least one** panellist flags it. A single honest flag on a thin panel therefore fires the gate rather
than being silently out-voted by a missing quorum. `evidence` reads `"panel: <hits>/<verdicts> flagged"`.

**Integrity fields (never silently absorbed).**
- `injection_suspect` (bool, top-level) — set when the deck source embeds its own `BEGIN/END DECK
  SOURCE` delimiter-like lines (a prompt-injection / delimiter-spoofing attempt). The matched lines
  are listed under `panel.injection_matches`, and a warning is printed to stderr. The run still
  proceeds — this flags gaming, it does not refuse. (The real delimiters carry a per-run
  `secrets.token_hex` nonce, so an embedded bare delimiter can never escape the untrusted block.)
- `anomalies` (list, top-level, mirrored under `panel.anomalies`) — every per-model score problem,
  each `{model, dimension, issue, raw, ...}`. `issue` is either `"invalid_type"` (a score that is
  neither numeric nor a numeric string — that vote is excluded, never counted as zero) or `"clamped"`
  (an out-of-range score pulled into `[0,5]`, still counted, with `clamped_to`). Numeric-string
  scores like `"4"` are coerced silently and are **not** anomalies. Each anomaly is also warned to stderr.

**Two operational caveats (learned the hard way):**
1. **Explicit `max_tokens` prevents gateway 402s.** Without a `max_tokens`, some gateways
   pre-authorise the *entire* output window against your credit balance and can `402` a whole run
   before generating a token. `judge_panel.py` always sends one (default **2048**, per-model
   overridable in the config).
2. **Errored models are EXCLUDED from the medians — never scored as zero.** A model that 402s,
   times out, or returns unparseable JSON drops out of the panel; the median is taken over the
   *valid* votes only, so one dead model never drags a dimension toward 0. Retries are bounded (2,
   exponential backoff) on 429/5xx; a `402` is terminal for that model. The **run** fails
   (exit 1, nothing scored) only if fewer than **2** models return valid votes.

Notes: **median, not mean** (resists a single outlier). Text-only models can't see screenshots — for
T3-visual either use vision-capable models or run Option A. Cost is ~a few cents/run.

## Calibrating the judge
If scores feel off, re-anchor on a deck you already trust: score a known-good deck from your own
library — it should land ~A/B with no gates. If the judge grades a known-good exemplar harshly, the rubric reading is mis-calibrated, not
the deck.
