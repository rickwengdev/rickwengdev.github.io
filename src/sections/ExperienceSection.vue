<template>
  <section id="experience" class="part">
    <header class="part-head">
      <p class="part-label" v-reveal><span class="part-num">01</span>{{ t('experience.eyebrow') }}</p>
      <h2 class="part-title" v-reveal="80">{{ t('experience.title') }}</h2>
    </header>

    <WorkEntry v-for="item in items" :key="item.id" :item="item" ns="experience" />
  </section>
</template>

<script setup>
// Past experience.
import { computed } from 'vue';
import WorkEntry from '../components/WorkEntry.vue';
import { getWork } from '../data/work.js';
import { useI18n } from '../i18n';

const { locale, t } = useI18n();
const items = computed(() => getWork(locale.value, 'experience'));
</script>

