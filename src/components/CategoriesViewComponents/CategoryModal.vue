<template>

  <!--    class="modal" modal in modal-active -->
  <transition name="modal 2" >
    <!--    class="modal" -->
    <div class="modal in modal-active" tabindex="-1" aria-hidden="true" id="modal-clickable-rows">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header text-center mb-0">
            <h5 class="modal-title mb-0 w-100 font-weight-bold">Add a category</h5>
            <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body mt-4 mb-5" id="modal-body-clickable-rows">
            <div class="btn-group">
              <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i :class="selectedIcon"></i>
              </button>
              <ul class="dropdown-menu">
                <li class="dropdown" v-for="item in filteredItems" :key="item" @click="selectIcon(item)"> <i :class="item"></i> </li>
              </ul>
            </div>



          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-outline-primary">
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
  components: {

  },
  name: 'CategoryModal',
  emits: ['close-modal'],
  methods: {
    closeModal () {
      this.$emit('close-modal')
    },
    selectIcon(icon){
      this.selectedIcon=icon
      console.log(this.selectedIcon)
    }
  },
  data () {
    return {
      filteredItems: [],
      selectedIcon : ""
    }
  },
  created () {
    this.filteredItems = ["bi bi-bag","bi bi-bandaid-fill","bi bi-bank2","bi bi-basket-fill","bi bi-bell-fill"]
    this.selectedIcon = this.filteredItems[0]
  }
}
</script>

<style scoped>
.modal-header {
  border-bottom: 0 none;
}

.modal-backdrop{
  opacity:0.5 !important;
}

.modal-active{
  display:block;

}

.dropdown-menu{
  margin: 0;
  padding: 0;
}

.dropdown-menu > li {
  display: inline-block;
  margin: 3%;
}

.dropdown-menu > li :hover{
  color: blue;
  background-color: red;
}

</style>
