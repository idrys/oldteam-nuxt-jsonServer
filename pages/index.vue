<template>
<div>
  <Banner></Banner>
    <v-container grid-list-md text-xs-center>
      <h2 class="headline">Zdobywamy koronę Europy</h2>
      <span class="subheading">
          ... a przy okazji dobrze się bawimy
      </span>
  </v-container> 
  <Departures></Departures>
  <BannerBottom></BannerBottom>
  <About></About>
</div>
</template>

<script>
import Banner from '~/components/Banner.vue'
import Departures from '~/components/Departures.vue'
import BannerBottom from '~/components/BannerBottom.vue'
import About from '~/components/About.vue'
import store from '~/store/index.js'
import Vuex from 'vuex'
import { mapState } from 'vuex' 
//import { store } from '~/store/index.js'

export default {
  components: {
    Banner,
    Departures,
    BannerBottom,
    About,
    Vuex,
    //store
    
  },
  data(){
    return {
      //title: "Test"
    }
    
  }
}
</script>
