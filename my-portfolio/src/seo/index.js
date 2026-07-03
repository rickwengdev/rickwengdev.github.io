import { getBlogPosts } from '../data/posts/index.js';
import { tm } from '../i18n/index.js';
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_IMAGE,
  buildPersonJsonLd,
  buildWebsiteJsonLd,
  buildBlogPostingJsonLd,
  buildBlogJsonLd,
  buildBreadcrumbJsonLd,
  buildModelLabSeriesJsonLd,
  buildItemListJsonLd,
  wrapJsonLd,
  pageUrl,
  extractModelLabNumber,
} from './schema.js';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(attr, key) {
  document.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

function upsertLink(rel, href, extra = {}) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  Object.entries(extra).forEach(([name, value]) => {
    if (value) el.setAttribute(name, value);
  });
}

function upsertJsonLd(data) {
  const id = 'site-json-ld';
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd() {
  document.getElementById('site-json-ld')?.remove();
}

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE, pageUrl };

export function applySeo({
  title,
  description,
  path = '/',
  type = 'website',
  image,
  keywords,
  article,
  jsonLd,
  noindex = false,
}) {
  const url = pageUrl(path);
  const img = image || DEFAULT_IMAGE;
  const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  document.title = title;

  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  if (keywordContent) upsertMeta('name', 'keywords', keywordContent);
  else removeMeta('name', 'keywords');

  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:type', type);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:image', img);
  upsertMeta('property', 'og:site_name', SITE_NAME);

  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', img);

  upsertLink('canonical', url);

  if (article) {
    upsertMeta('property', 'article:published_time', article.publishedTime);
    upsertMeta('property', 'article:modified_time', article.modifiedTime ?? article.publishedTime);
    upsertMeta('property', 'article:author', article.author ?? 'Rick');
    if (article.section) upsertMeta('property', 'article:section', article.section);
    document.querySelectorAll('meta[property="article:tag"]').forEach((el) => el.remove());
    for (const tag of article.tags ?? []) {
      const el = document.createElement('meta');
      el.setAttribute('property', 'article:tag');
      el.setAttribute('content', tag);
      document.head.appendChild(el);
    }
  } else {
    ['article:published_time', 'article:modified_time', 'article:author', 'article:section'].forEach((key) =>
      removeMeta('property', key)
    );
    document.querySelectorAll('meta[property="article:tag"]').forEach((el) => el.remove());
  }

  if (jsonLd) upsertJsonLd(jsonLd);
  else removeJsonLd();
}

export function updateSeoForRoute(route, locale, t) {
  const ogLocale = locale === 'zh' ? 'zh_TW' : 'en_US';
  upsertMeta('property', 'og:locale', ogLocale);

  if (route.name === 'blog-post') {
    const id = parseInt(route.params.id, 10);
    const post = getBlogPosts(locale).find((p) => p.id === id);

    if (post) {
      applySeo({
        title: t('seo.blogPost.title', { title: post.title }),
        description: post.excerpt,
        path: `/blog/${post.id}`,
        type: 'article',
        keywords: post.keywords ?? post.tags,
        article: {
          publishedTime: post.date,
          modifiedTime: post.modified ?? post.date,
          tags: post.tags,
          section: post.category,
        },
        jsonLd: wrapJsonLd(
          [
            buildPersonJsonLd(),
            buildBlogPostingJsonLd({ ...post, locale }),
            buildBreadcrumbJsonLd([
              { name: t('nav.home'), path: '/' },
              { name: t('nav.blog'), path: '/blog' },
              { name: post.title, path: `/blog/${post.id}` },
            ]),
            post.modelLabNumber != null || extractModelLabNumber(post.title) != null
              ? buildModelLabSeriesJsonLd(getBlogPosts(locale))
              : null,
          ].filter(Boolean)
        ),
      });
      return;
    }

    applySeo({
      title: t('seo.notFound.title'),
      description: t('seo.notFound.description'),
      path: route.path,
      noindex: true,
    });
    return;
  }

  const seoKey = route.meta?.seoKey || 'home';
  const posts = getBlogPosts(locale);

  if (seoKey === 'home') {
    applySeo({
      title: t('seo.home.title'),
      description: t('seo.home.description'),
      path: route.path,
      keywords: tm('seo.home.keywords'),
      jsonLd: wrapJsonLd([
        buildWebsiteJsonLd(t('seo.home.description')),
        buildPersonJsonLd(),
      ]),
    });
    return;
  }

  if (seoKey === 'blog') {
    applySeo({
      title: t('seo.blog.title'),
      description: t('seo.blog.description'),
      path: route.path,
      keywords: tm('seo.blog.keywords'),
      jsonLd: wrapJsonLd(
        [
          buildBlogJsonLd(posts),
          buildItemListJsonLd(posts),
          buildModelLabSeriesJsonLd(posts),
          buildBreadcrumbJsonLd([
            { name: t('nav.home'), path: '/' },
            { name: t('nav.blog'), path: '/blog' },
          ]),
        ].filter(Boolean)
      ),
    });
    return;
  }

  applySeo({
    title: t(`seo.${seoKey}.title`),
    description: t(`seo.${seoKey}.description`),
    path: route.path,
    keywords: tm(`seo.${seoKey}.keywords`),
    jsonLd:
      seoKey === 'experience'
        ? wrapJsonLd([
            buildPersonJsonLd(),
            buildBreadcrumbJsonLd([
              { name: t('nav.home'), path: '/' },
              { name: t('nav.experience'), path: '/experience' },
            ]),
          ])
        : undefined,
  });
}
