/** Browser/vitest shim for `node:net` — pure-JS IP family detection. */

function parseIpv4(address: string): boolean {
  const parts = address.split(".");
  if (parts.length !== 4) return false;
  return parts.every((part) => {
    if (!/^\d{1,3}$/.test(part)) return false;
    const n = Number(part);
    return Number.isInteger(n) && n >= 0 && n <= 255;
  });
}

function isIpv6(address: string): boolean {
  const normalized = address.trim().replace(/^\[|\]$/g, "");
  if (!normalized.includes(":")) return false;
  if (!/^[0-9a-f:.]+$/i.test(normalized)) return false;
  // Reject lone IPv4 with a colon typo; require at least two segments.
  return normalized.split(":").length >= 2;
}

/** Mirror of Node's `net.isIP` return values: 0 | 4 | 6. */
export function isIP(input: string): 0 | 4 | 6 {
  const address = input.trim().replace(/^\[|\]$/g, "");
  if (!address) return 0;
  if (parseIpv4(address)) return 4;
  if (isIpv6(address)) return 6;
  return 0;
}
