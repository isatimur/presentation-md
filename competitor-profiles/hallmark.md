# Competitor profile: Hallmark

*Generated: 2026-08-04 · Sources: GitHub README, usehallmark.com, local clone of Nutlope/hallmark*

## Snapshot

| Field | Value |
| --- | --- |
| **Product** | Anti-AI-slop design skill for Claude Code, Cursor, Codex |
| **Company / backer** | Together AI (Made by Together AI) |
| **Site** | https://www.usehallmark.com |
| **Repo** | https://github.com/Nutlope/hallmark (~21.5k stars as of 2026-08-04) |
| **License** | MIT |
| **Install** | `npx skills add nutlope/hallmark` |
| **Primary artifact** | Landing pages / UI (self-contained HTML + CSS) |
| **Version** | 1.1.0 (package.json) |

## Positioning

> “A design skill for Claude Code, Cursor, and Codex that refuses to look AI-generated.”

Different briefs → different shapes (macrostructure + theme), not colour-swaps of one template. Competing for agent-native **craft quality** mindshare, not deck SaaS.

## Product surface

### Four verbs
1. **(default) build** — new UI; pick macrostructure → theme → enrichment; slop-test before emit
2. **audit** — score existing code against anti-patterns; punch list, no edits
3. **redesign** — new visual structure; keep copy / IA / brand; respect implementation boundaries
4. **study** — extract DNA from screenshot or URL; optional portable `design.md`

### Themes & structure
- **~20 named catalog themes** (Specimen, Atelier, Brutal, Newsprint, Studio, Manifesto, Terminal, Midnight, Almanac, Garden, Riso, Sport, Bloom, Coral, Cobalt, Aurora, Editorial, Carnival, Lumen, Hum)
- **Custom** branch (OKLCH + free-font; bespoke depth when structure is the ask)
- **4 genres**: editorial, modern-minimal, atmospheric, playful
- **21 named macrostructures** (pick one file, don’t load whole catalogue)
- Nav archetypes N1a–N13; footer Ft1–Ft8

### Craft bar
- **57 slop-test gates** + pre-emit 6-axis critique (Philosophy, Hierarchy, Execution, Specificity, Restraint, Variety) — stamp scores in CSS comment
- Disciplines: honest copy (no invented metrics), locked tokens, no re-drawn chrome, mobile floors, no italic headers
- Project memory via `.hallmark/log.json` diversification

### Tech stack
- Skill MD + references (CSS-heavy examples site)
- No MCP product today — roadmap lists “Live preview as an MCP server” under Later
- Showcase site with one-shotted examples (no shared theme/layout across demos)

## Strengths (vs presentation-md)

1. Viral distribution + Together AI brand (star count / gallery energy)
2. Best-in-class **page** anti-slop: macrostructure variety, study DNA, redesign safety rails
3. Crisp four-verb UX agents can recite
4. Deep responsive / microinteraction / hero-enrichment gates for websites

## Weaknesses (for deck use-cases)

1. Wrong artifact for pitches/wraps/keynotes — freeform page HTML, not Deck JSON
2. No PPTX / Office round-trip
3. No hosted Studio editor or shareable editable deck links
4. No typed MCP craft loop (scaffold → audit → judge → export)
5. Theme count (~20) vs our 75 published packages — different domains, but mindshare comparison

## presentation-md counter-position

- Same shelf install energy (`npx skills add`) and anti-slop taste
- Win when the brief is a **deck**: schema, 75 themes, MCP, Studio `?d=`, PPTX
- Close one-prompt → shareable gap: `scaffold_deck` returns `studio_share_url`
- Honest compare page: https://presentation-md.vercel.app/vs/hallmark

## Raw data

- `competitor-profiles/raw/hallmark/2026-08-04/scrapes/readme.md`
- Clone snapshot: `/tmp/hallmark-research` (local research only)
