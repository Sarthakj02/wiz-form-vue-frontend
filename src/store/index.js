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
    profile_image: "",
    hobby: "",
    step: 1,
    edit: false,
    id: 0,
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
    setEdit(state, payload) {
      state.edit = payload.edit;
    },
    setId(state, payload) {
      state.id = payload.id;
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
    setPasswordConfirmation(state, payload) {
      state.password_confirmation = payload.password_confirmation;
    },
    setWorkExperience(state, payload) {
      state.work_experience = payload.work_experience;
    },
    setProfileImage(state, payload) {
      state.profile_image = payload.profile_image;
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
