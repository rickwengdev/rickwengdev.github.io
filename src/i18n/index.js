import { ref, computed } from 'vue';
import en from '../locales/en.js';
import zh from '../locales/zh.js';
import { HOME_PATH, localeFromPath } from '../content/localize.js';

// Each language has its own address: English at /, Traditional Chinese at /zh/.
// The address decides the language. A reader's saved choice (or, the first time,
// their browser language) only decides which home page `/` sends them to.
const STORAGE_KEY = 'site-locale';
const messages = { en, zh };

export { HOME_PATH, localeFromPath };

function savedLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' || saved === 'zh' ? saved : null;
  } catch {
    return null;
  }
}

// The language this reader would rather read: their own choice, else the browser's.
export function preferredLocale() {
  return savedLocale() ?? (navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en');
}

// Remember an explicit choice from the language switcher.
export function rememberLocale(next) {
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // private mode: the choice lasts until the tab closes
  }
}

// Pages under /zh/ are Chinese; elsewhere the router may still send `/` to /zh/
// (see src/router/index.js), so start in the language the reader will end up in.
const initialLocale = () => (localeFromPath(window.location.pathname) === 'zh' ? 'zh' : preferredLocale());

export const locale = ref(initialLocale());

const resolve = (obj, path) =>
  path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);

export function t(key, params = {}) {
  let value = resolve(messages[locale.value], key) ?? resolve(messages.en, key) ?? key;
  if (typeof value === 'string') {
    Object.entries(params).forEach(([k, v]) => {
      value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    });
  }
  return value;
}

export function setLocale(next) {
  if (next !== 'en' && next !== 'zh') return;
  locale.value = next;
  document.documentElement.lang = next === 'zh' ? 'zh-Hant' : 'en';
}

export function tm(key) {
  return resolve(messages[locale.value], key) ?? resolve(messages.en, key);
}

export function useI18n() {
  const currentLocale = computed(() => locale.value);
  return { locale: currentLocale, t, tm, setLocale };
}

document.documentElement.lang = locale.value === 'zh' ? 'zh-Hant' : 'en';
