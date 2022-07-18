import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    name: "",
    email: "",
    phone: "",
    dob: "",
    qualification: "",
    college: "",
    cgpa: 0,
    password: "",
    password_confirmation: "",
    work_experience: "",
    hobby: "",
    step: 1,
  };
};

const state = getDefaultState();

export default new Vuex.Store({
  state,
  getters: {},
  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
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
    setQualification(state, payload) {
      state.qualification = payload.qualification;
    },
    setCollege(state, payload) {
      state.college = payload.college;
    },
    setCgpa(state, payload) {
      state.cgpa = payload.cgpa;
    },
    setPassword(state, payload) {
      state.password = payload.password;
    },
    setWorkExperience(state, payload) {
      state.work_experience = payload.work_experience;
    },
    setHobby(state, payload) {
      state.hobby = payload.hobby;
    },
  },
  actions: {
    resetState({ commit }) {
      commit("resetState");
    },
  },
  modules: {},
});
