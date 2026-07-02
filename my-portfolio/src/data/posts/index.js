import zhPosts from './zh.js';
import enPosts from './en.js';

const sortByNewest = (posts) =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

export function getBlogPosts(locale) {
  return sortByNewest(locale === 'zh' ? zhPosts : enPosts);
}

export function getModelLabPosts(locale) {
  return getBlogPosts(locale)
    .filter((post) => post.modelLabNumber)
    .sort((a, b) => b.modelLabNumber - a.modelLabNumber);
}

export const blogPosts = sortByNewest(enPosts);
export const zhBlogPosts = sortByNewest(zhPosts);
