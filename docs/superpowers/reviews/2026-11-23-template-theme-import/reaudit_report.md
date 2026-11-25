# Re-audit — Stage 9 on revision 2

*   **Target:** [design, revision 2 → 3](../../specs/2026-11-23-template-theme-import-design.md)
*   **Reviewers:** `egm-implementation-readiness`, `egm-codebase-details`,
    `egm-style` (fresh context each; Opus 5.5).
*   **Date:** 2026-11-23
*   **Rule:** one re-audit per stage. Findings below were resolved in
    revision 3 by the orchestrating agent at the author's direction ("go
    on"); none remain open.

## Totals

| Reviewer | Blocker | Major | Nit |
|----------|---------|-------|-----|
| Implementation readiness | 1 | 6 | 10 |
| Codebase details | 1 (same as above) | 11 | 5 |
| Style | 0 | 9 | 15 |

## Blocker

| Finding | Resolution in revision 3 |
|---------|--------------------------|
| `rgbToHsl` is not exported from `@presentation-md/core` (`index.ts:135`); `index.ts` was not in the file list. | Item 13 adds `rgbToHsl`, `RGB`, `HSL` to the export; core becomes a minor change (item 37). |

## Majors and resolutions

| Finding | Resolution |
|---------|------------|
| `OoxmlPackage` can't list parts (slide-order fallback), content types timing, lost warning. | `partNames()`, eager `[Content_Types].xml`, `warnings`, `partSize()`; DOCTYPE check in `readXml`; `isArray` kept as a module constant (items 1–2). |
| `assertZipEntrySafe` signature open. | `maxEntries?` default 200, exact message, both call sites (item 3). |
| Error strings need a file name. | `opts.fileName`, "the template" fallback (item 4). |
| Font plan flow undefined; `pickExtendsFromBg` import cycle. | `BrandExtractionResult.fontPlan` and `extends`; `pick-extends.ts` (items 16, 22, 23). |
| `ThemeView` new fields vs interactive `collectView`; `SAMPLE_VIEW`. | Required fields, `collectView` fills today's output, README template unchanged (items 24, 28). |
| Font row shape, tail, spec per role, load method, spec format. | `FontRow`; tail = after first comma; spec matched by family; `createRequire`; `+` for spaces (Fonts section, item 20). |
| CLI Office-default behaviour; error loses `source`. | Shared `assertNotOfficeDefault`; message starts `office-default:`; CLI exit 1 (items 21, 24, 31). |
| Google Fonts list never generated. | Run `pnpm fonts:update` in the PR and commit (item 19). |
| `packages/create-theme/README.md` does not exist; MCP README missing. | Dropped; `packages/mcp-server/README.md` added (item 34). |
| `assertPptxPathInCwd` is private and `.pptx`-only. | `assertOoxmlPathInCwd` in `lib/cwd-path.ts` (items 29–31). |
| New create-theme exports and the research doc not listed. | Export list (item 24); research doc (item 35). |
| Studio Paste Brand has the same font defect. | Recorded as a Non-Goal and Future Improvement. |
| Style: file count, "nothing downstream changes", evidence with no collection mechanism, absolute claims, unsupported frequency, performance test mismatch, untested compatibility claim, coverage overclaim. | Count is 49; scope sentence corrected; results table in item 35 with reopen thresholds; claims calibrated; 10 MB padded fixture; older-validator check; coverage wording. |

## Nits

All applied: dated tool count; scorecard glossary; Decisions basis text;
CUJ 2 band "not read in v1"; scheme transforms ignored; DOCTYPE wording;
2,000 as chosen headroom; base heading family; default `font_mode`;
Alternative F points to the report; "could confuse"; `source` in agent
guidance and CUJ 1; glossary for base theme and contrast pass; Future
Improvements each with a reopen condition; "no PPTX writer change";
`sizeBytes`; lower-case hex; `relIdFromSldId` reuse; tests moved into their
groups; hostile-file cases; name-derivation failure.
