export { validateDeck, validateDeckJson } from "./validate-deck.js";
export { validateThemeJson } from "./validate-theme.js";
export type { ValidationResult } from "./validate-deck.js";
export { loadTheme, discoverInstalledThemes } from "./theme-loader.js";
export { surfaceForTheme, THEME_SURFACE } from "./theme-surface.js";
export type {
  ThemeManifest,
  Palette,
  Typography,
  Geometry,
  ResolvedTheme,
  LoadOptions,
  DiscoveredTheme,
  DiscoveryOptions
} from "./theme-loader.js";
export {
  parseCssVariables,
  parseFontDeclarations,
  mapPaletteToRoles,
  ensureContrastSafe,
} from "./brand-extract.js";
export type {
  BrandColorCandidates,
  BrandFontCandidates,
  ContrastAdjustment,
  ContrastSafeResult,
} from "./brand-extract.js";
