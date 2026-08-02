import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { resolveConfig } from "vite";

describe("Studio production build config", () => {
  it("uses relative asset URLs so standalone output works below any subpath", async () => {
    const configFile = fileURLToPath(new URL("../vite.config.ts", import.meta.url));
    const config = await resolveConfig({ configFile }, "build");

    expect(config.base).toBe("./");
  });
});
