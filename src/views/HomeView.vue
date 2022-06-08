<template>

  <nav-bar :balance="balance"></nav-bar>
  <div>
    <table class="table table-hover" id="datatable" data-mdb-selectable="true" data-mdb-multi="true">
      <thead>
      <tr>
        <th class="th-sm"> Col1</th>
        <th class="th-sm">Col2</th>
        <th class="th-sm">Col3</th>
        <th class="th-sm">Col4</th>
        <th class="th-sm">Col5</th>
      </tr>
      </thead>
      <tbody>
      <table-row v-for="transaction in transactions" :key="transaction.id" :transaction="transaction"
                 @click="openModal(transaction.id)"></table-row>
      <table-modal v-if="modal" :clickedTransaction="rowClicked" @close-modal="closeModal"
                   @update-balance="updateUponEdit"></table-modal>
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
  data () {
    return {
      transactions: [],
      modal: false,
      rowClicked: null
    }
  },
  computed: {
    header () {
      return this.$store.getters.token
    },
    expenses () {
      return this.transactions.filter(tr => tr.category.categoryType === 'EXPENSE').map(e => e.transactionTotal).reduce((a, curr) => a + curr, 0)
    },
    incomes () {
      return this.transactions.filter(tr => tr.category.categoryType === 'INCOME').map(e => e.transactionTotal).reduce((a, curr) => a + curr, 0)
    },
    balance () {
      return (this.incomes - this.expenses)
    }
  },
  provide () {
    return {
      deleteTransaction: this.deleteTransaction
    }
  },
  mounted () {
    this.getTransactions()
  },
  methods: {
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
    openModal (id) {
      console.log('Opening Modal for ' + id)
      this.rowClicked = this.transactions.find((tr) => tr.id === id)
      this.modal = true
    },
    closeModal () {
      console.log('Trying to close modal')
      this.rowClicked = null
      this.modal = false
    },
    updateUponEdit (id, editedTransaction) {
      this.getTransactions()
      this.closeModal()
    },
     deleteTransaction (id) {
      console.log('Attempting to delete ' + id)
      const options = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Authorization': this.$store.getters.token,
        }
      }
      fetch(`https://expensetracker22.herokuapp.com/api/v1/transactions/${id}`, options)
       .then((res)=> {
        if(res.ok ) {this.transactions = this.transactions.filter((t) => t.id !== id)}
        else{throw new Error(res.status + " response status")}
       })
       .catch((e) => console.log(e))
    }

  }
}


</script>

<style scoped>


</style>
