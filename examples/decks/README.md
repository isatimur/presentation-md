# Flagship decks (Deck JSON)

Structured sources for the five gallery flagships. Render with:

```bash
pnpm exec tsx tools/generate-gallery-structured.ts
```

| Deck | Theme | Output |
|------|-------|--------|
| `novaspark-pitch.json` | `default-tech` | `web/examples/structured/novaspark-pitch.html` |
| `meridian-sales.json` | `corporate` | `web/examples/structured/meridian-sales.html` |
| `bounce-launch.json` | `playful` | `web/examples/structured/bounce-launch.html` |
| `solstice-update.json` | `luxury-minimalist` | `web/examples/structured/solstice-update.html` |
| `retronet-demo.json` | `retro-arcade` | `web/examples/structured/retronet-demo.html` |

These prove the schema path: valid Deck JSON → themed HTML (Studio-editable, PPTX-exportable). The handcrafted `web/examples/*.html` decks remain the craft gallery; structured siblings sit under `web/examples/structured/`.
