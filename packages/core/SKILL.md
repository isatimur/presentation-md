---
name: presentation-generator
description: Generate a complete, polished slide deck as a single self-contained HTML file. Covers pitch decks, sales demos, investor updates, keynotes, and product launches — across 75 themes and 12 schema-validated layouts. Use whenever the user wants to build any kind of presentation.
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

**Studio craft controls** (also valid in Deck JSON — HTML + PPTX both honor them):
- `two-column`: `ratio` (`"2-1"` / `"1-2"` …) + `reverse` for asymmetric photo/type splits
- `comparison`: `emphasis: "left"|"right"` to grow the winning column
- `feature-grid`: `columns: "bento"` for a hero tile + satellites (prefer with 5 cards)
- `code`: `filename` + `language` for window chrome on SDK/CLI proofs
- `notes`: speaker notes on any slide — Studio present mode (toggle with **S**) + PPTX notes pane; never baked into the HTML slide face

Prefer setting these in the JSON you emit — Studio exposes the same controls in the slide form. Always set `emphasis` on comparisons; prefer non-1-1 `ratio` on two-column; use `bento` for 5-card grids.
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

## The 11 Layout Types

Each layout is a tool. Match the layout to the job, not to the order.
**Only these twelve names are valid in deck JSON** (`references/deck-schema.md`). If you need a
"manifesto" or "metric-hero" *feeling*, compose it with the closest layout below — never invent a layout name.

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
**When to use:** explaining a concept with supporting copy, a side image, or a pull-aside.
**Props:** `{ heading, lead?, body?, image?, imageAlt?, aside?, ratio?: "1-1"|"2-1"|"1-2"|"3-2"|"2-3", reverse? }`
**Compose:** "photo-story" = `two-column` with `image` + caption in `lead`/`body`. Asymmetric craft = `ratio: "2-1"` (or `"1-2"`) so type or media dominates; `aside` for a quote panel when there's no image; `reverse: true` flips media to the left.
**Craft tip:** Prefer `ratio` + `aside` over a balanced 50/50 when the slide needs a pull-quote or one dominant claim — balanced columns read as template; asymmetry reads as designed.

### `image-hero` — Full-bleed cinematic moment
**When to use:** emotional beat, product shot, team photo, location reveal — one image carries the slide.
**Props:** `{ heading, lead?, eyebrow?, image, imageAlt? }`
**Design rule:** the image is the hero; text sits on a bottom scrim. Keep copy short — one headline, one line max.

### `comparison` — Side-by-side contrast
**When to use:** before/after, old way vs new way, us vs them, option A vs B.
**Props:** `{ heading?, leftLabel?, left, rightLabel?, right, eyebrow?, emphasis?: "left"|"right" }`
**Design rule:** parallel structure in both columns — same kind of claim on each side so the contrast reads instantly. Use `emphasis` to grow the winning column.
**Craft tip:** Always set `emphasis` toward the winning side in a sales or pitch deck — equal-weight comparisons feel undecided.

### `feature-grid` — Capabilities overview
**When to use:** product features, service offerings, team skills.
**Props:** `{ heading, cards: [{ icon?, title, body? }], columns?: 2|3|4|"bento" }` (3–6 cards)
**Design rule:** odd counts (3, 5) feel more dynamic than even. `"bento"` = asymmetric hero + four supporting cards.
**Craft tip:** For 5 cards on `genz-bento`, `playful`, or any hard/soft bento surface, prefer `columns: "bento"` so the first card becomes a hero tile — mirrors the handcrafted gallery energy.

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
**When to use:** financial summary, feature matrix, risk register, multi-column comparison grid.
**Props:** `{ heading, columns: string[], rows: string[][], eyebrow?, lead? }`
**Compose:** a competitive matrix with 3+ columns = `data-table`; a simple A-vs-B story = `comparison`.

### `code` — Snippet / API proof
**When to use:** developer demos, SDK install, one-file "aha", CLI recipes — when the product *is* the code.
**Props:** `{ heading?, lead?, eyebrow?, code, language?, filename? }`
**Design rule:** keep the snippet short (≤18 lines). Prefer a real filename in chrome. Never invent syntax highlighting markup — plain text only (renderer escapes HTML).

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

