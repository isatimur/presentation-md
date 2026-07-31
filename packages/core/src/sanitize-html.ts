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

/** Return sanitized HTML safe to inject via Mustache {{{html}}}. */
export function sanitizeCustomHtml(input: unknown): string {
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

  return html.trim();
}
