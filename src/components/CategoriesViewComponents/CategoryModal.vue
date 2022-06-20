<template>

  <!--    class="modal" modal in modal-active -->
  <transition name="modal 2">
    <!--    class="modal" -->
    <div class="modal in modal-active" tabindex="-1" aria-hidden="true" id="modal-clickable-rows">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content mb-2">
          <div class="modal-header text-center mb-0">
            <h5 class="modal-title mb-0 w-100 font-weight-bold">Add a category</h5>
            <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"
                    @click="closeModal"></button>
          </div>
          <div class="modal-body mt-0 mb-2" id="modal-body-clickable-rows">
            <p v-if="error.length >0 "> {{error}} </p>
            <div class="btn-group md-form mb-3 cat-btns" role="group">
              <button  class="btn btn-lg btn-outline-primary" :class="[isExpenseSelected ? 'active' : '']" @click="switchCategory('EXPENSE')">Expense</button>
              <button class="btn  btn-lg btn-outline-primary" :class="[isIncomeSelected ? 'active' : '']" @click="switchCategory('INCOME')">Income</button>
            </div>

            <div class="md-form mb-2">
              <div class="btn-group">
                 <input type="text" id="form3" class="form-control validate" v-model="name" placeholder="Category name">
                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                        aria-expanded="false">
                  <i :class="selectedIcon"></i>
                </button>
                <ul class="dropdown-menu">
                  <li class="dropdown" v-for="item in filteredItems" :key="item" @click="selectIcon(item)">
                    <i :class="item"></i></li>
                </ul>
              </div>
            </div>


          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-outline-primary" @click="postCategory">
              Post
              <i class="fa fa-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>


</template>

<script>

export default {
  components: {},
  name: 'CategoryModal',
  emits: ['close-modal', 'update-categories'],
  methods: {
    closeModal () {
      this.$emit('close-modal')
    },
    selectIcon (icon) {
      this.selectedIcon = icon
      console.log(this.selectedIcon)
    },
    switchCategory(category){
      category === 'EXPENSE' ? this.isExpenseSelected = true : this.isExpenseSelected = false
      category === 'INCOME' ? this.isIncomeSelected = true : this.isIncomeSelected = false
      this.categoryType=category
     },
    postCategory(){
      if(this.name.length === 0 || this.selectedIcon.length === 0 || this.categoryType.length === 0){
        this.error = 'Please fill in all the fields'
      }
      const newCat = {
        categoryName: this.name,
        icon: this.selectedIcon,
        categoryType: this.categoryType
       }
      console.log(newCat.categoryType)
      console.log(newCat.categoryName)
      console.log(newCat.icon)
      const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: this.$store.getters.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCat)
      }
      fetch(this.root+`/api/v1/categories`, options)
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error("Smth went wrong")
          }
        })
        .then((data)=> {
          console.log(data)
          this.$emit('update-categories', data)
        })
        .catch((error) => {
          this.error = 'A category with this name exists already'
          console.log(error)
        })
    }
  },
  data () {
    return {
      filteredItems: [],
      selectedIcon: '',
      name: '',
      categoryType: 'EXPENSE',
      isIncomeSelected: false,
      isExpenseSelected: true,
      error: '',
      root: process.env.VUE_APP_BACKEND_BASE_URL
    }
  },

  created () {
    this.filteredItems = ["bi bi-cash-coin","bi bi-balloon-heart-fill","bi bi-alarm",'bi bi-piggy-bank-fill', 'bi bi-bag', 'bi bi-bandaid-fill', 'bi bi-bank2', 'bi bi-basket-fill',"bi bi-cart-x-fill" ,'bi bi-bell-fill', 'bi bi-bicycle', 'bi bi-binoculars-fill', 'bi bi-book-fill',
      'bi bi-boombox-fill', 'bi bi-box2-fill', 'bi bi-briefcase-fill', 'bi bi-brush-fill', 'bi bi-camera-reels-fill', 'bi bi-cart-fill', 'bi bi-credit-card-fill', 'bi bi-cup-fill',
      'bi bi-currency-exchange', 'bi bi-envelope-heart-fill', 'bi bi-gem', 'bi bi-gift-fill', 'bi bi-handbag-fill', 'bi bi-headphones', 'bi bi-house-door-fill', 'bi bi-mortarboard-fill',
      'bi bi-telephone-fill', 'bi bi-wallet-fill', 'bi bi-tags-fill', 'bi bi-building', 'bi bi-calendar-day',"bi bi-boxes"]
    this.selectedIcon = this.filteredItems[0]
    }
}
</script>

<style scoped>
.modal-header {
  border-bottom: 0 none;
}

.modal-backdrop {
  opacity: 0.5 !important;
}

.modal-active {
  display: block;

}

.modal-content {
  text-align: center;
}

/*.modal-body {*/
/*  width: 100%;*/
/*}*/

.dropdown-menu {
  padding: 0 0.4rem;
  text-align: center !important;
  /*margin: 0 !important;*/

}

.dropdown-menu > li {
  display: inline-block;
  margin-right: .5rem;
  padding: 0 0.4rem;
}

.dropdown-menu > li :hover {
  padding: 10px;
  background-color: gray;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s;
  transform: scale(2.5);
}



</style>
