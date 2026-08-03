import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { parseCssVariables } from "@presentation-md/core";

const lookupMock = vi.fn();
vi.mock("node:dns/promises", () => ({
  lookup: (...args: unknown[]) => lookupMock(...args),
}));

const {
  assertPublicHostname,
  fetchText,
  fetchStylesheetsFromUrl,
  isPublicNetworkAddress,
  resolvePublicUrl,
} = await import("../src/fetch-css.js");

function mockResponse(opts: {
  ok?: boolean;
  status?: number;
  text: string;
  headers?: Record<string, string>;
}): Response {
  return {
    ok: opts.ok ?? true,
    status: opts.status ?? 200,
    headers: new Headers(opts.headers ?? {}),
    arrayBuffer: async () => new TextEncoder().encode(opts.text).buffer,
  } as unknown as Response;
}

describe("public network classification", () => {
  it("allows ordinary globally routable IPv4 and IPv6 addresses", () => {
    for (const address of ["93.184.216.34", "1.1.1.1", "2606:4700:4700::1111"]) {
      expect(isPublicNetworkAddress(address), address).toBe(true);
    }
  });

  it("rejects private, special-use, documentation, and malformed addresses", () => {
    for (const address of [
      "0.0.0.0",
      "10.0.0.1",
      "100.64.0.1",
      "127.0.0.1",
      "169.254.169.254",
      "172.16.0.1",
      "192.0.0.1",
      "192.0.2.1",
      "192.88.99.1",
      "192.168.1.1",
      "198.18.0.1",
      "198.51.100.1",
      "203.0.113.1",
      "224.0.0.1",
      "::",
      "::1",
      "::ffff:127.0.0.1",
      "fc00::1",
      "fe80::1",
      "ff02::1",
      "2001:db8::1",
      "2002::1",
      "3fff::1",
      "not-an-ip",
    ]) {
      expect(isPublicNetworkAddress(address), address).toBe(false);
    }
  });
});

