import type { DeckJson } from "@presentation-md/export";

const DEFAULT_LIMIT = 60;

export type DeckHistory = {
  past: DeckJson[];
  present: DeckJson;
  future: DeckJson[];
};

function sameDeck(a: DeckJson, b: DeckJson): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
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
