---
"@presentation-md/core": minor
---

Craft audit issues now carry a stable `code` and `params`. `CRAFT_ISSUE_MESSAGES` holds the English template for each code, and `fillCraftTemplate` fills it. The English `message` is unchanged, so agents and the CLI see the same text. Studio uses the code to show audit messages in all 10 languages.
