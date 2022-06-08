<template>

  <modal-wrapper>
    <div class="modal-body text-center mb-1" id="modal-body-clickable-rows">
      <!--            <p> {{clickedTransaction.category.cid}}</p>-->
      <!--            <p> {{clickedTransaction.transactionDescription}}</p>-->
      <div class="md-form mt-0 mb-2">
        <Datepicker position="left" menuClassName="dp-custom-menu" format="dd-MM-yyyy" :enableTimePicker="false"
                    v-model="date"></Datepicker>
        <p> {{ date }}</p>
      </div>

      <category-btn-group :currCategory="startCategory" @select-category="updateCategory"></category-btn-group>


      <div class="md-form mb-2">
        <input type="text" id="form3" class="form-control validate" v-model="description">
      </div>
      <!--      <input   id="form2" class="form-control validate" v-model="amount" >-->
      <div class="md-form row g-3 align-items-center">
        <div class="col-auto">
          <label for="inputPassword6" class="col-form-label">Amount €</label>
        </div>
        <div class="col-auto">
          <input type="number" inputmode="numeric" v-model="amount" id="inputPassword6" class="form-control">
        </div>
      </div>
    </div>

    <div class="modal-footer mt-0">
      <button type="button" class="btn btn-outline-primary" @click="editTransaction(clickedTransaction.id)">
        Edit
        <i class="fa fa-paper-plane ms-2"></i>
      </button>
      <button class="btn btn-outline-danger" @click="deleteTransaction(clickedTransaction.id)">
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
import CategoryBtnGroup from '@/components/CategoryBtnGroup'

export default {
  name: 'TableModal',
  components: {
    CategoryBtnGroup,
    ModalWrapper,
    Datepicker
  },
  props: ['clickedTransaction'],
  emits: ['update-balance'],
  inject: ['deleteTransaction'],
  data () {
    return {
      startCategory: this.clickedTransaction.category,
      date: new Date(this.clickedTransaction.transactionDate).toISOString().slice(0, 10),
      description: this.clickedTransaction.transactionDescription,
      amount: this.clickedTransaction.transactionTotal
    }
  },
  computed: {},
  watch: {
    date (newVal) {
      this.date = new Date(newVal).toISOString().slice(0, 10)
    }
  },
  methods: {
    updateCategory (newCategory) {
      this.startCategory = newCategory
    },
    editTransaction (id) {
      console.log('Upon pressing edit')
      const edited = {
        cid: this.startCategory.cid,
        transactionDescription: this.description,
        transactionTotal: this.amount,
        transactionDate: this.date
      }
      const options = {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          Authorization: this.$store.getters.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(edited)
      }
      fetch(`https://expensetracker22.herokuapp.com/api/v1/transactions/${id}`, options)
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error("Smth went wrong")
          }
        })
        .then((data) => {
          console.log(data)
          this.$emit('update-balance', id ,edited)
        })
        .catch((error) => {
          console.log(error)
        })

    }
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

.dp-custom-menu {
  box-shadow: 0 0 6px #1976d2;
}
</style>
