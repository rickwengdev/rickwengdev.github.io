<template>
  <div>
    <EnvelopeIntro v-if="sealed" @leaving="unfolding = true" @done="onOpened" />

    <!-- One long letter; contact sits beside it on the desk, with the return envelope. -->
    <LetterSection :unfolding="unfolding" :waiting="sealed">
      <ExperienceSection />
      <ResearchSection />
      <ContributionsSection />
      <template #after><ContactSection /></template>
    </LetterSection>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EnvelopeIntro from '../components/EnvelopeIntro.vue';
import LetterSection from '../sections/LetterSection.vue';
import ExperienceSection from '../sections/ExperienceSection.vue';
import ResearchSection from '../sections/ResearchSection.vue';
import ContributionsSection from '../sections/ContributionsSection.vue';
import ContactSection from '../sections/ContactSection.vue';
import { markOpened, sealed } from '../envelope.js';

const unfolding = ref(false);

function onOpened() {
  window.scrollTo(0, 0);
  unfolding.value = true;
  markOpened();
}
</script>
