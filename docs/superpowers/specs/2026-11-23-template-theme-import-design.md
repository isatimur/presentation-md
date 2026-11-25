# Theme from a PowerPoint template

*   **Author:** isatimur
*   **Status:** Approved for implementation (revision 3, after the EGM review and
    its re-audit, 2026-11-23)
*   **Date:** 2026-11-23
*   **Review:** [consolidated report](../reviews/2026-11-23-template-theme-import/consolidated_review_report.md),
    [re-audit](../reviews/2026-11-23-template-theme-import/reaudit_report.md)

--------------------------------------------------------------------------------

## Overview

Companies keep their brand in a PowerPoint template: a `.pptx` or `.potx`
file whose theme part holds the brand colours and fonts. presentation-md can
build a theme from a website URL or a CSS file (`import_brand_theme`), but not
from that template. This design adds a third source to the same tool: the
template file. The result is the same theme package format, so the theme
schema, the renderers, Studio and the PPTX writer do not change. Font output
for URL and CSS sources does change; see "Fonts".

Revision 1 also drew a logo on every slide, sampled the master's shape fills,
and carried template script fonts. The review found 5 of its 6 Blockers and
both security findings in those three add-ons. Revisions 2 and 3 leave them
out and say what evidence would bring each one back.

The idea is item 8 of
[the competitor research](../../research/competitors-2026-11.md), which lists
"colours, fonts, logo, layouts". This design delivers colours and fonts, and
reports logo metadata. Logo drawing and layouts stay open.

## Glossary

*   **presentation-md**: this repository. It turns a deck JSON file into an
    HTML deck and an editable PPTX file.
*   **Theme package**: a folder with `theme.json` (8 colour roles, two font
    stacks, Google Fonts specs, geometry), `package.json`, `pyproject.toml`
    and a README. `import_brand_theme` with `write: true` writes one.
*   **Base theme**: `claude` (light) or `default-tech` (dark). An imported
    theme `extends` one of them, chosen from its background colour by
    `pickExtendsFromBg`.
*   **Contrast pass**: `ensureContrastSafe` in core. It adjusts colours until
    text pairs meet WCAG AA and reports any pair that still fails.
*   **Studio**: the browser editor in `packages/studio`. It loads bundled
    themes at build time. Its "Paste Brand" panel builds a theme from pasted
    CSS.
*   **MCP server**: `packages/mcp-server`, the tool server agents call (16
    tool files in `src/tools` on 2026-11-23).
*   **Skill**: `packages/core/SKILL.md`, the instructions that tell an agent
    when to call which tool. `pnpm sync:skill` copies it to
    `skills/presentation-generator`.
*   **PPTX scorecard**: [`pnpm scorecard`](../../pptx-scorecard.md). It
    exports every layout in every theme and checks that text, notes, charts
    and tables stay editable. CI runs it with `--check`.

## The Problem

A user whose company has a brand template has three workarounds, each with a
defect:

1.  Pick the closest of the 75 bundled themes. The colours and fonts are
    wrong.
2.  Point `import_brand_theme` at the company website. A website palette can
    differ from the slide template's palette, and some sites need a headless
    browser to read.
3.  Write a theme manifest by hand. The manifest needs 8 roles (`bg`, `bg2`,
    `text`, `muted`, `accent`, `accent2`, `cardBg`, `border`), which a user
    must learn first.

The template already holds the colours and fonts. Every `.pptx` and `.potx`
has a theme part with a colour scheme (`dk1`, `lt1`, `dk2`, `lt2`,
`accent1`–`accent6`, `hlink`, `folHlink`) and a font scheme (heading and body
fonts). The slide master's colour map (`p:clrMap`) says which scheme colours
are background and text. The code does not read any of this today:
`import_pptx` (`packages/export/src/import/extract.ts`) reads slide content
only.

The review also found a defect in every create-theme source:
`buildThemeViewFromBrand` (`packages/create-theme/src/theme-view.ts`) writes
every font into `googleFonts`, even fonts Google Fonts does not have, and the
font stack falls back straight to `system-ui`.

## Goals

*   A user or agent gives a `.pptx` or `.potx` path and gets a theme in one
    MCP call (`import_brand_theme` with `pptxPath`) or one CLI command
    (`create-presentation-md-theme --from-pptx <file>`).
*   `bg`, `text`, `accent` and, when the template has distinct values, `bg2`
    and `accent2` come from the template's colour scheme, resolved through the
    master's `clrMap`. `muted`, `cardBg` and `border` are derived from those,
    as for URL and CSS sources today.
*   Each colour taken from the template keeps its hex value unless the
    contrast pass changes it. The response lists each change in
    `contrastAdjustments` and each pair that still fails in
    `contrastStillFailing`, as today.
*   A scheme that matches one of the three Office accent tables is reported as
    `source: "office-default"`, and the theme is not written unless the
    caller passes `allowOfficeDefault` (MCP) or `--allow-office-default`
    (CLI).
*   Fonts, for the URL, CSS and template sources: the brand family stays first
    in the font stack, then the base theme's fallback. A family goes into
    `googleFonts` only when Google Fonts has it. The response classifies each
    family as `google`, `office` or `unavailable`.
*   The response reports logo metadata (found, type, corner, width, size)
    without the image bytes, so a user or maintainer can see whether a
    template has a usable logo.
*   The theme schema, the renderers, Studio and the PPTX writer do not
    change.
*   When the user says "use our template", "match our PowerPoint" or gives a
    `.potx`, the skill sends the agent to `import_brand_theme` with
    `pptxPath` before it picks a bundled theme. The agent then tells the user
    the `source`, the font classes and the contrast changes.
*   Hostile or broken files fail with an error that names the cause (size
    limit, entry limit, DOCTYPE, missing master or theme, path outside the
    working directory).

## Non-Goals

*   **Drawing a logo** on slides. See Future Improvements.
*   **Sampling the master's shape fills** when the scheme is an Office
    default. See Future Improvements.
