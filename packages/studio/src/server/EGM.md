# server

## Overview

Node-side guards for the local PDF export endpoint. This code does not run in the browser. Only `vite.config.ts` imports it, for the `/api/export-pdf` middleware on the Vite dev and preview servers. It checks request origin, content type, body size, and concurrency. It also blocks headless Chromium from loading loopback or private-network subresources, including through redirects.

## Interface

- `MAX_PDF_HTML_BYTES` = 64 MiB. [pdfNetworkPolicy.ts:MAX_PDF_HTML_BYTES]
- `PdfHtmlBodyTooLargeError`. [pdfNetworkPolicy.ts:PdfHtmlBodyTooLargeError]
- `isAllowedPdfRequestOrigin(originHeader, hostHeader)`. [pdfNetworkPolicy.ts:isAllowedPdfRequestOrigin]
- `isPdfHtmlContentType(contentType)`. [pdfNetworkPolicy.ts:isPdfHtmlContentType]
- `createConcurrencyLimiter(maxConcurrent)` returns `ConcurrencyLimiter { tryAcquire, active }`. [pdfNetworkPolicy.ts:createConcurrencyLimiter]
- `readBoundedPdfHtmlBody(source, maxBytes?)`. [pdfNetworkPolicy.ts:readBoundedPdfHtmlBody]
- `isPublicNetworkAddress(address)`. [pdfNetworkPolicy.ts:isPublicNetworkAddress]
- `isAllowedPdfSubresourceUrl(url, resolveHostname?)`; type `PdfHostnameResolver`. [pdfNetworkPolicy.ts:isAllowedPdfSubresourceUrl]
- `guardPdfSubresourceRoute(route, decisions, isAllowedUrl?)`; `MAX_PDF_REDIRECT_HOPS` = 5; type `PdfSubresourceUrlPolicy`. [pdfRouteGuard.ts:guardPdfSubresourceRoute]
- Consumer: `exportPdfApi` in `../../vite.config.ts`. [../../vite.config.ts:exportPdfApi]

## Invariants

- A request without an `Origin` header is allowed. A present `Origin` must be `http:` or `https:` and match the `Host` header, case-insensitive. A missing `Host` with an `Origin` is refused. [pdfNetworkPolicy.ts:isAllowedPdfRequestOrigin]
- Content type must be `text/html`, optionally followed by `;` parameters. [pdfNetworkPolicy.ts:isPdfHtmlContentType]
- `maxConcurrent` must be a positive integer. `tryAcquire` returns `null` at the cap. Each release function runs once only. [pdfNetworkPolicy.ts:createConcurrencyLimiter]
- `readBoundedPdfHtmlBody` throws `PdfHtmlBodyTooLargeError` as soon as the running total passes `maxBytes`. [pdfNetworkPolicy.ts:readBoundedPdfHtmlBody]
- `isPublicNetworkAddress` rejects loopback, RFC 1918, CGNAT, link-local, multicast, reserved, and documentation IPv4 ranges. For IPv6 it allows only `2000::/3`, minus `2001:db8::` and `2002::`. IPv4-mapped IPv6 must use `::ffff:` and map to a public IPv4. [pdfNetworkPolicy.ts:isPublicNetworkAddress]
- Subresource URLs: `data:`, `blob:`, and `about:` pass. Protocols other than `http(s)` fail. `localhost`, `*.localhost`, `*.local`, `*.internal`, and `*.home.arpa` fail. A hostname passes only if DNS returns at least one address and every address is public. Errors fail closed. [pdfNetworkPolicy.ts:isAllowedPdfSubresourceUrl]
- The route guard fetches with `maxRedirects: 0` and re-checks every redirect hop. A missing `Location` or more than `MAX_PDF_REDIRECT_HOPS` hops aborts with `blockedbyclient`. Any thrown error aborts too. [pdfRouteGuard.ts:guardPdfSubresourceRouteUnchecked, pdfRouteGuard.ts:guardPdfSubresourceRoute]
- The `decisions` map caches one policy promise per URL for a page. [pdfRouteGuard.ts:guardPdfSubresourceRouteUnchecked]

## Side Effects

- DNS lookups through Node `node:dns/promises` `lookup` in the default resolver. [pdfNetworkPolicy.ts:defaultResolver]
- Outbound HTTP through Playwright `route.fetch`, then `route.fulfill`, `route.continue`, or `route.abort`. [pdfRouteGuard.ts:guardPdfSubresourceRouteUnchecked]
- Mutates the caller's `decisions` map. [pdfRouteGuard.ts:guardPdfSubresourceRouteUnchecked]
- The limiter holds a mutable in-memory counter. [pdfNetworkPolicy.ts:createConcurrencyLimiter]

## Verification

- Run: `pnpm --filter @presentation-md/studio test`
