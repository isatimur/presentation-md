# Consolidated review — Theme from a PowerPoint template

*   **Target:** [2026-11-23-template-theme-import-design.md](../../specs/2026-11-23-template-theme-import-design.md)
*   **Preset:** Consolidated report, all five stages, no checkpoints.
*   **Reviewers:** 10 fresh-context agents (Opus 5.5). Stage reports:
    [5](zoom_out_report.md), [6](comprehension_report.md),
    [7](critic_report.md), [8](intermediate_zoom_out_report.md),
    [9](implementation_readiness_report.md).
*   **Date:** 2026-11-23

## Verdict

**Revise before building.** The core idea survived every stage: read the
template's colour scheme through `clrMap`, read its fonts, run the existing
contrast pass, and emit the same theme package through `import_brand_theme`.
Reviewers endorsed Decision 2, the shared hardened reader with the DOCTYPE
refusal, and the rejection of Alternatives B–D.

Almost all serious findings sit in three add-ons: **the logo** (every
Blocker but two), **master-fill sampling**, and **Skill Doctor as a gate**.
Their fixes add machinery in three renderers. Stage 8 recommends cutting
them from v1. Two of those cuts reverse author decisions, so they need the
author's call.

## 🔴 Blockers

| # | Action | Source IDs |
|---|--------|-----------|
| B1 | **Decide logo scope.** Either move logo rendering to its own design (v1 returns logo metadata only), or adopt all logo fixes: a non-colliding carrier, render-time `src` validation in three renderers, Studio and Python loaders, aspect ratio, bottom-corner reserve or top-only corners, header narrowing in `renderHero`/`renderSection`/`renderTwoColumn`, wash and attribution handling, fs-free core subpath, conditional CSS block, schema compatibility. | ZI-1, DC-1, IR-B1, CD-B1, DC-2, CD-B4, IR-B2, IR-B3, R-1–R-7, R-13, R-17, R-18, DC-6, DC-8, DC-11, CO-2, CO-3, ST-6, SY-3, IC-2 |
| B2 | Add `@presentation-md/export` to `create-theme`'s dependencies (import the `/import` subpath only). | IR-B4, CD-B3 |
| B3 | Add Lab/ΔE helpers to `core/src/color.ts`, or switch the "near bg" rule to an existing metric. | CD-B2 |

## 🟡 Major

| # | Action | Source IDs |
|---|--------|-----------|
| M1 | **Decide master-fill sampling.** Either replace it with `source: "office-default"` + warning + refuse `write` without an override + a SKILL.md rule, or fully define it (scheme list, `schemeClr` handling, per-role rules, CUJ 2 rewrite). | ZI-2, DC-3, CO-1, IC-4, IC-5, R-8 |
| M2 | Phase the work, or justify one PR. Rewrite the "demand unproven" weak point to match. | ZO-1, IC-3, DC-9, ST-3, SY-4 |
| M3 | Reuse `mapPaletteToRoles`: add optional `bg2`/`accent2` to `BrandColorCandidates`; small adapter; no new core export. | ZO-2, ZI-3 |
| M4 | Fonts: template family first in the stack; `googleFonts` only for real Google families; one classification for all sources in `create-theme`; reuse `OFFICE_FONTS`; set typography fields as objects (untrusted names); exact fallback stack. | IC-1, ZO-3, ZI-5, R-11, R-12, N5 |
| M5 | Drop template script fonts from v1 (warn when they differ from Office defaults), or extend to HTML with full call sites. | ZO-4, IC-N2, ZI-4, R-10 |
| M6 | ZIP entry cap: count only parts read, keep byte caps, accept zero-slide `.potx`; >200-entry fixture. File 2 becomes a behaviour change. | DC-5, ZI-7 |
| M7 | Skill Doctor optional; acceptance by checking CUJ transcripts; no baseline; state where the grader runs. | ZO-6, DC-10, CO-5, ZI-6 |
| M8 | Use the tool's real response names: `theme`, `source`, `contrastAdjustments`, `contrastStillFailing`, `writtenTo`. | CO-4, ZI-9 |
| M9 | Shared reader API: async, `isArray` additions, content types, media flag. | R-16 |
| M10 | Complete the file list: `deck-types.ts`, skill schema copies, `core/package.json` exports, root `package.json` script, `scaffoldTheme` call sites, extra tests. | R-15, R-14 |
| M11 | Add a Risks & Mitigations table (carry the deferred items and the evidence that would bring each back). | ST-1, DC-N6, ZI-11 |
| M12 | Alternatives: add phasing and agent-in-the-loop role confirmation; fix A/B/C label clash; give F a reason; drop the repeated delegation attribution. | DC-9, ST-2, ST-5, SY-N11 |
| M13 | Correct overclaims: "all 8 roles", "match exactly", scorecard misquote, "main difference", "contrast guarantee", "tests prove", 200 ms, tool description sentence. | SY-1, SY-2, SY-6–SY-10, R-20 |
| M14 | Rollout: state the schema compatibility contract (moot if B1 cuts the logo and M5 drops script fonts). | DC-11 |
| M15 | Glossary for Studio, share links, craft audit, judge. | CO-6 |

