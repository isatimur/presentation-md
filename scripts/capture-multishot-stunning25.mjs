#!/usr/bin/env node
/**
 * Capture stunning-25 multi-shot wall PNGs (Title + Bento + Compare) at 2×.
 *
 * Sources: structured gallery proofs (web/examples/structured/*.html).
 * Title plates reuse web/previews/hero/{slug}.png when present (already 2× craft).
 * Bento / Compare are captured fresh into web/previews/wall/.
 *
 * Run: node scripts/capture-multishot-stunning25.mjs
 * Optional: ONLY=novaspark-pitch,bounce-launch node scripts/capture-multishot-stunning25.mjs
 */
import { createRequire } from 'node:module';
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const webRoot = path.join(root, 'web');
const heroDir = path.join(webRoot, 'previews', 'hero');
const outDir = path.join(webRoot, 'previews', 'wall');
const require = createRequire(import.meta.url);

function loadPlaywright() {
  const candidates = [
    path.join(root, 'packages/core/scripts/node_modules/playwright'),
    path.join(
      process.env.HOME || '',
      '.nvm/versions/node/v22.22.0/lib/node_modules/@playwright/cli/node_modules/playwright'
    ),
  ];
  for (const p of candidates) {
    try {
      return require(p);
    } catch {
      /* try next */
    }
  }
  throw new Error('playwright not found — install via packages/core/scripts or @playwright/cli');
}

const { chromium } = loadPlaywright();

/** Stunning-25 flagships — layout trio from structured proofs */
const DECKS = [
  { slug: 'novaspark-pitch', theme: 'aurora-glass', name: 'NovaSpark AI' },
  { slug: 'meridian-sales', theme: 'ft-editorial', name: 'Meridian Analytics' },
  { slug: 'bounce-launch', theme: 'genz-bento', name: 'Bounce' },
  { slug: 'solstice-update', theme: 'luxury-minimalist', name: 'Solstice Capital' },
  { slug: 'retronet-demo', theme: 'crt-terminal', name: 'RetroNet' },
  { slug: 'gridsystems-studio', theme: 'swiss-typographic', name: 'Grid Systems' },
  { slug: 'monolith-seriesa', theme: 'brutalist-acid', name: 'MONOLITH' },
  { slug: 'jellybean-launch', theme: 'candy-pop', name: 'Jellybean' },
  { slug: 'axiom-robotics', theme: 'aerospace-hud', name: 'Axiom Robotics' },
  { slug: 'atelier-brand', theme: 'heritage-editorial', name: 'Atelier No. 9' },
  { slug: 'ledgerline-payout', theme: 'fintech-clean', name: 'Ledgerline' },
  { slug: 'forge-api', theme: 'developer-dark', name: 'Forge' },
  { slug: 'signalbox-report', theme: 'data-editorial', name: 'Signalbox' },
  { slug: 'primary-keynote', theme: 'bauhaus', name: 'Primary' },
  { slug: 'bubbleflow-launch', theme: 'y2k-aero', name: 'BubbleFlow' },
  { slug: 'inkwell-pitch', theme: 'risograph-zine', name: 'Inkwell' },
  { slug: 'neondistrict-platform', theme: 'neon-noir', name: 'Neon District' },
  { slug: 'hygge-brand', theme: 'scandinavian', name: 'Hygge' },
  { slug: 'meridianclub-investor', theme: 'art-deco', name: 'Meridian Club' },
  { slug: 'mallsoft-launch', theme: 'vaporwave', name: 'Mallsoft' },
  { slug: 'dailyledger-mediakit', theme: 'broadsheet', name: 'The Daily Ledger' },
  { slug: 'cloudpeak-pricing', theme: 'glassmorphism', name: 'CloudPeak' },
  { slug: 'pulse-wrapped', theme: 'kinetic-wrapped', name: 'Pulse' },
  { slug: 'verdant-impact', theme: 'botanical-luxe', name: 'Verdant' },
  { slug: 'apsis-mission', theme: 'blueprint', name: 'Apsis' },
];

const LAYOUTS = [
  { key: 'title', selector: '.slide[data-layout="title"]' },
  { key: 'bento', selector: '.slide[data-layout="feature-grid"]' },
  { key: 'compare', selector: '.slide[data-layout="comparison"]' },
];

