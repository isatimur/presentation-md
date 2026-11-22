# skills/presentation-generator

## Overview
The repo copy of the `presentation-generator` skill. The skill instructions
live in [SKILL.md](./SKILL.md). `deck.schema.json` and `theme.schema.json`
define Deck JSON and theme files. `references/` holds layout, theme, and
import guides. This folder mirrors `packages/core`: edit core, then run
`pnpm sync:skill` ([tools/sync-skill.ts:ROOT_FILES]). The test
`packages/core/tests/skill-sync.test.ts` fails when `SKILL.md`, the two
schemas, `references/`, or the shipped scripts drift from core.

## Subdirectories & Boundaries
- scripts: [EGM.md](./scripts/EGM.md) - PDF export (`export-pdf.sh`, `export-pdf.mjs`, `pdf-security.mjs` route guard) and Vercel deploy (`deploy.sh`, `check-local-assets.mjs`).
