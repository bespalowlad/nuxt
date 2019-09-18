import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    getData (state, payload) {
        state.data = payload
    }
  },
  getters: {
    getData(state) {
      return state.data
    }
  },
  actions: {
    async getData (context, q) {
        let endpoint = `https://api.scryfall.com/cards/search?q=${q}`

        let {data} = await axios.get(endpoint)
        context.commit('getData', data.data)
    }
  }
})

export default store