## 🟢 Nit

Dangling references (ST-4, SY-11); Open Questions resolved items (CO-N1,
ST-N2); heading levels (ST-N1); diagram paths and names (ST-N3, N9); links
(ST-N4); name derived from file name (ZO-N3, ZI-8); exempt-layout constant
(ZO-N4); colour-transform list (CO-N4); Python token substitution and
gitignored templates (DC-N1, Stage 9 nits); stale line hints and "today"
references; changeset package names; missing tests listed in Stage 9.

## Traceability

| Consolidated | Stage 5 | Stage 6 | Stage 7 | Stage 8 | Stage 9 |
|--------------|---------|---------|---------|---------|---------|
| B1 logo | ZO-5, ZO-N1, ZO-N4, IC-2, IC-N1 | CO-2, CO-3, CO-N2, CO-N8 | DC-1, DC-2, DC-6, DC-7, DC-8, DC-11, ST-6, ST-N7, ST-N8, SY-3 | ZI-1, ZI-10 | IR-B1–B3, CD-B1, CD-B4, R-1–R-7, R-13, R-17, R-18 |
| B2 dependency | — | — | — | — | IR-B4, CD-B3 |
| B3 ΔE helper | — | — | — | — | CD-B2 |
| M1 master fills | IC-4, IC-5 | CO-1 | DC-3 | ZI-2 | R-8 |
| M2 phasing | ZO-1, IC-3 | — | DC-9, ST-3, SY-4 | ZI-1 | — |
| M3 mapper reuse | ZO-2 | CO-N3 | SY-5 | ZI-3 | R-8 |
| M4 fonts | ZO-3, IC-1 | — | DC-N4 | ZI-5 | R-11, R-12 |
| M5 script fonts | ZO-4, IC-N2 | — | — | ZI-4 | R-10 |
| M6 ZIP cap | — | CO-N6 | DC-5 | ZI-7 | — |
| M7 Skill Doctor | ZO-6 | CO-5 | DC-10, SY-N1, SY-N2 | ZI-6 | — |
| M8 field names | — | CO-4 | — | ZI-9 | — |
| M9 reader API | — | — | — | — | R-16 |
| M10 file list | — | — | — | — | R-14, R-15 |
| M11 risks | — | — | ST-1, DC-N6 | ZI-11 | — |
| M12 alternatives | — | — | DC-9, ST-2, ST-5, SY-N11 | — | — |
| M13 overclaims | — | — | SY-1, SY-2, SY-6–SY-10 | — | R-20 |
| M14 rollout | — | — | DC-11 | ZI-1 | — |
| M15 glossary | — | CO-6, CO-N7 | — | — | — |

## Recommended path

Stage 8's reduced v1 clears B1, M1, M5 and M14 by removal and shrinks the plan
from 43 to about 20 files:

1.  `pptxPath` on `import_brand_theme`, `--from-pptx` on the CLI, name from
    the file name.
2.  Shared hardened reader (DOCTYPE refusal, count only parts read).
3.  `template-brand.ts`: first master → theme, scheme via `clrMap`, built-in
    scheme detection, Latin fonts, logo metadata only.
4.  Adapter → `BrandColorCandidates` → existing `mapPaletteToRoles` →
    `ensureContrastSafe`.
5.  Fonts per M4.
6.  `source: "template-scheme" | "office-default"`; `write` refused on
    `office-default` without an override.
7.  SKILL.md trigger and rule; one tool-description sentence.
8.  No theme-schema, renderer, Studio or PPTX-export change.

Logo rendering, master-fill sampling and script fonts move to Future
Improvements, with the metadata from step 3 as the evidence that would bring
the logo back.