describe("assertPublicHostname", () => {
  beforeEach(() => {
    lookupMock.mockReset();
  });

  it("rejects local names and private literals without DNS", async () => {
    for (const hostname of [
      "localhost",
      "worker.localhost",
      "printer.local",
      "metadata.internal",
      "router.home.arpa",
      "127.0.0.1",
      "[::1]",
    ]) {
      await expect(assertPublicHostname(hostname), hostname).rejects.toThrow(/private\/internal/i);
    }
    expect(lookupMock).not.toHaveBeenCalled();
  });

  it("rejects empty and mixed public/private DNS answer sets", async () => {
    lookupMock.mockResolvedValueOnce([]);
    await expect(assertPublicHostname("empty.example")).rejects.toThrow(/no addresses/i);

    lookupMock.mockResolvedValueOnce([
      { address: "93.184.216.34", family: 4 },
      { address: "127.0.0.1", family: 4 },
    ]);
    await expect(assertPublicHostname("mixed.example")).rejects.toThrow(/private\/internal/i);
  });

  it("accepts only when every DNS answer is globally routable", async () => {
    lookupMock.mockResolvedValue([
      { address: "93.184.216.34", family: 4 },
      { address: "2606:4700:4700::1111", family: 6 },
    ]);
    await expect(assertPublicHostname("public.example")).resolves.toBeUndefined();
    expect(lookupMock).toHaveBeenCalledWith("public.example", {
      all: true,
      verbatim: true,
    });
  });

  it("bounds DNS resolution before any fetch timeout exists", async () => {
    vi.useFakeTimers();
    try {
      lookupMock.mockImplementation(() => new Promise(() => {}));
      const pending = assertPublicHostname("blackhole.example");
      const assertion = expect(pending).rejects.toThrow(/dns lookup timed out/i);
      await vi.advanceTimersByTimeAsync(2_000);
      await assertion;
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("fetchText", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    lookupMock.mockReset();
    lookupMock.mockResolvedValue([{ address: "93.184.216.34", family: 4 }]);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the response body as text", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse({ text: "body { color: red; }" })
    );
    const result = await fetchText("https://example.com/style.css");
    expect(result).toBe("body { color: red; }");
  });

  it("rejects non-http(s) schemes without calling fetch", async () => {
    await expect(fetchText("file:///etc/passwd")).rejects.toThrow(/unsupported url scheme/i);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("follows a redirect via the Location header", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(
        mockResponse({ ok: false, status: 302, text: "", headers: { location: "https://example.com/final.css" } })
      )
      .mockResolvedValueOnce(mockResponse({ text: "h1 { font-family: Georgia; }" }));
    const result = await fetchText("https://example.com/style.css");
    expect(result).toBe("h1 { font-family: Georgia; }");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("throws after exceeding the redirect limit", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    for (let i = 0; i < 10; i++) {
      fetchMock.mockResolvedValueOnce(
        mockResponse({ ok: false, status: 302, text: "", headers: { location: "https://example.com/next.css" } })
      );
    }
    await expect(fetchText("https://example.com/style.css")).rejects.toThrow(/too many redirects/i);
    expect(fetchMock).toHaveBeenCalledTimes(6);
  });

  it("throws on a non-ok response", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse({ ok: false, status: 404, text: "" })
    );
    await expect(fetchText("https://example.com/missing.css")).rejects.toThrow(/404/);
  });

  it("throws when the response exceeds the byte cap", async () => {
    const huge = "a".repeat(6 * 1024 * 1024);
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse({ text: huge }));
    await expect(fetchText("https://example.com/big.css")).rejects.toThrow(/too large/i);
  });

  it("cancels a streaming response as soon as the byte cap is crossed", async () => {
    const cancel = vi.fn(async () => undefined);
    const reader = {
      read: vi.fn()
        .mockResolvedValueOnce({ done: false, value: new Uint8Array(4 * 1024 * 1024) })
        .mockResolvedValueOnce({ done: false, value: new Uint8Array(2 * 1024 * 1024) }),
      cancel,
    };
    const arrayBuffer = vi.fn(async () => new ArrayBuffer(0));
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers(),
      body: { getReader: () => reader },
      arrayBuffer,
    } as unknown as Response);

    await expect(fetchText("https://example.com/stream.css")).rejects.toThrow(/too large/i);
    expect(arrayBuffer).not.toHaveBeenCalled();
    expect(reader.read).toHaveBeenCalledTimes(2);
    expect(cancel).toHaveBeenCalledTimes(1);
  });

  it("times out if the response body never arrives", async () => {
    vi.useFakeTimers();
    try {
      const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
      fetchMock.mockImplementation(
        (url, opts: { signal?: AbortSignal }) =>
          new Promise((resolve) => {
            if (opts?.signal) {
              opts.signal.addEventListener("abort", () => {
                resolve({
                  ok: true,
                  status: 200,
                  headers: new Headers(),
                  arrayBuffer: () => Promise.reject(new DOMException("The operation was aborted.", "AbortError")),
                } as unknown as Response);
              });
            }
          })
      );

      const promise = fetchText("https://example.com/style.css");
      // Attach the rejection assertion before advancing timers so the rejection
      // is never observed as "unhandled" while we're still awaiting the advance.
      const assertion = expect(promise).rejects.toThrow(/timed out/i);
      // The DNS lookup precheck now runs (and resolves via a microtask) before the
      // timeout timer is created, so we need an async-aware timer advance here to
      // let that microtask flush before the timer exists.
      await vi.advanceTimersByTimeAsync(10_000);
      await assertion;
    } finally {
      vi.useRealTimers();
    }
  });

  it("rejects a hostname that resolves to a private IPv4 address", async () => {
    lookupMock.mockResolvedValue([{ address: "10.0.0.5", family: 4 }]);
    await expect(fetchText("https://internal.example.com/style.css")).rejects.toThrow(
      /private\/internal address/i
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("rejects the cloud metadata address", async () => {
    lookupMock.mockResolvedValue([{ address: "169.254.169.254", family: 4 }]);
    await expect(fetchText("https://metadata.example.com/style.css")).rejects.toThrow(
      /private\/internal address/i
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("rejects special-use addresses before calling fetch", async () => {
    for (const address of ["198.18.0.1", "203.0.113.1", "2001:db8::1"]) {
      lookupMock.mockResolvedValueOnce([{ address, family: address.includes(":") ? 6 : 4 }]);
      await expect(fetchText(`https://special-${address.replaceAll(":", "-")}.example/`)).rejects.toThrow(
        /private\/internal address/i
      );
    }
    expect(fetch).not.toHaveBeenCalled();
  });

  it("allows a hostname that resolves to a public IP", async () => {
    lookupMock.mockResolvedValue([{ address: "93.184.216.34", family: 4 }]);
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse({ text: "body { color: blue; }" })
    );
    const result = await fetchText("https://example.com/style.css");
    expect(result).toBe("body { color: blue; }");
  });
});

describe("fetchStylesheetsFromUrl", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    lookupMock.mockReset();
    lookupMock.mockResolvedValue([{ address: "93.184.216.34", family: 4 }]);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches every linked stylesheet and concatenates their CSS", async () => {
    const html = `<html><head>
      <link rel="stylesheet" href="/a.css">
      <link rel="stylesheet" href="https://cdn.example.com/b.css">
    </head></html>`;
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(mockResponse({ text: html }))
      .mockResolvedValueOnce(mockResponse({ text: ":root { --bg: #111111; }" }))
      .mockResolvedValueOnce(mockResponse({ text: ":root { --accent: #ff0000; }" }));

    const css = await fetchStylesheetsFromUrl("https://example.com/");
    expect(css).toContain("--bg: #111111");
    expect(css).toContain("--accent: #ff0000");
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("skips a stylesheet that fails to fetch instead of aborting", async () => {
    const html = `<link rel="stylesheet" href="/broken.css"><link rel="stylesheet" href="/ok.css">`;
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(mockResponse({ text: html }))
      .mockResolvedValueOnce(mockResponse({ ok: false, status: 500, text: "" }))
      .mockResolvedValueOnce(mockResponse({ text: "body { font-family: Georgia; }" }));

    const css = await fetchStylesheetsFromUrl("https://example.com/");
    expect(css).toContain("Georgia");
  });

  it("returns an empty string when there are no linked stylesheets", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse({ text: "<html></html>" }));
    const css = await fetchStylesheetsFromUrl("https://example.com/");
    expect(css).toBe("");
  });

  // Next.js/Vite/Astro inline critical CSS into <style> rather than linking it.
  // Ignoring that HTML made the static pass report "found nothing" and trigger
  // an unnecessary ~150MB Chromium download for data already in memory.
  it("extracts :root variables from an inline <style> block with no linked stylesheets", async () => {
    const html = `<html><head><style>:root { --bg: #123456; --accent: #ff0000; }</style></head></html>`;
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValueOnce(mockResponse({ text: html }));

    const css = await fetchStylesheetsFromUrl("https://example.com/");
    expect(fetchMock).toHaveBeenCalledTimes(1); // no extra network requests
    expect(parseCssVariables(css).bg).toBe("#123456");
    expect(parseCssVariables(css).accent).toBe("#ff0000");
  });

  it("combines inline <style> blocks with linked stylesheets", async () => {
    const html = `<html><head>
      <link rel="stylesheet" href="/a.css">
      <style type="text/css">:root { --accent: #00ff00; }</style>
    </head></html>`;
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(mockResponse({ text: html }))
      .mockResolvedValueOnce(mockResponse({ text: ":root { --bg: #222222; }" }));

    const css = await fetchStylesheetsFromUrl("https://example.com/");
    const vars = parseCssVariables(css);
    expect(vars.bg).toBe("#222222");
    expect(vars.accent).toBe("#00ff00");
  });
});

