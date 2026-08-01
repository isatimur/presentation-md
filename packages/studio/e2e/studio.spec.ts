import { test, expect } from "@playwright/test";

test("edit a slide, see the live preview update, and export .pptx", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/");

  const frame = page.frameLocator(".preview-frame");

  // The example deck loads and renders in the preview iframe.
  await expect(frame.locator("section").first()).toBeVisible();
  await expect(frame.getByText("Acme All-Hands")).toBeVisible();

  // Editing the selected (title) slide's heading updates the preview live.
  const heading = page.getByLabel("Heading").first();
  await heading.fill("Edited Title");
  await expect(frame.getByText("Edited Title")).toBeVisible();

  // Export to PPTX downloads a non-empty .pptx file.
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /Download \.pptx/ }).click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/\.pptx$/);

  // Source ▾ → Download HTML + PDF (cached render; panel above audit).
  const sourceMenu = page.locator("details.export-more");
  await sourceMenu.locator("summary").click();
  await expect(page.getByRole("button", { name: /Download HTML/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Download Markdown/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible();
  const [mdDownload] = await Promise.all([
    page.waitForEvent("download", { timeout: 15_000 }),
    page.getByRole("button", { name: /Download Markdown/i }).click(),
  ]);
  expect(mdDownload.suggestedFilename()).toMatch(/\.md$/);
  await sourceMenu.evaluate((el) => {
    (el as HTMLDetailsElement).open = true;
  });
  const [htmlDownload] = await Promise.all([
    page.waitForEvent("download", { timeout: 15_000 }),
    page.getByRole("button", { name: /Download HTML/i }).click(),
  ]);
  expect(htmlDownload.suggestedFilename()).toMatch(/\.html$/);

  // Force Source ▾ open — downloads / re-renders can collapse <details>.
  await sourceMenu.evaluate((el) => {
    (el as HTMLDetailsElement).open = true;
  });
  await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible();
  const [pdfDownload] = await Promise.all([
    page.waitForEvent("download", { timeout: 90_000 }),
    page.getByRole("button", { name: /Download PDF/i }).click(),
  ]);
  expect(pdfDownload.suggestedFilename()).toMatch(/\.pdf$/);
  const pdfPath = await pdfDownload.path();
  expect(pdfPath).toBeTruthy();
  const { readFile } = await import("node:fs/promises");
  const pdfBytes = await readFile(pdfPath!);
  expect(pdfBytes.subarray(0, 4).toString("utf8")).toBe("%PDF");
  expect(pdfBytes.byteLength).toBeGreaterThan(1_000);
});

test("pick-3 theme compare tray fills slots and can lock a theme", async ({ page }) => {
  await page.goto("/?fresh=1");

  const browser = page.locator("details.theme-browser");
  await browser.locator("summary").click();
  await expect(browser).toHaveAttribute("open", "");
  const panel = browser.locator(".theme-browser-panel");
  await expect(panel).toBeVisible();

  // Add three themes via ⊕ toggles (progressive pick-3).
  const toggles = panel.locator("button.theme-compare-toggle");
  await expect(toggles.first()).toBeVisible();
  await toggles.nth(0).click();
  await toggles.nth(1).click();
  await toggles.nth(2).click();

  const tray = panel.locator(".theme-compare");
  await expect(tray).toBeVisible();
  await expect(tray.getByText(/Compare 3\/3/i)).toBeVisible();

  // Shortlist / pick-3 auto-enables live; default My deck restyles the selected slide.
  await expect(tray.getByRole("button", { name: /Hide live/i })).toBeVisible();
  await expect(tray.getByRole("button", { name: /My deck/i })).toBeVisible();
  await expect(tray.locator(".theme-compare-restyle")).toHaveCount(3);
  await expect(tray.locator(".theme-compare-restyle-frame")).toHaveCount(3);

  // Craft proofs still available as the alternate live mode.
  await tray.getByRole("button", { name: /Craft proofs/i }).click();
  await expect(tray.locator(".theme-compare-shot-strip")).toHaveCount(3);
  await expect(tray.locator(".theme-compare-shot-strip iframe")).toHaveCount(3);
  await expect(tray.locator(".craft-shot-strip-label[data-crop='title']")).toHaveCount(3);
  await expect(tray.locator(".craft-shot-strip-label[data-crop='bento']")).toHaveCount(3);
  await expect(tray.locator(".craft-shot-strip-label[data-crop='comparison']")).toHaveCount(3);

  // Lock the first compared theme (applies theme + craft repair).
  const firstName = await tray.locator(".theme-compare-card strong").first().textContent();
  expect(firstName).toBeTruthy();
  await tray.locator(".theme-compare-card").first().getByRole("button", { name: /^Use$/ }).click();
  await expect(page.locator("details.theme-browser > summary")).toContainText(firstName!.trim());
});

test("Generate modal opens, validates input, and offers the agent-handoff path", async ({ page }) => {
  await page.goto("/");

  // Opening the Generate modal.
  await page.getByRole("button", { name: /Generate/ }).first().click();
  await expect(page.getByRole("heading", { name: "Generate a deck" }).or(page.getByText("Generate a deck"))).toBeVisible();

  // The agent-handoff copy button is disabled until there's a brief.
  const copyBtn = page.getByRole("button", { name: /Copy prompt for your agent/ });
  await expect(copyBtn).toBeDisabled();

  // Typing a brief enables the agent path…
  await page.locator("textarea.brief-input").fill("A launch deck for a developer CLI.");
  await expect(copyBtn).toBeEnabled();

  // Visual pick-3 compare is live by default (shared-iframe shot strip).
  await expect(page.locator(".gen-discover-grid .gen-discover-card")).toHaveCount(3);
  await expect(page.getByRole("button", { name: /Hide live/i })).toBeVisible();
  await expect(page.locator(".gen-discover-shot-strip")).toHaveCount(3);
  await expect(page.locator(".gen-discover-shot-strip iframe")).toHaveCount(3);
  await expect(page.locator(".gen-discover-grid .craft-shot-strip-label[data-crop='title']")).toHaveCount(3);
  await expect(page.locator(".gen-discover-grid .craft-shot-strip-label[data-crop='bento']")).toHaveCount(3);
  await expect(page.locator(".gen-discover-grid .craft-shot-strip-label[data-crop='comparison']")).toHaveCount(3);

  // …and generating without an API key surfaces a clear error (no network call).
  await page.getByRole("button", { name: /^Generate deck$/ }).click();
  await expect(page.getByText(/Enter your Anthropic API key/)).toBeVisible();

  // Craft scaffold lands without a key (MCP scaffold_deck parity).
  await page.getByRole("button", { name: /^launch$/i }).click();
  await page.getByRole("button", { name: /Land launch scaffold/i }).click();
  await expect(page.getByRole("heading", { name: "Generate a deck" }).or(page.getByText("Generate a deck"))).toHaveCount(0);
  const frame = page.frameLocator(".preview-frame");
  await expect(frame.locator("section").first()).toBeVisible();
});


test("loads a curated example via ?example= deep-link", async ({ page }) => {
  await page.goto("/?example=jellybean-launch&fresh=1");
  const frame = page.frameLocator(".preview-frame");
  await expect(frame.getByText(/Snack energy/i).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy link/ })).toBeVisible();
});

