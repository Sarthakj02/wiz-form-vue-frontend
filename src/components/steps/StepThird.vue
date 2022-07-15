<template v-model="modelShow">
  <div>
    <div class="modal-content steps">
      <span @click="closeModal" class="close">&times;</span>
      <h2>Step 3</h2>
      <div>
        <label class="form-fields" for="dob">DOB:</label>
        <input
          class="form-fields dob-input"
          type="text"
          id="dob"
          dob="dob"
          v-model="dob"
        />
      </div>
      <div>
        <label class="form-fields" for="phone">Phone:</label>
        <input
          class="form-fields phone-input"
          type="number"
          id="phone"
          name="phone"
          v-model="phone"
        />
      </div>
      <div>
        <label for="work_experience">Work Experience:</label>
        <input
          class="form-fields"
          id="work_experience"
          type="text"
          name="work_experience"
          v-model="workExperience"
        />
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
    return {};
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
  margin-left: 74px;
}
.dob-input {
  margin-left: 87px;
}
</style>
