<template v-model="modelShow">
  <div>
    <div class="steps">
      <span @click="closeModal" class="close">&times;</span>
      <h2>Step 1</h2>
      <div>
        <label class="form-fields" for="name">Name:</label>
        <input
          class="form-fields"
          type="text"
          id="name"
          name="name"
          v-model="name"
        />
      </div>
      <div>
        <label class="form-fields" for="email">Email:</label>
        <input
          class="form-fields"
          type="email"
          id="email"
          name="email"
          v-model="email"
        />
      </div>
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
      </div>
      <div>
        <label for="password">Confirm Password:</label>
        <input
          class="form-fields"
          id="password_confirmation"
          type="password"
          name="password_confirmation"
          v-model="password_confirmation"
        />
      </div>
      <div class="select-div">
        <label class="form-fields" for="hobby">Hobby:</label>
        <select class="form-fields select" v-model="hobby">
          <option disabled value="">Please select one</option>
          <option v-for="item in hobbies" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
      <the-buttons></the-buttons>
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
    modalShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hobbies: ["Reading", "Singing", "Dancing", "Swimming"],
    };
  },
  methods: {
    closeModal() {
      this.$emit("hideWizard", true);
    },
  },
  computed: {
    step: {
      get() {
        return this.$store.state.step;
      },
      set(value) {
        this.$store.commit("setStep", { step: value });
      },
    },
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
