const v=`<section class="slide chart-slide" data-layout="chart">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  <div class="chart-frame">
    {{{chartSvg}}}
  </div>
</section>
`,w=`<section class="slide title-slide closing-slide" data-layout="closing">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  {{#hasActions}}
  <div class="cta-row">
    {{#actions}}
    <a class="btn{{#isOutline}} btn-outline{{/isOutline}}{{#isGhost}} btn-ghost{{/isGhost}}" href="{{href}}">{{#icon}}<i class="{{icon}}"></i> {{/icon}}{{label}}</a>
    {{/actions}}
  </div>
  {{/hasActions}}
</section>
`,y=`<section class="slide code-slide" data-layout="code">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  <div class="code-window">
    <div class="code-chrome" aria-hidden="true">
      <span class="code-dot code-dot-red"></span>
      <span class="code-dot code-dot-amber"></span>
      <span class="code-dot code-dot-green"></span>
      {{#filename}}<span class="code-filename">{{filename}}</span>{{/filename}}
      {{^filename}}{{#language}}<span class="code-filename">{{language}}</span>{{/language}}{{/filename}}
    </div>
    <pre class="code-block"><code>{{code}}</code></pre>
  </div>
</section>
`,E=`<section class="slide comparison-slide" data-layout="comparison">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  <div class="comparison-cols{{#emphasis}} emphasis-{{emphasis}}{{/emphasis}}">
    <div class="comparison-col">
      {{#leftLabel}}<span class="comparison-label">{{leftLabel}}</span>{{/leftLabel}}
      <p>{{left}}</p>
    </div>
    <div class="comparison-vs" aria-hidden="true">vs</div>
    <div class="comparison-col">
      {{#rightLabel}}<span class="comparison-label">{{rightLabel}}</span>{{/rightLabel}}
      <p>{{right}}</p>
    </div>
  </div>
</section>
`,z=`<section class="slide custom-html-slide" data-layout="custom-html">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  <div class="custom-html-frame">
    {{{html}}}
  </div>
</section>
`,S=`<section class="slide data-table-slide" data-layout="data-table">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  <table>
    <thead>
      <tr>{{#columns}}<th>{{.}}</th>{{/columns}}</tr>
    </thead>
    <tbody>
      {{#rows}}
      <tr>{{#cells}}<td>{{.}}</td>{{/cells}}</tr>
      {{/rows}}
    </tbody>
  </table>
</section>
`,T=`<section class="slide feature-grid-slide" data-layout="feature-grid">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  <div class="grid cols-{{columns}}">
    {{#cards}}
    <div class="card">
      {{#icon}}<i class="{{icon}}"></i>{{/icon}}
      <h3>{{title}}</h3>
      {{#body}}<p>{{body}}</p>{{/body}}
    </div>
    {{/cards}}
  </div>
</section>
`,L=`<section class="slide image-hero-slide" data-layout="image-hero">
  <div class="image-hero-bg">
    {{#image}}<img src="{{image}}" alt="{{imageAlt}}" />{{/image}}
    <div class="image-hero-scrim"></div>
  </div>
  <div class="image-hero-content">
    {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
    <h2>{{heading}}</h2>
    {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  </div>
</section>
`,C=`<section class="slide logo-wall-slide" data-layout="logo-wall">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  <div class="logo-wall cols-{{columns}}">
    {{#cards}}
    <div class="logo-tile">
      {{#image}}
      <img class="logo-tile-img" src="{{image}}" alt="{{#imageAlt}}{{imageAlt}}{{/imageAlt}}{{^imageAlt}}{{title}}{{/imageAlt}}" />
      {{/image}}
      {{^image}}
      {{#icon}}<i class="{{icon}}"></i>{{/icon}}
      {{^icon}}<span class="logo-tile-fallback">{{title}}</span>{{/icon}}
      {{/image}}
      {{#body}}<p class="logo-tile-caption">{{body}}</p>{{/body}}
    </div>
    {{/cards}}
  </div>
</section>
`,A=`<section class="slide metric-ring-slide" data-layout="metric-ring">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  <div class="pct-wrap">
    {{#isArc}}
    <div class="pct-ring pct-ring-arc" role="img" aria-label="{{value}} {{label}}">
      {{{ringSvg}}}
      <div class="pct-ring-center">
        <span class="pct-num">{{value}}</span>
        {{#label}}<span class="pct-label">{{label}}</span>{{/label}}
      </div>
    </div>
    {{/isArc}}
    {{^isArc}}
    <div class="pct-ring" role="img" aria-label="{{value}} {{label}}">
      <span class="pct-num">{{value}}</span>
      {{#label}}<span class="pct-label">{{label}}</span>{{/label}}
    </div>
    {{/isArc}}
    <div class="pct-desc">
      {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
      {{#body}}<p class="pct-body">{{body}}</p>{{/body}}
    </div>
  </div>
</section>
`,O=`<section class="slide quote-slide" data-layout="quote">
  <p class="quote">{{quote}}</p>
  {{#by}}<p class="quote-by">— {{by}}</p>{{/by}}
</section>
`,q=`<section class="slide ranked-list-slide" data-layout="ranked-list">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  <div class="ranked-list-stack">
    {{#items}}
    <div class="ranked-list-item{{#isPrimary}} is-primary{{/isPrimary}}">
      <span class="ranked-list-rank">{{rank}}</span>
      <div class="ranked-list-track">
        <div class="ranked-list-fill" style="width:{{widthPct}}%">
          <span class="ranked-list-label">{{label}}</span>
          {{#value}}<span class="ranked-list-value">{{value}}</span>{{/value}}
        </div>
      </div>
    </div>
    {{/items}}
  </div>
</section>
`,B=`<section class="slide section-slide" data-layout="section">
  {{#number}}<div class="section-number">{{number}}</div>{{/number}}
  <h2>{{heading}}</h2>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,H=`<section class="slide stat-row-slide{{#isHero}} stat-row-hero{{/isHero}}" data-layout="stat-row">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  <div class="stats">
    {{#stats}}
    <div class="stat{{#isMega}} is-mega{{/isMega}}">
      <div class="value">{{value}}</div>
      <div class="label">{{label}}</div>
    </div>
    {{/stats}}
  </div>
</section>
`,D=`<section class="slide streak-grid-slide" data-layout="streak-grid">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
  <div class="streak-boxes" style="--streak-cols: {{cols}}">
    {{#cells}}
    <div class="streak-box{{#dim}} dim{{/dim}}{{#mid}} mid{{/mid}}"></div>
    {{/cells}}
  </div>
  {{#body}}<p class="streak-caption">{{body}}</p>{{/body}}
</section>
`,I=`<section class="slide timeline-slide" data-layout="timeline">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  {{#heading}}<h2>{{heading}}</h2>{{/heading}}
  <div class="timeline{{#isVertical}} is-vertical{{/isVertical}}">
    {{#steps}}
    <div class="node">
      <div class="dot"></div>
      <h3>{{title}}</h3>
      {{#body}}<p>{{body}}</p>{{/body}}
    </div>
    {{/steps}}
  </div>
</section>
`,_=`<section class="slide title-slide" data-layout="title">
  {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
  <h1>{{heading}}</h1>
  {{#lead}}<p class="lead">{{lead}}</p>{{/lead}}
</section>
`,M=`<section class="slide two-column-slide" data-layout="two-column">
  <div class="cols{{#ratio}} ratio-{{ratio}}{{/ratio}}{{#reverse}} cols-reverse{{/reverse}}">
    <div class="cols-copy">
      {{#eyebrow}}<span class="eyebrow">{{eyebrow}}</span>{{/eyebrow}}
      <h2>{{heading}}</h2>
      {{#body}}<p class="lead">{{body}}</p>{{/body}}
    </div>
    {{#image}}<div class="media"><img src="{{image}}" alt="{{imageAlt}}" /></div>{{/image}}
    {{^image}}{{#aside}}<div class="cols-aside"><p>{{aside}}</p></div>{{/aside}}{{/image}}
  </div>
</section>
`,F=`/* presentation-md base stylesheet.
   Theme tokens are injected via the :root block below. Layout fragments in
   ./layouts/*.html consume these CSS variables and class names. */

:root {
  --bg: {{bg}};
  --bg-2: {{bg2}};
  --text: {{text}};
  --muted: {{muted}};
  --accent: {{accent}};
  --accent-2: {{accent2}};
  --card-bg: {{cardBg}};
  --border: {{border}};
  --radius: {{radius}};
  --slide-w: {{slideW}};
  --heading-font: {{{headingFont}}};
  --body-font: {{{bodyFont}}};
  --heading-weight: {{headingWeight}};
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--body-font);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  padding: 48px 0;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.deck {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  width: 100%;
}

.slide {
  position: relative;
  width: min(var(--slide-w), 95vw);
  aspect-ratio: 16 / 9;
  border-radius: var(--radius);
  overflow: hidden;
  padding: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  scroll-snap-align: center;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
  border: 1px solid var(--border);
}

.slide > * { position: relative; z-index: 1; }

.eyebrow {
  color: var(--accent-2);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 14px;
  margin-bottom: 14px;
}

.slide h1 { font-size: clamp(40px, 5.5vw, 84px); }
.slide h2 { font-size: clamp(30px, 3.4vw, 46px); margin-bottom: 8px; }

.lead {
  color: var(--muted);
  font-size: 20px;
  max-width: 62ch;
  margin-top: 16px;
}

/* two-column — balanced by default; ratio-* for asymmetric craft */
.two-column-slide { justify-content: stretch; }
.cols {
  display: flex;
  gap: clamp(28px, 4vw, 56px);
  align-items: center;
  height: 100%;
  min-height: 0;
  width: 100%;
}
.cols > * { flex: 1; min-width: 0; }
.cols.cols-reverse { flex-direction: row-reverse; }
.cols.ratio-2-1 > .cols-copy { flex: 2.1; }
.cols.ratio-2-1 > .media,
.cols.ratio-2-1 > .cols-aside { flex: 1; }
.cols.ratio-1-2 > .cols-copy { flex: 1; }
.cols.ratio-1-2 > .media,
.cols.ratio-1-2 > .cols-aside { flex: 2.1; }
.cols.ratio-3-2 > .cols-copy { flex: 1.55; }
.cols.ratio-3-2 > .media,
.cols.ratio-3-2 > .cols-aside { flex: 1; }
.cols.ratio-2-3 > .cols-copy { flex: 1; }
.cols.ratio-2-3 > .media,
.cols.ratio-2-3 > .cols-aside { flex: 1.55; }
.cols .cols-copy h2 { max-width: 18ch; }
.cols .media { height: 100%; align-self: stretch; }
.cols img {
  width: 100%;
  height: 100%;
  min-height: 280px;
  object-fit: cover;
  border-radius: var(--radius);
  display: block;
}
.cols-aside {
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 36px 40px;
  background: color-mix(in srgb, var(--accent) 10%, var(--card-bg));
  border: 1px solid color-mix(in srgb, var(--accent) 28%, var(--border));
  border-radius: var(--radius);
  border-left: 4px solid var(--accent);
  position: relative;
}
.cols-aside::before {
  content: "";
  position: absolute;
  top: 28px;
  left: 40px;
  width: 36px;
  height: 3px;
  background: var(--accent);
  border-radius: 2px;
}
.cols-aside p {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(22px, 2.6vw, 34px);
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0;
  padding-top: 18px;
}
.cols .cols-copy .lead,
.cols .cols-copy > p.lead {
  font-size: 18px;
  line-height: 1.5;
  max-width: 42ch;
}

/* image-hero — full-bleed photo with bottom scrim + light storytelling motion */
.image-hero-slide { padding: 0; justify-content: flex-end; }
.image-hero-bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
.image-hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.06);
  animation: pmd-hero-ken 14s ease-in-out alternate infinite;
}
.image-hero-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, var(--bg) 0%, color-mix(in srgb, var(--bg) 55%, transparent) 42%, transparent 72%),
    linear-gradient(105deg, color-mix(in srgb, var(--bg) 55%, transparent) 0%, transparent 46%);
}
.image-hero-content {
  position: relative;
  z-index: 1;
  padding: 64px;
  width: 100%;
  max-width: 52ch;
  animation: pmd-hero-copy 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 120ms;
}
.image-hero-content h2 {
  font-size: clamp(36px, 4.6vw, 64px);
  max-width: 16ch;
  text-shadow: 0 12px 40px color-mix(in srgb, var(--bg) 55%, transparent);
}
.image-hero-content .lead {
  color: color-mix(in srgb, var(--text) 78%, var(--muted));
  max-width: 36ch;
}
@keyframes pmd-hero-ken {
  from { transform: scale(1.06) translate3d(0, 0, 0); }
  to { transform: scale(1.12) translate3d(-1.2%, -0.8%, 0); }
}
@keyframes pmd-hero-copy {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
}

/* comparison — side-by-side contrast */
.comparison-slide { justify-content: flex-start; }
.comparison-slide .comparison-cols {
  display: flex;
  gap: 16px;
  align-items: stretch;
  flex: 1;
  margin-top: 28px;
  min-height: 0;
}
.comparison-col {
  flex: 1;
  padding: 32px 36px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 0.75);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  min-width: 0;
}
.comparison-col:first-child {
  border-color: color-mix(in srgb, var(--muted) 35%, var(--border));
}
.comparison-col:last-child {
  border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
  background: color-mix(in srgb, var(--accent) 8%, var(--card-bg));
}
/* Asymmetric emphasis — grow the winning column */
.comparison-cols.emphasis-right .comparison-col:last-child,
.comparison-cols.emphasis-left .comparison-col:first-child {
  flex: 1.42;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 35%, transparent);
}
.comparison-cols.emphasis-right .comparison-col:first-child,
.comparison-cols.emphasis-left .comparison-col:last-child {
  flex: 0.78;
  opacity: 0.88;
  transform: scale(0.985);
  transform-origin: center;
}
.comparison-cols.emphasis-right .comparison-col:last-child .comparison-label,
.comparison-cols.emphasis-left .comparison-col:first-child .comparison-label {
  font-size: 13px;
}
.comparison-col p {
  color: var(--muted);
  font-size: 18px;
  line-height: 1.5;
  white-space: pre-line;
  flex: 1;
}
.comparison-label {
  display: block;
  font-weight: 700;
  color: var(--accent-2);
  margin-bottom: 14px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.12em;
}
.comparison-col:last-child .comparison-label { color: var(--accent); }
.comparison-vs {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0.7;
  flex-shrink: 0;
  width: 36px;
}

/* feature grid */
.feature-grid-slide { justify-content: flex-start; }
.grid { display: grid; gap: 20px; margin-top: 28px; flex: 1; align-content: stretch; }
.grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
/* Asymmetric bento when agents pass columns: "bento" (5-up: hero + 4) */
.grid.cols-bento {
  grid-template-columns: 1.55fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 14px;
  min-height: 0;
}
.grid.cols-bento .card:first-child {
  grid-row: 1 / span 2;
  justify-content: center;
  padding: 40px 36px;
  background:
    linear-gradient(160deg, color-mix(in srgb, var(--accent) 18%, var(--card-bg)), var(--card-bg) 70%);
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 18%, transparent);
}
.grid.cols-bento .card:first-child i { font-size: 32px; margin-bottom: 20px; }
.grid.cols-bento .card:first-child h3 { font-size: clamp(24px, 2.6vw, 34px); margin-bottom: 14px; }
.grid.cols-bento .card:first-child p { font-size: 16px; line-height: 1.5; max-width: 28ch; }
.grid.cols-bento .card:not(:first-child) { padding: 22px 20px; }
.grid.cols-bento .card:not(:first-child) h3 { font-size: 17px; }
.grid.cols-bento .card:not(:first-child) p { font-size: 14px; }

/* Dense two-column compositions — tighter when both panes carry weight */
.cols.ratio-2-1,
.cols.ratio-3-2,
.cols.ratio-1-2,
.cols.ratio-2-3 {
  gap: clamp(22px, 3.2vw, 44px);
}
.cols .cols-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
}
.cols.ratio-1-2 > .cols-copy h2,
.cols.ratio-2-3 > .cols-copy h2 {
  font-size: clamp(28px, 3.2vw, 42px);
  max-width: 14ch;
}
.cols-aside {
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 12%, transparent);
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 0.85);
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.card i { color: var(--accent); font-size: 26px; margin-bottom: 16px; display: block; }
.card h3 { font-size: 20px; margin-bottom: 10px; letter-spacing: -0.01em; }
.card p { color: var(--muted); font-size: 15px; line-height: 1.45; }

/* quote */
.quote-slide {
  align-items: flex-start;
  text-align: left;
  justify-content: center;
}
.quote {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(30px, 3.8vw, 54px);
  max-width: 28ch;
  line-height: 1.15;
  letter-spacing: -0.02em;
  position: relative;
  padding-left: 28px;
  border-left: 3px solid var(--accent);
}
.quote-by {
  color: var(--muted);
  margin-top: 28px;
  margin-left: 28px;
  font-size: 17px;
  letter-spacing: 0.02em;
}

/* data table */
.data-table-slide { justify-content: flex-start; }
table { width: 100%; border-collapse: collapse; margin-top: 28px; font-size: 17px; }
th, td { text-align: left; padding: 18px 22px; border-bottom: 1px solid var(--border); }
thead th {
  background: color-mix(in srgb, var(--accent) 16%, transparent);
  font-family: var(--heading-font);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
}
tbody tr:last-child td { border-bottom: none; }
tbody tr:hover td {
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}

/* stat row */
.stat-row-slide { justify-content: flex-start; }
.stats {
  display: flex;
  gap: 20px;
  margin-top: 40px;
  flex-wrap: wrap;
  flex: 1;
  align-items: stretch;
}
.stat {
  flex: 1;
  min-width: 140px;
  padding: 8px 8px 8px 0;
  border-top: 2px solid color-mix(in srgb, var(--accent) 55%, var(--border));
  padding-top: 20px;
}
.stat .value {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(44px, 5.4vw, 76px);
  color: var(--accent);
  line-height: 0.95;
  letter-spacing: -0.03em;
}
.stat .label {
  color: var(--muted);
  font-size: 15px;
  margin-top: 12px;
  max-width: 18ch;
  line-height: 1.35;
}

/* Mega-stat wrap beat (Spotify-Wrapped energy) */
.stat-row-slide.stat-row-hero {
  justify-content: center;
}
.stat-row-slide.stat-row-hero .lead {
  margin-top: 8px;
  max-width: 34ch;
  font-size: clamp(18px, 2.2vw, 26px);
}
.stat-row-slide.stat-row-hero .stats {
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
  flex: 0 0 auto;
}
.stat-row-slide.stat-row-hero .stat.is-mega {
  flex: none;
  min-width: 0;
  border-top: none;
  padding: 0;
}
.stat-row-slide.stat-row-hero .stat.is-mega .value {
  font-size: clamp(88px, 18vw, 220px);
  letter-spacing: -0.06em;
  line-height: 0.85;
}
.stat-row-slide.stat-row-hero .stat.is-mega .label {
  font-size: clamp(16px, 2vw, 22px);
  max-width: 28ch;
  margin-top: 16px;
  color: var(--text);
}
.stat-row-slide.stat-row-hero .stat:not(.is-mega) {
  flex: none;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  border-top: 2px solid color-mix(in srgb, var(--accent) 40%, var(--border));
  padding-top: 12px;
  margin-right: 28px;
}
.stat-row-slide.stat-row-hero .stat:not(.is-mega) .value {
  font-size: clamp(28px, 3.5vw, 40px);
}

/* ranked-list — schema bars (Pulse / Gamma progress energy) */
.ranked-list-slide { justify-content: flex-start; }
.ranked-list-slide .lead {
  margin-top: 8px;
  max-width: 42ch;
}
.ranked-list-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 640px;
  margin-top: 20px;
  width: 100%;
}
.ranked-list-item {
  display: flex;
  align-items: center;
  gap: 14px;
}
.ranked-list-rank {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(28px, 4vw, 48px);
  min-width: 2ch;
  letter-spacing: -0.04em;
  color: var(--text);
  opacity: 0.55;
  line-height: 1;
}
.ranked-list-item.is-primary .ranked-list-rank {
  opacity: 1;
}
.ranked-list-track {
  flex: 1;
  min-width: 0;
}
.ranked-list-fill {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 18px;
  background: color-mix(in srgb, var(--accent) 22%, var(--bg2));
  color: var(--text);
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(16px, 2vw, 22px);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.1;
  min-width: 4ch;
}
.ranked-list-item.is-primary .ranked-list-fill {
  background: var(--accent);
  color: var(--bg);
}
.ranked-list-label { flex: 1; min-width: 0; }
.ranked-list-value {
  opacity: 0.85;
  font-size: 0.85em;
  white-space: nowrap;
}

/* logo-wall — customer / partner / team marks */
.logo-wall-slide { justify-content: flex-start; }
.logo-wall-slide .lead {
  margin-top: 8px;
  max-width: 48ch;
}
.logo-wall {
  display: grid;
  gap: 16px;
  margin-top: 28px;
  width: 100%;
  align-items: stretch;
}
.logo-wall.cols-2 { grid-template-columns: repeat(2, 1fr); }
.logo-wall.cols-3 { grid-template-columns: repeat(3, 1fr); }
.logo-wall.cols-4 { grid-template-columns: repeat(4, 1fr); }
.logo-wall.cols-5 { grid-template-columns: repeat(5, 1fr); }
.logo-wall.cols-6 { grid-template-columns: repeat(6, 1fr); }
.logo-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 96px;
  padding: 18px 14px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-align: center;
}
.logo-tile-img {
  max-width: 100%;
  max-height: 48px;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: grayscale(0.15);
}
.logo-tile i {
  font-size: 28px;
  color: var(--accent);
}
.logo-tile-fallback {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(16px, 2vw, 22px);
  color: var(--text);
  letter-spacing: -0.02em;
}
.logo-tile-caption {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
  max-width: 16ch;
  line-height: 1.3;
}

/* chart */
.chart-slide { justify-content: flex-start; }
.chart-slide .lead {
  margin-top: 8px;
  max-width: 52ch;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.4;
}
.chart-frame {
  flex: 1;
  margin-top: 20px;
  min-height: 0;
  display: flex;
  align-items: stretch;
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  border-radius: calc(var(--radius) + 2px);
  background: color-mix(in srgb, var(--card-bg) 88%, transparent);
  padding: 18px 20px 12px;
  overflow: hidden;
}
.chart-frame .pmd-chart {
  width: 100%;
  height: 100%;
  min-height: 280px;
}

/* custom-html escape hatch */
.custom-html-slide { justify-content: flex-start; }
.custom-html-frame {
  flex: 1;
  margin-top: 16px;
  min-height: 0;
  position: relative;
  overflow: hidden;
}
.custom-html-frame > *:first-child { margin-top: 0; }

/* timeline — horizontal flow with connected rail */
.timeline-slide { justify-content: flex-start; }
.timeline { display: flex; gap: 0; margin-top: 48px; flex: 1; }
.timeline .node { flex: 1; position: relative; padding-right: 28px; min-width: 0; }
.timeline .node::before {
  content: "";
  position: absolute;
  top: 9px;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), var(--border));
}
.timeline .node:last-child::before { right: 60%; }
.timeline .dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--accent);
  position: relative;
  z-index: 1;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent);
}
.timeline .node h3 { font-size: 18px; margin: 22px 0 8px; letter-spacing: -0.01em; }
.timeline .node p { color: var(--muted); font-size: 14px; line-height: 1.4; }

/* Vertical process stack (orientation: "vertical") */
.timeline.is-vertical {
  flex-direction: column;
  gap: 0;
  max-width: 640px;
}
.timeline.is-vertical .node {
  display: grid;
  grid-template-columns: 28px 1fr;
  column-gap: 16px;
  padding: 0 0 28px 0;
  flex: none;
}
.timeline.is-vertical .node::before {
  top: 18px;
  bottom: -8px;
  left: 8px;
  right: auto;
  width: 2px;
  height: auto;
  background: linear-gradient(180deg, var(--accent), var(--border));
}
.timeline.is-vertical .node:last-child::before { display: none; }
.timeline.is-vertical .dot { grid-row: 1 / span 2; margin-top: 4px; }
.timeline.is-vertical .node h3 { margin: 0 0 6px; }
.timeline.is-vertical .node p { margin: 0; }

/* code — API / snippet proof slide */
.code-slide { justify-content: flex-start; }
.code-slide .lead { margin-bottom: 8px; }
.code-window {
  margin-top: 24px;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) * 0.9);
  overflow: hidden;
  background: color-mix(in srgb, var(--text) 92%, var(--bg));
  box-shadow: 0 18px 48px color-mix(in srgb, var(--text) 12%, transparent);
}
.code-chrome {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: color-mix(in srgb, var(--text) 88%, var(--bg));
  border-bottom: 1px solid color-mix(in srgb, var(--text) 78%, var(--bg));
  flex-shrink: 0;
}
.code-dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: inline-block;
}
.code-dot-red { background: #ff5f57; }
.code-dot-amber { background: #ffbd2e; }
.code-dot-green { background: #28ca41; }
.code-filename {
  margin-left: 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: color-mix(in srgb, #fff 55%, transparent);
}
.code-block {
  margin: 0;
  padding: 22px 26px 28px;
  overflow: auto;
  flex: 1;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: clamp(13px, 1.15vw, 15.5px);
  line-height: 1.65;
  color: #e8eaed;
  white-space: pre;
  tab-size: 2;
}
.code-block code {
  font: inherit;
  color: inherit;
  background: none;
  padding: 0;
  border: 0;
}

/* section divider */
.section-slide { justify-content: center; }
.section-number {
  font-family: var(--heading-font);
  font-weight: var(--heading-weight);
  font-size: clamp(60px, 9vw, 140px);
  color: color-mix(in srgb, var(--accent) 60%, var(--text));
  line-height: 0.9;
}
.section-slide h2 { font-size: clamp(32px, 4vw, 56px); margin-top: 8px; }

/* closing / CTA */
.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
  align-items: center;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 0;
  padding: 14px 26px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-weight: 600;
  width: fit-content;
  text-decoration: none;
  border: 3px solid transparent;
}
.btn-outline {
  background: transparent;
  color: var(--text);
  border-color: var(--text);
}
.btn-ghost {
  background: color-mix(in srgb, var(--text) 12%, transparent);
  color: var(--text);
  border-color: transparent;
}
.closing-slide > .btn { margin-top: 28px; }

/* streak-grid — Pulse-style filled day cells */
.streak-grid-slide { justify-content: flex-start; }
.streak-grid-slide .lead {
  max-width: 36ch;
  margin-bottom: clamp(16px, 2vw, 28px);
}
.streak-boxes {
  display: grid;
  grid-template-columns: repeat(var(--streak-cols, 10), minmax(0, 1fr));
  gap: 8px;
  max-width: min(580px, 100%);
  color: var(--accent);
}
.streak-box {
  aspect-ratio: 1;
  border-radius: 6px;
  background: currentColor;
  opacity: 0.9;
}
.streak-box.dim { opacity: 0.15; }
.streak-box.mid { opacity: 0.45; }
.streak-caption {
  margin-top: clamp(16px, 2vw, 28px);
  color: var(--muted);
  max-width: 40ch;
  font-size: clamp(14px, 1.4vw, 18px);
}

/* metric-ring — circular KPI badge / arc */
.metric-ring-slide { justify-content: flex-start; }
.pct-wrap {
  margin-top: clamp(20px, 2.5vw, 40px);
  display: flex;
  align-items: flex-end;
  gap: clamp(24px, 4vw, 60px);
  flex-wrap: wrap;
}
.pct-ring {
  width: clamp(160px, 28vw, 280px);
  height: clamp(160px, 28vw, 280px);
  border-radius: 50%;
  border: clamp(10px, 2vw, 20px) solid currentColor;
  color: var(--text);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
}
.pct-ring-arc {
  border-color: transparent;
}
.pct-ring-arc .pct-ring-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.pct-ring-center {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pct-num {
  font-family: var(--heading-font);
  font-weight: 800;
  font-size: clamp(44px, 7vw, 88px);
  line-height: 0.9;
  letter-spacing: -0.04em;
}
.pct-label {
  font-family: var(--body-font);
  font-weight: 700;
  font-size: clamp(9px, 1vw, 13px);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-top: 6px;
}
.pct-desc {
  max-width: 28ch;
  flex: 1;
  min-width: min(240px, 100%);
}
.pct-desc .lead { margin-top: 0; }
.pct-body {
  margin-top: 12px;
  color: var(--muted);
  font-size: clamp(14px, 1.4vw, 18px);
}

/* Entrance motion — applied when the deck loads; disabled under reduced-motion */
.slide {
  animation: pmd-fade-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.slide:nth-child(1) { animation-delay: 0ms; }
.slide:nth-child(2) { animation-delay: 40ms; }
.slide:nth-child(3) { animation-delay: 80ms; }
.slide:nth-child(n+4) { animation-delay: 100ms; }

@keyframes pmd-fade-up {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

.nav-hint {
  position: fixed;
  right: 20px;
  bottom: 62px;
  z-index: 40;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 8px 12px;
  backdrop-filter: blur(8px);
  pointer-events: none;
  opacity: 0.85;
}

/* Exported-HTML Present chrome (Studio Present parity: laser/ink/overview + B/W/notes/timer).
   Hidden until the inline script marks html.pmd-live-present — keeps Studio's
   sandboxed (no-scripts) preview free of dead controls. */
.pmd-curtain,
.pmd-notes-rail,
.pmd-present-bar,
.pmd-present-help,
.pmd-stage-tools,
.pmd-overview,
.pmd-filmstrip,
.pmd-slide-dots,
.pmd-progress,
.pmd-edit-hotzone,
.pmd-edit-toggle {
  display: none;
}
html.pmd-live-present .pmd-curtain,
html.pmd-live-present .pmd-notes-rail,
html.pmd-live-present .pmd-present-bar,
html.pmd-live-present .pmd-present-help,
html.pmd-live-present .pmd-stage-tools,
html.pmd-live-present .pmd-overview,
html.pmd-live-present .pmd-slide-dots,
html.pmd-live-present .pmd-progress,
html.pmd-live-present .pmd-edit-hotzone,
html.pmd-live-present .pmd-edit-toggle {
  display: flex;
}
html.pmd-live-present .pmd-notes-rail { display: flex; }
html.pmd-live-present .pmd-present-bar { display: flex; }
html.pmd-live-present .pmd-stage-tools { display: block; }
html.pmd-live-present .pmd-overview { display: flex; }
html.pmd-live-present .pmd-slide-dots { display: flex; }
html.pmd-live-present .pmd-progress { display: block; }
html.pmd-live-present .pmd-edit-hotzone { display: block; }
html.pmd-live-present .pmd-edit-toggle { display: none; }
html.pmd-live-present .pmd-edit-toggle.is-visible,
html.pmd-live-present .pmd-edit-toggle.is-active { display: inline-flex; }

.pmd-edit-hotzone {
  position: fixed;
  top: 0;
  left: 0;
  width: 72px;
  height: 72px;
  z-index: 57;
  cursor: pointer;
}
.pmd-edit-toggle {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 58;
  appearance: none;
  border: 1px solid rgba(232, 238, 244, 0.22);
  background: rgba(11, 18, 32, 0.92);
  color: #e8eef4;
  border-radius: 8px;
  padding: 6px 12px;
  font: 600 12px/1.2 ui-sans-serif, system-ui, sans-serif;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  align-items: center;
}
.pmd-edit-toggle.is-active {
  border-color: #ef4444;
  color: #fecaca;
}
html.pmd-edit-on [contenteditable="true"] {
  outline: 1px dashed rgba(239, 68, 68, 0.45);
  outline-offset: 2px;
  cursor: text;
}
html.pmd-edit-on [contenteditable="true"]:focus {
  outline: 2px solid rgba(239, 68, 68, 0.75);
}

.pmd-progress {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 3px;
  z-index: 56;
  background: rgba(11, 18, 32, 0.25);
  pointer-events: none;
}
.pmd-progress-bar {
  display: block;
  height: 100%;
  width: 0%;
  background: #ef4444;
  transition: width 0.2s ease;
}
.pmd-slide-dots {
  position: fixed;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 52;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 8px 6px;
  border-radius: 999px;
  background: rgba(11, 18, 32, 0.55);
  backdrop-filter: blur(8px);
}
html.pmd-notes-open .pmd-slide-dots {
  right: calc(min(340px, 34vw) + 14px);
}
.pmd-slide-dots[hidden] { display: none !important; }
.pmd-slide-dot {
  appearance: none;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid rgba(232, 238, 244, 0.45);
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.pmd-slide-dot:hover { background: rgba(232, 238, 244, 0.35); }
.pmd-slide-dot.is-active {
  background: #ef4444;
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.25);
}

.pmd-stage-tools {
  position: fixed;
  inset: 0;
  bottom: 48px;
  z-index: 45;
  pointer-events: none;
}
html.pmd-notes-open .pmd-stage-tools {
  right: min(340px, 34vw);
}
.pmd-stage-tools.is-laser,
.pmd-stage-tools.is-ink {
  pointer-events: auto;
}
.pmd-stage-tools.is-laser { cursor: none; }
.pmd-stage-tools.is-ink { cursor: crosshair; }
.pmd-ink-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  pointer-events: none;
  touch-action: none;
}
.pmd-ink-canvas.is-active {
  pointer-events: auto;
  cursor: crosshair;
}
.pmd-laser-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  cursor: none;
  pointer-events: auto;
}
.pmd-laser-layer[hidden] { display: none !important; }
.pmd-laser-dot {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fecaca 0%, #ef4444 45%, rgba(220, 38, 38, 0.15) 70%, transparent 75%);
  box-shadow: 0 0 10px 3px rgba(239, 68, 68, 0.55), 0 0 22px 8px rgba(239, 68, 68, 0.25);
  pointer-events: none;
  will-change: left, top, opacity, transform;
}
.pmd-laser-dot.is-tip {
  width: 22px;
  height: 22px;
  box-shadow: 0 0 12px 4px rgba(239, 68, 68, 0.7), 0 0 28px 10px rgba(239, 68, 68, 0.3);
}

.pmd-curtain {
  position: fixed;
  inset: 0;
  z-index: 60;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
}
.pmd-curtain[hidden] { display: none !important; }
.pmd-blackout { background: #000; }
.pmd-whiteout { background: #fff; }
.pmd-curtain-hint {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 16px;
  color: #6b7280;
}
.pmd-whiteout .pmd-curtain-hint { color: #9ca3af; }

.pmd-notes-rail {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 48px;
  width: min(340px, 34vw);
  z-index: 50;
  background: #111827;
  color: #e8eef4;
  border-left: 1px solid rgba(232, 238, 244, 0.12);
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
  flex-direction: column;
}
.pmd-notes-rail[hidden] { display: none !important; }
.pmd-notes-section {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 18px 16px 12px;
}
.pmd-notes-label {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7280;
  margin-bottom: 10px;
}
.pmd-notes-body {
  font-size: 15px;
  line-height: 1.55;
  white-space: pre-wrap;
  margin: 0;
}
.pmd-notes-body.is-empty { color: #6b7280; font-size: 13px; }
.pmd-notes-next {
  flex: 0 0 auto;
  border-top: 1px solid rgba(232, 238, 244, 0.12);
  padding: 12px 16px 16px;
}
.pmd-next-frame-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
  background: #0b1220;
  border: 1px solid rgba(232, 238, 244, 0.14);
  container-type: inline-size;
}
.pmd-notes-next.is-end .pmd-next-frame-wrap {
  aspect-ratio: auto;
  min-height: 0;
  border: 0;
  background: transparent;
  padding: 0;
}
.pmd-next-scale {
  position: absolute;
  inset: 0 auto auto 0;
  width: 1280px;
  height: 720px;
  transform-origin: top left;
  transform: scale(0.25);
  pointer-events: none;
}
@supports (width: 1cqw) {
  .pmd-next-scale { transform: scale(calc(100cqw / 1280)); }
}
.pmd-next-scale .slide {
  width: 1280px !important;
  height: 720px !important;
  min-height: 720px !important;
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  scroll-snap-align: none !important;
}
html.pmd-notes-open .nav-hint { right: calc(min(340px, 34vw) + 16px); }

.pmd-overview {
  position: fixed;
  inset: 0;
  z-index: 68;
  background: rgba(11, 18, 32, 0.92);
  align-items: stretch;
  justify-content: center;
  padding: 20px 20px 64px;
}
.pmd-overview[hidden] { display: none !important; }
.pmd-overview-panel {
  width: min(1100px, 100%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
}
.pmd-overview-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #9ca3af;
}
.pmd-overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
  overflow-y: auto;
  padding-bottom: 8px;
}
.pmd-overview-card {
  appearance: none;
  border: 1px solid rgba(232, 238, 244, 0.14);
  background: #0b1220;
  color: #e8eef4;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pmd-overview-card:hover,
.pmd-overview-card:focus-visible {
  border-color: rgba(239, 68, 68, 0.55);
  outline: none;
}
.pmd-overview-card.is-active {
  border-color: #ef4444;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.35);
}
.pmd-overview-frame-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 6px;
  overflow: hidden;
  background: #111827;
  container-type: inline-size;
}
.pmd-overview-scale {
  position: absolute;
  inset: 0 auto auto 0;
  width: 1280px;
  height: 720px;
  transform-origin: top left;
  transform: scale(0.25);
  pointer-events: none;
}
@supports (width: 1cqw) {
  .pmd-overview-scale { transform: scale(calc(100cqw / 1280)); }
}
.pmd-overview-scale .slide {
  width: 1280px !important;
  height: 720px !important;
  min-height: 720px !important;
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  scroll-snap-align: none !important;
}
.pmd-overview-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 48px;
  color: #6b7280;
}
.pmd-overview-label {
  font-size: 12px;
  line-height: 1.35;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pmd-overview-label strong {
  color: #e8eef4;
  margin-right: 6px;
}

/* Present filmstrip peek (F) — densified horizontal jump strip above the bar. */
.pmd-filmstrip {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 48px;
  z-index: 54;
  display: none;
  padding: 8px 12px 4px;
  background: #0b1220;
  border-top: 1px solid rgba(232, 238, 244, 0.12);
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}
html.pmd-live-present.pmd-strip-open .pmd-filmstrip { display: block; }
.pmd-filmstrip[hidden] { display: none !important; }
.pmd-filmstrip-track {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 8px;
  width: max-content;
  min-height: 72px;
  align-items: flex-start;
}
.pmd-filmstrip-hit {
  appearance: none;
  position: relative;
  flex: 0 0 auto;
  width: calc(64px * 16 / 9);
  height: 64px;
  padding: 0;
  margin: 0;
  border: 2px solid rgba(232, 238, 244, 0.18);
  border-radius: 8px;
  background: #111827;
  cursor: pointer;
  overflow: hidden;
}
.pmd-filmstrip-hit:hover,
.pmd-filmstrip-hit:focus-visible {
  border-color: color-mix(in srgb, var(--accent, #38bdf8) 55%, rgba(232, 238, 244, 0.4));
  outline: none;
}
.pmd-filmstrip-hit.is-active {
  border-color: var(--accent, #38bdf8);
  box-shadow: 0 0 0 1px var(--accent, #38bdf8);
}
.pmd-filmstrip-frame-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
  container-type: size;
}
.pmd-filmstrip-scale {
  width: 1280px;
  height: 720px;
  transform: scale(calc(64 / 720));
  transform-origin: top left;
  pointer-events: none;
}
@supports (width: 1cqw) {
  .pmd-filmstrip-scale { transform: scale(calc(100cqh / 720)); }
}
.pmd-filmstrip-scale .slide {
  width: 1280px !important;
  min-height: 720px !important;
  height: 720px !important;
  margin: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
.pmd-filmstrip-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #9ca3af;
  font: 600 18px/1 ui-sans-serif, system-ui, sans-serif;
}
.pmd-filmstrip-num {
  position: absolute;
  left: 4px;
  bottom: 4px;
  z-index: 1;
  font: 600 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  padding: 2px 5px;
  border-radius: 4px;
  background: rgba(11, 18, 32, 0.82);
  color: #e8eef4;
}
.pmd-filmstrip-hit.is-active .pmd-filmstrip-num {
  background: var(--accent, #38bdf8);
  color: #0b1220;
}
html.pmd-strip-open .pmd-notes-rail {
  bottom: calc(48px + 84px);
}
html.pmd-strip-open .pmd-stage-tools {
  bottom: calc(48px + 84px);
}
@media (max-width: 720px) {
  .pmd-filmstrip { display: none !important; }
  html.pmd-strip-open .pmd-notes-rail { bottom: 48px; }
  html.pmd-strip-open .pmd-stage-tools { bottom: 48px; }
}

.pmd-present-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 55;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  padding: 8px 14px;
  background: rgba(11, 18, 32, 0.92);
  color: #e8eef4;
  border-top: 1px solid rgba(232, 238, 244, 0.12);
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
}
.pmd-present-count { min-width: 64px; font-variant-numeric: tabular-nums; }
.pmd-present-timer {
  min-width: 72px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  cursor: default;
}
.pmd-present-timer.is-paused { color: #f59e0b; }
.pmd-present-timer.is-ahead { color: #2dd4bf; }
.pmd-present-timer.is-behind { color: #fb7185; }
.pmd-present-timer.is-over { color: #f87171; font-weight: 600; }
.pmd-present-btn {
  appearance: none;
  border: 1px solid rgba(232, 238, 244, 0.18);
  background: transparent;
  color: inherit;
  border-radius: 6px;
  padding: 4px 10px;
  font: inherit;
  cursor: pointer;
}
.pmd-present-btn:hover { background: rgba(232, 238, 244, 0.08); }

.pmd-present-help {
  position: fixed;
  inset: 0;
  z-index: 70;
  background: rgba(11, 18, 32, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.pmd-present-help[hidden] { display: none !important; }
.pmd-present-help-card {
  width: min(440px, 100%);
  background: #111827;
  color: #e8eef4;
  border: 1px solid rgba(232, 238, 244, 0.14);
  border-radius: 12px;
  padding: 16px 18px 18px;
}
.pmd-present-help-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #9ca3af;
}
.pmd-present-help-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}
.pmd-present-help-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
}
.pmd-present-help-list kbd {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid rgba(232, 238, 244, 0.18);
  background: rgba(232, 238, 244, 0.06);
  white-space: nowrap;
}

html.pmd-shot-mode .nav-hint,
html.pmd-shot-mode .pmd-present-bar,
html.pmd-shot-mode .pmd-notes-rail,
html.pmd-shot-mode .pmd-curtain,
html.pmd-shot-mode .pmd-present-help,
html.pmd-shot-mode .pmd-stage-tools,
html.pmd-shot-mode .pmd-overview,
html.pmd-shot-mode .pmd-filmstrip,
html.pmd-shot-mode .pmd-slide-dots,
html.pmd-shot-mode .pmd-progress,
html.pmd-shot-mode .pmd-edit-hotzone,
html.pmd-shot-mode .pmd-edit-toggle {
  display: none !important;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .slide,
  .image-hero-bg img,
  .image-hero-content { animation: none !important; }
  .image-hero-bg img { transform: none; }
}

@media print {
  @page {
    size: 1920px 1080px;
    margin: 0;
  }
  body { padding: 0; gap: 0; }
  .slide {
    box-shadow: none;
    border-radius: 0;
    page-break-after: always;
    width: 100vw;
    animation: none !important;
  }
  .nav-hint,
  .pmd-present-bar,
  .pmd-notes-rail,
  .pmd-curtain,
  .pmd-present-help,
  .pmd-stage-tools,
  .pmd-overview,
  .pmd-filmstrip,
  .pmd-slide-dots,
  .pmd-progress,
  .pmd-edit-hotzone,
  .pmd-edit-toggle { display: none !important; }
}
`,N=`/* Per-theme surface profiles — each theme gets a distinct stage, not one shared blob. */

.deck[data-surface] .slide {
  background: var(--slide-bg, radial-gradient(125% 125% at 0% 0%, var(--bg-2), var(--bg)));
}

.deck[data-surface] .slide::after,
.deck[data-surface] .slide::before {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: 0;
}

.deck[data-surface] .slide > * { position: relative; z-index: 1; }

/* ── default fallback ── */
.deck[data-surface="gradient"] .slide::after {
  width: 520px;
  height: 520px;
  right: -160px;
  top: -160px;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 45%, transparent), transparent);
  filter: blur(8px);
}

/* ── neon-glow (default-tech) ── */
.deck[data-surface="neon-glow"] .slide {
  --slide-bg: radial-gradient(ellipse 120% 80% at 10% 0%, color-mix(in srgb, var(--accent) 22%, var(--bg)), var(--bg));
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.deck[data-surface="neon-glow"] .slide::after {
  width: 640px;
  height: 640px;
  right: -220px;
  top: -200px;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 55%, transparent), transparent);
  filter: blur(12px);
}
.deck[data-surface="neon-glow"] .slide h1 {
  text-shadow: 0 0 40px color-mix(in srgb, var(--accent) 35%, transparent);
}
/* Content slides: keep glow off the reading plane */
.deck[data-surface="neon-glow"] .slide:not(.title-slide):not(.closing-slide)::after {
  opacity: 0.45;
  width: 420px;
  height: 420px;
  right: -180px;
  top: -160px;
}
.deck[data-surface="neon-glow"] .comparison-col:last-child {
  /* Darken violet fill so white winner copy clears WCAG AA (accent-on-bg labels fail) */
  background: color-mix(in srgb, var(--accent) 72%, #050508);
  color: #fff;
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
  box-shadow: 0 0 32px color-mix(in srgb, var(--accent) 28%, transparent);
}
.deck[data-surface="neon-glow"] .comparison-col:last-child .comparison-label,
.deck[data-surface="neon-glow"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="neon-glow"] .stat .value {
  text-shadow: 0 0 24px color-mix(in srgb, var(--accent) 40%, transparent);
}
.deck[data-surface="neon-glow"] .code-window {
  border-color: color-mix(in srgb, var(--accent2) 35%, var(--border));
  box-shadow: 0 20px 56px rgba(0, 0, 0, 0.45), 0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent);
}
.deck[data-surface="neon-glow"] .cols-aside {
  background: color-mix(in srgb, var(--accent) 16%, var(--card-bg));
  border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
  box-shadow: inset 0 0 40px color-mix(in srgb, var(--accent) 12%, transparent);
}
.deck[data-surface="neon-glow"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 72%, #050508);
  color: #fff;
  border-color: color-mix(in srgb, var(--accent) 50%, var(--border));
  box-shadow: 0 0 40px color-mix(in srgb, var(--accent) 28%, transparent);
}
.deck[data-surface="neon-glow"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="neon-glow"] .grid.cols-bento .card:first-child p,
.deck[data-surface="neon-glow"] .grid.cols-bento .card:first-child i { color: #fff; }

/* ── scanline-neon (retro-arcade) ── */
.deck[data-surface="scanline-neon"] .slide {
  --slide-bg: linear-gradient(180deg, var(--bg-2), var(--bg));
}
.deck[data-surface="scanline-neon"] .slide::before {
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.18) 2px,
    rgba(0, 0, 0, 0.18) 4px
  );
  opacity: 0.35;
}
.deck[data-surface="scanline-neon"] .slide::after {
  width: 100%;
  height: 3px;
  left: 0;
  top: 0;
  right: auto;
  background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent));
  filter: drop-shadow(0 0 12px var(--accent));
}
.deck[data-surface="scanline-neon"] .slide h1,
.deck[data-surface="scanline-neon"] .slide h2 {
  text-shadow: 0 0 20px color-mix(in srgb, var(--accent) 60%, transparent);
}

/* ── warm-paper (claude) ── */
.deck[data-surface="warm-paper"] .slide {
  --slide-bg: linear-gradient(165deg, var(--bg) 0%, color-mix(in srgb, var(--bg2) 80%, var(--bg)) 100%);
  box-shadow: 0 20px 50px rgba(20, 20, 19, 0.08);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
}
/* Soft fiber grain — quiet paper, not noise wallpaper */
.deck[data-surface="warm-paper"] .slide::before {
  inset: 0;
  opacity: 0.18;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(20, 20, 19, 0.06) 0.5px, transparent 1px),
    radial-gradient(circle at 70% 60%, rgba(20, 20, 19, 0.045) 0.45px, transparent 0.95px),
    radial-gradient(circle at 40% 85%, rgba(20, 20, 19, 0.05) 0.5px, transparent 1px);
  background-size: 8px 8px, 10px 10px, 7px 7px;
  background-position: 0 0, 4px 3px, 2px 5px;
  mix-blend-mode: multiply;
}
.deck[data-surface="warm-paper"] .slide::after {
  width: 280px;
  height: 280px;
  left: -80px;
  bottom: -80px;
  top: auto;
  right: auto;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 18%, transparent), transparent);
}
.deck[data-surface="warm-paper"] .slide:not(.title-slide):not(.closing-slide)::after {
  opacity: 0.55;
  width: 200px;
  height: 200px;
}
.deck[data-surface="warm-paper"] .cols-aside {
  background: color-mix(in srgb, var(--accent) 8%, #fff);
  border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
}
.deck[data-surface="warm-paper"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent) 6%, #fff);
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
}
.deck[data-surface="warm-paper"] .stat {
  border-top: 1px solid color-mix(in srgb, var(--accent) 55%, var(--border));
}

/* ── clean-light (corporate) ── */
.deck[data-surface="clean-light"] .slide {
  --slide-bg: linear-gradient(180deg, #ffffff 0%, color-mix(in srgb, var(--bg2) 40%, #fff) 100%);
  box-shadow: 0 16px 48px rgba(26, 32, 53, 0.08);
}
.deck[data-surface="clean-light"] .slide::after {
  width: 6px;
  height: 72px;
  left: 48px;
  top: 48px;
  right: auto;
  background: var(--accent);
  border-radius: 3px;
  filter: none;
}

/* ── soft-bento (playful) ── */
.deck[data-surface="soft-bento"] .slide {
  --slide-bg: radial-gradient(circle at 90% 10%, color-mix(in srgb, var(--accent2) 25%, var(--bg)), var(--bg));
}
.deck[data-surface="soft-bento"] .slide::after {
  width: 120px;
  height: 120px;
  right: 48px;
  bottom: 48px;
  top: auto;
  border-radius: 28px;
  background: color-mix(in srgb, var(--accent) 20%, transparent);
  transform: rotate(12deg);
  filter: none;
}
.deck[data-surface="soft-bento"] .card {
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

/* ── quiet-luxe (luxury-minimalist) — nocturnal ultra-luxury ── */
.deck[data-surface="quiet-luxe"] .slide {
  --slide-bg: var(--bg);
  box-shadow: none;
  border: 1px solid var(--border);
}
.deck[data-surface="quiet-luxe"] .slide::after {
  display: none;
}
.deck[data-surface="quiet-luxe"] .slide h1 {
  letter-spacing: -0.02em;
  font-weight: 300;
}
.deck[data-surface="quiet-luxe"] .slide.title-slide,
.deck[data-surface="quiet-luxe"] .slide.closing-slide {
  border-color: transparent;
}
.deck[data-surface="quiet-luxe"] .slide.title-slide::before,
.deck[data-surface="quiet-luxe"] .slide.closing-slide::before {
  content: "";
  position: absolute;
  left: 64px;
  top: 48%;
  width: 48px;
  height: 1px;
  background: var(--accent);
  opacity: 0.75;
}

/* ── editorial-rule (editorial-serif) ── */
.deck[data-surface="editorial-rule"] .slide {
  --slide-bg: var(--bg);
}

/* Quiet paper grain — soft fiber tooth (HTML-only) */
.deck[data-surface="editorial-rule"] .slide {
  background-image:
    radial-gradient(circle at 25% 20%, rgba(28, 26, 23, 0.035) 0.4px, transparent 0.9px),
    radial-gradient(circle at 75% 55%, rgba(28, 26, 23, 0.03) 0.35px, transparent 0.85px),
    radial-gradient(circle at 50% 90%, rgba(28, 26, 23, 0.028) 0.4px, transparent 0.9px),
    var(--slide-bg, var(--bg));
  background-size: 5px 5px, 7px 7px, 6px 6px, auto;
  background-position: 0 0, 2px 3px, 1px 4px, 0 0;
}
.deck[data-surface="editorial-rule"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 4px;
  background: var(--accent);
}
.deck[data-surface="editorial-rule"] .slide::after {
  width: 48px;
  height: 48px;
  right: 64px;
  top: 64px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  background: transparent;
  filter: none;
}

/* ── brutalist-grid (brutalist-mono) ── */
.deck[data-surface="brutalist-grid"] .slide {
  --slide-bg: var(--bg);
  border: 3px solid var(--text);
  border-radius: 0;
  box-shadow: 8px 8px 0 var(--text);
}
.deck[data-surface="brutalist-grid"] .slide::before {
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--border) 60%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--border) 60%, transparent) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.4;
}
.deck[data-surface="brutalist-grid"] .slide::after {
  display: none;
}

/* ── pastel-cloud (pastel-dreamy) ── */
.deck[data-surface="pastel-cloud"] .slide {
  --slide-bg: radial-gradient(ellipse 80% 60% at 20% 20%, color-mix(in srgb, var(--accent2) 30%, var(--bg)), var(--bg));
}
.deck[data-surface="pastel-cloud"] .slide::after {
  width: 200px;
  height: 200px;
  left: 60%;
  top: 10%;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 25%, transparent), transparent);
  filter: blur(20px);
}

/* ── aurora-glass ── */
.deck[data-surface="aurora-glass"] .slide {
  --slide-bg: radial-gradient(ellipse 90% 70% at 80% 10%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 55%),
              radial-gradient(ellipse 70% 60% at 10% 90%, color-mix(in srgb, var(--accent2) 22%, transparent), transparent 50%),
              var(--bg);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.deck[data-surface="aurora-glass"] .slide::after {
  width: 420px;
  height: 420px;
  right: -120px;
  top: -140px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 40%, transparent), transparent 70%);
  filter: blur(28px);
}
.deck[data-surface="aurora-glass"] .card {
  backdrop-filter: blur(8px);
  background: color-mix(in srgb, var(--card-bg) 80%, transparent);
}

/* ── broadsheet-rule (ft-editorial) ── */
.deck[data-surface="broadsheet-rule"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

/* Quiet paper grain — soft fiber tooth (HTML-only) */
.deck[data-surface="broadsheet-rule"] .slide {
  background-image:
    radial-gradient(circle at 25% 20%, rgba(26, 18, 8, 0.032) 0.4px, transparent 0.9px),
    radial-gradient(circle at 75% 55%, rgba(26, 18, 8, 0.028) 0.35px, transparent 0.85px),
    radial-gradient(circle at 50% 90%, rgba(26, 18, 8, 0.026) 0.4px, transparent 0.9px),
    var(--slide-bg, var(--bg));
  background-size: 5px 5px, 7px 7px, 6px 6px, auto;
  background-position: 0 0, 2px 3px, 1px 4px, 0 0;
}
.deck[data-surface="broadsheet-rule"] .slide::before {
  left: 0;
  right: 0;
  top: 0;
  height: 28px;
  background: var(--text);
}
.deck[data-surface="broadsheet-rule"] .slide::after {
  left: 64px;
  right: 64px;
  top: auto;
  bottom: 48px;
  height: 2px;
  width: auto;
  background: var(--text);
  filter: none;
}

/* ── hard-bento (genz-bento) ── */
.deck[data-surface="hard-bento"] .slide {
  --slide-bg: var(--bg);
  border: 3px solid var(--text);
  box-shadow: 10px 10px 0 var(--text);
}
.deck[data-surface="hard-bento"] .slide::after {
  width: 140px;
  height: 140px;
  right: -30px;
  top: -30px;
  border-radius: 50%;
  background: var(--accent2);
  opacity: 0.55;
  filter: none;
}
.deck[data-surface="hard-bento"] .card {
  border: 2.5px solid var(--text);
  box-shadow: 4px 4px 0 var(--text);
  border-radius: 14px;
}

/* ── crt-phosphor (crt-terminal) ── */
.deck[data-surface="crt-phosphor"] .slide {
  --slide-bg: radial-gradient(ellipse 100% 80% at 50% 40%, #0a1808, var(--bg));
  border-radius: 0;
  box-shadow: inset 0 0 80px rgba(57, 255, 20, 0.08), 0 0 40px rgba(0, 245, 255, 0.12);
}
.deck[data-surface="crt-phosphor"] .slide::before {
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    rgba(0, 0, 0, 0.28) 1px,
    rgba(0, 0, 0, 0.28) 3px
  );
  opacity: 0.45;
}
.deck[data-surface="crt-phosphor"] .slide::after {
  display: none;
}
.deck[data-surface="crt-phosphor"] .slide h1,
.deck[data-surface="crt-phosphor"] .slide h2 {
  text-shadow: 0 0 14px color-mix(in srgb, var(--accent) 65%, transparent),
    0 0 32px color-mix(in srgb, var(--accent2) 35%, transparent);
}
.deck[data-surface="crt-phosphor"] .eyebrow,
.deck[data-surface="crt-phosphor"] .comparison-label {
  color: var(--accent);
}

/* ── swiss-grid (swiss-typographic) ── */
.deck[data-surface="swiss-grid"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid var(--border);
  box-shadow: none;
}
.deck[data-surface="swiss-grid"] .slide::before {
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--border) 70%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--border) 70%, transparent) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: 0.55;
}
.deck[data-surface="swiss-grid"] .slide::after {
  width: 8px;
  height: 100%;
  left: 0;
  top: 0;
  right: auto;
  background: var(--accent);
  filter: none;
}

/* ── candy-blob (candy-pop) ── */
.deck[data-surface="candy-blob"] .slide {
  --slide-bg: radial-gradient(circle at 12% 18%, color-mix(in srgb, var(--accent) 22%, var(--bg)), var(--bg) 42%),
              radial-gradient(circle at 88% 78%, color-mix(in srgb, var(--accent2) 35%, var(--bg)), var(--bg) 48%);
  border: 3px solid var(--text);
  box-shadow: 0 18px 0 color-mix(in srgb, var(--accent) 35%, transparent);
  overflow: hidden;
}
.deck[data-surface="candy-blob"] .slide::after {
  width: 180px;
  height: 180px;
  right: 48px;
  top: 40px;
  border-radius: 50%;
  background: var(--accent2);
  opacity: 0.55;
  filter: none;
  border: 3px solid var(--text);
}
/* Gallery marquee ticker — yellow strip on cover/closing (brand from data-marquee) */
@keyframes candy-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.deck[data-surface="candy-blob"] .title-slide,
.deck[data-surface="candy-blob"] .closing-slide {
  padding-bottom: 56px;
}
.deck[data-surface="candy-blob"] .title-slide::before,
.deck[data-surface="candy-blob"] .closing-slide::before {
  /* Injected by renderer via data-marquee from meta.company / meta.title */
  content: attr(data-marquee);
  position: absolute;
  left: 0;
  right: auto;
  bottom: 0;
  top: auto;
  width: max-content;
  min-width: 200%;
  height: auto;
  padding: 10px 0;
  background: #ffe566;
  border-top: 3px solid var(--text);
  border-bottom: 3px solid var(--text);
  color: var(--text);
  font-family: var(--heading-font);
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  white-space: nowrap;
  z-index: 2;
  pointer-events: none;
  opacity: 1;
  filter: none;
  border-radius: 0;
  animation: candy-marquee 22s linear infinite;
}
.deck[data-surface="candy-blob"] .title-slide:not([data-marquee])::before,
.deck[data-surface="candy-blob"] .closing-slide:not([data-marquee])::before {
  content: "★ SAVE TOGETHER  ·  WIN TOGETHER  ·  CANDY POP  ·  ★ SAVE TOGETHER  ·  WIN TOGETHER  ·  CANDY POP  ·  ★ SAVE TOGETHER  ·  WIN TOGETHER  ·  CANDY POP  ·  ★ SAVE TOGETHER  ·  WIN TOGETHER  ·  CANDY POP  ·  ";
}
.deck[data-surface="candy-blob"] .card {
  border: 2.5px solid var(--text);
  border-radius: 22px;
}

/* ── hud-grid (aerospace-hud) ── */
.deck[data-surface="hud-grid"] .slide {
  --slide-bg: linear-gradient(180deg, var(--bg-2), var(--bg));
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  box-shadow: 0 0 40px color-mix(in srgb, var(--accent) 18%, transparent),
    inset 0 0 60px rgba(0, 0, 0, 0.25);
}
.deck[data-surface="hud-grid"] .slide::before {
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
}
.deck[data-surface="hud-grid"] .slide::after {
  width: 56px;
  height: 56px;
  right: 40px;
  top: 40px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  background: transparent;
  box-shadow: inset 0 0 0 6px color-mix(in srgb, var(--accent) 25%, transparent);
  filter: none;
}
.deck[data-surface="hud-grid"] .slide h1 {
  text-shadow: 0 0 24px color-mix(in srgb, var(--accent) 40%, transparent);
}

/* ── acid-block (brutalist-acid) ── */
.deck[data-surface="acid-block"] .slide {
  --slide-bg: var(--bg);
  border: 3px solid var(--accent);
  border-radius: 0;
  box-shadow: 10px 10px 0 var(--accent);
}
.deck[data-surface="acid-block"] .slide::before {
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent) 12%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 12%, transparent) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.5;
}
.deck[data-surface="acid-block"] .slide::after {
  width: 72px;
  height: 72px;
  right: 40px;
  top: 40px;
  background: var(--accent);
  filter: none;
}
.deck[data-surface="acid-block"] .card {
  border: 2px solid var(--accent);
  border-radius: 0;
}

