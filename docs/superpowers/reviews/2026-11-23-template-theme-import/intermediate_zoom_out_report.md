# Stage 8 — Intermediate Zoom Out

Reviewer: `egm-zoom-out` (fresh context), full file, with the Stage 5–7
reports. The document was not edited between stages.

**Pattern.** The core of the design (scheme, `clrMap`, fonts, contrast pass,
same package) drew almost no findings. Nearly every finding, including the
only Blocker, sits in three add-ons: the logo, master-fill sampling, and
Skill Doctor. Their proposed fixes all add machinery. The simplest design
that meets the objective removes the add-ons instead of patching them.

ZI-1 and ZI-2 reverse decisions the author made on 2026-11-23 (logo as a
goal; master-fill fallback). They go to the author and are not applied
silently.

| ID | Sev | Finding | Fix |
|----|-----|---------|-----|
| ZI-1 | Blocker | The logo carries the Blocker (DC-1), a security Major (DC-2) and the schema-compatibility break (DC-11, `additionalProperties: false`). Each fix adds renderer work in three places. | Move rendering to its own design. Keep detection in `template-brand.ts` and return metadata only (`logo: { found, mime, corner, widthPct }`) to measure how many templates have a usable logo. No `brand` field means no schema change, a true rollback claim, and about 20 files instead of 43. |
| ZI-2 | Major | Master-fill sampling: CUJ 2 contradicts the algorithm, four roles have no rule, detection misses built-in schemes, fills often resolve back to Office blue. | Detect built-in schemes (scheme name list or the hex table), return `source: "office-default"` with a warning, refuse `write` without an override, and add a SKILL.md rule: ask for brand colours or use the URL import. Defer sampling and the vision fallback. |
| ZI-3 | Major | `mapTemplateToRoles` duplicates `mapPaletteToRoles` (`brand-extract.ts:110-133`). | Add optional `bg2`/`accent2` to `BrandColorCandidates`; a small adapter in `template-brand.ts` / `create-theme` makes candidates; the existing mapper runs unchanged. Thresholds live in the adapter, numbers in tests. |
| ZI-4 | Major | Script fonts: reviewers split (drop vs extend to HTML). Most templates keep Office defaults; no CUJ needs it; it is the other reason for a schema change. | Drop from v1. Read `ea`/`cs` only to warn when they differ from Office defaults. |
| ZI-5 | Major | Fonts. IC-1 (local-first stack) and ZO-3 (defect affects every source) are both right. Both miss `OFFICE_FONTS` in `export/src/fidelity.ts`: Calibri, Aptos and Arial are Office fonts, so a bare `missingFonts` list misleads. | Template family first in the stack; `googleFonts` only for real Google families; one classification in `create-theme` for all sources; report "Office font" vs "not Google, not Office"; reuse `OFFICE_FONTS`. Resolve the Google Fonts question. |
| ZI-6 | Major | Skill Doctor fixes add process to a check the design calls a signal. | Keep the SKILL.md trigger/rule and the tool sentence; acceptance by hand-checking CUJ transcripts; Skill Doctor optional; no baseline. |
| ZI-7 | Major | Triage of Stage 7 fixes. | **Adopt** DC-5 (count only parts read, keep byte caps, zero-slide `.potx` valid; file 2 becomes a behaviour change) and fixtures for >200 entries and a non-Office built-in scheme. **Decline** DC-4's licensed corpus; instead write down expected roles for the two manual templates before running. **Moot** after ZI-1/ZI-2: DC-1, DC-2, DC-6, DC-8, CO-2, CO-3, ST-6, SY-3, IC-2, DC-N3, ST-N7, ST-N8, CO-N2, CO-N8, IC-N1, ZO-N1, ZO-N4. |
| ZI-8 | Nit | `name` required only for `pptxPath`. | Derive from the file name; `validateThemeName`. |
| ZI-9 | Nit | Response names drift. The tool returns `theme`, `source`, `contrastAdjustments`, `contrastStillFailing`, `writtenTo` (`import-brand-theme.ts:77-85`). | Use these exact names. Resolves CO-4. |
| ZI-10 | Nit | Studio claim: in this repo an imported theme written to `packages/themes/<name>` does reach Studio after a rebuild (`themes.ts:49-50` glob); installed users get nothing. | Only matters if the logo stays. |
| ZI-11 | Nit | Many structural and style items target sections ZI-1/ZI-2 delete. | Cut first, then add the Risks table (carrying deferred items and the evidence that would bring each back) and fix wording. |

## Simplest design that meets the objective

1.  `import_brand_theme` gains `pptxPath`; CLI `--from-pptx`; name from the
    file name.
2.  Shared, hardened OOXML reader from `extract.ts`: refuses `<!DOCTYPE`,
    counts only parts read.
3.  `template-brand.ts`: first master → theme; scheme through `clrMap`;
    built-in scheme detection; Latin fonts; logo metadata only.
4.  Adapter → `BrandColorCandidates` (new `bg2`/`accent2`) → existing
    `mapPaletteToRoles` → `ensureContrastSafe`.
5.  Fonts per ZI-5.
6.  Response: existing fields plus font list, `warnings`, `logo` metadata,
    `source: "template-scheme" | "office-default"`; `write` refused on
    `office-default` without an override.
7.  Skill trigger and rule; one tool-description sentence.
8.  No theme-schema, renderer, Studio or PPTX-export change.

Verdict: revise. With ZI-1 to ZI-3 applied, no Blocker remains.
