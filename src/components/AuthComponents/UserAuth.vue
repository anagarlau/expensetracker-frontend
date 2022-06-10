<template >
  <section class="h-100 gradient-form" style="background-color: pink;" >
    <div class="container py-5 h-100" style="background-color: pink;">
      <div class="row d-flex justify-content-center align-items-center" style="background-color: pink;">
        <div class="col-xl-10" style="background-color: pink;">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">

                  <div class="text-center">
                    <img
                      src="../../assets/android-chrome-512x512.png"
                      style="width: 185px;" alt="logo">
                    <h4 class="mt-1 mb-5 pb-1">Welcome</h4>
                  </div>

                  <form @submit.prevent="submitForm">
                    <p>Please login to your account</p>

                    <div class="form-outline mb-4">
                      <input type="email"
                             id="form2Example11"
                             class="form-control"
                             placeholder="Email address"
                             v-model.trim="email"/>

                    </div>

                    <div class="form-outline mb-4">
                      <input type="password"
                             id="form2Example22"
                             class="form-control"
                             v-model="password"
                             placeholder="Password"/>
                    </div>

                    <p v-if="error"> {{error}} </p>
                    <p v-if="!formIsValid">Please enter valid credentials </p>
                    <div class="text-center pt-1 mb-5 pb-1">
                      <button class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">
                        {{submitButtonCaption}}
                      </button>
                    </div>


                    <div class="d-flex align-items-center justify-content-center pb-4">
                      <p class="mb-0 me-2"> {{messageMode}}</p>
                      <button type="button"
                              class="btn btn-outline-danger"
                              mode="flat"
                              @click="switchAuthMode">{{ switchModeCaption }}</button>
                    </div>

                  </form>


                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center black">
                <div class="text- px-3 py-4 p-md-5 mx-md-4">
                  <h4 class="mb-4">Expense Tracker</h4>
                  <p class="small mb-0">

                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

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
        return 'Register here'
      } else {
        return 'Login here'
      }
    },
    messageMode(){
      if (this.mode === 'login') {
        return 'Register Now!'
      } else {
        return 'Already have an account?'
      }
    }
  },
  methods: {

    async submitForm () {
      this.formIsValid = true
      this.error = null
      if (this.email === '' || !this.email.includes('@') || this.password.length < 5) {
        console.log('invalid input')
        this.formIsValid = false
        return
      }
      console.log('obj is valid')
      this.isLoading = true
      const obj = {
        email: this.email,
        password: this.password
      }

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', obj)
        } else {
          await this.$store.dispatch('signup', obj)
        }
      } catch (err) {
        this.error = err.message
        console.log(this.error)
      }
      this.isLoading = false
    },
    switchAuthMode () {
      if (this.mode === 'login') {
        this.mode = 'register'
      } else {
        this.mode = 'login'
      }
      console.log('auth mode method: ' + this.mode)
    }

  }

}
</script>

<style scoped>


 section{
   display: block;

   height:100%;
   width:100%;
   padding: 60px;
   padding-left: 120px;
   box-sizing:border-box;
 }
</style>
