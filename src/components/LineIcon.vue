<template>
  <svg class="line-icon" viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
    <template v-if="name === 'paper'">
      <path d="M16 8h22l10 10v38H16z" />
      <path d="M38 8v10h10" />
      <path d="M23 30h18M23 37h18M23 44h11" />
      <circle class="dot" cx="45" cy="47" r="3.2" />
    </template>
    <template v-else-if="name === 'planet'">
      <g transform="rotate(-18 32 34)">
        <ellipse cx="32" cy="34" rx="26" ry="7.5" />
        <circle class="body" cx="32" cy="34" r="13" />
        <path d="M6 34a26 7.5 0 0 0 52 0" />
      </g>
      <circle class="dot moon" cx="50" cy="12" r="3.2" />
    </template>
    <template v-else-if="name === 'gate'">
      <path d="M18 56V26a14 14 0 0 1 28 0v30" />
      <path d="M10 56h44" />
      <circle class="dot" cx="32" cy="38" r="3.2" />
    </template>
    <template v-else-if="name === 'open'">
      <path d="M12 20h40v32H12z" />
      <path d="M12 20l20 16 20-16" />
      <circle class="dot" cx="32" cy="36" r="3.2" />
    </template>
    <template v-else-if="name === 'code'">
      <path d="M22 20L10 32l12 12M42 20l12 12-12 12M36 14L28 50" />
      <circle class="dot" cx="50" cy="12" r="3.2" />
    </template>
  </svg>
</template>

<script setup>
defineProps({ name: { type: String, required: true } });
</script>

<style scoped>
.line-icon {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.body {
  fill: var(--icon-bg, var(--bg));
}

.dot {
  fill: var(--accent);
  stroke: none;
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.5s cubic-bezier(0.3, 1.5, 0.5, 1);
}

/* Saturn's small moon keeps a slow orbit around the planet. */
.moon {
  transform-box: view-box;
  transform-origin: 32px 34px;
  animation: orbit 18s linear infinite;
}

@keyframes orbit {
  to {
    transform: rotate(360deg);
  }
}
</style>
