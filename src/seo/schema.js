// Shared by the app (src/seo/index.js) and the build scripts (scripts/*.js).
// Keep this file free of browser-only APIs.
import { COMPANIES } from '../data/work.js';

export const SITE_URL = 'https://rickwengdev.github.io';
export const SITE_NAME = 'Rick Weng';
export const DEFAULT_IMAGE = `${SITE_URL}/avatar.jpg`;
export const THEME_COLOR = '#faf9f5';

export const SITE_DESCRIPTION =
  'Research into how language models and AI agents actually behave, and tools that keep them accountable.';
export const SITE_GEO_SUMMARY =
  'Rick Weng is an independent AI security researcher and the founder of Saturn (saturn-core.com), which provides free tools for secure, accountable AI: Saturn MCP, a gateway that subjects agent tool calls to policy, approval and audit, and Saturn App, an open-source desktop workbench for AI research. The research goals are pretraining and interpretability; every study is preregistered, with code and data released alongside the paper.';

export const LINKS = {
  email: 'rick@saturn-core.com',
  github: 'https://github.com/rickwengdev',
  saturn: 'https://saturn-core.com',
};

export const RESEARCH_TOPICS = [
  'Activation steering',
  'Functional states in language models',
  'Agent oversight',
  'Interpretability tooling',
];

export const AUTHOR = {
  name: 'Rick Weng',
  legalName: 'Rick Weng',
  url: SITE_URL,
  email: LINKS.email,
  jobTitle: 'Founder of Saturn; independent AI security researcher',
  sameAs: [LINKS.github],
};

export { COMPANIES };

export function pageUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized === '/' ? '' : normalized}`;
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------- JSON-LD ----------

export function buildPersonJsonLd(description = SITE_GEO_SUMMARY) {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: AUTHOR.legalName,
    url: AUTHOR.url,
    email: AUTHOR.email,
    jobTitle: AUTHOR.jobTitle,
    description,
    image: DEFAULT_IMAGE,
    sameAs: AUTHOR.sameAs,
    knowsAbout: ['AI security', 'AI safety', 'Pretraining', 'Interpretability', ...RESEARCH_TOPICS],
    founder: COMPANIES.map(({ name, url }) => ({ '@type': 'Organization', name, url })),
    worksFor: COMPANIES.filter((c) => c.current).map(({ name, url }) => ({ '@type': 'Organization', name, url })),
  };
}

export function buildWebsiteJsonLd(description = SITE_DESCRIPTION) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description,
    publisher: { '@id': `${SITE_URL}/#person` },
    inLanguage: ['en', 'zh-Hant'],
  };
}

export function buildPapersJsonLd(papers) {
  if (!papers.length) return null;
  return {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/papers#list`,
    name: 'Papers by Rick Weng',
    itemListElement: papers.map((paper, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'ScholarlyArticle',
        headline: paper.title,
        abstract: paper.abstract,
        datePublished: String(paper.year),
        author: { '@id': `${SITE_URL}/#person` },
        isPartOf: paper.venue ? { '@type': 'Periodical', name: paper.venue } : undefined,
        url: paper.links?.[0]?.url,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: pageUrl(item.path),
    })),
  };
}

export function wrapJsonLd(graph) {
  return {
    '@context': 'https://schema.org',
    '@graph': graph.filter(Boolean),
  };
}

// ---------- Static <head> for prerendered pages ----------

export function buildHeadTags({ title, description, path, keywords, noindex = false, geoSummary }) {
  const url = pageUrl(path);
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="author" content="${AUTHOR.legalName}" />`,
    keywordContent ? `<meta name="keywords" content="${escapeHtml(keywordContent)}" />` : '',
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    `<link rel="alternate" hreflang="en" href="${url}" />`,
    `<link rel="alternate" hreflang="zh-Hant" href="${url}" />`,
    geoSummary ? `<meta name="abstract" content="${escapeHtml(geoSummary)}" />` : '',
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:locale:alternate" content="zh_TW" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${DEFAULT_IMAGE}" />`,
    `<meta property="og:image:alt" content="${SITE_NAME}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${DEFAULT_IMAGE}" />`,
  ]
    .filter(Boolean)
    .join('\n  ');
}
