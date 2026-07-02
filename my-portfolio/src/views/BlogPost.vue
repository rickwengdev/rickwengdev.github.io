<template>
  <div class="post-container page-container">
    <n-result v-if="!post" status="404" :title="t('blog.notFoundTitle')" :description="t('blog.notFoundDesc')">
      <template #footer>
        <n-button @click="$router.push('/blog')">{{ t('blog.backToBlog') }}</n-button>
      </template>
    </n-result>

    <article v-else class="article-content" itemscope itemtype="https://schema.org/BlogPosting">
      <n-page-header @back="$router.push('/blog')" class="post-header">
        <template #title>
          <span class="header-title">{{ t('nav.blog') }}</span>
        </template>
      </n-page-header>
      
      <div class="post-hero">
        <div class="emoji-large">{{ post.emoji }}</div>
        <p v-if="post.modelLabNumber" class="model-lab-label">
          Model Lab #{{ String(post.modelLabNumber).padStart(3, '0') }}
        </p>
        <h1 class="post-title" itemprop="headline">{{ post.title }}</h1>
        <div class="post-meta">
          <time class="post-date" itemprop="datePublished" :datetime="post.date">{{ post.date }}</time>
          <span v-if="post.modelStatus" class="status-badge" :class="post.modelStatus">
            {{ t(`blog.status.${post.modelStatus}`) }}
          </span>
          <n-space size="small">
            <n-tag v-for="tag in post.tags" :key="tag" size="small" round :bordered="false" type="primary" class="post-tag">
              {{ tag }}
            </n-tag>
          </n-space>
        </div>
      </div>

      <n-divider style="margin: 32px 0;" />

      <div class="markdown-body" itemprop="articleBody" v-html="post.content"></div>

      <div class="post-footer">
        <n-divider />
        <n-button text @click="$router.push('/blog')">{{ t('blog.back') }}</n-button>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { NPageHeader, NButton, NDivider, NTag, NSpace, NResult } from 'naive-ui';
import { getBlogPosts } from '../data/posts/index.js';
import { useI18n } from '../i18n';

const route = useRoute();
const { locale, t } = useI18n();

const post = computed(() => {
  const id = parseInt(route.params.id);
  return getBlogPosts(locale.value).find((p) => p.id === id);
});
</script>

<style scoped>
.post-container {
  max-width: 720px;
}

.post-hero {
  text-align: center;
  margin: 32px 0 0;
}

.emoji-large {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--accent);
  margin-bottom: 12px;
}

.model-lab-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--accent);
  margin: 0 0 12px;
}

.status-badge {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 4px 10px;
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

.post-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  line-height: 1.2;
  color: var(--text);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.post-date {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.post-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem !important;
}

.markdown-body {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.markdown-body :deep(h3) {
  margin-top: 36px;
  margin-bottom: 14px;
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 500;
  color: var(--text);
}

.markdown-body :deep(h4) {
  margin-top: 28px;
  margin-bottom: 10px;
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--text);
}

.markdown-body :deep(h4:first-child) {
  margin-top: 0;
}

.markdown-body :deep(.doc-meta) {
  padding: 24px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 10px;
  margin-bottom: 28px;
}

.markdown-body :deep(.doc-meta p) {
  margin: 0 0 8px;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.markdown-body :deep(.doc-meta p:last-child) {
  margin-bottom: 0;
}

.markdown-body :deep(.doc-quote) {
  margin: 0 0 8px;
}

.markdown-body :deep(.doc-quote-note) {
  font-size: 0.875rem !important;
  color: var(--text-muted) !important;
  margin-top: 12px !important;
}

.markdown-body :deep(ol) {
  padding-left: 1.25rem;
  margin: 0 0 20px;
}

.markdown-body :deep(em) {
  font-style: italic;
  color: var(--text);
}

.markdown-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 32px 0;
}

.markdown-body :deep(ul) {
  padding-left: 1.25rem;
  margin: 0 0 20px;
}

.markdown-body :deep(li) {
  margin-bottom: 8px;
  line-height: 1.65;
}

.markdown-body :deep(blockquote) {
  margin: 24px 0;
  padding: 20px 24px;
  border-left: 3px solid var(--accent);
  background: var(--bg-elevated);
  border-radius: 0 8px 8px 0;
}

.markdown-body :deep(blockquote p) {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.markdown-body :deep(.doc-table) {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  border-collapse: collapse;
  margin: 20px 0 28px;
  font-size: 0.9375rem;
}

.markdown-body :deep(.doc-table th),
.markdown-body :deep(.doc-table td) {
  padding: 12px 16px;
  border: 1px solid var(--border);
  text-align: left;
  vertical-align: top;
}

.markdown-body :deep(.doc-table th) {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: var(--bg-elevated);
}

.markdown-body :deep(.doc-table td) {
  color: var(--text-secondary);
}

.markdown-body :deep(.doc-table td:first-child) {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--accent);
}

.markdown-body :deep(p) {
  margin-bottom: 20px;
}

.markdown-body :deep(code) {
  background-color: var(--bg-surface);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.9em;
  color: var(--accent);
}

.markdown-body :deep(pre) {
  background-color: var(--bg-elevated);
  border: 1px solid var(--border);
  padding: 20px;
  border-radius: 10px;
  overflow-x: auto;
  margin: 24px 0;
}

.markdown-body :deep(pre code) {
  background: none;
  padding: 0;
  color: var(--text-secondary);
}

.post-footer {
  margin-top: 48px;
  text-align: center;
}

@media (max-width: 640px) {
  .post-hero {
    margin-top: 16px;
  }

  .post-title {
    font-size: clamp(1.5rem, 6vw, 1.875rem);
  }

  .post-meta {
    flex-direction: column;
    gap: 10px;
  }

  .markdown-body {
    font-size: 1rem;
  }

  .markdown-body :deep(h3) {
    font-size: 1.2rem;
    margin-top: 28px;
  }

  .markdown-body :deep(.doc-meta) {
    padding: 16px;
  }

  .markdown-body :deep(.doc-meta p) {
    font-size: 0.875rem;
    word-break: break-word;
  }

  .markdown-body :deep(.doc-table) {
    font-size: 0.8125rem;
  }

  .markdown-body :deep(.doc-table th),
  .markdown-body :deep(.doc-table td) {
    padding: 10px 12px;
    min-width: 88px;
  }

  .markdown-body :deep(.doc-table td:first-child) {
    white-space: normal;
  }

  .markdown-body :deep(blockquote) {
    padding: 16px;
  }
}
</style>
