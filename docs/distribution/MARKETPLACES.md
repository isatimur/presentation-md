# Marketplace & directory distribution

Status tracker for shelves where presentation-md should appear. Update after each submit.

| Shelf | Fit | Status | Action |
|---|---|---|---|
| **npm** `@presentation-md/*` | Primary install | **Live** | Keep install messaging sharp; no version bump without changeset |
| **PyPI** `presentation-md-render` | Python agents | **Live** | — |
| **GitHub** `isatimur/presentation-md` | Source of truth | **Live** | Topics + README launch blurb |
| **Claude Code plugin** (`.claude-plugin/`) | Anthropic `/plugin` | **Prepared in-repo** | Users: `/plugin marketplace add isatimur/presentation-md` |
| **skills.sh** | Universal skill install | **Live (indexed)** | Canonical: `npx skills add isatimur/presentation-md --skill presentation-generator`. Legacy telemetry slug `presentation-skill-pack` may still appear — prefer `presentation-md`. |
| **ClawHub** | Agent skill registry | **Needs login** | `clawhub login` then `clawhub publish skills/presentation-generator --slug presentation-md --name "presentation-md" --tags "presentation,slides,pptx,mcp,ai-agent"` |
| **Cursor marketplace** | Team plugins | **N/A / manual** | Public skills.sh + install CLI cover individuals; Cursor Team marketplace needs org dashboard |
| **MCP registries** (Glama, LF, APITracker) | MCP server | **Prepared** | Submit `@presentation-md/mcp-server` — see launch directory list |
| **Awesome lists** | Discovery | **Prepared** | PRs drafted in `.agents/launch/directory-submissions.md` |
| **AI directories** (TAAFT, Futurepedia, …) | Discovery + backlinks | **Prepared** | Copy in `.agents/launch/` — manual form submits |
| **Product Hunt / Show HN** | Launch moment | **Prepared** | Assets in `.agents/launch/` — schedule Tue–Thu |

Owner blockers (interactive login / form): ClawHub, Product Hunt, most AI directories, G2 reviews.
