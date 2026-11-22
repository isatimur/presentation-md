import { LOCALES, useI18n, type LocaleCode } from "../i18n/index.js";

/** Studio UI language picker. Options show each language in its own script. */
export function LanguageSelect() {
  const { t, locale, setLocale } = useI18n();
  return (
    <label className="language-select">
      <span className="visually-hidden">{t("language.label")}</span>
      <select
        aria-label={t("language.label")}
        value={locale}
        onChange={(e) => void setLocale(e.target.value as LocaleCode)}
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code} lang={l.code} dir={l.dir}>
            {l.endonym}
          </option>
        ))}
      </select>
    </label>
  );
}
