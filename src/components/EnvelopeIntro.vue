<template>
  <div
    class="stage"
    :class="[`is-${phase}`, { 'is-broken': broken, 'is-moving': progress > 0.01, 'is-flap-back': flapT > 0.5 }]"
    :style="{
      '--seal': sealT,
      '--flap': flapT,
      '--rise': riseT,
      '--rx': `${tilt.x}deg`,
      '--ry': `${tilt.y}deg`,
      '--gx': `${glare.x}%`,
      '--gy': `${glare.y}%`,
    }"
    role="dialog"
    aria-modal="true"
    :aria-label="t('envelope.open')"
    @wheel.passive="onWheel"
    @pointerdown="onDown"
    @pointermove="onMove"
    @pointerup="onUp"
    @pointercancel="onUp"
    @pointerleave="resetTilt"
  >
    <div class="tilt">
      <div class="envelope">
        <!-- inside of the envelope -->
        <div class="env-back"></div>

        <!-- the letter, waiting -->
        <div class="letter">
          <p class="letter-line letter-salutation">{{ t('letter.salutation') }}</p>
          <span class="letter-rule" v-for="n in 5" :key="n" :style="{ width: `${92 - n * 9}%` }"></span>
        </div>

        <!-- front pocket: side and bottom flaps, with their fold lines -->
        <div class="env-pocket">
          <svg class="folds" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 100 L50 52 L100 100" />
          </svg>
          <p class="env-address">
            <span class="label">{{ t('envelope.to') }}</span>
            <span class="env-from">{{ t('envelope.from') }}</span>
          </p>
        </div>

        <!-- top flap, sealed -->
        <div class="env-flap"></div>

        <button type="button" class="seal" :aria-label="t('envelope.open')" @pointerdown.stop @click="play">
          <span class="seal-half seal-left"><SealMark :size="76" /></span>
          <span class="seal-half seal-right"><SealMark :size="76" /></span>
        </button>
      </div>
    </div>

    <p class="hint" aria-live="polite">
      <span class="hint-body">
        <span class="hint-arrow" aria-hidden="true">
          <svg viewBox="0 0 12 18"><path d="M6 1v15M1 11l5 5 5-5" /></svg>
        </span>
        {{ t('envelope.scroll') }}
      </span>
    </p>

    <button type="button" class="skip label" @pointerdown.stop @click="finish">{{ t('envelope.skip') }}</button>
  </div>
</template>

<script setup>
// Opened by scrolling. Every bit of scroll (wheel, trackpad, a swipe up on a
// phone, arrow keys) moves the envelope along one track, and it follows
// wherever the reader is on it, back and forth:
//   0 – 0.16    the wax strains, then cracks (and stays cracked)
//   0.16 – 0.46 the flap swings up
//   0.42 – 1    the letter slides out while the envelope sinks
// At the end the letter comes toward the reader and the page takes over.
// Clicking the seal or pressing Enter plays the rest by itself; Escape or
// "Skip" jumps straight to the page.
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import SealMark from './SealMark.vue';
import { useI18n } from '../i18n';

const emit = defineEmits(['done', 'leaving']);
const { t } = useI18n();

const phase = ref('sealed'); // sealed → leaving → done
const broken = ref(false);
const progress = ref(0); // what is shown, eased toward `target`
const tilt = reactive({ x: 0, y: 0 });
const glare = reactive({ x: 50, y: 30 });

const BREAK = 0.16;
const WHEEL_SPAN = 1500; // px of wheel scroll from sealed to fully out
const SWIPE_SPAN = 0.9; // share of the screen height a swipe needs to do the same

let target = 0;
let autoplay = false;
let raf = 0;
let leaveTimer = null;
let touch = null;

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ease = (v) => v * v * (3 - 2 * v);

const sealT = computed(() => clamp01(progress.value / BREAK));
const flapT = computed(() => ease(clamp01((progress.value - BREAK) / 0.3)));
const riseT = computed(() => ease(clamp01((progress.value - 0.42) / 0.58)));

function nudge(amount) {
  if (phase.value !== 'sealed') return;
  target = clamp01(target + amount);
}

function play() {
  autoplay = true;
}

function frame() {
  if (autoplay) target = Math.min(1, target + 0.011);
  const next = progress.value + (target - progress.value) * 0.14;
  progress.value = Math.abs(target - next) < 0.0005 ? target : next;
  if (!broken.value && progress.value >= BREAK) broken.value = true;
  if (progress.value >= 0.985) return leave();
  raf = requestAnimationFrame(frame);
}

function leave() {
  if (phase.value !== 'sealed') return;
  progress.value = 1;
  resetTilt();
  phase.value = 'leaving';
  emit('leaving');
  leaveTimer = setTimeout(finish, 1000);
}

function finish() {
  cancelAnimationFrame(raf);
  clearTimeout(leaveTimer);
  phase.value = 'done';
  emit('done');
}

/* ---------- Input ---------- */

