import fs from 'fs';
import path from 'path';
import { PAGES, REDIRECTS } from './pages.js';
import { THEME_COLOR, buildHeadTags, pageUrl } from '../src/seo/schema.js';

const DIST = path.resolve('dist');
const INDEX = path.join(DIST, 'index.html');

if (!fs.existsSync(INDEX)) {
  console.warn('⚠️ dist/index.html not found, skipping prerender');
  process.exit(0);
}

const baseHtml = fs.readFileSync(INDEX, 'utf8');
const script = baseHtml.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)?.[1];
const css = baseHtml.match(/<link rel="stylesheet" crossorigin href="([^"]+)">/)?.[1];
const fonts = baseHtml.match(/<link rel="preconnect"[\s\S]*?family=[^>]+>/)?.[0] ?? '';

function renderPage({ path: pagePath, seo, geoSummary, jsonLd, body }) {
  const head = buildHeadTags({ ...seo, path: pagePath, geoSummary });
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/logo.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="${THEME_COLOR}" />
  <link rel="alternate" type="text/plain" title="LLMs index" href="/llms.txt" />
  ${fonts}
  ${head}
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
  ${css ? `<link rel="stylesheet" crossorigin href="${css}">` : ''}
</head>
<body>
  <main id="seo-content" aria-label="Page content">${body}</main>
  <div id="app"></div>
  ${script ? `<script type="module" crossorigin src="${script}"></script>` : ''}
</body>
</html>`;
}

function renderRedirect(to) {
  const url = pageUrl(to.split('#')[0]) + (to.includes('#') ? `#${to.split('#')[1]}` : '');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Moved</title>
  <meta name="robots" content="noindex" />
  <link rel="canonical" href="${url}" />
  <meta http-equiv="refresh" content="0; url=${to}" />
</head>
<body><p>This page has moved to <a href="${to}">${url}</a>.</p></body>
</html>`;
}

function writePage(relativeDir, html) {
  const dir = relativeDir ? path.join(DIST, relativeDir) : DIST;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

for (const page of PAGES) writePage(page.dir, renderPage(page));
for (const { dir, to } of REDIRECTS) writePage(dir, renderRedirect(to));

console.log(`✅ Prerendered ${PAGES.length} pages and ${REDIRECTS.length} redirects`);
