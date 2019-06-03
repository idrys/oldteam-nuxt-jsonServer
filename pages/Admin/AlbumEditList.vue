<template>
<div>
    <div >
      <v-btn
        @click="addAlbum"
        color="blue" 
        fab 
        normal 
        dark
        absolute    
        right>
        <v-icon>add</v-icon>
      </v-btn>     
    </div>
  <br>
  <br>
  <br>
  <h1>Albumy edytuje: {{ userModule.user.name }}</h1>
   <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="post in albumModule.posts" :key="post.id" :post="post" xs4>
        <v-card >
          <AlbumEdit
            :post = post
            :edit = true
            ></AlbumEdit>
        </v-card>
      </v-flex> 

    </v-layout>
  </v-container>

  <v-container text-xs-center>
         <v-layout align-center justify-center row fill-height>
          <v-pagination
            v-model="pagination"
            :length="pages"
            >          
          </v-pagination>
        </v-layout>
  </v-container>
  
</div>
</template>


<script>
import Banner from '~/components/Banner.vue'
import BannerBottom from '~/components/BannerBottom.vue'
import About from '~/components/About.vue'
import AlbumEdit from '~/components/Album.vue'
import Description from '~/components/Description.vue'
import store from '~/store/index.js'
import Vuex from 'vuex'
import {mapState, mapGetters} from 'vuex'

export default {
  components:{
    AlbumEdit,
    Banner,
    Description,
    BannerBottom,
    About
  },

  data(){
    return {
      page: 1
    }
  },

  created() {
    this.$store.dispatch('fetchEvents', 1)
  },
  computed: {
    ... mapState(['albumModule', 'userModule']),
    ...mapGetters(['pagin'] ) ,

    // Ile stron =  wszystkie karty / ilość kart na stronie
    pages () {
      return  Math.ceil( this.$store.getters.pagin.totalItems/this.$store.getters.pagin.perPage ) 
    },


    pagination: {
      get: function () {
        return  this.$data.page
      },
      set: function (value) {
        this.$data.page = value
        this.$store.dispatch('fetchEvents', value)
        this.$vuetify.goTo(600) // przsunięcie strony po wybranu następnej
      }
    },

  },
  methods:{
    addAlbum(){
      this.$router.push('/Admin/AlbumCreate/')
    },
  }

}
</script>