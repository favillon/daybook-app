<template>
  <div class="centry-list-container">
    <div class="px-2 pt-2">
        <input
          type="text"
          class="form-control"
          placeholder="Buscar Entrada"
          v-model="term" />
    </div>
  </div>

  <div class="mt-2 d-flex flex-colum">
    <button
      class="btn btn-primary mx-3"
      @click="$router.push({name:'entry', params: {id:'new'}})">
      <i class="fa fa-plus-circle">
        Nueva Entrada
      </i>
    </button>
  </div>
  
  <div class="entry-scrollarea">
      <Entry
        v-for="entry in entriesByTerm"
        :key="entry.id"
        :entry="entry" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex';

export default {
  components:{
    Entry : defineAsyncComponent( ()=> import('../components/Entry.vue'))
  },
  computed: {
    ...mapGetters('daybookModule', ['getEntriesbyTerm']),
    entriesByTerm(){
      return this.getEntriesbyTerm(this.term)
    }
  },
  data(){
    return{
      term: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.entry-list-container{
    border-right: 1px solid #c2ee50;
    height: calc(100vh -56);
}
.entry-scrollarea{
    height: calc(100vh -120px);
    overflow: scroll;
    font-size: 12px;
}
</style>