<template>
  <section class="part">
    <PartHeader :num="num" :ns="kind" />
    <WorkEntry v-for="item in items" :key="item.id" :item="item" :ns="kind" />
  </section>
</template>

<script setup>
// Experience and Projects: the same layout, fed from src/content/experience.js or projects.js.
import { computed } from 'vue';
import PartHeader from '../components/PartHeader.vue';
import WorkEntry from '../components/WorkEntry.vue';
import { getExperience, getProjects } from '../content/index.js';
import { useI18n } from '../i18n';

const props = defineProps({
  num: { type: String, required: true },
  kind: { type: String, required: true, validator: (v) => v === 'experience' || v === 'projects' },
});

const { locale } = useI18n();
const items = computed(() => (props.kind === 'projects' ? getProjects : getExperience)(locale.value));
</script>
