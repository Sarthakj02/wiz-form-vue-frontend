<template v-model="modelShow">
  <div>
    <div class="steps">
      <span @click="closeModal" class="close">&times;</span>
      <h2>Step 2</h2>
      <div>
        <label class="form-fields" for="qualification">Qualification:</label>
        <input
          class="form-fields"
          type="text"
          id="qualification"
          qualification="qualification"
          v-model="qualification"
        />
      </div>
      <div>
        <label class="form-fields" for="college">College:</label>
        <input
          class="form-fields college-input"
          type="text"
          id="college"
          name="college"
          v-model="college"
        />
      </div>
      <div>
        <label class="form-fields cgpa-label" for="cgpa">CGPA:</label>
        <input
          class="cgpa-input form-fields"
          id="cgpa"
          type="number"
          name="cgpa"
          v-model="cgpa"
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
    qualification: {
      get() {
        return this.$store.state.qualification;
      },
      set(value) {
        this.$store.commit("setQualification", { qualification: value });
      },
    },
    college: {
      get() {
        return this.$store.state.college;
      },
      set(value) {
        this.$store.commit("setCollege", { college: value });
      },
    },
    cgpa: {
      get() {
        return this.$store.state.cgpa;
      },
      set(value) {
        this.$store.commit("setCgpa", { cgpa: value });
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
.college-input {
  margin-left: 61px;
}
.cgpa-input {
  margin-left: 75px;
}
</style>
