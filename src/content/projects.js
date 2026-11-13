// Projects section: what I am building now, newest first.
//
// Fields (text is a string or { en, zh }):
//   id          unique, lowercase
//   name        shown as the heading; links to `url`
//   url         the project's site
//   logo        optional file name in src/assets/logos/ (e.g. 'saturn.png')
//   logoShape   optional: 'rounded' (default) or 'circle'
//   current     true shows the "Active" / "Current" badge, false "Previous"
//   role, period, tagline, summary
//   highlights  { en: [...], zh: [...] }, one line each

export default [
  {
    id: 'saturn',
    name: 'Saturn',
    url: 'https://saturn-core.com',
    logo: 'saturn.png',
    current: true,
    role: { en: 'Creator & Lead Maintainer', zh: '創建者暨主要維護者' },
    period: { en: 'Sep 2026 – Present', zh: '2026 年 9 月 – 至今' },
    tagline: { en: 'Infrastructure for secure, accountable AI.', zh: '為 AI 打造安全、可問責的基礎工具。' },
    summary: {
      en: 'Saturn focuses on AI security: ensuring that agents operate within the rules people set, and giving teams a clear view of how models actually behave before they rely on them.',
      zh: 'Saturn 專注於 AI 安全，致力於確保 AI 代理的行為符合既定規則，並讓使用者在部署模型之前，充分理解模型的實際行為。',
    },
    highlights: {
      en: [
        'Saturn MCP: a gateway that enforces argument-level policy on every agent tool call, routes sensitive calls for human approval, and maintains a complete audit record.',
        'Saturn App: an open-source (Apache 2.0) desktop workbench for AI research, supporting experiment management, sample-level review, activation patching and SAE feature analysis.',
        'Credentials are held in a post-quantum vault, and audit payloads are encrypted on archival, so they remain unreadable even to the gateway itself.',
        'Both products are free, with full functionality on every account, and are funded through sponsorship.',
      ],
      zh: [
        'Saturn MCP：AI 代理的工具呼叫閘道，對每一次呼叫執行參數層級的政策檢查，將敏感操作交由人工核准，並完整保存稽核紀錄。',
        'Saturn App：以 Apache 2.0 授權開源的 AI 研究桌面工作台，支援實驗管理、逐筆樣本檢視、激活修補與 SAE 特徵分析。',
        '憑證儲存於後量子加密保險庫；稽核資料於歸檔時即加密，即使閘道本身也無法讀取。',
        '兩項產品皆免費提供，所有帳號享有完整功能，營運經費來自贊助。',
      ],
    },
  },
];
