<template>
  <div>
    <div class="steps">
      <span @click="closeModal" class="close">&times;</span>
      <h2>Step 3</h2>
      <ValidationObserver v-slot="{ handleSubmit }" ref="observer3">
        <form @submit.prevent="handleSubmit(navigateNext)">
          <ValidationProvider name="DOB" rules="required" v-slot="{ errors }">
            <div class="parent-div">
              <label class="form-fields" for="dob">DOB:</label>
              <input
                class="form-fields dob-input"
                type="date"
                id="dob"
                dob="dob"
                max="2019-07-19"
                v-model="dob"
              />
              <div class="error">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>

          <ValidationProvider name="Phone" rules="required" v-slot="{ errors }">
            <div class="parent-div">
              <label class="form-fields" for="phone">Phone:</label>
              <input
                class="form-fields phone-input"
                type="number"
                id="phone"
                name="phone"
                v-model="phone"
              />
              <div class="error">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>
          <ValidationProvider
            name="Work Experience"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="parent-div">
              <label for="work_experience">Work Experience:</label>
              <textarea
                class="form-fields"
                id="work_experience"
                name="work_experience"
                cols="50"
                rows="4"
                v-model="workExperience"
              ></textarea>
              <div class="error">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>

          <the-buttons
            ref="buttonComponent"
            @validate-step-three-data="validateData"
            v-on="$listeners"
          ></the-buttons>
        </form>
      </ValidationObserver>
    </div>
    <div class="outside" v-on:click="closeModal"></div>
  </div>
</template>
<script>
import TheButtons from "../TheButtons.vue";

export default {
  components: {
    TheButtons,
  },
  props: {
    editUserData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    async validateData() {
      const isValid = await this.$refs.observer3.validate();
      if (!isValid) {
        // stop!!
      } else {
        this.$refs.buttonComponent.finish();
      }
    },
    closeModal() {
      this.$emit("hideWizard", true);
    },
  },
  computed: {
    dob: {
      get() {
        return this.$store.state.dob;
      },
      set(value) {
        this.$store.commit("setDob", { dob: value });
      },
    },
    phone: {
      get() {
        return this.$store.state.phone;
      },
      set(value) {
        this.$store.commit("setPhone", { phone: value });
      },
    },
    workExperience: {
      get() {
        return this.$store.state.work_experience;
      },
      set(value) {
        this.$store.commit("setWorkExperience", { work_experience: value });
      },
    },
  },
};
</script>

<style scoped>
.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
}

.phone-input {
  margin-left: 42px;
}
.dob-input {
  margin-left: 57px;
}
label {
  display: inline-block;
  max-width: 160px;
}
.parent-div {
  display: flex;
  align-items: center;
}

.error {
  margin-left: 0;
  margin-right: 5px;
}

.steps {
  width: auto;
}
</style>
