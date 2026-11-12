import { createRouter, createWebHistory, START_LOCATION } from 'vue-router';

import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import { HOME_PATH, localeFromPath, preferredLocale, setLocale } from '../i18n';

const to = (hash) => ({ path: '/', hash });

const routes = [
  // The same page in each language; `meta.locale` is the language of that address.
  { path: HOME_PATH.en, name: 'home', component: Home, meta: { seoKey: 'home', locale: 'en' } },
  { path: HOME_PATH.zh, name: 'home-zh', component: Home, meta: { seoKey: 'home', locale: 'zh' } },
  // Older URLs now point at sections of the single page.
  { path: '/papers', redirect: to('#research') },
  { path: '/work', redirect: to('#experience') },
  { path: '/blog', redirect: to('#research') },
  { path: '/blog/:id', redirect: to('#research') },
  { path: '/experience', redirect: to('#experience') },
  { path: '/projects', redirect: to('#projects') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound, meta: { seoKey: 'notFound' } },
];

// The language of a page: fixed for the home pages, otherwise from the address
// (/zh/…) or, failing that, the reader's preference.
export const routeLocale = (route) =>
  route.meta?.locale ?? (localeFromPath(route.path) === 'zh' ? 'zh' : preferredLocale());

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    // A fresh load or a reload always starts at the top (or at a linked
    // section), never where the last visit left off. Back/forward still
    // returns to the saved position.
    const firstLoad = from === START_LOCATION;
    if (saved && !firstLoad) return saved;
    // Switching language keeps the reader where they are on the page.
    if (!firstLoad && from.meta.locale && to.meta.locale && from.meta.locale !== to.meta.locale) return false;
    if (to.hash) {
      if (to.hash === '#top') return { top: 0, behavior: 'smooth' };
      return { el: to.hash, top: 80, behavior: from.name ? 'smooth' : 'auto' };
    }
    return { top: 0 };
  },
});

// Arriving on the English home page with Chinese preferred (saved, or the
// browser's language the first time): go to the Chinese home page instead.
// Links into /zh/ are always honoured, whatever the preference.
router.beforeEach((to, from) => {
  if (from === START_LOCATION && to.name === 'home' && preferredLocale() === 'zh') {
    return { path: HOME_PATH.zh, hash: to.hash, replace: true };
  }
});

router.afterEach((to) => setLocale(routeLocale(to)));

export default router;
