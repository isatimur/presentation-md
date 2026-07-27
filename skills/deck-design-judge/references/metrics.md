# Deterministic Metrics

What `scripts/deck_metrics.py` computes, the threshold it judges by, why it matters, and where it's
blind. Trust the numbers, but read the blind spots before you let a metric overrule your eyes.

The script emits a JSON object: `{ "metrics": {...}, "flags": [ {id, severity, detail, slide?} ] }`.
`flags` with `severity:"gate"` are deterministic gate hits (G1–G5); `severity:"warn"` are
soft signals for the judge to weigh.

## Slide detection
Slides = top-level elements whose class contains `slide` (matches `<section>` and `<div>`). `<script>`,
`<style>`, and `<svg>` are stripped before any text measurement so logo path data and code don't
count as words.
- **Blind spot:** decks that don't use a `slide` class (e.g. one giant scroller) report 1 slide —
  the script warns when it finds <2 so you know to inspect manually.

## words  → **gate G1** (single block) + warn (total)
Two measures per slide, after tag/script/style/svg removal:
- `max_block_per_slide` — words in the **largest single text block** (split on `<p>/<li>/<h*>/<br>`
  …). **>40 in one block = G1 (wall of text).** This is the real sin: one dense paragraph the
  audience must read.
- `words_per_slide` — **total** words on the slide. **>70 total = warn**, not a gate, because a
  two-column or 4-step layout legitimately distributes 60–100 words across structured blocks and is
  still good design. The `clarity` judge dimension decides whether dense-but-structured is too much.
- *Why split them:* an early version gated on total words and nuked perfectly good process/comparison
  slides. Total counts breadth; max-block counts the actual wall.
- **Blind spot:** a data-heavy table legitimately packs words into many small cells — neither measure
  flags it as a wall, which is correct; judge table density visually.

## font_families  → warn if >2 brand faces
Distinct `font-family` stacks plus Google-Fonts `family=` params, minus generic fallbacks
(`-apple-system`, `system-ui`, `Segoe UI`, `sans-serif`, `serif`, `ui-monospace`, `monospace`, `SF
Mono`, `Menlo`, `Consolas`). Reports the real faces. **>2 real display/body faces** warns (a mono
for code is fine and excluded).
- *Why:* a tight system is ~1–2 faces; more reads as un-systemised.

## type_sizes  → warn if >~6 distinct ramp entries
Distinct `font-size` values (each `clamp(...)` counts as one ramp entry). **>6** warns.
- *Why:* great decks use ~4 sizes; a sprawling set means no hierarchy.
- **Blind spot:** counts declared, not *used* — a token file may declare a full ramp the deck only
  partly uses. Cross-check with what the screenshots actually show.

## drop_shadows  → **gate G2 (when system is flat)**
Finds `box-shadow` values that are real elevation — non-`none`, not a focus ring. A focus ring is
recognised as `0 0 0 <spread>` (no x/y offset) and excluded. If `--tokens` is supplied and the
system is flat (the Swiirl/Untitled-UI default: shadows mapped to `none`), any elevation shadow is
**G2**. Without tokens, elevation shadows are a **warn** (can't prove the system is flat).
- *Why:* the Claude-Design/Untitled-UI lineage expresses depth with hairlines + background steps,
  not shadows; a stray shadow breaks the system.

## contrast  → **gate G3**
Parses `:root` custom properties (resolving `var()` up to 5 levels and blending `rgba()` over the
background), picks the primary background, and computes WCAG contrast for every text-ish token
(name contains `text`/`ink`/`fg`, excluding `bg`/`border`/`button`/`nav`/`brand-solid`/`section`).
- Tokens that read as **primary/secondary body** (`--ink`, `--ink-2`, `text-primary`,
  `text-secondary`) failing **< 4.5:1** = **G3**.
- Tertiary/quaternary/placeholder/disabled tokens are judged at **3.0:1** and only *warn*.
- *Why:* body text below AA is unreadable for many; it's a correctness bug.
- **Blind spot (important):** the checker can't see font size at the point of use, so it **exempts
  nothing automatically** — large display/gradient text that's legitimately below 4.5 will flag.
  When a G3 hit is on a token only ever used at display size, downgrade it in the writeup and say so.
  Conversely it can't catch a low-contrast gradient headline whose stops aren't in `:root` — that's
  the screenshot judge's job.

## frameworks  → **gate G5**
Detects Tailwind / Bootstrap / React / Vue / Angular / external CSS-framework CDN links or classes.
Any hit = **G5** (self-contained decks must not pull these per the output rules).

## craft_features  → **gate G4** (HTML decks)
Booleans: `print_css` (`@media print`), `keyboard_nav` (a `keydown`/`keyup` handler or arrow-key
logic), `reduced_motion` (`prefers-reduced-motion`), `scroll_snap` (`scroll-snap`), `viewport_meta`.
**Missing any of print / keyboard / reduced-motion / viewport = G4.** `scroll_snap` absence is a
*warn* (not every good deck snaps).
- *Why:* these are the ship essentials — a deck that can't print, can't be keyed through, or ignores
  reduced-motion isn't finished.

## anim_safety  → warn
Flags the "stuck-invisible" risk: elements with a reveal class (`anim`/`fade`/`reveal`) set to
`opacity:0` **without** a JS-gated fallback (a `no-js`/`js` class switch) or a `prefers-reduced-
motion` override. If reveal-hiding isn't gated, a JS failure leaves text permanently invisible.

## accent_area  → reported, not gated
A rough proportion of accent-coloured surface (large fills/gradients in the accent vs neutral).
Reported as a hint for the judge's `color` score; **too coarse to gate** — the screenshot judge
makes the real call on the 15% rule.

---

## Usage
```bash
python3 deck_metrics.py <deck.html> [--tokens <colors_and_type.css>] [-o metrics.json]
```
Pure stdlib Python 3 — no install. If `--tokens` is omitted the script still self-detects a `:root`
block inside the deck for contrast/flat checks; supplying the brand token file makes the flat-system
(G2) and brand checks authoritative.
