import { useEffect, useMemo, useRef, useState } from "react";
import type { DeckJson } from "@presentation-md/export";
import { listThemeSummaries, resolveTheme } from "../render/themes.js";
import { downloadHtml, downloadPptx, downloadJson, parseDeckFile, importPptxFile } from "../export/downloads.js";
import { STUDIO_EXAMPLES, studioExampleLink } from "../examples.js";
import { auditCraft } from "../craft/auditCraft.js";

export function Toolbar({
  deck,
  exampleSlug,
  onChange,
  onLoadExample,
  onPresent,
  onGenerate,
  onSelectSlide,
}: {
  deck: DeckJson;
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
  const [auditIssues, setAuditIssues] = useState<
    Array<{ severity: "error" | "warning"; message: string; slide?: number }>
  >([]);
  const [auditFilter, setAuditFilter] = useState<"all" | "error" | "warning">("all");
  const [auditPanelOpen, setAuditPanelOpen] = useState(true);

  const themes = useMemo(() => listThemeSummaries(), []);
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
  const filtered = themes.filter((t) => {
    if (!themeQuery.trim()) return true;
    const q = themeQuery.trim().toLowerCase();
    return t.name.toLowerCase().includes(q) || t.vibe.toLowerCase().includes(q);
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
        if (!(e.target as HTMLDetailsElement).open) setThemeQuery("");
      }}>
        <summary className="btn btn-sm theme-trigger" title="Browse 75 themes">
          <span
            className="theme-swatch"
            style={{ ["--swatch-bg" as string]: active.bg, ["--swatch-accent" as string]: active.accent }}
            aria-hidden
          />
          <span>{theme}</span>
          <span aria-hidden>▾</span>
        </summary>
        <div className="theme-browser-panel">
          <input
            className="text-input theme-search"
            value={themeQuery}
            placeholder="Search themes…"
            autoFocus
            onChange={(e) => setThemeQuery(e.target.value)}
          />
          <div className="theme-count">{filtered.length} / {themes.length} themes</div>
          <ul className="theme-list">
            {filtered.map((t) => (
              <li key={t.name}>
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
              </li>
            ))}
          </ul>
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
          <ul className="example-list">
            {STUDIO_EXAMPLES.map((ex) => (
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
                  {ex.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </details>
      <button className="btn" onClick={() => void copyLink()} title="Copy a shareable Studio deep-link">
        Copy link
      </button>
      <button className="btn" onClick={() => fileRef.current?.click()} title="Open a deck .html, .json, or .pptx">Open</button>
      <button className="btn" onClick={onPresent} title="Present fullscreen">Present</button>
      <button
        className={`btn${liveCraftIssues.length ? " audit-live-dirty" : ""}`}
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
            <button type="button" className="btn" onClick={() => downloadHtml(deck)}>Download HTML</button>
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
