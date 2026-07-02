import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { htmlToPlainText, extractModelLabNumber, countWords } from '../src/seo/schema.js';

const POSTS_DIR = path.resolve('content/posts');
const OUTPUT_DIR = path.resolve('src/data/posts');

marked.setOptions({ gfm: true });

function normalizeDate(value) {
  if (!value) return undefined;
  if (typeof value === 'string') return value.slice(0, 10);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function toHtml(body) {
  const trimmed = body.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('<')) return trimmed;
  return marked.parse(trimmed);
}

function loadPosts(locale) {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const filePath = path.join(POSTS_DIR, entry.name, `${locale}.md`);
      if (!fs.existsSync(filePath)) return null;

      const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
      const html = toHtml(content);
      const plainText = htmlToPlainText(html);
      const modelLabNumber = data.modelLabNumber ?? extractModelLabNumber(data.title);
      return {
        id: data.id,
        slug: data.slug ?? entry.name,
        title: data.title,
        emoji: data.emoji,
        date: normalizeDate(data.date),
        modified: normalizeDate(data.modified ?? data.date),
        category: data.category,
        tags: data.tags ?? [],
        keywords: data.keywords ?? data.tags ?? [],
        excerpt: data.excerpt,
        geoSummary: data.geoSummary ?? data.excerpt,
        modelLabNumber,
        modelName: data.modelName,
        modelStatus: data.modelStatus ?? (modelLabNumber ? 'experimental' : undefined),
        wordCount: countWords(plainText),
        content: html,
        plainText,
        locale,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.id - b.id);
}

const zhPosts = loadPosts('zh');
const enPosts = loadPosts('en');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'zh.js'),
  `export default ${JSON.stringify(zhPosts, null, 2)};\n`
);
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'en.js'),
  `export default ${JSON.stringify(enPosts, null, 2)};\n`
);

console.log(`✅ Built ${zhPosts.length} zh posts and ${enPosts.length} en posts`);
