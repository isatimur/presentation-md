# Stage 7 — Critic Review (FeatureRange, lines 1–504)

Reviewers: `egm-design`, `egm-structural` (both against
`feature-spec-standard.md`), `egm-style` (persona audit vectors; no standard
assigned). Fresh context each. GoldfishContext as in Stage 5.

Totals: 1 Blocker, 27 Major, 27 Nit (before deduplication; see Overlaps).

## Blocker (verified against code by the orchestrator)

| ID | Where | Finding | Fix |
|----|-------|---------|-----|
| DC-1 | "Logo in HTML (CSS only)" | `.slide::after` is already used 88 times in `packages/shared/surfaces.css`. `surfaceForTheme` returns `"gradient"` for any unmapped theme (`theme-surface.ts:6`), so every imported theme gets a decorative `::after` blob (`surfaces.css:18`) that is loaded after `base.css` and more specific. The logo and the blob collide. | Use a carrier that doesn't collide: a dedicated `<div class="pmd-brand-mark" aria-hidden="true">` per slide (state the renderer change), or a pseudo-element on an inner wrapper. Decide the surface for imported themes. Add an HTML render test for all four corners. |

## Design Critic (egm-design)

| ID | Sev | Finding | Fix |
|----|-----|---------|-----|
| DC-2 | Major (security) | The logo must be injected raw (`{{{…}}}`) into a `<style>` block. Renderers never validate manifests at render time; a hand-edited `src` with `)`, `;}` or `</style><script>` is CSS injection or XSS. | Enforce a strict base64 data-URI regex and a length cap at the render site in all three renderers; drop the logo with a warning; test a malicious `src`. |
| DC-3 | Major | Office-default heuristic: 5-of-6 misfires when only `accent1` was rebranded; too few reference schemes; master fills often use `a:schemeClr` back to Office blue; CUJ 2's band-as-`bg` contradicts `p:bg`-only. | Require `accent1`/`dk2`/`lt2` to match too; full built-in list; ignore fills that resolve to the default scheme; rewrite CUJ 2. |
| DC-4 | Major | No acceptance criterion measures palette correctness; Skill Doctor measures tool calls only. | Corpus of 10–20 publicly licensed real templates (dark, Office-default, multi-master, EMF logo) with expected `bg`/`text`/`accent`/`source`; gate on a pass rate within a ΔE threshold. |
| DC-5 | Major | `MAX_ZIP_ENTRIES = 200` is checked over the whole central directory; real `.potx` files with sample slides exceed it and would be rejected as hostile. Limit logic lives inside `extractPptx`. `.potx` with zero slides would hit "No slides found". | Factor out the bounded reader; count only parts read (keep byte caps); zero-slide `.potx` valid; add a >200-entry fixture. |
| DC-6 | Major | Bottom corners get no reserve, yet the scorecard demands zero overlap; `paintSlideChrome` slide shapes can cover the master logo. | Bottom reserve or top corners only in v1; scorecard fails when any shape covers the logo; mirror for HTML. |
| DC-7 | Major | Studio cannot receive an imported theme (build-time glob + Paste Brand only), so the Studio goal and Decision 1's argument against C are weak. | Drop Studio from v1 goal, or define how a theme reaches Studio; re-weigh C. |
| DC-8 | Major | Logo detection only looks at `p:pic`; misses `grpSp`, `blipFill`, `asvg:svgBlip`. Caps conflict (10 MB vs 200 KB; raw vs base64). `rasterizeSvgImages` takes decks; resvg is optional; Studio PPTX export bypasses renderer-node. | Handle `svgBlip`/`grpSp`/`blipFill`; oversize = warning + no logo; cap on decoded bytes; store a PNG fallback with any SVG. |
| DC-9 | Major | Phasing (fonts/colours first) and an agent-in-the-loop mapping (return candidates, agent/user confirms roles) are not assessed as alternatives. | Add both with trade-offs. |
| DC-10 | Major | "Never uploads transcripts" vs "LLM grader": transcripts may reach a model provider. Pass rule is a gate in practice with n=3 and an unjustified 0.5. | State where the grader runs; make it advisory or justify and repeat runs. |
| DC-11 | Major | "No stored data changes shape" is wrong: `theme.schema.json` has `additionalProperties: false`, so older validators reject new packages; Python's loader drops unknown keys. | State the forward/backward contract; consider a schema version; cleanup path. |
| DC-N1 | Nit | Python renderer uses naive `{{k}}` replacement, 12 layouts, and a loader that keeps only roles/typography/geometry. | List the Python changes explicitly. |
| DC-N2 | Nit | Export defines no slide master today; "keeps building its own" is wrong. | Reword; note exempt-layout effect. |
| DC-N3 | Nit | Alt text contradiction. | Decorative in HTML; `brand.name` → PPTX picture `descr`. |
| DC-N4 | Nit | Edge cases: monochrome brands, `p:clrMapOvr`, empty `a:latin`, weight-suffixed families, which base theme supplies the fallback font. | Specify each. |
| DC-N5 | Nit | 200 ms figure unmeasured. | Benchmark fixture or drop. |
| DC-N6 | Nit | Risks scattered. | Risks & Mitigations table. |

