import { describe, expect, it } from "vitest";
import {
  PRESENTATION_MD_SITE,
  STUNNING_25_STUDIO_EXAMPLES,
  themeDiscoveryLinks,
} from "../src/theme-discovery.js";

describe("themeDiscoveryLinks", () => {
  it("always returns a same-site preview_url", () => {
    const links = themeDiscoveryLinks("default-tech");
    expect(links.preview_url).toBe(`${PRESENTATION_MD_SITE}/previews/default-tech.html`);
    expect(links.studio_example).toBeUndefined();
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
