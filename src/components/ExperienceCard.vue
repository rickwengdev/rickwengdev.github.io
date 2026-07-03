<template>
  <article class="experience-card">
    <div class="experience-header">
      <div class="experience-meta">
        <h3 class="experience-company">
          <a :href="job.url" target="_blank" rel="noopener noreferrer" class="company-link">
            {{ job.company }}
            <span class="link-arrow">↗</span>
          </a>
        </h3>
        <p class="experience-role">{{ job.role }}</p>
      </div>
      <span class="experience-period">{{ job.period }}</span>
    </div>
    <p class="experience-summary">{{ job.summary }}</p>
    <ul class="experience-highlights">
      <li v-for="item in job.highlights" :key="item">{{ item }}</li>
    </ul>
  </article>
</template>

<script setup>
defineProps({
  job: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.experience-card {
  padding: 32px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.experience-card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
}

.experience-header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px 24px;
  margin-bottom: 16px;
}

.experience-company {
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 500;
  margin: 0 0 4px;
  letter-spacing: -0.01em;
}

.company-link {
  color: var(--text);
  transition: color 0.2s;
}

.company-link:hover {
  color: var(--accent);
}

.link-arrow {
  font-size: 0.875rem;
  margin-left: 4px;
  opacity: 0.5;
}

.experience-role {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--accent);
  margin: 0;
}

.experience-period {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.experience-summary {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-secondary);
  margin: 0 0 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.experience-highlights {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.experience-highlights li {
  position: relative;
  padding-left: 18px;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.experience-highlights li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--accent);
}

@media (max-width: 640px) {
  .experience-card {
    padding: 20px;
  }

  .experience-company {
    font-size: 1.125rem;
  }

  .experience-period {
    width: 100%;
  }
}
</style>
