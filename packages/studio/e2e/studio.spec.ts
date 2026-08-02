import { test, expect } from "@playwright/test";

test("production shell serves its icons and loads without browser errors", async ({ page }) => {
  const browserErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });
  page.on("pageerror", (error) => browserErrors.push(error.message));

  for (const [file, contentType] of [
    ["favicon.svg", "image/svg+xml"],
    ["favicon-32.png", "image/png"],
    ["apple-touch-icon.png", "image/png"],
  ] as const) {
    const response = await page.request.get(`/${file}`);
    expect(response.ok(), file).toBe(true);
    expect(response.headers()["content-type"], file).toContain(contentType);
  }

  await page.goto("/");
  await expect(page).toHaveTitle("Studio — presentation-md");
  await expect(page.frameLocator(".preview-frame").locator("section").first()).toBeVisible();
  await page.waitForLoadState("networkidle");
  expect(browserErrors).toEqual([]);
});

test("warns when local autosave is unavailable", async ({ page }) => {
  await page.addInitScript(() => {
    const originalSetItem = Storage.prototype.setItem;
    let failNextDeckSave = true;
    Storage.prototype.setItem = function setItem(key: string, value: string) {
      if (key === "pmd-studio-deck-v1" && failNextDeckSave) {
        failNextDeckSave = false;
        throw new DOMException("Storage quota exceeded", "QuotaExceededError");
      }
      return originalSetItem.call(this, key, value);
    };
  });

  await page.goto("/?fresh=1");
  await expect(page.locator(".status")).toContainText(
    "Autosave unavailable — download a copy to avoid losing changes"
  );
  await expect(page.locator(".status")).toHaveAttribute("role", "status");

  await page.getByLabel("Heading", { exact: true }).fill("Autosave recovered");
  await expect(page.locator(".status")).toHaveCount(0);
});

test("coalesces rapid autosaves and flushes the latest edit before reload", async ({ page }) => {
  await page.addInitScript(() => {
    const state = window as unknown as { __deckAutosaveWrites: number };
    state.__deckAutosaveWrites = 0;
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function setItem(key: string, value: string) {
      if (key === "pmd-studio-deck-v1") state.__deckAutosaveWrites += 1;
      return originalSetItem.call(this, key, value);
    };
  });

  await page.goto("/?fresh=1");
  await expect.poll(() =>
    page.evaluate(() => localStorage.getItem("pmd-studio-deck-v1"))
  ).not.toBeNull();
  await page.evaluate(() => {
    (window as unknown as { __deckAutosaveWrites: number }).__deckAutosaveWrites = 0;
  });

  const heading = page.getByLabel("Heading", { exact: true });
  await heading.evaluate((input) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
    for (const value of ["Rapid 1", "Rapid 2", "Rapid final"]) {
      setter?.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
  expect(
    await page.evaluate(
      () => (window as unknown as { __deckAutosaveWrites: number }).__deckAutosaveWrites
    )
  ).toBe(0);
  await expect.poll(() =>
    page.evaluate(
      () => (window as unknown as { __deckAutosaveWrites: number }).__deckAutosaveWrites
    )
  ).toBe(1);

  await heading.fill("Flushed before reload");
  await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
  await page.reload();
  await expect(page.getByLabel("Heading", { exact: true })).toHaveValue("Flushed before reload");
});

test("preserves and offers corrupt saved deck bytes instead of crashing", async ({ page }) => {
  const corruptSaved = '{"type":"deck","slides":[null]}';
  await page.addInitScript((raw) => {
    if (!sessionStorage.getItem("pmd-corrupt-saved-seeded")) {
      localStorage.setItem("pmd-studio-deck-v1", raw);
      sessionStorage.setItem("pmd-corrupt-saved-seeded", "1");
    }
  }, corruptSaved);

  await page.goto("/");
  await expect(page.frameLocator(".preview-frame").locator("section.slide").first()).toBeVisible();
  await expect(page.locator(".status-warning")).toContainText(
    "Saved deck was invalid — loaded defaults and preserved the original"
  );
  expect(
    await page.evaluate(() => localStorage.getItem("pmd-studio-deck-v1-recovery"))
  ).toBe(corruptSaved);

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "Download original saved bytes" }).click(),
  ]);
  expect(download.suggestedFilename()).toBe("presentation-md-recovery.txt");
  const recoveryPath = await download.path();
  expect(recoveryPath).toBeTruthy();
  const { readFile } = await import("node:fs/promises");
  expect(await readFile(recoveryPath!, "utf8")).toBe(corruptSaved);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("pmd-studio-deck-v1")))
    .not.toBe(corruptSaved);

  await page.reload();
  await expect(page.locator(".status-warning")).toContainText(
    "A saved-deck recovery is available"
  );
  await expect(page.getByRole("button", { name: "Download original saved bytes" })).toBeVisible();

  let confirmation = "";
  page.once("dialog", async (dialog) => {
    confirmation = dialog.message();
    await dialog.accept();
  });
  await page.getByRole("button", { name: "Discard recovery" }).click();
  expect(confirmation).toContain("Permanently delete the saved-deck recovery");
  expect(
    await page.evaluate(() => localStorage.getItem("pmd-studio-deck-v1-recovery"))
  ).toBeNull();
  await expect(page.locator(".status-warning")).toHaveCount(0);
});