### `aurora-glass`
**Soul:** Night sky through frosted glass — cinematic AI infrastructure energy.
**Palette:** `#000` void · `#fff` · `#a78bfa` violet · `#67e8f9` cyan
**Fonts:** Syne headings · Inter body
**Surface:** `aurora-glass`
**Use for:** AI pitches, SaaS platforms, developer launches (gallery: NovaSpark)

### `ft-editorial`
**Soul:** Broadsheet that still believes in serious argument.
**Palette:** `#f7f5f0` newsprint · `#0a0a0a` ink · `#1a4fd8` FT blue · `#c0392b` signal red
**Fonts:** Libre Baskerville · IBM Plex Sans
**Surface:** `broadsheet-rule`
**Use for:** sales proposals, consulting, finance (gallery: Meridian)

### `genz-bento`
**Soul:** Sticker sheet energy — hard shadows, no apology.
**Palette:** `#fff9f5` · `#ff4d2e` coral · `#b6f542` lime
**Fonts:** Nunito / Nunito Sans
**Surface:** `hard-bento`
**Use for:** consumer launches, Gen-Z brands (gallery: Bounce)

### `crt-terminal`
**Soul:** Phosphor green that never left 1983.
**Palette:** `#06040a` · cream `#f5f0e8` · `#39ff14` phosphor · `#00f5ff` cyan
**Fonts:** VT323 · Share Tech Mono
**Surface:** `crt-phosphor`
**Use for:** privacy tools, open source, security demos (gallery: RetroNet)

### `swiss-typographic`
**Soul:** International Typographic Style — grid, signal red, nothing extra.
**Palette:** `#ffffff` · `#0a0a0a` · `#e2231a` signal red
**Fonts:** Inter
**Surface:** `swiss-grid`
**Use for:** design agencies, brand systems, architecture (gallery: Grid Systems)

### `candy-pop`
**Soul:** Soft-serve branding — pink, butter yellow, thick outlines.
**Palette:** `#fdf3e7` · `#ff5d8f` pink · `#2d7dd2` blue
**Fonts:** Fredoka · Poppins
**Surface:** `candy-blob`
**Use for:** DTC, food & beverage, playful consumer (gallery: Jellybean)

### `aerospace-hud`
**Soul:** Cockpit instruments before takeoff.
**Palette:** `#0a1d3a` navy · `#5ec8ff` cyan · `#ff7a18` warning
**Fonts:** Barlow Condensed · Barlow
**Surface:** `hud-grid`
**Use for:** robotics, aerospace, deep tech hardware (gallery: Axiom)

### `brutalist-acid`
**Soul:** Dark concrete + acid lime — MONOLITH energy.
**Palette:** `#1c1c1c` · `#e8e6e1` · `#d6ff00` hazard lime
**Fonts:** Space Mono · Barlow Condensed
**Surface:** `acid-block`
**Use for:** Series A tech pitches, infrastructure (gallery: MONOLITH)

### `bauhaus`
**Soul:** Primary geometry that still teaches.
**Palette:** `#f4f1ea` cream · `#e63946` red · `#1f4ae0` blue
**Fonts:** Archivo · Space Grotesk
**Surface:** `bauhaus-blocks`
**Use for:** design keynotes (gallery: Primary)

### `y2k-aero`
**Soul:** Millennium optimism in chrome cyan bubbles.
**Palette:** `#e0f7ff` · `#38bdf8` sky · `#a3e635` lime
**Fonts:** Nunito
**Surface:** `aero-bubble`
**Use for:** consumer launches (gallery: BubbleFlow)

### `risograph-zine`
**Soul:** Print-shop misregister as a feature.
**Palette:** `#f3ecdd` kraft · `#ff4f4f` red · `#2b3aff` blue
**Fonts:** Archivo Black · Space Mono
**Surface:** `riso-print`
**Use for:** seed pitches, indie brands (gallery: Inkwell)

### `neon-noir`
**Soul:** Rain-slick streets and neon signs.
**Palette:** `#050510` · `#ff2e97` · `#00e5ff`
**Fonts:** Orbitron · Share Tech Mono
**Surface:** `neon-rain`
**Use for:** platform launches (gallery: Neon District)

### `vaporwave`
**Soul:** Mallsoft sunset on a wireframe grid.
**Palette:** `#1a0533` · `#ff6ad5` · `#5ce1ff`
**Fonts:** Monoton · Space Mono
**Surface:** `vapor-horizon`
**Use for:** culture/consumer (gallery: Mallsoft)

