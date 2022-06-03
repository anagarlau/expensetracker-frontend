<template>

  <transition name="modal">
  <div >
    <div id="modal-clickable-rows" aria-hidden="true" class="modal-backdrop" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal-header-clickable-rows"></h5>
            <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body mt-4 mb-5" id="modal-body-clickable-rows"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-primary">
              Reply
              <i class="fa fa-paper-plane ms-2"></i>
            </button>
            <button type="button" class="btn btn-outline-primary">
              Forward
              <i class="fa fa-arrow-right ms-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'TableModal'
}
</script>

<style scoped>

</style>
