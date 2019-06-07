<template>

<div>
  <div class="notification-bar" :class="notificationTypeClass">
    <v-alert
      :type="notification.type"
      :color="alertColor"
      v-model="alert"
      :value="true"
      elevation=20
      dismissible
      absolute
      icon="check_circle"
    >
    <div>
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
    this.colorsChange() 
  },
  methods: {
    ...mapActions('notification', ['remove']),
    colorsChange(){
      console.log(' this.notification.type: ',  this.notification.type)
      if ( this.notification.type == 'success' ){
        this.alertColor =  'rgb(0, 128, 0, 0.9)'
      }
      if ( this.notification.type == 'error' ){
        this.alertColor =  'rgb(255, 0, 0, 0.9)'
      }
      if ( this.notification.type == 'info' ){
        this.alertColor =  'rgb(0, 0, 255, 0.9)'
      }
      if ( this.notification.type == 'warning' ){
        this.alertColor =  'rgb(255, 165, 0, 0.9)'
      }
  console.log('color: ', this.alertColor)
    }
},
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
  },
  //methods:{
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