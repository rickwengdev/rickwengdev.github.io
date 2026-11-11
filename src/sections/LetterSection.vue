<template>
  <section id="top" class="letter-section" :class="{ playing }">
    <div class="container">
      <div class="sheet-wrap">
        <article class="sheet" :class="{ unfolding }">
          <header class="sheet-head">
            <div class="sheet-meta w" style="--d: 0.15s">
              <p class="label">{{ t('letter.from') }}</p>
              <p class="label">
                <time class="sent-at" :datetime="now.toISOString()">{{ sentAt }}</time>
              </p>
            </div>

            <figure class="stamp stamp-drop">
              <div class="stamp-paper">
                <img :src="avatar" :alt="t('letter.stamp')" class="stamp-photo" width="120" height="150" />
              </div>
              <svg class="postmark" viewBox="0 0 120 120" aria-hidden="true">
                <defs>
                  <path id="pm-arc" d="M60 60 m-40 0 a40 40 0 1 1 80 0 a40 40 0 1 1 -80 0" />
                </defs>
                <circle cx="60" cy="60" r="48" />
                <circle cx="60" cy="60" r="31" />
                <text>
                  <textPath href="#pm-arc" startOffset="2%">{{ t('letter.postmark') }}</textPath>
                </text>
                <text class="pm-year" x="60" y="64" text-anchor="middle">{{ year }}</text>
                <path class="pm-waves" d="M100 40 q8 -6 16 0 t16 0 M100 52 q8 -6 16 0 t16 0 M100 64 q8 -6 16 0 t16 0" />
              </svg>
            </figure>
          </header>

          <p class="salutation w" style="--d: 0.45s">{{ t('letter.salutation') }}</p>

          <div class="body">
            <p
              v-for="(para, i) in paragraphs"
              :key="i"
              class="w"
              :class="{ first: i === 0 }"
              :style="{ '--d': `${0.65 + i * 0.2}s` }"
            >
              {{ para }}
            </p>
          </div>

          <!-- The rest of the letter: experience, projects, research, CVEs, contributions, contact. -->
          <slot />

          <!-- Signed at the very end; the ink goes on when the reader gets here. -->
          <footer class="signature" v-reveal>
            <p v-if="t('letter.signoffBefore')" class="signoff s" style="--d: 0.15s">{{ t('letter.signoffBefore') }}</p>
            <div class="sign-row">
              <span class="sign-name handwrite">Rick Weng</span>
              <span v-if="t('letter.signoffAfter')" class="signoff signoff-after s" style="--d: 1.5s">{{
                t('letter.signoffAfter')
              }}</span>
              <SealMark :size="44" class="sign-seal seal-press" />
            </div>
            <p class="ps s" style="--d: 2.2s">
              {{ t('letter.ps') }}
              <a :href="LINKS.saturn" target="_blank" rel="noopener noreferrer">saturn-core.com</a>
            </p>
          </footer>
        </article>
      </div>

      <!-- Things lying on the desk beside the letter. -->
      <slot name="after" />
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import avatar from '../assets/avatar.jpg';
import SealMark from '../components/SealMark.vue';
import { LINKS } from '../seo/schema.js';
import { useI18n } from '../i18n';

const props = defineProps({
  unfolding: { type: Boolean, default: false },
  // true while the envelope still covers the page: hold the writing until it opens
  waiting: { type: Boolean, default: false },
});

// The letter writes itself in once it can be seen.
const playing = ref(!props.waiting);
watch(
  () => props.unfolding,
  (v) => {
    if (v) playing.value = true;
  }
);

const { locale, t, tm } = useI18n();
const paragraphs = computed(() => tm('letter.paragraphs') ?? []);
const year = new Date().getFullYear();

// "Sent" time: the visitor's own clock, in their time zone, ticking every second.
const now = ref(new Date());
let clock;