test("keeps recovery available and reports when discarding it fails", async ({ page }) => {
  const recovery = '{"type":"deck","slides":[null]}';
  await page.addInitScript((raw) => {
    localStorage.setItem(
      "pmd-studio-deck-v1",
      JSON.stringify({ type: "deck", slides: [{ layout: "title", heading: "Safe primary" }] })
    );
    localStorage.setItem("pmd-studio-deck-v1-recovery", raw);
    const originalRemoveItem = Storage.prototype.removeItem;
    Storage.prototype.removeItem = function removeItem(key: string) {
      if (key === "pmd-studio-deck-v1-recovery") {
        throw new DOMException("Storage unavailable", "SecurityError");
      }
      return originalRemoveItem.call(this, key);
    };
  }, recovery);

  await page.goto("/");
  await expect(page.locator(".status-warning")).toContainText(
    "A saved-deck recovery is available"
  );
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Discard recovery" }).click();

  await expect(page.locator(".status-warning")).toContainText(
    "Could not discard recovery — browser storage is unavailable"
  );
  expect(
    await page.evaluate(() => localStorage.getItem("pmd-studio-deck-v1-recovery"))
  ).toBe(recovery);
  await expect(page.getByRole("button", { name: "Download original saved bytes" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Discard recovery" })).toBeVisible();
});

test("does not overwrite corrupt primary storage when recovery backup cannot be written", async ({ page }) => {
  const corruptSaved = '{"type":"deck","slides":[null]}';
  await page.addInitScript((raw) => {
    localStorage.setItem("pmd-studio-deck-v1", raw);
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function setItem(key: string, value: string) {
      if (key === "pmd-studio-deck-v1-recovery") {
        throw new DOMException("Storage quota exceeded", "QuotaExceededError");
      }
      return originalSetItem.call(this, key, value);
    };
  }, corruptSaved);

  await page.goto("/");
  await expect(page.locator(".status-warning")).toContainText(
    "Saved deck was invalid — autosave paused so the original remains recoverable"
  );
  await page.getByLabel("Heading", { exact: true }).fill("Fallback edit must not overwrite");
  expect(await page.evaluate(() => localStorage.getItem("pmd-studio-deck-v1"))).toBe(corruptSaved);
  await expect(page.getByRole("button", { name: "Download original saved bytes" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Discard recovery" })).toHaveCount(0);
});

test("pauses autosave instead of overwriting a deck changed in another tab", async ({ page, context }) => {
  await page.goto("/?fresh=1");
  const firstHeading = page.getByLabel("Heading", { exact: true });
  await firstHeading.fill("First tab draft");
  await expect.poll(() =>
    page.evaluate(() => {
      const raw = localStorage.getItem("pmd-studio-deck-v1");
      if (!raw) return null;
      return (JSON.parse(raw) as { slides?: Array<{ heading?: string }> }).slides?.[0]?.heading;
    })
  ).toBe("First tab draft");

  const second = await context.newPage();
  await second.goto("/");
  const secondHeading = second.getByLabel("Heading", { exact: true });
  await expect(secondHeading).toHaveValue("First tab draft");
  await secondHeading.fill("Second tab saved version");

  await expect(page.locator(".status")).toContainText(
    "Autosave paused — this deck changed in another tab"
  );

  await page.locator("details.export-more > summary").click();
  await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: /Download Markdown/i }).click(),
  ]);
  await expect(page.locator(".status-warning")).toContainText(
    "Autosave paused — this deck changed in another tab"
  );

  await firstHeading.fill("First tab conflicting edit");

  const persistedHeading = await page.evaluate(() => {
    const raw = localStorage.getItem("pmd-studio-deck-v1");
    if (!raw) return null;
    return (JSON.parse(raw) as { slides?: Array<{ heading?: string }> }).slides?.[0]?.heading ?? null;
  });
  expect(persistedHeading).toBe("Second tab saved version");
  await second.close();
});

test("optional Generate and Present modes load only when opened", async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const loadedScripts = () =>
    page.evaluate(() =>
      performance
        .getEntriesByType("resource")
        .map((entry) => entry.name)
        .filter((name) => name.endsWith(".js"))
    );

  expect(await loadedScripts()).not.toEqual(
    expect.arrayContaining([expect.stringMatching(/PresentMode-[^/]+\.js$/)])
  );
  expect(await loadedScripts()).not.toEqual(
    expect.arrayContaining([expect.stringMatching(/GenerateModal-[^/]+\.js$/)])
  );

  await page.getByRole("button", { name: /^Present$/ }).click();
  await expect(page.getByRole("button", { name: /Exit · Esc/ })).toBeVisible();
  expect(await loadedScripts()).toEqual(
    expect.arrayContaining([expect.stringMatching(/PresentMode-[^/]+\.js$/)])
  );
  await page.getByRole("button", { name: /Exit · Esc/ }).click();

  const generateButton = page.getByRole("button", { name: /Generate/ }).first();
  await generateButton.click();
  const generateDialog = page.getByRole("dialog", { name: "Generate a deck" });
  await expect(generateDialog).toBeVisible();
  await expect(generateDialog).toHaveAttribute("aria-modal", "true");
  await expect(page.getByLabel("What's the deck about?")).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(generateDialog.getByRole("button", { name: "Close" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  expect(
    await generateDialog.evaluate((dialog) => dialog.contains(document.activeElement))
  ).toBe(true);
  expect(await loadedScripts()).toEqual(
    expect.arrayContaining([expect.stringMatching(/GenerateModal-[^/]+\.js$/)])
  );
  await page.keyboard.press("Escape");
  await expect(generateDialog).toHaveCount(0);
  await expect(generateButton).toBeFocused();
});

test("edit a slide, see the live preview update, and export .pptx", async ({ page, context }) => {
  test.setTimeout(120_000);
  await page.goto("/");

  const frame = page.frameLocator(".preview-frame");

  // The example deck loads and renders in the preview iframe.
  await expect(frame.locator("section").first()).toBeVisible();
  await expect(frame.getByText("Acme All-Hands")).toBeVisible();

  // Editing the selected (title) slide's heading updates the preview live.
  const heading = page.getByLabel("Heading", { exact: true });
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
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: /Copy Markdown/i }).click();
  await expect(page.getByText(/Copied Markdown to clipboard/i)).toBeVisible();
  const mdClip = await page.evaluate(async () => navigator.clipboard.readText());
  expect(mdClip).toMatch(/^---/m);
  expect(mdClip).toMatch(/Edited Title|# /);
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

test("headless PDF export blocks loopback subresource requests", async ({ page }) => {
  const { createServer } = await import("node:http");
  let sentinelRequests = 0;
  const sentinel = createServer((_req, res) => {
    sentinelRequests += 1;
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.end(Buffer.from("not-an-image"));
  });
  await new Promise<void>((resolve, reject) => {
    sentinel.once("error", reject);
    sentinel.listen(0, "127.0.0.1", () => resolve());
  });

  try {
    const address = sentinel.address();
    if (!address || typeof address === "string") throw new Error("Sentinel did not bind TCP");
    const rejectedOrigin = await page.request.post("/api/export-pdf", {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        Origin: "https://evil.example",
      },
      data: "<!doctype html><html><body>blocked</body></html>",
    });
    expect(rejectedOrigin.status()).toBe(403);
    expect(await rejectedOrigin.text()).toContain("Cross-origin PDF export is not allowed");
    const rejectedType = await page.request.post("/api/export-pdf", {
      headers: { "Content-Type": "text/plain" },
      data: "<!doctype html><html><body>blocked</body></html>",
    });
    expect(rejectedType.status()).toBe(415);

    const response = await page.request.post("/api/export-pdf", {
      headers: { "Content-Type": "text/html; charset=utf-8" },
      data: `<!doctype html><html><head><style>@page{size:1920px 1080px;margin:0}</style></head><body><section class="slide"><h1>Safe PDF</h1><img src="http://127.0.0.1:${address.port}/private.png"></section></body></html>`,
    });
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect((await response.body()).subarray(0, 4).toString("utf8")).toBe("%PDF");
    expect(sentinelRequests).toBe(0);
  } finally {
    await new Promise<void>((resolve, reject) =>
      sentinel.close((error) => (error ? reject(error) : resolve()))
    );
  }
});

test("late PPTX and PDF exports report their snapshot without overwriting the current revision", async ({ page }) => {
  test.setTimeout(120_000);

  let releasePptx!: () => void;
  const pptxGate = new Promise<void>((resolve) => {
    releasePptx = resolve;
  });
  let markPptxFetchStarted!: () => void;
  const pptxFetchStarted = new Promise<void>((resolve) => {
    markPptxFetchStarted = resolve;
  });
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
    "base64"
  );
  await page.route("https://assets.example.test/delayed.png", async (route) => {
    // The live preview also requests this image. Only hold the exporter's fetch.
    if (route.request().resourceType() !== "fetch") {
      await route.fulfill({ status: 200, contentType: "image/png", body: png });
      return;
    }
    markPptxFetchStarted();
    await pptxGate;
    await route.fulfill({ status: 200, contentType: "image/png", body: png });
  });

  let releasePdf!: () => void;
  const pdfGate = new Promise<void>((resolve) => {
    releasePdf = resolve;
  });
  let markPdfFetchStarted!: () => void;
  const pdfFetchStarted = new Promise<void>((resolve) => {
    markPdfFetchStarted = resolve;
  });
  await page.route("**/api/export-pdf", async (route) => {
    markPdfFetchStarted();
    await pdfGate;
    await route.fulfill({
      status: 200,
      contentType: "application/pdf",
      body: Buffer.from("%PDF-1.4\n%%EOF\n"),
    });
  });

  await page.goto("/?fresh=1");
  await page.getByRole("button", { name: /Select slide 2:/ }).click();
  const heading = page.getByLabel("Heading", { exact: true });
  await page.getByLabel("Image URL (remote images prefetched into PPTX)").fill(
    "https://assets.example.test/delayed.png"
  );

  const pptxDownload = page.waitForEvent("download");
  await page.getByRole("button", { name: /Download \.pptx/ }).click();
  await pptxFetchStarted;
  await heading.fill("Current edit after PPTX started");
  releasePptx();
  expect((await pptxDownload).suggestedFilename()).toMatch(/\.pptx$/);
  await expect(page.locator(".status").last()).toContainText(
    "Exported .pptx for an earlier deck revision — current edits were not included"
  );
  await expect(heading).toHaveValue("Current edit after PPTX started");

  const sourceMenu = page.locator("details.export-more");
  await sourceMenu.locator("summary").click();
  const pdfDownload = page.waitForEvent("download");
  await page.getByRole("button", { name: /Download PDF/i }).click();
  await pdfFetchStarted;
  await heading.fill("Current edit after PDF started");
  releasePdf();
  expect((await pdfDownload).suggestedFilename()).toMatch(/\.pdf$/);
  await expect(page.locator(".status").last()).toContainText(
    "Downloaded PDF for an earlier deck revision — current edits were not included"
  );
  await expect(heading).toHaveValue("Current edit after PDF started");
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

  // Visual pick-3 compare is live by default — My deck restyles the selected slide.
  await expect(page.locator(".gen-discover-grid .gen-discover-card")).toHaveCount(3);
  await expect(page.getByRole("button", { name: /Hide live/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /My deck/i })).toBeVisible();
  await expect(page.locator(".gen-discover-restyle")).toHaveCount(3);
  await expect(page.locator(".gen-discover-restyle iframe")).toHaveCount(3);

  // Craft proofs still one toggle away (Title/Bento/Compare shot strip).
  await page.getByRole("button", { name: /Craft proofs/i }).click();
  await expect(page.locator(".gen-discover-shot-strip")).toHaveCount(3);
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

test("Generate modal remains usable when remembered-key reads are blocked", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.addInitScript(() => {
    const originalGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = function getItem(key: string) {
      if (key === "pmd-studio-anthropic-key") {
        throw new DOMException("Storage blocked", "SecurityError");
      }
      return originalGetItem.call(this, key);
    };
  });

  await page.goto("/?fresh=1");
  await page.getByRole("button", { name: /Generate/ }).first().click();
  await expect(page.getByRole("dialog", { name: "Generate a deck" })).toBeVisible();
  await expect(page.locator(".gen-storage-warning")).toContainText(
    "Browser storage unavailable — API key will only stay in this modal"
  );

  await page.getByRole("button", { name: /Land pitch scaffold/i }).click();
  await expect(page.getByRole("dialog", { name: "Generate a deck" })).toHaveCount(0);
  await expect(page.frameLocator(".preview-frame").locator("section.slide").first()).toBeVisible();
  expect(pageErrors).toEqual([]);
});

test("key persistence failure does not block generation validation", async ({ page }) => {
  await page.addInitScript(() => {
    const originalSetItem = Storage.prototype.setItem;
    const originalRemoveItem = Storage.prototype.removeItem;
    Storage.prototype.setItem = function setItem(key: string, value: string) {
      if (key === "pmd-studio-anthropic-key") {
        throw new DOMException("Storage blocked", "QuotaExceededError");
      }
      return originalSetItem.call(this, key, value);
    };
    Storage.prototype.removeItem = function removeItem(key: string) {
      if (key === "pmd-studio-anthropic-key") {
        throw new DOMException("Storage blocked", "SecurityError");
      }
      return originalRemoveItem.call(this, key);
    };
  });

  await page.goto("/?fresh=1");
  await page.getByRole("button", { name: /Generate/ }).first().click();
  await page.locator("textarea.brief-input").fill("Storage-safe generation validation.");
  await page.getByText("Remember on this device", { exact: false }).click();
  await page.getByRole("button", { name: /^Generate deck$/ }).click();

  await expect(page.locator(".gen-storage-warning")).toContainText(
    "Browser storage unavailable — API key will only stay in this modal"
  );
  await expect(page.getByText(/Enter your Anthropic API key/)).toBeVisible();
  await expect(page.getByRole("dialog", { name: "Generate a deck" })).toBeVisible();
});

test("closing Generate modal prevents a late API result from replacing the deck", async ({ page }) => {
  let releaseResponse!: () => void;
  const responseGate = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });
  let requestStarted = false;
  let requestFinished = false;
  await page.route("https://api.anthropic.com/**", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "POST,OPTIONS",
          "access-control-allow-headers": "*",
        },
      });
      return;
    }
    requestStarted = true;
    await responseGate;
    try {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: { "access-control-allow-origin": "*" },
        body: JSON.stringify({
          id: "msg_late",
          type: "message",
          role: "assistant",
          model: "claude-haiku-4-5",
          content: [
            {
              type: "text",
              text: JSON.stringify({
                type: "deck",
                slides: [{ layout: "title", heading: "Late result replaced the deck" }],
              }),
            },
          ],
          stop_reason: "end_turn",
          stop_sequence: null,
          usage: { input_tokens: 1, output_tokens: 1 },
        }),
      });
    } catch {
      // Expected when the browser aborts before the mocked response is released.
    } finally {
      requestFinished = true;
    }
  });

  await page.goto("/?fresh=1");
  const originalHeading = await page.getByLabel("Heading", { exact: true }).inputValue();
  await page.getByRole("button", { name: /Generate/ }).first().click();
  await page.locator("textarea.brief-input").fill("A cancellable generation request.");
  await page.locator('.gen-panel input[type="password"]').fill("sk-ant-test");
  await page.getByRole("button", { name: /^Generate deck$/ }).click();
  await expect.poll(() => requestStarted).toBe(true);

  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("dialog", { name: "Generate a deck" })).toHaveCount(0);
  releaseResponse();
  await expect.poll(() => requestFinished).toBe(true);
  await page.waitForTimeout(200);

  await expect(page.getByLabel("Heading", { exact: true })).toHaveValue(originalHeading);
});

