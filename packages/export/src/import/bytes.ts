/** Browser- and Node-safe byte helpers for PPTX import. */

export function bytesToUtf8(bytes: Uint8Array): string {
  if (typeof TextDecoder !== "undefined") {
    return new TextDecoder("utf-8").decode(bytes);
  }
  // Node fallback without importing buffer (keeps the module browser-safe).
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]!);
  try {
    return decodeURIComponent(escape(s));
  } catch {
    return s;
  }
}

export function bytesToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes).toString("base64");
  }
  if (typeof btoa === "function") {
    const chunk = 0x8000;
    let binary = "";
    for (let i = 0; i < bytes.length; i += chunk) {
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    }
    return btoa(binary);
  }
  throw new Error("No base64 encoder available in this runtime");
}
