<template>
  <n-config-provider :theme="darkTheme">
    <n-global-style />
    
    <n-layout class="main-layout">
      
      <n-layout-header bordered class="nav-header">
        <div class="logo" @click="$router.push('/')">Rick Weng</div>
        <div class="nav-links">
          <n-button text @click="$router.push('/')">Home</n-button>
          <n-button text @click="$router.push('/projects')">Projects</n-button>
          <n-button text @click="$router.push('/blog')">Blog</n-button>
          <n-button tag="a" text href="https://github.com/rickwengdev" target="_blank">
            GitHub
          </n-button>
        </div>
      </n-layout-header>

      <n-layout-content class="content-wrapper" content-style="padding: 0;">
        <router-view />
      </n-layout-content>
      
      <n-layout-footer bordered class="footer">
        &copy; {{ new Date().getFullYear() }} Rick Weng. Built with Vue 3 & Naive UI.
      </n-layout-footer>
      
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider, NGlobalStyle, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NButton, darkTheme } from 'naive-ui';
</script>

<style scoped>
/* 關鍵修改：Flexbox 佈局 */
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 讓容器至少跟視窗一樣高 */
}

.content-wrapper {
  flex: 1; /* 這一行是重點！它會佔據所有剩餘空間，把 Footer 推到底部 */
  display: flex;
  flex-direction: column; /* 讓內部內容也保持垂直排列 */
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 64px;
}

.footer {
  padding: 24px;
  text-align: center;
  opacity: 0.6;
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