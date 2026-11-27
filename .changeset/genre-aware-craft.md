---
"@presentation-md/core": minor
"@presentation-md/render": patch
"@presentation-md/export": patch
---

Craft checks fit the kind of deck, and two layouts read better.

- New optional `meta.genre` (pitch, launch, board, sales, talk, research, workshop, brand, campaign, wrap). A `board` deck no longer gets the "add an image-hero" warning from `audit_deck`, `judge_deck` or the repair pass.
- The logo-wall warning fires only on copy that lists customers or partners ("trusted by", "our customers", "backed by"), not on every deck that says "customer" or "partner".
- `two-column` keeps line breaks in `body`, so three findings stay on three lines.
- Uniform `feature-grid` cards take their content height and centre under the heading instead of stretching into tall, empty boxes.
