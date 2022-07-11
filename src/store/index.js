import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    name: "",
    email: "",
  },
  getters: {},
  mutations: {
    setName(state, payload) {
      state.Name = payload.Name;
    },
    setEmail(state, payload) {
      state.email = payload.email;
    },
  },
  actions: {},
  modules: {},
});
