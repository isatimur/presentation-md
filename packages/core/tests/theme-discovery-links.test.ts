import { describe, expect, it } from "vitest";
import {
  PRESENTATION_MD_SITE,
  STUNNING_25_STUDIO_EXAMPLES,
  themeDiscoveryLinks,
  themeStudioUrl,
} from "../src/theme-discovery.js";

describe("themeDiscoveryLinks", () => {
  it("always returns preview_url + studio_url (theme query for non-flagships)", () => {
    const links = themeDiscoveryLinks("default-tech");
    expect(links.preview_url).toBe(`${PRESENTATION_MD_SITE}/previews/default-tech.html`);
    expect(links.studio_example).toBeUndefined();
    expect(links.studio_url).toBe(
      `${PRESENTATION_MD_SITE}/studio/?theme=default-tech&fresh=1`
    );
    expect(themeStudioUrl("default-tech")).toBe(links.studio_url);
  });

  it("maps stunning-25 themes to Studio ?example= deep-links", () => {
    expect(STUNNING_25_STUDIO_EXAMPLES["aurora-glass"]).toBe("novaspark-pitch");
    const links = themeDiscoveryLinks("aurora-glass", "examples/novaspark-pitch.html");
    expect(links.studio_example).toBe("novaspark-pitch");
    expect(links.studio_url).toBe(
      `${PRESENTATION_MD_SITE}/studio/?example=novaspark-pitch&fresh=1`
    );
    expect(links.gallery_url).toBe(`${PRESENTATION_MD_SITE}/examples/novaspark-pitch.html`);
  });
});
