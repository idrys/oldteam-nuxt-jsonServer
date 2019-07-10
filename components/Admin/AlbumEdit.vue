<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-space-around fill-height >
      <v-flex xs4>
         <v-card class="elevation-10 transparent">

        <v-card-text class="text-xs-center">
         <v-img 
            class="white--text elevation-3"  height="170px" :src="image_src"
          ></v-img> 
         <!-- :src="imgUrl" -->
         <!-- :src="require('~/assets/img/' + post.imgUrl)" -->
        
        <v-flex xs12 align-end d-flex>
          
                <span class="headline" v-show="post.title==''">Tytuł</span>
                <span class="headline" v-show="post.title">{{post.title}}</span>
        </v-flex>
            <p v-show="post.content==''">Opis</p>
            <p v-show="post.content">{{post.content}}</p>
        </v-card-text>

        <v-card-actions>
            <p v-show="post.raport">
              <v-btn flat  class="blue--text">Sprawozdanie</v-btn>
            </p>
            <!-- <v-btn color="warning" >Opis</v-btn> -->
            <v-spacer></v-spacer>
            <p v-show="post.gallery">
              <v-btn flat  class="blue--text" >Zobacz więcej</v-btn>
            </p>
        </v-card-actions>

      </v-card>
    </v-flex>  
    
    <v-flex xs4>
       <v-toolbar
      card
      color="pink"
      dark
    >
      <v-icon>arrow_back</v-icon>
      <v-toolbar-title>Okładka albumu</v-toolbar-title>
      <v-spacer></v-spacer>
      
    </v-toolbar>
    <v-card>
      <v-card-text class="text-xs-center">
        <v-text-field 
          label="Ścieka do zdjęcia"
          v-model="post.imgUrl"
          >
        </v-text-field>

        <v-btn @click="onPickFile">Wczytaj plik</v-btn>
        <input style="display: none" 
          type="file" 
          id="file" 
          ref="fileInput"
          accept="image/*" 
          v-on:change="onFilePicked"/>
        
        <v-text-field 
          label="Tytuł"
          v-model="post.title"
          >
        </v-text-field>
        <v-text-field 
          label="Opis"
          v-model="post.content"
          >
        </v-text-field>
         
        <v-text-field           
          label="Ścieka do galerii"
          v-model="post.gallery"
          >
        </v-text-field>
         
      </v-card-text>

              
        <v-card-actions>
          <v-btn
            @click="cancel" 
            flat
          >Anuluj</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              
              left
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="my-0"
                  @click="refresh"
                  v-on="on"
                >
                  <v-icon>refresh</v-icon>
                </v-btn>
              </template>
              <span>Świerzy formularz</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" flat @click="sumit">Zapisz</v-btn>
        </v-card-actions>

    </v-card>
    </v-flex> 
    </v-layout> 
  </v-container>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data: ()=>({
    file: '',
    image_src: ''
    
  }),

  created() {
    
    this.chackIsImage()
  },

  props:{
    post: Object
  },

  computed: {
    ... mapState(['albumModule'])
  },

  methods: {

    sumit(){
      //console.log(new Date().valueOf())
      //this.post.id = 15 //+ '_' + Math.random().toString(36).substr(2, 9);
      //console.log('Title: ', this.post)
      this.$store.dispatch('albumModule/updateAlbum',this.post)
    },

    chackIsImage(){
      console.log('wartość: ', this.post);

      if(this.post.image != null){
        if(this.post.image.key == null){
          console.log('Brak key zdjęcia: ', this.post.id ); 
          throw 'Brak key zdjęcia: ', this.post.id; 
        }
        else{
          console.log('Mam zdjęcie: ', this.post.id );
          this.image_src = 'http://localhost:8000/images/' + this.post.image.key + '.jpg';
        }
      }
      else{
        console.log('Brak key zdjęcia: ', this.post.id ); 
          throw 'Brak key zdjęcia: ', this.post.id; 
      }
      this.image_src = 'http://localhost:8000/images/' + this.post.image.key + '.jpg';
    },

    cancel(){
      //console.log('Cancel')
      this.$router.push('/Admin/AlbumEditList/')
    },

    refresh(){

      this.post.gallery = "",
      this.post.content = "",
      //this.post.imgUrl = "",
      this.post.raport = "",
      this.post.image = "",
      this.post.title = ""
    },

    onPickFile(){
      this.$refs.fileInput.click()
    },

    onFilePicked(events){ // https://www.youtube.com/watch?v=J2Wp4_XRsWc 9:00
      const files = events.target.files
      let filename = files[0].filename
      this.post.imgUrl = files[0].name
      //console.log('files[0].filename: ', files[0].name )
      const fileReader = new FileReader()
      fileReader.addEventListener('load', ()=>{
        this.post.imgUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.post.image = files[0]
    }

  },

}
</script>
