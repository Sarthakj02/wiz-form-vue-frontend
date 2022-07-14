import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: "",
    email: "",
    phone: "",
    dob: "",
    qualification: "",
    college: "",
    cgpa: "",
    password: "",
    work_experience: "",
    hobby: "",
    step: 1,
  },
  getters: {},
  mutations: {
    setStep(state, payload) {
      state.step = payload.step;
    },
    setName(state, payload) {
      state.name = payload.name;
    },
    setEmail(state, payload) {
      state.email = payload.email;
    },
    setPhone(state, payload) {
      state.phone = payload.phone;
    },
    setDob(state, payload) {
      state.dob = payload.dob;
    },
  },
  actions: {},
  modules: {},
});
