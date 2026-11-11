// Papers shown on /papers and the home page, newest first.
//
// To publish a paper after review: set `placeholder: false`, fill in `title`,
// `abstract`, `venue` and `links`, and update `status` ('review' | 'preprint' |
// 'published' | 'progress'). Placeholder entries show only their topic and
// the review note, and are left out of structured data and llms.txt.
//
// Each text field is either a string or { en, zh }.
//
// Example of a finished entry:
// {
//   id: 'my-paper-2027',
//   year: 2027,
//   status: 'published',
//   title: 'Paper title',
//   authors: 'Rick Weng',
//   venue: 'Transactions on Machine Learning Research',
//   abstract: { en: '…', zh: '…' },
//   links: [
//     { label: 'PDF', url: 'https://…' },
//     { label: 'Code & data', url: 'https://github.com/…' },
//   ],
// }

export const papers = [
  {
    id: 'agent-steering-2026',
    year: 2026,
    status: 'review',
    placeholder: true,
    title: {
      en: 'Activation steering in coding agents',
      zh: '程式代理中的激活操控',
    },
  },
];

export function localize(value, locale) {
  if (value == null || typeof value === 'string') return value;
  return value[locale] ?? value.en;
}

export function getPapers(locale) {
  return papers.map((paper) => ({
    ...paper,
    title: localize(paper.title, locale),
    abstract: localize(paper.abstract, locale),
    venue: localize(paper.venue, locale),
    links: paper.links ?? [],
  }));
}

export function getPublicPapers(locale = 'en') {
  return getPapers(locale).filter((paper) => !paper.placeholder);
}
