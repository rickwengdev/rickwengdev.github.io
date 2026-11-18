// When the site's content last changed, read from git: the last commit that
// touched src/content or src/locales. Shown to search engines and AI readers as
// "last updated", so they can tell how fresh the facts are. Falls back to now
// when git history is not available.
//
// CONTENT_UPDATED_AT is a full ISO 8601 datetime with a UTC offset
// (e.g. 2026-11-16T09:30:00+08:00), as Google requires for schema.org
// dateModified and og:updated_time. CONTENT_UPDATED is its calendar date
// (YYYY-MM-DD), for human-readable text, <time>, and the sitemap.
import { execSync } from 'child_process';

const ISO_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})$/;

function lastContentCommitDateTime() {
  try {
    const out = execSync('git log -1 --format=%cI -- src/content src/locales', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (ISO_DATETIME.test(out)) return out;
  } catch {
    // not a git checkout
  }
  return new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export const CONTENT_UPDATED_AT = lastContentCommitDateTime();
export const CONTENT_UPDATED = CONTENT_UPDATED_AT.slice(0, 10);
