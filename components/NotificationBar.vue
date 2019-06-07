<template>

<div>
  <div class="notification-bar" :class="notificationTypeClass">
    <v-alert
      :color="alertColor"
      v-model="alert"
      :value="true"
      elevation=20
      dismissible
      absolute
      dark
    >
    <div>
      <v-icon dark left>error</v-icon>
      {{notification.massege}}
    </div>

    </v-alert>

  </div> 
</div>

</template>
<script>
import {mapActions} from 'vuex'


export default {

  props: {
    notification: {
      type: Object,
      messege: String,
      required: true,

    }
  },
  mounted(){
    this.timeout = setTimeout(()=> this.remove(this.notification), 5000)
  },
  //beforeDestroy(){
    //clearTimeout(this.timeout)
  //},
  created(){
    //colorsChange() 
    //console.log('this: ' + this.methods)
  },
  methods: mapActions('notification', ['remove']),

  data () {
      return {
        alert: true,
        timeout: null,
        alertColor: 'rgb(0, 0, 0, 0.9)'
      }
    },

  computed: {
    notificationTypeClass(){
      return '-text-${this.notification.type}'
    },
  }
  // methods:{
  //   colorsChange(){
  //     console.log('test colorsChange')
      // if ( this.notification.type == 'succes' ){
      //   alertColor =  'rgb(0, 128, 0, 0.9)'
      // }
      // if ( this.notification.type == 'error' ){
      //   alertColor =  'rgb(255, 0, 0, 0.9)'
      // }
   // }
  //}
}
</script>

<style scoped>
.notification-bar{
   margin: 1em 0 1em;
}
</style>