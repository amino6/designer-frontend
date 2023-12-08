import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { useRoute } from 'vue-router'
import VueLazyLoad from 'vue3-lazyload'
import VueProgressBar from "@aacassandra/vue3-progressbar"

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();

const options = {
    color: "#4B5563",
    failedColor: "#f00045",
    thickness: "3px",
    transition: {
        speed: "0.2s",
        termination: 300,
    },
    autoRevert: true,
    location: "top",
    inverse: false,
};

pinia.use(piniaPluginPersistedstate);

pinia.use(({ store }) => {
    store.router = markRaw(router);
    store.route = markRaw(useRoute())
});

app.use(pinia)
app.use(VueProgressBar, options)
app.use(router)
app.use(VueLazyLoad)

app.mount('#app')
