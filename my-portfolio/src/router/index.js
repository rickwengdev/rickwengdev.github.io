import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Projects from '../views/Projects.vue';
import Blog from '../views/Blog.vue';
import BlogPost from '../views/BlogPost.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: Projects },
  { path: '/blog', component: Blog },
  { path: '/blog/:id', component: BlogPost }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;