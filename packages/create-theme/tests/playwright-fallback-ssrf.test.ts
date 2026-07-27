import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import http from "node:http";
import type { AddressInfo } from "node:net";

// Only our own SSRF precheck goes through node's DNS. Chromium and Playwright's
// API context resolve `localhost` themselves, in a separate process, so this
// mock lets a real browser talk to a local server while our guard believes the
// host is public — which is exactly the attacker's position.
const lookupMock = vi.fn(async (hostname: string) => {
  if (hostname === "localhost") return [{ address: "93.184.216.34", family: 4 }];
  return [{ address: hostname, family: 4 }]; // IP literals resolve to themselves
});
vi.mock("node:dns/promises", () => ({
  lookup: (hostname: string) => lookupMock(hostname),
}));

const { extractComputedStyles } = await import("../src/playwright-fallback.js");

let server: http.Server;
let port: number;

// Skipped in CI for the same reason as playwright-fallback.test.ts: it drives a
// real Chromium. Run locally with `npx vitest run tests/playwright-fallback-ssrf.test.ts`.
describe.skipIf(!!process.env.CI)("extractComputedStyles request guard", () => {
  beforeAll(async () => {
    server = http.createServer((req, res) => {
      if (req.url === "/redirect-to-metadata") {
        // A public page redirecting the top-level navigation into the cloud
        // metadata service. route.continue() would follow this silently.
        res.writeHead(302, { Location: "http://169.254.169.254/latest/meta-data/" });
        res.end();
      } else if (req.url === "/redirect-ok") {
        // Path-depth-changing redirect: the relative stylesheet href below only
        // resolves correctly if the document's base URL is the POST-redirect
        // URL. Guards against the route.fetch/fulfill rewrite silently pinning
        // the document to the pre-redirect URL.
        res.writeHead(302, { Location: "/en/home" });
        res.end();
      } else if (req.url === "/en/home") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(
          `<html><head><link rel="stylesheet" href="style.css">` +
            // A subresource on a public host that redirects into a private one.
            // Only guardRoute's per-hop check can catch this.
            `<link rel="stylesheet" href="/redirect-css"></head>` +
            `<body><h1>H</h1>` +
            `<img src="http://169.254.169.254/latest/meta-data/">` +
            `</body></html>`
        );
      } else if (req.url === "/redirect-css") {
        res.writeHead(302, { Location: "http://10.0.0.7/evil.css" });
        res.end();
      } else if (req.url === "/en/style.css") {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(
          `body { background: #123456; color: #abcdef; font-family: Georgia; }` +
            `h1 { font-family: 'Helvetica Neue'; }`
        );
      } else {
        res.writeHead(404);
        res.end();
      }
    });
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    port = (server.address() as AddressInfo).port;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  it("blocks a redirect from a public page into a private address", async () => {
    // Playwright surfaces the aborted navigation as a page-load failure.
    await expect(
      extractComputedStyles(`http://localhost:${port}/redirect-to-metadata`)
    ).rejects.toThrow();
    // The private hop really was checked (and rejected) by our guard.
    expect(lookupMock).toHaveBeenCalledWith("169.254.169.254");
  }, 60_000);

  it("still follows a redirect that stays on a public host, and blocks only the private requests", async () => {
    const result = await extractComputedStyles(`http://localhost:${port}/redirect-ok`);
    // The navigation redirect changes path depth (/redirect-ok -> /en/home), so
    // these values are only correct if the document's base URL is the
    // POST-redirect one — otherwise the relative <link href="style.css">
    // resolves to /style.css, 404s, and we silently report UA defaults
    // (#000000 on #ffffff, Times) as the brand.
    expect(result.bg?.toLowerCase()).toBe("#123456");
    expect(result.text?.toLowerCase()).toBe("#abcdef");
    expect(result.headingFont).toBe("Helvetica Neue");
    expect(result.bodyFont).toBe("Georgia");
    // A subresource that 302s from the public host into a private one is caught
    // at the hop by guardRoute, without breaking the rest of the page.
    expect(lookupMock).toHaveBeenCalledWith("10.0.0.7");
    // ...as is a subresource pointing straight at a private address.
    expect(lookupMock).toHaveBeenCalledWith("169.254.169.254");
  }, 60_000);
});
