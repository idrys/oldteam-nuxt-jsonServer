<template>
<div>
  <Banner></Banner>
  <Description></Description>

   <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="post in albumModule.posts" :key="post.id" :post="post" xs4>
        <v-card >
          <Album 
            :post = post
            :edit = false
            ></Album>
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

  <BannerBottom></BannerBottom>
  <About></About>
</div>
</template>


<script>
import Banner from '~/components/Banner.vue'
import BannerBottom from '~/components/BannerBottom.vue'
import About from '~/components/About.vue'
import Album from '~/components/Album.vue'
import Description from '~/components/Description.vue'
import store from '~/store/index.js'
import Vuex from 'vuex'
import {mapState, mapGetters} from 'vuex'

export default {
  components:{
    Album,
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
    ... mapState(['albumModule']),
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
        this.$vuetify.goTo(600)
      }
    },

  },

}
</script>