export interface AutosaveScheduler {
  /** Queue a save, replacing any existing delay. */
  schedule: () => void;
  /** Run queued work synchronously. Returns false when nothing was pending. */
  flush: () => boolean;
  /** Drop queued work. A later schedule remains valid. */
  cancel: () => void;
  hasPending: () => boolean;
}

export interface AutosaveSchedulerOptions {
  delayMs: number;
  save: () => void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

/**
 * Coalesces synchronous browser-storage writes while keeping an explicit flush
 * for page lifecycle events. The save callback reads the latest state only
 * when work actually runs, so scheduling itself never serializes a deck.
 */
export function createAutosaveScheduler({
  delayMs,
  save,
  onSuccess,
  onError,
}: AutosaveSchedulerOptions): AutosaveScheduler {
  let timer: ReturnType<typeof globalThis.setTimeout> | null = null;
  let pending = false;

  const clearTimer = () => {
    if (timer === null) return;
    globalThis.clearTimeout(timer);
    timer = null;
  };

  const flush = (): boolean => {
    if (!pending) return false;
    clearTimer();
    pending = false;
    try {
      save();
      onSuccess?.();
    } catch (error) {
      onError?.(error);
    }
    return true;
  };

  const schedule = () => {
    pending = true;
    clearTimer();
    timer = globalThis.setTimeout(flush, delayMs);
  };

  const cancel = () => {
    clearTimer();
    pending = false;
  };

  return {
    schedule,
    flush,
    cancel,
    hasPending: () => pending,
  };
}
