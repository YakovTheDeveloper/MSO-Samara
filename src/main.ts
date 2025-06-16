import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import { GesturePlugin } from '@vueuse/gesture'
import lineBreak from './directives/lineBreak'

const app = createApp(App)
app.directive('formatted-text', lineBreak)
app.use(GesturePlugin)
app.use(createPinia())
app.use(router)
app.mount('#app')
