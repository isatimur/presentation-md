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
        res.writeHead(302, { Location: "/final" });
        res.end();
      } else if (req.url === "/final") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(
          `<html><body style="background:#123456;color:#abcdef;font-family:Georgia">` +
            `<h1 style="font-family:'Helvetica Neue'">H</h1>` +
            `<img src="http://169.254.169.254/latest/meta-data/">` +
            `</body></html>`
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

  it("still follows a redirect that stays on a public host, and blocks only the private subresource", async () => {
    const result = await extractComputedStyles(`http://localhost:${port}/redirect-ok`);
    expect(result.bg?.toLowerCase()).toBe("#123456");
    expect(result.text?.toLowerCase()).toBe("#abcdef");
    expect(result.headingFont).toBe("Helvetica Neue");
    expect(result.bodyFont).toBe("Georgia");
  }, 60_000);
});
