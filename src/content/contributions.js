// Contributions section: open tools and practices, in display order.
//
// Fields (text is a string or { en, zh }):
//   id     unique, lowercase
//   icon   one of the names in src/components/LineIcon.vue: 'paper', 'gate', 'open', 'code'
//   url    optional; the whole card links here
//   kind   small label above the title
//   title, body

import { LINKS } from './site.js';

export default [
  {
    id: 'app',
    icon: 'paper',
    url: 'https://github.com/Saturn-Technology-Project/Saturn-App',
    kind: { en: 'Open source · Apache 2.0', zh: '開源 · Apache 2.0' },
    title: 'Saturn App',
    body: {
      en: 'A desktop workbench for AI research: experiments are compared only when measured identically, every sample from every model can be inspected, and activation patching and SAE features are built in. Each release ships with a checksum and signed build provenance.',
      zh: 'AI 研究桌面工作台：僅比較以相同方法量測的實驗，可逐筆檢視各模型的樣本，並內建激活修補與 SAE 特徵分析。每個版本皆附檢查碼與經簽章的建置來源證明。',
    },
  },
  {
    id: 'mcp',
    icon: 'gate',
    url: 'https://saturn-core.com/mcp',
    kind: { en: 'Free to use', zh: '免費使用' },
    title: 'Saturn MCP',
    body: {
      en: 'A gateway that governs what AI agents may do: every tool call is checked against versioned policy down to its arguments, sensitive calls are routed for human approval, and every decision is recorded.',
      zh: '管理 AI 代理權限的閘道：依版本化政策對每一次工具呼叫進行參數層級的檢查，敏感操作交由人工核准，所有決策皆完整記錄。',
    },
  },
  {
    id: 'open',
    icon: 'open',
    kind: { en: 'Methodology', zh: '研究方法' },
    title: { en: 'Open research', zh: '開放研究' },
    body: {
      en: 'Each paper is published with its preregistration, code and raw data, including results that did not hold, so the findings can be independently verified.',
      zh: '每篇論文皆附上預先登記、程式碼與原始資料，包含未成立的結果，任何人都能獨立驗證。',
    },
  },
  {
    id: 'github',
    icon: 'code',
    url: LINKS.github,
    kind: 'GitHub',
    title: { en: 'Code', zh: '程式碼' },
    body: {
      en: 'Research experiments, tools, and the source code for this website.',
      zh: '研究實驗、工具，以及本網站的原始碼。',
    },
  },
];
