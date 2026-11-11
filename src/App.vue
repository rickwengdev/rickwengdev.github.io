<template>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header" :class="{ open: menuOpen, hidden: sealed }">
    <div class="container header-inner">
      <a href="/#top" class="wordmark" aria-label="Rick Weng — top" @click="goTo($event, 'top')">
        <span class="wordmark-mark" aria-hidden="true">R</span>
        <span class="wordmark-name">Rick Weng</span>
      </a>

      <nav class="nav" aria-label="Sections">
        <a
          v-for="s in NAV"
          :key="s"
          :href="`/#${s}`"
          class="nav-link"
          :class="{ active: active === s }"
          @click="goTo($event, s)"
          >{{ t(`nav.${s}`) }}</a
        >
      </nav>

      <div class="header-actions">
        <LanguageSwitcher />
        <a href="/#contact" class="btn btn-dark header-cta" @click="goTo($event, 'contact')">{{ t('nav.contact') }}</a>
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :aria-label="t('nav.toggleMenu')"
          @click="menuOpen = !menuOpen"
        >
          <span class="menu-bar"></span>
          <span class="menu-bar"></span>
        </button>
      </div>
    </div>

    <span class="progress" aria-hidden="true" :style="{ transform: `scaleX(${progress})` }"></span>

    <nav id="mobile-nav" class="mobile-nav" :aria-label="t('nav.toggleMenu')" :hidden="!menuOpen">
      <div class="container mobile-nav-inner">
        <a v-for="s in NAV" :key="s" :href="`/#${s}`" class="mobile-link" @click="goTo($event, s)">{{
          t(`nav.${s}`)
        }}</a>
        <a href="/#contact" class="btn btn-dark mobile-cta" @click="goTo($event, 'contact')">{{ t('nav.contact') }}</a>
      </div>
    </nav>
  </header>

  <main id="main">
    <router-view />
  </main>

  <footer class="site-footer">
    <div class="container footer-inner">
      <a href="/#top" class="wordmark" @click="goTo($event, 'top')">
        <span class="wordmark-mark" aria-hidden="true">R</span>
        <span class="wordmark-name">Rick Weng</span>
      </a>
      <span class="footer-copy">&copy; {{ year }} {{ AUTHOR.legalName }}</span>
    </div>
  </footer>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LanguageSwitcher from './components/LanguageSwitcher.vue';
import { sealed } from './envelope.js';
import { LETTER_SECTIONS } from './sections/index.js';
import { AUTHOR } from './seo/schema.js';
import { useI18n } from './i18n';

// Header links follow the letter's section order (src/sections/index.js); contact is the last section.
// The footer is just the name and copyright: the header has the sections, the contact section the profiles.
const NAV = LETTER_SECTIONS.map((s) => s.id);
const SECTIONS = [...NAV, 'contact'];

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const menuOpen = ref(false);
const active = ref('');
const progress = ref(0);
const year = new Date().getFullYear();

// The current section is the last one whose top has passed a third of the screen.
const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  const line = window.innerHeight * 0.35;
  let current = '';
  for (const id of SECTIONS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) current = id;
  }
  active.value = current;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  router.isReady().then(() => nextTick(onScroll));
});

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));

// Section links: scroll smoothly on the home page; from elsewhere, go home first.
function goTo(event, id) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
  event.preventDefault();
  menuOpen.value = false;
  if (route.path !== '/') {
    router.push({ path: '/', hash: `#${id}` });
    return;
  }
  if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
  else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  history.replaceState(history.state, '', `#${id}`);
}

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  }
);
</script>

<style scoped>
.skip-link {
  position: absolute;
  left: 16px;
  top: -48px;
  z-index: 300;
  padding: 8px 14px;
  color: var(--bg);
  background: var(--slate);
  border-radius: var(--radius-sm);
}

.skip-link:focus {
  top: 12px;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 200;
  background: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: saturate(1.4) blur(14px);
  -webkit-backdrop-filter: saturate(1.4) blur(14px);
  border-bottom: 1px solid transparent;
  transition: opacity 0.8s var(--ease);
}

.progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: var(--accent);
  transform-origin: left;
  transform: scaleX(0);
  pointer-events: none;
  will-change: transform;
}

.site-header.hidden {
  opacity: 0;
  pointer-events: none;
}

.site-header.open {
  border-bottom-color: var(--line);
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 40px;
  height: 64px;
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.wordmark-mark {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  font-family: var(--serif);
  font-size: 1rem;
  line-height: 1;
  color: var(--bg);
  background: var(--slate);
  border-radius: 7px;
}

.wordmark-name {
  font-family: var(--serif);
  font-size: 1.25rem;
  letter-spacing: -0.01em;
}

.nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

/* Five links: a little tighter just above the menu breakpoint. */
@media (max-width: 1040px) {
  .header-inner {
    gap: 28px;
  }

  .nav {
    gap: 20px;
  }
}

.nav-link {
  position: relative;
  font-size: 0.9375rem;
  color: var(--ink-2);
  transition: color 0.2s;
}

/* Underline grows from the left on hover, and stays on the current section. */
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 1.5px;
  background: var(--accent);
  border-radius: 1px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.45s var(--ease);
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

.nav-link:hover,
.nav-link.active {
  color: var(--ink);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.header-cta {
  min-height: 40px;
  padding: 8px 16px;
  font-size: 0.9375rem;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 44px;
  height: 44px;
  padding: 0 11px;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.menu-bar {
  display: block;
  height: 1.5px;
  background: var(--ink);
  transition: transform 0.25s;
}

.open .menu-bar:nth-child(1) {
  transform: translateY(3.75px) rotate(45deg);
}

.open .menu-bar:nth-child(2) {
  transform: translateY(-3.75px) rotate(-45deg);
}

.mobile-nav-inner {
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 24px;
}

.mobile-link {
  padding: 14px 0;
  font-family: var(--serif);
  font-size: 1.375rem;
  border-bottom: 1px solid var(--line);
}

.mobile-cta {
  margin-top: 20px;
}

/* ---------- Footer ---------- */

.site-footer {
  padding: 32px 0;
  border-top: 1px solid var(--line);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 32px;
}

.footer-copy {
  font-size: 0.8125rem;
  color: var(--ink-3);
}

@media (max-width: 860px) {
  .nav,
  .header-cta {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}

@media (min-width: 861px) {
  .mobile-nav {
    display: none;
  }
}
</style>
