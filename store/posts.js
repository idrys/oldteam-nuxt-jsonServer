import EventService from '@/services/AlbumService.js'
    export const state = () => ({
      albums: [],
      album: {}
    })
    export const mutations = {
      ADD_POST(state, event) {
        state.albums.push(event)
      },
    }
    export const actions = {
      createEvent({ commit }, event) {
        EventService.albumEvent(event)
        commit('ADD_EVENT', event)
      }
    }