# @presentation-md/core

## Overview

`@presentation-md/core` is the shared library and agent skill of presentation-md. It holds the Deck JSON and theme JSON schemas, the theme loader, craft audit and repair, Markdown conversion, share links, and the `presentation-generator` skill (`SKILL.md`). The TypeScript code lives in `src/`. Shell and Node helpers for PDF export and Vercel deploy live in `scripts/`. The package root itself holds manifests, schemas, and docs, but no source files.

## Subdirectories & Boundaries

- src: [./src/EGM.md](./src/EGM.md) - Library code. Validates decks and themes, loads and discovers themes, audits and repairs craft, scaffolds decks, converts Markdown, renders charts, sanitizes custom HTML, and encodes share links. Only the theme, reference, and prompt modules read files.
- scripts: [./scripts/EGM.md](./scripts/EGM.md) - `export-pdf.sh` and `deploy.sh` with their guards (`check-local-assets.mjs`, `pdf-security.mjs`). These scripts launch Chromium, install Playwright, and deploy to Vercel.
- Skill: [./SKILL.md](./SKILL.md) - The agent skill. The package exports it as `./skill`.
- Non-code directories (not documented here): `tests/` (Vitest suites), `references/` (Markdown and JSON reference data), `themes/` (bundled `default-tech` and `claude` themes), and `shared/` (build copy of `theme-surfaces.json`).

## Package Interface

- `package.json` `main` and `types` point to `dist/index.js` and `dist/index.d.ts`, which `tsc` builds from `src/index.ts`.
- `package.json` `exports`: `.`, `./theme-types`, `./chart-svg`, `./sanitize-html`, `./candy-marquee`, `./craft-audit`, `./validate-deck`, `./theme-surface`, `./theme-loader`, `./theme-browse`, `./skill` (`SKILL.md`), `./deck-schema` (`deck.schema.json`), `./theme-schema` (`theme.schema.json`), `./themes/default-tech`, and `./themes/claude`.
- `package.json` `bin`: `validate-theme` runs `dist/validate-theme-cli.js`.
- `package.json` `files` publishes `dist`, `shared`, `SKILL.md`, `references`, `scripts`, both schemas, and the two bundled themes.

## Invariants

- `src/validate-deck.ts` and `src/validate-theme.ts` import `deck.schema.json` and `theme.schema.json` from the package root. Keep the schemas at the root.
- `src/theme-discovery.ts:getCorePackageRoot` expects compiled files one level below the package root. `SKILL.md`, `references/`, and `themes/` must stay at the root.
- `src/theme-surface.ts` imports `shared/theme-surfaces.json`. The source of truth is `packages/shared/theme-surfaces.json`. Edit that file, not the copy in `shared/`.

## Side Effects

- Build side effect: `pnpm build` runs `tools/sync-core-shared.mjs` before `tsc`. The tool copies `packages/shared/theme-surfaces.json` to `packages/core/shared/theme-surfaces.json`, so the published package resolves its theme-surface import.
- `src/` reads theme manifests and reference files at run time. `scripts/` launches Chromium, installs Playwright, makes DNS lookups, and deploys to Vercel. See the child contracts for details.

## Verification

- Run: `pnpm --filter @presentation-md/core test`
