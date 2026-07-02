<template>
  <n-config-provider :theme="lightTheme" :theme-overrides="themeOverrides">
    <n-global-style />
    
    <n-layout class="main-layout">
      <n-layout-header bordered class="nav-header">
        <div class="nav-inner marketing-container">
          <div class="logo" @click="goHome">Rick</div>
          
          <nav class="nav-links" :aria-label="t('nav.language')">
            <n-button text class="nav-link" @click="navigate('/')">{{ t('nav.home') }}</n-button>
            <n-button text class="nav-link" @click="navigate('/blog')">{{ t('nav.blog') }}</n-button>
            <n-button text class="nav-link" @click="navigate('/experience')">{{ t('nav.experience') }}</n-button>
            <n-button tag="a" text class="nav-link" href="https://github.com/rickwengdev" target="_blank">
              {{ t('nav.github') }}
            </n-button>
          </nav>

          <div class="nav-actions">
            <LanguageSwitcher />
            <a href="mailto:office@theprism.ltd" class="nav-cta">{{ t('nav.contact') }}</a>
            <button
              class="menu-toggle"
              type="button"
              :aria-expanded="menuOpen"
              aria-controls="mobile-nav"
              :aria-label="t('nav.toggleMenu')"
              @click="menuOpen = !menuOpen"
            >
              <span class="menu-bar" :class="{ open: menuOpen }"></span>
              <span class="menu-bar" :class="{ open: menuOpen }"></span>
              <span class="menu-bar" :class="{ open: menuOpen }"></span>
            </button>
          </div>
        </div>

        <nav
          id="mobile-nav"
          class="mobile-nav"
          :class="{ open: menuOpen }"
          :aria-label="t('nav.toggleMenu')"
        >
          <n-button text class="mobile-nav-link" @click="navigate('/')">{{ t('nav.home') }}</n-button>
          <n-button text class="mobile-nav-link" @click="navigate('/blog')">{{ t('nav.blog') }}</n-button>
          <n-button text class="mobile-nav-link" @click="navigate('/experience')">{{ t('nav.experience') }}</n-button>
          <n-button tag="a" text class="mobile-nav-link" href="https://github.com/rickwengdev" target="_blank">
            {{ t('nav.github') }}
          </n-button>
          <div class="mobile-lang">
            <LanguageSwitcher />
          </div>
          <a href="mailto:office@theprism.ltd" class="mobile-nav-cta" @click="menuOpen = false">
            {{ t('nav.contact') }}
          </a>
        </nav>
      </n-layout-header>

      <div v-if="menuOpen" class="nav-overlay" @click="menuOpen = false"></div>

      <n-layout-content class="content-wrapper" content-style="padding: 0;">
        <router-view />
      </n-layout-content>
      
      <n-layout-footer bordered class="footer">
        <div class="footer-inner marketing-container">
          <p class="footer-desc">{{ t('footer.desc') }}</p>
          <div class="footer-bottom">
            <span>&copy; {{ new Date().getFullYear() }} Rick</span>
            <div class="footer-links">
              <a href="https://github.com/rickwengdev" target="_blank">{{ t('nav.github') }}</a>
              <a href="mailto:office@theprism.ltd">{{ t('footer.email') }}</a>
              <a href="https://calendar.app.google/rsG6vBBtfhRBfRHc9" target="_blank">{{ t('footer.schedule') }}</a>
            </div>
          </div>
        </div>
      </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { NConfigProvider, NGlobalStyle, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NButton, lightTheme } from 'naive-ui';
import LanguageSwitcher from './components/LanguageSwitcher.vue';
import { useI18n } from './i18n';

const router = useRouter();
const route = useRoute();
const menuOpen = ref(false);
const { t } = useI18n();

const themeOverrides = {
  common: {
    primaryColor: '#7c5cfc',
    primaryColorHover: '#6b4de0',
    primaryColorPressed: '#5a3ec7',
    bodyColor: '#ffffff',
    cardColor: '#ffffff',
    borderColor: 'rgba(17, 24, 39, 0.08)',
    textColor1: '#111827',
    textColor2: '#52566a',
    textColor3: '#9ca3af',
    fontFamily: "'Geist', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    borderRadius: '8px',
  },
};

const goHome = () => {
  menuOpen.value = false;
  router.push('/');
};

const navigate = (path) => {
  menuOpen.value = false;
  router.push(path);
};

watch(() => route.path, () => {
  menuOpen.value = false;
});
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--bg);
}

.content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.nav-header {
  position: sticky;
  top: 0;
  z-index: 200;
  height: auto;
  padding: 0;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-color: var(--border) !important;
  box-shadow: 0 1px 0 rgba(17, 24, 39, 0.04);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 16px;
}

.logo {
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  cursor: pointer;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  font-size: 0.875rem !important;
  color: var(--text-secondary) !important;
  padding: 8px 4px !important;
}

.nav-link:hover {
  color: var(--text) !important;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.nav-cta {
  padding: 8px 18px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #fff;
  background: var(--accent);
  border-radius: 8px;
  transition: background 0.2s;
  white-space: nowrap;
}

.nav-cta:hover {
  background: var(--accent-hover);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  cursor: pointer;
}

.menu-bar {
  display: block;
  width: 18px;
  height: 2px;
  margin: 0 auto;
  background: var(--text);
  border-radius: 1px;
  transition: transform 0.25s, opacity 0.25s;
}

.menu-bar.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-bar.open:nth-child(2) {
  opacity: 0;
}

.menu-bar.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-nav {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 0 20px 20px;
  background: rgba(255, 255, 255, 0.98);
  border-top: 1px solid var(--border);
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.3s ease, opacity 0.25s ease, padding 0.3s ease;
}

.mobile-nav.open {
  max-height: 420px;
  opacity: 1;
  padding: 12px 20px 20px;
}

.mobile-lang {
  padding: 8px 8px 4px;
}

.mobile-nav-link {
  width: 100%;
  justify-content: flex-start !important;
  font-size: 1rem !important;
  padding: 12px 8px !important;
  color: var(--text) !important;
}

.mobile-nav-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  padding: 12px 18px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  background: var(--accent);
  border-radius: 8px;
}

.nav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  top: 64px;
  z-index: 150;
  background: rgba(17, 24, 39, 0.25);
}

.footer {
  padding: 48px 0 32px;
  background: var(--bg);
  border-color: var(--border) !important;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer-desc {
  max-width: 480px;
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-secondary);
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 20px;
}

.footer-links a {
  color: var(--text-secondary);
  transition: color 0.2s;
}

.footer-links a:hover {
  color: var(--accent);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .nav-cta {
    display: none;
  }

  .nav-actions :deep(.lang-switch) {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .mobile-nav {
    display: flex;
  }

  .nav-overlay {
    display: block;
  }

  .footer {
    padding: 36px 0 28px;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
