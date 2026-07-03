<template>
  <div class="home">
    <section class="hero">
      <div class="marketing-container hero-grid">
        <div class="hero-content">
          <p class="section-eyebrow">{{ t('home.hero.eyebrow') }}</p>
          <h1 class="hero-title">{{ t('home.hero.title') }}</h1>
          <p class="hero-lede">{{ t('home.hero.lede') }}</p>
          <p class="hero-mission">{{ t('home.hero.mission') }}</p>
          <p class="hero-building">
            {{ t('home.hero.buildingPrefix') }}<a :href="t('home.hero.buildingUrl')" target="_blank" rel="noopener noreferrer">{{ t('home.hero.buildingLink') }}</a>{{ t('home.hero.buildingSuffix') }}
          </p>

          <div class="philosophy-strip">
            <span
              v-for="(step, index) in philosophySteps"
              :key="step"
              class="philosophy-step"
            >
              <span class="step-text">{{ step }}</span>
              <span v-if="index < philosophySteps.length - 1" class="step-arrow" aria-hidden="true">→</span>
            </span>
          </div>

          <div class="hero-actions">
            <button class="btn-primary" @click="$router.push('/blog')">{{ t('home.hero.exploreModels') }}</button>
            <a class="btn-secondary" href="mailto:office@theprism.ltd">{{ t('home.hero.contact') }}</a>
          </div>
          <a href="https://calendar.app.google/rsG6vBBtfhRBfRHc9" target="_blank" class="hero-appointment">
            {{ t('home.hero.schedule') }}
          </a>
        </div>

        <div class="hero-visual">
          <div class="avatar-frame">
            <img :src="avatarImage" :alt="t('home.hero.title')" class="avatar-image" />
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="marketing-container">
        <p class="section-eyebrow">{{ t('home.models.eyebrow') }}</p>
        <h2 class="section-title">{{ t('home.models.title') }}</h2>
        <p class="section-subtitle">{{ t('home.models.subtitle') }}</p>

        <div class="model-list">
          <ModelCard v-for="post in modelLabPosts" :key="post.id" :post="post" />
        </div>
        <div class="section-action">
          <button class="btn-secondary" @click="$router.push('/blog')">{{ t('home.models.seeAll') }}</button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="marketing-container researching-grid">
        <div class="researching-copy">
          <p class="section-eyebrow">{{ t('home.researching.eyebrow') }}</p>
          <h2 class="section-title">{{ t('home.researching.title') }}</h2>
        </div>
        <ul class="researching-list">
          <li v-for="topic in researchingTopics" :key="topic" class="researching-item">
            <span class="researching-check" aria-hidden="true">✓</span>
            {{ topic }}
          </li>
        </ul>
      </div>
    </section>

    <section class="section section-alt about-section">
      <div class="marketing-container about-inner">
        <p class="section-eyebrow">{{ t('home.about.eyebrow') }}</p>
        <h2 class="about-headline">
          <span>{{ t('home.about.line1') }}</span>
          <span class="about-accent">{{ t('home.about.line2') }}</span>
        </h2>
        <p class="about-body">{{ t('home.about.body') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="marketing-container stack-section">
        <p class="section-eyebrow">{{ t('home.projects.eyebrow') }}</p>
        <h2 class="section-title">{{ t('home.projects.title') }}</h2>
        <p class="section-subtitle">{{ t('home.projects.subtitle') }}</p>
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
        <div class="section-action">
          <button class="btn-secondary" @click="$router.push('/experience')">{{ t('home.projects.seeAll') }}</button>
        </div>
      </div>
    </section>

    <section class="section cta-section">
      <div class="marketing-container cta-inner">
        <h2 class="cta-title">{{ t('home.cta.title') }}</h2>
        <p class="cta-body">{{ t('home.cta.body') }}</p>
        <div class="hero-actions">
          <button class="btn-primary" @click="$router.push('/blog')">{{ t('home.cta.exploreModels') }}</button>
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
import ModelCard from '../components/ModelCard.vue';
import { getModelLabCaseStudies } from '../data/posts/index.js';
import { useI18n } from '../i18n';

const { locale, t, tm } = useI18n();

const modelLabPosts = computed(() => getModelLabCaseStudies(locale.value));
const philosophySteps = computed(() => tm('home.philosophy.steps') ?? []);
const researchingTopics = computed(() => tm('home.researching.topics') ?? []);
const entities = computed(() => tm('home.projects.entities') ?? []);
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
    grid-template-columns: 1.15fr 0.85fr;
    gap: 64px;
  }
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 4.25rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.04em;
  margin: 0 0 24px;
  color: var(--text);
}

.hero-lede {
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--text-secondary);
  max-width: 520px;
  margin: 0 0 16px;
  white-space: pre-line;
}

.hero-mission {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--text);
  max-width: 520px;
  margin: 0 0 12px;
  white-space: pre-line;
  font-weight: 500;
}

.hero-building {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-secondary);
  max-width: 520px;
  margin: 0 0 24px;
}

.hero-building a {
  color: var(--accent);
  font-weight: 500;
  border-bottom: 1px solid rgba(124, 92, 252, 0.35);
  transition: border-color 0.2s;
}

.hero-building a:hover {
  border-bottom-color: var(--accent);
}

.philosophy-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 6px;
  margin-bottom: 32px;
  max-width: 520px;
}

.philosophy-step {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.step-text {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--accent);
}

.step-arrow {
  font-size: 0.75rem;
  color: var(--text-muted);
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
  width: 220px;
  height: 220px;
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

.section {
  padding: var(--section-py) 0;
}

.section-alt {
  background: var(--bg-elevated);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.model-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 48px;
}

.section-action {
  margin-top: 32px;
  text-align: center;
}

.researching-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;
}

@media (min-width: 768px) {
  .researching-grid {
    grid-template-columns: 1fr 1fr;
    gap: 64px;
  }
}

.researching-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.researching-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  color: var(--text);
}

.researching-check {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--accent);
  flex-shrink: 0;
}

.about-inner {
  max-width: 640px;
}

.about-headline {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin: 0 0 20px;
  color: var(--text);
}

.about-headline span {
  display: block;
}

.about-accent {
  color: var(--accent);
}

.about-body {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text-secondary);
  margin: 0;
  white-space: pre-line;
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
    font-size: clamp(2.5rem, 12vw, 3.25rem);
  }

  .hero-lede,
  .hero-mission {
    font-size: 1rem;
  }

  .hero-lede {
    margin-bottom: 12px;
  }

  .hero-mission {
    margin-bottom: 20px;
  }

  .philosophy-strip {
    margin-bottom: 24px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .avatar-frame {
    width: 160px;
    height: 160px;
  }

  .model-list {
    margin-top: 32px;
  }

  .entity-card {
    padding: 24px 20px;
  }

  .section-action .btn-secondary {
    width: 100%;
  }
}
</style>
