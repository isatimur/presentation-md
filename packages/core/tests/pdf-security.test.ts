import { mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it, vi } from "vitest";
import {
  createPdfRouteGuard,
  isAllowedPdfFileUrl,
  isAllowedPublicHttpUrl,
  isPublicNetworkAddress,
} from "../scripts/pdf-security.mjs";

describe("shared PDF script security", () => {
  it("runs Chromium with page JavaScript disabled and the route guard installed", async () => {
    const source = await readFile(new URL("../scripts/export-pdf.mjs", import.meta.url), "utf8");
    expect(source).toContain("javaScriptEnabled: false");
    expect(source).toContain("createPdfRouteGuard(inputPath)");
    expect(source).toContain('page.route("**/*"');
    expect(source).toContain("page.setContent(printableHtml");
    expect(source).toContain('<base href="${baseHref}">');
    expect(source).not.toContain("await page.addStyleTag(");
    expect(source).not.toContain("await page.evaluate(");
  });

  it("rejects private/special addresses and DNS answers", async () => {
    expect(isPublicNetworkAddress("93.184.216.34")).toBe(true);
    expect(isPublicNetworkAddress("2606:4700:4700::1111")).toBe(true);
    for (const address of [
      "127.0.0.1",
      "169.254.169.254",
      "10.0.0.1",
      "192.168.1.1",
      "::1",
      "fc00::1",
      "2001:db8::1",
    ]) {
      expect(isPublicNetworkAddress(address), address).toBe(false);
    }

    const publicResolver = vi.fn(async () => ["93.184.216.34"]);
    const privateResolver = vi.fn(async () => ["93.184.216.34", "127.0.0.1"]);
    await expect(
      isAllowedPublicHttpUrl("https://public.example/image.png", new Map(), publicResolver)
    ).resolves.toBe(true);
    await expect(
      isAllowedPublicHttpUrl("https://mixed.example/image.png", new Map(), privateResolver)
    ).resolves.toBe(false);
    await expect(
      isAllowedPublicHttpUrl("http://127.0.0.1/private", new Map(), publicResolver)
    ).resolves.toBe(false);
  });

  it("confines file requests to the input deck directory, including symlinks", async () => {
    const root = await mkdtemp(join(tmpdir(), "pmd-pdf-policy-"));
    const deckDir = join(root, "deck");
    await mkdir(deckDir);
    const input = join(deckDir, "deck.html");
    const inside = join(deckDir, "image.png");
    const outside = join(root, "secret.txt");
    const linkedOutside = join(deckDir, "linked-secret.txt");
    try {
      await Promise.all([
        writeFile(input, "<html></html>"),
        writeFile(inside, "image"),
        writeFile(outside, "secret"),
      ]);
      await symlink(outside, linkedOutside);
      await expect(isAllowedPdfFileUrl(pathToFileURL(input).href, input)).resolves.toBe(true);
      await expect(isAllowedPdfFileUrl(pathToFileURL(inside).href, input)).resolves.toBe(true);
      await expect(isAllowedPdfFileUrl(pathToFileURL(outside).href, input)).resolves.toBe(false);
      await expect(isAllowedPdfFileUrl(pathToFileURL(linkedOutside).href, input)).resolves.toBe(false);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("revalidates redirects and blocks a public-to-loopback hop", async () => {
    const response = {
      status: () => 302,
      headers: () => ({ location: "http://127.0.0.1/private" }),
      dispose: vi.fn(async () => undefined),
    };
    const route = {
      request: () => ({
        url: () => "https://public.example/start",
        resourceType: () => "image",
      }),
      fetch: vi.fn(async () => response),
      abort: vi.fn(async () => undefined),
      continue: vi.fn(async () => undefined),
      fulfill: vi.fn(async () => undefined),
    };
    const guard = createPdfRouteGuard("/tmp/deck.html", {
      resolveHostname: async () => ["93.184.216.34"],
    });

    await guard(route);
    expect(route.fetch).toHaveBeenCalledWith({ maxRedirects: 0 });
    expect(response.dispose).toHaveBeenCalledOnce();
    expect(route.abort).toHaveBeenCalledOnce();
    expect(route.fulfill).not.toHaveBeenCalled();
  });
});
