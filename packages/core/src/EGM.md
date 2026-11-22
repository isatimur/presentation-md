# @presentation-md/core source (`src`)

## Overview

This directory holds the TypeScript source of `@presentation-md/core`. `tsc` compiles it to `dist/`. The code validates Deck JSON and theme manifests, loads themes, audits and repairs deck craft, converts between Markdown and Deck JSON, and builds share links and agent prompts. Most modules are pure functions. A small set reads files from the package root or from theme directories.

## Interface

- Barrel: [index.ts] re-exports the public API. `package.json` `exports` also maps direct subpaths to `theme-types`, `chart-svg`, `sanitize-html`, `candy-marquee`, `craft-audit`, `validate-deck`, `theme-surface`, `theme-loader`, and `theme-browse`.
- Validation:
  - [validate-deck.ts:validateDeck], [validate-deck.ts:validateDeckJson], [validate-deck.ts:ValidationResult] check a deck against `deck.schema.json` with Ajv 2020.
  - [validate-theme.ts:validateThemeJson] checks a theme manifest against `theme.schema.json`.
  - [validate-theme-cli.ts] is the `validate-theme <theme.json>` bin.
- Themes:
  - [theme-types.ts:ThemeManifest], [theme-types.ts:Palette], [theme-types.ts:Typography], [theme-types.ts:Geometry], [theme-types.ts:ResolvedTheme], [theme-types.ts:LoadOptions], [theme-types.ts:DiscoveredTheme], [theme-types.ts:DiscoveryOptions].
  - [theme-loader.ts:loadTheme] resolves a theme and its `extends` chain over defaults.
  - [theme-loader.ts:discoverInstalledThemes] lists bundled and installed themes.
  - [theme-surface.ts:THEME_SURFACE], [theme-surface.ts:surfaceForTheme] map a theme name to a surface kind.
  - [theme-browse.ts:THEME_BROWSE_FILTERS], [theme-browse.ts:THEME_BROWSE_POPULAR], [theme-browse.ts:isThemeBrowsePopular], [theme-browse.ts:themeMatchesBrowseFilter], [theme-browse.ts:isThemeBrowseFilterId], [theme-browse.ts:pickDiscoveryPreviewTrio].
  - [theme-discovery.ts:getCorePackageRoot], [theme-discovery.ts:getReferencesDir], [theme-discovery.ts:loadThemeShortlists], [theme-discovery.ts:loadThemeSelectionIndex], [theme-discovery.ts:loadLayoutRecipesMarkdown], [theme-discovery.ts:findShortlist], [theme-discovery.ts:sortShortlistsForDiscovery], [theme-discovery.ts:shortlistCoveredThemes], [theme-discovery.ts:resolveThemeAlias], [theme-discovery.ts:themeMatchesMood], [theme-discovery.ts:themeMatchesQuery], [theme-discovery.ts:themeStudioUrl], [theme-discovery.ts:themeDiscoveryLinks], [theme-discovery.ts:parseLayoutRecipeHeadings], [theme-discovery.ts:PRESENTATION_MD_SITE], [theme-discovery.ts:STUNNING_25_STUDIO_EXAMPLES]. It also re-exports the `theme-browse` symbols.
  - [themes-discovery-list.ts:buildThemesDiscoveryList] builds the shared payload for MCP `list_themes` and the CLI `--list-themes`.
- Brand and color:
  - [brand-extract.ts:parseCssVariables], [brand-extract.ts:parseFontDeclarations], [brand-extract.ts:mapPaletteToRoles], [brand-extract.ts:ensureContrastSafe].
  - [color.ts:hexToRgb], [color.ts:rgbToHex], [color.ts:rgbToHsl], [color.ts:hslToRgb], [color.ts:relativeLuminance], [color.ts:contrastRatio], [color.ts:withLightness]. The barrel exports only `relativeLuminance`, `contrastRatio`, `hexToRgb`, and `rgbToHex`.
- Craft and structure:
  - [craft-audit.ts:auditCraft], [craft-audit.ts:repairCraft], [craft-audit.ts:repairCraftBeat], [craft-audit.ts:CRAFT_VALID_LAYOUTS], [craft-audit.ts:CraftIssue], [craft-audit.ts:CraftFixId], [craft-audit.ts:CraftAuditDeck], [craft-audit.ts:CraftRepairResult].
  - [scaffold-deck.ts:scaffoldDeck], [scaffold-deck.ts:listScaffoldPurposes], [scaffold-deck.ts:resolveScaffoldPurpose], [scaffold-deck.ts:SCAFFOLD_RECIPES], [scaffold-deck.ts:SCAFFOLD_PURPOSE_IDS].
  - [remorph-density.ts:remorphDensity] with [remorph-density.ts:DensityMode] (`"speaker"` or `"reading"`).
  - [judge-deck-json.ts:judgeDeckJson] runs T0/T1 structural judge gates.
- Conversion and rendering:
  - [md-to-deck.ts:markdownToDeck] and [deck-to-md.ts:deckToMarkdown].
  - [notes-handout.ts:notesHandoutTxt], [notes-handout.ts:notesHandoutVtt], [notes-handout.ts:formatVttTime].
  - [chart-svg.ts:renderChartSvg].
  - [sanitize-html.ts:sanitizeCustomHtml].
  - [candy-marquee.ts:candyMarqueeText], [candy-marquee.ts:candyMarqueeBrand].
