<template>
  <div class="row justify-content-left">
    <div class="col-8">
  <table class="table table-hover" id="datatable" data-mdb-selectable="true" data-mdb-multi="true">
    <tbody>
   <tr v-for="category in categories" :key="category.cid">
      <th > <span><i class="bi bi-trash-fill"></i></span> </th>
      <td> <i :class="category.icon"></i> {{ category.categoryName }}</td>
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
  props: ['categories'],
  data(){
    return{
      // categories: [],
      error: ''
    }
  }

}
</script>

<style scoped>

</style>
