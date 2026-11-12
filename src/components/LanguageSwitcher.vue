<template>
  <!-- A real link to the other language's address, so crawlers can find it too. -->
  <a
    class="lang-switch"
    :href="href"
    :hreflang="other === 'zh' ? 'zh-Hant' : 'en'"
    :aria-label="`${t('nav.language')}: ${t('nav.switchTo')}`"
    @click="switchLanguage"
  >
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M2.5 10h15M10 2.5c2.2 2.2 3.2 4.7 3.2 7.5s-1 5.3-3.2 7.5M10 2.5C7.8 4.7 6.8 7.2 6.8 10s1 5.3 3.2 7.5" />
    </svg>
    <span :lang="other === 'zh' ? 'zh-Hant' : 'en'">{{ t('nav.switchTo') }}</span>
  </a>
</template>

<script setup>
import { computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { HOME_PATH, rememberLocale, useI18n } from '../i18n';
import { LETTER_SECTIONS } from '../sections/index.js';

const { locale, t, setLocale } = useI18n();
const route = useRoute();
const router = useRouter();

const other = computed(() => (locale.value === 'zh' ? 'en' : 'zh'));
const href = computed(() => HOME_PATH[other.value]);

const SECTION_IDS = [...LETTER_SECTIONS.map((s) => s.id), 'contact'];

// The section being read (the last one whose top has passed a third of the
// screen, as in the header) and where its top sits on screen.
function readingPosition() {
  const line = window.innerHeight * 0.35;
  let found = null;
  for (const id of SECTION_IDS) {
    const top = document.getElementById(id)?.getBoundingClientRect().top;
    if (top !== undefined && top <= line) found = { id, top };
  }
  return found;
}

// Same page, other language: /#research ↔ /zh/#research. The text changes
// length between languages, so keep the section being read where it was.
async function switchLanguage(event) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
  event.preventDefault();
  const next = other.value;
  const reading = readingPosition();
  rememberLocale(next);
  // The app updates the #section with history.replaceState, so read it from the address bar.
  if (route.meta.locale) await router.push({ path: HOME_PATH[next], hash: window.location.hash });
  else setLocale(next); // the 404 page has no address per language
  await nextTick();
  const el = reading && document.getElementById(reading.id);
  if (el) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - reading.top, behavior: 'instant' });
}
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