const only = (process.env.ONLY || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

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

async function waitFonts(page) {
  try {
    await page.evaluate(() => document.fonts && document.fonts.ready);
  } catch {
    /* ignore */
  }
  await page.waitForTimeout(400);
}

async function isolateLayout(page, selector) {
  await page.addStyleTag({
    content: `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        height: 100% !important;
        width: 100% !important;
        background: #0a0c10 !important;
      }
      body > *:not(.slide):not(main):not(script):not(style) { display: none !important; }
      main { display: contents !important; }
      .slide {
        display: none !important;
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
        scroll-snap-align: none !important;
      }
      .nav-hint, .pmd-attribution, .deck-chrome, .controls,
      .slide-counter, .hint, .scroll-hint, [data-chrome] {
        display: none !important;
      }
    `,
  });
  const shown = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return false;
    el.style.setProperty('display', 'flex', 'important');
    el.classList.add('in-view');
    el.querySelectorAll('.reveal').forEach((r) => r.classList.add('in-view'));
    return true;
  }, selector);
  if (!shown) throw new Error(`Missing slide for selector ${selector}`);
  await page.waitForTimeout(280);
}

async function pageHasSelector(page, selector) {
  return (await page.locator(selector).count()) > 0;
}

async function captureLayout(page, base, deck, layout) {
  const structuredUrl = `${base}/examples/structured/${deck.slug}.html`;
  const themeUrl = `${base}/previews/${deck.theme}.html`;
  const out = path.join(outDir, `${deck.slug}-${layout.key}.png`);

  await page.goto(structuredUrl, { waitUntil: 'networkidle', timeout: 90000 });
  await waitFonts(page);
  let source = 'structured';
  if (!(await pageHasSelector(page, layout.selector))) {
    if (!existsSync(path.join(webRoot, 'previews', `${deck.theme}.html`))) {
      throw new Error(`${deck.slug}: no ${layout.key} in structured or theme preview`);
    }
    await page.goto(themeUrl, { waitUntil: 'networkidle', timeout: 90000 });
    await waitFonts(page);
    source = 'theme-preview';
    if (!(await pageHasSelector(page, layout.selector))) {
      throw new Error(`${deck.slug}: missing ${layout.key} even in theme preview`);
    }
  }
  await isolateLayout(page, layout.selector);
  await page.screenshot({
    path: out,
    type: 'png',
    animations: 'disabled',
  });
  return { layout: layout.key, out, bytes: statSync(out).size, source };
}

async function ensureTitle(slug) {
  const hero = path.join(heroDir, `${slug}.png`);
  const wallTitle = path.join(outDir, `${slug}-title.png`);
  if (existsSync(hero)) {
    await copyFile(hero, wallTitle);
    return { layout: 'title', out: wallTitle, bytes: statSync(wallTitle).size, source: 'hero-reuse' };
  }
  return null;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const decks = only.length ? DECKS.filter((d) => only.includes(d.slug)) : DECKS;
  if (!decks.length) throw new Error(`No decks matched ONLY=${process.env.ONLY}`);

  const { server, base } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  const results = [];

  try {
    for (const deck of decks) {
      process.stdout.write(`${deck.slug}… `);
      const entry = { slug: deck.slug, theme: deck.theme, name: deck.name, shots: [] };

      const titleReuse = await ensureTitle(deck.slug);
      if (titleReuse) {
        entry.shots.push(titleReuse);
      } else {
        entry.shots.push(await captureLayout(page, base, deck, LAYOUTS[0]));
      }

      for (const layout of LAYOUTS.slice(1)) {
        entry.shots.push(await captureLayout(page, base, deck, layout));
      }

      results.push(entry);
      const kb = entry.shots.map((s) => `${s.layout}:${(s.bytes / 1024).toFixed(0)}KB`).join(' ');
      console.log(kb);
    }
  } finally {
    await browser.close();
    server.close();
  }

  const manifest = path.join(root, 'output/hero/multishot-manifest.json');
  await mkdir(path.dirname(manifest), { recursive: true });
  await writeFile(manifest, JSON.stringify(results, null, 2));
  console.log(`Wrote ${results.length} × 3 wall shots → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
