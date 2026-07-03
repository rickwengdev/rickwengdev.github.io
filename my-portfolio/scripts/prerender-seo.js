import fs from 'fs';
import path from 'path';
import { blogPosts, zhBlogPosts } from '../src/data/posts/index.js';
import {
  buildBlogJsonLd,
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildHeadTags,
  buildItemListJsonLd,
  buildModelLabSeriesJsonLd,
  buildPersonJsonLd,
  buildWebsiteJsonLd,
  escapeHtml,
  pageUrl,
  SITE_DESCRIPTION,
  SITE_GEO_SUMMARY,
  wrapJsonLd,
} from '../src/seo/schema.js';

const DIST = path.resolve('dist');
const INDEX = path.join(DIST, 'index.html');

const STATIC_PAGES = [
  {
    dir: null,
    path: '/',
    title: 'Rick — Model Lab',
    description:
      'Rick reverse engineers finance, technology, and organizations. Founder of Kura Finance & Prism Capital. Model Lab — sharing models, not opinions.',
    geoSummary: SITE_GEO_SUMMARY,
    keywords: ['Rick', 'Model Lab', 'Kura Finance', 'Prism Capital', 'Founder', 'Self-custody', 'Capital Efficiency', 'Global Financial Identity', 'Asset Structuring', 'Buy Borrow Die', 'Thinking Framework'],
    jsonLd: wrapJsonLd([
      buildWebsiteJsonLd(SITE_DESCRIPTION),
      buildPersonJsonLd(),
    ]),
    body: `<h1>Rick</h1><p>${escapeHtml(SITE_DESCRIPTION)}</p><p>${escapeHtml(SITE_GEO_SUMMARY)}</p><p>Currently building <a href="https://kura-finance.com">Kura Finance</a>.</p><p>Explore <a href="${pageUrl('/blog')}">Model Lab</a>.</p>`,
  },
  {
    dir: 'experience',
    path: '/experience',
    title: 'Companies — Rick',
    description:
      'Founder & CEO of Kura Finance (self-custody financial account for the world) and Prism Capital — modern finance and proprietary capital at the frontier.',
    keywords: ['Companies', 'Kura Finance', 'Prism Capital', 'Founder', 'Self-custody'],
    jsonLd: wrapJsonLd([
      buildPersonJsonLd(),
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Companies', path: '/experience' },
      ]),
    ]),
    body: `<h1>Companies</h1><p>Founder & CEO of <a href="https://kura-finance.com">Kura Finance</a> and <a href="https://theprism.ltd">Prism Capital</a>.</p>`,
  },
  {
    dir: 'blog',
    path: '/blog',
    title: 'Model Lab — Rick',
    description:
      'Experimental research models on finance, systems, technology, and organizations — each with explicit assumptions and failure cases.',
    keywords: ['Model Lab', 'Finance', 'Systems', 'Technology', 'Organizations', 'Capital Efficiency', 'Global Financial Identity'],
    jsonLd: wrapJsonLd(
      [
        buildBlogJsonLd(blogPosts),
        buildItemListJsonLd(blogPosts),
        buildModelLabSeriesJsonLd(blogPosts),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Model Lab', path: '/blog' },
        ]),
      ].filter(Boolean)
    ),
    body: `<h1>Model Lab</h1><p>Experimental research models on finance, systems, technology, and organizations.</p><ul>${blogPosts
      .map(
        (post) =>
          `<li><a href="${pageUrl(`/blog/${post.id}`)}">${escapeHtml(post.title)}</a> <time datetime="${post.date}">${post.date}</time></li>`
      )
      .join('')}</ul>`,
  },
];

function assetRefs(html) {
  const scriptMatch = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/);
  const cssMatch = html.match(/<link rel="stylesheet" crossorigin href="([^"]+)">/);
  return {
    script: scriptMatch?.[1] ?? '/assets/index.js',
    css: cssMatch?.[1] ?? '/assets/index.css',
  };
}

function renderPage({ title, description, path, keywords, type = 'website', article, jsonLd, body, geoSummary }) {
  const baseHtml = fs.readFileSync(INDEX, 'utf8');
  const assets = assetRefs(baseHtml);
  const head = buildHeadTags({ title, description, path, type, keywords, article, geoSummary });
  const jsonLdScript = jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/logo.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#7c5cfc" />
  <link rel="alternate" type="application/rss+xml" title="Rick — Model Lab" href="/rss.xml" />
  <link rel="alternate" type="text/plain" title="LLMs index" href="/llms.txt" />
  ${head}
  ${jsonLdScript}
  <link rel="stylesheet" crossorigin href="${assets.css}">
</head>
<body>
  <main id="seo-content" aria-label="Page content">${body}</main>
  <div id="app"></div>
  <script type="module" crossorigin src="${assets.script}"></script>
</body>
</html>`;
}

function writePage(relativeDir, html) {
  const dir = relativeDir ? path.join(DIST, relativeDir) : DIST;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

function bilingualSummary(enPost, zhPost) {
  if (!zhPost) return '';
  return `<section lang="zh-Hant" aria-label="Traditional Chinese summary">
    <h2>${escapeHtml(zhPost.title)}</h2>
    <p>${escapeHtml(zhPost.geoSummary ?? zhPost.excerpt)}</p>
  </section>`;
}

if (!fs.existsSync(INDEX)) {
  console.warn('⚠️ dist/index.html not found, skipping prerender');
  process.exit(0);
}

for (const page of STATIC_PAGES) {
  writePage(page.dir, renderPage(page));
}

const zhById = Object.fromEntries(zhBlogPosts.map((post) => [post.id, post]));

for (const post of blogPosts) {
  const postPath = `/blog/${post.id}`;
  const title = `${post.title} — Rick`;
  const zhPost = zhById[post.id];
  const jsonLd = wrapJsonLd(
    [
      buildPersonJsonLd(),
      buildBlogPostingJsonLd({ ...post, locale: 'en' }),
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Model Lab', path: '/blog' },
        { name: post.title, path: postPath },
      ]),
      post.modelLabNumber != null ? buildModelLabSeriesJsonLd(blogPosts) : null,
    ].filter(Boolean)
  );

  const body = `<article itemscope itemtype="https://schema.org/BlogPosting">
    <h1 itemprop="headline">${escapeHtml(post.title)}</h1>
    <p><time itemprop="datePublished" datetime="${post.date}">${post.date}</time> · ${escapeHtml(post.category)}</p>
    <p itemprop="description">${escapeHtml(post.geoSummary ?? post.excerpt)}</p>
    <div itemprop="articleBody">${post.content}</div>
  </article>
  ${bilingualSummary(post, zhPost)}`;

  writePage(
    `blog/${post.id}`,
    renderPage({
      title,
      description: post.geoSummary ?? post.excerpt,
      geoSummary: post.geoSummary ?? post.excerpt,
      path: postPath,
      type: 'article',
      keywords: post.keywords ?? post.tags,
      article: {
        publishedTime: post.date,
        modifiedTime: post.modified ?? post.date,
        tags: post.tags,
        section: post.category,
      },
      jsonLd,
      body,
    })
  );
}

console.log(`✅ Prerendered ${STATIC_PAGES.length + blogPosts.length} SEO pages`);
