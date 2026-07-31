import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CORE = join(__dirname, "..");
const SKILL = join(__dirname, "..", "..", "..", "skills", "presentation-generator");

const ROOT_FILES = ["SKILL.md", "deck.schema.json", "theme.schema.json"] as const;
const SCRIPT_FILES = ["export-pdf.sh", "export-pdf.mjs", "deploy.sh", "package.json"] as const;

function listFiles(dir: string): string[] {
  return readdirSync(dir)
    .filter((name) => {
      const full = join(dir, name);
      return statSync(full).isFile();
    })
    .sort();
}

describe("skill sync (packages/core ↔ skills/presentation-generator)", () => {
  it("keeps root skill files byte-identical", () => {
    for (const name of ROOT_FILES) {
      const corePath = join(CORE, name);
      const skillPath = join(SKILL, name);
      expect(existsSync(corePath), `missing core ${name}`).toBe(true);
      expect(existsSync(skillPath), `missing skill ${name}`).toBe(true);
      expect(readFileSync(skillPath, "utf-8"), name).toBe(readFileSync(corePath, "utf-8"));
    }
  });

  it("keeps references/ byte-identical", () => {
    const coreRefs = join(CORE, "references");
    const skillRefs = join(SKILL, "references");
    const coreFiles = listFiles(coreRefs);
    const skillFiles = listFiles(skillRefs);
    expect(skillFiles).toEqual(coreFiles);
    for (const name of coreFiles) {
      expect(readFileSync(join(skillRefs, name), "utf-8"), name).toBe(
        readFileSync(join(coreRefs, name), "utf-8")
      );
    }
  });

  it("publishes PDF/deploy scripts in the core package tarball surface", () => {
    for (const name of SCRIPT_FILES) {
      expect(existsSync(join(CORE, "scripts", name)), name).toBe(true);
      expect(existsSync(join(SKILL, "scripts", name)), name).toBe(true);
      expect(readFileSync(join(SKILL, "scripts", name), "utf-8"), name).toBe(
        readFileSync(join(CORE, "scripts", name), "utf-8")
      );
    }
    const pkg = JSON.parse(readFileSync(join(CORE, "package.json"), "utf-8")) as {
      files: string[];
    };
    expect(pkg.files).toContain("scripts");
  });

  it("ships a deck schema that includes craft layouts", () => {
    const schema = JSON.parse(readFileSync(join(CORE, "deck.schema.json"), "utf-8")) as {
      $defs?: { layout?: { enum?: string[] } };
    };
    // Support either top-level or $defs shapes used historically.
    const raw = readFileSync(join(CORE, "deck.schema.json"), "utf-8");
    for (const layout of [
      "chart",
      "custom-html",
      "ranked-list",
      "logo-wall",
      "streak-grid",
      "metric-ring",
    ]) {
      expect(raw.includes(`"${layout}"`), layout).toBe(true);
    }
    expect(schema).toBeTruthy();
  });
});
