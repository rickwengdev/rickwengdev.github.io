# rickwengdev.github.io

Personal site of Rick Weng (English at `/`, Traditional Chinese at `/zh/`): one page that opens from a wax-sealed envelope into a letter (experience, projects, research, CVEs, contributions), with contact in a reply envelope below. Vue 3 + Vite, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## 指令

```bash
npm install          # 第一次
npm run dev          # 本機預覽，改檔案會即時更新
npm run check        # 檢查 src/content 的資料有沒有填錯
npm run build        # 檢查資料 → 產生 sitemap、llms.txt、Markdown 版 → 建置 → 預先產生給搜尋引擎的頁面
npm run format       # 用 Prettier 統一整個專案的程式碼格式
```

`npm run build` 會先跑 `npm run check`，資料有錯就會停下來並指出哪個檔案的第幾筆。

## 新增或修改資料

所有「清單」都在 `src/content/`，每筆資料的中英文寫在一起：

```js
title: { en: 'Open research', zh: '開放研究' },  // 中英不同
title: 'Saturn App',                            // 中英相同，直接寫字串
```

| 要改什麼                | 檔案                           | 說明                                                                   |
| ----------------------- | ------------------------------ | ---------------------------------------------------------------------- |
| 專案（Saturn）          | `src/content/projects.js`      | 欄位說明在檔案開頭；Logo 放進 `src/assets/logos/`，再填 `logo: '檔名'` |
| 經歷（Kura Finance）    | `src/content/experience.js`    | 和專案相同格式                                                         |
| 論文                    | `src/content/papers.js`        | 審查中用 `placeholder: true`，只顯示年份和主題                         |
| CVE                     | `src/content/cves.js`          | 空的時候顯示「目前尚無公開的 CVE」；連結不填會自動指向 NVD             |
| 開放成果                | `src/content/contributions.js` | `icon` 可用 `paper`、`gate`、`open`、`code`、`planet`                  |
| Email、GitHub、網站描述 | `src/content/site.js`          | 也包含給搜尋引擎和 AI 讀的簡介                                         |

新增一筆就是在陣列裡多加一個 `{ … }`，順序就是頁面上的順序。sitemap、llms.txt、Markdown 版和預先產生的頁面都會在建置時自動跟著更新。

## 給 AI 讀的版本

建置時會從同一份資料自動產生，不需要手動維護：

| 網址             | 內容                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------- |
| `/llms.txt`      | 簡短索引：身分、重點事實，以及下面幾個全文檔的連結                                    |
| `/index.md`      | 整頁內容的 Markdown 版（英文）                                                        |
| `/index.zh.md`   | 整頁內容的 Markdown 版（繁體中文）                                                    |
| `/llms-full.txt` | 中英文全文合併成一個檔案                                                              |
| `/`、`/zh/`      | 英文版與繁體中文版首頁；HTML 本身就有全文（不需執行 JavaScript）和 JSON-LD 結構化資料 |

網址決定語言：`/` 是英文、`/zh/` 是中文。第一次造訪 `/` 時，如果瀏覽器是中文（或之前在切換鈕選過中文），會自動轉到 `/zh/`；語言切換鈕是連到另一個網址的連結。自動化瀏覽器（AI 代理、爬蟲、測試工具）會直接看到信件，不播信封動畫（`src/envelope.js`）。

「最後更新」日期取自 `src/content`、`src/locales` 最後一次 commit 的日期（`scripts/content-date.js`）。

## 修改文字和版面

| 要改什麼                             | 檔案                                                   |
| ------------------------------------ | ------------------------------------------------------ |
| 開頭信件、各區塊標題、按鈕等固定文字 | `src/locales/zh.js`、`src/locales/en.js`（兩個都要改） |
| 區塊順序、新增或移除區塊             | `src/sections/index.js`（編號和頂部選單會自動跟著變）  |
| 各區塊的版面                         | `src/sections/*.vue`、`src/components/*.vue`           |
| 顏色、字型、間距                     | `src/style.css` 開頭的變數                             |
| 信封動畫                             | `src/components/EnvelopeIntro.vue`                     |
| 頁首、頁尾                           | `src/App.vue`                                          |

新增一個區塊：在 `src/sections/` 新增 `.vue`（開頭用 `<PartHeader :num="num" ns="區塊名稱" />`），在 `src/sections/index.js` 加一行，再到兩個 locale 檔加上 `nav.區塊名稱` 和 `區塊名稱: { eyebrow, title }`。給搜尋引擎的版本在 `scripts/pages.js`，給 AI 讀的版本在 `scripts/markdown.js`（Markdown 全文）和 `scripts/generate-llms-txt.js`（llms.txt 索引）。

## 結構

```
src/
  content/     清單資料（中英文寫在一起）
  locales/     固定文字（en.js、zh.js）
  sections/    頁面上的各個區塊；index.js 決定順序
  components/  共用元件（信封、區塊標題、論文、經歷項目…）
  seo/         標題、描述、結構化資料
  style.css    設計變數與共用樣式
scripts/       建置時執行：資料檢查、sitemap、llms.txt、Markdown 版、預先產生頁面
```
