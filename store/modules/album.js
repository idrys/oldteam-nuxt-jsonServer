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
    totalItems: 11,
    rowsPerPageItems: [1, 2, 4, 8, 16],

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
    state.posts = posts
  },
  GET_POST_PAGE(){
    return this.state.pagination.page 
  },

  SET_POSTS_TOTAL(state, eventsTotal){
      state.pagination.totalItems = eventsTotal
  },

  DELETE_POST(state, id){
    var newArray = state.posts.filter(function(el){
      return el.id == id
    })
    state.posts.splice(newArray, 1);
  }
}

export const actions = {
  createNewAlbum({ commit, dispatch }, newAlbum) {
    console.log('Wartość nwego albumu: ', newAlbum)
    return AlbumService.storeAlbum(newAlbum)
        .then(response  => {
          commit('ADD_POST', newAlbum)
          const notification = {
            type: 'success',
            massege: 'Twój album został właśnie utworzony.'
          }
          dispatch('notification/add', notification, {root: true})
          console.log("SUKCES: udało się przekazać nowy albumu do API", response)
          //this.$router.push('/Admin/AlbumEditList/')
        })
        .catch(error => {
          console.log("Błąd: Nie udało się przekazać nowego albumu do API", error.response)
          //console.log('Błąd: There was an error:', error)
          const notification = {
            type: 'error',
            massege: 'Wystąpił problem z tworzeniem nowego Albumu. ' +  error
          }
          dispatch('notification/add', notification, {root: true})
          //console.log("PORAŻKA: nie udało się przekazać nowego albumu do API")
          throw error
        })
  },
///-----------------------------------------------------------------------------

  // fetchEvents({ commit, dispatch }, { perPage, page }) {
  //   //console.log('fetchEvents2')
  //   AlbumService.getPosts(perPage, page)
  //     .then(response => {
        
  //       commit(
  //         'SET_POSTS_TOTAL',
  //         parseInt(response.headers['x-total-count'])
  //       )
  //       commit('SET_POST', response.data)
  //       //console.log('PAge: ', page)
  //       //commit('SET_POST_PAGE', page)
  //       const notification = {
  //         type: 'success',
  //         massege: '({ commit, dispatch }, { perPage, page }) - Udało się załadować stronę z albumami'
  //       }
  //       //dispatch('notification/add', notification, {root: true})
  //       //dispatch('notification/remove', notification, {root: true})
  //     })
  //     .catch(error => {
  //       console.log('There was an error:', error.response)
  //       const notification = {
  //         type: 'error',
  //         massege: 'Wystąpił problem z ładowaniem Albumu. ' +  error.response
  //       }
  //       dispatch('notification/add', notification, {root: true})
  //     })
  // },
///-----------------------------------------------------------------------------


  fetchEvents({commit, dispatch, getters}, page){
    // Wyciągam ile jest w sumie wszytkich albumów
    AlbumService.albumsCounter()
    .then(response => {
      console.log('Sukces: ', response)
      commit( 'SET_POSTS_TOTAL',response.data )
    })
    .catch(error => {
      console.log('There was an error:', error.response)
    })

    // Pobieram albumy 
    AlbumService.getPosts(state.pagination.perPage, page)
    .then(response => {
      // Przeniosłem do AlbumService.albumsCounter()
      // commit(
      //   'SET_POSTS_TOTAL', //response.data.length
      //   parseInt(response.headers['x-total-count'])     
      // )
      commit('SET_POST', response.data, page)   
    })
    .catch(error => {
      console.log('There was an error:', error.response)
      const notification = {
        type: 'error',
        massege: 'Wystąpił problem z ładowaniem Albumu. ' +  error.response
      }
      dispatch('notification/add', notification, {root: true})
    })
  },
///-----------------------------------------------------------------------------

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
          dispatch('notification/add', notification, {root: true})
        })
    }
  },
///-----------------------------------------------------------------------------

  fetchImage({commit},  album){
    console.log('Album1: ', album);
    AlbumService.uploadImage( album )
    .then(function (response) {
        response.data.success
        console.log('Udało się wysłac dane! ', response.data)
      })
      .catch(function (error) {
          //console.log('Błąd w fetchImage: ', error );
          error
      });
  },
///-----------------------------------------------------------------------------

  deleteAlbum({ commit, getters, dispatch },id ) {  
    AlbumService.delete(id)
    .then(response => {
      commit('DELETE_POST', response.data)
      dispatch('fetchEvents', 1 )

      const notification = {
        type: 'success',
        massege: 'Album został usunięty.',
      }
      dispatch('notification/add', notification, {root: true})
    })
    .catch(error => {
      console.log('There was an error:', error)
      const notification = {
        type: 'error',
        massege: 'Wystąpił problem z usuwaniem Albumu. ' +  error.response,
      }
      dispatch('notification/add', notification, {root: true})
    })
  },
 ///-----------------------------------------------------------------------------
 

  updateAlbum({commit, getters, dispatch}, post) {
    console.log('id= ' + post.id)
     console.log('post: ', post.title)
    AlbumService.update(post)
     .then(response => {
       //commit('  SET_POST', response.data)
       const notification = {
        type: 'success',
        massege: 'Twój album został zaktualizowany.'
      }
      dispatch('notification/add', notification, {root: true})
      this.$router.push('/Admin/AlbumEditList/')
     })
     .catch(error => {
       console.log('There was an error:', error.response)
       const notification = {
        type: 'success',
        massege: 'Wystąpił problem z aktualizacją alubumu. ' + error.response
      }
      dispatch('notification/add', notification, {root: true})
     })
  },
///-----------------------------------------------------------------------------

}

export const getters = {
  getAlbumById: state => id => {
    return state.posts.find(post => post.id === id)
  },
  pagin: state => {
     return state.pagination
  },
}