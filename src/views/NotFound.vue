<template>
  <section class="not-found">
    <div class="container">
      <p class="eyebrow">404</p>
      <h1 class="display">{{ t('notFound.title') }}</h1>
      <p class="lede">{{ t('notFound.body') }}</p>
      <div class="btn-row">
        <router-link to="/" class="btn btn-dark">{{ t('notFound.back') }}</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '../i18n';

const { t } = useI18n();
</script>

<style scoped>
.not-found {
  padding: clamp(80px, 14vw, 160px) 0;
}
</style>
