<template>
  <div class="row g-3">
    <div class="col-md-3">
      <div class="form-outline" v-if="trLength>0">
        <input v-model="name"   type="text" class="form-control" id="datatable-search-input" placeholder="Search by name or category name"/>
         </div>

    </div>


    <div class="col-md-3 date" v-if="trLength>0">
        <label class="col-form-label">Von</label>
      <Datepicker name="vonDate"   format="dd-MM-yyyy" :enableTimePicker="false" v-model="vonDate" ></Datepicker>
     </div>

    <div class="col-md-3 date" v-if="trLength>0">
      <label class="col-form-label">Bis</label>
      <Datepicker name="bisDate"  format="dd-MM-yyyy" :enableTimePicker="false" v-model="bisDate" ></Datepicker>
    </div>

    <div class="col-md-3">
      <div class="form-outline mb-4 ms-2">
      <button type="button"  class="btn btn-primary btn-lg btn-floating round" @click="openPostModal">
        <i class="bi bi-plus-lg"></i>
      </button>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker'
export default {
  components: {Datepicker},
  name: 'FilterRow',
  inject: ['filter', 'setMinDate', 'setMaxDate'],
  props: ['trLength'],
  data(){
    return{
      name: '',
      vonDate: null,
      bisDate: null
    }
  },
  watch: {
      vonDate(newVal){
         this.vonDate=newVal
         this.setMinDate(this.vonDate)
      },
      bisDate(newVal){
        this.bisDate = newVal
        this.setMaxDate(this.bisDate)
     },
      name(newVal){
        this.name=newVal
        this.filter(this.name)
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

.col-md-3{
  margin:0;
  padding:0
}
.date{
  display: flex;
}

.date > label{
  padding: 10px;
  width:20%

}

.datepicker{
  width: 80%;
}
.round:hover {
  background-color: #c3cfe2;
}
</style>
