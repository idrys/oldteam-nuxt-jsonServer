<template>
  <div>
    <v-container fluid>
      <v-layout justify-center>
        <v-card md="3"
          class="pa-2" justify-center>
      
          <v-img 
            :src=articleProp.image            
            width="700"
          >
        </v-img>
        
      </v-card>
    </v-layout>
  </v-container>
  <v-container fluid>
      <v-layout justify-center > 
        <v-card md="3" color="#fafafa" flat class="pa-2" justify-center max-width="750">
        
        <p class="display-2">{{articleProp.title}}</p>
        
          <v-card-text>
             
  
            <v-layout>

              <v-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                
                </v-avatar>
            </v-layout>
              

                <p>Sławomir Witkowski</p>
                
              
              
              <span class="display-1" v-html="articleProp.body"></span>
            
          

          </v-card-text>
          
        </v-card>
        <v-card>

        </v-card>
        

    </v-layout>
  </v-container>
  </div>
</template>

<script>
import Vue from 'vue';
//const Vue = window.vue;
export default {
  props:{
    articleProp: Object
  },
  methods: {
   
    
    dialogImg(){
      console.log('Nowe !!')
    }
  },
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Questrial");

.display-2 {
  font-family:'Times New Roman', sans-serif !important;
};

.display-1 {
  font-family:'Times New Roman', sans-serif !important;
};

.subheading {
    font-size: 26px !important;
    font-weight: 400;
}
</style>