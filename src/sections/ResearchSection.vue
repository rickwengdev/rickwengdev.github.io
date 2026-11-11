<template>
  <section id="research" class="part">
    <header class="part-head">
      <p class="part-label" v-reveal><span class="part-num">02</span>{{ t('research.eyebrow') }}</p>
      <h2 class="part-title" v-reveal="80">{{ t('research.title') }}</h2>
    </header>

    <!-- Research goals, on one line. -->
    <dl class="focus" v-reveal>
      <div class="focus-row">
        <dt class="focus-label">{{ t('research.goalsTitle') }}</dt>
        <dd class="goals">
          <span v-for="goal in goals" :key="goal" class="goal">{{ goal }}</span>
        </dd>
      </div>
    </dl>

    <h3 class="sub-title" v-reveal>{{ t('research.papersTitle') }}</h3>
    <div class="paper-list">
      <PaperItem v-for="(paper, i) in papers" :key="paper.id" :paper="paper" :index="i + 1" v-reveal="100 + i * 120" />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import PaperItem from '../components/PaperItem.vue';
import { getPapers } from '../data/papers.js';
import { useI18n } from '../i18n';

const { locale, t, tm } = useI18n();

const papers = computed(() => getPapers(locale.value));
const goals = computed(() => tm('research.goals') ?? []);
</script>

<style scoped>
.focus {
  margin: 0 0 clamp(32px, 5vw, 44px);
  border-top: 1px solid var(--line-strong);
  border-bottom: 1px solid var(--line);
}

.focus-row {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  align-items: baseline;
  gap: 6px 16px;
  padding: 14px 0;
}

.focus-label {
  font-size: 0.8125rem;
  color: var(--ink-3);
}

.goals {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 0;
  margin: 0;
}

.goal {
  font-family: var(--serif);
  font-size: clamp(1.15rem, 2.2vw, 1.35rem);
  line-height: 1.3;
  color: var(--ink);
}

.goal + .goal::before {
  content: '·';
  margin: 0 0.55em;
  color: var(--accent);
}

@media (max-width: 520px) {
  .focus-row {
    grid-template-columns: 1fr;
  }
}

.sub-title {
  margin: 0 0 4px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink-2);
}

.paper-list {
  border-bottom: 1px solid var(--line-strong);
}
</style>
