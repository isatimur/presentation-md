/// <reference lib="dom" />

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { assertPublicHostname } from "./fetch-css.js";

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

/**
 * Whether Chromium should be allowed to issue this request. Fails closed: an
 * unparseable URL, a private/internal address, or a DNS lookup that doesn't
 * answer within DNS_TIMEOUT_MS is blocked rather than allowed through.
 */
async function isRequestAllowed(rawUrl: string, cache: Map<string, boolean>): Promise<boolean> {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return false;
  }
  if (NON_NETWORK_SCHEMES.has(parsed.protocol)) return true;
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
  if (!NON_NETWORK_SCHEMES.has(target.protocol)) {
    await assertPublicHostname(target.hostname);
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
      const allowed = await isRequestAllowed(route.request().url(), hostnameCache);
      try {
        if (allowed) await route.continue();
        else await route.abort();
      } catch {
        // The page may have navigated away or closed; nothing to do.
      }
    });
    await page.goto(url, { waitUntil: "networkidle", timeout: 15_000 });
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
