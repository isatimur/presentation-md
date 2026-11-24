---
"@presentation-md/render": patch
---

`presentation-md-render --audit` now validates the deck against the schema before the craft gates, like MCP `audit_deck`. Schema errors print as `error (schema): …`, count in the summary line, and exit 1. Before, a deck with `comparison.left` as an array passed `--audit` and only failed later in `--judge`.
