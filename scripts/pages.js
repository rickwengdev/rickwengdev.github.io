// Static page definitions shared by the sitemap and prerender scripts.
// The site is one page; its prerendered body carries every section as plain HTML.
import en from '../src/locales/en.js';
import {
  getContributions,
  getCves,
  getExperience,
  getPapers,
  getProjects,
  getPublicPapers,
} from '../src/content/index.js';
import {
  LINKS,
  SITE_GEO_SUMMARY,
  buildPapersJsonLd,
  buildPersonJsonLd,
  buildWebsiteJsonLd,
  escapeHtml,
  wrapJsonLd,
} from '../src/seo/schema.js';

const e = escapeHtml;

const papersHtml = getPapers('en')
  .map((paper) =>
    paper.placeholder
      ? `<li>${e(paper.title)} (${paper.year})</li>`
      : `<li><strong>${e(paper.title)}</strong> (${paper.year}${paper.venue ? `, ${e(paper.venue)}` : ''})${
          paper.abstract ? `<p>${e(paper.abstract)}</p>` : ''
        }${paper.links.map((l) => ` <a href="${e(l.url)}">${e(l.label)}</a>`).join('')}</li>`
  )
  .join('');

const workHtml = (entries) =>
  entries
    .map(
      (job) =>
        `<li><a href="${e(job.url)}">${e(job.name)}</a>: ${e(job.role)}, ${e(job.period)}. ${e(job.summary)}<ul>${job.highlights
          .map((h) => `<li>${e(h)}</li>`)
          .join('')}</ul></li>`
    )
    .join('');

const cves = getCves('en');
const cveHtml = cves.length
  ? `<ul>${cves
      .map(
        (c) =>
          `<li><a href="${e(c.url)}">${e(c.id)}</a> (${c.year}, ${e(en.cve.severity[c.severity])}${c.cvss ? ` ${c.cvss.toFixed(1)}` : ''})${
            c.product ? `: ${e(c.product)}` : ''
          }${c.summary ? `. ${e(c.summary)}` : ''}</li>`
      )
      .join('')}</ul>`
  : `<p>${e(en.cve.empty)}</p>`;

const contributionsHtml = getContributions('en')
  .map((c) => `<li><strong>${e(c.title)}</strong> (${e(c.kind)}): ${e(c.body)}</li>`)
  .join('');

const L = en.letter;

export const PAGES = [
  {
    dir: null,
    path: '/',
    changefreq: 'monthly',
    priority: '1.0',
    seo: en.seo.home,
    geoSummary: SITE_GEO_SUMMARY,
    jsonLd: wrapJsonLd([buildWebsiteJsonLd(), buildPersonJsonLd(), buildPapersJsonLd(getPublicPapers('en'))]),
    body: `<article id="top"><h1>Rick Weng</h1><p>${e(L.salutation)}</p>${L.paragraphs.map((p) => `<p>${e(p)}</p>`).join('')}
<section id="experience"><h2>${e(en.experience.title)}</h2><ul>${workHtml(getExperience('en'))}</ul></section>
<section id="projects"><h2>${e(en.projects.title)}</h2><ul>${workHtml(getProjects('en'))}</ul></section>
<section id="research"><h2>${e(en.research.title)}</h2><h3>${e(en.research.papersTitle)}</h3><ul>${papersHtml}</ul>
<h3>${e(en.research.goalsTitle)}</h3><p>${en.research.goals.map(e).join(' · ')}</p></section>
<section id="cve"><h2>${e(en.cve.title)}</h2>${cveHtml}</section>
<section id="contributions"><h2>${e(en.contributions.title)}</h2><ul>${contributionsHtml}</ul></section>
<p>${e(L.signoffBefore)} Rick Weng</p><p>${e(L.ps)} <a href="${LINKS.saturn}">saturn-core.com</a></p></article>
<section id="contact"><h2>${e(en.contact.title)}</h2><p>${e(en.contact.body)}</p><p><a href="mailto:${LINKS.email}">${LINKS.email}</a> · <a href="${LINKS.github}">GitHub</a> · <a href="${LINKS.saturn}">Saturn</a></p></section>`,
  },
];

// Older URLs, now sections of the single page.
export const REDIRECTS = [
  { dir: 'papers', to: '/#research' },
  { dir: 'work', to: '/#experience' },
  { dir: 'blog', to: '/#research' },
  { dir: 'blog/1', to: '/#research' },
  { dir: 'blog/2', to: '/#research' },
  { dir: 'blog/3', to: '/#research' },
  { dir: 'blog/4', to: '/#research' },
  { dir: 'experience', to: '/#experience' },
  { dir: 'projects', to: '/#projects' },
];
