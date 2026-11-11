// Checks src/content before every build, so a typo in the data fails here with
// a clear message instead of showing up as a broken page.
// Run on its own with `npm run check`.

import fs from 'fs';
import { RAW } from '../src/content/index.js';
import { isLocalized } from '../src/content/localize.js';

const LOGO_DIR = new URL('../src/assets/logos/', import.meta.url);
const ICONS = [
  ...fs
    .readFileSync(new URL('../src/components/LineIcon.vue', import.meta.url), 'utf8')
    .matchAll(/name === '([a-z-]+)'/g),
].map((m) => m[1]);

const errors = [];

function check(file, entries, rules) {
  const ids = new Set();
  entries.forEach((entry, index) => {
    const where = `src/content/${file} #${index + 1}${entry.id ? ` (${entry.id})` : ''}`;
    const fail = (message) => errors.push(`${where}: ${message}`);

    if (entry.id) {
      if (ids.has(entry.id)) fail(`id "${entry.id}" is used twice`);
      ids.add(entry.id);
    }

    for (const field of rules.required ?? []) {
      if (entry[field] === undefined || entry[field] === '') fail(`missing "${field}"`);
    }

    // A field written as { en, zh } needs both languages.
    for (const [field, value] of Object.entries(entry)) {
      if (isLocalized(value) && (value.zh === undefined || value.zh === '')) fail(`"${field}" has en but no zh`);
      if (value && typeof value === 'object' && !Array.isArray(value) && 'zh' in value && !('en' in value)) {
        fail(`"${field}" has zh but no en`);
      }
    }

    for (const [field, allowed] of Object.entries(rules.oneOf ?? {})) {
      if (entry[field] !== undefined && !allowed.includes(entry[field])) {
        fail(`"${field}" is "${entry[field]}", expected one of: ${allowed.join(', ')}`);
      }
    }

    for (const field of ['url']) {
      if (entry[field] && !/^(https?:\/\/|mailto:)/.test(entry[field])) fail(`"${field}" should start with https://`);
    }

    rules.extra?.(entry, fail);
  });
}

const work = {
  required: ['id', 'name', 'url', 'role', 'period', 'tagline', 'summary'],
  oneOf: { logoShape: ['rounded', 'circle'] },
  extra(entry, fail) {
    if (entry.logo && !fs.existsSync(new URL(entry.logo, LOGO_DIR)))
      fail(`logo "${entry.logo}" is not in src/assets/logos/`);
    if (entry.highlights && !Array.isArray(entry.highlights) && !isLocalized(entry.highlights)) {
      fail('"highlights" should be a list or { en: [...], zh: [...] }');
    }
  },
};

check('experience.js', RAW.experience, work);
check('projects.js', RAW.projects, work);

check('contributions.js', RAW.contributions, {
  required: ['id', 'icon', 'kind', 'title', 'body'],
  oneOf: { icon: ICONS },
});

check('papers.js', RAW.papers, {
  required: ['id', 'year', 'status', 'title'],
  oneOf: { status: ['review', 'preprint', 'published', 'progress'] },
  extra(entry, fail) {
    (entry.links ?? []).forEach((link, i) => {
      if (!link.label || !link.url) fail(`links[${i}] needs both "label" and "url"`);
    });
  },
});

check('cves.js', RAW.cves, {
  required: ['id', 'year', 'severity'],
  oneOf: { severity: ['critical', 'high', 'medium', 'low'] },
  extra(entry, fail) {
    if (entry.id && !/^CVE-\d{4}-\d{4,}$/.test(entry.id)) fail(`id "${entry.id}" should look like CVE-2027-12345`);
    if (entry.cvss !== undefined && !(typeof entry.cvss === 'number' && entry.cvss >= 0 && entry.cvss <= 10)) {
      fail('"cvss" should be a number from 0 to 10');
    }
  },
});

if (errors.length) {
  console.error(`✗ Content check found ${errors.length} problem(s):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log('✓ Content check passed');
