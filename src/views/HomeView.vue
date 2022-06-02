<template>
  <div>
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
  </div>

</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue'
export default {

  components: {
    NavBar
  },
  data(){
    return {
      transactions: []
    }
  },
  computed:{
    header(){
      return this.$store.getters.token
    }
  },
  mounted(){
      this.getTransactions()

  },
    methods:{
    getTransactions(){
       console.log("Token " + this.$store.getters.token);
       console.log("Email " + this.$store.getters.email)
      fetch(`https://expensetracker22.herokuapp.com/api/v1/transactions`,
        {method: 'GET',
          headers: {
            'Authorization': this.$store.getters.token,
            'Content-Type': 'application/json',
          },


        }).then((response) =>{
          return  response.json()
      }).then((data)=>{
        this.transactions = data

      })
    },

  }
}
</script>
