# Competitor research — November 2026

Read on 2026-11-23 unless a row says otherwise. Prices are in USD per month unless stated. Many prices come from third-party price trackers, not the vendor page. Those are marked "(third-party)". Anything I could not check is marked **unverified**.

## 1. Where we stand

The field split into three groups in 2026. The hosted AI deck apps (Gamma, Canva, Beautiful.ai, Pitch, Prezi) now all ship official MCP servers or agent connectors, so "agent-first" alone no longer sets us apart. The platform owners (Microsoft Copilot Agent Mode, Gemini in Google Slides, Claude Slides) generate native decks inside the tools people already use. The open-source and developer tools (Slidev, Marp, reveal.js, Quarto, Presenton, frontend-slides) are free and have far larger communities than ours (Slidev 49.6k stars, frontend-slides 32.8k, Presenton 12.0k; us 5). Our clear edge is the combination nobody else has in one package: a typed, diffable Deck JSON; a quality gate (`audit_deck`, `judge_deck`) the agent can call; native editable PPTX from every layout; one self-contained HTML file; RTL; and no account or credits. The most repeated complaint across the paid tools is broken PowerPoint export (text split into many boxes, swapped fonts, slides flattened to images, broken RTL). That is the opening we should own and prove in public. Our gaps are collaboration (comments, live co-editing), viewer analytics, built-in image generation, import from PDF/DOCX/URL, and a hosted (no-install) MCP endpoint.

## 2. Comparison table

