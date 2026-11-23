---
"@presentation-md/core": minor
"@presentation-md/mcp-server": minor
---

Slide-level reading and editing for agents.

- MCP `outline_deck`: per-slide layout, title, word count, notes flag and craft-audit issues, plus full JSON of chosen slides (`include`).
- MCP `edit_deck`: a batch of `update_slide` / `replace_slide` / `insert_slide` / `delete_slide` / `move_slide` / `update_meta` operations. Validates the result against the deck schema and saves nothing on failure. With `deck_path` it edits the file in place (atomic write, cwd only), so the agent never resends the whole deck. Returns the touched slides and their audit issues.
- Core: `deckOutline`, `applyDeckEdits`, `DeckEditError`.
