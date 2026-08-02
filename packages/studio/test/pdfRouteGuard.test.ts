import type { Route } from "@playwright/test";
import { describe, expect, it, vi } from "vitest";
import {
  guardPdfSubresourceRoute,
  MAX_PDF_REDIRECT_HOPS,
  type PdfSubresourceUrlPolicy,
} from "../src/server/pdfRouteGuard.js";

function fakeResponse(status: number, location?: string) {
  return {
    status: vi.fn(() => status),
    headers: vi.fn(() => (location ? { location } : {})),
    dispose: vi.fn(async () => undefined),
  };
}

function fakeRoute(initialUrl: string, responses: ReturnType<typeof fakeResponse>[] = []) {
  const queue = [...responses];
  const abort = vi.fn(async () => undefined);
  const continueRoute = vi.fn(async () => undefined);
  const fetch = vi.fn(async () => {
    const response = queue.shift();
    if (!response) throw new Error("Unexpected route.fetch call");
    return response;
  });
  const fulfill = vi.fn(async () => undefined);
  const route = {
    request: () => ({ url: () => initialUrl }),
    abort,
    continue: continueRoute,
    fetch,
    fulfill,
  } as unknown as Route;
  return { route, abort, continueRoute, fetch, fulfill };
}

describe("Studio PDF redirect route guard", () => {
  it("continues an admitted inline asset without fetching it", async () => {
    const harness = fakeRoute("data:image/png;base64,AA==");
    const policy = vi.fn(async () => true);

    await guardPdfSubresourceRoute(harness.route, new Map(), policy);

    expect(policy).toHaveBeenCalledOnce();
    expect(harness.continueRoute).toHaveBeenCalledOnce();
    expect(harness.fetch).not.toHaveBeenCalled();
    expect(harness.abort).not.toHaveBeenCalled();
  });

  it("blocks a denied initial URL before any network fetch", async () => {
    const harness = fakeRoute("http://127.0.0.1/private");

    await guardPdfSubresourceRoute(harness.route, new Map(), async () => false);

    expect(harness.abort).toHaveBeenCalledWith("blockedbyclient");
    expect(harness.fetch).not.toHaveBeenCalled();
    expect(harness.fulfill).not.toHaveBeenCalled();
  });

  it("revalidates and blocks a public-to-loopback redirect", async () => {
    const redirect = fakeResponse(302, "http://127.0.0.1/private");
    const harness = fakeRoute("https://public.example/start", [redirect]);
    const policy: PdfSubresourceUrlPolicy = vi.fn(async (url) => !url.includes("127.0.0.1"));

    await guardPdfSubresourceRoute(harness.route, new Map(), policy);

    expect(harness.fetch).toHaveBeenCalledWith({ maxRedirects: 0 });
    expect(redirect.dispose).toHaveBeenCalledOnce();
    expect(harness.abort).toHaveBeenCalledWith("blockedbyclient");
    expect(harness.fulfill).not.toHaveBeenCalled();
  });

  it("walks admitted redirects explicitly and fulfills only the final response", async () => {
    const redirect = fakeResponse(307, "/final.png");
    const final = fakeResponse(200);
    const harness = fakeRoute("https://public.example/start", [redirect, final]);
    const policy = vi.fn(async () => true);

    await guardPdfSubresourceRoute(harness.route, new Map(), policy);

    expect(harness.fetch).toHaveBeenNthCalledWith(1, { maxRedirects: 0 });
    expect(harness.fetch).toHaveBeenNthCalledWith(2, {
      url: "https://public.example/final.png",
      maxRedirects: 0,
    });
    expect(redirect.dispose).toHaveBeenCalledOnce();
    expect(harness.fulfill).toHaveBeenCalledWith({ response: final });
    expect(harness.abort).not.toHaveBeenCalled();
  });

  it("caps redirect loops and reuses the cached URL decision", async () => {
    const responses = Array.from({ length: MAX_PDF_REDIRECT_HOPS + 1 }, () =>
      fakeResponse(302, "/loop")
    );
    const harness = fakeRoute("https://public.example/loop", responses);
    const policy = vi.fn(async () => true);

    await guardPdfSubresourceRoute(harness.route, new Map(), policy);

    expect(harness.fetch).toHaveBeenCalledTimes(MAX_PDF_REDIRECT_HOPS + 1);
    expect(policy).toHaveBeenCalledOnce();
    expect(responses.every((response) => response.dispose.mock.calls.length === 1)).toBe(true);
    expect(harness.abort).toHaveBeenCalledWith("blockedbyclient");
    expect(harness.fulfill).not.toHaveBeenCalled();
  });

  it("fails closed when policy or redirect parsing throws", async () => {
    const policyFailure = fakeRoute("https://public.example/image.png");
    await guardPdfSubresourceRoute(policyFailure.route, new Map(), async () => {
      throw new Error("resolver failed");
    });
    expect(policyFailure.abort).toHaveBeenCalledWith("blockedbyclient");

    const malformed = fakeRoute("https://public.example/start", [fakeResponse(302, "http://[")]);
    await guardPdfSubresourceRoute(malformed.route, new Map(), async () => true);
    expect(malformed.abort).toHaveBeenCalledWith("blockedbyclient");
    expect(malformed.fulfill).not.toHaveBeenCalled();
  });
});
