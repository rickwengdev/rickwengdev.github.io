<template>
  <article class="entry">
    <!-- The company's sticker, stuck on the paper beside its name. -->
    <a
      v-if="logo"
      :href="item.url"
      target="_blank"
      rel="noopener noreferrer"
      class="sticker"
      :class="{ 'sticker-circle': item.logoShape === 'circle' }"
      :aria-label="`${item.name} — ${t(`${ns}.visit`)}`"
      v-reveal="160"
    >
      <img :src="logo" :alt="`${item.name} logo`" width="96" height="96" />
    </a>

    <div class="entry-head">
      <h3 class="entry-name" v-reveal="40">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">
          {{ item.name }} <span class="arrow" aria-hidden="true">↗</span>
        </a>
      </h3>
      <p class="entry-role" v-reveal="70">
        <span>{{ item.role }}&nbsp;·</span> <span>{{ item.period }}</span>
      </p>
      <p class="entry-tagline" v-reveal="100">{{ item.tagline }}</p>
    </div>

    <p class="entry-summary" v-reveal="130">{{ item.summary }}</p>

    <!-- Highlights stay folded so a long list of entries still reads at a glance;
         they remain in the DOM for search engines and screen readers. -->
    <details v-if="item.highlights?.length" class="entry-more" v-reveal="160">
      <summary>
        <span class="when-closed">{{ t(`${ns}.more`) }} ({{ item.highlights.length }})</span>
        <span class="when-open">{{ t(`${ns}.less`) }}</span>
      </summary>
      <ul class="entry-points">
        <li v-for="line in item.highlights" :key="line">{{ line }}</li>
      </ul>
    </details>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from '../i18n';

// One company or project, as written in the letter: sticker, dates, name, what it does.
const props = defineProps({
  item: { type: Object, required: true },
  // Locale namespace for the link label ('experience' or 'projects').
  ns: { type: String, required: true },
});

// Every image in src/assets/logos, by file name. An entry picks one with `logo: 'name.png'`.
const LOGOS = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/logos/*', { eager: true, import: 'default' })).map(([path, url]) => [
    path.split('/').pop(),
    url,
  ])
);

const { t } = useI18n();
const logo = computed(() => LOGOS[props.item.logo]);
</script>

<style scoped>
.entry {
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: clamp(16px, 3vw, 28px);
  align-items: start;
}

.entry + .entry {
  margin-top: clamp(24px, 4vw, 32px);
  padding-top: clamp(24px, 4vw, 32px);
  border-top: 1px dashed var(--line-strong);
}

.entry-head {
  grid-column: 1;
  grid-row: 1;
  min-width: 0;
}

.entry-summary,
.entry-more {
  grid-column: 1 / -1;
}

/* ---------- Stickers ---------- */

.sticker {
  --tilt: 6deg;
  grid-column: 2;
  grid-row: 1;
  position: relative;
  width: clamp(52px, 9vw, 68px);
  padding: 4px;
  background: #fff;
  border-radius: 26%;
  box-shadow:
    0 0 0 1px rgba(20, 20, 19, 0.05),
    0 1px 1px rgba(20, 20, 19, 0.08),
    0 8px 14px -8px rgba(20, 20, 19, 0.45);
  transform: rotate(var(--tilt));
}

.sticker img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  border-radius: 21%;
}

/* A thin gloss across the vinyl. */
.sticker::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 38%);
  pointer-events: none;
}

.sticker-circle {
  --tilt: -7deg;
  padding: 6px;
  border-radius: 50%;
}

.sticker-circle img {
  border-radius: 50%;
}

/* Stuck on: dropped from above, pressed flat onto the paper. */
.sticker.reveal {
  opacity: 0;
  transform: translateY(-10px) rotate(calc(var(--tilt) * -2.5)) scale(1.35);
  transition:
    opacity 0.3s var(--ease),
    transform 0.7s cubic-bezier(0.3, 1.45, 0.5, 1),
    box-shadow 0.4s var(--ease);
}

.sticker.reveal.is-visible {
  opacity: 1;
  transform: rotate(var(--tilt));
}

/* Hover: the sticker lifts at the edge, as if about to be peeled. */
.sticker.reveal.is-visible:hover {
  transform: translateY(-2px) rotate(calc(var(--tilt) * 0.4)) scale(1.05);
  box-shadow:
    0 0 0 1px rgba(20, 20, 19, 0.05),
    0 2px 2px rgba(20, 20, 19, 0.06),
    0 14px 22px -10px rgba(20, 20, 19, 0.45);
}

/* ---------- What's written ---------- */

.entry-name {
  margin: 0 0 4px;
  font-family: var(--serif);
  font-size: clamp(1.375rem, 2.6vw, 1.75rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.entry-name a {
  transition: color 0.2s;
}

.entry-name a:hover {
  color: var(--accent-ink);
}

.entry-name .arrow {
  display: inline-block;
  font-family: var(--sans);
  font-size: 0.55em;
  color: var(--accent);
  transition: transform 0.3s var(--ease);
}

.entry-name a:hover .arrow {
  transform: translate(2px, -2px);
}

.entry-role {
  margin: 0 0 6px;
  font-size: 0.8125rem;
  color: var(--ink-3);
}

/* Wrap only between the role and the period; the dot stays with the role. */
.entry-role span {
  white-space: nowrap;
}

.entry-tagline {
  margin: 0;
  font-family: var(--serif);
  font-style: italic;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.entry-summary {
  margin: 12px 0 0;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--ink);
  text-wrap: pretty;
}

/* ---------- Folded highlights ---------- */

.entry-more {
  margin-top: 10px;
}

.entry-more summary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
  font-size: 0.8125rem;
  color: var(--accent-ink);
  cursor: pointer;
  list-style: none;
  user-select: none;
}

.entry-more summary::-webkit-details-marker {
  display: none;
}

/* A small pen-drawn chevron that turns when the fold opens. */
.entry-more summary::before {
  content: '';
  width: 6px;
  height: 6px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: translateY(-2px) rotate(45deg);
  transition: transform 0.25s var(--ease);
}

.entry-more[open] summary::before {
  transform: translateY(1px) rotate(-135deg);
}

.entry-more summary:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.entry-more .when-open,
.entry-more[open] .when-closed {
  display: none;
}

.entry-more[open] .when-open {
  display: inline;
}

.entry-points {
  display: grid;
  gap: 8px;
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
  animation: unfold 0.35s var(--ease);
}

@keyframes unfold {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .entry-points {
    animation: none;
  }
}

.entry-points li {
  position: relative;
  padding-left: 22px;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--ink-2);
  text-wrap: pretty;
}

/* A short pen dash instead of a bullet. */
.entry-points li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 0.85em;
  width: 10px;
  height: 1.5px;
  border-radius: 1px;
  background: var(--accent);
}
</style>
