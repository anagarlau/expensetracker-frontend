<template>

  <nav-bar></nav-bar>



  <div class="container justify-content-center">
    <div class="row">
      <div class="col">
        <button type="button"  class="btn btn-primary btn-lg btn-floating round" @click="openModal" >
          <i class="bi bi-plus-lg"></i>
        </button>

      </div>
      <category-modal v-if="modal" @close-modal="closeModal"> </category-modal>
    </div>
   <table-categories> </table-categories>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import TableCategories from '@/components/CategoriesViewComponents/TableCategories'
import CategoryModal from '@/components/CategoriesViewComponents/CategoryModal'
export default {
  components: { CategoryModal, TableCategories, NavBar},
  data(){
    return{
      modal: false
    }
  },
  provide(){
    return {
      closeModel: this.closeModal
    }
  },
  methods:{
    openModal(){
      this.modal = true
      console.log("Modal Categ " + this.modal)
    },
    closeModal(){
      this.modal = false
    }
  }
}
</script>

<style scoped>
.round{
  background-color: pink;
  border-radius: 60%;
}
.round:hover{
  background-color: green;
}
</style>
