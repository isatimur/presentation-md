import { createServer } from "node:http";
import { describe, expect, it, vi } from "vitest";
import { prefetchDeckImages } from "../src/prefetch-images.js";
import type { DeckJson } from "../src/deck-types.js";

function imageDeck(...urls: string[]): DeckJson {
  return {
    type: "deck",
    slides: urls.map((image, index) => ({
      layout: "image-hero",
      heading: `Image ${index + 1}`,
      image,
    })),
  };
}

describe("remote image prefetch security", () => {
  it("makes zero requests to a real loopback sentinel on the default Node path", async () => {
    let requests = 0;
    const server = createServer((_request, response) => {
      requests += 1;
      response.end("private response");
    });
    await new Promise<void>((resolve, reject) => {
      server.once("error", reject);
      server.listen(0, "127.0.0.1", resolve);
    });
    try {
      const address = server.address();
      if (!address || typeof address === "string") throw new Error("Sentinel did not bind TCP");
      const result = await prefetchDeckImages(
        imageDeck(`http://127.0.0.1:${address.port}/private.png`)
      );
      expect(result.warnings[0]).toContain("not public");
      expect(requests).toBe(0);
    } finally {
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  });

  it("blocks loopback literals and local hostnames before fetch or DNS", async () => {
    const fetchMock = vi.fn();
    const resolver = vi.fn(async () => ["93.184.216.34"]);

    const result = await prefetchDeckImages(
      imageDeck("http://127.0.0.1/private.png", "http://metadata.internal/latest"),
      { fetch: fetchMock as typeof fetch, resolveHostname: resolver }
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(resolver).not.toHaveBeenCalled();
    expect(result.warnings).toHaveLength(2);
    expect(result.warnings.every((warning) => warning.includes("not public"))).toBe(true);
  });

  it("rejects empty and mixed public/private DNS answer sets", async () => {
    const fetchMock = vi.fn();
    const resolver = vi.fn(async (hostname: string) =>
      hostname.startsWith("empty") ? [] : ["93.184.216.34", "169.254.169.254"]
    );

    const result = await prefetchDeckImages(
      imageDeck("https://empty.example/a.png", "https://mixed.example/b.png"),
      { fetch: fetchMock as typeof fetch, resolveHostname: resolver }
    );

    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.warnings).toHaveLength(2);
  });

  it("revalidates redirects and blocks a public-to-loopback hop", async () => {
    const fetchMock = vi.fn(async () =>
      new Response(null, {
        status: 302,
        headers: { location: "http://127.0.0.1/private.png" },
      })
    );

    const result = await prefetchDeckImages(imageDeck("https://public.example/start.png"), {
      fetch: fetchMock as typeof fetch,
      resolveHostname: async () => ["93.184.216.34"],
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://public.example/start.png",
      expect.objectContaining({ redirect: "manual", signal: expect.any(AbortSignal) })
    );
    expect(result.warnings[0]).toContain("not public");
  });

  it("walks admitted redirects and caches hostname decisions", async () => {
    const png = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0, 0, 0, 0]);
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(null, { status: 307, headers: { location: "/final.png" } })
      )
      .mockResolvedValueOnce(
        new Response(png, { status: 200, headers: { "content-type": "image/png" } })
      );
    const resolver = vi.fn(async () => ["93.184.216.34"]);

    const result = await prefetchDeckImages(imageDeck("https://public.example/start.png"), {
      fetch: fetchMock as typeof fetch,
      resolveHostname: resolver,
    });

    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "https://public.example/final.png",
      expect.objectContaining({ redirect: "manual" })
    );
    expect(resolver).toHaveBeenCalledOnce();
    expect(result.warnings).toHaveLength(0);
    expect(result.deck.slides[0]?.image).toMatch(/^data:image\/png;base64,/);
  });

  it("cancels a streaming body as soon as the byte cap is crossed", async () => {
    let cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(Uint8Array.from([1, 2, 3]));
        controller.enqueue(Uint8Array.from([4, 5, 6]));
      },
      cancel() {
        cancelled = true;
      },
    });

    const result = await prefetchDeckImages(imageDeck("https://public.example/large.png"), {
      fetch: async () => new Response(body, { status: 200 }),
      resolveHostname: async () => ["93.184.216.34"],
      maxBytes: 5,
    });

    expect(cancelled).toBe(true);
    expect(result.warnings[0]).toContain("stream exceeded limit");
  });

  it("rejects an oversized declared body before consuming it", async () => {
    const cancel = vi.fn(async () => undefined);
    const arrayBuffer = vi.fn(async () => Uint8Array.from([1]).buffer);
    const response = {
      ok: true,
      status: 200,
      headers: new Headers({ "content-length": "999" }),
      body: { cancel },
      arrayBuffer,
    } as unknown as Response;

    const result = await prefetchDeckImages(imageDeck("https://public.example/declared.png"), {
      fetch: async () => response,
      resolveHostname: async () => ["93.184.216.34"],
      maxBytes: 5,
    });

    expect(cancel).toHaveBeenCalledOnce();
    expect(arrayBuffer).not.toHaveBeenCalled();
    expect(result.warnings[0]).toContain("999 declared bytes");
  });

  it("bounds the whole remote image operation with an abort signal", async () => {
    vi.useFakeTimers();
    try {
      const fetchMock = vi.fn(
        (_url: string | URL | Request, init?: RequestInit) =>
          new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => {
              reject(new DOMException("aborted", "AbortError"));
            });
          })
      );
      const pending = prefetchDeckImages(imageDeck("https://public.example/slow.png"), {
        fetch: fetchMock as typeof fetch,
        resolveHostname: async () => ["93.184.216.34"],
        timeoutMs: 100,
      });
      await vi.advanceTimersByTimeAsync(100);
      const result = await pending;
      expect(result.warnings[0]).toContain("timed out after 100ms");
    } finally {
      vi.useRealTimers();
    }
  });
});