/* ── bauhaus-blocks ── */
.deck[data-surface="bauhaus-blocks"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 2px solid var(--text);
}
.deck[data-surface="bauhaus-blocks"] .slide::before {
  width: 96px;
  height: 96px;
  right: 64px;
  top: 56px;
  background: var(--accent);
  filter: none;
}
.deck[data-surface="bauhaus-blocks"] .slide::after {
  width: 96px;
  height: 96px;
  right: 120px;
  top: 112px;
  border-radius: 50%;
  background: var(--accent2);
  filter: none;
  opacity: 0.9;
}

/* ── aero-bubble (y2k-aero) ── */
.deck[data-surface="aero-bubble"] .slide {
  --slide-bg: linear-gradient(160deg, #ffffff 0%, var(--bg) 45%, color-mix(in srgb, var(--accent) 18%, var(--bg)) 100%);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  box-shadow: 0 24px 60px color-mix(in srgb, var(--accent) 18%, transparent);
}
.deck[data-surface="aero-bubble"] .slide::after {
  width: 220px;
  height: 220px;
  right: -40px;
  top: -60px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff, color-mix(in srgb, var(--accent2) 55%, transparent));
  filter: blur(2px);
  opacity: 0.7;
}
.deck[data-surface="aero-bubble"] .slide::before {
  width: 140px;
  height: 140px;
  left: 8%;
  bottom: 10%;
  top: auto;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff, color-mix(in srgb, var(--accent) 50%, transparent));
  opacity: 0.55;
}

/* ── riso-print (risograph-zine) ── */
.deck[data-surface="riso-print"] .slide {
  --slide-bg: var(--bg);
  border: 2px solid var(--text);
  box-shadow: 6px 6px 0 color-mix(in srgb, var(--accent) 55%, transparent);
  overflow: hidden;
}
.deck[data-surface="riso-print"] .slide::before {
  width: 55%;
  height: 55%;
  right: -4%;
  top: -6%;
  border-radius: 40% 55% 45% 50%;
  background: color-mix(in srgb, var(--accent) 22%, transparent);
  mix-blend-mode: multiply;
  filter: none;
  opacity: 1;
}
.deck[data-surface="riso-print"] .slide::after {
  width: 42%;
  height: 48%;
  left: -3%;
  bottom: -5%;
  top: auto;
  right: auto;
  border-radius: 50% 40% 55% 45%;
  background: color-mix(in srgb, var(--accent2) 24%, transparent);
  mix-blend-mode: multiply;
  filter: none;
  opacity: 1;
}
/* Hero/closing: stronger overprint + slight misregistration */
.deck[data-surface="riso-print"] .title-slide::before,
.deck[data-surface="riso-print"] .closing-slide::before {
  width: 62%;
  height: 62%;
  background: color-mix(in srgb, var(--accent) 28%, transparent);
  transform: translate(6px, 4px);
}
.deck[data-surface="riso-print"] .title-slide::after,
.deck[data-surface="riso-print"] .closing-slide::after {
  width: 48%;
  height: 52%;
  background: color-mix(in srgb, var(--accent2) 30%, transparent);
  transform: translate(-4px, -3px);
}

