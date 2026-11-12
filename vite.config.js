import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { CONTENT_UPDATED } from './scripts/content-date.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Date the content last changed, for the structured data the app writes.
  define: { 'import.meta.env.VITE_CONTENT_UPDATED': JSON.stringify(CONTENT_UPDATED) },
});
