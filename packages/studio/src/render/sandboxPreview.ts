/**
 * Prepare export-ready deck HTML for a Studio iframe that deliberately omits
 * `allow-scripts`. Keep the inert Deck JSON used for round-tripping, but remove
 * executable inline/module/external scripts so Chromium does not report
 * expected sandbox blocks as console errors.
 */
function readAttribute(attributes: string, wantedName: string): string | null {
  let index = 0;
  while (index < attributes.length) {
    while (/\s|\//.test(attributes[index] ?? "")) index += 1;
    if (index >= attributes.length) break;

    const nameStart = index;
    while (index < attributes.length && !/[\s=/>]/.test(attributes[index] ?? "")) {
      index += 1;
    }
    const name = attributes.slice(nameStart, index).toLowerCase();
    while (/\s/.test(attributes[index] ?? "")) index += 1;

    let value = "";
    if (attributes[index] === "=") {
      index += 1;
      while (/\s/.test(attributes[index] ?? "")) index += 1;
      const quote = attributes[index];
      if (quote === '"' || quote === "'") {
        index += 1;
        const valueStart = index;
        while (index < attributes.length && attributes[index] !== quote) index += 1;
        value = attributes.slice(valueStart, index);
        if (attributes[index] === quote) index += 1;
      } else {
        const valueStart = index;
        while (index < attributes.length && !/[\s/>]/.test(attributes[index] ?? "")) {
          index += 1;
        }
        value = attributes.slice(valueStart, index);
      }
    }

    if (name === wantedName) return value;
  }
  return null;
}

const SANDBOX_RUNTIME_CHROME_CSS = `<style data-pmd-sandbox-preview>
.nav-hint,
.pmd-edit-hotzone,
.pmd-edit-toggle,
.pmd-slide-dots,
.pmd-progress,
.pmd-stage-tools,
.pmd-curtain,
.pmd-notes-rail,
.pmd-filmstrip,
.pmd-present-bar,
.pmd-overview,
.pmd-present-help { display: none !important; }
</style>`;

export function prepareSandboxedPreviewHtml(html: string): string {
  const inertHtml = html.replace(
    /<script\b([^>]*)>[\s\S]*?<\/script\s*>/gi,
    (script, attributes: string) => {
      const value = (readAttribute(attributes, "type") ?? "").toLowerCase();
      return value === "application/json" ? script : "";
    }
  );
  return inertHtml.includes("</head>")
    ? inertHtml.replace("</head>", `${SANDBOX_RUNTIME_CHROME_CSS}</head>`)
    : `${SANDBOX_RUNTIME_CHROME_CSS}${inertHtml}`;
}