### `botanical-luxe`
**Soul:** Forest canopy with gold leaf.
**Palette:** `#1d3a2f` · `#bfa55a` gold · `#4a7c59`
**Fonts:** Cormorant · DM Sans
**Surface:** `botanical-leaf`
**Use for:** impact reports (gallery: Verdant)


### `heritage-editorial`
**Soul:** Warm parchment and terracotta blush.
**Palette:** `#f4efe9` · `#c98b7a` · `#a07854`
**Fonts:** Playfair Display · DM Sans
**Surface:** `heritage-wash`
**Use for:** brand stories (gallery: Atelier No. 9)

### `fintech-clean`
**Soul:** Stripe-clean product confidence.
**Palette:** `#fbfbfd` · `#635bff` · `#00d4b1`
**Fonts:** Inter
**Surface:** `fintech-soft`
**Use for:** fintech sales (gallery: Ledgerline)

### `developer-dark`
**Soul:** GitHub night mode as a deck.
**Palette:** `#0d1117` · `#3fb950` · `#58a6ff`
**Fonts:** Inter · JetBrains Mono
**Surface:** `dev-terminal`
**Use for:** developer demos (gallery: Forge)

### `data-editorial`
**Soul:** Industry report that still has a point of view.
**Palette:** `#ffffff` · `#2b6cb0` · `#e63946`
**Fonts:** Source Serif 4 · Inter
**Surface:** `data-rule`
**Use for:** research reports (gallery: Signalbox)

### `scandinavian`
**Soul:** Linen, sage, and soft clay.
**Palette:** `#efe9df` · `#9caf88` · `#c9826b`
**Fonts:** Fraunces · Work Sans
**Surface:** `hygge-soft`
**Use for:** lifestyle brands (gallery: Hygge)

### `art-deco`
**Soul:** Emerald walls and gold leaf.
**Palette:** `#0c2a24` · `#c8a24a` · `#e2c47a`
**Fonts:** Cinzel · Cormorant Garamond
**Surface:** `deco-fan`
**Use for:** investor prospectus (gallery: Meridian Club)

### `kinetic-wrapped`
**Soul:** Year-in-review acid lime.
**Palette:** `#0a0a0a` · `#c8ff00` · `#ff00cc`
**Fonts:** Archivo Black · Inter
**Surface:** `wrapped-block`
**Use for:** recaps (gallery: Pulse)

### `blueprint`
**Soul:** Engineering drawing board.
**Palette:** `#0a1f3d` · `#00e5ff`
**Fonts:** Space Grotesk · Space Mono
**Surface:** `blueprint-grid`
**Use for:** mission briefs (gallery: Apsis)


### `glassmorphism`
**Soul:** Soft glass over icy mist.
**Palette:** `#f8f9ff` · `#5b6af5` indigo · `#22d3ee` cyan
**Fonts:** Plus Jakarta Sans · Inter
**Surface:** `glass-mist`
**Use for:** SaaS pricing (gallery: CloudPeak)

### `broadsheet`
**Soul:** Front page before the web existed.
**Palette:** `#f2ece0` newsprint · `#1a1208` ink
**Fonts:** Playfair Display · Lora (Pirata One for mastheads)
**Surface:** `newsprint-masthead`
**Use for:** media kits (gallery: Daily Ledger)



### `soft-editorial`
**Soul:** A warm magazine spread — Cormorant on cream with soft pastel candy cards.
**Palette:** `#F2EEDF` paper · `#2A241B` ink · `#B7C7A8` sage · `#E1A4C2` blush · `#D6DD63` lemon
**Fonts:** Cormorant Garamond headings · Work Sans body
**Geometry:** 24–36px radius, translucent white cards
**Surface:** `soft-editorial-paper`
**Use for:** literary / cultural decks, research storytelling (frontend-slides Soft Editorial)

### `editorial-forest`
**Soul:** Penguin-classic quiet — forest green and dusty rose on oat cream.
**Palette:** `#efe7d4` cream · `#2e4a2a` forest · `#e89cb1` dusty rose · `#1a1a17` ink
**Fonts:** Source Serif 4 · JetBrains Mono chrome
**Geometry:** 4px radius, paper field, thin rules
**Surface:** `editorial-forest-paper`
**Use for:** quarterly reviews, literary brands (frontend-slides Editorial Forest)

