<template>
  <div class="blog-container">
    <div class="header-section">
      <n-page-header @back="$router.push('/')">
        <template #title>Technical Blog</template>
        <template #subtitle>Thoughts, tutorials, and dev logs.</template>
        <template #extra>
          <n-button size="small" secondary>
            <template #icon>
              <span style="margin-right: 4px;">📡</span>
            </template>
            RSS Feed
          </n-button>
        </template>
      </n-page-header>
    </div>

    <n-divider />

    <div class="content-section">
      <n-list hoverable clickable bordered>
        <n-list-item v-for="post in posts" :key="post.id" @click="handlePostClick(post.id)">
          
          <template #prefix>
            <div class="emoji-icon">{{ post.emoji }}</div>
          </template>

          <n-thing :title="post.title" :title-extra="post.date">
            
            <template #description>
              <n-space size="small" style="margin-top: 4px;">
                <n-tag v-for="tag in post.tags" :key="tag" :type="getTagType(tag)" size="small" round>
                  {{ tag }}
                </n-tag>
              </n-space>
            </template>
            
            <div class="post-excerpt">
              {{ post.excerpt }}
            </div>
          </n-thing>
        </n-list-item>
      </n-list>

      <div class="load-more">
        <n-button text type="primary">Load More Archives</n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { 
  NPageHeader, NButton, NList, NListItem, NThing, NTag, NSpace, NDivider 
} from 'naive-ui';

const router = useRouter();

// 模擬部落格文章數據
const posts = ref([
  {
    id: 1,
    title: 'Building a Portfolio with Vue 3 & Naive UI',
    date: '2026-01-18',
    emoji: '🎨',
    tags: ['Frontend', 'Vue 3'],
    excerpt: 'How I rebuilt my personal site using Vite, removing legacy code, and deploying to GitHub Pages with Actions.'
  },
  {
    id: 2,
    title: 'Deploying Node.js Apps to Google Cloud Run',
    date: '2026-01-10',
    emoji: '☁️',
    tags: ['DevOps', 'GCP'],
    excerpt: 'A step-by-step guide to containerizing a Node.js application and setting up CI/CD pipelines.'
  },
  {
    id: 3,
    title: 'Understanding Docker Multi-stage Builds',
    date: '2025-12-24',
    emoji: '🐳',
    tags: ['Docker', 'Backend'],
    excerpt: 'Optimizing your container images size and security by separating build and runtime environments.'
  },
  {
    id: 4,
    title: 'Refactoring Spaghetti Code: A Case Study',
    date: '2025-11-15',
    emoji: '🍝',
    tags: ['Refactoring', 'Architecture'],
    excerpt: 'Lessons learned from cleaning up a legacy project and implementing better design patterns.'
  }
]);

// 簡單的標籤顏色邏輯
const getTagType = (tag) => {
  const map = {
    'Frontend': 'success',
    'Backend': 'info',
    'DevOps': 'warning',
    'Vue 3': 'success',
    'Docker': 'info'
  };
  return map[tag] || 'default';
};

const handlePostClick = (id) => {
  // 這裡之後可以連接到實際的文章詳情頁面，例如：/blog/:id
  console.log(`Clicked post ${id}`);
  // router.push(`/blog/${id}`); 
};
</script>

<style scoped>
.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
}

.header-section {
  margin-bottom: 24px;
}

.emoji-icon {
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.post-excerpt {
  margin-top: 12px;
  color: #aaa;
  font-size: 0.95rem;
  line-height: 1.6;
}

.load-more {
  margin-top: 30px;
  text-align: center;
}
</style>