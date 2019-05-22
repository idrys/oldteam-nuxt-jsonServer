<template>
<div>

  <Banner></Banner>
  <Description></Description>

   <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex v-for="post in posts" :key="post.id" :post="post" xs4>
        <v-card >
          <Departure 
            :post = post
            ></Departure>
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
      
<v-btn ref="button" color="primary" block @click="$vuetify.goTo(target, options)">scroll</v-btn>

  <BannerBottom></BannerBottom>
  <About></About>
</div>
</template>


<script>
//import PostList from './PostList.vue'
import Banner from '~/components/Banner.vue'
import BannerBottom from '~/components/BannerBottom.vue'
import About from '~/components/About.vue'
import Departure from '~/components/Departure.vue'
import Description from '~/components/Description.vue'
import store from '~/store/index.js'
import Vuex from 'vuex'
import {mapState, mapGetters} from 'vuex'

export default {
  components:{
    Departure,
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
    ... mapState(['posts']),
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

  // computed: {
  //   
  // },
}
</script>