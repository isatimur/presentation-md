/**
 * Resolve themes directory for MCP render/judge.
 * Prefers monorepo packages/themes (73 `@presentation-md/theme-*` packages) when
 * developing from the repo, with core-bundled `claude` / `default-tech` as fallback
 * (75 themes total). Published npm installs use core-bundled themes only unless
 * extra theme packages are installed.
 */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { getBundledThemesDir } from "@presentation-md/render";

export function resolveThemesDir(): { themesDir: string; fallbackThemesDirs?: string[] } {
  const bundled = getBundledThemesDir();
  // packages/mcp-server/dist/lib → ../../../../packages/themes
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const monorepoThemes = join(here, "..", "..", "..", "..", "packages", "themes");
    if (existsSync(join(monorepoThemes, "kinetic-wrapped", "theme.json"))) {
      return { themesDir: monorepoThemes, fallbackThemesDirs: [bundled] };
    }
  } catch {
    /* ignore */
  }
  // cwd walk for agents invoking from repo root
  const cwdThemes = join(process.cwd(), "packages", "themes");
  if (existsSync(join(cwdThemes, "kinetic-wrapped", "theme.json"))) {
    return { themesDir: cwdThemes, fallbackThemesDirs: [bundled] };
  }
  return { themesDir: bundled };
}