function onWheel(e) {
  const px = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY;
  nudge(px / WHEEL_SPAN);
}

// A finger moving up the screen is scrolling down.
function onDown(e) {
  if (e.pointerType === 'mouse') return;
  touch = { id: e.pointerId, y: e.clientY };
}

function onMove(e) {
  if (touch && touch.id === e.pointerId) {
    nudge((touch.y - e.clientY) / (innerHeight * SWIPE_SPAN));
    touch.y = e.clientY;
    return;
  }
  if (e.pointerType !== 'mouse' || phase.value !== 'sealed') return;
  const nx = (e.clientX / innerWidth) * 2 - 1;
  const ny = (e.clientY / innerHeight) * 2 - 1;
  tilt.x = -ny * 6;
  tilt.y = nx * 8;
  glare.x = 50 + nx * 40;
  glare.y = 30 + ny * 40;
}

function onUp(e) {
  if (touch && touch.id === e.pointerId) touch = null;
}

function resetTilt() {
  tilt.x = 0;
  tilt.y = 0;
  glare.x = 50;
  glare.y = 30;
}

const KEYS = {
  ArrowDown: 0.12,
  ArrowUp: -0.12,
  PageDown: 0.3,
  PageUp: -0.3,
  ' ': 0.3,
};

function onKey(e) {
  if (e.key === 'Escape') return finish();
  if (e.target?.closest?.('.skip, .seal')) return;
  if (e.key === 'Enter' || e.key === 'End') {
    e.preventDefault();
    return play();
  }
  if (e.key in KEYS) {
    e.preventDefault();
    nudge(e.shiftKey && e.key === ' ' ? -KEYS[' '] : KEYS[e.key]);
  }
}

onMounted(() => {
  // The letter always opens from its first line.
  window.scrollTo(0, 0);
  document.documentElement.classList.add('is-sealed');
  window.addEventListener('keydown', onKey);
  raf = requestAnimationFrame(frame);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  clearTimeout(leaveTimer);
  document.documentElement.classList.remove('is-sealed');
  window.removeEventListener('keydown', onKey);
});
</script>

<style scoped>
.stage {
  position: fixed;
  inset: 0;
  z-index: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 44px;
  padding: 24px;
  background: var(--grain) 0 0 / 200px, var(--bg-raised);
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  perspective: 1600px;
  transition: opacity 1s var(--ease);
}

.is-leaving {
  opacity: 0;
  pointer-events: none;
}

/* ---------- Tilt: leans toward the pointer, sinks as the letter rises ---------- */

.tilt {
  transform: translateY(calc(var(--rise) * 18%)) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.3, 1);
}

.is-moving .tilt {
  transition-property: none;
}

.is-leaving .tilt {
  transform: translateY(34%);
  transition: transform 1s var(--ease);
}

/* ---------- Envelope ---------- */

.envelope {
  --w: min(560px, 84vw);
  --h: calc(var(--w) * 0.62);
  --fold: 52%;
  position: relative;
  width: var(--w);
  height: var(--h);
  perspective: 1400px;
  filter: drop-shadow(0 18px 30px rgba(40, 32, 20, 0.08)) drop-shadow(0 2px 3px rgba(40, 32, 20, 0.06));
}

.env-back,
.env-pocket,
.env-flap {
  position: absolute;
  left: 0;
  right: 0;
}

.env-back {
  inset: 0;
  z-index: 1;
  background: var(--grain) 0 0 / 200px, var(--layer-3);
}

.env-pocket {
  inset: 0;
  z-index: 3;
  background: var(--grain) 0 0 / 200px, var(--layer-2);
  clip-path: polygon(0 0, 50% var(--fold), 100% 0, 100% 100%, 0 100%);
}

/* Light catching the paper where the pointer is. */
.env-pocket::after,
.env-flap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--gx) var(--gy), rgba(255, 255, 255, 0.32), transparent 55%);
  mix-blend-mode: soft-light;
  pointer-events: none;
}

