import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import { GesturePlugin } from '@vueuse/gesture'

const app = createApp(App)

app.use(GesturePlugin)
app.use(createPinia())
app.use(router)
app.mount('#app')
