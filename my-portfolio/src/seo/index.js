import { getBlogPosts } from '../data/posts/index.js';

export const SITE_URL = 'https://chaindevrick.github.io';
const DEFAULT_IMAGE = `${SITE_URL}/avatar.jpg`;
const SITE_NAME = 'Rick';

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

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
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

export function applySeo({
  title,
  description,
  path = '/',
  type = 'website',
  image,
  jsonLd,
  noindex = false,
}) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
  const img = image || DEFAULT_IMAGE;

  document.title = title;

  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

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

  if (jsonLd) upsertJsonLd(jsonLd);
  else removeJsonLd();
}

function buildHomeJsonLd(t) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: t('seo.home.description'),
      },
      {
        '@type': 'Person',
        name: 'Rick',
        url: SITE_URL,
        jobTitle: 'Founder & CEO',
        image: DEFAULT_IMAGE,
        sameAs: ['https://github.com/chaindevrick'],
        worksFor: [
          { '@type': 'Organization', name: 'Kura Finance LLC', url: 'https://kura-finance.com' },
          { '@type': 'Organization', name: 'Prism Capital LLC', url: 'https://theprism.ltd' },
        ],
      },
    ],
  };
}

function buildBlogPostingJsonLd(post) {
  const url = `${SITE_URL}/blog/${post.id}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: 'Rick', url: SITE_URL },
    publisher: { '@type': 'Person', name: 'Rick' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    image: DEFAULT_IMAGE,
  };
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
        jsonLd: buildBlogPostingJsonLd(post),
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
  applySeo({
    title: t(`seo.${seoKey}.title`),
    description: t(`seo.${seoKey}.description`),
    path: route.path,
    jsonLd: seoKey === 'home' ? buildHomeJsonLd(t) : undefined,
  });
}