- Prompt: [generate-deck-prompt.ts:buildGenerateDeckPrompt] gathers the skill, references, theme palette, and typography into one result.
- Share links: [share-deck.ts:encodeShareDeck], [share-deck.ts:decodeShareDeck], [share-deck.ts:studioShareLink], [share-deck.ts:readShareTokenFromLocation], [share-deck.ts:isShareDeck], [share-deck.ts:MAX_SHARE_TOKEN_CHARS], [share-deck.ts:MAX_SHARE_JSON_BYTES], [share-deck.ts:SHARE_PREFIX], [share-deck.ts:DEFAULT_STUDIO_ORIGIN].

## Invariants

- [theme-types.ts] must stay free of `node:fs`. Browser consumers (Studio) import these types without `theme-loader`.
- [theme-discovery.ts:getCorePackageRoot] resolves `..` from `import.meta.url`. The compiled file must sit one level below the package root, so `SKILL.md`, `references/`, and `themes/` resolve.
- [theme-loader.ts:loadTheme] guards the `extends` chain with a `seen` set, so a cycle stops. It merges `roles`, `typography`, and `geometry` from base to child over `DEFAULT_PALETTE`, `DEFAULT_TYPOGRAPHY`, and `DEFAULT_GEOMETRY`. It throws `Theme not found: <name>` when no search directory has `<name>/theme.json`.
- [theme-surface.ts:surfaceForTheme] returns `"gradient"` for an unknown theme.
- [validate-deck.ts:validateDeckJson] never throws on bad JSON. It returns `{ valid: false, errors: ["Invalid JSON: ..."] }`. Both validators compile the Ajv schema once and cache it.
- [craft-audit.ts:repairCraft] and [craft-audit.ts:repairCraftBeat] work on a deep copy from `cloneDeck`. They never mutate the input deck. `repairCraftBeat` with `safe_fields` falls back to `repairCraft`.
- [craft-audit.ts:auditCraft] is safe on partially invalid decks. Schema validation stays separate.
- [scaffold-deck.ts:scaffoldDeck] throws on an unknown purpose and on a recipe layout that is not in [craft-audit.ts:CRAFT_VALID_LAYOUTS]. It cuts the title to 120 characters.
- [share-deck.ts:decodeShareDeck] returns `null` on any bad token and never throws. [share-deck.ts:encodeShareDeck] throws when the deck is not a share deck, when the JSON exceeds `MAX_SHARE_JSON_BYTES` (2 MiB), or when the token exceeds `MAX_SHARE_TOKEN_CHARS` (28,000). Inflation stops at `MAX_SHARE_JSON_BYTES`. Tokens start with `SHARE_PREFIX` (`d1.`).
- [share-deck.ts:isShareDeck] requires `type === "deck"` and a non-empty `slides` array.
- [sanitize-html.ts:sanitizeCustomHtml] removes `<script>` blocks, `FORBIDDEN_TAGS`, `on*` handlers, and URL schemes outside `http`, `https`, `mailto`, and `tel`. It allows `data:image/` only in `src` and `xlink:href`.
- [md-to-deck.ts:markdownToDeck] falls back to theme `default-tech` and title `Untitled`.
- [generate-deck-prompt.ts:buildGenerateDeckPrompt] defaults theme to `default-tech` and density to `speaker`. `SKILL.md` and `references/deck-schema.md` are required. The other references fall back to an empty value.
- [color.ts:hexToRgb] throws `Invalid hex color` on bad input.
- [validate-theme-cli.ts] exits with 2 on missing arguments, 1 on an invalid manifest, and 0 on success.

## Side Effects

- [theme-loader.ts:loadTheme] reads `<dir>/<name>/theme.json` from `themesDir` and `fallbackThemesDirs`.
- [theme-loader.ts:discoverInstalledThemes] reads `bundledThemesDir` and `node_modules/@presentation-md` and `node_modules/@presentation-skill-pack` under `nodeModulesRoot`. It skips unreadable entries without an error.
- [theme-discovery.ts:loadThemeShortlists], [theme-discovery.ts:loadThemeSelectionIndex], and [theme-discovery.ts:loadLayoutRecipesMarkdown] read `references/theme-shortlists.json`, `references/theme-selection-index.json`, and `references/layout-recipes.md`.
- [themes-discovery-list.ts:buildThemesDiscoveryList] reads the same reference files through `theme-discovery`.
- [generate-deck-prompt.ts:buildGenerateDeckPrompt] reads `SKILL.md`, files in `references/`, and the theme manifest.
- [validate-theme-cli.ts] reads the file in `process.argv[2]`, writes to stdout and stderr, and sets the process exit code.
- [share-deck.ts:encodeShareDeck] and [share-deck.ts:decodeShareDeck] need `CompressionStream` and `DecompressionStream` (Node 22+ or a modern browser). They do no I/O.
- [theme-surface.ts] imports `../shared/theme-surfaces.json`. The build script copies that file from `packages/shared/` (see `tools/sync-core-shared.mjs`).
- The other modules (`craft-audit`, `scaffold-deck`, `remorph-density`, `judge-deck-json`, `md-to-deck`, `deck-to-md`, `chart-svg`, `brand-extract`, `color`, `notes-handout`, `candy-marquee`, `sanitize-html`, `theme-browse`) have no side effects.

## Verification

- Run: `pnpm --filter @presentation-md/core test`
