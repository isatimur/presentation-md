# PowerPoint export scorecard

Generated 2026-11-25 by `pnpm scorecard` (`tools/scorecard/pptx-scorecard.ts`). It exports 153 decks — a fixture with all 18 layouts in each of the 75 themes, plus every gallery example — and opens the PPTX files to check what a person gets.

| Check | Result |
|---|---|
| Slide text that is editable text in PowerPoint | **100.0%** (11472 of 11472 text items) |
| Speaker notes in the notes page | 348 of 348 slides |
| Charts exported as native, editable charts | 76 of 76 |
| Data tables exported as native tables | 81 of 81 |
| Slides exported | 1928 |

## By layout

Fidelity notes come from the export's own report: `approximated` means the layout is rebuilt from simpler shapes; `image` means an image could not be embedded; `skipped` / `fallback` mean content was left out or simplified.

| Layout | Slides | Editable text | Fidelity notes |
|---|---|---|---|
| `chart` | 76 | 100.0% | none |
| `closing` | 153 | 100.0% | none |
| `code` | 87 | 100.0% | none |
| `comparison` | 136 | 100.0% | none |
| `custom-html` | 75 | 100.0% | approximated ×75 |
| `data-table` | 81 | 100.0% | none |
| `feature-grid` | 136 | 100.0% | none |
| `image-hero` | 152 | 100.0% | none |
| `logo-wall` | 94 | 100.0% | none |
| `metric-ring` | 76 | 100.0% | none |
| `quote` | 124 | 100.0% | none |
| `ranked-list` | 76 | 100.0% | none |
| `section` | 82 | 100.0% | none |
| `stat-row` | 153 | 100.0% | none |
| `streak-grid` | 76 | 100.0% | none |
| `timeline` | 85 | 100.0% | none |
| `title` | 153 | 100.0% | none |
| `two-column` | 113 | 100.0% | none |

## What this does not check

- Visual likeness to the HTML deck (no renderer diff yet).
- Fonts: themes use web fonts that PowerPoint substitutes unless installed; use `font_mode: office-safe` for identical rendering on every machine.
