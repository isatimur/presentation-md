---
"@presentation-md/export": minor
"@presentation-md/render": minor
"@presentation-md/mcp-server": minor
---

Office-safe font mode for PPTX. `fontMode: "office-safe"` (export and render APIs), `font_mode` (MCP `export_deck`) and `--font-mode office-safe` (CLI) swap theme fonts for Office fonts of the same style, so the deck looks the same on every Office install. The first Office font in the theme's own stack wins (for example Impact or Courier New); otherwise serif → Georgia, monospace → Consolas, anything else → Arial. The fidelity report lists each swap. The default, `"theme"`, is unchanged.
