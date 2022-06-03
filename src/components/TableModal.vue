<template>

  <transition name="modal">
  <div >
    <div id="modal-clickable-rows" aria-hidden="true" class="modal-backdrop" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-header-clickable-rows"> {{clickedTransaction.transactionDescription}}</h5>
            <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" @click="close"></button>
          </div>
          <div class="modal-body mt-4 mb-5" id="modal-body-clickable-rows">
            <p> {{clickedTransaction.transactionDate}}</p>
            </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-primary">
              Edit
              <i class="fa fa-paper-plane ms-2"></i>
            </button>
            <button   class="btn btn-outline-danger" @click="deleteTransaction(clickedTransaction.id)">
              Delete
              <i class="fa fa-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'TableModal',
  props: ['clickedTransaction'],
  emits: ['close-modal'],
  inject: ['deleteTransaction'],
  data(){
    return{
      expenseCategories: [],
      incomeCategories: []
    }
  },
  computed: {
    expenseNames(){
      return this.expenseCategories.map((cat)=>cat.categoryName)
    }
  },
  methods: {
    close(){
      this.$emit('close-modal')
    },
    async fetchExpenseCategories(){
      const header = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: this.$store.getters.token,
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('https://expensetracker22.herokuapp.com/api/v1/categories/expenses', header)
      const expenseCategories = await response.json()
      this.expenseCategories = expenseCategories
      console.log(this.incomeCategories)
    },
    async fetchIncomeCategories(){
      const header = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: this.$store.getters.token,
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('https://expensetracker22.herokuapp.com/api/v1/categories/incomes', header)
      const incomeCategories = await response.json()

      this.incomeCategories = incomeCategories
      console.log(this.incomeCategories)
    }
  },
   mounted(){
    this.fetchExpenseCategories()
    this.fetchIncomeCategories()
  }

}
</script>

<style scoped>

</style>
