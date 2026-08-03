# Launch pack — presentation-md

*Workflows: `directory-submissions` (primary) + `launch-strategy` + `social-content`.*  
*Context: `.agents/product-marketing-context.md` · Site: https://presentation-md.vercel.app*

---

## Positioning one-liner (vs frontend-slides)

**frontend-slides** is a strong discovery / vibe pack — prompt templates and bold looks.  
**presentation-md** is the product layer agents need to ship decks for real: schema-validated Deck JSON, **75 themes**, MCP craft gates, Studio, and **native editable PowerPoint** (Keynote / Google Slides).

Short punch:

> Notes in. Schema-crafted deck out — inside the AI agent you already use. HTML you own + editable PPTX.

---

## Short launch announcement

**presentation-md is live** — a universal skill for Claude Code, Cursor, Codex, Gemini CLI, and Copilot.

Paste rough notes. Your agent writes schema-validated Deck JSON. You get a self-contained HTML deck plus native editable PowerPoint — not a screenshot dump, not a platform lock-in.

- 75 themes · 18 layouts · MCP tools (`preview_themes`, `audit_deck`, `export_deck`, …)
- One install: `npx @presentation-md/install <agent>`
- Or: `npx skills add isatimur/presentation-md --skill presentation-generator`
- Gallery + Studio: https://presentation-md.vercel.app

Built to beat prompt-only slide packs. Star it if a deck actually ships: https://github.com/isatimur/presentation-md

---

## Social posts (3)

### 1 — LinkedIn (B2B / builders)

Making a deck still yanks you out of the agent where the work already lives.

I open-sourced **presentation-md**: your coding agent turns notes into a schema-crafted slide deck — 75 themes, craft gates, then **editable PowerPoint** (Keynote / Google Slides) or a single HTML file you own.

Not another Gamma clone. Not prompt → spaghetti HTML. Deck JSON agents can diff, audit, and re-theme.

```
npx @presentation-md/install claude-code
# also: cursor | copilot | codex | gemini-cli
```

Gallery: https://presentation-md.vercel.app  
vs frontend-slides: https://presentation-md.vercel.app/vs/frontend-slides

Would love honest feedback on the positioning — especially if you already use frontend-slides or Gamma.

### 2 — X / Twitter (thread-ready single post)

Unpopular opinion: “AI slides” that spit freeform HTML are why decks still take an afternoon.

presentation-md = skill + MCP for Claude / Cursor / Codex / Gemini / Copilot.

Notes → schema Deck JSON → HTML + editable PPTX. 75 themes. Craft audit before you ship.

`npx @presentation-md/install cursor`

https://presentation-md.vercel.app

### 3 — Reddit (r/SideProject / r/LocalLLaMA-friendly tone)

**I built an agent skill that turns notes into real slide decks (HTML + editable PPTX)**

Problem: Gamma/Tome live outside my editor; prompt-only HTML packs look cool once then fall apart when I need to edit one slide or hand a .pptx to a founder.

What shipped:
- Universal install for Claude Code / Cursor / Copilot / Codex / Gemini CLI
- Schema-validated Deck JSON (18 layouts) + 75 theme packages
- MCP: preview themes, audit/judge craft, export PPTX, import PPTX/Markdown
- Browser Studio at presentation-md.vercel.app/studio

```
npx @presentation-md/install claude-code
```

MIT · https://github.com/isatimur/presentation-md  
Honest take welcome — especially vs frontend-slides / Marp / Slidev for agent workflows.

---

## Show HN draft

**Title:** Show HN: presentation-md – schema-crafted slide decks for AI coding agents (HTML + PPTX)

**Body:**

I got tired of two bad options: (1) SaaS slide tools outside my editor, and (2) agents dumping freeform HTML that looks fine until you need to edit slide 4 or hand a founder a PowerPoint.

presentation-md is an open-source skill + MCP server. The agent targets a typed Deck JSON schema; a renderer emits self-contained HTML; an exporter maps layouts to native editable .pptx (opens in Keynote; imports to Google Slides). Themes are publishable npm packages (75 shipped).

Install:

```
npx @presentation-md/install claude-code   # or cursor, copilot, codex, gemini-cli
```

Also: `npx skills add isatimur/presentation-md --skill presentation-generator`

Demo gallery / Studio (no install): https://presentation-md.vercel.app

Curious what breaks first for people who already live in Claude Code or Cursor.

---

## Product Hunt outline

