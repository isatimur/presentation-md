#!/usr/bin/env node
/**
 * Capture stunning-25 hero PNGs as a portfolio showcase.
 *
 * - Prefer handcrafted gallery craft (web/examples/*.html) TITLE/COVER slides
 * - 2× device pixel ratio → 2560×1440 PNGs (sharp under Ken Burns)
 * - Strip gallery chrome (scroll hints, dots, counters)
 * - Exact 16:9 viewport framing
 */
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const webRoot = path.join(root, 'web');
const outDir = path.join(webRoot, 'previews', 'hero');
const require = createRequire(import.meta.url);
const playwrightPath = path.join(
  process.env.HOME,
  '.nvm/versions/node/v22.22.0/lib/node_modules/@playwright/cli/node_modules/playwright'
);
const { chromium } = require(playwrightPath);

/** Title/cover selectors — premium atmosphere + typography, not mid-deck body */
const DECKS = [
  { slug: 'novaspark-pitch', craft: 'novaspark-pitch.html', slide: '#slide-1' },
  { slug: 'meridian-sales', craft: 'meridian-sales.html', slide: '#s1' },
  { slug: 'bounce-launch', craft: 'bounce-launch.html', slide: '#slide-1' },
  { slug: 'solstice-update', craft: 'solstice-update.html', slide: '.slide-cover' },
  { slug: 'retronet-demo', craft: 'retronet-demo.html', slide: '#s1' },
  { slug: 'gridsystems-studio', craft: 'gridsystems-agency.html', slide: '#s1' },
  { slug: 'monolith-seriesa', craft: 'monolith-seriesa.html', slide: '#slide-1' },
  { slug: 'jellybean-launch', craft: 'jellybean-launch.html', slide: '#slide-1' },
  { slug: 'axiom-robotics', craft: 'axiom-robotics.html', slide: '#slide-1' },
  { slug: 'atelier-brand', craft: 'atelier-brand.html', slide: '.slide-cover' },
  { slug: 'ledgerline-payout', craft: 'ledgerline-sales.html', slide: '#slide-1' },
  { slug: 'forge-api', craft: 'forge-demo.html', slide: '#slide-1' },
  { slug: 'signalbox-report', craft: 'signalbox-report.html', slide: '#s1' },
  { slug: 'primary-keynote', craft: 'primary-keynote.html', slide: '#slide-1' },
  { slug: 'bubbleflow-launch', craft: 'bubbleflow-launch.html', slide: '#slide-1' },
  { slug: 'inkwell-pitch', craft: 'inkwell-pitch.html', slide: '#slide-1' },
  { slug: 'neondistrict-platform', craft: 'neondistrict-launch.html', slide: '#slide-1' },
  { slug: 'hygge-brand', craft: 'hygge-brand.html', slide: '#slide-1' },
  { slug: 'meridianclub-investor', craft: 'meridianclub-investor.html', slide: '#slide-1' },
  { slug: 'mallsoft-launch', craft: 'mallsoft-launch.html', slide: '#slide-1' },
  { slug: 'dailyledger-mediakit', craft: 'dailyledger-mediakit.html', slide: '#slide-1' },
  { slug: 'cloudpeak-pricing', craft: 'cloudpeak-pricing.html', slide: '#slide-1' },
  { slug: 'pulse-wrapped', craft: 'pulse-wrapped.html', slide: '#slide-1' },
  { slug: 'verdant-impact', craft: 'verdant-impact.html', slide: '#slide-1' },
  { slug: 'apsis-mission', craft: 'apsis-mission.html', slide: '#slide-1' },
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.json': 'application/json',
};

const CHROME_CSS = `
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
    height: 100% !important;
    width: 100% !important;
    scroll-behavior: auto !important;
    scroll-snap-type: none !important;
  }
  .slide {
    min-height: 100vh !important;
    height: 100vh !important;
    width: 100vw !important;
    max-width: none !important;
    scroll-snap-align: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    border: none !important;
  }
  /* Gallery chrome — never ship in portfolio assets */
  .nav, nav, header.deck-nav, .deck-nav, .deck-chrome, .controls, .control-bar,
  .slide-counter, #slide-counter, .slide-num, .slide-num-badge, .slide-num-light, .slide-num-lt,
  .pager, .dots, .pagination, .dot-nav, .progress-dots, .slide-dots,
  .hint, .scroll-hint, .keys-hint, .nav-hint, .kbd-hint,
  [class*="keys"], [class*="scroll-hint"], [data-chrome],
  .fixed-bottom, .bottom-bar, .floating-hint {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
`;

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const filePath = path.join(webRoot, urlPath === '/' ? 'index.html' : urlPath);
      if (!filePath.startsWith(webRoot) || !existsSync(filePath) || !statSync(filePath).isFile()) {
        res.writeHead(404);
        res.end('not found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      createReadStream(filePath).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, base: `http://127.0.0.1:${port}` });
    });
  });
}

