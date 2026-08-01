import { describe, it, expect } from "vitest";
import { themeFromBrandCss } from "../src/brand/pasteBrandTheme.js";
import { registerCustomTheme, resolveTheme, listThemeNames } from "../src/render/themes.js";

describe("themeFromBrandCss", () => {
  it("builds a contrast-safe custom theme from :root CSS", () => {
    const css = `:root {
  --bg: #0a0a0a;
  --text: #fafafa;
  --accent: #22c55e;
}
h1 { font-family: 'Poppins', sans-serif; }
body { font-family: 'Inter', sans-serif; }
`;
    const { manifest, name } = themeFromBrandCss(css, "acme-brand");
    expect(name).toBe("acme-brand");
    expect(manifest.extends).toBe("default-tech");
    expect(manifest.roles?.bg).toBe("#0a0a0a");
    expect(manifest.roles?.accent?.toLowerCase()).toBe("#22c55e");
    registerCustomTheme(manifest);
    expect(listThemeNames()).toContain("acme-brand");
    const resolved = resolveTheme("acme-brand");
    expect(resolved.palette.bg).toBe("#0a0a0a");
    expect(resolved.typography.headingFont).toMatch(/Poppins/);
  });

  it("rejects empty CSS", () => {
    expect(() => themeFromBrandCss("")).toThrow(/Paste brand CSS/i);
  });
});
