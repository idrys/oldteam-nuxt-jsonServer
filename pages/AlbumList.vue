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

import {mapState, mapGetters, mapActions} from 'vuex'

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
    this.$store.dispatch('albumModule/fetchEvents', 1)
    
  },
  computed: {
    ...mapState(['albumModule']),
    //...mapActions(['notification']),
    ...mapGetters({
      pagin: 'albumModule/pagin'
     } ) ,

    // Ile stron =  wszystkie karty / ilość kart na stronie
    pages () {
      const notifi = {
        type: 'ok',
        massege: 'fetchEvents({commit, dispatch}, page) - Udało się załadować stronę z albumami'
      }
      //this.$store.dispatch('notification/add', notifi)
      //console.log( this.$store._mutations )
      return  Math.ceil(this.pagin.totalItems/this.pagin.perPage ) 
    },


    pagination: {
      get: function () {
        return  this.$data.page
      },
      set: function (value) {
        this.$data.page = value
        this.$store.dispatch('albumModule/fetchEvents', value)
        this.$vuetify.goTo(600)
      }
    },

  },

}
</script>