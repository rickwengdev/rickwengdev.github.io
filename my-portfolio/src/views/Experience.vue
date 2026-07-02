<template>
  <div class="page-container">
    <div class="header-section">
      <p class="section-eyebrow">{{ t('experiencePage.eyebrow') }}</p>
      <h1 class="page-title">{{ t('experiencePage.title') }}</h1>
      <p class="page-subtitle">{{ t('experiencePage.subtitle') }}</p>
    </div>

    <n-divider style="margin: 32px 0;" />

    <div class="experience-list">
      <ExperienceCard v-for="job in experiences" :key="job.id" :job="job" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { NDivider } from 'naive-ui';
import ExperienceCard from '../components/ExperienceCard.vue';
import { getExperiences } from '../data/experience.js';
import { useI18n } from '../i18n';

const { locale, t } = useI18n();
const experiences = computed(() => getExperiences(locale.value));
</script>

<style scoped>
.experience-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
