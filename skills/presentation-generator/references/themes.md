# Themes (vibes)

Themes are the styling lever. Same deck JSON + different theme = completely different look,
data intact. List installed themes at runtime with the `list_themes` MCP tool or
`npx @presentation-skill-pack/render --list-themes`.

| theme | vibe |
|-------|------|
| `claude` | Anthropic / Claude-inspired — warm cream paper, clay-coral accent, grotesk + editorial serif (bundled). |
| `default-tech` | Edgy tech startup — dark, violet + cyan, bold geometric sans (bundled). |
| `corporate` | Formal corporate — light, navy, restrained single accent, clean. |
| `playful` | Playful/creative — bright multi-color, rounded, big type. |
| `luxury-minimalist` | Luxury minimalist — off-white/charcoal, whitespace, thin serif. |
| `retro-arcade` | Retro 80s arcade — deep purple/black, magenta+cyan neon glow. |

Install more: `npm i @presentation-skill-pack/theme-<name>` (or the PyPI mirror
`presentation-skill-pack-theme-<name>`). Scaffold your own: `npx @presentation-skill-pack/create-theme`.

## Brand import

Generate a theme from an existing brand instead of hand-picking colors:

```
npx @presentation-skill-pack/create-theme --from-url https://acme.com
npx @presentation-skill-pack/create-theme my-theme-name --from-css ./brand.css
```

Extracts `:root` CSS variables and font declarations (falling back to a headless-browser
computed-style read when a site has no CSS custom properties — most real marketing sites don't).
Maps whatever's found onto the theme's 8 semantic roles and runs a WCAG contrast-safety pass, so
the result stays legible even when the raw brand colors wouldn't be. The CLI reports its
extraction source and any contrast adjustments it made. Also available as the `import_brand_theme`
MCP tool for agent-driven workflows.
