import { createApp, watch } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { locale, setLocale, t } from './i18n'
import { updateSeoForRoute } from './seo'

const app = createApp(App)

app.use(router)

app.mount('#app')

const syncSeo = () => updateSeoForRoute(router.currentRoute.value, locale.value, t)

setLocale(locale.value)
syncSeo()

router.afterEach(() => syncSeo())
watch(locale, () => syncSeo())