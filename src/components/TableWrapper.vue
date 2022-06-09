<template>
  <table class="table table-hover" id="datatable" data-mdb-selectable="true" data-mdb-multi="true">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: 'TableWrapper'
}
</script>

<style scoped>

</style>
