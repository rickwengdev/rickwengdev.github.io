import { getPublicPapers } from '../content/index.js';
import { tm } from '../i18n/index.js';
import {
  SITE_NAME,
  DEFAULT_IMAGE,
  HOME_PATH,
  LANGUAGE_ALTERNATES,
  SITE_SUMMARY,
  buildSiteJsonLd,
  pageUrl,
} from './schema.js';

// The date the content last changed, set at build time (vite.config.js) from git.
export const CONTENT_UPDATED = import.meta.env.VITE_CONTENT_UPDATED;

function upsertMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!content) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(selector, attrs) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([name, value]) => el.setAttribute(name, value));
}

function upsertJsonLd(data) {
  const id = 'site-json-ld';
  let el = document.getElementById(id);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function applySeo({ title, description, path, keywords, jsonLd, noindex = false, geoSummary }) {
  const url = pageUrl(path);

  document.title = title;
  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  upsertMeta('name', 'keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords);
  upsertMeta('name', 'abstract', geoSummary);

  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:image', DEFAULT_IMAGE);
  upsertMeta('property', 'og:site_name', SITE_NAME);
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', description);

  upsertLink('link[rel="canonical"]', { rel: 'canonical', href: url });
  for (const { hreflang, href } of LANGUAGE_ALTERNATES) {
    upsertLink(`link[rel="alternate"][hreflang="${hreflang}"]:not([type])`, { rel: 'alternate', hreflang, href });
  }

  upsertJsonLd(jsonLd);
}

export function updateSeoForRoute(route, locale, t) {
  upsertMeta('property', 'og:locale', locale === 'zh' ? 'zh_TW' : 'en_US');
  upsertMeta('property', 'og:locale:alternate', locale === 'zh' ? 'en_US' : 'zh_TW');

  const seoKey = route.meta?.seoKey || 'home';
  const base = {
    title: t(`seo.${seoKey}.title`),
    description: t(`seo.${seoKey}.description`),
    keywords: tm(`seo.${seoKey}.keywords`),
    path: route.path,
  };

  if (seoKey === 'notFound') {
    applySeo({ ...base, noindex: true });
    return;
  }

  applySeo({
    ...base,
    // Each language has its own home page: / or /zh/.
    path: HOME_PATH[locale],
    geoSummary: SITE_SUMMARY[locale],
    jsonLd: buildSiteJsonLd({ locale, papers: getPublicPapers(locale), dateModified: CONTENT_UPDATED }),
  });
}
