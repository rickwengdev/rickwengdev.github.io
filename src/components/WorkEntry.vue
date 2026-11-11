<template>
  <article class="entry">
    <!-- The company's sticker, stuck on the paper beside what I wrote about it. -->
    <a
      v-if="LOGOS[item.id]"
      :href="item.url"
      target="_blank"
      rel="noopener noreferrer"
      class="sticker"
      :class="`sticker-${item.id}`"
      :aria-label="`${item.name} — ${t(`${ns}.visit`)}`"
      v-reveal="260"
    >
      <img :src="LOGOS[item.id]" :alt="`${item.name} logo`" width="160" height="160" />
    </a>

    <p class="entry-meta" v-reveal>
      <span class="status" :class="{ 'status-muted': !item.current }">
        {{ item.current ? t(`${ns}.current`) : t(`${ns}.past`) }}
      </span>
      <span>{{ item.period }} · {{ item.role }}</span>
    </p>

    <h3 class="entry-name" v-reveal="60">
      <a :href="item.url" target="_blank" rel="noopener noreferrer">
        {{ item.name }} <span class="arrow" aria-hidden="true">↗</span>
      </a>
    </h3>
    <p class="entry-tagline" v-reveal="120">{{ item.tagline }}</p>
    <p class="entry-summary" v-reveal="180">{{ item.summary }}</p>

    <ul class="entry-points">
      <li v-for="(line, i) in item.highlights" :key="line" v-reveal="200 + i * 80">{{ line }}</li>
    </ul>
  </article>
</template>

<script setup>
import saturnLogo from '../assets/logos/saturn.png';
import kuraLogo from '../assets/logos/kura.png';
import { useI18n } from '../i18n';

// One company or project, as written in the letter: sticker, dates, name, what it does.
defineProps({
  item: { type: Object, required: true },
  // Locale namespace for the status and link labels ('experience' or 'projects').
  ns: { type: String, required: true },
});

// Company marks (images only exist in the browser build, so they live here, not in data/work.js).
const LOGOS = { saturn: saturnLogo, kura: kuraLogo };

const { t } = useI18n();
</script>

<style scoped>
.entry {
  display: flow-root;
}

.entry + .entry {
  margin-top: clamp(40px, 6vw, 56px);
  padding-top: clamp(40px, 6vw, 56px);
  border-top: 1px dashed var(--line-strong);
}

/* ---------- Stickers ---------- */

.sticker {
  --tilt: 6deg;
  position: relative;
  float: right;
  width: clamp(76px, 15vw, 116px);
  margin: -6px -4px 16px 20px;
  padding: 6px;
  background: #fff;
  border-radius: 26%;
  box-shadow:
    0 0 0 1px rgba(20, 20, 19, 0.05),
    0 1px 1px rgba(20, 20, 19, 0.08),
    0 10px 18px -10px rgba(20, 20, 19, 0.45);
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

.sticker-kura {
  --tilt: -7deg;
  padding: 10px;
  border-radius: 50%;
}

.sticker-kura img {
  border-radius: 50%;
}

/* Stuck on: dropped from above, pressed flat onto the paper. */
.sticker.reveal {
  opacity: 0;
  transform: translateY(-14px) rotate(calc(var(--tilt) * -2.5)) scale(1.35);
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
  transform: translateY(-3px) rotate(calc(var(--tilt) * 0.4)) scale(1.04);
  box-shadow:
    0 0 0 1px rgba(20, 20, 19, 0.05),
    0 2px 2px rgba(20, 20, 19, 0.06),
    0 18px 28px -12px rgba(20, 20, 19, 0.45);
}

/* ---------- What's written ---------- */

.entry-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
  margin: 0 0 16px;
  font-size: 0.8125rem;
  color: var(--ink-3);
}

.entry-meta .status {
  margin-right: 4px;
}

.entry-name {
  margin: 0 0 6px;
  font-family: var(--serif);
  font-size: clamp(1.75rem, 3.6vw, 2.4rem);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.015em;
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

.entry-tagline {
  margin: 0;
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.125rem;
  line-height: 1.5;
  color: var(--ink-2);
}

.entry-summary {
  margin: 20px 0 0;
  font-size: clamp(1rem, 1.4vw, 1.0625rem);
  line-height: 1.8;
  color: var(--ink);
  text-wrap: pretty;
}

.entry-points {
  display: grid;
  gap: 10px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.entry-points li {
  position: relative;
  padding-left: 22px;
  font-size: 0.9375rem;
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
