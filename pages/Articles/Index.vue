<template>
<v-content>
<v-container >

  <div>
    <div class="d-block pa-2  accent-4 white--text"></div>
    
  </div>
    
<h1>Albumy edytuje: {{ userModule.user.name }}</h1>
  
   
  <div v-for="article in articleModule.articles" :key="article.id">
    <v-card  class="d-flex align-stretch mb-6">
    <v-card class="shrink"> 

    <v-img
      class="white--text"
      height="200px"
      
      src=""
    >
      <v-card-title class="align-end fill-height">{{article.title}}</v-card-title>
    </v-img>
    </v-card >

    <v-card >
    <v-card-text>
      <span><h1>{{article.title}}</h1></span><br>
      <span class="text--primary">
        <span>Autor: {{article.author}}</span><br>
        <span>Whitsunday Island, Whitsunday Islands</span>
      </span>
    </v-card-text>
    <v-card-actions>
       <v-btn
        text
        color="orange"
      >
        Edytuj
      </v-btn>
    </v-card-actions>
    </v-card>

    </v-card>

  </div>

   
</v-container>
</v-content>
</template>

<script>
import ArticleService from '@/services/ArticleService.js'
//import AlbumService from '@/services/AlbumService.js'
import { mapState, mapGetters } from 'vuex' 
import axios from 'axios'

export default {
  components: {
    ArticleService,
  },
  
  created() {
    this.$store.dispatch('articleModule/fetchArticles', 1)
  },

  data: () => ({
    page: 0,
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding',
      },
    ],
  }),
  
  computed: {
    ... mapState(['articleModule', 'userModule']),
    ...mapGetters({ pagin: 'articleModule/pagin' }),
  
    pages () { // Ile stron =  wszystkie karty / ilość kart na stronie
      return  Math.ceil( this.pagin.totalItems/this.pagin.perPage ) 
    },

    pagination: {
      get: function () {
        return  this.$data.page
      },
      set: function (value) {
        this.$data.page = value
        this.$store.dispatch('articleModule/fetchArticles', value)
        this.$vuetify.goTo(600) // przsunięcie strony po wybranu następnej
      }
    },

  },
  }
</script>