*   **Template script fonts** (East Asian and complex-script). The PPTX export
    keeps its Office defaults (`packages/export/src/script-fonts.ts`); the
    import warns when the template names its own.
*   **Studio's Paste Brand.** `packages/studio/src/brand/pasteBrandTheme.ts`
    has the same `googleFonts` defect and keeps it in v1. See Future
    Improvements.
*   **Template layouts.** The 18 presentation-md layouts stay fixed.
*   **Writing the PPTX onto the user's master.**
*   **Font files.** No font is embedded or uploaded.
*   **Google Slides themes and Keynote files.**
*   **Template upload in Studio.**

## Decisions

| Date | Decision | Basis |
|------|----------|-------|
| 2026-11-23 | Extend `import_brand_theme`; no new tool. | A separate `import_pptx_theme` sits one word from `import_pptx`, which imports slide content from the same file type. |
| 2026-11-23 | v1 reads colours and fonts and reports logo metadata. Logo drawing, master-fill sampling and script fonts are deferred. | These three add-ons carried 5 of the 6 review Blockers and both security findings. |
| 2026-11-23 | Classify Google fonts against a bundled family list refreshed by `pnpm fonts:update`, not a live API call. | Works offline and in CI. |
| 2026-11-23 | Skill Doctor is optional, not a release check. | Its grader is a model, and the transcripts go to that model's provider. |
| 2026-11-23 | `@presentation-md/create-theme` depends on `@presentation-md/export` and imports only its `/import` entry. | The template reader lives there. CLI installs also download `pptxgenjs`, which the `/import` entry never loads. |

## Open Questions

None that block the build. Two facts are checked during implementation and
written into the files named:

*   The Office accent tables (below) are checked against one blank template
    saved by PowerPoint 365. The result goes in the comment above the tables
    in `template-brand.ts`.
*   The two real templates for the manual check are recorded by URL and
    SHA-256 in `docs/research/template-import-check.md`, with the expected
    roles written before the import runs.

## Critical User Journeys (CUJs)

### CUJ 1: Agent builds an on-brand deck from a company template

*   **Given**: `brand/acme.potx` is in the working directory. Its colour scheme
    is custom, its fonts are "Source Sans 3" (on Google Fonts) and "Calibri"
    (an Office font), and the master has a PNG logo in the top-right corner.
*   **When**: The user asks for a deck "in our template". The agent calls
    `import_brand_theme` with `pptxPath: "brand/acme.potx"` and `write: true`,
    then renders a deck with the new theme `acme` and exports a PPTX.
*   **Then**: `source` is `"template-scheme"`. `bg`, `text` and `accent`
    equal the template's resolved scheme values (lower-case hex), except
    those listed in `contrastAdjustments`. `fonts` shows one `google` and one
    `office` row. `logo` is
    `{ found: true, mime: "image/png", corner: "top-right", … }`. The agent
    tells the user that Calibri shows only where it is installed. The theme
    name came from the file name.

### CUJ 2: Template that keeps the Office default colours

*   **Given**: A template whose colour scheme is Office 2013–2022 and whose
    master paints a navy band (the band is not read in v1).
*   **When**: The agent imports it with `write: true`.
*   **Then**: The call fails. The error message starts with
    `office-default:` and says the scheme is Office 2013–2022's, not the
    brand's. The skill tells the agent to ask the user for the brand colours
    or to try the company website (`url`). With `allowOfficeDefault: true`
    the theme is written.

### CUJ 3: Hostile or broken file

*   **Given**: A `.pptx` that is a ZIP bomb, has more than 2,000 entries, has
    a part with `<!DOCTYPE`, has no slide master or theme part, or sits
    outside the working directory.
*   **When**: The import runs.
*   **Then**: It fails with an error that names the cause. Nothing is
    written.

## Technical Plan (Architecture)

### Data flow

```text
 .pptx / .potx  (inside cwd; byte limits; template entry cap 2,000)
        │
        ▼
 packages/export/src/import/package-reader.ts   ← new, shared with extract.ts
   async open, byte and entry caps, refuses <!DOCTYPE, rels, content types
        │
        ▼
 packages/export/src/import/template-brand.ts   ← new
   presentation.xml → first master → its theme part
   ├─ theme:  a:clrScheme (name + 12 colours), a:fontScheme (latin, ea, cs)
   ├─ master: p:clrMap, top-level p:pic elements, p:sldSz
   └─ result: TemplateBrand
        │
        ▼
 packages/create-theme/src/template-candidates.ts  ← new adapter
   resolve bg1 / tx1 / bg2 through clrMap; pick accent and accent2
        │  BrandColorCandidates { bg, text, bg2?, accent, accent2? }
        ▼
 core mapPaletteToRoles()   ← existing; now uses bg2 / accent2 when given
 core ensureContrastSafe()  ← existing, unchanged
        │
        ▼
 packages/create-theme/src/fonts.ts  ← new; URL, CSS and template sources
   sanitize → classify google | office | unavailable → stacks, specs, rows
        │
        ▼
 extractBrand() result: palette, extends, fontPlan, source, logo, scheme, warnings
        │
        ▼
 buildThemeViewFromBrand() → buildThemeManifestJson() → scaffoldTheme()
        │
        ▼
 MCP response: theme, source, contrastAdjustments, contrastStillFailing,
               writtenTo, fonts, logo, scheme, warnings
```

### Reading the template

*   **Which theme.** `ppt/presentation.xml` lists the masters
    (`p:sldMasterIdLst`). Take the first one, then follow the master's
    relationship of type `…/theme` to its theme part. Do not assume
    `theme1.xml`.
*   **Colours.** Each scheme entry is `a:srgbClr@val` or `a:sysClr@lastClr`.
    Child transforms on scheme entries are ignored. The master's `p:clrMap`
    maps `bg1`, `tx1`, `bg2`, `tx2` to `lt1`, `dk1`, `lt2`, `dk2`. A dark
    template maps `bg1="dk1"`, so reading the map is what makes dark
    templates come out dark. Hex values are lower-case `#rrggbb` everywhere.
