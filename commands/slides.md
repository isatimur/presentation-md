---
description: Turn notes into a one-shot craft deck (preview themes → Deck JSON → audit → HTML/PPTX)
argument-hint: [brief or notes…]
---

You are running **presentation-md** — schema-crafted decks that beat prompt-only slide packs.

User brief / notes:
$ARGUMENTS

## Mandatory flow (one-shot bar)

1. **Discover themes visually** — call MCP `list_themes` (shortlists / mood) then `preview_themes` with 2–3 candidates. Pick-3 auto-defaults to multi-slide `layouts` craft bake — do not ask the user to pick from bare names.
2. **Lock theme + density** (speaker-led vs reading-first) once.
3. Prefer `generate_deck_prompt` then emit Deck JSON that already clears anti-slop + craft gates — no vibe draft.
4. Lead with title → feature-grid/bento or comparison early; match stunning-25 craft when the brief fits.
5. Prefer schema layouts. At most **one** intentional `custom-html` art beat from `custom-html-recipes` (split / big-number / stamps / type explosion) — never stickers for theme atmosphere.
6. Call `audit_deck` and fix issues before showing the user. Escalate with `judge_deck` (t1→t2) when stakes are high.
7. `render_deck` to HTML and offer `export_deck` PPTX (native editable shapes).

If MCP tools are unavailable, author valid Deck JSON against the presentation-generator skill schema and tell the user to run `npx @presentation-md/install claude-code` (or enable this plugin's MCP) for the full toolchain.
