<template>
<transition>
    <div class="modal in modal-active container h-100" id="modal-clickable-rows" aria-hidden="true"  tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
            <div class="modal-content">
                <div class="modal-header text-center mb-1 ">
                     <button @click="closeAlert" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center mb-1">
                    <p>Modal body text goes here.</p>
                </div>
              <div class="modal-footer justify-content-center mt-0">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

</transition>
</template>

<script>
export default {
  name: 'AlertDelete',
  emits: ['close-alert'],
  methods: {
    closeAlert(){
      this.$emit('close-alert')
    }
  }
}
</script>

<style scoped>
.modal-active{
  display:block;
}

.modal-header{
  border: none;
}

.modal-footer{
  border: none;
}
</style>
