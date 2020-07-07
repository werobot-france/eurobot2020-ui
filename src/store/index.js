import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  tab: 2,
  colors: { yellow: "yellow darken-3", purple: "purple darken-1" },
  color: "light-blue darken-2",
  gobelets: 0,
  configs: [
    [1, 0, 1, 1, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 1, 0, 0]
  ],
  configs2: [
    [0, 1, 1, 0, 1],
    [0, 1, 0, 1, 1],
    [0, 0, 1, 1, 1]
  ],
  ip: "192.168.1.129",
  score: 10000,
  ws: null,
  debugModes: [
    "Match",
    "Laser",
  ]
};

const mutations = {
  'SET_WS': (state, instance) => {
    state.ws = instance
  }
};

const actions = {
  sendMessage: (param) => {
    console.log('hello world', param)
  }
};

// getters are functions.
const getters = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