test("theme browser mood chips filter the catalog like the site gallery", async ({ page }) => {
  await page.goto("/?fresh=1");

  const browser = page.locator("details.theme-browser");
  await browser.locator("summary").click();
  await expect(browser).toHaveAttribute("open", "");
  const panel = browser.locator(".theme-browser-panel");
  const moodBar = panel.getByRole("toolbar", { name: /Filter themes by mood/i });
  await expect(moodBar).toBeVisible();
  await expect(moodBar.getByRole("button", { name: /^Popular$/ })).toBeVisible();
  await expect(moodBar.getByRole("button", { name: /^Neon$/ })).toBeVisible();

  await moodBar.getByRole("button", { name: /^Popular$/ }).click();
  await expect(panel.locator(".theme-count")).toContainText(/popular/i);
  const popularCount = await panel.locator("li").count();
  expect(popularCount).toBeGreaterThanOrEqual(15);
  expect(popularCount).toBeLessThanOrEqual(25);

  await moodBar.getByRole("button", { name: /^Neon$/ }).click();
  await expect(panel.locator(".theme-count")).toContainText(/neon/i);
  const neonCount = await panel.locator("li").count();
  expect(neonCount).toBeGreaterThan(0);
  expect(neonCount).toBeLessThan(popularCount);

  // Compare 3 — safe/bold/wildcard fill from the active browse filter.
  await panel.getByRole("button", { name: /^Compare 3$/ }).click();
  const tray = panel.locator(".theme-compare");
  await expect(tray).toBeVisible();
  await expect(tray.getByText(/Compare 3\/3/i)).toBeVisible();
  await expect(tray.getByRole("button", { name: /Hide live/i })).toBeVisible();
});

