<template>
  <tr  >
    <td >{{ transaction.id }}</td>
    <td>{{transaction.transactionDescription}}</td>
    <td> {{transaction.transactionDate}}</td>
    <td> {{transaction.category.categoryName}}</td>
    <td> {{transaction.transactionTotal}}</td>
  </tr>

</template>

<script>
import TableModal from '@/components/TableModal'
export default {
  components: {},
  props: ['transaction'],
  data(){
    return{

    }
  }

}
</script>

<style scoped>

</style>
