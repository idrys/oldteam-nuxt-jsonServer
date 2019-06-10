<template>
<div>

  <!-- <NotificationContainer/> -->


  <AlbumList></AlbumList>
</div>
</template>

<script>
//import NotificationContainer from '@/components/NotificationContainer'
import AlbumList from './AlbumList.vue'
import Banner from '~/components/Banner.vue'
import BannerBottom from '~/components/BannerBottom.vue'
import About from '~/components/About.vue'
import store from '~/store/index.js'
import Vuex from 'vuex'
import { mapState, mapGetters } from 'vuex' 


export default {
  data: {
    price: 5,
    quantity: 2,
    total: 0,
    target: null,
    storage: []
  },
  method:{
    target () { 
      total = price * quantity
    },
     record (){
      storage.push(target)
    },
    replay(){
      storage.forEach(run => run());
    }
  },
    
  computed: {
    ...mapState(['user']),
    ...mapGetters({
      pagin: 'albumModule/pagin'
     } ) 
    //...mapGetters(['getPostById'] ) ,
    // test(){
    //   price = 20
    //   console.log('Wartość przed:' ) // => 10
    //   replay()
    //   console.log('Wartość po: ' + total) // => 40
    // }
},
  components: {
    //NotificationContainer,
    Banner,
    AlbumList,
    BannerBottom,
    About,
    Vuex,
    store
    
  },
  data(){
    return {
      //title: "Test"
    }
    
  },
  
  beforeDestroy () {
    console.log('beforeDestroy')
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },

  mounted () {
    this.onResize()
  },

  methods: {
    onResize () {
      console.log('Resize')
      if (this.$vuetify.breakpoint.xl){
        //console.log("PerPage: ", this.pagin.perPage)
        this.pagin.perPage = 12
        console.log("New PerPage: ", this.pagin.perPage)
      }
    }
  }
}
</script>
