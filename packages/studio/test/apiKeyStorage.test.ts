import { describe, expect, it, vi } from "vitest";
import {
  API_KEY_STORAGE_WARNING,
  persistApiKeyPreference,
  readRememberedApiKey,
} from "../src/apiKeyStorage.js";

describe("API key storage", () => {
  it("reads one remembered key without exposing storage failures", () => {
    const stored = readRememberedApiKey({
      getItem: vi.fn(() => "sk-ant-saved"),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
    expect(stored).toEqual({ key: "sk-ant-saved", remembered: true, warning: null });

    const blocked = readRememberedApiKey({
      getItem: vi.fn(() => {
        throw new DOMException("blocked", "SecurityError");
      }),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
    expect(blocked).toEqual({ key: "", remembered: false, warning: API_KEY_STORAGE_WARNING });
  });

  it("stores or removes the optional key and reports failures as warnings", () => {
    const storage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    };
    expect(
      persistApiKeyPreference({ storage, remember: true, key: "  sk-ant-live  " })
    ).toBeNull();
    expect(storage.setItem).toHaveBeenCalledWith("pmd-studio-anthropic-key", "sk-ant-live");

    expect(persistApiKeyPreference({ storage, remember: false, key: "ignored" })).toBeNull();
    expect(storage.removeItem).toHaveBeenCalledWith("pmd-studio-anthropic-key");

    storage.setItem.mockImplementationOnce(() => {
      throw new DOMException("blocked", "QuotaExceededError");
    });
    expect(persistApiKeyPreference({ storage, remember: true, key: "sk-ant-fail" })).toBe(
      API_KEY_STORAGE_WARNING
    );
  });
});
