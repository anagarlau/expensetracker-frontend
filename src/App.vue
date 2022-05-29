<template>

  <nav-bar v-if="token" ></nav-bar>
  <router-view v-if="token"> </router-view>
  <user-auth v-else> </user-auth>

</template>

<script>

import UserAuth from '@/components/AuthComp/UserAuth'
import NavBar from '@/components/NavBar'
export default {
  components: { UserAuth, NavBar },
  provide (){
    return {
      setLoggedIn: this.setLoggedIn,
      loggedInStatus: this.loggedInStatus
    }
  },
  data (){
    return {
      isLoggedIn: false,
      token: ''
    }
  },
  mounted () {
    if (localStorage.getItem('user')) {
      this.token = localStorage.getItem('user')
      this.isLoggedIn = true
    }
  },
  watch: {
    token (newToken) {
      localStorage.setItem('user', newToken)
    },
    isLoggedIn (){
      this.isLoggedIn = this.token.length > 0
    }
  },
  methods: {
    setLoggedIn (val, token) {
      console.log('loggedInVal in Home post Event ' + val)
      this.isLoggedIn = val
      this.token = token
    },
    loggedInStatus (){
      return this.token && this.isLoggedIn
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
