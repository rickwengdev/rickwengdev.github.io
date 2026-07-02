import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Experience from '../views/Experience.vue';
import Blog from '../views/Blog.vue';
import BlogPost from '../views/BlogPost.vue';

const routes = [
  { path: '/', name: 'home', component: Home, meta: { seoKey: 'home' } },
  { path: '/experience', name: 'experience', component: Experience, meta: { seoKey: 'experience' } },
  { path: '/blog', name: 'blog', component: Blog, meta: { seoKey: 'blog' } },
  { path: '/blog/:id', name: 'blog-post', component: BlogPost, meta: { seoKey: 'blogPost' } },
  { path: '/projects', redirect: '/experience' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;