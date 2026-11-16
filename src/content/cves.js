// CVE section: published CVEs, newest first.
// Add an entry only once the CVE is public (e.g. on nvd.nist.gov).
// While the list is empty, the section shows "No published CVEs yet."
//
// Fields (text is a string or { en, zh }):
//   id        'CVE-YYYY-NNNNN'
//   year
//   product   affected product
//   severity  'critical' | 'high' | 'medium' | 'low'
//   cvss      optional score, e.g. 8.1
//   summary   one sentence
//   url       optional; defaults to the NVD page for `id`
//
// Example:
// {
//   id: 'CVE-2027-12345',
//   year: 2027,
//   product: 'Example Agent Framework',
//   severity: 'high',
//   cvss: 8.1,
//   summary: { en: 'Prompt injection in tool output leads to …', zh: '工具輸出中的提示注入導致……' },
// },

export default [];
