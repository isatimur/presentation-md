# Hallmark audit — presentation-md marketing site

**Verb:** `hallmark audit`  
**Targets:** `web/index.html`, `web/pricing.html`, `web/vs/hallmark.html`  
**Date:** 2026-08-04  
**Brand lock:** signal-grid (`#E8EEF4` paper · `#FF3B1F` accent · Syne / DM Sans / IBM Plex Mono) — preserved; not graded as cream/purple slop.

Genre read: **modern-minimal** (developer tool / agent skill). Aurora blobs and pure-white paper are graded with that genre’s allowances where noted.

---

## Critical

| Tell | Where | Fix |
| --- | --- | --- |
| **3-column feature grid** (equal icon + heading + body) | `web/index.html` `#how-it-works` `.steps` (~1612–1631); `#studio-feature` `.steps` (~1681–1697); `#compare` `.compare-pillars` (~4647+) | Break equal columns; drop icon-above pattern; lead with type / numbered sequence |
| **Icon-tile feature card** | Same `.step` / `.layout-cell` blocks; layouts grid (~3170+) | Pull icons inline or remove; vary cell weight |
| **Eyebrow on every section** | 13× `.eyebrow` on homepage (Proof, Showreel, How it works, Start, Studio, Themes, Layouts, Gallery×2, Why, Packages, Install, FAQ) | Default OFF — keep ≤1–2 ordinal labels or none |

## Major

| Tell | Where | Fix |
| --- | --- | --- |
| Soft **aurora / radial blob** wash on page chrome | `body` background radials (~126–129); pricing / vs dark headers | Solid paper / solid stage; grain or hairline only |
| **Hero paper gradient** on copy rail | `.hero-copy` linear-gradient (~325–326) | Solid `--paper` |
| **Shadow-glow** on Studio embed | `#studio-feature` iframe wrapper (~1707) | Hairline border; no soft colored elevation |
| **Equal 3-up craft cards** | `.hero-craft` / `.compare-live` | Asymmetric spans or denser strip |
| Pricing / vs **radial header blobs** | `web/pricing.html` header; `web/vs/hallmark.html` header | Solid `--stage` |

## Minor

| Tell | Where | Fix |
| --- | --- | --- |
| `min-height: 100svh` hero | `.site-hero` | Content-height or capped; asymmetry already mitigates “centred full-viewport hero” |
| Theme preview card hover lift + soft shadow | `.theme-preview-card:hover` | Tighter border response only |
| Missing Hallmark / `design.md` stamp | homepage CSS | Stamp + lock system in `design.md` |

## Passes (do not “fix”)

- Display/body pairing: Syne + DM Sans (+ mono) — **not** Inter-everywhere
- No purple-to-pink gradient hero; accent is solid signal red
- Hero is **biased** (copy rail left + craft plate right), not centred SaaS template
- Footer is dense colophon-ish, not 4-column Product/Company/Resources/Legal
- Honest product facts (no invented “trusted by 50k” metrics in proof strip)
- LCP hero image uses `fetchpriority="high"` (not lazy)

## Score

**3 critical · 5 major · 3 minor**

---

*Audit only — redesign notes live in `README.md` in this folder and root `design.md`.*
