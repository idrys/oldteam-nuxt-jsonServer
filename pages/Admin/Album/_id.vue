<template>
  <div>
    <br>
    <h1>Album # {{ this.$route.params.id}}</h1>  
         
      <v-card >
        <AlbumEdit
          :album =   getAlbum(this.$route.params.id)
          ></AlbumEdit>
      </v-card>
  </div>
</template>
<script>
import AlbumEdit from '@/components/Admin/AlbumEdit.vue'
import Album from '~/components/Album.vue'
import {mapState, mapGetters} from 'vuex'
//albumModule.albums[0]
export default {

  data() {
    return {
      album : null
    }
  },

  created() {
    this.$store.dispatch('albumModule/fetchAlbum', this.$route.params.id)
    
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
     getAlbum(id) {
        return this.$store.state.albumModule.albums.find(album => album.id == id)
      }
  }
}
</script>
