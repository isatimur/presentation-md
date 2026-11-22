import { afterEach, describe, expect, it } from "vitest";
import { detectLocale, formatMessage, getLocale, setLocale, t } from "../src/i18n/index.js";
import { CATALOG_LOADERS, type Catalog } from "../src/i18n/catalogs.js";
import { LOCALES } from "../src/i18n/locales.js";
import { en } from "../src/i18n/messages/en.js";
import type { Message, PluralForms } from "../src/i18n/types.js";

const placeholders = (m: Message): string[] => {
  const texts = typeof m === "string" ? [m] : Object.values(m).filter(Boolean);
  const names = new Set<string>();
  for (const text of texts) for (const x of (text as string).matchAll(/\{(\w+)\}/g)) names.add(x[1]!);
  return [...names].sort();
};

describe("formatMessage", () => {
  it("fills placeholders and formats numbers per locale", () => {
    expect(formatMessage("en", "Saved {name}", { name: "deck.json" })).toBe("Saved deck.json");
    expect(formatMessage("de", "{n} Folien", { n: 12345 })).toBe("12.345 Folien");
    expect(formatMessage("en", "Keep {missing}")).toBe("Keep {missing}");
  });

  it("selects CLDR plural forms (Russian has one/few/many)", () => {
    const slides: PluralForms = {
      one: "{count} слайд",
      few: "{count} слайда",
      many: "{count} слайдов",
      other: "{count} слайда",
    };
    expect(formatMessage("ru", slides, { count: 1 })).toBe("1 слайд");
    expect(formatMessage("ru", slides, { count: 3 })).toBe("3 слайда");
    expect(formatMessage("ru", slides, { count: 5 })).toBe("5 слайдов");
    expect(formatMessage("ru", slides, { count: 21 })).toBe("21 слайд");
  });

  it("selects Arabic plural forms (zero/one/two/few/many/other)", () => {
    const forms: PluralForms = {
      zero: "z",
      one: "o",
      two: "t",
      few: "f",
      many: "m",
      other: "x",
    };
    expect([0, 1, 2, 3, 11, 100].map((n) => formatMessage("ar", forms, { count: n }))).toEqual([
      "z",
      "o",
      "t",
      "f",
      "m",
      "x",
    ]);
  });
});

describe("detectLocale", () => {
  it("prefers ?lang=, then saved choice, then browser languages, then English", () => {
    expect(detectLocale({ search: "?lang=ja", stored: "de", languages: ["fr"] })).toBe("ja");
    expect(detectLocale({ search: "", stored: "de", languages: ["fr"] })).toBe("de");
    expect(detectLocale({ search: "", stored: null, languages: ["xx", "pt-PT", "fr"] })).toBe("pt");
    expect(detectLocale({ search: "?lang=xx", stored: "nope", languages: ["xx"] })).toBe("en");
  });
});

describe("runtime switching", () => {
  // Studio unit tests run in Node; a minimal <html> stand-in is enough here.
  (globalThis as { document?: unknown }).document ??= { documentElement: { lang: "", dir: "" } };

  afterEach(async () => {
    await setLocale("en", { persist: false });
  });

  it("switches catalogs and sets <html lang dir>", async () => {
    await setLocale("ar", { persist: false });
    expect(getLocale()).toBe("ar");
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
    expect(t("palette.empty")).not.toBe(en["palette.empty"]);
    await setLocale("en", { persist: false });
    expect(document.documentElement.dir).toBe("ltr");
    expect(t("palette.empty")).toBe(en["palette.empty"]);
  });
});

describe("catalog parity", () => {
  const enKeys = Object.keys(en).sort();

  it("has a loader for every non-English locale", () => {
    expect(Object.keys(CATALOG_LOADERS).sort()).toEqual(
      LOCALES.map((l) => l.code).filter((c) => c !== "en").sort()
    );
  });

  for (const code of Object.keys(CATALOG_LOADERS) as (keyof typeof CATALOG_LOADERS)[]) {
    describe(code, () => {
      let catalog: Catalog;

      it("defines exactly the English keys", async () => {
        catalog = await CATALOG_LOADERS[code]();
        expect(Object.keys(catalog).sort()).toEqual(enKeys);
      });

      it("keeps every placeholder and leaves nothing empty", async () => {
        catalog ??= await CATALOG_LOADERS[code]();
        for (const key of enKeys) {
          const source = en[key as keyof typeof en] as Message;
          const target = catalog[key as keyof Catalog] as Message;
          expect(placeholders(target), `${code} ${key}`).toEqual(placeholders(source));
          const texts = typeof target === "string" ? [target] : Object.values(target);
          for (const text of texts) expect((text as string).trim(), `${code} ${key}`).not.toBe("");
        }
      });

      it("fills every plural category the language needs", async () => {
        catalog ??= await CATALOG_LOADERS[code]();
        const needed = new Intl.PluralRules(code).resolvedOptions().pluralCategories;
        for (const key of enKeys) {
          const target = catalog[key as keyof Catalog] as Message;
          if (typeof target === "string") continue;
          for (const cat of needed) {
            expect(target[cat as keyof PluralForms], `${code} ${key} missing "${cat}"`).toBeTruthy();
          }
        }
      });
    });
  }
});
