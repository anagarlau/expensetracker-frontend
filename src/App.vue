<template>
  <nav-bar v-if="isLoggedIn" />
  <router-view />

</template>

<script>
import NavBar from '@/components/NavBar'
export default {

  components: {
    NavBar
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
