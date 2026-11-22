# shims

## Overview

Browser stand-ins for Node built-ins. Studio code and its workspace dependencies import `node:*` modules. The browser bundle cannot load them. `vite.config.ts` aliases each `node:*` import to a file here, so the bundle never keeps a bare `node:` import. The shims do path math and IP parsing in pure JS. They never touch a filesystem or DNS.

## Interface

- `fileURLToPath(url)`, `pathToFileURL(path)`, default export. [node-url.ts:fileURLToPath, node-url.ts:pathToFileURL]
- `sep`, `join`, `resolve`, `dirname`, `basename`, `extname`, `relative`, default export. Pure string path math with `/` separators. [node-path.ts:join, node-path.ts:resolve]
- `isIP(input)` returns `0 | 4 | 6`, like Node `net.isIP`. [node-net.ts:isIP]
- `lookup(hostname, opts?)` always resolves to `[]`. [node-dns.ts:lookup]
- `readFile`, `writeFile`, `mkdir`, `readdir`, `stat`, `realpath`, `access`, `readFileSync`, `existsSync`, `realpathSync`, `constants`, default export. [node-fs.ts:unavailable]
- Alias map: `node:fs` and `node:fs/promises` to `node-fs.ts`, `node:path` to `node-path.ts`, `node:url` to `node-url.ts`, `node:net` to `node-net.ts`, `node:dns/promises` to `node-dns.ts`. [../../vite.config.ts:resolve.alias]

## Invariants

- Every `fs` function except `existsSync` throws `"<api> is unavailable in the browser"`. `existsSync` always returns `false`. `constants` is `{}`. [node-fs.ts:unavailable, node-fs.ts:existsSync]
- `lookup` never resolves a hostname. It returns an empty list. [node-dns.ts:lookup]
- `fileURLToPath` strips `file://` for `file:` URLs. For other URLs it returns the pathname, so module-init calls with an `http(s)` `import.meta.url` do not crash. Unparseable input comes back unchanged. [node-url.ts:fileURLToPath]
- `resolve` is the same as `join`. It does not make a path absolute. [node-path.ts:resolve]
- `isIP` strips surrounding `[` `]`. IPv4 needs four decimal octets in 0..255. IPv6 needs a colon and only hex digits, colons, and dots. [node-net.ts:parseIpv4, node-net.ts:isIpv6]
- The aliases sit in the shared `resolve` block, and `node-net.ts` is marked as a browser and vitest shim. Code under test that imports `node:dns/promises` gets this `lookup`, which returns `[]`. [../../vite.config.ts:resolve.alias, node-net.ts:isIP]
- There is no `node:http` or `node:dns` (non-promises) alias. [../../vite.config.ts:resolve.alias]

## Side Effects

- None. All functions are pure or throw. [node-fs.ts:unavailable, node-dns.ts:lookup]

## Verification

- Run: `pnpm --filter @presentation-md/studio test`
