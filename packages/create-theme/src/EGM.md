# create-theme/src

## Overview

The `create-presentation-md-theme` CLI and its library exports. It scaffolds a theme package from Mustache templates. Theme values come from interactive prompts, a local CSS file (`--from-css`), or a live brand URL (`--from-url`). URL extraction first parses static CSS. If that finds nothing, it falls back to computed styles in headless Chromium.

## Interface

- CLI `create-presentation-md-theme [name] [--output-dir <path>] [--from-url <url>] [--from-css <path>]` [index.ts:buildProgram].
- Scaffolding [index.ts]: `scaffoldTheme(view, outputDir)`, `buildThemeManifestJson(view)`, `renderTemplate(templateDir, filename, view)`, `getTemplateDir()`, `ThemeView`.
- Name helpers: `validateThemeName`, `toUnderscored`, `pickExtendsFromBg` [index.ts]; `deriveNameFromUrl` [name-from-url.ts].
- Brand extraction: `extractBrand({ url | cssPath })`, `BrandExtractionInput`, `BrandExtractionResult`, `MAX_LOCAL_CSS_BYTES` [extract-brand.ts]; `buildThemeViewFromBrand(name, extraction)` [theme-view.ts].
- Static fetch (internal module): `fetchStylesheetsFromUrl`, `fetchText`, `resolvePublicUrl`, `assertPublicHostname`, `isPublicNetworkAddress` [fetch-css.ts].
- Chromium fallback (internal module): `extractComputedStyles`, `ensurePlaywrightInstalled`, `guardRoute`, `isPublicHttpUrl`, `ComputedStyleResult` [playwright-fallback.ts].
- `template/` (not a contract directory): `theme.json.mustache`, `package.json.mustache`, `pyproject.toml.mustache`, `README.md.mustache`, consumed by `scaffoldTheme` [index.ts:THEME_TEMPLATE_FILES].

## Invariants

- Theme names match `/^[a-z][a-z0-9-]*$/`; anything else throws [index.ts:validateThemeName, name-from-url.ts:deriveNameFromUrl].
- `--from-url` and `--from-css` are mutually exclusive, in the CLI and in `extractBrand` [index.ts:buildProgram, extract-brand.ts:extractBrand].
- A name is required, except with `--from-url`, where it comes from the hostname [index.ts:buildProgram].
- `extends` is `"claude"` when bg relative luminance >= 0.45, else `"default-tech"`. Unparseable bg gives `"default-tech"` [index.ts:pickExtendsFromBg].
- `extractBrand` passes the palette through core `ensureContrastSafe` and reports remaining failures in `stillFailing`. It throws when no color or font is found [extract-brand.ts:extractBrand].
- Local CSS is at most 20 MiB [extract-brand.ts:MAX_LOCAL_CSS_BYTES].
- Static fetch limits: 5 MiB per response, 32 stylesheet links, 20 MiB combined CSS, 5 redirects, 10 s timeout, 2 s DNS timeout. Only `http:`/`https:` [fetch-css.ts:MAX_BYTES, MAX_STYLESHEET_LINKS, MAX_COMBINED_CSS_BYTES, MAX_REDIRECTS, TIMEOUT_MS, fetchText].
- SSRF guard: private or internal hostnames and addresses are refused, before any browser launch [fetch-css.ts:assertPublicHostname, playwright-fallback.ts:extractComputedStyles]. `extractComputedStyles` skips this check for `file:`, `data:`, `blob:`, `about:` (`NON_NETWORK_SCHEMES`); through `extractBrand` those schemes fail earlier in `fetchText` (`Unsupported URL scheme`).
- In the Chromium fallback, every page request passes `guardRoute`. Any error aborts the request (fail closed) [playwright-fallback.ts:extractComputedStyles, guardRoute].
- The CLI runs only when the file is the direct entry point, so tests can import it [index.ts module guard].

## Side Effects

- Disk write: `scaffoldTheme` creates `outputDir` (default `packages/themes/<name>` under cwd) and writes `theme.json`, `package.json`, `pyproject.toml`, `README.md` [index.ts:scaffoldTheme, buildProgram].
- Disk read: templates from `getTemplateDir()`; the `--from-css` file [index.ts:renderTemplate, extract-brand.ts:readLocalCssBounded].
- Network: HTTP fetches of the brand page and its stylesheets, plus DNS lookups [fetch-css.ts:fetchText, assertPublicHostname].
- Process spawn (fallback only): `npm install --prefix <package root> --no-save playwright@^1.46.0` when it is missing, then `playwright install chromium` on every call, each with a 300 s timeout. Then a headless Chromium launch [playwright-fallback.ts:ensurePlaywrightInstalled, extractComputedStyles].
- stdin/stdout prompts in interactive mode; `process.exit(1)` on CLI errors [index.ts:collectView, buildProgram].

## Verification

- Run: `pnpm --filter @presentation-md/create-theme test`
