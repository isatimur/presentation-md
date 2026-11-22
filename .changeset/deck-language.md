---
"@presentation-md/core": minor
"@presentation-md/export": minor
"@presentation-md/render": minor
---

Decks in any language. New optional `meta.lang` (BCP 47, default `en`):

- HTML sets `<html lang dir>`; Arabic, Hebrew, Persian, and Urdu render right to left.
- Non-Latin scripts get Noto font fallbacks (CJK, Arabic, Hebrew, Devanagari, Bengali, Thai, Cyrillic/Greek/Vietnamese) added to the theme font stack and the Google Fonts URL.
- PPTX text runs carry the deck language; right-to-left decks get paragraph RTL and mirrored left/right alignment.
- Word-count gates (`judgeDeckJson`, HTML metrics) now count Cyrillic, Arabic, and other non-Latin words (previously zero) and CJK text without spaces (previously one word per paragraph). English counts are unchanged.
- New `@presentation-md/core/deck-lang` subpath: `normalizeDeckLang`, `deckLangDir`, `scriptFallbackFonts`, `withFontFallback`, `countWords`.
- The skill and `generate_deck_prompt` tell agents to write copy in the user's language and set `meta.lang`.
