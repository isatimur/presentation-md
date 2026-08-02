/// <reference lib="dom" />

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { assertPublicHostname, resolvePublicUrl } from "./fetch-css.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");

// This module can run inside the MCP server process, whose stdout IS the
// JSON-RPC protocol channel (StdioServerTransport). `stdio: "inherit"` would
// pipe npm's install chatter straight onto that stream and corrupt it, so both
// installs capture their output instead and only surface it on failure.
const CAPTURED_STDIO: ["ignore", "pipe", "pipe"] = ["ignore", "pipe", "pipe"];

function describeFailure(
  what: string,
  result: ReturnType<typeof spawnSync>
): string {
  const parts = [`Failed to install ${what} for the brand-import computed-style fallback.`];
  if (result.error) parts.push(`spawn error: ${result.error.message}`);
  const stdout = typeof result.stdout === "string" ? result.stdout.trim() : "";
  const stderr = typeof result.stderr === "string" ? result.stderr.trim() : "";
  if (stdout) parts.push(`stdout:\n${stdout}`);
  if (stderr) parts.push(`stderr:\n${stderr}`);
  return parts.join("\n");
}

export function ensurePlaywrightInstalled(): void {
  const marker = join(PACKAGE_ROOT, "node_modules", "playwright");
  // Only gate npm install on the marker — if node_modules/playwright already exists, skip.
  // This avoids redundant installs, but leaves room for self-healing if chromium fails.
  if (!existsSync(marker)) {
    const install = spawnSync(
      "npm",
      ["install", "--prefix", PACKAGE_ROOT, "--no-save", "playwright@^1.46.0"],
      { stdio: CAPTURED_STDIO, encoding: "utf-8" }
    );
    if (install.status !== 0) {
      throw new Error(describeFailure("Playwright", install));
    }
  }
  // Unconditionally run `playwright install chromium` on every call. This is a fast no-op
  // when already cached, but ensures that a prior partial failure (npm succeeded, chromium
  // failed) self-heals on the next run. This matches the pattern from
  // skills/presentation-generator/scripts/export-pdf.sh.
  const chromium = spawnSync(
    join(PACKAGE_ROOT, "node_modules", ".bin", "playwright"),
    ["install", "chromium"],
    { stdio: CAPTURED_STDIO, encoding: "utf-8" }
  );
  if (chromium.status !== 0) {
    throw new Error(describeFailure("Chromium", chromium));
  }
}

// Schemes that never hit the network, so there is no SSRF surface and no
// hostname to resolve. `file:` is how the test fixture is loaded.
const NON_NETWORK_SCHEMES = new Set(["file:", "data:", "blob:", "about:"]);

const DNS_TIMEOUT_MS = 2_000;
const MAX_REDIRECT_HOPS = 5;

/**
 * Whether Chromium should be allowed to issue this network request. Fails
 * closed: an unparseable URL, a non-http(s) scheme, a private/internal address,
 * or a DNS lookup that doesn't answer within DNS_TIMEOUT_MS is blocked rather
 * than allowed through.
 */
export async function isPublicHttpUrl(rawUrl: string, cache: Map<string, boolean>): Promise<boolean> {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
  const hostname = parsed.hostname;
  const cached = cache.get(hostname);
  if (cached !== undefined) return cached;

  let timer: NodeJS.Timeout | undefined;
  let allowed: boolean;
  try {
    await Promise.race([
      assertPublicHostname(hostname),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`DNS lookup timed out for ${hostname}`)), DNS_TIMEOUT_MS);
      }),
    ]);
    allowed = true;
  } catch {
    allowed = false;
  } finally {
    if (timer) clearTimeout(timer);
  }
  cache.set(hostname, allowed);
  return allowed;
}

function isRedirectStatus(status: number): boolean {
  return status >= 300 && status < 400;
}

/**
 * Guards every request Chromium makes.
 *
 * `route.continue()` follows redirects internally WITHOUT re-entering this
 * handler (verified empirically against Playwright 1.x), so a public,
 * attacker-controlled page could 302 straight into a private address and never
 * be seen here. So instead of continuing, the redirect chain is walked
 * explicitly with `maxRedirects: 0`, re-checking every hop, and only the final
 * response is fulfilled. Fails closed at every step.
 */
