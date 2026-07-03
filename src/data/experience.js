import en from '../locales/en.js';
import zh from '../locales/zh.js';

const companies = [
  { id: 'kura', company: 'Kura Finance LLC', url: 'https://kura-finance.com' },
  { id: 'prism', company: 'Prism Capital LLC', url: 'https://theprism.ltd' },
];

export function getExperiences(locale) {
  const L = locale === 'zh' ? zh : en;
  return companies.map((c) => ({
    ...c,
    role: L.experiencePage.role,
    period: L.experiencePage.period,
    summary: L.experiencePage.jobs[c.id].summary,
    highlights: L.experiencePage.jobs[c.id].highlights,
  }));
}
