<template>
   <modal-wrapper :mode="mode">
    <div class="modal-body text-center mb-1" >
      <h1> Hello World</h1>
      <form @submit.prevent="submitForm">
      <Datepicker position="left" menuClassName="dp-custom-menu" format="dd-MM-yyyy" :enableTimePicker="false"
                  v-model="date"></Datepicker>
      <category-btn-group :mode="mode" :curr-category="currCategory" @select-category="updateCategory"> </category-btn-group>

        <div class="md-form mb-2">
          <input type="text" id="form3" class="form-control validate" v-model="description">
        </div>
        <!--      <input   id="form2" class="form-control validate" v-model="amount" >-->
        <div class="md-form row g-3 align-items-center mb-2">
          <div class="col-auto">
            <label for="inputPassword6" class="col-form-label">Amount <i class="bi bi-currency-euro"></i></label>
          </div>
          <div class="col-auto">
            <input type="number" inputmode="numeric" v-model="amount" id="inputPassword6" class="form-control">
          </div>
        </div>
        <div class="modal-footer mt-0">
          <button class="btn btn-outline-danger" > Submit </button>
        </div>

     </form>
    </div>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '@/components/ModalWrapper'
import CategoryBtnGroup from '@/components/HomeViewComponents/CategoryBtnGroup'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'PostModal',
  props: ['mode'],
  components: { CategoryBtnGroup, ModalWrapper, Datepicker },
  data(){
    return {
      currCategory: null,
      date: new Date(),
      description: '',
      amount: null
    }
  },
  methods:{
    updateCategory(newCategory){
      this.currCategory = newCategory
      console.log("Updating in Post Modal " + this.currCategory.categoryName)
    },
    submitForm(){
      console.log(this.currCategory.categoryName)
      const newdate = this.date.toISOString().slice(0, 10)
      console.log(newdate)
    }
  },
  mounted(){
    console.log(this.mode)
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;

}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>