### `pin-and-paper`
**Soul:** Yellow legal pad pinned with cobalt ink — field notebook energy.
**Palette:** `#EFE56A` pad · `#1F3A8A` cobalt · `#C2342B` stamp red · `#F8F1D6` cream card
**Fonts:** Space Grotesk · Caveat annotations · DM Mono labels
**Geometry:** 8px radius, paper grain, pin accents
**Surface:** `pin-paper-pad`
**Use for:** workshops, field notes (frontend-slides Pin & Paper)

### `vellum`
**Soul:** Gallery wall colorfield — one periwinkle, chartreuse italic serif.
**Palette:** `#2A3870` periwinkle · `#E8D85C` chartreuse · `#3A7878` teal
**Fonts:** Italic Cormorant Garamond · DM Sans · Courier Prime pins
**Geometry:** 0 radius, flat colorfield, no motion
**Surface:** `vellum-colorfield`
**Use for:** exhibitions, archive essays (frontend-slides Vellum)

### `neo-grid-bold`
**Soul:** Magazine block grid — ecru, ink, electric lemon panels.
**Palette:** `#ECECE8` putty · `#0A0A0A` ink · `#E6FF3D` lemon
**Fonts:** Space Grotesk uppercase · JetBrains Mono labels
**Geometry:** 0 radius, hard panel borders, 12-col grid feel
**Surface:** `neo-grid-panels`
**Use for:** design talks, brand systems (frontend-slides Neo-Grid Bold)

### `editorial-tri-tone`
**Soul:** Independent arts publication — only three colors, ever.
**Palette:** `#F2B6C6` blush · `#F2D86A` butter · `#7A1F35` burgundy
**Fonts:** Bricolage Grotesque · Instrument Serif accent · JetBrains Mono
**Geometry:** 0 radius, flat color blocks
**Surface:** `tri-tone-blocks`
**Use for:** arts pubs, cultural pitches (frontend-slides Editorial Tri-Tone)

### `creative-mode`
**Soul:** Neo-brutalist zine — cream, 4px ink borders, loud color blocks.
**Palette:** `#EFE9D9` cream · `#0F0F0F` ink · `#E85A1F` orange · `#F06CA8` pink · `#1F8A4C` green · `#F5C518` yellow
**Fonts:** Archivo Black uppercase · Space Grotesk · JetBrains Mono
**Geometry:** 0 radius, hard offset shadows, flat blocks
**Surface:** `creative-mode-blocks`
**Use for:** agency / creative reviews (frontend-slides Creative Mode)

### `broadside`
**Soul:** Ink-on-fire protest poster — dark canvas, single fire-orange blast.
**Palette:** `#111111` ink · `#E85D26` fire orange · `#F0ECE5` cream
**Fonts:** Barlow 900 · IBM Plex Mono chrome
**Geometry:** 0 radius, massive lowercase display, orange environment slides
**Surface:** `broadside-fire`
**Use for:** manifestos, design talks (frontend-slides Broadside)

### `bold-signal`
**Soul:** Confident high-impact — orange card on dark charcoal.
**Palette:** `#1a1a1a` charcoal · `#FF5722` signal orange · `#ffffff` text
**Fonts:** Archivo Black · Space Grotesk
**Geometry:** 16px radius, colored card focal, section numbers
**Surface:** `bold-signal-card`
**Use for:** pitches, launches (frontend-slides Bold Signal)

### `notebook-tabs`
**Soul:** Cream paper notebook with colorful section tabs on the edge.
**Palette:** `#f8f6f1` page · `#2d2d2d` outer · mint/lavender/pink tabs
**Fonts:** Bodoni Moda · DM Sans
**Geometry:** 12px radius paper card, tab strip motif
**Surface:** `notebook-tabs-page`
**Use for:** workshops, planning decks (frontend-slides Notebook Tabs)

### `creative-voltage`
**Soul:** Electric blue left / dark right — neon yellow voltage.
**Palette:** `#0066ff` electric · `#1a1a2e` dark · `#d4ff00` neon
**Fonts:** Syne · Space Mono
**Geometry:** 0 radius, split panels, neon badges
**Surface:** `creative-voltage-split`
**Use for:** creative agencies, demos (frontend-slides Creative Voltage)

