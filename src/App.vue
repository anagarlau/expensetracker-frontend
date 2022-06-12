<template>
<div>
  <router-view :categories="categories" :catLength="categories.length" />
  </div>
</template>

<script>

export default {
  components: {

  },
  computed:{
    isLoggedIn(){
      return this.$store.getters.token != null && this.$store.getters.email != null
    }
  },
  data(){
    return {
      categories: []
    }
  },
  mounted () {
    this.fetchCategories()
  },
  methods:{
    fetchCategories(){
      this.error = ''
      const header = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: this.$store.getters.token,
          'Content-Type': 'application/json'
        }
      }
      fetch(`https://expensetracker22.herokuapp.com/api/v1/categories/all`, header)
        .then((response)=>{
          if(response.ok){
            return response.json()
          }else{
            throw new Error(response.status + " went wrong")
          }
        })
        .then((data)=>{
          console.log(data)
          this.categories = data
        })
        .catch((err)=>{
          console.log(err)
          this.error = 'Something went wrong on our side'
        })

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
