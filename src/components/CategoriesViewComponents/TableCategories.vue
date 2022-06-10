<template>
  <div class="row justify-content-left">
    <div class="col-8">
  <table class="table table-hover" id="datatable" data-mdb-selectable="true" data-mdb-multi="true">
    <tbody>
   <tr v-for="category in categories" :key="category.cid">
      <th > <span><i class="bi bi-trash-fill"></i></span> </th>
      <td>{{ category.categoryName }}</td>
      <td>{{ category.categoryType[0] + category.categoryType.substring(1).toLowerCase() }}</td>
      <td>@mdo</td>
    </tr>
    </tbody>
  </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableCategories',
  data(){
    return{
      categories: [],
      error: ''
    }
  },
 methods:{
   fetchCategories(){
     this.error = ''
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
       .catch((err)=>{
         console.log(err)
         this.error = 'Something went wrong on our side'
       })

   }
 },
  mounted () {
    this.fetchCategories()
  }
}
</script>

<style scoped>

</style>
