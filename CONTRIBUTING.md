# Contributing to presentation-md

## Setup

```bash
git clone https://github.com/isatimur/presentation-md.git
cd presentation-md
pnpm install
```

Requires Node.js 22+ and pnpm 8. If you don't have pnpm: `npm i -g pnpm@8`.

## Build

```bash
pnpm build        # build all packages
pnpm typecheck    # TypeScript type-check across the whole monorepo
pnpm lint         # ESLint across all packages
pnpm test         # run all test suites (vitest)
```

To work on a single package, `cd` into it and run the same commands — each package has its own `build`, `test`, `lint`, and `typecheck` scripts.

## Adding a theme

Use the scaffold CLI:

```bash
pnpm --filter @presentation-md/create-theme exec create-presentation-md-theme my-theme-name
```

This generates `packages/themes/my-theme-name/` with a starter `theme.json` and `package.json`. Edit `theme.json` to set your palette, typography, and layout overrides, then validate it:

```bash
pnpm --filter @presentation-md/core exec validate-theme packages/themes/my-theme-name/theme.json
```

Themes must pass schema validation before they can be published.

## Changesets

This monorepo uses [Changesets](https://github.com/changesets/changesets) for versioning and changelog generation.

When your PR includes a user-facing change:

```bash
pnpm changeset
```

Select the affected packages, choose the bump level (`patch` / `minor` / `major`), and write a one-line summary. Commit the generated `.changeset/*.md` file alongside your code changes.

PRs that touch only internal tooling, tests, or docs do not need a changeset.

## Syncing versions

After a changeset is consumed and all packages are bumped, you can keep every package in lockstep with core:

```bash
pnpm sync-versions
```

This reads the version from `packages/core/package.json` and writes it to every other `package.json` in the monorepo.

## PR conventions

- Branch names: `feat/<slug>`, `fix/<slug>`, `chore/<slug>`
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- All tests and typechecks must pass locally before opening a PR
- Include a changeset if the change affects published packages

## Repository structure

```
packages/core/          schema, theme loader, validator
packages/renderer-node/ Node.js HTML renderer + CLI (incl. PPTX flags)
packages/export/        PPTX round-trip library (Deck JSON ↔ .pptx)
packages/mcp-server/    MCP server (8 tools)
packages/install/       one-command installer CLI
packages/create-theme/  theme scaffold CLI
packages/studio/        browser editor SPA (build → web/studio/)
packages/renderer-python/ Python renderer (PyPI)
packages/themes/*/      publishable theme packages
adapters/               per-agent install scripts
web/                    landing page + studio static build (Vercel)
tools/                  monorepo scripts (sync-versions)
```

## Publishing

- **npm:** tags `@presentation-md/<package>@<version>` trigger `.github/workflows/publish-npm.yml`, or run `pnpm release` locally with a valid `NPM_TOKEN`.
- **PyPI:** tags `presentation-md-render@<version>` or `presentation-md-theme-<name>@<version>` trigger `.github/workflows/publish-pypi.yml`.
- After consuming changesets, run `pnpm sync-versions` to keep all `package.json` and `pyproject.toml` files aligned with `packages/core`.

### Changesets version PRs (GitHub Actions)

The publish workflow uses `changesets/action`, which needs permission to **open** the
version PR on `main`. Enable this once per repo:

1. GitHub → **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, choose **Read and write permissions**
3. Check **Allow GitHub Actions to create and approve pull requests**
4. Save

API equivalent (admins):

```bash
gh api -X PUT repos/OWNER/REPO/actions/permissions/workflow \
  -f default_workflow_permissions=write \
  -F can_approve_pull_request_reviews=true
```

If Actions still cannot open the PR, create it manually after the workflow pushes
the `changeset-release/main` branch:

```bash
gh pr create --base main --head changeset-release/main \
  --title "chore: version packages" \
  --body "Automated version bump from changesets."
```

CI intentionally ignores version-only path changes (`.changeset/**`, `**/CHANGELOG.md`,
`**/package.json`, `**/pyproject.toml`) on `pull_request`. Those bumps already passed CI
on `main`; skipping avoids empty `action_required` runs from `github-actions[bot]` PRs.

## Deploying the marketing site (Vercel)

The gallery/landing site under `web/` deploys via `.github/workflows/deploy-web.yml`
(and `workflow_dispatch`).

**Hobby / free-tier rate limits:** Vercel’s free plan caps concurrent builds and
deployments. If CI or local `vercel deploy` returns **429** / “rate limit”, do
**not** thrash retries or re-push docs-only commits to force another deploy —
wait for the window to reset (often ~1 hour) or upgrade the project. Prefer
`workflow_dispatch` once, not a burst of path-filtered pushes. Preview deploys
count against the same budget; skip them when blocked.

Site URLs stay valid even when a deploy is deferred; only content updates wait.
