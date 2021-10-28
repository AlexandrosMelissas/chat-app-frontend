import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'virtual:windi.css'
import { registerModules } from './utils/RegisterModules'

import chatModule from './modules/chat'
import authModule from './modules/auth'
import axios from 'axios'

registerModules({
  chat: chatModule,
  auth: authModule
})

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}` ?? ''

const app = createApp(App).use(router)

app.mount('#app')
