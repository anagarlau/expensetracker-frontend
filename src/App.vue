<template>
  <router-view
    v-if="token"
    :is-logged-in="isLoggedIn"
  />

  <user-auth v-else />
</template>

<script>

import UserAuth from '@/components/AuthComp/UserAuth'


export default {
  components: { UserAuth },
  provide (){
    return {
      setLoggedIn: this.setLoggedIn
    }
  },
  data (){
    return {
      token: localStorage.getItem('user')
    }
  },
  computed: {
    isLoggedIn () {
      /* must be truthy */
      if (localStorage.getItem('user') != null){
        this.setLoggedIn(localStorage.getItem('user'))
        return localStorage.getItem('user').length > 0 || this.token.length > 0
      } else {
        return false
      }
    }
  },
  watch: {
    token (newToken) {
      localStorage.setItem('user', newToken)
    }
  },
  methods: {
    setLoggedIn (token) {
      this.token = token
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
