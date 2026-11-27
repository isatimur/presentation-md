# presentation-md design rubric (v1, 2026-11-26)

Purpose: one measurable bar that an agent applies while it writes a deck and a judge applies to the result.
It drives the rewrite of `examples/decks/*.json`.

Read with: `skills/presentation-generator/SKILL.md`, `references/layout-recipes.md`, `references/anti-slop-bans.md`,
`skills/deck-design-judge/references/rubric.md`. This file does not repeat their theme, colour, font, or motion rules.
It adds three things they lack: genre spines tied to sources, numeric copy rules, and a screenshot rubric with 3/6/9 anchors.

---

## 0. Baseline: what the 78 example decks look like today

Measured from `examples/decks/*.json` (script in the session, not committed):

| Measure | Value | Problem |
|---|---|---|
| Slides per deck | min 6, mean 7.4, max 13 | Most decks are too short to carry any genre spine below. |
| Layouts used (of 78 decks) | title 78, stat-row 78, closing 78, image-hero 77, comparison 61, feature-grid 61, quote 49, two-column 38, logo-wall 19, code 12, timeline 10, section 7, data-table 6, chart 1, ranked-list 1, metric-ring 1, streak-grid 1 | One template (title, image-hero, stat-row, comparison, feature-grid, quote, closing) fills nearly every deck, whatever the genre. `chart` appears once. |
| Decks with a repeated heading | 70 of 78 | The title text is usually copied onto the image-hero slide. |
| Body-slide headings | mean 4.2 words; 117 of 366 are 3 words or fewer | Headings are theme slogans ("Three hard edges", "Cream pastels. Charcoal outlines.") that describe the theme, not a claim about the subject. |

The decks pass the automated craft gates because those gates reward the presence of layouts. They do not check whether a deck is the right shape for its genre or whether a heading says anything.

---

## 1. Sources

Primary unless marked. "Obs." means observation of practice, not a controlled study.

