# Competitor showcase benchmark — presentation-md example decks

Captured 2026-11-26. Screenshots and contact sheets (2 per row, every captured slide) were working files and are not in the repo; every sheet was viewed. Type sizes come from a DOM probe (`tools/shoot.mjs`, `tools/gamma.mjs`): the largest computed font on the slide, scaled to a 1920 px wide slide. Image-only sources (Pitch, Beautiful.ai, speakerdeck) have no DOM, so their sizes are eyeball estimates and marked "~".

No logins, sign-ups or posts. Gamma "docs" template views, Pitch template players, Beautiful.ai template pages, Slidev and Marp decks were all public. Nothing needed a login, so nothing was skipped for that reason.

## 1. What I captured

| Source | Deck (genre) | Slides in deck | Sheet |
|---|---|---|---|
| frontend-slides (beautiful-html-templates) | Signal (investor/board) | 18 | `sheets/fs-signal.png` |
| frontend-slides | Blue Professional (sales/market readout) | 10 | `sheets/fs-bluepro.png` |
| frontend-slides | Studio (launch/agency proposal) | 12 | `sheets/fs-studio.png` |
| frontend-slides | Vellum (research) | 9 | `sheets/fs-vellum.png` |
| frontend-slides | 8-Bit Orbit (tech) | 10 | `sheets/fs-8bit.png` |
| Gamma | Big Bet — Series B, robot orchard (investor pitch) | 26 | `sheets/gamma-bigbet-a.png`, `-b.png` |
| Gamma | Account Health QBR (board/QBR) | 26 | `sheets/gamma-qbr.png` |
| Gamma | Luminal — seizure study (research readout) | 29 | `sheets/gamma-luminal.png` |
| Pitch | AI Software Sales Deck (sales) | 31 | `sheets/pitch-aisales.png` |
| Pitch | Product Launch (launch) | ~12 | `sheets/pitch-launch.png` |
| Pitch | Series B Pitch Deck (investor) | ~15 | `sheets/pitch-seriesb.png` |
| Pitch | SaaS Investor Update (board) | ~12 | `sheets/pitch-invupdate.png` |
| Beautiful.ai | Board Report (board) | 11 | `sheets/bai-board.png` |
| Beautiful.ai | Investor Presentation (investor) | 15 | `sheets/bai-investor.png` |
| Beautiful.ai | Product Launch Strategy (launch) | 9 | `sheets/bai-launch.png` (last tile is a related template the page also showed) |
| Beautiful.ai | Clarity CRM (sales) | 12 | `sheets/bai-sales.png` |
| Slidev | Anthony Fu, "Composable Vue" (tech talk) | 30+ | `sheets/slidev-composable.png` |
| Slidev | Anthony Fu, Vue Fes Japan 2024 (keynote talk) | ~16 | `sheets/slidev-antfu24.png` |
| Marp | marp-cli-example | 8 | `sheets/marp-example.png` |
| Human gold #1 | LinkedIn Series B deck, 2004 (Reid Hoffman's public copy) | 37 | `sheets/gold-linkedin.png` |
| Human gold #2 | Zach Holman, "Move Fast & Break Nothing" (keynote style) | 95 | `sheets/gold-holman.png` |
| **Ours** | novaspark-pitch (investor) | 13 | `sheets/ours-novaspark.png` |
| **Ours** | signalforge-launch (launch) | 7 | `sheets/ours-signalforge.png` |
| **Ours** | apex-qbr, northbridge-board (board/QBR) | 6, 8 | `sheets/ours-apexqbr.png`, `sheets/ours-northbridge.png` |
| **Ours** | meridian-sales (sales) | 13 | `sheets/ours-meridiansales.png` |
| **Ours** | forge-api (tech talk) | 7 | `sheets/ours-forgeapi.png` |
| **Ours** | signalbox-report (research/report) | 12 | `sheets/ours-signalbox.png` |

To compare slides on equal terms, I hid our gallery's presenter chrome (filmstrip, present bar, dots) with injected CSS. See finding 0.

## 2. Cross-cutting findings (apply to every genre)

