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
  SOFTWARE,
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
  sameAs: [LINKS.orcid, LINKS.github, LINKS.linkedin],
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
    worksFor: ORGANIZATIONS.filter((org) => org.current).map(({ id }) => ({ '@id': organizationId(id) })),
    mainEntityOfPage: { '@id': `${SITE_URL}/#profile` },
  };
}

const organizationId = (id) => `${SITE_URL}/#org-${id}`;

// One node per company or project founded; "founder" points back at the person.
export function buildOrganizationsJsonLd() {
  return ORGANIZATIONS.map(({ id, name, url, description }) => ({
    '@type': 'Organization',
    '@id': organizationId(id),
    name,
    url,
    description,
    founder: { '@id': `${SITE_URL}/#person` },
  }));
}

// The free tools listed under contributions (entries with `software: true`).
export function buildSoftwareJsonLd() {
  return SOFTWARE.map(({ id, name, url, description, license }) => ({
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#software-${id}`,
    name,
    url,
    description,
    applicationCategory: 'DeveloperApplication',
    license,
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
    creator: { '@id': `${SITE_URL}/#person` },
  }));
}

// The page itself: a profile of the person, with the date its content last changed.
export function buildProfilePageJsonLd(dateModified) {
  return {
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: SITE_NAME,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: { '@id': `${SITE_URL}/#person` },
    inLanguage: ['en', 'zh-Hant'],
    dateModified: dateModified || undefined,
  };
}

// Everything the home page says about itself, as one graph.
export function buildSiteJsonLd({ papers = [], dateModified } = {}) {
  return wrapJsonLd([
    buildWebsiteJsonLd(),
    buildProfilePageJsonLd(dateModified),
    buildPersonJsonLd(),
    ...buildOrganizationsJsonLd(),
    ...buildSoftwareJsonLd(),
    buildPapersJsonLd(papers),
  ]);
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
    '@id': `${SITE_URL}/#papers`,
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

// Plain-text versions of the page for AI readers; index.html lists the same links.
const MARKDOWN_ALTERNATES = [
  `<link rel="alternate" type="text/markdown" hreflang="en" title="Markdown (English)" href="/index.md" />`,
  `<link rel="alternate" type="text/markdown" hreflang="zh-Hant" title="Markdown (繁體中文)" href="/index.zh.md" />`,
  `<link rel="alternate" type="text/plain" title="LLMs index" href="/llms.txt" />`,
  `<link rel="alternate" type="text/plain" title="LLMs full text" href="/llms-full.txt" />`,
];

export function buildHeadTags({ title, description, path, keywords, noindex = false, geoSummary, dateModified }) {
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
    ...MARKDOWN_ALTERNATES,
    dateModified ? `<meta property="og:updated_time" content="${dateModified}" />` : '',
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
