import { describe, expect, it } from "vitest";
import { createLatestAsyncWriter } from "../src/latestAsyncWriter.js";

function deferred(): { promise: Promise<void>; resolve: () => void; reject: (error: Error) => void } {
  let resolve!: () => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<void>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

describe("createLatestAsyncWriter", () => {
  it("serializes writes so a newer request is physically applied last", async () => {
    const writer = createLatestAsyncWriter();
    const firstGate = deferred();
    const firstStarted = deferred();
    const writes: string[] = [];
    const consume = async (value: string) => {
      writes.push(value);
      if (value === "old") {
        firstStarted.resolve();
        await firstGate.promise;
      }
    };

    const old = writer.write(() => "old", consume);
    await firstStarted.promise;
    const current = writer.write(() => "current", consume);
    expect(writes).toEqual(["old"]);

    firstGate.resolve();
    await expect(old).resolves.toBe("stale");
    await expect(current).resolves.toBe("applied");
    expect(writes).toEqual(["old", "current"]);
  });

  it("does not consume a value from a producer superseded before it finishes", async () => {
    const writer = createLatestAsyncWriter();
    const producerGate = deferred();
    const writes: string[] = [];
    const old = writer.write(async () => {
      await producerGate.promise;
      return "old";
    }, async (value) => {
      writes.push(value);
    });
    const current = writer.write(() => "current", async (value) => {
      writes.push(value);
    });

    await expect(current).resolves.toBe("applied");
    producerGate.resolve();
    await expect(old).resolves.toBe("stale");
    expect(writes).toEqual(["current"]);
  });

  it("suppresses stale failures but surfaces a current write failure", async () => {
    const writer = createLatestAsyncWriter();
    const writeGate = deferred();
    const writeStarted = deferred();
    const old = writer.write(() => "old", async () => {
      writeStarted.resolve();
      await writeGate.promise;
    });
    await writeStarted.promise;
    const current = writer.write(() => "current", async () => undefined);

    writeGate.reject(new Error("obsolete failure"));
    await expect(old).resolves.toBe("stale");
    await expect(current).resolves.toBe("applied");

    await expect(
      writer.write(() => "broken", async () => {
        throw new Error("current failure");
      })
    ).rejects.toThrow("current failure");
  });

  it("invalidates queued work", async () => {
    const writer = createLatestAsyncWriter();
    const gate = deferred();
    const writes: string[] = [];
    const pending = writer.write(async () => {
      await gate.promise;
      return "old";
    }, async (value) => {
      writes.push(value);
    });

    writer.invalidate();
    gate.resolve();
    await expect(pending).resolves.toBe("stale");
    expect(writes).toEqual([]);
  });
});