0. **Our gallery view is not a slide view.** By default each structured page shows a presenter bar, a 13-thumbnail filmstrip and slide dots. The slide is a card at about 80% of the viewport width, and the slides above and below peek in at top and bottom (every `ours-*` sheet shows these slivers). Each competitor shows one full-bleed 16:9 slide at a time. First impression: ours reads as a document, theirs as a presentation.
1. **The copy describes the theme, not a business.** Covers read "Crisp white. Restrained navy." (apex-qbr), "Cream paper. Cobalt certainty." (northbridge-board) and "Emerald on navy. Paper truth." (verdure-report), with subtitles like "Inter headlines. Source Sans for the detail." Four decks reuse the same filler cards, "Cut the filler — If a card doesn't change the decision, it doesn't earn the pixel" and "Stack for scan — Hierarchy first. Decoration second." (novaspark s2, northbridge s3, forge-api s2, meridian-sales s2). Gamma's samples tell one invented but coherent company story end to end: Rowan Field Systems, $48M Series B, 38,000 bins, a named CEO, a closing slide that rhymes with the cover.
2. **The image-hero slide repeats the cover.** Slide 2 or 4 in novaspark, signalforge, apex-qbr and forge-api repeats the cover headline word for word in a narrow column, under a blurred abstract gradient "photo". Competitors use real photography (Gamma, Pitch, Beautiful.ai) or a product UI mock (Gamma Big Bet s12, Pitch AI Sales s22).
3. **One type scale for every theme.** In all 7 of our decks: cover 101 px, stat numbers 91 px, slide headings 55 px. Gamma moves the scale on purpose: Luminal cover 163 px for 3 words, Big Bet statement cards 138 px, QBR's KPI hero "82" at 195 px, section numerals 146–187 px, working headings 61–73 px. frontend-slides Studio "PROPOSAL" and Pitch Launch "PRODUCT LAUNCH" fill about 40% of the slide width (~200 px).
4. **The bottom half sits empty.** Our stat-row, timeline, data-table and comparison slides put the content in the top 40% and leave 50–60% of the card blank (apex s4, meridian s6/s8, signalbox s5/s6/s9, novaspark s9/s10). Competitors either centre the content vertically (frontend-slides Signal and Vellum stats) or fill the height (Gamma QBR table, Beautiful.ai charts, frontend-slides bar charts that rise from the baseline).
5. **Our decks are short and repeat one sequence.** Ours run 6–13 slides, and most follow title > feature-grid > comparison > image-hero. Competitor showcases run 26–31 slides (Gamma, Pitch), 9–18 (frontend-slides, Beautiful.ai), and 37–95 for the human gold standards. Length lets them build real arcs: agenda, section divider, problem, proof, ask, close.
6. **Few kinds of charts.** Across 7 decks we show one chart (a grouped bar). Seen elsewhere: a waterfall, a sparkline beside a KPI, a horizontal ranked bar, a stacked bar with one highlighted series, a funnel, an area chart with called-out points, donuts, pictographs, a Gantt, a line chart with a "−40 min" callout, and an interactive threshold slider (Luminal s12).
7. **Two rendering bugs show in the showcase.** See "Noticed, not touched".

## 3. Genre verdicts

### 3.1 Investor pitch — Gamma Big Bet, Pitch Series B, Beautiful.ai Investor, frontend-slides Signal, gold: LinkedIn 2004 vs ours: novaspark-pitch

