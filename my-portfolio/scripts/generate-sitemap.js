import fs from 'fs';
import { blogPosts } from '../src/data/posts/index.js';

const siteUrl = 'https://chaindevrick.github.io';

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/experience', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.9' },
];

const urls = [
  ...staticRoutes.map(({ path, changefreq, priority }) => ({
    loc: `${siteUrl}${path === '/' ? '' : path}`,
    changefreq,
    priority,
  })),
  ...blogPosts.map((post) => ({
    loc: `${siteUrl}/blog/${post.id}`,
    lastmod: post.date,
    changefreq: 'monthly',
    priority: '0.7',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', xml);
console.log('✅ Sitemap generated at public/sitemap.xml');
