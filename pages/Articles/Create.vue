<template>
  <v-responsive>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>

            <SWEditor></SWEditor>
            
        </v-flex>
      </v-layout>
    </v-container>
  </v-responsive>
</template>

<script>
import SWEditor from '~/components/Articles/Editor.vue'


export default {
  components: {
    
    SWEditor,
  },
  mounted() {
    
  },

  beforeDestroy() {
    
  },

  methods: {

    save(){
      console.log('Test', this.html);
  }
  },
  //http://localhost:3000/Articles/1
  data (){
    return{

    }
  }
}
</script>