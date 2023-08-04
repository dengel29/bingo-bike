import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import HelloWorld from './components/HelloWorld.vue'
import CheckEmail from './components/CheckEmail.vue'

const routes = [
  {path: '/', component: HelloWorld},
  { path: '/auth/sent', name: "CheckEmail", component: CheckEmail},
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

const app = createApp(App)
app.use(router)

app.use(createPinia())

app.mount('#app')
