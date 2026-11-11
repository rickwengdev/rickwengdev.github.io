// Who the site is about, where to reach them, and how the site describes itself
// to search engines and AI readers. Used by the app and the build scripts.

export const SITE_URL = 'https://rickwengdev.github.io';

export const LINKS = {
  email: 'rick@saturn-core.com',
  github: 'https://github.com/rickwengdev',
  linkedin: 'https://www.linkedin.com/in/rick-weng-44921a3b5',
  orcid: 'https://orcid.org/0009-0006-4178-347X',
  saturn: 'https://saturn-core.com',
};

export const AUTHOR = {
  name: 'Rick Weng',
  jobTitle: 'Founder of Saturn; independent AI security researcher',
};

// One line, used as the site description in structured data and llms.txt.
export const SITE_DESCRIPTION =
  'Research into how language models and AI agents actually behave, and tools that keep them accountable.';

// A short paragraph for AI readers (meta abstract, structured data, llms.txt).
export const SITE_GEO_SUMMARY =
  'Rick Weng is an independent AI security researcher and the founder of Saturn (saturn-core.com), which provides free tools for secure, accountable AI: Saturn MCP, a gateway that subjects agent tool calls to policy, approval and audit, and Saturn App, an open-source desktop workbench for AI research. The research goals are pretraining and interpretability; every study is preregistered, with code and data released alongside the paper.';

// Topics listed as "knowsAbout" in structured data. Not shown on the page.
export const KNOWS_ABOUT = [
  'AI security',
  'AI safety',
  'Pretraining',
  'Interpretability',
  'Activation steering',
  'Functional states in language models',
  'Agent oversight',
  'Interpretability tooling',
];
