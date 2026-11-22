# src

## Overview

The Studio single-page app. `main.tsx` mounts `App`. `App` owns the deck state, undo history, autosave to `localStorage`, share-link and example hydration, and the Present and Generate overlays. The root files hold pure helpers for deck shapes, validation, history, autosave timing, and async result ownership. The subdirectories hold the UI, rendering, I/O, and Node-side guards.

## Interface

- `App`: root component. [App.tsx:App]
- Deck model: `LAYOUTS` (18 layouts), `LAYOUT_LABELS`, `blankSlide(layout)`, `morphSlide(slide, layout)`, `EXAMPLE_DECK`; re-exports types `DeckJson`, `Slide`, `LayoutType` from `@presentation-md/export`. [deck.ts:blankSlide, deck.ts:morphSlide]
- Deck guard: `MAX_STUDIO_DECK_JSON_BYTES` (8 MiB), `MAX_STUDIO_DECK_SLIDES` (200), `MAX_STUDIO_DECK_COLLECTION_ITEMS` (20,000), `studioDeckError(value)`, `parseStudioDeckJson(text)`. [deckGuard.ts:studioDeckError, deckGuard.ts:parseStudioDeckJson]
- History: `DeckHistory`, `createDeckHistory`, `pushDeck`, `replaceDeck`, `undoDeck`, `redoDeck`, `canUndo`, `canRedo`. [history.ts:pushDeck]
- Autosave: `createAutosaveScheduler({ delayMs, save, onSuccess, onError })` returns `{ schedule, flush, cancel, hasPending }`. [autosave.ts:createAutosaveScheduler]
- Async ownership: `createAsyncOwnership()` returns `{ begin, classify, invalidate }`, with decisions `"apply" | "conflict" | "stale"`. `createLatestAsyncWriter()` returns `"applied" | "stale"`. [asyncOwnership.ts:createAsyncOwnership, latestAsyncWriter.ts:createLatestAsyncWriter]
- API key: `API_KEY_STORAGE_KEY` (`pmd-studio-anthropic-key`), `API_KEY_STORAGE_WARNING`, `readRememberedApiKey`, `persistApiKeyPreference`. [apiKeyStorage.ts:persistApiKeyPreference]
- Examples: `STUDIO_EXAMPLES`, `resolveExampleSlug`, `loadExampleDeck`, `studioExampleLink`. [examples.ts:loadExampleDeck]
- Subdirectories:
  - [ai](./ai/EGM.md): in-browser Anthropic generation and the agent prompt.
  - [brand](./brand/EGM.md): pasted brand CSS to an ephemeral theme.
  - [components](./components/EGM.md): React UI.
  - [craft](./craft/EGM.md): re-exports of core craft audit and judge gates.
  - [export](./export/EGM.md): downloads, PDF, and file import.
  - [render](./render/EGM.md): deck HTML render, theme registry, sandbox prep.
  - [server](./server/EGM.md): Node-only PDF endpoint guards.
  - [share](./share/EGM.md): `?d=` share tokens.
  - [shims](./shims/EGM.md): browser stand-ins for `node:*`.

## Invariants

- A deck root must be an object with `type: "deck"` and 1 to 200 slides. Each slide layout must be in `LAYOUTS`. Nested collection items total at most 20,000. Input over 8 MiB throws before `JSON.parse`. [deckGuard.ts:studioDeckError, deckGuard.ts:parseStudioDeckJson]
- Undo history keeps at most 60 past entries. An identical deck adds no step. Any push clears redo. `replaceDeck` clears both stacks. [history.ts:DEFAULT_LIMIT, history.ts:pushDeck, history.ts:replaceDeck]
- Form edits within 700 ms merge into one undo step. [App.tsx:EDIT_COALESCE_MS]
- Autosave waits 300 ms after the last change. `schedule` resets the timer. `flush` saves only when work is pending. [App.tsx:AUTOSAVE_DELAY_MS, autosave.ts:createAutosaveScheduler]
- A corrupt saved deck is copied to `pmd-studio-deck-v1-recovery`. If that copy fails, autosave stays blocked. [App.tsx:loadSavedDeck]
- Start-up deck order: share token, then `example` param, then the saved deck unless `fresh=1`, then the example deck. [App.tsx:loadInitialDeck]
- A `storage` event that changes `pmd-studio-deck-v1` from another tab cancels pending autosave and sets `storageConflictRef`. While it is set, autosave skips writes. No code resets it to `false`. [App.tsx:App]
- `classify` returns `stale` for any ticket but the latest, else `apply` when the baseline is the same reference as the current deck, else `conflict`. Studio deck updates are immutable, so reference identity detects edits. [asyncOwnership.ts:createAsyncOwnership]
- Generated decks pass `repairCraft` before commit. [App.tsx:App]
- Undo is Ctrl/Cmd+Z. Redo is Shift+Ctrl/Cmd+Z or Ctrl/Cmd+Y. Both are ignored inside inputs, textareas, selects, and contenteditable. [App.tsx:App]
- `resolveExampleSlug` trims, lowercases, maps aliases, and returns `null` for slugs outside `STUDIO_EXAMPLES`. `loadExampleDeck` returns a `structuredClone`. [examples.ts:resolveExampleSlug, examples.ts:loadExampleDeck]
- `persistApiKeyPreference` stores the trimmed key only when `remember` is true and the key is not empty. Otherwise it removes the key. Storage failures return a warning and never block generation. [apiKeyStorage.ts:persistApiKeyPreference]
- Discard recovery needs `window.confirm`, then checks that the key is gone. [App.tsx:App]

## Side Effects

- `localStorage` keys: `pmd-studio-deck-v1`, `pmd-studio-deck-v1-recovery`, `pmd-studio-example-slug` (App); `pmd-studio-anthropic-key` (apiKeyStorage). [App.tsx:STORAGE_KEY, App.tsx:RECOVERY_STORAGE_KEY, App.tsx:EXAMPLE_SLUG_KEY, apiKeyStorage.ts:API_KEY_STORAGE_KEY]
- `history.replaceState` strips consumed `fresh`, `d`, and hash share data, and sets the `example` param. [App.tsx:App]
- Listeners: window `storage`, `pagehide`, and `keydown`; document `visibilitychange`. `pagehide` and hidden visibility flush autosave. [App.tsx:App]
- `requestFullscreen` and `exitFullscreen` around Present. [App.tsx:App]
- Lazy imports of `PresentMode`, `GenerateModal`, and example deck JSON. [App.tsx:App, examples.ts:loadExampleDeck]
- `createRoot(...).render(<App />)` into `#root`. It throws `"Missing #root element"` when the node is absent. [main.tsx:createRoot, main.tsx:root]

## Verification

- Run: `pnpm --filter @presentation-md/studio test`
