<template>
  <div>
    <br>
    <h1>Album # {{ this.$route.params.id}}</h1>  
         
      <v-card >
        <AlbumEdit
          :post =   getAlbum(this.$route.params.id)
          ></AlbumEdit>
      </v-card>
  </div>
</template>
<script>
import AlbumEdit from '@/components/Admin/AlbumEdit.vue'
import Album from '~/components/Album.vue'
import {mapState, mapGetters} from 'vuex'
//albumModule.posts[0]
export default {

  data() {
    return {
      album : null
    }
  },

  created() {
    this.$store.dispatch('albumModule/fetchAlbum', this.$route.params.id)
    this.find()
   },

  components:{
    AlbumEdit,
    Album
  },

  computed:{
    //... mapState(['albumModule']),
    ... mapState({
      albumModule: 'albumModule'
      }),

    ...mapGetters({
      getAlbumById: 'albumModule/getAlbumById'
    }),

   
  },

  methods:{
    find(){
      //console.log('albumModule.state.posts', this.$store.state)
    },
     getAlbum(id) {
        return this.$store.state.albumModule.posts.find(post => post.id == id)
      }
  }
}
</script>
