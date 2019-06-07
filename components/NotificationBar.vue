<template>

<div>
  <div class="notification-bar" :class="notificationTypeClass">
    <v-alert
      color="rgb(0, 0, 0, 0.9)"

      v-model="alert"
      :value="true"
      
      dismissible
      absolute
      
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
  methods: mapActions('notification', ['remove']),
  data () {
      return {
        alert: true,
        timeout: null
      }
    },
  computed: {
    notificationTypeClass(){
      return '-text-${this.notification.type}'
    }
  }
}
</script>
<style scoped>
.notification-bar{
   margin: 1em 0 1em;
}
</style>