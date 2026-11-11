// Research section: papers, newest first.
//
// Fields (text is a string or { en, zh }):
//   id           unique, lowercase
//   year
//   status       'review' | 'preprint' | 'published' | 'progress'
//   placeholder  true while under double-blind review: only the year and `title`
//                (a topic, not the real title) are shown, and the paper is left
//                out of structured data
//   title, authors, venue, abstract
//   links        [{ label, url }], e.g. PDF, code & data
//
// To publish a paper after review: set `placeholder: false` and fill in the
// real `title`, `abstract`, `venue`, `links` and `status`.
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
// },

export default [
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
