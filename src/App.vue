<template>
<div>
    <router-view :categories="categories" :catLength="categories.length" :transactions="transactions" @update-categories="updateCategories" />
  </div>
</template>

<script>
/* eslint-disable */
export default {
  components: {

  },
  computed:{
    isLoggedIn(){
      return this.$store.getters.token != null && this.$store.getters.email != null
    }
  },
  watch:{
    isLoggedIn(){
      console.log("Is Logged in? " + this.isLoggedIn)
      if(this.isLoggedIn){
        this.fetchCategories()
        this.getTransactions()
      }
    }
  },
  data(){
    return {
      categories: [],
      transactions:[]
    }
  },

  created () {
      if(this.isLoggedIn){
        this.fetchCategories()
        this.getTransactions()
      }


  },
  methods:{
    fetchCategories(){
      this.error = ''
      const header = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: this.$store.getters.token,
          'Content-Type': 'application/json'
        }
      }
      fetch(`https://expensetracker22.herokuapp.com/api/v1/categories/all`, header)
        .then((response)=>{
          if(response.ok){
            return response.json()
          }else{
            throw new Error(response.status + " went wrong")
          }
        })
        .then((data)=>{
          console.log(data)
          this.categories = data
        })
        .catch((err)=>{
          console.log(err)
          this.error = 'Something went wrong on our side'
        })

    },
    getTransactions () {
      console.log('Token ' + this.$store.getters.token)
      console.log('Email ' + this.$store.getters.email)
      fetch(`https://expensetracker22.herokuapp.com/api/v1/transactions`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': this.$store.getters.token,
            'Content-Type': 'application/json',
          },

        }).then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(response.status + ' status code')
        }
      }).then((data) => {
        this.transactions = data
      })
        .catch((err) => console.log(err))
    },
    updateCategories(data){
      this.categories.unshift(data)
    }
  }

}
</script>

<style>
html, body {
  margin: 0;
  height:100%;
  width:100%;
  padding:0;
}


</style>
