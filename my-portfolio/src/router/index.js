import { createRouter, createWebHashHistory } from 'vue-router';
// 注意：GitHub Pages 建議使用 createWebHashHistory，可以避免 404 問題

import Home from '../views/Home.vue';
import Projects from '../views/Projects.vue';
import Blog from '../views/Blog.vue'; // 假設你也沿用了 Blog.vue 並做了類似的清理

const routes = [
  { path: '/', component: Home },
  { path: '/projects', component: Projects },
  { path: '/blog', component: Blog },
];

const router = createRouter({
  history: createWebHashHistory(), // 使用 Hash 模式 (#/projects)
  routes,
});

export default router;