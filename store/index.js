import Vue from 'vue'
import Vuex from 'vuex'
import PostsService from '@/services/PostsService.js'
//import {mapState} from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
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
  mutations: {
    ADD_POST(state, post) {
      state.posts.push(post)
    },
    SET_POST(state, posts, page){
      state.posts = posts
      this.state.pagination.page = page
    },
    GET_POST_PAGE(){
      //console.log('page: ' , page)
      return this.state.pagination.page 
    },
    SET_POSTS_TOTAL(tate, eventsTotal){
      //console.log('eventsTotal: ' , eventsTotal)
      this.state.pagination.totalItems = eventsTotal
    },

  },

  actions: {
    createPost({ commit }, post) {
      return PostsService.Post(post).then(() => {
        commit('ADD_POST', post)
      })
    },

    fetchEvents({ commit }, { perPage, page }) {
      PostsService.getPosts(perPage, page)
        .then(response => {
          commit(
            'SET_POSTS_TOTAL',
            parseInt(response.headers['x-total-count'])
          )
          commit('SET_POST', response.data)
          console.log('PAge: ', page)
          //commit('SET_POST_PAGE', page)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
    },

    fetchEvents({commit}, page){
      PostsService.getPosts(this.state.pagination.perPage, page)
      .then(response => {
        commit(
          'SET_POSTS_TOTAL',
          parseInt(response.headers['x-total-count'])
        )
        commit('SET_POST', response.data, page)
        //console.log('PAge: ', page)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
    },

    getPage({commit}){
      return commit('GET_POST_PAGE')
    }

  },
  getters: {
    getPostById: state => id => {
      return state.posts.find(post => post.id === id)
    },
    pagin: state => {
      return state.pagination
    },
  }
  
})

export default store