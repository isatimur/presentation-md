/**
 * Sanitize a custom-html fragment for schema-preserving one-off art.
 * Strips scripts, event handlers, dangerous URLs, and exotic tags while
 * keeping structural markup agents need for craft (div/svg/span/etc.).
 */

const FORBIDDEN_TAGS = new Set([
  "script",
  "iframe",
  "object",
  "embed",
  "link",
  "meta",
  "base",
  "form",
  "input",
  "button",
  "textarea",
  "select",
  "option",
  "frame",
  "frameset",
  "applet",
]);

const SAFE_LINK_SCHEMES = new Set(["http", "https", "mailto", "tel"]);

function stripControls(s: string): string {
  let out = "";
  for (const ch of s) {
    const c = ch.charCodeAt(0);
    if (c > 0x1f && c !== 0x7f) out += ch;
  }
  return out;
}

function schemeOf(url: string): string | undefined {
  return url.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):/)?.[1]?.toLowerCase();
}

function sanitizeUrl(url: string, allowDataImage = false): string {
  const cleaned = stripControls(url).trim();
  if (allowDataImage && /^data:image\//i.test(cleaned)) return cleaned;
  const s = schemeOf(cleaned);
  if (!s) return cleaned; // relative / fragment
  if (SAFE_LINK_SCHEMES.has(s)) return cleaned;
  return "#";
}

/** One sanitizer pass. Use sanitizeCustomHtml, which repeats until stable. */
function sanitizeOnce(input: unknown): string {
  if (typeof input !== "string" || !input.trim()) return "";

  // Drop script blocks wholesale (including nested content).
  let html = input.replace(/<\s*script\b[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, "");
  html = html.replace(/<\s*style\b[^>]*>[\s\S]*?<\s*\/\s*style\s*>/gi, (m) => {
    // Allow style tags but strip expression()/url(javascript:)
    return m
      .replace(/expression\s*\(/gi, "invalid(")
      .replace(/url\s*\(\s*['"]?\s*javascript:/gi, "url(#");
  });

  // Remove forbidden tags (open and close).
  for (const tag of FORBIDDEN_TAGS) {
    const reOpen = new RegExp(`<\\s*${tag}\\b[^>]*>`, "gi");
    const reClose = new RegExp(`<\\s*/\\s*${tag}\\s*>`, "gi");
    html = html.replace(reOpen, "").replace(reClose, "");
  }

  // Strip on* event handlers and javascript: URLs in attributes.
  html = html.replace(
    /\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,
    ""
  );
  html = html.replace(
    /\s(href|src|xlink:href|action)\s*=\s*(["'])([\s\S]*?)\2/gi,
    (_m, attr: string, q: string, val: string) => {
      const allowData = attr.toLowerCase() === "src" || attr.toLowerCase() === "xlink:href";
      return ` ${attr}=${q}${sanitizeUrl(val, allowData)}${q}`;
    }
  );

  // Neutralize javascript: / vbscript: / data:text in remaining attributes.
  html = html.replace(/(javascript|vbscript|data\s*:\s*text)\s*:/gi, "blocked:");

  // Drop ids in the renderer's reserved namespaces (pmd-*, psp-*), so slide
  // content cannot clobber pmd-deck / pmd-chrome or other chrome elements.
  // Values are entity-decoded first: the browser decodes &#112;md-x to pmd-x.
  html = html.replace(
    /\s+id\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi,
    (whole, dq?: string, sq?: string, bare?: string) =>
      RESERVED_ID.test(decodeEntities(dq ?? sq ?? bare ?? "").trim()) ? "" : whole
  );

  return html.trim();
}

const RESERVED_ID = /^(?:pmd|psp)-/i;

function decodeEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_m, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);?/g, (_m, dec: string) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&(amp|lt|gt|quot|apos|hyphen|dash);?/gi, (_m, name: string) =>
      ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", hyphen: "-", dash: "-" })[
        name.toLowerCase() as "amp"
      ] ?? "")
    .replace(/&#?[a-z0-9]+;/gi, "");
}

/**
 * Return sanitized HTML safe to inject via Mustache {{{html}}}. Repeats the
 * pass until the output stops changing, so overlapping patterns (e.g. tags
 * split by a stripped tag) cannot reassemble.
 */
export function sanitizeCustomHtml(input: unknown): string {
  let prev = sanitizeOnce(input);
  for (let i = 0; i < 5; i++) {
    const next = sanitizeOnce(prev);
    if (next === prev) return next;
    prev = next;
  }
  return prev;
}
