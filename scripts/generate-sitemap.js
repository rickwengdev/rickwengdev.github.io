import fs from 'fs';
import { PAGES } from './pages.js';
import { LANGUAGE_ALTERNATES, pageUrl } from '../src/seo/schema.js';

// Every language version lists all the others (and the default) as alternates.
const alternates = LANGUAGE_ALTERNATES.map(
  ({ hreflang, href }) => `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${PAGES.map(
  ({ path, lastmod, changefreq, priority }) => `  <url>
    <loc>${pageUrl(path)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
  </url>`
).join('\n')}
</urlset>
`;

fs.writeFileSync('./public/sitemap.xml', xml);
console.log('✅ Sitemap generated at public/sitemap.xml');
