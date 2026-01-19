<template>
  <div class="blog-container">
    <div class="header-section">
      <n-page-header @back="$router.push('/')">
        <template #title>Technical Blog</template>
        <template #subtitle>Thoughts, tutorials, and dev logs.</template>
        <template #extra>
          <n-button 
            size="small" 
            secondary 
            tag="a" 
            href="/rss.xml" 
            target="_blank"
          >
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
        <n-list-item v-for="post in posts" :key="post.id" @click="goToPost(post.id)">
          
          <template #prefix>
            <div class="emoji-icon">{{ post.emoji }}</div>
          </template>

          <n-thing :title="post.title" :title-extra="post.date">
            <template #description>
              <n-space size="small" style="margin-top: 4px;">
                <n-tag v-for="tag in post.tags" :key="tag" :type="getTagType(tag)" size="small" round :bordered="false">
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
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { 
  NPageHeader, NButton, NList, NListItem, NThing, NTag, NSpace, NDivider 
} from 'naive-ui';
// 引入資料庫
import { blogPosts } from '../data/posts';

const router = useRouter();
const posts = blogPosts;

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

const goToPost = (id) => {
  router.push(`/blog/${id}`);
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
</style>