// Static page definitions shared by the sitemap and prerender scripts.
// The site is one page in two languages (/ and /zh/); each prerendered body
// carries every section as plain HTML, so it can be read without JavaScript.
import en from '../src/locales/en.js';
import zh from '../src/locales/zh.js';
import {
  getContributions,
  getCves,
  getExperience,
  getPapers,
  getProjects,
  getPublicPapers,
} from '../src/content/index.js';
import { HOME_PATH, LINKS, SITE_SUMMARY, buildSiteJsonLd, escapeHtml, languageTag } from '../src/seo/schema.js';
import { CONTENT_UPDATED } from './content-date.js';
import { MARKDOWN_FILES } from './markdown.js';

const e = escapeHtml;
const MESSAGES = { en, zh };

// Lines that only the prerendered page needs.
const STATIC_TEXT = {
  en: { updated: 'Last updated', plain: 'Plain-text versions of this page', other: '繁體中文版', end: '.', sep: ': ' },
  zh: { updated: '最後更新', plain: '本頁的純文字版本', other: 'English version', end: '。', sep: '：' },
};

function homeBody(locale) {
  const m = MESSAGES[locale];
  const s = STATIC_TEXT[locale];
  const other = locale === 'zh' ? 'en' : 'zh';
  const L = m.letter;

  const papersHtml = getPapers(locale)
    .map((paper) =>
      paper.placeholder
        ? `<li>${e(paper.title)} (${paper.year})</li>`
        : `<li><strong>${e(paper.title)}</strong> (${paper.year}${paper.venue ? `, ${e(paper.venue)}` : ''}; ${e(
            m.papersPage.status[paper.status]
          )})${paper.abstract ? `<p>${e(paper.abstract)}</p>` : ''}${paper.links
            .map((l) => ` <a href="${e(l.url)}">${e(l.label)}</a>`)
            .join('')}</li>`
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

  const cves = getCves(locale);
  const cveHtml = cves.length
    ? `<ul>${cves
        .map(
          (c) =>
            `<li><a href="${e(c.url)}">${e(c.id)}</a> (${c.year}, ${e(m.cve.severity[c.severity])}${
              c.cvss ? ` ${c.cvss.toFixed(1)}` : ''
            })${c.product ? `: ${e(c.product)}` : ''}${c.summary ? `. ${e(c.summary)}` : ''}</li>`
        )
        .join('')}</ul>`
    : `<p>${e(m.cve.empty)}</p>`;

  const contributionsHtml = getContributions(locale)
    .map(
      (c) =>
        `<li><strong>${c.url ? `<a href="${e(c.url)}">${e(c.title)}</a>` : e(c.title)}</strong> (${e(c.kind)}): ${e(c.body)}</li>`
    )
    .join('');

  const signoff = [L.signoffBefore, 'Rick Weng', L.signoffAfter].filter(Boolean).map(e).join(' ');

  return `<article id="top"><h1>Rick Weng</h1><p>${e(L.salutation)}</p>${L.paragraphs.map((p) => `<p>${e(p)}</p>`).join('')}
<section id="experience"><h2>${e(m.experience.title)}</h2><ul>${workHtml(getExperience(locale))}</ul></section>
<section id="projects"><h2>${e(m.projects.title)}</h2><ul>${workHtml(getProjects(locale))}</ul></section>
<section id="research"><h2>${e(m.research.title)}</h2><h3>${e(m.research.papersTitle)}</h3><ul>${papersHtml}</ul>
<h3>${e(m.research.goalsTitle)}</h3><p>${m.research.goals.map(e).join(' · ')}</p><p>ORCID: <a href="${LINKS.orcid}">${LINKS.orcid.replace('https://orcid.org/', '')}</a></p></section>
<section id="cve"><h2>${e(m.cve.title)}</h2>${cveHtml}</section>
<section id="contributions"><h2>${e(m.contributions.title)}</h2><p>${e(m.contributions.subtitle)}</p><ul>${contributionsHtml}</ul></section>
<p>${signoff}</p><p>${e(L.ps)} <a href="${LINKS.saturn}">saturn-core.com</a></p></article>
<section id="contact"><h2>${e(m.contact.title)}</h2><p>${e(m.contact.body)}</p><p><a href="mailto:${LINKS.email}">${LINKS.email}</a> · <a href="${LINKS.github}">GitHub</a> · <a href="${LINKS.linkedin}">LinkedIn</a> · <a href="${LINKS.saturn}">Saturn</a></p></section>
<footer><p>${e(s.updated)} <time datetime="${CONTENT_UPDATED}">${CONTENT_UPDATED}</time>${s.end}</p><p><a href="${HOME_PATH[other]}" hreflang="${languageTag(other)}" lang="${languageTag(other)}">${e(s.other)}</a></p><p>${e(s.plain)}${s.sep}<a href="/${MARKDOWN_FILES.en}" hreflang="en">Markdown (English)</a> · <a href="/${MARKDOWN_FILES.zh}" hreflang="zh-Hant">Markdown（繁體中文）</a> · <a href="/llms.txt">llms.txt</a> · <a href="/llms-full.txt">llms-full.txt</a></p></footer>`;
}

function homePage(locale) {
  return {
    dir: locale === 'en' ? null : 'zh',
    path: HOME_PATH[locale],
    locale,
    lang: languageTag(locale),
    changefreq: 'monthly',
    priority: '1.0',
    seo: MESSAGES[locale].seo.home,
    geoSummary: SITE_SUMMARY[locale],
    lastmod: CONTENT_UPDATED,
    jsonLd: buildSiteJsonLd({ locale, papers: getPublicPapers(locale), dateModified: CONTENT_UPDATED }),
    body: homeBody(locale),
  };
}

export const PAGES = [homePage('en'), homePage('zh')];

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
