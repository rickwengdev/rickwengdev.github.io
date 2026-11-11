<template>
  <section id="projects" class="part">
    <header class="part-head">
      <p class="part-label" v-reveal><span class="part-num">02</span>{{ t('projects.eyebrow') }}</p>
      <h2 class="part-title" v-reveal="80">{{ t('projects.title') }}</h2>
    </header>

    <WorkEntry v-for="item in items" :key="item.id" :item="item" ns="projects" />
  </section>
</template>

<script setup>
// What I am building now.
import { computed } from 'vue';
import WorkEntry from '../components/WorkEntry.vue';
import { getWork } from '../data/work.js';
import { useI18n } from '../i18n';

const { locale, t } = useI18n();
const items = computed(() => getWork(locale.value, 'projects'));
</script>

