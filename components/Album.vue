<template>
  <div>
    <div v-show="edit">

      <v-btn
        @click="editAlbum"
        color="red" 
        fab 
        small 
        dark
        absolute
        
        right>
        <v-icon>edit</v-icon>
      </v-btn>
    </div>
    
    <v-card class="elevation-10 transparent">

        <v-card-text class="text-xs-center">
         <v-img class="white--text elevation-3"  height="170px" :src="post.imgUrl" ></v-img> 
         <!-- :src="imgUrl" -->
        
        <v-flex xs12 align-end d-flex>
                <span class="headline">{{ post.title }}</span>
        </v-flex>
            {{ post.content }}
        </v-card-text>

        <v-card-actions>
            <v-btn color="warning"  v-show="post.opis" @click="opis=opis">Opis</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat class="blue--text" v-bind:href="post.gallery">Zobacz więcej</v-btn>
            <!-- <v-btn @click="Test">Test</v-btn> -->
        </v-card-actions>

    </v-card>

  </div>
</template>

<script>
export default {
  props:{
    post: Object,
    edit: true,
  },
  methods:{
    editAlbum(){
      console.log("Edit Album id: ", this.post.id)     
    }
  },
  data () {
    return {
     //edit: editProps
    }
  }
}
</script>
