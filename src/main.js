import { createApp, watch } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { locale, setLocale, t } from './i18n';
import { updateSeoForRoute } from './seo';
import { reveal } from './directives/reveal.js';

// Don't let the browser put a reloaded page back where it was scrolled to.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const app = createApp(App);

app.use(router);
app.directive('reveal', reveal);

app.mount('#app');
document.getElementById('seo-content')?.remove();

const syncSeo = () => updateSeoForRoute(router.currentRoute.value, locale.value, t);

setLocale(locale.value);
syncSeo();

router.afterEach(() => syncSeo());
watch(locale, () => syncSeo());
