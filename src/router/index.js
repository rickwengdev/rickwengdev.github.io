import { createRouter, createWebHistory, START_LOCATION } from 'vue-router';

import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

const to = (hash) => ({ path: '/', hash });

const routes = [
  { path: '/', name: 'home', component: Home, meta: { seoKey: 'home' } },
  // Older URLs now point at sections of the single page.
  { path: '/papers', redirect: to('#research') },
  { path: '/work', redirect: to('#experience') },
  { path: '/blog', redirect: to('#research') },
  { path: '/blog/:id', redirect: to('#research') },
  { path: '/experience', redirect: to('#experience') },
  { path: '/projects', redirect: to('#projects') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound, meta: { seoKey: 'notFound' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    // A fresh load or a reload always starts at the top (or at a linked
    // section), never where the last visit left off. Back/forward still
    // returns to the saved position.
    const firstLoad = from === START_LOCATION;
    if (saved && !firstLoad) return saved;
    if (to.hash) {
      if (to.hash === '#top') return { top: 0, behavior: 'smooth' };
      return { el: to.hash, top: 80, behavior: from.name ? 'smooth' : 'auto' };
    }
    return { top: 0 };
  },
});

export default router;
