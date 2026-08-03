# Manual submit checklist

Use with `.agents/launch/LAUNCH.md` copy variants. Do not pay submission services.

## Ready now (CLI / already live)

- [x] npm `@presentation-md/*` published
- [x] PyPI `presentation-md-render`
- [x] GitHub public repo + topics
- [x] Claude plugin manifests (`.claude-plugin/`)
- [x] skills.sh.json + `skills/*/SKILL.md` layout
- [ ] `clawhub login` → publish `skills/presentation-generator`
- [ ] Smoke: `npx skills add isatimur/presentation-md --skill presentation-generator`

## Forms (owner)

1. DevHunt — https://devhunt.org — startup/dev blurb  
2. Fazier — https://fazier.com — startup blurb  
3. Uneed — https://uneed.best — startup blurb  
4. TAAFT — https://theresanaiforthat.com — AI blurb  
5. Futurepedia — https://www.futurepedia.io — AI blurb  
6. Toolify — https://www.toolify.ai — AI blurb  
7. Glama — list MCP `@presentation-md/mcp-server` — agent blurb  
8. AlternativeTo — as alternative to Gamma + Tome + Beautiful.ai  

## Assets to upload

| Asset | Path / URL |
|---|---|
| Logo SVG | `web/favicon.svg` |
| Logo PNG 512 | `web/icon-512.png` |
| OG / social | `web/og-image.png` |
| Hero demo GIF | `docs/hero-demo.gif` |
| Screenshots | Gallery + Studio at presentation-md.vercel.app |
| Homepage | https://presentation-md.vercel.app |
| Pricing | https://presentation-md.vercel.app/pricing (free / MIT) |
| Privacy / Terms | `/privacy` · `/terms` |

## Awesome-list PR body (template)

```markdown
## Add presentation-md

**Repo:** https://github.com/isatimur/presentation-md  
**One-liner:** Schema-crafted slide decks for AI agents — 75 themes, MCP tools, editable PowerPoint.

```bash
npx @presentation-md/install claude-code
# or: npx skills add isatimur/presentation-md --skill presentation-generator
```

Category: presentations / MCP / Claude skills
```
