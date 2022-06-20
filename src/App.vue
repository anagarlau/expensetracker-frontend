<template>
  <div>
    <router-view :categories="categories" :catLength="categories.length" :transactions="filteredTransactions"
                 :originalTrs="transactions" @update-categories="updateCategories" @delete-category="deleteCategory"/>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  components: {},
  computed: {
    isLoggedIn () {
      const isLoggedIn = this.$store.getters.token != null && this.$store.getters.email != null
      console.log(isLoggedIn)
      if (isLoggedIn) {
        this.fetchCategories()
        this.getTransactions()
        this.filterByName=''
        this.minDate=new Date(-8640000000000000)
        this.maxDate = new Date(8640000000000000)
      }
      return isLoggedIn
    },
    filteredTransactions () {
      //console.log("in computed filtered Transaction 1 " + this.filterByName)
            const byDescriptionAndName = [...this.transactions]
          .filter(tr => {
            let date = new Date(tr.transactionDate)
             return (tr.category.categoryName.toLowerCase().includes(this.filterByName) || tr.transactionDescription.toLowerCase().includes(this.filterByName)) &&
              (date >= this.minDate && date <= this.maxDate)
          })

        //console.log("in computed filtered Transaction 2 " + this.filterByName)
        return byDescriptionAndName.sort((a, b) => {
          let da = new Date(a.transactionDate),
            db = new Date(b.transactionDate);
          return db - da;
        })


    },
  },
  watch: {
    isLoggedIn () {
      console.log('Is Logged in? ' + this.isLoggedIn)
      if (this.isLoggedIn) {
        this.fetchCategories()
        this.getTransactions()
      }
    }
  },
  provide () {
    return {
      filter: this.filter,
      setMinDate: this.setMinDate,
      setMaxDate: this.setMaxDate,
      resetFilters: this.resetFilters
    }
  },
  data () {
    return {
      categories: [],
      transactions: [],
      filterByName: '',
      maxDate: null,
      minDate: null,
      root: process.env.VUE_APP_BACKEND_BASE_URL
    }
  },
  methods: {
    fetchCategories () {
      this.error = ''
      const header = {
        method: 'GET',
        mode: 'cors',
        headers: {
          Authorization: this.$store.getters.token,
          'Content-Type': 'application/json'
        }
      }
      fetch(this.root +`/api/v1/categories/all`, header)
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error(response.status + ' went wrong')
          }
        })
        .then((data) => {
          console.log(data)
          this.categories = data
          this.categories.sort((a, b) => {
            let fa = a.categoryName.toLowerCase(),
              fb = b.categoryName.toLowerCase();

            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          })
        })
        .catch((err) => {
          console.log(err)
          this.error = 'Something went wrong on our side'
        })

    },
    getTransactions () {
      console.log('Token ' + this.$store.getters.token)
      console.log('Email ' + this.$store.getters.email)
      fetch(this.root+`/api/v1/transactions`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Authorization': this.$store.getters.token,
            'Content-Type': 'application/json',
          },

        }).then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(response.status + ' status code')
        }
      }).then((data) => {
        this.transactions = data
      })
        .catch((err) => console.log(err))
    },
    updateCategories (data) {
      this.categories.unshift(data)
      this.categories.sort((a, b) => {
        let catA = a.categoryName.toLowerCase(),
          catB = b.categoryName.toLowerCase();

        if (catA < catB) {
          return -1;
        }
        if (catA > catB) {
          return 1;
        }
        return 0;
      })
    },
    deleteCategory (delCat) {
      this.categories = this.categories.filter(cat => cat.cid != delCat.cid)
      this.transactions = this.transactions.filter(tr => tr.category.cid != delCat.cid)
    },
    setMinDate(newMinDate){
     // console.log("In SETTER incoming Min " + newMinDate)
      if(!newMinDate){
        this.minDate = new Date(-8640000000000000)
      }else{
        this.minDate = newMinDate
      }
     //  console.log("In SETTER minDate " + this.minDate)
    },
    setMaxDate(newMaxDate){
     // console.log("In SETTER incoming Max  " + newMaxDate)
      if(!newMaxDate){
        this.maxDate = new Date(8640000000000000)
      }else{
        this.maxDate = newMaxDate
      }

     // console.log("In SETTER maxDate " + this.maxDate)
    },
    filter (description) {
        if (description.length === 0 && !description) {
        this.filterByName = ''
      } else {
        this.filterByName = description.toLowerCase()
      }

    },
    resetFilters(){
      this.filterByName = ''
      this.maxDate = new Date(8640000000000000)
      this.minDate = new Date(-8640000000000000)
    }
  },
  mounted(){
     this.filterByName = ''
      this.maxDate = new Date(8640000000000000)
      this.minDate = new Date(-8640000000000000)

  }

}
</script>

<style>
html, body {
  margin: 0;
  height: 100%;
  width: 100%;
  padding: 0;
}


</style>