### `signal`
**Soul:** Economist restraint × private briefing — cream and navy linked by antique gold.
**Palette:** `#F0ECE3` cream · `#1C2644` navy · `#C8A870` antique gold
**Fonts:** Source Serif 4 · DM Sans · IBM Plex Mono
**Geometry:** 2px radius, dual cream/navy surfaces, gold rules
**Surface:** `signal-briefing`
**Use for:** strategy briefings, investor letters (frontend-slides Signal)

### `electric-studio`
**Soul:** Split-panel studio — white top energy, electric blue field, Manrope mass.
**Palette:** `#ffffff` white · `#0a0a0a` ink · `#4361ee` electric blue
**Fonts:** Manrope 800 headings · Manrope body
**Geometry:** 0 radius, vertical split panels, accent edge bar
**Surface:** `electric-studio-split`
**Use for:** agency / studio keynotes (frontend-slides Electric Studio)

### `dark-botanical`
**Soul:** Elegant dark botanical — soft abstract blooms, warm terracotta and blush on void.
**Palette:** `#0f0f0f` void · `#e8e4df` ivory · `#d4a574` warm · `#e8b4b8` blush
**Fonts:** Cormorant · IBM Plex Sans 300
**Geometry:** 0 radius, soft gradient circles, thin vertical accent
**Surface:** `dark-botanical-bloom`
**Use for:** luxury / gallery decks (frontend-slides Dark Botanical)

### `pastel-geometry`
**Soul:** Friendly pastel geometry — white card on sky wash with vertical edge pills.
**Palette:** `#c8d9e6` sky · `#faf9f7` card · `#f0b4d4` pink · `#a8d4c4` mint · `#9b8dc4` lavender
**Fonts:** Plus Jakarta Sans 700/800
**Geometry:** 24px radius card, vertical pill tabs on right edge
**Surface:** `pastel-geometry-pills`
**Use for:** education / wellness (frontend-slides Pastel Geometry)

### `split-pastel`
**Soul:** Playful split pastel — peach left, lavender right, badge pills.
**Palette:** `#f5e6dc` peach · `#e4dff0` lavender · `#c8f0d8` mint · `#f0f0c8` yellow · `#f0d4e0` pink
**Fonts:** Outfit 700/800
**Geometry:** 20px radius, vertical color split, grid overlay motif
**Surface:** `split-pastel-panels`
**Use for:** consumer / creator decks (frontend-slides Split Pastel)

### `vintage-editorial`
**Soul:** Witty vintage editorial — Fraunces on cream, geometric circle/line accents.
**Palette:** `#f5f3ee` cream · `#1a1a1a` ink · `#e8d4c0` warm accent
**Fonts:** Fraunces 700/900 · Work Sans
**Geometry:** 4px radius, bold bordered CTAs, abstract geometry
**Surface:** `vintage-editorial-geo`
**Use for:** manifestos / thought leadership (frontend-slides Vintage Editorial)

### `paper-ink`
**Soul:** Literary paper & ink — drop-cap energy, crimson rules, thoughtful serif stack.
**Palette:** `#faf9f7` cream · `#1a1a1a` charcoal · `#c41e3a` crimson
**Fonts:** Cormorant Garamond · Source Serif 4
**Geometry:** 0 radius, elegant horizontal rules, pull-quote feel
**Surface:** `paper-ink-literary`
**Use for:** publishing / essays (frontend-slides Paper & Ink)

### `biennale-yellow`
**Soul:** Art-biennale catalogue — solar yellow bloom on parchment, deep indigo Instrument Serif.
**Palette:** `#E9E5DB` parchment · `#F1EE2E` sun · `#1B2566` indigo · `#E26B4A` ember
**Fonts:** Instrument Serif · Archivo · JetBrains Mono
**Geometry:** 0 radius, hairline ink rules, atmospheric sun-glow
**Surface:** `biennale-yellow-sun`
**Use for:** exhibitions / cultural institutions (frontend-slides Biennale Yellow)

### `bold-poster`
**Soul:** Populist editorial poster — massive Shrikhand, single fire-engine red, literary body.
**Palette:** `#FFFFFF` white · `#1C1410` ink · `#D8000F` tomato · `#F5F2EF` off-white
**Fonts:** Shrikhand · Libre Baskerville · Space Grotesk labels
**Geometry:** 0 radius, bold ink rules, tilted display energy
**Surface:** `bold-poster-ink`
**Use for:** manifestos / magazine covers (frontend-slides Bold Poster)

