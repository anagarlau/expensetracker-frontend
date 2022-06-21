<template>
<div>
  <nav-bar></nav-bar>

  <div class="container justify-content-center">
    <h4><i class="bi bi-currency-euro"></i> {{ balance }}</h4>
    <div v-if="catLength> 0 && originalTrs.length ===0"><p> Please post a transaction </p></div>
    <div v-if="catLength === 0 && originalTrs.length ===0"><p> You currently have 0 categories. Please create some
      first. </p></div>
    <div class="row justify-content-center" v-if="catLength > 0">
      <filter-row v-if="catLength>0" :trLength="originalTrs.length" @open-post="openPostModal"></filter-row>

      <post-modal :categories="categories" :mode="modalMode" v-if="postModal" @close-modal="closeModal"
                  @update-list="updateList"></post-modal>
    </div>
    <div class="row justify-content-center" v-if="originalTrs.length > 0">
      <div class="col">
        <table-wrapper>
          <table-header></table-header>
          <table-body>
            <table-row v-for="transaction in transactions" :key="transaction.id" :transaction="transaction"
                       @click="openModal(transaction.id)"></table-row>
            <table-modal :categories="categories" :mode="modalMode" v-if="modal" :clickedTransaction="rowClicked" @close-modal="closeModal"
                         @update-balance="updateList" @delete-transaction="deleteTransaction"></table-modal>
          </table-body>
        </table-wrapper>
      </div>
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
      modal: false,
      rowClicked: null,
      postModal: false,
      modalMode: ''
    }
  },
  props: ['catLength', 'categories', 'transactions', 'originalTrs'],
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
  methods: {
    openModal (id) {
      console.log('Opening Modal for ' + id)
      this.rowClicked = this.transactions.find((tr) => tr.id === id)
      this.modal = true
      this.modalMode = 'edit'
    },
    closeModal () {
      console.log('Trying to close modal')
      if (this.modalMode === 'edit') {
        this.rowClicked = null
        this.modal = false
      }
      if (this.modalMode === 'post') {
        this.postModal = false
      }
    },
    openPostModal (mode) {
      console.log('Opening Post Modal')
      this.postModal = true
      this.modalMode = mode
    },
    updateList (toAdd) {
      console.log('EDIT MODE ' + this.modalMode)
      if (this.modalMode === 'edit') {
        console.log('Logik zum edieren')
        const indexT = this.transactions.findIndex(o => o.id === toAdd.id)
        const indexO = this.originalTrs.findIndex(o => o.id === toAdd.id)
        this.transactions.splice(indexT, 1, toAdd)
        this.originalTrs.splice(indexO, 1, toAdd)
      }
      if (this.modalMode === 'post') {
        console.log('Logik zum hinzufuegen')
        this.transactions.unshift(toAdd)
        this.originalTrs.unshift(toAdd)
        }
      this.closeModal()
      this.modalMode = ''
    },
    deleteTransaction (id) {
      const indexT = this.transactions.findIndex(o => o.id === id)
      const indexO = this.originalTrs.findIndex(o => o.id === id)
      this.transactions.splice(indexT, 1)
      this.originalTrs.splice(indexO, 1)
      this.closeModal()
      this.modalMode = ''
    }

  }
}


</script>

<style scoped>

</style>
