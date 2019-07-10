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
  <!-- <v-alert :value="true" type="error">This is a info alert.</v-alert> -->
  <br>
  <br>
  <h1>Albumy edytuje: {{ userModule.user.name }}</h1>
   <v-container grid-list-md text-xs-center>
    <v-layout row wrap v-resize="onResize">
      <v-flex v-for="post in albumModule.posts" :key="post.id" :post="post" xs12 sm6 md4 xl3 lg4>
        <v-card >
          <AlbumEdit
            :post = post
            :edit = true
            ></AlbumEdit>
        </v-card>
      </v-flex> 

    </v-layout>
  </v-container>

  <!-- <NotificationContainer></NotificationContainer> -->
  <NotificationContainer></NotificationContainer>
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
import NotificationContainer from '@/components/NotificationContainer'
import Banner from '~/components/Banner.vue'
import BannerBottom from '~/components/BannerBottom.vue'
import About from '~/components/About.vue'
import AlbumEdit from '~/components/Album.vue'
import Description from '~/components/Description.vue'
//import store from '~/store/index.js'
//import Vuex from 'vuex'
import {mapState, mapGetters} from 'vuex'

export default {

  components:{
    NotificationContainer,
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
    this.$store.dispatch('albumModule/fetchEvents', 1)
  },
  computed: {
    ... mapState(['albumModule', 'userModule']),
    ...mapGetters({
      pagin: 'albumModule/pagin'
    }),

    // Ile stron =  wszystkie karty / ilość kart na stronie
    pages () {
      //console.log('totalItems: ' +  this.pagin.totalItems)
      //console.log('perPage: ' + this.pagin.perPage)
      //console.log( 'pages: ' +   Math.ceil(20/9))
      return  Math.ceil( this.pagin.totalItems/this.pagin.perPage ) 
    },

    pagination: {
      get: function () {
        return  this.$data.page
      },
      set: function (value) {
        this.$data.page = value
        this.$store.dispatch('albumModule/fetchEvents', value)
        this.$vuetify.goTo(600) // przsunięcie strony po wybranu następnej
      }
    },

  },
  mounted () {
    this.onResize() 
  },
  methods:{
    addAlbum(){
      this.$router.push('/Admin/AlbumCreate/')
    },
     onResize () { // Niedziała!
      //console.log('Resize')
      if (this.$vuetify.breakpoint.xl){
        this.pagin.perPage = 12
        //console.log("New PerPage: ", this.pagin) // Nie rozumiem czemu nie zmienia się wartość PerPage
        //this.$store.dispatch('albumModule/fetchEvents', 1)
      }
      else{
        //TODO AlbumEditList onResize() sprawdzić powinna być przypisywan dynamicznie wartość perPage
        this.pagin.perPage = 9
      }
    }
  }

}
</script>