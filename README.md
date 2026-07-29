# presentation-md

**Turn rough notes into a polished slide deck — in any AI agent. Then export it to PowerPoint, Keynote, or Google Slides.**

[![npm version](https://img.shields.io/npm/v/@presentation-md/core)](https://www.npmjs.com/package/@presentation-md/core)
[![PyPI](https://img.shields.io/pypi/v/presentation-md-render)](https://pypi.org/project/presentation-md-render/)
[![CI](https://github.com/isatimur/presentation-md/actions/workflows/ci.yml/badge.svg)](https://github.com/isatimur/presentation-md/actions/workflows/ci.yml)
[![Gallery](https://img.shields.io/badge/gallery-25%20decks-7C3AED)](https://presentation-md.vercel.app/#gallery)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<p align="center">
  <img src="docs/hero-demo.gif" alt="Six decks the pack rendered — pitch, brand, pricing, keynote — cycling to show the range" width="820" />
  <br/>
  <em>Six real decks the pack rendered — same structured spec, swappable themes. No screenshots, no lock-in.</em>
</p>

🌐 **[presentation-md.vercel.app](https://presentation-md.vercel.app)** — live gallery of 25 showcase decks · **[Studio](https://presentation-md.vercel.app/studio)** — edit decks in the browser

> ⭐ If this turned your notes into a deck you'd actually present, star the repo.

---

## Quick start

```bash
npx @presentation-md/install claude-code
```

That single command installs the skill file and registers the MCP server for your agent. Restart your agent and ask it to "create a presentation about…" — it produces a validated deck JSON and renders a self-contained HTML file you can open in any browser, or export to native, editable **PowerPoint** (which opens in Keynote and imports into Google Slides).

---

## Why this vs. Gamma / Slidev / Marp

- **Structured JSON your agent edits, not opaque slides.** Every deck is a schema-validated Deck JSON spec — the agent reads it, diffs it, and rewrites a single slide on request, instead of regenerating a black-box layout.
- **Native, editable PPTX / Keynote / Google Slides export.** Because slides are structured data, each one maps to real native shapes — one exporter produces a `.pptx` that opens in PowerPoint, opens in Keynote, and imports into Google Slides. No screenshots, no lock-in.
- **Works in any agent, not one app.** Claude Code, Cursor, Codex, Gemini CLI, Copilot, or plain CLI — one `npx` install wires the skill + MCP server into whatever you already use.
- **25-deck proof gallery, live.** See the output before you install: [25 showcase decks](https://presentation-md.vercel.app/#gallery) rendered by the pack, editable in the browser [Studio](https://presentation-md.vercel.app/studio). Five flagships also ship as **schema-rendered Deck JSON** (`examples/decks/` → `web/examples/structured/`) so the structured path is as visible as the craft gallery.

---

## What it is

presentation-md is a universal skill layer that gives AI coding agents (Claude Code, Cursor, Codex, Gemini CLI, Copilot, and plain CLI) a structured, schema-validated way to author slide decks. The agent writes a Deck JSON spec; the renderer turns it into a single self-contained HTML file — no build tool, no slide host. The same deck exports to native, editable **PowerPoint** (which opens in **Keynote** and imports into **Google Slides**), and a browser **studio** lets you open a created deck and edit it with live preview. Themes are swappable, publishable npm packages, and the MCP server exposes the whole workflow as typed tools.

This repo also carries **[deck-design-judge](skills/deck-design-judge)** — a quality gate for any HTML deck (not just ones this pack made): deterministic metrics and hard gates (wall-of-text, contrast, overflow), a 10-dimension design rubric, and an optional **cross-vendor multi-model judge panel** (`judge_panel.py`, configurable across Anthropic / OpenRouter / OpenAI models) that medians per dimension and emits a shareable, versioned `scorecard.json` so results can be tracked and compared publicly. **`npx @presentation-md/install <adapter>` (full mode)** copies it into your agent's skills directory alongside `presentation-generator` (Claude Code, Codex, Cursor). Cross-model results for this pack and comparable skills are published at [swiirl-deck-benchmark.vercel.app](https://swiirl-deck-benchmark.vercel.app) (benchmark source is private for now — it vendors third-party skills with mixed licenses). Full provenance and ecosystem links: [ATTRIBUTION.md](ATTRIBUTION.md).

---

## Packages

| Package | Description |
|---|---|
| [`@presentation-md/core`](packages/core) | Deck + theme schemas, theme loader, validator, and bundled default-tech theme |
| [`@presentation-md/render`](packages/renderer-node) | Node.js renderer — CLI (`presentation-md-render`) + programmatic API |
| [`@presentation-md/export`](packages/export) | PPTX round-trip — Deck JSON ↔ editable PowerPoint (`.pptx`) |
| [`@presentation-md/studio`](packages/studio) | Browser editor — hosted at [presentation-md.vercel.app/studio](https://presentation-md.vercel.app/studio) (in-repo; not published to npm) |
| [`@presentation-md/mcp-server`](packages/mcp-server) | MCP server exposing all tools to any MCP-compatible agent (`presentation-md-mcp`) |
| [`@presentation-md/install`](packages/install) | One-command installer that wires the skill + MCP server into your agent (`presentation-md-install`) |
| [`@presentation-md/create-theme`](packages/create-theme) | Scaffold a new publishable theme package (`create-presentation-md-theme`), interactively or from a brand's URL/CSS (`--from-url`/`--from-css`) |
| [`@presentation-md/theme-corporate`](packages/themes/corporate) | Formal corporate theme |
| [`@presentation-md/theme-playful`](packages/themes/playful) | Playful creative-agency theme |
| [`@presentation-md/theme-luxury-minimalist`](packages/themes/luxury-minimalist) | Luxury minimalist theme |
| [`@presentation-md/theme-retro-arcade`](packages/themes/retro-arcade) | Retro 80s arcade theme |
| [`@presentation-md/theme-editorial-serif`](packages/themes/editorial-serif) | Magazine-editorial theme |
| [`@presentation-md/theme-brutalist-mono`](packages/themes/brutalist-mono) | Raw brutalist monospace theme |
| [`@presentation-md/theme-pastel-dreamy`](packages/themes/pastel-dreamy) | Soft pastel dreamy theme |
| [`presentation-md-render`](packages/renderer-python) _(PyPI)_ | Python renderer for agents and pipelines running outside Node.js |

---

## Themes

| Theme | Vibe |
|---|---|
| `default-tech` | Dark background, electric-blue accent, mono code feel — ships bundled in core |
| `corporate` | Crisp white canvas, navy text, restrained blue accent — boardroom-ready |
| `playful` | Warm white, coral + lime accents, rounded corners, oversized type — creative-agency energy |
| `luxury-minimalist` | Off-white canvas, charcoal text, hairline borders, zero gradients — quiet confidence |
| `retro-arcade` | Deep purple-black background, magenta + cyan neon, pixel fonts — 8-bit nostalgia |
| `editorial-serif` | Warm cream paper, ink-black serif type, crimson masthead accent — magazine editorial |
| `brutalist-mono` | Concrete off-white, monospace type, zero radius, hazard-orange accent — raw & technical |
| `pastel-dreamy` | Lavender-blush canvas, deep plum text, blush + periwinkle accents — soft and approachable |

Need a theme that isn't here? `create-presentation-md-theme --from-url <site>` or `--from-css <file>`
generates one from any brand's live site or CSS in seconds — see
[`@presentation-md/create-theme`](packages/create-theme).

---

## Adapters

| Adapter | Description | Install |
|---|---|---|
| `claude-code` | Copies skill to `~/.claude/skills/` + registers MCP server in `~/.claude/mcp.json` | `npx @presentation-md/install claude-code` |
| `cursor` | Adds `.mdc` rule to `~/.cursor/rules/` + MCP server entry | `npx @presentation-md/install cursor` |
| `copilot` | Writes to `.github/copilot-instructions.md` + `.vscode/mcp.json` (run from project root) | `npx @presentation-md/install copilot` |
| `codex` | Adds skill to `~/.codex/instructions.md` + MCP server | `npx @presentation-md/install codex` |
| `gemini-cli` | Writes GEMINI.md skill to `~/.gemini/instructions/` + MCP server | `npx @presentation-md/install gemini-cli` |
| `cli` | Standalone — renders decks via the `presentation-md-render` CLI, no MCP | `npx @presentation-md/install cli` |

---

## Deck JSON example

```json
{
  "type": "deck",
  "meta": {
    "title": "Q3 Product Review",
    "company": "Acme Inc.",
    "theme": "corporate"
  },
  "slides": [
    {
      "layout": "title",
      "heading": "Q3 Product Review",
      "subheading": "July – September 2026"
    },
    {
      "layout": "stat-row",
      "heading": "By the numbers",
      "stats": [
        { "label": "MRR", "value": "$420k", "delta": "+18%" },
        { "label": "Active users", "value": "12,400", "delta": "+31%" },
        { "label": "NPS", "value": "67", "delta": "+9 pts" }
      ]
    },
    {
      "layout": "two-column",
      "heading": "What we shipped",
      "left": "**Instant replay** — users can re-watch any session segment in one click.\n\n**Smart digest** — daily AI summary delivered to Slack.",
      "right": "**API v2** — full REST + webhook parity with the legacy SOAP interface.\n\n**iOS 18 widgets** — glanceable stats on the lock screen."
    },
    {
      "layout": "feature-grid",
      "heading": "Upcoming in Q4",
      "columns": 2,
      "cards": [
        { "title": "Real-time co-editing", "body": "Multiple agents annotating the same deck simultaneously." },
        { "title": "Theme marketplace", "body": "Browse and install community themes directly from the CLI." },
        { "title": "PDF export", "body": "One-command headless export via Playwright." },
        { "title": "Enterprise SSO", "body": "SAML 2.0 + SCIM provisioning for large org rollouts." }
      ]
    },
    {
      "layout": "quote",
      "quote": "The best presentation is the one that actually gets made.",
      "attribution": "— Every engineer who missed a deadline"
    },
    {
      "layout": "timeline",
      "heading": "Q4 milestones",
      "events": [
        { "date": "Oct 15", "label": "Co-editing beta" },
        { "date": "Nov 1",  "label": "Theme marketplace launch" },
        { "date": "Nov 20", "label": "PDF export GA" },
        { "date": "Dec 10", "label": "Enterprise SSO GA" }
      ]
    },
    {
      "layout": "data-table",
      "heading": "Regional breakdown",
      "headers": ["Region", "MRR", "Growth"],
      "rows": [
        ["North America", "$210k", "+22%"],
        ["Europe",        "$140k", "+15%"],
        ["APAC",          "$70k",  "+41%"]
      ]
    },
    {
      "layout": "closing",
      "heading": "Questions?",
      "subheading": "deck source at github.com/isatimur/presentation-md"
    }
  ]
}
```

---

## Import from PowerPoint

Bring an existing `.pptx` back into Deck JSON for editing, re-theming, or agent iteration:

```bash
# CLI
presentation-md-render --from-pptx board-deck.pptx -o deck.json --theme corporate
```

Agents can call the `import_pptx` MCP tool. Fidelity notes (layouts, images, speaker notes) live in
[`packages/core/references/pptx-import.md`](packages/core/references/pptx-import.md).

## Export to PowerPoint, Keynote & Google Slides

Because a deck is *structured* data (not free-form HTML), every slide maps cleanly to native
slide shapes. One exporter covers all three apps:

```bash
# CLI
presentation-md-render deck.json --format pptx -o deck.pptx
```

```ts
// Programmatic (Node)
import { renderDeckPptx } from "@presentation-md/render";
await writeFile("deck.pptx", await renderDeckPptx(deckJson));
```

The result is a **native, editable** `.pptx`:

- **PowerPoint** — opens directly.
- **Keynote** — File → Open (Keynote has no portable native format; `.pptx` is the bridge).
- **Google Slides** — File → Import slides / upload to Drive → opens as an editable Slides deck.

Agents can call the `export_deck` MCP tool. Fidelity notes (fonts, colors, images) live in
[`packages/export/references/pptx-fidelity.md`](packages/export/references/pptx-fidelity.md).

## Studio

[`@presentation-md/studio`](packages/studio) is a browser editor: edit a deck through
schema-driven forms, see a live preview, and download HTML or `.pptx`. It's a fully static Vite SPA
(client-side render + export, no backend).

```bash
pnpm --filter @presentation-md/studio dev           # local editor
pnpm --filter @presentation-md/studio build:web   # static build → web/studio/ (Vercel)
```

## MCP tools

| Tool | Purpose |
|---|---|
| `render_deck` | Render a Deck JSON string to a self-contained HTML file |
| `export_deck` | Export a Deck JSON to a native, editable PowerPoint (`.pptx`) — or html |
| `audit_deck` | Schema-validate a deck and return structured issues with severity |
| `list_themes` | Enumerate available themes (bundled + installed) with name, version, and vibe |
| `apply_theme` | Swap `meta.theme` on a deck without rewriting slides |
| `generate_deck_prompt` | Build a generation prompt wired to a theme + schema |
| `import_pptx` | Import a `.pptx` into Deck JSON |
| `preview_themes` | Render 3 one-slide theme previews for visual style discovery |
| `import_brand_theme` | Generate a theme from a brand URL or CSS file |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT — see [LICENSE](LICENSE).
