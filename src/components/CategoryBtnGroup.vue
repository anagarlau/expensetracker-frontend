<template>

  <div class="md-form mb-5 btn-block" role="group">
    <button  class="btn btn-lg btn-outline-primary" @click="switchCategory('EXPENSE')">Expense</button>
    <button class="btn  btn-lg btn-outline-primary" @click="switchCategory('INCOME')">Income</button>
  </div>
  <div class="md-form mb-5 btn-block dropdown" >
    <select  class="form-select" v-model="selected" ref="opt" @change="changeS">
      <option disabled  > {{currCategory.categoryName}}  </option>
      <option v-for="cat in currCategories" :value="cat.cid" :key="cat.cid" >{{ cat.categoryName }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'CategoryBtnGroup',
  props: ['currCategory'],
  emits: ['select-category'],
  data(){
    return {
      catMode: 'EXPENSE',
      categories: [],
      selectedCategory : this.currCategory,
      selected: this.currCategory.cid
    }
  },
    watch: {
    selected(newVal){
     console.log("watcher for selected " + newVal)
     this.selected = newVal
     this.selectedCategory = this.categories.find((cat) => cat.cid === newVal)
      console.log(this.selectedCategory)
     this.$emit('select-category', this.selectedCategory)
    }
    },
     computed:{
      currCategories(){
          return this.categories.filter(cat=>cat.categoryType === this.catMode)
      }

    },
  methods:{
      switchCategory(cat){
       this.catMode=cat
     },
    fetchCategories(){
      const header = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: this.$store.getters.token,
          'Content-Type': 'application/json'
        }
      }
      fetch(`https://expensetracker22.herokuapp.com/api/v1/categories/all`, header)
      .then((response)=>{
        if(response.ok){
          return response.json()
        }else{
          throw new Error(response.status + " went wrong")
        }
      })
      .then((data)=>{
        console.log(data)
        this.categories = data
      })
      .catch((err)=>console.log(err))


     }
  },
    mounted(){
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
