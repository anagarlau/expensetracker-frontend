<template>
  <nav-bar />
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <ul>
      <li
        v-for="transaction in transactions"
        :key="transaction.id"
      >
        {{ transaction.transactionDescription }}
      </li>
    </ul>

    <div />
  </div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'HomeView',
  props: ['isLoggedIn'],
  components: {
    NavBar
  },
  data(){
    return {
      transactions: []
    }
  },
  mounted(){
    console.log("MOUNTED")
    console.log(this.isLoggedIn)
    if (this.isLoggedIn) {
      this.getTransactions()
    } else {
      console.log(this.transactions)
      console.log("You are not logged in")
    }
  },
    methods:{
    getTransactions(){
     // console.log(localStorage.getItem("user"));
      fetch('https://expensetracker22.herokuapp.com/api/v1/transactions',
        {method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("user"),
            'Content-Type': 'application/json',
          },

          credentials: 'include'
        }).then((response) =>{
          return  response.json()
      }).then((data)=>{
        this.transactions = data

      })
    },

  }
}
</script>
