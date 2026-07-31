import { useMemo, useState } from "react";
import type { DeckJson } from "@presentation-md/export";
import {
  findThemeShortlist,
  listThemeNames,
  listThemeShortlists,
} from "../render/themes.js";
import { GEN_MODELS, type GenModelId, buildAgentPrompt, generateDeck } from "../ai/generate.js";

const KEY_STORAGE = "pmd-studio-anthropic-key";

const EXAMPLE_BRIEFS = [
  "Q3 all-hands: momentum, key metrics, roadmap, and what's next.",
  "Seed pitch for an AI-native analytics tool — problem, product, traction, ask.",
  "Launch deck for a developer CLI: what it is, how it works, why it's fast.",
];

export function GenerateModal({
  currentTheme,
  onGenerate,
  onClose,
}: {
  currentTheme: string;
  onGenerate: (deck: DeckJson) => void;
  onClose: () => void;
}) {
  const [brief, setBrief] = useState("");
  const [theme, setTheme] = useState(currentTheme);
  const [shortlistId, setShortlistId] = useState("");
  const [model, setModel] = useState<GenModelId>(GEN_MODELS[0].id);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(KEY_STORAGE) ?? "");
  const [remember, setRemember] = useState(() => !!localStorage.getItem(KEY_STORAGE));
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);

  const themeNames = listThemeNames();
  const shortlists = useMemo(() => listThemeShortlists(), []);
  const activeShortlist = shortlistId ? findThemeShortlist(shortlistId) : undefined;
  const selectableThemes = activeShortlist
    ? themeNames.filter((t) => activeShortlist.themes.includes(t))
    : themeNames;

  const runGenerate = async () => {
    setBusy(true);
    setStatus("Generating your deck…");
    try {
      if (remember) localStorage.setItem(KEY_STORAGE, apiKey.trim());
      else localStorage.removeItem(KEY_STORAGE);
      const deck = await generateDeck({ apiKey, model, brief, theme });
      onGenerate(deck);
      onClose();
    } catch (err) {
      setStatus((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const copyAgentPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildAgentPrompt(brief, theme));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setStatus("Couldn't copy — select the prompt manually.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <div>
            <strong>Generate a deck</strong>
            <span className="muted small">Describe it — get an editable deck in seconds.</span>
          </div>
          <button className="btn btn-sm" onClick={onClose} aria-label="Close">✕</button>
        </header>

        <div className="modal-body">
          <label className="field-label">What's the deck about?</label>
          <textarea
            className="text-input brief-input"
            value={brief}
            placeholder="e.g. Q3 all-hands covering revenue, product wins, and the roadmap for next quarter."
            rows={4}
            onChange={(e) => setBrief(e.target.value)}
          />
          <div className="chip-row">
            {EXAMPLE_BRIEFS.map((ex) => (
              <button key={ex} className="chip" onClick={() => setBrief(ex)} title="Use this brief">
                {ex.split(/[:—]/)[0]!.trim()}
              </button>
            ))}
          </div>

          <label className="field-label">Theme shortlist</label>
          <div className="theme-shortlist-row" role="listbox" aria-label="Theme shortlists">
            <button
              type="button"
              className={`chip${shortlistId === "" ? " active" : ""}`}
              onClick={() => setShortlistId("")}
            >
              All themes
            </button>
            {shortlists.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`chip${shortlistId === s.id ? " active" : ""}`}
                title={s.why ?? s.label}
                onClick={() => {
                  const next = s.id === shortlistId ? "" : s.id;
                  setShortlistId(next);
                  if (next) {
                    const pick = findThemeShortlist(next);
                    if (pick && !pick.themes.includes(theme) && pick.themes[0]) {
                      setTheme(pick.themes[0]);
                    }
                  }
                }}
              >
                {s.label.split(/[/(]/)[0]!.trim()}
              </button>
            ))}
          </div>

          <div className="field-grid">
            <label className="inline-field">
              <span className="muted small">Theme</span>
              <select className="text-input" value={theme} onChange={(e) => setTheme(e.target.value)}>
                {selectableThemes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            <label className="inline-field">
              <span className="muted small">Model</span>
              <select className="text-input" value={model} onChange={(e) => setModel(e.target.value as GenModelId)}>
                {GEN_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="gen-panel">
            <label className="field-label">Your Anthropic API key</label>
            <input
              className="text-input"
              type="password"
              value={apiKey}
              placeholder="sk-ant-…"
              autoComplete="off"
              onChange={(e) => setApiKey(e.target.value)}
            />
            <label className="checkbox-field">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span className="muted small">Remember on this device (stored only in your browser)</span>
            </label>
            <p className="muted small privacy-note">
              Your key stays in this browser. Requests go straight to Anthropic — nothing is sent to our servers.
              Get a key at <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noreferrer">console.anthropic.com</a>.
            </p>
            <button className="btn btn-primary btn-block" disabled={busy} onClick={runGenerate}>
              {busy ? "Generating…" : "Generate deck"}
            </button>
          </div>

          <div className="gen-divider"><span>or hand it to your agent</span></div>

          <div className="gen-panel">
            <p className="muted small">
              No key? Copy a ready-made prompt and paste it into Claude Code, Cursor, or any agent with the
              presentation skill installed — then open the resulting deck here.
            </p>
            <button className="btn btn-block" onClick={copyAgentPrompt} disabled={!brief.trim()}>
              {copied ? "Copied ✓" : "Copy prompt for your agent"}
            </button>
          </div>

          {status && <p className="status muted small gen-status">{status}</p>}
        </div>
      </div>
    </div>
  );
}