/* ── neon-rain (neon-noir) ── */
.deck[data-surface="neon-rain"] .slide {
  --slide-bg: linear-gradient(180deg, #12121f 0%, var(--bg) 55%, #050508 100%);
  box-shadow: 0 0 50px color-mix(in srgb, var(--accent) 25%, transparent),
    inset 0 -40px 80px color-mix(in srgb, var(--accent2) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent2) 30%, transparent);
}
.deck[data-surface="neon-rain"] .slide::before {
  inset: 0;
  background: repeating-linear-gradient(
    100deg,
    transparent,
    transparent 6px,
    rgba(255, 255, 255, 0.015) 6px,
    rgba(255, 255, 255, 0.015) 7px
  );
  opacity: 0.7;
}
.deck[data-surface="neon-rain"] .slide::after {
  width: 480px;
  height: 480px;
  right: -160px;
  top: -120px;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--accent) 45%, transparent), transparent);
  filter: blur(10px);
}
.deck[data-surface="neon-rain"] .slide h1 {
  text-shadow: 0 0 18px color-mix(in srgb, var(--accent) 55%, transparent),
    0 0 40px color-mix(in srgb, var(--accent2) 35%, transparent);
}

/* ── vapor-horizon (vaporwave) ── */
.deck[data-surface="vapor-horizon"] .slide {
  --slide-bg: linear-gradient(180deg, var(--bg-2) 0%, var(--bg) 48%, #3a1048 100%);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="vapor-horizon"] .slide::before {
  left: 0;
  right: 0;
  bottom: 0;
  top: auto;
  height: 42%;
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent2) 35%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent2) 35%, transparent) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.45;
  transform: perspective(400px) rotateX(55deg);
  transform-origin: bottom center;
}
.deck[data-surface="vapor-horizon"] .slide::after {
  width: 100%;
  height: 3px;
  left: 0;
  top: 48%;
  right: auto;
  background: linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent);
  filter: drop-shadow(0 0 10px var(--accent));
}
.deck[data-surface="vapor-horizon"] .slide h1 {
  text-shadow: 2px 0 color-mix(in srgb, var(--accent2) 50%, transparent),
    -2px 0 color-mix(in srgb, var(--accent) 50%, transparent);
}

/* ── botanical-leaf (botanical-luxe) ── */
.deck[data-surface="botanical-leaf"] .slide {
  --slide-bg: radial-gradient(ellipse 90% 70% at 100% 0%, color-mix(in srgb, var(--accent2) 18%, var(--bg)), var(--bg));
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}
.deck[data-surface="botanical-leaf"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}
.deck[data-surface="botanical-leaf"] .slide::after {
  width: 120px;
  height: 120px;
  right: 56px;
  bottom: 48px;
  top: auto;
  border: 1px solid var(--accent);
  border-radius: 50% 0 50% 50%;
  background: transparent;
  transform: rotate(-25deg);
  filter: none;
  opacity: 0.55;
}
.deck[data-surface="botanical-leaf"] .slide h1 {
  font-style: italic;
}

/* ── heritage-wash (heritage-editorial) ── */
.deck[data-surface="heritage-wash"] .slide {
  --slide-bg: linear-gradient(165deg, var(--bg) 0%, var(--bg-2) 100%);
  box-shadow: 0 18px 50px rgba(22, 19, 15, 0.08);
}

/* Quiet paper grain — soft fiber tooth (HTML-only) */
.deck[data-surface="heritage-wash"] .slide {
  background-image:
    radial-gradient(circle at 25% 20%, rgba(22, 19, 15, 0.038) 0.4px, transparent 0.9px),
    radial-gradient(circle at 75% 55%, rgba(22, 19, 15, 0.032) 0.35px, transparent 0.85px),
    radial-gradient(circle at 50% 90%, rgba(22, 19, 15, 0.03) 0.4px, transparent 0.9px),
    var(--slide-bg, var(--bg));
  background-size: 5px 5px, 7px 7px, 6px 6px, auto;
  background-position: 0 0, 2px 3px, 1px 4px, 0 0;
}
.deck[data-surface="heritage-wash"] .slide::before {
  left: 64px;
  right: 64px;
  top: 52px;
  height: 1px;
  background: color-mix(in srgb, var(--accent) 55%, transparent);
}
.deck[data-surface="heritage-wash"] .slide::after {
  width: 72px;
  height: 1px;
  right: 64px;
  bottom: 52px;
  top: auto;
  background: var(--accent);
  filter: none;
}

/* ── fintech-soft ── */
.deck[data-surface="fintech-soft"] .slide {
  --slide-bg: radial-gradient(ellipse 80% 60% at 100% 0%, color-mix(in srgb, var(--accent) 10%, var(--bg)), var(--bg));
  border: 1px solid var(--border);
  box-shadow: 0 16px 48px rgba(15, 23, 42, 0.06);
}
.deck[data-surface="fintech-soft"] .slide::after {
  width: 280px;
  height: 280px;
  right: -80px;
  top: -100px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent2) 22%, transparent), transparent 70%);
  filter: blur(12px);
}
.deck[data-surface="fintech-soft"] .card {
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  border-radius: 12px;
}

/* ── dev-terminal (developer-dark) ── */
.deck[data-surface="dev-terminal"] .slide {
  --slide-bg: var(--bg);
  border: 1px solid var(--border);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
}
.deck[data-surface="dev-terminal"] .slide::before {
  left: 0;
  right: 0;
  top: 0;
  height: 28px;
  background: var(--bg-2);
  border-bottom: 1px solid var(--border);
}
.deck[data-surface="dev-terminal"] .slide::after {
  width: 8px;
  height: 8px;
  left: 16px;
  top: 10px;
  right: auto;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 14px 0 0 #d29922, 28px 0 0 #f85149;
  filter: none;
}

/* ── data-rule (data-editorial) ── */
.deck[data-surface="data-rule"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid var(--border);
}
.deck[data-surface="data-rule"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 3px;
  background: var(--accent);
}
.deck[data-surface="data-rule"] .slide::after {
  width: 3px;
  height: 48px;
  left: 64px;
  top: 48px;
  right: auto;
  background: var(--accent2);
  filter: none;
}

/* ── hygge-soft (scandinavian) ── */
.deck[data-surface="hygge-soft"] .slide {
  --slide-bg: radial-gradient(ellipse 70% 50% at 20% 10%, color-mix(in srgb, var(--accent) 18%, var(--bg)), var(--bg));
  box-shadow: 0 18px 40px rgba(43, 41, 38, 0.08);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
}
.deck[data-surface="hygge-soft"] .slide::after {
  width: 160px;
  height: 160px;
  right: 48px;
  bottom: 40px;
  top: auto;
  border-radius: 50%;
  background: color-mix(in srgb, var(--accent2) 22%, transparent);
  filter: blur(8px);
}

/* ── deco-fan (art-deco) ── */
.deck[data-surface="deco-fan"] .slide {
  --slide-bg: radial-gradient(ellipse 100% 80% at 50% 0%, var(--bg-2), var(--bg));
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  border-radius: 0;
}
.deck[data-surface="deco-fan"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
}
.deck[data-surface="deco-fan"] .slide::after {
  width: 56px;
  height: 56px;
  left: 50%;
  top: 36px;
  right: auto;
  margin-left: -28px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  background: transparent;
  filter: none;
}
.deck[data-surface="deco-fan"] .slide h1 {
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* ── wrapped-block (kinetic-wrapped) ── */
.deck[data-surface="wrapped-block"] .slide {
  --slide-bg: var(--bg);
  border: 4px solid var(--accent);
  border-radius: 0;
  box-shadow: 12px 12px 0 var(--accent);
}
.deck[data-surface="wrapped-block"] .slide::after {
  width: 120px;
  height: 120px;
  right: -20px;
  top: -20px;
  background: var(--accent);
  filter: none;
}
.deck[data-surface="wrapped-block"] .slide h1 {
  text-transform: uppercase;
  letter-spacing: -0.03em;
}
/* Pulse craft: lime-field cover + closing (acid on black elsewhere) */
.deck[data-surface="wrapped-block"] .title-slide,
.deck[data-surface="wrapped-block"] .closing-slide {
  --slide-bg: var(--accent);
  color: #0a0a0a;
  border-color: #0a0a0a;
  box-shadow: 12px 12px 0 #0a0a0a;
}
.deck[data-surface="wrapped-block"] .title-slide::after,
.deck[data-surface="wrapped-block"] .closing-slide::after {
  background: #0a0a0a;
}
.deck[data-surface="wrapped-block"] .title-slide h1,
.deck[data-surface="wrapped-block"] .closing-slide h1,
.deck[data-surface="wrapped-block"] .title-slide .lead,
.deck[data-surface="wrapped-block"] .closing-slide .lead,
.deck[data-surface="wrapped-block"] .title-slide .subtitle,
.deck[data-surface="wrapped-block"] .closing-slide .subtitle,
.deck[data-surface="wrapped-block"] .title-slide .eyebrow,
.deck[data-surface="wrapped-block"] .closing-slide .eyebrow,
.deck[data-surface="wrapped-block"] .title-slide > p,
.deck[data-surface="wrapped-block"] .closing-slide > p {
  color: #0a0a0a;
}

/* ── blueprint-grid ── */
.deck[data-surface="blueprint-grid"] .slide {
  --slide-bg: var(--bg);
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
}
.deck[data-surface="blueprint-grid"] .slide::before {
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent) 22%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 22%, transparent) 1px, transparent 1px);
  background-size: 32px 32px;
  opacity: 0.45;
}
.deck[data-surface="blueprint-grid"] .slide::after {
  width: 64px;
  height: 64px;
  right: 40px;
  top: 40px;
  border: 1px solid var(--accent);
  background: transparent;
  filter: none;
}
.deck[data-surface="blueprint-grid"] .slide h1 {
  text-shadow: 0 0 20px color-mix(in srgb, var(--accent) 35%, transparent);
}


/* ── glass-mist (glassmorphism) ── */
.deck[data-surface="glass-mist"] .slide {
  --slide-bg: radial-gradient(ellipse 90% 70% at 10% 0%, color-mix(in srgb, var(--accent) 12%, var(--bg)), var(--bg));
  border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
  box-shadow: 0 24px 60px rgba(15, 19, 51, 0.08);
}
.deck[data-surface="glass-mist"] .slide::after {
  width: 320px;
  height: 320px;
  right: -100px;
  top: -80px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent2) 28%, transparent), transparent 70%);
  filter: blur(18px);
}
.deck[data-surface="glass-mist"] .card {
  backdrop-filter: blur(10px);
  background: color-mix(in srgb, var(--card-bg) 85%, transparent);
  border: 1px solid rgba(255,255,255,0.65);
  box-shadow: 0 8px 28px rgba(15, 19, 51, 0.06);
}

/* ── newsprint-masthead (broadsheet) ── */
.deck[data-surface="newsprint-masthead"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 25%, transparent);
  box-shadow: 0 12px 36px rgba(26, 18, 8, 0.1);
}
/* Newsprint tooth — very quiet fiber, keeps ink readable */
.deck[data-surface="newsprint-masthead"] .slide {
  background-image:
    radial-gradient(circle at 25% 20%, rgba(26, 18, 8, 0.035) 0.4px, transparent 0.9px),
    radial-gradient(circle at 75% 55%, rgba(26, 18, 8, 0.03) 0.35px, transparent 0.85px),
    radial-gradient(circle at 50% 90%, rgba(26, 18, 8, 0.028) 0.4px, transparent 0.9px),
    var(--slide-bg, var(--bg));
  background-size: 5px 5px, 7px 7px, 6px 6px, auto;
  background-position: 0 0, 2px 3px, 1px 4px, 0 0;
}
.deck[data-surface="newsprint-masthead"] .slide::before {
  left: 0;
  right: 0;
  top: 0;
  height: 36px;
  background: var(--text);
}
.deck[data-surface="newsprint-masthead"] .slide::after {
  left: 64px;
  right: 64px;
  top: auto;
  bottom: 48px;
  height: 2px;
  width: auto;
  background: var(--text);
  filter: none;
}
.deck[data-surface="newsprint-masthead"] .eyebrow {
  color: var(--muted);
  letter-spacing: 0.18em;
}



/* ── soft-editorial-paper (soft-editorial) ── */
.deck[data-surface="soft-editorial-paper"] .slide {
  --slide-bg: radial-gradient(ellipse 80% 60% at 100% 0%, color-mix(in srgb, var(--accent) 18%, var(--bg)), var(--bg));
  border-radius: 28px;
  box-shadow: 0 18px 48px rgba(42, 36, 27, 0.1);
  position: relative;
  isolation: isolate;
}
/* Quiet paper grain — soft fiber texture, not loud noise */
.deck[data-surface="soft-editorial-paper"] .slide::before {
  content: "";
  inset: 0;
  border-radius: inherit;
  opacity: 0.22;
  pointer-events: none;
  z-index: 0;
  background-image:
    radial-gradient(circle at 18% 22%, rgba(42, 36, 27, 0.07) 0.6px, transparent 1.1px),
    radial-gradient(circle at 72% 38%, rgba(42, 36, 27, 0.05) 0.5px, transparent 1px),
    radial-gradient(circle at 44% 78%, rgba(42, 36, 27, 0.06) 0.55px, transparent 1.05px),
    radial-gradient(circle at 88% 64%, rgba(183, 199, 168, 0.12) 0.7px, transparent 1.2px),
    radial-gradient(circle at 12% 88%, rgba(225, 164, 194, 0.1) 0.55px, transparent 1.05px);
  background-size: 7px 7px, 9px 9px, 6px 6px, 11px 11px, 8px 8px;
  background-position: 0 0, 3px 5px, 1px 2px, 4px 1px, 2px 6px;
  mix-blend-mode: multiply;
}
.deck[data-surface="soft-editorial-paper"] .slide::after {
  width: 160px;
  height: 160px;
  right: 40px;
  top: 36px;
  border-radius: 28px;
  background: color-mix(in srgb, var(--accent2) 55%, transparent);
  filter: none;
  opacity: 0.75;
  z-index: 0;
}
.deck[data-surface="soft-editorial-paper"] .card {
  background: rgba(255,255,255,0.82);
  border-radius: 24px;
  border: 1px solid color-mix(in srgb, var(--text) 16%, transparent);
}
.deck[data-surface="soft-editorial-paper"] .card p,
.deck[data-surface="soft-editorial-paper"] .lead,
.deck[data-surface="soft-editorial-paper"] .eyebrow,
.deck[data-surface="soft-editorial-paper"] .stat .label {
  color: #4A4338;
}
.deck[data-surface="soft-editorial-paper"] .slide h1 {
  font-style: italic;
  font-weight: 500;
}

/* ── editorial-forest-paper (editorial-forest) ── */
.deck[data-surface="editorial-forest-paper"] .slide {
  --slide-bg: var(--bg);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  box-shadow: 0 16px 40px rgba(26, 26, 23, 0.08);
}

/* Quiet paper grain — soft fiber tooth (HTML-only) */
.deck[data-surface="editorial-forest-paper"] .slide {
  background-image:
    radial-gradient(circle at 25% 20%, rgba(26, 26, 23, 0.036) 0.4px, transparent 0.9px),
    radial-gradient(circle at 75% 55%, rgba(26, 26, 23, 0.03) 0.35px, transparent 0.85px),
    radial-gradient(circle at 50% 90%, rgba(26, 26, 23, 0.028) 0.4px, transparent 0.9px),
    var(--slide-bg, var(--bg));
  background-size: 5px 5px, 7px 7px, 6px 6px, auto;
  background-position: 0 0, 2px 3px, 1px 4px, 0 0;
}
.deck[data-surface="editorial-forest-paper"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 2px;
  background: var(--accent);
}
.deck[data-surface="editorial-forest-paper"] .slide::after {
  width: 72px;
  height: 72px;
  right: 56px;
  bottom: 48px;
  top: auto;
  border-radius: 50%;
  background: color-mix(in srgb, var(--accent2) 70%, transparent);
  filter: none;
  opacity: 0.85;
}

/* ── pin-paper-pad (pin-and-paper) ── */
.deck[data-surface="pin-paper-pad"] .slide {
  --slide-bg: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 27px,
    rgba(31, 58, 138, 0.12) 27px,
    rgba(31, 58, 138, 0.12) 28px
  ), var(--bg);
  border: 1px solid color-mix(in srgb, var(--text) 25%, transparent);
  box-shadow: 0 14px 36px rgba(14, 20, 48, 0.12);
}

/* Quiet paper grain — soft fiber tooth (HTML-only) */
.deck[data-surface="pin-paper-pad"] .slide {
  background-image:
    radial-gradient(circle at 25% 20%, rgba(14, 20, 48, 0.028) 0.4px, transparent 0.9px),
    radial-gradient(circle at 75% 55%, rgba(14, 20, 48, 0.024) 0.35px, transparent 0.85px),
    radial-gradient(circle at 50% 90%, rgba(14, 20, 48, 0.022) 0.4px, transparent 0.9px),
    var(--slide-bg, var(--bg));
  background-size: 5px 5px, 7px 7px, 6px 6px, auto;
  background-position: 0 0, 2px 3px, 1px 4px, 0 0;
}
.deck[data-surface="pin-paper-pad"] .slide::before {
  left: 72px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: color-mix(in srgb, var(--accent) 55%, transparent);
}
.deck[data-surface="pin-paper-pad"] .slide::after {
  width: 18px;
  height: 18px;
  right: 48px;
  top: 40px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ddd, #666 55%, #222 70%);
  box-shadow: 0 2px 0 rgba(0,0,0,0.25);
  filter: none;
}
.deck[data-surface="pin-paper-pad"] .card {
  background: var(--card-bg);
  border: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
  box-shadow: 2px 3px 0 rgba(31, 58, 138, 0.12);
}

/* ── vellum-colorfield (vellum) ── */
.deck[data-surface="vellum-colorfield"] .slide {
  --slide-bg: radial-gradient(ellipse 90% 70% at 50% 40%, var(--bg-2), var(--bg));
  border-radius: 0;
  box-shadow: none;
}

/* Quiet vellum tooth — soft fiber on the colorfield (HTML-only) */
.deck[data-surface="vellum-colorfield"] .slide::before {
  inset: 0;
  opacity: 0.2;
  background-image:
    radial-gradient(circle at 22% 28%, rgba(42, 56, 112, 0.07) 0.5px, transparent 1px),
    radial-gradient(circle at 68% 52%, rgba(42, 56, 112, 0.05) 0.45px, transparent 0.95px),
    radial-gradient(circle at 48% 82%, rgba(232, 216, 92, 0.08) 0.55px, transparent 1.05px);
  background-size: 8px 8px, 10px 10px, 7px 7px;
  background-position: 0 0, 4px 3px, 2px 5px;
  mix-blend-mode: multiply;
}
.deck[data-surface="vellum-colorfield"] .slide::after {
  display: none;
}
.deck[data-surface="vellum-colorfield"] .slide h1,
.deck[data-surface="vellum-colorfield"] .slide h2 {
  font-style: italic;
  font-weight: 400;
  color: var(--accent);
}
.deck[data-surface="vellum-colorfield"] .eyebrow,
.deck[data-surface="vellum-colorfield"] .comparison-label {
  font-family: 'Courier Prime', ui-monospace, monospace;
  color: color-mix(in srgb, var(--accent) 70%, transparent);
  letter-spacing: 0.08em;
}

/* ── neo-grid-panels (neo-grid-bold) ── */
.deck[data-surface="neo-grid-panels"] .slide {
  --slide-bg: var(--bg);
  border: 3px solid var(--text);
  border-radius: 0;
  box-shadow: 8px 8px 0 var(--accent);
}
.deck[data-surface="neo-grid-panels"] .slide::before {
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--text) 10%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--text) 10%, transparent) 1px, transparent 1px);
  background-size: 80px 80px;
  opacity: 0.55;
}
.deck[data-surface="neo-grid-panels"] .slide::after {
  width: 96px;
  height: 96px;
  right: 40px;
  top: 40px;
  background: var(--accent);
  filter: none;
}
.deck[data-surface="neo-grid-panels"] .slide h1 {
  text-transform: uppercase;
  letter-spacing: -0.02em;
}
.deck[data-surface="neo-grid-panels"] .card {
  border: 2px solid var(--text);
  border-radius: 0;
  background: var(--card-bg);
}

/* ── tri-tone-blocks (editorial-tri-tone) ── */
.deck[data-surface="tri-tone-blocks"] .slide {
  --slide-bg: linear-gradient(135deg, var(--bg) 0%, var(--bg) 55%, var(--bg-2) 55%, var(--bg-2) 100%);
  border-radius: 0;
  border: 3px solid var(--text);
}
.deck[data-surface="tri-tone-blocks"] .slide::after {
  width: 28%;
  height: 100%;
  right: 0;
  top: 0;
  background: var(--text);
  filter: none;
  opacity: 0.12;
}
.deck[data-surface="tri-tone-blocks"] .slide h1 {
  letter-spacing: -0.04em;
  font-weight: 800;
}
.deck[data-surface="tri-tone-blocks"] .card {
  background: var(--bg-2);
  border: 2px solid var(--text);
  border-radius: 0;
}

/* ── creative-mode-blocks (creative-mode) ── */
.deck[data-surface="creative-mode-blocks"] .slide {
  --slide-bg: var(--bg);
  border: 4px solid var(--text);
  border-radius: 0;
  box-shadow: 10px 10px 0 var(--text);
}
.deck[data-surface="creative-mode-blocks"] .slide::before {
  width: 120px;
  height: 120px;
  right: 48px;
  top: 40px;
  background: var(--accent2);
  filter: none;
}
.deck[data-surface="creative-mode-blocks"] .slide::after {
  width: 72px;
  height: 72px;
  right: 140px;
  top: 120px;
  background: var(--accent);
  filter: none;
}
.deck[data-surface="creative-mode-blocks"] .slide h1 {
  text-transform: uppercase;
  letter-spacing: -0.01em;
}
.deck[data-surface="creative-mode-blocks"] .card {
  border: 3px solid var(--text);
  border-radius: 0;
  box-shadow: 4px 4px 0 var(--text);
}

/* ── broadside-fire (broadside) ── */
.deck[data-surface="broadside-fire"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid var(--border);
}
.deck[data-surface="broadside-fire"] .slide::before {
  left: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  background: var(--accent);
}
.deck[data-surface="broadside-fire"] .slide::after {
  width: 140px;
  height: 140px;
  right: -20px;
  bottom: -20px;
  top: auto;
  background: var(--accent);
  filter: none;
  opacity: 0.95;
}
.deck[data-surface="broadside-fire"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.03em;
  text-transform: lowercase;
}