.folds {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.folds path {
  fill: none;
  stroke: var(--line-strong);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.env-address {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 9%;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.env-from {
  font-family: var(--display);
  font-style: italic;
  font-size: clamp(1rem, 2.4vw, 1.25rem);
  color: var(--ink-2);
}

/* The flap follows the scroll; past halfway it is behind the letter. */
.env-flap {
  top: 0;
  z-index: 4;
  height: calc(var(--fold) + 6%);
  background: var(--grain) 0 0 / 200px, var(--layer-1);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
  transform: rotateX(calc(var(--flap) * 180deg));
}

.is-flap-back .env-flap {
  z-index: 0;
  background: var(--grain) 0 0 / 200px, var(--layer-2);
}

/* ---------- Letter ---------- */

.letter {
  position: absolute;
  left: 5%;
  right: 5%;
  top: 5%;
  height: 90%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 7% 9%;
  background: var(--grain) 0 0 / 200px, var(--paper);
  border: 1px solid var(--line);
  transform: translateY(calc(var(--rise) * -72%));
  box-shadow: 0 -6px 18px -12px rgba(60, 48, 30, calc(var(--rise) * 0.4));
}

/* The letter lifts out toward the reader as the page takes over. */
.is-leaving .letter {
  transform: translateY(-80%) scale(1.12);
  box-shadow: 0 30px 60px -30px rgba(60, 48, 30, 0.35);
  transition: transform 1s var(--ease), box-shadow 1s var(--ease);
}

.letter-salutation {
  margin: 0 0 6px;
  font-family: var(--display);
  font-style: italic;
  font-size: clamp(1rem, 2.6vw, 1.375rem);
  color: var(--ink);
}

.letter-rule {
  display: block;
  height: 1px;
  background: var(--line-strong);
}

/* ---------- Seal ---------- */

.seal {
  position: absolute;
  left: 50%;
  top: calc(var(--fold) + 6%);
  z-index: 5;
  width: clamp(56px, 13vw, 76px);
  height: clamp(56px, 13vw, 76px);
  translate: -50% -50%;
  padding: 0;
  background: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  /* A tight, hard shadow: wax sits flat on paper, it doesn't glow. */
  filter: drop-shadow(0 1px 0 rgba(60, 35, 10, 0.28)) drop-shadow(0 1.5px 1px rgba(60, 35, 10, 0.12));
}

.seal-half :deep(svg) {
  width: 100%;
  height: 100%;
}

.seal-half {
  position: absolute;
  inset: 0;
  transition: transform 0.9s var(--ease), opacity 0.9s var(--ease);
}

.seal-left {
  clip-path: polygon(0 0, 54% 0, 46% 38%, 55% 62%, 48% 100%, 0 100%);
}

.seal-right {
  clip-path: polygon(54% 0, 100% 0, 100% 100%, 48% 100%, 55% 62%, 46% 38%);
}

/* The wax strains as the scroll pulls on it: the halves start to part. */
.stage:not(.is-broken) .seal-half {
  transition: none;
}

.stage:not(.is-broken) .seal-left {
  transform: translateX(calc(var(--seal) * -2px)) rotate(calc(var(--seal) * -4deg));
}

.stage:not(.is-broken) .seal-right {
  transform: translateX(calc(var(--seal) * 2px)) rotate(calc(var(--seal) * 4deg));
}

.is-broken .seal-left {
  transform: translate(-10px, 26px) rotate(-16deg);
  opacity: 0;
  transition-delay: 0.12s;
}

.is-broken .seal-right {
  transform: translate(10px, 30px) rotate(14deg);
  opacity: 0;
  transition-delay: 0.12s;
}

/* A short snap as the wax gives. */
.is-broken .seal {
  pointer-events: none;
  animation: crack 0.26s ease-in-out;
}

@keyframes crack {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-5deg) scale(1.06);
  }
  60% {
    transform: rotate(4deg) scale(1.04);
  }
}

.seal:focus-visible {
  outline-offset: 8px;
}

/* ---------- Arrival: the envelope slides onto the desk, the wax is pressed,
   then it rests (a slow float, the wax catching the light). */

.envelope {
  animation:
    arrive 1.1s var(--ease) both,
    float 5.5s ease-in-out 1.1s infinite;
}

.is-moving .envelope {
  animation-play-state: running, paused;
}

@keyframes arrive {
  from {
    opacity: 0;
    transform: translateY(70px) rotate(-5deg) scale(0.94);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-6px) rotate(-0.4deg);
  }
}

.stage:not(.is-broken) .seal {
  animation: seal-drop 0.65s cubic-bezier(0.3, 1.45, 0.5, 1) 0.6s both;
}

@keyframes seal-drop {
  from {
    opacity: 0;
    transform: scale(1.8) rotate(-30deg);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* ---------- Hint ---------- */

.hint {
  margin: 0;
  min-height: 1.5em;
  font-size: 0.875rem;
  letter-spacing: 0.02em;
  color: var(--ink-3);
  animation: hint-in 0.8s var(--ease) 1.5s both;
}

.hint-body {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: opacity 0.4s var(--ease);
}

.is-moving .hint-body {
  opacity: 0;
}

.hint-arrow {
  display: inline-flex;
  width: 12px;
  height: 18px;
  animation: drift 1.8s ease-in-out infinite;
}

.hint-arrow svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: var(--accent);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@keyframes hint-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes drift {
  0%,
  100% {
    transform: translateY(-3px);
    opacity: 0.5;
  }
  50% {
    transform: translateY(3px);
    opacity: 1;
  }
}

@media (max-width: 480px) {
  .env-address {
    bottom: 6%;
  }

  .env-address .label {
    display: none;
  }
}

.skip {
  position: absolute;
  right: var(--gutter);
  bottom: 28px;
  padding: 8px 0;
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: 1px solid var(--line);
}

.skip:hover {
  color: var(--ink);
}
</style>
