// Text in src/content is either a plain string (the same in both languages)
// or { en: '…', zh: '…' }. These helpers pick the right language.

export const LOCALES = ['en', 'zh'];

export function isLocalized(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value) && 'en' in value;
}

export function localize(value, locale) {
  return isLocalized(value) ? (value[locale] ?? value.en) : value;
}

// Localizes every top-level field of an entry.
export function localizeEntry(entry, locale) {
  return Object.fromEntries(Object.entries(entry).map(([key, value]) => [key, localize(value, locale)]));
}
