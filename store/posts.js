import EventService from '@/services/PostsService.js'
    export const state = () => ({
      posts: [],
      post: {}
    })
    export const mutations = {
      ADD_POST(state, event) {
        state.posts.push(event)
      },
    }
    export const actions = {
      createEvent({ commit }, event) {
        EventService.postEvent(event)
        commit('ADD_EVENT', event)
      }
    }