const sentAt = computed(() =>
  new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-TW' : 'en-GB', {
    dateStyle: 'long',
    timeStyle: 'medium',
  }).format(now.value)
);

onMounted(() => {
  // Align ticks to the start of each second so the display never lags.
  const tick = () => {
    now.value = new Date();
    clock = setTimeout(tick, 1000 - (Date.now() % 1000));
  };
  tick();
});

onBeforeUnmount(() => clearTimeout(clock));
</script>

<style scoped>
/* The desk the letter lies on. */
.letter-section {
  padding: clamp(40px, 7vw, 88px) 0 clamp(72px, 10vw, 128px);
  background:
    var(--grain) 0 0 / 200px,
    var(--bg-raised);
}

/* The letter: a sheet of paper on the page. */
.sheet-wrap {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

/* The bottom corners lift off the desk a little, so the shadow under them is
   deeper than under the middle. */
.sheet-wrap::before,
.sheet-wrap::after {
  content: '';
  position: absolute;
  bottom: 16px;
  width: 44%;
  height: 28px;
  box-shadow: 0 18px 16px rgba(60, 48, 30, 0.2);
}

.sheet-wrap::before {
  left: 14px;
  transform: rotate(-2.2deg);
}

.sheet-wrap::after {
  right: 14px;
  transform: rotate(2.2deg);
}

.sheet {
  --sheet-px: clamp(22px, 6vw, 80px);
  position: relative;
  z-index: 1;
  padding: clamp(32px, 6vw, 72px) var(--sheet-px) clamp(48px, 7vw, 80px);
  /* Fine tooth, stray fibres and tonal mottling over a warm white, with a
     faint sheen near the top where the light falls. */
  background:
    var(--grain) 0 0 / 200px,
    var(--mottle) 0 0 / 512px,
    radial-gradient(ellipse 90% 40% at 50% 0%, rgba(255, 255, 255, 0.7), transparent),
    #fdfbf4;
  border: 1px solid rgba(20, 20, 19, 0.07);
  border-radius: 3px;
  box-shadow:
    /* edges age a shade warmer than the middle */
    inset 0 0 70px rgba(176, 140, 82, 0.09),
    inset 0 0 0 1px rgba(255, 255, 255, 0.6),
    0 1px 1px rgba(60, 48, 30, 0.06),
    0 4px 10px -4px rgba(60, 48, 30, 0.1),
    0 30px 60px -36px rgba(60, 48, 30, 0.26);
}

.sheet-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: clamp(32px, 5vw, 56px);
}

.sheet-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 4px;
}

.sent-at {
  font-variant-numeric: tabular-nums;
}

.sheet-meta .label:first-child {
  font-weight: 500;
  color: var(--accent-ink);
}

/* ---------- Stamp + postmark ---------- */

.stamp {
  position: relative;
  flex-shrink: 0;
  margin: 0;
  transform: rotate(2deg);
}

.stamp-paper {
  width: clamp(84px, 14vw, 116px);
  padding: 7px;
  background:
    var(--grain) 0 0 / 200px,
    var(--bg-raised);
  border: 3px dotted var(--paper);
  outline: 1px solid var(--line-strong);
  outline-offset: -3px;
}

.stamp-photo {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  filter: grayscale(0.2) contrast(0.98);
}

.postmark {
  position: absolute;
  left: -58%;
  bottom: -26%;
  width: 92%;
  overflow: visible;
  color: var(--accent);
  opacity: 0.75;
  transform: rotate(-14deg);
  pointer-events: none;
}

.postmark circle,
.postmark .pm-waves {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.2;
}

.postmark text {
  fill: currentColor;
  font-family: var(--mono);
  font-size: 8.5px;
  letter-spacing: 1.5px;
}

.postmark .pm-year {
  font-size: 14px;
  letter-spacing: 1px;
}

/* ---------- Words ---------- */