test("Example featured trio shows Title/Bento/Compare shot strip via local /previews", async ({
  page,
}) => {
  await page.goto("/?fresh=1");
  const browser = page.locator("details.example-browser");
  await browser.locator("summary").click();
  await expect(browser).toHaveAttribute("open", "");
  const panel = browser.locator(".example-browser-panel");
  await expect(panel).toBeVisible();

  // Shared iframe per theme (3 total) — Title/Bento/Compare scroll-crop labels.
  await expect(panel.locator(".example-featured-shot-strip")).toHaveCount(3);
  await expect(panel.locator(".example-featured-shot-strip iframe")).toHaveCount(3);
  await expect(panel.locator(".craft-shot-strip-label[data-crop='title']")).toHaveCount(3);
  await expect(panel.locator(".craft-shot-strip-label[data-crop='bento']")).toHaveCount(3);
  await expect(panel.locator(".craft-shot-strip-label[data-crop='comparison']")).toHaveCount(3);

  // Local Vite middleware serves repo web/previews (no Vercel CDN).
  const previewRes = await page.request.get("/previews/aurora-glass.html");
  expect(previewRes.ok()).toBeTruthy();

  // Bridge: featured themes → live theme Compare tray.
  await panel.getByRole("button", { name: /^Compare 3 themes$/ }).click();
  await expect(browser).not.toHaveAttribute("open", "");
  const themeBrowser = page.locator("details.theme-browser");
  await expect(themeBrowser).toHaveAttribute("open", "");
  const tray = themeBrowser.locator(".theme-compare");
  await expect(tray).toBeVisible();
  await expect(tray.getByText(/Compare 3\/3/i)).toBeVisible();
  await expect(tray.getByRole("button", { name: /Hide live/i })).toBeVisible();
  await expect(tray.locator(".theme-compare-restyle")).toHaveCount(3);
});

test("auto-opens craft audit panel and supports jump + dismiss", async ({ page }) => {
  // Acme EXAMPLE_DECK has a live warning (feature-grid cards missing icons).
  await page.goto("/?fresh=1");

  await expect(page.getByRole("button", { name: /Audit craft/i })).toBeVisible();
  // Live craft auto-opens the issues panel.
  const panel = page.locator("details.audit-panel");
  await expect(panel).toBeVisible();
  await expect(panel.locator("summary")).toContainText(/Issues/i);
  await expect(panel.locator(".audit-item")).toContainText(/icons/i);

  // Jump-to-slide from a slide-scoped issue.
  const jump = panel.locator("button.audit-jump").first();
  if (await jump.count()) {
    await jump.click();
    await expect(page.getByLabel("Heading").first()).toBeVisible();
  }

  // Manual re-run still reports issues.
  await page.getByRole("button", { name: /Audit craft/i }).click();
  await expect(page.getByText(/Craft audit:/i)).toBeVisible();

  // Apply safe fixes clears structural craft (icons on Acme feature-grid).
  await panel.getByRole("button", { name: /Apply safe fixes/i }).click();
  await expect(page.getByText(/Applied \d+ craft fix/i)).toBeVisible();

  // Panel unmounts when craft is clean; otherwise dismiss leftovers.
  const leftover = page.locator("details.audit-panel");
  if ((await leftover.count()) > 0) {
    await leftover.getByRole("button", { name: /^Dismiss$/ }).click();
  }
  await expect(page.locator("details.audit-panel")).toHaveCount(0);
});

