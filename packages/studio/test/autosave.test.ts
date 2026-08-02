import { afterEach, describe, expect, it, vi } from "vitest";
import { createAutosaveScheduler } from "../src/autosave.js";

afterEach(() => {
  vi.useRealTimers();
});

describe("createAutosaveScheduler", () => {
  it("coalesces rapid schedules into one delayed save", () => {
    vi.useFakeTimers();
    const save = vi.fn();
    const scheduler = createAutosaveScheduler({ delayMs: 300, save });

    scheduler.schedule();
    vi.advanceTimersByTime(100);
    scheduler.schedule();
    vi.advanceTimersByTime(100);
    scheduler.schedule();

    expect(save).not.toHaveBeenCalled();
    expect(scheduler.hasPending()).toBe(true);
    vi.advanceTimersByTime(299);
    expect(save).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(save).toHaveBeenCalledTimes(1);
    expect(scheduler.hasPending()).toBe(false);
  });

  it("flushes pending work immediately and clears its timer", () => {
    vi.useFakeTimers();
    const save = vi.fn();
    const scheduler = createAutosaveScheduler({ delayMs: 300, save });

    scheduler.schedule();
    expect(scheduler.flush()).toBe(true);
    expect(save).toHaveBeenCalledTimes(1);
    vi.runAllTimers();
    expect(save).toHaveBeenCalledTimes(1);
    expect(scheduler.flush()).toBe(false);
  });

  it("reports a failed save and retries on the next schedule", () => {
    vi.useFakeTimers();
    const failure = new Error("quota");
    const save = vi.fn()
      .mockImplementationOnce(() => {
        throw failure;
      })
      .mockImplementationOnce(() => undefined);
    const onError = vi.fn();
    const onSuccess = vi.fn();
    const scheduler = createAutosaveScheduler({
      delayMs: 300,
      save,
      onError,
      onSuccess,
    });

    scheduler.schedule();
    vi.advanceTimersByTime(300);
    expect(onError).toHaveBeenCalledWith(failure);
    expect(onSuccess).not.toHaveBeenCalled();

    scheduler.schedule();
    vi.advanceTimersByTime(300);
    expect(save).toHaveBeenCalledTimes(2);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it("cancels pending work without preventing future schedules", () => {
    vi.useFakeTimers();
    const save = vi.fn();
    const scheduler = createAutosaveScheduler({ delayMs: 300, save });

    scheduler.schedule();
    scheduler.cancel();
    vi.runAllTimers();
    expect(save).not.toHaveBeenCalled();
    expect(scheduler.hasPending()).toBe(false);

    scheduler.schedule();
    vi.advanceTimersByTime(300);
    expect(save).toHaveBeenCalledTimes(1);
  });
});
