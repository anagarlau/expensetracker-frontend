<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Expense Tracker App</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <p> {{ email }} </p>

          <router-link class="nav-link"  to="/dashboard" @click="resetFilters">Categories</router-link>
          <router-link class="nav-link" to="/transactions">Transactions</router-link>
<!--          <a class="nav-link active" aria-current="page" href="#">Home</a>-->
<!--          <a class="nav-link" href="#">About</a>-->
<!--          <a class="nav-link" href="#">Expenses</a>-->

        </div>

      </div>
    </div>
    <div class="d-flex">
      <button @click="logout" class="btn btn-primary"
              style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"> Logout</button>
    </div>

  </nav>
</template>

<script>
export default {
  inject: ['resetFilters'],
    data(){
    return {

    }
  },
  computed: {
    email(){
      return this.$store.getters.email
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
.active {
  text-decoration-line: underline;
}

</style>