test("opens a created .html and recovers the editable deck from embedded source", async ({ page }) => {
  await page.goto("/");
  const frame = page.frameLocator(".preview-frame");

  // Open a presentation .html that carries an embedded source spec.
  await page.locator('input[type="file"]').setInputFiles("e2e/fixtures/opened-deck.html");

  // The studio recovers the deck and re-renders it in the preview…
  await expect(frame.getByText("Reopened Deck Heading")).toBeVisible();
  // …and it's editable: the recovered heading is in the form and updates live.
  const heading = page.getByLabel("Heading").first();
  await expect(heading).toHaveValue("Reopened Deck Heading");
  await heading.fill("Edited After Reopen");
  await expect(frame.getByText("Edited After Reopen")).toBeVisible();
});

test("preview scrolls to selected slide and click-to-edit syncs the form", async ({ page }) => {
  await page.goto("/?fresh=1");
  const frame = page.frameLocator(".preview-frame");
  await expect(frame.locator("section.slide").first()).toBeVisible();

  // Filmstrip thumbs mount (lazy) beside the list labels.
  const rows = page.locator(".slide-row");
  expect(await rows.count()).toBeGreaterThanOrEqual(3);
  await expect(page.locator(".slide-thumb").first()).toBeVisible();
  await expect(page.locator(".slide-thumb-frame").first()).toBeVisible({ timeout: 15_000 });

  // Select slide 3 from the list → preview marks it selected.
  // Click the main text (not ↑↓ actions — those stopPropagation).
  await rows.nth(2).locator(".slide-row-main").click();
  await expect(rows.nth(2)).toHaveClass(/active/);
  await expect(frame.locator("section.slide.pmd-studio-selected")).toHaveCount(1);
  const selectedHeading = await frame
    .locator("section.slide.pmd-studio-selected")
    .locator("h1, h2, h3")
    .first()
    .textContent();
  expect(selectedHeading?.trim().length).toBeGreaterThan(0);
  await expect(page.getByLabel("Heading").first()).toHaveValue(selectedHeading!.trim());

  // Click another slide inside the preview → list + form follow.
  await frame.locator("section.slide").nth(0).click({ force: true });
  await expect(rows.nth(0)).toHaveClass(/active/);
  await expect(frame.locator("section.slide").nth(0)).toHaveClass(/pmd-studio-selected/);
  const titleHeading = await frame.locator("section.slide").nth(0).locator("h1, h2, h3").first().textContent();
  await expect(page.getByLabel("Heading").first()).toHaveValue(titleHeading!.trim());
});

test("imports Marp-style Markdown via Open", async ({ page }) => {
  await page.goto("/?fresh=1");
  const frame = page.frameLocator(".preview-frame");

  await page.locator('input[type="file"]').setInputFiles("e2e/fixtures/import-brief.md");

  await expect(page.getByText(/Imported Markdown/i)).toBeVisible();
  await expect(frame.getByText("Imported From Markdown")).toBeVisible();
  await expect(page.getByLabel("Heading").first()).toHaveValue("Imported From Markdown");
});

test("Present mode shows up-next peek and advances with ArrowRight", async ({ page }) => {
  await page.goto("/?fresh=1");
  await page.getByRole("button", { name: /^Present$/ }).click();
  await expect(page.locator(".present-overlay")).toBeVisible();
  await expect(page.locator(".present-next")).toBeVisible();
  await expect(page.locator(".present-next")).toContainText(/Up next/i);
  await expect(page.locator(".present-next-frame")).toHaveCount(1);

  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".present-count")).toContainText(/2\s*\/\s*/);
  await expect(page.locator(".present-next")).toContainText(/Up next/i);

  await page.keyboard.press("Escape");
  await expect(page.locator(".present-overlay")).toHaveCount(0);
});

