<template>
  <n-config-provider :theme="darkTheme">
    <n-global-style />
    <n-layout style="min-height: 100vh">
      <n-layout-header bordered class="nav-header">
        <div class="logo" @click="$router.push('/')">Rick Weng</div>
        <div class="nav-links">
          <n-button text @click="$router.push('/')">Home</n-button>
          <n-button text @click="$router.push('/projects')">Projects</n-button>
          <n-button text @click="$router.push('/blog')">Blog</n-button>
          <n-button 
            tag="a" 
            text 
            href="https://github.com/rickwengdev" 
            target="_blank"
          >
            GitHub
          </n-button>
        </div>
      </n-layout-header>

      <n-layout-content>
        <router-view />
      </n-layout-content>
      
      <n-layout-footer bordered style="padding: 20px; text-align: center; opacity: 0.6;">
        &copy; {{ new Date().getFullYear() }} Rick Weng. Built with Vue 3 & Naive UI.
      </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider, NGlobalStyle, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NButton, darkTheme } from 'naive-ui';
// 如果你想要亮色主題，可以移除 :theme="darkTheme"
</script>

<style scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 64px;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}
.nav-links {
  display: flex;
  gap: 20px;
}
</style>