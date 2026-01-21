<template>
  <div class="page-container">
    <div class="header-section">
      <h2 class="page-title">Featured Projects</h2>
      <p class="page-subtitle">A selection of my technical experiments and production apps.</p>
    </div>
    
    <n-divider />

    <n-grid :x-gap="24" :y-gap="24" cols="1 s:1 m:2 l:3" responsive="screen">
      <n-grid-item v-for="project in projects" :key="project.id">
        <n-card class="project-card" content-style="padding: 0;">
          
          <div class="card-top-content">
            <div class="card-header-row">
              <div class="title-group">
                <span class="project-icon">{{ project.icon }}</span>
                <span class="project-title">{{ project.title }}</span>
              </div>
              <n-tag :type="project.statusType" size="small" round :bordered="false">
                {{ project.status }}
              </n-tag>
            </div>

            <div class="timeline-row">
              <span class="time-text">{{ project.timeline }}</span>
            </div>
            
            <p class="project-desc">{{ project.description }}</p>
          </div>

          <div class="card-bottom-content">
            <n-divider style="margin: 12px 0;" />
            
            <div class="tech-stack">
              <n-tag 
                v-for="tech in project.stack" 
                :key="tech" 
                size="small" 
                class="tech-tag"
                :bordered="false" 
                type="default"
              >
                {{ tech }}
              </n-tag>
            </div>

            <div class="action-buttons">
              <n-button secondary size="small" @click="openLink(project.github)" v-if="project.github">
                <template #icon><span class="btn-icon">📦</span></template>
                GitHub
              </n-button>
              <n-button type="primary" size="small" @click="openLink(project.demo)" v-if="project.demo">
                <template #icon><span class="btn-icon">🚀</span></template>
                Demo
              </n-button>
            </div>
          </div>

        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NGrid, NGridItem, NCard, NTag, NDivider, NButton } from 'naive-ui';

const projects = ref([
  {
    id: 1,
    title: 'Personal Portfolio',
    icon: '👨‍💻',
    timeline: 'Jan 2026 - Present',
    description: 'A responsive portfolio website built with Vue 3 and Vite, deployed on GitHub Pages via Actions.',
    status: 'Live',
    statusType: 'success',
    stack: ['Vue 3', 'Vite', 'Naive UI'],
    github: 'https://github.com/rickwengdev/rickwengdev.github.io/tree/main/my-portfolio',
    demo: 'https://rickwengdev.github.io'
  },
  {
    id: 2,
    title: 'Saori',
    icon: '🤖',
    timeline: 'Dec 2022 - Jan 2026',
    description: 'A full-stack Discord Bot with a web management dashboard.',
    status: 'Live',
    statusType: 'success',
    stack: ['Vue 3', 'Node.js', 'Discord.js', 'MariaDB'],
    github: 'https://github.com/rickwengdev/Saori',
    demo: 'https://saori-483222.web.app'
  },
  {
    id: 3,
    title: 'Lilith AI Agent',
    icon: '🧠',
    timeline: 'Nov 2025 - Present',
    description: 'Self-training AI assistant with web interface featuring advanced context management.',
    status: 'Dev',
    statusType: 'warning',
    stack: ['Vue 3', 'Node.js', 'Gemini API', 'AI Agent', 'RAG'],
    github: 'https://github.com/rickwengdev/Lilith',
    demo: 'https://lilith-390477456083.asia-east1.run.app'
  },
  {
    id: 4,
    title: 'Crypto Tracker',
    icon: '📈',
    timeline: 'Jan 2026 - Present',
    description: 'Real-time cryptocurrency portfolio tracking application hosted on Google Cloud Run.',
    status: 'Live',
    statusType: 'success',
    stack: ['Vue 3', 'Node.js', 'GCP', 'Actions'],
    github: 'https://github.com/rickwengdev/CryptoTracker',
    demo: 'https://crypto-tracker-873140096556.asia-east1.run.app'
  },
  {
    id: 5,
    title: 'AutoScreenshot',
    icon: '📸',
    timeline: 'Sep 2024 - Sep 2024',
    description: 'A desktop automation tool that captures periodic screenshots and compiles them into PDFs.',
    status: 'Completed',
    statusType: 'default',
    stack: ['Python', 'Automation'],
    github: 'https://github.com/rickwengdev/autoscreenshot'
  },
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

.header-section { margin-bottom: 20px; }
.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(120deg, #fff, #aaa);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.page-subtitle { color: #888; font-size: 1.1rem; }

/* 卡片樣式 */
.project-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background-color: #18181c;
  border-radius: 12px;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  border-color: rgba(99, 226, 183, 0.4);
}

.card-top-content {
  padding: 20px 20px 0 20px;
  flex: 1;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px; /* 稍微縮小間距給 timeline 用 */
}

/* 新增：時間軸樣式 */
.timeline-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 0.85rem;
  color: #666; /* 低調的灰色 */
  font-family: 'Courier New', Courier, monospace; /* 等寬字體，更有技術感 */
}

.title-group { display: flex; align-items: center; gap: 10px; }
.project-icon { font-size: 1.5rem; }
.project-title { font-size: 1.25rem; font-weight: 600; color: #fff; }

.project-desc {
  color: #aaa;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 16px;
}

.card-bottom-content { padding: 0 20px 20px 20px; }
.tech-stack { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
.tech-tag { background-color: rgba(255, 255, 255, 0.06); color: #ccc; }
.action-buttons { display: flex; justify-content: flex-end; gap: 12px; }
.btn-icon { margin-right: 4px; }
</style>