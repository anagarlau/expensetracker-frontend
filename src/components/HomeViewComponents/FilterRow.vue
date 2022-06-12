<template>
  <div class="row justify-content-center">
    <div class="col">

    </div>
    <div class="col">

    </div>
    <div class="col">

    </div>
    <div class="col">
      <button type="button"  class="btn btn-primary btn-lg btn-floating round" @click="openPostModal">
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterRow',
  data(){
    return{

    }
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
