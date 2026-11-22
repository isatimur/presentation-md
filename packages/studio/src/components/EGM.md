# components

## Overview

The React UI of Studio. `Toolbar` holds import, export, themes, examples, and the craft audit. `SlideList` and `SlideForm` edit slides. `Preview` and `SlideFilmstrip` show the live deck. `PresentMode` is the full-screen presenter. `GenerateModal` drives AI generation. Deck previews (`Preview`, `SlideFilmstrip`, `PresentMode`, `DeckRestylePreview`) render in iframes with `sandbox="allow-same-origin"` and no `allow-scripts`.

## Interface

- `Toolbar`: top bar. Props include `deck`, `html`, `exampleSlug`, `selectedSlide`, `canUndo`/`canRedo`, `onChange`, `onLoadExample`, `onPresent`, `onGenerate`, `onDiscardRecovery`, `onSelectSlide`. [Toolbar.tsx:Toolbar]
- `SlideForm({ slide, onChange })`: per-layout field editor. [SlideForm.tsx:SlideForm]
- `SlideList`: add, duplicate, reorder, delete slides. [SlideList.tsx:SlideList]
- `Preview`, type `PreviewFit` (`"fit" | 50 | 75 | 100 | 125`). [Preview.tsx:Preview]
- `SlideFilmstrip`, `densifyFilmstripHtml(deckHtml)`, `FILMSTRIP_THUMB_H` = 64. [SlideFilmstrip.tsx:SlideFilmstrip]
- `PresentMode({ html, slideCount, notes?, slideHeadings?, onClose })`. [PresentMode.tsx:PresentMode]
- `GenerateModal`: brief, theme, density, model, then API generate, scaffold, or copy prompt. [GenerateModal.tsx:GenerateModal]
- `CommandPalette`, `StudioCommand { id, label, hint?, keywords?, run }`. [CommandPalette.tsx:CommandPalette]
- `ThemeCompareTray`, type `LiveCompareMode` (`"deck" | "proofs"`). [ThemeCompareTray.tsx:ThemeCompareTray]
- `DeckRestylePreview`, `restyleSlideHtml`, `renderRestyleHtml`. [DeckRestylePreview.tsx:DeckRestylePreview]
- `ThemeCraftShotStrip`. [ThemeCraftShotStrip.tsx:ThemeCraftShotStrip]
- Form primitives: `Field`, `TextInput`, `TextArea`, `NumberSelect`, `StringSelect`, `ListEditor<T>`. [fields.tsx:ListEditor]

## Invariants

- Async import, export, and clipboard results go through `createAsyncOwnership` tickets. Stale results drop. Results that meet a changed deck become conflicts, and an imported deck waits for the user to choose. [Toolbar.tsx:importOwnership, Toolbar.tsx:exportOwnership]
- Open checks `assertStudioImportFileSize` before reading the file. [Toolbar.tsx:onOpen]
- Theme apply runs `repairCraft` before `onChange`. [Toolbar.tsx:applyThemeWithRepair]
- `SlideList` blocks delete when only one slide is left. Add inserts after the selected slide. [SlideList.tsx:SlideList]
- `PresentMode` clamps the slide index to `0..slideCount-1`. Escape closes layers in order: help, overview, blackout, whiteout, laser, ink, then the presenter. [PresentMode.tsx:go, PresentMode.tsx:onKey]
- `PresentMode` keys: `?` help, `G` overview, `L` laser, `D` ink, `C` clear ink, `B` blackout, `W` whiteout, `R` reset, `P` pace, `O` speaker view, `T` pause, `S` notes, `F` filmstrip. Ink clears on every slide change. [PresentMode.tsx:onKey]
- `GenerateModal` applies a result only while its `AbortController` is current and not aborted. Generate is disabled while busy. [GenerateModal.tsx:GenerateModal]
- `Preview`, `SlideFilmstrip`, `PresentMode`, and `DeckRestylePreview` iframes use `sandbox="allow-same-origin"` and get HTML from `prepareSandboxedPreviewHtml`. `ThemeCraftShotStrip` loads a `src` URL with no `sandbox` attribute. [Preview.tsx:Preview, SlideFilmstrip.tsx:SlideFilmstrip, ThemeCraftShotStrip.tsx:ThemeCraftShotStrip]
- `CommandPalette` filters by whitespace terms. Every term must match the label, hint, or keywords. [CommandPalette.tsx:CommandPalette]
- `ThemeCompareTray` pads slots to `COMPARE_LIMIT` and renders `null` when the list is empty. [ThemeCompareTray.tsx:ThemeCompareTray]

## Side Effects

- Clipboard: `navigator.clipboard.writeText` for share links, Markdown, and the agent prompt. `readText` for pasted Markdown and brand CSS. [Toolbar.tsx:copyLink, Toolbar.tsx:pasteMdFromClipboard, GenerateModal.tsx:GenerateModal]
- File downloads and imports through `../export/downloads.ts`. [Toolbar.tsx:exportPptx, Toolbar.tsx:exportPdf, Toolbar.tsx:onOpen]
- Paste Brand calls `themeFromBrandCss`, then `registerCustomTheme`, which mutates the session theme registry. [Toolbar.tsx:applyPastedBrandCss]
- Network: `generateDeck` from `../ai/generate.ts` calls Anthropic. `persistApiKeyPreference` and `readRememberedApiKey` from `../apiKeyStorage.ts` touch `localStorage`. [GenerateModal.tsx:GenerateModal]
- `PresentMode` opens a `pmd-speaker-view` popup with `window.open` and writes its DOM. It closes the popup on unmount. [PresentMode.tsx:openSpeakerView, PresentMode.tsx:paintSpeakerWindow]
- `PresentMode` runs a 500 ms timer interval, a canvas for ink, pointer capture, and a `ResizeObserver`. [PresentMode.tsx:PresentMode]
- Window `keydown` listeners in `Toolbar` (Cmd/Ctrl+K), `CommandPalette` (capture phase), `GenerateModal`, and `PresentMode`. [Toolbar.tsx:Toolbar, CommandPalette.tsx:CommandPalette]
- `ThemeCraftShotStrip` iframes load `themePreviewUrl(theme)` over the network. [ThemeCraftShotStrip.tsx:ThemeCraftShotStrip]

## Verification

- Run: `pnpm --filter @presentation-md/studio test`
