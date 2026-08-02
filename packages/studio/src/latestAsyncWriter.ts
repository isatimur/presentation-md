export type LatestAsyncWriteResult = "applied" | "stale";

export interface LatestAsyncWriter {
  write: <Value>(
    produce: () => Value | Promise<Value>,
    consume: (value: Value) => Promise<void>
  ) => Promise<LatestAsyncWriteResult>;
  invalidate: () => void;
}

/**
 * Serializes side-effecting async writes while giving the newest request
 * ownership. If an older write is already in flight, the newest waits and is
 * applied last; stale producer/write failures are suppressed.
 */
export function createLatestAsyncWriter(): LatestAsyncWriter {
  let latestId = 0;
  let tail = Promise.resolve();

  return {
    write: async (produce, consume) => {
      const id = ++latestId;
      let value: Awaited<ReturnType<typeof produce>>;
      try {
        value = await produce();
      } catch (error) {
        if (id !== latestId) return "stale";
        throw error;
      }
      if (id !== latestId) return "stale";

      const job = tail.then(async (): Promise<LatestAsyncWriteResult> => {
        if (id !== latestId) return "stale";
        try {
          await consume(value);
        } catch (error) {
          if (id !== latestId) return "stale";
          throw error;
        }
        return id === latestId ? "applied" : "stale";
      });
      tail = job.then(
        () => undefined,
        () => undefined
      );
      return job;
    },
    invalidate: () => {
      latestId += 1;
    },
  };
}
