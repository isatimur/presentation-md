import type { Slide, Card, Stat, Step, ChartSeries, RankedItem, Cta } from "@presentation-md/export";
import { LAYOUTS, layoutLabel, morphSlide } from "../deck.js";
import type { LayoutType } from "../deck.js";
import { useI18n, type MessageKey } from "../i18n/index.js";
import { TextInput, TextArea, StringSelect, ListEditor } from "./fields.js";

/** Token-based craft snippets — mirrors packages/core/references/custom-html-recipes.md */
const CUSTOM_HTML_PRESETS: { id: string; labelKey: MessageKey; html: string }[] = [
  {
    id: "split",
    labelKey: "slideForm.presetSplit",
    html: `<div style="display:flex;gap:16px;align-items:stretch;height:100%;min-height:280px"><div style="flex:1;background:var(--accent);border-radius:16px;padding:28px;color:var(--bg);display:flex;flex-direction:column;justify-content:flex-end"><div style="font:800 64px/0.9 var(--heading-font);letter-spacing:-0.04em">01</div><p style="margin-top:14px;font:500 15px/1.35 var(--body-font);opacity:.88">Accent panel — the number owns the beat.</p></div><div style="flex:1.35;border:2px solid var(--border);border-radius:16px;padding:28px;display:flex;flex-direction:column;justify-content:center;background:color-mix(in srgb,var(--bg) 92%,var(--accent))"><p style="font:700 32px/1.12 var(--heading-font);color:var(--text);letter-spacing:-0.03em;margin:0">Schema-safe HTML with frontend-slides energy.</p><p style="margin:14px 0 0;font:400 15px/1.45 var(--body-font);color:var(--muted)">Keep Deck JSON · Studio · theme tokens.</p></div></div>`,
  },
  {
    id: "bignum",
    labelKey: "slideForm.presetBigNumber",
    html: `<div style="height:100%;min-height:280px;display:flex;flex-direction:column;justify-content:flex-end;padding:8px 4px 4px"><div style="font:800 clamp(72px,14vw,120px)/0.85 var(--heading-font);letter-spacing:-0.05em;color:var(--accent)">3.2×</div><div style="height:3px;width:72px;background:var(--text);margin:18px 0 16px;border-radius:2px"></div><p style="margin:0;max-width:28ch;font:600 22px/1.25 var(--heading-font);color:var(--text);letter-spacing:-0.02em">Faster close rate after the craft rewrite.</p><p style="margin:10px 0 0;font:400 14px/1.45 var(--body-font);color:var(--muted)">One metric. One rule. No card chrome.</p></div>`,
  },
  {
    id: "stamps",
    labelKey: "slideForm.presetStamps",
    html: `<div style="position:relative;height:100%;min-height:280px;padding:12px"><div style="position:absolute;inset:18px 24px auto auto;transform:rotate(8deg);padding:10px 14px;border:3px solid var(--accent);color:var(--accent);font:700 13px/1 var(--mono-font);letter-spacing:.14em;text-transform:uppercase;background:var(--bg)">SHIPPED</div><div style="position:absolute;inset:auto auto 28px 20px;transform:rotate(-6deg);padding:10px 14px;border:3px solid var(--text);color:var(--text);font:700 13px/1 var(--mono-font);letter-spacing:.14em;text-transform:uppercase;background:var(--bg)">PROOF</div><div style="height:100%;display:flex;flex-direction:column;justify-content:center;max-width:22ch"><p style="margin:0;font:800 40px/1.05 var(--heading-font);letter-spacing:-0.04em;color:var(--text)">Stamp the claim. Repeat the motif.</p><p style="margin:16px 0 0;font:400 15px/1.45 var(--body-font);color:var(--muted)">Two rotated labels beat a sticker pile.</p></div></div>`,
  },
  {
    id: "type",
    labelKey: "slideForm.presetType",
    html: `<div style="height:100%;min-height:280px;display:grid;grid-template-rows:auto 1fr auto;gap:18px"><p style="margin:0;font:600 12px/1 var(--mono-font);letter-spacing:.16em;text-transform:uppercase;color:var(--accent)">Year wrap</p><p style="margin:0;font:800 clamp(36px,6vw,56px)/0.95 var(--heading-font);letter-spacing:-0.045em;color:var(--text)">We didn't ship slides.<br><span style="color:var(--accent)">We shipped a system.</span></p><div style="display:flex;gap:10px;flex-wrap:wrap"><span style="padding:8px 12px;border-radius:999px;background:var(--accent);color:var(--bg);font:700 12px/1 var(--mono-font)">75 themes</span><span style="padding:8px 12px;border-radius:999px;border:2px solid var(--border);color:var(--text);font:700 12px/1 var(--mono-font)">PPTX native</span><span style="padding:8px 12px;border-radius:999px;border:2px solid var(--border);color:var(--text);font:700 12px/1 var(--mono-font)">MCP craft gates</span></div></div>`,
  },
];