## Structural (egm-structural)

| ID | Sev | Finding | Fix |
|----|-----|---------|-----|
| ST-1 | Major | No Risks & Mitigations section; several weak points have no mitigation. | Add H2 table: Risk, Failure mode, Likelihood/Impact, Mitigation, Test. |
| ST-2 | Major | "Rejected by agent at author's delegation" and the "do as u wish" quote are attributions without a link. | Keep only the technical rationale; drop or link the attribution. |
| ST-3 | Major | Problem section's small first step contradicts the Goals' logo scope. | Phase the Goals, or state why the mitigation was dropped. |
| ST-4 | Major | Dangling refs: "Confirm in the implementation section" (l.131), "file 1" (l.465). | Resolve or name headings and module paths. |
| ST-5 | Major | Decision 1/2 options sit in the Technical Plan in another format; Alternative F is a stub; A/B/C labels clash. | Move or cross-reference; relabel 1A/1B/1C; give F a reason. |
| ST-6 | Major | Three rendering methods for the logo (pseudo-element, `<img>`, "CSS background or `<img>`"). | One method everywhere; restate SVG safety. |
| ST-N1 | Nit | Additional Resources / Future Improvements are H3 under NFR. | Promote to H2. |
| ST-N2 | Nit | `*Resolved:*` pseudo-heading. | H3 or bullets. |
| ST-N3 | Nit | Short paths in the data-flow diagram. | Full paths or a legend. |
| ST-N4 | Nit | Unlinked scorecard, Skill Doctor source, ECMA-376. | Link them. |
| ST-N5 | Nit | Quoted "all text editable and in place" isn't the scorecard's wording. | Quote the real wording. |
| ST-N6 | Nit | Tool count 16 vs research note's 14. | Cite the source (code has 16; research table is stale). |
| ST-N7 | Nit | Logo caps in two places. | State 200 KB at candidate selection. |
| ST-N8 | Nit | CUJ 1 says "HTML slides show the logo" but three layouts are exempt. | "Content slides show…". |

## Style (egm-style)

| ID | Sev | Finding | Fix |
|----|-----|---------|-----|
| SY-1 | Major | "All 8 roles from the template" contradicts derived `muted`/`cardBg`/`border`. | Name which roles come from the template. |
| SY-2 | Major | "Colours match the template exactly" overclaims. | "Each template-sourced role keeps its resolved hex, except those in `contrastAdjustments`." |
| SY-3 | Major | Alt-text contradiction; "brand name is already in the title slide" unverified. | Pick one model; reword. |
| SY-4 | Major | Demand caveat not followed. | Phase or justify. |
| SY-5 | Major | "Visible step", "small distance", "neutral" unmeasurable. | Metric and threshold. |
| SY-6 | Major | Scorecard guarantee misquoted. | Calibrate wording. |
| SY-7 | Major | "Main difference from Gamma and Canva" unsourced. | Calibrate or drop "main". |
| SY-8 | Major | "Breaks the contrast guarantee" overstates a check. | "Contrast can no longer be checked." |
| SY-9 | Major | 200 ms unsourced. | Label as target with a test, or drop. |
| SY-10 | Major | "Tests prove" for tests not yet run. | "Must pass unchanged." |
| SY-11 | Major | "file 1" and "implementation section" unresolved. | Name targets. |
| SY-N1–N12 | Nit | Undated Skill Doctor claims; gate ambiguity and score scale; "competitors win this complaint" misframed; "three bad options"; "praised"; "promise"; colloquial "reaches for it"; "clear error"; aphorism filler; figurative phrases; repeated provenance; undefined "content slide". | Calibrate or drop as listed by the reviewer. |

## Overlaps (same root cause, several reviewers)

| Root cause | IDs |
|------------|-----|
| Logo drawing method and alt text | DC-1, DC-N3, ST-6, SY-3, CO-3 |
| One PR vs unproven demand | DC-9, ST-3, SY-4, ZO-1, IC-3 |
| Office-default detection and CUJ 2 | DC-3, CO-1, IC-4 |
| Logo size caps | DC-8, ST-N7, CO-2 |
| Studio cannot receive imported themes | DC-7, ZO-5 |
| Skill Doctor gate, privacy, scale | DC-10, SY-N1, SY-N2, CO-5, ZO-6 |
| Bottom-corner overlap | DC-6, IC-2, CO-N8 |
| Unmeasurable thresholds | SY-5, CO-N3, ZO-N2 |
| Dangling references | ST-4, SY-11 |
| Risks section | ST-1, DC-N6 |
