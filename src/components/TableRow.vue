<template>
  <tr  >
    <td >{{ transaction.id }}</td>
    <td>{{transaction.transactionDescription}}</td>
    <td> {{transaction.transactionDate}}</td>
    <td> {{transaction.category.categoryName}}</td>

  </tr>
</template>

<script>
export default {
  props: ['transaction']


}
</script>

<style scoped>

</style>