/* ── bold-signal-card (bold-signal) ── */
.deck[data-surface="bold-signal-card"] .slide {
  --slide-bg: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  border-radius: 16px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.45);
}
/* Orange focal panel — title/closing only; content slides need full width */
.deck[data-surface="bold-signal-card"] .title-slide::after,
.deck[data-surface="bold-signal-card"] .closing-slide::after {
  width: 42%;
  height: 58%;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 18px;
  background: var(--accent);
  filter: none;
  opacity: 0.95;
}
.deck[data-surface="bold-signal-card"] .slide:not(.title-slide):not(.closing-slide)::after {
  display: none;
}
.deck[data-surface="bold-signal-card"] .slide h1 {
  font-weight: 400;
  letter-spacing: -0.02em;
}
.deck[data-surface="bold-signal-card"] .card {
  /* Match roles.cardBg (#43251b) — orange cardBg broke muted/PPTX dual-surface */
  background: color-mix(in srgb, var(--accent) 18%, #1a1a1a);
  color: #ffffff;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
}
.deck[data-surface="bold-signal-card"] .card i,
.deck[data-surface="bold-signal-card"] .card h3 { color: #ffffff; }
.deck[data-surface="bold-signal-card"] .card p,
.deck[data-surface="bold-signal-card"] .card .lead { color: rgba(255,255,255,0.90); }
.deck[data-surface="bold-signal-card"] .eyebrow,
.deck[data-surface="bold-signal-card"] .stat .label { color: #c8c8c8; }
.deck[data-surface="bold-signal-card"] .comparison-col:last-child {
  /* Orange accent fails white at full strength — keep darkened mix */
  background: color-mix(in srgb, var(--accent) 55%, #1a1a1a);
  color: #fff;
}
.deck[data-surface="bold-signal-card"] .comparison-col:last-child .comparison-label,
.deck[data-surface="bold-signal-card"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="bold-signal-card"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 55%, #1a1a1a);
  color: #fff;
  border-color: color-mix(in srgb, var(--accent) 45%, transparent);
}
.deck[data-surface="bold-signal-card"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="bold-signal-card"] .grid.cols-bento .card:first-child p,
.deck[data-surface="bold-signal-card"] .grid.cols-bento .card:first-child i { color: #fff; }
.deck[data-surface="bold-signal-card"] .stat {
  border-top-color: var(--accent);
}

/* ── notebook-tabs-page (notebook-tabs) ── */
.deck[data-surface="notebook-tabs-page"] .slide {
  --slide-bg: var(--bg);
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.28), 0 0 0 18px #2d2d2d;
  border: 1px solid color-mix(in srgb, var(--text) 10%, transparent);
}

/* Quiet paper grain — soft fiber tooth (HTML-only) */
.deck[data-surface="notebook-tabs-page"] .slide {
  background-image:
    radial-gradient(circle at 25% 20%, rgba(45, 42, 38, 0.032) 0.4px, transparent 0.9px),
    radial-gradient(circle at 75% 55%, rgba(45, 42, 38, 0.028) 0.35px, transparent 0.85px),
    radial-gradient(circle at 50% 90%, rgba(45, 42, 38, 0.024) 0.4px, transparent 0.9px),
    var(--slide-bg, var(--bg));
  background-size: 5px 5px, 7px 7px, 6px 6px, auto;
  background-position: 0 0, 2px 3px, 1px 4px, 0 0;
}
.deck[data-surface="notebook-tabs-page"] .slide::before {
  width: 14px;
  height: 72%;
  right: -7px;
  top: 14%;
  background: linear-gradient(
    180deg,
    #98d4bb 0% 18%,
    #c7b8ea 18% 36%,
    #f4b8c5 36% 54%,
    #a8d8ea 54% 72%,
    #ffe6a7 72% 100%
  );
  border-radius: 0 6px 6px 0;
  filter: none;
}
.deck[data-surface="notebook-tabs-page"] .slide::after {
  width: 10px;
  height: 10px;
  left: 28px;
  top: 36px;
  border-radius: 50%;
  background: #d0ccc4;
  box-shadow: 0 48px 0 #d0ccc4, 0 96px 0 #d0ccc4, 0 144px 0 #d0ccc4;
  filter: none;
}

/* ── creative-voltage-split (creative-voltage) ── */
.deck[data-surface="creative-voltage-split"] .slide {
  --slide-bg: #1a1a2e;
  border-radius: 0;
  border: 2px solid var(--accent);
  box-shadow: 8px 8px 0 var(--accent);
}
.deck[data-surface="creative-voltage-split"] .title-slide,
.deck[data-surface="creative-voltage-split"] .closing-slide {
  --slide-bg: linear-gradient(90deg, #0066ff 0 48%, #1a1a2e 48% 100%);
}
.deck[data-surface="creative-voltage-split"] .title-slide::after,
.deck[data-surface="creative-voltage-split"] .closing-slide::after {
  width: 88px;
  height: 88px;
  right: 48px;
  top: 40px;
  background: var(--accent);
  filter: none;
  border-radius: 50%;
}
.deck[data-surface="creative-voltage-split"] .slide:not(.title-slide):not(.closing-slide)::after {
  display: none;
}
.deck[data-surface="creative-voltage-split"] .slide h1 {
  text-shadow: 0 0 24px color-mix(in srgb, var(--accent) 45%, transparent);
}
.deck[data-surface="creative-voltage-split"] .card {
  background: #1a1a2e;
  border: 1px solid var(--accent);
  border-radius: 0;
}
.deck[data-surface="creative-voltage-split"] .card p,
.deck[data-surface="creative-voltage-split"] .card .lead { color: rgba(255,255,255,0.92); }
/* Pure white — translucent white fails AA on the electric blue half */
.deck[data-surface="creative-voltage-split"] .title-slide .lead,
.deck[data-surface="creative-voltage-split"] .closing-slide .lead,
.deck[data-surface="creative-voltage-split"] .title-slide .subtitle,
.deck[data-surface="creative-voltage-split"] .closing-slide .subtitle,
.deck[data-surface="creative-voltage-split"] .title-slide .eyebrow,
.deck[data-surface="creative-voltage-split"] .closing-slide .eyebrow {
  color: #ffffff;
}

/* ── signal-briefing (signal) ── */
.deck[data-surface="signal-briefing"] .slide {
  --slide-bg: linear-gradient(165deg, var(--bg) 0%, var(--bg-2) 100%);
  border: 1px solid var(--border);
  box-shadow: 0 18px 44px rgba(26, 32, 48, 0.08);
}
.deck[data-surface="signal-briefing"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 1px;
  background: var(--accent);
}
.deck[data-surface="signal-briefing"] .slide::after {
  width: 48px;
  height: 48px;
  right: 56px;
  bottom: 48px;
  top: auto;
  border: 1px solid var(--accent2);
  background: transparent;
  filter: none;
}
.deck[data-surface="signal-briefing"] .slide h1 em,
.deck[data-surface="signal-briefing"] .slide h1 i {
  color: var(--accent);
  font-style: italic;
}

/* ── electric-studio-split (electric-studio) ── */
.deck[data-surface="electric-studio-split"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
  box-shadow: 0 18px 48px rgba(10, 10, 10, 0.12);
}
/* Title/closing keep the white→blue split; content slides stay readable white */
.deck[data-surface="electric-studio-split"] .title-slide,
.deck[data-surface="electric-studio-split"] .closing-slide {
  --slide-bg: linear-gradient(180deg, var(--bg) 0 52%, var(--bg-2) 52% 100%);
}
.deck[data-surface="electric-studio-split"] .title-slide::before,
.deck[data-surface="electric-studio-split"] .closing-slide::before {
  left: 0;
  top: 52%;
  bottom: 0;
  width: 8px;
  background: #0a0a0a;
}
.deck[data-surface="electric-studio-split"] .slide:not(.title-slide):not(.closing-slide)::before {
  left: 0;
  top: 0;
  bottom: 0;
  width: 8px;
  background: var(--accent);
}
.deck[data-surface="electric-studio-split"] .slide::after {
  display: none;
}
.deck[data-surface="electric-studio-split"] .slide h1,
.deck[data-surface="electric-studio-split"] .slide h2 {
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0a0a0a;
  mix-blend-mode: normal;
}
.deck[data-surface="electric-studio-split"] .title-slide .lead,
.deck[data-surface="electric-studio-split"] .title-slide > p,
.deck[data-surface="electric-studio-split"] .title-slide .eyebrow,
.deck[data-surface="electric-studio-split"] .closing-slide .lead,
.deck[data-surface="electric-studio-split"] .closing-slide > p,
.deck[data-surface="electric-studio-split"] .closing-slide .eyebrow {
  color: #ffffff;
}
.deck[data-surface="electric-studio-split"] .slide:not(.title-slide):not(.closing-slide) .lead,
.deck[data-surface="electric-studio-split"] .slide:not(.title-slide):not(.closing-slide) .eyebrow,
.deck[data-surface="electric-studio-split"] .slide:not(.title-slide):not(.closing-slide) p {
  color: var(--muted);
}
.deck[data-surface="electric-studio-split"] .card {
  background: color-mix(in srgb, var(--accent) 8%, #ffffff);
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
}
.deck[data-surface="electric-studio-split"] .card p { color: var(--muted); }
.deck[data-surface="electric-studio-split"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent) 12%, #ffffff);
  color: #0a0a0a;
}
.deck[data-surface="electric-studio-split"] .comparison-col:last-child .comparison-label,
.deck[data-surface="electric-studio-split"] .comparison-col:last-child p { color: #0a0a0a; }
.deck[data-surface="electric-studio-split"] .quote {
  border-left-color: var(--accent);
  color: #0a0a0a;
}

/* ── dark-botanical-bloom (dark-botanical) ── */
.deck[data-surface="dark-botanical-bloom"] .slide {
  --slide-bg: radial-gradient(ellipse 55% 50% at 88% 12%, color-mix(in srgb, var(--accent2) 28%, transparent), transparent 60%),
    radial-gradient(ellipse 45% 40% at 78% 28%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%),
    var(--bg);
  border-radius: 0;
  box-shadow: 0 20px 50px rgba(0,0,0,0.45);
}
.deck[data-surface="dark-botanical-bloom"] .slide::before {
  left: 48px;
  top: 64px;
  bottom: 64px;
  width: 1px;
  background: color-mix(in srgb, var(--accent) 55%, transparent);
}
.deck[data-surface="dark-botanical-bloom"] .slide::after {
  width: 180px;
  height: 180px;
  right: 36px;
  top: 28px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--accent2) 45%, transparent), transparent 70%);
  filter: blur(2px);
  opacity: 0.9;
}
.deck[data-surface="dark-botanical-bloom"] .slide h1 {
  font-weight: 400;
  font-style: italic;
}
.deck[data-surface="dark-botanical-bloom"] .card {
  background: rgba(232,228,223,0.06);
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
  border-radius: 0;
}

/* ── pastel-geometry-pills (pastel-geometry) ── */
.deck[data-surface="pastel-geometry-pills"] .slide {
  --slide-bg: var(--card-bg);
  border-radius: 24px;
  box-shadow:
    0 0 0 22px var(--bg),
    0 18px 44px rgba(60, 90, 120, 0.18);
  border: 1px solid color-mix(in srgb, var(--text) 8%, transparent);
}
.deck[data-surface="pastel-geometry-pills"] .slide::after {
  width: 18px;
  height: 72%;
  right: -31px;
  top: 14%;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    #f0b4d4 0% 16%,
    #a8d4c4 16% 34%,
    #5a7c6a 34% 55%,
    #9b8dc4 55% 74%,
    #7c6aad 74% 100%
  );
  filter: none;
  opacity: 0.95;
}
.deck[data-surface="pastel-geometry-pills"] .slide h1 {
  font-weight: 800;
  letter-spacing: -0.03em;
}
.deck[data-surface="pastel-geometry-pills"] .card {
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid color-mix(in srgb, var(--text) 8%, transparent);
}

/* ── split-pastel-panels (split-pastel) ── */
.deck[data-surface="split-pastel-panels"] .slide {
  --slide-bg: var(--bg);
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(80, 60, 90, 0.12);
}
.deck[data-surface="split-pastel-panels"] .title-slide,
.deck[data-surface="split-pastel-panels"] .closing-slide {
  --slide-bg: linear-gradient(90deg, var(--bg) 0 50%, var(--bg-2) 50% 100%);
}
.deck[data-surface="split-pastel-panels"] .title-slide::before,
.deck[data-surface="split-pastel-panels"] .closing-slide::before {
  width: 42%;
  height: 42%;
  right: 8%;
  top: 12%;
  background-image:
    linear-gradient(color-mix(in srgb, var(--text) 8%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--text) 8%, transparent) 1px, transparent 1px);
  background-size: 28px 28px;
  filter: none;
  opacity: 0.55;
  border-radius: 16px;
}
.deck[data-surface="split-pastel-panels"] .slide:not(.title-slide):not(.closing-slide)::before {
  display: none;
}
.deck[data-surface="split-pastel-panels"] .title-slide::after,
.deck[data-surface="split-pastel-panels"] .closing-slide::after {
  width: 72px;
  height: 28px;
  right: 48px;
  bottom: 48px;
  top: auto;
  border-radius: 999px;
  background: var(--accent);
  filter: none;
  box-shadow: 0 -40px 0 var(--accent2), 0 -80px 0 #f0f0c8;
}
.deck[data-surface="split-pastel-panels"] .slide:not(.title-slide):not(.closing-slide)::after {
  display: none;
}
.deck[data-surface="split-pastel-panels"] .slide h1 {
  font-weight: 800;
  letter-spacing: -0.03em;
}
.deck[data-surface="split-pastel-panels"] .card {
  background: rgba(255,255,255,0.7);
  border-radius: 18px;
  border: none;
}

/* ── vintage-editorial-geo (vintage-editorial) ── */
.deck[data-surface="vintage-editorial-geo"] .slide {
  --slide-bg: var(--bg);
  border-radius: 4px;
  border: 1.5px solid color-mix(in srgb, var(--text) 28%, transparent);
  box-shadow: 0 14px 36px rgba(26, 26, 26, 0.08);
}

/* Quiet paper grain — soft fiber tooth (HTML-only) */
.deck[data-surface="vintage-editorial-geo"] .slide {
  background-image:
    radial-gradient(circle at 25% 20%, rgba(26, 26, 26, 0.034) 0.4px, transparent 0.9px),
    radial-gradient(circle at 75% 55%, rgba(26, 26, 26, 0.028) 0.35px, transparent 0.85px),
    radial-gradient(circle at 50% 90%, rgba(26, 26, 26, 0.026) 0.4px, transparent 0.9px),
    var(--slide-bg, var(--bg));
  background-size: 5px 5px, 7px 7px, 6px 6px, auto;
  background-position: 0 0, 2px 3px, 1px 4px, 0 0;
}
.deck[data-surface="vintage-editorial-geo"] .slide::before {
  width: 120px;
  height: 120px;
  right: 56px;
  top: 48px;
  border-radius: 50%;
  border: 2px solid color-mix(in srgb, var(--text) 35%, transparent);
  background: transparent;
  filter: none;
}
.deck[data-surface="vintage-editorial-geo"] .slide::after {
  width: 10px;
  height: 10px;
  right: 108px;
  top: 100px;
  border-radius: 50%;
  background: var(--text);
  filter: none;
  box-shadow: 40px 36px 0 0 color-mix(in srgb, var(--accent) 90%, transparent);
}
.deck[data-surface="vintage-editorial-geo"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.02em;
}
.deck[data-surface="vintage-editorial-geo"] .card {
  background: #fff;
  border: none;
  border-left: 3px solid var(--text);
  border-radius: 0;
}

/* ── paper-ink-literary (paper-ink) ── */
.deck[data-surface="paper-ink-literary"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
  box-shadow: 0 12px 32px rgba(26, 18, 12, 0.08);
}

/* Quiet paper grain — soft fiber tooth (HTML-only) */
.deck[data-surface="paper-ink-literary"] .slide {
  background-image:
    radial-gradient(circle at 25% 20%, rgba(26, 18, 12, 0.038) 0.4px, transparent 0.9px),
    radial-gradient(circle at 75% 55%, rgba(26, 18, 12, 0.032) 0.35px, transparent 0.85px),
    radial-gradient(circle at 50% 90%, rgba(26, 18, 12, 0.03) 0.4px, transparent 0.9px),
    var(--slide-bg, var(--bg));
  background-size: 5px 5px, 7px 7px, 6px 6px, auto;
  background-position: 0 0, 2px 3px, 1px 4px, 0 0;
}
.deck[data-surface="paper-ink-literary"] .slide::before {
  left: 64px;
  right: 64px;
  top: 52px;
  height: 2px;
  background: var(--accent);
}
.deck[data-surface="paper-ink-literary"] .slide::after {
  left: 64px;
  right: 64px;
  top: auto;
  bottom: 52px;
  height: 1px;
  width: auto;
  background: color-mix(in srgb, var(--text) 35%, transparent);
  filter: none;
}
.deck[data-surface="paper-ink-literary"] .slide h1 {
  font-weight: 600;
  letter-spacing: -0.01em;
}
.deck[data-surface="paper-ink-literary"] .slide h1::first-letter {
  color: var(--accent);
  font-weight: 700;
}
.deck[data-surface="paper-ink-literary"] .card {
  background: #fff;
  border-left: 3px solid var(--accent);
  border-radius: 0;
}

/* ── biennale-yellow-sun (biennale-yellow) ── */
.deck[data-surface="biennale-yellow-sun"] .slide {
  --slide-bg: radial-gradient(ellipse 75% 65% at 85% 15%, color-mix(in srgb, var(--accent) 85%, transparent), transparent 62%),
    radial-gradient(ellipse 50% 45% at 70% 35%, color-mix(in srgb, #F8F39B 55%, transparent), transparent 70%),
    var(--bg);
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
}
.deck[data-surface="biennale-yellow-sun"] .slide::before {
  left: 64px;
  right: 64px;
  top: 48px;
  height: 1px;
  background: var(--text);
}
.deck[data-surface="biennale-yellow-sun"] .slide::after {
  display: none;
}
.deck[data-surface="biennale-yellow-sun"] .slide h1 {
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.018em;
}
.deck[data-surface="biennale-yellow-sun"] .card {
  background: transparent;
  border-top: 1px solid color-mix(in srgb, var(--text) 22%, transparent);
  border-radius: 0;
}

/* ── bold-poster-ink (bold-poster) ── */
.deck[data-surface="bold-poster-ink"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 2.5px solid var(--text);
  box-shadow: 8px 8px 0 color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="bold-poster-ink"] .slide::before {
  left: 0;
  right: 0;
  top: 0;
  height: 10px;
  background: var(--accent);
}
.deck[data-surface="bold-poster-ink"] .slide::after {
  width: 28%;
  height: 28%;
  right: 40px;
  bottom: 40px;
  top: auto;
  background: var(--bg-2);
  border: 2px solid var(--text);
  filter: none;
}
.deck[data-surface="bold-poster-ink"] .slide h1 {
  font-weight: 400;
  letter-spacing: 0.01em;
  color: var(--accent);
  text-shadow: 3px 3px 0 rgba(28,20,16,0.12);
}
.deck[data-surface="bold-poster-ink"] .card {
  background: var(--bg-2);
  border: 2px solid var(--text);
  border-radius: 0;
}

/* ── coral-hatch (coral) ── */
.deck[data-surface="coral-hatch"] .slide {
  --slide-bg:
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(26, 26, 26, 0.045) 10px,
      rgba(26, 26, 26, 0.045) 12px
    ),
    linear-gradient(135deg, var(--bg) 0 62%, var(--bg-2) 62% 100%);
  border-radius: 0;
  border: 3px solid var(--text);
}
.deck[data-surface="coral-hatch"] .slide::before {
  left: 0;
  top: 0;
  bottom: 0;
  width: 42%;
  background: color-mix(in srgb, var(--accent) 92%, transparent);
  opacity: 0.18;
  pointer-events: none;
}
.deck[data-surface="coral-hatch"] .slide::after {
  display: none;
}
.deck[data-surface="coral-hatch"] .slide h1 {
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 0.92;
}
.deck[data-surface="coral-hatch"] .card {
  background: #fff;
  border: 2px solid var(--text);
  border-radius: 0;
}

/* ── emerald-editorial-masthead (emerald-editorial) ── */
.deck[data-surface="emerald-editorial-masthead"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: none;
  box-shadow: inset 0 0 0 18px var(--bg), inset 0 0 0 20px color-mix(in srgb, var(--text) 75%, transparent);
}

/* Quiet paper grain — soft fiber tooth (HTML-only) */
.deck[data-surface="emerald-editorial-masthead"] .slide {
  background-image:
    radial-gradient(circle at 25% 20%, rgba(15, 26, 92, 0.03) 0.4px, transparent 0.9px),
    radial-gradient(circle at 75% 55%, rgba(15, 26, 92, 0.026) 0.35px, transparent 0.85px),
    radial-gradient(circle at 50% 90%, rgba(15, 26, 92, 0.024) 0.4px, transparent 0.9px),
    var(--slide-bg, var(--bg));
  background-size: 5px 5px, 7px 7px, 6px 6px, auto;
  background-position: 0 0, 2px 3px, 1px 4px, 0 0;
}
.deck[data-surface="emerald-editorial-masthead"] .slide::before {
  left: 12%;
  right: 12%;
  top: 14%;
  height: 3px;
  background: linear-gradient(
    180deg,
    var(--text) 0 1px,
    transparent 1px 2px,
    var(--text) 2px 3px
  );
}
.deck[data-surface="emerald-editorial-masthead"] .slide::after {
  left: 12%;
  right: 12%;
  bottom: 14%;
  top: auto;
  height: 3px;
  background: linear-gradient(
    180deg,
    var(--text) 0 1px,
    transparent 1px 2px,
    var(--text) 2px 3px
  );
  filter: none;
  opacity: 1;
  border-radius: 0;
}
.deck[data-surface="emerald-editorial-masthead"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 0.95;
}
.deck[data-surface="emerald-editorial-masthead"] .card {
  background: var(--card-bg);
  color: var(--text);
  border: 2px solid var(--text);
  border-radius: 0;
}
.deck[data-surface="emerald-editorial-masthead"] .card p,
.deck[data-surface="emerald-editorial-masthead"] .card .lead {
  color: color-mix(in srgb, var(--text) 78%, var(--card-bg));
}

/* ── sakura-chroma-cassette (sakura-chroma) ── */
.deck[data-surface="sakura-chroma-cassette"] .slide {
  --slide-bg:
    linear-gradient(135deg, #E5392A 0 8%, #E54489 8% 16%, #F09131 16% 24%, #3D9F47 24% 32%, #3F8BC4 32% 40%, #F0BC2A 40% 48%, transparent 48%),
    var(--bg);
  border-radius: 6px;
  border: 2px solid var(--text);
  box-shadow: 10px 10px 0 color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="sakura-chroma-cassette"] .title-slide::before,
.deck[data-surface="sakura-chroma-cassette"] .closing-slide::before {
  width: 72px;
  height: 72px;
  right: 48px;
  top: 40px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, #E54489 0 28%, transparent 29%),
    radial-gradient(circle at 70% 35%, #F09131 0 24%, transparent 25%),
    radial-gradient(circle at 50% 70%, #3F8BC4 0 26%, transparent 27%),
    radial-gradient(circle at 35% 65%, #3D9F47 0 22%, transparent 23%);
  filter: none;
  opacity: 0.95;
}
.deck[data-surface="sakura-chroma-cassette"] .slide:not(.title-slide):not(.closing-slide)::before {
  display: none;
}
.deck[data-surface="sakura-chroma-cassette"] .title-slide::after,
.deck[data-surface="sakura-chroma-cassette"] .closing-slide::after {
  width: 56px;
  height: 22px;
  left: 48px;
  bottom: 40px;
  top: auto;
  background: var(--accent);
  border: 2px solid var(--text);
  filter: none;
  border-radius: 2px;
}
.deck[data-surface="sakura-chroma-cassette"] .slide:not(.title-slide):not(.closing-slide)::after {
  display: none;
}
.deck[data-surface="sakura-chroma-cassette"] .slide:not(.title-slide):not(.closing-slide) {
  --slide-bg: var(--bg);
}
.deck[data-surface="sakura-chroma-cassette"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.025em;
  line-height: 0.88;
  text-transform: uppercase;
}
.deck[data-surface="sakura-chroma-cassette"] .card {
  background: var(--card-bg);
  border: 2px solid var(--text);
  border-radius: 4px;
}

/* ── pink-script-afterhours (pink-script) ── */
.deck[data-surface="pink-script-afterhours"] .slide {
  --slide-bg:
    radial-gradient(ellipse 70% 55% at 80% 15%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 60%),
    var(--bg);
  border-radius: 0;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 45%, transparent),
    inset 0 0 0 18px transparent,
    inset 0 0 0 19px rgba(245, 237, 241, 0.12);
}
.deck[data-surface="pink-script-afterhours"] .slide::before {
  left: 28px;
  right: 28px;
  top: 28px;
  bottom: 28px;
  width: auto;
  height: auto;
  border: 1px solid rgba(245, 237, 241, 0.14);
  background: transparent;
}
.deck[data-surface="pink-script-afterhours"] .slide::after {
  width: 120px;
  height: 3px;
  right: 56px;
  bottom: 56px;
  top: auto;
  background: var(--accent);
  filter: none;
  border-radius: 0;
}
.deck[data-surface="pink-script-afterhours"] .slide h1 {
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.02em;
  color: var(--accent);
}
.deck[data-surface="pink-script-afterhours"] .card {
  background: rgba(245, 237, 241, 0.05);
  border: 1px solid rgba(237, 61, 140, 0.28);
  border-radius: 0;
}

/* ── block-frame-brutal (block-frame) ── */
.deck[data-surface="block-frame-brutal"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 4px solid #000;
  box-shadow: 8px 8px 0 #000;
}
.deck[data-surface="block-frame-brutal"] .title-slide::before,
.deck[data-surface="block-frame-brutal"] .closing-slide::before {
  width: 28%;
  height: 18%;
  right: -2%;
  top: 12%;
  background: var(--accent);
  border: 4px solid #000;
  box-shadow: 6px 6px 0 #000;
  transform: rotate(6deg);
  filter: none;
}
.deck[data-surface="block-frame-brutal"] .slide:not(.title-slide):not(.closing-slide)::before {
  display: none;
}
.deck[data-surface="block-frame-brutal"] .title-slide::after,
.deck[data-surface="block-frame-brutal"] .closing-slide::after {
  width: 16%;
  height: 22%;
  left: 6%;
  bottom: 10%;
  top: auto;
  background: #C0F7FE;
  border: 4px solid #000;
  box-shadow: 6px 6px 0 #000;
  transform: rotate(-8deg);
  filter: none;
}
.deck[data-surface="block-frame-brutal"] .slide:not(.title-slide):not(.closing-slide)::after {
  display: none;
}
.deck[data-surface="block-frame-brutal"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  line-height: 0.95;
}
.deck[data-surface="block-frame-brutal"] .card {
  background: #fff;
  border: 4px solid #000;
  border-radius: 0;
  box-shadow: 6px 6px 0 #000;
}

/* ── capsule-pills (capsule) ── */
.deck[data-surface="capsule-pills"] .slide {
  --slide-bg:
    radial-gradient(circle at 12% 78%, color-mix(in srgb, #C5B5E0 70%, transparent) 0 28px, transparent 29px),
    radial-gradient(circle at 88% 18%, color-mix(in srgb, #8BB4F7 70%, transparent) 0 22px, transparent 23px),
    radial-gradient(circle at 78% 82%, color-mix(in srgb, #C4D94E 70%, transparent) 0 18px, transparent 19px),
    var(--bg);
  border-radius: 28px;
  border: 2px solid var(--border);
  box-shadow: 8px 10px 0 rgba(26, 26, 26, 0.08);
}
.deck[data-surface="capsule-pills"] .slide::before {
  width: 120px;
  height: 36px;
  right: 48px;
  top: 40px;
  border-radius: 9999px;
  background: var(--accent);
  border: 2px solid var(--border);
  box-shadow: 4px 4px 0 rgba(26, 26, 26, 0.1);
  filter: none;
}
.deck[data-surface="capsule-pills"] .slide::after {
  width: 72px;
  height: 72px;
  left: 44px;
  bottom: 40px;
  top: auto;
  border-radius: 50%;
  background: var(--accent2);
  border: 2px solid var(--border);
  filter: none;
}
.deck[data-surface="capsule-pills"] .slide h1 {
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
}
.deck[data-surface="capsule-pills"] .card {
  background: #fff;
  border: 2px solid var(--border);
  border-radius: 2rem;
  box-shadow: 6px 8px 0 rgba(26, 26, 26, 0.08);
}

/* ── cobalt-grid-paper (cobalt-grid) ── */
.deck[data-surface="cobalt-grid-paper"] .slide {
  --slide-bg:
    linear-gradient(rgba(31, 43, 224, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(31, 43, 224, 0.1) 1px, transparent 1px),
    var(--bg);
  background-size: 28px 28px, 28px 28px, auto;
  border-radius: 0;
  border: 1px solid rgba(31, 43, 224, 0.18);
}
.deck[data-surface="cobalt-grid-paper"] .slide::before {
  width: 42%;
  height: 42%;
  right: 0;
  bottom: 0;
  top: auto;
  background:
    linear-gradient(to top left, transparent 49.5%, rgba(31, 43, 224, 0.55) 49.5% 50.5%, transparent 50.5%),
    linear-gradient(to top left, transparent 0 50%, color-mix(in srgb, var(--accent) 12%, transparent) 50%);
  filter: none;
  opacity: 1;
  border-radius: 0;
}
.deck[data-surface="cobalt-grid-paper"] .slide::after {
  display: none;
}
.deck[data-surface="cobalt-grid-paper"] .slide h1 {
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.05;
}
.deck[data-surface="cobalt-grid-paper"] .card {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(31, 43, 224, 0.22);
  border-radius: 0;
}

/* ── bit-orbit-arcade (8-bit-orbit) ── */
.deck[data-surface="bit-orbit-arcade"] .slide {
  --slide-bg:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(0, 0, 0, 0.18) 3px,
      rgba(0, 0, 0, 0.18) 4px
    ),
    radial-gradient(ellipse 60% 50% at 70% 20%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 65%),
    radial-gradient(ellipse 40% 35% at 20% 80%, color-mix(in srgb, var(--accent2) 16%, transparent), transparent 70%),
    var(--bg);
  border-radius: 0;
  border: 3px solid var(--accent);
  box-shadow:
    0 0 0 4px var(--bg),
    4px 4px 0 #F4D03F,
    8px 8px 0 var(--accent2);
}
.deck[data-surface="bit-orbit-arcade"] .slide::before {
  width: 10px;
  height: 10px;
  left: 36px;
  top: 36px;
  background: #F4D03F;
  box-shadow:
    24px 8px 0 var(--accent),
    48px 0 0 var(--accent2),
    72px 12px 0 #fff;
  filter: none;
  border-radius: 0;
}
.deck[data-surface="bit-orbit-arcade"] .slide::after {
  width: 64px;
  height: 18px;
  right: 40px;
  bottom: 40px;
  top: auto;
  background: var(--accent);
  border: 2px solid #fff;
  box-shadow: 4px 4px 0 #F4D03F;
  filter: none;
  border-radius: 0;
}
.deck[data-surface="bit-orbit-arcade"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.01em;
  text-shadow: 3px 3px 0 #F4D03F, 6px 6px 0 var(--accent2);
}
.deck[data-surface="bit-orbit-arcade"] .card {
  background: rgba(15, 27, 61, 0.9);
  border: 2px solid var(--accent);
  border-radius: 0;
  box-shadow: 4px 4px 0 var(--accent2);
}

/* ── studio-acid (studio) ── */
.deck[data-surface="studio-acid"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid var(--border);
  box-shadow: none;
}
.deck[data-surface="studio-acid"] .slide::before {
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: var(--border);
  filter: none;
  opacity: 1;
}
.deck[data-surface="studio-acid"] .slide::after {
  left: 0;
  right: 0;
  bottom: 0;
  top: auto;
  height: 1px;
  background: var(--border);
  filter: none;
  opacity: 1;
  border-radius: 0;
}
.deck[data-surface="studio-acid"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 0.9;
  color: var(--accent);
}
.deck[data-surface="studio-acid"] .card {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 0;
  color: var(--text);
}
/* ── grove-monograph (grove) ── */
.deck[data-surface="grove-monograph"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: none;
  box-shadow: inset 0 0 0 1px rgba(212, 207, 191, 0.08);
}
.deck[data-surface="grove-monograph"] .slide::before {
  left: 5%;
  right: 5%;
  top: 6%;
  height: 1px;
  background: rgba(212, 207, 191, 0.18);
  filter: none;
  opacity: 1;
}
.deck[data-surface="grove-monograph"] .slide::after {
  width: 36px;
  height: 2px;
  left: 5%;
  bottom: 8%;
  top: auto;
  background: var(--accent);
  filter: none;
  border-radius: 0;
}
.deck[data-surface="grove-monograph"] .slide h1 {
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.08;
}
.deck[data-surface="grove-monograph"] .card {
  background: var(--bg-2);
  border: 1px solid rgba(212, 207, 191, 0.12);
  border-radius: 0;
  color: var(--text);
}
/* ── scatterbrain-cork (scatterbrain) ── */
.deck[data-surface="scatterbrain-cork"] .slide {
  --slide-bg:
    linear-gradient(135deg, #FFE066 0%, #FFD43B 100%) no-repeat 72% 12% / 180px 140px,
    linear-gradient(160deg, #A5D8FF 0%, #74C0FC 100%) no-repeat 88% 58% / 150px 120px,
    linear-gradient(200deg, #FFC9C9 0%, #FF9F9F 100%) no-repeat 8% 62% / 130px 110px,
    radial-gradient(ellipse 80% 60% at 20% 30%, rgba(255, 224, 102, 0.22), transparent 55%),
    repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(45, 42, 38, 0.05) 39px, rgba(45, 42, 38, 0.05) 40px),
    var(--bg);
  border-radius: 8px;
  border: 1px solid rgba(45, 42, 38, 0.12);
  box-shadow:
    6px 8px 0 rgba(45, 42, 38, 0.06),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4);
}
.deck[data-surface="scatterbrain-cork"] .slide::before {
  width: 16px;
  height: 16px;
  right: calc(28% + 72px);
  top: calc(12% + 8px);
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ff6b6b, #c92a2a 70%);
  box-shadow:
    0 2px 4px rgba(45, 42, 38, 0.25),
    210px 180px 0 0 #74c0fc,
    210px 180px 0 2px rgba(45, 42, 38, 0.15);
  filter: none;
}
.deck[data-surface="scatterbrain-cork"] .slide::after {
  width: 88px;
  height: 22px;
  left: 48px;
  bottom: 48px;
  top: auto;
  background: rgba(255, 236, 153, 0.7);
  border: 1px solid rgba(45, 42, 38, 0.12);
  transform: rotate(-8deg);
  filter: none;
  border-radius: 2px;
  box-shadow: 2px 3px 0 rgba(45, 42, 38, 0.12);
}
.deck[data-surface="scatterbrain-cork"] .slide h1 {
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.05;
}
.deck[data-surface="scatterbrain-cork"] .card {
  background: linear-gradient(180deg, #FFE066 0%, #FFD43B 100%);
  border: none;
  border-radius: 2px;
  box-shadow: 4px 6px 12px rgba(45, 42, 38, 0.18);
  transform: rotate(-1.2deg);
}
/* ── peoples-platform-poster (peoples-platform) ── */
.deck[data-surface="peoples-platform-poster"] .slide {
  --slide-bg:
    radial-gradient(circle at 1px 1px, rgba(14, 14, 20, 0.06) 1px, transparent 0),
    var(--bg);
  background-size: 4px 4px, auto;
  border-radius: 0;
  border: 6px solid var(--text);
}
.deck[data-surface="peoples-platform-poster"] .slide::before {
  left: 0;
  right: 0;
  top: 0;
  height: 18px;
  background: var(--accent);
  filter: none;
  opacity: 1;
}
.deck[data-surface="peoples-platform-poster"] .slide::after {
  width: 28%;
  height: 14px;
  right: 0;
  bottom: 0;
  top: auto;
  background: var(--accent2);
  filter: none;
  border-radius: 0;
}
.deck[data-surface="peoples-platform-poster"] .slide h1 {
  font-weight: 400;
  letter-spacing: 0.005em;
  text-transform: uppercase;
  line-height: 0.88;
  color: var(--accent);
  text-shadow: 4px 4px 0 #E83A2A, 8px 8px 0 #B7281C;
}
.deck[data-surface="peoples-platform-poster"] .card {
  background: #fff;
  border: 4px solid var(--text);
  border-radius: 0;
  box-shadow: 6px 6px 0 #E83A2A;
}
/* ── retro-windows-chrome (retro-windows) ── */
.deck[data-surface="retro-windows-chrome"] .slide {
  --slide-bg:
    repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.03) 0px,
      rgba(0, 0, 0, 0.03) 1px,
      transparent 1px,
      transparent 3px
    ),
    var(--bg);
  border-radius: 0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #404040;
}
.deck[data-surface="retro-windows-chrome"] .slide::before {
  left: 2px;
  right: 2px;
  top: 2px;
  height: 22px;
  background: linear-gradient(90deg, #000080 0%, #0000A0 100%);
  filter: none;
  opacity: 1;
  border-radius: 0;
}
.deck[data-surface="retro-windows-chrome"] .slide::after {
  width: 54px;
  height: 16px;
  right: 8px;
  top: 5px;
  background:
    linear-gradient(#c0c0c0, #c0c0c0) 0 0 / 16px 14px no-repeat,
    linear-gradient(#c0c0c0, #c0c0c0) 19px 0 / 16px 14px no-repeat,
    linear-gradient(#c0c0c0, #c0c0c0) 38px 0 / 16px 14px no-repeat;
  border: none;
  filter: none;
  box-shadow:
    0 0 0 1px #fff, 1px 1px 0 #000,
    19px 0 0 0 #c0c0c0, 19px 0 0 1px #fff, 20px 1px 0 #000,
    38px 0 0 0 #c0c0c0, 38px 0 0 1px #fff, 39px 1px 0 #000;
}
.deck[data-surface="retro-windows-chrome"] .slide h1 {
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.2;
  margin-top: 1.2rem;
}
.deck[data-surface="retro-windows-chrome"] .card {
  background: #fff;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  border-radius: 0;
  box-shadow: inset 1px 1px 0 #000;
}
/* ── raw-grid-brutal (raw-grid) ── */
.deck[data-surface="raw-grid-brutal"] .slide {
  --slide-bg:
    linear-gradient(#F2D4CF 0 28%, transparent 28%),
    linear-gradient(90deg, #E5EDD6 0 22%, transparent 22%),
    #FFFFFF;
  border-radius: 0;
  border: 3px solid #0A0A0A;
  box-shadow: 6px 6px 0 #0A0A0A;
}
.deck[data-surface="raw-grid-brutal"] .slide::before {
  width: auto;
  left: 0;
  right: 0;
  top: 28%;
  height: 3px;
  background: #0A0A0A;
  filter: none;
  opacity: 1;
}
.deck[data-surface="raw-grid-brutal"] .slide::after {
  width: 3px;
  left: 22%;
  top: 0;
  bottom: 0;
  height: auto;
  background: #0A0A0A;
  filter: none;
  border-radius: 0;
}
.deck[data-surface="raw-grid-brutal"] .slide h1 {
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 1.05;
}
.deck[data-surface="raw-grid-brutal"] .card {
  background: #fff;
  border: 3px solid #0A0A0A;
  border-radius: 0;
  box-shadow: 4px 4px 0 #0A0A0A;
}
/* ── long-table-supper (long-table) ── */
.deck[data-surface="long-table-supper"] .slide {
  --slide-bg:
    radial-gradient(circle, rgba(181, 61, 42, 0.1) 1.1px, transparent 1.2px),
    var(--bg);
  background-size: 12px 12px, auto;
  border-radius: 0;
  border: 1.5px solid rgba(181, 61, 42, 0.5);
}
.deck[data-surface="long-table-supper"] .slide::before {
  width: 88px;
  height: 32px;
  right: 48px;
  top: 40px;
  border-radius: 9999px;
  border: 1.5px solid var(--accent);
  background: transparent;
  filter: none;
}
.deck[data-surface="long-table-supper"] .slide::after {
  width: 48px;
  height: 1.5px;
  left: 48px;
  bottom: 48px;
  top: auto;
  background: var(--accent);
  filter: none;
  border-radius: 0;
}
.deck[data-surface="long-table-supper"] .slide h1 {
  font-weight: 800;
  letter-spacing: -0.012em;
  text-transform: uppercase;
  line-height: 0.92;
  color: var(--accent);
}
.deck[data-surface="long-table-supper"] .card {
  background: var(--bg-2);
  border: 1.5px dashed rgba(181, 61, 42, 0.45);
  border-radius: 1.25rem;
  color: var(--text);
}
/* ── mat-woodglow (mat) ── */
.deck[data-surface="mat-woodglow"] .slide {
  /* Soften wood tint so muted cream stays AA on the wash */
  --slide-bg:
    radial-gradient(ellipse 55% 45% at 88% 100%, color-mix(in srgb, var(--accent2) 28%, transparent), transparent 70%),
    radial-gradient(ellipse 30% 28% at 12% 18%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 70%),
    var(--bg);
  border-radius: 0;
  border: none;
  box-shadow: inset 0 0 0 1px rgba(240, 232, 210, 0.08);
}
.deck[data-surface="mat-woodglow"] .slide::before {
  width: 32px;
  height: 1px;
  left: 5.5%;
  top: 12%;
  background: var(--accent);
  filter: none;
  opacity: 1;
}
.deck[data-surface="mat-woodglow"] .slide::after {
  width: 14%;
  height: 3px;
  right: 5.5%;
  bottom: 10%;
  top: auto;
  background: var(--accent);
  filter: none;
  border-radius: 0;
  opacity: 0.9;
}
.deck[data-surface="mat-woodglow"] .slide h1 {
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 0.92;
  text-transform: none;
}
.deck[data-surface="mat-woodglow"] .card {
  background: var(--card-bg);
  color: #1E2820;
  border: 1px solid rgba(30, 40, 32, 0.14);
  border-radius: 0;
}
/* Dual-surface: cream cards need dark muted; roles.muted stays light for sage slides */
.deck[data-surface="mat-woodglow"] .card p,
.deck[data-surface="mat-woodglow"] .card .lead,
.deck[data-surface="mat-woodglow"] .stat .label {
  color: #454038;
}
.deck[data-surface="mat-woodglow"] .card h3,
.deck[data-surface="mat-woodglow"] .card i {
  color: #1E2820;
}
.deck[data-surface="mat-woodglow"] .eyebrow {
  color: #b8b4a4;
}
.deck[data-surface="mat-woodglow"] .card .eyebrow {
  color: #454038;
}

/* ── stencil-tablet-earth (stencil-tablet) ── */
.deck[data-surface="stencil-tablet-earth"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 2px solid #000;
}
.deck[data-surface="stencil-tablet-earth"] .slide::before {
  width: 18%;
  height: 22%;
  right: 5%;
  top: 10%;
  border-radius: 24px;
  background: var(--accent);
  filter: none;
  opacity: 1;
}
.deck[data-surface="stencil-tablet-earth"] .slide::after {
  width: 14%;
  height: 18%;
  left: 5%;
  bottom: 8%;
  top: auto;
  border-radius: 22px;
  background: var(--accent2);
  filter: none;
}
.deck[data-surface="stencil-tablet-earth"] .slide h1 {
  font-weight: 700;
  letter-spacing: -0.015em;
  text-transform: uppercase;
  line-height: 0.88;
}
.deck[data-surface="stencil-tablet-earth"] .card {
  background: var(--card-bg);
  border: 2px solid #000;
  border-radius: 24px;
}
/* ── cartesian-draft (cartesian) ── */
.deck[data-surface="cartesian-draft"] .slide {
  --slide-bg:
    radial-gradient(circle at 88% 18%, transparent 48px, rgba(184, 176, 164, 0.35) 49px, transparent 50px),
    radial-gradient(circle at 88% 18%, transparent 72px, rgba(184, 176, 164, 0.22) 73px, transparent 74px),
    var(--bg);
  border-radius: 0;
  border: 1px solid var(--border);
  box-shadow: none;
}
.deck[data-surface="cartesian-draft"] .slide::before {
  left: 6%;
  right: 6%;
  top: 10%;
  height: 1px;
  background: var(--border);
  filter: none;
  opacity: 1;
}
.deck[data-surface="cartesian-draft"] .slide::after {
  width: 1px;
  left: 6%;
  top: 10%;
  bottom: 10%;
  height: auto;
  background: var(--border);
  filter: none;
  border-radius: 0;
}
.deck[data-surface="cartesian-draft"] .slide h1 {
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.08;
}
.deck[data-surface="cartesian-draft"] .card {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 0;
  box-shadow: none;
}
/* ── monochrome-ledger (monochrome) ── */
.deck[data-surface="monochrome-ledger"] .slide {
  --slide-bg: var(--bg);
  border-radius: 0;
  border: 1px solid rgba(26, 26, 22, 0.12);
  box-shadow: none;
}

/* Quiet paper grain — soft fiber tooth (HTML-only) */
.deck[data-surface="monochrome-ledger"] .slide {
  background-image:
    radial-gradient(circle at 25% 20%, rgba(26, 26, 22, 0.03) 0.4px, transparent 0.9px),
    radial-gradient(circle at 75% 55%, rgba(26, 26, 22, 0.026) 0.35px, transparent 0.85px),
    radial-gradient(circle at 50% 90%, rgba(26, 26, 22, 0.022) 0.4px, transparent 0.9px),
    var(--slide-bg, var(--bg));
  background-size: 5px 5px, 7px 7px, 6px 6px, auto;
  background-position: 0 0, 2px 3px, 1px 4px, 0 0;
}
.deck[data-surface="monochrome-ledger"] .slide::before {
  left: 6%;
  right: 6%;
  top: 8%;
  height: 1px;
  background: rgba(26, 26, 22, 0.16);
  filter: none;
  opacity: 1;
}
.deck[data-surface="monochrome-ledger"] .slide::after {
  width: 24px;
  height: 1px;
  left: 6%;
  bottom: 8%;
  top: auto;
  background: var(--text);
  filter: none;
  border-radius: 0;
}
.deck[data-surface="monochrome-ledger"] .slide h1 {
  font-weight: 200;
  letter-spacing: -0.02em;
  line-height: 0.98;
}
.deck[data-surface="monochrome-ledger"] .card {
  background: var(--card-bg);
  border: 1px solid rgba(26, 26, 22, 0.12);
  border-radius: 16px;
  box-shadow: none;
}
/* ── blue-professional-clean (blue-professional) ── */
.deck[data-surface="blue-professional-clean"] .slide {
  --slide-bg:
    linear-gradient(180deg, rgba(30, 43, 250, 0.06) 0 18%, transparent 18%),
    var(--bg);
  border-radius: 16px;
  border: 1px solid rgba(30, 43, 250, 0.16);
}
.deck[data-surface="blue-professional-clean"] .slide::before {
  width: 48px;
  height: 4px;
  left: 48px;
  top: 40px;
  background: var(--accent);
  filter: none;
  border-radius: 2px;
}
/* Quiet cream paper grain (HTML-only) */
.deck[data-surface="blue-professional-clean"] .slide::after {
  inset: 0;
  width: auto;
  height: auto;
  opacity: 0.18;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(15, 20, 48, 0.05) 0.45px, transparent 0.95px),
    radial-gradient(circle at 70% 60%, rgba(15, 20, 48, 0.04) 0.4px, transparent 0.9px),
    radial-gradient(circle at 40% 85%, rgba(30, 43, 250, 0.045) 0.45px, transparent 0.95px);
  background-size: 8px 8px, 10px 10px, 7px 7px;
  background-position: 0 0, 4px 3px, 2px 5px;
  mix-blend-mode: multiply;
  filter: none;
}
.deck[data-surface="blue-professional-clean"] .slide h1 {
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.08;
  color: var(--text);
}
.deck[data-surface="blue-professional-clean"] .card {
  background: rgba(30, 43, 250, 0.04);
  border: 1px solid rgba(30, 43, 250, 0.16);
  border-radius: 12px;
}
/* ── daisy-days-pastel (daisy-days) ── */
.deck[data-surface="daisy-days-pastel"] .slide {
  --slide-bg:
    radial-gradient(circle at 12% 18%, #FDE68A 0 14px, transparent 15px),
    radial-gradient(circle at 88% 22%, #F7C8D4 0 18px, transparent 19px),
    radial-gradient(circle at 78% 82%, #7ECDC0 0 16px, transparent 17px),
    radial-gradient(circle at 18% 78%, #D4A5E8 0 12px, transparent 13px),
    var(--bg);
  border-radius: 28px;
  border: 3px solid #2D2D2D;
  box-shadow: 6px 6px 0 #2D2D2D;
}
.deck[data-surface="daisy-days-pastel"] .slide::before {
  width: 56px;
  height: 56px;
  right: 48px;
  top: 40px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, #FDE68A 0 10px, transparent 11px),
    radial-gradient(circle at 50% 18%, #fff 0 8px, transparent 9px),
    radial-gradient(circle at 50% 82%, #fff 0 8px, transparent 9px),
    radial-gradient(circle at 18% 50%, #fff 0 8px, transparent 9px),
    radial-gradient(circle at 82% 50%, #fff 0 8px, transparent 9px);
  border: 3px solid #2D2D2D;
  filter: none;
}
.deck[data-surface="daisy-days-pastel"] .slide::after {
  width: 72px;
  height: 28px;
  left: 44px;
  bottom: 40px;
  top: auto;
  border-radius: 9999px;
  background: #A8D8F0;
  border: 3px solid #2D2D2D;
  box-shadow: 3px 3px 0 #2D2D2D;
  filter: none;
}
.deck[data-surface="daisy-days-pastel"] .slide h1 {
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.08;
  text-shadow: 3px 3px 0 #2D2D2D;
}
.deck[data-surface="daisy-days-pastel"] .card {
  background: #fff;
  border: 3px solid #2D2D2D;
  border-radius: 20px;
  box-shadow: 4px 4px 0 #2D2D2D;
}
/* ── retro-zine-riso (retro-zine) ── */
.deck[data-surface="retro-zine-riso"] .slide {
  --slide-bg:
    radial-gradient(circle at 1px 1px, rgba(26, 26, 26, 0.08) 1px, transparent 0),
    var(--bg);
  background-size: 3px 3px, auto;
  border-radius: 0;
  border: 3px solid #1A1A1A;
}
.deck[data-surface="retro-zine-riso"] .slide::before {
  width: 26%;
  height: 34%;
  right: 6%;
  top: 14%;
  background: var(--accent);
  filter: none;
  opacity: 1;
  transform: translate(10px, 10px);
}
.deck[data-surface="retro-zine-riso"] .slide::after {
  width: 26%;
  height: 34%;
  right: 6%;
  top: 14%;
  background: var(--card-bg);
  border: 2px solid #1A1A1A;
  filter: none;
  border-radius: 0;
}
.deck[data-surface="retro-zine-riso"] .slide h1 {
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 0.9;
}
.deck[data-surface="retro-zine-riso"] .card {
  background: var(--card-bg);
  border: 2px solid #1A1A1A;
  border-radius: 0;
  box-shadow: 8px 8px 0 var(--accent);
}
.deck[data-surface="retro-zine-riso"] .card p,
.deck[data-surface="retro-zine-riso"] .card .lead {
  color: #3a342c;
}

/* ═══════════════════════════════════════════════════════════════════════════
   Content-slide fidelity — layout chrome that survives beyond title slides
   ═══════════════════════════════════════════════════════════════════════════ */

/* Soften title-only ornaments that crowd content layouts */
.deck[data-surface="daisy-days-pastel"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="daisy-days-pastel"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="capsule-pills"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="capsule-pills"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="pastel-geometry-pills"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="retro-zine-riso"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="retro-zine-riso"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="vintage-editorial-geo"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="vintage-editorial-geo"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="bauhaus-blocks"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="bauhaus-blocks"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="deco-fan"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="candy-blob"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="wrapped-block"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="bold-poster-ink"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="acid-block"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="neo-grid-panels"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="botanical-leaf"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="aero-bubble"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="aero-bubble"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="coral-hatch"] .slide:not(.title-slide):not(.closing-slide)::before {
  display: none;
}

/* Swiss / editorial: ruled comparison + stats */
.deck[data-surface="swiss-grid"] .comparison-col,
.deck[data-surface="broadsheet-rule"] .comparison-col,
.deck[data-surface="newsprint-masthead"] .comparison-col {
  border-radius: 0;
  border-width: 1px 0 0 0;
  background: transparent;
  padding-left: 0;
  padding-right: 24px;
}
.deck[data-surface="swiss-grid"] .comparison-col:last-child {
  border-left: 3px solid var(--accent);
  padding-left: 28px;
  background: transparent;
}
.deck[data-surface="swiss-grid"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="swiss-grid"] .card {
  border-radius: 0;
  border: 1px solid var(--border);
}

/* CRT / neon / terminal: glowing metrics + code-like cards */
.deck[data-surface="crt-phosphor"] .stat .value,
.deck[data-surface="neon-rain"] .stat .value,
.deck[data-surface="dev-terminal"] .stat .value,
.deck[data-surface="scanline-neon"] .stat .value {
  text-shadow: 0 0 18px color-mix(in srgb, var(--accent) 55%, transparent);
}
.deck[data-surface="crt-phosphor"] .comparison-col,
.deck[data-surface="neon-rain"] .comparison-col,
.deck[data-surface="dev-terminal"] .comparison-col {
  border-radius: 0;
  background: color-mix(in srgb, var(--accent) 6%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="neon-rain"] .comparison-col:last-child {
  /* Hot magenta fills fail white text — darken for AA winner copy */
  background: color-mix(in srgb, var(--accent) 72%, #050508);
  color: #fff;
  border-color: var(--accent);
  box-shadow: 0 0 24px color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="neon-rain"] .comparison-col:last-child .comparison-label,
.deck[data-surface="neon-rain"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="neon-rain"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 72%, #050508);
  color: #fff;
  border-color: var(--accent2);
}
.deck[data-surface="neon-rain"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="neon-rain"] .grid.cols-bento .card:first-child p,
.deck[data-surface="neon-rain"] .grid.cols-bento .card:first-child i { color: #fff; }
.deck[data-surface="crt-phosphor"] .quote,
.deck[data-surface="neon-rain"] .quote,
.deck[data-surface="dev-terminal"] .quote {
  border-left-color: var(--accent);
  text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 30%, transparent);
}

/* Soft editorial / paper themes: magazine pull-quote + ruled stats */
.deck[data-surface="soft-editorial-paper"] .quote,
.deck[data-surface="warm-paper"] .quote,
.deck[data-surface="editorial-rule"] .quote,
.deck[data-surface="paper-ink-literary"] .quote,
.deck[data-surface="heritage-wash"] .quote {
  border-left: none;
  padding-left: 0;
  max-width: 32ch;
  font-style: normal;
}
.deck[data-surface="soft-editorial-paper"] .quote::before,
.deck[data-surface="warm-paper"] .quote::before,
.deck[data-surface="editorial-rule"] .quote::before {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  background: var(--accent);
  margin-bottom: 24px;
}
.deck[data-surface="soft-editorial-paper"] .stat,
.deck[data-surface="editorial-forest-paper"] .stat,
.deck[data-surface="fintech-soft"] .stat {
  border-top-width: 1px;
  border-top-style: solid;
}

/* Brutal / poster: hard-edged comparison */
.deck[data-surface="brutalist-grid"] .comparison-col,
.deck[data-surface="block-frame-brutal"] .comparison-col,
.deck[data-surface="hard-bento"] .comparison-col,
.deck[data-surface="acid-block"] .comparison-col {
  border-radius: 0;
  border-width: 2px;
}
.deck[data-surface="brutalist-grid"] .comparison-vs,
.deck[data-surface="block-frame-brutal"] .comparison-vs {
  font-weight: 900;
  opacity: 1;
}
.deck[data-surface="block-frame-brutal"] .comparison-col:last-child {
  /* Pastel pink accent fails white — keep ink */
  background: var(--accent);
  color: #000;
  border-color: #000;
}
.deck[data-surface="block-frame-brutal"] .comparison-col:last-child .comparison-label,
.deck[data-surface="block-frame-brutal"] .comparison-col:last-child p { color: #000; }
.deck[data-surface="block-frame-brutal"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #000;
  border-color: #000;
}
.deck[data-surface="block-frame-brutal"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="block-frame-brutal"] .grid.cols-bento .card:first-child p,
.deck[data-surface="block-frame-brutal"] .grid.cols-bento .card:first-child i { color: #000; }

/* Aurora / glass: frosted layout shells */
.deck[data-surface="aurora-glass"] .comparison-col,
.deck[data-surface="glass-mist"] .comparison-col {
  backdrop-filter: blur(12px);
  background: color-mix(in srgb, var(--card-bg) 70%, transparent);
}
.deck[data-surface="aurora-glass"] .stat .value,
.deck[data-surface="glass-mist"] .stat .value {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ── Wave: deeper content chrome for distinctive STYLE_PRESETS / gallery themes ── */

/* Quiet luxe — hairline stats, gold pull-quote */
.deck[data-surface="quiet-luxe"] .stat {
  border-top: 1px solid var(--accent);
  padding-top: 18px;
}
.deck[data-surface="quiet-luxe"] .stat .value {
  font-weight: 400;
  letter-spacing: -0.03em;
}
.deck[data-surface="quiet-luxe"] .quote {
  border-left: none;
  padding-left: 0;
  max-width: 28ch;
  font-weight: 400;
}
.deck[data-surface="quiet-luxe"] .quote::before {
  content: "";
  display: block;
  width: 40px;
  height: 1px;
  background: var(--accent);
  margin-bottom: 28px;
}
.deck[data-surface="quiet-luxe"] .comparison-col {
  background: transparent;
  border-radius: 0;
  border-top: 1px solid var(--border);
  padding-left: 0;
}
.deck[data-surface="quiet-luxe"] .comparison-col:last-child {
  border-top-color: var(--accent);
}

/* Hard bento — chunky comparison + stats */
.deck[data-surface="hard-bento"] .stat {
  border-top: 4px solid var(--text);
  border-radius: 0;
}
.deck[data-surface="hard-bento"] .stat .value {
  font-weight: 900;
}
.deck[data-surface="hard-bento"] .comparison-col:last-child {
  background: var(--accent2);
  color: #0f0f1a;
}
.deck[data-surface="hard-bento"] .comparison-col:last-child .comparison-label,
.deck[data-surface="hard-bento"] .comparison-col:last-child p { color: #0f0f1a; }
.deck[data-surface="hard-bento"] .grid.cols-bento .card:first-child {
  background: var(--accent2);
  color: #0f0f1a;
  border-color: var(--text);
}
.deck[data-surface="hard-bento"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="hard-bento"] .grid.cols-bento .card:first-child p,
.deck[data-surface="hard-bento"] .grid.cols-bento .card:first-child i { color: #0f0f1a; }
.deck[data-surface="hard-bento"] .quote {
  border-left: 6px solid var(--text);
  font-weight: 800;
}

/* HUD / blueprint — instrument metrics + table rules */
.deck[data-surface="hud-grid"] .stat .value,
.deck[data-surface="blueprint-grid"] .stat .value {
  font-family: ui-monospace, "Barlow Condensed", monospace;
  text-shadow: 0 0 16px color-mix(in srgb, var(--accent) 45%, transparent);
  letter-spacing: 0.04em;
}
.deck[data-surface="hud-grid"] .comparison-col,
.deck[data-surface="blueprint-grid"] .comparison-col {
  border-radius: 0;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
}
.deck[data-surface="hud-grid"] .card,
.deck[data-surface="blueprint-grid"] .card {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  background: color-mix(in srgb, var(--bg-2) 80%, transparent);
}
.deck[data-surface="hud-grid"] table th,
.deck[data-surface="blueprint-grid"] table th {
  border-bottom: 1px solid var(--accent);
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 12px;
}

/* Bauhaus — primary-bar stats, hard cards */
.deck[data-surface="bauhaus-blocks"] .stat {
  border-top: 8px solid var(--accent);
  border-radius: 0;
}
.deck[data-surface="bauhaus-blocks"] .stat:nth-child(2) { border-top-color: var(--accent2); }
.deck[data-surface="bauhaus-blocks"] .stat:nth-child(3) { border-top-color: #f4d35e; }
.deck[data-surface="bauhaus-blocks"] .card {
  border-radius: 0;
  border: 2px solid var(--text);
  background: #fff;
}
.deck[data-surface="bauhaus-blocks"] .comparison-col {
  border-radius: 0;
  border: 2px solid var(--text);
  background: #fff;
}
.deck[data-surface="bauhaus-blocks"] .comparison-col:last-child {
  background: var(--accent);
  color: #0d0d0d;
  border-color: var(--text);
}
.deck[data-surface="bauhaus-blocks"] .comparison-col:last-child .comparison-label,
.deck[data-surface="bauhaus-blocks"] .comparison-col:last-child p { color: #0d0d0d; }
.deck[data-surface="bauhaus-blocks"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #0d0d0d;
  border-color: var(--text);
}
.deck[data-surface="bauhaus-blocks"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="bauhaus-blocks"] .grid.cols-bento .card:first-child p,
.deck[data-surface="bauhaus-blocks"] .grid.cols-bento .card:first-child i { color: #0d0d0d; }
.deck[data-surface="bauhaus-blocks"] .timeline .dot {
  background: var(--accent);
  border-radius: 0;
}

/* Art deco — gold rules on content */
.deck[data-surface="deco-fan"] .stat {
  border-top: 2px solid var(--accent);
}
.deck[data-surface="deco-fan"] .stat .value {
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: clamp(28px, 3.2vw, 42px);
}
.deck[data-surface="deco-fan"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 2px solid color-mix(in srgb, var(--accent) 55%, transparent);
}
.deck[data-surface="deco-fan"] .quote {
  border-left: none;
  text-align: center;
  max-width: 36ch;
  margin-inline: auto;
  letter-spacing: 0.04em;
}
.deck[data-surface="deco-fan"] .quote::before {
  content: "◆";
  display: block;
  color: var(--accent);
  margin-bottom: 20px;
  font-size: 14px;
}

/* Candy / pastel geometry / aero — playful but readable shells */
.deck[data-surface="candy-blob"] .stat {
  border-top: 4px solid var(--text);
}
.deck[data-surface="candy-blob"] .comparison-col {
  border: 3px solid var(--text);
  border-radius: 22px;
}
.deck[data-surface="candy-blob"] .comparison-col:last-child {
  /* Darken jellybean blue so white body copy clears WCAG AA */
  background: color-mix(in srgb, var(--accent2) 78%, #0a1628);
  color: #fff;
}
.deck[data-surface="candy-blob"] .comparison-col:last-child .comparison-label,
.deck[data-surface="candy-blob"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="candy-blob"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent2) 78%, #0a1628);
  color: #fff;
  border-color: var(--text);
}
.deck[data-surface="candy-blob"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="candy-blob"] .grid.cols-bento .card:first-child p,
.deck[data-surface="candy-blob"] .grid.cols-bento .card:first-child i { color: #fff; }
.deck[data-surface="pastel-geometry-pills"] .stat {
  border-top: 3px solid var(--accent);
  background: #fff;
  border-radius: 16px;
  padding: 16px 18px;
}
.deck[data-surface="pastel-geometry-pills"] .comparison-col {
  border-radius: 18px;
  background: #fff;
  border: 1px solid color-mix(in srgb, var(--text) 10%, transparent);
}
.deck[data-surface="aero-bubble"] .stat .value {
  color: var(--accent);
}
.deck[data-surface="aero-bubble"] .card {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
  box-shadow: 0 12px 32px color-mix(in srgb, var(--accent) 12%, transparent);
}
.deck[data-surface="aero-bubble"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent2) 35%, #fff);
  border-radius: 20px;
  color: #0c4a6e;
}
.deck[data-surface="aero-bubble"] .comparison-col:last-child .comparison-label,
.deck[data-surface="aero-bubble"] .comparison-col:last-child p { color: #0c4a6e; }

/* Data editorial / newsprint — ruled tables + stats */
.deck[data-surface="data-rule"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="data-rule"] .stat:nth-child(2) { border-top-color: var(--accent2); }
.deck[data-surface="data-rule"] table {
  border-collapse: collapse;
  width: 100%;
}
.deck[data-surface="data-rule"] table th {
  border-bottom: 3px solid var(--accent);
  text-align: left;
  padding: 10px 12px;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.deck[data-surface="data-rule"] table td {
  border-bottom: 1px solid var(--border);
  padding: 12px;
}
.deck[data-surface="newsprint-masthead"] .stat {
  border-top: 2px solid var(--text);
}
.deck[data-surface="newsprint-masthead"] table th {
  border-bottom: 2px double var(--text);
  font-family: var(--heading-font);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 13px;
}
.deck[data-surface="newsprint-masthead"] table td {
  border-bottom: 1px solid color-mix(in srgb, var(--text) 22%, transparent);
  padding: 10px 8px;
}
.deck[data-surface="newsprint-masthead"] .card {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--text) 28%, transparent);
  background: transparent;
}

/* Heritage / paper-ink / hygge — editorial content fidelity */
.deck[data-surface="heritage-wash"] .stat,
.deck[data-surface="paper-ink-literary"] .stat,
.deck[data-surface="hygge-soft"] .stat {
  border-top: 1px solid var(--accent);
}
.deck[data-surface="heritage-wash"] .card,
.deck[data-surface="paper-ink-literary"] .card {
  background: #fff;
  border-radius: 0;
}
.deck[data-surface="hygge-soft"] .card {
  border-radius: 16px;
  background: color-mix(in srgb, var(--card-bg) 90%, #fff);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
}
.deck[data-surface="paper-ink-literary"] .quote::before {
  content: "";
  display: block;
  width: 48px;
  height: 2px;
  background: var(--accent);
  margin-bottom: 24px;
}
.deck[data-surface="heritage-wash"] .quote::before {
  content: "";
  display: block;
  width: 40px;
  height: 1px;
  background: var(--accent);
  margin-bottom: 24px;
}

/* Kinetic wrapped — acid lime content chrome */
.deck[data-surface="wrapped-block"] .eyebrow,
.deck[data-surface="wrapped-block"] .stat .label {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.deck[data-surface="wrapped-block"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="wrapped-block"] .stat .value {
  text-transform: uppercase;
  letter-spacing: -0.04em;
  color: var(--accent);
}
.deck[data-surface="wrapped-block"] .card {
  border: 3px solid var(--accent);
  border-radius: 0;
  background: #0a0a0a;
}
.deck[data-surface="wrapped-block"] .card p,
.deck[data-surface="wrapped-block"] .card .lead {
  color: var(--muted);
}
.deck[data-surface="wrapped-block"] .comparison-col {
  border: 3px solid var(--accent);
  border-radius: 0;
}
.deck[data-surface="wrapped-block"] .comparison-col:last-child {
  background: var(--accent);
  color: #0a0a0a;
}
.deck[data-surface="wrapped-block"] .comparison-col:last-child .comparison-label,
.deck[data-surface="wrapped-block"] .comparison-col:last-child p { color: #0a0a0a; }
.deck[data-surface="wrapped-block"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #0a0a0a;
  border-color: var(--text);
}
.deck[data-surface="wrapped-block"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="wrapped-block"] .grid.cols-bento .card:first-child p,
.deck[data-surface="wrapped-block"] .grid.cols-bento .card:first-child i { color: #0a0a0a; }
.deck[data-surface="wrapped-block"] .quote {
  border-left: 6px solid var(--accent);
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

/* Pulse multi-hue — accent2 magenta chrome + per-slide tone beats */
.deck[data-surface="wrapped-block"] .stat:nth-child(even) {
  border-top-color: var(--accent2);
}
.deck[data-surface="wrapped-block"] .stat:nth-child(even) .value {
  color: var(--accent2);
}
.deck[data-surface="wrapped-block"] .comparison-col:first-child {
  border-color: var(--accent2);
}
.deck[data-surface="wrapped-block"] .card:nth-child(3n) {
  border-color: var(--accent2);
}
.deck[data-surface="wrapped-block"] .chart-frame {
  border-color: var(--accent);
  box-shadow: 8px 8px 0 var(--accent2);
}

/* Gallery-parity soft blobs (handcrafted Pulse uses absolute .blob circles) */
.deck[data-surface="wrapped-block"] .slide {
  overflow: hidden;
}
.deck[data-surface="wrapped-block"] .slide::before {
  content: "";
  position: absolute;
  z-index: 0;
  pointer-events: none;
  width: min(52vw, 640px);
  height: min(52vw, 640px);
  border-radius: 50%;
  right: -18%;
  top: -22%;
  background: var(--accent);
  opacity: 0.14;
  filter: blur(2px);
}
.deck[data-surface="wrapped-block"] .title-slide::before,
.deck[data-surface="wrapped-block"] .closing-slide::before {
  background: #00e5ff;
  opacity: 0.35;
  right: -12%;
  top: -18%;
  width: min(48vw, 560px);
  height: min(48vw, 560px);
  filter: none;
}
.deck[data-surface="wrapped-block"] .title-slide::after,
.deck[data-surface="wrapped-block"] .closing-slide::after {
  /* secondary cyan/lime blob stand-in — keep hard corner accent as second beat */
  width: min(36vw, 420px);
  height: min(36vw, 420px);
  border-radius: 50%;
  left: -10%;
  bottom: -16%;
  top: auto;
  right: auto;
  background: #ffea00;
  opacity: 0.55;
}
.deck[data-surface="wrapped-block"] .stat-row-slide .stat .value {
  font-size: clamp(56px, 8vw, 120px);
  letter-spacing: -0.05em;
}
.deck[data-surface="wrapped-block"] .stat-row-slide .stat:only-child .value,
.deck[data-surface="wrapped-block"] .stat-row-slide .stats:has(> .stat:nth-child(1):last-child) .value {
  font-size: clamp(88px, 18vw, 220px);
}
.deck[data-surface="wrapped-block"] .eyebrow {
  display: inline-block;
  padding: 0.35em 0.7em;
  background: var(--accent);
  color: #0a0a0a;
  font-weight: 700;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  border-radius: 0;
}
.deck[data-surface="wrapped-block"] .title-slide .eyebrow,
.deck[data-surface="wrapped-block"] .closing-slide .eyebrow {
  background: #0a0a0a;
  color: var(--accent);
}
.deck[data-surface="wrapped-block"] .custom-html-frame .pulse-bar-stack,
.deck[data-surface="wrapped-block"] .ranked-list-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 640px;
  margin-top: 12px;
  width: 100%;
}
.deck[data-surface="wrapped-block"] .custom-html-frame .pulse-bar-item,
.deck[data-surface="wrapped-block"] .ranked-list-item {
  display: flex;
  align-items: center;
  gap: 14px;
}
.deck[data-surface="wrapped-block"] .custom-html-frame .pulse-bar-rank,
.deck[data-surface="wrapped-block"] .ranked-list-rank {
  font-family: var(--heading-font);
  font-size: clamp(28px, 4vw, 48px);
  min-width: 2ch;
  letter-spacing: -0.04em;
}
.deck[data-surface="wrapped-block"] .custom-html-frame .pulse-bar-fill,
.deck[data-surface="wrapped-block"] .ranked-list-fill {
  flex: 1;
  font-family: var(--heading-font);
  font-size: clamp(16px, 2vw, 22px);
  padding: 14px 18px;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.deck[data-surface="wrapped-block"] .ranked-list-item.is-primary .ranked-list-fill {
  background: #ffffff;
  color: #0a0a0a;
}
.deck[data-surface="wrapped-block"] .ranked-list-item:not(.is-primary) .ranked-list-fill {
  background: rgba(255, 255, 255, 0.22);
  color: #ffffff;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="magenta"] .ranked-list-item.is-primary .ranked-list-fill {
  color: #cc00ff;
}
.deck[data-surface="wrapped-block"] .stat-row-hero .stat.is-mega .value {
  font-size: clamp(88px, 18vw, 240px);
}

/* Explicit tone overrides (set slide.tone in Deck JSON) */
.deck[data-surface="wrapped-block"] .slide[data-tone="magenta"] {
  --slide-bg: #cc00ff;
  color: #ffffff;
  border-color: #0a0a0a;
  box-shadow: 12px 12px 0 #0a0a0a;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="magenta"]::before {
  background: #ff00cc;
  opacity: 0.45;
  filter: none;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="magenta"]::after {
  background: #5500ff;
  border-radius: 50%;
  width: min(40vw, 480px);
  height: min(40vw, 480px);
  opacity: 0.5;
  bottom: -18%;
  right: -8%;
  top: auto;
  left: auto;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="magenta"] h1,
.deck[data-surface="wrapped-block"] .slide[data-tone="magenta"] h2,
.deck[data-surface="wrapped-block"] .slide[data-tone="magenta"] .lead,
.deck[data-surface="wrapped-block"] .slide[data-tone="magenta"] .eyebrow,
.deck[data-surface="wrapped-block"] .slide[data-tone="magenta"] .stat .value,
.deck[data-surface="wrapped-block"] .slide[data-tone="magenta"] .stat .label {
  color: #ffffff;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="magenta"] .eyebrow {
  background: #ffffff;
  color: #cc00ff;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="cyan"] {
  --slide-bg: #00e5ff;
  color: #001a33;
  border-color: #0a0a0a;
  box-shadow: 12px 12px 0 #0a0a0a;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="cyan"]::before {
  background: #00aaff;
  opacity: 0.4;
  filter: none;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="cyan"]::after {
  background: #0055cc;
  border-radius: 50%;
  width: min(34vw, 400px);
  height: min(34vw, 400px);
  opacity: 0.35;
  bottom: -14%;
  left: 4%;
  top: auto;
  right: auto;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="cyan"] h1,
.deck[data-surface="wrapped-block"] .slide[data-tone="cyan"] h2,
.deck[data-surface="wrapped-block"] .slide[data-tone="cyan"] .lead,
.deck[data-surface="wrapped-block"] .slide[data-tone="cyan"] .eyebrow,
.deck[data-surface="wrapped-block"] .slide[data-tone="cyan"] .stat .value,
.deck[data-surface="wrapped-block"] .slide[data-tone="cyan"] .stat .label {
  color: #001a33;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="cyan"] .eyebrow {
  background: #001a33;
  color: #00e5ff;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="orange"] {
  --slide-bg: #ff4d00;
  color: #ffff00;
  border-color: #0a0a0a;
  box-shadow: 12px 12px 0 #0a0a0a;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="orange"]::before {
  background: #ff8800;
  opacity: 0.5;
  filter: none;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="orange"]::after {
  background: #cc0000;
  border-radius: 50%;
  width: min(32vw, 380px);
  height: min(32vw, 380px);
  opacity: 0.45;
  bottom: -16%;
  left: -6%;
  top: auto;
  right: auto;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="orange"] h1,
.deck[data-surface="wrapped-block"] .slide[data-tone="orange"] h2,
.deck[data-surface="wrapped-block"] .slide[data-tone="orange"] .lead,
.deck[data-surface="wrapped-block"] .slide[data-tone="orange"] .eyebrow,
.deck[data-surface="wrapped-block"] .slide[data-tone="orange"] .stat .value,
.deck[data-surface="wrapped-block"] .slide[data-tone="orange"] .stat .label {
  color: #ffff00;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="orange"] .lead,
.deck[data-surface="wrapped-block"] .slide[data-tone="orange"] .stat .label {
  color: #ffffff;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="orange"] .eyebrow {
  background: #ffff00;
  color: #ff4d00;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="violet"] {
  --slide-bg: #7a00ff;
  color: #ffffff;
  border-color: var(--accent);
  box-shadow: 12px 12px 0 var(--accent);
}
.deck[data-surface="wrapped-block"] .slide[data-tone="violet"]::before {
  background: #cc00ff;
  opacity: 0.35;
  filter: none;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="violet"] .eyebrow {
  background: var(--accent);
  color: #0a0a0a;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="lime"] {
  --slide-bg: var(--accent);
  color: #0a0a0a;
  border-color: #0a0a0a;
  box-shadow: 12px 12px 0 #0a0a0a;
}
.deck[data-surface="wrapped-block"] .slide[data-tone="lime"] h1,
.deck[data-surface="wrapped-block"] .slide[data-tone="lime"] h2,
.deck[data-surface="wrapped-block"] .slide[data-tone="lime"] .lead,
.deck[data-surface="wrapped-block"] .slide[data-tone="lime"] .eyebrow {
  color: #0a0a0a;
}

/* Auto-cycle body slides when tone is omitted — Spotify-Wrapped energy */
.deck[data-surface="wrapped-block"] .slide:nth-child(4n+3):not(.title-slide):not(.closing-slide):not([data-tone]) {
  border-color: var(--accent2);
  box-shadow: 12px 12px 0 var(--accent2);
}
.deck[data-surface="wrapped-block"] .slide:nth-child(4n+3):not(.title-slide):not(.closing-slide):not([data-tone])::before {
  background: var(--accent2);
  opacity: 0.2;
}
.deck[data-surface="wrapped-block"] .slide:nth-child(4n+3):not(.title-slide):not(.closing-slide):not([data-tone])::after {
  background: var(--accent2);
}
.deck[data-surface="wrapped-block"] .slide:nth-child(5n+4):not(.title-slide):not(.closing-slide):not([data-tone]) {
  border-color: #00e5ff;
  box-shadow: 12px 12px 0 #00e5ff;
}
.deck[data-surface="wrapped-block"] .slide:nth-child(5n+4):not(.title-slide):not(.closing-slide):not([data-tone])::before {
  background: #00e5ff;
  opacity: 0.22;
}
.deck[data-surface="wrapped-block"] .slide:nth-child(5n+4):not(.title-slide):not(.closing-slide):not([data-tone])::after {
  background: #00e5ff;
}

/* Notebook tabs — keep side tabs; enrich cards/stats */
.deck[data-surface="notebook-tabs-page"] .stat {
  border-top: 2px solid var(--accent);
  background: #fff;
  border-radius: 8px;
  padding: 14px 16px;
}
.deck[data-surface="notebook-tabs-page"] .card {
  background: #fff;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--text) 10%, transparent);
  box-shadow: 0 4px 0 color-mix(in srgb, var(--accent2) 35%, transparent);
}
.deck[data-surface="notebook-tabs-page"] .comparison-col {
  background: #fff;
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--text) 12%, transparent);
}
.deck[data-surface="notebook-tabs-page"] .comparison-col:last-child {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent);
}

/* Vaporwave — horizon chrome on content */
.deck[data-surface="vapor-horizon"] .stat .value {
  text-shadow: 2px 0 color-mix(in srgb, var(--accent2) 50%, transparent),
    -2px 0 color-mix(in srgb, var(--accent) 50%, transparent);
}
.deck[data-surface="vapor-horizon"] .card {
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  background: color-mix(in srgb, var(--bg-2) 70%, transparent);
  border-radius: 6px;
}
.deck[data-surface="vapor-horizon"] .comparison-col {
  border: 1px solid color-mix(in srgb, var(--accent2) 45%, transparent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}
.deck[data-surface="vapor-horizon"] .comparison-col:last-child {
  /* Pink/teal neons fail white — ink on lightened accent clears AA */
  background: color-mix(in srgb, var(--accent) 82%, #fff);
  color: #1a0533;
  border-color: var(--accent2);
}
.deck[data-surface="vapor-horizon"] .comparison-col:last-child .comparison-label,
.deck[data-surface="vapor-horizon"] .comparison-col:last-child p { color: #1a0533; }
.deck[data-surface="vapor-horizon"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 82%, #fff);
  color: #1a0533;
  border-color: var(--accent2);
}
.deck[data-surface="vapor-horizon"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="vapor-horizon"] .grid.cols-bento .card:first-child p,
.deck[data-surface="vapor-horizon"] .grid.cols-bento .card:first-child i { color: #1a0533; }

/* Vintage / bold poster / acid / neo-grid / riso / coral / botanical */
.deck[data-surface="vintage-editorial-geo"] .stat {
  border-top: 2px solid var(--text);
}
.deck[data-surface="vintage-editorial-geo"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 4px;
  background: #fff;
}
.deck[data-surface="bold-poster-ink"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="bold-poster-ink"] .stat .value {
  color: var(--accent);
  font-family: var(--heading-font);
}
.deck[data-surface="bold-poster-ink"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 0;
}
.deck[data-surface="bold-poster-ink"] .comparison-col:last-child {
  background: var(--accent);
  color: #fff;
}
.deck[data-surface="bold-poster-ink"] .comparison-col:last-child .comparison-label,
.deck[data-surface="bold-poster-ink"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="bold-poster-ink"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #fff;
  border-color: var(--text);
}
.deck[data-surface="bold-poster-ink"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="bold-poster-ink"] .grid.cols-bento .card:first-child p,
.deck[data-surface="bold-poster-ink"] .grid.cols-bento .card:first-child i { color: #fff; }
.deck[data-surface="acid-block"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="acid-block"] .stat .value {
  color: var(--accent);
  font-family: ui-monospace, "Space Mono", monospace;
}
.deck[data-surface="acid-block"] .comparison-col:last-child {
  background: var(--accent);
  color: #1c1c1c;
}
.deck[data-surface="acid-block"] .comparison-col:last-child .comparison-label,
.deck[data-surface="acid-block"] .comparison-col:last-child p { color: #1c1c1c; }
.deck[data-surface="acid-block"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #1c1c1c;
  border-color: var(--text);
}
.deck[data-surface="acid-block"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="acid-block"] .grid.cols-bento .card:first-child p,
.deck[data-surface="acid-block"] .grid.cols-bento .card:first-child i { color: #1c1c1c; }
.deck[data-surface="neo-grid-panels"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="neo-grid-panels"] .stat .value {
  text-transform: uppercase;
  letter-spacing: -0.03em;
}
.deck[data-surface="neo-grid-panels"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 0;
}
.deck[data-surface="neo-grid-panels"] .comparison-col:last-child {
  background: var(--accent);
  color: #0a0a0a;
}
.deck[data-surface="neo-grid-panels"] .comparison-col:last-child .comparison-label,
.deck[data-surface="neo-grid-panels"] .comparison-col:last-child p { color: #0a0a0a; }
.deck[data-surface="neo-grid-panels"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #0a0a0a;
  border-color: var(--text);
}
.deck[data-surface="neo-grid-panels"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="neo-grid-panels"] .grid.cols-bento .card:first-child p,
.deck[data-surface="neo-grid-panels"] .grid.cols-bento .card:first-child i { color: #0a0a0a; }
.deck[data-surface="riso-print"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="riso-print"] .comparison-col {
  border: 2px solid var(--text);
  mix-blend-mode: multiply;
}
.deck[data-surface="riso-print"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent2) 22%, transparent);
}
.deck[data-surface="riso-print"] .quote {
  border-left: 4px solid var(--accent);
}
.deck[data-surface="coral-hatch"] .stat {
  border-top: 3px solid var(--text);
}
.deck[data-surface="coral-hatch"] .stat .value {
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-family: var(--heading-font);
}
.deck[data-surface="coral-hatch"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 0;
  background: #fff;
}
.deck[data-surface="coral-hatch"] .comparison-col:last-child {
  /* Coral fill reads muddy with white — keep ink for AA */
  background: color-mix(in srgb, var(--accent) 88%, #fff);
  color: #1a1a1a;
}
.deck[data-surface="coral-hatch"] .comparison-col:last-child .comparison-label,
.deck[data-surface="coral-hatch"] .comparison-col:last-child p { color: #1a1a1a; }
.deck[data-surface="coral-hatch"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 88%, #fff);
  color: #1a1a1a;
  border-color: var(--text);
}
.deck[data-surface="coral-hatch"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="coral-hatch"] .grid.cols-bento .card:first-child p,
.deck[data-surface="coral-hatch"] .grid.cols-bento .card:first-child i { color: #1a1a1a; }
.deck[data-surface="botanical-leaf"] .stat {
  border-top: 1px solid var(--accent);
}
.deck[data-surface="botanical-leaf"] .stat .value {
  color: var(--accent);
  font-style: italic;
}
.deck[data-surface="botanical-leaf"] .card {
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  border-radius: 0;
  background: color-mix(in srgb, var(--bg-2) 55%, transparent);
}
.deck[data-surface="botanical-leaf"] .quote {
  border-left: none;
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="botanical-leaf"] .quote::before {
  content: "";
  display: block;
  width: 48px;
  height: 1px;
  background: var(--accent);
  margin-bottom: 24px;
}

/* Soft-editorial / pastel-cloud content polish */
.deck[data-surface="pastel-cloud"] .card {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.65);
  border: none;
  box-shadow: 0 8px 24px rgba(80, 40, 90, 0.08);
}
.deck[data-surface="pastel-cloud"] .stat {
  border-top: 2px solid var(--accent);
}

/* ── Wave: content chrome for remaining distinctive surfaces (full coverage) ── */

/* Soften loud title ornaments on content layouts */
.deck[data-surface="biennale-yellow-sun"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="biennale-yellow-sun"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="broadside-fire"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="broadside-fire"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="studio-acid"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="studio-acid"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="creative-mode-blocks"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="creative-mode-blocks"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="scatterbrain-cork"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="scatterbrain-cork"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="tri-tone-blocks"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="peoples-platform-poster"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="peoples-platform-poster"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="pink-script-afterhours"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="pink-script-afterhours"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="stencil-tablet-earth"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="stencil-tablet-earth"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="raw-grid-brutal"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="soft-bento"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="clean-light"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="notebook-tabs-page"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="notebook-tabs-page"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="long-table-supper"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="long-table-supper"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="mat-woodglow"] .slide:not(.title-slide):not(.closing-slide)::before,
.deck[data-surface="mat-woodglow"] .slide:not(.title-slide):not(.closing-slide)::after,
.deck[data-surface="soft-editorial-paper"] .slide:not(.title-slide):not(.closing-slide)::after {
  display: none;
}

/* Biennale yellow — parchment stats + indigo cards */
.deck[data-surface="biennale-yellow-sun"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="biennale-yellow-sun"] .stat .value {
  color: var(--text);
  font-family: var(--heading-font);
  font-weight: 400;
}
.deck[data-surface="biennale-yellow-sun"] .comparison-col {
  border-radius: 0;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid color-mix(in srgb, var(--text) 22%, transparent);
}
.deck[data-surface="biennale-yellow-sun"] .comparison-col:last-child {
  background: var(--accent);
  color: #1b2566;
}
.deck[data-surface="biennale-yellow-sun"] .comparison-col:last-child .comparison-label,
.deck[data-surface="biennale-yellow-sun"] .comparison-col:last-child p { color: #1b2566; }
.deck[data-surface="biennale-yellow-sun"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #1b2566;
  border-color: var(--text);
}
.deck[data-surface="biennale-yellow-sun"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="biennale-yellow-sun"] .grid.cols-bento .card:first-child p,
.deck[data-surface="biennale-yellow-sun"] .grid.cols-bento .card:first-child i { color: #1b2566; }
.deck[data-surface="biennale-yellow-sun"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="biennale-yellow-sun"] .quote::before {
  content: "";
  display: block;
  width: 48px;
  height: 8px;
  background: var(--accent);
  margin-bottom: 20px;
}

/* Broadside — fire-orange content chrome */
.deck[data-surface="broadside-fire"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="broadside-fire"] .stat .value {
  color: var(--accent);
  font-weight: 900;
  text-transform: uppercase;
}
.deck[data-surface="broadside-fire"] .comparison-col {
  border-radius: 0;
  border: 2px solid color-mix(in srgb, var(--text) 35%, transparent);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}
.deck[data-surface="broadside-fire"] .comparison-col:last-child {
  background: var(--accent);
  color: #111;
  border-color: var(--accent);
}
.deck[data-surface="broadside-fire"] .comparison-col:last-child .comparison-label,
.deck[data-surface="broadside-fire"] .comparison-col:last-child p { color: #111; }
.deck[data-surface="broadside-fire"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #111;
  border-color: var(--accent);
}
.deck[data-surface="broadside-fire"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="broadside-fire"] .grid.cols-bento .card:first-child p,
.deck[data-surface="broadside-fire"] .grid.cols-bento .card:first-child i { color: #111; }
.deck[data-surface="broadside-fire"] .quote {
  border-left: 6px solid var(--accent);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}
.deck[data-surface="broadside-fire"] .card {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}

/* Studio acid — yellow metrics on black */
.deck[data-surface="studio-acid"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="studio-acid"] .stat .value {
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: -0.03em;
  font-weight: 900;
}
.deck[data-surface="studio-acid"] .comparison-col {
  border-radius: 0;
  border: 2px solid var(--accent);
  background: #242422;
}
.deck[data-surface="studio-acid"] .comparison-col:last-child {
  background: var(--accent);
  color: #1c1c1c;
}
.deck[data-surface="studio-acid"] .comparison-col:last-child .comparison-label,
.deck[data-surface="studio-acid"] .comparison-col:last-child p { color: #1c1c1c; }
.deck[data-surface="studio-acid"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #1c1c1c;
  border-color: var(--accent);
}
.deck[data-surface="studio-acid"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="studio-acid"] .grid.cols-bento .card:first-child p,
.deck[data-surface="studio-acid"] .grid.cols-bento .card:first-child i { color: #1c1c1c; }
.deck[data-surface="studio-acid"] .quote {
  border-left: 4px solid var(--accent);
  text-transform: uppercase;
  color: var(--accent);
}
.deck[data-surface="studio-acid"] .card {
  border: 1px solid #2e2e2c;
  border-radius: 0;
  background: #242422;
}

/* Vellum — chartreuse italic content */
.deck[data-surface="vellum-colorfield"] .stat {
  border-top: 1px solid var(--accent);
}
.deck[data-surface="vellum-colorfield"] .stat .value {
  color: var(--accent);
  font-family: var(--heading-font);
  font-style: italic;
  font-weight: 400;
}
.deck[data-surface="vellum-colorfield"] .comparison-col {
  border-radius: 0;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
}
.deck[data-surface="vellum-colorfield"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  color: var(--accent);
  max-width: 28ch;
}
.deck[data-surface="vellum-colorfield"] .quote::before {
  content: "";
  display: block;
  width: 40px;
  height: 1px;
  background: var(--accent);
  margin-bottom: 24px;
}
.deck[data-surface="vellum-colorfield"] .card {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}

/* Creative mode — hard block comparison */
.deck[data-surface="creative-mode-blocks"] .stat {
  border-top: 6px solid var(--text);
}
.deck[data-surface="creative-mode-blocks"] .stat:nth-child(2) { border-top-color: var(--accent); }
.deck[data-surface="creative-mode-blocks"] .stat:nth-child(3) { border-top-color: var(--accent2); }
.deck[data-surface="creative-mode-blocks"] .comparison-col {
  border-radius: 0;
  border: 3px solid var(--text);
  background: #fff;
}
.deck[data-surface="creative-mode-blocks"] .comparison-col:last-child {
  background: var(--accent);
  color: #111;
}
.deck[data-surface="creative-mode-blocks"] .comparison-col:last-child .comparison-label,
.deck[data-surface="creative-mode-blocks"] .comparison-col:last-child p { color: #111; }
.deck[data-surface="creative-mode-blocks"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #111;
  border-color: var(--text);
}
.deck[data-surface="creative-mode-blocks"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="creative-mode-blocks"] .grid.cols-bento .card:first-child p,
.deck[data-surface="creative-mode-blocks"] .grid.cols-bento .card:first-child i { color: #111; }
.deck[data-surface="creative-mode-blocks"] .quote {
  border-left: 8px solid var(--text);
  font-weight: 800;
}
.deck[data-surface="creative-mode-blocks"] .card {
  border: 3px solid var(--text);
  border-radius: 0;
}

/* Scatterbrain — sticky note cards/stats */
.deck[data-surface="scatterbrain-cork"] .stat {
  border-top: none;
  background: var(--accent);
  border-radius: 2px;
  padding: 16px 14px;
  box-shadow: 2px 3px 0 rgba(45, 42, 38, 0.15);
  transform: rotate(-1deg);
}
.deck[data-surface="scatterbrain-cork"] .stat:nth-child(2) {
  background: var(--accent2);
  transform: rotate(1.2deg);
}
.deck[data-surface="scatterbrain-cork"] .stat:nth-child(3) {
  background: #c9e4ff;
  transform: rotate(-0.6deg);
}
.deck[data-surface="scatterbrain-cork"] .comparison-col {
  background: #ffe066;
  border-radius: 2px;
  border: none;
  box-shadow: 3px 4px 0 rgba(45, 42, 38, 0.12);
  transform: rotate(-0.8deg);
}
.deck[data-surface="scatterbrain-cork"] .comparison-col:last-child {
  background: #ffc9c9;
  color: #2d2a26;
  transform: rotate(1deg);
}
.deck[data-surface="scatterbrain-cork"] .comparison-col:last-child .comparison-label,
.deck[data-surface="scatterbrain-cork"] .comparison-col:last-child p { color: #2d2a26; }
.deck[data-surface="scatterbrain-cork"] .grid.cols-bento .card:first-child {
  background: #ffc9c9;
  color: #2d2a26;
  border: none;
}
.deck[data-surface="scatterbrain-cork"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="scatterbrain-cork"] .grid.cols-bento .card:first-child p,
.deck[data-surface="scatterbrain-cork"] .grid.cols-bento .card:first-child i { color: #2d2a26; }
.deck[data-surface="scatterbrain-cork"] .quote {
  border-left: none;
  font-family: "Caveat", cursive;
  font-size: clamp(28px, 3.2vw, 40px);
  max-width: 28ch;
}
.deck[data-surface="scatterbrain-cork"] .card {
  background: #ffe066;
  border: none;
  border-radius: 2px;
  box-shadow: 2px 3px 0 rgba(45, 42, 38, 0.12);
}

/* Capsule / daisy / retro-zine — pill & pastel content shells */
.deck[data-surface="capsule-pills"] .stat {
  border-top: none;
  background: #fff;
  border: 2px solid var(--text);
  border-radius: 9999px;
  padding: 14px 22px;
}
.deck[data-surface="capsule-pills"] .stat .value { color: var(--accent); }
.deck[data-surface="capsule-pills"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 9999px;
  background: #fff;
  padding: 28px 32px;
}
.deck[data-surface="capsule-pills"] .comparison-col:last-child {
  background: var(--accent2);
  color: #1a1a1a;
}
.deck[data-surface="capsule-pills"] .comparison-col:last-child .comparison-label,
.deck[data-surface="capsule-pills"] .comparison-col:last-child p { color: #1a1a1a; }
.deck[data-surface="capsule-pills"] .grid.cols-bento .card:first-child {
  background: var(--accent2);
  color: #1a1a1a;
  border-color: var(--text);
}
.deck[data-surface="capsule-pills"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="capsule-pills"] .grid.cols-bento .card:first-child p,
.deck[data-surface="capsule-pills"] .grid.cols-bento .card:first-child i { color: #1a1a1a; }
.deck[data-surface="daisy-days-pastel"] .stat {
  border-top: 4px solid var(--text);
  background: #fff;
  border-radius: 16px;
  padding: 14px 16px;
  border: 2px solid var(--text);
}
.deck[data-surface="daisy-days-pastel"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 18px;
  background: #fff;
}
.deck[data-surface="daisy-days-pastel"] .comparison-col:last-child {
  /* Soft mint — muted/accent labels wash out; use ink */
  background: #b8f0e8;
  color: #2d2d2d;
}
.deck[data-surface="daisy-days-pastel"] .comparison-col:last-child .comparison-label,
.deck[data-surface="daisy-days-pastel"] .comparison-col:last-child p { color: #2d2d2d; }
.deck[data-surface="daisy-days-pastel"] .grid.cols-bento .card:first-child {
  background: #b8f0e8;
  color: #2d2d2d;
  border-color: var(--text);
}
.deck[data-surface="daisy-days-pastel"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="daisy-days-pastel"] .grid.cols-bento .card:first-child p,
.deck[data-surface="daisy-days-pastel"] .grid.cols-bento .card:first-child i { color: #2d2d2d; }
.deck[data-surface="daisy-days-pastel"] .quote {
  border-left: 4px solid var(--text);
  font-weight: 700;
}
.deck[data-surface="retro-zine-riso"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="retro-zine-riso"] .stat .value {
  font-family: var(--heading-font);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--accent);
}
.deck[data-surface="retro-zine-riso"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 0;
  background: var(--card-bg);
  mix-blend-mode: multiply;
}
.deck[data-surface="retro-zine-riso"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent) 18%, var(--card-bg));
}
.deck[data-surface="retro-zine-riso"] .quote {
  border-left: 4px solid var(--accent);
  font-family: "Caveat", cursive;
  font-size: clamp(26px, 3vw, 36px);
}

/* Raw grid / peoples platform / stencil — poster content */
.deck[data-surface="raw-grid-brutal"] .stat {
  border-top: 3px solid var(--text);
}
.deck[data-surface="raw-grid-brutal"] .stat .value {
  font-weight: 900;
  text-transform: uppercase;
}
.deck[data-surface="raw-grid-brutal"] .comparison-col {
  border: 3px solid var(--text);
  border-radius: 0;
  background: #fff;
}
.deck[data-surface="raw-grid-brutal"] .comparison-col:last-child {
  background: var(--accent);
  color: #0a0a0a;
}
.deck[data-surface="raw-grid-brutal"] .comparison-col:last-child .comparison-label,
.deck[data-surface="raw-grid-brutal"] .comparison-col:last-child p { color: #0a0a0a; }
.deck[data-surface="raw-grid-brutal"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #0a0a0a;
  border-color: var(--text);
}
.deck[data-surface="raw-grid-brutal"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="raw-grid-brutal"] .grid.cols-bento .card:first-child p,
.deck[data-surface="raw-grid-brutal"] .grid.cols-bento .card:first-child i { color: #0a0a0a; }
.deck[data-surface="raw-grid-brutal"] .card {
  border: 3px solid var(--text);
  border-radius: 0;
}
.deck[data-surface="raw-grid-brutal"] .quote {
  border-left: 6px solid var(--text);
  font-weight: 900;
  text-transform: uppercase;
}
.deck[data-surface="peoples-platform-poster"] .stat {
  border-top: 4px solid var(--accent);
}
.deck[data-surface="peoples-platform-poster"] .stat .value {
  color: var(--accent);
  font-family: var(--heading-font);
}
.deck[data-surface="peoples-platform-poster"] .comparison-col {
  border: 3px solid var(--text);
  border-radius: 0;
  background: #fff;
}
.deck[data-surface="peoples-platform-poster"] .comparison-col:last-child {
  /* Orange accent2 — blue accent labels fail AA; keep ink */
  background: var(--accent2);
  color: #1a1a1a;
}
.deck[data-surface="peoples-platform-poster"] .comparison-col:last-child .comparison-label,
.deck[data-surface="peoples-platform-poster"] .comparison-col:last-child p { color: #1a1a1a; }
.deck[data-surface="peoples-platform-poster"] .grid.cols-bento .card:first-child {
  background: var(--accent2);
  color: #1a1a1a;
  border-color: var(--text);
}
.deck[data-surface="peoples-platform-poster"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="peoples-platform-poster"] .grid.cols-bento .card:first-child p,
.deck[data-surface="peoples-platform-poster"] .grid.cols-bento .card:first-child i { color: #1a1a1a; }
.deck[data-surface="peoples-platform-poster"] .quote {
  border-left: 6px solid var(--accent);
  font-weight: 800;
}
.deck[data-surface="stencil-tablet-earth"] .stat {
  border-top: 4px solid var(--text);
}
.deck[data-surface="stencil-tablet-earth"] .stat .value {
  font-family: var(--heading-font);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.deck[data-surface="stencil-tablet-earth"] .comparison-col {
  border: 2px solid var(--text);
  border-radius: 20px;
  background: var(--card-bg);
}
.deck[data-surface="stencil-tablet-earth"] .comparison-col:last-child {
  background: var(--accent2);
  color: #fff;
}
.deck[data-surface="stencil-tablet-earth"] .comparison-col:last-child .comparison-label,
.deck[data-surface="stencil-tablet-earth"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="stencil-tablet-earth"] .quote {
  border-left: 5px solid var(--accent);
  font-family: var(--heading-font);
  text-transform: uppercase;
}

/* Cobalt grid / cartesian / pin-paper — draft & pad content */
.deck[data-surface="cobalt-grid-paper"] .stat {
  border-top: 2px solid var(--accent);
}
.deck[data-surface="cobalt-grid-paper"] .stat .value {
  color: var(--accent);
  font-family: var(--heading-font);
}
.deck[data-surface="cobalt-grid-paper"] .comparison-col {
  border-radius: 0;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
}
.deck[data-surface="cobalt-grid-paper"] .comparison-col:last-child {
  border-left: 4px solid var(--accent);
}
.deck[data-surface="cobalt-grid-paper"] .card {
  border-radius: 0;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
}
.deck[data-surface="cartesian-draft"] .stat {
  border-top: 1px solid var(--accent);
}
.deck[data-surface="cartesian-draft"] .stat .value {
  font-family: var(--heading-font);
  font-weight: 400;
}
.deck[data-surface="cartesian-draft"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 1px solid var(--border);
  padding-left: 0;
}
.deck[data-surface="cartesian-draft"] .comparison-col:last-child {
  border-top-color: var(--text);
}
.deck[data-surface="cartesian-draft"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="cartesian-draft"] .quote::before {
  content: "";
  display: block;
  width: 48px;
  height: 1px;
  background: var(--accent);
  margin-bottom: 22px;
}
.deck[data-surface="pin-paper-pad"] .stat {
  border-top: 2px solid var(--accent);
  background: rgba(255, 255, 255, 0.55);
  padding: 12px 14px;
}
.deck[data-surface="pin-paper-pad"] .comparison-col {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid color-mix(in srgb, var(--text) 18%, transparent);
  border-radius: 4px;
  box-shadow: 2px 3px 0 rgba(31, 58, 138, 0.1);
}
.deck[data-surface="pin-paper-pad"] .comparison-col:last-child {
  border-color: var(--accent);
}
.deck[data-surface="pin-paper-pad"] .quote {
  border-left: 3px solid var(--accent);
  font-family: "Caveat", cursive;
  font-size: clamp(26px, 3vw, 36px);
}

/* Pink script / split pastel / tri-tone — fashion & night content */
.deck[data-surface="pink-script-afterhours"] .stat {
  border-top: 2px solid var(--accent);
}
.deck[data-surface="pink-script-afterhours"] .stat .value {
  color: var(--accent);
  font-family: var(--heading-font);
  font-style: italic;
}
.deck[data-surface="pink-script-afterhours"] .comparison-col {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}
.deck[data-surface="pink-script-afterhours"] .comparison-col:last-child {
  background: var(--accent);
  color: #060507;
}
.deck[data-surface="pink-script-afterhours"] .comparison-col:last-child .comparison-label,
.deck[data-surface="pink-script-afterhours"] .comparison-col:last-child p { color: #060507; }
.deck[data-surface="pink-script-afterhours"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #060507;
  border-color: var(--accent);
}
.deck[data-surface="pink-script-afterhours"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="pink-script-afterhours"] .grid.cols-bento .card:first-child p,
.deck[data-surface="pink-script-afterhours"] .grid.cols-bento .card:first-child i { color: #060507; }
.deck[data-surface="pink-script-afterhours"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  color: var(--accent);
  max-width: 28ch;
}
.deck[data-surface="split-pastel-panels"] .stat {
  border-top: 3px solid var(--text);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  padding: 14px 16px;
}
.deck[data-surface="split-pastel-panels"] .comparison-col {
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.75);
  border: none;
}
.deck[data-surface="split-pastel-panels"] .comparison-col:last-child {
  /* Mint accent fails accent-colored labels — force ink */
  background: var(--accent);
  color: #1a1a1a;
}
.deck[data-surface="split-pastel-panels"] .comparison-col:last-child .comparison-label,
.deck[data-surface="split-pastel-panels"] .comparison-col:last-child p { color: #1a1a1a; }
.deck[data-surface="split-pastel-panels"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #1a1a1a;
  border-color: var(--text);
}
.deck[data-surface="split-pastel-panels"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="split-pastel-panels"] .grid.cols-bento .card:first-child p,
.deck[data-surface="split-pastel-panels"] .grid.cols-bento .card:first-child i { color: #1a1a1a; }
.deck[data-surface="split-pastel-panels"] .quote {
  border-left: 5px solid var(--text);
  font-weight: 800;
}
.deck[data-surface="tri-tone-blocks"] .stat {
  border-top: 6px solid #f2b6c6;
}
.deck[data-surface="tri-tone-blocks"] .stat:nth-child(2) { border-top-color: #f2d86a; }
.deck[data-surface="tri-tone-blocks"] .stat:nth-child(3) { border-top-color: #7a1f35; }
.deck[data-surface="tri-tone-blocks"] .comparison-col {
  border-radius: 0;
  border: 2px solid var(--text);
  background: #fff;
}
.deck[data-surface="tri-tone-blocks"] .comparison-col:last-child {
  background: #7a1f35;
  color: #fff;
}
.deck[data-surface="tri-tone-blocks"] .comparison-col:last-child .comparison-label,
.deck[data-surface="tri-tone-blocks"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="tri-tone-blocks"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="tri-tone-blocks"] .quote::before {
  content: "";
  display: block;
  width: 48px;
  height: 6px;
  background: #f2d86a;
  margin-bottom: 20px;
}

/* Grove / emerald / editorial forest / long-table / mat — editorial earth */
.deck[data-surface="grove-monograph"] .stat {
  border-top: 2px solid var(--accent2);
}
.deck[data-surface="grove-monograph"] .stat .value {
  font-family: var(--heading-font);
  font-style: italic;
  color: var(--accent2);
}
.deck[data-surface="grove-monograph"] .comparison-col {
  border-radius: 0;
  background: color-mix(in srgb, var(--bg-2) 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent2) 35%, transparent);
}
.deck[data-surface="grove-monograph"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="grove-monograph"] .quote::before {
  content: "";
  display: block;
  width: 40px;
  height: 1px;
  background: var(--accent2);
  margin-bottom: 22px;
}
.deck[data-surface="emerald-editorial-masthead"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="emerald-editorial-masthead"] .stat .value {
  font-family: var(--heading-font);
  color: var(--text);
}
.deck[data-surface="emerald-editorial-masthead"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 2px solid var(--accent);
  padding-left: 0;
}
.deck[data-surface="emerald-editorial-masthead"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  max-width: 32ch;
}
.deck[data-surface="emerald-editorial-masthead"] .quote::before {
  content: "";
  display: block;
  width: 56px;
  height: 3px;
  background: var(--accent);
  margin-bottom: 22px;
}
.deck[data-surface="editorial-forest-paper"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 1px solid color-mix(in srgb, var(--text) 25%, transparent);
  padding-left: 0;
}
.deck[data-surface="editorial-forest-paper"] .comparison-col:last-child {
  border-top-color: var(--accent);
}
.deck[data-surface="editorial-forest-paper"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="editorial-forest-paper"] .quote::before {
  content: "";
  display: block;
  width: 40px;
  height: 2px;
  background: var(--accent2);
  margin-bottom: 20px;
}
.deck[data-surface="editorial-forest-paper"] .card {
  border-radius: 0;
  background: color-mix(in srgb, #fff 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--text) 15%, transparent);
}
.deck[data-surface="long-table-supper"] .stat {
  border-top: 2px solid var(--accent);
}
.deck[data-surface="long-table-supper"] .stat .value {
  font-family: var(--heading-font);
  font-style: italic;
}
.deck[data-surface="long-table-supper"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 1px solid var(--accent);
}
.deck[data-surface="long-table-supper"] .quote {
  border-left: none;
  font-family: var(--heading-font);
  font-style: italic;
  max-width: 28ch;
}
.deck[data-surface="long-table-supper"] .quote::before {
  content: "";
  display: block;
  width: 64px;
  height: 1px;
  background: var(--accent);
  margin-bottom: 22px;
}
.deck[data-surface="mat-woodglow"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="mat-woodglow"] .stat .value {
  color: var(--accent);
}
.deck[data-surface="mat-woodglow"] .comparison-col {
  border-radius: 0;
  background: color-mix(in srgb, var(--bg-2) 55%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="mat-woodglow"] .comparison-col:last-child {
  /* Amber fill fails cream copy — ink clears WCAG AA */
  background: var(--accent);
  color: #1a1208;
}
.deck[data-surface="mat-woodglow"] .comparison-col:last-child .comparison-label,
.deck[data-surface="mat-woodglow"] .comparison-col:last-child p { color: #1a1208; }
.deck[data-surface="mat-woodglow"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #1a1208;
  border-color: var(--text);
}
.deck[data-surface="mat-woodglow"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="mat-woodglow"] .grid.cols-bento .card:first-child p,
.deck[data-surface="mat-woodglow"] .grid.cols-bento .card:first-child i { color: #1a1208; }
.deck[data-surface="mat-woodglow"] .quote {
  border-left: 4px solid var(--accent);
}

/* Monochrome / blue-professional / corporate / playful / retro-windows / arcade polish */
.deck[data-surface="monochrome-ledger"] .stat {
  border-top: 1px solid var(--text);
}
.deck[data-surface="monochrome-ledger"] .stat .value {
  font-family: var(--heading-font);
  font-weight: 200;
  letter-spacing: -0.04em;
}
.deck[data-surface="monochrome-ledger"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 1px solid color-mix(in srgb, var(--text) 30%, transparent);
  padding-left: 0;
}
.deck[data-surface="monochrome-ledger"] .quote {
  border-left: none;
  font-family: var(--body-font);
  font-style: italic;
  max-width: 28ch;
}
.deck[data-surface="monochrome-ledger"] .quote::before {
  content: "";
  display: block;
  width: 32px;
  height: 1px;
  background: var(--text);
  margin-bottom: 24px;
}
.deck[data-surface="monochrome-ledger"] .card {
  border-radius: 0;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--text) 22%, transparent);
}
.deck[data-surface="blue-professional-clean"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="blue-professional-clean"] .stat .value {
  color: var(--accent);
  font-weight: 700;
}
.deck[data-surface="blue-professional-clean"] .comparison-col {
  border-radius: 12px;
  background: color-mix(in srgb, var(--accent) 4%, #fff);
  border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
}
.deck[data-surface="blue-professional-clean"] .comparison-col:last-child {
  background: var(--accent);
  color: #fff;
}
.deck[data-surface="blue-professional-clean"] .comparison-col:last-child .comparison-label,
.deck[data-surface="blue-professional-clean"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="blue-professional-clean"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #fff;
  border-color: color-mix(in srgb, var(--accent) 40%, transparent);
}
.deck[data-surface="blue-professional-clean"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="blue-professional-clean"] .grid.cols-bento .card:first-child p,
.deck[data-surface="blue-professional-clean"] .grid.cols-bento .card:first-child i { color: #fff; }
.deck[data-surface="blue-professional-clean"] .card {
  border-radius: 12px;
  border: 1px solid color-mix(in srgb, var(--accent) 16%, transparent);
  background: color-mix(in srgb, var(--accent) 4%, #fff);
}
.deck[data-surface="clean-light"] .stat {
  border-top: 3px solid var(--accent);
}
.deck[data-surface="clean-light"] .comparison-col {
  border-radius: 8px;
  background: var(--card-bg);
  border: 1px solid var(--border);
}
.deck[data-surface="clean-light"] .comparison-col:last-child {
  border-color: var(--accent);
  box-shadow: inset 3px 0 0 var(--accent);
}
.deck[data-surface="clean-light"] .quote {
  border-left: 3px solid var(--accent);
}
.deck[data-surface="soft-bento"] .stat {
  border-top: 4px solid var(--accent);
  border-radius: 16px;
  background: color-mix(in srgb, var(--accent) 6%, #fff);
  padding: 14px 16px;
}
.deck[data-surface="soft-bento"] .comparison-col {
  border-radius: 20px;
  border: 2px solid color-mix(in srgb, var(--accent) 25%, transparent);
  background: #fff;
}
.deck[data-surface="soft-bento"] .comparison-col:last-child {
  background: var(--accent2);
  border-color: var(--accent2);
  color: #1a1a2e;
}
.deck[data-surface="soft-bento"] .comparison-col:last-child .comparison-label,
.deck[data-surface="soft-bento"] .comparison-col:last-child p { color: #1a1a2e; }
.deck[data-surface="soft-bento"] .grid.cols-bento .card:first-child {
  background: var(--accent2);
  color: #1a1a2e;
  border-color: var(--accent2);
}
.deck[data-surface="soft-bento"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="soft-bento"] .grid.cols-bento .card:first-child p,
.deck[data-surface="soft-bento"] .grid.cols-bento .card:first-child i { color: #1a1a2e; }
.deck[data-surface="soft-bento"] .quote {
  border-left: 5px solid var(--accent);
  font-weight: 800;
}
.deck[data-surface="retro-windows-chrome"] .stat {
  border-top: none;
  background: #fff;
  border: 2px solid #000;
  box-shadow: inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
  padding: 12px 14px;
  border-radius: 0;
}
.deck[data-surface="retro-windows-chrome"] .comparison-col {
  border-radius: 0;
  background: #fff;
  border: 2px solid #000;
  box-shadow: inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
}
.deck[data-surface="retro-windows-chrome"] .comparison-col:last-child {
  background: #000080;
  color: #fff;
  box-shadow: none;
}
.deck[data-surface="retro-windows-chrome"] .comparison-col:last-child .comparison-label,
.deck[data-surface="retro-windows-chrome"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="retro-windows-chrome"] .quote {
  border-left: 4px solid #000080;
  font-family: "VT323", monospace;
  font-size: clamp(28px, 3.2vw, 40px);
}
.deck[data-surface="retro-windows-chrome"] .card {
  border-radius: 0;
  background: #fff;
  border: 2px solid #000;
  box-shadow: inset -2px -2px 0 #808080, inset 2px 2px 0 #fff;
}
.deck[data-surface="scanline-neon"] .comparison-col {
  border-radius: 0;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent2) 45%, transparent);
}
.deck[data-surface="scanline-neon"] .comparison-col:last-child {
  /* Arcade magenta fails pure white — darken fill for AA */
  background: color-mix(in srgb, var(--accent) 72%, #050008);
  color: #fff;
  border-color: var(--accent);
  box-shadow: 0 0 18px color-mix(in srgb, var(--accent) 35%, transparent);
}
.deck[data-surface="scanline-neon"] .comparison-col:last-child .comparison-label,
.deck[data-surface="scanline-neon"] .comparison-col:last-child p { color: #fff; }
.deck[data-surface="scanline-neon"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 72%, #050008);
  color: #fff;
  border-color: var(--accent2);
}
.deck[data-surface="scanline-neon"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="scanline-neon"] .grid.cols-bento .card:first-child p,
.deck[data-surface="scanline-neon"] .grid.cols-bento .card:first-child i { color: #fff; }
.deck[data-surface="scanline-neon"] .card {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--accent2) 35%, transparent);
  background: color-mix(in srgb, var(--accent) 6%, transparent);
}
.deck[data-surface="scanline-neon"] .quote {
  border-left: 3px solid var(--accent);
  text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 40%, transparent);
}
.deck[data-surface="brutalist-grid"] .stat {
  border-top: 3px solid var(--text);
}
.deck[data-surface="brutalist-grid"] .stat .value {
  font-family: var(--heading-font);
  color: var(--accent);
}
.deck[data-surface="brutalist-grid"] .comparison-col:last-child {
  background: var(--accent);
  color: #111;
  border-color: var(--text);
}
.deck[data-surface="brutalist-grid"] .comparison-col:last-child .comparison-label,
.deck[data-surface="brutalist-grid"] .comparison-col:last-child p { color: #111; }
.deck[data-surface="brutalist-grid"] .grid.cols-bento .card:first-child {
  background: var(--accent);
  color: #111;
  border-color: var(--text);
}
.deck[data-surface="brutalist-grid"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="brutalist-grid"] .grid.cols-bento .card:first-child p,
.deck[data-surface="brutalist-grid"] .grid.cols-bento .card:first-child i { color: #111; }
.deck[data-surface="brutalist-grid"] .quote {
  border-left: 4px solid var(--accent);
  font-family: var(--heading-font);
  text-transform: uppercase;
}
.deck[data-surface="editorial-rule"] .stat {
  border-top: 2px solid var(--accent);
}
.deck[data-surface="editorial-rule"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border-top: 1px solid color-mix(in srgb, var(--text) 28%, transparent);
  padding-left: 0;
}
.deck[data-surface="editorial-rule"] .comparison-col:last-child {
  border-top-color: var(--accent);
}
.deck[data-surface="editorial-rule"] .card {
  border-radius: 0;
  background: transparent;
  border: none;
  border-left: 3px solid var(--accent);
}

/* Scroll-triggered reveals (populated by document.html script) */
.slide .reveal {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--reveal-delay, 0ms);
}
.slide.in-view .reveal {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .slide .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

/* ── Stunning-25 body chrome: keep content slides on-brand past the cover ── */

/* Aurora glass / glass mist — frosted cards, soft winner, code window sheen */
.deck[data-surface="aurora-glass"] .card,
.deck[data-surface="glass-mist"] .card {
  backdrop-filter: blur(14px);
  background: color-mix(in srgb, var(--card-bg) 72%, transparent);
  border: 1px solid color-mix(in srgb, #ffffff 28%, var(--border));
  box-shadow: 0 12px 40px color-mix(in srgb, var(--accent) 12%, transparent);
}
.deck[data-surface="aurora-glass"] .grid.cols-bento .card:first-child,
.deck[data-surface="glass-mist"] .grid.cols-bento .card:first-child {
  background: linear-gradient(
    145deg,
    color-mix(in srgb, var(--accent) 55%, transparent),
    color-mix(in srgb, var(--accent-2) 40%, var(--card-bg))
  );
  border-color: color-mix(in srgb, #ffffff 40%, transparent);
  color: #fff;
}
.deck[data-surface="aurora-glass"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="aurora-glass"] .grid.cols-bento .card:first-child p,
.deck[data-surface="aurora-glass"] .grid.cols-bento .card:first-child i,
.deck[data-surface="glass-mist"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="glass-mist"] .grid.cols-bento .card:first-child p,
.deck[data-surface="glass-mist"] .grid.cols-bento .card:first-child i {
  color: #fff;
}
.deck[data-surface="aurora-glass"] .comparison-col:last-child,
.deck[data-surface="glass-mist"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent) 22%, var(--card-bg));
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
}
.deck[data-surface="aurora-glass"] .code-window,
.deck[data-surface="glass-mist"] .code-window {
  backdrop-filter: blur(10px);
  background: color-mix(in srgb, #0b1220 78%, transparent);
  border: 1px solid color-mix(in srgb, #ffffff 18%, transparent);
}
.deck[data-surface="aurora-glass"] .quote,
.deck[data-surface="glass-mist"] .quote {
  border-left: 3px solid transparent;
  border-image: linear-gradient(180deg, var(--accent), var(--accent-2)) 1;
  font-weight: 500;
}
.deck[data-surface="aurora-glass"] .chart-frame,
.deck[data-surface="glass-mist"] .chart-frame {
  backdrop-filter: blur(8px);
  background: color-mix(in srgb, var(--card-bg) 65%, transparent);
  border-radius: 16px;
  padding: 12px;
}
.deck[data-surface="aurora-glass"] .image-hero-slide .hero-caption,
.deck[data-surface="glass-mist"] .image-hero-slide .hero-caption {
  background: linear-gradient(180deg, transparent, color-mix(in srgb, #06101f 88%, transparent));
}

/* Fintech soft — calm panels, accent winner, tabular metrics */
.deck[data-surface="fintech-soft"] .card {
  background: var(--card-bg);
  border: 1px solid color-mix(in srgb, var(--text) 8%, var(--border));
  border-radius: 12px;
  box-shadow: 0 1px 0 color-mix(in srgb, #fff 70%, transparent) inset;
}
.deck[data-surface="fintech-soft"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent) 10%, var(--card-bg));
  border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
}
.deck[data-surface="fintech-soft"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--accent) 12%, var(--card-bg));
  border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
}
.deck[data-surface="fintech-soft"] .stat .value {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.04em;
}
.deck[data-surface="fintech-soft"] .data-table th {
  background: color-mix(in srgb, var(--accent) 8%, var(--bg2));
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.75em;
}
.deck[data-surface="fintech-soft"] .quote {
  border-left: 3px solid var(--accent);
  color: var(--text);
}

/* Hygge soft — warm paper cards, soft quote, gentle winner */
.deck[data-surface="hygge-soft"] .card {
  background: color-mix(in srgb, var(--card-bg) 92%, #fff);
  border: none;
  box-shadow: 0 10px 28px color-mix(in srgb, var(--text) 8%, transparent);
  border-radius: 18px;
}
.deck[data-surface="hygge-soft"] .comparison-col {
  border-radius: 18px;
  background: color-mix(in srgb, var(--card-bg) 88%, #fff);
}
.deck[data-surface="hygge-soft"] .comparison-col:last-child {
  background: color-mix(in srgb, var(--accent) 18%, var(--card-bg));
}
.deck[data-surface="hygge-soft"] .quote {
  border-left: none;
  padding-left: 0;
  font-style: italic;
  max-width: 30ch;
}
.deck[data-surface="hygge-soft"] .quote::before {
  content: "";
  display: block;
  width: 36px;
  height: 3px;
  background: var(--accent);
  border-radius: 999px;
  margin-bottom: 20px;
}
.deck[data-surface="hygge-soft"] .stat {
  border-top: 2px solid color-mix(in srgb, var(--accent) 45%, var(--border));
}

/* Broadsheet rule — masthead typography on body beats */
.deck[data-surface="broadsheet-rule"] .card,
.deck[data-surface="broadsheet-rule"] .comparison-col {
  border-radius: 0;
  background: transparent;
  border: none;
  border-top: 2px solid var(--text);
  box-shadow: none;
}
.deck[data-surface="broadsheet-rule"] .comparison-col:last-child {
  border-top-color: var(--accent);
  background: transparent;
}
.deck[data-surface="broadsheet-rule"] .grid.cols-bento .card:first-child {
  background: var(--text);
  color: var(--bg);
  border: none;
  padding: 24px;
}
.deck[data-surface="broadsheet-rule"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="broadsheet-rule"] .grid.cols-bento .card:first-child p,
.deck[data-surface="broadsheet-rule"] .grid.cols-bento .card:first-child i {
  color: var(--bg);
}
.deck[data-surface="broadsheet-rule"] .quote {
  border-left: 4px solid var(--text);
  font-family: var(--heading-font);
  font-size: clamp(28px, 3.5vw, 44px);
  line-height: 1.15;
}
.deck[data-surface="broadsheet-rule"] .stat .value {
  font-family: var(--heading-font);
  font-weight: 700;
}
.deck[data-surface="broadsheet-rule"] .data-table {
  border-top: 2px solid var(--text);
  border-bottom: 2px solid var(--text);
}
.deck[data-surface="broadsheet-rule"] .data-table th {
  border-bottom: 1px solid var(--text);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.72em;
}

/* Heritage wash — museum card mats + gold emphasis */
.deck[data-surface="heritage-wash"] .card {
  background: color-mix(in srgb, var(--card-bg) 94%, #fff);
  border: 1px solid color-mix(in srgb, var(--accent) 35%, var(--border));
  box-shadow: 0 0 0 6px color-mix(in srgb, var(--bg2) 80%, transparent);
}
.deck[data-surface="heritage-wash"] .comparison-col:last-child {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 8%, var(--card-bg));
}
.deck[data-surface="heritage-wash"] .grid.cols-bento .card:first-child {
  background: color-mix(in srgb, var(--text) 92%, var(--accent));
  color: var(--bg);
  border-color: var(--accent);
}
.deck[data-surface="heritage-wash"] .grid.cols-bento .card:first-child h3,
.deck[data-surface="heritage-wash"] .grid.cols-bento .card:first-child p,
.deck[data-surface="heritage-wash"] .grid.cols-bento .card:first-child i {
  color: var(--bg);
}
.deck[data-surface="heritage-wash"] .quote {
  border-left: 2px solid var(--accent);
  font-family: var(--heading-font);
  font-weight: 400;
}
.deck[data-surface="heritage-wash"] .stat .value {
  color: var(--accent);
  font-weight: 500;
}

/* Quiet luxe — deepen remaining body shells */
.deck[data-surface="quiet-luxe"] .card {
  background: transparent;
  border: none;
  border-top: 1px solid color-mix(in srgb, var(--accent) 55%, var(--border));
  border-radius: 0;
  padding-top: 20px;
}
.deck[data-surface="quiet-luxe"] .grid.cols-bento .card:first-child {
  border-top-width: 2px;
  border-top-color: var(--accent);
}
.deck[data-surface="quiet-luxe"] .code-window {
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--accent) 40%, var(--border));
  background: color-mix(in srgb, var(--bg2) 90%, #000);
}
.deck[data-surface="quiet-luxe"] .chart-frame {
  border-top: 1px solid var(--accent);
  padding-top: 16px;
}
`,n="warm-paper",e="clean-light",a="soft-bento",r="bauhaus-blocks",t="vapor-horizon",o="hygge-soft",i="blueprint-grid",d="glass-mist",s="newsprint-masthead",c="vellum-colorfield",l="broadside-fire",p="signal-briefing",b="coral-hatch",f="capsule-pills",g="studio-acid",u="grove-monograph",x="scatterbrain-cork",m="mat-woodglow",h="cartesian-draft",k="monochrome-ledger",W={claude:n,"default-tech":"neon-glow",corporate:e,playful:a,"luxury-minimalist":"quiet-luxe","retro-arcade":"scanline-neon","editorial-serif":"editorial-rule","brutalist-mono":"brutalist-grid","pastel-dreamy":"pastel-cloud","aurora-glass":"aurora-glass","ft-editorial":"broadsheet-rule","genz-bento":"hard-bento","crt-terminal":"crt-phosphor","swiss-typographic":"swiss-grid","candy-pop":"candy-blob","aerospace-hud":"hud-grid","brutalist-acid":"acid-block",bauhaus:r,"y2k-aero":"aero-bubble","risograph-zine":"riso-print","neon-noir":"neon-rain",vaporwave:t,"botanical-luxe":"botanical-leaf","heritage-editorial":"heritage-wash","fintech-clean":"fintech-soft","developer-dark":"dev-terminal","data-editorial":"data-rule",scandinavian:o,"art-deco":"deco-fan","kinetic-wrapped":"wrapped-block",blueprint:i,glassmorphism:d,broadsheet:s,"soft-editorial":"soft-editorial-paper","editorial-forest":"editorial-forest-paper","pin-and-paper":"pin-paper-pad",vellum:c,"neo-grid-bold":"neo-grid-panels","editorial-tri-tone":"tri-tone-blocks","creative-mode":"creative-mode-blocks",broadside:l,"bold-signal":"bold-signal-card","notebook-tabs":"notebook-tabs-page","creative-voltage":"creative-voltage-split",signal:p,"electric-studio":"electric-studio-split","dark-botanical":"dark-botanical-bloom","pastel-geometry":"pastel-geometry-pills","split-pastel":"split-pastel-panels","vintage-editorial":"vintage-editorial-geo","paper-ink":"paper-ink-literary","biennale-yellow":"biennale-yellow-sun","bold-poster":"bold-poster-ink",coral:b,"emerald-editorial":"emerald-editorial-masthead","sakura-chroma":"sakura-chroma-cassette","pink-script":"pink-script-afterhours","block-frame":"block-frame-brutal",capsule:f,"cobalt-grid":"cobalt-grid-paper","8-bit-orbit":"bit-orbit-arcade",studio:g,grove:u,scatterbrain:x,"peoples-platform":"peoples-platform-poster","retro-windows":"retro-windows-chrome","raw-grid":"raw-grid-brutal","long-table":"long-table-supper",mat:m,"stencil-tablet":"stencil-tablet-earth",cartesian:h,monochrome:k,"blue-professional":"blue-professional-clean","daisy-days":"daisy-days-pastel","retro-zine":"retro-zine-riso"},j=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{{title}}</title>
<meta name="description" content="{{description}}" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
<style>
{{{styles}}}
</style>
</head>
<body>
<main class="deck" data-surface="{{surface}}">
{{{slides}}}
</main>
<div class="nav-hint" aria-hidden="true">← → · E edit · G overview · F strip · L laser · D ink · B/W · S notes · T timer · P pace · O speaker · ? help</div>
<div class="pmd-edit-hotzone" id="pmd-edit-hotzone" aria-hidden="true"></div>
<button type="button" class="pmd-edit-toggle" id="pmd-edit-toggle" title="Edit mode (E)">Edit</button>
<nav class="pmd-slide-dots" id="pmd-slide-dots" aria-label="Slide navigation"></nav>
<div class="pmd-progress" id="pmd-progress" aria-hidden="true"><i class="pmd-progress-bar" id="pmd-progress-bar"></i></div>
<div class="pmd-stage-tools" id="pmd-stage-tools" aria-hidden="true">
  <canvas class="pmd-ink-canvas" id="pmd-ink-canvas"></canvas>
  <div class="pmd-laser-layer" id="pmd-laser-layer" hidden></div>
</div>
<div class="pmd-curtain pmd-blackout" id="pmd-blackout" hidden role="status" aria-live="polite" title="Blackout · B or click to restore">
  <span class="pmd-curtain-hint">Blackout · B or click to restore</span>
</div>
<div class="pmd-curtain pmd-whiteout" id="pmd-whiteout" hidden role="status" aria-live="polite" title="Whiteout · W or click to restore">
  <span class="pmd-curtain-hint">Whiteout · W or click to restore</span>
</div>
<aside class="pmd-notes-rail" id="pmd-notes-rail" hidden aria-label="Speaker notes">
  <div class="pmd-notes-section">
    <div class="pmd-notes-label">Speaker notes · S to hide</div>
    <p class="pmd-notes-body" id="pmd-notes-body"></p>
  </div>
  <div class="pmd-notes-next" id="pmd-notes-next">
    <div class="pmd-notes-label" id="pmd-notes-next-label">Up next</div>
    <div class="pmd-next-frame-wrap" id="pmd-next-frame-wrap"></div>
  </div>
</aside>
<div class="pmd-filmstrip" id="pmd-filmstrip" hidden aria-label="Slide filmstrip peek">
  <div class="pmd-filmstrip-track" id="pmd-filmstrip-track" role="listbox" aria-label="Slide filmstrip" aria-orientation="horizontal"></div>
</div>
<div class="pmd-present-bar" id="pmd-present-bar" aria-label="Presenter controls">
  <span class="pmd-present-count" id="pmd-present-count">1 / 1</span>
  <span class="pmd-present-timer" id="pmd-present-timer" title="Elapsed · P pace · T pause · R reset">0:00</span>
  <button type="button" class="pmd-present-btn" id="pmd-btn-speaker" title="Speaker notes window (O)">Speaker · O</button>
  <button type="button" class="pmd-present-btn" id="pmd-btn-notes" title="Toggle speaker notes (S)">Notes · S</button>
  <button type="button" class="pmd-present-btn" id="pmd-btn-strip" title="Toggle filmstrip peek (F)" hidden>Hide strip · F</button>
  <button type="button" class="pmd-present-btn" id="pmd-btn-overview" title="Overview grid (G)">Overview · G</button>
  <button type="button" class="pmd-present-btn" id="pmd-btn-edit" title="Edit text (E) · ⌘/Ctrl+S saves">Edit · E</button>
  <button type="button" class="pmd-present-btn" id="pmd-btn-save" title="Save HTML (⌘/Ctrl+S)" hidden>Save · ⌘S</button>
  <button type="button" class="pmd-present-btn" id="pmd-btn-laser" title="Laser pointer (L)">Laser · L</button>
  <button type="button" class="pmd-present-btn" id="pmd-btn-ink" title="Ink / draw (D) · C clears">Ink · D</button>
  <button type="button" class="pmd-present-btn" id="pmd-btn-ink-clear" title="Clear ink (C)" hidden>Clear ink · C</button>
  <button type="button" class="pmd-present-btn" id="pmd-btn-blackout" title="Blackout (B)">Blackout · B</button>
  <button type="button" class="pmd-present-btn" id="pmd-btn-whiteout" title="Whiteout (W)">Whiteout · W</button>
  <button type="button" class="pmd-present-btn" id="pmd-btn-help" title="Shortcuts (?)">?</button>
</div>
<div class="pmd-overview" id="pmd-overview" hidden role="dialog" aria-label="Slide overview">
  <div class="pmd-overview-panel">
    <div class="pmd-overview-head">
      <span>Overview · G or Esc to close</span>
      <button type="button" class="pmd-present-btn" id="pmd-btn-overview-close">Close</button>
    </div>
    <div class="pmd-overview-grid" id="pmd-overview-grid"></div>
  </div>
</div>
<div class="pmd-present-help" id="pmd-present-help" hidden role="dialog" aria-label="Presenter shortcuts">
  <div class="pmd-present-help-card">
    <div class="pmd-present-help-head">
      <span>Shortcuts · ? or Esc</span>
      <button type="button" class="pmd-present-btn" id="pmd-btn-help-close">Close</button>
    </div>
    <ul class="pmd-present-help-list">
      <li><kbd>← → Space</kbd><span>Previous / next slide</span></li>
      <li><kbd>1–9</kbd><span>Jump to slide</span></li>
      <li><kbd>Home / End</kbd><span>First / last slide</span></li>
      <li><kbd>G</kbd><span>Overview grid</span></li>
      <li><kbd>F</kbd><span>Filmstrip peek</span></li>
      <li><kbd>E</kbd><span>Edit text</span></li>
      <li><kbd>⌘/Ctrl+S</kbd><span>Save HTML (when editing)</span></li>
      <li><kbd>S</kbd><span>Speaker notes</span></li>
      <li><kbd>L</kbd><span>Laser pointer</span></li>
      <li><kbd>D</kbd><span>Ink / draw</span></li>
      <li><kbd>C</kbd><span>Clear ink (when drawing)</span></li>
      <li><kbd>B</kbd><span>Blackout</span></li>
      <li><kbd>W</kbd><span>Whiteout</span></li>
      <li><kbd>T</kbd><span>Pause / resume timer</span></li>
      <li><kbd>R</kbd><span>Reset timer</span></li>
      <li><kbd>P</kbd><span>Pace target (5–30m countdown)</span></li>
      <li><kbd>O</kbd><span>Speaker notes window</span></li>
      <li><kbd>?</kbd><span>Shortcuts</span></li>
      <li><kbd>Esc</kbd><span>Close overlay</span></li>
    </ul>
  </div>
</div>
{{{attribution}}}
{{{deckData}}}
<script>
(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  if (!slides.length) return;
  document.documentElement.classList.add("pmd-live-present");

  slides.forEach(function (slide) {
    var kids = slide.querySelectorAll("h1, h2, h3, .eyebrow, .lead, .card, .stat, .quote, .btn, table, .timeline .node");
    for (var i = 0; i < kids.length; i++) {
      kids[i].classList.add("reveal");
      kids[i].style.setProperty("--reveal-delay", String(Math.min(i * 70, 280)) + "ms");
    }
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add("in-view");
      });
    }, { threshold: 0.35 });
    slides.forEach(function (s) { io.observe(s); });
    slides[0].classList.add("in-view");
  } else {
    slides.forEach(function (s) { s.classList.add("in-view"); });
  }

  function currentIndex() {
    var y = window.scrollY || window.pageYOffset;
    var best = 0;
    var bestDist = Infinity;
    for (var i = 0; i < slides.length; i++) {
      var d = Math.abs(slides[i].offsetTop - y);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    return best;
  }

  function go(delta) {
    var y = window.scrollY || window.pageYOffset;
    var target = null;
    if (delta > 0) {
      for (var i = 0; i < slides.length; i++) {
        if (slides[i].offsetTop > y + 8) { target = slides[i]; break; }
      }
    } else {
      for (var j = slides.length - 1; j >= 0; j--) {
        if (slides[j].offsetTop < y - 8) { target = slides[j]; break; }
      }
    }
    if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function jumpTo(index) {
    var i = Math.max(0, Math.min(slides.length - 1, index));
    setBlackout(false);
    setWhiteout(false);
    setHelp(false);
    setOverview(false);
    slides[i].scrollIntoView({ behavior: "smooth", block: "center" });
    syncUi();
  }

  var LASER_TRAIL = 5;
  var INK_COLOR = "#ef4444";
  var INK_WIDTH = 3.5;
  var stageTools = document.getElementById("pmd-stage-tools");
  var inkCanvas = document.getElementById("pmd-ink-canvas");
  var laserLayer = document.getElementById("pmd-laser-layer");
  var overviewEl = document.getElementById("pmd-overview");
  var overviewGrid = document.getElementById("pmd-overview-grid");
  var dotsEl = document.getElementById("pmd-slide-dots");
  var progressBar = document.getElementById("pmd-progress-bar");
  var nextFrameWrap = document.getElementById("pmd-next-frame-wrap");
  var nextLabel = document.getElementById("pmd-notes-next-label");
  var notesNext = document.getElementById("pmd-notes-next");
  var btnLaser = document.getElementById("pmd-btn-laser");
  var btnInk = document.getElementById("pmd-btn-ink");
  var btnInkClear = document.getElementById("pmd-btn-ink-clear");
  var btnOverview = document.getElementById("pmd-btn-overview");
  var btnOverviewClose = document.getElementById("pmd-btn-overview-close");
  var btnStrip = document.getElementById("pmd-btn-strip");
  var filmstripEl = document.getElementById("pmd-filmstrip");
  var filmstripTrack = document.getElementById("pmd-filmstrip-track");
  var btnEdit = document.getElementById("pmd-btn-edit");
  var btnSave = document.getElementById("pmd-btn-save");
  var editToggle = document.getElementById("pmd-edit-toggle");
  var editHotzone = document.getElementById("pmd-edit-hotzone");
  var laserOn = false;
  var inkOn = false;
  var laserTrail = [];
  var inkDrawing = false;
  var lastSlideForInk = -1;
  var showOverview = false;
  var overviewBuilt = false;
  var showStrip = slides.length > 1;
  var stripBuilt = false;
  var stripButtons = [];
  var syncingHash = false;
  var dotButtons = [];
  var editOn = false;
  var EDIT_SEL = "h1, h2, h3, h4, p, li, .lead, .eyebrow, .quote, .stat .value, .stat .label, .card h3, .card p, .comparison-label, .btn, td, th, .timeline .node";
  var editHideTimer = null;

  var notesBySlide = [];
  try {
    var deckEl = document.getElementById("pmd-deck") || document.getElementById("psp-deck");
    if (deckEl && deckEl.textContent) {
      var deck = JSON.parse(deckEl.textContent);
      if (deck && Array.isArray(deck.slides)) {
        notesBySlide = deck.slides.map(function (s) {
          return s && typeof s.notes === "string" ? s.notes.trim() : "";
        });
      }
    }
  } catch (err) { /* ignore malformed embed */ }

  var blackoutEl = document.getElementById("pmd-blackout");
  var whiteoutEl = document.getElementById("pmd-whiteout");
  var notesRail = document.getElementById("pmd-notes-rail");
  var notesBody = document.getElementById("pmd-notes-body");
  var helpEl = document.getElementById("pmd-present-help");
  var countEl = document.getElementById("pmd-present-count");
  var timerEl = document.getElementById("pmd-present-timer");
  var btnNotes = document.getElementById("pmd-btn-notes");
  var btnSpeaker = document.getElementById("pmd-btn-speaker");
  var btnBlackout = document.getElementById("pmd-btn-blackout");
  var btnWhiteout = document.getElementById("pmd-btn-whiteout");
  var btnHelp = document.getElementById("pmd-btn-help");
  var btnHelpClose = document.getElementById("pmd-btn-help-close");

  var showNotes = false;
  var showHelp = false;
  var timerRunning = true;
  var startedAt = Date.now();
  var accumulated = 0;
  var paceMinutes = 0;
  var PACE_PRESETS = [0, 5, 10, 15, 20, 30];

  function clearLaserTrail() {
    laserTrail = [];
    if (laserLayer) laserLayer.innerHTML = "";
  }

  function paintLaserTrail() {
    if (!laserLayer) return;
    laserLayer.innerHTML = "";
    for (var i = 0; i < laserTrail.length; i++) {
      var p = laserTrail[i];
      var t = (i + 1) / laserTrail.length;
      var isTip = i === laserTrail.length - 1;
      var dot = document.createElement("span");
      dot.className = "pmd-laser-dot" + (isTip ? " is-tip" : "");
      dot.style.left = p.x + "px";
      dot.style.top = p.y + "px";
      dot.style.opacity = String(0.25 + t * 0.75);
      dot.style.transform = "translate(-50%, -50%) scale(" + (0.45 + t * 0.55) + ")";
      laserLayer.appendChild(dot);
    }
  }

  function clearInk() {
    if (!inkCanvas) return;
    var ctx = inkCanvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, inkCanvas.width, inkCanvas.height);
    ctx.restore();
  }

  function syncInkCanvas() {
    if (!stageTools || !inkCanvas) return;
    var rect = stageTools.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    var nextW = Math.max(1, Math.floor(rect.width * dpr));
    var nextH = Math.max(1, Math.floor(rect.height * dpr));
    if (inkCanvas.width !== nextW || inkCanvas.height !== nextH) {
      inkCanvas.width = nextW;
      inkCanvas.height = nextH;
    }
    inkCanvas.style.width = rect.width + "px";
    inkCanvas.style.height = rect.height + "px";
    var ctx = inkCanvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function syncStageTools() {
    if (!stageTools) return;
    var curtainsOff = (!blackoutEl || blackoutEl.hidden) && (!whiteoutEl || whiteoutEl.hidden);
    var toolsOk = !showHelp && !showOverview && !editOn && curtainsOff;
    stageTools.classList.toggle("is-laser", laserOn && toolsOk);
    stageTools.classList.toggle("is-ink", inkOn && toolsOk);
    document.documentElement.classList.toggle("pmd-laser-on", laserOn);
    document.documentElement.classList.toggle("pmd-ink-on", inkOn);
    if (laserLayer) {
      var showLaser = laserOn && toolsOk;
      laserLayer.hidden = !showLaser;
      if (!showLaser) clearLaserTrail();
    }
    if (inkCanvas) {
      var showInk = inkOn && toolsOk;
      inkCanvas.classList.toggle("is-active", showInk);
      if (!showInk) inkDrawing = false;
    }
    if (btnLaser) btnLaser.textContent = laserOn ? "Laser off · L" : "Laser · L";
    if (btnInk) btnInk.textContent = inkOn ? "Ink off · D" : "Ink · D";
    if (btnInkClear) btnInkClear.hidden = !inkOn;
    if (btnOverview) btnOverview.textContent = showOverview ? "Close grid · G" : "Overview · G";
    syncInkCanvas();
  }

  function slideHeading(idx) {
    var el = slides[idx] && slides[idx].querySelector("h1, h2, h3");
    var text = el ? (el.textContent || "").trim() : "";
    return text || ("Slide " + (idx + 1));
  }

  function cloneSlideThumb(idx) {
    var slide = slides[idx];
    if (!slide) return null;
    var clone = slide.cloneNode(true);
    clone.removeAttribute("id");
    clone.classList.add("in-view");
    var ids = clone.querySelectorAll("[id]");
    for (var i = 0; i < ids.length; i++) ids[i].removeAttribute("id");
    return clone;
  }

  function ensureOverview() {
    if (overviewBuilt || !overviewGrid) return;
    overviewBuilt = true;
    overviewGrid.innerHTML = "";
    for (var i = 0; i < slides.length; i++) {
      (function (idx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pmd-overview-card";
        btn.setAttribute("aria-label", "Go to slide " + (idx + 1) + ": " + slideHeading(idx));
        var wrap = document.createElement("div");
        wrap.className = "pmd-overview-frame-wrap";
        var scale = document.createElement("div");
        scale.className = "pmd-overview-scale";
        var thumb = cloneSlideThumb(idx);
        if (thumb) scale.appendChild(thumb);
        else {
          var fallback = document.createElement("div");
          fallback.className = "pmd-overview-fallback";
          fallback.textContent = String(idx + 1);
          scale.appendChild(fallback);
        }
        wrap.appendChild(scale);
        var label = document.createElement("span");
        label.className = "pmd-overview-label";
        label.innerHTML = "<strong></strong> ";
        label.querySelector("strong").textContent = String(idx + 1);
        label.appendChild(document.createTextNode(slideHeading(idx)));
        btn.appendChild(wrap);
        btn.appendChild(label);
        btn.addEventListener("click", function () { jumpTo(idx); });
        overviewGrid.appendChild(btn);
      })(i);
    }
  }

  function ensureFilmstrip() {
    if (stripBuilt || !filmstripTrack || slides.length < 2) return;
    stripBuilt = true;
    filmstripTrack.innerHTML = "";
    stripButtons = [];
    for (var i = 0; i < slides.length; i++) {
      (function (idx) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "pmd-filmstrip-hit";
        btn.setAttribute("role", "option");
        btn.setAttribute("aria-label", "Go to slide " + (idx + 1));
        btn.setAttribute("data-filmstrip-i", String(idx));
        btn.tabIndex = -1;
        var wrap = document.createElement("div");
        wrap.className = "pmd-filmstrip-frame-wrap";
        var scale = document.createElement("div");
        scale.className = "pmd-filmstrip-scale";
        var thumb = cloneSlideThumb(idx);
        if (thumb) scale.appendChild(thumb);
        else {
          var fallback = document.createElement("div");
          fallback.className = "pmd-filmstrip-fallback";
          fallback.textContent = String(idx + 1);
          scale.appendChild(fallback);
        }
        wrap.appendChild(scale);
        var num = document.createElement("span");
        num.className = "pmd-filmstrip-num";
        num.textContent = String(idx + 1);
        btn.appendChild(wrap);
        btn.appendChild(num);
        btn.addEventListener("click", function () { jumpTo(idx); });
        filmstripTrack.appendChild(btn);
        stripButtons.push(btn);
      })(i);
    }
  }

  function setStrip(on) {
    if (slides.length < 2) {
      showStrip = false;
    } else {
      showStrip = !!on;
    }
    if (showStrip) ensureFilmstrip();
    if (filmstripEl) filmstripEl.hidden = !showStrip;
    document.documentElement.classList.toggle("pmd-strip-open", showStrip);
    if (btnStrip) {
      btnStrip.hidden = slides.length < 2;
      btnStrip.textContent = showStrip ? "Hide strip · F" : "Strip · F";
    }
    syncFilmstripActive();
  }

  function syncFilmstripActive() {
    if (!showStrip || !stripButtons.length) return;
    var idx = currentIndex();
    for (var i = 0; i < stripButtons.length; i++) {
      var active = i === idx;
      stripButtons[i].classList.toggle("is-active", active);
      stripButtons[i].setAttribute("aria-selected", active ? "true" : "false");
      stripButtons[i].tabIndex = active ? 0 : -1;
      if (active) {
        stripButtons[i].setAttribute("aria-current", "true");
        try {
          stripButtons[i].scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
        } catch (err) { /* ignore */ }
      } else {
        stripButtons[i].removeAttribute("aria-current");
      }
    }
  }

  function isTypingTarget(el) {
    if (!el || !el.getAttribute) return false;
    if (el.getAttribute("contenteditable") === "true") return true;
    var tag = (el.tagName || "").toLowerCase();
    return tag === "input" || tag === "textarea" || tag === "select";
  }

  function setEditMode(on) {
    editOn = !!on;
    if (editOn) {
      setOverview(false);
      setHelp(false);
      setBlackout(false);
      setWhiteout(false);
      laserOn = false;
      inkOn = false;
      inkDrawing = false;
      clearLaserTrail();
      for (var i = 0; i < slides.length; i++) {
        var nodes = slides[i].querySelectorAll(EDIT_SEL);
        for (var j = 0; j < nodes.length; j++) {
          nodes[j].setAttribute("contenteditable", "true");
          nodes[j].setAttribute("spellcheck", "true");
        }
      }
    } else {
      var editable = document.querySelectorAll('[contenteditable="true"]');
      for (var k = 0; k < editable.length; k++) {
        editable[k].removeAttribute("contenteditable");
        editable[k].removeAttribute("spellcheck");
        if (editable[k] === document.activeElement) editable[k].blur();
      }
    }
    document.documentElement.classList.toggle("pmd-edit-on", editOn);
    if (btnEdit) btnEdit.textContent = editOn ? "Done · E" : "Edit · E";
    if (btnSave) btnSave.hidden = !editOn;
    if (editToggle) {
      editToggle.textContent = editOn ? "Done" : "Edit";
      editToggle.classList.toggle("is-active", editOn);
      if (editOn) editToggle.classList.add("is-visible");
    }
    syncStageTools();
  }

  function buildSaveHtml() {
    var clone = document.documentElement.cloneNode(true);
    clone.classList.remove("pmd-edit-on", "pmd-laser-on", "pmd-ink-on", "pmd-notes-open");
    var kill = clone.querySelectorAll(
      ".pmd-stage-tools.is-laser, .pmd-stage-tools.is-ink, .pmd-ink-canvas.is-active, .pmd-edit-toggle.is-visible, .pmd-edit-toggle.is-active"
    );
    for (var i = 0; i < kill.length; i++) {
      kill[i].classList.remove("is-laser", "is-ink", "is-active", "is-visible");
    }
    var editable = clone.querySelectorAll("[contenteditable]");
    for (var j = 0; j < editable.length; j++) {
      editable[j].removeAttribute("contenteditable");
      editable[j].removeAttribute("spellcheck");
    }
    var laser = clone.querySelector("#pmd-laser-layer");
    if (laser) {
      laser.hidden = true;
      laser.innerHTML = "";
    }
    var ink = clone.querySelector("#pmd-ink-canvas");
    if (ink) {
      ink.classList.remove("is-active");
      ink.removeAttribute("width");
      ink.removeAttribute("height");
      ink.style.width = "";
      ink.style.height = "";
    }
    var overview = clone.querySelector("#pmd-overview");
    if (overview) overview.hidden = true;
    var filmstrip = clone.querySelector("#pmd-filmstrip");
    if (filmstrip) filmstrip.hidden = true;
    var help = clone.querySelector("#pmd-present-help");
    if (help) help.hidden = true;
    var blackout = clone.querySelector("#pmd-blackout");
    if (blackout) blackout.hidden = true;
    var whiteout = clone.querySelector("#pmd-whiteout");
    if (whiteout) whiteout.hidden = true;
    return "<!doctype html>\\n" + clone.outerHTML;
  }

  function saveEditedHtml() {
    var html = buildSaveHtml();
    var titleEl = document.querySelector("title");
    var base = ((titleEl && titleEl.textContent) || "deck").trim().replace(/[^\\w\\-]+/g, "-").replace(/^-|-$/g, "") || "deck";
    var blob = new Blob([html], { type: "text/html;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = base + ".html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    try {
      localStorage.setItem("pmd-edit-draft:" + base, html);
    } catch (err) { /* ignore quota */ }
  }

  function setOverview(on) {
    showOverview = !!on;
    if (showOverview) {
      setHelp(false);
      setBlackout(false);
      setWhiteout(false);
      laserOn = false;
      inkOn = false;
      inkDrawing = false;
      clearLaserTrail();
      ensureOverview();
    }
    if (overviewEl) overviewEl.hidden = !showOverview;
    syncStageTools();
    syncOverviewActive();
  }

  function syncOverviewActive() {
    if (!overviewGrid || !showOverview) return;
    var idx = currentIndex();
    var cards = overviewGrid.querySelectorAll(".pmd-overview-card");
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.toggle("is-active", i === idx);
      if (i === idx) cards[i].setAttribute("aria-current", "true");
      else cards[i].removeAttribute("aria-current");
    }
  }

  function buildDots() {
    if (!dotsEl || slides.length < 2) {
      if (dotsEl) dotsEl.hidden = true;
      return;
    }
    dotsEl.innerHTML = "";
    dotButtons = [];
    for (var i = 0; i < slides.length; i++) {
      (function (idx) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "pmd-slide-dot";
        b.setAttribute("aria-label", "Go to slide " + (idx + 1));
        b.title = slideHeading(idx);
        b.addEventListener("click", function () { jumpTo(idx); });
        dotsEl.appendChild(b);
        dotButtons.push(b);
      })(i);
    }
  }

  function syncDotsAndProgress(idx) {
    for (var i = 0; i < dotButtons.length; i++) {
      dotButtons[i].classList.toggle("is-active", i === idx);
    }
    if (progressBar) {
      var pct = slides.length <= 1 ? 100 : ((idx + 1) / slides.length) * 100;
      progressBar.style.width = pct + "%";
    }
  }

  function syncHash(idx) {
    if (syncingHash) return;
    var want = "#" + (idx + 1);
    if (location.hash === want || location.hash === "#slide-" + (idx + 1)) return;
    syncingHash = true;
    try {
      history.replaceState(null, "", want);
    } catch (err) { /* ignore */ }
    syncingHash = false;
  }

  function applyHashJump() {
    if (syncingHash) return;
    var m = location.hash.match(/^#(?:slide[-_])?(\\d+)$/i);
    if (!m) return;
    var target = Number(m[1]) - 1;
    if (target >= 0 && target < slides.length && target !== currentIndex()) {
      jumpTo(target);
    }
  }

  function syncNextPeek(idx) {
    if (!nextFrameWrap || !notesNext) return;
    if (idx + 1 >= slides.length) {
      nextFrameWrap.innerHTML = "";
      if (nextLabel) nextLabel.textContent = "Up next";
      notesNext.classList.add("is-end");
      var end = document.createElement("p");
      end.className = "pmd-notes-body is-empty";
      end.textContent = "Last slide — wrap or take questions.";
      nextFrameWrap.appendChild(end);
      return;
    }
    notesNext.classList.remove("is-end");
    if (nextLabel) nextLabel.textContent = "Up next · " + slideHeading(idx + 1);
    nextFrameWrap.innerHTML = "";
    var scale = document.createElement("div");
    scale.className = "pmd-next-scale";
    var thumb = cloneSlideThumb(idx + 1);
    if (thumb) scale.appendChild(thumb);
    nextFrameWrap.appendChild(scale);
  }

  function setLaser(on) {
    laserOn = !!on;
    if (laserOn) {
      inkOn = false;
      inkDrawing = false;
      if (editOn) setEditMode(false);
      setOverview(false);
      setBlackout(false);
      setWhiteout(false);
      setHelp(false);
    } else {
      clearLaserTrail();
    }
    syncStageTools();
  }

  function setInk(on) {
    inkOn = !!on;
    if (inkOn) {
      laserOn = false;
      clearLaserTrail();
      if (editOn) setEditMode(false);
      setOverview(false);
      setBlackout(false);
      setWhiteout(false);
      setHelp(false);
    } else {
      inkDrawing = false;
    }
    syncStageTools();
  }

  function inkPointFromEvent(e) {
    if (!inkCanvas) return null;
    var rect = inkCanvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function formatElapsed(ms) {
    var totalSec = Math.floor(Math.abs(ms) / 1000);
    var m = Math.floor(totalSec / 60);
    var s = totalSec % 60;
    return m + ":" + String(s).padStart(2, "0");
  }

  function elapsedNow() {
    return accumulated + (timerRunning ? (Date.now() - startedAt) : 0);
  }

  function paceStatus(elapsedMs, targetMs, slideIndex, slideCount) {
    if (targetMs <= 0) return "off";
    if (elapsedMs >= targetMs) return "over";
    if (slideCount <= 1) return "on-pace";
    var progress = slideIndex / (slideCount - 1);
    var expected = Math.min(1, elapsedMs / targetMs);
    var delta = progress - expected;
    if (delta > 0.1) return "ahead";
    if (delta < -0.1) return "behind";
    return "on-pace";
  }

  var speakerWin = null;

  function paintSpeakerWindow() {
    if (!speakerWin || speakerWin.closed) return;
    var idx = currentIndex();
    var elapsed = elapsedNow();
    var targetMs = paceMinutes > 0 ? paceMinutes * 60 * 1000 : 0;
    var status = paceStatus(elapsed, targetMs, idx, slides.length);
    var label = formatElapsed(elapsed);
    if (targetMs > 0) {
      if (status === "over") label += " · OVER";
      else {
        var left = formatElapsed(targetMs - elapsed);
        var cue = status === "ahead" ? " · ahead" : status === "behind" ? " · behind" : " · on pace";
        label += " · " + left + " left" + cue;
      }
    }
    if (!timerRunning) label += " · paused";
    var headingEl = slides[idx] && slides[idx].querySelector("h1, h2, h3");
    var heading = headingEl ? (headingEl.textContent || "").trim() : ("Slide " + (idx + 1));
    var notesText = notesBySlide[idx] || (notesBySlide.some(Boolean) ? "No notes on this slide." : "No speaker notes in this deck.");
    var nextHeading = "— end —";
    if (idx + 1 < slides.length) {
      var nh = slides[idx + 1].querySelector("h1, h2, h3");
      nextHeading = nh ? (nh.textContent || "").trim() : ("Slide " + (idx + 2));
    }
    var doc = speakerWin.document;
    doc.title = "Speaker · " + (idx + 1) + "/" + slides.length;
    if (!doc.getElementById("pmd-speaker-root")) {
      doc.head.innerHTML = "<style>:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;padding:20px 22px 28px;font:15px/1.45 system-ui,sans-serif;background:#0b1220;color:#e8eef4;min-height:100vh}.meta{display:flex;gap:12px;flex-wrap:wrap;font:600 12px/1.2 ui-monospace,Menlo,monospace;color:#9ca3af;letter-spacing:.04em;text-transform:uppercase;margin-bottom:14px}.timer{color:#e8eef4;font-variant-numeric:tabular-nums}.timer.is-paused{color:#f59e0b}.timer.is-ahead{color:#2dd4bf}.timer.is-behind{color:#fb7185}.timer.is-over{color:#f87171}h1{margin:0 0 18px;font:800 28px/1.15 system-ui,sans-serif;letter-spacing:-.03em}.label{font:600 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.12em;text-transform:uppercase;color:#6b7280;margin:0 0 8px}.notes{white-space:pre-wrap;font-size:18px;line-height:1.5;margin:0 0 28px;min-height:4.5em}.notes.is-empty{color:#6b7280;font-style:italic}.next{padding-top:16px;border-top:1px solid rgba(232,238,244,.12)}.next p{margin:0;font-size:15px;color:#9ca3af}.hint{margin-top:28px;font:500 11px/1.4 ui-monospace,Menlo,monospace;color:#5b6575}</style>";
      doc.body.innerHTML = '<div id="pmd-speaker-root"><div class="meta"><span data-count></span><span class="timer" data-timer></span></div><h1 data-heading></h1><div class="label">Speaker notes</div><p class="notes" data-notes></p><div class="next"><div class="label">Up next</div><p data-next></p></div><p class="hint">Follows the deck window · O focuses</p></div>';
    }
    var root = doc.getElementById("pmd-speaker-root");
    if (!root) return;
    var count = root.querySelector("[data-count]");
    if (count) count.textContent = (idx + 1) + " / " + slides.length;
    var tEl = root.querySelector("[data-timer]");
    if (tEl) {
      tEl.textContent = label;
      tEl.className = "timer" + (timerRunning ? "" : " is-paused") + (status === "ahead" ? " is-ahead" : status === "behind" ? " is-behind" : status === "over" ? " is-over" : "");
    }
    var hEl = root.querySelector("[data-heading]");
    if (hEl) hEl.textContent = heading;
    var nEl = root.querySelector("[data-notes]");
    if (nEl) {
      nEl.textContent = notesText;
      nEl.classList.toggle("is-empty", !notesBySlide[idx]);
    }
    var nx = root.querySelector("[data-next]");
    if (nx) nx.textContent = nextHeading;
  }

  function openSpeakerView() {
    if (speakerWin && !speakerWin.closed) {
      speakerWin.focus();
      paintSpeakerWindow();
      return;
    }
    speakerWin = window.open("", "pmd-speaker-view", "popup=yes,width=520,height=760");
    if (speakerWin) paintSpeakerWindow();
  }

  function setBlackout(on) {
    if (!blackoutEl) return;
    if (on) {
      showOverview = false;
      if (overviewEl) overviewEl.hidden = true;
      laserOn = false;
      inkOn = false;
      inkDrawing = false;
      clearLaserTrail();
      if (whiteoutEl && !whiteoutEl.hidden) {
        whiteoutEl.hidden = true;
        if (btnWhiteout) btnWhiteout.textContent = "Whiteout · W";
      }
    }
    blackoutEl.hidden = !on;
    if (btnBlackout) btnBlackout.textContent = on ? "Restore · B" : "Blackout · B";
    syncStageTools();
  }

  function setWhiteout(on) {
    if (!whiteoutEl) return;
    if (on) {
      showOverview = false;
      if (overviewEl) overviewEl.hidden = true;
      laserOn = false;
      inkOn = false;
      inkDrawing = false;
      clearLaserTrail();
      if (blackoutEl && !blackoutEl.hidden) {
        blackoutEl.hidden = true;
        if (btnBlackout) btnBlackout.textContent = "Blackout · B";
      }
    }
    whiteoutEl.hidden = !on;
    if (btnWhiteout) btnWhiteout.textContent = on ? "Restore · W" : "Whiteout · W";
    syncStageTools();
  }

  function setHelp(on) {
    showHelp = !!on;
    if (showHelp) {
      showOverview = false;
      if (overviewEl) overviewEl.hidden = true;
    }
    if (helpEl) helpEl.hidden = !showHelp;
    syncStageTools();
  }

  function setNotes(on) {
    showNotes = !!on;
    if (notesRail) notesRail.hidden = !showNotes;
    if (btnNotes) btnNotes.textContent = showNotes ? "Hide notes · S" : "Notes · S";
    document.documentElement.classList.toggle("pmd-notes-open", showNotes);
    if (showNotes) {
      syncNotes();
      syncNextPeek(currentIndex());
    }
  }

  function syncNotes() {
    if (!notesBody) return;
    var idx = currentIndex();
    var text = notesBySlide[idx] || "";
    if (text) {
      notesBody.textContent = text;
      notesBody.classList.remove("is-empty");
    } else {
      notesBody.textContent = notesBySlide.some(Boolean)
        ? "No notes on this slide."
        : "No speaker notes in this deck.";
      notesBody.classList.add("is-empty");
    }
  }

  function syncUi() {
    var idx = currentIndex();
    if (idx !== lastSlideForInk) {
      if (lastSlideForInk >= 0) clearInk();
      lastSlideForInk = idx;
      inkDrawing = false;
    }
    if (countEl) countEl.textContent = (idx + 1) + " / " + slides.length;
    if (timerEl) {
      var elapsed = elapsedNow();
      var targetMs = paceMinutes > 0 ? paceMinutes * 60 * 1000 : 0;
      var status = paceStatus(elapsed, targetMs, idx, slides.length);
      var label = formatElapsed(elapsed);
      if (targetMs > 0) {
        if (status === "over") {
          label += " · OVER";
        } else {
          var left = formatElapsed(targetMs - elapsed);
          var cue = status === "ahead" ? " · ahead" : status === "behind" ? " · behind" : " · on pace";
          label += " · " + left + " left" + cue;
        }
      }
      if (!timerRunning) label += " · paused";
      timerEl.textContent = label;
      timerEl.classList.toggle("is-paused", !timerRunning);
      timerEl.classList.toggle("is-ahead", status === "ahead");
      timerEl.classList.toggle("is-behind", status === "behind");
      timerEl.classList.toggle("is-over", status === "over");
      timerEl.title = targetMs > 0
        ? ("Pace " + paceMinutes + "m · P cycle · T pause · R reset")
        : "Elapsed · P set pace · T pause · R reset";
    }
    syncDotsAndProgress(idx);
    syncHash(idx);
    syncOverviewActive();
    syncFilmstripActive();
    if (showNotes) {
      syncNotes();
      syncNextPeek(idx);
    }
    paintSpeakerWindow();
  }

  function toggleTimer() {
    if (timerRunning) {
      accumulated += Date.now() - startedAt;
      timerRunning = false;
    } else {
      startedAt = Date.now();
      timerRunning = true;
    }
    syncUi();
  }

  function resetTimer() {
    accumulated = 0;
    startedAt = Date.now();
    timerRunning = true;
    syncUi();
  }

  function cyclePace() {
    var idx = PACE_PRESETS.indexOf(paceMinutes);
    paceMinutes = PACE_PRESETS[(idx < 0 ? 0 : idx + 1) % PACE_PRESETS.length];
    syncUi();
  }

  window.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === "s" || e.key === "S")) {
      if (editOn) {
        e.preventDefault();
        saveEditedHtml();
      }
      return;
    }
    if (isTypingTarget(e.target) && e.key !== "Escape") {
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      if (isTypingTarget(e.target)) {
        e.target.blur();
        return;
      }
      if (editOn) { setEditMode(false); return; }
      if (showHelp) { setHelp(false); return; }
      if (showOverview) { setOverview(false); return; }
      if (blackoutEl && !blackoutEl.hidden) { setBlackout(false); return; }
      if (whiteoutEl && !whiteoutEl.hidden) { setWhiteout(false); return; }
      if (laserOn) { setLaser(false); return; }
      if (inkOn) { setInk(false); return; }
      if (showNotes) { setNotes(false); return; }
      return;
    }
    if (e.key === "?" || (e.shiftKey && e.key === "/")) {
      e.preventDefault();
      setHelp(!showHelp);
      return;
    }
    if (e.key === "e" || e.key === "E") {
      e.preventDefault();
      setEditMode(!editOn);
      return;
    }
    if (e.key === "g" || e.key === "G") {
      e.preventDefault();
      if (editOn) setEditMode(false);
      setOverview(!showOverview);
      return;
    }
    if (e.key === "f" || e.key === "F") {
      e.preventDefault();
      if (slides.length > 1) setStrip(!showStrip);
      return;
    }
    if (e.key === "l" || e.key === "L") {
      e.preventDefault();
      setLaser(!laserOn);
      return;
    }
    if (e.key === "d" || e.key === "D") {
      e.preventDefault();
      setInk(!inkOn);
      return;
    }
    if ((e.key === "c" || e.key === "C") && inkOn) {
      e.preventDefault();
      clearInk();
      return;
    }
    if (e.key === "b" || e.key === "B") {
      e.preventDefault();
      setHelp(false);
      setBlackout(blackoutEl ? blackoutEl.hidden : true);
      return;
    }
    if (e.key === "w" || e.key === "W") {
      e.preventDefault();
      setHelp(false);
      setWhiteout(whiteoutEl ? whiteoutEl.hidden : true);
      return;
    }
    if (e.key === "s" || e.key === "S") {
      e.preventDefault();
      setNotes(!showNotes);
      return;
    }
    if (e.key === "t" || e.key === "T") {
      e.preventDefault();
      toggleTimer();
      return;
    }
    if (e.key === "r" || e.key === "R") {
      e.preventDefault();
      resetTimer();
      return;
    }
    if (e.key === "p" || e.key === "P") {
      e.preventDefault();
      cyclePace();
      return;
    }
    if (e.key === "o" || e.key === "O") {
      e.preventDefault();
      openSpeakerView();
      return;
    }
    if (showHelp || showOverview || editOn) return;
    if (/^[1-9]$/.test(e.key)) {
      e.preventDefault();
      var target = Number(e.key) - 1;
      if (target < slides.length) jumpTo(target);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
      e.preventDefault();
      setBlackout(false);
      setWhiteout(false);
      go(1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      setBlackout(false);
      setWhiteout(false);
      go(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      jumpTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      jumpTo(slides.length - 1);
    }
  });

  if (blackoutEl) blackoutEl.addEventListener("click", function () { setBlackout(false); });
  if (whiteoutEl) whiteoutEl.addEventListener("click", function () { setWhiteout(false); });
  if (btnNotes) btnNotes.addEventListener("click", function () { setNotes(!showNotes); });
  if (btnSpeaker) btnSpeaker.addEventListener("click", openSpeakerView);
  if (btnStrip) btnStrip.addEventListener("click", function () { setStrip(!showStrip); });
  if (btnOverview) btnOverview.addEventListener("click", function () { setOverview(!showOverview); });
  if (btnOverviewClose) btnOverviewClose.addEventListener("click", function () { setOverview(false); });
  if (btnEdit) btnEdit.addEventListener("click", function () { setEditMode(!editOn); });
  if (btnSave) btnSave.addEventListener("click", saveEditedHtml);
  if (editToggle) editToggle.addEventListener("click", function () { setEditMode(!editOn); });
  if (editHotzone) {
    editHotzone.addEventListener("mouseenter", function () {
      if (editHideTimer) clearTimeout(editHideTimer);
      if (editToggle) editToggle.classList.add("is-visible");
    });
    editHotzone.addEventListener("mouseleave", function () {
      editHideTimer = setTimeout(function () {
        if (editToggle && !editOn) editToggle.classList.remove("is-visible");
      }, 400);
    });
    editHotzone.addEventListener("click", function () { setEditMode(!editOn); });
  }
  if (editToggle) {
    editToggle.addEventListener("mouseenter", function () {
      if (editHideTimer) clearTimeout(editHideTimer);
    });
    editToggle.addEventListener("mouseleave", function () {
      editHideTimer = setTimeout(function () {
        if (editToggle && !editOn) editToggle.classList.remove("is-visible");
      }, 400);
    });
  }
  if (btnLaser) btnLaser.addEventListener("click", function () { setLaser(!laserOn); });
  if (btnInk) btnInk.addEventListener("click", function () { setInk(!inkOn); });
  if (btnInkClear) btnInkClear.addEventListener("click", clearInk);
  if (btnBlackout) btnBlackout.addEventListener("click", function () { setBlackout(blackoutEl.hidden); });
  if (btnWhiteout) btnWhiteout.addEventListener("click", function () { setWhiteout(whiteoutEl.hidden); });
  if (btnHelp) btnHelp.addEventListener("click", function () { setHelp(!showHelp); });
  if (btnHelpClose) btnHelpClose.addEventListener("click", function () { setHelp(false); });
  if (timerEl) timerEl.addEventListener("dblclick", resetTimer);

  if (laserLayer) {
    laserLayer.addEventListener("pointermove", function (e) {
      if (!laserOn || showHelp || showOverview || (blackoutEl && !blackoutEl.hidden) || (whiteoutEl && !whiteoutEl.hidden)) return;
      var rect = laserLayer.getBoundingClientRect();
      var point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      laserTrail.push(point);
      if (laserTrail.length > LASER_TRAIL) laserTrail = laserTrail.slice(laserTrail.length - LASER_TRAIL);
      paintLaserTrail();
    });
    laserLayer.addEventListener("pointerleave", function () {
      if (laserOn) clearLaserTrail();
    });
  }

  if (inkCanvas) {
    inkCanvas.addEventListener("pointerdown", function (e) {
      if (!inkOn || showHelp || showOverview || (blackoutEl && !blackoutEl.hidden) || (whiteoutEl && !whiteoutEl.hidden)) return;
      e.preventDefault();
      var ctx = inkCanvas.getContext("2d");
      var pt = inkPointFromEvent(e);
      if (!ctx || !pt) return;
      inkDrawing = true;
      try { inkCanvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      ctx.strokeStyle = INK_COLOR;
      ctx.lineWidth = INK_WIDTH;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
    });
    inkCanvas.addEventListener("pointermove", function (e) {
      if (!inkDrawing) return;
      var ctx = inkCanvas.getContext("2d");
      var pt = inkPointFromEvent(e);
      if (!ctx || !pt) return;
      ctx.lineTo(pt.x, pt.y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
    });
    function endInkStroke(e) {
      if (!inkDrawing) return;
      inkDrawing = false;
      try { inkCanvas.releasePointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    }
    inkCanvas.addEventListener("pointerup", endInkStroke);
    inkCanvas.addEventListener("pointercancel", endInkStroke);
  }

  buildDots();
  setStrip(showStrip);
  window.addEventListener("hashchange", applyHashJump);
  window.addEventListener("resize", function () { syncInkCanvas(); }, { passive: true });
  window.addEventListener("scroll", function () { syncUi(); }, { passive: true });
  setInterval(function () { if (timerRunning) syncUi(); }, 500);
  syncStageTools();
  syncUi();
  applyHashJump();

  /* T2/T3 screenshot harness — #__shot=N scrolls slide N into view and forces reveals */
  var shot = location.hash.match(/__shot=(\\d+)/);
  if (shot) {
    var si = +shot[1] - 1;
    slides.forEach(function (s) { s.classList.add("in-view"); });
    document.documentElement.classList.add("pmd-shot-mode");
    if (slides[si]) {
      document.documentElement.style.scrollSnapType = "none";
      slides[si].scrollIntoView({ behavior: "instant", block: "start" });
    }
  }
})();
<\/script>
</body>
</html>
`;export{M as _,_ as a,I as b,D as c,H as d,B as e,q as f,O as g,A as h,C as i,L as j,T as k,S as l,z as m,E as n,y as o,w as p,v as q,F as r,j as s,N as t,W as u};
