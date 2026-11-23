---
"@presentation-md/core": patch
---

`scripts/export-pdf.sh`: two PDF exports starting at once on a fresh install no longer crash with "Cannot find module …/playwright-core". The first-run Playwright install now writes a marker when it finishes, and an atomic lock makes other runs wait instead of using a half-installed `node_modules`.
