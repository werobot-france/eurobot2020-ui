import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  team: '',
  buosDisposition: 0,
  address: process.env.VUE_APP_DEFAULT_SERVER,
  ws: null,
  gameState: 'armed',
  isConnected: false,

  alert: {
    color: '',
    text: '',
    enabled: false
  }
}

const mutations = {
  'SET_WS': (state, instance) => {
    state.ws = instance
  },
  'SET_TITLE': (state, payload) => {
    state.title = payload
    window.title = payload + ' | eurobot2020-ui'
  },
  'SET_IS_CONNECTED': (state, payload) => {
    state.isConnected = payload
  },
  'ADD_ALERT': (state, payload) => {
    state.alert = {
      color: payload.color,
      text: payload.text,
      enabled: true
    }
  },
  'DISABLE_ALERT': (state) => {
    state.alert.enabled = false
  },
  'SET_GAME_STATE': (state, payload) => {
    state.gameState = payload
  }
}

const actions = {
  sendMessage: (param) => {
    console.log('hello world', param)
  }
}

// getters are functions.
const getters = {}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
