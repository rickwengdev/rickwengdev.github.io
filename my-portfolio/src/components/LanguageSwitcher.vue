<template>
  <div class="lang-switch" role="group" :aria-label="t('nav.language')">
    <button
      type="button"
      class="lang-btn"
      :class="{ active: locale === 'zh' }"
      @click="setLocale('zh')"
    >
      中文
    </button>
    <button
      type="button"
      class="lang-btn"
      :class="{ active: locale === 'en' }"
      @click="setLocale('en')"
    >
      EN
    </button>
  </div>
</template>

<script setup>
import { useI18n } from '../i18n';

const { locale, t, setLocale } = useI18n();
</script>

<style scoped>
.lang-switch {
  display: inline-flex;
  padding: 3px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  gap: 2px;
}

.lang-btn {
  padding: 5px 10px;
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.lang-btn.active {
  color: var(--text);
  background: var(--bg);
  box-shadow: var(--shadow-sm);
}

.lang-btn:hover:not(.active) {
  color: var(--text-secondary);
}
</style>
