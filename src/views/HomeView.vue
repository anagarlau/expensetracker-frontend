<template>

  <nav-bar :balance="balance"></nav-bar>

  <div class="container justify-content-center">
    <div class="row justify-content-center ">
      <filter-row @open-post="openPostModal"></filter-row>
    </div>
   <post-modal :mode="modalMode" v-if="postModal" @close-modal="closeModal" @update-list="updateUponEdit"></post-modal>
  <div class="row justify-content-center">
    <div class="col">
    <table-wrapper>
      <table-header></table-header>
      <table-body>
        <table-row v-for="transaction in transactions" :key="transaction.id" :transaction="transaction"
                   @click="openModal(transaction.id)"></table-row>
        <table-modal :mode="modalMode" v-if="modal" :clickedTransaction="rowClicked" @close-modal="closeModal"
                     @update-balance="updateUponEdit"></table-modal>
      </table-body>
    </table-wrapper>
    </div>
  </div>
  </div>

</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import TableRow from '@/components/HomeViewComponents/TableRow'
import TableModal from '@/components/HomeViewComponents/TableModal'
import NavBar from '@/components/NavBar'
import TableHeader from '@/components/HomeViewComponents/TableTransactionsHeader'
import TableWrapper from '@/components/TableWrapper'
import TableBody from '@/components/TableBodyWrapper'
import FilterRow from '@/components/HomeViewComponents/FilterRow'
import PostModal from '@/components/HomeViewComponents/PostModal'

export default {

  components: {
    PostModal,
    FilterRow,
    TableBody,
    TableWrapper,
    TableHeader,
    TableRow,
    TableModal,
    NavBar
  },
  data () {
    return {
      transactions: [],
      modal: false,
      rowClicked: null,
      postModal: false,
      modalMode: ''
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
      deleteTransaction: this.deleteTransaction,
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
      this.modalMode = 'edit'
    },
    closeModal () {
      console.log('Trying to close modal')
       if(this.modalMode === 'edit'){
        this.rowClicked = null
        this.modal = false
      }
      if(this.modalMode === 'post'){
        this.postModal = false
      }
      this.modalMode = ''
    },
    openPostModal(mode){
      console.log("Opening Post Modal")
      this.postModal = true
      this.modalMode = mode
     },
    updateUponEdit () {
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
        .then((res) => {
          if (res.ok) {
            this.transactions = this.transactions.filter((t) => t.id !== id)
          } else {
            throw new Error(res.status + ' response status')
          }
        })
        .catch((e) => console.log(e))
    }

  }
}


</script>

<style scoped>

</style>
