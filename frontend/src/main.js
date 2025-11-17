import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import '@/assets/styles/global.scss'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)
app.use(i18n)

app.mount('#app')
