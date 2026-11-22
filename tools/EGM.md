# tools

## Overview
Monorepo maintenance tools. Some are build steps for packages, some are root
`pnpm` scripts, and some generate gallery HTML from Deck JSON.

## Interface
- `pnpm sync:skill` -> `sync-skill.ts`: copies `SKILL.md`, `deck.schema.json`, `theme.schema.json`, `references/`, and `scripts/` from `packages/core` to `skills/presentation-generator`. [sync-skill.ts:ROOT_FILES], [sync-skill.ts:syncDir]
- `pnpm sync-versions` -> `sync-versions.ts`: copies the version in `packages/core/package.json` to every other `package.json` and `pyproject.toml` under `packages/`. [sync-versions.ts:targetVersion], [sync-versions.ts:syncPyprojectVersion]
- `pnpm generate:previews` -> `generate-web-previews.ts`: renders a 3-slide preview deck per theme. [generate-web-previews.ts:previewDeck], [generate-web-previews.ts:PACKAGED_THEMES]
- `pnpm generate:structured` -> `generate-gallery-structured.ts`: renders every `examples/decks/*.json`. [generate-gallery-structured.ts:main]
- `tsx tools/regen-structured-subset.ts <slug>...`: renders only the named decks. [regen-structured-subset.ts:decks]
- `sync-core-shared.mjs`: copies `packages/shared/theme-surfaces.json` to `packages/core/shared/`. Called by the `build` script in `packages/core/package.json`. [sync-core-shared.mjs:dest]
- `sync-render-shared.mjs`: mirrors `packages/shared` to `packages/renderer-node/shared`. Called by the `build` script in `packages/renderer-node/package.json`. [sync-render-shared.mjs:dest]
- `python3 tools/upgrade-image-heroes.py`: adds or refreshes `image-hero` slides with generated SVG data URIs. [upgrade-image-heroes.py:upgrade_deck], [upgrade-image-heroes.py:ADD_HERO]

## Invariants
- `packages/core` is the source of truth for the skill copy and for versions. [sync-skill.ts:core], [sync-versions.ts:corePkgPath]
- `sync-skill.ts` skips `node_modules` and `package-lock.json`. It throws when a source path is missing. [sync-skill.ts:syncDir], [sync-skill.ts:assertExists]
- `sync-versions.ts` searches at most 2 folder levels below `packages/`. [sync-versions.ts:collectPaths]
- The `generate-*` and `regen-*` tools import `packages/renderer-node/dist`, so `pnpm build` must run first. [generate-gallery-structured.ts:renderDeck]
- Themes `claude` and `default-tech` load from `packages/core/themes`. All others load from `packages/themes`. [generate-gallery-structured.ts:CORE_THEMES], [generate-web-previews.ts:CORE_THEMES]
- Renaming or moving `sync-core-shared.mjs` or `sync-render-shared.mjs` breaks the package builds that call them by path. [packages/core/package.json:build], [packages/renderer-node/package.json:build]
- `upgrade-image-heroes.py` uses only generated SVG (no external images). It adds a new hero only for decks in `ADD_HERO` that have a `title` slide. [upgrade-image-heroes.py:hero_svg], [upgrade-image-heroes.py:upgrade_deck]

## Side Effects
- `sync-skill.ts` overwrites files in `skills/presentation-generator/`. It deletes and recopies each subfolder. [sync-skill.ts:rmSync]
- `sync-versions.ts` rewrites `package.json` and `pyproject.toml` files under `packages/`. [sync-versions.ts:writeJson]
- `sync-render-shared.mjs` deletes `packages/renderer-node/shared` before copying. [sync-render-shared.mjs:rmSync]
- `generate-web-previews.ts` writes `web/previews/<theme>.html`. The two gallery tools write `web/examples/structured/<slug>.html`. [generate-web-previews.ts:outDir], [generate-gallery-structured.ts:outDir]
- `upgrade-image-heroes.py` rewrites `examples/decks/*.json` in place. [upgrade-image-heroes.py:upgrade_deck]

## Verification
- Run: `pnpm test` (`packages/core/tests/skill-sync.test.ts` checks the `sync-skill.ts` output)
