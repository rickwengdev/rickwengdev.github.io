<template>
  <div class="page-container">
    <div class="header-section">
      <h2 class="page-title">Featured Projects</h2>
      <p class="page-subtitle">A selection of my technical experiments and production apps.</p>
    </div>
    
    <n-divider />

    <n-grid :x-gap="24" :y-gap="24" cols="1 s:1 m:2 l:3" responsive="screen">
      <n-grid-item v-for="project in projects" :key="project.id">
        <n-card hoverable class="project-card">
          <template #header>
            <div class="card-header">
              <span>{{ project.title }}</span>
              <n-tag :type="project.statusType" size="small" round>{{ project.status }}</n-tag>
            </div>
          </template>
          
          <div class="card-body">
            <p class="project-desc">{{ project.description }}</p>
            <n-space size="small" style="margin-top: 16px;">
              <n-tag v-for="tech in project.stack" :key="tech" size="tiny" bordered :bordered="false" type="info">
                {{ tech }}
              </n-tag>
            </n-space>
          </div>

          <template #action>
            <n-space justify="end">
              <n-button size="small" secondary @click="openLink(project.github)" v-if="project.github">
                GitHub
              </n-button>
              <n-button size="small" type="primary" @click="openLink(project.demo)" v-if="project.demo">
                Live Demo
              </n-button>
            </n-space>
          </template>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NGrid, NGridItem, NCard, NTag, NSpace, NDivider, NButton } from 'naive-ui';

const projects = ref([
  {
    id: 1,
    title: 'Personal Portfolio',
    description: 'A responsive portfolio website built with Vue 3 and Vite, deployed on GitHub Pages via Actions.',
    status: 'Live',
    statusType: 'success',
    stack: ['Vue 3', 'Vite', 'Naive UI', 'CI/CD'],
    github: 'https://github.com/rickwengdev/portfolio', // 記得換成你真正的連結
    demo: 'https://rickwengdev.github.io/portfolio'
  },
  {
    id: 2,
    title: 'AI Agent & Dashboard', // 這裡保留你的 Saori 專案，但改個專業的名字
    description: 'A full-stack RAG system integrating Discord Bot with a web management dashboard.',
    status: 'In Development',
    statusType: 'warning',
    stack: ['Node.js', 'OpenAI', 'Discord.js', 'Vector DB'],
    github: 'https://github.com/rickwengdev/Saori-AllinOneAPP'
  },
  {
    id: 3,
    title: 'Crypto Tracker',
    description: 'Real-time cryptocurrency tracking application hosted on Google Cloud Run.',
    status: 'Completed',
    statusType: 'info',
    stack: ['Vue3', 'Node.js', 'GCP', 'Docker'],
    github: 'https://github.com/rickwengdev/CryptoTracker',
    demo: 'https://crypto-tracker-873140096556.asia-east1.run.app'
  }
]);

const openLink = (url) => {
  if (url) window.open(url, '_blank');
};
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}
.page-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}
.page-subtitle {
  color: #888;
}
.project-desc {
  min-height: 60px; /* 讓卡片高度整齊一點 */
}
</style>