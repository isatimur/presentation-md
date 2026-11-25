import { describe, it, expect } from "vitest";
import { deriveNameFromPath, deriveNameFromUrl } from "../src/name-from-url.js";

describe("deriveNameFromUrl", () => {
  it("converts a hostname to a kebab-case slug", () => {
    expect(deriveNameFromUrl("https://acme.com")).toBe("acme-com");
  });

  it("strips a leading www.", () => {
    expect(deriveNameFromUrl("https://www.acme.io/pricing")).toBe("acme-io");
  });

  it("throws when the resulting slug is invalid (e.g. starts with a digit)", () => {
    expect(() => deriveNameFromUrl("https://123.com")).toThrow(/could not derive/i);
  });
});

describe("deriveNameFromPath", () => {
  it("turns a file name into a kebab-case slug", () => {
    expect(deriveNameFromPath("brand/Acme Brand.potx")).toBe("acme-brand");
    expect(deriveNameFromPath("C:\\decks\\ACME__Corp (v2).pptx")).toBe("acme-corp-v2");
  });

  it("throws when no valid name results", () => {
    expect(() => deriveNameFromPath("2024 Brand.potx")).toThrow(
      "Could not derive a valid theme name from '2024 Brand.potx'. Pass 'name' explicitly."
    );
    expect(() => deriveNameFromPath("Марка.potx")).toThrow(/Could not derive a valid theme name/);
  });
});
