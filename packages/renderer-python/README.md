# presentation-md-render

Python CLI wrapper for [@presentation-md/render](https://www.npmjs.com/package/@presentation-md/render).

Renders a deck JSON spec into a self-contained HTML slide deck via the Node.js renderer.

## Install

```bash
pip install presentation-md-render
```

## Usage

```bash
pmd-render deck.json -o deck.html --theme corporate
pmd-render deck.json --theme retro-arcade > deck.html
```

## Requirements

Node.js ≥ 18 and `npx` must be available on `PATH`.

## Part of presentation-md

- npm: `@presentation-md/render` (v1.0.0)
- PyPI: `presentation-md-render` (v1.0.0) + `presentation-md-theme-*` packages
- MCP server: `@presentation-md/mcp-server`
- Adapter installer: `npx @presentation-md/install`
