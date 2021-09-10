<template>
  <div class="centry-list-container">
    <div class="px-2 pt-2">
        <input type="text" class="form-control" placeholder="Buscar Entrada" />
    </div>
  </div>
  <div class="entry-scrollarea">
      <Entry v-for="item in 5" :key="item" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  components:{
    Entry : defineAsyncComponent( ()=> import('../components/Entry.vue'))
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