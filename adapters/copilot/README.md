# presentation-md — GitHub Copilot adapter

Installs the presentation-generator skill for GitHub Copilot in VS Code by writing
`.github/copilot-instructions.md` in your current project directory.

Run from the **root of your project**:

```bash
npx @presentation-md/install copilot
```

## What gets installed

| Mode | What lands |
|------|-----------|
| full (default) | `.github/copilot-instructions.md` + `.github/skills/deck-design-judge/` + `.vscode/mcp.json` |
| lite | `.github/copilot-instructions.md` only |

**Full mode** registers the MCP server (`@presentation-md/mcp-server`) in
`.vscode/mcp.json`. VS Code 1.99+ picks this up automatically — Copilot gets all **11**
MCP tools: `render_deck`, `export_deck`, `audit_deck`, `judge_deck`, `list_themes`,
`apply_theme`, `generate_deck_prompt`, `scaffold_deck`, `preview_themes`, `import_pptx`, `import_markdown`,
`import_brand_theme`. The judge skill scripts land under
`.github/skills/deck-design-judge/` for agents that read the repo.

**Lite mode** copies the skill definition only. Copilot still generates decks via the
direct-HTML path (no structured tool calls).

## After install

Restart VS Code (or reload the window). Then in Copilot Chat:

```
Build a 10-slide pitch deck from these notes: [paste your content]
```

## Notes

- Unlike other adapters, Copilot instructions are **project-scoped**, not user-scoped.
  Run this once per project.
- `.github/copilot-instructions.md` is generated from the published `@presentation-md/core`
  SKILL.md — do not edit it by hand; re-run the installer to update.
