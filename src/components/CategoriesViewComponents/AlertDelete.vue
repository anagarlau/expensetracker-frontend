<template>
<transition>
    <div class="modal in modal-active container h-100" id="modal-clickable-rows" aria-hidden="true"  tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header text-center mb-1 ">
                     <button @click="closeAlert" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center mb-0 mt-0">
                    <p v-if="error.length===0">Are you sure you want to delete category <i :class="category.icon"> </i> {{category.categoryName}} ?</p>
                    <p v-else class="alert alert-warning"> {{error}}</p>
                </div>
              <div class="modal-footer justify-content-center mt-0">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="deleteCategory">Yes</button>
                    <button type="button" class="btn btn-primary" @click="closeAlert">No</button>
                </div>
            </div>
        </div>
    </div>

</transition>
</template>

<script>
export default {
  name: 'AlertDelete',
  props: ['category'],
  emits: ['close-alert', 'delete-category'],
  data(){
    return {
      error: ''
    }
  },
  methods: {
    closeAlert(){
      this.$emit('close-alert')
    },
    deleteCategory () {
      this.error = ''
      console.log('Attempting to delete ' + this.category.cid)
      const options = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          Authorization: this.$store.getters.token
        }
      }
      fetch(`https://expensetracker22.herokuapp.com/api/v1/categories/${this.category.cid}`, options)
        .then((res) => {
          if (res.ok) {
            return res.json
          } else {
            throw new Error(res.status + ' response status')
          }
        })
        .then((data)=>{
          this.$emit('delete-category', this.category)
          this.closeAlert()
        })
        .catch((e) => {
          this.error='Something went wrong on our side'
          console.log(e)
        })
    }
  }
}
</script>

<style scoped>
.modal-active{
  display:block;
  margin: 0;
  padding:0;
}

.modal-header{
  border: none;
}

.modal-footer{
  border: none;
}
.modal-body{
  margin:0;
  padding: 0;
}
</style>
