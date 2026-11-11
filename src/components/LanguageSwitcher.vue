<template>
  <button
    type="button"
    class="lang-switch"
    :aria-label="`${t('nav.language')}: ${t('nav.switchTo')}`"
    @click="setLocale(locale === 'zh' ? 'en' : 'zh')"
  >
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M2.5 10h15M10 2.5c2.2 2.2 3.2 4.7 3.2 7.5s-1 5.3-3.2 7.5M10 2.5C7.8 4.7 6.8 7.2 6.8 10s1 5.3 3.2 7.5" />
    </svg>
    <span>{{ t('nav.switchTo') }}</span>
  </button>
</template>

<script setup>
import { useI18n } from '../i18n';

const { locale, t, setLocale } = useI18n();
</script>

<style scoped>
.lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 10px;
  font: inherit;
  font-size: 0.875rem;
  white-space: nowrap;
  flex-shrink: 0;
  color: var(--ink-2);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    color 0.2s,
    background 0.2s;
}

.lang-switch:hover {
  color: var(--ink);
  background: var(--bg-raised);
}

svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.3;
}
</style>
