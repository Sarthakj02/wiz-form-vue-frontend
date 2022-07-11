<template>
  <div>
    <b-button @click="saveData" variant="success">Button</b-button>
  </div>
</template>
<script>
import { BButton } from "bootstrap-vue";
import axios from "axios";
export default {
  components: {
    BButton,
  },
  data() {
    return {
      validation: {},
      validate: false,
      showWizard: false,
    };
  },

  methods: {
    saveData() {
      this.user = {
        name: "stark abbot",
        password: "Pass@1234",
        password_confirmation: "Pass@1234",
        email: "test@yopmail.com",
        cgpa: 9,
        hobby: 2,
        dob: "2022-07-11",
        qualification: "computer",
        college: "Earth institute of technology",
        phone: "9898121255",
        work_experience:
          "i have created a portfolio of projects with html,css.",
      };
      const api = axios.create({ baseURL: "http://127.0.0.1:8000/api/" });
      api
        .post("/users", this.user, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert(response);
        })
        .catch((error) => {
          if (error.response.status == 422) {
            this.validation = error.response.data.errors;
            this.validate = true;
            console.log(error);
            alert(error.response.data.errors);
          } else {
            console.log(error);
            alert(error.response.data.errors);
          }
        });
    },
  },
};
</script>
<style scoped></style>
