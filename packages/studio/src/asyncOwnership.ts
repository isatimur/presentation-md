export type AsyncOwnershipDecision = "apply" | "conflict" | "stale";

export interface AsyncTicket<Revision> {
  readonly id: number;
  readonly baseline: Revision;
}

export interface AsyncOwnership<Revision> {
  begin: (baseline: Revision) => AsyncTicket<Revision>;
  classify: (ticket: AsyncTicket<Revision>, current: Revision) => AsyncOwnershipDecision;
  invalidate: () => void;
}

/**
 * Owns async results against both request order and the revision visible when
 * work began. Reference identity is intentional: Studio deck updates are
 * immutable, so it cheaply detects every user edit without serializing data.
 */
export function createAsyncOwnership<Revision>(): AsyncOwnership<Revision> {
  let latestId = 0;
  return {
    begin: (baseline) => ({ id: ++latestId, baseline }),
    classify: (ticket, current) => {
      if (ticket.id !== latestId) return "stale";
      return ticket.baseline === current ? "apply" : "conflict";
    },
    invalidate: () => {
      latestId += 1;
    },
  };
}