*   **Office default.** The scheme counts as an Office default when
    `accent1` equals the Office table's `accent1` and at least 5 of the 6
    accents match that table:

    | Label | accent1–accent6 |
    |-------|-----------------|
    | Office 2007–2010 | 4f81bd c0504d 9bbb59 8064a2 4bacc6 f79646 |
    | Office 2013–2022 | 4472c4 ed7d31 a5a5a5 ffc000 5b9bd5 70ad47 |
    | Office 2023+ | 156082 e97132 196b24 0f9ed5 a02b93 4ea72e |

    A template that changed `accent1` to its brand colour is not an Office
    default, even if the other accents are Office's.
*   **Other built-in schemes.** When `a:clrScheme@name` is one of
    PowerPoint's built-in scheme names (Office, Grayscale, Blue Warm, Blue,
    Blue II, Blue Green, Green, Green Yellow, Yellow, Yellow Orange, Orange,
    Orange Red, Red Orange, Red, Red Violet, Violet, Violet II, Median,
    Paper, Marquee, Slipstream, Aspect), the result is used, and the response
    carries the warning "The template uses PowerPoint's built-in colour
    scheme '<name>'. These may not be the brand colours." The tool does not
    refuse, because a company can keep a built-in scheme on purpose.
*   **Role choice** (in `template-candidates.ts`; every threshold has a test
    on each side of it):
    *   `bg` = resolved `bg1`; `text` = resolved `tx1`.
    *   `bg2` = resolved `bg2` when its contrast ratio against `bg` is at
        least 1.03 and at most 1.6. Otherwise it is left out and
        `mapPaletteToRoles` derives it, as today.
    *   A colour is **neutral** when its HSL saturation is below 12 (on the
        0–100 scale `rgbToHsl` returns).
    *   `accent` = the first of `accent1`…`accent6` that is not neutral and
        has a contrast ratio of at least 1.5 against `bg`. When none passes,
        `accent` = `accent1` and the warning "No saturated accent in the
        template; using accent1." is added.
    *   `accent2` = the next accent that passes the same test and has a
        contrast ratio of at least 1.2 against `accent`. When none passes, it
        is left out and `mapPaletteToRoles` sets it to `accent`, as today.
*   **Fonts.** `a:majorFont/a:latin@typeface` is the heading family,
    `a:minorFont/a:latin@typeface` the body family. An empty typeface counts
    as absent. When `a:minorFont/a:ea` or `a:cs` has a non-empty typeface,
    the warning "The template sets its own East Asian or complex-script font
    (<name>). PPTX export uses Office's default for the deck language." is
    added.
*   **Logo metadata.** Candidates are `p:pic` elements directly in the
    master's shape tree whose width is at most a quarter of the slide width
    (`p:sldSz@cx`). Group shapes are not searched; when the master has a
    `p:grpSp` that contains a picture, the warning "The master has a grouped
    picture; logo detection skips groups." is added. The candidate whose
    centre is nearest a slide corner wins (Euclidean distance; the first
    candidate wins a tie). The result is
    `{ found, mime, hasSvg, corner, widthPct, sizeBytes }`: `mime` is the
    content type of the `a:blip` image, `hasSvg` is true when an
    `asvg:svgBlip` extension is present, `widthPct` is rounded to one decimal
    place, and `sizeBytes` is the image part's declared uncompressed size.
    No image bytes are read or returned.

### Reading the file safely

*   `package-reader.ts` holds the ZIP open, the byte and entry checks, part
    reads, relationship parsing, `resolveRelTarget`, `asArray` and
    `relIdFromSldId`, all of which are closures or private helpers in
    `extract.ts` today. Both `extractPptx` and `extractTemplateBrand` use it.
*   It refuses any XML part that contains `<!DOCTYPE`, with the error
    "<part> contains a DOCTYPE; PowerPoint files never need one." The
    `fast-xml-parser` setup in `extract.ts` does not turn off DOCTYPE entity
    processing today, so this also stops DOCTYPE entity expansion in slide
    import.
*   Byte limits stay as they are (`MAX_COMPRESSED_BYTES` 64 MB for the file,
    `MAX_UNCOMPRESSED_BYTES` 50 MB total, `MAX_MEDIA_BYTES` 10 MB per media
    part). The compressed limit is the larger on purpose: it bounds the file
    read from disk, while the uncompressed limit bounds what is inflated.
*   The entry cap is per caller. Slide import keeps 200. Template import uses
    2,000, a chosen headroom for templates that ship sample slides, many
    layouts and media. A template with zero slides is valid.

### Fonts

Applies to the URL, CSS and template sources in create-theme.

*   **Sanitize.** A family name keeps only letters, digits, spaces, `.`, `_`
    and `-`. Family names come from untrusted XML and CSS and end up inside
    CSS quotes and JSON.
*   **Missing family.** A template role with no family, or a family that is
    empty after sanitizing, uses the base theme's family for that role and
    adds a warning that names the role. URL and CSS sources keep today's
    `Inter` fallback when no font is found.
*   **Classify.** `google` when the bundled Google Fonts list has the family
    (case-insensitive); `office` when `isOfficeFont` does (the `OFFICE_FONTS`
    set moves from `packages/export/src/fidelity.ts` to its own module, so
    both use one list); otherwise `unavailable`.
*   **Base values.** Read from the bundled base manifests
    (`@presentation-md/core/themes/claude` and `…/default-tech`) with
    `createRequire(import.meta.url)`. The **tail** of a base stack is every
    item after its first comma, verbatim. The base **spec** for a role is the
    base `googleFonts` entry whose family (text before `:`, `+` read as a
    space, case-insensitive) equals the first family of that role's base
    stack.
*   **Stack.** `'<Brand family>', '<Base family>', <tail>` when the brand
    family differs from the base family; the base stack unchanged when they
    are the same.
