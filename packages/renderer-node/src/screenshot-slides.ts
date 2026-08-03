/**
 * T2/T3 slide screenshots via headless Chrome/Chromium.
 * Isolates each .slide into its own mini-HTML so capture does not depend on
 * hash-scroll timing (more reliable than #__shot for headless Chrome).
 */
import { spawn } from "node:child_process";
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomBytes } from "node:crypto";
import { killProcessTree } from "./process-tree.js";

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "google-chrome",
  "chromium",
  "chromium-browser",
  "chrome",
];

export interface ShotMeta {
  slide: number;
  path: string;
  bytes: number;
  width?: number;
  height?: number;
  warn?: string;
}

export interface ScreenshotResult {
  ok: boolean;
  chrome_path?: string;
  chrome_missing?: boolean;
  shots_dir?: string;
  shots: ShotMeta[];
  detail?: string;
}

async function existsExecutable(path: string): Promise<boolean> {
  try {
    await access(path, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

async function which(cmd: string): Promise<string | undefined> {
  return new Promise((resolve) => {
    const child = spawn("which", [cmd]);
    let out = "";
    child.stdout.on("data", (d: Buffer) => {
      out += d.toString();
    });
    child.on("close", (code) => {
      const p = out.trim();
      resolve(code === 0 && p ? p : undefined);
    });
    child.on("error", () => resolve(undefined));
  });
}

export async function findChrome(): Promise<string | undefined> {
  const preferred = process.env["PRESENTATION_MD_CHROME_PATH"];
  if (preferred && (await existsExecutable(preferred))) return preferred;
  for (const c of CHROME_CANDIDATES) {
    if (c.includes("/")) {
      if (await existsExecutable(c)) return c;
    } else {
      const found = await which(c);
      if (found && (await existsExecutable(found))) return found;
    }
  }
  return undefined;
}

const DEFAULT_SCREENSHOT_TIMEOUT_MS = 25_000;

function screenshotTimeoutMs(): number {
  const raw = process.env["PRESENTATION_MD_SCREENSHOT_TIMEOUT_MS"];
  if (raw == null || raw === "") return DEFAULT_SCREENSHOT_TIMEOUT_MS;
  const timeoutMs = Number(raw);
  if (!Number.isSafeInteger(timeoutMs) || timeoutMs <= 0) {
    throw new Error("PRESENTATION_MD_SCREENSHOT_TIMEOUT_MS must be a positive integer");
  }
  return timeoutMs;
}

const OPEN_TAG_RE =
  /<(section|div)\b[^>]*class\s*=\s*("[^"]*"|'[^']*')[^>]*>/gi;

function hasSlideClass(quoted: string): boolean {
  return quoted.slice(1, -1).split(/\s+/).includes("slide");
}

function findElementEnd(
  html: string,
  open: { end: number; tag: string }
): number {
  const tagPattern = new RegExp(`<${open.tag}\\b[^>]*>|</${open.tag}\\s*>`, "gi");
  tagPattern.lastIndex = open.end;
  let depth = 1;
  let match: RegExpExecArray | null;
  while ((match = tagPattern.exec(html))) {
    if (/^<\//.test(match[0])) {
      depth -= 1;
      if (depth === 0) return match.index + match[0].length;
    } else if (!/\/\s*>$/.test(match[0])) {
      depth += 1;
    }
  }
  return html.length;
}

/** Extract outer HTML of each top-level .slide element. */
export function extractSlideChunks(html: string): string[] {
  const opens: { start: number; end: number; tag: string }[] = [];
  OPEN_TAG_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = OPEN_TAG_RE.exec(html))) {
    if (hasSlideClass(m[2]!)) {
      opens.push({ start: m.index, end: m.index + m[0].length, tag: m[1]!.toLowerCase() });
    }
  }
  const chunks: string[] = [];
  let consumedUntil = 0;
  for (const open of opens) {
    if (open.start < consumedUntil) continue;
    const start = open.start;
    const end = findElementEnd(html, open);
    chunks.push(html.slice(start, end));
    consumedUntil = end;
  }
  return chunks;
}

/** Build a one-slide deck HTML that forces reveals visible (no scroll needed). */
export function isolateSlideHtml(fullHtml: string, slideOuterHtml: string): string {
  const headMatch = fullHtml.match(/<head\b[^>]*>[\s\S]*?<\/head>/i);
  const deckAttr =
    fullHtml.match(/<main\b[^>]*class\s*=\s*["'][^"']*deck[^"']*["'][^>]*>/i) ??
    fullHtml.match(/<(?:main|div)\b[^>]*data-surface\s*=\s*["'][^"']+["'][^>]*>/i);
  const openDeck = deckAttr?.[0] ?? `<main class="deck">`;
  const deckTag = openDeck.match(/^<([a-z][\w:-]*)\b/i)?.[1] ?? "main";
  const head = headMatch?.[0] ?? '<head><meta charset="utf-8"/></head>';
  const forceCss = `<style>
html,body{margin:0;padding:0;overflow:hidden;height:100%;}
html{scroll-snap-type:none !important;}
.slide{min-height:100vh !important;height:100vh !important;}
.reveal{opacity:1 !important;transform:none !important;animation:none !important;}
.slide .reveal,.slide.in-view .reveal{opacity:1 !important;}
.nav-hint,.pmd-attribution,.pmd-present-bar,.pmd-notes-rail,.pmd-curtain,.pmd-present-help{display:none !important;}
</style>`;
  return `<!doctype html><html>${head}${forceCss}<body>${openDeck}${slideOuterHtml}</${deckTag}>
<script>document.querySelectorAll(".slide,.reveal").forEach(function(el){el.classList.add("in-view");});</script>
</body></html>`;
}

function readPngSize(buf: Buffer): { width: number; height: number } | undefined {
  if (buf.length < 24) return undefined;
  if (buf[0] !== 0x89 || buf[1] !== 0x50) return undefined;
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  if (!width || !height) return undefined;
  return { width, height };
}

const PNG_IEND = Buffer.from([
  0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
]);

function isCompletePng(buf: Buffer): boolean {
  return buf.length >= 24 && buf.subarray(-PNG_IEND.length).equals(PNG_IEND);
}

function runChrome(
  chrome: string,
  args: string[],
  outputPath: string,
  timeoutMs = screenshotTimeoutMs()
): Promise<{ code: number | null }> {
  return new Promise((resolve) => {
    const child = spawn(chrome, args, {
      stdio: "ignore",
      detached: process.platform !== "win32",
    });
    let settled = false;
    let pollTimer: ReturnType<typeof setTimeout> | undefined;

    const finish = (code: number | null): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutTimer);
      clearTimeout(pollTimer);
      resolve({ code });
    };

    const stopAfterCapture = (): void => {
      killProcessTree(child);
    };

    const pollOutput = async (): Promise<void> => {
      if (settled) return;
      try {
        if (isCompletePng(await readFile(outputPath))) {
          stopAfterCapture();
          return;
        }
      } catch {
        // Chrome has not created the screenshot yet.
      }
      pollTimer = setTimeout(() => void pollOutput(), 100);
    };

    const timeoutTimer = setTimeout(() => {
      killProcessTree(child);
    }, timeoutMs);
    pollTimer = setTimeout(() => void pollOutput(), 100);
    child.on("close", finish);
    child.on("error", () => finish(null));
  });
}

export async function screenshotSlides(
  html: string,
  opts: {
    shotsDir?: string;
    width?: number;
    height?: number;
    maxSlides?: number;
    /** 1-based slide numbers to capture (skips others). Defaults to 1..min(count, maxSlides). */
    slideIndices?: number[];
  } = {}
): Promise<ScreenshotResult> {
  const chrome = await findChrome();
  if (!chrome) {
    return {
      ok: false,
      chrome_missing: true,
      shots: [],
      detail: "NO_CHROME: install Google Chrome/Chromium, or fall back to T1 HTML metrics only.",
    };
  }

  const width = opts.width ?? 1600;
  const height = opts.height ?? 900;
  const shotsDir =
    opts.shotsDir ??
    join(tmpdir(), `pmd-judge-shots-${randomBytes(6).toString("hex")}`);
  await mkdir(shotsDir, { recursive: true });

  await writeFile(join(shotsDir, "deck.html"), html, "utf-8");
  const chunks = extractSlideChunks(html);
  const slideCount = Math.max(chunks.length, 1);
  const maxSlides = opts.maxSlides ?? 40;
  const indices =
    opts.slideIndices && opts.slideIndices.length > 0
      ? [
          ...new Set(
            opts.slideIndices
              .map((n) => Math.floor(n))
              .filter((n) => n >= 1 && n <= slideCount)
          ),
        ].sort((a, b) => a - b)
      : Array.from({ length: Math.min(slideCount, maxSlides) }, (_, i) => i + 1);
  const shots: ShotMeta[] = [];
  const chromeProfileDir = await mkdtemp(join(tmpdir(), "pmd-chrome-profile-"));

  try {
    for (const i of indices) {
      const idx = String(i).padStart(2, "0");
      const outPath = join(shotsDir, `slide-${idx}.png`);
      const chunk =
        chunks[i - 1] ?? `<section class="slide"><p>missing slide ${i}</p></section>`;
      const isolated = isolateSlideHtml(html, chunk);
      const isoPath = join(shotsDir, `slide-${idx}.html`);
      await writeFile(isoPath, isolated, "utf-8");

      await runChrome(
        chrome,
        [
          "--headless=new",
          "--disable-gpu",
          "--hide-scrollbars",
          "--no-first-run",
          "--no-default-browser-check",
          `--user-data-dir=${chromeProfileDir}`,
          `--window-size=${width},${height}`,
          "--virtual-time-budget=5000",
          "--run-all-compositor-stages-before-draw",
          `--screenshot=${outPath}`,
          `file://${isoPath}`,
        ],
        outPath
      );

      try {
        const buf = await readFile(outPath);
        const size = readPngSize(buf);
        const meta: ShotMeta = {
          slide: i,
          path: outPath,
          bytes: buf.length,
          width: size?.width,
          height: size?.height,
        };
        if (buf.length < 4_000) {
          meta.warn = "shot looks near-empty (tiny file) — check overflow/blank slide";
        }
        shots.push(meta);
      } catch {
        shots.push({
          slide: i,
          path: outPath,
          bytes: 0,
          warn: "screenshot file missing after Chrome run",
        });
      }
    }
  } finally {
    await rm(chromeProfileDir, { recursive: true, force: true });
  }

  return {
    ok: shots.some((s) => s.bytes > 0),
    chrome_path: chrome,
    shots_dir: shotsDir,
    shots,
    detail: shots.every((s) => s.bytes > 0)
      ? `Captured ${shots.length} isolated slide screenshot(s).`
      : `Partial capture: ${shots.filter((s) => s.bytes > 0).length}/${shots.length} ok.`,
  };
}
