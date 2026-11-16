// Whether the opening envelope is still covering the page.
// It plays every time someone arrives on a home page (/ or /zh/), and is
// skipped when they arrive on a section link (#research, #top…), prefer reduced
// motion, or are software rather than a person (see isAutomated).
// Moving around inside the site never brings it back.
import { ref } from 'vue';

// Crawlers, AI agents and test tools driving a browser read the letter straight
// away instead of having to break the seal. navigator.webdriver is set by
// Playwright, Puppeteer and Selenium; the user agent catches the rest.
const BOT_AGENT =
  /bot\b|crawl|spider|slurp|headless|lighthouse|GPTBot|ChatGPT|OAI-SearchBot|Claude|anthropic|Perplexity|Google-Extended|Bytespider|CCBot|meta-external/i;

export function isAutomated() {
  if (typeof navigator === 'undefined') return false;
  return navigator.webdriver === true || BOT_AGENT.test(navigator.userAgent ?? '');
}

function shouldSeal() {
  if (typeof window === 'undefined') return false;
  if (!/^\/(zh\/?)?$/.test(window.location.pathname)) return false;
  if (window.location.hash) return false;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (isAutomated()) return false;
  return true;
}

export const sealed = ref(shouldSeal());

export function markOpened() {
  sealed.value = false;
}
