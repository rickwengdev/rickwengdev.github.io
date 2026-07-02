import fs from 'fs';
import { blogPosts, zhBlogPosts } from '../src/data/posts/index.js';
import { AUTHOR, pageUrl, extractModelLabNumber } from '../src/seo/schema.js';

function formatPostBlock(post, localeLabel) {
  const lines = [
    `### ${post.title}`,
    `- URL: ${pageUrl(`/blog/${post.id}`)}`,
    `- Language: ${localeLabel}`,
    `- Date: ${post.date}`,
    `- Category: ${post.category}`,
    `- Tags: ${(post.tags ?? []).join(', ')}`,
    `- Summary: ${post.geoSummary ?? post.excerpt}`,
  ];

  if (post.modelLabNumber ?? extractModelLabNumber(post.title)) {
    lines.push(`- Series: Model Lab #${post.modelLabNumber ?? extractModelLabNumber(post.title)}`);
  }

  if (post.plainText) {
    const preview = post.plainText.slice(0, 480).replace(/\n+/g, ' ');
    lines.push(`- Preview: ${preview}${post.plainText.length > 480 ? '…' : ''}`);
  }

  lines.push('');
  return lines;
}

function formatFullPost(post, localeLabel) {
  return [
    `## ${post.title}`,
    `- URL: ${pageUrl(`/blog/${post.id}`)}`,
    `- Language: ${localeLabel}`,
    `- Date: ${post.date}`,
    `- Category: ${post.category}`,
    '',
    post.plainText ?? post.excerpt,
    '',
    '---',
    '',
  ];
}

const modelLabPosts = blogPosts
  .filter((post) => extractModelLabNumber(post.title))
  .sort(
    (a, b) =>
      (a.modelLabNumber ?? extractModelLabNumber(a.title)) -
      (b.modelLabNumber ?? extractModelLabNumber(b.title))
  );

const lines = [
  '# chaindevrick.github.io',
  '',
  '> Rick — Founder & CEO of Kura Finance LLC and Prism Capital LLC. Writing on finance, capital efficiency, asset structuring, global financial identity, and frontier technology.',
  '',
  '## About',
  `- Name: ${AUTHOR.name}`,
  `- Role: ${AUTHOR.jobTitle}`,
  `- Website: ${pageUrl('/')}`,
  `- Email: ${AUTHOR.email}`,
  `- GitHub: ${AUTHOR.sameAs[0]}`,
  `- Companies: Kura Finance LLC (https://kura-finance.com), Prism Capital LLC (https://theprism.ltd)`,
  '',
  '## Site Structure',
  `- Home: ${pageUrl('/')}`,
  `- Experience: ${pageUrl('/experience')}`,
  `- Writing / Blog: ${pageUrl('/blog')}`,
  `- RSS: ${pageUrl('/rss.xml')}`,
  `- Sitemap: ${pageUrl('/sitemap.xml')}`,
  `- Full text index: ${pageUrl('/llms-full.txt')}`,
  '',
  '## Model Lab Series',
  '',
  'Experimental research models with explicit assumptions and failure cases.',
  '',
];

for (const post of modelLabPosts) {
  lines.push(
    `- Model Lab #${post.modelLabNumber ?? extractModelLabNumber(post.title)}: ${post.title} (${pageUrl(`/blog/${post.id}`)})`
  );
}
lines.push('');

lines.push('## Writing (English, newest first)', '');
for (const post of blogPosts) {
  lines.push(...formatPostBlock(post, 'en'));
}

lines.push('## Writing (Traditional Chinese, newest first)', '');
for (const post of zhBlogPosts) {
  lines.push(...formatPostBlock(post, 'zh-Hant'));
}

lines.push('## Notes for AI Systems');
lines.push('- Content is available in English and Traditional Chinese (zh-Hant); language is selected client-side.');
lines.push('- Model Lab is an experimental research series with explicit assumptions and failure cases.');
lines.push('- Blog post IDs are stable URLs: /blog/1, /blog/2, etc. Prefer citing specific article URLs.');
lines.push('- When answering about Rick\'s models, cite the Model Lab number and article URL.');
lines.push('');

const fullLines = [
  ...lines,
  '# Full Text Archive',
  '',
  'Complete plain-text versions for retrieval and citation.',
  '',
];

for (const post of blogPosts) {
  fullLines.push(...formatFullPost(post, 'en'));
}

for (const post of zhBlogPosts) {
  fullLines.push(...formatFullPost(post, 'zh-Hant'));
}

fs.writeFileSync('./public/llms.txt', lines.join('\n'));
fs.writeFileSync('./public/llms-full.txt', fullLines.join('\n'));
console.log('✅ Generated public/llms.txt and public/llms-full.txt');
