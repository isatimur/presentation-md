# share

## Overview

Share links for Studio. A deck compresses into a URL-safe token and travels in a `?d=` link. Opening the link restores the editable deck. Encoding and decoding live in `@presentation-md/core`. This module adds Studio's deck guard and works out the Studio origin and path.

## Interface

- `encodeShareDeck(deck)`: compress Deck JSON into a token. Delegates to core `encodeShareDeck`. [shareDeck.ts:encodeShareDeck]
- `decodeShareDeck(token)`: decode a token to Deck JSON, or `null`. [shareDeck.ts:decodeShareDeck]
- `studioShareLink(deck)`: build a relative Studio link that hydrates the deck. [shareDeck.ts:studioShareLink]
- Re-exports from `@presentation-md/core`: `MAX_SHARE_TOKEN_CHARS`, `readShareTokenFromLocation`. [shareDeck.ts:MAX_SHARE_TOKEN_CHARS, shareDeck.ts:readShareTokenFromLocation]

## Invariants

- `decodeShareDeck` returns `null` unless the decoded deck passes `studioDeckError` from `../deckGuard.ts`. Share links obey the same size and shape limits as file import. [shareDeck.ts:decodeShareDeck]
- `studioShareLink` always passes `relative: true` to core. Pathname is the current path when it starts with `/studio`, `/` for the root, and `/studio/` otherwise. [shareDeck.ts:studioShareLink]
- Without `window` (tests, SSR), the origin falls back to `https://presentation-md.vercel.app`. [shareDeck.ts:studioShareLink]

## Side Effects

- Reads `window.location` in `studioShareLink`. No writes. [shareDeck.ts:studioShareLink]

## Verification

- Run: `pnpm --filter @presentation-md/studio test`
