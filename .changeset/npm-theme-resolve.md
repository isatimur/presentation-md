---
"@presentation-md/core": minor
"@presentation-md/render": patch
---

Themes installed with `npm i @presentation-md/theme-<name>` now render. The renderer (CLI, `renderDeck`, `renderDeckPptx`, and the MCP tools that call them) looked only in core's two bundled themes and failed with `Theme not found`, although `--list-themes` listed the installed theme.

- `loadTheme` also looks for `<dir>/theme-<name>/theme.json`, the npm package folder name.
- New `npmThemeDirs(projectRoot)` in core returns the `node_modules/@presentation-md` and `@presentation-skill-pack` scope folders.
- The renderer searches those folders in the current project after `themesDir` and the bundled themes.
