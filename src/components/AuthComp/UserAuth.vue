<template>
<!--  load dialogue with loading spinner and error message-->
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
    <p v-if="error"> {{error}} </p>
     <p v-if="!formIsValid">Please enter valid credentials </p>
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
      msg: 'Welcome to Auth',
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      error: null,
      isLoading: false

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

    async submitForm () {
      this.formIsValid=true
      this.error=null
      if (this.email === '' || !this.email.includes('@') || this.password.length < 5) {
        console.log("invalid input")
        this.formIsValid=false
        return
      }
        console.log("obj is valid")
        this.isLoading = true
        const obj = {email: this.email, password: this.password}

          try{
            if(this.mode === 'login') {
              await this.$store.dispatch('login', obj)
            }else{
              await this.$store.dispatch('signup', obj)
            }
          }catch(err){
            this.error=err.message
            console.log(this.error)
          }
            this.isLoading=false
      },
    switchAuthMode () {
      if (this.mode === 'login') {
        this.mode = 'register'
      } else {
        this.mode = 'login'
      }
      console.log("auth mode method: " + this.mode)
    }

    }


}
</script>

<style scoped>

</style>
