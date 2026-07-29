# Themes (vibes)

Themes are the styling lever. Same deck JSON + different theme = completely different look,
data intact. List installed themes at runtime with the `list_themes` MCP tool or
`npx @presentation-md/render --list-themes`.

| theme | vibe |
|-------|------|
| `claude` | Anthropic / Claude-inspired — warm cream paper, clay-coral accent, grotesk + editorial serif (bundled). |
| `default-tech` | Edgy tech startup — dark, violet + cyan, bold geometric sans (bundled). |
| `corporate` | Formal corporate — light, navy, restrained single accent, clean. |
| `playful` | Playful/creative — bright multi-color, rounded, big type. |
| `luxury-minimalist` | Luxury minimalist — off-white/charcoal, whitespace, thin serif. |
| `retro-arcade` | Retro 80s arcade — deep purple/black, magenta+cyan neon glow. |
| `editorial-serif` | Magazine editorial — warm cream paper, ink-black serif, crimson masthead. |
| `brutalist-mono` | Raw brutalist — concrete off-white, monospace, hazard-orange, zero radius. |
| `pastel-dreamy` | Soft pastel — lavender-blush, deep plum text, blush + periwinkle accents. |
| `aurora-glass` | Aurora glass — black void, Syne, violet + cyan (NovaSpark). |
| `ft-editorial` | FT broadsheet — cream newsprint, ink serif, blue + red signal. |
| `genz-bento` | Gen-Z bento — coral + lime stickers, hard offset shadows. |
| `crt-terminal` | CRT terminal — cream type, phosphor green accents (RetroNet). |
| `swiss-typographic` | Swiss grid — white, Inter, signal red, zero radius (Grid Systems). |
| `candy-pop` | Candy pop — cream, hot pink + jellybean blue, Fredoka (Jellybean). |
| `aerospace-hud` | Aerospace HUD — navy, cyan, orange, Barlow Condensed (Axiom). |
| `brutalist-acid` | Dark acid brutalist — near-black, electric lime, Space Mono (MONOLITH). |
| `bauhaus` | Bauhaus — cream #f4f1ea, red #e63946 + blue #1f4ae0 (Primary). |
| `y2k-aero` | Y2K aero — icy sky + lime bubbles, Nunito (BubbleFlow). |
| `risograph-zine` | Risograph zine — kraft, red + blue overprint (Inkwell). |
| `neon-noir` | Neon noir — #050510 night, pink + cyan, Orbitron (Neon District). |
| `vaporwave` | Vaporwave — #1a0533 dusk, #ff6ad5 + #5ce1ff, Monoton (Mallsoft). |
| `botanical-luxe` | Botanical luxe — forest #1d3a2f, gold #bfa55a (Verdant). |

Install more: `npm i @presentation-md/theme-<name>` (or the PyPI mirror
`presentation-md-theme-<name>`). Scaffold your own: `npx @presentation-md/create-theme`.

## Brand import

Generate a theme from an existing brand instead of hand-picking colors:

```
npx @presentation-md/create-theme --from-url https://acme.com
npx @presentation-md/create-theme my-theme-name --from-css ./brand.css
```

Extracts `:root` CSS variables and font declarations (falling back to a headless-browser
computed-style read when a site has no CSS custom properties — most real marketing sites don't).
Maps whatever's found onto the theme's 8 semantic roles and runs a WCAG contrast-safety pass, so
the result stays legible even when the raw brand colors wouldn't be. The CLI reports its
extraction source and any contrast adjustments it made. Also available as the `import_brand_theme`
MCP tool for agent-driven workflows.
