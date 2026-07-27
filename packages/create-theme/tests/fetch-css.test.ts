import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchText, fetchStylesheetsFromUrl } from "../src/fetch-css.js";

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

describe("fetchText", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
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
});

describe("fetchStylesheetsFromUrl", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
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
});
