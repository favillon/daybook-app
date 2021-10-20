<template>
    <div
      class="entry-container pointer mb-3 p-2"
      @click="$router.push({name:'entry', params:{id:entry.id}})">
        <!-- Titulo -->
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">{{formatDate('dia')}}</span>
            <span class="mx-1 fs-5">{{formatDate('mes')}}</span>
            <span class="mx-2 fw-light">{{formatDate('ano')}}</span>
        </div>
        <div class="entry-description">
            {{ shortText }}
        </div>
    </div>
</template>

<script>
var dateFormat = require("dateformat");

export default {
    props : {
        entry : {
            type : Object,
            required : true
        }
    }, 
    computed:{
        shortText(){
            return (this.entry.text.length > 130)
                ? this.entry.text.substring(0, 130) + '...' 
                : this.entry.text
        }
    },
    methods:{
        formatDate(tipo = 'dia'){
            const dateView = dateFormat(this.entry.date, "dd-mm-yyyy").split("-")
            const typeDate = ['dia', 'mes', 'ano']
            return dateView[typeDate.indexOf(tipo)]
        }
    }
}
</script>

<style lang="scss" scoped>
.entry-container{
    border-bottom: 1px solid #2c3e58;
    transition: 0.2s all ease-in;

    &:hover{
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }
    .entry-title{
        font-size:  12px;
    }
}
</style>