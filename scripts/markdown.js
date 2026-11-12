// The whole page as Markdown, in either language. This is what AI readers get:
// /index.md, /index.zh.md and /llms-full.txt are written from it at build time
// (scripts/generate-llms-txt.js), so they always match the page.
import en from '../src/locales/en.js';
import zh from '../src/locales/zh.js';
import { getContributions, getCves, getExperience, getPapers, getProjects } from '../src/content/index.js';
import { AUTHOR, HOME_PATH, LINKS, SITE_DESCRIPTION, pageUrl } from '../src/seo/schema.js';
import { CONTENT_UPDATED } from './content-date.js';

export const MARKDOWN_FILES = { en: 'index.md', zh: 'index.zh.md' };

const LABELS = {
  en: {
    intro: SITE_DESCRIPTION,
    role: 'Role',
    website: 'Website',
    email: 'Email',
    updated: 'Last updated',
    language: 'Language',
    languageName: 'English',
    other: 'Also available in',
    otherName: '繁體中文 (Traditional Chinese)',
    letter: 'Letter',
    sep: ': ',
  },
  zh: {
    intro: zh.seo.home.description,
    role: '身分',
    website: '網站',
    email: '電子郵件',
    updated: '最後更新',
    language: '語言',
    languageName: '繁體中文',
    other: '其他語言版本',
    otherName: 'English',
    letter: '信件',
    sep: '：',
  },
};

function workMarkdown(entries, section) {
  return entries.flatMap((job) => [
    `### [${job.name}](${job.url})`,
    '',
    `${job.role} · ${job.period} · ${job.current ? section.current : section.past}`,
    '',
    `${job.tagline} ${job.summary}`,
    '',
    ...(job.highlights ?? []).map((h) => `- ${h}`),
    '',
  ]);
}

function paperMarkdown(paper, m) {
  // Under double-blind review only the year and topic are public, as on the page.
  if (paper.placeholder) return [`- ${paper.title} (${paper.year})`];
  const meta = [paper.year, paper.venue, m.papersPage.status[paper.status]].filter(Boolean).join(', ');
  return [
    `- **${paper.title}** (${meta})${paper.authors ? ` — ${paper.authors}` : ''}`,
    ...(paper.abstract ? [`  ${paper.abstract}`] : []),
    ...paper.links.map((l) => `  - [${l.label}](${l.url})`),
  ];
}

function cveMarkdown(cve, m) {
  const score = cve.cvss ? ` ${cve.cvss.toFixed(1)}` : '';
  return `- [${cve.id}](${cve.url}) (${cve.year}, ${m.cve.severity[cve.severity]}${score})${
    cve.product ? `: ${cve.product}` : ''
  }${cve.summary ? `. ${cve.summary}` : ''}`;
}

export function buildMarkdown(locale = 'en') {
  const m = locale === 'zh' ? zh : en;
  const l = LABELS[locale];
  const other = locale === 'zh' ? 'en' : 'zh';
  const cves = getCves(locale);
  const signoff = [m.letter.signoffBefore, AUTHOR.name, m.letter.signoffAfter].filter(Boolean).join(' ');

  return [
    `# ${AUTHOR.name}`,
    '',
    `> ${l.intro}`,
    '',
    ...(locale === 'en' ? [`- ${l.role}${l.sep}${AUTHOR.jobTitle}`] : []),
    `- ${l.website}${l.sep}${pageUrl(HOME_PATH[locale])}`,
    `- ${l.email}${l.sep}${LINKS.email}`,
    `- GitHub: ${LINKS.github}`,
    `- LinkedIn: ${LINKS.linkedin}`,
    `- ORCID: ${LINKS.orcid}`,
    `- Saturn: ${LINKS.saturn}`,
    `- ${l.updated}${l.sep}${CONTENT_UPDATED}`,
    `- ${l.language}${l.sep}${l.languageName}`,
    `- ${l.other}${l.sep}${pageUrl(HOME_PATH[other])} · [Markdown](${pageUrl(`/${MARKDOWN_FILES[other]}`)})`,
    '',
    `## ${l.letter}`,
    '',
    m.letter.salutation,
    '',
    ...m.letter.paragraphs.flatMap((p) => [p, '']),
    signoff,
    '',
    `${m.letter.ps} ${LINKS.saturn}`,
    '',
    `## ${m.experience.title}`,
    '',
    ...workMarkdown(getExperience(locale), m.experience),
    `## ${m.projects.title}`,
    '',
    ...workMarkdown(getProjects(locale), m.projects),
    `## ${m.research.eyebrow}${l.sep}${m.research.title}`,
    '',
    `### ${m.research.goalsTitle}`,
    '',
    ...m.research.goals.map((goal) => `- ${goal}`),
    '',
    `### ${m.research.papersTitle}`,
    '',
    ...getPapers(locale).flatMap((paper) => paperMarkdown(paper, m)),
    '',
    `## ${m.cve.title}`,
    '',
    ...(cves.length ? cves.map((cve) => cveMarkdown(cve, m)) : [m.cve.empty]),
    '',
    `## ${m.contributions.title}`,
    '',
    m.contributions.subtitle,
    '',
    ...getContributions(locale).flatMap((c) => [
      `### ${c.url ? `[${c.title}](${c.url})` : c.title}`,
      '',
      `*${c.kind}*`,
      '',
      c.body,
      '',
    ]),
    `## ${m.contact.eyebrow}`,
    '',
    m.contact.body,
    '',
    `- ${l.email}${l.sep}${LINKS.email}`,
    `- GitHub: ${LINKS.github}`,
    `- LinkedIn: ${LINKS.linkedin}`,
    `- Saturn: ${LINKS.saturn}`,
    '',
  ].join('\n');
}