async function stripChrome(page) {
  await page.addStyleTag({ content: CHROME_CSS });
  await page.evaluate(() => {
    const kill = (el) => {
      try { el.remove(); } catch { /* ignore */ }
    };
    const chromeRe = /keys|scroll|navigate|↑|↓|arrow keys/i;
    document.querySelectorAll('body *').forEach((el) => {
      const t = (el.textContent || '').trim();
      if (t.length < 6 || t.length > 100 || el.children.length > 4) return;
      if (!chromeRe.test(t)) return;
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const nearBottom = rect.bottom > window.innerHeight - 56;
      if (
        cs.position === 'fixed' ||
        cs.position === 'sticky' ||
        cs.position === 'absolute' ||
        !el.closest('.slide') ||
        nearBottom
      ) {
        kill(el);
      }
    });
    document.querySelectorAll('[class*="dot"], [class*="pager"], [class*="progress"]').forEach((el) => {
      if (!el.closest('.slide')) kill(el);
    });
  });
}

async function waitFonts(page) {
  try {
    await page.evaluate(() => document.fonts && document.fonts.ready);
  } catch { /* ignore */ }
  await page.waitForTimeout(450);
}

async function captureCraftTitle(page, base, deck) {
  const craftPath = path.join(webRoot, 'examples', deck.craft);
  if (!existsSync(craftPath)) return null;

  await page.goto(`${base}/examples/${deck.craft}`, {
    waitUntil: 'networkidle',
    timeout: 90000,
  });
  await stripChrome(page);
  await waitFonts(page);

  const slide = page.locator(deck.slide).first();
  if (!(await slide.count())) return null;

  await slide.evaluate((el) => {
    el.scrollIntoView({ block: 'start', inline: 'nearest' });
    window.scrollTo(0, el.offsetTop || 0);
  });
  await page.waitForTimeout(350);
  await stripChrome(page);

  // Full viewport = exact 16:9 at DPR 2 → 2560×1440
  return 'craft-title';
}

async function captureStructuredTitle(page, base, deck) {
  await page.goto(`${base}/examples/structured/${deck.slug}.html`, {
    waitUntil: 'networkidle',
    timeout: 90000,
  });
  await page.addStyleTag({
    content: `
      html, body { margin:0!important; background:#0a0c10!important; overflow:hidden!important; }
      body > *:not(.slide):not(script):not(style) { display:none!important; }
      .slide {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        max-width: none !important;
        aspect-ratio: auto !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        border: none !important;
      }
      .slide:not(:first-of-type) { display: none !important; }
    `,
  });
  await waitFonts(page);
  const title = page.locator('.slide.title-slide, [data-layout="title"], .slide').first();
  if (!(await title.count())) throw new Error(`No structured title for ${deck.slug}`);
  await title.evaluate((el) => el.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(300);
  return 'structured-title';
}

async function captureDeck(page, base, deck) {
  const out = path.join(outDir, `${deck.slug}.png`);
  let source = await captureCraftTitle(page, base, deck);
  if (!source) {
    source = await captureStructuredTitle(page, base, deck);
  }
  await page.screenshot({
    path: out,
    type: 'png',
    animations: 'disabled',
  });
  const bytes = statSync(out).size;
  const meta = await page.evaluate(() => ({
    dpr: window.devicePixelRatio,
    vw: window.innerWidth,
    vh: window.innerHeight,
  }));
  return { slug: deck.slug, source, bytes, ...meta, out };
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const { server, base } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  const results = [];
  try {
    for (const deck of DECKS) {
      process.stdout.write(`capturing ${deck.slug}… `);
      const r = await captureDeck(page, base, deck);
      results.push(r);
      console.log(`${r.source} ${(r.bytes / 1024).toFixed(0)}KB @${r.dpr}x ${r.vw}×${r.vh}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
  const manifest = path.join(root, 'output/hero/capture-manifest-2x.json');
  await mkdir(path.dirname(manifest), { recursive: true });
  await writeFile(manifest, JSON.stringify(results, null, 2));
  const weak = results.filter((r) => r.bytes < 80_000);
  if (weak.length) {
    console.warn('WARN small files:', weak.map((w) => `${w.slug}:${(w.bytes / 1024).toFixed(0)}KB`).join(', '));
  }
  console.log(`Wrote ${results.length} × 2x hero PNGs → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
