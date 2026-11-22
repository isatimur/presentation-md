# ai

## Overview

In-browser deck generation. There are two paths from one schema prompt. `generateDeck` calls the Anthropic Messages API from the browser with the user's own key. `buildAgentPrompt` returns a copy-paste prompt for an external agent. Both share the private `SCHEMA_PROMPT`, which describes Deck JSON and its eighteen layouts.

## Interface

- `GEN_MODELS`: model ids and labels (`claude-opus-4-8`, `claude-sonnet-4-6`, `claude-haiku-4-5`). Type `GenModelId`. [generate.ts:GEN_MODELS]
- `DensityMode`: `"speaker" | "reading"`. A local type, separate from the core type re-exported by `../craft/auditCraft.ts`. [generate.ts:DensityMode]
- `buildAgentPrompt(brief, theme, density = "speaker")`. [generate.ts:buildAgentPrompt]
- `GenerateArgs`: `{ apiKey, model, brief, theme, density?, signal? }`. [generate.ts:GenerateArgs]
- `generateDeck(args)` returns `Promise<DeckJson>`. [generate.ts:generateDeck]

## Invariants

- `generateDeck` throws before any network call if `brief` or `apiKey` is blank after trim. [generate.ts:generateDeck]
- The request uses `max_tokens: 8000`, `SCHEMA_PROMPT` as system, and one user message. [generate.ts:generateDeck]
- An empty text reply throws. The reply is de-fenced, cut to the outer `{...}`, and parsed with `parseDeckJson` from `../export/downloads.ts`, so the Studio deck guard applies. [generate.ts:extractJson, generate.ts:generateDeck]
- `deck.meta.theme` is always overwritten with the chosen theme. [generate.ts:generateDeck]
- `density: "reading"` selects the reading-first line. Any other value selects speaker-led. [generate.ts:buildUserBrief]

## Side Effects

- Network: lazy-imports `@anthropic-ai/sdk` and calls `client.messages.create` with `dangerouslyAllowBrowser: true`. The call honours the optional `AbortSignal`. [generate.ts:generateDeck]
- `buildAgentPrompt` is pure. [generate.ts:buildAgentPrompt]

## Verification

- Run: `pnpm --filter @presentation-md/studio test`
