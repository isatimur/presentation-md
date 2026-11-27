# PowerPoint export scorecard

Generated 2026-11-27 by `pnpm scorecard` (`tools/scorecard/pptx-scorecard.ts`). It exports 153 decks — a fixture with all 18 layouts in each of the 75 themes, plus every gallery example — and opens the PPTX files to check what a person gets.

| Check | Result |
|---|---|
| Slide text that is editable text in PowerPoint | **100.0%** (13825 of 13825 text items) |
| Speaker notes in the notes page | 306 of 306 slides |
| Charts exported as native, editable charts | 129 of 129 |
| Data tables exported as native tables | 145 of 145 |
| Slides exported | 2340 |

## By layout

Fidelity notes come from the export's own report: `approximated` means the layout is rebuilt from simpler shapes; `image` means an image could not be embedded; `skipped` / `fallback` mean content was left out or simplified.

| Layout | Slides | Editable text | Fidelity notes |
|---|---|---|---|
| `chart` | 129 | 100.0% | none |
| `closing` | 153 | 100.0% | none |
| `code` | 86 | 100.0% | none |
| `comparison` | 123 | 100.0% | none |
| `custom-html` | 76 | 100.0% | approximated ×76 |
| `data-table` | 145 | 100.0% | none |
| `feature-grid` | 129 | 100.0% | none |
| `image-hero` | 204 | 100.0% | none |
| `logo-wall` | 97 | 100.0% | none |
| `metric-ring` | 87 | 100.0% | none |
| `quote` | 151 | 100.0% | none |
| `ranked-list` | 108 | 100.0% | none |
| `section` | 165 | 100.0% | none |
| `stat-row` | 157 | 100.0% | none |
| `streak-grid` | 77 | 100.0% | none |
| `timeline` | 120 | 100.0% | none |
| `title` | 153 | 100.0% | none |
| `two-column` | 180 | 100.0% | none |

## What this does not check

- Visual likeness to the HTML deck (no renderer diff yet).
- Fonts: themes use web fonts that PowerPoint substitutes unless installed; use `font_mode: office-safe` for identical rendering on every machine.
