<template>

  <div class="md-form mb-5 btn-block" role="group">
    <button type="button" class="btn btn-lg btn-outline-primary" @click="switchCategory('expenses')">Expense</button>
    <button type="button" class="btn  btn-lg btn-outline-primary" @click="switchCategory('incomes')">Income</button>
  </div>
  <div class="md-form mb-5 btn-block dropdown"  >

    <select  class="form-select" @change="changeCategory($event)">
      <option value="" selected disabled>Choose</option>
      <option v-for="cat in categories" :value="cat.cid" :key="cat.cid">{{ cat.categoryName }}</option>
    </select>

  </div>
  <p><span>Selected CAT title: {{ selectedCategory != null ? selectedCategory.categoryName : ""}}</span></p>
</template>

<script>
export default {
  name: 'CategoryBtnGroup',
  data(){
    return {
      catMode: 'expenses',
      categories: [],
      selectedCategory : null
    }
  },
  methods:{
    switchCategory(cat){
      this.catMode=cat
      this.fetchCategories()
    },
    changeCategory (event) {
      this.selectedCategory = this.categories[event.target.options[event.target.options.selectedIndex].value]
      console.log(this.selectedCategory)
    },
    async fetchCategories(){
      const header = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: this.$store.getters.token,
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch(`https://expensetracker22.herokuapp.com/api/v1/categories/${this.catMode}`, header)
      this.categories = await response.json()
     }
  },
  created(){
    this.fetchCategories()
   }
}
</script>

<style scoped>
.btn{
  width: 50%;
  color: black;

}
</style>
