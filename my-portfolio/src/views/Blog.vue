<template>
  <div class="blog-container page-container">
    <div class="header-section">
      <p class="section-eyebrow">{{ t('blog.eyebrow') }}</p>
      <h1 class="page-title">{{ t('blog.title') }}</h1>
      <p class="page-subtitle">{{ t('blog.subtitle') }}</p>
      <n-button
        class="rss-btn"
        size="small"
        secondary
        tag="a"
        href="/rss.xml"
        target="_blank"
      >
        {{ t('blog.rss') }}
      </n-button>
    </div>

    <div class="researching-panel">
      <p class="researching-label">{{ t('home.researching.eyebrow') }}</p>
      <ul class="researching-topics">
        <li v-for="topic in researchingTopics" :key="topic">
          <span aria-hidden="true">✓</span> {{ topic }}
        </li>
      </ul>
    </div>

    <div class="category-tabs">
      <n-tabs type="segment" animated v-model:value="selectedCategory">
        <n-tab-pane
          v-for="cat in categoryKeys"
          :key="cat"
          :name="cat"
          :tab="t(`blog.categories.${cat}`)"
        />
      </n-tabs>
    </div>

    <n-divider style="margin: 24px 0 32px;" />

    <div class="content-section">
      <n-list hoverable clickable bordered class="post-list">
        <n-list-item v-for="post in filteredPosts" :key="post.id" @click="goToPost(post.id)" class="post-item">
          <template #prefix>
            <div class="emoji-icon">{{ post.emoji }}</div>
          </template>

          <n-thing>
            <template #header>
              <div class="post-header-row">
                <span v-if="post.modelLabNumber" class="model-lab-badge">
                  Model Lab #{{ String(post.modelLabNumber).padStart(3, '0') }}
                </span>
                <span class="post-title-link">{{ post.modelName ?? post.title }}</span>
              </div>
            </template>

            <template #header-extra>
              <div class="post-meta-extra">
                <span v-if="post.modelStatus" class="status-badge" :class="post.modelStatus">
                  {{ t(`blog.status.${post.modelStatus}`) }}
                </span>
                <span class="date-text">{{ post.date }}</span>
              </div>
            </template>

            <template #description>
              <n-space size="small" style="margin-top: 4px; align-items: center;">
                <n-tag
                  v-for="tag in post.tags"
                  :key="tag"
                  type="default"
                  size="small"
                  round
                  :bordered="false"
                  class="post-tag"
                >
                  #{{ tag }}
                </n-tag>
              </n-space>
            </template>

            <div class="post-excerpt">
              {{ post.excerpt }}
            </div>
          </n-thing>
        </n-list-item>
      </n-list>

      <div v-if="filteredPosts.length === 0" class="empty-state">
        <p>{{ t('blog.empty') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  NButton, NList, NListItem, NThing, NTag, NSpace, NDivider, NTabs, NTabPane,
} from 'naive-ui';
import { getBlogPosts } from '../data/posts/index.js';
import { useI18n } from '../i18n';

const router = useRouter();
const { locale, t, tm } = useI18n();
const selectedCategory = ref('all');
const categoryKeys = ['all', 'finance', 'systems', 'technology', 'organizations'];

const blogPosts = computed(() => getBlogPosts(locale.value));
const researchingTopics = computed(() => tm('home.researching.topics') ?? []);

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'all') return blogPosts.value;
  return blogPosts.value.filter((post) => post.category === selectedCategory.value);
});

const goToPost = (id) => {
  router.push(`/blog/${id}`);
};
</script>

<style scoped>
.blog-container {
  max-width: 800px;
}

.header-section {
  position: relative;
  margin-bottom: 8px;
}

.rss-btn {
  margin-top: 16px;
}

.researching-panel {
  margin-top: 32px;
  padding: 24px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.researching-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 16px;
}

.researching-topics {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px 20px;
}

.researching-topics li {
  font-size: 0.9375rem;
  color: var(--text);
}

.researching-topics span {
  color: var(--accent);
  margin-right: 6px;
}

.category-tabs {
  margin-top: 24px;
  overflow-x: auto;
}

.post-list {
  border: 1px solid var(--border) !important;
  border-radius: 12px !important;
  background: var(--bg-elevated) !important;
  overflow: hidden;
}

.post-item {
  transition: background 0.2s;
}

.post-item:hover {
  background: var(--accent-subtle) !important;
}

.emoji-icon {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 500;
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.post-header-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.model-lab-badge {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--accent);
}

.post-title-link {
  font-weight: 600;
  color: var(--text);
}

.post-meta-extra {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.status-badge {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 999px;
}

.status-badge.experimental {
  color: #b45309;
  background: rgba(180, 83, 9, 0.08);
}

.status-badge.stable {
  color: #047857;
  background: rgba(4, 120, 87, 0.08);
}

.status-badge.deprecated {
  color: var(--text-muted);
  background: var(--bg-surface);
}

.date-text {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.post-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem !important;
  background: var(--bg-surface) !important;
}

.post-excerpt {
  margin-top: 12px;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.65;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: var(--text-muted);
  font-style: italic;
}

@media (max-width: 640px) {
  .category-tabs {
    margin-left: calc(-1 * var(--page-px));
    margin-right: calc(-1 * var(--page-px));
    padding: 0 var(--page-px);
  }

  .category-tabs :deep(.n-tabs-nav) {
    min-width: max-content;
  }

  .post-item :deep(.n-list-item__prefix) {
    margin-right: 12px !important;
  }

  .post-item :deep(.n-thing-header) {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 6px;
  }

  .post-item :deep(.n-thing-header__extra) {
    margin-left: 0 !important;
    align-items: flex-start !important;
  }

  .post-meta-extra {
    flex-direction: row;
    align-items: center;
  }

  .emoji-icon {
    width: 40px;
    height: 40px;
    font-size: 0.875rem;
  }

  .post-title-link {
    font-size: 0.9375rem;
    line-height: 1.4;
  }

  .post-excerpt {
    font-size: 0.875rem;
  }
}
</style>
