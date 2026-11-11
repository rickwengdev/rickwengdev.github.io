// Whether the opening envelope is still covering the page.
// It plays every time someone arrives on the home page, and is skipped when
// they arrive on a section link (#research…) or prefer reduced motion.
// Moving around inside the site never brings it back.
import { ref } from 'vue';

function shouldSeal() {
  if (typeof window === 'undefined') return false;
  if (window.location.pathname !== '/') return false;
  if (window.location.hash) return false;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return true;
}

export const sealed = ref(shouldSeal());

export function markOpened() {
  sealed.value = false;
}