test("loads a curated example via ?example= deep-link", async ({ page }) => {
  await page.goto("/?example=jellybean-launch&fresh=1");
  const frame = page.frameLocator(".preview-frame");
  await expect(frame.getByText(/Snack energy/i).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /Copy link/ })).toBeVisible();
});

test("defers example JSON until the user selects that example", async ({ page }) => {
  const loadedJellybeanChunks = () =>
    page.evaluate(() =>
      performance
        .getEntriesByType("resource")
        .map((entry) => entry.name)
        .filter((name) => name.includes("jellybean-launch") && name.endsWith(".js"))
    );

  await page.goto("/?fresh=1");
  expect(await loadedJellybeanChunks()).toEqual([]);

  const browser = page.locator("details.example-browser");
  await browser.locator("summary").click();
  await browser.getByRole("button", { name: "Jellybean (candy-pop)", exact: true }).click();
  await expect(page.frameLocator(".preview-frame").getByText(/Snack energy/i).first()).toBeVisible();
  await expect.poll(loadedJellybeanChunks).toHaveLength(1);
});

test("a delayed example load does not replace edits made while its chunk loads", async ({ page }) => {
  let releaseChunk!: () => void;
  const chunkGate = new Promise<void>((resolve) => {
    releaseChunk = resolve;
  });
  let markChunkStarted!: () => void;
  const chunkStarted = new Promise<void>((resolve) => {
    markChunkStarted = resolve;
  });
  await page.route("**/assets/jellybean-launch-*.js", async (route) => {
    markChunkStarted();
    await chunkGate;
    await route.continue();
  });

  await page.goto("/?fresh=1");
  const browser = page.locator("details.example-browser");
  await browser.locator("summary").click();
  await browser.getByRole("button", { name: "Jellybean (candy-pop)", exact: true }).click();
  await chunkStarted;

  const heading = page.getByLabel("Heading", { exact: true });
  await heading.fill("Keep this edit while the example loads");
  releaseChunk();
  await expect(page.locator(".status").last()).toContainText(
    "Example ready: jellybean-launch — current deck changed while loading; choose it again to replace"
  );
  await expect(heading).toHaveValue("Keep this edit while the example loads");

  // A deliberate second choice is the replacement confirmation; the module is cached.
  await browser.locator("summary").click();
  await browser.getByRole("button", { name: "Jellybean (candy-pop)", exact: true }).click();
  await expect(page.frameLocator(".preview-frame").getByText(/Snack energy/i).first()).toBeVisible();
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
    await expect(page.getByLabel("Heading", { exact: true })).toBeVisible();
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
  const heading = page.getByLabel("Heading", { exact: true });
  await expect(heading).toHaveValue("Reopened Deck Heading");
  await heading.fill("Edited After Reopen");
  await expect(frame.getByText("Edited After Reopen")).toBeVisible();
});

