import { describe, expect, it, vi } from "vitest";
import {
  createConcurrencyLimiter,
  isAllowedPdfSubresourceUrl,
  isAllowedPdfRequestOrigin,
  isPdfHtmlContentType,
  isPublicNetworkAddress,
  PdfHtmlBodyTooLargeError,
  readBoundedPdfHtmlBody,
} from "../src/server/pdfNetworkPolicy.js";

describe("PDF headless network policy", () => {
  it("admits only same-origin browser POST metadata and HTML content types", () => {
    expect(isAllowedPdfRequestOrigin(undefined, "127.0.0.1:4173")).toBe(true);
    expect(isAllowedPdfRequestOrigin("http://127.0.0.1:4173", "127.0.0.1:4173")).toBe(true);
    expect(isAllowedPdfRequestOrigin("https://studio.example", "studio.example")).toBe(true);
    expect(isAllowedPdfRequestOrigin("https://evil.example", "127.0.0.1:4173")).toBe(false);
    expect(isAllowedPdfRequestOrigin("null", "127.0.0.1:4173")).toBe(false);
    expect(isAllowedPdfRequestOrigin("http://127.0.0.1:4173", undefined)).toBe(false);
    expect(isPdfHtmlContentType("text/html; charset=utf-8")).toBe(true);
    expect(isPdfHtmlContentType("TEXT/HTML")).toBe(true);
    expect(isPdfHtmlContentType("text/plain")).toBe(false);
    expect(isPdfHtmlContentType(undefined)).toBe(false);
  });

  it("bounds concurrent browser permits and makes release idempotent", () => {
    const limiter = createConcurrencyLimiter(2);
    const releaseFirst = limiter.tryAcquire();
    const releaseSecond = limiter.tryAcquire();
    expect(releaseFirst).toBeTypeOf("function");
    expect(releaseSecond).toBeTypeOf("function");
    expect(limiter.active()).toBe(2);
    expect(limiter.tryAcquire()).toBeNull();
    releaseFirst?.();
    releaseFirst?.();
    expect(limiter.active()).toBe(1);
    expect(limiter.tryAcquire()).toBeTypeOf("function");
  });

  it("recognizes globally routable IPv4/IPv6 and rejects private or special ranges", () => {
    for (const address of ["93.184.216.34", "1.1.1.1", "2606:4700:4700::1111"]) {
      expect(isPublicNetworkAddress(address), address).toBe(true);
    }
    for (const address of [
      "0.0.0.0",
      "10.0.0.1",
      "100.64.0.1",
      "127.0.0.1",
      "169.254.169.254",
      "172.16.0.1",
      "192.168.1.1",
      "198.18.0.1",
      "224.0.0.1",
      "::",
      "::1",
      "::ffff:127.0.0.1",
      "fc00::1",
      "fe80::1",
      "ff02::1",
      "2001:db8::1",
    ]) {
      expect(isPublicNetworkAddress(address), address).toBe(false);
    }
  });

  it("allows inline assets and public HTTP(S), but blocks local/file URLs and rebinding answers", async () => {
    const resolve = vi.fn(async (hostname: string): Promise<string[]> => {
      if (hostname === "public.example") return ["93.184.216.34"];
      if (hostname === "mixed.example") return ["93.184.216.34", "127.0.0.1"];
      return ["169.254.169.254"];
    });

    await expect(isAllowedPdfSubresourceUrl("data:image/png;base64,AA==", resolve)).resolves.toBe(true);
    await expect(isAllowedPdfSubresourceUrl("blob:https://studio.example/id", resolve)).resolves.toBe(true);
    await expect(isAllowedPdfSubresourceUrl("about:blank", resolve)).resolves.toBe(true);
    await expect(isAllowedPdfSubresourceUrl("https://public.example/image.png", resolve)).resolves.toBe(true);
    await expect(isAllowedPdfSubresourceUrl("https://mixed.example/image.png", resolve)).resolves.toBe(false);
    await expect(isAllowedPdfSubresourceUrl("http://127.0.0.1:8080/private", resolve)).resolves.toBe(false);
    await expect(isAllowedPdfSubresourceUrl("http://[::1]/private", resolve)).resolves.toBe(false);
    await expect(isAllowedPdfSubresourceUrl("http://metadata.internal/latest", resolve)).resolves.toBe(false);
    await expect(isAllowedPdfSubresourceUrl("file:///etc/passwd", resolve)).resolves.toBe(false);
    await expect(isAllowedPdfSubresourceUrl("ftp://public.example/file", resolve)).resolves.toBe(false);

    expect(resolve).not.toHaveBeenCalledWith("127.0.0.1");
    expect(resolve).not.toHaveBeenCalledWith("::1");
  });

  it("stops collecting an oversized PDF HTML body before later chunks", async () => {
    let consumed = 0;
    async function* chunks() {
      consumed += 1;
      yield Buffer.from("abc");
      consumed += 1;
      yield Buffer.from("def");
      consumed += 1;
      yield Buffer.from("never");
    }

    await expect(readBoundedPdfHtmlBody(chunks(), 5)).rejects.toBeInstanceOf(
      PdfHtmlBodyTooLargeError
    );
    expect(consumed).toBe(2);
    await expect(readBoundedPdfHtmlBody(chunks(), 20)).resolves.toBe("abcdefnever");
  });
});
