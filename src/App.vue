<template>
<div>
    <router-view :categories="categories" :catLength="categories.length" :transactions="filteredTransactions" @update-categories="updateCategories" @delete-category="deleteCategory"/>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  components: {

  },
  computed:{
    isLoggedIn(){
      const isLoggedIn = this.$store.getters.token != null && this.$store.getters.email != null
      console.log(isLoggedIn)
      if(isLoggedIn){
        this.fetchCategories()
        this.getTransactions()
      }
      return isLoggedIn
    },
      filteredTransactions(){
      console.log( "In Computed Prop " + this.filterByName)
      if(this.filterByName.length===0 || !this.filterByName) return this.transactions
      else{
       const arr =  this.transactions.filter(tr => tr.transactionDescription.toLowerCase().includes(this.filterByName))
        console.log(arr)
        return arr
      }

    },
  },
  watch:{
    isLoggedIn(){
      console.log("Is Logged in? " + this.isLoggedIn)
     if(this.isLoggedIn){
        this.fetchCategories()
        this.getTransactions()
      }
    },
    filterByName(newVal){
      console.log("Watcher for filter in App " + newVal)
      this.filterByName=newVal

    }
  },
  provide(){
    return {
      filter: this.filter
    }
  },
  data(){
    return {
      categories: [],
      transactions:[],
      filterByName: ''
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
    },
    deleteCategory(delCat){
      this.categories=this.categories.filter(cat=>cat.cid != delCat.cid)
      this.transactions = this.transactions.filter(tr=> tr.category.cid != delCat.cid)
    },
    filter(description){
      console.log("DESCRIPTION " + description)
      if(description.length=== 0 && !description){
        this.filterByName=''
      }else{
        this.filterByName = description
      }


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
