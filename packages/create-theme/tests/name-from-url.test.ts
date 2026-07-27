import { describe, it, expect } from "vitest";
import { deriveNameFromUrl } from "../src/name-from-url.js";

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