test("rejects a malformed deck file without replacing the current deck", async ({ page }) => {
  await page.goto("/?fresh=1");
  const heading = page.getByLabel("Heading", { exact: true });
  const originalHeading = await heading.inputValue();

  await page.locator('input[type="file"]').setInputFiles({
    name: "broken.json",
    mimeType: "application/json",
    buffer: Buffer.from('{"type":"deck","slides":[null]}'),
  });

  await expect(page.locator(".status").last()).toContainText(
    "Open failed: Not a Studio-safe deck: slide 1 must be an object"
  );
  await expect(heading).toHaveValue(originalHeading);
  await expect(page.frameLocator(".preview-frame").locator("section.slide").first()).toBeVisible();
});

test("rejects an oversized text deck before reading or replacing it", async ({ page }) => {
  await page.goto("/?fresh=1");
  const heading = page.getByLabel("Heading", { exact: true });
  const originalHeading = await heading.inputValue();

  await page.locator('input[type="file"]').setInputFiles({
    name: "oversized.json",
    mimeType: "application/json",
    buffer: Buffer.alloc(10 * 1024 * 1024 + 1, 32),
  });

  await expect(page.locator(".status").last()).toContainText(
    "Open failed: oversized.json is too large (max 10 MiB)"
  );
  await expect(heading).toHaveValue(originalHeading);
  await expect(page.frameLocator(".preview-frame").locator("section.slide").first()).toBeVisible();
});