### `coral`
**Soul:** Mid-century travel-poster energy — cream/coral/ink planes, Bebas Neue as architecture.
**Palette:** `#F5F0E8` cream · `#E85D5D` coral · `#1A1A1A` ink
**Fonts:** Bebas Neue · Inter
**Geometry:** 0 radius, 45° hatch, hard color planes
**Surface:** `coral-hatch`
**Use for:** brand launches / sports-culture decks (frontend-slides Coral)

### `emerald-editorial`
**Soul:** Fashion-masthead magazine cover — emerald field, navy ink, double-rule ornaments.
**Palette:** `#3CD896` emerald · `#0F1A5C` navy · `#F1E9D6` paper
**Fonts:** Bodoni Moda · Manrope
**Geometry:** 0 radius, inset double rules, paper cards
**Surface:** `emerald-editorial-masthead`
**Use for:** fashion / cultural brand books (frontend-slides Emerald Editorial)

### `sakura-chroma`
**Soul:** Vintage Japanese cassette package — cream paper, diagonal chroma ribbon, stamp seals.
**Palette:** `#F1E6CB` paper · `#3A2516` ink · `#E5392A` red · `#E54489` pink
**Fonts:** Big Shoulders Display · Albert Sans · JetBrains Mono
**Geometry:** soft 4px radius, chroma ribbon + petal cluster
**Surface:** `sakura-chroma-cassette`
**Use for:** consumer / music / creator brands (frontend-slides Sakura Chroma)

### `pink-script`
**Soul:** After-hours couture editorial — black canvas, hot fuchsia, pearl frame.
**Palette:** `#060507` ink · `#ED3D8C` pink · `#F5EDF1` blush
**Fonts:** DM Serif Display · Inter · JetBrains Mono
**Geometry:** 0 radius, hairline interior frame, film glow
**Surface:** `pink-script-afterhours`
**Use for:** fashion lookbooks / fragrance (frontend-slides Pink Script)

### `block-frame`
**Soul:** Neobrutalist sticker book — pastel neon blocks, chunky black borders, hard shadows.
**Palette:** `#FFFDF5` offwhite · `#FE90E8` pink · `#99E885` green · `#000` ink
**Fonts:** Inter 900 · Space Grotesk labels
**Geometry:** 0 radius, 4px borders, 8px offset shadows
**Surface:** `block-frame-brutal`
**Use for:** youth brands / agency launches (frontend-slides BlockFrame)

### `capsule`
**Soul:** Memphis-meets-editorial — pill containers on warm bone with candy accents.
**Palette:** `#F5F5F0` cream · `#E85D4E` coral · `#C4D94E` lime · `#1A1A1A` ink
**Fonts:** Bodoni Moda · Space Grotesk
**Geometry:** full-pill radius, soft offset shadows
**Surface:** `capsule-pills`
**Use for:** consumer apps / lifestyle pitches (frontend-slides Capsule)

### `cobalt-grid`
**Soul:** Architectural graph paper — electric cobalt serifs, stair-step panels.
**Palette:** `#F0EBDE` paper · `#1F2BE0` cobalt · `#E6E0CE` paper-2
**Fonts:** Newsreader · Hanken Grotesk · DM Mono
**Geometry:** 0 radius, graph grid, stair motif
**Surface:** `cobalt-grid-paper`
**Use for:** architecture / research briefings (frontend-slides Cobalt Grid)

### `8-bit-orbit`
**Soul:** Pixel neon arcade cabinet — cosmic navy void, cyan/pink/yellow HUD.
**Palette:** `#0A0E27` void · `#5EDCF4` cyan · `#F0A6CA` pink · `#F4D03F` yellow
**Fonts:** Tektur · Chakra Petch · Space Mono
**Geometry:** 0 radius, scanlines, pixel-unit hard shadows
**Surface:** `bit-orbit-arcade`
**Use for:** gaming / hackathon / synthwave (frontend-slides 8-Bit Orbit)

### `studio`
**Soul:** Type-as-graphic-mass — black/acid-yellow binary, Barlow 900 uppercase as shape.
**Palette:** `#1C1C1C` near-black · `#F5D200` acid yellow
**Fonts:** Barlow · IBM Plex Mono
**Geometry:** 0 radius, flat binary fields, hairline chrome
**Surface:** `studio-acid`
**Use for:** design studios / brand showcases (frontend-slides Studio)