| Key | Source | What we take |
|---|---|---|
| DUARTE-R | Nancy Duarte, *Resonate* (2010); Duarte, "Business storytelling" https://www.duarte.com/resources/communication-skills/business-storytelling/ ; "11 audience engagement strategies" https://www.duarte.com/blog/audience-engagement-strategies-presentations/ | Sparkline: open on *what is*, alternate *what is* / *what could be*, end on the *new bliss*; the call to action states what the audience does to move from one to the other. |
| DUARTE-G | Duarte, "Do Your Slides Pass the Glance Test?" HBR, 2012-10-22; Glance Test tool https://www.duarte.com/resources/guides-tools/the-glance-test/ ; *slide:ology* https://www.duarte.com/resources/books/slideology/ | Slides are "glance media": the point must land in about 3 seconds, like a billboard. |
| REYNOLDS | Garr Reynolds, "What is good presentation design?" http://presentationzen.com/blog/what-is-good-presentation-design | Simplicity first; declarative full-sentence headlines often beat topic titles; text discussion belongs in the handout; avoid 3-D effects and stock templates. |
| TUFTE-DI | Tufte, *The Visual Display of Quantitative Information* (1983), data-ink principles (summarised with quotes in https://websites.umich.edu/jpboyd/eng403_chap2_tuftegospel.pdf ) | Above all show the data; maximise data-ink; erase non-data-ink and redundant data-ink. |
| TUFTE-PP | Tufte, "PowerPoint Does Rocket Science" https://www.edwardtufte.com/notebook/powerpoint-does-rocket-science-and-better-techniques-for-technical-reports/ ; *The Cognitive Style of PowerPoint* https://www.edwardtufte.com/book/the-cognitive-style-of-powerpoint-pitching-out-corrupts-within-ebook/ | Bullet outlines fragment causal reasoning; templates "weaken verbal and spatial reasoning" and "corrupt statistical analysis"; boxed repetitive titles waste about 20% of the slide; for analysis use tables and documents, not bullets. |
| MINTO | Barbara Minto, *The Pyramid Principle* (1985/1996); https://www.barbaraminto.com/ | Answer first (governing thought), then 3–4 grouped supports; SCQ (Situation, Complication, Question) opens; each level answers the question raised by the level above. Basis of consulting "action titles". |
| AE | Garner & Alley, "How the Design of Presentation Slides Affects Audience Comprehension: A Case for the Assertion–Evidence Approach," *Int. J. Eng. Educ.* 29(6) 2013, https://www.writing.engr.psu.edu/ae_comprehension.pdf ; Garner et al. 2009 http://writing.engr.psu.edu/Garner_et_al_2009.pdf | Sentence headline, at most 2 lines, plus visual evidence. n = 110; AE group scored higher on comprehension (Cohen's d = 0.81), had fewer misconceptions and lower perceived load. AE slides averaged 21.2 words. |
| SEQUOIA | Sequoia, "Writing a Business Plan" https://sequoiacap.com/article/writing-a-business-plan/ | 10 sections: purpose, problem, solution, why now, market, competition, business model, team, financials, vision. Purpose is "a single declarative sentence". |
| YC-DESIGN | Kevin Hale (YC), "How to design a better pitch deck" https://www.ycombinator.com/blog/how-to-design-a-better-pitch-deck | Legible, simple, obvious. "A simple slide … expresses one idea." Large bold type, text near the top, no thin or grey text. |
| YC-SEED | Aaron Harris (YC), "How to build your seed round pitch deck" https://www.ycombinator.com/library/2u-how-to-build-your-seed-round-pitch-deck (order confirmed via secondary summaries; page body did not load) | Title, problem, solution, traction, unique insight, business model, market, team, ask. Title is the only one-slide section; others may expand to a short set. |
| KAWASAKI | Guy Kawasaki, "The 10/20/30 Rule of PowerPoint" https://guykawasaki.com/the_102030_rule/ ; "The Only 10 Slides You Need in Your Pitch" https://guykawasaki.com/the-only-10-slides-you-need-in-your-pitch/ (both 403 to fetch; rule text confirmed by multiple citing pages) | 10 slides, 20 minutes, no font under 30 pt. Applies to any pitch "to reach an agreement" (capital, sale, partnership). |
| APPLE (obs.) | Carmine Gallo, *The Presentation Secrets of Steve Jobs* (2009); Gallo, "Steve Jobs's Twitter-Friendly Headlines," Forbes 2011-06-06 https://www.forbes.com/sites/carminegallo/2011/06/06/steve-jobss-twitter-friendly-headlines/ ; Apple event archive https://www.apple.com/apple-events/ | One headline per launch that fits in 140 characters ("Today Apple reinvents the phone"); Jobs' first four slides held 7 words in total; slides of one image, one number, or one phrase. |
| MAYER | Mayer, "Using multimedia for e-learning," *J. Comput. Assist. Learn.* 2017 https://onlinelibrary.wiley.com/doi/abs/10.1111/jcal.12197 ; Mayer & Fiorella, Cambridge Handbook ch. 12 (2014) https://edtechuvic.ca/wp-content/uploads/sites/11/2022/09/principles-for-reducing-extraneous-processing-in-multimedia-learning-coherence-signaling-redundancy-spatial-contiguity-and-temporal-contiguity-principles.pdf ; Mayer, "Multimedia Instruction" https://eddl.tru.ca/wp-content/uploads/2020/01/mayer-multimedia-instruction.pdf | Median effect sizes (Mayer's own lab): coherence d = 0.70–0.86, signalling d = 0.46, redundancy d = 0.87, spatial contiguity d = 0.79–1.10, segmenting d = 0.82. Independent meta-analyses find smaller but same-sign effects (e.g. seductive details −0.33). |
| RASKIN | Andy Raskin, "The Greatest Sales Deck I've Ever Seen" (2016) https://medium.com/the-mission/the-greatest-sales-deck-ive-ever-seen-4f4ef3391ba0 ; Zuora's own write-up https://de.zuora.com/2016/09/28/greatest-sales-deck-ever/ | Name a big relevant change; show winners and losers; tease the promised land; features as "magic gifts" against obstacles; evidence you can deliver. |
| DOCSEND | DocSend deck design guide https://experience.dropbox.com/form/docsend/deck-design-report | Investors spend 2 min 42 s on a deck on average, and falling; 88% more time on the competition section. Implies about 15–20 s per slide for 8–12 slides. |
| FERGUSON | Ferguson, Phillips & Lin, *West J Emerg Med* 2017, https://pmc.ncbi.nlm.nih.gov/articles/PMC5226752/ | 105 lectures, 1,222 evaluations. Share of image-based slides predicted speaker score (b = 0.277, p = 0.015); words per slide (mean 25.6) did not. Correlational. |
| WOLFE24 | Wolfe et al., "Advancing the Knowledge Base on Effective Presentation Slide Design: Three Pilot Studies," *J. Tech. Writ. Commun.* 2024 https://journals.sagepub.com/eprint/UTCJ3PQR7XD5ZZFKM5TN/full (abstract via search; full text 403) | SmartArt-style diagram slides gave lower recall than text slides with the same sentence-assertion heading. Decorative structure can hurt. |
| PPTEVAL | Zheng et al., "PPTAgent," EMNLP 2025, https://arxiv.org/abs/2501.03936 | MLLM-as-judge on three axes (content, design per slide; coherence per deck), 1–5 scale with rationales, grounded in Duarte. Precedent for our vision judge. |
| BOARD (practitioner) | I'mBoard board-deck guide https://www.imboard.ai/blog/how-to-run-a-board-meeting ; Whitepage Studio https://www.whitepage.studio/blog/what-your-board-presentation-is-or-might-be-missing | Summary and asks on page 1; metrics with trend; risks; explicit decisions; pre-read differs from live deck; main deck ≤15 slides. No VC-firm primary found. |
| WRAPPED | Spotify newsroom, 2025 Wrapped https://newsroom.spotify.com/2025-12-03/2025-wrapped-user-experience/ ; methodology https://newsroom.spotify.com/2025-12-05/wrapped-methodology-explained/ | One stat per card; mega total (minutes) first; top-N rankings; month-by-month sprint; percentile vs peers; personal, second-person voice. |

Where a genre has no primary research (brand credentials, campaign), the spine below is built from the general sources and says so.

---

## 2. Genre spines

Rules for all spines:
- Beats are a contract on order and job. Copy is written per brief.
- A beat in *italics* is optional. Drop optional beats before you merge required ones.
- "Heading form" says whether the heading is an action title (full-sentence claim) or a label. See rule U3.
- Every spine has at least 2 data beats and at most the cap in rule U7.

### 2.1 Investor pitch (12 beats) — SEQUOIA, YC-SEED, KAWASAKI, DOCSEND

| # | Beat | Layout | Heading form |
|---|---|---|---|
| 1 | Company + one declarative sentence of purpose | `title` | Label (name) + sentence subhead |
| 2 | Problem: the pain, who has it, how it is solved today | `image-hero` or `two-column` (ratio 2-1, evidence right) | Action |
| 3 | Solution: the eureka, concrete benefit | `two-column` or `image-hero` (product shot) | Action |
| 4 | Why now: the change that makes this possible | `timeline` (3–4 dated shifts) | Action |
| 5 | Traction: the one curve | `chart` (line/bar, one series) | Action with the number |
| 6 | *More metrics* | `stat-row` (3 stats, each with comparison) | Action |
| 7 | Unique insight / how it works | `feature-grid` bento or `code` for dev tools | Action |
| 8 | Market: who buys and how big (bottom-up) | `stat-row` or `chart` | Action |
| 9 | Competition / alternatives (investors spend 88% more time here) | `comparison` (emphasis right) or `data-table` (you last) | Action |
| 10 | Business model: price × volume | `data-table` or `two-column` | Action |
| 11 | Team: why these people win | `feature-grid` (3–4 people) or `logo-wall` (prior employers) | Action |
| 12 | Ask + vision: amount, milestones it buys, five-year picture | `closing` with `actions[]` | Action |

Notes: KAWASAKI caps the live pitch at 10; merge 6 into 5 and 11 into 12 for a 10-slide version. YC-SEED puts traction third when it is strong; move beat 5 to beat 3 when traction is the lead.

### 2.2 Product launch (11 beats) — APPLE (obs.), DUARTE-R

| # | Beat | Layout | Heading form |
|---|---|---|---|
| 1 | The one 140-character headline | `title` | Headline sentence |
| 2 | What is: the frustration today | `image-hero` or `quote` (real user) | Action |
| 3 | What could be: the product reveal, one image | `image-hero` (product, no bullets) | Label (product name) allowed |
| 4 | Section: "How it works" | `section` | Label |
| 5 | Feature 1 shown, not listed | `two-column` (ratio 2-1, visual dominant) | Action |
| 6 | Feature 2 | `image-hero` or `code` | Action |
| 7 | *Feature 3* | `two-column` | Action |
| 8 | Proof: one number with comparison | `stat-row` variant `hero` or `metric-ring` | Action with number |
| 9 | Voice of a user or partner | `quote` | Label (attribution) |
| 10 | Price and availability | `data-table` (tiers) or `stat-row` (price, date, regions) | Action |
| 11 | New bliss + call to action | `closing` | Action |

Rule: features are always one per slide (APPLE). A `feature-grid` of all features is allowed only as a recap after the per-feature beats.

### 2.3 Board / QBR update (12 beats) — MINTO, BOARD, TUFTE-PP

| # | Beat | Layout | Heading form |
|---|---|---|---|
| 1 | Period, company, confidentiality | `title` | Label |
| 2 | Executive summary: answer first — 3 wins, 3 problems, 3 asks | `two-column` (ratio 1-1 lists) or `data-table` | Action (governing thought) |
| 3 | KPI scorecard vs plan and vs last period | `data-table` (actual, plan, delta, trend) | Action |
| 4 | The one trend that matters | `chart` | Action with number |
| 5 | Section: "What went well / what did not" | `section` | Label |
| 6 | Win, explained cause → effect | `two-column` | Action |
| 7 | Miss, explained cause → effect, and the fix | `comparison` (plan vs actual, emphasis on the gap) | Action |
| 8 | Financials: burn, runway, cash | `stat-row` (each stat with delta) | Action |
| 9 | Roadmap next period | `timeline` | Action |
| 10 | Risks: likelihood, impact, owner, mitigation | `data-table` | Action |
| 11 | Decisions required (vote / advice / intro) | `feature-grid` (one card per ask) | Action |
| 12 | Close: the recommendation restated | `closing` | Action |

Rules: action titles on every body slide (MINTO). Heading sequence alone must read as the executive summary. No `image-hero`, no `quote` unless it is a customer verbatim tied to a KPI. Bullets replaced by tables where cause and number travel together (TUFTE-PP).

### 2.4 Sales deck (11 beats) — RASKIN, KAWASAKI

| # | Beat | Layout | Heading form |
|---|---|---|---|
| 1 | Customer-named opener | `title` | Action ("How <Customer> …") |
| 2 | The big relevant change in their world | `image-hero` or `chart` (the shift) | Action |
| 3 | Winners and losers of that change | `comparison` (emphasis on winners) | Action |
| 4 | The promised land: their life after | `image-hero` | Action |
| 5 | Obstacle 1 → magic gift 1 | `two-column` (ratio 2-1) | Action |
| 6 | Obstacle 2 → magic gift 2 | `two-column` or `code` | Action |
| 7 | *Obstacle 3 → magic gift 3* | `two-column` | Action |
| 8 | Evidence: customer outcome with number | `stat-row` (before → after) | Action |
| 9 | Customer like them | `quote` + `logo-wall` (two beats if room) | Label (attribution) |
| 10 | Plan and price | `timeline` (implementation) or `data-table` (pricing) | Action |
| 11 | One dated next step | `closing` | Action |

Rule: the product name does not appear before beat 5 (RASKIN: do not start with yourself).

### 2.5 Technical talk (12 beats) — AE, MAYER, TUFTE-PP

| # | Beat | Layout | Heading form |
|---|---|---|---|
| 1 | Thesis as a sentence | `title` | Action |
| 2 | Context: the system and the failure | `image-hero` (architecture diagram) or `custom-html` diagram | Action |
| 3 | Agenda as 3 questions | `timeline` or `section` | Label |
| 4 | Section: question 1 | `section` | Label (the question) |
| 5 | Evidence for answer 1 | `chart` or `code` | Action (assertion) |
| 6 | Mechanism | `two-column` (diagram left, 1–3 lines right) | Action |
| 7 | Section: question 2 | `section` | Label |
| 8 | Before vs after (benchmark) | `comparison` or `data-table` | Action with numbers |
| 9 | Code that matters (≤15 lines) | `code` | Action |
| 10 | Trade-offs and limits | `data-table` | Action |
| 11 | *What we would do differently* | `two-column` | Action |
| 12 | One takeaway + link | `closing` | Action |

Rules: assertion-evidence on every body slide: sentence headline ≤2 lines, body is a visual, ≤25 words besides the heading (AE). Sections every 3–4 slides (MAYER segmenting).

### 2.6 Research readout (12 beats) — MINTO, AE, TUFTE-DI

| # | Beat | Layout | Heading form |
|---|---|---|---|
| 1 | Study name + the headline finding | `title` | Action |
| 2 | Answer first: 3 findings in one slide | `feature-grid` (3 cards, each a sentence) | Action |
| 3 | Question and why it matters (SCQ) | `two-column` | Action |
| 4 | Method: who, how many, when | `stat-row` (n, duration, sources) or `data-table` | Label allowed |
| 5 | Finding 1 + evidence | `chart` | Action |
| 6 | Finding 1, voice | `quote` (participant verbatim) | Label (attribution) |
| 7 | Finding 2 + evidence | `chart` or `data-table` | Action |
| 8 | Finding 3 + evidence | `ranked-list` or `chart` | Action |
| 9 | What surprised us | `comparison` (expected vs found) | Action |
| 10 | Limits and confidence | `data-table` | Action |
| 11 | Recommendations ranked | `ranked-list` | Action |
| 12 | Decision we need | `closing` | Action |

Rule: every chart states its source and n in the caption (TUFTE-DI: show the data, keep its context).

### 2.7 Workshop / lecture (13 beats) — MAYER, AE, REYNOLDS

| # | Beat | Layout | Heading form |
|---|---|---|---|
| 1 | Title + the outcome the learner gets | `title` | Action |
| 2 | Hook: a question or puzzle | `image-hero` or `quote` | Question |
| 3 | Learning objectives (3) | `feature-grid` | Label |
| 4 | Pre-training: key terms | `data-table` (term, meaning) | Label |
| 5 | Section: module 1 | `section` | Label |
| 6 | Concept 1, worked example | `two-column` (diagram + steps) | Action |
| 7 | Exercise 1 (instructions + time) | `timeline` (steps) or `feature-grid` | Imperative |
| 8 | Section: module 2 | `section` | Label |
| 9 | Concept 2, worked example | `two-column` or `code` | Action |
| 10 | Common mistakes | `comparison` (wrong vs right, emphasis right) | Action |
| 11 | Exercise 2 | `timeline` or `feature-grid` | Imperative |
| 12 | Recap: one line per objective | `ranked-list` or `feature-grid` | Action |
| 13 | What to do next | `closing` | Imperative |

Rules: a `section` (signal) every 3–5 content slides (MAYER segmenting, signalling). Narrated slides do not repeat the narration word for word (MAYER redundancy). Pre-training beat comes before the first concept.

### 2.8 Brand / agency credentials (11 beats) — DUARTE-G, FERGUSON, REYNOLDS (no genre-specific primary)

| # | Beat | Layout | Heading form |
|---|---|---|---|
| 1 | Studio name + the point of view in one line | `title` | Sentence |
| 2 | Point of view, shown | `image-hero` (own work, full bleed) | Sentence |
| 3 | What we believe (3 principles) | `feature-grid` bento | Action |
| 4 | Case 1: problem → idea → result | `image-hero` | Action with result |
| 5 | Case 1 result | `stat-row` (with before/after) | Action |
| 6 | Case 2 | `two-column` (ratio 2-1, image dominant) | Action |
| 7 | Case 3 | `image-hero` | Action |
| 8 | Clients | `logo-wall` | Label |
| 9 | Client voice | `quote` | Label (attribution) |
| 10 | How we work (phases) | `timeline` | Action |
| 11 | Start a project | `closing` | Action |

Rule: ≥50% of slides image-led (FERGUSON: image share predicted ratings). Each case has a measurable result or it is cut.

### 2.9 Campaign / manifesto (10 beats) — DUARTE-R (sparkline), RASKIN

| # | Beat | Layout | Heading form |
|---|---|---|---|
| 1 | The cause in one line | `title` | Sentence |
| 2 | What is: the injustice, shown | `image-hero` | Sentence |
| 3 | The number that proves it | `stat-row` variant `hero` (with source) | Action with number |
| 4 | What could be | `image-hero` | Sentence |
| 5 | What is: the obstacle | `comparison` (them vs us, emphasis us) | Action |
| 6 | Voice of someone affected | `quote` | Label (attribution) |
| 7 | What could be: the plan in 3 moves | `feature-grid` or `timeline` | Action |
| 8 | Momentum: who is already in | `logo-wall` or `stat-row` | Action |
| 9 | The date / the moment | `section` (one date, one line) | Sentence |
| 10 | New bliss + the ask | `closing` | Imperative |

Rule: beats alternate what-is and what-could-be at least twice before the close (DUARTE-R).

### 2.10 Year-in-review wrap (10 beats) — WRAPPED

| # | Beat | Layout | Heading form |
|---|---|---|---|
| 1 | Year + whose year | `title` | Second person ("Your 2026") |
| 2 | Mega total | `stat-row` variant `hero` | Number + one line |
| 3 | Top-N | `ranked-list` | Label |
| 4 | Consistency | `streak-grid` | Action with number |
| 5 | Percentile vs peers | `metric-ring` | Action with number |
| 6 | Shift over the year (month by month) | `chart` (line) or `timeline` | Action |
| 7 | Peak moment | `image-hero` | Sentence |
| 8 | A surprise stat | `stat-row` variant `hero` | Number + one line |
| 9 | Who you shared it with | `logo-wall` or `quote` | Label |
| 10 | Share card + next year | `closing` (`actions[]` share) | Imperative |

Rule: one stat per slide; every stat has its unit and a comparison or rank (WRAPPED, DUARTE-G).

---

## 3. Universal rules as numbers

Each rule has an id, a number, a source, and whether the existing automated judge already checks it.

| id | Rule | Number | Source | Checked today? |
|---|---|---|---|---|
| U1 | Words per slide, speaker-led | Body ≤25 words excluding heading; target 10–20. Cover and section ≤12. | AE (21.2 mean in winning condition), APPLE, KAWASAKI (30 pt forces few words) | Partly: G1 gates one block >40, warn >70 total. Both thresholds too loose for speaker decks. |
| U2 | Words per slide, reading-first (board, research) | ≤70 total, no block >40 | deck-design-judge metrics, BOARD | Yes |
| U3 | Heading form | Action title (full sentence with a verb and, where possible, a number) on every body slide of board, research, technical, sales, investor. Labels allowed only on `title`, `section`, `quote`, `logo-wall`, method slides, and launch reveal beats. | MINTO, AE, REYNOLDS | No |
| U4 | Heading length | Action title 6–14 words, ≤2 lines at render size, ≤140 characters. Label ≤5 words. | AE (≤2 lines), APPLE (140 chars) | No (SKILL says ≤8 words, which conflicts with action titles; this rule replaces it for action titles) |
| U5 | Horizontal logic | Reading only the headings in order gives the deck's argument. No two headings identical. | MINTO | No (70/78 examples repeat a heading) |
| U6 | Bullets | ≤3 bullets per slide speaker-led, ≤5 reading-first; ≤7 words per bullet; one level, never nested. | YC-DESIGN, TUFTE-PP, SKILL density table | No |
| U7 | One idea per slide | Each slide's job states in one sentence; a slide never holds two claims. | YC-DESIGN, DUARTE-G | No (judge only) |
| U8 | Data beats per deck | At least 2 for decks ≥8 slides; at most 40% of slides; never 3 data layouts in a row without a `section` or `image-hero`. | DOCSEND (proof slides read longest), MAYER segmenting | Partly: warns only when there is zero data beat |
| U9 | Stat context | Every number carries a comparison, unit, period, or source in ≤10 words beside it. | Deadly Sin 7, TUFTE-DI | No (judge gate G6 only) |
| U10 | Chart integrity | One message per chart, stated in the heading; ≤2 series highlighted; axis labels and source present; no 3-D, no gradients on bars. | TUFTE-DI, REYNOLDS | No |
| U11 | Layout repetition | Same layout ≤2 in a row; any single layout ≤30% of slides (≤40% for `stat-row` in wraps); ≥5 distinct layouts in decks of ≥10 slides. | SKILL Deadly Sin 2 | Partly: run of ≥3 warns; share and distinct count unchecked |
| U12 | Rhythm | No more than 2 dense slides (>40 words or ≥5 items) in a row; a sparse slide (`section`, `image-hero`, `quote`, hero stat) at least every 4 slides in decks ≥9. | MAYER segmenting, DUARTE-R | No |
| U13 | Segmenting signals | Decks ≥12 slides have 2–4 `section` slides or a visible agenda; none for decks ≤8. | MAYER signalling | No |
| U14 | Cover | One sentence (purpose, thesis, or headline) of ≤12 words + name + date/context. No logo soup, no "Agenda" on the cover. Next slide does not repeat the cover text. | SEQUOIA ("single declarative sentence"), APPLE | No |
| U15 | Close | One primary action, ≤1 secondary; restates the governing thought; not "Thank you" or "Questions?". | DUARTE-R (call to action), MINTO | Partly: checks actions exist |
| U16 | Deck length | Pitch/sales 10–14; launch 10–14; board 10–15 (+appendix); technical/lecture ~1 slide per 1–2 min; wrap 8–12; campaign 8–12. Examples must be ≥10 slides to show a spine. | KAWASAKI, BOARD, DOCSEND | No |
| U17 | Image share | ≥30% image-led slides in launch, brand, campaign, credentials; ≥1 in all others except board. | FERGUSON, APPLE | Partly: requires ≥1 `image-hero` |
| U18 | Decoration | No decorative diagrams that restate text (icons-in-boxes, SmartArt-like flows) unless the structure itself is the evidence. | WOLFE24, MAYER coherence | No |
| U19 | Genre fit | Layout sequence matches the genre spine in section 2: ≥70% of required beats present in order. | This document | No |
| U20 | Subject voice | Headings talk about the subject, not the theme ("Cream pastels. Charcoal outlines." fails). | REYNOLDS, MINTO | No |

Rules U3, U4, U5, U8, U11 (share), U12, U13, U14, U16, U19 and U20 are checkable on deck JSON. They are good candidates for `judge-deck-json.ts`.

---

## 4. Ten-dimension scoring rubric (0–10, for a vision judge on screenshots)

How to score:
- Score each dimension 0–10 against the anchors. 3, 6 and 9 are anchors; use the numbers between when a deck sits between two anchors. 10 is reserved for work you would show as a reference.
- Cite evidence: slide number and what you see. No evidence, no score above 5.
- Inputs: one PNG per slide at 1920×1080, plus the genre name. Deck JSON is optional.
- Total = mean × 10 (0–100). Ship bar: total ≥75 and no dimension below 5.

### D1. Genre spine fit
Does the order and job of slides match the genre spine in section 2?
- **3** — Generic template. Missing ≥3 required beats (e.g. pitch with no competition, no ask amount; board with no KPI table). Beats appear in any order.
- **6** — Most required beats present; one or two missing or out of order; one beat serves the wrong job (e.g. quote where the KPI table should be).
- **9** — Every required beat present in a sensible order; optional beats used only where they add proof; a reader could name the genre from the slide sequence alone.

### D2. Narrative arc and tension
Does the deck move from what is to what could be, with setups before reveals?
- **3** — A list of topics. Slides could be shuffled without loss. No change, conflict or stakes.
- **6** — Clear start, middle and end; tension exists but sags in the middle; one reveal lacks a setup slide.
- **9** — Each slide raises the question the next answers; the deck alternates tension and release; the close is the strongest statement.

### D3. Headline quality (action titles)
Do headings state claims about the subject, at the right form for the genre?
- **3** — Labels or theme slogans ("Numbers for the room", "Three hard edges"); headings repeat; reading headings alone tells you nothing.
- **6** — Most body headings are claims; a few labels where a claim was needed; one or two exceed two lines.
- **9** — Every body heading is a full-sentence claim ≤2 lines, most with a number; reading the headings alone gives the argument (U3–U5).

### D4. One idea per slide / glance test
Can a stranger get each slide's point in about 3 seconds?
- **3** — Several slides hold two or more ideas, or the eye has no entry point; the point needs a second read.
- **6** — Most slides pass; one or two are crowded or split attention between two focal points.
- **9** — Every slide has one focal element, the heading names the point, and the visual proves it at a glance.

### D5. Text economy
Words, bullets and redundancy against U1, U2, U6.
- **3** — Paragraphs on body slides; bullet lists of 5+; text repeats what the visual shows.
- **6** — Mostly within limits; one or two slides over budget or with nested bullets.
- **9** — Every slide inside its word budget; bullets ≤3 and short; no text restates the visual; dense detail lives in notes.

### D6. Evidence and data integrity
Are numbers real-looking, contextualised and shown honestly?
- **3** — Orphan stats (no unit, comparison or source); charts with 3-D, no axis, or no message; numbers contradict across slides.
- **6** — Most numbers have context; charts readable but carry chart-junk (heavy grid, legend for one series) or no source line.
- **9** — Every number has unit and comparison; each chart states its message in the heading, highlights ≤2 series, labels axes and source; data-ink is high.

### D7. Visual hierarchy and composition
Does size, weight, colour and position lead the eye in the right order?
- **3** — Elements compete; heading and body near the same size; content crowds edges or floats in the centre with no grid.
- **6** — Clear hierarchy on most slides; alignment slips on a few; one slide crowded.
- **9** — One dominant element per slide, consistent grid and margins, asymmetric layouts used with intent, generous space.

### D8. Rhythm and variety
Does the deck alternate dense and sparse, and use layouts for their jobs?
- **3** — Same layout run of ≥3, or the same 6-layout template as every other deck; no pause slides.
- **6** — Varied layouts but chosen by habit; dense slides cluster; sections missing in a long deck.
- **9** — Layout chosen per beat; a sparse beat every 3–4 slides; sections segment long decks; no layout over 30%.

### D9. Imagery and visual evidence
Do images and diagrams carry meaning, not decoration?
- **3** — Stock-like or placeholder art, icon grids standing in for visuals, decorative diagrams that restate text.
- **6** — Real visuals present but some are generic; one or two decorative.
- **9** — Every image is the subject (product, place, person, data, diagram of the real system); image share fits the genre (U17).

### D10. Cover and close
Does the deck open with a claim and end with an act?
- **3** — Cover is a name only or has an agenda; close is "Thank you", "Questions?", or contact details.
- **6** — Cover has a sentence but it is generic; close has an action but competes with 3+ links, or does not restate the point.
- **9** — Cover states purpose or thesis in ≤12 words; close restates the governing thought and gives one specific, dated or concrete action (≤1 secondary).

Theme, colour, font and craft (overflow, contrast, motion) stay in the existing `deck-design-judge` rubric and gates G1–G9. This rubric scores the message and structure. Run both; report both totals.

### What the current automated judge misses

`packages/core/src/judge-deck-json.ts` checks: slide count <2, block >40 words (G1), total >70 words, same layout ≥3 in a row, no `image-hero`, weak asymmetry, no data layout in decks ≥6, closing without actions. `craft-audit.ts` adds schema checks, comparison emphasis, two-column ratio, bento, icons, CTA icons, notes presence, logo-wall nudge, and per-theme "beat" presence. All are presence checks on layouts and fields.

| Dimension | Automated coverage today | Gap |
|---|---|---|
| D1 Genre spine fit | None. Recipes exist but nothing compares a deck to one. Theme beats check theme, not genre. | Full gap. Add genre in `meta`, check beat order (U19). |
| D2 Narrative arc | None. | Full gap; vision/LLM judge only. |
| D3 Headline quality | `missingHeading` only. | Full gap: no action-title check, no length, no duplicate check (U3–U5, U20). |
| D4 Glance test | None at T0/T1. | Vision judge only. |
| D5 Text economy | G1 >40/block, warn >70/slide. | Thresholds too loose for speaker decks; no bullet count or nesting (U1, U6). |
| D6 Evidence integrity | `noDataBeat` presence; G6 orphan stat is judge-only. | No check of stat context, chart source, series count (U9, U10). |
| D7 Visual hierarchy | T2 metrics on type sizes and shadows; asymmetry presence. | Composition per slide is vision-only. |
| D8 Rhythm and variety | Run ≥3 same layout. | No layout share cap, distinct-layout floor, dense/sparse alternation, or section cadence (U11–U13). |
| D9 Imagery | Requires one `image-hero`. | No image share by genre, no decoration check (U17, U18). |
| D10 Cover and close | Closing has actions; icons on pills. | No cover rule, no duplicate cover text, no "Thank you" / restatement check (U14, U15). |

Net: the automated judge covers D5 partly and touches D8, D9 and D10. D1, D2, D3, D4 and D6 have no automated check. D3 and D1 are the cheapest to add, because they work on deck JSON alone.

---

## 5. How to use this for the example rewrite

1. Tag each example deck with a genre from section 2. Decks that fit none (pure theme showcases) get the closest genre or are marked `showcase` and held to U-rules only.
2. Rebuild each deck from its spine. Target 10–13 slides.
3. Write every body heading as an action title about the deck's fictional subject, not the theme.
4. Score with section 4 on rendered screenshots. Ship bar: ≥75 total, no dimension <5, plus existing G1–G9 clear.
5. Track the section 0 measures before and after: layout distribution (expect `chart`, `data-table`, `section`, `timeline` to rise), duplicate headings (target 0), mean body-heading words (target 7–12).
