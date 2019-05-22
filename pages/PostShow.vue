<template>
   <v-container grid-list-md text-xs-center>
    <v-layout align-center fill-height justify-center>
      <v-flex v-for="post in posts" :key="post.id" :post="post" xs4>
        <v-card >
          <Departure 
            :post = post
            ></Departure>
        </v-card>
      </v-flex>  
    </v-layout>
  </v-container>
</template>
<script>
import PostsService from '@/services/PostsService.js'
import Departure from '~/components/Departure.vue'

export default {
  components:{
    Departure
  },

  created() {
    PostsService.getPost(1)
      .then(response => {
        
        // Jeśli ładuje tylko jeden element to:
        this.posts.push (response.data) 
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },
  data () {
    return {
      posts: []
    }
  }
}
</script>