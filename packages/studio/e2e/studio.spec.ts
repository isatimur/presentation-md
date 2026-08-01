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
  await expect(page.getByRole("button", { name: /Download PDF/i })).toBeVisible();
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

  // Shortlist / pick-3 auto-enables live; denser shared-iframe Title+Bento+Compare strip.
  await expect(tray.getByRole("button", { name: /Hide live/i })).toBeVisible();
  await expect(tray.locator(".theme-compare-shot-strip")).toHaveCount(3);
  await expect(tray.locator(".theme-compare-shot-strip iframe")).toHaveCount(3);
  await expect(tray.locator(".craft-shot-strip-label[data-crop='title']")).toHaveCount(3);
  await expect(tray.locator(".craft-shot-strip-label[data-crop='bento']")).toHaveCount(3);
  await expect(tray.locator(".craft-shot-strip-label[data-crop='comparison']")).toHaveCount(3);

  // Lock the first compared theme.
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
  await expect(tray.locator(".theme-compare-shot-strip")).toHaveCount(3);
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
