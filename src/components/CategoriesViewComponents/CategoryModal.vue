<template>

    <!--    class="modal" modal in modal-active -->
    <transition name="modal 2" >
      <!--    class="modal" -->
      <div class="modal in modal-active" tabindex="-1" aria-hidden="true" id="modal-clickable-rows">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header text-center mb-0">
              <h5 class="modal-title mb-0 w-100 font-weight-bold">Add a category</h5>
              <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" @click="closeModal"></button>
            </div>
            <div class="modal-body mt-4 mb-5" id="modal-body-clickable-rows">




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
  name: 'CategoryModal',
  emits: ['close-modal'],
  methods:{
    closeModal(){
      this.$emit('close-modal')
    }
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

</style>
