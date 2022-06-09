<template>
  <transition name="modal" >
<!--    class="modal" -->
      <div class="modal in modal-active" id="modal-clickable-rows" aria-hidden="true"  tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content mb-0 mt-0">
            <div class="modal-header text-center mb-0">
              <h4 class="modal-title mb-0 w-100 font-weight-bold"> {{header}} </h4>
              <button type="button" class="btn-close mb-0" data-mdb-dismiss="modal" aria-label="Close" @click="close"></button>
            </div>
            <slot></slot>
          </div>
        </div>
      </div>

  </transition>
</template>

<script>
export default {
  emits: ['close-modal'],
  props: ['mode'],
  computed: {
    header(){
      if(this.mode === 'edit'){
        console.log("in wrapper" + this.mode)
        return "Modify record"
      }else{
        console.log("in wrapper" + this.mode)
        return "Add a transaction "
      }
    }
  },
  methods: {
    close(){
      this.$emit('close-modal')

    }
  },
  mounted () {
    //console.log(this.mode + " prop mode ")
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
