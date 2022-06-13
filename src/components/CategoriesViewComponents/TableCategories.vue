<template>
  <div class="row justify-content-left">
    <alert-delete v-if="alert" @close-alert="closeAlert"></alert-delete>
    <div class="col-8">
      <table class="table table-hover" id="datatable" data-mdb-selectable="true" data-mdb-multi="true">
        <tbody>
        <tr v-for="category in categories" :key="category.cid" @click="openAlert(category.cid)">

          <td><span><i class="bi bi-trash-fill"></i></span></td>
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
  props: ['categories'],
  data () {
    return {
       error: '',
       alert: false,
       cidToDelete: null
    }
  },
  methods:{
    openAlert(cid){
      this.alert = true
      this.cidToDelete=cid
      console.log("meow " + this.cidToDelete)
    },
    closeAlert(){
      this.alert = false
    }
  }

}
</script>

<style scoped>

</style>
