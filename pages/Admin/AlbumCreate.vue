<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-space-around fill-height >
      <v-flex xs4>
         <v-card class="elevation-10 transparent">

        <v-card-text class="text-xs-center">
         <v-img class="white--text elevation-3"  height="170px" :src="post.imgUrl" ></v-img> 
         <!--  :src="require('~/assets/img/' + post.imgUrl)"  -->
        
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
import axios from 'axios'

export default {
  created() {
    // AlbumService.getPosts()
    //   .then(response => {
    //     this.posts =  response.data 
    //     // Jeśli ładuje tylko jeden element to:
    //     //this.posts.push (response.data) 
    //   })
    //   .catch(error => {
    //     console.log('There was an error:', error.response)
    //   })
  },
  data: ()=>({
    file: '',
    post: {
      id: 0,
      gallery: '/sciezka/do/galeri/',
      title: 'Tytuł testowy',
      content: 'Opis',
      //imgUrl: require('~/assets/img/BenNevis.jpg'),
      imgUrl: '',
      raport: 'opis długi',
      image: null
    }
  }),

  methods: {

    sumit(){
      
      //this.post.id = new Date().valueOf();
      //this.$store.dispatch('albumModule/fetchImage', this.post)
      this.$store.dispatch('albumModule/createNewAlbum', this.post)
      //this.$router.push('/Admin/AlbumEditList/')
    },

    cancel(){
      this.$router.push('/Admin/AlbumEditList/')
    },

    reset(){

    },
    onPickFile(){
      this.$refs.fileInput.click()
    },

    onFilePicked(events){
      const files = events.target.files
      let filename = files[0].name

      

      if(filename.lastIndexOf('.') <= 0){
        console.log('Coś z tym plikiem jest nie tak!')
      }
      else{
        console.log('Plik graficzny jest OK')
      }
      // saveInTempFolder(files[0].name)

      const fileReader = new FileReader()
      fileReader.addEventListener('load', ()=>{
        console.log('Wykonuje: addEventListener ')
        this.post.imgUrl = fileReader.result

      })
      fileReader.readAsDataURL(files[0])
      this.post.image = files[0];
    
      //var image = new Image();
      //image.src = this.post.image;

      

      //this.$store.dispatch('albumModule/fetchImage', files[0])

      // https://www.youtube.com/watch?v=J2Wp4_XRsWc 9:00
      // const fileReader = new FileReader()
      // fileReader.addEventListener('load', ()=>{

      //   this.post.imgUrl = fileReader.result
      // })
      // fileReader.readAsDataURL(files[0])
      // this.post.image = files[0]

      // const config = {
      //     headers: { 'content-type': 'multipart/form-data' }
      // }

      //let formData = new FormData();
      //formData.append('image', this.image);

      // axios.post('http://127.0.0.1:8000/api/formSubmit', files[0], config)
      // .then(function (response) {
      //     currentObj.success = response.data.success;
      // })
      // .catch(function (error) {
      //     currentObj.output = error;
      // });
    },

    resizeImage(img){
      var MAX_WIDTH = 800;
      var MAX_HEIGHT = 600;
      var width = img.width;
      var height = img.height;
      
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      return ctx.drawImage(img, 0, 0, width, height);
    }
  },
  computed: mapState(['albumModule'])
}
</script>