export function SlideForm({
  slide,
  onChange,
}: {
  slide: Slide;
  onChange: (next: Slide) => void;
}) {
  const { t } = useI18n();
  const set = (patch: Partial<Slide>) => onChange({ ...slide, ...patch });
  const layout = slide.layout as LayoutType;

  return (
    <div className="slide-form">
      <h2 className="panel-title">{layoutLabel(slide.layout)}</h2>
      <StringSelect
        label={t("slideForm.layout")}
        value={layout}
        options={LAYOUTS.map((l) => ({ value: l, label: layoutLabel(l) }))}
        onChange={(v) => onChange(morphSlide(slide, v as LayoutType))}
      />
      <StringSelect
        label={t("slideForm.tone")}
        value={typeof slide.tone === "string" ? slide.tone : "default"}
        options={[
          { value: "default", label: t("slideForm.toneDefault") },
          { value: "lime", label: t("slideForm.toneLime") },
          { value: "magenta", label: t("slideForm.toneMagenta") },
          { value: "cyan", label: t("slideForm.toneCyan") },
          { value: "orange", label: t("slideForm.toneOrange") },
          { value: "violet", label: t("slideForm.toneViolet") },
        ]}
        onChange={(v) => set({ tone: v === "default" ? undefined : v })}
      />
      {renderFields()}
      <TextArea
        label={t("slideForm.notes")}
        value={slide.notes}
        onChange={(v) => set({ notes: v || undefined })}
        rows={3}
      />
    </div>
  );

  function renderFields() {
    switch (slide.layout) {
      case "title":
      case "closing":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label={t("slideForm.lead")} value={slide.lead} onChange={(v) => set({ lead: v })} />
            {slide.layout === "closing" && (
              <ListEditor<Cta>
                label={t("slideForm.actions")}
                items={
                  Array.isArray(slide.actions) && slide.actions.length
                    ? slide.actions
                    : slide.cta?.label
                      ? [slide.cta]
                      : []
                }
                onChange={(actions) => set({ actions: actions, cta: actions[0] })}
                blank={() => ({ label: "Action", href: "#", style: "solid" })}
                renderItem={(action, setItem) => (
                  <>
                    <TextInput label={t("slideForm.label")} value={action.label} onChange={(v) => setItem({ ...action, label: v })} />
                    <TextInput label={t("slideForm.link")} value={action.href} onChange={(v) => setItem({ ...action, href: v })} />
                    <StringSelect
                      label={t("slideForm.style")}
                      value={typeof action.style === "string" ? action.style : "solid"}
                      options={[
                        { value: "solid", label: t("slideForm.styleSolid") },
                        { value: "outline", label: t("slideForm.styleOutline") },
                        { value: "ghost", label: t("slideForm.styleGhost") },
                      ]}
                      onChange={(v) => setItem({ ...action, style: v })}
                    />
                    <TextInput label={t("slideForm.iconFaClass")} value={action.icon} onChange={(v) => setItem({ ...action, icon: v })} />
                  </>
                )}
              />
            )}
          </>
        );

      case "section":
        return (
          <>
            <TextInput label={t("slideForm.number")} value={slide.number} onChange={(v) => set({ number: v })} />
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label={t("slideForm.lead")} value={slide.lead} onChange={(v) => set({ lead: v })} />
          </>
        );

      case "two-column":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label={t("slideForm.body")} value={slide.body} onChange={(v) => set({ body: v })} rows={5} />
            <StringSelect
              label={t("slideForm.ratio")}
              value={typeof slide.ratio === "string" ? slide.ratio : "1-1"}
              options={[
                { value: "1-1", label: t("slideForm.ratio11") },
                { value: "2-1", label: t("slideForm.ratio21") },
                { value: "1-2", label: t("slideForm.ratio12") },
                { value: "3-2", label: "3:2" },
                { value: "2-3", label: "2:3" },
              ]}
              onChange={(v) => set({ ratio: v })}
            />
            <StringSelect
              label={t("slideForm.mediaSide")}
              value={slide.reverse ? "left" : "right"}
              options={[
                { value: "right", label: t("slideForm.mediaRight") },
                { value: "left", label: t("slideForm.mediaLeft") },
              ]}
              onChange={(v) => set({ reverse: v === "left" })}
            />
            <TextInput label={t("slideForm.imageUrlRemote")} value={slide.image} onChange={(v) => set({ image: v })} />
            <TextInput label={t("slideForm.imageAlt")} value={slide.imageAlt} onChange={(v) => set({ imageAlt: v })} />
            <TextArea label={t("slideForm.aside")} value={slide.aside} onChange={(v) => set({ aside: v })} rows={3} />
          </>
        );

      case "image-hero":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label={t("slideForm.lead")} value={slide.lead} onChange={(v) => set({ lead: v })} rows={3} />
            <TextInput label={t("slideForm.imageUrlRemote")} value={slide.image} onChange={(v) => set({ image: v })} />
            <TextInput label={t("slideForm.imageAlt")} value={slide.imageAlt} onChange={(v) => set({ imageAlt: v })} />
          </>
        );

      case "comparison":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextInput label={t("slideForm.leftLabel")} value={slide.leftLabel} onChange={(v) => set({ leftLabel: v })} />
            <TextArea label={t("slideForm.leftBody")} value={slide.left} onChange={(v) => set({ left: v })} rows={4} />
            <TextInput label={t("slideForm.rightLabel")} value={slide.rightLabel} onChange={(v) => set({ rightLabel: v })} />
            <TextArea label={t("slideForm.rightBody")} value={slide.right} onChange={(v) => set({ right: v })} rows={4} />
            <StringSelect
              label={t("slideForm.emphasis")}
              value={slide.emphasis === "left" || slide.emphasis === "right" ? slide.emphasis : "right"}
              options={[
                { value: "left", label: t("slideForm.emphasisLeft") },
                { value: "right", label: t("slideForm.emphasisRight") },
              ]}
              onChange={(v) => set({ emphasis: v })}
            />
          </>
        );

      case "code":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextInput label={t("slideForm.filename")} value={slide.filename} onChange={(v) => set({ filename: v })} />
            <TextInput label={t("slideForm.language")} value={slide.language} onChange={(v) => set({ language: v })} />
            <TextArea label={t("slideForm.code")} value={slide.code} onChange={(v) => set({ code: v })} rows={8} />
          </>
        );

      case "quote":
        return (
          <>
            <TextArea label={t("slideForm.quote")} value={slide.quote} onChange={(v) => set({ quote: v })} rows={4} />
            <TextInput label={t("slideForm.attribution")} value={slide.by} onChange={(v) => set({ by: v })} />
          </>
        );

      case "feature-grid":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <StringSelect
              label={t("slideForm.columns")}
              value={
                slide.columns === "bento"
                  ? "bento"
                  : String(typeof slide.columns === "number" ? slide.columns : 3)
              }
              options={[
                { value: "2", label: t("slideForm.cols2") },
                { value: "3", label: t("slideForm.cols3") },
                { value: "4", label: t("slideForm.cols4") },
                { value: "bento", label: t("slideForm.colsBento") },
              ]}
              onChange={(v) => set({ columns: v === "bento" ? "bento" : Number(v) })}
            />
            <ListEditor<Card>
              label={t("slideForm.cards")}
              items={slide.cards ?? []}
              onChange={(cards) => set({ cards })}
              blank={() => ({ title: "New card", body: "" })}
              renderItem={(card, setItem) => (
                <>
                  <TextInput label={t("slideForm.iconFontAwesome")} value={card.icon} onChange={(v) => setItem({ ...card, icon: v })} />
                  <TextInput label={t("slideForm.title")} value={card.title} onChange={(v) => setItem({ ...card, title: v })} />
                  <TextArea label={t("slideForm.body")} value={card.body} onChange={(v) => setItem({ ...card, body: v })} rows={2} />
                </>
              )}
            />
          </>
        );

      case "stat-row":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label={t("slideForm.lead")} value={slide.lead} onChange={(v) => set({ lead: v })} />
            <StringSelect
              label={t("slideForm.variant")}
              value={slide.variant === "hero" ? "hero" : "default"}
              options={[
                { value: "default", label: t("slideForm.variantDefault") },
                { value: "hero", label: t("slideForm.variantHero") },
              ]}
              onChange={(v) => set({ variant: v === "hero" ? "hero" : undefined })}
            />
            <ListEditor<Stat>
              label={t("slideForm.stats")}
              items={slide.stats ?? []}
              onChange={(stats) => set({ stats })}
              blank={() => ({ value: "0", label: "Metric" })}
              renderItem={(stat, setItem) => (
                <>
                  <TextInput label={t("slideForm.value")} value={stat.value} onChange={(v) => setItem({ ...stat, value: v })} />
                  <TextInput label={t("slideForm.label")} value={stat.label} onChange={(v) => setItem({ ...stat, label: v })} />
                </>
              )}
            />
          </>
        );

      case "ranked-list":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label={t("slideForm.lead")} value={slide.lead} onChange={(v) => set({ lead: v })} />
            <ListEditor<RankedItem>
              label={t("slideForm.items")}
              items={slide.items ?? []}
              onChange={(items) => set({ items })}
              blank={() => ({ label: "Item", value: "", widthPct: 50 })}
              renderItem={(item, setItem) => (
                <>
                  <TextInput label={t("slideForm.rank")} value={item.rank} onChange={(v) => setItem({ ...item, rank: v })} />
                  <TextInput label={t("slideForm.label")} value={item.label} onChange={(v) => setItem({ ...item, label: v })} />
                  <TextInput label={t("slideForm.value")} value={item.value} onChange={(v) => setItem({ ...item, value: v })} />
                  <TextInput
                    label={t("slideForm.widthPct")}
                    value={item.widthPct !== undefined ? String(item.widthPct) : ""}
                    onChange={(v) => {
                      const n = Number(v);
                      setItem({ ...item, widthPct: Number.isFinite(n) && n > 0 ? n : undefined });
                    }}
                  />
                </>
              )}
            />
          </>
        );

      case "logo-wall":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label={t("slideForm.lead")} value={slide.lead} onChange={(v) => set({ lead: v })} />
            <StringSelect
              label={t("slideForm.columns")}
              value={String(typeof slide.columns === "number" ? slide.columns : 4)}
              options={[
                { value: "2", label: "2" },
                { value: "3", label: "3" },
                { value: "4", label: "4" },
                { value: "5", label: "5" },
                { value: "6", label: "6" },
              ]}
              onChange={(v) => set({ columns: Number(v) })}
            />
            <ListEditor<Card>
              label={t("slideForm.logos")}
              items={slide.cards ?? []}
              onChange={(cards) => set({ cards })}
              blank={() => ({ title: "Brand", body: "" })}
              renderItem={(card, setItem) => (
                <>
                  <TextInput label={t("slideForm.title")} value={card.title} onChange={(v) => setItem({ ...card, title: v })} />
                  <TextInput label={t("slideForm.imageUrl")} value={card.image} onChange={(v) => setItem({ ...card, image: v })} />
                  <TextInput label={t("slideForm.imageAlt")} value={card.imageAlt} onChange={(v) => setItem({ ...card, imageAlt: v })} />
                  <TextInput label={t("slideForm.icon")} value={card.icon} onChange={(v) => setItem({ ...card, icon: v })} />
                  <TextInput label={t("slideForm.body")} value={card.body} onChange={(v) => setItem({ ...card, body: v })} />
                </>
              )}
            />
          </>
        );

      case "streak-grid":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label={t("slideForm.lead")} value={slide.lead} onChange={(v) => set({ lead: v })} />
            <TextInput
              label={t("slideForm.filled")}
              value={slide.filled !== undefined ? String(slide.filled) : ""}
              onChange={(v) => {
                const n = Number(v);
                set({ filled: Number.isFinite(n) ? n : undefined });
              }}
            />
            <TextInput
              label={t("slideForm.total")}
              value={slide.total !== undefined ? String(slide.total) : ""}
              onChange={(v) => {
                const n = Number(v);
                set({ total: Number.isFinite(n) ? n : undefined });
              }}
            />
            <TextInput
              label={t("slideForm.columns")}
              value={slide.cols !== undefined ? String(slide.cols) : "10"}
              onChange={(v) => {
                const n = Number(v);
                set({ cols: Number.isFinite(n) ? n : 10 });
              }}
            />
            <TextArea label={t("slideForm.caption")} value={slide.body} onChange={(v) => set({ body: v })} rows={2} />
          </>
        );

      case "metric-ring":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextInput label={t("slideForm.value")} value={slide.value} onChange={(v) => set({ value: v })} />
            <TextInput label={t("slideForm.label")} value={slide.label} onChange={(v) => set({ label: v })} />
            <TextInput
              label={t("slideForm.ringPct")}
              value={slide.pct !== undefined ? String(slide.pct) : "100"}
              onChange={(v) => {
                const n = Number(v);
                set({ pct: Number.isFinite(n) ? n : 100 });
              }}
            />
            <TextArea label={t("slideForm.lead")} value={slide.lead} onChange={(v) => set({ lead: v })} rows={3} />
            <TextArea label={t("slideForm.body")} value={slide.body} onChange={(v) => set({ body: v })} rows={2} />
          </>
        );

      case "chart":
        return <ChartFields slide={slide} set={set} />;

      case "custom-html":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <TextArea label={t("slideForm.lead")} value={slide.lead} onChange={(v) => set({ lead: v })} />
            <div>
              <div className="field-label">{t("slideForm.presetInsert")}</div>
              <div className="chip-row" style={{ marginTop: 6 }}>
                {CUSTOM_HTML_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="chip"
                    title={t("slideForm.presetTitle", { label: t(p.labelKey) })}
                    onClick={() => set({ html: p.html })}
                  >
                    {t(p.labelKey)}
                  </button>
                ))}
              </div>
            </div>
            <TextArea
              label={t("slideForm.htmlFragment")}
              value={slide.html}
              onChange={(v) => set({ html: v })}
              rows={10}
            />
          </>
        );

      case "timeline":
        return (
          <>
            <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
            <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
            <StringSelect
              label={t("slideForm.orientation")}
              value={slide.orientation === "vertical" ? "vertical" : "horizontal"}
              options={[
                { value: "horizontal", label: t("slideForm.orientHorizontal") },
                { value: "vertical", label: t("slideForm.orientVertical") },
              ]}
              onChange={(v) => set({ orientation: v === "vertical" ? "vertical" : undefined })}
            />
            <ListEditor<Step>
              label={t("slideForm.steps")}
              items={slide.steps ?? []}
              onChange={(steps) => set({ steps })}
              blank={() => ({ title: "New step", body: "" })}
              renderItem={(step, setItem) => (
                <>
                  <TextInput label={t("slideForm.title")} value={step.title} onChange={(v) => setItem({ ...step, title: v })} />
                  <TextArea label={t("slideForm.body")} value={step.body} onChange={(v) => setItem({ ...step, body: v })} rows={2} />
                </>
              )}
            />
          </>
        );

      case "data-table":
        return <DataTableFields slide={slide} set={set} />;

      default:
        return <p className="muted">{t("slideForm.noFields")}</p>;
    }
  }
}

