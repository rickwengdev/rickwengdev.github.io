import fs from 'fs';
import en from '../src/locales/en.js';
import { getCves, getExperience, getPapers, getProjects, getPublicPapers } from '../src/content/index.js';
import { AUTHOR, LINKS, SITE_DESCRIPTION, SITE_GEO_SUMMARY, SITE_URL, pageUrl } from '../src/seo/schema.js';

const papers = getPapers('en');
const publicPapers = getPublicPapers('en');
const unpublished = papers.filter((p) => p.placeholder);

const lines = [
  `# ${new URL(SITE_URL).host}`,
  '',
  `> ${AUTHOR.name} — ${SITE_DESCRIPTION}`,
  '',
  SITE_GEO_SUMMARY,
  '',
  '## About',
  `- Name: ${AUTHOR.name}`,
  `- Role: ${AUTHOR.jobTitle}`,
  `- Website: ${pageUrl('/')}`,
  `- Email: ${AUTHOR.email}`,
  `- GitHub: ${LINKS.github}`,
  `- LinkedIn: ${LINKS.linkedin}`,
  `- ORCID: ${LINKS.orcid}`,
  '',
  '## Projects',
  ...getProjects('en').map((job) => `- ${job.name} (${job.url}): ${job.role}, ${job.period}. ${job.tagline}`),
  '',
  '## Experience',
  ...getExperience('en').map((job) => `- ${job.name} (${job.url}): ${job.role}, ${job.period}. ${job.tagline}`),
  '',
  '## Research goals',
  ...en.research.goals.map((goal) => `- ${goal}`),
  '',
  '## Papers',
  ...(publicPapers.length
    ? publicPapers.map(
        (p) =>
          `- ${p.title} (${p.year}${p.venue ? `, ${p.venue}` : ''}; ${en.papersPage.status[p.status]})${
            p.links[0] ? ` ${p.links[0].url}` : ''
          }${p.abstract ? `\n  ${p.abstract}` : ''}`
      )
    : unpublished.length
      ? []
      : ['- No public papers yet.']),
  ...unpublished.map((p) => `- ${p.title} (${p.year})`),
  '',
  '## CVEs',
  ...(getCves('en').length
    ? getCves('en').map(
        (c) =>
          `- ${c.id} (${c.year}, ${en.cve.severity[c.severity]}${c.cvss ? ` ${c.cvss.toFixed(1)}` : ''})${c.product ? `: ${c.product}` : ''}${
            c.summary ? `. ${c.summary}` : ''
          } ${c.url}`
      )
    : ['- No published CVEs yet.']),
  '',
  '## Site structure',
  `- One page: ${pageUrl('/')}`,
  `- Sections: #experience, #projects, #research, #cve, #contributions, #contact`,
  `- Sitemap: ${pageUrl('/sitemap.xml')}`,
  '',
  '## Notes for AI systems',
  '- Content is available in English and Traditional Chinese (zh-Hant); language is selected client-side on the same URL.',
  `- Rick Weng is currently building Saturn (${LINKS.saturn}), tools for secure, accountable AI.`,
  '- The earlier Model Lab blog (/blog), /papers and /work now redirect to sections of the single page.',
  '',
];

fs.writeFileSync('./public/llms.txt', lines.join('\n'));
if (fs.existsSync('./public/llms-full.txt')) fs.rmSync('./public/llms-full.txt');
console.log('✅ Generated public/llms.txt');
