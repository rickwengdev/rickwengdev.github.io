<template>
  <div class="home">
    <section class="hero">
      <div class="marketing-container hero-grid">
        <div class="hero-content">
          <p class="section-eyebrow">{{ t('home.hero.eyebrow') }}</p>
          <h1 class="hero-title">
            <span>{{ t('home.hero.titleLine1') }}</span>
            <span class="hero-title-accent">{{ t('home.hero.titleAccent') }}</span>
          </h1>
          <p class="hero-lede">{{ t('home.hero.lede') }}</p>
          <div class="hero-actions">
            <button class="btn-primary" @click="$router.push('/experience')">{{ t('home.hero.viewCompanies') }}</button>
            <a class="btn-secondary" href="mailto:office@theprism.ltd">{{ t('home.hero.contact') }}</a>
          </div>
          <a href="https://calendar.app.google/rsG6vBBtfhRBfRHc9" target="_blank" class="hero-appointment">
            {{ t('home.hero.schedule') }}
          </a>
        </div>

        <div class="hero-visual">
          <div class="avatar-frame">
            <img :src="avatarImage" :alt="t('seo.home.title')" class="avatar-image" />
          </div>
          <div class="hero-stats">
            <div v-for="stat in stats" :key="stat.label" class="stat-cell">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="marketing-container">
        <p class="section-eyebrow">{{ t('home.experience.eyebrow') }}</p>
        <h2 class="section-title">{{ t('home.experience.title') }}</h2>
        <p class="section-subtitle">{{ t('home.experience.subtitle') }}</p>

        <div class="experience-list">
          <ExperienceCard v-for="job in experiences" :key="job.id" :job="job" />
        </div>
        <div class="section-action">
          <button class="btn-secondary" @click="$router.push('/experience')">{{ t('home.experience.seeAll') }}</button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="marketing-container">
        <p class="section-eyebrow">{{ t('home.mandate.eyebrow') }}</p>
        <h2 class="section-title">{{ t('home.mandate.title') }}</h2>
        <p class="section-subtitle">{{ t('home.mandate.subtitle') }}</p>

        <div class="feature-grid">
          <div v-for="item in mandate" :key="item.code" class="feature-card">
            <div class="feature-code">{{ item.code }}</div>
            <h3 class="feature-title">{{ item.title }}</h3>
            <p class="feature-body">{{ item.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="marketing-container">
        <p class="section-eyebrow">{{ t('home.principles.eyebrow') }}</p>
        <h2 class="section-title">{{ t('home.principles.title') }}</h2>

        <div class="principles-grid">
          <div v-for="p in principles" :key="p.title" class="principle-card">
            <h3 class="principle-title">{{ p.title }}</h3>
            <p class="principle-body">{{ p.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="marketing-container stack-section">
        <p class="section-eyebrow">{{ t('home.portfolio.eyebrow') }}</p>
        <h2 class="section-title">{{ t('home.portfolio.title') }}</h2>
        <p class="section-subtitle">{{ t('home.portfolio.subtitle') }}</p>
        <div class="entity-row">
          <a
            v-for="entity in entities"
            :key="entity.name"
            :href="entity.url"
            target="_blank"
            rel="noopener noreferrer"
            class="entity-card"
          >
            <span class="entity-code">{{ entity.code }}</span>
            <span class="entity-name">{{ entity.name }}</span>
            <span class="entity-desc">{{ entity.desc }}</span>
          </a>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="marketing-container">
        <p class="section-eyebrow">{{ t('home.approach.eyebrow') }}</p>
        <h2 class="section-title">{{ t('home.approach.title') }}</h2>

        <div class="compare-grid">
          <div
            v-for="col in compareColumns"
            :key="col.title"
            class="compare-col"
            :class="{ highlight: col.highlight }"
          >
            <h3 class="compare-title">{{ col.title }}</h3>
            <ul class="compare-list">
              <li v-for="item in col.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section cta-section">
      <div class="marketing-container cta-inner">
        <h2 class="cta-title">{{ t('home.cta.title') }}</h2>
        <p class="cta-body">{{ t('home.cta.body') }}</p>
        <div class="hero-actions">
          <button class="btn-primary" @click="$router.push('/experience')">{{ t('home.cta.viewCompanies') }}</button>
          <a class="btn-secondary" href="https://calendar.app.google/rsG6vBBtfhRBfRHc9" target="_blank">
            {{ t('home.cta.schedule') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import avatarImage from '../assets/avatar.jpg';
import ExperienceCard from '../components/ExperienceCard.vue';
import { getExperiences } from '../data/experience.js';
import { useI18n } from '../i18n';

const { locale, t, tm } = useI18n();

const experiences = computed(() => getExperiences(locale.value));

const stats = computed(() => [
  { value: '2', label: t('home.stats.companies') },
  { value: '2026', label: t('home.stats.founded') },
  { value: t('home.stats.global'), label: t('home.stats.ambition') },
]);

const mandate = computed(() => tm('home.mandate.items') ?? []);
const principles = computed(() => tm('home.principles.items') ?? []);
const entities = computed(() => tm('home.portfolio.entities') ?? []);
const compareColumns = computed(() => tm('home.approach.columns') ?? []);
</script>

<style scoped>
.home {
  overflow-x: hidden;
}

.hero {
  padding: clamp(80px, 12vw, 140px) 0 clamp(64px, 8vw, 100px);
  border-bottom: 1px solid var(--border);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

@media (min-width: 900px) {
  .hero-grid {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 64px;
  }
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5.5vw, 3.75rem);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin: 0 0 24px;
  color: var(--text);
}

.hero-title span {
  display: block;
}

.hero-title-accent {
  color: var(--accent);
}

.hero-lede {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--text-secondary);
  max-width: 520px;
  margin: 0 0 32px;
  white-space: pre-line;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-appointment {
  display: inline-block;
  margin-top: 20px;
  font-size: 0.8125rem;
  color: var(--text-muted);
  border-bottom: 1px dotted transparent;
  transition: color 0.2s, border-color 0.2s;
}

.hero-appointment:hover {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.hero-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.avatar-frame {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-lg);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  width: 100%;
  max-width: 360px;
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
}

.stat-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 20px 12px;
  background: var(--bg-elevated);
}

.stat-value {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text);
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  text-align: center;
}

.section {
  padding: var(--section-py) 0;
}

.section-alt {
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 48px;
}

.section-action {
  margin-top: 32px;
  text-align: center;
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 48px;
}

@media (min-width: 640px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .feature-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.principles-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 48px;
}

@media (min-width: 768px) {
  .principles-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.principle-card {
  padding: 32px 0 0;
  border-top: 1px solid var(--border);
}

.principle-title {
  font-size: 1.0625rem;
  font-weight: 600;
  margin: 0 0 10px;
  color: var(--text);
}

.principle-body {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-secondary);
  margin: 0;
}

.stack-section {
  text-align: center;
}

.stack-section .section-subtitle {
  margin: 0 auto;
}

.entity-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 40px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 640px) {
  .entity-row {
    grid-template-columns: repeat(2, 1fr);
    max-width: none;
  }
}

.entity-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px 24px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  text-align: center;
}

.entity-card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.entity-code {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: var(--accent);
}

.entity-name {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text);
}

.entity-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.compare-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-top: 48px;
}

