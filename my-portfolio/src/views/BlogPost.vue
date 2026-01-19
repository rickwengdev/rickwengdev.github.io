<template>
  <div class="post-container">
    <n-result v-if="!post" status="404" title="Post Not Found" description="This article might have been moved or deleted.">
      <template #footer>
        <n-button @click="$router.push('/blog')">Back to Blog</n-button>
      </template>
    </n-result>

    <article v-else class="article-content">
      <n-page-header @back="$router.push('/blog')" class="post-header">
        <template #title>
          <span class="header-title">Blog</span>
        </template>
      </n-page-header>
      
      <div class="hero-section">
        <div class="emoji-large">{{ post.emoji }}</div>
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="post-date">📅 {{ post.date }}</span>
          <n-space size="small">
            <n-tag v-for="tag in post.tags" :key="tag" size="small" round :bordered="false" type="primary">
              {{ tag }}
            </n-tag>
          </n-space>
        </div>
      </div>

      <n-divider />

      <div class="markdown-body" v-html="post.content"></div>

      <div class="post-footer">
        <n-divider />
        <n-button text @click="$router.push('/blog')">← Back to List</n-button>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { NPageHeader, NButton, NDivider, NTag, NSpace, NResult } from 'naive-ui';
import { blogPosts } from '../data/posts'; // 引入剛剛建立的資料

const route = useRoute();

// 根據網址上的 ID (例如 /blog/1) 找到對應的文章
const post = computed(() => {
  const id = parseInt(route.params.id);
  return blogPosts.find(p => p.id === id);
});
</script>

<style scoped>
.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
}

.hero-section {
  text-align: center;
  margin: 40px 0;
}

.emoji-large {
  font-size: 4rem;
  margin-bottom: 20px;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  line-height: 1.2;
}

.post-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color: #888;
}

/* 模擬 Markdown 的樣式，讓內文好讀一點 */
.markdown-body {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ddd;
}

/* 針對動態 HTML 內容的深層樣式選擇器 */
.markdown-body :deep(h3) {
  margin-top: 30px;
  margin-bottom: 15px;
  color: #fff;
}

.markdown-body :deep(p) {
  margin-bottom: 20px;
}

.markdown-body :deep(code) {
  background-color: #333;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

.markdown-body :deep(pre) {
  background-color: #1e1e1e;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
}

.post-footer {
  margin-top: 50px;
  text-align: center;
}
</style>