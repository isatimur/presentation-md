---
"@presentation-md/core": patch
"@presentation-md/render": patch
---

Fix layouts that left most of the slide empty, plus two rendering bugs.

- Comparison columns, timeline rails, code windows and stat rows now centre in the space under the heading instead of hugging the top. Feature-grid cards pin the icon to the top and the copy to the bottom.
- Larger body type on comparison, timeline, table, card and stat slides.
- Data-table slides now show `lead`.
- Code windows are always a dark panel. On dark themes they were pale with light text.
- Chart series 2 used `var(--accent2)`, which is undefined, so it painted black. It now uses `--accent-2`, and series 3+ no longer repeat series 1.
