<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container justify-content-center">
      <div class="row">
        <div class="col">
          <p v-if="catLength===0"> You currently have 0 categories. Press the button to create some</p>
          <button type="button" class="btn btn-primary btn-lg btn-floating round" @click="openModal">
            <i class="bi bi-plus-lg"></i>
          </button>

        </div>
        <category-modal v-if="modal" @close-modal="closeModal"></category-modal>
      </div>
      <table-categories v-if="catLength>0" :categories="categories"></table-categories>
    </div>

  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import TableCategories from '@/components/CategoriesViewComponents/TableCategories'
import CategoryModal from '@/components/CategoriesViewComponents/CategoryModal'

export default {
  components: {
    CategoryModal,
    TableCategories,
    NavBar
  },
  data () {
    return {
      modal: false
    }
  },
  provide () {
    return {
      closeModel: this.closeModal
    }
  },
  props: ['categories', 'catLength'],
  methods: {
    openModal () {
      this.modal = true
      console.log('Modal Categ ' + this.modal)
    },
    closeModal () {
      this.modal = false
    }
  }
}
</script>

<style scoped>
.round {
  background-color: pink;
  border-radius: 60%;
}

.round:hover {
  background-color: green;
}
</style>