function DataTableFields({ slide, set }: { slide: Slide; set: (patch: Partial<Slide>) => void }) {
  const { t } = useI18n();
  const headers: string[] = Array.isArray(slide.columns) ? slide.columns : [];
  const rows: string[][] = Array.isArray(slide.rows) ? slide.rows : [];
  const colCount = Math.max(headers.length, ...rows.map((r) => r.length), 1);

  const setHeader = (i: number, v: string) => {
    const next = headers.slice();
    next[i] = v;
    set({ columns: next });
  };
  const addColumn = () => {
    set({ columns: [...headers, `Column ${headers.length + 1}`], rows: rows.map((r) => [...r, ""]) });
  };
  const removeColumn = (i: number) => {
    set({ columns: headers.filter((_, idx) => idx !== i), rows: rows.map((r) => r.filter((_, idx) => idx !== i)) });
  };

  return (
    <>
      <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
      <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
      <div className="list-editor">
        <div className="list-editor-head">
          <span className="field-label">{t("slideForm.columns")}</span>
          <button className="btn btn-sm" onClick={addColumn}>{t("slideForm.addColumn")}</button>
        </div>
        {Array.from({ length: colCount }).map((_, i) => (
          <div className="row-inline" key={i}>
            <input
              className="text-input"
              value={headers[i] ?? ""}
              placeholder={t("slideForm.columnPlaceholder", { n: i + 1 })}
              onChange={(e) => setHeader(i, e.target.value)}
            />
            <button className="btn btn-icon btn-danger" title={t("slideForm.removeColumn")} onClick={() => removeColumn(i)}>✕</button>
          </div>
        ))}
      </div>
      <ListEditor<string[]>
        label={t("slideForm.rows")}
        items={rows}
        onChange={(next) => set({ rows: next })}
        blank={() => Array.from({ length: colCount }, () => "")}
        renderItem={(row, setItem) => (
          <div className="row-cells">
            {Array.from({ length: colCount }).map((_, c) => (
              <input
                key={c}
                className="text-input"
                value={row[c] ?? ""}
                placeholder={headers[c] ?? t("slideForm.colShort", { n: c + 1 })}
                onChange={(e) => {
                  const next = row.slice();
                  while (next.length < colCount) next.push("");
                  next[c] = e.target.value;
                  setItem(next);
                }}
              />
            ))}
          </div>
        )}
      />
    </>
  );
}

