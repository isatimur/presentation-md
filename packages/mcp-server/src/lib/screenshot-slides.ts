/**
 * T2/T3 slide screenshots via headless Chrome/Chromium.
 * Isolates each .slide into its own mini-HTML so capture does not depend on
 * hash-scroll timing (more reliable than #__shot for headless Chrome).
 */
import { spawn } from "node:child_process";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomBytes } from "node:crypto";

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

const OPEN_TAG_RE =
  /<(section|div)\b[^>]*class\s*=\s*("[^"]*"|'[^']*')[^>]*>/gi;

function hasSlideClass(quoted: string): boolean {
  return quoted.slice(1, -1).split(/\s+/).includes("slide");
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
  for (let i = 0; i < opens.length; i++) {
    const start = opens[i]!.start;
    const end = i + 1 < opens.length ? opens[i + 1]!.start : html.length;
    let slice = html.slice(start, end);
    const close = new RegExp(`</${opens[i]!.tag}\\s*>`, "i");
    const closeMatch = slice.match(close);
    if (closeMatch && closeMatch.index != null) {
      slice = slice.slice(0, closeMatch.index + closeMatch[0].length);
    }
    chunks.push(slice);
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
  const head = headMatch?.[0] ?? '<head><meta charset="utf-8"/></head>';
  const forceCss = `<style>
html,body{margin:0;padding:0;overflow:hidden;height:100%;}
html{scroll-snap-type:none !important;}
.slide{min-height:100vh !important;height:100vh !important;}
.reveal{opacity:1 !important;transform:none !important;animation:none !important;}
.slide .reveal,.slide.in-view .reveal{opacity:1 !important;}
.nav-hint,.pmd-attribution{display:none !important;}
</style>`;
  return `<!doctype html><html>${head}${forceCss}<body>${openDeck}${slideOuterHtml}</main>
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

function runChrome(
  chrome: string,
  args: string[],
  timeoutMs = 25000
): Promise<{ code: number | null }> {
  return new Promise((resolve) => {
    const child = spawn(chrome, args, { stdio: "ignore" });
    const t = setTimeout(() => {
      child.kill("SIGKILL");
      resolve({ code: null });
    }, timeoutMs);
    child.on("close", (code) => {
      clearTimeout(t);
      resolve({ code });
    });
    child.on("error", () => {
      clearTimeout(t);
      resolve({ code: null });
    });
  });
}

export async function screenshotSlides(
  html: string,
  opts: {
    shotsDir?: string;
    width?: number;
    height?: number;
    maxSlides?: number;
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
  const n = Math.min(Math.max(chunks.length, 1), opts.maxSlides ?? 40);
  const shots: ShotMeta[] = [];

  for (let i = 1; i <= n; i++) {
    const idx = String(i).padStart(2, "0");
    const outPath = join(shotsDir, `slide-${idx}.png`);
    const chunk =
      chunks[i - 1] ?? `<section class="slide"><p>missing slide ${i}</p></section>`;
    const isolated = isolateSlideHtml(html, chunk);
    const isoPath = join(shotsDir, `slide-${idx}.html`);
    await writeFile(isoPath, isolated, "utf-8");

    await runChrome(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--window-size=${width},${height}`,
      "--virtual-time-budget=5000",
      "--run-all-compositor-stages-before-draw",
      `--screenshot=${outPath}`,
      `file://${isoPath}`,
    ]);

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
