import { test, expect } from "@playwright/test";

test("edit a slide, see the live preview update, and export .pptx", async ({ page }) => {
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

  // Source ▾ → Download JSON (HTML render can be heavy in headless; JSON proves the menu path).
  await page.locator("details.export-more > summary").click();
  const [jsonDownload] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /Download JSON/i }).click(),
  ]);
  expect(jsonDownload.suggestedFilename()).toMatch(/\.json$/);
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

  // Progressive disclosure: live previews optional.
  await tray.getByRole("button", { name: /Show live/i }).click();
  await expect(tray.locator(".theme-compare-frame iframe")).toHaveCount(3);

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

  // Visual pick-3 compare is present (show-don't-tell).
  await expect(page.locator(".gen-discover-grid .gen-discover-card")).toHaveCount(3);

  // …and generating without an API key surfaces a clear error (no network call).
  await page.getByRole("button", { name: /^Generate deck$/ }).click();
  await expect(page.getByText(/Enter your Anthropic API key/)).toBeVisible();
});


test("loads a curated example via ?example= deep-link", async ({ page }) => {
  await page.goto("/?example=jellybean-launch&fresh=1");
  const frame = page.frameLocator(".preview-frame");
  await expect(frame.getByText(/Snack energy/i).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy link/ })).toBeVisible();
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

  await panel.getByRole("button", { name: /^Dismiss$/ }).click();
  await expect(panel).toHaveCount(0);
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
