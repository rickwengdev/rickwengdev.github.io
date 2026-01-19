<template>
  <div class="home-container">
    <n-grid x-gap="12" :cols="1" responsive="screen" item-responsive>
      <n-grid-item>
        <div class="hero-section">
          <h1 class="title">Hi, I'm Rick Weng.</h1>
          <p class="subtitle">Full Stack Developer | Problem Solver</p>
          <p class="intro">
            專注於軟體架構、後端開發與自動化流程。喜歡將複雜的問題簡化，並創造高效率的工具。
          </p>
          
          <n-space justify="center" size="large" style="margin-top: 30px;">
            <n-button type="primary" size="large" @click="$router.push('/projects')">
              View My Work
            </n-button>
            <n-button size="large" tag="a" href="mailto:your.email@example.com">
              Contact Me
            </n-button>
          </n-space>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
import { NGrid, NGridItem, NButton, NSpace } from 'naive-ui';
</script>

<style scoped>
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 20px;
  text-align: center;
}
.title {
  font-size: 3.5rem;
  margin-bottom: 10px;
  background: linear-gradient(120deg, #63e2b7, #2a947d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subtitle {
  font-size: 1.5rem;
  color: #aaa;
  margin-bottom: 30px;
}
.intro {
  font-size: 1.1rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}
</style>