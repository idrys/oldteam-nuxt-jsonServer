<template>
  <v-app >
    <v-card flat app>
      <v-container fluid>
        <v-layout row child-flex wrap>
          <v-toolbar absolute >

            <v-btn fab large flat >
              <v-img :src="logo"  max-width="80"></v-img>
            </v-btn>
            <v-toolbar-title>
              Oldteam Club
            </v-toolbar-title>
            
            <v-spacer></v-spacer>
            <v-toolbar-title>   
              <v-btn><nuxt-link to="/Admin/AlbumEditList/">Edycja</nuxt-link></v-btn>
              <v-btn><nuxt-link to="/Articles/1">Artykuł</nuxt-link></v-btn>
              <v-btn><nuxt-link to="/">Logowanie</nuxt-link></v-btn>
            </v-toolbar-title>
          </v-toolbar>
        </v-layout>
      </v-container>
    </v-card>
    
    <!-- Elementy będą znajdować się pod  -->

  <!-- <v-container>
    <v-layout> -->
      
    <nuxt/>
    <!-- </v-layout>
    </v-container> -->
        <!-- Elementy będą znajdować się nad  -->



          <v-footer class="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12 >
            <div class="white--text ml-3">
              Made with
              by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
              and <a class="white--text" href="https://github.com/">Sławek Witkowski</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
  </v-app>
</template>

<script>
import NotificationBar from '@/components/NotificationBar'
import NotificationContainer from '@/components/NotificationContainer'

export default {
  components: {
    NotificationBar,
    NotificationContainer,
  },
  data() {
    return {
      logo: require('@/assets/img/logo.png'),
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