// Used by the computed-style fallback to pin the browser's navigation to an
// already-validated final URL. Covered here (rather than only in the
// browser-driven ssrf test) because that test is skipped in CI.
describe("resolvePublicUrl", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    lookupMock.mockReset();
    lookupMock.mockResolvedValue([{ address: "93.184.216.34", family: 4 }]);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the URL unchanged when there is no redirect", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse({ text: "" }));
    expect(await resolvePublicUrl("https://example.com/")).toBe("https://example.com/");
  });

  it("follows a redirect chain and returns the final URL", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock
      .mockResolvedValueOnce(
        mockResponse({ status: 302, text: "", headers: { location: "/en/" } })
      )
      .mockResolvedValueOnce(
        mockResponse({ status: 301, text: "", headers: { location: "home" } })
      )
      .mockResolvedValueOnce(mockResponse({ text: "" }));
    expect(await resolvePublicUrl("https://example.com/")).toBe("https://example.com/en/home");
  });

  it("rejects when a redirect hop resolves to a private address", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValueOnce(
      mockResponse({ status: 302, text: "", headers: { location: "http://169.254.169.254/" } })
    );
    lookupMock
      .mockResolvedValueOnce([{ address: "93.184.216.34", family: 4 }])
      .mockResolvedValueOnce([{ address: "169.254.169.254", family: 4 }]);
    await expect(resolvePublicUrl("https://example.com/")).rejects.toThrow(
      /private\/internal address/i
    );
  });

  it("rejects a hostname that resolves to a private address before fetching", async () => {
    lookupMock.mockResolvedValue([{ address: "10.0.0.5", family: 4 }]);
    await expect(resolvePublicUrl("https://internal.example.com/")).rejects.toThrow(
      /private\/internal address/i
    );
    expect(fetch).not.toHaveBeenCalled();
  });

  it("throws after exceeding the redirect limit", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    for (let i = 0; i < 10; i++) {
      fetchMock.mockResolvedValueOnce(
        mockResponse({ status: 302, text: "", headers: { location: "/next" } })
      );
    }
    await expect(resolvePublicUrl("https://example.com/")).rejects.toThrow(/too many redirects/i);
  });

  it("stops at a redirect with no Location header rather than looping", async () => {
    (fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(
      mockResponse({ status: 302, text: "" })
    );
    expect(await resolvePublicUrl("https://example.com/")).toBe("https://example.com/");
  });

  it("rejects non-http(s) schemes without calling fetch", async () => {
    await expect(resolvePublicUrl("file:///etc/passwd")).rejects.toThrow(/unsupported url scheme/i);
    expect(fetch).not.toHaveBeenCalled();
  });
});
