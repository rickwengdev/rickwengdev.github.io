<template>
  <section class="part">
    <PartHeader :num="num" ns="cve" />

    <div class="cve-list">
      <article v-for="(cve, i) in cves" :key="cve.id" class="cve" v-reveal="100 + i * 100">
        <div class="cve-meta">
          <span class="cve-year">{{ cve.year }}</span>
          <span class="status" :class="{ 'status-muted': cve.severity === 'low' || cve.severity === 'medium' }">
            {{ t(`cve.severity.${cve.severity}`) }}<template v-if="cve.cvss"> · {{ cve.cvss.toFixed(1) }}</template>
          </span>
        </div>

        <div class="cve-main">
          <h3 class="cve-id">
            <a :href="cve.url" target="_blank" rel="noopener noreferrer">
              {{ cve.id }} <span class="arrow" aria-hidden="true">↗</span>
            </a>
          </h3>
          <p v-if="cve.product" class="cve-product">{{ cve.product }}</p>
          <p v-if="cve.summary" class="cve-summary">{{ cve.summary }}</p>
        </div>
      </article>

      <p v-if="!cves.length" class="cve-empty" v-reveal>{{ t('cve.empty') }}</p>
    </div>
  </section>
</template>

<script setup>
// Published CVEs. Entries live in src/content/cves.js.
import { computed } from 'vue';
import PartHeader from '../components/PartHeader.vue';
import { getCves } from '../content/index.js';
import { useI18n } from '../i18n';

defineProps({ num: { type: String, required: true } });

const { locale, t } = useI18n();
const cves = computed(() => getCves(locale.value));
</script>

<style scoped>
.cve-list {
  border-bottom: 1px solid var(--line-strong);
}

.cve {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 24px 0;
  border-top: 1px solid var(--line-strong);
}

@media (min-width: 760px) {
  .cve {
    grid-template-columns: 160px 1fr;
    gap: 28px;
  }
}

.cve-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
  align-self: start;
}

@media (min-width: 760px) {
  .cve-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}

.cve-year {
  font-family: var(--serif);
  font-size: 0.9375rem;
  color: var(--ink-3);
}

.cve-id {
  margin: 0;
  font-family: var(--mono);
  font-size: clamp(1.05rem, 1.8vw, 1.2rem);
  font-weight: 500;
  letter-spacing: 0;
}

.cve-id a {
  transition: color 0.2s;
}

.cve-id a:hover {
  color: var(--accent-ink);
}

.cve-id .arrow {
  font-family: var(--sans);
  font-size: 0.8em;
  color: var(--accent);
}

.cve-product {
  margin: 6px 0 0;
  font-family: var(--serif);
  font-size: 1.0625rem;
  color: var(--ink);
}

.cve-summary {
  max-width: 44rem;
  margin: 10px 0 0;
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--ink-2);
  text-wrap: pretty;
}

.cve-empty {
  margin: 0;
  padding: 20px 0;
  border-top: 1px solid var(--line-strong);
  font-size: 0.9375rem;
  color: var(--ink-3);
}
</style>
