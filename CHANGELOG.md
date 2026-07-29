# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

This is a monorepo; packages are versioned independently. Versions below reflect
the latest published release of each package on its registry.

## [Unreleased]

### Planned

- `@presentation-md/studio` — publish as an npm package (currently hosted at [presentation-md.vercel.app/studio](https://presentation-md.vercel.app/studio)).
- PyPI theme packages: `presentation-md-theme-retro-arcade`, `editorial-serif`, `brutalist-mono`, `pastel-dreamy` (blocked by PyPI new-project rate limit as of 2026-07-29).

## [1.0.0] — 2026-07-29

First stable release under the **presentation-md** identity (`@presentation-md/*` on npm, `presentation-md-*` on PyPI).

### Highlights

- Rename from `presentation-skill-pack` → `presentation-md` (breaking scope/CLI/PyPI names).
- PPTX **export** (Deck JSON → editable `.pptx`) and **import** (`.pptx` → Deck JSON).
- Three new themes: `editorial-serif`, `brutalist-mono`, `pastel-dreamy`.
- Skill craft upgrade: nine real layouts, theme selection index, honest MCP tool table.
- Browser **Studio** at [presentation-md.vercel.app/studio](https://presentation-md.vercel.app/studio).

### npm — `@presentation-md/*`

| Package | Version | Notes |
|---|---|---|
| `core` | 1.0.1 | Schemas, theme loader, validator, bundled themes |
| `render` | 1.0.0 | HTML renderer CLI + PPTX export/import flags |
| `export` | 1.0.0 | Standalone PPTX round-trip library |
| `mcp-server` | 1.0.0 | Eight MCP tools (render, export, audit, themes, import) |
| `install` | 1.0.0 | One-command agent installer |
| `create-theme` | 1.0.0 | Theme scaffold CLI |
| `theme-corporate` | 1.0.0 | |
| `theme-playful` | 1.0.0 | |
| `theme-luxury-minimalist` | 1.0.0 | |
| `theme-retro-arcade` | 1.0.0 | |
| `theme-editorial-serif` | 1.0.0 | |
| `theme-brutalist-mono` | 1.0.0 | |
| `theme-pastel-dreamy` | 1.0.0 | |

Install: `npx @presentation-md/install claude-code` · Registry: [npm @presentation-md](https://www.npmjs.com/search?q=%40presentation-md)

### PyPI — `presentation-md-*`

| Package | Version | Status |
|---|---|---|
| `presentation-md-render` | 1.0.0 | Live |
| `presentation-md-theme-corporate` | 1.0.0 | Live |
| `presentation-md-theme-playful` | 1.0.0 | Live |
| `presentation-md-theme-luxury-minimalist` | 1.0.0 | Live |
| `presentation-md-theme-retro-arcade` | 1.0.0 | Pending (429 rate limit) |
| `presentation-md-theme-editorial-serif` | 1.0.0 | Pending |
| `presentation-md-theme-brutalist-mono` | 1.0.0 | Pending |
| `presentation-md-theme-pastel-dreamy` | 1.0.0 | Pending |

[1.0.0]: https://github.com/isatimur/presentation-md/releases/tag/%40presentation-md%2Fcore%401.0.0
