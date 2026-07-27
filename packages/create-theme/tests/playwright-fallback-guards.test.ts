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

const { ensurePlaywrightInstalled, extractComputedStyles } = await import(
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
