<template>

  <nav-bar :balance="balance"></nav-bar>
  <div >
    <table class="table table-hover" id="datatable" data-mdb-selectable="true" data-mdb-multi="true"  >
      <thead>
      <tr>
        <th class="th-sm"> Col1 </th>
        <th class="th-sm">Col2</th>
        <th class="th-sm">Col3</th>
        <th class="th-sm">Col4</th>
        <th class="th-sm">Col5</th>
      </tr>
      </thead>
      <tbody>
      <table-row v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" @click="openModal(transaction.id)" > </table-row>
      <table-modal v-if="modal" :clickedTransaction="rowClicked" @close-modal="closeModal" @update-balance="updateUI"></table-modal>
      </tbody>
    </table>


</div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import TableRow from '@/components/TableRow'
import TableModal from '@/components/TableModal'
import NavBar from '@/components/NavBar'
export default {

  components: {
    TableRow,
    TableModal,
    NavBar
   },
  data(){
    return {
      transactions: [],
      modal: false,
      rowClicked: null,
      balance: 0
    }
  },
  computed:{
    header(){
      return this.$store.getters.token
    }
  },
  provide(){
    return{
      deleteTransaction: this.deleteTransaction
    }
  },
  mounted(){
      this.getTransactions()
      this.getBalance()

  },
   methods:{
    getTransactions(){
       console.log("Token " + this.$store.getters.token);
       console.log("Email " + this.$store.getters.email)
      fetch(`https://expensetracker22.herokuapp.com/api/v1/transactions`,
        {method: 'GET',
          mode: 'cors',
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
    getBalance(){

      fetch(`https://expensetracker22.herokuapp.com/api/v1/balance`,
        {method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': this.$store.getters.token,
            'Content-Type': 'application/json',
          },


        }).then((response) =>{
        return  response.json()
      }).then((data)=>{
        this.balance=data.balance

      })
    },
     openModal(id){
        console.log("Modal " + id)
        this.rowClicked =  this.transactions.find((tr)=> tr.id === id)
        this.modal = true
        },
      closeModal(){
      console.log("Trying to close modal")
        this.rowClicked=null
        this.modal=false
      },
      updateUI(balance, id ,editedTransaction){
      console.log("New Balance " + balance + " edited Transaction " )
      console.log(this.rowClicked)
      console.log(editedTransaction)
      console.log(id)
      this.balance = balance
      this.getTransactions()
      this.closeModal()

      },
     async deleteTransaction(id){
      console.log("Attempting to delete " + id)
       const options = {method: 'DELETE',
         mode: 'cors',
         headers: {
           'Authorization': this.$store.getters.token,
           }
       }
      const response = await (fetch(`https://expensetracker22.herokuapp.com/api/v1/transactions/${id}`, options))
       if(response.ok){
         console.log("Deleted " + id )
         //the faster way...
         this.transactions = this.transactions.filter((t) => t.id !== id)
        // this.getTransactions()
       }else{
         alert("NOOOO")
       }
     }

  }
}


</script>

<style scoped>



</style>
