<template>
  <transition name="modal">
    <div>
      <div id="modal-clickable-rows" aria-hidden="true" class="modal-backdrop" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close" @click="close"></button>
            </div>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ['close-modal'],
  methods: {
    close(){
      this.$emit('close-modal')
    }
  }
}
</script>

<style scoped>
.modal-header {
  border-bottom: 0 none;
}
</style>
