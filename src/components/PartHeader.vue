<template>
  <header class="part-head">
    <p class="part-label" v-reveal>
      <span class="part-num">{{ num }}</span
      >{{ t(`${ns}.eyebrow`) }}
    </p>
    <h2 class="part-title" v-reveal="80">{{ t(`${ns}.title`) }}</h2>
    <p v-if="lede" class="part-lede" v-reveal="160">{{ lede }}</p>
  </header>
</template>

<script setup>
// The heading every letter section starts with: number, eyebrow, title and an optional subtitle.
// Text comes from the locale under `<ns>.eyebrow`, `<ns>.title` and `<ns>.subtitle`.
import { computed } from 'vue';
import { useI18n } from '../i18n';

const props = defineProps({
  num: { type: String, required: true },
  ns: { type: String, required: true },
});

const { t, tm } = useI18n();
const lede = computed(() => tm(`${props.ns}.subtitle`));
</script>
