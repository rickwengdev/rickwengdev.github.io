<template>
  <div class="home-container">
    <n-grid x-gap="12" :cols="1" responsive="screen" item-responsive>
      <n-grid-item>
        <div class="hero-section">
          <div class="avatar-container">
            <n-avatar
              round
              :size="160"
              :src="avatarImage"
              class="profile-avatar"
              object-fit="cover"
            />
            </div>

          <h1 class="title">Hi, I'm Rick Weng.</h1>
          <p class="subtitle">Full Stack Developer | Tesla Investor | Pro Crypto</p>
          <p class="intro">
            I'm passionate about building scalable web applications and exploring new technologies.
            Welcome to my portfolio where I showcase my projects and skills.
          </p>
          
          <n-space justify="center" size="large" style="margin-top: 30px;">
            <n-button type="primary" size="large" @click="$router.push('/projects')">
              View My Work
            </n-button>
            <n-button size="large" tag="a" href="mailto:chain.dev.rick@proton.me">
              Contact Me
            </n-button>
          </n-space>
        </div>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup>
import { NGrid, NGridItem, NButton, NSpace, NAvatar } from 'naive-ui';
import avatarImage from '../assets/avatar.jpg';
</script>

<style scoped>
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  /* 稍微調整上邊距，讓整體垂直置中感更好 */
  padding: 60px 20px; 
  text-align: center;
}

/* 新增：頭像樣式 */
.avatar-container {
  margin-bottom: 24px;
}

.profile-avatar {
  border: 4px solid rgba(99, 226, 183, 0.2); /* 增加一個與主題色呼應的邊框 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* 增加陰影讓頭像更立體 */
}

.title {
  font-size: 3.5rem;
  margin-bottom: 10px;
  background: linear-gradient(120deg, #63e2b7, #2a947d);
  -webkit-background-clip: text;
  background-clip: text;
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