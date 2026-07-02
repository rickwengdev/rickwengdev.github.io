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
  wrapJsonLd,
} from '../src/seo/schema.js';

const DIST = path.resolve('dist');
const INDEX = path.join(DIST, 'index.html');

const STATIC_PAGES = [
  {
    dir: null,
    path: '/',
    title: 'Rick — Founder & CEO',
    description:
      'Rick is Founder & CEO of Kura Finance LLC and Prism Capital LLC — building enterprises at the intersection of modern finance and frontier technology.',
    keywords: ['Rick', 'Founder', 'CEO', 'Kura Finance', 'Prism Capital', 'Fintech', 'Capital Efficiency'],
    jsonLd: wrapJsonLd([
      buildWebsiteJsonLd(
        'Rick is Founder & CEO of Kura Finance LLC and Prism Capital LLC — building enterprises at the intersection of modern finance and frontier technology.'
      ),
      buildPersonJsonLd(),
    ]),
    body: `<h1>Rick — Founder & CEO</h1><p>Founder-led enterprises at the intersection of modern finance and frontier technology.</p><p>Writing on <a href="${pageUrl('/blog')}">capital efficiency, asset structuring, and global financial identity</a>.</p>`,
  },
  {
    dir: 'experience',
    path: '/experience',
    title: 'Experience — Rick',
    description:
      'Founder & CEO of Kura Finance LLC and Prism Capital LLC — modern finance and proprietary capital at the technological frontier.',
    keywords: ['Experience', 'Kura Finance', 'Prism Capital', 'Founder', 'CEO'],
    jsonLd: wrapJsonLd([
      buildPersonJsonLd(),
      buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Experience', path: '/experience' },
      ]),
    ]),
    body: `<h1>Experience</h1><p>Founder & CEO of Kura Finance LLC and Prism Capital LLC.</p>`,
  },
  {
    dir: 'blog',
    path: '/blog',
    title: 'Writing — Rick',
    description:
      'Perspectives on finance, capital efficiency, asset structuring, global financial identity, Model Lab research, and building at the frontier.',
    keywords: ['Writing', 'Blog', 'Finance', 'Model Lab', 'Capital Efficiency', 'Global Financial Identity'],
    jsonLd: wrapJsonLd(
      [
        buildBlogJsonLd(blogPosts),
        buildItemListJsonLd(blogPosts),
        buildModelLabSeriesJsonLd(blogPosts),
        buildBreadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Writing', path: '/blog' },
        ]),
      ].filter(Boolean)
    ),
    body: `<h1>Writing</h1><p>Perspectives on finance, technology, and building at the frontier.</p><ul>${blogPosts
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

function renderPage({ title, description, path, keywords, type = 'website', article, jsonLd, body }) {
  const baseHtml = fs.readFileSync(INDEX, 'utf8');
  const assets = assetRefs(baseHtml);
  const head = buildHeadTags({ title, description, path, type, keywords, article });
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
  <link rel="alternate" type="application/rss+xml" title="Rick — Writing" href="/rss.xml" />
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
        { name: 'Writing', path: '/blog' },
        { name: post.title, path: postPath },
      ]),
      post.modelLabNumber ? buildModelLabSeriesJsonLd(blogPosts) : null,
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
