<template>
  <div>
    <div class="steps">
      <span @click="closeModal" class="close">&times;</span>
      <h2>Step 1</h2>
      <ValidationObserver v-slot="{ handleSubmit }" ref="observer1">
        <form @submit.prevent="handleSubmit(navigateNext)">
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <div>
              <label class="form-fields" for="name">Name:</label>
              <input
                class="form-fields"
                type="text"
                id="name"
                name="name"
                v-model="name"
              />
              <div class="error">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="Email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <div>
              <label class="form-fields" for="email">Email:</label>
              <input
                class="form-fields"
                type="email"
                id="email"
                name="email"
                v-model="email"
              />
              <div class="error">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="Password"
            :rules="`${editFlag ? '' : 'required|min:8'}`"
            v-slot="{ errors }"
          >
            <div>
              <label for="password">Password:</label>
              <input
                class="form-fields"
                id="password"
                type="password"
                name="password"
                autocomplete="new-password"
                v-model="password"
              />
              <div class="error">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="Confirm Password"
            :rules="`${editFlag ? '' : 'required|min:8'}`"
            v-slot="{ errors }"
          >
            <div>
              <label for="password">Confirm Password:</label>
              <input
                class="form-fields"
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                v-model="password_confirmation"
              />
              <div class="error">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>

          <ValidationProvider name="Hobby" rules="required" v-slot="{ errors }">
            <div class="select-div">
              <label class="form-fields" for="hobby">Hobby:</label>
              <select class="form-fields select" v-model="hobby">
                <option disabled value="">Please select one</option>
                <option v-for="item in hobbies" :key="item" :value="item">
                  {{ item }}
                </option>
              </select>
              <div class="error">{{ errors[0] }}</div>
            </div>
          </ValidationProvider>
          <the-buttons
            @validate-step-one-data="validateData"
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
    editFlag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      errors: [],
      hobbies: ["Reading", "Singing", "Dancing", "Swimming"],
    };
  },
  methods: {
    async validateData() {
      const isValid = await this.$refs.observer1.validate();
      if (!isValid) {
        // stop!!
      } else {
        this.$store.commit("setStep", { step: 2 });
      }
    },
    closeModal() {
      this.$emit("hideWizard", true);
    },
  },
  computed: {
    name: {
      get() {
        return this.$store.state.name;
      },
      set(value) {
        this.$store.commit("setName", { name: value });
      },
    },
    email: {
      get() {
        return this.$store.state.email;
      },
      set(value) {
        this.$store.commit("setEmail", { email: value });
      },
    },
    password: {
      get() {
        return this.$store.state.password;
      },
      set(value) {
        this.$store.commit("setPassword", { password: value });
      },
    },
    password_confirmation: {
      get() {
        return this.$store.state.password_confirmation;
      },
      set(value) {
        this.$store.commit("setPasswordConfirmation", {
          password_confirmation: value,
        });
      },
    },
    hobby: {
      get() {
        return this.$store.state.hobby;
      },
      set(value) {
        this.$store.commit("setHobby", { hobby: value });
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
.select-div {
  margin-right: 69px;
}
</style>
