<template>
  <router-link :to="`/blog/${post.id}`" class="model-card">
    <div class="model-card-top">
      <span v-if="post.modelLabNumber" class="model-number">
        Model Lab #{{ String(post.modelLabNumber).padStart(3, '0') }}
      </span>
      <span v-if="post.modelStatus" class="model-status" :class="post.modelStatus">
        {{ t(`blog.status.${post.modelStatus}`) }}
      </span>
    </div>
    <h3 class="model-name">{{ post.modelName ?? post.title }}</h3>
    <p class="model-excerpt">{{ post.excerpt }}</p>
  </router-link>
</template>

<script setup>
import { useI18n } from '../i18n';

defineProps({
  post: { type: Object, required: true },
});

const { t } = useI18n();
</script>

<style scoped>
.model-card {
  display: block;
  padding: 28px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.model-card:hover {
  border-color: rgba(124, 92, 252, 0.35);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.model-card-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.model-number {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--accent);
}

.model-status {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 999px;
  background: var(--bg-surface);
  color: var(--text-muted);
}

.model-status.experimental {
  color: #b45309;
  background: rgba(180, 83, 9, 0.08);
}

.model-status.stable {
  color: #047857;
  background: rgba(4, 120, 87, 0.08);
}

.model-status.deprecated {
  color: var(--text-muted);
  background: var(--bg-surface);
}

.model-name {
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0 0 10px;
  color: var(--text);
}

.model-excerpt {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-secondary);
  margin: 0;
}
</style>
