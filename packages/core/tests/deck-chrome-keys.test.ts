import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const shared = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "shared");
const template = readFileSync(join(shared, "document.html"), "utf-8");
const catalog = JSON.parse(readFileSync(join(shared, "deck-chrome.json"), "utf-8")) as Record<
  string,
  Record<string, string>
>;
const en = catalog["en"] ?? {};

function matches(re: RegExp): string[] {
  return [...template.matchAll(re)].map((m) => m[1]!);
}

describe("deck chrome catalog vs document.html", () => {
  it("defines every {{chrome.X}} used in markup", () => {
    const keys = matches(/\{\{\{?chrome\.([A-Za-z0-9]+)\}?\}\}/g);
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) expect(en, key).toHaveProperty(key);
  });

  it('defines every pmdT("X") used in the script', () => {
    const keys = matches(/pmdT\("([A-Za-z0-9]+)"/g);
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) expect(en, key).toHaveProperty(key);
  });

  it("has no unused English keys", () => {
    const used = new Set([
      ...matches(/\{\{\{?chrome\.([A-Za-z0-9]+)\}?\}\}/g),
      ...matches(/pmdT\("([A-Za-z0-9]+)"/g),
    ]);
    for (const key of Object.keys(en)) expect(used.has(key), key).toBe(true);
  });
});

describe("deck chrome translations", () => {
  const placeholders = (s: string) => (s.match(/\{\w+\}/g) ?? []).sort().join(",");
  const langs = Object.keys(catalog).filter((l) => l !== "en");

  it("covers the ten Studio languages", () => {
    expect(langs.sort()).toEqual(["ar", "de", "es", "fr", "id", "ja", "pt", "ru", "zh"]);
  });

  for (const lang of langs) {
    it(`${lang} has every English key, the same placeholders, and no empty strings`, () => {
      const t = catalog[lang]!;
      expect(Object.keys(t).sort()).toEqual(Object.keys(en).sort());
      for (const [key, value] of Object.entries(en)) {
        expect(placeholders(t[key]!), `${lang} ${key}`).toBe(placeholders(value));
        expect(t[key]!.trim(), `${lang} ${key}`).not.toBe("");
      }
    });
  }
});
