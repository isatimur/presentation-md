import type { Route } from "@playwright/test";
import { isAllowedPdfSubresourceUrl } from "./pdfNetworkPolicy.js";

export const MAX_PDF_REDIRECT_HOPS = 5;

export type PdfSubresourceUrlPolicy = (requestUrl: string) => Promise<boolean>;

/**
 * Route a PDF subresource without allowing Chromium to follow an unchecked
 * redirect. Every hop is revalidated, and all malformed or excessive chains
 * fail closed.
 */
async function guardPdfSubresourceRouteUnchecked(
  route: Route,
  decisions: Map<string, Promise<boolean>>,
  isAllowedUrl: PdfSubresourceUrlPolicy
): Promise<void> {
  const allowed = (requestUrl: string): Promise<boolean> => {
    let decision = decisions.get(requestUrl);
    if (!decision) {
      decision = isAllowedUrl(requestUrl);
      decisions.set(requestUrl, decision);
    }
    return decision;
  };

  let currentUrl = route.request().url();
  if (!(await allowed(currentUrl))) {
    await route.abort("blockedbyclient");
    return;
  }

  const protocol = new URL(currentUrl).protocol;
  if (protocol === "data:" || protocol === "blob:" || protocol === "about:") {
    await route.continue();
    return;
  }

  let response = await route.fetch({ maxRedirects: 0 });
  for (let hop = 0; response.status() >= 300 && response.status() < 400; hop += 1) {
    const location = response.headers()["location"];
    if (!location || hop >= MAX_PDF_REDIRECT_HOPS) {
      await response.dispose();
      await route.abort("blockedbyclient");
      return;
    }
    const nextUrl = new URL(location, currentUrl).toString();
    if (!(await allowed(nextUrl))) {
      await response.dispose();
      await route.abort("blockedbyclient");
      return;
    }
    await response.dispose();
    currentUrl = nextUrl;
    response = await route.fetch({ url: currentUrl, maxRedirects: 0 });
  }
  await route.fulfill({ response });
}

export async function guardPdfSubresourceRoute(
  route: Route,
  decisions: Map<string, Promise<boolean>>,
  isAllowedUrl: PdfSubresourceUrlPolicy = isAllowedPdfSubresourceUrl
): Promise<void> {
  try {
    await guardPdfSubresourceRouteUnchecked(route, decisions, isAllowedUrl);
  } catch {
    try {
      await route.abort("blockedbyclient");
    } catch {
      // The request or page may already be gone. The route still fails closed.
    }
  }
}
