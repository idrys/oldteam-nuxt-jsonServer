import ArticleService from '@/services/ArticleService.js'
//import AlbumService from '@/services/AlbumService.js'


export const namespaced = true

export const state = {
  articles: [{
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

  pagination: {
    descending: true,
    page: 1,
    perPage: 3,
    totalItems: 11,
    rowsPerPageItems: [1, 2, 4, 8, 16],
  }
}

export const mutations = {
  ADD_ARTICLE(state, article) {
    //state.articles.push(article) // wstawia na koniec tablicy
    state.articles.unshift(article) // wstawia na początek tablicy
  },
  SET_ARTICLE(state, articles, page){
    state.articles = articles
    this.state.pagination.page = page
  },
  SET_ARTICLES(state, articles){
    console.log(articles)
    state.articles = articles
  },

  UPDATA_ARTICLE(state, newArticle){
    var idNewArticle = 0
    idNewArticle = Number(newArticle.id)
    var index =  state.articles.findIndex(article => article.id == idNewArticle)    
    state.articles[index] = newArticle 
    
    //console.log('state.articles[index]: ' , state.articles[index] )
  },

  SET_ARTICLE(state, article){
    state.article = article
    //console.log('SET_Article: ', state.article)
  },

  GET_ARTICLE_PAGE(){
    return this.state.pagination.page 
  },

  SET_ARTICLES_TOTAL(state, eventsTotal){
      state.pagination.totalItems = eventsTotal
  },

  DELETE_ARTICLE(state, id){
    var newArray = state.articles.filter(function(el){
      return el.id == id
    })
    state.articles.splice(newArray, 1);
  },

  CLEAR_ARTICLE(state, id){
    var index =  state.articles.findIndex(article => article.id == id)
    state.articles[index].image = ''
  }
}

export const actions = {

  createNewArticle({ commit, dispatch }, newArticle) {
    //console.log('Wartość nowego artykółu: ', newArticle)
    //return AlbumService.storeAlbum(newArticle).then(response  => {})
    return ArticleService.storeArticle(newArticle)
        .then(response  => {
          commit('ADD_ARTICLE', response.data)
          const notification = {
            type: 'success',
            massege: 'Twój artykół został właśnie utworzony.'
          }
          dispatch('notification/add', notification, {root: true})
          console.log( response)
          this.$router.push('/Admin/AlbumEditList/')
        })
        .catch(error => {
          console.log("Błąd: Nie udało się przekazać nowego artykułu do API", error.response)
          const notification = {
            type: 'error',
            massege: 'Wystąpił problem z tworzeniem nowego Artykół. ' +  error
          }
          dispatch('notification/add', notification, {root: true})         
          throw error
        })
  },///-----------------------------------------------------------------------------

  fetchArticles({commit, dispatch, getters}, page){
    ArticleService.articlesCounter()
    .then(response => {
      commit( 'SET_ARTICLES_TOTAL',response.data )
    })
    .catch(error => {
      console.log('Błąd! Nie udało się odczytać liczby artykułów z bd:', error.response)
    })

    ArticleService.getArticles(state.pagination.perPage, page  )
    .then(response => {     
      console.log('Artykuły: ', response.data)
      commit('SET_ARTICLES', response.data, page)  
    })
    .catch(error => {
      console.log('Błąd odczytu artykółów z bd:', error.response)
      const notification = {
        type: 'error',
        massege: 'Wystąpił problem z ładowaniem Artykułów. ' +  error.response
      }
      dispatch('notification/add', notification, {root: true})
    })
  },///-----------------------------------------------------------------------------

  fetchArticle({ commit, getters, dispatch }, id) {
   
  },///-----------------------------------------------------------------------------

  deleteArticle({ commit, dispatch },id ) {  
   
  },///-----------------------------------------------------------------------------
 

  updateArticle({commit, getters, dispatch}, aritcle) {
    
  },///-----------------------------------------------------------------------------
 
}
///----------------