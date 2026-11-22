/**
 * Find a Playwright install for the gallery capture scripts.
 *
 * Order: PLAYWRIGHT_PATH, a normal `playwright` resolve, the copy that
 * packages/core/scripts installs for PDF export, then the global
 * @playwright/cli install of the Node running this script.
 */
import { createRequire } from 'node:module';
import path from 'node:path';

export function loadPlaywright(root) {
  const require = createRequire(import.meta.url);
  // <prefix>/bin/node → <prefix>/lib/node_modules (nvm, Homebrew, system installs).
  const globalModules = path.join(path.dirname(path.dirname(process.execPath)), 'lib', 'node_modules');
  const candidates = [
    process.env.PLAYWRIGHT_PATH,
    'playwright',
    path.join(root, 'packages/core/scripts/node_modules/playwright'),
    path.join(globalModules, 'playwright'),
    path.join(globalModules, '@playwright/cli/node_modules/playwright'),
  ].filter(Boolean);
  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch {
      /* try next */
    }
  }
  throw new Error(
    `playwright not found (tried: ${candidates.join(', ')}). ` +
      'Run `npm install` in packages/core/scripts, or set PLAYWRIGHT_PATH.'
  );
}
