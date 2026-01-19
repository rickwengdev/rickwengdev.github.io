export const blogPosts = [
  {
    id: 1,
    title: 'Building a Portfolio with Vue 3 & Naive UI',
    date: '2026-01-18',
    emoji: '🎨',
    tags: ['Frontend', 'Vue 3'],
    excerpt: 'How I rebuilt my personal site using Vite, removing legacy code, and deploying to GitHub Pages with Actions.',
    // 這裡放入詳細內容，支援 HTML 標籤
    content: `
      <p>Building a portfolio is a rite of passage for every developer. I decided to use <strong>Vue 3</strong> and <strong>Naive UI</strong> because of their clean aesthetic and composition API support.</p>
      <h3>Why Naive UI?</h3>
      <p>Naive UI provides over 80 components that are customizable and work seamlessly with Vue 3. The dark mode support is also fantastic out of the box.</p>
      <h3>The Migration</h3>
      <p>Moving from a legacy layout to this new structure involved breaking down the monolithic App.vue into smaller, reusable components like <code>Projects.vue</code> and <code>Blog.vue</code>.</p>
    `
  },
  {
    id: 2,
    title: 'Deploying Node.js Apps to Google Cloud Run',
    date: '2026-01-10',
    emoji: '☁️',
    tags: ['DevOps', 'GCP'],
    excerpt: 'A step-by-step guide to containerizing a Node.js application and setting up CI/CD pipelines.',
    content: `
      <p>Cloud Run is amazing because it abstracts away the infrastructure. You just give it a container, and it runs.</p>
      <h3>Dockerfile Best Practices</h3>
      <pre><code>FROM node:18-alpine\nWORKDIR /app\nCOPY . .\nRUN npm ci --only=production\nCMD ["node", "server.js"]</code></pre>
      <p>Using <code>alpine</code> images keeps the build size small and deployment fast.</p>
    `
  },
  {
    id: 3,
    title: 'Understanding Docker Multi-stage Builds',
    date: '2025-12-24',
    emoji: '🐳',
    tags: ['Docker', 'Backend'],
    excerpt: 'Optimizing your container images size and security by separating build and runtime environments.',
    content: `<p>Coming soon...</p>`
  },
  {
    id: 4,
    title: 'Refactoring Spaghetti Code: A Case Study',
    date: '2025-11-15',
    emoji: '🍝',
    tags: ['Refactoring', 'Architecture'],
    excerpt: 'Lessons learned from cleaning up a legacy project and implementing better design patterns.',
    content: `<p>Coming soon...</p>`
  }
];