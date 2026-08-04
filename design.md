# Design — presentation-md

A locked design system for the marketing site and related pages. Every Hallmark redesign
reads this file before emitting code. Do not regenerate per page — extend or amend this
file when the system needs to grow.

## Genre
modern-minimal (developer tool / agent skill) with a tactile **signal-grid** paper stage.

## Macrostructure family
- Marketing pages: **Split Studio** (copy rail + product craft plate) → Long Document / Feature Stack below the fold
- Content / compare pages: Letter-close or dense single-column with solid stage mast
- App pages (Studio): function-first; no marketing enrichment

## Theme — signal-grid (locked brand)
- `--paper`      `#E8EEF4` (cool paper — never warm cream `#F4F1EA` / `#F0ECE3`)
- `--paper2`     `#DDE5EE`
- `--ink`        `#0B1220`
- `--ink-light`  `#4A5568`
- `--rule`       `rgba(11,18,32,0.12)`
- `--accent`     `#FF3B1F` (signal red — single anchor; ≤ ~5% of viewport)
- `--accent2`    `#0D9488` (secondary only for status dots / rare contrast)
- `--stage`      `#0B1220` (craft plate / dark mast)
- No purple–pink–cyan aurora heroes. No Inter/Roboto as display.

## Typography
- Display: **Syne**, weight 700–800, `font-style: normal` (never italic headers)
- Body: **DM Sans**, 400–600
- Mono / labels: **IBM Plex Mono**, 400–600
- Display tracking: about `-0.03em` to `-0.055em` on brand mark

## Spacing
Prefer multiples of 4. Section padding ~80px desktop; container max ~960px marketing.

## Motion
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` / `cubic-bezier(0.22, 1, 0.36, 1)`
- One orchestrated hero entrance; below-fold mostly static
- `prefers-reduced-motion: reduce` → opacity-only / no carousel autoplay

## Microinteractions
- Buttons: fill accent primary; outline secondary; 4px radius (not pill)
- Hover: slight lift optional; never bounce/elastic
- Focus: 2px accent outline

## CTA voice
- Primary: solid `#FF3B1F`, white type, short verb (“Install for your agent”)
- Secondary: paper fill + ink border
- No gradient CTAs, no sparkle emoji badges

## What pages MUST share
- Wordmark `presentation-md` as brand-first signal on marketing heroes
- Cool paper + signal red + Syne/DM Sans/Plex Mono
- Asymmetric layouts preferred over centred stacks
- Eyebrows default OFF (≤ 1–2 ordinal labels per page if any)
- No icon-tile 3-up feature grids

## What pages MAY differ on
- Hero craft plate content (carousel vs static)
- Below-fold section order
- Compare-page tables vs letter close

## Anti-slop refusals (project-specific)
- Do not restyle into cream terracotta editorial or purple SaaS gradients
- Do not replace Syne with Inter
- Hallmark is for **pages/UI**; decks stay on presentation-md Deck JSON
