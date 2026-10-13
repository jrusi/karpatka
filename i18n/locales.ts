// Site languages — shared by nuxt.config.ts (i18n module) and
// server/routes/sitemap.xml.ts. The first one is the default (no URL prefix).
export const locales = [
  { code: 'pl', language: 'pl-PL', name: 'Polski', file: 'pl.json' },
  { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
  { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
  { code: 'cs', language: 'cs-CZ', name: 'Čeština', file: 'cs.json' },
]

export const defaultLocale = locales[0].code
