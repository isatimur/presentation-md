---
"@presentation-md/export": patch
---

PPTX export no longer drops the `lead` line on chart, ranked-list, streak-grid, stat-row, data-table, timeline, feature-grid, logo-wall, code and custom-html slides. The HTML deck showed it; PowerPoint did not. Found by the new PPTX scorecard (`pnpm scorecard`), which now checks in CI that all slide text the HTML shows is editable text in PowerPoint.