test("changes layout via morph while preserving the heading", async ({ page }) => {
  await page.goto("/?fresh=1");
  const frame = page.frameLocator(".preview-frame");
  await page.getByLabel("Heading").first().fill("Morph Keep Title");
  await expect(frame.getByText("Morph Keep Title")).toBeVisible();

  await page.getByLabel("Layout").selectOption("comparison");
  await expect(page.getByLabel("Layout")).toHaveValue("comparison");
  await expect(page.getByLabel("Heading").first()).toHaveValue("Morph Keep Title");
  await expect(frame.getByText("Morph Keep Title")).toBeVisible();
  await expect(page.getByLabel("Left label")).toBeVisible();
});

test("undo restores deck after Apply safe fixes", async ({ page }) => {
  await page.goto("/?fresh=1");

  const panel = page.locator("details.audit-panel");
  await expect(panel).toBeVisible();
  await panel.getByRole("button", { name: /Apply safe fixes/i }).click();
  await expect(page.getByText(/Applied \d+ craft fix/i)).toBeVisible();

  const undoBtn = page.getByRole("button", { name: /^Undo$/ }).first();
  await expect(undoBtn).toBeEnabled();
  await undoBtn.click();
  await expect(page.locator(".status")).toContainText(/Undo/i);
  // Craft warning returns after undo (Acme feature-grid missing icons).
  await expect(page.locator("details.audit-panel")).toBeVisible({ timeout: 10_000 });
  await expect(page.locator("details.audit-panel .audit-item")).toContainText(/icons/i);
});

test("pastes Marp-style Markdown via Paste MD panel", async ({ page }) => {
  await page.goto("/?fresh=1");
  const frame = page.frameLocator(".preview-frame");

  await page.locator("details.paste-md > summary").click();
  await expect(page.locator("details.paste-md .paste-md-panel")).toBeVisible();
  await page.getByLabel("Markdown outline").fill(`---
title: Paste Wave
theme: default-tech
---

# Pasted From Markdown

Lead line from the paste panel.

---

## Second beat

- No file picker
- Same as Open .md
`);
  await page.getByRole("button", { name: /^Apply$/ }).click();
  await expect(page.getByText(/Pasted Markdown/i)).toBeVisible();
  await expect(frame.getByText("Pasted From Markdown")).toBeVisible();
  await expect(page.getByLabel("Heading").first()).toHaveValue("Pasted From Markdown");
});

test("pastes brand CSS into an ephemeral Studio theme", async ({ page }) => {
  await page.goto("/?fresh=1");
  const frame = page.frameLocator(".preview-frame");

  await page.locator("details.paste-brand > summary").click();
  await expect(page.locator(".paste-brand-panel")).toBeVisible();
  await page.getByLabel("Brand theme name").fill("e2e-brand");
  await page.getByLabel("Brand stylesheet").fill(`:root {
  --bg: #0a0a0a;
  --text: #fafafa;
  --accent: #22c55e;
}
h1 { font-family: Poppins, sans-serif; }
body { font-family: Inter, sans-serif; }
`);
  await page.getByRole("button", { name: /Apply theme/i }).click();
  await expect(page.getByText(/Brand CSS → theme "e2e-brand"/i)).toBeVisible();
  await expect(page.locator("summary.theme-trigger")).toContainText("e2e-brand");
  await expect(frame.locator("section.slide").first()).toBeVisible();
});

test("Copy link embeds the live deck and hydrates via ?d=", async ({ page, context }) => {
  await page.goto("/?fresh=1");
  await page.getByLabel("Heading").first().fill("Shared Restyle Title");

  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: /^Copy link$/ }).click();
  await expect(page.getByText(/Copied shareable deck link/i)).toBeVisible();

  const href = await page.evaluate(async () => navigator.clipboard.readText());
  expect(href).toMatch(/[?&]d=d1\./);
  expect(href).toMatch(/fresh=1/);

  const path = href.replace(/^https?:\/\/[^/]+/, "");
  await page.goto(path.startsWith("/") ? path : `/${path}`);
  await expect(page.getByText(/Opened shared deck/i)).toBeVisible({ timeout: 15_000 });
  await expect(page.frameLocator(".preview-frame").getByText("Shared Restyle Title")).toBeVisible();
  await expect(page.getByLabel("Heading").first()).toHaveValue("Shared Restyle Title");
});
