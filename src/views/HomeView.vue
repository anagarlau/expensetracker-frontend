<template>


  <div >
    <table class="table table-hover" id="datatable" data-mdb-selectable="true" data-mdb-multi="true"  >
      <thead>
      <tr>
        <th class="th-sm"> Col1 </th>
        <th class="th-sm">Col2</th>
        <th class="th-sm">Col3</th>
        <th class="th-sm">Col4</th>
      </tr>
      </thead>
      <tbody>
      <table-row v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" @click="openModal(transaction.id)" > </table-row>
      <table-modal v-if="modal" :clickedTransaction="rowClicked" @close-modal="closeModal"></table-modal>
      </tbody>
    </table>


</div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import TableRow from '@/components/TableRow'
import TableModal from '@/components/TableModal'
export default {

  components: {
    TableRow,
    TableModal
   },
  data(){
    return {
      transactions: [],
      categories: [],
      modal: false,
      rowClicked: null
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
      this.getCategories()

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
      async getCategories(){
        const header = {method: 'GET',
          mode: 'cors',
          headers: {
          'Authorization': this.$store.getters.token,
            'Content-Type': 'application/json',
        }
        }
      let response = await fetch('https://expensetracker22.herokuapp.com/api/v1/categories/all', header)
      let categories = await response.json();
      this.categories = categories;
     },
      openModal(id){
        console.log(id)
        let clickedTransaction= this.transactions.find((tr)=> tr.id === id)
        this.rowClicked = clickedTransaction
        this.modal = true
        console.log(this.modal)

      },
      closeModal(){
      console.log("Trying to close modal")
        this.rowClicked=null
        this.modal=false
      },
     async deleteTransaction(id){
      console.log("Attempting to delete " + id)
       const header = {method: 'DELETE',
         mode: 'cors',
         headers: {
           'Authorization': this.$store.getters.token,
           }
       }
      const response = await (fetch(`https://expensetracker22.herokuapp.com/api/v1/transactions/${id}`, header))
       if(response.ok){
         console.log("Deleted " + id )
         this.transactions = this.transactions.filter((t) => t.id !== id)
       }else{
         alert("NOOOO")
       }
     }

  }
}
</script>

<style scoped>



</style>
