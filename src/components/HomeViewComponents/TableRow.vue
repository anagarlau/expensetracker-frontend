<template>
    <table-row-wrapper>
    <td >{{ transaction.id }}</td>
    <td>{{transaction.transactionDescription}}</td>
    <td> {{transaction.transactionDate}}</td>
    <td> {{transaction.category.categoryName}}</td>
    <td> {{transaction.transactionTotal}}</td>
  </table-row-wrapper>

</template>

<script>
import TableModal from '@/components/HomeViewComponents/TableModal'
import TableRowWrapper from '@/components/TableRowWrapper'
export default {
  components: { TableRowWrapper },
  props: ['transaction'],
  data(){
    return{

    }
  }

}
</script>

<style scoped>

</style>
