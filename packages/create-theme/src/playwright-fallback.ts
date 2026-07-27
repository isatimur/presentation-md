import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");

function ensurePlaywrightInstalled(): void {
  const marker = join(PACKAGE_ROOT, "node_modules", "playwright");
  if (existsSync(marker)) return;
  const install = spawnSync(
    "npm",
    ["install", "--prefix", PACKAGE_ROOT, "--no-save", "playwright@^1.46.0"],
    { stdio: "inherit" }
  );
  if (install.status !== 0) {
    throw new Error("Failed to install Playwright for the brand-import computed-style fallback.");
  }
  const chromium = spawnSync(
    join(PACKAGE_ROOT, "node_modules", ".bin", "playwright"),
    ["install", "chromium"],
    { stdio: "inherit" }
  );
  if (chromium.status !== 0) {
    throw new Error("Failed to install Chromium for the brand-import computed-style fallback.");
  }
}

export interface ComputedStyleResult {
  bg?: string;
  text?: string;
  accent?: string;
  headingFont?: string;
  bodyFont?: string;
}

export async function extractComputedStyles(url: string): Promise<ComputedStyleResult> {
  ensurePlaywrightInstalled();
  // Dynamic import so `playwright` is only required at runtime, after the
  // on-demand install above — never at module load time, keeping it out of
  // create-theme's static dependency graph for users who never use this.
  const playwrightModule = (await import("playwright")) as typeof import("playwright");
  const browser = await playwrightModule.chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
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
