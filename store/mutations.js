export const mutations = () => ({
  
  GET_POSTS (state) {
    axios
    .get('http://localhost:3000/posts')  // Does a get request
    .then(response => {
      //console.log(response.data) // For now, logs out the response
      state.posts = response.data
    })
    .catch(error => {
      console.log('There was an error:', error.response) // Logs out the error
    })
  }
  
})