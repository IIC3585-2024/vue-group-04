import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPersonHiking,
  faStar,
  faChevronCircleLeft,
  faChevronCircleRight
} from '@fortawesome/free-solid-svg-icons'

library.add(faStar)
library.add(faPersonHiking)
library.add(faChevronCircleLeft)
library.add(faChevronCircleRight)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
