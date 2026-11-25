# Template import check

The manual check for [Theme from a PowerPoint template](../superpowers/specs/2026-11-23-template-theme-import-design.md).
Each row is one real, public template. The expected values come from the owner's published
brand colours. They were written down before the import ran. The actual values come from
`create-presentation-md-theme --from-pptx`.

The Future Improvements section of the spec reads this table: logo found, Office default,
and script-font warning.

## Templates

| # | Template | URL | SHA-256 |
|---|----------|-----|---------|
| 1 | Binghamton University, option C | https://www.binghamton.edu/communications-and-marketing/doc/binghamton-ppt-c.potx | `56d0a039e20180fcf6d54d298e0949e6d9688064278961538a4c510e290396fa` |
| 2 | UMass Lowell | https://www.uml.edu/resources/University-Relations/logos/powerpoint/uml-template.potx | `069db667951fedc5e56683978295c303c9568f90f9e024c391cc7e58614cf4dd` |

Downloaded on 2026-11-25. The files are not in this repository.

## Expected values (written before the import)

Sources: [Binghamton brand colours](https://www.binghamton.edu/communications-and-marketing/branding/colors.html)
(deep green `#005a43`) and the [UMass Lowell branding guide](https://www.uml.edu/brand-communications-creative-strategy/resources-guidelines/branding-guide.aspx)
(blue `#0067b1`, PMS 293).

| # | bg | text | accent | source |
|---|----|------|--------|--------|
| 1 | a light colour (`#ffffff` likely) | a dark colour | `#005a43` | `template-scheme` |
| 2 | a light colour (`#ffffff` likely) | a dark colour | `#0067b1` | `template-scheme` |

## Results

Command: `create-presentation-md-theme --from-pptx <file>` (built from this branch).

| # | bg | text | accent | accent2 | source | Logo found | Office default | Script-font warning |
|---|----|------|--------|---------|--------|------------|----------------|---------------------|
| 1 | `#ffffff` | `#000000` | `#cedc00` | `#6cc24a` | `template-scheme` | no | no | no |
| 2 | `#ffffff` | `#000000` | `#1257d1` | `#fb471f` | `template-scheme` | yes (PNG + SVG, top-left, 6.5% wide, 16,181 bytes) | no | no |

| # | Heading font | Body font | Scheme name | Base theme |
|---|--------------|-----------|-------------|------------|
| 1 | Arial Narrow (`office`) | Arial Narrow (`office`) | Custom 53 | `claude` |
| 2 | Anek Latin ExtraBold (`unavailable`) | Barlow (`google`) | UMass Lowell | `claude` |

`bg` and `text` match the expected values. `accent` does not match in either template:

- Binghamton keeps its deep green in `dk2` (`#006b54`), not in an accent slot. `accent1` is the
  lime accent colour `#cedc00` (PMS 381 on the brand page), so the role choice takes it.
- UMass Lowell keeps a dark blue in `dk2` (`#003b75`). `accent1` is `#1257d1`, a brighter blue
  than the print colour `#0067b1`.

Both results follow the role-choice rules. Both show the same pattern: the primary brand colour
sits in `dk2`. The `scheme` field in the response lets an agent re-map `accent` to `dk2`.
Recording more templates will show whether a `dk2` rule is worth a design change.

`Anek Latin ExtraBold` is a weight-specific family name. Google Fonts has `Anek Latin`, but not
under that name, so the classifier reports `unavailable`.

Both theme packages pass `validate-theme` from the last published core
(`npx -p @presentation-md/core@1.40.0 validate-theme`). Both rendered to HTML and PPTX. The HTML
(headless Chrome) and the PPTX (Quick Look) showed the template colours and fonts.
