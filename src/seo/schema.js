// Shared by the app (src/seo/index.js) and the build scripts (scripts/*.js).
// Keep this file free of browser-only APIs.
import {
  AUTHOR as AUTHOR_INFO,
  KNOWS_ABOUT,
  LINKS,
  ORGANIZATIONS,
  SITE_DESCRIPTION,
  SITE_GEO_SUMMARY,
  SITE_SUMMARY,
  SITE_URL,
  SOFTWARE,
  localize,
} from '../content/index.js';
import { HOME_PATH } from '../content/localize.js';

export { HOME_PATH, LINKS, SITE_DESCRIPTION, SITE_GEO_SUMMARY, SITE_SUMMARY, SITE_URL };

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
// Every builder takes the page's language ('en' or 'zh'). The person, website,
// organizations and software keep the same @id in both languages; each language's
// page is its own ProfilePage.

const PERSON_ID = `${SITE_URL}/#person`;
const organizationId = (id) => `${SITE_URL}/#org-${id}`;

export const homeUrl = (locale = 'en') => pageUrl(HOME_PATH[locale]);
export const languageTag = (locale = 'en') => (locale === 'zh' ? 'zh-Hant' : 'en');

export function buildPersonJsonLd(locale = 'en') {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: AUTHOR.legalName,
    url: AUTHOR.url,
    email: AUTHOR.email,
    jobTitle: AUTHOR.jobTitle,
    description: localize(SITE_SUMMARY, locale),
    image: DEFAULT_IMAGE,
    sameAs: AUTHOR.sameAs,
    knowsAbout: KNOWS_ABOUT,
    worksFor: ORGANIZATIONS.filter((org) => org.current).map(({ id }) => ({ '@id': organizationId(id) })),
  };
}

// One node per company or project founded; "founder" points back at the person.
export function buildOrganizationsJsonLd(locale = 'en') {
  return ORGANIZATIONS.map(({ id, name, url, description }) => ({
    '@type': 'Organization',
    '@id': organizationId(id),
    name,
    url,
    description: localize(description, locale),
    founder: { '@id': PERSON_ID },
  }));
}

// The free tools listed under contributions (entries with `software: true`).
export function buildSoftwareJsonLd(locale = 'en') {
  return SOFTWARE.map(({ id, name, url, description, license }) => ({
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#software-${id}`,
    name: localize(name, locale),
    url,
    description: localize(description, locale),
    applicationCategory: 'DeveloperApplication',
    license,
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
    creator: { '@id': PERSON_ID },
  }));
}

const profileId = (locale) => `${SITE_URL}${HOME_PATH[locale]}#profile`;

// The page itself, in one language: a profile of the person, with the date its
// content last changed. English is the original; the Chinese page is its translation.
export function buildProfilePageJsonLd(locale = 'en', dateModified) {
  return {
    '@type': 'ProfilePage',
    '@id': profileId(locale),
    url: homeUrl(locale),
    name: SITE_NAME,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: { '@id': PERSON_ID },
    inLanguage: languageTag(locale),
    dateModified: dateModified || undefined,
    ...(locale === 'zh'
      ? { translationOfWork: { '@id': profileId('en') } }
      : { workTranslation: { '@id': profileId('zh') } }),
  };
}

export function buildWebsiteJsonLd(description = SITE_DESCRIPTION) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description,
    publisher: { '@id': PERSON_ID },
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
        author: { '@id': PERSON_ID },
        isPartOf: paper.venue ? { '@type': 'Periodical', name: paper.venue } : undefined,
        url: paper.links?.[0]?.url,
      },
    })),
  };
}

// Everything a home page says about itself, as one graph.
// `papers` should already be in the page's language (getPublicPapers(locale)).
export function buildSiteJsonLd({ locale = 'en', papers = [], dateModified } = {}) {
  return wrapJsonLd([
    buildWebsiteJsonLd(),
    buildProfilePageJsonLd(locale, dateModified),
    buildPersonJsonLd(locale),
    ...buildOrganizationsJsonLd(locale),
    ...buildSoftwareJsonLd(locale),
    buildPapersJsonLd(papers),
  ]);
}

export function wrapJsonLd(graph) {
  return {
    '@context': 'https://schema.org',
    '@graph': graph.filter(Boolean),
  };
}

// ---------- <head> tags shared by the app and the prerendered pages ----------

// Each language's home page, for hreflang. English is also the default.
export const LANGUAGE_ALTERNATES = [
  { hreflang: 'x-default', href: homeUrl('en') },
  { hreflang: 'en', href: homeUrl('en') },
  { hreflang: 'zh-Hant', href: homeUrl('zh') },
];

// Plain-text versions of the page for AI readers; index.html lists the same links.
const MARKDOWN_ALTERNATES = [
  `<link rel="alternate" type="text/markdown" hreflang="en" title="Markdown (English)" href="/index.md" />`,
  `<link rel="alternate" type="text/markdown" hreflang="zh-Hant" title="Markdown (繁體中文)" href="/index.zh.md" />`,
  `<link rel="alternate" type="text/plain" title="LLMs index" href="/llms.txt" />`,
  `<link rel="alternate" type="text/plain" title="LLMs full text" href="/llms-full.txt" />`,
];

export function buildHeadTags({
  title,
  description,
  path,
  keywords,
  noindex = false,
  geoSummary,
  dateModified,
  locale = 'en',
}) {
  const url = pageUrl(path);
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;
  const ogLocale = locale === 'zh' ? 'zh_TW' : 'en_US';
  const ogAlternate = locale === 'zh' ? 'en_US' : 'zh_TW';

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="author" content="${AUTHOR.legalName}" />`,
    keywordContent ? `<meta name="keywords" content="${escapeHtml(keywordContent)}" />` : '',
    `<link rel="canonical" href="${url}" />`,
    ...LANGUAGE_ALTERNATES.map(
      ({ hreflang, href }) => `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`
    ),
    ...MARKDOWN_ALTERNATES,
    dateModified ? `<meta property="og:updated_time" content="${dateModified}" />` : '',
    geoSummary ? `<meta name="abstract" content="${escapeHtml(geoSummary)}" />` : '',
    `<meta property="og:locale" content="${ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${ogAlternate}" />`,
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
