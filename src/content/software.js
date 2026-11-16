// Free software published by Rick Weng, for structured data only
// (schema.org SoftwareApplication in the page's JSON-LD). Nothing here is
// shown on the page; the projects section describes these tools to visitors.
//
// Fields (text is a string or { en, zh }):
//   id           unique, lowercase
//   name, url, description
//   license      optional; URL of the licence

export default [
  {
    id: 'app',
    name: 'Saturn App',
    url: 'https://github.com/Saturn-Technology-Project/Saturn-App',
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
    description: {
      en: 'A desktop workbench for AI research: experiments are compared only when measured identically, every sample from every model can be inspected, and activation patching and SAE features are built in. Each release ships with a checksum and signed build provenance.',
      zh: 'AI 研究桌面工作台：僅比較以相同方法量測的實驗，可逐筆檢視各模型的樣本，並內建激活修補與 SAE 特徵分析。每個版本皆附檢查碼與經簽章的建置來源證明。',
    },
  },
  {
    id: 'mcp',
    name: 'Saturn MCP',
    url: 'https://saturn-core.com/mcp',
    description: {
      en: 'A gateway that governs what AI agents may do: every tool call is checked against versioned policy down to its arguments, sensitive calls are routed for human approval, and every decision is recorded.',
      zh: '管理 AI 代理權限的閘道：依版本化政策對每一次工具呼叫進行參數層級的檢查，敏感操作交由人工核准，所有決策皆完整記錄。',
    },
  },
];
