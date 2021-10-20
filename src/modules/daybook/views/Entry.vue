<template>
    <template v-if="dataEntry">    
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-seccess fs-3 fw-bold">{{day}}</span>
                <span class="mx-1 fs-3">{{month}}</span>
                <span class="mx-2 fs-4 fw-light">{{year}}</span>
            </div>
            <div>

                <input
                  v-show="false"
                  ref="imageSelectors"
                  type="file"
                  @change="onSelectedImage"
                  accept="image/png, image/jpeg">

                <button
                  v-if="dataEntry.id"
                  class="btn btn-danger mx-2"
                  @click="onDeleteEntry">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary" @click="onSelectImage">
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>
        </div>
        <hr />
        <div class="d-flex flex-column px-3 h-75">
            <textarea v-model="dataEntry.text" placeholder="Que paso"></textarea>
        </div>


        <img
          v-if="dataEntry.picture && !localImage"
          class="img-thumbnail"
          :src="dataEntry.picture" />

        <img
          v-if="localImage"
          class="img-thumbnail"
          :src="localImage" />

        <!-- https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fkaikucaffelatte.com%2Fblog%2Fwp-content%2Fuploads%2F2020%2F03%2Fshutterstock_510679489-1024x684.jpg&f=1&nofb=1-->
        <Fab icon="fa-save" @on:click="saveEntry"/>
    </template>
</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'
import { mapGetters, mapActions } from 'vuex'

import Swal from 'sweetalert2';

import getDayMonthYear from '../helpers/getDayMonthYear';
import  uploadImage  from '../helpers/uploadImage';

export default {
    props: {
        id:{
            type: String,
            required : true
        }
    },
    data(){
        return {
           dataEntry  : null,
           localImage : null,
           file : null
        }
    },
    components:{
        Fab : defineAsyncComponent( () => import('../components/Fa.vue'))
    }, 
    computed:{
        ...mapGetters('daybookModule', ['getEntryById']),
        day(){
            const {day} = getDayMonthYear(this.dataEntry.date)
            return day
        },
        month(){
            const {month} = getDayMonthYear(this.dataEntry.date)
            return month
        },
        year(){
            const {year} = getDayMonthYear(this.dataEntry.date)            
            return year
        }
    },
    methods:{
        ...mapActions('daybookModule', ['updateEntry', 'createEntry', 'deleteEntry']),
        loadEntry(){
            let entry;
            if (this.id === 'new') {
                entry = {
                    date : new Date().getTime(),
                    text : ''
                }
            } else {
                entry  = this.getEntryById(this.id)
            
                if ( !entry ) return this.$router.push({name: 'no-entry'})
            }

            this.dataEntry = entry
        },
        async saveEntry(){

            new Swal({
                title: 'Espere por favor',
                allowOutsideClick : false
            })
            Swal.showLoading()


            const picture = await uploadImage(this.file)
            this.dataEntry.picture = picture

            if (this.dataEntry.id){
                await this.updateEntry(this.dataEntry)
            } else {
                const newId = await this.createEntry(this.dataEntry)

                this.$router.push({name: 'entry', params:{id:newId}})
            }
            this.file = null
            Swal.fire('Guardado', 'Entrada registrada con exito', 'success')
            
        },
        async onDeleteEntry(){
            const {isConfirmed} = await  Swal.fire({
                title: 'Esta seguro',
                text : 'No se podra recuperar',
                showDenyButton : true,
                confirmButtonText : 'Si estoy seguro'
            })

            if (isConfirmed) {
                new Swal({
                    title : 'espere por favor',
                    allowOutsideClick : false
                })
                Swal.showLoading()
                await this.deleteEntry(this.dataEntry.id)
                this.$router.push({name: 'no-entry'})
                Swal.fire('Eliminado','', 'success')
            }

        },
        onSelectedImage (event) {
            const file = event.target.files[0]
            if (!file) {
                this.localImage = null
                this.file = null
                return 
            }
            this.file = file
            const fr = new FileReader()
            fr.onload = () =>  this.localImage = fr.result
            fr.readAsDataURL(file)
        },
        onSelectImage(){
            this.$refs.imageSelectors.click()
        }
    },
    created(){
        this.loadEntry()
    },
    watch:{
        id(){
           this.loadEntry()
        }
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