test("late file import requires an explicit choice after concurrent edits", async ({ page }) => {
  await page.addInitScript(() => {
    const originalText = File.prototype.text;
    File.prototype.text = function text() {
      if (this.name !== "delayed.json") return originalText.call(this);
      const file = this;
      return new Promise<string>((resolve, reject) => {
        (window as unknown as { __releaseDelayedImport?: () => void }).__releaseDelayedImport =
          () => {
            originalText.call(file).then(resolve, reject);
          };
      });
    };
  });

  const importedJson = JSON.stringify({
    type: "deck",
    slides: [{ layout: "title", heading: "Imported after delay" }],
  });
  await page.goto("/?fresh=1");
  const heading = page.getByLabel("Heading", { exact: true });

  const startImport = async () => {
    await page.locator('input[type="file"]').setInputFiles({
      name: "delayed.json",
      mimeType: "application/json",
      buffer: Buffer.from(importedJson),
    });
    await expect.poll(() =>
      page.evaluate(
        () => typeof (window as unknown as { __releaseDelayedImport?: unknown }).__releaseDelayedImport
      )
    ).toBe("function");
  };
  const releaseImport = async () => {
    await page.evaluate(() => {
      const host = window as unknown as { __releaseDelayedImport?: () => void };
      const release = host.__releaseDelayedImport;
      delete host.__releaseDelayedImport;
      release?.();
    });
  };

  await startImport();
  await heading.fill("Keep this concurrent edit");
  await releaseImport();
  await expect(page.locator(".import-conflict-actions")).toBeVisible();
  await expect(heading).toHaveValue("Keep this concurrent edit");
  await page.getByRole("button", { name: "Keep current" }).click();
  await expect(page.locator(".import-conflict-actions")).toHaveCount(0);
  await expect(heading).toHaveValue("Keep this concurrent edit");

  await startImport();
  await heading.fill("A second concurrent edit");
  await releaseImport();
  await expect(page.locator(".import-conflict-actions")).toBeVisible();
  await page.getByRole("button", { name: "Open imported deck" }).click();
  await expect(heading).toHaveValue("Imported after delay");
  await expect(page.locator(".import-conflict-actions")).toHaveCount(0);
});

