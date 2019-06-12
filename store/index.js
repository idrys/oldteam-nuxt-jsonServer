import Vue from 'vue'
import Vuex from 'vuex'

import * as userModule from '@/store/modules/user.js'
import * as albumModule from '@/store/modules/album.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  
  modules: {
    userModule,
    albumModule,
    notification,

  },

  state: {
    posts: [],
  }

})


export default store