@media (min-width: 768px) {
  .compare-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.compare-col {
  padding: 28px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 12px;
}

.compare-col.highlight {
  border-color: rgba(124, 92, 252, 0.4);
  background: var(--accent-subtle);
}

.compare-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 20px;
  color: var(--text);
}

.compare-col.highlight .compare-title {
  color: var(--accent);
}

.compare-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.compare-list li {
  position: relative;
  padding-left: 16px;
  margin-bottom: 12px;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.compare-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--text-muted);
}

.cta-section {
  border-top: 1px solid var(--border);
}

.cta-inner {
  text-align: center;
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
}

.cta-body {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0 0 32px;
}

.cta-inner .hero-actions {
  justify-content: center;
}

@media (max-width: 640px) {
  .hero {
    padding: 56px 0 48px;
  }

  .hero-grid {
    gap: 32px;
  }

  .hero-title {
    font-size: clamp(2rem, 9vw, 2.75rem);
  }

  .hero-lede {
    font-size: 1rem;
    margin-bottom: 24px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-stats {
    max-width: 100%;
  }

  .stat-cell {
    padding: 16px 8px;
  }

  .stat-value {
    font-size: 1.25rem;
  }

  .stat-label {
    font-size: 0.625rem;
  }

  .avatar-frame {
    width: 160px;
    height: 160px;
  }

  .experience-list,
  .feature-grid,
  .principles-grid,
  .compare-grid {
    margin-top: 32px;
  }

  .compare-col {
    padding: 20px;
  }

  .entity-card {
    padding: 24px 20px;
  }

  .principle-card {
    padding-top: 24px;
  }

  .section-action .btn-secondary {
    width: 100%;
  }
}
</style>
