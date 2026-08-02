---
"@presentation-md/create-theme": patch
---

Dispose Playwright redirect responses in brand-extract route guard.

Fail-closed redirect hops now dispose intermediate responses before abort/fetch to avoid leaked handles.
