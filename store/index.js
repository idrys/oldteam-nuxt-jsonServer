import Vue from 'vue'
import Vuex from 'vuex'

import * as userModule from '@/store/modules/user.js'
import * as albumModule from '@/store/modules/album.js'
import * as articleModule from '@/store/modules/article.js'
import * as notification from '@/store/modules/notification.js'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  
  modules: {
    userModule,
    albumModule,
    notification,
    articleModule,
  },

  state: {
    albums: [],
  }

})


export default store