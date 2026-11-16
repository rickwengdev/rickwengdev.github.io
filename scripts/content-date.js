// The date the site's content last changed (YYYY-MM-DD), read from git:
// the last commit that touched src/content or src/locales. Shown to search
// engines and AI readers as "last updated", so they can tell how fresh the
// facts are. Falls back to today when git history is not available.
import { execSync } from 'child_process';

function lastContentCommitDate() {
  try {
    const out = execSync('git log -1 --format=%cs -- src/content src/locales', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out;
  } catch {
    // not a git checkout
  }
  return new Date().toISOString().slice(0, 10);
}

export const CONTENT_UPDATED = lastContentCommitDate();
