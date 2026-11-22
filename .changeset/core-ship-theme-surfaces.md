---
"@presentation-md/core": patch
---

Ship theme-surfaces.json inside the core package. The compiled theme-surface.js
imported ../../shared/theme-surfaces.json, which resolves to the monorepo's
packages/shared in-repo but escapes the package root when installed from npm,
crashing every consumer (including npx @presentation-md/render) with
ERR_MODULE_NOT_FOUND. The build now syncs the file into packages/core/shared
(same pattern as renderer-node) and the import stays within the package.
