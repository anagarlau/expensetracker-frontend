<template>


     <table-header-wrapper>
      <tr>
        <th class="th-sm">Description</th>
        <th class="th-sm">Date</th>
        <th class="th-sm">Amount</th>
        <th class="th-sm">Category</th>
      </tr>
     </table-header-wrapper>

</template>

<script>
import TableHeaderWrapper from '@/components/TableHeaderWrapper'
export default {
  name: 'TableHeader',
  components: { TableHeaderWrapper }
}
</script>

<style scoped>

</style>
