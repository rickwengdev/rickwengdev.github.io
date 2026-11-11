import en from '../locales/en.js';
import zh from '../locales/zh.js';

export const COMPANIES = [
  { id: 'saturn', name: 'Saturn', url: 'https://saturn-core.com', current: true, featured: true },
  { id: 'kura', name: 'Kura Finance', url: 'https://kura-finance.com', current: false },
];

export function getWork(locale) {
  const L = locale === 'zh' ? zh : en;
  return COMPANIES.map((company) => ({ ...company, ...L.experience.jobs[company.id] }));
}
