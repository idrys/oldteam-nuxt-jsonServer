import AlbumService from '@/services/AlbumService.js'

export const state = {
  posts: [],
  pagination: {
    descending: true,
    page: 1,
    perPage: 9,
    totalItems: 10,
    rowsPerPageItems: [1, 2, 4, 8, 16]
  }
}

export const mutations = {
  ADD_POST(state, post) {
    state.posts.push(post)
  },
  SET_POST(state, posts, page){
    state.posts = posts
    this.state.pagination.page = page
  },
  GET_POST_PAGE(){
    return this.state.pagination.page 
  },
  SET_POSTS_TOTAL(tate, eventsTotal){
    //console.log('eventsTotal: ' , eventsTotal)
    this.state.pagination.totalItems = eventsTotal
  },
  
}

export const actions = {
  
  createPost({ commit }, post) {
    console.log('Wartość posta: ', post)
    return AlbumService.Post(post)
        .then(() => {
          commit('ADD_POST', post)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
  },

  fetchEvents({ commit }, { perPage, page }) {
    AlbumService.getPosts(perPage, page)
      .then(response => {
        commit(
          'SET_POSTS_TOTAL',
          parseInt(response.headers['x-total-count'])
        )
        commit('SET_POST', response.data)
        //console.log('PAge: ', page)
        //commit('SET_POST_PAGE', page)
      })
      .catch(error => {
        console.log('There was an error:', error.response)
      })
  },

  fetchEvents({commit}, page){
    AlbumService.getPosts(this.state.pagination.perPage, page)
    .then(response => {
      commit(
        'SET_POSTS_TOTAL',
        parseInt(response.headers['x-total-count'])
      )
      commit('SET_POST', response.data, page)
    })
    .catch(error => {
      console.log('There was an error:', error.response)
    })
  },

  getPage({commit}){
    return commit('GET_POST_PAGE')
  }

}

export const getters = {
  getPostById: state => id => {
    return state.posts.find(post => post.id === id)
  },
  pagin: state => {
    return state.pagination
  },
}



//export default store