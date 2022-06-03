<template>


  <div >
    <table class="table table-hover" id="datatable" data-mdb-selectable="true" data-mdb-multi="true">
      <thead>
      <tr>
        <th class="th-sm"> Col1 </th>
        <th class="th-sm">Col2</th>
        <th class="th-sm">Col3</th>
        <th class="th-sm">Col4</th>

      </tr>
      </thead>
      <tbody>
      <table-row v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" @click="openModal">  </table-row>
      <table-modal v-if="modal"  ></table-modal>
      </tbody>
    </table>


</div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import TableModal from '@/components/TableModal'
import TableRow from '@/components/TableRow'
export default {

  components: {
    TableRow,
    TableModal

  },
  data(){
    return {
      transactions: [],
      modal: false
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
      openModal(){
        console.log("hi")
        this.modal = true
        console.log(this.modal)
      }

  }
}
</script>

<style scoped>



</style>