export async function guardRoute(
  route: import("playwright").Route,
  cache: Map<string, boolean>
): Promise<void> {
  const requestUrl = route.request().url();
  let parsed: URL | undefined;
  try {
    parsed = new URL(requestUrl);
  } catch {
    parsed = undefined;
  }
  if (!parsed) {
    await route.abort();
    return;
  }
  // No network, no DNS hostname, no SSRF surface — and `file:` is how the local
  // test fixture is loaded.
  if (NON_NETWORK_SCHEMES.has(parsed.protocol)) {
    await route.continue();
    return;
  }
  if (!(await isPublicHttpUrl(requestUrl, cache))) {
    await route.abort();
    return;
  }

  let currentUrl = requestUrl;
  let response = await route.fetch({ maxRedirects: 0 });
  for (let hop = 0; isRedirectStatus(response.status()); hop++) {
    const location = response.headers()["location"];
    if (!location || hop >= MAX_REDIRECT_HOPS) {
      await response.dispose();
      await route.abort();
      return;
    }
    try {
      currentUrl = new URL(location, currentUrl).toString();
    } catch {
      await response.dispose();
      await route.abort();
      return;
    }
    if (!(await isPublicHttpUrl(currentUrl, cache))) {
      await response.dispose();
      await route.abort();
      return;
    }
    await response.dispose();
    response = await route.fetch({ url: currentUrl, maxRedirects: 0 });
  }
  await route.fulfill({ response });
}

export interface ComputedStyleResult {
  bg?: string;
  text?: string;
  accent?: string;
  headingFont?: string;
  bodyFont?: string;
}

export async function extractComputedStyles(url: string): Promise<ComputedStyleResult> {
  // Mirror the static pass's SSRF guard (fetchText -> assertPublicHostname).
  // Done FIRST, before anything is installed or launched, so a private target
  // never gets as far as spawning a browser.
  const target = new URL(url);
  let navigationUrl = url;
  if (!NON_NETWORK_SCHEMES.has(target.protocol)) {
    await assertPublicHostname(target.hostname);
    // Resolve the navigation's redirect chain here, validating every hop, so
    // Chromium navigates directly to the final URL and the document's base URL
    // is correct. guardRoute below fulfills against the requesting URL, so
    // letting it handle the navigation redirect would pin the document to the
    // pre-redirect URL and break relative subresource hrefs — which would
    // silently yield UA-default colors instead of the brand's.
    navigationUrl = await resolvePublicUrl(url);
  }

  ensurePlaywrightInstalled();
  // Dynamic import so `playwright` is only required at runtime, after the
  // on-demand install above — never at module load time, keeping it out of
  // create-theme's static dependency graph for users who never use this.
  const playwrightModule = (await import("playwright")) as typeof import("playwright");
  const browser = await playwrightModule.chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    // A public page can still reference private addresses via subresources
    // (images, iframes, scripts) or redirect into them. Every request Chromium
    // makes goes through the same public-hostname check, cached per hostname so
    // a page with many subresources doesn't re-resolve.
    const hostnameCache = new Map<string, boolean>();
    await page.route("**/*", async (route) => {
      try {
        await guardRoute(route, hostnameCache);
      } catch {
        // Fail closed: any error resolving, fetching or fulfilling the request
        // blocks it rather than letting it through unchecked.
        try {
          await route.abort();
        } catch {
          // The page may have navigated away or closed; nothing to do.
        }
      }
    });
    await page.goto(navigationUrl, { waitUntil: "networkidle", timeout: 15_000 });
    return await page.evaluate(() => {
      function rgbToHex(rgb: string): string | undefined {
        const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!m) return undefined;
        return "#" + [m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, "0")).join("");
      }
      const bodyStyle = getComputedStyle(document.body);
      const heading = document.querySelector("h1, h2");
      const headingStyle = heading ? getComputedStyle(heading) : undefined;
      const button = document.querySelector('button, .btn, [class*="button"], a.cta');
      const buttonStyle = button ? getComputedStyle(button) : undefined;
      return {
        bg: rgbToHex(bodyStyle.backgroundColor),
        text: rgbToHex(bodyStyle.color),
        accent: buttonStyle ? rgbToHex(buttonStyle.backgroundColor) : undefined,
        headingFont: headingStyle?.fontFamily.split(",")[0]?.replace(/["']/g, "").trim(),
        bodyFont: bodyStyle.fontFamily.split(",")[0]?.replace(/["']/g, "").trim(),
      };
    });
  } finally {
    await browser.close();
  }
}