test("preview scrolls to selected slide and click-to-edit syncs the form", async ({ page }) => {
  await page.goto("/?fresh=1");
  const frame = page.frameLocator(".preview-frame");
  await expect(frame.locator("section.slide").first()).toBeVisible();

  // Preview zoom toolbar ships Fit + % controls.
  await expect(page.getByRole("toolbar", { name: /Preview zoom/i })).toBeVisible();
  await page.getByRole("button", { name: "100%" }).click();
  await expect(page.locator(".preview.is-zoom")).toBeVisible();
  await page.getByRole("button", { name: "Fit" }).click();
  await expect(page.locator(".preview.is-fit")).toBeVisible();

  // Horizontal densified filmstrip (one iframe for all thumbs).
  const rows = page.locator(".slide-row");
  expect(await rows.count()).toBeGreaterThanOrEqual(3);
  await expect(page.locator(".slide-filmstrip")).toBeVisible();
  await expect(page.locator(".slide-filmstrip-frame")).toBeVisible({ timeout: 15_000 });
  await expect(page.locator(".slide-filmstrip-hit")).toHaveCount(await rows.count());

  // The slide list is fully keyboard-operable and its add-layout selector is named.
  await expect(page.getByLabel("New slide layout")).toBeVisible();
  const slideThree = rows.nth(2).getByRole("button", { name: /Select slide 3:/ });
  await slideThree.focus();
  await expect(rows.nth(2).locator(".slide-row-actions")).toHaveCSS("opacity", "1");
  await page.keyboard.press("Enter");
  await expect(rows.nth(2)).toHaveClass(/active/);
  await expect(slideThree).toHaveAttribute("aria-current", "true");
  await expect(page.locator('.slide-filmstrip-hit[data-filmstrip-i="2"]')).toHaveAttribute(
    "aria-selected",
    "true"
  );
  await expect(frame.locator("section.slide.pmd-studio-selected")).toHaveCount(1);
  const selectedHeading = await frame
    .locator("section.slide.pmd-studio-selected")
    .locator("h1, h2, h3")
    .first()
    .textContent();
  expect(selectedHeading?.trim().length).toBeGreaterThan(0);
  await expect(page.getByLabel("Heading", { exact: true })).toHaveValue(selectedHeading!.trim());

  // Filmstrip uses roving focus and listbox arrow navigation.
  const filmstripThree = page.locator('.slide-filmstrip-hit[data-filmstrip-i="2"]');
  await expect(filmstripThree).toHaveAttribute("tabindex", "0");
  await filmstripThree.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator('.slide-filmstrip-hit[data-filmstrip-i="1"]')).toBeFocused();
  await expect(rows.nth(1)).toHaveClass(/active/);
  await expect(frame.locator("section.slide").nth(1)).toHaveClass(/pmd-studio-selected/);

  // Click another slide inside the preview → list + form follow.
  await frame.locator("section.slide").nth(0).click({ force: true });
  await expect(rows.nth(0)).toHaveClass(/active/);
  await expect(frame.locator("section.slide").nth(0)).toHaveClass(/pmd-studio-selected/);
  const titleHeading = await frame.locator("section.slide").nth(0).locator("h1, h2, h3").first().textContent();
  await expect(page.getByLabel("Heading", { exact: true })).toHaveValue(titleHeading!.trim());
});

test("imports Marp-style Markdown via Open", async ({ page }) => {
  await page.goto("/?fresh=1");
  const frame = page.frameLocator(".preview-frame");

  await page.locator('input[type="file"]').setInputFiles("e2e/fixtures/import-brief.md");

  await expect(page.getByText(/Imported Markdown/i)).toBeVisible();
  await expect(frame.getByText("Imported From Markdown")).toBeVisible();
  await expect(page.getByLabel("Heading", { exact: true })).toHaveValue("Imported From Markdown");
});

test("Present mode shows up-next peek and advances with ArrowRight", async ({ page }) => {
  await page.goto("/?fresh=1");
  const presentButton = page.getByRole("button", { name: /^Present$/ });
  await presentButton.click();
  await expect(page.locator(".present-overlay")).toBeVisible();
  await expect(page.locator(".present-next")).toBeVisible();
  await expect(page.locator(".present-next")).toContainText(/Up next/i);
  await expect(page.locator(".present-next-frame")).toHaveCount(1);
  await expect(page.locator(".present-filmstrip .slide-filmstrip")).toBeVisible();
  await expect(page.locator(".present-filmstrip .slide-filmstrip-hit")).toHaveCount(
    await page.locator(".present-count").evaluate((el) => {
      const m = (el.textContent ?? "").match(/\/\s*(\d+)/);
      return m ? Number(m[1]) : 0;
    })
  );

  await page.locator('.present-filmstrip .slide-filmstrip-hit[data-filmstrip-i="2"]').click();
  await expect(page.locator(".present-count")).toContainText(/3\s*\/\s*/);

  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".present-count")).toContainText(/4\s*\/\s*/);
  await expect(page.locator(".present-next")).toContainText(/Up next/i);

  await page.keyboard.press("1");
  await expect(page.locator(".present-count")).toContainText(/1\s*\/\s*/);

  await page.keyboard.press("b");
  await expect(page.locator(".present-blackout")).toBeVisible();
  await page.keyboard.press("b");
  await expect(page.locator(".present-blackout")).toHaveCount(0);

  await page.keyboard.press("w");
  await expect(page.locator(".present-whiteout")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".present-whiteout")).toHaveCount(0);

  await page.keyboard.press("l");
  await expect(page.locator(".present-stage-laser")).toBeVisible();
  await expect(page.locator(".present-laser-layer")).toBeVisible();
  const stage = page.locator(".present-stage");
  const box = await stage.boundingBox();
  expect(box).toBeTruthy();
  if (box) {
    await page.mouse.move(box.x + box.width * 0.4, box.y + box.height * 0.4);
    await page.mouse.move(box.x + box.width * 0.55, box.y + box.height * 0.5);
    await expect(page.locator(".present-laser-dot.is-tip")).toHaveCount(1);
  }
  await page.keyboard.press("l");
  await expect(page.locator(".present-laser-layer")).toHaveCount(0);

  await page.keyboard.press("d");
  await expect(page.locator(".present-ink-canvas.is-active")).toBeVisible();
  const inkBox = await page.locator(".present-ink-canvas").boundingBox();
  expect(inkBox).toBeTruthy();
  if (inkBox) {
    await page.mouse.move(inkBox.x + 40, inkBox.y + 40);
    await page.mouse.down();
    await page.mouse.move(inkBox.x + 120, inkBox.y + 90);
    await page.mouse.up();
  }
  await page.keyboard.press("c");
  await page.keyboard.press("d");
  await expect(page.locator(".present-ink-canvas.is-active")).toHaveCount(0);

  await expect(page.locator(".present-timer")).toBeVisible();
  await page.keyboard.press("r");
  await expect(page.locator(".present-timer")).toContainText("0:00");

  await page.keyboard.press("g");
  await expect(page.locator(".present-overview")).toBeVisible();
  await expect(page.locator(".present-overview-card")).toHaveCount(
    await page.locator(".present-count").evaluate((el) => {
      const m = (el.textContent ?? "").match(/\/\s*(\d+)/);
      return m ? Number(m[1]) : 0;
    })
  );
  await page.locator(".present-overview-card").nth(2).click();
  await expect(page.locator(".present-overview")).toHaveCount(0);
  await expect(page.locator(".present-count")).toContainText(/3\s*\/\s*/);

  await page.keyboard.press("Shift+/");
  await expect(page.locator(".present-help")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".present-help")).toHaveCount(0);

  await page.keyboard.press("Escape");
  await expect(page.locator(".present-overlay")).toHaveCount(0);
  await expect(presentButton).toBeFocused();
});

