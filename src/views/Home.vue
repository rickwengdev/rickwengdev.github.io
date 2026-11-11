<template>
  <div>
    <EnvelopeIntro v-if="sealed" @leaving="unfolding = true" @done="onOpened" />

    <!-- One long letter; contact sits beside it on the desk, with the return envelope. -->
    <LetterSection :unfolding="unfolding" :waiting="sealed">
      <component
        :is="section.component"
        v-for="(section, i) in LETTER_SECTIONS"
        :id="section.id"
        :key="section.id"
        :num="sectionNumber(i)"
        v-bind="section.props"
      />
      <template #after><ContactSection /></template>
    </LetterSection>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import EnvelopeIntro from '../components/EnvelopeIntro.vue';
import LetterSection from '../sections/LetterSection.vue';
import ContactSection from '../sections/ContactSection.vue';
import { LETTER_SECTIONS, sectionNumber } from '../sections/index.js';
import { markOpened, sealed } from '../envelope.js';

const unfolding = ref(false);

function onOpened() {
  window.scrollTo(0, 0);
  unfolding.value = true;
  markOpened();
}
</script>
