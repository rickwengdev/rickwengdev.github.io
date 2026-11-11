<template>
  <!-- Contact lives off the letter, on the desk, with the return envelope. -->
  <section id="contact" class="contact">
    <ReplyEnvelope />

    <div class="contact-text">
      <p class="eyebrow" v-reveal>{{ t('contact.eyebrow') }}</p>
      <h2 class="contact-title" v-reveal="80">{{ t('contact.title') }}</h2>
      <p class="contact-body" v-reveal="160">{{ t('contact.body') }}</p>

      <div class="btn-row" v-reveal="240">
        <a :href="`mailto:${LINKS.email}`" class="btn btn-dark">{{ t('contact.email') }}</a>
      </div>
      <div class="link-row" v-reveal="320">
        <a :href="LINKS.github" target="_blank" rel="noopener noreferrer" class="quiet-link">
          {{ t('contact.github') }} <span class="arrow" aria-hidden="true">↗</span>
        </a>
        <a :href="LINKS.linkedin" target="_blank" rel="noopener noreferrer" class="quiet-link">
          {{ t('contact.linkedin') }} <span class="arrow" aria-hidden="true">↗</span>
        </a>
        <a :href="LINKS.saturn" target="_blank" rel="noopener noreferrer" class="quiet-link">
          {{ t('contact.saturn') }} <span class="arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import ReplyEnvelope from '../components/ReplyEnvelope.vue';
import { LINKS } from '../seo/schema.js';
import { useI18n } from '../i18n';

const { t } = useI18n();
</script>

<style scoped>
.contact {
  padding-top: clamp(36px, 6vw, 64px);
}

.contact-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 34rem;
  margin: clamp(40px, 6vw, 56px) auto 0;
  text-align: center;
}

.eyebrow {
  margin-bottom: 14px;
}

.contact-title {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(1.75rem, 3.4vw, 2.3rem);
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.015em;
}

.contact-body {
  margin: 14px 0 0;
  font-size: clamp(1rem, 1.4vw, 1.0625rem);
  line-height: 1.75;
  color: var(--ink-2);
  text-wrap: pretty;
}

.btn-row,
.link-row {
  justify-content: center;
}

.btn-row {
  margin-top: 28px;
}

.link-row {
  gap: 12px 28px;
  margin-top: 22px;
}
</style>