function ChartFields({ slide, set }: { slide: Slide; set: (patch: Partial<Slide>) => void }) {
  const { t } = useI18n();
  const categories = slide.categories ?? [];
  const series = slide.series ?? [];
  const catCount = Math.max(categories.length, ...series.map((s) => s.values?.length ?? 0), 1);

  const setCategory = (i: number, v: string) => {
    const next = categories.slice();
    while (next.length < catCount) next.push(`C${next.length + 1}`);
    next[i] = v;
    set({ categories: next });
  };

  return (
    <>
      <TextInput label={t("slideForm.eyebrow")} value={slide.eyebrow} onChange={(v) => set({ eyebrow: v })} />
      <TextInput label={t("slideForm.heading")} value={slide.heading} onChange={(v) => set({ heading: v })} />
      <TextArea label={t("slideForm.lead")} value={slide.lead} onChange={(v) => set({ lead: v })} rows={2} />
      <StringSelect
        label={t("slideForm.chartType")}
        value={slide.chartType ?? "bar"}
        onChange={(v) => set({ chartType: v })}
        options={[
          { value: "bar", label: t("slideForm.chartBar") },
          { value: "horizontal-bar", label: t("slideForm.chartHorizontalBar") },
          { value: "line", label: t("slideForm.chartLine") },
          { value: "area", label: t("slideForm.chartArea") },
          { value: "pie", label: t("slideForm.chartPie") },
          { value: "donut", label: t("slideForm.chartDonut") },
        ]}
      />
      <div className="row-inline" style={{ gap: 16 }}>
        <label className="field">
          <span className="field-label">{t("slideForm.showLegend")}</span>
          <input
            type="checkbox"
            checked={slide.showLegend !== false}
            onChange={(e) => set({ showLegend: e.target.checked })}
          />
        </label>
        <label className="field">
          <span className="field-label">{t("slideForm.showValues")}</span>
          <input
            type="checkbox"
            checked={slide.showValues === true}
            onChange={(e) => set({ showValues: e.target.checked })}
          />
        </label>
        <label className="field">
          <span className="field-label">{t("slideForm.stacked")}</span>
          <input
            type="checkbox"
            checked={slide.stacked === true}
            onChange={(e) => set({ stacked: e.target.checked })}
          />
        </label>
      </div>
      <div className="list-editor">
        <div className="list-editor-head">
          <span className="field-label">{t("slideForm.categories")}</span>
          <button
            className="btn btn-sm"
            onClick={() =>
              set({
                categories: [...categories, `C${categories.length + 1}`],
                series: series.map((s) => ({ ...s, values: [...(s.values ?? []), 0] })),
              })
            }
          >
            {t("slideForm.addCategory")}
          </button>
        </div>
        {Array.from({ length: catCount }).map((_, i) => (
          <div className="row-inline" key={i}>
            <input
              className="text-input"
              value={categories[i] ?? ""}
              placeholder={t("slideForm.categoryPlaceholder", { n: i + 1 })}
              onChange={(e) => setCategory(i, e.target.value)}
            />
          </div>
        ))}
      </div>
      <ListEditor<ChartSeries>
        label={t("slideForm.series")}
        items={series}
        onChange={(next) => set({ series: next })}
        blank={() => ({ name: "Series", values: Array.from({ length: catCount }, () => 0) })}
        renderItem={(s, setItem) => (
          <>
            <TextInput label={t("slideForm.name")} value={s.name} onChange={(v) => setItem({ ...s, name: v })} />
            <div className="row-cells">
              {Array.from({ length: catCount }).map((_, c) => (
                <input
                  key={c}
                  className="text-input"
                  type="number"
                  value={s.values?.[c] ?? 0}
                  placeholder={categories[c] ?? `C${c + 1}`}
                  onChange={(e) => {
                    const values = (s.values ?? []).slice();
                    while (values.length < catCount) values.push(0);
                    values[c] = Number(e.target.value) || 0;
                    setItem({ ...s, values });
                  }}
                />
              ))}
            </div>
          </>
        )}
      />
    </>
  );
}
