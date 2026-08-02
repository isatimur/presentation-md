import { describe, expect, it } from "vitest";
import { createAsyncOwnership } from "../src/asyncOwnership.js";

describe("createAsyncOwnership", () => {
  it("classifies unchanged, conflicted, superseded, and invalidated work", () => {
    const ownership = createAsyncOwnership<object>();
    const initialRevision = {};
    const first = ownership.begin(initialRevision);

    expect(ownership.classify(first, initialRevision)).toBe("apply");
    expect(ownership.classify(first, {})).toBe("conflict");

    const secondRevision = {};
    const second = ownership.begin(secondRevision);
    expect(ownership.classify(first, initialRevision)).toBe("stale");
    expect(ownership.classify(second, secondRevision)).toBe("apply");

    ownership.invalidate();
    expect(ownership.classify(second, secondRevision)).toBe("stale");
  });
});
