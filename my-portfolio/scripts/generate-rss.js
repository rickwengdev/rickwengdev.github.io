import fs from 'fs';
import { Feed } from 'feed';
import { blogPosts } from '../src/data/posts/index.js';
import { SITE_DESCRIPTION, SITE_URL } from '../src/seo/schema.js';

const siteUrl = SITE_URL;
const author = {
  name: 'Rick',
  email: 'office@theprism.ltd',
  link: siteUrl,
};

const feed = new Feed({
  title: 'Rick — Model Lab',
  description: SITE_DESCRIPTION,
  id: siteUrl,
  link: siteUrl,
  language: "en",
  image: `${siteUrl}/avatar.jpg`, // 你的大頭貼
  favicon: `${siteUrl}/favicon.ico`,
  copyright: `All rights reserved ${new Date().getFullYear()}, Rick`,
  updated: new Date(),
  generator: "Feed for Node.js",
  feedLinks: {
    rss2: `${siteUrl}/rss.xml`,
  },
  author: author,
});

// 將文章加入 Feed
blogPosts.forEach((post) => {
  feed.addItem({
    title: post.title,
    id: `${siteUrl}/blog/${post.id}`,
    link: `${siteUrl}/blog/${post.id}`,
    description: post.excerpt,
    content: post.content,
    author: [author],
    date: new Date(post.date),
    image: post.image ? `${siteUrl}${post.image}` : undefined
  });
});

// 輸出 RSS 檔案到 public 資料夾
// Vite 打包時會把 public 裡的檔案複製到 dist，所以放在這裡
fs.writeFileSync('./public/rss.xml', feed.rss2());

console.log('✅ RSS Feed generated successfully at public/rss.xml');