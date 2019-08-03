<template>
  <div>
    <v-card class="elevation-10 transparent">
        <v-card-text class="text-xs-center">
         <v-img class="white--text elevation-3"  height="170px"
          :src="image_src"
          >
          <!--a v-bind:href="image_src"></a-->

          <v-layout justify-space-between row v-show="edit" >
            <v-btn fab small dark @click="deleteAlbum" color="red" > <v-icon>delete</v-icon></v-btn>
            <v-btn fab small dark @click="editAlbum" color="green"> <v-icon>edit</v-icon></v-btn>
          </v-layout>
         </v-img> 
         <!-- :src="imgUrl" -->
        
        <v-flex xs12 align-end d-flex>
                <span class="headline">{{ album.title }}</span>
        </v-flex>
            {{ album.content }}
        </v-card-text>

        <v-card-actions>
            <v-btn color="warning"  v-show="album.opis" @click="opis=opis">Opis</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat class="blue--text" v-bind:href="album.gallery">Zobacz więcej</v-btn>
        </v-card-actions>

    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AlbumService from '@/services/AlbumService.js'
//import { mapState } from 'vuex' 
import axios from 'axios'

export default {
  props: ['id'],
  created() {
    //this.$store.dispatch('fetchEvent', this.id)
    //console.log('albums: ',this.album)
    this.chackIsImage()
    //this.onCreate()
  },
  props:{
    album: Object,
    edit: true,
  },

  methods:{
   
    editAlbum(){
      //console.log("Edit Album id: ", this.album.id) 
      this.$router.push('/Admin/Album/' + this.album.id)
    },
    deleteAlbum(){
      //console.log("Delete Album id: ", this.album.id) 
      //console.log(this.album.id)
      this.$store.dispatch('albumModule/deleteAlbum', this.album.id)
      //this.$router.push('/Admin/Album/' + this.album.id)
    },
    chackIsImage(){
      
      if(this.album.image != null){
        if(this.album.image.key == null){
          this.album.image=this.album.image;
          console.log('Brak key zdjęcia: ', this.album.id ); 
          throw 'Brak key zdjęcia: ', this.album.id; 
        }
        else{
          //this.$store
          //console.log('this.album.image.key: ', this.album.image.key)
          this.image_src = 'http://localhost:8000/images/' + this.album.image.key + '.jpg'; // + new Date().getTime();

          //console.log('Klucz zdjęcia: ', this.image_src)
        }
      }

    }
  },
  computed: {
    ... mapState(['albumModule']),
    // ...mapGetters({
    //     getPostById: state=> state.getters.getAlbumById
    // }),
  },

  data () {
    return {
     //edit: editProps
     //imgServerUrl: '~/assets/img/'  // laravel
      image_src: ''
    }
  }

}
</script>
