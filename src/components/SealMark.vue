<template>
  <!-- A small wax seal in amber. The edge is a little uneven, as wax is. -->
  <svg class="seal" :width="size" :height="size" viewBox="0 0 40 40" aria-hidden="true">
    <path class="wax" :d="edge" />
    <circle class="ring" cx="20" cy="20" r="12.5" />
    <text class="letter" x="20" y="20.5" text-anchor="middle" dominant-baseline="central">{{ letter }}</text>
  </svg>
</template>

<script setup>
defineProps({
  size: { type: Number, default: 28 },
  letter: { type: String, default: 'R' },
});

// Fixed irregular outline (deterministic, so it never shifts between renders).
const edge = (() => {
  const pts = [];
  const n = 18;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = 17.2 + Math.sin(i * 2.7) * 0.9 + Math.cos(i * 1.3) * 0.6;
    pts.push([20 + Math.cos(a) * r, 20 + Math.sin(a) * r]);
  }
  const start = pts[n - 1].map((v, k) => ((v + pts[0][k]) / 2).toFixed(2));
  let d = `M${start[0]},${start[1]}`;
  for (let i = 0; i < n; i++) {
    const p1 = pts[(i + 1) % n];
    const mid = pts[i].map((v, k) => ((v + p1[k]) / 2).toFixed(2));
    d += ` Q${pts[i][0].toFixed(2)},${pts[i][1].toFixed(2)} ${mid[0]},${mid[1]}`;
  }
  return `${d} Z`;
})();
</script>

<style scoped>
.seal {
  display: block;
  flex-shrink: 0;
}

.wax {
  fill: var(--accent);
}

.ring {
  fill: none;
  stroke: var(--bg);
  stroke-width: 0.8;
  opacity: 0.55;
}

.letter {
  fill: var(--bg);
  font-family: var(--display);
  font-size: 15px;
  font-style: italic;
  font-weight: 400;
}
</style>
