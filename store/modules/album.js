import AlbumService from '@/services/AlbumService.js'


export const namespaced = true

export const state = {
  albums: [{
    id: 0,
      gallery: '',
      title: '',
      content: '',
      imgUrl: 'BenNevis.jpg',
      raport: 'opis długi',
      image: {
        key: 'albumtmp'
      }
  }],
  // albums: [{
  //   id: 0,
  //     gallery: '/sciezka/do/galeri/',
  //     title: 'Tytuł testowy',
  //     content: 'Opis',
  //     imgUrl: 'BenNevis.jpg',
  //     raport: 'opis długi',
  //     image: {
  //       key: 'albumtmp'
  //     }
  // }],
  pagination: {
    descending: true,
    page: 1,
    perPage: 9,
    totalItems: 11,
    rowsPerPageItems: [1, 2, 4, 8, 16],

  }
}

export const mutations = {
  ADD_POST(state, album) {
    //state.albums.push(album) // wstawia na koniec tablicy
    state.albums.unshift(album) // wstawia na początek tablicy
  },
  SET_POST(state, albums, page){
    state.albums = albums
    this.state.pagination.page = page
  },
  SET_POST(state, albums){
    //console.log(albums)
    state.albums = albums
  },

  UPDATA_POST(state, newPost){
    var idNewPost = 0
    idNewPost = Number(newPost.id)
    var index =  state.albums.findIndex(album => album.id == idNewPost)    
    state.albums[index] = newPost 
    
    //console.log('state.albums[index]: ' , state.albums[index] )
  },

  SET_ALBUM(state, album){
    state.album = album
    //console.log('SET_ALBUM: ', state.album)
  },

  GET_POST_PAGE(){
    return this.state.pagination.page 
  },

  SET_POSTS_TOTAL(state, eventsTotal){
      state.pagination.totalItems = eventsTotal
  },

  DELETE_POST(state, id){
    var newArray = state.albums.filter(function(el){
      return el.id == id
    })
    state.albums.splice(newArray, 1);
  },

  CLEAR_POST(state, id){
    var index =  state.albums.findIndex(album => album.id == idNewPost)
    state.albums[index].image = ''
  }
}

export const actions = {
  createNewAlbum({ commit, dispatch }, newAlbum) {
    //console.log('Wartość nwego albumu: ', newAlbum)
    return AlbumService.storeAlbum(newAlbum)
        .then(response  => {
          commit('ADD_POST', response.data)
          const notification = {
            type: 'success',
            massege: 'Twój album został właśnie utworzony.'
          }
          dispatch('notification/add', notification, {root: true})
          console.log("SUKCES: udało się przekazać nowy albumu do API", response)
          this.$router.push('/Admin/AlbumEditList/')
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
      //console.log('Sukces: ', response)
      commit( 'SET_POSTS_TOTAL',response.data )
    })
    .catch(error => {
      console.log('There was an error:', error.response)
    })

    // Pobieram albumy 
    AlbumService.getPosts(state.pagination.perPage, page  )
    .then(response => {
      // Przeniosłem do AlbumService.albumsCounter()
      // commit(
      //   'SET_POSTS_TOTAL', //response.data.length
      //   parseInt(response.headers['x-total-count'])     
      // )
      //commit('CLEAR_POST', response.data.id)
      //console.log('response.data:', response.data)
      
      commit('SET_POST', response.data, page)
      
       // this.$router.push('/Admin/AlbumEditList/')   
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
    //console.log('Edytuje album id: ', id)
    //var album = getters.getAlbumById(id)
    //  if (album) {
    //   console.log('jeden')
    //    commit('SET_POST', album)
    // } else {
      //console.log('else')
      AlbumService.getPost(id)
        .then(response => {
          //commit('SET_POST', response.data)
          commit('SET_ALBUM', response.data)
          //console.log('Dane z API: ', response.data)
        })
        .catch(error => {
          console.log('There was an error:', error.response)
          // const notification = {
          //   type: 'error',
          //   massege: 'Wystąpił problem z ładowaniem Albumu. ' +  error.response
          // }
          // dispatch('notification/add', notification, {root: true})
        })
    //}
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

  deleteAlbum({ commit, dispatch },id ) {  
    console.log('Usuwanie album id: ', id  )
    AlbumService.delete(id)
    .then(response => {
      commit('DELETE_POST', response.data)
      dispatch('fetchEvents', 1 ) // Odświezenie, wczytuje pierwsza strone ( 9 albumow )
      console.log('Usuwanie albumu: ', response.data)
      const notification = {
        type: 'success',
        massege: 'Album został usunięty.',
      }
      dispatch('notification/add', notification, {root: true})
    })
    .catch(error => {
      console.log('Wystąpił problem z usuwaniem Albumu:', error)
      const notification = {
        type: 'error',
        massege: 'Wystąpił problem z usuwaniem Albumu. ' +  error,
      }
      dispatch('notification/add', notification, {root: true})
    })
  },
 ///-----------------------------------------------------------------------------
 

  updateAlbum({commit, getters, dispatch}, album) {
    //console.log('id= ' + album.id)
     //console.log('album: ', album.title)
    AlbumService.update(album)
     .then(response => {
       console.log('Po')
       commit('UPDATA_POST', response.data)

       const notification = {
        type: 'success',
        massege: 'Twój album został zaktualizowany.'
      }
      dispatch('notification/add', notification, {root: true})
      this.$router.push('/Admin/AlbumEditList/')
     })
     .catch(error => {
       console.log('Wystąpił błąd podczas aktualizacji danych w bazie:', error.response)
       const notification = {
        type: 'error',
        massege: 'Wystąpił problem z aktualizacją albumu. '
      }
      dispatch('notification/add', notification, {root: true})
      this.$router.push('/Admin/AlbumEditList/')
     })
  },
///-----------------------------------------------------------------------------

}

export const getters = {
  getAlbumById: state => id => {
    //var album = 0
    //console.log('Liczba elementów w tablicy albums: ', state.albums.length)
    // state.albums.find(album => album.id === id)
     console.log('Album getAlbumById: ', state.albums.find(album => album.id === id))
    return state.albums.find(album => album.id == id)
  },
  getAlbum: state => {
    return state.albums[0];
  },
  pagin: state => {
     return state.pagination
  },
}