*   **googleFonts.** For each role, the brand spec when the family is
    `google` (`<Family with + for spaces>:wght@400;700` for heading,
    `…:wght@400;500` for body), else the base spec for that role, copied
    verbatim. Duplicates are removed, order kept.
*   **Effect.** With the default `font_mode`, a browser and PowerPoint both
    draw the brand font where it is installed. Where it is not, the browser
    draws the base theme's font and PowerPoint its own substitute.
*   **Output change for URL and CSS sources.** A non-Google family is no
    longer written into `googleFonts`, the stack gains the base family, and
    Google specs use `+` for spaces (as the bundled themes do).

### Tool and CLI

*   `import_brand_theme` gains `pptxPath` (must end in `.pptx` or `.potx`,
    resolved with `assertExistingPathInCwd`) and `allowOfficeDefault`
    (boolean, default false). Exactly one of `url`, `cssPath`, `pptxPath` is
    allowed: "Provide one of 'url', 'cssPath' or 'pptxPath'." and "Provide
    only one of 'url', 'cssPath' or 'pptxPath'."
*   `name` is optional for `pptxPath`. It comes from the file name
    (`Acme Brand.potx` → `acme-brand`) and goes through `validateThemeName`.
    When no valid name results (for example `2024 Brand.potx`, or a name
    with no Latin letters), the error is "Could not derive a valid theme
    name from '<file>'. Pass 'name' explicitly."
*   The response keeps `theme`, `source`, `contrastAdjustments`,
    `contrastStillFailing`, `writtenTo`. `source` gains `"template-scheme"`
    and `"office-default"`. New fields:
    *   `fonts`: rows `{ role: "heading" | "body", family, status: "google" | "office" | "unavailable", fallback }`, for every source.
    *   `warnings`: strings, for every source.
    *   `logo` and `scheme`: template only, `null` otherwise. `scheme` holds
        the 12 resolved scheme colours and the `clrMap`, so an agent can
        show the user what was read and re-map a role by editing the written
        `theme.json`.
*   **Office default.** `assertNotOfficeDefault(result, allow)` in
    create-theme throws, when `result.source === "office-default"` and
    `allow` is false: "office-default: The template uses <label> colours,
    not brand colours. Ask for the brand colours, try the company URL, or
    pass allowOfficeDefault." Both the MCP tool (when `write: true`) and the
    CLI (always, since the CLI always writes) call it before `scaffoldTheme`.
    The CLI prints the message to stderr and exits 1.
*   The CLI gains `--from-pptx <file>` (`.pptx` or `.potx`; otherwise
    "Error: --from-pptx must point to a .pptx or .potx file.") and
    `--allow-office-default`. The three source flags are exclusive: "Error:
    pass only one of --from-url, --from-css or --from-pptx." It prints
    fonts, adjustments, the logo line and warnings.

### Agent guidance

