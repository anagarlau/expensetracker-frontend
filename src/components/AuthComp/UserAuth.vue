<template>
  <h1> {{msg}}  </h1>
  <form @submit.prevent="submitForm">
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
         class="btn btn-primary mb-3"
      >
        {{ submitButtonCaption }}
      </button>
      <button
        type="button"
        class="btn mb-3"
        mode="flat"
        @click="switchAuthMode"
      >
        {{ switchModeCaption }}
      </button>
    </div>
  </form>

</template>

<script>


export default {

  data () {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      msg: 'Welcome to Auth',
      error: ''

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
        return 'Register Now!'
      } else {
        return 'Already have an account? Click here to login'
      }
    }
  },
  methods: {
    submitForm () {
        const loginObj = this.validateInput()

       if(loginObj === null) return
       console.log(this.mode)
        if(this.mode === 'login') return this.login(loginObj)
        if(this.mode === 'register'){
            return this.signUp(loginObj)
        }
      },
    switchAuthMode () {
      if (this.mode === 'login') {
        this.mode = 'register'
      } else {
        this.mode = 'login'
      }
      console.log("auth mode " + this.mode)
    },

    validateInput (){
      if (this.email === '' || !this.email.includes('@') || this.password.length < 5) {
        console.log("invalid input")
        return null
      }else{
        console.log("obj is valid")
        const obj = {email: this.email, password: this.password}
        return obj
      }
    },
    login (loginObj){
      fetch(`https://expensetracker22.herokuapp.com/login`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(loginObj)
        }).then((response) => {
        if(response.ok){
           return response.json()
        }else{
           throw new Error("Wrong Credentials")
        }


      }).then((data) => {

        console.log("Token from Backend " + data.jwtToken)
        localStorage.setItem('user', data.jwtToken)
        this.$router.push('/')
      })
        .catch((e) => {
          console.log(e)
          this.error = e
        })
    },
    signUp (loginObj){
      fetch('https://expensetracker22.herokuapp.com/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(loginObj)
        }).then((response) => {
          if(response.ok) {
            return response.json()
          }else{
            throw new Error("Signup failed miserably")
          }
      }).then((data) => {
          this.login(loginObj)
      }).catch((e) => console.log(e))

    }

    }


}
</script>

<style scoped>

</style>
