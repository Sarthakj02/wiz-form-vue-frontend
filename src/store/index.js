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
    cgpa: 0,
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
  actions: {},
  modules: {},
});
