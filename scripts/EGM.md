# scripts

## Overview
One-off maintainer scripts for the repo's marketing surface. Two scripts
capture gallery screenshots with Playwright. One sets GitHub repo metadata.
None of them is part of a package build or of `pnpm test`.

## Interface
- `node scripts/capture-hero-stunning25.mjs`: captures 2x title-slide PNGs for the decks in `DECKS`. [capture-hero-stunning25.mjs:DECKS], [capture-hero-stunning25.mjs:main]
- `[ONLY=slug,slug] node scripts/capture-multishot-stunning25.mjs`: captures Bento and Compare shots, reuses hero PNGs for Title. [capture-multishot-stunning25.mjs:only], [capture-multishot-stunning25.mjs:main]
- `bash scripts/setup-github.sh`: one-time repo description, homepage, and topics. [setup-github.sh:gh repo edit]

## Invariants
- Both capture scripts serve `web/` from a local HTTP server on `127.0.0.1` with a random port. Paths outside `web/` return 404. [capture-hero-stunning25.mjs:startServer], [capture-multishot-stunning25.mjs:startServer]
- `capture-hero-stunning25.mjs` loads Playwright from one fixed path: `~/.nvm/versions/node/v22.22.0/lib/node_modules/@playwright/cli/node_modules/playwright`. [capture-hero-stunning25.mjs:playwrightPath]
- `capture-multishot-stunning25.mjs` tries `packages/core/scripts/node_modules/playwright` first, then the same nvm path. It throws when neither loads. [capture-multishot-stunning25.mjs:loadPlaywright]
- `capture-multishot-stunning25.mjs` throws when `ONLY` matches no deck. [capture-multishot-stunning25.mjs:main]
- `setup-github.sh` needs `gh auth login` with repo scope. [setup-github.sh:gh auth login]

## Side Effects
- `capture-hero-stunning25.mjs` writes `web/previews/hero/*.png` and `output/hero/capture-manifest-2x.json`. [capture-hero-stunning25.mjs:outDir], [capture-hero-stunning25.mjs:manifest]
- `capture-multishot-stunning25.mjs` writes `web/previews/wall/*` and `output/hero/multishot-manifest.json`. [capture-multishot-stunning25.mjs:outDir], [capture-multishot-stunning25.mjs:manifest]
- `setup-github.sh` edits the remote GitHub repo `isatimur/presentation-md` through `gh repo edit`. [setup-github.sh:gh repo edit]

## Verification
- None. No tests cover these scripts. Root `pnpm test` does not run them.
