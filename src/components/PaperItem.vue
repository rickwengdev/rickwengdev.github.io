<template>
  <article class="paper" :class="{ sealed: paper.placeholder }">
    <div class="paper-meta">
      <span class="paper-year">{{ paper.year }}</span>
      <span v-if="!paper.placeholder" class="status" :class="{ 'status-muted': paper.status === 'published' }">
        {{ t(`papersPage.status.${paper.status}`) }}
      </span>
    </div>

    <div class="paper-main">
      <h3 class="paper-title">
        <SealMark v-if="paper.placeholder" :size="22" letter="" class="paper-seal" />
        {{ paper.title }}
      </h3>
      <p v-if="!paper.placeholder && (paper.authors || paper.venue)" class="paper-byline">
        <span v-if="paper.authors">{{ paper.authors }}</span>
        <span v-if="paper.authors && paper.venue" aria-hidden="true"> · </span>
        <em v-if="paper.venue">{{ paper.venue }}</em>
      </p>

      <p v-if="!paper.placeholder && paper.abstract" class="paper-abstract">{{ paper.abstract }}</p>

      <div v-if="paper.links.length" class="paper-links">
        <a
          v-for="link in paper.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="quiet-link"
        >
          {{ link.label }} <span class="arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import SealMark from './SealMark.vue';
import { useI18n } from '../i18n';

defineProps({
  paper: { type: Object, required: true },
});

const { t } = useI18n();
</script>

<style scoped>
.paper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  padding: 28px 0;
  border-top: 1px solid var(--line-strong);
}

@media (min-width: 760px) {
  .paper {
    grid-template-columns: 160px 1fr;
    gap: 28px;
  }
}

/* A paper still under review is a single line: year and topic. */
.paper.sealed {
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 16px;
}

@media (min-width: 760px) {
  .paper.sealed {
    grid-template-columns: 160px 1fr;
    gap: 28px;
  }
}

.paper-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
  align-self: start;
}

@media (min-width: 760px) {
  .paper-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}

.paper-year {
  font-family: var(--serif);
  font-size: 0.9375rem;
  color: var(--ink-3);
}

.paper-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(1.3rem, 2.2vw, 1.6rem);
  font-weight: 400;
  line-height: 1.25;
  letter-spacing: -0.01em;
  text-wrap: balance;
}

.paper-seal {
  flex-shrink: 0;
}

.paper-byline {
  margin: 8px 0 0;
  font-size: 0.9375rem;
  color: var(--ink-2);
}

.paper-abstract {
  max-width: 44rem;
  margin: 12px 0 0;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--ink-2);
}

.paper-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-top: 18px;
}
</style>
