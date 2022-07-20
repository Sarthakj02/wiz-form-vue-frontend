<template>
  <div>
    <button class="step-button" @click="navigatePrev" v-show="togglePrevious()">
      Previous
    </button>
    <button class="step-button" @click="navigateNext" type="button">
      {{ nextBtnTxt() }}
    </button>
    <div v-show="showResult">
      <div v-if="validate" class="error-list">
        <div v-for="(errorArray, idx) in validationErrors" :key="idx">
          <div v-for="(allErrors, idx) in errorArray" :key="idx">
            <span>{{ allErrors }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showResult: false,
      result: "",
      validationErrors: {},
      validate: false,
    };
  },
  methods: {
    nextBtnTxt() {
      if (this.$store.state.step === 3) {
        return "Finish";
      }
      return "Next";
    },
    togglePrevious() {
      if (this.$store.state.step === 1) {
        return false;
      }
      return true;
    },
    navigateNext() {
      if (this.$store.state.step === 1) {
        this.$store.commit("setStep", { step: 2 });
      } else if (this.$store.state.step === 2) {
        this.$store.commit("setStep", { step: 3 });
      } else {
        this.result = this.$store.state;
        this.showWizard = true;

        this.user = {
          name: this.$store.state.name,
          password: this.$store.state.password,
          password_confirmation: this.$store.state.password_confirmation,
          email: this.$store.state.email,
          cgpa: this.$store.state.cgpa,
          hobby: this.$store.state.hobby,
          dob: this.$store.state.dob,
          qualification: this.$store.state.qualification,
          college: this.$store.state.college,
          phone: this.$store.state.phone,
          work_experience: this.$store.state.work_experience,
        };
        axios
          .post("/users", this.user)
          .then((response) => {
            if (response.data.success === true) {
              this.$toast.success(
                `( ${response.data.user.name} ) ` + "User created successfully"
              );
              this.$emit("reset-data");
            }
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.validationErrors = error.response.data.errors;
              this.validate = true;
            } else {
              this.$toast.error("Something went wrong");
            }
          });
        this.showResult = true;
      }
    },
    navigatePrev() {
      if (this.$store.state.step === 3) {
        this.$store.commit("setStep", { step: 2 });
      } else if (this.$store.state.step === 2) {
        this.$store.commit("setStep", { step: 1 });
      }
    },
    close() {},
  },
};
</script>
<style scoped>
.error-list {
  color: #d63301;
  background-color: #ffccba;
  border: 1px solid;
}
</style>
