# Stage 5 — Initial Zoom Out Review

Target: `docs/superpowers/specs/2026-11-23-template-theme-import-design.md`
Reviewers: `egm-zoom-out`, `egm-inventive-catalyst` (fresh context each).
GoldfishContext: `docs/research/competitors-2026-11.md`, `docs/pptx-scorecard.md`.
Left out: the Skill Doctor URL (reviewers cannot open URLs; the design
summarises it).

Neither reviewer found a Blocker. Both endorse Decision 2, the shared
`package-reader.ts` with the DOCTYPE refusal, the rejection of Alternatives
B–D, and layouts as a non-goal.

## Zoom Out (egm-zoom-out)

| ID | Sev | Where | Finding | Proposed fix |
|----|-----|-------|---------|--------------|
| ZO-1 | Major | Weak points; Goals; "One PR" | The design says demand is unproven and a small first step limits cost, then ships everything in one 43-file PR. | Split: PR 1 reader, mapping, fonts, tool/CLI, Office-default warning; PR 2 logo across renderers, PPTX master, scorecard, master-fill sampling. |
| ZO-2 | Major | Role mapping; file 6 | `mapTemplateToRoles` duplicates `mapPaletteToRoles`, which already derives `bg2`, `muted`, `cardBg`, `border`. | Add optional `bg2`/`accent2` to `BrandColorCandidates`; convert `TemplateBrand` → candidates; call the existing mapper unchanged. |
| ZO-3 | Major | Decision 2; files 7, 14–16 | `missingFonts` only for templates, but `buildThemeViewFromBrand` writes every font into `googleFonts` for every source (`theme-view.ts:27-28`). | Run the lookup in `extractBrand` for all sources; keep the lookup out of core's public index. Close the "bundled list" question. |
| ZO-4 | Major | Script fonts; files 9, 10, 12, 27 | Most templates keep Office's default script fonts, which `script-fonts.ts` already hardcodes. No CUJ needs it. | Drop to Future Improvements, or store only entries that differ from defaults and add a CUJ. |
| ZO-5 | Major | Goals (Studio); Decision 1 rationale; file 21 | Studio can't load an MCP/CLI-imported theme (registry = bundled + Paste Brand), so the Studio reason for Decision 1 defends a path not delivered. Studio's `resolveTheme` is a separate port that the plan doesn't update. | Base Decision 1 on "no per-deck step, no file lookup for Node/Python". Add `studio/src/render/themes.ts:resolveTheme` to the file list or drop Studio from the goal. |
| ZO-6 | Major | Goals; Skill Doctor loop | An external LLM-graded tool tied to a Goal and release path; the baseline measures a trigger that doesn't exist yet. | Replace with a transcript check of the three CUJs; Skill Doctor optional; remove from Goals. |
| ZO-N1 | Nit | file 20 | `rasterizeSvgImages` walks deck `image` keys, not themes. | Say how: wrap as `{ image: src }`, or rasterize at import time. |
| ZO-N2 | Nit | Technical Plan thresholds | Numeric thresholds in architecture prose will drift. | Keep numbers in tests. |
| ZO-N3 | Nit | files 17, 28 | `name` required only for `pptxPath`. | Derive from file name (`acme.potx` → `acme`). |
| ZO-N4 | Nit | files 13, 19, 24 | Exempt-layout list kept in CSS and in PPTX export. | One core constant used by both. |
| ZO-N5 | Nit | Overview | Research item 8 is only partly delivered. | Say so in Additional Resources. |

## Inventive Catalyst (egm-inventive-catalyst)

| ID | Sev | Where | Finding | Proposed fix |
|----|-----|-------|---------|--------------|
| IC-1 | Major | Weak points; Goals; CUJ 2; Fonts | Font stacks are local-first (`theme.json.mustache:20`), so the browser draws an installed corporate font exactly as PowerPoint does. Replacing the name with the base font *creates* the parity gap the design warns about, and CUJ 2 tells the user something false. | Keep the template family first, then the base family, then `system-ui`; omit only from `googleFonts`. Reword `missingFonts` and CUJ 2: "shows only where installed, in HTML and PPTX alike". |
| IC-2 | Major | Scorecard section; file 43 | Overlap is checked only on the CI fixture, never on a user's deck; bottom corners get no reserve. `fidelity.ts` already runs on every export and sees the theme. | Compute `logoBox` in `context.ts`; emit a fidelity item per overlapping slide via `export_deck`; scorecard asserts zero items. Reserve bottom corners too, or say they are reported, not prevented. |
| IC-3 | Major | Weak points vs one PR | Same as ZO-1. | PR 1 without `brand`; PR 2 adds `brand.logo`. PR 1 can already return logo metadata to measure how many templates have one. |
| IC-4 | Major | Office default detection | Matching ≥5 accents against three Office schemes misses PowerPoint's many other built-in schemes (Blue, Median, Slipstream…), so CUJ 2 fails silently for them. | Invert: literal `a:srgbClr` master fills, non-neutral, large enough and far from every scheme accent, mean the author overrode the scheme. Scheme name and table become hints. Add a non-Office built-in test case. |
| IC-5 | Major | "keep the scheme and add a warning"; `source` | No signal → an Office-blue theme labelled `template-scheme`, written with `write: true`. That is the failure the design names. | New `source: "office-default"`; refuse `write` (or write and have tool text/SKILL.md send the agent to another source); explicit override; add as acceptance case. |
| IC-N1 | Nit | files 14, 22; tests 39–41 | `brandLogoCssVars` twice (TS, Python), kept in step by hand. | Shared test-vector file synced by `tools/sync-*`, read by all three test suites. |
| IC-N2 | Nit | Script fonts; file 27 | Template script fonts reach PPTX only, never HTML. | If kept, put them ahead of script families in the shared stack helper in all renderers. |

## Overlaps

*   ZO-1 = IC-3 (split into two PRs).
*   ZO-4 and IC-N2 pull in opposite directions on script fonts: drop it, or
    extend it to HTML. Both agree the current half-way version is wrong.
