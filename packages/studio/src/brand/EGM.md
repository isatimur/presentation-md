# brand

## Overview

Paste Brand. The user pastes brand CSS. This module turns its `:root` colour variables and font declarations into an ephemeral `ThemeManifest`. The parse, palette mapping, and contrast repair come from `@presentation-md/core`. Registration of the result happens elsewhere, in `../render/themes.ts:registerCustomTheme`.

## Interface

- `themeFromBrandCss(css, nameInput = "brand-paste")` returns `BrandPasteResult`. [pasteBrandTheme.ts:themeFromBrandCss]
- `BrandPasteResult`: `{ manifest, name, adjustments, stillFailing }`. [pasteBrandTheme.ts:BrandPasteResult]

## Invariants

- Empty or whitespace CSS throws `"Paste brand CSS with :root color variables first."`. [pasteBrandTheme.ts:themeFromBrandCss]
- CSS with no `bg`, `text`, `accent`, heading font, or body font throws. [pasteBrandTheme.ts:themeFromBrandCss]
- The palette always passes through core `ensureContrastSafe`. Unfixable pairs return in `stillFailing`. [pasteBrandTheme.ts:themeFromBrandCss]
- Theme name is a lowercase `[a-z0-9-]` slug, at most 48 characters, and falls back to `brand-paste`. [pasteBrandTheme.ts:sanitizeThemeName]
- `extends` is `claude` when background luminance is above 0.45, else `default-tech`. Luminance errors pick `default-tech`. [pasteBrandTheme.ts:pickExtendsFromBg]
- Missing fonts default to `Inter`. Single quotes are stripped from font names. `version` is `0.0.0-paste`. [pasteBrandTheme.ts:themeFromBrandCss]

## Side Effects

- None. The function is pure. It does not register the theme. [pasteBrandTheme.ts:themeFromBrandCss]

## Verification

- Run: `pnpm --filter @presentation-md/studio test`
