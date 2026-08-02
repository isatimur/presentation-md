import { describe, it, expect, vi, beforeEach } from "vitest";

// Kept in a separate file from playwright-fallback.test.ts on purpose:
// vi.mock is file-scoped, and that file launches a real Chromium against the
// file:// fixture — mocking child_process/dns there would poison it.

const lookupMock = vi.fn();
vi.mock("node:dns/promises", () => ({
  lookup: (...args: unknown[]) => lookupMock(...args),
}));

const spawnSyncMock = vi.fn();
vi.mock("node:child_process", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:child_process")>();
  return { ...actual, spawnSync: (...args: unknown[]) => spawnSyncMock(...args) };
});

const existsSyncMock = vi.fn();
vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  return { ...actual, existsSync: (...args: unknown[]) => existsSyncMock(...args) };
});

// Stubbed so no real browser is ever launched from this file. Reaching it at
// all is what the "did the guard run first?" assertions check for.
const launchMock = vi.fn(() => Promise.reject(new Error("launch-stub")));
vi.mock("playwright", () => ({
  chromium: { launch: (...args: unknown[]) => launchMock(...(args as [])) },
}));

const { ensurePlaywrightInstalled, extractComputedStyles, guardRoute, isPublicHttpUrl } = await import(
  "../src/playwright-fallback.js"
);

type SpawnOptions = { stdio?: unknown; encoding?: unknown };

describe("ensurePlaywrightInstalled", () => {
  beforeEach(() => {
    spawnSyncMock.mockReset();
    existsSyncMock.mockReset();
    lookupMock.mockReset();
  });

  // Regression: this module can run inside the MCP server, whose stdout is the
  // JSON-RPC channel. `stdio: "inherit"` wrote npm's install output straight
  // onto that stream and corrupted the protocol.
  it("never inherits the parent's stdio for either install step", () => {
    existsSyncMock.mockReturnValue(false); // force the npm install branch
    spawnSyncMock.mockReturnValue({ status: 0, stdout: "", stderr: "" });

    ensurePlaywrightInstalled();

    expect(spawnSyncMock).toHaveBeenCalledTimes(2);
    for (const call of spawnSyncMock.mock.calls) {
      const options = call[2] as SpawnOptions;
      expect(options.stdio).not.toBe("inherit");
      expect(options.stdio).toEqual(["ignore", "pipe", "pipe"]);
    }
  });

  it("includes the captured output in the error when npm install fails", () => {
    existsSyncMock.mockReturnValue(false);
    spawnSyncMock.mockReturnValue({ status: 1, stdout: "some npm noise", stderr: "E404 not found" });

    expect(() => ensurePlaywrightInstalled()).toThrow(/E404 not found/);
    expect(() => ensurePlaywrightInstalled()).toThrow(/some npm noise/);
  });

  it("includes the captured output in the error when the chromium install fails", () => {
    existsSyncMock.mockReturnValue(true); // skip the npm branch
    spawnSyncMock.mockReturnValue({ status: 1, stdout: "", stderr: "browser download failed" });

    expect(() => ensurePlaywrightInstalled()).toThrow(/Chromium/);
    expect(() => ensurePlaywrightInstalled()).toThrow(/browser download failed/);
  });
});

describe("extractComputedStyles SSRF guard", () => {
  beforeEach(() => {
    spawnSyncMock.mockReset();
    existsSyncMock.mockReset();
    existsSyncMock.mockReturnValue(true);
    spawnSyncMock.mockReturnValue({ status: 0, stdout: "", stderr: "" });
    lookupMock.mockReset();
    launchMock.mockClear();
  });

  it("rejects a hostname that resolves to a private address before installing or launching", async () => {
    lookupMock.mockResolvedValue([{ address: "127.0.0.1", family: 4 }]);
    await expect(extractComputedStyles("http://internal.example.com/")).rejects.toThrow(
      /private\/internal address/i
    );
    expect(spawnSyncMock).not.toHaveBeenCalled();
    expect(launchMock).not.toHaveBeenCalled();
  });

  it("rejects the cloud metadata address", async () => {
    lookupMock.mockResolvedValue([{ address: "169.254.169.254", family: 4 }]);
    await expect(extractComputedStyles("https://metadata.example.com/")).rejects.toThrow(
      /private\/internal address/i
    );
    expect(launchMock).not.toHaveBeenCalled();
  });

  it("rejects a hostname that cannot be resolved rather than proceeding", async () => {
    lookupMock.mockRejectedValue(new Error("ENOTFOUND"));
    await expect(extractComputedStyles("https://nope.example.com/")).rejects.toThrow(
      /could not resolve hostname/i
    );
    expect(launchMock).not.toHaveBeenCalled();
  });

  it("does not attempt a DNS lookup for a file:// URL, and still proceeds to launch", async () => {
    // file:// has no network hostname and no SSRF surface; the guard must skip
    // it so the local fixture-based test keeps working.
    await expect(
      extractComputedStyles("file:///tmp/definitely-not-a-real-fixture.html")
    ).rejects.toThrow(/launch-stub/);
    expect(lookupMock).not.toHaveBeenCalled();
    expect(launchMock).toHaveBeenCalled();
  });
});

