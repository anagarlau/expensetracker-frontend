<template>
  <form @submit.prevent="submitForm" >
    <div class="mb-3 row">
      <label
        for="email"
        class="col-sm-2 col-form-label"
      >Email</label>
      <div class="col-sm-3">
        <input
          id="email"
          v-model.trim="email"
          type="text"
          class="form-control"
        >
      </div>
    </div>
    <div class="mb-3 row">
      <label
        for="inputPassword"
        class="col-sm-2 col-form-label"
      >Password</label>
      <div class="col-sm-3">
        <input
          id="inputPassword"
          v-model="password"
          type="text"
          class="form-control"
        >
      </div>
    </div>
    <div class="col-sm-3">
      <button
        type="submit"
        class="btn btn-primary mb-3"
        >
        {{ submitButtonCaption }}
      </button>
      <button
        type="submit"
        class="btn mb-3"
        mode="flat"

      >
        {{ switchModeCaption }}
      </button>
    </div>
  </form>
</template>

<script>


export default {
  inject: ['setLoggedIn'],
  data () {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      jwttoken: '',
      loggedIn: false

    }
  },
  provide () {
    return {
      token: this.jwttoken,
      loggedIn: this.loggedIn
    }
  },
  computed: {
    submitButtonCaption () {
      if (this.mode === 'login') {
        return 'Login'
      } else {
        return 'Register'
      }
    },
    switchModeCaption () {
      if (this.mode === 'login') {
        return 'Register now'
      } else {
        return 'Login'
      }
    }
  },
  methods: {
    submitForm () {
      if (this.email === '' || !this.email.includes('@') || this.password.length < 5) {
        this.formIsValid = false
      } else {
        this.formIsValid = true
        const loginObj = {email: this.email, password: this.password}
        /* https://stackoverflow.com/questions/11492325/post-json-fails-with-415-unsupported-media-type-spring-3-mvc */
        fetch('https://expensetracker22.herokuapp.com/login',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(loginObj)
          }).then((response) => {
          console.log(response)
          return response.json()
        }).then((data) => {
          this.jwttoken = data.jwtToken
          console.log(this.jwttoken)
          localStorage.setItem('user', this.jwttoken)
          if (this.jwttoken.length > 0) {
            this.loggedIn = true
            this.$router.push('/')
          } else {
            console.log('not logged in')
          }
          this.setLoggedIn(this.loggedIn, this.jwttoken)
          console.log('Logged In in Form ' + this.loggedIn)
        })
      }


      // http req https://expensetracker22.herokuapp.com/login
    },
    switchAuthMode () {
      if (this.mode === 'login') {
        this.mode = 'signup'
      } else {
        this.mode = 'login'
      }
    }
  }
}
</script>

<style scoped>

</style>
