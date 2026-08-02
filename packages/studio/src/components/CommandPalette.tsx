import { useEffect, useMemo, useRef, useState } from "react";

export interface StudioCommand {
  id: string;
  label: string;
  hint?: string;
  keywords?: string;
  run: () => void | Promise<void>;
}

export function CommandPalette({
  open,
  onOpenChange,
  commands,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  commands: StudioCommand[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => {
      const hay = `${c.label} ${c.hint ?? ""} ${c.keywords ?? ""}`.toLowerCase();
      return q.split(/\s+/).every((part) => hay.includes(part));
    });
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onOpenChange(false);
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filtered[active];
        if (cmd) {
          onOpenChange(false);
          void cmd.run();
        }
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, filtered, active, onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="command-palette-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div
        className="command-palette"
        role="dialog"
        aria-label="Command palette"
        aria-modal="true"
      >
        <input
          ref={inputRef}
          className="command-palette-input"
          type="search"
          placeholder="Jump to an action…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-autocomplete="list"
          aria-controls="studio-command-list"
        />
        <ul id="studio-command-list" className="command-palette-list" role="listbox">
          {filtered.length === 0 ? (
            <li className="command-palette-empty">No matching actions</li>
          ) : (
            filtered.map((cmd, idx) => (
              <li key={cmd.id} role="option" aria-selected={idx === active}>
                <button
                  type="button"
                  className={`command-palette-item${idx === active ? " is-active" : ""}`}
                  onMouseEnter={() => setActive(idx)}
                  onClick={() => {
                    onOpenChange(false);
                    void cmd.run();
                  }}
                >
                  <span className="command-palette-label">{cmd.label}</span>
                  {cmd.hint ? <kbd className="command-palette-hint">{cmd.hint}</kbd> : null}
                </button>
              </li>
            ))
          )}
        </ul>
        <div className="command-palette-foot">
          <span>↑↓ navigate</span>
          <span>↵ run</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