| Tool | Agent / MCP | Open source | PPTX fidelity | HTML / web output | Themes / brand kit | Collaboration | i18n / RTL | Price (entry paid) |
|---|---|---|---|---|---|---|---|---|
| **presentation-md** | Skill + local MCP (14 tools), 5 agents | Yes, MIT | Native shapes per layout, native charts | Single self-contained HTML; Studio share link | 75 themes; brand from URL/CSS | Share link only | 10 UI languages, Arabic RTL | Free |
| Gamma | Official hosted MCP (OAuth), Claude/ChatGPT connectors, API on Pro+ | No | Weak — many board complaints | Hosted web pages, custom domains (Pro+); no HTML export | Themes, brand; custom fonts on Ultra | Yes, comments, version history | Many languages; RTL PPTX bug reported | Plus ~$10–12 (third-party) |
| Beautiful.ai | None found | No | Weak — reviewers report cleanup | Hosted viewer | Team custom theme, slide library | Yes (Team) | unverified | Pro $14.50 (annual, third-party read of vendor page) |
| Pitch | None found | No | Mixed reviews | Hosted links, embeds | Brand templates, custom fonts | Strong (real-time) | unverified | Plus ~$10–12 (third-party) |
| Tome | — | — | — | — | — | — | — | **Dead**: slides product shut 2025-04-30; team pivoted to Lightfield CRM |
| Plus AI | Add-in inside Slides/PowerPoint | No | Native (works in the host app) | No | Uses host templates | Via host app | unverified | Basic $10 annual / $15 monthly |
| SlideSpeak | Official MCP (remote + Docker), REST API, "Brand MCP" | MCP repo only | Native PPTX from templates | No | Templates, brand MCP | unverified | unverified | API $49 for 1,000 credits |
| Presenton | Built-in MCP + API | Yes, Apache-2.0 | PPTX + PDF; custom templates from existing slides | Web editor (self-host) | Templates from your slides | No | unverified | Free (self-host) |
| Alai | Public API (no MCP found) | No | PPTX import/export | unverified | unverified | unverified | unverified | Plus $16 annual / $20 monthly (third-party) |
| Decktopus | None found | No | unverified | Hosted | Templates | Business plan | unverified | Pro $9.99 annual (third-party) |
| Prezi AI | None found | No | Not its model (zoom canvas) | Hosted | Brand kit on Teams | Teams | unverified | Standard $7 annual (third-party) |
| Canva | Official MCP (`mcp.canva.com`), Claude/ChatGPT | No | Weak — fonts and grouped elements break | Canva sites / embeds | Brand Kit | Strong | Many languages | Pro $144/yr (third-party read of vendor page) |
| Copilot in PowerPoint | Agent Mode (GA 2026-04) | No | Native | No | Brand Kit, org templates | Microsoft 365 | Office languages | Microsoft 365 Copilot licence (price unverified) |
| Gemini in Google Slides | Built-in (launched 2026-06-30) | No | Native Slides | No | "Match style of another deck" | Google Workspace | English only at launch | Workspace plan (price unverified) |
| Claude Slides | Built-in to Claude (beta 2026-09-16) | No | Exports PPTX/PDF | Share link | Weak template awareness (per review) | Comments | unverified | Pro/Max/Team plans |
| Chronicle | None found | No | PPTX on higher plans | Publish to web | Themes on Plus | Guest editor | unverified | Pro $12 annual / $15 monthly (third-party) |
| Genspark / Manus slides | Agent workspaces | No | PPTX + PDF; limited editing | Manus: deploy as site | Weak brand control (per competitor review) | unverified | unverified | Manus Pro $20 (vendor's own blog) |
| Slidev | Official agent skill | Yes, MIT | `pptx` = images; `pptx-editable` rebuilds shapes, some parts stay images | SPA build | Themes (npm) | Git | Any (author-side) | Free |
| Marp | Community skills | Yes, MIT | `--pptx-editable` experimental, needs LibreOffice, no notes | HTML | CSS themes | Git | Any | Free |
| reveal.js | Community skills | Yes, MIT | None native | HTML | Themes | Multiplex plugin | Any | Free |
| Quarto | No | Yes | Pandoc PPTX from reference template; layout mapping imperfect | reveal.js HTML | brand.yml (revealjs only) | Git | Any | Free |
| Spectacle | No | Yes, MIT | None | React app | Themes | Git | Any | Free |
| frontend-slides | Claude Code plugin / skill | Yes, MIT | None (HTML-first); reads PPTX in | Single HTML | 34 design systems | No | unverified | Free |
| Anthropic `pptx` skill | Skill | Source-available, not OSS | Native via pptxgenjs | No | None | No | — | Free with Claude |

## 3. Per-competitor notes

### Hosted AI deck apps

**Gamma.** Prompt → "cards" → present, publish as site, or export. Free: 400 one-time credits, up to 10 slides per prompt, Gamma badge. Paid tiers Plus, Pro, Ultra, plus team plans. Credits: Plus 1,500/mo, Pro 4,000, Ultra 20,000 ([help center](https://help.gamma.app/en/articles/8077107-gamma-pricing)). Analytics, custom domains, password protection and API sit on Pro and Ultra; custom fonts only on Ultra. Exact prices: the pricing page returned 403 to me; third-party figures are Plus $12 / Pro $25 / Ultra $100 monthly ([Presentations.ai](https://www.presentations.ai/blog/gamma-pricing)) — **unverified**. Exports: PDF, PNG, PPTX; Google Slides only via PPTX upload; no HTML export; no slide master in PPTX ([export help](https://help.gamma.app/en/articles/8022861-how-do-i-export-my-gamma)). Official hosted MCP with 18 tools, including `edit_gamma`, `read_gamma`, `get_gamma_outline` and engagement analytics ([MCP docs](https://developers.gamma.app/docs/gamma-mcp-server)). Complaints: PPTX text split into line-by-line boxes, tables become loose text boxes, fonts swapped, Hebrew RTL reversed, 150-slide export limit ([ideas board](https://ideas.gamma.app/ideas/p/improve-powerpoint-and-google-slides-export-quality), [RTL bug](https://ideas.gamma.app/ideas/p/pptx-export-bug-hebrew-rtl-text-renders-incorrectly)). Users ask for HTML export to self-host for legal and data-sovereignty reasons ([idea](https://ideas.gamma.app/ideas/p/export-website-to-html)), offline use, and better version history. Trustpilot 1.5/5 per a competitor's review — **unverified** ([Zemith](https://www.zemith.com/en/learn/gamma-review)).

**Beautiful.ai.** Smart-slide layout engine that auto-arranges content. No free plan; 14-day trial with card. Pro $14.50/mo annual, Team $40/user/mo annual (read on vendor page 2026-10-28 by [Dupple](https://dupple.com/learn/beautiful-ai-pricing)). Pro has version history and viewer analytics; Team has shared slide library and custom theme. Complaints: rigid layouts, "limited customization" is G2's top con, PPTX export needs cleanup ([Capterra](https://www.capterra.com/p/171959/Beautiful-AI/reviews/), [Techreviewer](https://techreviewer.co/products/beautiful-ai)). No MCP found.

**Pitch.** Collaborative deck editor for teams. Free plan: unlimited presentations, up to 5 members, AI credits ([pitch.com/pro](https://pitch.com/pro)). Paid tiers renamed Plus / Team / Business; Plus ~$10 annual / $12 monthly ([xpay, read 2026-05-06](https://www.xpay.sh/saas-pricing/pitch/)) — **unverified on vendor page**. Viewer analytics, PPTX export, version history on paid tiers. Complaints: limited features and customization; PPTX export "not always seamless" ([G2](https://g2.com/products/pitch-pitch/reviews), [OMR](https://omr.com/en/reviews/product/pitch/all)).

**Tome.** Dead as a slide tool. Shut on 2025-04-30 and deleted user content; the team now builds Lightfield, an AI CRM ([ChatSlide](https://www.chatslide.ai/articles/tome-ai-shut-down-what-happened), [Sacra](https://sacra.com/chat/h/86a38577-a643-49cd-95e5-8fb8429df303/)). Lesson: ~20M users did not make a horizontal slide app a business. Dropped from the table detail.

**Plus AI.** Add-in for Google Slides and PowerPoint, plus web app. 7-day trial with 1,000 credits; Basic $10/user/mo annual or $15 monthly, 1,500 credits ([plusai.com/pricing](https://plusai.com/pricing)). Higher tier prices **unverified**. Strength: output is native to the host app, so no export loss.

**SlideSpeak.** Document-to-PPTX generator with REST API and official MCP server (`mcp.slidespeak.co`, or Docker). API: $49 for 1,000 credits, 1 credit per slide ([API pricing](https://slidespeak.co/api-pricing)). Promotes a "Brand MCP" for on-brand slides in Claude. MCP repo has 14 stars.

**Presenton.** Open-source (Apache-2.0) Gamma alternative. Docker or Electron; any LLM incl. Ollama; API that takes PDF, TXT, PPTX, DOCX; exports PPTX and PDF; builds custom templates from your existing slides; built-in MCP ([GitHub](https://github.com/presenton/presenton)). 12.0k stars, pushed 2026-11-22. Closest open-source rival on the "generate a deck" job.

**Alai.** AI deck app with Google Slides add-on, public API, PPTX import/export. Free 300 credits, 10 slides per prompt, watermark. Plus $16 annual / $20 monthly, Pro $30, Ultra $80 ([TechYorker, read 2026-10-08](https://techyorker.com/products/alai/)) — credit amounts conflict across sources.

**Decktopus.** Template-driven AI decks. Pro $9.99/mo annual, $24.99 monthly; Business $19.99/seat annual; no refunds ([AI Academy, 2026-11-16](https://academy.techpresso.co/reviews/is-decktopus-worth-it)). G2 4.3. Small player; low relevance.

**Prezi AI.** Zoom-canvas presentations. Standard $7, Plus $19, Premium $29, Teams $39/user (annual) ([Costbench, 2026-11-04](https://costbench.com/software/ai-presentations/prezi/)). Plus has voice-over and video; Teams has brand kit, live audience engagement and viewer analytics ([Prezi support](https://support.prezi.com/hc/en-us/articles/360003478934)).

**Canva (Presentations, Magic Design, Canva AI).** General design suite. Pro $144/yr, Business $250/user/yr ([Piktochart, 2026-11-04](https://piktochart.com/blog/canva-pricing-2026-costs-raised/)). Official MCP server: generate designs (default 1–5 slides), search, export, merge decks, import PDF from a link ([Canva help](https://canva.com/help/mcp-canva-usage), [canva.dev](https://www.canva.dev/solutions/mcp/)). Brand Kit, real-time collaboration. PPTX export problems: fonts, split text boxes, grouped elements as images ([SlideModel](https://slidemodel.com/export-canva-to-powerpoint/)). Few first-hand Canva complaints found — **unverified**.

**Microsoft Copilot in PowerPoint.** Agent Mode GA on 2026-04-22 ([Microsoft blog](https://microsoft.com/en-us/microsoft-365/blog/2026/04/22/copilots-agentic-capabilities-in-word-excel-and-powerpoint-are-generally-available/)). Builds decks from org files, mail, meetings (Work IQ); Brand Kit and org templates. Complaints: uses only one layout from a custom template, ignores master slides, generic images ([Microsoft Q&A](https://learn.microsoft.com/en-us/answers/a/12080966), [Tech Community](https://techcommunity.microsoft.com/discussions/microsoft365copilot/powerpoint-company-branding/4072079)). Microsoft's own doc says weak templates give generic output ([support](https://support.microsoft.com/en-US/PowerPoint/copilot/keep-your-presentation-on-brand-with-copilot)).

**Gemini in Google Slides.** Full multi-slide generation launched 2026-06-30: ground in Drive files, match another deck's style, approve an outline first, native editable slides. English only at launch ([Workspace Updates](https://workspaceupdates.googleblog.com/2026/06/create-fully-native-and-editable-presentations-with-Gemini-in-Google-Slides.html)).

**Claude Slides (Anthropic).** Beta from 2026-09-16 on Pro/Max/Team. Edit slides in the conversation, comment on elements, present in Claude, export PPTX or PDF. Separate Claude for PowerPoint add-in reads slide masters. Review says the canvas tool is weak at template awareness; add-in has no undo or history ([eesel, 2026-09-21](https://www.eesel.ai/blog/claude-slides)). Anthropic's `pptx` skill (pptxgenjs + visual QA) is the most installed slide skill ([deckary](https://deckary.com/blog/claude-powerpoint-skills)). This is the most direct threat to us in Claude users' hands.

**Chronicle.** "Cursor for slides" narrative decks. Free: unlimited docs, publish to web, PDF export. Pro $12 annual / $15 monthly ([Toolradar, 2026-11-14](https://toolradar.com/tools/chronicle-2-0)). PPTX export only on higher plans — **unverified**.

**Genspark / Manus slides.** General agent workspaces that research a topic, cite sources, and build slides. Weak in-place editing; you prompt or download PPTX ([SlideSpeak test](https://slidespeak.co/blog/2025/06/20/5-alternatives-to-manus-slides/), [Genspark blog](https://www.genspark.ai/blog/gen-1-slides)). Manus status (Meta-owned or independent) is **unverified**. Kimi slides: no reliable source found — **unverified**.

### Developer and markdown tools

**Slidev** (49.6k stars, MIT, pushed 2026-11-05). Markdown + Vue for developers. Presenter mode, phone remote, synced drawing, built-in camera and screen recording, Mermaid, LaTeX, Magic Move. Exports PDF, PNG, MD, PPTX (images), and `pptx-editable`, which rebuilds slides as shapes and prints why a slide fell back to an image ([sli.dev exporting](https://sli.dev/guide/exporting)). Has an official agent skill. Closest developer-tool rival on editable PPTX now.

**Marp** (marp-cli 3.9k stars, MIT). Markdown → HTML/PDF/PPTX. `--pptx-editable` is experimental, needs LibreOffice, drops presenter notes, and the README says not to use it when appearance matters ([README](https://raw.githubusercontent.com/marp-team/marp-cli/main/README.md)).

**reveal.js** (72.6k stars, MIT). HTML framework. Speaker view, scroll view (v5), multiplex plugin for audience devices ([multiplex](https://revealjs.com/multiplex/)). No PPTX.

**Quarto** (quarto-cli 6.2k stars). One source to revealjs, pptx and beamer. PPTX uses a reference template; complex layouts do not map ([Quarto docs](https://quarto.org/docs/presentations/), [Posit forum](https://forum.posit.co/t/tips-and-tricks-for-presentations-that-are-both-reveal-js-and-powerpoint/174556)).

**Spectacle** (10.2k stars, MIT, pushed 2026-11-15). React deck library, now under NearForm. Still alive; low overlap with us.

**frontend-slides** (32.8k stars, MIT, pushed 2026-06-23). Agent skill: style previews → single HTML file; reads PPTX in; 34 design systems ([GitHub](https://github.com/zarazhangrui/frontend-slides)). No PPTX out, no schema, no audit.

### Agent-native slide MCP servers (GitHub search, 2026-11-23)

- Hosted vendor MCPs: Gamma, Canva, SlideSpeak (above).
- `matteoantoci/google-slides-mcp` — 191 stars; edits Google Slides directly.
- `GongRzhe/Office-PowerPoint-MCP-Server` — 1.9k stars, **archived**.
- Small or new: `Whatsonyourmind/deckforge` (PPTX + Google Slides, 7 stars), Figma Slides MCPs (`luan007`, `Guiqft`), `epicweb-dev/slides-mcp` (Slides.com).
- Skills: Anthropic `pptx`, OpenAI `slides`, Slidev official skill, 2Slides skills.

## 4. Ranked improvement ideas

Cheapest high-impact first. "Fit" = fits an agent-first, open-source tool.

1. **Export fidelity report per PPTX.** What: after `export_deck`, return a list per slide of anything that became an image, a substituted font, or a text box that may overflow. Why: Slidev already prints per-slide fallback reasons ([sli.dev](https://sli.dev/guide/exporting)); Gamma users say exports silently break ([ideas board](https://ideas.gamma.app/ideas/p/improve-powerpoint-and-google-slides-export-quality)). The agent can then fix the slide before the human sees it. Size: S. Fit: yes — it is structured output for the agent.

2. **"Google Slides safe" font mode.** What: an export flag that maps each theme font to a Google Fonts family Google Slides has, and warns when it cannot. Why: Gamma's own help says Google Slides ignores embedded PPTX fonts and swaps them ([Gamma export help](https://help.gamma.app/en/articles/8022861-how-do-i-export-my-gamma)); font swaps are the top Canva export issue ([SlideModel](https://slidemodel.com/export-canva-to-powerpoint/)). Size: S. Fit: yes.

3. **Public PPTX fidelity scorecard.** What: a CI job that exports every layout × theme, renders the PPTX in LibreOffice, diffs it against the HTML render, and publishes the score on the gallery. Why: broken PPTX is the most repeated complaint for Gamma, Beautiful.ai, Canva and Pitch ([Gamma](https://ideas.gamma.app/ideas/p/text-exports-to-powerpoint-as-line-by-line-instead-of-one-big-text-box), [Techreviewer on Beautiful.ai](https://techreviewer.co/products/beautiful-ai), [OMR on Pitch](https://omr.com/en/reviews/product/pitch/all)). Proof beats claims. Size: M. Fit: yes — only an open-source tool can show this openly.

4. **RTL proof for Hebrew and Persian in PPTX.** What: add `he` and `fa` fixtures, verify paragraph direction and mirrored layouts in PowerPoint, show them in the gallery. Why: Gamma has an open Hebrew RTL PPTX bug ([idea](https://ideas.gamma.app/ideas/p/pptx-export-bug-hebrew-rtl-text-renders-incorrectly)); Gemini in Slides launched English-only ([Workspace](https://workspaceupdates.googleblog.com/2026/06/create-fully-native-and-editable-presentations-with-Gemini-in-Google-Slides.html)). We already have Arabic RTL. Size: S. Fit: yes.

5. **Market self-hosted HTML as a feature.** What: a docs page and landing section: "one HTML file, host it on your own server, no vendor account". Why: Gamma users ask for HTML export to host on internal infrastructure for legal and data-sovereignty reasons, and Gamma says it cannot ([idea](https://ideas.gamma.app/ideas/p/export-website-to-html)). We already do this. Size: S. Fit: yes.

6. **Slide-level edit tools in MCP.** What: `get_outline`, `read_slide`, `patch_slide` (JSON Patch on one slide), `reorder_slides`. Why: Gamma's MCP exposes `read_gamma`, `get_gamma_outline`, `edit_gamma` ([MCP docs](https://developers.gamma.app/docs/gamma-mcp-server)); Claude's file route has no versioning — every change regenerates the file ([eesel](https://www.eesel.ai/blog/claude-slides)). Deck JSON makes surgical edits cheap for us. Size: S–M. Fit: yes, core to the agent path.

7. **Sources and citations per slide.** What: an optional `sources` field per slide that renders as footnotes in HTML and as notes or a footer in PPTX; audit flags numbers with no source. Why: Genspark and Manus sell "researched, cited" decks ([Genspark](https://www.genspark.ai/blog/gen-1-slides)); Copilot output can drop qualifiers on numbers ([SlideGenius](https://www.slidegenius.com/blog/copilot/copilot-powerpoint-limitations)). Size: S. Fit: yes — the agent already has the sources.

8. **Theme from an existing .pptx template.** What: extend `import_brand_theme` to read a corporate PPTX master (colours, fonts, logo, layouts) and emit a theme package. Why: Copilot users say it ignores their template layouts ([Microsoft Q&A](https://learn.microsoft.com/en-us/answers/a/12080966)); Claude's add-in wins reviews by reading the slide master ([eesel](https://www.eesel.ai/blog/claude-slides)); Presenton builds templates from existing slides ([GitHub](https://github.com/presenton/presenton)). Size: M. Fit: yes.

9. **Import from PDF, DOCX and URL.** What: `import_document` that turns a PDF, Word file or web page into an outline Deck JSON. Why: Presenton's API takes PDF/DOCX/PPTX; Canva MCP imports PDFs; Gemini grounds decks in Drive files ([Presenton](https://github.com/presenton/presenton), [Canva](https://canva.com/help/mcp-canva-usage), [Workspace](https://workspaceupdates.googleblog.com/2026/06/create-fully-native-and-editable-presentations-with-Gemini-in-Google-Slides.html)). Note: coding agents can often read these files themselves, so start with a thin wrapper. Size: M. Fit: yes.

10. **Hosted remote MCP endpoint.** What: a stateless HTTP MCP endpoint (render, export, audit, share) so Claude.ai, ChatGPT and other web clients can connect with no local install. Why: Gamma, Canva and SlideSpeak all ship hosted MCPs and live inside Claude/ChatGPT connector lists ([Gamma](https://developers.gamma.app/docs/gamma-mcp-server), [Canva](https://www.canva.dev/solutions/mcp/), [SlideSpeak](https://slidespeak.co/slidespeak-api)). Our install path only covers local coding agents. Size: M. Fit: yes, but adds hosting cost; keep it optional and self-hostable.

11. **Comments on share links.** What: reviewers leave comments pinned to a slide in Studio; the agent reads them through an MCP tool and applies fixes. Why: Claude Slides has element comments ([eesel](https://www.eesel.ai/blog/claude-slides)); Gamma's MCP reads comments ([MCP docs](https://developers.gamma.app/docs/gamma-mcp-server)); Pitch's core pitch is team collaboration ([G2](https://g2.com/products/pitch-pitch/reviews)). Size: M–L (needs storage). Fit: partly — real-time co-editing is out of scope; async comments that feed the agent fit well.

12. **Opt-in viewer analytics for share links.** What: per-slide view time on Studio share links, off by default, with a webhook so self-hosters keep the data. Why: Pitch, Beautiful.ai Pro, Gamma Pro and Prezi Teams all sell viewer analytics ([Beautiful.ai via Dupple](https://dupple.com/learn/beautiful-ai-pricing), [Gamma help](https://help.gamma.app/en/articles/8077107-gamma-pricing), [Prezi](https://costbench.com/software/ai-presentations/prezi/)). Size: M. Fit: partly — privacy needs care in an open-source tool.

13. **Image slot with agent-side generation.** What: an `imagePrompt` field the agent fills; the MCP returns slots that need images so the agent calls its own image tool, with alt text required. Why: Gamma (`generate_image` tool), Manus and Copilot generate images in the deck ([Gamma MCP](https://developers.gamma.app/docs/gamma-mcp-server), [Copilot](https://support.microsoft.com/en-us/office/create-a-new-presentation-with-copilot-in-powerpoint-3222ee03-f5a4-4d27-8642-9c387ab4854d)). We should not bundle a paid image model. Size: S–M. Fit: yes, if we stay model-neutral.

14. **Phone remote and audience view.** What: present mode where a phone controls the deck and the audience follows on their own device. Why: Slidev has phone remote and synced drawing; reveal.js has multiplex ([sli.dev](https://sli.dev/guide/exporting), [reveal.js](https://revealjs.com/multiplex/)). Size: M. Fit: yes, but lower priority for agent users.

15. **Recorded talk / video export.** What: export the deck with speaker notes as narration (TTS) to MP4. Why: Prezi Plus has voice-over; Slidev records screen and camera ([Prezi support](https://support.prezi.com/hc/en-us/articles/360003478934)). Size: L. Fit: partly — useful for async updates, large scope.

## 5. Sources

All read 2026-11-23 (via search snippets or direct fetch). Dates in brackets are when the source itself says it read the vendor page.

- Gamma: https://help.gamma.app/en/articles/8077107-gamma-pricing · https://help.gamma.app/en/articles/8022861-how-do-i-export-my-gamma · https://developers.gamma.app/docs/gamma-mcp-server · https://gamma.app/integrations/claude · https://ideas.gamma.app/ideas/p/improve-powerpoint-and-google-slides-export-quality · https://ideas.gamma.app/ideas/p/text-exports-to-powerpoint-as-line-by-line-instead-of-one-big-text-box · https://ideas.gamma.app/ideas/p/pptx-export-bug-hebrew-rtl-text-renders-incorrectly · https://ideas.gamma.app/ideas/p/export-website-to-html · https://ideas.gamma.app/ideas/p/improve-version-history · https://ideas.gamma.app/ideas/p/have-an-app-that-supports-offline-editing · https://www.presentations.ai/blog/gamma-pricing · https://www.withorb.com/pricing-atlas/gamma [2026-10-19] · https://www.zemith.com/en/learn/gamma-review
- Beautiful.ai: https://dupple.com/learn/beautiful-ai-pricing [2026-10-28] · https://www.capterra.com/p/171959/Beautiful-AI/reviews/ · https://techreviewer.co/products/beautiful-ai · https://fast.io/resources/beautiful-ai-review-2026/
- Pitch: https://pitch.com/pro · https://www.xpay.sh/saas-pricing/pitch/ [2026-05-06] · https://g2.com/products/pitch-pitch/reviews · https://omr.com/en/reviews/product/pitch/all
- Tome: https://www.chatslide.ai/articles/tome-ai-shut-down-what-happened · https://sacra.com/chat/h/86a38577-a643-49cd-95e5-8fb8429df303/
- Plus AI: https://plusai.com/pricing · https://techyorker.com/products/plus-ai/
- SlideSpeak: https://slidespeak.co/api-pricing · https://slidespeak.co/slidespeak-api · https://github.com/SlideSpeak/slidespeak-mcp
- Presenton: https://github.com/presenton/presenton · https://www.producthunt.com/products/presenton-data-presentations/launches
- Alai: https://getalai.com/pricing · https://techyorker.com/products/alai/ [2026-10-08]
- Decktopus: https://academy.techpresso.co/reviews/is-decktopus-worth-it [2026-10-30] · https://www.g2.com/products/decktopus/pricing
- Prezi: https://costbench.com/software/ai-presentations/prezi/ [2026-11-04] · https://support.prezi.com/hc/en-us/articles/360003478934 · https://prezi.com/blog/ai-presentation-maker-pricing-comparison-2026/
- Canva: https://canva.com/help/mcp-canva-usage · https://www.canva.dev/solutions/mcp/ · https://piktochart.com/blog/canva-pricing-2026-costs-raised/ [2026-11-04] · https://slidemodel.com/export-canva-to-powerpoint/
- Microsoft Copilot: https://microsoft.com/en-us/microsoft-365/blog/2026/04/22/copilots-agentic-capabilities-in-word-excel-and-powerpoint-are-generally-available/ · https://support.microsoft.com/en-us/office/create-a-new-presentation-with-copilot-in-powerpoint-3222ee03-f5a4-4d27-8642-9c387ab4854d · https://support.microsoft.com/en-US/PowerPoint/copilot/keep-your-presentation-on-brand-with-copilot · https://learn.microsoft.com/en-us/answers/a/12080966 · https://techcommunity.microsoft.com/discussions/microsoft365copilot/powerpoint-company-branding/4072079 · https://www.slidegenius.com/blog/copilot/copilot-powerpoint-limitations
- Google Slides + Gemini: https://workspaceupdates.googleblog.com/2026/06/create-fully-native-and-editable-presentations-with-Gemini-in-Google-Slides.html · https://support.google.com/docs/answer/17111393?hl=en
- Claude Slides / skills: https://www.eesel.ai/blog/claude-slides [article 2026-09-21] · https://deckary.com/blog/claude-powerpoint-skills · https://claudemarketplaces.com/skills/anthropics/skills/pptx
- Chronicle: https://toolradar.com/tools/chronicle-2-0 [2026-11-14] · https://www.presentations.ai/blog/chronicle-pricing
- Genspark / Manus: https://www.genspark.ai/blog/gen-1-slides · https://www.manus.im/blog/best-ai-presentation-makers · https://slidespeak.co/blog/2025/06/20/5-alternatives-to-manus-slides/
- Slidev: https://sli.dev/guide/exporting · https://github.com/slidevjs/slidev
- Marp: https://raw.githubusercontent.com/marp-team/marp-cli/main/README.md
- reveal.js: https://revealjs.com/multiplex/ · https://github.com/hakimel/reveal.js/releases/tag/5.0.0
- Quarto: https://quarto.org/docs/presentations/ · https://forum.posit.co/t/tips-and-tricks-for-presentations-that-are-both-reveal-js-and-powerpoint/174556
- Spectacle: https://commerce.nearform.com/open-source/spectacle/
- frontend-slides: https://github.com/zarazhangrui/frontend-slides
- GitHub star counts and push dates: GitHub REST API via `gh api repos/<owner>/<repo>`, 2026-11-23. MCP repo list: `gh search repos "slides mcp"`, 2026-11-23.
- AI-slide "generic look" discussion: https://moda.app/blog/ai-slide-tools-generic-output · https://www.producthunt.com/p/sewpoint/why-do-ai-generated-slides-still-feel-worse-than-ai-generated-web-pages

## Could not verify

- Gamma's exact plan prices (pricing page returned HTTP 403); third-party figures disagree.
- Pitch's current paid tier prices on its own page; Plus/Team/Business naming is from Pitch's /pro page, prices from xpay.
- Plus AI tiers above Basic; Chronicle Plus and Max prices; Alai credit amounts.
- Microsoft 365 Copilot and Google Workspace AI prices (not researched in depth).
- Gamma Trustpilot score (from a competitor's page).
- RTL and language support for most competitors.
- Kimi slides agent; Manus corporate status.
- No first-hand Reddit or Hacker News threads surfaced in search; complaints come from vendor idea boards, G2, Capterra, Microsoft forums and review sites. Several review sites sell competing tools, so treat their criticism as biased.
- Our own feature gaps (no comments, no viewer analytics, no image generation) are from a quick grep of `packages/studio/src` and `packages/mcp-server/src`, not a full audit.