// The decision function behind the page.route("**/*") handler that vets every
// request Chromium makes (subresources and every redirect hop).
describe("isPublicHttpUrl", () => {
  let cache: Map<string, boolean>;

  beforeEach(() => {
    cache = new Map();
    lookupMock.mockReset();
  });

  it("allows a public host", async () => {
    lookupMock.mockResolvedValue([{ address: "93.184.216.34", family: 4 }]);
    expect(await isPublicHttpUrl("https://example.com/logo.png", cache)).toBe(true);
  });

  it("blocks the cloud metadata address", async () => {
    lookupMock.mockResolvedValue([{ address: "169.254.169.254", family: 4 }]);
    expect(await isPublicHttpUrl("http://169.254.169.254/latest/meta-data/", cache)).toBe(false);
  });

  it("blocks a host resolving to a private IPv4 address", async () => {
    lookupMock.mockResolvedValue([{ address: "10.1.2.3", family: 4 }]);
    expect(await isPublicHttpUrl("http://intranet.example.com/", cache)).toBe(false);
  });

  it("blocks a host that fails to resolve", async () => {
    lookupMock.mockRejectedValue(new Error("ENOTFOUND"));
    expect(await isPublicHttpUrl("https://nope.example.com/", cache)).toBe(false);
  });

  it("blocks an unparseable URL without attempting a lookup", async () => {
    expect(await isPublicHttpUrl("not-a-url", cache)).toBe(false);
    expect(lookupMock).not.toHaveBeenCalled();
  });

  it("blocks non-http(s) schemes, including a file: redirect target", async () => {
    expect(await isPublicHttpUrl("file:///etc/passwd", cache)).toBe(false);
    expect(await isPublicHttpUrl("ftp://example.com/x", cache)).toBe(false);
    expect(lookupMock).not.toHaveBeenCalled();
  });

  it("caches per hostname so a page with many subresources resolves each host once", async () => {
    lookupMock.mockResolvedValue([{ address: "93.184.216.34", family: 4 }]);
    expect(await isPublicHttpUrl("https://cdn.example.com/a.css", cache)).toBe(true);
    expect(await isPublicHttpUrl("https://cdn.example.com/b.png", cache)).toBe(true);
    expect(lookupMock).toHaveBeenCalledTimes(1);
  });

  it("fails closed when the DNS lookup never settles", async () => {
    vi.useFakeTimers();
    try {
      lookupMock.mockImplementation(() => new Promise(() => {}));
      const pending = isPublicHttpUrl("https://blackhole.example.com/", cache);
      await vi.advanceTimersByTimeAsync(2_000);
      expect(await pending).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });
});

function fakeRouteResponse(status: number, location?: string) {
  return {
    status: vi.fn(() => status),
    headers: vi.fn(() => (location ? { location } : {})),
    dispose: vi.fn(async () => undefined),
  };
}

function fakeRoute(initialUrl: string, responses: ReturnType<typeof fakeRouteResponse>[]) {
  const queue = [...responses];
  const abort = vi.fn(async () => undefined);
  const fetch = vi.fn(async () => {
    const response = queue.shift();
    if (!response) throw new Error("Unexpected route.fetch call");
    return response;
  });
  const fulfill = vi.fn(async () => undefined);
  const route = {
    request: () => ({ url: () => initialUrl }),
    continue: vi.fn(async () => undefined),
    abort,
    fetch,
    fulfill,
  } as unknown as import("playwright").Route;
  return { route, abort, fetch, fulfill };
}

describe("guardRoute redirect response lifecycle", () => {
  beforeEach(() => {
    lookupMock.mockReset();
    lookupMock.mockImplementation(async (hostname: string) => [
      { address: hostname === "127.0.0.1" ? hostname : "93.184.216.34", family: 4 },
    ]);
  });

  it("disposes a redirect response before blocking its private target", async () => {
    const redirect = fakeRouteResponse(302, "http://127.0.0.1/private");
    const harness = fakeRoute("https://public.example/start", [redirect]);

    await guardRoute(harness.route, new Map());

    expect(redirect.dispose).toHaveBeenCalledOnce();
    expect(harness.abort).toHaveBeenCalledOnce();
    expect(harness.fulfill).not.toHaveBeenCalled();
  });

  it("disposes each admitted redirect response before fetching the next hop", async () => {
    const first = fakeRouteResponse(301, "/two");
    const second = fakeRouteResponse(307, "/final");
    const final = fakeRouteResponse(200);
    const harness = fakeRoute("https://public.example/one", [first, second, final]);

    await guardRoute(harness.route, new Map());

    expect(first.dispose).toHaveBeenCalledOnce();
    expect(second.dispose).toHaveBeenCalledOnce();
    expect(final.dispose).not.toHaveBeenCalled();
    expect(harness.fetch).toHaveBeenNthCalledWith(1, { maxRedirects: 0 });
    expect(harness.fetch).toHaveBeenNthCalledWith(2, {
      url: "https://public.example/two",
      maxRedirects: 0,
    });
    expect(harness.fetch).toHaveBeenNthCalledWith(3, {
      url: "https://public.example/final",
      maxRedirects: 0,
    });
    expect(harness.fulfill).toHaveBeenCalledWith({ response: final });
  });

  it("disposes the terminal redirect response when the hop cap is reached", async () => {
    const redirects = Array.from({ length: 6 }, () => fakeRouteResponse(302, "/loop"));
    const harness = fakeRoute("https://public.example/loop", redirects);

    await guardRoute(harness.route, new Map());

    expect(harness.fetch).toHaveBeenCalledTimes(6);
    expect(redirects.every((response) => response.dispose.mock.calls.length === 1)).toBe(true);
    expect(harness.abort).toHaveBeenCalledOnce();
    expect(harness.fulfill).not.toHaveBeenCalled();
  });

  it("disposes and blocks a malformed redirect target", async () => {
    const redirect = fakeRouteResponse(302, "http://[");
    const harness = fakeRoute("https://public.example/start", [redirect]);

    await guardRoute(harness.route, new Map());

    expect(redirect.dispose).toHaveBeenCalledOnce();
    expect(harness.abort).toHaveBeenCalledOnce();
    expect(harness.fulfill).not.toHaveBeenCalled();
  });
});
