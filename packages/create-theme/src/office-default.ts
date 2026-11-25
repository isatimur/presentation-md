import type { BrandExtractionResult } from "./extract-brand.js";

/**
 * Refuse to write a theme whose colours are an Office default scheme, unless
 * the caller allows it. The MCP tool (write: true) and the CLI call this
 * before scaffoldTheme.
 */
export function assertNotOfficeDefault(result: BrandExtractionResult, allow: boolean): void {
  if (result.source !== "office-default" || allow) return;
  const label = result.scheme?.officeDefault ?? "Office default";
  throw new Error(
    `office-default: The template uses ${label} colours, not brand colours. ` +
      `Ask for the brand colours, try the company URL, or pass allowOfficeDefault.`
  );
}
