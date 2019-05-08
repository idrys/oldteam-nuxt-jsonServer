<template>
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
</template>
<script>
import PostsService from '@/services/PostsService.js'
import Departure from '~/components/Departure.vue'

export default {
  components:{
    Departure
  },

  created() {
    PostsService.getPosts()
      .then(response => {
        this.posts =  response.data 
        // Jeśli ładuje tylko jeden element to:
        //this.posts.push (response.data) 
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

