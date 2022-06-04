<template>

  <modal-wrapper>
          <div class="modal-body mt-4 mb-5" id="modal-body-clickable-rows">
<!--            <p> {{clickedTransaction.transactionDate}}</p>-->
<!--            <p> {{clickedTransaction.transactionDescription}}</p>-->
            <div class="md-form mb-5">
              <Datepicker format="dd-MM-yyyy" dayPicker  v-model="date"></Datepicker>
              <p> {{date}}</p>
            </div>
            <div class="md-form mb-5">
              <i class="fas fa-user prefix grey-text"></i>
              <input type="text" id="form34" class="form-control validate">
              <label data-error="wrong" data-success="right" for="form34">Your name</label>
            </div>

            <div class="md-form mb-5">
              <i class="fas fa-envelope prefix grey-text"></i>
              <input type="email" id="form29" class="form-control validate">
              <label data-error="wrong" data-success="right" for="form29">Your email</label>
            </div>

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
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '@/components/ModalWrapper'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
export default {
  name: 'TableModal',
  components: { ModalWrapper, Datepicker},
  props: ['clickedTransaction'],
  inject: ['deleteTransaction'],
  data(){
    return{
      expenseCategories: [],
      incomeCategories: [],
      date : new Date(this.clickedTransaction.transactionDate).toISOString().slice(0,10)
    }
  },
  computed: {
    expenseNames(){
      return this.expenseCategories.map((cat)=>cat.categoryName)
    }
  },
  watch :{
    date(newVal){
     this.date = new Date(newVal).toISOString().slice(0,10)
      console.log(this.date)
    }
  },
  methods: {

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

<style>



</style>
