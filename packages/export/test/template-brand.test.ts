import { describe, it, expect } from "vitest";
import { extractTemplateBrand, MAX_TEMPLATE_ZIP_ENTRIES } from "../src/import/index.js";
import { MAX_UNCOMPRESSED_BYTES } from "../src/import/zip-limits.js";
import { buildTemplate, entryCount, BRAND_SCHEME } from "./fixtures/build-template.js";

const OFFICE_2007 = ["4F81BD", "C0504D", "9BBB59", "8064A2", "4BACC6", "F79646"];
const OFFICE_2013 = ["4472C4", "ED7D31", "A5A5A5", "FFC000", "5B9BD5", "70AD47"];
const OFFICE_2023 = ["156082", "E97132", "196B24", "0F9ED5", "A02B93", "4EA72E"];

function accents(list: string[]): Record<string, string> {
  return Object.fromEntries(list.map((hex, i) => [`accent${i + 1}`, hex]));
}

const W = 12192000;
const H = 6858000;

describe("extractTemplateBrand — colours", () => {
  it("reads a custom scheme exactly, lower-cased, ignoring child transforms", async () => {
    const brand = await extractTemplateBrand(await buildTemplate());
    expect(brand.scheme.accent1).toBe("#e4572e");
    expect(brand.scheme.dk1).toBe("#1b1b1f");
    expect(brand.scheme.folHlink).toBe("#954f72");
    expect(Object.keys(brand.scheme)).toHaveLength(12);
    expect(brand.schemeName).toBe("Acme Brand");
    expect(brand.officeDefault).toBeNull();
    expect(brand.builtInName).toBeNull();
    expect(brand.clrMap).toEqual({ bg1: "lt1", tx1: "dk1", bg2: "lt2", tx2: "dk2" });
  });

  it("reads sysClr@lastClr", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ sysClr: ["dk1", "lt1"], scheme: { dk1: "000000", lt1: "FFFFFF" } })
    );
    expect(brand.scheme.dk1).toBe("#000000");
    expect(brand.scheme.lt1).toBe("#ffffff");
  });

  it("reads a dark clrMap", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ clrMap: { bg1: "dk1", tx1: "lt1", bg2: "dk2", tx2: "lt2" } })
    );
    expect(brand.clrMap).toEqual({ bg1: "dk1", tx1: "lt1", bg2: "dk2", tx2: "lt2" });
  });

  it("keeps a clrMap role that points at an accent slot", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ clrMap: { bg1: "accent1", bg2: "hlink" } })
    );
    expect(brand.clrMap).toEqual({ bg1: "accent1", tx1: "dk1", bg2: "hlink", tx2: "dk2" });
  });

  it("falls back to the default for an unknown clrMap target", async () => {
    const brand = await extractTemplateBrand(await buildTemplate({ clrMap: { bg1: "bogus" } }));
    expect(brand.clrMap.bg1).toBe("lt1");
  });

  it("follows a master relationship ID that is not rId<n>", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ masterRelId: "masterRel", scheme: { accent1: "112233" } })
    );
    expect(brand.scheme.accent1).toBe("#112233");
  });

  it("uses the first of two masters", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({
        scheme: { accent1: "112233" },
        secondMaster: { scheme: { accent1: "445566" }, schemeName: "Second" },
      })
    );
    expect(brand.scheme.accent1).toBe("#112233");
    expect(brand.schemeName).toBe("Acme Brand");
  });

  it.each([
    ["Office 2007–2010", OFFICE_2007],
    ["Office 2013–2022", OFFICE_2013],
    ["Office 2023+", OFFICE_2023],
  ])("detects the %s default", async (label, table) => {
    const brand = await extractTemplateBrand(await buildTemplate({ scheme: accents(table) }));
    expect(brand.officeDefault).toBe(label);
  });

  it("is not a default when only accent1 differs", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ scheme: { ...accents(OFFICE_2013), accent1: "E4572E" } })
    );
    expect(brand.officeDefault).toBeNull();
  });

  it("is still a default when one accent other than accent1 differs", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ scheme: { ...accents(OFFICE_2013), accent4: "E4572E" } })
    );
    expect(brand.officeDefault).toBe("Office 2013–2022");
  });

  it("is not a default when two accents other than accent1 differ", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ scheme: { ...accents(OFFICE_2013), accent4: "E4572E", accent5: "17BEBB" } })
    );
    expect(brand.officeDefault).toBeNull();
  });

  it("warns on a built-in scheme name", async () => {
    const brand = await extractTemplateBrand(await buildTemplate({ schemeName: "Median" }));
    expect(brand.builtInName).toBe("Median");
    expect(brand.warnings).toContain(
      "The template uses PowerPoint's built-in colour scheme 'Median'. These may not be the brand colours."
    );
  });
});

