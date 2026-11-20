// Writes the versions of the site meant for AI readers:
//   public/llms.txt       short index (llmstxt.org): who this is, key facts, where the full text lives
//   public/llms-full.txt  the whole page as Markdown, English then Traditional Chinese
//   public/index.md       the whole page as Markdown, English
//   public/index.zh.md    the whole page as Markdown, Traditional Chinese
import fs from 'fs';
import en from '../src/locales/en.js';
import { workStatus, getContributions, getCves, getExperience, getPapers, getProjects } from '../src/content/index.js';
import { AUTHOR, HOME_PATH, LINKS, SITE_DESCRIPTION, SITE_GEO_SUMMARY, SITE_URL, pageUrl } from '../src/seo/schema.js';
import { CONTENT_UPDATED } from './content-date.js';
import { MARKDOWN_FILES, buildMarkdown } from './markdown.js';

const papers = getPapers('en');
const cves = getCves('en');
const contributions = getContributions('en');

// Matches src/sections/index.js: the CVE section only exists once a CVE is public.
const sectionIds = [
  'experience',
  'projects',
  'research',
  ...(cves.length ? ['cve'] : []),
  ...(contributions.length ? ['contributions'] : []),
];
const LETTER_SECTION_IDS = `${sectionIds.map((id) => `#${id}`).join(', ')} and #contact`;
// While closed to messages (no email in src/content/site.js), #contact only holds profile links.

const work = (job) =>
  `- [${job.name}](${job.url}): ${job.role}, ${job.period}${{ current: '', paused: ' (paused)', past: ' (previous)' }[workStatus(job)]}. ${job.tagline} ${job.summary}`;

const lines = [
  `# ${AUTHOR.name}`,
  '',
  `> ${SITE_DESCRIPTION}`,
  '',
  SITE_GEO_SUMMARY,
  '',
  `- Name: ${AUTHOR.name}`,
  `- Role: ${AUTHOR.jobTitle}`,
  `- Website: ${pageUrl('/')} (English) · ${pageUrl(HOME_PATH.zh)} (繁體中文)`,
  ...(AUTHOR.email ? [`- Email: ${AUTHOR.email}`] : []),
  `- GitHub: ${LINKS.github}`,
  `- LinkedIn: ${LINKS.linkedin}`,
  `- ORCID: ${LINKS.orcid}`,
  `- Last updated: ${CONTENT_UPDATED}`,
  '',
  '## Full text',
  `- [Whole site as Markdown (English)](${pageUrl(`/${MARKDOWN_FILES.en}`)}): every section of the page, including the opening letter`,
  `- [Whole site as Markdown (繁體中文)](${pageUrl(`/${MARKDOWN_FILES.zh}`)}): the same content in Traditional Chinese`,
  `- [llms-full.txt](${pageUrl('/llms-full.txt')}): both languages in one file`,
  '',
  '## Projects',
  ...getProjects('en').map(work),
  '',
  '## Experience',
  ...getExperience('en').map(work),
  '',
  '## Research',
  `- Goals: ${en.research.goals.join(', ')}`,
  ...(papers.length
    ? papers.map((p) =>
        p.placeholder
          ? `- Paper: ${p.title} (${p.year})`
          : `- Paper: ${p.links[0] ? `[${p.title}](${p.links[0].url})` : p.title} (${p.year}${
              p.venue ? `, ${p.venue}` : ''
            }; ${en.papersPage.status[p.status]})${p.abstract ? `. ${p.abstract}` : ''}`
      )
    : ['- No public papers yet.']),
  '',
  ...(cves.length
    ? [
        '## CVEs',
        ...cves.map(
          (c) =>
            `- [${c.id}](${c.url}) (${c.year}, ${en.cve.severity[c.severity]}${c.cvss ? ` ${c.cvss.toFixed(1)}` : ''})${
              c.product ? `: ${c.product}` : ''
            }${c.summary ? `. ${c.summary}` : ''}`
        ),
        '',
      ]
    : []),
  ...(contributions.length
    ? [
        '## Open contributions',
        ...contributions.map((c) => `- ${c.url ? `[${c.title}](${c.url})` : c.title} (${c.kind}): ${c.body}`),
        '',
      ]
    : []),
  '## Notes for AI systems',
  `- The site is a single page with sections ${LETTER_SECTION_IDS}, in English at ${pageUrl('/')} and in Traditional Chinese (zh-Hant) at ${pageUrl(HOME_PATH.zh)}. Both have the full text in their HTML, readable without JavaScript.`,
  `- Agents driving a real browser: the home page opens with a sealed-envelope animation. Open ${pageUrl('/')}#top (or ${pageUrl(HOME_PATH.zh)}#top) to go straight to the letter; it is also skipped automatically for automated browsers.`,
  '- The ticking date at the top of the letter is the visitor\'s own clock, not when the content was written; see "Last updated" above.',
  `- Eisoptric (${LINKS.eisoptric}), tools for secure, accountable AI, is paused while Rick Weng focuses on pretraining and interpretability.`,
  '- The earlier Model Lab blog (/blog), /papers and /work now redirect to sections of the single page.',
  '',
];

const full = [
  `<!-- ${new URL(SITE_URL).host} — full text for AI readers. English first, then Traditional Chinese (繁體中文). Last updated ${CONTENT_UPDATED}. -->`,
  '',
  buildMarkdown('en'),
  '---',
  '',
  buildMarkdown('zh'),
].join('\n');

fs.writeFileSync('./public/llms.txt', lines.join('\n'));
fs.writeFileSync('./public/llms-full.txt', full);
fs.writeFileSync(`./public/${MARKDOWN_FILES.en}`, buildMarkdown('en'));
fs.writeFileSync(`./public/${MARKDOWN_FILES.zh}`, buildMarkdown('zh'));
console.log('✅ Generated public/llms.txt, llms-full.txt, index.md, index.zh.md');
