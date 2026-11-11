<template>
  <!-- An open return envelope on the desk, flap up, with an addressed reply
       card standing out of it. -->
  <a :href="`mailto:${LINKS.email}`" class="reply" v-reveal="120" :aria-label="`${t('contact.email')}: ${LINKS.email}`">
    <span class="env">
      <span class="env-flap" aria-hidden="true"></span>
      <span class="env-back" aria-hidden="true"></span>

      <span class="env-card">
        <span class="card-stamp" aria-hidden="true"><SealMark :size="30" /></span>
        <span class="card-to">{{ t('contact.to') }}</span>
        <span class="card-email">{{ LINKS.email }}</span>
        <span class="card-rule" aria-hidden="true"></span>
      </span>

      <span class="env-pocket" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L50 52 L100 0" />
          <path class="fold" d="M0 100 L42 46 M100 100 L58 46" />
        </svg>
      </span>
    </span>
  </a>
</template>

<script setup>
import SealMark from './SealMark.vue';
import { LINKS } from '../seo/schema.js';
import { useI18n } from '../i18n';

const { t } = useI18n();
</script>

<style scoped>
.reply {
  display: block;
  width: min(88%, 460px);
  margin: 0 auto;
}

/* Room above the envelope for the open flap (a share of the envelope's own
   width, which is why it isn't padding on .reply). */
.reply::before {
  content: '';
  display: block;
  padding-top: 36%;
}

.reply.is-visible {
  transform: rotate(-1.6deg);
  transition: transform 0.6s var(--ease), opacity 0.8s var(--ease);
}

.reply.is-visible:hover {
  transform: rotate(-0.6deg);
}

.env {
  position: relative;
  display: block;
  aspect-ratio: 1.62;
  filter: drop-shadow(0 18px 22px rgba(60, 48, 30, 0.2)) drop-shadow(0 1px 1px rgba(60, 48, 30, 0.08));
}

.env-flap,
.env-back,
.env-card,
.env-pocket {
  position: absolute;
}

/* The flap, folded open above the envelope: we see its inside. */
.env-flap {
  left: 0;
  right: 0;
  bottom: calc(100% - 1px);
  height: 58%;
  background: var(--grain) 0 0 / 200px, #e8dfcb;
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
}

/* The inside back wall. */
.env-back {
  inset: 0;
  background: var(--grain) 0 0 / 200px, #e3d9c3;
  border-radius: 0 0 4px 4px;
}

/* The reply card, half out of the envelope. */
.env-card {
  left: 7%;
  right: 7%;
  bottom: 8%;
  height: 128%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12% 16px 0;
  text-align: center;
  background: var(--grain) 0 0 / 200px, #fdfbf4;
  border: 1px solid rgba(20, 20, 19, 0.07);
  border-radius: 3px;
  box-shadow: 0 -2px 10px -4px rgba(60, 48, 30, 0.18);
  transition: transform 0.6s var(--ease);
}

.reply:hover .env-card {
  transform: translateY(-12%);
}

.card-stamp {
  position: absolute;
  top: 10px;
  right: 10px;
  transform: rotate(8deg);
  transition: transform 0.6s cubic-bezier(0.3, 1.5, 0.5, 1);
}

.reply:hover .card-stamp {
  transform: rotate(-14deg) scale(1.1);
}

.card-to {
  font-size: 0.8125rem;
  color: var(--ink-3);
}

.card-email {
  font-family: var(--serif);
  font-size: clamp(1.1rem, 4.2vw, 1.6rem);
  line-height: 1.2;
  color: var(--accent-ink);
  overflow-wrap: anywhere;
}

.card-rule {
  width: 62%;
  height: 1px;
  margin-top: 8px;
  background: var(--line-strong);
}

/* The front pocket, cut in a V where the flap opens. */
.env-pocket {
  inset: 0;
  background: var(--grain) 0 0 / 200px, #f4efe3;
  border-radius: 0 0 4px 4px;
  clip-path: polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%);
}

.env-pocket svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.env-pocket path {
  fill: none;
  stroke: rgba(20, 20, 19, 0.14);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.env-pocket .fold {
  stroke: rgba(20, 20, 19, 0.08);
}
</style>