| Field | Copy |
|---|---|
| **Name** | presentation-md |
| **Tagline** (≤60 chars) | Schema-crafted decks for AI agents — HTML + editable PPTX |
| **Topics** | Developer Tools, Artificial Intelligence, Productivity |
| **Gallery** | Hero GIF (`docs/hero-demo.gif`), Studio shot, 3 theme proofs, vs table |
| **Description** | See `announcement` above + gallery link + install one-liner |
| **First comment** | Why I built it (agent-native vs Gamma lock-in vs prompt-only HTML); what to try first (`npx` install → one pitch deck → export PPTX); ask for **feedback**, not upvotes |
| **Launch window** | Tue/Wed/Thu · 12:01 AM PT · after 3-week hunter warm-up |
| **CTA** | https://presentation-md.vercel.app/#start |

---

## Directory submission blurbs (vary by tier)

### Startup / launch (PH, DevHunt, Fazier, Uneed, BetaList)

**Tagline:** Schema-crafted slide decks inside the AI agent you already use.

**Short (≤60):** Notes → polished deck + editable PPTX — for AI agents.

**Long:** presentation-md is the easiest way for developers to turn rough notes into a polished slide deck without leaving Claude Code, Cursor, Codex, Gemini CLI, or Copilot. Unlike Gamma or Tome, it runs inside your agent and emits a portable HTML file you own — plus native editable PowerPoint for Keynote and Google Slides. Schema-validated Deck JSON, 75 themes, MCP craft gates, and a browser Studio. Free and MIT. Try it at https://presentation-md.vercel.app

**Tags:** AI agent, slides, PowerPoint, MCP, developer tools, presentations, Claude, Cursor

### SaaS / alternatives (AlternativeTo, SaaSHub, SourceForge)

**Tagline:** The agent-native alternative to Gamma, Tome, and frontend-slides.

**Long:** presentation-md is a developer-focused alternative to Gamma, Tome, and Beautiful.ai — built for people who already work in an AI coding agent. Where those tools lock output to their platform, presentation-md exports self-contained HTML and native editable PowerPoint. Where prompt-only packs stop at vibe HTML, you get typed Deck JSON, 75 themes, and MCP tools to audit and re-theme. Free MIT · https://presentation-md.vercel.app

### AI directories (TAAFT, Futurepedia, Toolify, Future Tools)

**Tagline:** AI-powered slide deck generator for coding agents.

**Long:** presentation-md uses schema-validated Deck JSON so AI coding agents generate consistent, themed slide decks — then export to HTML or editable PowerPoint. It plugs into Claude Code, Cursor, Codex, Gemini CLI, and Copilot via one install or MCP. Features: 75 themes, 18 layouts, craft audit/judge tools, PPTX round-trip, browser Studio. Free, open source, no account required.

### Agent / MCP registries (Glama, AI Agents List, LF MCP Registry)

**Tagline:** MCP-native presentation generator for AI agents.

**Long:** presentation-md is an MCP-native slide deck toolchain: typed tools for theme preview, render, craft audit, judge, PPTX import/export, and brand theme import. Pair with the presentation-generator skill across Claude, Cursor, Codex, Gemini, and Copilot. Package: `@presentation-md/mcp-server`. Homepage: https://presentation-md.vercel.app · npm: https://www.npmjs.com/package/@presentation-md/mcp-server

### Dev directories (DevHunt, StackShare, Resource.fyi)

**Tagline:** Typed Deck JSON + 75 themes + MCP — slides agents can ship.

**Long:** presentation-md is a presentation toolchain for AI coding agents: schema-validated Deck JSON, Node/Python renderers, editable PPTX export, and an MCP server with craft gates. Install with `npx @presentation-md/install <agent>` or `npx skills add isatimur/presentation-md`. MIT · https://github.com/isatimur/presentation-md

---

## Founder story (2–3 sentences)

I kept losing afternoons to decks — either fighting Keynote or babysitting AI HTML that couldn't become a real .pptx. presentation-md is the skill I wanted: my agent fills a typed spec, themes do the design, and I walk out with HTML I own or PowerPoint I can still edit. It's free and MIT because the job is adoption inside agents people already use.

---

## Submission order (this week)

**Day 0 (today):** Push repo packaging · skills.sh.json · install matrix · social drafts live in repo  
**Day 1:** ClawHub publish (after `clawhub login`) · `npx skills add` smoke · GitHub Discussion / README blurb  
**Days 2–3:** Tier 1 lite — DevHunt, Fazier, Uneed, Best of Web, Tiny Launch (forms)  
**Days 4–7:** Tier 3 AI dirs (TAAFT, Futurepedia, Toolify) + Tier 4 MCP (Glama) with agent variants  
**Week 2+:** AlternativeTo / SaaSHub · awesome-list PRs · Show HN when technical angle is fresh · PH after warm-up

Tracker CSV: `directory-tracker.csv` in this folder.
