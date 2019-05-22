export const getters = () => ({
  getPostById: state => id => {
    return state.posts.find(post => post.id === id)
  }
})