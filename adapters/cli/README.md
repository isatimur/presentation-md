# CLI adapter

The CLI renderer is available directly via npx — no install step required for rendering.

```bash
npx @presentation-md/render deck.json -o deck.html
npx @presentation-md/render deck.json -o deck.html --theme corporate
npx @presentation-md/render deck.json --format pptx -o deck.pptx
npx @presentation-md/render --from-md deck.md -o deck.json
npx @presentation-md/render --from-pptx board.pptx -o deck.json --theme corporate
npx @presentation-md/render --from-pptx board.pptx -o deck.json --assets-dir ./assets
npx @presentation-md/render --list-themes
npx @presentation-md/render --preview-compare aurora-glass,signal,claude
npx @presentation-md/render --validate deck.json
```

## Optional: install judge scripts

```bash
npx @presentation-md/install cli
# copies deck-design-judge → ~/.presentation-md/skills/deck-design-judge
```

Then:

```bash
bash ~/.presentation-md/skills/deck-design-judge/scripts/render_slides.sh deck.html shots/
python3 ~/.presentation-md/skills/deck-design-judge/scripts/deck_metrics.py deck.html
```

Or use MCP `judge_deck` without copying scripts:

```bash
npx -y @presentation-md/mcp-server
```

Or install globally:

```bash
npm i -g @presentation-md/render
presentation-md-render deck.json -o deck.html --theme playful
```

## Pipe from stdin

```bash
cat deck.json | npx @presentation-md/render -o deck.html
echo '{"type":"deck","meta":{"title":"Test","theme":"retro-arcade"},"slides":[...]}' \
  | npx @presentation-md/render -o test.html
```

## Options

| Flag | Description |
|------|-------------|
| `-o, --output <path>` | Output path (default: `deck.html`, `deck.pptx`, or `deck.json`) |
| `-f, --format <fmt>` | Output format: `html` (default) or `pptx` |
| `-t, --theme <name>` | Override the theme declared in `meta.theme` |
| `--from-pptx <path>` | Import a `.pptx` file to deck JSON instead of rendering |
| `--from-md <path>` | Import Marp/md-slides Markdown to deck JSON instead of rendering |
| `--assets-dir <dir>` | With `--from-pptx`, write images to this directory instead of data URIs |
| `--list-themes` | Print available themes with studio/preview URLs + suggested preview trio (MCP `list_themes` parity) |
| `--browse <chip>` | With `--list-themes`, filter by mood chip (`popular` / `dark` / `editorial` / …) |
| `--mood <keyword>` | With `--list-themes`, filter by selection-index mood |
| `--query <text>` | With `--list-themes`, free-text filter |
| `--shortlist <id>` | With `--list-themes`, filter to a shortlist |
| `--list-shortlists` | Print shortlist catalog |
| `--list-browse-filters` | Print mood browse chip ids |
| `--json` | With list-* commands, emit JSON |
| `--preview-compare <themes>` | Write 1–3 multi-layout craft previews + discovery PNGs (comma-separated themes) and exit |
| `--preview-dir <dir>` | Output dir for `--preview-compare` (default: `.presentation-md/theme-previews`) |
| `--preview-mode <mode>` | `title` or `layouts` (default) for `--preview-compare` |
| `--no-preview-shots` | Skip PNG screenshots for `--preview-compare` (HTML only) |
| `--validate` | Validate the deck JSON without rendering |

## Themes

Run `npx @presentation-md/render --list-themes` to see what's installed. Bundled with the renderer: `default-tech`, `claude`. Dozens more ship as `@presentation-md/theme-*` packages.

Install additional themes:

```bash
npm i @presentation-md/theme-<name>
```

## Example deck.json

```json
{
  "type": "deck",
  "meta": {
    "title": "Acme Pitch",
    "company": "Acme",
    "theme": "corporate"
  },
  "slides": [
    {
      "layout": "title",
      "eyebrow": "Acme",
      "heading": "We make shipping fast.",
      "lead": "Zero-config CI/CD for any stack."
    },
    {
      "layout": "feature-grid",
      "heading": "Why teams love Acme",
      "columns": 3,
      "cards": [
        { "icon": "fa-solid fa-bolt",       "title": "Fast",    "body": "Deploys in under 60s." },
        { "icon": "fa-solid fa-shield",     "title": "Secure",  "body": "SOC 2 Type II." },
        { "icon": "fa-solid fa-chart-line", "title": "Proven",  "body": "200+ teams ship daily." }
      ]
    },
    {
      "layout": "closing",
      "heading": "Ready to ship faster?",
      "cta": { "label": "Start free trial", "href": "https://acme.example" }
    }
  ]
}
```
