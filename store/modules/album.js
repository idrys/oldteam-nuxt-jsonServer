import AlbumService from '@/services/AlbumService.js'


export const namespaced = true

export const state = {
  posts: [{
    id: 0,
      gallery: '/sciezka/do/galeri/',
      title: 'Tytuł testowy',
      content: 'Opis',
      imgUrl: 'BenNevis.jpg',
      raport: 'opis długi',
      image: null
  }],
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
  SET_POST(state, posts){
    //console.log('SET_POST')
    state.posts = posts
    //console.log('SET_POST -> posts: ', state.posts)
  },
  GET_POST_PAGE(){
    return this.state.pagination.page 
  },
  SET_POSTS_TOTAL(tate, eventsTotal){
    //console.log('eventsTotal: ' , eventsTotal)
    this.state.pagination.totalItems = eventsTotal
  },
  DELETE_POST(state, id){
    //console.log('id=',id)
    var newArray = state.posts.filter(function(el){
      return el.id == id
    })
    state.posts.splice(newArray, 1);
    //console.log(newArray)
    //this.state.posts
  }
}

export const actions = {


  createPost({ commit, dispatch }, post) {
    console.log('Wartość posta: ', post)
    return AlbumService.Post(post)
        .then(() => {

          console.log("SUKCES")
          commit('ADD_POST', post)
          const notification = {
            type: 'sukces',
            massege: 'Twój album został właśnie utworzony.'
          }
          dispatch('notification/add', notification, {root: true})
        })
        .catch(error => {
          console.log('Błąd: There was an error:', error)
          const notification = {
            type: 'błąd',
            massege: 'Wystąpił problem z tworzeniem nowego Albumu. ' +  error
          }
          dispatch('notification/add', notification, {root: true})
          console.log("PORAŻKA")
          throw error
        })
  },

  fetchEvents({ commit, dispatch }, { perPage, page }) {
    AlbumService.getPosts(perPage, page)
      .then(response => {
        commit(
          'SET_POSTS_TOTAL',
          parseInt(response.headers['x-total-count'])
        )
        commit('SET_POST', response.data)
        //console.log('PAge: ', page)
        //commit('SET_POST_PAGE', page)
        const notification = {
          type: 'ok',
          massege: '({ commit, dispatch }, { perPage, page }) - Udało się załadować stronę z albumami'
        }
        //dispatch('notification/add', notification, {root: true})
        //dispatch('notification/remove', notification, {root: true})
      })
      .catch(error => {
        console.log('There was an error:', error.response)
        const notification = {
          type: 'error',
          massege: 'Wystąpił problem z ładowaniem Albumu. ' +  error.response
        }
        //dispatch('notification/add', notification, {root: true})
      })
  },

  fetchEvents({commit, dispatch }, page){
    AlbumService.getPosts(this.state.pagination.perPage, page)
    .then(response => {
      commit(
        'SET_POSTS_TOTAL',
        parseInt(response.headers['x-total-count'])
      )
      commit('SET_POST', response.data, page)
      const notification = {
        type: 'ok',
        massege: 'fetchEvents({commit, dispatch}, page) - Udało się załadować stronę z albumami'
      }
      //dispatch('notification/add', notification, {root: true})
      
    })
    .catch(error => {
      console.log('There was an error:', error.response)
      const notification = {
        type: 'error',
        massege: 'Wystąpił problem z ładowaniem Albumu. ' +  error.response
      }
      //dispatch('notification/add', notification, {root: true})
    })
  },

  fetchAlbum({ commit, getters, dispatch }, id) {
    var album = getters.getAlbumById(id)
     if (album) {
       commit('SET_POST', album)
    } else {
      AlbumService.getPost(id)
        .then(response => {
          commit('SET_POST', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
          const notification = {
            type: 'error',
            massege: 'Wystąpił problem z ładowaniem Albumu. ' +  error.response
          }
          //dispatch('notification/add', notification, {root: true})
        })
    }
  },

  deleteAlbum({ commit, getters, dispatch }, id) {  
    AlbumService.delete(id)
    .then(response => {
      commit('DELETE_POST', response.data)
    })
    .catch(error => {
      console.log('There was an error:', error.response)
      const notification = {
        type: 'error',
        massege: 'Wystąpił problem z usuwaniem Albumu. ' +  error.response
      }
      //dispatch('notification/add', notification, {root: true})
    })
  },

  updateAlbum({commit, getters}, post) {
    //console.log('id= ' + post.id)
    // console.log('post: ', post.title)
    AlbumService.update(post)
    // .then(response => {
    //   commit('UPDATE_POST', response.data)
    // })
    // .catch(error => {
    //   console.log('There was an error:', error.response)
    // })
  },

}

export const getters = {
  getAlbumById: state => id => {
    return state.posts.find(post => post.id === id)
  },
  pagin: state => {
    //console.log(state)
    return state.pagination
  },
}