| Dimension | They beat us | We beat them |
|---|---|---|
| Narrative arc | Big Bet: cover claim > agenda (4 numbered beats) > "01 The harvest problem" divider > evidence > "Why now" > product > how a grower signs up > business model chart > market funnel > ask > close that mirrors the cover. LinkedIn: frames itself as "eBay for people", 1.0 vs 2.0 analogy, then proof ("Strong results with < $4M spent"). | novaspark has a real arc (problem > market table > roadmap), better than Pitch/Beautiful.ai, whose copy is placeholder ("Define the problem you're solving…"). |
| Variety | Big Bet: 26 cards, no two consecutive cards share a layout; full-bleed photo, three-photo row, photo + stats split, chart on dark, funnel, UI mock. | — |
| Type & hierarchy | Big Bet cover is 102 px with 11 words on a dark plate over a photo, one amber accent word ("picked."). Statement cards are 138 px. Our cover is 101 px with 5 words, then 55 px everywhere. | Our cover word count (5) is punchier than Big Bet's 11. |
| Density | Big Bet stat column: 3 numbers, 1 source line, about 35 words. | Comparable word counts (ours 16–72 per slide). |
| Data viz | Single-bar highlight ("Crews 71%" in amber, the rest grey), stacked bars with "Service overtakes hardware", a sizing funnel. LinkedIn: actual vs projection line chart with a press quote under it. | We have a data-table and a timeline (Pitch's samples have neither). |
| Imagery | Consistent, story-specific photography (orchard, robot, grower) and a product dashboard mock. | — (ours is a blurred gradient) |
| Signature motif | One amber word per statement card; "01/02" serif numerals; source line under every number. | Aurora glow is a motif, but it carries no meaning. |
| Cover punch | Photo + claim + company · round · date + CEO name. | — |

### 3.2 Product launch — Pitch Product Launch, frontend-slides Studio, Beautiful.ai Launch Strategy vs ours: signalforge-launch

| Dimension | They beat us | We beat them |
|---|---|---|
| Narrative | Pitch drives the deck with questions ("WHAT IS THE PRODUCT?", "WHAT IS ITS MAGIC?", "What does the future hold?"). Beautiful.ai: stages > Gantt > budget donut. | Our copy is closer to real launch copy ("48k weekly active builders, 3.2× faster ship cycles, $0 paid acquisition"). |
| Type | Pitch cover "PRODUCT LAUNCH" ~200 px condensed grotesk at about half the slide width; the question slides use the same scale. Studio: "PROPOSAL" ~180 px, "GREAT WORK DOESN'T HAPPEN BY ACCIDENT" ~110 px. Ours: 101 px cover, 55 px elsewhere. | — |
| Variety / colour blocking | Pitch alternates black, white and acid-lime full-bleed slides. Studio flips to a full yellow slide for the numbers. | — |
| Imagery | Phone mock of the product on the cover and on the "magic" slide. | — |
| Data viz | Studio "Projects by year" bar chart with the last bar highlighted. Beautiful.ai Gantt and budget donut. | We have none in signalforge. |
| Cover punch | One product word plus a product render. Ours: the orange card overlaps the headline (bug). | — |

### 3.3 Board / QBR update — Gamma Account Health QBR, Beautiful.ai Board Report, Pitch Investor Update vs ours: apex-qbr, northbridge-board

| Dimension | They beat us | We beat them |
|---|---|---|
| Narrative | Gamma QBR is answer-first: "Health moved from amber to green this quarter." (8 words, 114 px) comes before the numbers. Then "Who is in the room", goals from onboarding, score composition, quarter vs quarter, value vs goals, cumulative value, risks, ask. Beautiful.ai: Executive summary > Highlights > "Request for input & decisions needed" table > priorities > next steps with dates. | northbridge's "Three decisions" agenda is the right instinct. |
| Variety | 26 cards: hero KPI + sparkline + 4 KPI tiles; table with a bold rule before the current column; horizontal bars; waterfall; people list. | — |
| Type | KPI "82" at 195 px with "▲ 11 vs Q2". Our stat numbers are 91 px with one-word labels ("New ARR"). | — |
| Density | Gamma uses the full card height. Ours: apex s4 leaves the bottom 55% empty. | Ours is cleaner when there is little to say. |
| Data viz | Waterfall, sparkline, delta chips (Beautiful.ai "▲12% QoQ" green chips), decision table. | — |
| Imagery | On-topic photography (trucks, warehouse, people). | — |
| Cover | "Quarterly business review / Q3 2026 · Meridian Freight / two named presenters". Ours is a theme description. | — |

### 3.4 Sales deck — Pitch AI Software Sales, Beautiful.ai Clarity CRM, frontend-slides Blue Professional vs ours: meridian-sales

| Dimension | They beat us | We beat them |
|---|---|---|
| Narrative | Clarity CRM: market shift > funnel ("Capture > … > Delight", last step highlighted) > logo wall > three customer quotes with bolded ROI phrases > pricing tiers. Pitch: buyer personas with photos, product UI phone mock. | meridian-sales has the strongest arc of our set: cost of inaction > savings ($118k) > timeline > ROI table. That beats Pitch's placeholder copy. |
| Type | Clarity CRM: tight, large sans headings (~70 px) that are full sentences ("Customers see rapid ROI and teamwide adoption"). | Our serif (Libre Baskerville) title page is elegant. |
| Data viz | Funnel, hub diagram, ranked bars (Blue Pro "Most important concerns", 7 bars with % labels). | We have a real ROI table with line-item maths — no competitor sales sample has this. |
| Social proof | Quote cards with highlighted phrases, logo walls on dark tiles. | We have the `logo-wall` and `quote` layouts but don't use them for proof here. |
| Imagery | Architecture photos, product mocks. | — |

### 3.5 Technical talk — Slidev "Composable Vue", frontend-slides 8-Bit Orbit, gold: Holman "Move Fast & Break Nothing" vs ours: forge-api

| Dimension | They beat us | We beat them |
|---|---|---|
| Narrative | Composable Vue: 30+ slides, one pattern per slide, each with a "Pattern"/"Core" tag; code split into IMPLEMENTATION / USAGE columns. Holman: 95 slides, one idea per slide, 4–6 words at ~150–200 px over a tinted photo. | — |
| Variety | Holman alternates a statement over a photo, a quote with attribution, and a photo-only beat. | — |
| Type | Holman about 2× our heading size; title lockup with a pink "&" glyph. | — |
| Code | Slidev: two code panes side by side, syntax highlight, progressive reveal. | Our code slide has a window chrome motif, **but its code is near-invisible** (light grey on light grey, forge-api s5). |
| Motif | Holman: duotone violet photo + cyan type on every slide. 8-Bit: HUD corner brackets, scanlines. | forge-api's terminal dots are a decent motif. |
| Cover | Holman: 3-line lockup over a photo. Ours: 6-word sans at 101 px on a flat dark card. | — |

Marp's example (`sheets/marp-example.png`) sits well below us: generic Gaia theme, logos as content. We beat it on every dimension except cover type size (120 px).

### 3.6 Research / report readout — Gamma Luminal, frontend-slides Vellum, gold: LinkedIn (data slides) vs ours: signalbox-report

| Dimension | They beat us | We beat them |
|---|---|---|
| Narrative | Luminal: "The quiet cascade" > challenge (3 reasons) > hidden structure (a finding as a full sentence, 93 px) > one night of recording (timestamped photo strip 20:00 / 23:00 / 03:00 / 07:00) > trend chart with a "FIG. 01 −40 min" callout > interactive threshold > data provenance > who the alert reaches. Every chart has a takeaway beside it. | signalbox is the best of ours: action title "ARR climbed — enterprise still carries the story." + a chart + a table. |
| Type | Luminal cover 163 px, 3 words; finding statements 93 px; figure labels in mono. Vellum: 73% / 1.4× / #1 in a centred serif with dividers. | — |
| Data viz | Area/line chart with glow, a FIG label, a callout number beside the chart, interactive slider. Vellum: bar chart with the final bar highlighted and an "n = 412" source. | Our grouped bar has an axis and legend, but the legend colours collide (bug), and the "signal red" promised in the subtitle never appears. |
| Sources | Luminal and Vellum print the method/source line ("Averaged over 212 seizures"; "Internal study, 2026, n = 412"). | — |
| Imagery | A documentary photo strip with timestamps; one photo per human role. | — |

## 4. Where we already win (keep these)

- Real numeric layouts the agent can fill: `data-table`, `timeline`, `chart`, `stat-row`. Pitch's and Beautiful.ai's samples are mostly placeholder text.
- Action-title instinct in signalbox and meridian-sales.
- Short cover headlines (3–6 words) beat Gamma Big Bet's 11-word cover on scan speed.
- Every theme has a distinct surface (brutalist, art-deco, editorial). Competitor galleries show 3–5 styles per genre; ours shows 75.

## 5. Ranked list: 15 most transferable design moves

Ranked by impact on first-glance quality ÷ effort. "content-only" means we can do it by writing better Deck JSON with today's 18 layouts. "needs renderer change" means the renderer or gallery must change.

1. **Write one coherent fictional company per deck, not a theme description.** Named company, round or quarter, presenter names, real-looking numbers with a source line; drop the "Cut the filler / Stack for scan" filler cards. (Gamma Big Bet, Gamma QBR.) — **content-only**
2. **Grow showcase decks to 14–20 slides with a genre arc.** Investor: claim > agenda > problem > why now > product > model > market > traction > team > ask > close. QBR: answer > people > scorecard > vs last quarter > value > risks > decisions. Talk: hook > one idea per slide > recap. — **content-only**
3. **Answer-first statement slides.** One full-sentence finding at display size ("Health moved from amber to green this quarter.") via `section` or `quote` before each data slide. — **content-only** (bigger type: see move 9)
4. **Pair every chart or stat with its takeaway and its source.** Action title + `chart`/`stat-row` + caption "n = 412 · internal study". Use `chart` with one highlighted series and the rest muted. — **content-only** if `chart` accepts per-series colour; otherwise **needs renderer change** (series highlight)
5. **Close that rhymes with the cover.** Same claim structure, resolved ("Next September, every bin gets picked on time."). — **content-only**
6. **Stop repeating the cover in image-hero.** Use image-hero for a new beat (a place, a person, a product) with its own caption. — **content-only**
7. **Show the gallery as a full-bleed single slide.** Hide filmstrip, present bar and dots by default, and give each slide 100% of the viewport with no neighbour slivers. — **needs renderer change** (gallery/present default)
8. **Fill vertical space on stat-row, timeline, data-table and comparison.** Centre vertically, or anchor and stretch to the card height; let stat numbers grow when there are ≤3. — **needs renderer change**
9. **Per-theme type scale with a "statement" size.** Let themes set cover and statement display sizes (140–200 px at 1920) instead of a fixed 101 / 91 / 55. — **needs renderer change**
10. **Real, on-story imagery.** Ship photos or product UI mocks with the example decks instead of blurred gradients; the image is a slot the agent fills. — **content-only** (assets) + `custom-html` for UI mocks
11. **One accent-word motif per deck.** Colour a single word in each statement (Big Bet amber, Holman pink "&"). — **needs renderer change** (inline emphasis markup in headings), unless `custom-html` is used
12. **Section dividers with big numerals.** "01 The harvest problem" with a one-line promise; pairs with an agenda slide that lists the same numbers. `section` + `ranked-list` for the agenda. — **content-only**
13. **More chart kinds: waterfall, sparkline-with-KPI, funnel, horizontal ranked bars, stacked-with-highlight.** We have `ranked-list` and `metric-ring`; waterfall and funnel need new chart types. — **needs renderer change** (ranked bars possibly content-only via `ranked-list`)
14. **Social-proof slides: quote cards with bold ROI phrases, logo wall, named people ("Who is in the room").** `quote`, `logo-wall`, `feature-grid` with real names and roles. — **content-only**
15. **Colour-block rhythm: alternate dark, light and full-accent slides.** Pitch Launch flips to lime and Studio to yellow for the numbers slide; Gamma alternates ink and paper. Needs a per-slide surface/background override. — **needs renderer change** (unless a per-slide `tone`/variant field already exists — not checked)

## 6. Noticed, not touched

- **forge-api code slide:** code text is near-invisible (light grey on light grey panel). `ours-forgeapi-s5.png`.
- **signalforge-launch cover:** the orange card overlaps the headline; "signa|l. Skip the" runs into the card. `ours-signalforge-s1.png`.
- **signalbox-report chart:** "Enterprise" and "Self-serve" use the same blue in bars and legend; the subtitle promises signal red for the series that moved, but no red appears. `ours-signalbox-s7.png`.
- **Gallery default view:** in a plain headless load, the presenter filmstrip and bar show over the deck. Pressing `f` after a click entered edit mode (red outlines, "DONE" button) instead of hiding the strip.
- **image-hero repeats the cover headline** in at least 4 decks (novaspark s4, signalforge s2, apex-qbr s2, forge-api s4).

## 7. Method notes and limits

- Pitch template pages show placeholder copy, so their narrative score reflects template text, not a real deck.
- Slidev slides with click-steps were captured with `?clicks=30` to reveal all steps.
- The Beautiful.ai launch sheet's last tile ("Feature Planning") is a related template the page also showed, not part of the launch deck.
- Font sizes for Pitch, Beautiful.ai and the speakerdeck slides are visual estimates (marked ~).
- The capture scripts and screenshots were working files and are not kept in the repo.
