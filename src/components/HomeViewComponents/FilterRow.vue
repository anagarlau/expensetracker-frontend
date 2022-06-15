<template>
  <div class="row justify-content-center">
    <div class="col">
      <div class="form-outline mb-4">
        <input v-model="name" @change="filter(name)"  @keyup="filter(name)" type="text" class="form-control" id="datatable-search-input" placeholder="Search by name or category name"/>
      </div>

    </div>




    <div class="col">
      <div class="form-outline mb-4">
      <button type="button"  class="btn btn-primary btn-lg btn-floating round" @click="openPostModal">
        <i class="bi bi-plus-lg"></i>
      </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterRow',
  inject: ['filter'],
  data(){
    return{
      name: ''
    }
  },
  computed: {

  },
  methods:{
    openPostModal(){
      this.$emit('open-post', 'post')
    }
  }

}
</script>

<style scoped>
.round{
  border-radius: 80%;
}
</style>
