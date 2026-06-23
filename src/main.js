import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth-store'
import { useFeaturedStore } from './stores/featured-store'

const app = createApp(App)

app.use(createPinia())
app.use(router)

useAuthStore().initAuth();
await useFeaturedStore().updateFeatured();

app.mount('#app')
