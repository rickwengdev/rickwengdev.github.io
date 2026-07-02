import zhPosts from './zh.js';
import enPosts from './en.js';

export function getBlogPosts(locale) {
  return locale === 'zh' ? zhPosts : enPosts;
}

// Default export for RSS build script
export const blogPosts = enPosts;
