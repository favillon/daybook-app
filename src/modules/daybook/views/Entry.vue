<template>
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-seccess fs-3 fw-bold">15</span>
            <span class="mx-1 fs-3">Sept</span>
            <span class="mx-2 fs-4 fw-light">2021</span>
         </div>
        <div>
            <button class="btn btn-danger mx-2">
                Borrar
                <i class="fa fa-trash-alt"></i>
            </button>
            <button class="btn btn-primary">
                Subir foto
                <i class="fa fa-upload"></i>
            </button>
        </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
        <textarea placeholder="Que paso"></textarea>
    </div>
    <Fab icon="fa-save"/>
    <img class="" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkaikucaffelatte.com%2Fblog%2Fwp-content%2Fuploads%2F2020%2F03%2Fshutterstock_510679489-1024x684.jpg&f=1&nofb=1" />

</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'

export default {
    components:{
        Fab : defineAsyncComponent( () => import('../components/Fa.vue'))
    }
}
</script>

<style lang="scss" scoped>
textarea {
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus{
        outline: none;
    }    
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>