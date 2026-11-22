# presentation-md Blueprint

Contract index for AI agents and maintainers. The public project description
stays in [README.md](./README.md).

## System Overview

presentation-md turns notes into slide decks. The unit of exchange is Deck
JSON (`packages/core/deck.schema.json`): a `meta` block with a theme name and a
list of slides, each with one of the fixed layout names. Themes are
`theme.json` manifests (`packages/core/theme.schema.json`) with colour roles,
fonts, and geometry.

The data flow:

1. An agent reads the skill (`skills/presentation-generator/SKILL.md`, copied
   from `packages/core`) or calls the MCP server (`packages/mcp-server`).
2. `packages/core` validates the deck, loads the theme, audits and repairs
   craft, and builds share links.
3. `packages/renderer-node` renders HTML. `packages/export` builds PPTX.
   PDF goes through headless Chromium (`packages/core/scripts/export-pdf.*`).
4. `skills/deck-design-judge` scores the result. Studio
   (`packages/studio`) lets a person edit, present, and export in the browser.
5. `packages/install` and `adapters/` install the skill and register the MCP
   server in Claude Code, Codex, Cursor, Copilot, Gemini CLI, or plain CLI.

## Local Interface & Invariants

- [eslint.config.js] flat config: `typescript-eslint` recommended rules;
  `@typescript-eslint/no-explicit-any` is a warning;
  `@typescript-eslint/no-unused-vars` is an error except names starting
  with `_`; ignores `**/dist/**`, `**/node_modules/**`, `**/*.config.js`.
- [package.json:engines] Node `>=22.0.0`; [package.json:packageManager]
  `pnpm@8.9.2`.
- [package.json:scripts] `build`, `test`, `lint`, `typecheck` run in every
  workspace package (`pnpm -r`); `release` runs `pnpm build && changeset
  publish`; `sync:skill`, `sync-versions`, `generate:previews`,
  `generate:structured` run `tools/`.

## Subdirectories & System Boundaries

- packages: [./packages/EGM.md](./packages/EGM.md) - the workspace
  packages: core, renderers, exporter, MCP server, theme scaffolder,
  installer, Studio, shared templates, 73 themes.
- adapters: [./adapters/EGM.md](./adapters/EGM.md) - per-host
  `install.sh` / `install.ps1` scripts (`full` or `lite`). Full mode
  registers the `presentation-md` MCP server and removes the legacy
  `presentation-skill-pack` key.
- skills: [./skills/EGM.md](./skills/EGM.md) - `presentation-generator`
  (mirror of `packages/core`) and `deck-design-judge` (Python scoring
  pipeline).
- scripts: [./scripts/EGM.md](./scripts/EGM.md) - one-off maintainer
  scripts: gallery captures and GitHub repo metadata.
- tools: [./tools/EGM.md](./tools/EGM.md) - monorepo maintenance: skill and
  version sync, shared-asset mirrors, gallery and preview generators.
- web (no code contract): the static site deployed to Vercel. `web/studio`
  is Vite build output from `packages/studio` (`build:web`); do not edit it
  by hand.
- examples, docs, competitor-profiles (no code contract): example decks,
  docs, and research notes.

## Global Invariants

- `packages/core` is the source of truth for the skill. Edit it, then run
  `pnpm sync:skill`; `packages/core/tests/skill-sync.test.ts` fails on drift
  [tools/sync-skill.ts:ROOT_FILES].
- `packages/shared` is the source of truth for templates and
  `theme-surfaces.json`. Package builds copy them in
  [tools/sync-core-shared.mjs], [tools/sync-render-shared.mjs]; do not edit
  the copies.
- Deck JSON must pass `validateDeckJson` before render or export; the
  exporter does not validate on its own
  [packages/export/src/deck-types.ts].
- Only the fixed layout names are valid
  [packages/core/src/craft-audit.ts:CRAFT_VALID_LAYOUTS].
- MCP tools write only inside the working directory
  [packages/mcp-server/src/lib/cwd-path.ts:assertWritablePathInCwd].
- Every fetch driven by user content refuses private and local addresses
  and re-checks each redirect: PDF export
  [packages/core/scripts/pdf-security.mjs:createPdfRouteGuard], PPTX image
  prefetch [packages/export/src/prefetch-images.ts:prefetchDeckImages],
  brand import [packages/create-theme/src/fetch-css.ts:assertPublicHostname],
  Studio PDF endpoint
  [packages/studio/src/server/pdfNetworkPolicy.ts:isAllowedPdfSubresourceUrl].
- Deploy is a dry run unless confirmed; production needs a second
  confirmation [packages/renderer-node/src/deploy.ts:deployDeck].

## Global Side Effects

- npm and PyPI publishing via changesets and `.github/workflows/publish-npm.yml`,
  `publish-pypi.yml`.
- Vercel deploys: decks via `deploy.sh`, the site via
  `.github/workflows/deploy-web.yml`.
- Headless Chromium launches for PDF, screenshots, and judge renders.
- LLM API calls: Studio deck generation (Anthropic, user key in
  `localStorage`) and the judge panel (Anthropic, OpenRouter, or an
  OpenAI-compatible URL).
- Writes to host config in the user's home (`~/.claude`, `~/.codex`,
  `~/.cursor`, `~/.gemini`) or project `.github` / `.vscode`, by
  `adapters/`.

## System Verification

- Run: `pnpm test`
