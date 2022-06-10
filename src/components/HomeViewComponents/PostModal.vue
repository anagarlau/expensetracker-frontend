<template>
  <modal-wrapper :mode="mode">
    <div class="modal-body text-center mb-1">
      <p v-if="error.length>0">{{error}} </p>
      <div>
        <Datepicker position="left" menuClassName="dp-custom-menu" format="dd-MM-yyyy" :enableTimePicker="false"
                    v-model="date"></Datepicker>
        <category-btn-group :mode="mode" :curr-category="currCategory"
                            @select-category="updateCategory"></category-btn-group>

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

     </div>
      <div class="modal-footer justify-content-center mt-0">
        <button  class="btn btn-outline-danger" @click="submitForm"> Submit</button>
      </div>
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
  emits: ['update-list'],
  components: {
    CategoryBtnGroup,
    ModalWrapper,
    Datepicker
  },
  data () {
    return {
      error: '',
      currCategory: null,
      date: new Date(),
      description: '',
      amount: null
    }
  },
  methods: {
    updateCategory (newCategory) {
      this.currCategory = newCategory
      console.log('Updating in Post Modal ' + this.currCategory.categoryName)
    },
    submitForm () {
      this.error = ''
      console.log(this.currCategory.categoryName)
      if (this.currCategory === null || this.amount === null || this.amount <= 0 || this.description.length < 10 || this.date === null) {
        this.error = 'Description must be at least 10 characters long. Transaction amount must be greater than 0.'
        return
      } else {
        console.log('Upon pressing post')
        const reqType = this.currCategory.categoryType === 'EXPENSE' ? 'expenses' : 'incomes'
        const toPost = {
          cid: this.currCategory.cid,
          transactionDescription: this.description,
          transactionTotal: this.amount,
          transactionDate: this.date.toISOString().slice(0, 10)
        }
          const options = {
          method: 'POST',
          mode: 'cors',
          headers: {
            Authorization: this.$store.getters.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(toPost)
        }
        fetch(`https://expensetracker22.herokuapp.com/api/v1/${reqType}`, options)
          .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
              throw new Error("Smth went wrong")
            }
          })
            .then((data)=> this.$emit('update-list', data))
           .catch((error) => {
            this.error = 'Something went wrong on our side. Please try again'
            console.log(error)
          })
      }
    }
  },
  mounted () {
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
