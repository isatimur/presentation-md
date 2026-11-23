/**
 * pptxgenjs only embeds base64 data URIs (`data:<mime>;base64,<data>`). Given a
 * URL-encoded one such as `data:image/svg+xml,%3Csvg…` it logs an error and
 * drops the image without throwing, so the slide exports with a blank frame.
 * Deck JSON uses URL-encoded SVG heroes widely, so normalize before embed.
 */

const DATA_URI = /^data:([^;,]+)((?:;[^;,]*)*),([\s\S]*)$/i;

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

/**
 * Return `uri` as a base64 data URI pptxgenjs can embed, or `null` when it is
 * not a well-formed data URI (callers show a placeholder and warn).
 */
export function toBase64DataUri(uri: string): string | null {
  const m = DATA_URI.exec(uri.trim());
  if (!m) return null;
  const mime = m[1]!.toLowerCase();
  const params = m[2] ?? "";
  const payload = m[3] ?? "";
  if (!payload) return null;
  if (/;base64/i.test(params)) return `data:${mime};base64,${payload.replace(/\s+/g, "")}`;
  // Decode %XX runs only: hand-written URIs keep bare "%" (e.g. width="100%").
  const text = payload.replace(/(?:%[0-9a-f]{2})+/gi, (run) => {
    try {
      return decodeURIComponent(run);
    } catch {
      return run;
    }
  });
  return `data:${mime};base64,${bytesToBase64(new TextEncoder().encode(text))}`;
}
