#!/usr/bin/env node
/**
 * Capture denser hero PNGs for the stunning-25 carousel.
 * Prefers structured feature-grid / image-hero / comparison over sparse titles,
 * so craft survives the left paper-wash sheen.
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

const DECKS = [
  { slug: 'novaspark-pitch', craft: 'novaspark-pitch.html', craftSlide: '#slide-4' },
  { slug: 'meridian-sales', craft: 'meridian-sales.html', craftSlide: '#s4' },
  { slug: 'bounce-launch', craft: 'bounce-launch.html', craftSlide: '#slide-4' },
  { slug: 'solstice-update', craft: 'solstice-update.html', craftSlide: '.slide-portfolio' },
  { slug: 'retronet-demo', craft: 'retronet-demo.html', craftSlide: '#s5' },
  { slug: 'gridsystems-studio', craft: 'gridsystems-agency.html', craftSlide: '#s4' },
  { slug: 'monolith-seriesa', craft: 'monolith-seriesa.html', craftSlide: '#slide-4' },
  { slug: 'jellybean-launch', craft: 'jellybean-launch.html', craftSlide: '#slide-3' },
  { slug: 'axiom-robotics', craft: 'axiom-robotics.html', craftSlide: '#slide-4' },
  { slug: 'atelier-brand', craft: 'atelier-brand.html', craftSlide: '.slide-craft' },
  { slug: 'ledgerline-payout', craft: 'ledgerline-sales.html', craftSlide: '#slide-4' },
  { slug: 'forge-api', craft: 'forge-demo.html', craftSlide: '#slide-4' },
  { slug: 'signalbox-report', craft: 'signalbox-report.html', craftSlide: '#s4' },
  { slug: 'primary-keynote', craft: 'primary-keynote.html', craftSlide: '#slide-3' },
  { slug: 'bubbleflow-launch', craft: 'bubbleflow-launch.html', craftSlide: '#slide-4' },
  { slug: 'inkwell-pitch', craft: 'inkwell-pitch.html', craftSlide: '#slide-3' },
  { slug: 'neondistrict-platform', craft: 'neondistrict-launch.html', craftSlide: '#slide-4' },
  { slug: 'hygge-brand', craft: 'hygge-brand.html', craftSlide: '#slide-4' },
  { slug: 'meridianclub-investor', craft: 'meridianclub-investor.html', craftSlide: '#slide-4' },
  { slug: 'mallsoft-launch', craft: 'mallsoft-launch.html', craftSlide: '#slide-3' },
  { slug: 'dailyledger-mediakit', craft: 'dailyledger-mediakit.html', craftSlide: '#slide-4' },
  { slug: 'cloudpeak-pricing', craft: 'cloudpeak-pricing.html', craftSlide: '#slide-3' },
  { slug: 'pulse-wrapped', craft: 'pulse-wrapped.html', craftSlide: '#slide-2' },
  { slug: 'verdant-impact', craft: 'verdant-impact.html', craftSlide: '#slide-4' },
  { slug: 'apsis-mission', craft: 'apsis-mission.html', craftSlide: '#slide-4' },
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

async function pickStructuredSlide(page) {
  const order = [
    '[data-layout="feature-grid"]',
    '[data-layout="image-hero"]',
    '[data-layout="comparison"]',
    '[data-layout="stat-row"]',
    '[data-layout="two-column"]',
    '.slide',
  ];
  for (const sel of order) {
    const el = page.locator(sel).first();
    if (await el.count()) return el;
  }
  return null;
}

async function captureDeck(page, base, deck) {
  const out = path.join(outDir, `${deck.slug}.png`);
  // Prefer craft gallery denser slide when available — richest handcrafted visuals
  const craftPath = path.join(webRoot, 'examples', deck.craft);
  let source = 'structured';
  let ok = false;

  if (existsSync(craftPath) && deck.craftSlide) {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(`${base}/examples/${deck.craft}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(500);
    const craft = page.locator(deck.craftSlide).first();
    if (await craft.count()) {
      await craft.evaluate((el) => {
        el.scrollIntoView({ block: 'start', inline: 'nearest' });
      });
      await page.waitForTimeout(450);
      // Full viewport of the craft slide — fills the hero plane with theme energy
      await page.screenshot({ path: out, type: 'png' });
      source = 'craft';
      ok = true;
    }
  }

  if (!ok) {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto(`${base}/examples/structured/${deck.slug}.html`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await page.waitForTimeout(400);
    const slide = await pickStructuredSlide(page);
    if (!slide) throw new Error(`No slide for ${deck.slug}`);
    await slide.evaluate((el) => {
      el.scrollIntoView({ block: 'center', inline: 'nearest' });
    });
    await page.waitForTimeout(300);
    // Element screenshot avoids neighboring slides bleeding into the crop
    await slide.screenshot({ path: out, type: 'png' });
    source = 'structured';
  }

  const bytes = statSync(out).size;
  return { slug: deck.slug, source, bytes, out };
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const { server, base } = await startServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];
  try {
    for (const deck of DECKS) {
      process.stdout.write(`capturing ${deck.slug}… `);
      const r = await captureDeck(page, base, deck);
      results.push(r);
      console.log(`${r.source} ${(r.bytes / 1024).toFixed(1)}KB`);
    }
  } finally {
    await browser.close();
    server.close();
  }
  const manifest = path.join(root, 'output/hero/capture-manifest.json');
  await mkdir(path.dirname(manifest), { recursive: true });
  await writeFile(manifest, JSON.stringify(results, null, 2));
  console.log(`Wrote ${results.length} hero PNGs → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
