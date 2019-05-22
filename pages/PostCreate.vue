<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-space-around fill-height >
      <v-flex xs4>
         <v-card class="elevation-10 transparent">

        <v-card-text class="text-xs-center">
         <v-img class="white--text elevation-3"  height="170px" :src="imgUrl" ></v-img> 
         <!-- :src="imgUrl" -->
        
        <v-flex xs12 align-end d-flex>
          
                <span class="headline" v-show="title==''">Tytuł</span>
                <span class="headline" v-show="title">{{title}}</span>
        </v-flex>
            <p v-show="content==''">Opis</p>
            <p v-show="content">{{content}}</p>
        </v-card-text>

        <v-card-actions>
            <p v-show="raport">
              <v-btn flat  class="blue--text">Sprawozdanie</v-btn>
            </p>
            <!-- <v-btn color="warning" >Opis</v-btn> -->
            <v-spacer></v-spacer>
            <p v-show="gallery">
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
          v-model="imgUrl"
          >
        </v-text-field>
        <v-text-field 
          label="Tytuł"
          v-model="title"
          >
        </v-text-field>
        <v-text-field 
          label="Opis"
          v-model="content"
          >
        </v-text-field>
         
        <v-text-field           
          label="Ścieka do galerii"
          v-model="gallery"
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
          <v-btn color="primary" flat >Zapisz</v-btn>
        </v-card-actions>

    </v-card>
    </v-flex> 
    </v-layout> 
  </v-container>

</template>
<script>
import PostsService from '@/services/PostsService.js'

export default {
    created() {
    PostsService.getPosts()
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
    //post: Object,
    gallery: '',
    title: '',
    content: '',
    imgUrl: '',
    raport: '',
  })
}
</script>
