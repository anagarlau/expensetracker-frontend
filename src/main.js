import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
//import authModule from './store/modules/auth/auth'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

const store = createStore({
  // like data in a component - manages global state
  state () {
    return {
      user: {
        token: localStorage.getItem('user') || null,
        email: localStorage.getItem('email') || null
      }

    }
  },
  mutations: {
    setToken (state, payload) {
      //payload = user input - here a string
      //const newInput = payload
      console.log('Payload in Mutation ' + payload)
      state.user = payload
      console.log('Token is now saved in state ' + state.user.email + " " + state.user.token)

    }
  },
  getters: {
    token(state){
      return 'Bearer ' + state.user.token
    },
    email(state){
      return state.user.email
    }
  },
  actions: {
    async login (context, payload) {
        const resp = await fetch(`https://expensetracker22.herokuapp.com/login`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
               'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            email: payload.email,
            password: payload.password
          })
        })
      const data = await resp.json()
      if(!resp.ok){
        console.log(resp)
        throw new Error("Constructed Error Message "+resp.status + ": Something went wrong ")
      }
      context.commit('setToken', {token: data.jwtToken, email: payload.email})
      localStorage.setItem('user', this.state.user.token)
      localStorage.setItem('email', this.state.user.email)
      console.log("Set Email " + this.state.user.email)
      router.push("/")
      },
   async signup (context, payload) {
      const resp = await fetch(`https://expensetracker22.herokuapp.com/register`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
            body: JSON.stringify({
            email: payload.email,
            password: payload.password
          })
        })

     const data = await resp.json()
     if(!resp.ok){
       console.log(resp)
       throw new Error("Constructed Error Message "+resp.status + ": Something went wrong ")
     }
     context.commit('setToken', {token: data.jwtToken, email: payload.email})
     localStorage.setItem('user', this.state.user.token)
     localStorage.setItem('email', this.state.user.email)
     router.push("/")
    },
    logout(context){
      localStorage.removeItem('user')
      localStorage.removeItem('email')
      context.commit('setToken', {token: null, email: null})
      router.push('/auth')
    }
  }

})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
