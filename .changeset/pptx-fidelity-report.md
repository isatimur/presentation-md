---
"@presentation-md/export": minor
"@presentation-md/render": minor
"@presentation-md/mcp-server": minor
---

PPTX fidelity report and working SVG images.

- `buildPptx` returns `fidelity` and calls `onFidelity`: each export warning with a kind (image, approximated, skipped, fallback) and slide number, plus theme fonts that PowerPoint or Google Slides will substitute. `warnings` is unchanged.
- MCP `export_deck` returns `fidelity` for PPTX, so the agent can fix slides before a person opens the file.
- Fix: URL-encoded SVG data URIs (`data:image/svg+xml,%3Csvg…`, used by 75 of 77 example decks) were silently dropped by pptxgenjs. They are now base64-encoded before embed.
- `renderDeckPptx` (CLI, MCP) embeds PNG copies of SVG images via the optional `@resvg/resvg-js`, so Google Slides, Keynote and older PowerPoint no longer show a broken-image icon. Without resvg the SVG is embedded and the fidelity report says which viewers show a placeholder.
