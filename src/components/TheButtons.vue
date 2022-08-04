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
      validationErrors: {},
      validate: false,
    };
  },
  props: {
    validDataFlag: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    edit: {
      get() {
        return this.$store.state.edit;
      },
      set(value) {
        this.$store.commit("setEdit", { edit: value });
      },
    },
    id: {
      get() {
        return this.$store.state.id;
      },
      set(value) {
        this.$store.commit("setId", { id: value });
      },
    },
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
      if (this.$store.state.step === 3) {
        this.$emit("validate-step-three-data");
      }
      if (this.$store.state.step === 1) {
        this.$emit("validate-step-one-data");
      } else if (this.$store.state.step === 2) {
        this.$emit("validate-step-two-data");
      }
    },
    finish() {
      if (this.validDataFlag == true) {
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
          profile_image: this.$store.state.profile_image,
        };
        if (this.id && this.edit) {
          axios
            .post(`/users/${this.id}?_method=PUT`, this.user, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.data.success === true) {
                this.$toast.success(
                  `( ${response.data.user.name} ) ` +
                    "User updated successfully"
                );
                this.$emit("reset-data");
              }
            })
            .catch((error) => {
              if (error.response.status == 422) {
                this.validationErrors = error.response.data.errors;
                this.validate = true;
                this.showResult = true;
              } else {
                this.$toast.error("Something went wrong");
              }
            });
        } else {
          axios
            .post("/users", this.user, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              if (response.data.success === true) {
                this.$toast.success(
                  `( ${response.data.user.name} ) ` +
                    "User created successfully"
                );
                this.$emit("reset-data");
              }
            })
            .catch((error) => {
              if (error.response.status == 422) {
                this.validationErrors = error.response.data.errors;
                this.validate = true;
                this.showResult = true;
              } else {
                this.$toast.error("Something went wrong");
              }
            });
        }
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
