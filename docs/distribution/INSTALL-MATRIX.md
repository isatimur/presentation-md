# Install matrix — presentation-md

One product, many shelves. Pick the path that matches the agent you already use.

| Surface | Command / action | Lands |
|---|---|---|
| **Any agent (recommended)** | `npx @presentation-md/install <agent>` | Skill + MCP via adapter (`claude-code` \| `cursor` \| `copilot` \| `codex` \| `gemini-cli` \| `cli`) |
| **skills.sh (universal)** | `npx skills add isatimur/presentation-md --skill presentation-generator` | Local skill dir for Claude / Cursor / Copilot / Gemini / … |
| **Claude Code plugin** | `/plugin marketplace add isatimur/presentation-md` then `/plugin install presentation-md@presentation-md` | Plugin + `/slides` slash + MCP |
| **Cursor** | `npx @presentation-md/install cursor` | `~/.cursor/rules/presentation-generator.mdc` + MCP |
| **GitHub Copilot** | `npx @presentation-md/install copilot` *(from project root)* | `.github/copilot-instructions.md` + `.vscode/mcp.json` |
| **OpenAI Codex** | `npx @presentation-md/install codex` | Codex instructions + MCP |
| **Gemini CLI** | `npx @presentation-md/install gemini-cli` | `~/.gemini/instructions/` + MCP |
| **CLI only** | `npx @presentation-md/install cli` | `presentation-md-render` path, no MCP |
| **npm packages** | `@presentation-md/core`, `@presentation-md/render`, `@presentation-md/mcp-server`, … | Programmatic / MCP / themes |
| **PyPI** | `pip install presentation-md-render` | Python renderer |
| **Zero install** | [Studio](https://presentation-md.vercel.app/studio) | Browser editor + export |

### Lite vs full

- **full** (default): skill files + MCP server registration (13 tools).
- **lite**: skill files only — Deck JSON + CLI / direct-HTML fallback.

```bash
npx @presentation-md/install cursor lite
```

### After install

1. Restart the agent.
2. Ask: *create a presentation about…* — or Claude Code `/slides <brief>`.
3. Proof: [gallery](https://presentation-md.vercel.app/#gallery) · [vs frontend-slides](https://presentation-md.vercel.app/vs/frontend-slides).

Canonical skill source: `packages/core/SKILL.md` → synced to `skills/presentation-generator` via `pnpm sync:skill`.
