import { useEffect, useMemo, useRef, useState } from "react";
import type { DeckJson } from "@presentation-md/export";
import {
  THEME_BROWSE_FILTERS,
  findThemeShortlist,
  listThemeShortlists,
  listThemeSummaries,
  resolveTheme,
  themePassesBrowseFilter,
  type ThemeBrowseFilterId,
} from "../render/themes.js";
import {
  COMPARE_LIMIT,
  PREVIEW_CROP_LABEL,
  PREVIEW_CROP_OFFSET_PX,
  PREVIEW_CROPS,
  themePreviewUrl,
  toggleCompareSlot,
  type PreviewCrop,
} from "../render/themePreview.js";
import { downloadHtml, downloadPptx, downloadJson, parseDeckFile, importPptxFile } from "../export/downloads.js";
import { STUDIO_EXAMPLES, studioExampleLink } from "../examples.js";
import { auditCraft } from "../craft/auditCraft.js";
import { ThemeCompareTray } from "./ThemeCompareTray.js";

/** Flagship trio for Example browser show-don't-tell (matches site proof strip). */
const FEATURED_EXAMPLE_SLUGS = ["novaspark-pitch", "bounce-launch", "forge-api"] as const;

export function Toolbar({
  deck,
  html,
  exampleSlug,
  onChange,
  onLoadExample,
  onPresent,
  onGenerate,
  onSelectSlide,
}: {
  deck: DeckJson;
  /** Live-rendered deck HTML from App — used for instant HTML download. */
  html?: string;
  exampleSlug: string | null;
  onChange: (next: DeckJson) => void;
  onLoadExample: (slug?: string) => void;
  onPresent: () => void;
  onGenerate: () => void;
  /** Jump the Studio selection to a 1-based slide index from an audit issue. */
  onSelectSlide?: (slideIndex1Based: number) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  /** Suppress auto-open until craft errors clear (user dismissed while dirty). */
  const suppressLivePanel = useRef(false);
  /** Panel was opened from craft (live/manual) — refresh on deck change. */
  const craftPanelOpen = useRef(false);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [themeQuery, setThemeQuery] = useState("");
  const [moodFilter, setMoodFilter] = useState<ThemeBrowseFilterId>("all");
  const [shortlistId, setShortlistId] = useState("");
  const [compare, setCompare] = useState<string[]>([]);
  const [liveCompare, setLiveCompare] = useState(false);
  const [exampleCrop, setExampleCrop] = useState<PreviewCrop>("title");
  const [auditIssues, setAuditIssues] = useState<
    Array<{ severity: "error" | "warning"; message: string; slide?: number }>
  >([]);
  const [auditFilter, setAuditFilter] = useState<"all" | "error" | "warning">("all");
  const [auditPanelOpen, setAuditPanelOpen] = useState(true);

  const themes = useMemo(() => listThemeSummaries(), []);
  const shortlists = useMemo(() => listThemeShortlists(), []);
  const featuredExamples = useMemo(
    () =>
      FEATURED_EXAMPLE_SLUGS.map((slug) => STUDIO_EXAMPLES.find((e) => e.slug === slug)).filter(
        (e): e is (typeof STUDIO_EXAMPLES)[number] => !!e
      ),
    []
  );
  const exampleThemeLooks = useMemo(() => {
    const map = new Map<string, { bg: string; accent: string; theme: string }>();
    for (const ex of STUDIO_EXAMPLES) {
      const themeName = ex.deck.meta?.theme ?? "default-tech";
      const summary = themes.find((t) => t.name === themeName);
      if (summary) {
        map.set(ex.slug, { bg: summary.bg, accent: summary.accent, theme: themeName });
      } else {
        const resolved = resolveTheme(themeName);
        map.set(ex.slug, {
          bg: resolved.palette.bg,
          accent: resolved.palette.accent,
          theme: themeName,
        });
      }
    }
    return map;
  }, [themes]);
  const liveCraftIssues = useMemo(() => auditCraft(deck), [deck]);
  const liveCraftErrors = liveCraftIssues.filter((i) => i.severity === "error").length;
  const liveCraftWarns = liveCraftIssues.length - liveCraftErrors;
  const theme = deck.meta?.theme ?? "default-tech";
  const active = themes.find((t) => t.name === theme) ?? {
    name: theme,
    vibe: theme,
    bg: resolveTheme(theme).palette.bg,
    accent: resolveTheme(theme).palette.accent,
  };
  const activeShortlist = shortlistId ? findThemeShortlist(shortlistId) : undefined;
  const filtered = themes.filter((t) => {
    if (!themePassesBrowseFilter(t, moodFilter)) return false;
    if (activeShortlist && !activeShortlist.themes.includes(t.name)) return false;
    if (!themeQuery.trim()) return true;
    const q = themeQuery.trim().toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.vibe.toLowerCase().includes(q) ||
      (t.mood ?? []).some((m) => m.toLowerCase().includes(q))
    );
  });

  // Auto-open on live craft issues (errors or warnings) unless the user dismissed while dirty.
  useEffect(() => {
    if (liveCraftIssues.length === 0) {
      suppressLivePanel.current = false;
      if (craftPanelOpen.current) {
        setAuditIssues([]);
        craftPanelOpen.current = false;
      }
      return;
    }
    if (suppressLivePanel.current) return;
    craftPanelOpen.current = true;
    setAuditIssues(liveCraftIssues);
    setAuditPanelOpen(true);
    if (liveCraftErrors > 0) {
      setAuditFilter((f) => (f === "warning" ? "all" : f));
    }
  }, [liveCraftIssues, liveCraftErrors]);

  const setMeta = (patch: Record<string, string>) =>
    onChange({ ...deck, meta: { ...deck.meta, ...patch } });
  const setTheme = (t: string) => setMeta({ theme: t });
  const setTitle = (t: string) => setMeta({ title: t });

  const onOpen = async (file: File) => {
    try {
      if (/\.pptx$/i.test(file.name)) {
        setBusy(true);
        setStatus("Importing .pptx…");
        const { deck: opened, warnings } = await importPptxFile(await file.arrayBuffer(), theme);
        onChange(opened);
        setStatus(
          warnings.length
            ? `Imported ${file.name} (${warnings.length} warning${warnings.length > 1 ? "s" : ""})`
            : `Imported ${file.name}`
        );
        return;
      }
      const opened = parseDeckFile(file.name, await file.text());
      onChange(opened);
      setStatus(`Opened ${file.name}`);
    } catch (err) {
      setStatus(`Open failed: ${(err as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  const exportPptx = async () => {
    setBusy(true);
    setStatus("Building .pptx…");
    try {
      const { warnings } = await downloadPptx(deck);
      const exportIssues = warnings.map((message) => ({
        severity: "warning" as const,
        message: `PPTX: ${message}`,
      }));
      const merged = [...exportIssues, ...liveCraftIssues];
      if (merged.length) {
        // Keep craft ownership so deck edits still refresh the panel; export warns lead.
        craftPanelOpen.current = true;
        setAuditIssues(merged);
        setAuditPanelOpen(true);
        setStatus(
          warnings.length
            ? `Exported .pptx (${warnings.length} warning${warnings.length > 1 ? "s" : ""}) — see list`
            : `Exported .pptx (${liveCraftIssues.length} craft issue${liveCraftIssues.length > 1 ? "s" : ""})`
        );
      } else {
        setStatus("Exported .pptx");
      }
    } catch (err) {
      setStatus(`Export failed: ${(err as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  const runCraftAudit = () => {
    const issues = auditCraft(deck);
    suppressLivePanel.current = false;
    craftPanelOpen.current = true;
    setAuditIssues(issues);
    setAuditFilter("all");
    setAuditPanelOpen(true);
    const errors = issues.filter((i) => i.severity === "error");
    const warns = issues.filter((i) => i.severity === "warning");
    if (!issues.length) {
      craftPanelOpen.current = false;
      setStatus("Craft audit clean");
      return;
    }
    setStatus(
      `Craft audit: ${errors.length} error${errors.length === 1 ? "" : "s"}, ${warns.length} warning${warns.length === 1 ? "" : "s"}`
    );
  };

  const dismissAuditPanel = () => {
    setAuditIssues([]);
    craftPanelOpen.current = false;
    if (liveCraftIssues.length > 0) suppressLivePanel.current = true;
  };

  const copyLink = async () => {
    const slug = exampleSlug ?? "acme";
    const path = studioExampleLink(slug);
    const absolute =
      typeof window !== "undefined"
        ? `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`
        : path;
    try {
      await navigator.clipboard.writeText(absolute);
      setStatus("Copied Studio link");
    } catch {
      setStatus(absolute);
    }
  };

  return (
    <header className="toolbar">
      <div className="brand">
        <a className="brand-link" href="https://presentation-md.vercel.app/" target="_blank" rel="noopener noreferrer">
          <strong>presentation-md</strong>
        </a>
        <span className="muted small">Studio · live craft</span>
      </div>

      <input
        className="text-input title-input"
        value={deck.meta?.title ?? ""}
        placeholder="Deck title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <details className="theme-browser" onToggle={(e) => {
        if (!(e.target as HTMLDetailsElement).open) {
          setThemeQuery("");
          setMoodFilter("all");
          setShortlistId("");
          setCompare([]);
          setLiveCompare(false);
        }
      }}>
        <summary className="btn btn-sm theme-trigger" title="Browse themes (mood + shortlists + pick-3 compare)">
          <span
            className="theme-swatch"
            style={{ ["--swatch-bg" as string]: active.bg, ["--swatch-accent" as string]: active.accent }}
            aria-hidden
          />
          <span>{theme}</span>
          <span aria-hidden>▾</span>
        </summary>
        <div className={`theme-browser-panel${compare.length ? " has-compare" : ""}`}>
          <input
            className="text-input theme-search"
            value={themeQuery}
            placeholder="Search themes…"
            autoFocus
            onChange={(e) => setThemeQuery(e.target.value)}
          />
          <div className="theme-mood-row" role="toolbar" aria-label="Filter themes by mood">
            <span className="theme-filter-label">Browse</span>
            {THEME_BROWSE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`chip${moodFilter === f.id ? " active" : ""}`}
                aria-pressed={moodFilter === f.id}
                onClick={() => setMoodFilter(f.id)}
                title={
                  f.id === "all"
                    ? "Show all themes"
                    : f.id === "popular"
                      ? "Flagship / discovery-popular themes"
                      : `Filter by ${f.label.toLowerCase()} mood`
                }
              >
                {f.id === "all" ? `All ${themes.length}` : f.label}
              </button>
            ))}
          </div>
          <div className="theme-shortlist-row" role="listbox" aria-label="Theme shortlists">
            <button
              type="button"
              className={`chip${shortlistId === "" ? " active" : ""}`}
              onClick={() => setShortlistId("")}
              title="Show all themes"
            >
              Shortlists
            </button>
            {shortlists.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`chip${shortlistId === s.id ? " active" : ""}${s.popular ? " chip-popular" : ""}`}
                onClick={() => {
                  const next = s.id === shortlistId ? "" : s.id;
                  setShortlistId(next);
                  if (next) {
                    const pick = findThemeShortlist(next);
                    if (pick?.themes?.length) {
                      const slots = pick.themes.slice(0, COMPARE_LIMIT);
                      setCompare(slots);
                      // Auto-live once pick-3 is full — show-don't-tell vs swatch-only.
                      setLiveCompare(slots.length >= COMPARE_LIMIT);
                    }
                  } else {
                    setCompare([]);
                    setLiveCompare(false);
                  }
                }}
                title={s.why ?? s.label}
              >
                {s.popular ? "★ " : ""}
                {s.label.split(/[/(]/)[0]!.trim()}
              </button>
            ))}
          </div>
          <div className="theme-count">
            {filtered.length} / {themes.length} themes
            {moodFilter !== "all" ? ` · ${moodFilter}` : ""}
            {activeShortlist ? ` · ${activeShortlist.id}` : ""}
            {compare.length ? ` · compare ${compare.length}/${COMPARE_LIMIT}` : " · ⊕ to compare"}
          </div>
          <ul className="theme-list">
            {filtered.map((t) => {
              const inCompare = compare.includes(t.name);
              return (
                <li key={t.name}>
                  <div className={`theme-option-row${t.name === theme ? " active" : ""}${inCompare ? " in-compare" : ""}`}>
                    <button
                      type="button"
                      className={`theme-option${t.name === theme ? " active" : ""}`}
                      onClick={(e) => {
                        setTheme(t.name);
                        const details = (e.currentTarget as HTMLElement).closest("details");
                        if (details) details.open = false;
                      }}
                    >
                      <span
                        className="theme-swatch"
                        style={{ ["--swatch-bg" as string]: t.bg, ["--swatch-accent" as string]: t.accent }}
                        aria-hidden
                      />
                      <span className="theme-option-meta">
                        <span className="theme-option-name">{t.name}</span>
                        <span className="theme-option-vibe">{t.vibe}</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      className={`theme-compare-toggle${inCompare ? " active" : ""}`}
                      title={
                        inCompare
                          ? `Remove ${t.name} from compare`
                          : `Add ${t.name} to pick-${COMPARE_LIMIT} compare`
                      }
                      aria-pressed={inCompare}
                      onClick={() =>
                        setCompare((prev) => {
                          const next = toggleCompareSlot(prev, t.name);
                          // Flip live on when the tray hits pick-3; leave user toggle otherwise.
                          if (next.length >= COMPARE_LIMIT) setLiveCompare(true);
                          else if (next.length === 0) setLiveCompare(false);
                          return next;
                        })
                      }
                    >
                      {inCompare ? "✓" : "⊕"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <ThemeCompareTray
            compare={compare}
            themes={themes}
            livePreview={liveCompare}
            activeTheme={theme}
            onLivePreview={setLiveCompare}
            onRemove={(name) => setCompare((prev) => prev.filter((n) => n !== name))}
            onClear={() => {
              setCompare([]);
              setLiveCompare(false);
            }}
            onUse={(name) => {
              setTheme(name);
              setCompare([]);
              setLiveCompare(false);
              const details = document.querySelector("details.theme-browser") as HTMLDetailsElement | null;
              if (details) details.open = false;
            }}
          />
        </div>
      </details>

      <details className="deck-details">
        <summary className="btn btn-sm">Details</summary>
        <div className="deck-details-body">
          <input
            className="text-input"
            value={deck.meta?.company ?? ""}
            placeholder="Company"
            onChange={(e) => setMeta({ company: e.target.value })}
          />
          <input
            className="text-input"
            value={deck.meta?.description ?? ""}
            placeholder="Description"
            onChange={(e) => setMeta({ description: e.target.value })}
          />
        </div>
      </details>

      <div className="spacer" />

      <button className="btn btn-generate" onClick={onGenerate} title="Generate a deck from a prompt">Generate</button>
      <details className="example-browser">
        <summary className="btn" title="Load a curated example deck">Example ▾</summary>
        <div className="example-browser-panel">
          <div
            className="example-featured-crop-bar"
            role="toolbar"
            aria-label="Featured example layout crop"
          >
            <span className="example-featured-crop-label">Judge</span>
            {PREVIEW_CROPS.map((c) => (
              <button
                key={c}
                type="button"
                className={`chip${exampleCrop === c ? " active" : ""}`}
                aria-pressed={exampleCrop === c}
                onClick={() => setExampleCrop(c)}
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
          <div className="example-featured" aria-label="Featured craft examples">
            {featuredExamples.map((ex) => {
              const look = exampleThemeLooks.get(ex.slug);
              const previewTheme = look?.theme ?? ex.deck.meta?.theme ?? "default-tech";
              return (
                <button
                  key={ex.slug}
                  type="button"
                  className={`example-featured-card${exampleSlug === ex.slug ? " active" : ""}`}
                  title={ex.label}
                  onClick={(e) => {
                    onLoadExample(ex.slug);
                    const details = (e.currentTarget as HTMLElement).closest("details");
                    if (details) details.open = false;
                  }}
                >
                  <span
                    className="example-featured-frame"
                    data-crop={exampleCrop}
                    style={{ ["--crop-y" as string]: `${PREVIEW_CROP_OFFSET_PX[exampleCrop]}px` }}
                    aria-hidden
                  >
                    <iframe
                      src={themePreviewUrl(previewTheme)}
                      title={`${ex.label} craft preview (${PREVIEW_CROP_LABEL[exampleCrop]})`}
                      loading="lazy"
                      tabIndex={-1}
                    />
                  </span>
                  <span className="example-featured-name">{ex.label.split("(")[0]!.trim()}</span>
                </button>
              );
            })}
          </div>
          <p className="example-list-label">All examples</p>
          <ul className="example-list">
            {STUDIO_EXAMPLES.map((ex) => {
              const look = exampleThemeLooks.get(ex.slug);
              return (
                <li key={ex.slug}>
                  <button
                    type="button"
                    className={exampleSlug === ex.slug ? "active" : undefined}
                    onClick={(e) => {
                      onLoadExample(ex.slug);
                      const details = (e.currentTarget as HTMLElement).closest("details");
                      if (details) details.open = false;
                    }}
                  >
                    {look ? (
                      <span
                        className="example-list-swatch"
                        style={{
                          ["--swatch-bg" as string]: look.bg,
                          ["--swatch-accent" as string]: look.accent,
                        }}
                        aria-hidden
                      />
                    ) : null}
                    {ex.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </details>
      <div className="toolbar-secondary" role="group" aria-label="Deck actions">
        <button className="btn toolbar-desktop-only" onClick={() => void copyLink()} title="Copy a shareable Studio deep-link">
          Copy link
        </button>
        <button className="btn toolbar-desktop-only" onClick={() => fileRef.current?.click()} title="Open a deck .html, .json, or .pptx">Open</button>
        <button className="btn toolbar-desktop-only" onClick={onPresent} title="Present fullscreen">Present</button>
        <details className="toolbar-more toolbar-mobile-only">
          <summary className="btn btn-sm" title="More deck actions">More ▾</summary>
          <div className="toolbar-more-panel">
            <button type="button" className="btn" onClick={() => void copyLink()}>Copy link</button>
            <button type="button" className="btn" onClick={() => fileRef.current?.click()}>Open file</button>
            <button type="button" className="btn" onClick={onPresent}>Present</button>
          </div>
        </details>
      </div>
      <button
        className={`btn btn-audit${liveCraftIssues.length ? " audit-live-dirty" : ""}`}
        onClick={runCraftAudit}
        title="Run craft gates. Panel auto-opens on live errors and refreshes as you edit."
      >
        Audit craft
        {liveCraftIssues.length > 0 && (
          <span className={`audit-live-badge${liveCraftErrors ? " has-errors" : ""}`}>
            {liveCraftErrors > 0 ? `${liveCraftErrors}E` : ""}
            {liveCraftErrors > 0 && liveCraftWarns > 0 ? "·" : ""}
            {liveCraftWarns > 0 ? `${liveCraftWarns}W` : liveCraftErrors > 0 ? "" : liveCraftIssues.length}
          </span>
        )}
      </button>
      <div className="toolbar-cluster" role="group" aria-label="Export">
        <details className="export-more">
          <summary className="btn btn-sm" title="Download Deck JSON or self-contained HTML">Source ▾</summary>
          <div className="export-more-panel">
            <button type="button" className="btn" onClick={() => downloadJson(deck)}>Download JSON</button>
            <button type="button" className="btn" onClick={() => downloadHtml(deck, html)}>Download HTML</button>
          </div>
        </details>
        <button className="btn btn-primary" disabled={busy} onClick={exportPptx}>
          {busy ? "…" : "Download .pptx"}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".html,.htm,.json,.pptx,application/json,text/html,application/vnd.openxmlformats-officedocument.presentationml.presentation"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void onOpen(f);
          e.target.value = "";
        }}
      />

      {status && <span className="status muted small">{status}</span>}
      {auditIssues.length > 0 && (
        <details
          className="audit-panel"
          open={auditPanelOpen}
          onToggle={(e) => setAuditPanelOpen((e.target as HTMLDetailsElement).open)}
        >
          <summary className="btn btn-sm">
            Issues ({auditIssues.length}
            {auditIssues.some((i) => i.severity === "error")
              ? ` · ${auditIssues.filter((i) => i.severity === "error").length} err`
              : ""}
            )
          </summary>
          <div className="audit-filters">
            {(["all", "error", "warning"] as const).map((f) => {
              const count =
                f === "all" ? auditIssues.length : auditIssues.filter((i) => i.severity === f).length;
              return (
                <button
                  key={f}
                  type="button"
                  className={`btn btn-sm${auditFilter === f ? " audit-filter-active" : ""}`}
                  onClick={() => setAuditFilter(f)}
                >
                  {f} ({count})
                </button>
              );
            })}
          </div>
          <ul className="audit-list">
            {auditIssues
              .filter((issue) => auditFilter === "all" || issue.severity === auditFilter)
              .map((issue, i) => {
                const jumpable = typeof issue.slide === "number" && onSelectSlide;
                return (
                  <li key={`${issue.severity}-${issue.slide ?? "g"}-${i}`} className={`audit-item audit-${issue.severity}`}>
                    <span className="audit-sev">
                      {issue.severity}
                      {typeof issue.slide === "number" ? ` · s${issue.slide}` : ""}
                    </span>
                    {jumpable ? (
                      <button
                        type="button"
                        className="audit-jump"
                        title={`Jump to slide ${issue.slide}`}
                        onClick={() => onSelectSlide(issue.slide!)}
                      >
                        {issue.message}
                      </button>
                    ) : (
                      <span>{issue.message}</span>
                    )}
                  </li>
                );
              })}
          </ul>
          <button type="button" className="btn btn-sm" onClick={dismissAuditPanel}>
            Dismiss
          </button>
        </details>
      )}
    </header>
  );
}
