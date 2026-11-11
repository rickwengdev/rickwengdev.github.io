# rickwengdev.github.io

Personal site of Rick Weng: one page that opens from a wax-sealed envelope into a letter, then experience, research, contributions and contact. Vue 3 + Vite, deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Develop

```bash
npm install
npm run dev
```

`npm run build` generates `public/sitemap.xml` and `public/llms.txt`, builds with Vite, then prerenders static HTML for `/` (plus redirect pages that send `/papers`, `/work`, `/blog` and `/experience` to the matching section).

## Editing content

| What | Where |
|---|---|
| Papers | `src/data/papers.js`: one entry per paper; instructions at the top of the file |
| Experience | `src/data/work.js` (names and links), text in `src/locales/*.js` under `experience.jobs` |
| Sections | `src/sections/*.vue`; the envelope is `src/components/EnvelopeIntro.vue` |
| All other copy (EN / 繁中) | `src/locales/en.js`, `src/locales/zh.js` |
| Design tokens | `src/style.css` |
