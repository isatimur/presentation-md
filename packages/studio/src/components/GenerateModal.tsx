import { useMemo, useState } from "react";
import type { DeckJson } from "@presentation-md/export";
import {
  THEME_BROWSE_FILTERS,
  findThemeShortlist,
  listThemeNames,
  listThemeShortlists,
  listThemeSummaries,
  resolveTheme,
  themePassesBrowseFilter,
  type ThemeBrowseFilterId,
} from "../render/themes.js";
import {
  PREVIEW_CROP_LABEL,
  PREVIEW_CROP_OFFSET_PX,
  PREVIEW_CROPS,
  themePreviewUrl,
  type PreviewCrop,
} from "../render/themePreview.js";
import { GEN_MODELS, type GenModelId, type DensityMode, buildAgentPrompt, generateDeck } from "../ai/generate.js";

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
  const [moodFilter, setMoodFilter] = useState<ThemeBrowseFilterId>("all");
  const [shortlistId, setShortlistId] = useState("");
  const [density, setDensity] = useState<DensityMode>("speaker");
  const [model, setModel] = useState<GenModelId>(GEN_MODELS[0].id);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(KEY_STORAGE) ?? "");
  const [remember, setRemember] = useState(() => !!localStorage.getItem(KEY_STORAGE));
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  /** Show-don't-tell: live Title/Bento/Compare crops on by default. */
  const [liveDiscover, setLiveDiscover] = useState(true);
  const [crop, setCrop] = useState<PreviewCrop>("title");

  const themeNames = listThemeNames();
  const themes = useMemo(() => listThemeSummaries(), []);
  const shortlists = useMemo(() => listThemeShortlists(), []);
  const activeShortlist = shortlistId ? findThemeShortlist(shortlistId) : undefined;
  const selectableThemes = useMemo(() => {
    const base = activeShortlist
      ? themeNames.filter((t) => activeShortlist.themes.includes(t))
      : themeNames;
    return base.filter((name) => {
      const summary = themes.find((t) => t.name === name);
      if (!summary) return moodFilter === "all";
      return themePassesBrowseFilter(summary, moodFilter);
    });
  }, [activeShortlist, moodFilter, themeNames, themes]);

  /** Pick-3 visual compare from the active shortlist (or popular / mood-filtered defaults). */
  const discoverThree = useMemo(() => {
    const pool =
      activeShortlist?.themes ??
      (moodFilter === "all"
        ? ["default-tech", "aurora-glass", "soft-editorial"]
        : selectableThemes);
    const names = pool.filter((n) => themeNames.includes(n)).slice(0, 3);
    while (names.length < 3) {
      const fallback = themeNames.find((n) => !names.includes(n));
      if (!fallback) break;
      names.push(fallback);
    }
    return names.map((name) => {
      const summary = themes.find((t) => t.name === name);
      if (summary) return summary;
      const resolved = resolveTheme(name);
      return {
        name,
        vibe: resolved.manifest.description ?? name,
        bg: resolved.palette.bg,
        accent: resolved.palette.accent,
      };
    });
  }, [activeShortlist, moodFilter, selectableThemes, themeNames, themes]);

  const cropOffset = PREVIEW_CROP_OFFSET_PX[crop];

  const runGenerate = async () => {
    setBusy(true);
    setStatus("Generating your deck…");
    try {
      if (remember) localStorage.setItem(KEY_STORAGE, apiKey.trim());
      else localStorage.removeItem(KEY_STORAGE);
      const deck = await generateDeck({ apiKey, model, brief, theme, density });
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
      await navigator.clipboard.writeText(buildAgentPrompt(brief, theme, density));
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

          <label className="field-label">Density</label>
          <div className="theme-shortlist-row" role="listbox" aria-label="Deck density">
            <button
              type="button"
              className={`chip${density === "speaker" ? " active" : ""}`}
              onClick={() => setDensity("speaker")}
              title="One idea per slide, large type, live talks"
            >
              Speaker-led
            </button>
            <button
              type="button"
              className={`chip${density === "reading" ? " active" : ""}`}
              onClick={() => setDensity("reading")}
              title="Self-contained slides for async / board packs"
            >
              Reading-first
            </button>
          </div>

          <label className="field-label">Browse by mood</label>
          <div className="theme-mood-row" role="toolbar" aria-label="Filter themes by mood">
            {THEME_BROWSE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`chip${moodFilter === f.id ? " active" : ""}`}
                aria-pressed={moodFilter === f.id}
                onClick={() => setMoodFilter(f.id)}
                title={f.id === "all" ? "Show all themes" : `Filter by ${f.label.toLowerCase()}`}
              >
                {f.id === "all" ? `All ${themes.length}` : f.label}
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
                className={`chip${shortlistId === s.id ? " active" : ""}${s.popular ? " chip-popular" : ""}`}
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
                {s.popular ? "★ " : ""}
                {s.label.split(/[/(]/)[0]!.trim()}
              </button>
            ))}
          </div>

          <div className="gen-discover-head">
            <label className="field-label">Pick visually (show, don’t tell)</label>
            <button
              type="button"
              className={`chip${liveDiscover ? " active" : ""}`}
              onClick={() => setLiveDiscover((v) => !v)}
              title="Load live multi-layout craft previews (title / bento / comparison crops)"
            >
              {liveDiscover ? "Hide live" : "Show live"}
            </button>
          </div>
          {liveDiscover ? (
            <div
              className="gen-discover-crop-bar"
              role="toolbar"
              aria-label="Preview layout crop"
            >
              <span className="gen-discover-crop-label">Judge</span>
              {PREVIEW_CROPS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip${crop === c ? " active" : ""}`}
                  aria-pressed={crop === c}
                  onClick={() => setCrop(c)}
                  title={
                    c === "title"
                      ? "Crop to title slide"
                      : c === "bento"
                        ? "Crop to feature-grid / bento body craft"
                        : "Crop to comparison slide"
                  }
                >
                  {PREVIEW_CROP_LABEL[c]}
                </button>
              ))}
            </div>
          ) : null}
          <div className="gen-discover-grid" role="listbox" aria-label="Pick 3 theme compare">
            {discoverThree.map((t) => (
              <button
                key={t.name}
                type="button"
                role="option"
                aria-selected={t.name === theme}
                className={`gen-discover-card${t.name === theme ? " active" : ""}`}
                onClick={() => setTheme(t.name)}
                title={t.vibe}
              >
                {liveDiscover ? (
                  <span
                    className="gen-discover-frame"
                    data-crop={crop}
                    style={{ ["--crop-y" as string]: `${cropOffset}px` }}
                    aria-hidden
                  >
                    <iframe
                      src={themePreviewUrl(t.name)}
                      title={`${t.name} craft preview (${PREVIEW_CROP_LABEL[crop]})`}
                      loading="lazy"
                      tabIndex={-1}
                    />
                  </span>
                ) : (
                  <span
                    className="gen-discover-swatch"
                    style={{
                      ["--swatch-bg" as string]: t.bg,
                      ["--swatch-accent" as string]: t.accent,
                    }}
                    aria-hidden
                  />
                )}
                <span className="gen-discover-name">{t.name}</span>
                <span className="gen-discover-vibe muted small">{t.vibe}</span>
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
