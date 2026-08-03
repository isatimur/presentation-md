import { describe, expect, it } from "vitest";
import { prepareSandboxedPreviewHtml } from "../src/render/sandboxPreview.js";

describe("sandboxed preview HTML", () => {
  it("removes executable scripts while preserving embedded Deck JSON", () => {
    const html = `<!doctype html><html><body>
      <script type="application/json" id="pmd-deck">{"type":"deck"}</script>
      <script>window.deckNavigation = true;</script>
      <script type="module" src="/runtime.js"></script>
    </body></html>`;

    const preview = prepareSandboxedPreviewHtml(html);

    expect(preview).toContain('type="application/json" id="pmd-deck"');
    expect(preview).toContain('{"type":"deck"}');
    expect(preview).not.toContain("window.deckNavigation");
    expect(preview).not.toContain("/runtime.js");
  });

  it("does not confuse data attributes or quoted text with the script type", () => {
    const html = `<!doctype html><html><body>
      <script data-type="application/json">window.fromDataType = true;</script>
      <script data-note=" type=application/json ">window.fromNote = true;</script>
      <script TYPE='APPLICATION/JSON' id="pmd-deck">{"type":"deck"}</script>
    </body></html>`;

    const preview = prepareSandboxedPreviewHtml(html);

    expect(preview).not.toContain("window.fromDataType");
    expect(preview).not.toContain("window.fromNote");
    expect(preview).toContain('id="pmd-deck"');
    expect(preview).toContain('{"type":"deck"}');
  });

  it("hides exported presenter chrome in inert Studio iframes", () => {
    const html = `<!doctype html><html><head></head><body>
      <div class="nav-hint">dead shortcut</div>
      <div class="pmd-present-bar">1 / 1</div>
    </body></html>`;

    const preview = prepareSandboxedPreviewHtml(html);

    expect(preview).toContain("data-pmd-sandbox-preview");
    expect(preview).toMatch(/\.nav-hint[\s\S]*\.pmd-present-bar[\s\S]*display:\s*none\s*!important/);
  });
});
