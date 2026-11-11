// v-reveal: fade an element up the first time it scrolls into view.
// Optional value is a delay in ms, for staggering siblings. The delay is
// removed once the element has appeared, so it never slows hover effects.
let observer;

function show(el) {
  el.classList.add('is-visible');
  const delay = parseFloat(el.style.transitionDelay) || 0;
  setTimeout(() => {
    el.style.transitionDelay = '';
  }, delay * 1000 + 1000);
}

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  return observer;
}

export const reveal = {
  mounted(el, binding) {
    el.classList.add('reveal');
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`;
    const io = getObserver();
    if (io) io.observe(el);
    else show(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
