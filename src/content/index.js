// Everything the page lists, in the visitor's language.
// Edit the data in the files next to this one; this file only reads them.
// Shared by the app and the build scripts, so no browser-only APIs here.

import contributions from './contributions.js';
import cves from './cves.js';
import experience from './experience.js';
import papers from './papers.js';
import projects from './projects.js';
import { localize, localizeEntry } from './localize.js';

export { localize };
export * from './site.js';

export const getExperience = (locale) => experience.map((entry) => localizeEntry(entry, locale));

export const getProjects = (locale) => projects.map((entry) => localizeEntry(entry, locale));

export const getContributions = (locale) => contributions.map((entry) => localizeEntry(entry, locale));

export function getPapers(locale) {
  return papers.map((paper) => ({
    ...localizeEntry(paper, locale),
    links: (paper.links ?? []).map((link) => ({ ...link, label: localize(link.label, locale) })),
  }));
}

// Papers that may appear in structured data and llms.txt.
export const getPublicPapers = (locale = 'en') => getPapers(locale).filter((paper) => !paper.placeholder);

export function getCves(locale) {
  return cves.map((cve) => ({
    ...localizeEntry(cve, locale),
    url: cve.url ?? `https://nvd.nist.gov/vuln/detail/${cve.id}`,
  }));
}

// Every company or project I founded, for structured data.
// `description` is a string or { en, zh }.
export const ORGANIZATIONS = [...projects, ...experience].map(({ id, name, url, current, summary }) => ({
  id,
  name,
  url,
  current,
  description: summary,
}));

// Contributions marked `software: true`, for structured data.
export const SOFTWARE = contributions
  .filter((entry) => entry.software)
  .map(({ id, title, url, body, license }) => ({ id, name: title, url, description: body, license }));

// Raw lists, for the content check.
export const RAW = { experience, projects, contributions, papers, cves };
