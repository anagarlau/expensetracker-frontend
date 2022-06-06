<template>

  <router-view />

</template>

<script>

export default {

  components: {

  },
  computed:{
    isLoggedIn(){
      return this.$store.getters.token != null && this.$store.getters.email != null
    }
  }


}
</script>

<style>
html, body {
  margin: 0;
  height:100%;
  width:100%;
  padding:0;
}


</style>
