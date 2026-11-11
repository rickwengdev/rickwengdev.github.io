// Shared by the app (src/seo/index.js) and the build scripts (scripts/*.js).
// Keep this file free of browser-only APIs.
import {
  AUTHOR as AUTHOR_INFO,
  KNOWS_ABOUT,
  LINKS,
  ORGANIZATIONS,
  SITE_DESCRIPTION,
  SITE_GEO_SUMMARY,
  SITE_URL,
} from '../content/index.js';

export { LINKS, SITE_DESCRIPTION, SITE_GEO_SUMMARY, SITE_URL };

export const SITE_NAME = AUTHOR_INFO.name;
export const DEFAULT_IMAGE = `${SITE_URL}/avatar.jpg`;
export const THEME_COLOR = '#faf9f5';

export const AUTHOR = {
  name: AUTHOR_INFO.name,
  legalName: AUTHOR_INFO.name,
  url: SITE_URL,
  email: LINKS.email,
  jobTitle: AUTHOR_INFO.jobTitle,
  sameAs: [LINKS.github],
};

export function pageUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized === '/' ? '' : normalized}`;
}

export function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
    knowsAbout: KNOWS_ABOUT,
    founder: ORGANIZATIONS.map(({ name, url }) => ({ '@type': 'Organization', name, url })),
    worksFor: ORGANIZATIONS.filter((c) => c.current).map(({ name, url }) => ({ '@type': 'Organization', name, url })),
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
