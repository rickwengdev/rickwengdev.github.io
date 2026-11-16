<template>
  <section class="part">
    <PartHeader :num="num" ns="contributions" />

    <ul class="gifts">
      <li v-for="(item, i) in items" :key="item.id" v-reveal="i * 100">
        <component
          :is="item.url ? 'a' : 'div'"
          :href="item.url || undefined"
          :target="item.url ? '_blank' : undefined"
          :rel="item.url ? 'noopener noreferrer' : undefined"
          class="gift"
          :class="{ linked: item.url }"
        >
          <LineIcon :name="item.icon" class="gift-icon" />
          <div class="gift-text">
            <p class="gift-kind">{{ item.kind }}</p>
            <h3 class="gift-title">
              {{ item.title }}
              <span v-if="item.url" class="arrow" aria-hidden="true">↗</span>
            </h3>
            <p class="gift-body">{{ item.body }}</p>
          </div>
        </component>
      </li>
    </ul>
  </section>
</template>

<script setup>
// Open tools and practices. Entries live in src/content/contributions.js.
import { computed } from 'vue';
import LineIcon from '../components/LineIcon.vue';
import PartHeader from '../components/PartHeader.vue';
import { getContributions } from '../content/index.js';
import { useI18n } from '../i18n';

defineProps({ num: { type: String, required: true } });

const { locale } = useI18n();
const items = computed(() => getContributions(locale.value));
</script>

<style scoped>
.gifts {
  margin: 0;
  padding: 0;
  list-style: none;
  border-bottom: 1px solid var(--line);
}

.gift {
  --icon-bg: var(--paper);
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 20px;
  padding: 24px 0;
  border-top: 1px solid var(--line);
}

.gift-icon {
  width: 48px;
  height: 48px;
}

.gift-kind {
  margin: 0 0 4px;
  font-size: 0.8125rem;
  color: var(--ink-3);
}

.gift-title {
  margin: 0 0 6px;
  font-family: var(--serif);
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.2;
  transition: color 0.2s;
}

.gift-title .arrow {
  display: inline-block;
  font-family: var(--sans);
  font-size: 0.65em;
  color: var(--accent);
  transition: transform 0.3s var(--ease);
}

.gift-body {
  max-width: 34rem;
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--ink-2);
  text-wrap: pretty;
}

.linked:hover .gift-title {
  color: var(--accent-ink);
}

.linked:hover .gift-title .arrow {
  transform: translate(2px, -2px);
}

.gift:hover :deep(.dot) {
  transform: scale(1.5);
}
</style>
