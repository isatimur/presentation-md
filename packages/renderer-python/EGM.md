# presentation-md-render (Python)

## Overview

Python binding of the presentation-md renderer. Needs Python 3.11 or later and `chevron`. The `presentation-md-render` script maps to `presentation_md_render.cli:main`. In the monorepo it reads templates from `packages/shared` and themes from `packages/core/themes`. The wheel carries copies in `templates/` and `themes/`, made before `uv build` by `tools/sync-python-shared.mjs` (gitignored, listed as hatch `artifacts`). Usage notes live in [./README.md](./README.md).

## Subdirectories & Boundaries

- src: [./src/EGM.md](./src/EGM.md) - package source root.
- src/presentation_md_render: [./src/presentation_md_render/EGM.md](./src/presentation_md_render/EGM.md) - deck JSON to HTML, theme `extends` chains, and the CLI.

## Verification

- Run: `uv run --python 3.11 --with pytest pytest -q` (from this directory)
