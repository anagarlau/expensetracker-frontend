<template>
  <p> {{mode}}</p>
  <div class="md-form mb-2 btn-block" role="group">
    <button  class="btn btn-lg btn-outline-primary" :class="[isExpenseSelected ? 'active' : '']" @click="switchCategory('EXPENSE')">Expense</button>
    <button class="btn  btn-lg btn-outline-primary" :class="[isIncomeSelected ? 'active' : '']" @click="switchCategory('INCOME')">Income</button>
  </div>
  <div class="md-form mb-2 btn-block dropdown" >
    <select  class="form-select" v-model="selected" >
      <option disabled  > {{selected}}  </option>
      <option v-for="cat in currCategories" :value="cat.categoryName" :key="cat.cid" >{{ cat.categoryName }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CategoryBtnGroup',
  props: ['currCategory', 'mode', 'categories'],
  emits: ['select-category'],
  data(){
    return {
      currCategories: [],
      selectedCategory : this.currCategory === null ? this.selectedCategory : this.currCategory,
      selected: this.currCategory === null ? this.selected : this.currCategory.categoryName,
      catMode: this.currCategory === null ? 'EXPENSE' : this.currCategory.categoryType,
      isExpenseSelected: this.currCategory === null ? true : this.currCategory.categoryType === 'EXPENSE' ,
      isIncomeSelected: this.currCategory === null ? false : this.currCategory.categoryType === 'INCOME'

    }
  },
    watch: {
    selected(newVal){
      if(newVal.length>0){
        console.log("watcher for selected " + newVal)
        this.selected = newVal
        this.selectedCategory = this.categories.find((cat) => cat.categoryName === newVal)
        console.log(this.selectedCategory)
        console.log(this.currCategory)
        this.$emit('select-category', this.selectedCategory)
      }
    }
    },
   methods: {
     switchCategory (cat) {
       this.catMode = cat
       this.catMode === 'EXPENSE' ? this.isExpenseSelected = true : this.isExpenseSelected = false
       this.catMode === 'INCOME' ? this.isIncomeSelected = true : this.isIncomeSelected = false
       this.currCategories = this.categories.filter(cat => cat.categoryType === this.catMode)
       console.log(this.currCategories)
     }
    // fetchCategories(){
    //   const header = {
    //     method: 'GET',
    //     mode: 'cors',
    //     headers: {
    //       Authorization: this.$store.getters.token,
    //       'Content-Type': 'application/json'
    //     }
    //   }
    //   fetch(`https://expensetracker22.herokuapp.com/api/v1/categories/all`, header)
    //   .then((response)=>{
    //     if(response.ok){
    //       return response.json()
    //     }else{
    //       throw new Error(response.status + " went wrong")
    //     }
    //   })
    //   .then((data)=>{
    //     console.log(data)
    //     this.categories = data
    //     if(this.mode === 'edit'){
    //       this.currCategories = this.categories.filter(cat=>cat.categoryType === this.currCategory.categoryType)
    //
    //
    //     }else{
    //       this.currCategories = this.categories.filter(cat=>cat.categoryType === 'EXPENSE')
    //       this.selected = this.currCategories[0].categoryName
    //
    //     }
    //   })
    //   .catch((err)=>console.log(err))
    //
    //
    //  }
  },
    mounted(){
      if(this.mode === 'edit'){
        this.currCategories = this.categories.filter(cat=>cat.categoryType === this.currCategory.categoryType)
      }else{
        this.currCategories = this.categories.filter(cat=>cat.categoryType === this.catMode)
        this.selected = this.currCategories[0].categoryName

      }
    }
}
</script>

<style scoped>
.btn{
  width: 50%;
  color: black;

}
</style>
