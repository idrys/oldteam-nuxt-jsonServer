<template>
  <div>
    <br>
    <h1>Album # {{ this.$route.params.id}}</h1>    
      <v-card >
        <AlbumEdit
          :post =   albumModule.posts[0]  
          ></AlbumEdit>
      </v-card>
  </div>
</template>
<script>
import AlbumEdit from '@/components/Admin/AlbumEdit.vue'
import Album from '~/components/Album.vue'
import {mapState, mapGetters} from 'vuex'

export default {

  created() {
    this.$store.dispatch('albumModule/fetchAlbum', this.$route.params.id)
   },

  components:{
    AlbumEdit,
    Album
  },

  computed:{
    ... mapState(['albumModule']),
    
  }
}
</script>
