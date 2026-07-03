export default {
  meta: {
    title: 'Rick — Model Lab',
    description:
      'Rick 反向拆解金融、科技與組織。Kura Finance 與 Prism Capital 創辦人。Model Lab 公開研究模型——分享模型，而非觀點。',
  },
  seo: {
    home: {
      title: 'Rick — Model Lab',
      description:
        'Rick 反向拆解金融、科技與組織。Kura Finance 與 Prism Capital 創辦人。Model Lab 公開研究模型——分享模型，而非觀點。',
      keywords: ['Rick', 'Model Lab', 'Kura Finance', 'Prism Capital', '創辦人', '自託管', '資本效率', '全球金融身份', '資產架構', 'Buy Borrow Die', '思考框架', 'rickwengdev'],
    },
    experience: {
      title: '企業 — Rick',
      description: 'Kura Finance（面向世界的自託管金融帳戶）與 Prism Capital 創辦人——現代金融與前沿的自有資本。',
      keywords: ['企業', 'Kura Finance', 'Prism Capital', '創辦人', '自託管', '家族辦公室'],
    },
    blog: {
      title: 'Model Lab — Rick',
      description: '關於金融、系統、科技與組織的實驗性研究模型——每篇都附假設、失敗條件與版本。',
      keywords: ['Model Lab', '金融', '系統', '科技', '組織', '資本效率', '全球金融身份', '資產架構'],
    },
    blogPost: {
      title: '{title} — Rick',
    },
    notFound: {
      title: '找不到頁面 — Rick',
      description: '您要找的頁面可能已移動或刪除。',
    },
  },
  nav: {
    home: '首頁',
    experience: '企業',
    blog: 'Model Lab',
    github: 'GitHub',
    contact: '聯絡我',
    language: '語言',
    toggleMenu: '切換選單',
  },
  footer: {
    desc: '我反向拆解金融、科技與組織。分享模型，而非觀點。',
    email: 'Email',
    schedule: '預約通話',
  },
  home: {
    hero: {
      eyebrow: 'Model Lab',
      title: 'Rick',
      lede:
        '我反向拆解金融、科技與組織。\n分享模型，而非觀點。',
      mission:
        '建立公司。\n記錄模型。\n公開學習。',
      buildingPrefix: '目前在打造 ',
      buildingLink: 'Kura Finance',
      buildingSuffix: ' — 面向世界的自託管金融帳戶。',
      buildingUrl: 'https://kura-finance.com',
      exploreModels: '探索 Model Lab',
      contact: '聯絡我',
      schedule: '預約對談 ↗',
    },
    philosophy: {
      steps: ['理解', '拆解', '重建', '改進'],
    },
    models: {
      eyebrow: '最新模型',
      title: '仍在演進的模型。',
      subtitle: '每篇文章都是一個案例——附假設、失敗條件與版本。',
      seeAll: '查看全部模型 →',
    },
    researching: {
      eyebrow: '目前研究',
      title: '我正在探索的方向。',
      topics: [
        '資本配置',
        '全球金融身份',
        '組織設計',
        'AI 基礎設施',
      ],
    },
    about: {
      eyebrow: '關於',
      line1: '我不收集知識。',
      line2: '我收集模型。',
      body:
        '每篇文章始於一個問題。\n每個問題變成一個模型。\n每個模型持續更新。',
    },
    projects: {
      eyebrow: '企業',
      title: '我建立的公司。',
      subtitle: '創辦人領導的企業——現代金融與前沿的自有資本。',
      seeAll: '查看企業 →',
      entities: [
        { code: 'KF', name: 'Kura Finance LLC', desc: '現代金融，重新設計。', url: 'https://kura-finance.com' },
        { code: 'PC', name: 'Prism Capital LLC', desc: '前沿的資本。', url: 'https://theprism.ltd' },
      ],
    },
    cta: {
      title: '追蹤模型的演化。',
      body: '公開研究，附明確假設。發現漏洞？歡迎拆穿。',
      exploreModels: '探索 Model Lab',
      schedule: '預約通話',
    },
  },
  experiencePage: {
    eyebrow: '企業',
    title: '我領導的企業。',
    subtitle: '兩家企業的企業家——現代金融與前沿的自有資本。',
    role: 'Founder & CEO',
    period: '2026 – 至今',
    jobs: {
      kura: {
        summary: '現代金融平台——一個帳戶完成儲蓄、消費、投資、增值與全球轉帳。',
        highlights: [
          '創立並主導統一全球金融平台的產品願景。',
          '在現金、投資、增值與消費領域制定隱私優先策略。',
          '與金融科技基礎設施夥伴建立數位資產、收益與支付合作。',
          '以清晰、易用的體驗推動產品設計與上市。',
        ],
      },
      prism: {
        summary: '封閉型合夥，向科技前沿的營運者部署自有資本。',
        highlights: [
          '創立 Wyoming Close LLC，以數十年視野部署自有資本。',
          '在可編程資本、主權算力與前沿協議領域設定投資使命。',
          '與前沿營運者保持創辦人直接互動。',
          '建立機構品牌、數位存在與關聯實體結構。',
        ],
      },
    },
  },
  blog: {
    eyebrow: 'Model Lab',
    title: 'Model Lab',
    subtitle: '實驗性研究模型——附假設、失敗條件與版本，公開發表。',
    rss: 'RSS 訂閱',
    back: '← 返回 Model Lab',
    notFoundTitle: '找不到模型',
    notFoundDesc: '這個模型可能已移動或刪除。',
    backToBlog: '返回 Model Lab',
    empty: '此分類尚無模型。',
    status: {
      experimental: 'Experimental',
      stable: 'Stable',
      deprecated: 'Deprecated',
    },
    categories: {
      all: '全部',
      framework: 'Framework',
      finance: 'Finance',
      systems: 'Systems',
      technology: 'Technology',
      organizations: 'Organizations',
    },
  },
};
