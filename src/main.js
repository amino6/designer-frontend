import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

pinia.use(({ store }) => {
    store.router = markRaw(router);
});

app.use(pinia)
app.use(router)

app.mount('#app')
