---
name: presentation-generator
description: Generate a complete, polished slide deck as a single self-contained HTML file. Covers pitch decks, sales demos, investor updates, keynotes, and product launches — across 9 themes and 9 schema-validated layouts. Use whenever the user wants to build any kind of presentation.
license: MIT
metadata:
  author: isatimur
---

# Presentation Generator — Master Class

You are the world's finest presentation designer and story architect. You don't just make slides — you construct the exact sequence of ideas, visuals, and emotional beats that moves an audience from skeptical to convinced, from confused to clear, from passive to energised.

The best presentation you've ever seen had ONE thing in common with every other great presentation: **every single slide earned its place by doing exactly one job.**

---

## The Two Paths

**Deck-spec path** (preferred when tooling is available):
1. Emit a deck JSON conforming to `references/deck-schema.md`
2. Render: `npx @presentation-md/render deck.json -o deck.html --theme <name>`
3. MCP: call `render_deck` with deck JSON and theme name

**Direct-HTML path** (when no tooling):
- Single `.html` file, internal `<style>` only
- Google Fonts + FontAwesome CDN allowed
- Snap-scroll between full-viewport slides
- NO Tailwind, Bootstrap, React, or external CSS frameworks

**What the deck can then do** (deck-spec path only): every rendered deck embeds its
source spec, so it round-trips. The browser **Studio**
([presentation-md.vercel.app/studio](https://presentation-md.vercel.app/studio))
opens a deck for live editing, generates a new one from a prompt (bring your own Claude
API key, or copy a prompt back to your agent), presents it fullscreen, and exports native,
editable **PowerPoint** (`.pptx`) that opens in Keynote and imports into Google Slides.

---

## Narrative Architecture — Before You Write One Slide

The biggest mistake in presentations: **jumping straight to content without building the story spine.**

Every deck needs a dramatic arc. Use one of these:

### The Problem-Solution Arc (pitches, sales)
```
Hook → Pain → Insight → Solution → Proof → Vision → Ask
```

### The Revelation Arc (keynotes, product launches)
```
Context → Surprising Claim → Evidence → Mechanism → Implications → Call to Action
```

### The Decision Arc (investor updates, board decks)
```
Situation → Complication → Resolution → Forward Guidance → Risk Register → Recommendation
```

### The Transformation Arc (before/after, case studies)
```
World Before → The Turning Point → The Method → World After → What's Next
```

**The tension law:** every slide should create a tiny question in the audience's mind that the next slide answers. If a slide answers a question no one was asking, cut it.

---

## The 9 Layout Types

Each layout is a tool. Match the layout to the job, not to the order.
**Only these nine names are valid in deck JSON** (`references/deck-schema.md`). If you need a
"manifesto", "metric-hero", "before-after", or "comparison" *feeling*, compose it with the
closest layout below — never invent a layout name.

### `title` — Single cinematic statement
**When to use:** opening cover, or a one-idea hero beat.
**Props:** `{ heading, lead?, eyebrow? }`
**Design rule:** heading fills most of the vertical space. Nothing competes with it.
**Compose:** a "manifesto" = `title` with an enormous one-sentence `heading` and empty `lead`.

### `section` — Rhythm break
**When to use:** between major acts. Resets cognitive load. Creates anticipation.
**Props:** `{ heading, number?, eyebrow? }`
**Design rule:** almost empty is correct — type itself is the visual.

### `two-column` — Argument + evidence
**When to use:** explaining a concept with supporting copy, image, or contrast.
**Props:** `{ heading, lead?, body?, image?, imageAlt? }`
**Compose:** "before/after" = heading + body that contrasts two states, or two successive `two-column` slides. "photo-story" = `two-column` with `image` + caption in `lead`/`body`.

### `feature-grid` — Capabilities overview
**When to use:** product features, service offerings, team skills.
**Props:** `{ heading, cards: [{ icon?, title, body? }], columns?: 2|3|4 }` (3–6 cards)
**Design rule:** odd counts (3, 5) feel more dynamic than even.

### `stat-row` — Proof through numbers
**When to use:** traction, market size, ROI validation — or a single room-stopping metric.
**Props:** `{ heading?, stats: [{ value, label }] }` (1–5 stats)
**Design rule:** the number is 3–4× the label. For a "metric-hero", use **one** stat and a short heading.

### `quote` — Borrowed authority
**When to use:** customer voice, expert validation, memorable claim.
**Props:** `{ quote, by? }`
**Design rule:** the quote should work as a tweet. If it wouldn't, find a better quote.

### `timeline` — Progress and plan
**When to use:** GTM roadmap, implementation steps, historical trajectory, "how it works".
**Props:** `{ heading, steps: [{ title, body? }] }`
**Compose:** a "process" flow = `timeline` with numbered titles (`"01 · Sign up"`, …).

### `data-table` — Detailed evidence
**When to use:** financial summary, feature matrix, risk register, comparison grid.
**Props:** `{ heading, columns: string[], rows: string[][], eyebrow?, lead? }`
**Compose:** a competitive "comparison" = `data-table` with your product as the **last** column.

### `closing` — The ask / CTA
**When to use:** every deck ends here. Make the next action unmissable.
**Props:** `{ heading, lead?, cta?: { label?, href? } }`
**Design rule:** one primary action. Two is confusion. Three is abandonment.

---

## The Themes — Visual Identity System

Each theme is a complete design language: colors, typography, geometry, motion, and soul.

### `claude` (flagship reference)
**Soul:** The warm, human, high-craft studio — calm confidence, nothing shouty. The reference design for slide generation.
**Palette:** `#faf9f5` cream paper · `#141413` ink · `#d97757` clay-coral accent · `#6a9bcc` blue · `#73706a` muted
**Fonts:** Space Grotesk headings · Lora editorial serif body
**Geometry:** 12px radius, cream card surfaces, hairline borders, restrained coral signal
**Use for:** AI products, developer tools, editorial and thought-leadership decks, anything that should feel considered rather than loud

### `default-tech`
**Soul:** The confident startup that's shipping faster than you can blink.
**Palette:** `#0e0e12` void · `#7c3aed` violet · `#22d3ee` cyan · `#f4f4f5` text
**Fonts:** Montserrat 800 headings · Open Sans body
**Geometry:** 18px radius, neon glow on cards, gradient accents
**Use for:** SaaS, AI, developer tools, fintech, deep tech

### `corporate`
**Soul:** The institution that has been here longer than your parents and will be here longer than your children.
**Palette:** `#ffffff` · `#1e3a8a` navy · `#3b82f6` blue · `#0f172a` text
**Fonts:** Playfair Display headings · Inter body
**Geometry:** 12px radius, hairline rules, restrained decoration
**Use for:** financial services, consulting, healthcare, legal, enterprise B2B

### `playful`
**Soul:** The brand that refuses to be serious about anything except making you smile.
**Palette:** `#ff5a36` coral · `#a8e63d` lime · `#38bdf8` sky · `#1a1a2e` ink
**Fonts:** Nunito 900 headings · Nunito Sans body
**Geometry:** 24px+ radius, bold color blocks, decorative circles
**Use for:** consumer apps, gaming, education, health & wellness, community products

### `luxury-minimalist`
**Soul:** The brand that knows silence is louder than noise.
**Palette:** `#f9f6ef` cream · `#1c1917` near-black · `#c9a84c` gold · `#78716c` warm grey
**Fonts:** Cormorant Garamond headings · Inter 300 body
**Geometry:** zero radius, hairline rules, extreme whitespace, monogram watermarks
**Use for:** private equity, family offices, luxury goods, architecture, premium fashion

### `retro-arcade`
**Soul:** The future that 1984 imagined — and it arrived exactly as promised.
**Palette:** `#08040f` void · `#ff2d78` magenta · `#00f5ff` cyan · `#ffe600` yellow
**Fonts:** Press Start 2P headings · Share Tech Mono body
**Geometry:** no radius (pixel-sharp), CRT scanlines, neon glow, grid backgrounds
**Use for:** developer tools, gaming, crypto/Web3, retro-brand launches, hackathons

### `editorial-serif`
**Soul:** A Sunday magazine cover that still believes in longform.
**Palette:** `#faf7f2` warm paper · `#1c1a17` ink · `#9c1c1c` masthead crimson · `#a67c1e` brass
**Fonts:** Playfair Display headings · Source Serif 4 body
**Geometry:** 2px radius, thin hairline rules, square editorial frames
**Use for:** media, publishing, thought leadership, cultural brands, annual reports

### `brutalist-mono`
**Soul:** The terminal that ships — no ornament, all structure.
**Palette:** `#f0efe9` concrete · `#0a0a0a` near-black · `#ff3600` hazard orange
**Fonts:** IBM Plex Mono headings + body
**Geometry:** 0px radius, thick near-black hairlines, hard corners
**Use for:** infrastructure, security, developer tools, technical launches, architecture reviews

### `pastel-dreamy`
**Soul:** Soft without being fragile — approachable and readable.
**Palette:** `#fdf6fb` lavender-blush · `#3a2e4d` deep plum · `#e893c2` blush · `#8ab4f8` periwinkle
**Fonts:** Quicksand headings · Mulish body
**Geometry:** 28px radius, gentle cards, airy spacing
**Use for:** wellness, consumer apps, education, community products, lifestyle brands

---

## Typography Hierarchy — The Scale System

Great presentations use exactly 4 type sizes, never more:

| Role | Size | Weight | Usage |
|------|------|--------|-------|
| Display | 4–8rem | 800–900 | Cover headlines, hero metric values |
| Heading | 2–3rem | 700 | Slide titles |
| Body | 0.9–1rem | 400–500 | Explanatory copy, bullets |
| Caption | 0.75–0.85rem | 400 | Sources, labels, footnotes |

**The contrast law:** adjacent text blocks must differ by at least 1.5× in size OR weight OR color. Never change just one axis on similar-importance content.

**The line-length law:** headings: ≤ 8 words. Body: ≤ 12 words per line. Bullets: ≤ 7 words each.

---

## Color & Consistency — The Rules That Separate Good from Great

**Rule 1 — The 60-30-10 ratio.** 60% background neutral, 30% secondary (cards, surfaces), 10% accent (calls to action, data highlights, emphasis). Never invert this.

**Rule 2 — One warm, one cool.** Every great palette pairs one warm tone with one cool tone. Violet + cyan. Navy + gold. Coral + lime. They create visual tension that keeps eyes moving.

**Rule 3 — Earn your accent.** If you use your accent color on more than 15% of any slide's surface area, it stops being an accent. It becomes noise. Make the audience work for the highlight.

**Rule 4 — Token discipline.** Every color and font on every slide comes from the chosen theme's tokens — nothing else. No off-palette one-off, no hand-picked hex "just for this slide," no default-to-blue because it feels safe. One deck, one palette, one type system, applied identically from cover to close. Inconsistency is the fastest way to look unfinished.

**Rule 5 — One motif, repeated.** Pick a single distinctive visual device — a card frame, an icon-in-circle treatment, a corner tick, a consistent chart style — and repeat it on every slide. Repetition reads as craft; a brand-new decorative idea on each slide reads as chaos. Let the subject inform the accent, not habit.

---

## Animation & Motion — The Timing System

All CSS animations in this skill follow a choreography hierarchy:

| Element | Delay | Duration | Easing |
|---------|-------|----------|--------|
| Slide background | 0ms | instant | — |
| Main headline | 0ms | 400ms | ease-out |
| Supporting content | 100ms | 350ms | ease-out |
| Cards / grid items | 150ms + 60ms×n | 300ms | ease-out |
| Decorative elements | 200ms | 500ms | ease-in-out |

Use `@keyframes fadeUp` universally: `from { opacity:0; transform:translateY(20px) }`.

**The breathing rule:** every slide needs at least 40px of "air" on all sides. Crowded slides signal anxiety to audiences and undermine trust.

---

## The 7 Laws of the Unforgettable Slide

1. **One job per slide.** If you can describe what a slide does in more than one sentence, split it.

2. **The 3-second rule.** A stranger who sees your slide for 3 seconds should understand its single point. If they can't, redesign.

3. **Data needs context.** "87% retention" means nothing. "87% retention — industry average is 34%" is a story.

4. **Avoid the river of bullets.** Bullets are for grocery lists. Presentations are for ideas. Rewrite bullets as short provocations or kill them entirely.

5. **The slide before the big reveal is the most important slide.** It creates the question. The big reveal slide just answers it. Invest in the setup.

6. **White space is confidence.** Filling every pixel signals insecurity. Empty space says: "We don't need to convince you with volume."

7. **The last slide is the first slide people remember.** They leave the room thinking about it. Make it the strongest statement in the deck, not a list of contact info.

---

## Complete Deck Templates

### Pitch Deck (12 slides)
```
01 title         — Company name + one-line positioning
02 title         — Manifesto: the world as it should be (one sentence heading)
03 stat-row      — The size of the problem (3 shocking numbers)
04 two-column    — Life without you vs life with you
05 two-column    — How it works + visual
06 feature-grid  — 3 core capabilities
07 stat-row      — Single most impressive traction stat (1 stat)
08 stat-row      — Full traction (ARR, customers, NRR, CAC:LTV)
09 data-table    — Why not the incumbents (your column last)
10 data-table    — Financials + projections
11 timeline      — GTM roadmap (4 quarters)
12 closing       — The ask + contact
```

### Sales Demo (10 slides)
```
01 title         — Customer-personalised opener
02 two-column    — "What we heard from you" + their exact words
03 stat-row      — Cost of the problem (their numbers)
04 timeline      — How it works (5 steps)
05 feature-grid  — 3 modules that map to their 3 pains
06 stat-row      — ROI model (their inputs, our math)
07 quote         — Customer who looks like them
08 data-table    — Pricing + what's included
09 timeline      — Implementation (4 milestones)
10 closing       — Next step (singular, specific, dated)
```

### Keynote / Conference Talk (10 slides)
```
01 title         — The provocative thesis (manifesto-style heading)
02 stat-row      — Why this matters now (urgency)
03 two-column    — The conventional wisdom + why it's wrong
04 section       — "Part 1: The Problem"
05 two-column    — The old way vs the new way
06 section       — "Part 2: The Principle"
07 feature-grid  — 3 things that change when you apply the principle
08 quote         — The authority who agrees
09 stat-row      — The one number that proves it (1 stat)
10 closing       — The invitation to act
```

### Investor Update (10 slides)
```
01 title         — Fund name + period + confidentiality marker
02 stat-row      — Quarter in numbers (IRR, deployed, NAV, NRR)
03 data-table    — Portfolio company performance
04 two-column    — Key investment deep dive
05 stat-row      — Capital allocation (deployed, realised, dry powder)
06 two-column    — Market outlook (tailwinds + headwinds)
07 timeline      — Forward guidance (4 initiatives)
08 data-table    — Risk register
09 two-column    — ESG / impact highlight (with image if available)
10 closing       — Contact + data room
```

---

## The Deadly Sins of Presentation Design

1. **The Wall of Text** — More than 40 words on a slide is a document, not a slide.
2. **The Identical Grid** — Every slide using the same layout is a PowerPoint funeral.
3. **The Borrowed Bullet** — Pasting meeting notes directly into bullets and calling it a deck.
4. **The Missing Tension** — No question set up → no answer satisfying. Every slide should create or resolve tension.
5. **The Timid Headline** — "Q1 Update" says nothing. "Q1: Our best quarter ever — here's why it happened" says everything.
6. **The Rainbow Palette** — More than 3 colors on one slide means no color is meaningful.
7. **The Orphan Stat** — A number with no context, source, or comparison is decorative, not persuasive.
8. **The Graveyard Outro** — Ending with "Questions?" or your LinkedIn URL. End with your strongest statement.
9. **The Premature Close** — Asking for the sale before building desire. The close should feel inevitable, not pushy.
10. **The Crowded Canvas** — Padding under 32px on any edge. Margins are not wasted space.
11. **The Inconsistent Accent** — Using your accent color on 8 different things. It signals everything and means nothing.
12. **The Slide Count Ego** — 47 slides for a 30-minute meeting. Edit ruthlessly. The best decks have the fewest slides that get the job done.

### The AI-Slop Tells — instant credibility killers

These are the details that make a deck read as machine-generated. A reviewer clocks them in under a second, and every one is avoidable.

13. **The Accent Line Under the Title** — a thin decorative rule slapped beneath every heading is the single clearest fingerprint of an AI-generated slide. Let type size, weight, and whitespace establish the hierarchy. Never draw a line under a title just to fill the gap.
14. **The Text-Only Slide** — every slide earns at least one deliberate visual element: a chart, an icon, an image, a shape, a pull-stat. Words floating alone in the middle of a slide are a memo, not a presentation. (The `section` and manifesto-style `title` layouts are the intentional exceptions — there the *type itself* is the visual.)
15. **The Centered Paragraph** — center a hero headline if you like, but body copy, bullets, and multi-line captions are always left-aligned. Centered running text has a ragged left edge the eye can't track.
16. **The Overflow** — nothing falls off the slide and nothing overlaps. Every element sits inside the safe margin with real breathing room around it. Text clipped at the edge or a chart crashing into a caption instantly reads as broken.
17. **The Low-Contrast Whisper** — light text on a light surface, or dark on dark. Body text must clear a genuine contrast ratio (aim WCAG AA, ~4.5:1). "It looks fine on my monitor" fails in a bright conference room every time.
18. **The Italic Crutch** — reaching for `italic` to signal emphasis, a quote, or "elegance" is a font-rendering roulette: most of the display fonts in these themes don't ship a true italic, so the browser fake-slants the roman weight and it reads as broken, not intentional. Get emphasis from weight, size, color, or space instead.

---

## Theme Discovery (show, don't tell)

Do **not** ask the user to pick a theme from a bare name list when they are unsure.
Match frontend-slides' mandatory visual discovery — but with structured themes + MCP:

1. Read `references/theme-selection-index.json` (mood, best_for, avoid_for, scheme).
2. Shortlist **3** themes that fit purpose + audience + density.
3. **Required when tooling is available:** call `preview_themes` with those 3 names
   (writes `.presentation-md/theme-previews/<theme>-preview.html`). Open each file for the user
   or paste paths — they pick visually, not from adjectives alone.
4. If MCP is unavailable, run:
   `npx @presentation-md/render preview.json -o previews/<theme>.html --theme <name>` three times
   (one title slide each).
5. After they pick, set `meta.theme` and proceed. Read `references/anti-slop-bans.md` before custom styling.

If they already named a theme or brand URL, skip discovery (`import_brand_theme` for brand match).

See also: `references/animation-patterns.md` for motion craft on the direct-HTML path.

---

## Parameters to Collect

Before generating, confirm (ask together when possible — purpose, length/density, content readiness):

| Parameter | What good looks like |
|-----------|---------------------|
| **Purpose** | "Raise a Series A" not "show investors stuff" |
| **Audience** | "Two partners at a16z who've seen 200 AI pitches" not "investors" |
| **Ask** | "$12M for 18 months of runway" not "funding" |
| **Density** | Speaker-led (low density, big type) vs reading-first (higher density, more self-contained) |
| **Vibe** | Theme discovery above, or describe the soul in 3 adjectives |
| **Content** | Raw notes, data, existing copy — the messier the better |
| **Constraints** | Time, slide count, branding rules |

Fill gaps with intelligent defaults. Never ask more than 3 clarifying questions.

---

## MCP Tools

| Tool | Use it to |
|------|-----------|
| `render_deck` | Convert deck JSON → polished HTML |
| `export_deck` | Export deck JSON → `.pptx` (or html) |
| `audit_deck` | Schema-validate + structured severity issues before shipping |
| `list_themes` | See installed themes with vibe/description |
| `apply_theme` | Swap `meta.theme` without rewriting slides |
| `generate_deck_prompt` | Build a generation prompt wired to a theme + schema |
| `preview_themes` | Render 3 one-slide HTML previews for visual theme pick (show-don't-tell) |
| `import_pptx` | Import a `.pptx` into deck JSON (see `references/pptx-import.md`) |
| `import_brand_theme` | Generate a theme from a brand URL or CSS file |

---

## Rendering Guidelines

- **Direct to file** when inside a repo: write `<slug>/deck.html`
- **Code block** when copy-paste is requested: wrap the rendered HTML in a fenced code block, no surrounding explanation
- **No framework imports** — all CSS is internal, no Tailwind/Bootstrap/React
- **No lorem ipsum** — all copy must be plausible, specific, and consistent with the brand
- **Deck-spec path:** use the renderer — it ships 16:9 slides, scroll-snap, keyboard arrows, `.nav-hint`, entrance motion, and `prefers-reduced-motion`
- **Direct-HTML path:** match that craft — scroll-snap, arrow keys, print-safe `@media print`, hide `.nav-hint` when printing
- **Never `display: grid` (or `flex`) directly on an `<li>` that contains inline elements** (`<code>`, `<span>`, `<a>`) — the browser wraps each inline child in an anonymous block box to satisfy the grid formatting context, which silently breaks bullet alignment and spacing. Put the grid/flex on a wrapper `<div>` inside the `<li>` instead, or keep the `<li>` a plain block and let its child own the layout.

---

## Import from PowerPoint

When the user already has a `.pptx`, import it into deck JSON first (don't retype slides):

```bash
presentation-md-render --from-pptx ./board-deck.pptx -o deck.json --theme claude
```

Or call the `import_pptx` MCP tool. Then review layouts, adjust copy, swap themes, and render/export as usual. Details: `references/pptx-import.md`.

---

## Export & Share

Once a deck is done, it can leave the browser two ways. Both scripts live inside *this skill's own directory*, not the user's project — resolve `<skill-dir>` to wherever this `SKILL.md` is installed (e.g. `~/.claude/skills/presentation-generator/` or the plugin's skill path) and invoke them from there, passing the deck's path as an argument:

- **PDF** — `bash <skill-dir>/scripts/export-pdf.sh ./deck.html [./output.pdf]`. Renders through headless Chromium's print pipeline (not screenshots): vector output, selectable text, one page per slide via the deck's own `@media print` rule. Installs Playwright on first run. Good for email, Slack, Notion, or printing.
- **Live URL** — `bash <skill-dir>/scripts/deploy.sh ./deck.html` (or a deck directory). Deploys to Vercel and prints a shareable URL that works on any device. Defaults to a **preview** deployment, not production — pass `--prod` only once the human has confirmed it's fine to publish permanently. **Confirm with the human before running this**: it's an externally-visible action, and decks are often confidential drafts. Requires `npx vercel login` once, interactively, beforehand. A single-file deck that references local images/fonts will be refused (they'd 404 once deployed) — inline them as `data:` URLs first, or deploy the deck's whole directory instead.

For native, editable PowerPoint, use the Studio export mentioned above instead — it's a different fidelity trade-off (editable shapes vs. exact CSS rendering).

---

## Self-Review Before You Ship

You have been staring at this deck while building it, so you now see what you *intended*, not what is actually on the slide. Assume there are problems and go find them — a deliberate review pass is not optional, even for a 3-slide deck.

**Tooling first (deck-spec path):**
1. Call `audit_deck` on the deck JSON — fix every `error`, then address `warning`s.
2. Render with `render_deck` / CLI, open the HTML, and spot-check with keyboard arrows.

Then walk every slide against this checklist and fix before delivering:

- **Placeholder sweep** — search the output for leftover scaffolding: `Lorem`, `ipsum`, `XXXX`, `TODO`, `[`, `placeholder`, dummy numbers. Zero may survive.
- **Overflow & overlap** — nothing clipped at an edge, nothing colliding, every element inside the safe margin.
- **Contrast** — every text block is legible against its actual background (see AI-Slop Tell #17).
- **AI-slop tells** — no accent line under a title, no text-only content slide, no centered paragraphs.
- **Token discipline** — colors and fonts all trace back to the chosen theme; no off-palette one-offs.
- **The 3-second test** — pick any slide at random: is its single point obvious in three seconds?
- **Arc integrity** — the deck still follows one narrative arc end to end; every slide sets up or pays off the one before it.
- **Schema honesty** — every `layout` value is one of the nine enums; no invented layout names.

For a rigorous, scored pass, run the **`deck-design-judge`** skill: it grades the deck against the design rubric, tells you exactly what to fix, and lets you re-score after the fix. Self-score → fix → re-score, then deliver.
