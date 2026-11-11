export default {
  seo: {
    home: {
      title: 'Rick Weng — AI 安全研究者・Saturn 創辦人',
      description:
        'Rick Weng 是 AI 安全研究者暨 Saturn 創辦人，研究目標為預訓練與可解釋性；Saturn 提供免費的 AI 安全工具。',
      keywords: ['Rick Weng', 'AI 安全', '預訓練', '可解釋性', '激活操控', '語言模型', 'AI 代理', 'Saturn', 'Saturn MCP', 'Saturn App'],
    },
    notFound: {
      title: '找不到頁面 — Rick Weng',
      description: '找不到此頁面。',
    },
  },
  nav: {
    home: '首頁',
    experience: '經歷',
    research: '研究',
    contributions: '貢獻',
    contact: '聯繫我',
    language: '語言',
    switchTo: 'EN',
    toggleMenu: '選單',
  },
  envelope: {
    open: '拆開封蠟，閱讀信件',
    skip: '略過',
    scroll: '往下滾動，拆開信件',
    to: '寄件人',
    from: 'Rick Weng',
  },
  letter: {
    from: 'Rick Weng 寄',
    salutation: 'To you,',
    paragraphs: [
      '我是 Rick Weng，從事 AI 安全研究。我的研究聚焦於語言模型與 AI 代理的實際行為：激活操控如何改變模型、模型內部存在哪些功能狀態，以及如何確保代理在既定規則內運作。',
      '我同時創辦並經營 Saturn，提供免費的 AI 安全工具：一套讓代理的每一次工具呼叫都經過政策審查、人工核准與稽核的閘道，以及一個開源的 AI 研究工作台。',
      '我的每項研究都在取得資料前完成預先登記，只與公平的對照組比較，未成立的結果也一併公開。以下依序介紹我創辦的公司、研究工作與開放成果；如需聯繫，回郵信封附在本信下方。',
    ],
    signoffBefore: '',
    signoffAfter: '敬上',
    ps: '附註：Saturn 的所有產品皆免費提供。',
    stamp: 'Rick Weng 的照片',
    postmark: 'RICK WENG · AI SECURITY',
    continue: '繼續閱讀',
  },
  experience: {
    eyebrow: '經歷',
    title: '創業經歷',
    subtitle: '現任 Saturn 創辦人暨執行長，先前創辦 Kura Finance。',
    current: '現任',
    past: '過往',
    visit: '前往網站',
    artTitle: '關口',
    artMeta: '2026 · 生成藝術、canvas',
    jobs: {
      saturn: {
        role: '創辦人暨執行長',
        period: '2026 年 9 月 – 至今',
        tagline: '為 AI 打造安全、可問責的基礎工具。',
        summary:
          'Saturn 專注於 AI 安全，致力於確保 AI 代理的行為符合既定規則，並讓使用者在部署模型之前，充分理解模型的實際行為。',
        highlights: [
          'Saturn MCP：AI 代理的工具呼叫閘道，對每一次呼叫執行參數層級的政策檢查，將敏感操作交由人工核准，並完整保存稽核紀錄。',
          'Saturn App：以 Apache 2.0 授權開源的 AI 研究桌面工作台，支援實驗管理、逐筆樣本檢視、激活修補與 SAE 特徵分析。',
          '憑證儲存於後量子加密保險庫；稽核資料於歸檔時即加密，即使閘道本身也無法讀取。',
          '兩項產品皆免費提供，所有帳號享有完整功能，營運經費來自贊助。',
        ],
      },
      kura: {
        role: '創辦人暨執行長',
        period: '2026 – 2026 年 9 月',
        tagline: '重新設計現代金融服務。',
        summary: '一站式金融平台：以單一帳戶完成儲蓄、消費、投資、收益與跨境轉帳。',
        highlights: [
          '主導產品願景，打造以隱私為優先、整合全球服務的金融平台。',
          '與金融科技基礎設施夥伴建立合作，涵蓋數位資產、收益與支付服務。',
        ],
      },
    },
  },
  research: {
    eyebrow: '研究',
    title: '探究 AI 系統的實際行為。',
    artTitle: '年輪',
    artMeta: '2026 · 生成藝術、canvas',
    papersTitle: '論文',
    goalsTitle: '研究目標',
    goals: ['預訓練', '可解釋性'],
  },
  papersPage: {
    status: {
      review: '雙盲審查中',
      preprint: '預印本',
      published: '已發表',
      progress: '進行中',
    },
    placeholderNote: '本論文目前處於雙盲審查階段。審查結束後，標題、摘要、程式碼與資料將於此公開。',
  },
  contributions: {
    eyebrow: '貢獻',
    title: '開放成果',
    subtitle: '所有人皆可免費使用的工具與研究方法。',
    items: {
      app: {
        title: 'Saturn App',
        kind: '開源 · Apache 2.0',
        body: 'AI 研究桌面工作台：僅比較以相同方法量測的實驗，可逐筆檢視各模型的樣本，並內建激活修補與 SAE 特徵分析。每個版本皆附檢查碼與經簽章的建置來源證明。',
        link: 'GitHub 原始碼',
      },
      mcp: {
        title: 'Saturn MCP',
        kind: '免費使用',
        body: '管理 AI 代理權限的閘道：依版本化政策對每一次工具呼叫進行參數層級的檢查，敏感操作交由人工核准，所有決策皆完整記錄。',
        link: '了解更多',
      },
      open: {
        title: '開放研究',
        kind: '研究方法',
        body: '每篇論文皆附上預先登記、程式碼與原始資料，包含未成立的結果，任何人都能獨立驗證。',
      },
      github: {
        title: '程式碼',
        kind: 'GitHub',
        body: '研究實驗、工具，以及本網站的原始碼。',
        link: 'github.com/rickwengdev',
      },
    },
  },
  contact: {
    eyebrow: '聯繫我',
    title: '期待您的來信。',
    body: '歡迎就研究合作、論文內容或 Saturn 相關事宜與我聯繫，每封來信我都會親自閱讀。',
    to: '收件人',
    email: '寄送電子郵件',
    github: 'GitHub',
    saturn: 'Saturn',
  },
  footer: {
    desc: '研究語言模型與 AI 代理的實際行為，並打造讓 AI 可問責的工具。',
    motto: '真正安全的系統，是安靜的。',
  },
  notFound: {
    title: '找不到此頁面。',
    body: '您要找的頁面不存在，或已移至其他位置。',
    back: '返回首頁',
  },
};
