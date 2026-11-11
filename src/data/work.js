import en from '../locales/en.js';
import zh from '../locales/zh.js';

// `section` is where the entry appears on the page; its text lives in the
// locale under `<section>.items.<id>`.
export const COMPANIES = [
  { id: 'saturn', section: 'projects', name: 'Saturn', url: 'https://saturn-core.com', current: true, featured: true },
  { id: 'kura', section: 'experience', name: 'Kura Finance', url: 'https://kura-finance.com', current: false },
];

export function getWork(locale, section) {
  const L = locale === 'zh' ? zh : en;
  return COMPANIES.filter((c) => !section || c.section === section).map((c) => ({ ...c, ...L[c.section].items[c.id] }));
}
