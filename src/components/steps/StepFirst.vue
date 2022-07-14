<template v-model="modelShow">
  <div class="step-one">
    <div class="modal-content">
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
        <label class="form-fields" for="phone">Phone:</label>
        <input
          class="form-fields"
          type="number"
          id="phone"
          name="phone"
          v-model="phone"
        />
      </div>
      <the-buttons></the-buttons>
    </div>
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
      test: 0,
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
    phone: {
      get() {
        return this.$store.state.phone;
      },
      set(value) {
        this.$store.commit("setPhone", { phone: value });
      },
    },
  },
};
</script>

<style scoped>
.step-one {
  width: 500px;
  height: 500px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px;
  background: white;
}
.close {
  padding-right: 10px;
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.form-fields {
  margin: 20px;
}
</style>
