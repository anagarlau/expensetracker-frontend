import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

const store = createStore({
  // like data in a component - manages global state
  state () {
    return {}
  }
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