*   **Skill text.** `packages/core/SKILL.md` gains trigger words in its
    description ("company template", ".pptx or .potx template", "our brand
    slides") and one workflow rule: when the user has a template, call
    `import_brand_theme` with `pptxPath` before choosing a theme; on an
    `office-default:` error, ask for the brand colours or try the company
    URL; tell the user the `source`, which fonts are `office` or
    `unavailable`, and which colours the contrast pass changed, one sentence
    each.
*   **Tool description.** One sentence: "Prefer pptxPath when the user has a
    company PowerPoint template; it reads the template's colours and fonts
    and reports whether it has a logo."
*   **Acceptance.** Run the three CUJs as real agent sessions in a scratch
    project. Pass when, in CUJ 1 and 2, the transcript shows
    `import_brand_theme` with `pptxPath` before any `apply_theme`, and the
    agent's reply names the `source`, the font classes and (CUJ 2) the Office
    default. In CUJ 3, pass when the agent reports the error without retrying
    the same file. This is a manual release check, not CI.
*   **Skill Doctor** (Warp, `warpdotdev/common-skills`) may be run on those
    sessions as an extra signal. It is not a release check: its grader is a
    model, and running it sends transcript content to that model's provider
    unless the model runs locally.

## Risks & Mitigations

| Risk | Failure mode | Mitigation | Test |
|------|--------------|------------|------|
| Wrong accent picked | Neutral or near-background `accent1` becomes the accent. | Neutral and contrast filters; `scheme` in the response lets the agent re-map. | Template-candidates cases at each threshold. |
| Office blue written as a brand | Template keeps an Office scheme. | `office-default` refuses the write in MCP and CLI; skill rule. | CUJ 2; one case per Office table; `accent1`-only change is not a default. |
| Built-in non-Office scheme | Stock palette taken as brand. | Warning names the scheme. | Fixture with `name="Median"`. |
| Corporate font missing | HTML shows a fallback. | Brand font stays first; base family loads; `fonts` tells the agent. | Fonts cases: google, office, unavailable, empty after sanitizing. |
| Hostile file | ZIP bomb, too many entries, entity expansion, path escape. | Byte caps, entry caps, DOCTYPE refusal, cwd check. | CUJ 3 cases. |
| Real template rejected | Over 200 entries, zero slides. | Template cap 2,000; no slide requirement. | 300-entry and zero-slide fixtures. |
| Font name injection | `"` or `'` in a typeface breaks JSON or CSS. | Sanitizer. | Fixture with a quote in the typeface. |
| Demand absent | Effort spent on an unused feature. | v1 changes no renderer, schema or PPTX writer. Template results are recorded (see Future Improvements). | — |

## Alternatives Considered

### Alternative A: Do nothing; use the URL import

*   **Pros**: No code.
*   **Cons**: A website palette can differ from the slide palette, and the
    headless-browser fallback needs Playwright.
*   **Reason for Rejection**: When the template has a custom colour scheme,
    it holds the slide colours and fonts as exact values, and the ZIP reader
    and contrast pass already exist.

### Alternative B: Export onto the user's own master

*   **Pros**: The PPTX uses the user's own master and layouts.
*   **Cons**: pptxgenjs builds new files and cannot edit an existing one, so a
    second PPTX writer would be needed. The HTML deck would stop matching the
    PPTX, because HTML has no master. The 18 layouts would have to fit
    template placeholders whose boxes we do not control.
*   **Reason for Rejection**: It doubles the export engine and gives up
    rendering HTML and PPTX from the same theme and layouts.

### Alternative C: Rendered master images as slide backgrounds

*   **Pros**: Reproduces master decorations as images.
*   **Cons**: Needs LibreOffice or PowerPoint installed to render. Text
    contrast against a picture cannot be checked, and the user cannot
    recolour it.
*   **Reason for Rejection**: A native dependency, and contrast can no
    longer be checked.

### Alternative D: A vision model reads a screenshot

*   **Pros**: Works on any input.
*   **Cons**: Not deterministic; font names cannot be read reliably from
    pixels; the MCP server holds no model.
*   **Reason for Rejection**: A custom-scheme template holds exact values.
    The agent can still do this with its own model after an
    `office-default` result.

### Alternative E: Import the template's layouts

*   **Pros**: Matches the full research item.
*   **Cons**: Themes would carry geometry, and three renderers, the export,
    the craft audit and the scorecard are built around 18 fixed layouts.
*   **Reason for Rejection**: Needs its own design, after usage shows demand.

### Alternative F: Full scope in one PR (revision 1)

*   **Pros**: Logo, master fills and script fonts ship at once.
*   **Cons**: The review found 6 Blockers, 5 of them in these add-ons, and a
    theme-schema change that older validators reject. The list is in the
    [consolidated report](../reviews/2026-11-23-template-theme-import/consolidated_review_report.md).
*   **Reason for Rejection**: The cost lands before any evidence of demand.

### Alternative G: Agent confirms the role mapping before writing

*   **Pros**: A person or agent fixes a wrong accent before the theme exists.
*   **Cons**: Two calls instead of one for every import, including the
    common case where the mapping is right.
*   **Reason for Rejection**: v1 returns `scheme` with every template
    result, so the agent can re-map a role afterwards by editing the written
    `theme.json`. A confirm step can be added if recorded results show
    frequent wrong picks.

### Alternative H: A separate `import_pptx_theme` tool

*   **Pros**: A clean input schema.
*   **Cons**: Its name is one word from `import_pptx`, which takes the same
    file type and imports slide content.
*   **Reason for Rejection**: Agents could confuse the two; the three sources
    need only one source-specific option (`allowOfficeDefault`).

## Non-Functional Requirements

*   **Security.** See "Reading the file safely" and the font sanitizer. No
    logo bytes are read, and none enter a manifest, CSS or HTML.
*   **Performance.** Target: a template padded to 10 MB of media reads in
    under 500 ms on a laptop. The test asserts under 2 s, to leave room for
    slow CI runners.
*   **Compatibility and rollback.** The theme schema does not change, so a
    package written by the new version is expected to pass older validators;
    the Verification Plan checks this once with the last published
    `validate-theme`. The theme-package changes for URL and CSS sources are
    the font fixes. Rollback is a revert and a patch release.

## Future Improvements

Template results are recorded in `docs/research/template-import-check.md`
(one row per template: source, logo found, Office default, script-font
warning). Each item below names the condition that reopens it.

*   **Logo drawing.** *Reopen when:* at least 7 of the first 10 recorded
    templates have `logo.found` true. *Needs:* a carrier that does not
    collide with the `.slide::after` surface decoration
    (`packages/shared/surfaces.css`); full-value data-URI validation at
    render time in all three renderers; `brand` carried by core `loadTheme`,
    Studio `resolveTheme` and Python `_load_theme`; a stored aspect ratio; a
    bottom-corner reserve or top corners only; header narrowing in
    `renderHero`, `renderSection` and `renderTwoColumn`; handling of the
    `paintSlideChrome` wash and the attribution line; a schema version so
    older validators do not reject new packages.
*   **Master-fill sampling.** *Reopen when:* at least 3 of the first 10
    recorded templates are `office-default`. *Needs:* `a:schemeClr`
    resolution, colour transforms per ECMA-376, rules for every role.
*   **Template script fonts.** *Reopen when:* any recorded template gets the
    script-font warning. *Needs:* the same font in HTML stacks and PPTX
    slots.
*   **Studio Paste Brand fonts.** *Reopen when:* this design ships. *Needs:*
    a browser-safe copy of the font plan in
    `packages/studio/src/brand/pasteBrandTheme.ts`.
*   **Template layouts** (Alternative E). *Reopen when:* users ask for
    template layouts after using v1.
*   **Template upload in Studio.** *Reopen when:* a Studio user asks for it.
    The reader uses JSZip and `fast-xml-parser` and has no Node-only
    dependency.
*   **Share links for non-bundled themes.** A share link to a deck whose
    theme is not bundled renders with `default-tech` today. *Reopen when:*
    imported themes are shared.

## Additional Resources

*   [Competitor research, item 8](../../research/competitors-2026-11.md)
*   [PPTX scorecard](../../pptx-scorecard.md)
*   [Earlier PPTX import design](./2026-07-28-pptx-import-design.md), which
    named theme extraction as a follow-up
*   [Earlier brand import design](./2026-07-27-brand-import-design.md)
*   [Skill Doctor](https://www.warp.dev/skill-doctor)
*   ECMA-376 Part 1: DrawingML `a:clrScheme`, `a:fontScheme`; PresentationML
    `p:clrMap`, `p:sldMaster`, `p:sldSz`

--------------------------------------------------------------------------------

## Detailed Implementation Plan

One PR, five groups. Each group lands with its own tests and ends with
`pnpm --filter <package> build && pnpm --filter <package> test` for every
package it touched. The plan touches 49 files: 26 source and config, 12
tests and fixtures, 11 docs (READMEs, `EGM.md` files, both skill copies,
the research record, the changeset).

### Group 1: Reader (`@presentation-md/export`)

#### 1. `packages/export/src/import/package-reader.ts` (Create)

*   ```text
    openOoxmlPackage(bytes: Uint8Array | Buffer, opts: { maxEntries: number })
      : Promise<OoxmlPackage>
    OoxmlPackage {
      partNames(): string[]                       // non-directory entries, ZIP order
      readXml(path, opts?: { isArray?: string[] }): Promise<object | null>
      readBytes(path): Promise<Uint8Array | null> // media cap applies to ppt/media/*
      partSize(path): number | null               // declared uncompressed size
      rels(partPath): Promise<Map<id, { target, type, external }>>
                                                  // target already package-absolute
      contentType(path): string | null
      warnings: string[]
    }
    asArray, relIdFromSldId, resolveRelTarget     // moved from extract.ts, exported
    ```
*   `openOoxmlPackage` runs the size and entry checks over the central
    directory, then reads `[Content_Types].xml` eagerly. When it is missing,
    it adds "Missing [Content_Types].xml — continuing with filename
    heuristics." to `warnings`. `readXml` checks the decoded text for
    `<!DOCTYPE` before parsing and throws the DOCTYPE error; `readBytes`
    does not parse. A missing part returns `null`; external targets are
    ignored. Parser options stay `ignoreAttributes: false`,
    `attributeNamePrefix: "@_"`, `removeNSPrefix: true`, with `isArray` per
    call.

#### 2. `packages/export/src/import/extract.ts` (Modify)

*   Uses `openOoxmlPackage` with `maxEntries: MAX_ZIP_ENTRIES` (200). Keeps
    its current `isArray` list as a module constant and passes it on every
    `readXml`. Builds the slide-order fallback from `partNames()`. Copies
    `pkg.warnings` through `warn()`. The one behaviour change is the DOCTYPE
    refusal.

#### 3. `packages/export/src/import/zip-limits.ts` (Modify)

*   Adds `MAX_TEMPLATE_ZIP_ENTRIES = 2000`. `assertZipEntrySafe(opts)` gains
    `maxEntries?: number` (default `MAX_ZIP_ENTRIES`); its message becomes
    ``PPTX has too many entries (>${maxEntries})``. `package-reader` passes
    `maxEntries` at both call sites (the pre-scan and the per-chunk check).

#### 4. `packages/export/src/import/template-brand.ts` (Create)

*   `extractTemplateBrand(bytes: Uint8Array | Buffer, opts?: { fileName?: string }): Promise<TemplateBrand>`
    per "Reading the template". Opens the package with
    `maxEntries: MAX_TEMPLATE_ZIP_ENTRIES`. Reads master ids with
    `relIdFromSldId`. Holds the three Office tables with their labels, the
    built-in scheme names and the exact warning strings. Errors: "No slide
    master in <fileName>" and "No theme part for the first slide master in
    <fileName>", with "the template" when `fileName` is absent.

#### 5. `packages/export/src/import/types.ts` (Modify)

*   ```text
    TemplateBrand {
      scheme: { dk1, lt1, dk2, lt2, accent1..accent6, hlink, folHlink }  // "#rrggbb"
      schemeName: string
      clrMap: { bg1, tx1, bg2, tx2 }      // each "lt1" | "dk1" | "lt2" | "dk2"
      officeDefault: "Office 2007–2010" | "Office 2013–2022" | "Office 2023+" | null
      builtInName: string | null
      fonts: { heading?: string; body?: string; ea?: string; cs?: string }
      logo: { found: boolean; mime?: string; hasSvg?: boolean;
              corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
              widthPct?: number; sizeBytes?: number }
      warnings: string[]
    }
    ```

#### 6. `packages/export/src/office-fonts.ts` (Create)

*   `OFFICE_FONTS` moved here from `fidelity.ts` (same lower-cased set), plus
    `isOfficeFont(name)`.

#### 7. `packages/export/src/fidelity.ts` (Modify)

*   Imports `OFFICE_FONTS` from `office-fonts.ts`. No behaviour change.

#### 8. `packages/export/src/import/index.ts` (Modify)

*   Exports `extractTemplateBrand`, `TemplateBrand`, `isOfficeFont` and
    `MAX_TEMPLATE_ZIP_ENTRIES` from `@presentation-md/export/import`. This
    entry does not load pptxgenjs.

#### 9. `packages/export/test/fixtures/build-template.ts` (Create)

*   Builds `.potx`/`.pptx` bytes with JSZip: `[Content_Types].xml`,
    `presentation.xml` with `p:sldSz`, one or two masters, one theme each,
    optional pictures and group shapes, optional sample slides (count),
    optional padding media (bytes), optional extra entries (count), optional
    DOCTYPE part. Parameters: scheme hexes and name, `clrMap`, fonts
    (`latin`, `ea`, `cs`), pictures (mime, position, size, `svgBlip`). Other
    packages import it by relative path
    (`../../export/test/fixtures/build-template.ts`); `jszip` resolves from
    this file's package. No binary fixtures in git.

#### 10. `packages/export/test/template-brand.test.ts` (Create)

*   Custom scheme read exactly; `sysClr@lastClr`; dark `clrMap`; first of
    two masters; Office default for each table; not default when only
    `accent1` differs; default when one non-`accent1` accent differs; built-in
    name `"Median"` warning; empty `latin`; `ea` warning; logo top-right PNG;
    nearest-corner choice among two pictures; `widthPct` rounding;
    `svgBlip` sets `hasSvg`; picture wider than a quarter is not a
    candidate; grouped picture warning; missing master and missing theme
    errors with and without `fileName`; DOCTYPE in the theme part refused;
    300 entries and zero slides accepted; 2,001 entries refused; total over
    `MAX_UNCOMPRESSED_BYTES` refused; 10 MB padded template read under 2 s.

#### 11. `packages/export/test/import-extract.test.ts` and `import-zip-limits.test.ts` (Modify)

*   DOCTYPE in a slide part refused; slide import still refuses 201 entries;
    `assertZipEntrySafe` with and without `maxEntries`, and the new message.

### Group 2: Palette (`@presentation-md/core`)

#### 12. `packages/core/src/brand-extract.ts` (Modify)

*   `BrandColorCandidates` gains optional `bg2` and `accent2`.
    `mapPaletteToRoles` uses them when present and derives them as today
    when absent. URL and CSS sources pass neither, so their palettes are
    unchanged.

#### 13. `packages/core/src/index.ts` (Modify)

*   Adds `rgbToHsl` and the `RGB` and `HSL` types to the `./color.js` export
    line.

#### 14. `packages/core/tests/brand-extract.test.ts` (Modify)

*   `bg2` and `accent2` used when given; output unchanged when absent.

### Group 3: Theme package (`@presentation-md/create-theme`)

#### 15. `packages/create-theme/package.json` and `pnpm-lock.yaml` (Modify)

*   Adds `"@presentation-md/export": "workspace:*"`. Source imports only
    `@presentation-md/export/import`.

#### 16. `packages/create-theme/src/pick-extends.ts` (Create)

*   `pickExtendsFromBg` moved here from `index.ts`, so `extract-brand.ts` can
    use it without an import cycle. `index.ts` re-exports it.

#### 17. `packages/create-theme/src/template-candidates.ts` (Create)

*   `templateToCandidates(brand: TemplateBrand): { candidates: BrandColorCandidates; warnings: string[] }`
    per "Role choice". Uses `contrastRatio`, `hexToRgb` and `rgbToHsl` from
    `@presentation-md/core`.

#### 18. `packages/create-theme/src/google-font-families.ts` (Create, generated)

*   `GOOGLE_FONT_FAMILIES: ReadonlySet<string>` of lower-case family names,
    one string literal per family. The header comment names the generator,
    the source URL and the ISO date of the run.

#### 19. `tools/update-google-fonts.ts` (Create) and root `package.json` (Modify)

*   Fetches `https://fonts.google.com/metadata/fonts`, strips the leading
    `)]}'` line, reads `familyMetadataList[].family`, sorts, and rewrites
    file 18. Exits 1 with "Google Fonts metadata format changed: <reason>"
    when the shape differs. Root script:
    `"fonts:update": "tsx tools/update-google-fonts.ts"`. Not run in CI.
*   **Run it once in this PR** (`pnpm fonts:update`) and commit file 18.

#### 20. `packages/create-theme/src/fonts.ts` (Create)

*   ```text
    sanitizeFamily(name: string): string
    classifyFont(name: string): "google" | "office" | "unavailable"
    buildFontPlan(heading: string | undefined, body: string | undefined,
                  base: "claude" | "default-tech")
      : { headingStack, bodyStack, googleFonts: string[],
          rows: FontRow[], warnings: string[] }
    FontRow { role: "heading" | "body"; family; status; fallback }
    ```
    Rules per "Fonts". Base manifests load with `createRequire`.

#### 21. `packages/create-theme/src/office-default.ts` (Create)

*   `assertNotOfficeDefault(result: BrandExtractionResult, allow: boolean): void`
    with the message in "Tool and CLI".

#### 22. `packages/create-theme/src/extract-brand.ts` (Modify)

*   `BrandExtractionInput` gains `pptxPath`. `BrandExtractionResult` gains
    `extends`, `fontPlan` (the `buildFontPlan` result), `warnings`, `logo`
    and `scheme` (both `null` for URL and CSS), and `source` gains the two
    template values. `headingFont` and `bodyFont` hold the sanitized brand
    families. For `pptxPath`: `stat`, `assertZipArchiveSafe`, read,
    `extractTemplateBrand(bytes, { fileName: basename(pptxPath) })`,
    `templateToCandidates`, `mapPaletteToRoles`, `ensureContrastSafe`, then
    `source` = `"office-default"` when `officeDefault` is set, else
    `"template-scheme"`. All sources then compute
    `extends = pickExtendsFromBg(palette.bg)` and
    `fontPlan = buildFontPlan(heading, body, extends)`.

#### 23. `packages/create-theme/src/theme-view.ts` (Modify)

*   `buildThemeViewFromBrand` reads `extraction.extends` and
    `extraction.fontPlan` (no recomputing), fills the new view fields, and
    sets `description` to "A theme generated from a PowerPoint template." for
    template sources.

#### 24. `packages/create-theme/src/index.ts` (Modify)

*   `ThemeView` gains required `headingStack`, `bodyStack` and
    `googleFonts: string[]`. `collectView` (interactive mode) fills them with
    today's output: `'<font>', system-ui, sans-serif` and
    `[headingFontSpec, bodyFontSpec]`.
*   `buildThemeManifestJson(view)` renders the mustache template, parses it,
    sets `typography.headingFont`, `bodyFont` and `googleFonts` from the view
    as values, and serialises it with two-space indent. `scaffoldTheme`
    writes `theme.json` from `buildThemeManifestJson` and the other files
    from their templates as today, so its signature and both call sites stay
    as they are. `README.md.mustache` keeps the bare family names.
*   CLI: `--from-pptx <file>` and `--allow-office-default` per "Tool and
    CLI"; `name` optional with `--from-pptx`; `assertNotOfficeDefault`
    before `scaffoldTheme`.
*   New exports: `deriveNameFromPath`, `assertNotOfficeDefault`,
    `buildFontPlan`, `FontRow`, and the widened `BrandExtractionResult`.

#### 25. `packages/create-theme/src/name-from-url.ts` (Modify)

*   Adds `deriveNameFromPath(path)`: base name without extension,
    lower-case, runs of characters outside `[a-z0-9]` become `-`, trimmed of
    `-`, then `validateThemeName`. Throws the "Could not derive a valid
    theme name" error when that fails.

#### 26. `packages/create-theme/tests/template-candidates.test.ts` (Create)

*   Neutral `accent1` skipped; `accent1` equal to `bg` skipped; all accents
    neutral gives `accent1` and the warning; saturation 11 and 12; `bg2`
    ratio 1.02, 1.03, 1.6 and 1.61; accent ratio 1.49 and 1.5; `accent2`
    ratio 1.19 and 1.2.

#### 27. `packages/create-theme/tests/fonts.test.ts` (Create)

*   Inter → `google` (asserted present in the committed list); Calibri →
    `office`; Acme Sans → `unavailable`; sanitizer strips `"` and `'`; empty
    after sanitizing falls back with a warning; stack order; brand spec with
    `+`; fallback spec copied verbatim; duplicates removed; same family as
    base keeps the base stack; both base themes.

#### 28. `packages/create-theme/tests/extract-brand.test.ts`, `cli-from-url.test.ts`, `theme-view.test.ts`, `create-theme.test.ts` (Modify)

*   `pptxPath` end to end; `--from-pptx` writes a package whose `theme.json`
    passes `validate-theme`; `--from-pptx` on an Office default exits 1
    without `--allow-office-default` and writes with it; wrong extension;
    three-way exclusivity message; name from file name and its failure;
    URL and CSS now omit a non-Google family from `googleFonts`;
    `SAMPLE_VIEW` gains the three new fields.

### Group 4: Tool (`@presentation-md/mcp-server`)

#### 29. `packages/mcp-server/src/lib/cwd-path.ts` (Modify)

*   Adds `assertOoxmlPathInCwd(path, label, exts: string[])`, moved from the
    private `assertPptxPathInCwd` in `import-pptx.ts`.

#### 30. `packages/mcp-server/src/tools/import-pptx.ts` (Modify)

*   Uses `assertOoxmlPathInCwd(path, "pptx_path", [".pptx"])`. No behaviour
    change.

#### 31. `packages/mcp-server/src/tools/import-brand-theme.ts` (Modify)

*   Inputs, messages and response per "Tool and CLI". Checks the extension
    and cwd with `assertOoxmlPathInCwd(path, "pptxPath", [".pptx", ".potx"])`;
    `extractBrand` owns the size check. Derives `name` with
    `deriveNameFromPath` when absent. Calls `assertNotOfficeDefault` when
    `write` is true. Returns `fonts: extraction.fontPlan.rows`. Description
    gains the sentence from "Agent guidance".

#### 32. `packages/mcp-server/tests/import-brand-theme.test.ts` (Modify)

*   `pptxPath` outside cwd refused; `.docx` refused; none and two sources
    refused with the new messages (replacing the `/provide either/` match);
    `office-default` with `write: true` refused and allowed with
    `allowOfficeDefault`; response has `fonts`, `warnings`, `logo`,
    `scheme`; `logo` has no image data.

### Group 5: Skill and docs

#### 33. `packages/core/SKILL.md` → `skills/presentation-generator/SKILL.md` (Modify, then `pnpm sync:skill`)

*   Trigger words and the workflow rule from "Agent guidance". The existing
    `skill-sync` test checks both copies match.

#### 34. `README.md` and `packages/mcp-server/README.md` (Modify)

*   Root README: "Theme from your PowerPoint template": CLI flags, MCP
    inputs, the Office-default rule, and "fonts that Google Fonts does not
    have show only where they are installed." MCP README line 51: the tool
    row names the template source.

#### 35. `docs/research/template-import-check.md` (Create)

*   The manual-check record and the results table that Future Improvements
    reads: per template, URL, SHA-256, expected and actual `bg`, `text`,
    `accent`, `source`, logo found, script-font warning.

#### 36. `EGM.md` files (Modify)

*   One entry each in `packages/export/src/EGM.md` (office-fonts),
    `packages/export/src/import/EGM.md` (package-reader, template-brand,
    `MAX_TEMPLATE_ZIP_ENTRIES` now public), `packages/create-theme/src/EGM.md`
    (pick-extends, template-candidates, fonts, office-default,
    google-font-families), `packages/core/src/EGM.md` (candidates,
    `rgbToHsl` export), `packages/mcp-server/src/tools/EGM.md` (new inputs).

#### 37. `.changeset/template-theme-import.md` (Create)

*   minor for `@presentation-md/core` (new export), `@presentation-md/export`,
    `@presentation-md/create-theme` and `@presentation-md/mcp-server`.
    Notes: new `pptxPath` source; create-theme no longer writes non-Google
    fonts into `googleFonts`, and its specs use `+` for spaces; slide import
    refuses parts with a DOCTYPE; create-theme now depends on
    `@presentation-md/export`.

### Verification Plan

*   **Build**: `pnpm -r build` before the PR; CI tests built output, so
    `dist` must be current.
*   **Unit tests**: `pnpm test`; Python tests unchanged and still run in CI.
*   **Static analysis**: `pnpm lint`, `pnpm typecheck`.
*   **Coverage**: items 10, 11, 14, 26, 27, 28 and 32 test the rules listed
    in each item; there is no coverage-tool gate.
*   **Scorecard**: `pnpm scorecard --check` passes unchanged (no PPTX writer
    change).
*   **E2E**: all Studio Playwright tests pass.
*   **Older validator**: validate the CUJ 1 `theme.json` with the last
    published core:
    `npx -p @presentation-md/core@<last published> validate-theme <path>`.
*   **Manual, real files**: two real public templates, recorded in item 35
    with expected values written before running. Import, render, export,
    view with Quick Look, and Read each screenshot. Record the actual values
    next to the expected ones.
*   **Agent acceptance**: the three CUJ sessions per "Agent guidance".
*   **Clean-install smoke test**: after release, install the published
    `@presentation-md/mcp-server` in an empty directory and run CUJ 1.

--------------------------------------------------------------------------------

*Drafted with EGM*
