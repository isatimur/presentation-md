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
  DiscoveryOptions,
} from "./theme-types.js";
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
export { deckToMarkdown } from "./deck-to-md.js";
export type { DeckToMarkdownOptions } from "./deck-to-md.js";
export { notesHandoutTxt, notesHandoutVtt, formatVttTime } from "./notes-handout.js";
export type { NotesHandoutDeck, NotesHandoutSlide } from "./notes-handout.js";
export { auditCraft, repairCraft, repairCraftBeat, CRAFT_VALID_LAYOUTS } from "./craft-audit.js";
export type {
  CraftIssue,
  CraftAuditDeck,
  CraftRepairResult,
  CraftFixId,
} from "./craft-audit.js";
export { remorphDensity } from "./remorph-density.js";
export type {
  DensityMode,
  RemorphDeck,
  RemorphDensityResult,
} from "./remorph-density.js";
export { buildGenerateDeckPrompt } from "./generate-deck-prompt.js";
export type {
  BuildGenerateDeckPromptOptions,
  GenerateDeckPromptResult,
} from "./generate-deck-prompt.js";
export { judgeDeckJson } from "./judge-deck-json.js";
export type { JudgeFlag, JudgeDeckJsonResult } from "./judge-deck-json.js";
export {
  scaffoldDeck,
  listScaffoldPurposes,
  resolveScaffoldPurpose,
  SCAFFOLD_PURPOSE_IDS,
  SCAFFOLD_RECIPES,
} from "./scaffold-deck.js";
export type {
  ScaffoldPurpose,
  ScaffoldDeckOptions,
  ScaffoldDeckResult,
  ScaffoldRecipe,
} from "./scaffold-deck.js";
export { candyMarqueeText, candyMarqueeBrand } from "./candy-marquee.js";
export type { CandyMarqueeMeta } from "./candy-marquee.js";
export {
  getCorePackageRoot,
  getReferencesDir,
  loadThemeShortlists,
  loadThemeSelectionIndex,
  loadLayoutRecipesMarkdown,
  findShortlist,
  sortShortlistsForDiscovery,
  shortlistCoveredThemes,
  resolveThemeAlias,
  themeMatchesMood,
  themeMatchesQuery,
  THEME_BROWSE_FILTERS,
  THEME_BROWSE_POPULAR,
  isThemeBrowsePopular,
  themeMatchesBrowseFilter,
  isThemeBrowseFilterId,
  pickDiscoveryPreviewTrio,
  parseLayoutRecipeHeadings,
  themeDiscoveryLinks,
  themeStudioUrl,
  PRESENTATION_MD_SITE,
  STUNNING_25_STUDIO_EXAMPLES,
} from "./theme-discovery.js";
export type {
  ThemeShortlist,
  ThemeShortlistsDoc,
  ThemeSelectionEntry,
  ThemeSelectionIndex,
  ThemeBrowseFilterId,
  ThemeBrowseMeta,
  DiscoveryPreviewCandidate,
  DiscoveryPreviewTrio,
} from "./theme-discovery.js";
export { relativeLuminance, contrastRatio, hexToRgb, rgbToHex } from "./color.js";
export {
  MAX_SHARE_TOKEN_CHARS,
  MAX_SHARE_JSON_BYTES,
  SHARE_PREFIX,
  DEFAULT_STUDIO_ORIGIN,
  encodeShareDeck,
  decodeShareDeck,
  studioShareLink,
  readShareTokenFromLocation,
  isShareDeck,
} from "./share-deck.js";
export type { ShareDeckLike, StudioShareLinkOptions } from "./share-deck.js";