describe("extractTemplateBrand — fonts", () => {
  it("reads heading and body latin typefaces", async () => {
    const brand = await extractTemplateBrand(await buildTemplate());
    expect(brand.fonts).toEqual({ heading: "Source Sans 3", body: "Calibri" });
    expect(brand.warnings).toEqual([]);
  });

  it("treats an empty latin typeface as absent", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ fonts: { latin: { heading: "", body: "Calibri" } } })
    );
    expect(brand.fonts.heading).toBeUndefined();
    expect(brand.fonts.body).toBe("Calibri");
  });

  it("warns when the template sets its own East Asian font", async () => {
    const brand = await extractTemplateBrand(await buildTemplate({ fonts: { ea: "Yu Gothic" } }));
    expect(brand.fonts.ea).toBe("Yu Gothic");
    expect(brand.warnings).toContain(
      "The template sets its own East Asian or complex-script font (Yu Gothic). PPTX export uses Office's default for the deck language."
    );
  });

  it("strips control characters from template strings and caps their length", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({
        fonts: { ea: "Yu\u001b[2J Gothic‮" },
        schemeName: `Acme\u0007 ${"x".repeat(300)}`,
      })
    );
    expect(brand.fonts.ea).toBe("Yu[2J Gothic");
    expect(brand.warnings.join(" ")).not.toMatch(/[\u0000-\u001f‮]/);
    expect(brand.schemeName.startsWith("Acme ")).toBe(true);
    expect(brand.schemeName.length).toBeLessThanOrEqual(100);
  });
});

describe("extractTemplateBrand — logo metadata", () => {
  it("finds a top-right PNG logo without reading its bytes", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({
        pictures: [{ mime: "image/png", x: W - 1600000, y: 200000, cx: 1219200, cy: 400000, bytes: 4321 }],
      })
    );
    expect(brand.logo).toEqual({
      found: true,
      mime: "image/png",
      hasSvg: false,
      corner: "top-right",
      widthPct: 10,
      sizeBytes: 4321,
    });
  });

  it("picks the picture nearest a corner", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({
        pictures: [
          { mime: "image/jpeg", x: W / 2 - 500000, y: H / 2 - 300000, cx: 1000000, cy: 600000 },
          { mime: "image/png", x: 100000, y: H - 500000, cx: 900000, cy: 400000 },
        ],
      })
    );
    expect(brand.logo.corner).toBe("bottom-left");
    expect(brand.logo.mime).toBe("image/png");
  });

  it("rounds widthPct to one decimal place", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ pictures: [{ x: 0, y: 0, cx: 1234567, cy: 300000 }] })
    );
    // 1234567 / 12192000 = 10.1260…%
    expect(brand.logo.widthPct).toBe(10.1);
  });

  it("sets hasSvg when an svgBlip extension is present", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ pictures: [{ x: 0, y: 0, cx: 1000000, cy: 300000, svgBlip: true }] })
    );
    expect(brand.logo.hasSvg).toBe(true);
  });

  it("skips a picture wider than a quarter of the slide", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ pictures: [{ x: 0, y: 0, cx: W / 4 + 1, cy: 300000 }] })
    );
    expect(brand.logo).toEqual({ found: false });
  });

  it("accepts a picture exactly a quarter of the slide wide", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ pictures: [{ x: 0, y: 0, cx: W / 4, cy: 300000 }] })
    );
    expect(brand.logo.found).toBe(true);
    expect(brand.logo.widthPct).toBe(25);
  });

  it("warns about a grouped picture and does not use it", async () => {
    const brand = await extractTemplateBrand(
      await buildTemplate({ groupedPictures: [{ x: 0, y: 0, cx: 1000000, cy: 300000 }] })
    );
    expect(brand.logo.found).toBe(false);
    expect(brand.warnings).toContain("The master has a grouped picture; logo detection skips groups.");
  });
});

