import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { icons } from './plugins/fontawesome'

const app = createApp(App)

app.use(icons)
app.use(router)
app.use(createPinia())

app.mount('#app')