test("changes layout via morph while preserving the heading", async ({ page }) => {
  await page.goto("/?fresh=1");
  const frame = page.frameLocator(".preview-frame");
  await page.getByLabel("Heading", { exact: true }).fill("Morph Keep Title");
  await expect(frame.getByText("Morph Keep Title")).toBeVisible();

  await page.getByLabel("Layout", { exact: true }).selectOption("comparison");
  await expect(page.getByLabel("Layout", { exact: true })).toHaveValue("comparison");
  await expect(page.getByLabel("Heading", { exact: true })).toHaveValue("Morph Keep Title");
  await expect(frame.getByText("Morph Keep Title")).toBeVisible();
  await expect(page.getByLabel("Left label")).toBeVisible();
});

test("Judge button runs structural t1 gates into the issues panel", async ({ page }) => {
  await page.goto("/?fresh=1");
  await page.getByRole("button", { name: /^Judge$/ }).click();
  await expect(page.locator(".status")).toContainText(/Judge t1/i);
  // Default example usually has craft/judge flags; panel opens when flags exist.
  const panel = page.locator("details.audit-panel");
  if (await panel.count()) {
    await expect(panel).toBeVisible();
    await expect(panel.locator(".audit-item").first()).toContainText(/\[judge/i);
  }
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

test("command palette opens with Meta+K and runs Present", async ({ page }) => {
  await page.goto("/?fresh=1");
  await page.waitForLoadState("networkidle");
  // Prefer the toolbar affordance — Meta shortcuts can be flaky in headless browsers.
  const openBtn = page.getByRole("button", { name: "⌘K" });
  if (await openBtn.isVisible()) {
    await openBtn.click();
  } else {
    await page.keyboard.press("Control+k");
  }
  await expect(page.locator(".command-palette")).toBeVisible();
  await page.locator(".command-palette-input").fill("present");
  const presentCmd = page.locator(".command-palette-item").filter({ hasText: /Present/ }).first();
  await expect(presentCmd).toBeVisible();
  await presentCmd.click();
  // Wait for the real presenter (not the Suspense "Loading presenter…" fallback).
  await expect(page.getByRole("button", { name: /Exit · Esc/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator(".present-overlay")).toHaveCount(0);
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
  await expect(page.getByLabel("Heading", { exact: true })).toHaveValue("Pasted From Markdown");
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

test("late clipboard reads do not overwrite manually edited Markdown or brand CSS", async ({ page }) => {
  await page.goto("/?fresh=1");
  await page.evaluate(() => {
    let readId = 0;
    Object.defineProperty(navigator.clipboard, "readText", {
      configurable: true,
      value: () =>
        new Promise<string>((resolve) => {
          readId += 1;
          const host = window as unknown as {
            __releaseClipboardReads?: Record<number, (text: string) => void>;
          };
          host.__releaseClipboardReads ??= {};
          host.__releaseClipboardReads[readId] = resolve;
        }),
    });
  });

  const releaseRead = async (id: number, text: string) => {
    await page.evaluate(
      ({ readId, value }) => {
        const host = window as unknown as {
          __releaseClipboardReads?: Record<number, (text: string) => void>;
        };
        const release = host.__releaseClipboardReads?.[readId];
        if (host.__releaseClipboardReads) delete host.__releaseClipboardReads[readId];
        release?.(value);
      },
      { readId: id, value: text }
    );
  };

  const markdownPanel = page.locator("details.paste-md");
  await markdownPanel.locator("summary").click();
  await markdownPanel.getByRole("button", { name: "From clipboard" }).click();
  await expect.poll(() =>
    page.evaluate(
      () =>
        typeof (window as unknown as { __releaseClipboardReads?: Record<number, unknown> })
          .__releaseClipboardReads?.[1]
    )
  ).toBe("function");
  const markdown = page.getByLabel("Markdown outline");
  await markdown.fill("# Manual Markdown\n\nKeep this text.");
  await releaseRead(1, "# Clipboard Markdown\n\nDo not overwrite.");
  await expect(markdown).toHaveValue("# Manual Markdown\n\nKeep this text.");
  await expect(page.locator(".status").last()).toContainText(
    "Clipboard Markdown not applied — field changed while reading"
  );

  const brandPanel = page.locator("details.paste-brand");
  await brandPanel.locator("summary").click();
  await brandPanel.getByRole("button", { name: "From clipboard" }).click();
  await expect.poll(() =>
    page.evaluate(
      () =>
        typeof (window as unknown as { __releaseClipboardReads?: Record<number, unknown> })
          .__releaseClipboardReads?.[2]
    )
  ).toBe("function");
  const brandCss = page.getByLabel("Brand stylesheet");
  await brandCss.fill(":root { --accent: #manual; }");
  await releaseRead(2, ":root { --accent: #clipboard; }");
  await expect(brandCss).toHaveValue(":root { --accent: #manual; }");
  await expect(page.locator(".status").last()).toContainText(
    "Clipboard CSS not applied — field changed while reading"
  );
});

test("Copy link embeds the live deck and hydrates via ?d=", async ({ page, context }) => {
  await page.goto("/?fresh=1");
  await page.getByLabel("Heading", { exact: true }).fill("Shared Restyle Title");

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
  await expect(page.getByLabel("Heading", { exact: true })).toHaveValue("Shared Restyle Title");
});

test("a delayed shared-deck decode does not replace edits made during hydration", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/?fresh=1");
  await page.getByLabel("Heading", { exact: true }).fill("Heading from the shared snapshot");
  await page.getByRole("button", { name: /^Copy link$/ }).click();
  const href = await page.evaluate(async () => navigator.clipboard.readText());

  const target = await context.newPage();
  await target.addInitScript(() => {
    const NativeDecompressionStream = globalThis.DecompressionStream;
    class DelayedDecompressionStream {
      readonly readable: ReadableStream<Uint8Array>;
      readonly writable: WritableStream<BufferSource>;

      constructor(format: CompressionFormat) {
        const native = new NativeDecompressionStream(format);
        this.writable = native.writable;
        const reader = native.readable.getReader();
        this.readable = new ReadableStream<Uint8Array>({
          start(controller) {
            const host = window as unknown as { __releaseSharedDecode?: () => Promise<void> };
            host.__releaseSharedDecode = async () => {
              try {
                while (true) {
                  const { done, value } = await reader.read();
                  if (done) break;
                  controller.enqueue(value);
                }
                controller.close();
              } catch (error) {
                controller.error(error);
              }
            };
          },
        });
      }
    }
    Object.defineProperty(globalThis, "DecompressionStream", {
      configurable: true,
      writable: true,
      value: DelayedDecompressionStream,
    });
  });

  await target.goto(href);
  await expect.poll(() =>
    target.evaluate(
      () => typeof (window as unknown as { __releaseSharedDecode?: unknown }).__releaseSharedDecode
    )
  ).toBe("function");
  const heading = target.getByLabel("Heading", { exact: true });
  await heading.fill("Keep this edit while the shared deck opens");
  await target.evaluate(async () => {
    const host = window as unknown as { __releaseSharedDecode?: () => Promise<void> };
    await host.__releaseSharedDecode?.();
  });

  await expect(target.locator(".status").last()).toContainText(
    "Shared deck ready — current deck changed while opening; reload this link to replace it"
  );
  await expect(heading).toHaveValue("Keep this edit while the shared deck opens");
  expect(target.url()).toMatch(/[?&]d=d1\./);
  await target.close();
});

test("late Copy link completion identifies an earlier deck revision", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/?fresh=1");
  const heading = page.getByLabel("Heading", { exact: true });
  await heading.fill("Snapshot copied before the edit");

  await page.evaluate(() => {
    const clipboard = navigator.clipboard;
    const nativeWrite = clipboard.writeText.bind(clipboard);
    Object.defineProperty(clipboard, "writeText", {
      configurable: true,
      value: (text: string) =>
        new Promise<void>((resolve, reject) => {
          const host = window as unknown as {
            __releaseDelayedShare?: () => void;
            __delayedShareText?: string;
          };
          host.__delayedShareText = text;
          host.__releaseDelayedShare = () => nativeWrite(text).then(resolve, reject);
        }),
    });
  });

  await page.getByRole("button", { name: /^Copy link$/ }).click();
  await expect.poll(() =>
    page.evaluate(
      () =>
        typeof (window as unknown as { __releaseDelayedShare?: unknown }).__releaseDelayedShare
    )
  ).toBe("function");
  await heading.fill("Current edit after Copy link started");
  await page.evaluate(() => {
    const host = window as unknown as { __releaseDelayedShare?: () => void };
    const release = host.__releaseDelayedShare;
    delete host.__releaseDelayedShare;
    release?.();
  });

  await expect(page.locator(".status").last()).toContainText(
    "Copied link for an earlier deck revision — current edits were not included"
  );
  await expect(heading).toHaveValue("Current edit after Copy link started");

  const href = await page.evaluate(async () => navigator.clipboard.readText());
  const shared = await context.newPage();
  const path = href.replace(/^https?:\/\/[^/]+/, "");
  await shared.goto(path.startsWith("/") ? path : `/${path}`);
  await expect(shared.getByLabel("Heading", { exact: true })).toHaveValue(
    "Snapshot copied before the edit"
  );
  await shared.close();
});

test("a newer Copy Markdown request wins over an in-flight Copy link write", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/?fresh=1");
  await page.getByLabel("Heading", { exact: true }).fill("Latest clipboard request");

  await page.evaluate(() => {
    const clipboard = navigator.clipboard;
    const nativeWrite = clipboard.writeText.bind(clipboard);
    let writes = 0;
    Object.defineProperty(clipboard, "writeText", {
      configurable: true,
      value: (text: string) => {
        writes += 1;
        if (writes > 1) return nativeWrite(text);
        return new Promise<void>((resolve, reject) => {
          (window as unknown as { __releaseFirstCopy?: () => void }).__releaseFirstCopy = () =>
            nativeWrite(text).then(resolve, reject);
        });
      },
    });
  });

  await page.getByRole("button", { name: /^Copy link$/ }).click();
  await expect.poll(() =>
    page.evaluate(
      () => typeof (window as unknown as { __releaseFirstCopy?: unknown }).__releaseFirstCopy
    )
  ).toBe("function");

  const sourceMenu = page.locator("details.export-more");
  await sourceMenu.locator("summary").click();
  await page.getByRole("button", { name: /Copy Markdown/i }).click();
  await page.evaluate(() => {
    const host = window as unknown as { __releaseFirstCopy?: () => void };
    const release = host.__releaseFirstCopy;
    delete host.__releaseFirstCopy;
    release?.();
  });

  await expect(page.locator(".status").last()).toContainText("Copied Markdown to clipboard");
  const clipboard = await page.evaluate(async () => navigator.clipboard.readText());
  expect(clipboard).toMatch(/^---/m);
  expect(clipboard).toContain("Latest clipboard request");
  expect(clipboard).not.toMatch(/[?&]d=d1\./);
});
