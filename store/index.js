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
    pagination: {
      descending: true,
      page: 1,
      perPage: 9,
      totalItems: 10,
      rowsPerPageItems: [1, 2, 4, 8, 16]
    }
  },

  method: {
    // test(){
    //   dispatch('notification/add', notification, {root: true})
    // }
  }

})


export default store