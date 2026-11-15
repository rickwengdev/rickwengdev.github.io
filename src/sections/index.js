// The sections inside the letter, in order. Their numbers (01, 02…) and the
// header navigation follow this list, so reordering or adding a section only
// happens here. `id` is the #anchor; its nav label is `nav.<id>` in the locales.
// Contact sits outside the letter and is added to the nav separately.
// The CVE and contributions sections are left out entirely while their lists are empty.

import { RAW } from '../content/index.js';
import ContributionsSection from './ContributionsSection.vue';
import CveSection from './CveSection.vue';
import ResearchSection from './ResearchSection.vue';
import WorkSection from './WorkSection.vue';

export const LETTER_SECTIONS = [
  { id: 'experience', component: WorkSection, props: { kind: 'experience' } },
  { id: 'projects', component: WorkSection, props: { kind: 'projects' } },
  { id: 'research', component: ResearchSection },
  // Shown only once src/content/cves.js has at least one public CVE.
  ...(RAW.cves.length ? [{ id: 'cve', component: CveSection }] : []),
  // Shown only once src/content/contributions.js has at least one entry.
  ...(RAW.contributions.length ? [{ id: 'contributions', component: ContributionsSection }] : []),
];

export const sectionNumber = (index) => String(index + 1).padStart(2, '0');
