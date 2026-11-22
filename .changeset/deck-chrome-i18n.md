---
"@presentation-md/core": minor
"@presentation-md/render": minor
---

Rendered decks show their presenter controls (nav hint, Edit, toolbar buttons, blackout/whiteout, help overlay, speaker window, timer cues) in the deck's language. Strings come from `shared/deck-chrome.json` (en, zh, es, ar, pt, id, fr, ja, ru, de; machine translations pending native review), picked by `meta.lang` with English fallback per key. New `@presentation-md/core/deck-chrome` subpath: `resolveDeckChrome`, `deckChromeJson`.
