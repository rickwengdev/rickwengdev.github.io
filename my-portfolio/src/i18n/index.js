import { ref, computed } from 'vue';
import en from '../locales/en.js';
import zh from '../locales/zh.js';

const STORAGE_KEY = 'site-locale';
const messages = { en, zh };

const getInitialLocale = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'zh') return saved;
  return navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en';
};

export const locale = ref(getInitialLocale());

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
  localStorage.setItem(STORAGE_KEY, next);
  document.documentElement.lang = next === 'zh' ? 'zh-Hant' : 'en';
}

export function tm(key) {
  return resolve(messages[locale.value], key) ?? resolve(messages.en, key);
}

export function useI18n() {
  const currentLocale = computed(() => locale.value);
  return { locale: currentLocale, t, tm, setLocale, messages };
}

document.documentElement.lang = locale.value === 'zh' ? 'zh-Hant' : 'en';
