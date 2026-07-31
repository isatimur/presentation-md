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
export { renderChartSvg } from "./chart-svg.js";
export type { ChartType, ChartSeries, ChartSpec, ChartColors } from "./chart-svg.js";
export { sanitizeCustomHtml } from "./sanitize-html.js";
export { markdownToDeck } from "./md-to-deck.js";
export type { MdDeck, MdSlide, MdToDeckOptions } from "./md-to-deck.js";
export { auditCraft, CRAFT_VALID_LAYOUTS } from "./craft-audit.js";
export type { CraftIssue, CraftAuditDeck } from "./craft-audit.js";
