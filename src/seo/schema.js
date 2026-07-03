export const SITE_URL = 'https://rickwengdev.github.io';
export const SITE_NAME = 'Rick';
export const DEFAULT_IMAGE = `${SITE_URL}/avatar.jpg`;
export const SITE_DESCRIPTION =
  'I reverse engineer finance, technology, and organizations. Sharing models, not opinions.';
export const SITE_GEO_SUMMARY =
  'Rick is Founder & CEO of Kura Finance (self-custody financial account for the world) and Prism Capital. He publishes Model Lab — experimental research models on finance, systems, technology, and organizations, each with explicit assumptions, model status, and failure cases.';
export const COMPANIES = [
  { name: 'Kura Finance LLC', url: 'https://kura-finance.com', role: 'Self-custody financial account for the world' },
  { name: 'Prism Capital LLC', url: 'https://theprism.ltd', role: 'Proprietary capital at the technological frontier' },
];
export const RESEARCH_TOPICS = [
  'Capital Allocation',
  'Global Financial Identity',
  'Organization Design',
  'AI Infrastructure',
];
export const AUTHOR = {
  name: 'Rick',
  url: SITE_URL,
  email: 'office@theprism.ltd',
  jobTitle: 'Founder & CEO',
  sameAs: ['https://github.com/rickwengdev'],
};

export function htmlToPlainText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function pageUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized === '/' ? '' : normalized}`;
}

export function toIsoDate(date) {
  if (!date) return undefined;
  return date.includes('T') ? date : `${date}T00:00:00.000Z`;
}

export function countWords(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function extractModelLabNumber(title) {
  const match = title?.match(/Model Lab #(\d+)/i);
  return match ? Number(match[1]) : null;
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildPersonJsonLd(description = SITE_GEO_SUMMARY) {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: AUTHOR.name,
    url: AUTHOR.url,
    email: AUTHOR.email,
    jobTitle: AUTHOR.jobTitle,
    description,
    image: DEFAULT_IMAGE,
    sameAs: AUTHOR.sameAs,
    knowsAbout: [
      'Finance',
      'Capital Efficiency',
      'Global Financial Identity',
      'Asset Structuring',
      'Organization Design',
      'Model Lab',
      'Thinking Framework',
    ],
    worksFor: COMPANIES.map(({ name, url }) => ({ '@type': 'Organization', name, url })),
  };
}

export function buildWebsiteJsonLd(description) {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description,
    publisher: { '@id': `${SITE_URL}/#person` },
    inLanguage: ['en', 'zh-Hant'],
    potentialAction: {
      '@type': 'ReadAction',
      target: pageUrl('/blog'),
    },
  };
}

export function buildBlogPostingJsonLd(post) {
  const url = pageUrl(`/blog/${post.id}`);
  const modelLabNumber = post.modelLabNumber ?? extractModelLabNumber(post.title);
  const json = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.geoSummary ?? post.excerpt,
    abstract: post.geoSummary ?? post.excerpt,
    articleBody: post.plainText,
    datePublished: toIsoDate(post.date),
    dateModified: toIsoDate(post.modified ?? post.date),
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#person` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    image: DEFAULT_IMAGE,
    keywords: (post.keywords ?? post.tags ?? []).join(', '),
    articleSection: post.category,
    inLanguage: post.locale === 'zh' ? 'zh-Hant' : 'en',
    isAccessibleForFree: true,
  };

  if (post.wordCount) json.wordCount = post.wordCount;
  if (modelLabNumber != null) {
    json.isPartOf = {
      '@type': 'CreativeWorkSeries',
      '@id': `${SITE_URL}/#model-lab`,
      name: 'Model Lab',
      url: pageUrl('/blog'),
    };
    json.genre = 'Model Lab';
  }

  if (post.modelStatus) json.creativeWorkStatus = post.modelStatus;
  if (post.modelName) json.alternativeHeadline = post.modelName;

  return json;
}

export function buildModelLabSeriesJsonLd(posts) {
  const modelLabPosts = posts
    .filter((post) => post.modelLabNumber != null || extractModelLabNumber(post.title) != null)
    .sort((a, b) => (a.modelLabNumber ?? extractModelLabNumber(a.title)) - (b.modelLabNumber ?? extractModelLabNumber(b.title)));

  if (!modelLabPosts.length) return null;

  return {
    '@type': 'CreativeWorkSeries',
    '@id': `${SITE_URL}/#model-lab`,
    name: 'Model Lab',
    description:
      'An experimental research series on capital efficiency, asset structuring, and global financial identity — each article documents a model with assumptions and failure cases.',
    url: pageUrl('/blog'),
    author: { '@id': `${SITE_URL}/#person` },
    hasPart: modelLabPosts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': pageUrl(`/blog/${post.id}#article`),
      name: post.title,
      url: pageUrl(`/blog/${post.id}`),
      datePublished: toIsoDate(post.date),
    })),
  };
}

export function buildItemListJsonLd(posts, name = 'Model Lab') {
  return {
    '@type': 'ItemList',
    name,
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: pageUrl(`/blog/${post.id}`),
      name: post.title,
    })),
  };
}

export function buildBlogJsonLd(posts) {
  return {
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog#blog`,
    name: 'Rick — Model Lab',
    description: 'Experimental research models on finance, systems, technology, and organizations.',
    url: pageUrl('/blog'),
    publisher: { '@id': `${SITE_URL}/#person` },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': pageUrl(`/blog/${post.id}#article`),
      headline: post.title,
      url: pageUrl(`/blog/${post.id}`),
      datePublished: post.date,
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
    '@graph': graph,
  };
}

export function buildHreflangTags(path = '/') {
  const url = pageUrl(path);
  return [
    `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    `<link rel="alternate" hreflang="en" href="${url}" />`,
    `<link rel="alternate" hreflang="zh-Hant" href="${url}" />`,
  ];
}

export function buildHeadTags({ title, description, path, type = 'website', image, keywords, article, noindex = false, geoSummary }) {
  const url = pageUrl(path);
  const img = image || DEFAULT_IMAGE;
  const robots = noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="author" content="${AUTHOR.name}" />`,
    keywordContent ? `<meta name="keywords" content="${escapeHtml(keywordContent)}" />` : '',
    `<link rel="canonical" href="${url}" />`,
    ...buildHreflangTags(path),
    geoSummary ? `<meta name="abstract" content="${escapeHtml(geoSummary)}" />` : '',
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:locale:alternate" content="zh_TW" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ];

  if (article) {
    tags.push(`<meta property="article:published_time" content="${toIsoDate(article.publishedTime)}" />`);
    if (article.modifiedTime) {
      tags.push(`<meta property="article:modified_time" content="${toIsoDate(article.modifiedTime)}" />`);
    }
    tags.push(`<meta property="article:author" content="${AUTHOR.name}" />`);
    if (article.section) {
      tags.push(`<meta property="article:section" content="${escapeHtml(article.section)}" />`);
    }
    for (const tag of article.tags ?? []) {
      tags.push(`<meta property="article:tag" content="${escapeHtml(tag)}" />`);
    }
  }

  return tags.filter(Boolean).join('\n  ');
}
