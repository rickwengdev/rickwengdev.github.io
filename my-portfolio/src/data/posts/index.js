import zhPosts from './zh.js';
import enPosts from './en.js';

const sortByNewest = (posts) =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

export function getBlogPosts(locale) {
  return sortByNewest(locale === 'zh' ? zhPosts : enPosts);
}

export function getModelLabPosts(locale) {
  return getBlogPosts(locale)
    .filter((post) => post.modelLabNumber != null)
    .sort((a, b) => b.modelLabNumber - a.modelLabNumber);
}

/** Case-study models (#001+); excludes meta-layer #000 from homepage highlights. */
export function getModelLabCaseStudies(locale) {
  return getModelLabPosts(locale).filter((post) => post.modelLabNumber > 0);
}

export const blogPosts = sortByNewest(enPosts);
export const zhBlogPosts = sortByNewest(zhPosts);
