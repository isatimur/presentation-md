import type { DeckJson } from "@presentation-md/export";

const DEFAULT_LIMIT = 60;

export type DeckHistory = {
  past: DeckJson[];
  present: DeckJson;
  future: DeckJson[];
};

function sameDeck(a: DeckJson, b: DeckJson): boolean {
  const pending: Array<[unknown, unknown]> = [[a, b]];
  const compared = new WeakMap<object, WeakSet<object>>();

  while (pending.length) {
    const [left, right] = pending.pop()!;
    if (Object.is(left, right)) continue;
    if (
      typeof left !== "object" ||
      left === null ||
      typeof right !== "object" ||
      right === null
    ) {
      return false;
    }

    const leftIsArray = Array.isArray(left);
    if (leftIsArray !== Array.isArray(right)) return false;

    let seenRight = compared.get(left);
    if (seenRight?.has(right)) continue;
    if (!seenRight) {
      seenRight = new WeakSet<object>();
      compared.set(left, seenRight);
    }
    seenRight.add(right);

    const leftRecord = left as Record<string, unknown>;
    const rightRecord = right as Record<string, unknown>;
    const leftKeys = Object.keys(leftRecord);
    const rightKeys = Object.keys(rightRecord);
    if (leftKeys.length !== rightKeys.length) return false;
    for (const key of leftKeys) {
      if (!Object.prototype.hasOwnProperty.call(rightRecord, key)) return false;
      pending.push([leftRecord[key], rightRecord[key]]);
    }
  }

  return true;
}

export function createDeckHistory(present: DeckJson): DeckHistory {
  return { past: [], present, future: [] };
}

/** Record a new deck revision (clears redo). No-op when unchanged. */
export function pushDeck(
  history: DeckHistory,
  next: DeckJson,
  limit = DEFAULT_LIMIT
): DeckHistory {
  if (sameDeck(history.present, next)) return history;
  return {
    past: [...history.past, history.present].slice(-limit),
    present: next,
    future: [],
  };
}

/** Replace present without stacking (hydrate / load example). */
export function replaceDeck(history: DeckHistory, next: DeckJson): DeckHistory {
  return { past: [], present: next, future: [] };
}

export function undoDeck(history: DeckHistory): DeckHistory {
  if (history.past.length === 0) return history;
  const previous = history.past[history.past.length - 1]!;
  return {
    past: history.past.slice(0, -1),
    present: previous,
    future: [history.present, ...history.future],
  };
}

export function redoDeck(history: DeckHistory): DeckHistory {
  if (history.future.length === 0) return history;
  const next = history.future[0]!;
  return {
    past: [...history.past, history.present],
    present: next,
    future: history.future.slice(1),
  };
}

export function canUndo(history: DeckHistory): boolean {
  return history.past.length > 0;
}

export function canRedo(history: DeckHistory): boolean {
  return history.future.length > 0;
}