describe("extractTemplateBrand — broken and hostile files", () => {
  it("names the file when the master is missing", async () => {
    const bytes = await buildTemplate({ omitMaster: true });
    await expect(extractTemplateBrand(bytes, { fileName: "acme.potx" })).rejects.toThrow(
      "No slide master in acme.potx"
    );
    await expect(extractTemplateBrand(bytes)).rejects.toThrow("No slide master in the template");
  });

  it("names the file when the theme is missing", async () => {
    const bytes = await buildTemplate({ omitTheme: true });
    await expect(extractTemplateBrand(bytes, { fileName: "acme.potx" })).rejects.toThrow(
      "No theme part for the first slide master in acme.potx"
    );
    await expect(extractTemplateBrand(bytes)).rejects.toThrow(
      "No theme part for the first slide master in the template"
    );
  });

  it("refuses a DOCTYPE in the theme part", async () => {
    await expect(extractTemplateBrand(await buildTemplate({ doctypeIn: "theme" }))).rejects.toThrow(
      "ppt/theme/theme1.xml contains a DOCTYPE; PowerPoint files never need one."
    );
  });

  it("accepts 300 entries and zero slides", async () => {
    const base = await entryCount(await buildTemplate());
    const bytes = await buildTemplate({ extraEntries: 300 - base });
    expect(await entryCount(bytes)).toBe(300);
    const brand = await extractTemplateBrand(bytes);
    expect(brand.scheme.accent1).toBe(`#${BRAND_SCHEME.accent1.toLowerCase()}`);
  });

  it("accepts sample slides", async () => {
    const brand = await extractTemplateBrand(await buildTemplate({ kind: "pptx", slides: 3 }));
    expect(brand.scheme.accent1).toBe("#e4572e");
  });

  it("refuses 2,001 entries", async () => {
    const base = await entryCount(await buildTemplate());
    const bytes = await buildTemplate({ extraEntries: MAX_TEMPLATE_ZIP_ENTRIES + 1 - base });
    await expect(extractTemplateBrand(bytes)).rejects.toThrow("PPTX has too many entries (>2000)");
  });

  it("refuses a total over MAX_UNCOMPRESSED_BYTES", async () => {
    const perPart = 9 * 1024 * 1024;
    const count = Math.ceil(MAX_UNCOMPRESSED_BYTES / perPart) + 1;
    const bytes = await buildTemplate({ zeroMedia: { count, bytes: perPart } });
    await expect(extractTemplateBrand(bytes)).rejects.toThrow(/uncompressed size exceeds/);
  }, 30_000);

  it("reads a template padded with 10 MB of media in under 2 s", async () => {
    const bytes = await buildTemplate({ paddingBytes: 10 * 1024 * 1024 });
    expect(bytes.byteLength).toBeGreaterThan(10 * 1024 * 1024);
    const start = performance.now();
    await extractTemplateBrand(bytes);
    expect(performance.now() - start).toBeLessThan(2000);
  }, 30_000);
});