### `grove`
**Soul:** Literary monograph — forest canvas, Playfair never-bold, single terracotta italic accent.
**Palette:** `#192B1B` forest · `#D4CFBF` cream · `#C8524A` rust
**Fonts:** Playfair Display · Jost · JetBrains Mono
**Geometry:** 0 radius, hairline chrome bars, watermark numeral space
**Surface:** `grove-monograph`
**Use for:** sustainability / wellness / literary brands (frontend-slides Grove)

### `scatterbrain`
**Soul:** Workshop cork board — pastel sticky notes, Shrikhand display, Caveat handwriting.
**Palette:** `#FAF8F3` cream · `#FFE066` sticky · `#2D2A26` ink · `#FFC9C9` pink
**Fonts:** Shrikhand · Zilla Slab · Caveat
**Geometry:** soft sticky cards, slight rotation shadows, cork grain
**Surface:** `scatterbrain-cork`
**Use for:** brainstorms / workshops / creative credentials (frontend-slides Scatterbrain)

### `peoples-platform`
**Soul:** WPA protest poster — Alfa Slab uppercase, red as shadow-only, screen-print grain.
**Palette:** `#F5F2EA` paper · `#2C2CDC` cobalt · `#F2A03A` amber · `#E83A2A` red-shadow
**Fonts:** Alfa Slab One · Caveat Brush · DM Mono
**Geometry:** 0 radius, 6px ink borders, stacked red text-shadow
**Surface:** `peoples-platform-poster`
**Use for:** manifestos / civic campaigns / founder vision (frontend-slides People's Platform)

### `retro-windows`
**Soul:** Win95 desktop OS as slides — beveled chrome windows, navy title bars, CRT scanlines.
**Palette:** `#C0C0C0` gray · `#000080` navy · `#FFFFFF` white · `#008000` DOS green
**Fonts:** Segoe UI / Tahoma · Press Start 2P · VT323
**Geometry:** 2px bevel borders, sunken panels, scanline overlay
**Surface:** `retro-windows-chrome`
**Use for:** retro gaming / Y2K brands / tech-history talks (frontend-slides Retro Windows)

### `raw-grid`
**Soul:** Neo-brutalist grid — 3px black borders ARE the layout, hard offset shadows, pastel region fills.
**Palette:** `#FFFFFF` white · `#0A0A0A` ink · `#F2D4CF` blush · `#E5EDD6` sage
**Fonts:** Segoe UI / system-ui 900
**Geometry:** 0 radius, 3px borders, 6px hard shadows
**Surface:** `raw-grid-brutal`
**Use for:** founder pitches / indie launches / creator portfolios (frontend-slides Raw Grid)

### `long-table`
**Soul:** Supper-club risograph — one rust ink on cream paper, uppercase grotesk + italic Fraunces.
**Palette:** `#FAF1E2` cream · `#B53D2A` rust
**Fonts:** Bricolage Grotesque · Fraunces
**Geometry:** pill buttons, 1.5px rules, radial-dot paper texture
**Surface:** `long-table-supper`
**Use for:** hospitality / supper clubs / lifestyle brands (frontend-slides Long Table)

### `mat`
**Soul:** Mid-century material — dark sage with wood-brown glow, cream type, single burnt-orange accent.
**Palette:** `#232E26` sage · `#F0E8D2` cream · `#C07030` burnt orange · `#7A4E24` wood
**Fonts:** Bricolage Grotesque · DM Sans · DM Mono
**Geometry:** 0 radius, atmospheric wood glow, cream info-card inset
**Surface:** `mat-woodglow`
**Use for:** architecture / craft / furniture / design studios (frontend-slides Mat)

### `stencil-tablet`
**Soul:** Skate-poster stencil — Stardos Stencil display, bone field, saturated earth tablet cards.
**Palette:** `#E2DCC9` bone · `#0A0A0A` ink · `#A06A3C` sienna · `#C73B7A` magenta · `#2D7E73` teal
**Fonts:** Stardos Stencil · Barlow Condensed · Inter
**Geometry:** 22–26px tablet radius, color-block cards
**Surface:** `stencil-tablet-earth`
**Use for:** museums / heritage / craft brands (frontend-slides Stencil & Tablet)

### `cartesian`
**Soul:** Museum-catalog restraint — Playfair on warm stone, 1px taupe lines, compass-draft rings.
**Palette:** `#EDE8E0` sandstone · `#1A1A1A` ink · `#8A8178` accent · `#B8B0A4` line
**Fonts:** Playfair Display · Inter
**Geometry:** 0 radius, 1px hairlines, dashed compass rings
**Surface:** `cartesian-draft`
**Use for:** investment theses / advisory / cultural decks (frontend-slides Cartesian)

### `monochrome`
**Soul:** Ivory ledger — ultra-light Jost headlines, Lora only for quotes, zero chroma.
**Palette:** `#FAFADF` ivory · `#1A1A16` ink · `#5E5E54` graphite
**Fonts:** Jost · Lora · JetBrains Mono
**Geometry:** 16px insight cards, hairline rules, no color fills
**Surface:** `monochrome-ledger`
**Use for:** research synthesis / white papers / policy briefs (frontend-slides Monochrome)

### `blue-professional`
**Soul:** Clean modern professional — cream paper, electric cobalt, Space Grotesk metrics.
**Palette:** `#FDFAE7` cream · `#1E2BFA` cobalt · `#111111` ink
**Fonts:** Space Grotesk · Inter
**Geometry:** soft cards, cobalt wash fills, clean rules
**Surface:** `blue-professional-clean`
**Use for:** B2B SaaS / consulting / investor reports (frontend-slides Blue Professional)

### `daisy-days`
**Soul:** Cheerful sticker deck — Fredoka One, pastel fills, 3px charcoal outlines + hard shadows.
**Palette:** `#F5F0E6` cream · `#7ECDC0` turquoise · `#F7C8D4` pink · `#FDE68A` butter
**Fonts:** Fredoka One · Quicksand
**Geometry:** 20–28px radius, 3px charcoal outlines, 6px hard shadows
**Surface:** `daisy-days-pastel`
**Use for:** kids / wellness / friendly consumer brands (frontend-slides Daisy Days)

### `retro-zine`
**Soul:** Riso zine — khaki paper, forest green accent, Bebas tracked caps + Caveat handwriting.
**Palette:** `#C8B99A` khaki · `#008F4D` green · `#1A1A1A` ink · `#F4EFE6` paper
**Fonts:** Bebas Neue · Space Grotesk · Caveat
**Geometry:** 3px ink borders, paper-on-paper offsets, grain overlay
**Surface:** `retro-zine-riso`
**Use for:** indie zines / music-arts / craft launches (frontend-slides Retro Zine)

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

1. Read `references/theme-selection-index.json` (mood, best_for, avoid_for, scheme, **aliases**).
   - frontend-slides STYLE_PRESET names map via aliases: **Neon Cyber** → `neon-noir`,
     **Terminal Green** → `crt-terminal`, **Swiss Modern** → `swiss-typographic`.
   - Optional fast path: `references/theme-shortlists.json` — pick a use-case shortlist
     (Series A, developer demo, swiss agency, …) instead of scanning all 75.
2. Shortlist **3** themes that fit purpose + audience + density.
3. **Required when tooling is available:** call `preview_themes` with those 3 names
   (writes `.presentation-md/theme-previews/<theme>-preview.html`). Prefer `mode: "layouts"` when
   comparing craft across body slides. Open each file for the user — they pick visually, not from adjectives alone.
4. If MCP is unavailable, run:
   `npx @presentation-md/render preview.json -o previews/<theme>.html --theme <name>` three times
   (one title slide each).
5. After they pick, set `meta.theme` and proceed. Read `references/anti-slop-bans.md` before custom styling.
6. When a theme has a `gallery` field, open that craft deck as a multi-slide proof (not just the title preview).

If they already named a theme, alias, or brand URL, skip discovery (`import_brand_theme` for brand match).

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
| `preview_themes` | Render 1–3 theme HTML previews; pass `mode: "layouts"` for multi-slide craft bake |
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
- **Schema honesty** — every `layout` value is one of the twelve enums; no invented layout names.

For a rigorous, scored pass, run the **`deck-design-judge`** skill: it grades the deck against the design rubric, tells you exactly what to fix, and lets you re-score after the fix. Self-score → fix → re-score, then deliver.
