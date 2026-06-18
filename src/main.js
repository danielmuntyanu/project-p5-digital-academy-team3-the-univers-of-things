import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth-store'
import { useFavoritesStore } from './stores/favorites-store'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore();
authStore.initAuth();
const favoritesStore = useFavoritesStore();
favoritesStore.initFavorites(authStore.user?.value.uid);

app.mount('#app')
