<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ul >
    <li v-for="transaction in transactions" :key="transaction.id"> {{ transaction.transactionDescription }}</li>
    </ul>

   <div>

  </div>
  </div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'HomeView',
  inject: ['loggedInStatus'],
  components: {
    HelloWorld
  },
  data(){
    return {
      transactions: []
    }
  },
  mounted(){
    if(this.loggedInStatus()){
      this.getTransactions()
    }else{
      console.log("You are not logged in")
    }

  }
  ,methods:{

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
        console.log(response)
        return  response.json()
      }).then((data)=>{
        console.log(data)
        this.transactions = data

      })
    },

  }
}
</script>
