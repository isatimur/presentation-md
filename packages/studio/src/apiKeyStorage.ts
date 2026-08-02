export const API_KEY_STORAGE_KEY = "pmd-studio-anthropic-key";
export const API_KEY_STORAGE_WARNING =
  "Browser storage unavailable — API key will only stay in this modal";

export interface ApiKeyStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

export interface RememberedApiKey {
  key: string;
  remembered: boolean;
  warning: string | null;
}

function browserStorage(): ApiKeyStorage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** Read optional key persistence without letting browser policy crash React render. */
export function readRememberedApiKey(
  storage: ApiKeyStorage | null = browserStorage()
): RememberedApiKey {
  if (!storage) return { key: "", remembered: false, warning: API_KEY_STORAGE_WARNING };
  try {
    const key = storage.getItem(API_KEY_STORAGE_KEY) ?? "";
    return { key, remembered: key.length > 0, warning: null };
  } catch {
    return { key: "", remembered: false, warning: API_KEY_STORAGE_WARNING };
  }
}

/** Persisting the optional key never controls whether generation may proceed. */
export function persistApiKeyPreference({
  remember,
  key,
  storage = browserStorage(),
}: {
  remember: boolean;
  key: string;
  storage?: ApiKeyStorage | null;
}): string | null {
  if (!storage) return API_KEY_STORAGE_WARNING;
  try {
    const trimmed = key.trim();
    if (remember && trimmed) storage.setItem(API_KEY_STORAGE_KEY, trimmed);
    else storage.removeItem(API_KEY_STORAGE_KEY);
    return null;
  } catch {
    return API_KEY_STORAGE_WARNING;
  }
}
