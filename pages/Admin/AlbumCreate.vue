<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-space-around fill-height >
      <v-flex xs4>
         <v-card class="elevation-10 transparent">

        <v-card-text class="text-xs-center">
         <v-img class="white--text elevation-3"  height="170px" :src="require('~/assets/img/' + post.imgUrl)" ></v-img> 
         <!-- :src="post.imgUrl" -->
        
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
          <v-btn flat>Anuluj</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              
              left
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  class="my-0"
                  
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
import AlbumService from '@/services/AlbumService.js'
import { mapState } from 'vuex' 


export default {
    created() {
    AlbumService.getPosts()
      .then(response => {
        this.posts =  response.data 
        // Jeśli ładuje tylko jeden element to:
        //this.posts.push (response.data) 
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  data: ()=>({
    file: '',
    post: {
      id: 0,
      gallery: '/sciezka/do/galeri/',
      title: 'Tytuł testowy',
      content: 'Opis',
      //imgUrl: require('~/assets/img/BenNevis.jpg'),
      imgUrl: 'BenNevis.jpg',
      raport: 'opis długi',
      image: null
    }
  }),
  methods: {
    sumit(){
      this.post.id = 14
      console.log('Title: ', this.post)
      this.$store.dispatch('createPost', this.post)
    },
    onPickFile(){
      this.$refs.fileInput.click()
    },
    onFilePicked(events){
      const files = events.target.files
      let filename = files[0].filename
      this.post.imgUrl = files[0].name
      console.log('files[0].filename: ', files[0].name )
      
      // https://www.youtube.com/watch?v=J2Wp4_XRsWc 9:00
      const fileReader = new FileReader()
      fileReader.addEventListener('load', ()=>{

        this.post.imgUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.post.image = files[0]
    }
  },
  computed: mapState({
    //post: state=> state.albumModule.post
  })
}
</script>
