# Hallmark × presentation-md experiment

Honest documentation of what Hallmark can and cannot do for this project.

## Install (this session)

```bash
cd /Users/timur_isachenko/Dev/presentation-skill-pack
npx skills add nutlope/hallmark -y -a cursor -a claude-code
```

Landed at:

- Project skill: `.agents/skills/hallmark/` (SKILL.md + `references/`)
- Symlinked for Claude Code agent detection
- Locked in `skills-lock.json` (`source: nutlope/hallmark`)

Official install (from [Nutlope/hallmark](https://github.com/Nutlope/hallmark) / [usehallmark.com](https://www.usehallmark.com)):

```bash
npx skills add nutlope/hallmark
```

## Verbs used

| Verb | What we did |
| --- | --- |
| `audit` | Scored `web/index.html`, `web/pricing.html`, `web/vs/hallmark.html` — see [AUDIT.md](./AUDIT.md) |
| `redesign` | In-place craft fixes on the marketing site while locking **signal-grid** via root [`design.md`](../../../design.md) |
| `build` | This folder’s [`index.html`](./index.html) — Narrative Workflow pitch **page** about presentation-md |
| `study` | Not required; brand DNA already locked in `design.md` |

## Artifacts

| Path | Producer | What it is |
| --- | --- | --- |
| `web/examples/hallmark-experiment/index.html` | **Hallmark build** | Standalone HTML pitch page (scroll-snap “slides”) |
| `web/examples/hallmark-experiment/AUDIT.md` | **Hallmark audit** | Punch list against the live marketing site |
| `examples/decks/hallmark-experiment-pitch.json` | **presentation-md** (hand-authored from Hallmark beats) | Typed Deck JSON sibling — schema, `signal` theme, exportable |
| `design.md` (repo root) | Hallmark multi-page redesign protocol | Locked signal-grid system for the site |

## What Hallmark produced vs what our stack produces

**Hallmark produced**

- Anti-slop craft rules applied to a **page**
- Macrostructure stamp (`Narrative Workflow`), token discipline, asymmetric sequence, no icon-tile 3-up, no purple hero
- Scroll rhythm that *feels* like a pitch — but remains freeform HTML/CSS

**Hallmark did not produce**

- Deck JSON
- Theme swap without rewrite
- `audit_deck` / `judge_deck` craft gates
- Studio `?d=` share link
- Native editable PPTX

**presentation-md produces** (from the sibling JSON)

- Schema-validated slides
- Retheme via `meta.theme` / `apply_theme`
- MCP + Studio craft loop
- HTML render + PPTX export

## When to use which

| Job | Tool |
| --- | --- |
| Marketing site, landing, UI chrome, redesign/audit of pages | **Hallmark** |
| Pitch / board / launch / wrap as slides people edit in PowerPoint / Studio | **presentation-md** |
| Site redesign that must keep cool paper + signal red | Hallmark **+** `design.md` brand lock (do not let catalog themes wash out signal-grid) |

## Local preview

```bash
# Hallmark page
open web/examples/hallmark-experiment/index.html
# or after vercel build / static serve: /examples/hallmark-experiment/

# Deck JSON sibling — Studio or renderer
# studio/?… or MCP render_deck on examples/decks/hallmark-experiment-pitch.json
```
