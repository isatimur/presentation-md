import { surfaceForTheme } from "@presentation-md/core/theme-surface";

/**
 * Surfaces whose HTML slide is a flat field: `.deck[data-surface="…"] .slide`
 * sets `--slide-bg: var(--bg)` in packages/shared/surfaces.css. The PPTX
 * bg→bg2 wash stands in for a gradient, so these surfaces skip it.
 * test/flat-surfaces.test.ts keeps this list equal to the CSS.
 */
export const FLAT_FIELD_SURFACES: ReadonlySet<string> = new Set([
  "acid-block",
  "bauhaus-blocks",
  "block-frame-brutal",
  "blueprint-grid",
  "bold-poster-ink",
  "broadsheet-rule",
  "broadside-fire",
  "brutalist-grid",
  "creative-mode-blocks",
  "data-rule",
  "dev-terminal",
  "editorial-forest-paper",
  "editorial-rule",
  "electric-studio-split",
  "emerald-editorial-masthead",
  "grove-monograph",
  "hard-bento",
  "monochrome-ledger",
  "neo-grid-panels",
  "newsprint-masthead",
  "notebook-tabs-page",
  "paper-ink-literary",
  "quiet-luxe",
  "riso-print",
  "split-pastel-panels",
  "stencil-tablet-earth",
  "studio-acid",
  "swiss-grid",
  "vintage-editorial-geo",
  "wrapped-block",
]);

/** True when the theme's HTML slide has a flat background (no gradient to approximate). */
export function hasFlatField(themeName: string): boolean {
  return FLAT_FIELD_SURFACES.has(surfaceForTheme(themeName));
}