.salutation {
  margin: 0 0 24px;
  font-family: var(--serif);
  font-size: clamp(1.75rem, 3.4vw, 2.4rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.015em;
}

.body p {
  margin: 0 0 1.1em;
  font-size: clamp(1rem, 1.4vw, 1.0625rem);
  line-height: 1.8;
  color: var(--ink-2);
  text-wrap: pretty;
}

.body p.first {
  font-family: var(--serif);
  font-size: clamp(1.25rem, 2.2vw, 1.5rem);
  line-height: 1.5;
  color: var(--ink);
}

/* ---------- Signature ---------- */

.signature {
  margin-top: clamp(64px, 9vw, 104px);
}

.signoff {
  margin: 0 0 6px;
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.125rem;
  color: var(--ink-2);
}

.sign-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.sign-name {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(2rem, 4.2vw, 2.75rem);
  line-height: 1;
  letter-spacing: -0.02em;
}

.signoff-after {
  margin: 0;
  font-style: normal;
}

.sign-seal {
  transform: rotate(-8deg);
}

.ps {
  margin: 32px 0 0;
  padding-top: 20px;
  font-size: 0.875rem;
  color: var(--ink-3);
  border-top: 1px solid var(--line);
}

.ps a {
  white-space: nowrap;
  font-weight: 500;
  color: var(--accent-ink);
  border-bottom: 1px solid var(--line-strong);
  transition: border-color 0.2s;
}

.ps a:hover {
  border-bottom-color: var(--accent);
}

/* Right after the envelope opens, the sheet settles into place. */
.unfolding {
  animation: unfold 1.2s var(--ease) both;
}

@keyframes unfold {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* ---------- Writing the letter ---------- */

.playing .w {
  animation: write-in 0.9s var(--ease) both;
  animation-delay: var(--d, 0s);
}

@keyframes write-in {
  from {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: none;
    filter: none;
  }
}

/* The stamp drops onto the corner, then the postmark lands on it. */
.playing .stamp-drop {
  animation: stamp-drop 1s var(--ease) 0.35s both;
}

@keyframes stamp-drop {
  from {
    opacity: 0;
    transform: translate(16px, -28px) rotate(14deg);
  }
  to {
    opacity: 1;
    transform: rotate(2deg);
  }
}

.playing .postmark {
  animation: postmark 0.7s cubic-bezier(0.3, 1.5, 0.5, 1) 1.15s both;
}

@keyframes postmark {
  from {
    opacity: 0;
    transform: rotate(-14deg) scale(1.4);
  }
  to {
    opacity: 0.75;
    transform: rotate(-14deg) scale(1);
  }
}

/* At the end of the letter: the sign-off appears, the name is written left
   to right like ink, then the wax seal is pressed. */
.signature .s,
.signature .handwrite,
.signature .seal-press {
  opacity: 0;
}

.signature.is-visible .s {
  animation: write-in 0.9s var(--ease) both;
  animation-delay: var(--d, 0s);
}

.signature.is-visible .handwrite {
  opacity: 1;
  animation: handwrite 1.3s cubic-bezier(0.6, 0, 0.3, 1) 0.35s both;
}

@keyframes handwrite {
  from {
    clip-path: inset(-20% 100% -20% 0);
  }
  to {
    clip-path: inset(-20% -10% -20% 0);
  }
}

.signature.is-visible .seal-press {
  animation: seal-press 0.8s cubic-bezier(0.3, 1.4, 0.5, 1) 1.7s both;
}

@media (prefers-reduced-motion: reduce) {
  .signature .s,
  .signature .handwrite,
  .signature .seal-press {
    opacity: 1;
  }
}

@keyframes seal-press {
  0% {
    opacity: 0;
    transform: scale(1.9) rotate(-34deg);
  }
  60% {
    opacity: 1;
    transform: scale(0.92) rotate(-6deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(-8deg);
  }
}

@media (max-width: 560px) {
  .postmark {
    left: -48%;
    width: 80%;
  }
}
</style>
