<template>
  <div class="row justify-content-left">
    <alert-delete v-if="alert" @close-alert="closeAlert" :category="selectedCat" @delete-category="deleteCategory"></alert-delete>
    <div class="col-8">
       <table class="table table-hover" id="datatable" data-mdb-selectable="true" data-mdb-multi="true">
        <tbody>
          <tr v-for="category in categories" :key="category.cid">

          <td @click="openAlert(category)"><span><i class="bi bi-trash-fill"></i></span></td>
          <td><i :class="category.icon"></i> {{ category.categoryName }}</td>
          <td>{{ category.categoryType[0] + category.categoryType.substring(1).toLowerCase() }}</td>
          <td>@mdo</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AlertDelete from '@/components/CategoriesViewComponents/AlertDelete'
export default {
  name: 'TableCategories',
  components: {AlertDelete},
  emits: ['delete-category'],
  props: ['categories'],
  data () {
    return {
       error: '',
       alert: false,
       selectedCat: null
    }
  },
  methods:{
    openAlert(cat){
      this.alert = true
      this.selectedCat=cat
    },
    closeAlert(){
      this.alert = false
      this.selectedCat=null
    },
    deleteCategory(cat){

      this.$emit('delete-category', cat)
    }
  }

}
</script>

<style scoped>

</style>
