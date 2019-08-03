export const mutations = () => ({
  
  GET_POSTS (state) {
    axios
    .get('http://localhost:8000/albums')  // Does a get request
    .then(response => {
      //console.log(response.data) // For now, logs out the response
      state.albums = response.data
    })
    .catch(error => {
      console.log('There was an error:', error.response) // Logs out the error
    })
  },
  SET_POSTS(state, albums) {
    state.albums = albums
  }
  
})